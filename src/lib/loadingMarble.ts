import { compileProgram } from './compileProgram';

const vertex = `#version 300 es
precision highp float;
in vec2 position;
void main() { gl_Position = vec4(position, 0., 1.); }`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
out vec4 fragColor;

float hash(vec3 p) {
  p = fract(p * .1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
    mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
    mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) {
  float n = 0., amplitude = .5;
  for (int i = 0; i < 5; i++) { n += amplitude * noise(p); p = p * 2.03 + vec3(3.1,1.7,2.9); amplitude *= .49; }
  return n;
}
mat3 turn(float a) { float c = cos(a), s = sin(a); return mat3(c,0.,s, 0.,1.,0., -s,0.,c); }
float panel(vec3 direction, vec3 axis, vec3 horizontal, float w, float h) {
  float front = dot(direction, axis);
  vec3 vertical = normalize(cross(axis, horizontal));
  float x = abs(dot(direction, horizontal)), y = abs(dot(direction, vertical));
  return smoothstep(.1, .55, front) * (1. - smoothstep(w, w + .1, x)) * (1. - smoothstep(h, h + .09, y));
}
vec3 studio(vec3 r) {
  float upper = smoothstep(-.2, .8, r.y);
  float key = panel(r, normalize(vec3(-.55,.72,1.)), normalize(vec3(.87,0.,.49)), .42, .29);
  float edge = panel(r, normalize(vec3(.85,.15,.55)), normalize(vec3(.54,0.,-.84)), .045, .66);
  float ceiling = pow(max(0., dot(r, normalize(vec3(.1,1.,.15)))), 12.);
  return vec3(.15 + .18 * upper + 4.8 * key + 2.7 * edge + 1.4 * ceiling);
}
vec3 stone(vec3 p, vec3 n, vec3 rd) {
  vec3 q = turn(u_time * .63 + .38) * p;
  float warp = fbm(q * 3.1);
  float line = abs(sin(q.y * 3.8 + q.x * 1.5 + warp * 7.6));
  float vein = pow(1. - smoothstep(.005, .115, line), 2.2);
  float cloud = fbm(q * 6.4 + 1.3);
  vec3 base = mix(vec3(.009,.010,.012), vec3(.028,.030,.033), cloud);
  base = mix(base, vec3(.24,.25,.265), vein * .72);
  vec3 light = normalize(vec3(-.6, 1.1, 1.8));
  float diffuse = .25 + .75 * max(dot(n, light), 0.);
  float facing = max(dot(n, -rd), 0.);
  float fresnel = .045 + .66 * pow(1. - facing, 5.);
  vec3 reflected = studio(reflect(rd, n));
  float fine = noise(q * 72.);
  vec3 halfLight = normalize(light - rd);
  float gloss = pow(max(dot(n, halfLight), 0.), 120. + fine * 65.);
  vec3 color = base * diffuse * 2.1 + reflected * fresnel + gloss * vec3(.35);
  color *= .92 + .08 * facing;
  return color;
}
void main() {
  vec2 p = (2. * gl_FragCoord.xy - u_resolution) / u_resolution.y;
  float aspect = u_resolution.x / u_resolution.y;
  vec3 ro = vec3(0., .46, 4.65);
  vec3 forward = normalize(vec3(0., -.05, 0.) - ro);
  vec3 right = normalize(cross(forward, vec3(0.,1.,0.)));
  vec3 up = cross(right, forward);
  vec3 rd = normalize(forward * (2.55 * min(1., aspect)) + right * p.x + up * p.y);
  float horizon = .5 + .5 * rd.y;
  vec3 background = vec3(.48 + .12 * horizon);
  float floorTime = (-1.1 - ro.y) / rd.y;
  if (rd.y < -.001 && floorTime > 0.) {
    vec3 fp = ro + rd * floorTime;
    float shadow = .36 * exp(-dot(fp.xz, fp.xz) * .85);
    float contact = .2 * exp(-dot(fp.xz, fp.xz) * 5.5);
    vec3 floorColor = vec3(.48) * (1. - shadow - contact);
    background = mix(floorColor, background, 1. - exp(-floorTime * .028));
  }
  vec3 oc = ro;
  float b = dot(oc, rd), c = dot(oc,oc) - 1.05 * 1.05;
  float discriminant = b * b - c;
  vec3 color = background;
  if (discriminant > 0.) {
    float t = -b - sqrt(discriminant);
    vec3 hit = ro + rd * t;
    vec3 shaded = stone(hit, normalize(hit), rd);
    color = mix(background, shaded, smoothstep(0., .014, discriminant));
  }
  color = pow(max(color, vec3(0.)), vec3(1. / 2.2));
  color += (hash(vec3(gl_FragCoord.xy, 7.)) - .5) / 300.;
  fragColor = vec4(color, 1.);
}`;

export async function mountLoadingMarble(host: HTMLElement, reduced: boolean, signal: AbortSignal) {
  const canvas = document.createElement('canvas');
  canvas.className = 'loading-marble-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' });
  if (!context) throw new Error('Marble renderer unavailable');
  const gl: WebGL2RenderingContext = context;
  const program = await compileProgram(gl, vertex, fragment, signal);
  if (signal.aborted) { gl.deleteProgram(program); throw new DOMException('Loading screen closed', 'AbortError'); }
  const vao = gl.createVertexArray(), buffer = gl.createBuffer();
  gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, 'u_resolution'), time = gl.getUniformLocation(program, 'u_time');
  let disposed = false, frame = 0;
  const started = performance.now();
  host.append(canvas);
  const resize = () => {
    const bounds = host.getBoundingClientRect(), ratio = Math.min(2, devicePixelRatio || 1);
    const factor = Math.min(ratio, Math.sqrt(1300000 / Math.max(1, bounds.width * bounds.height)));
    canvas.width = Math.max(1, Math.round(bounds.width * factor)); canvas.height = Math.max(1, Math.round(bounds.height * factor));
    gl.viewport(0, 0, canvas.width, canvas.height);
    render(performance.now());
  };
  function render(now: number) {
    if (disposed) return;
    gl.useProgram(program); gl.bindVertexArray(vao);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform1f(time, reduced ? 0 : (now - started) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function loop(now: number) { render(now); if (!disposed && !document.hidden) frame = requestAnimationFrame(loop); }
  const visibility = () => { cancelAnimationFrame(frame); if (!reduced && !document.hidden && !disposed) frame = requestAnimationFrame(loop); };
  const observer = new ResizeObserver(resize);
  observer.observe(host); document.addEventListener('visibilitychange', visibility);
  resize(); host.classList.add('is-live'); visibility();
  return { dispose() {
    disposed = true; cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', visibility);
    gl.deleteBuffer(buffer); gl.deleteVertexArray(vao); gl.deleteProgram(program); canvas.remove(); host.classList.remove('is-live');
  } };
}
