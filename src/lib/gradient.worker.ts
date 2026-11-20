import { vertexShaderSource } from '../../node_modules/@paper-design/shaders/dist/vertex-shader.js';
import { compileProgram } from './compileProgram';

let gl: WebGL2RenderingContext | null = null, program: WebGLProgram | null = null, canvas: OffscreenCanvas;
let speed = 0.8, current = 10500, last = 0, raf = 0, width = 1, height = 1, ratio = 1, ready = false;
const locations = new Map<string, WebGLUniformLocation | null>();
const location = (name: string) => {
  if (!locations.has(name)) locations.set(name, gl!.getUniformLocation(program!, name));
  return locations.get(name)!;
};
function draw(time: number) {
  if (!ready || !gl) return;
  if (last) current += (time - last) * speed;
  last = time; gl.useProgram(program);
  gl.uniform1f(location('u_time'), current / 1000); gl.drawArrays(gl.TRIANGLES, 0, 6);
  raf = speed ? requestAnimationFrame(draw) : 0;
}
function render() { cancelAnimationFrame(raf); last = performance.now(); draw(last); }
function resize() {
  if (!ready || !gl) return;
  canvas.width = width; canvas.height = height; gl.viewport(0, 0, width, height); gl.useProgram(program);
  gl.uniform2f(location('u_resolution'), width, height); gl.uniform1f(location('u_pixelRatio'), ratio); render();
}
self.onmessage = async event => {
  const data = event.data;
  if (data.type === 'resize') { width = data.width; height = data.height; ratio = data.ratio; resize(); return; }
  if (data.type === 'speed') { speed = data.speed; render(); return; }
  if (data.type !== 'init') return;
  try {
    canvas = data.canvas; width = data.width; height = data.height; ratio = data.ratio;
    speed = data.speed; current = data.frame;
    gl = canvas.getContext('webgl2', { alpha: true, antialias: false, depth: false, stencil: false });
    if (!gl) throw new Error('Worker WebGL is unavailable');
    program = await compileProgram(gl, vertexShaderSource.replace(/precision\s+(lowp|mediump)\s+float;/g, 'precision highp float;'),
      data.fragment.replace(/precision\s+(lowp|mediump)\s+float/g, 'precision highp float'));
    gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const types = new Map<string, number>();
    for (let index = 0; index < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); index++) {
      const info = gl.getActiveUniform(program, index)!; types.set(info.name.replace(/\[0\]$/, ''), info.type);
    }
    let textureUnit = 0;
    for (const [name, value] of Object.entries(data.values)) {
      const target = location(name), type = types.get(name);
      if (value instanceof ImageBitmap) {
        gl.activeTexture(gl.TEXTURE0 + textureUnit); gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
        gl.uniform1i(target, textureUnit++); gl.uniform1f(location(name + 'AspectRatio'), value.width / value.height); value.close();
      } else if (typeof value === 'number') {
        if (type === gl.INT || type === gl.BOOL) gl.uniform1i(target, value); else gl.uniform1f(target, value);
      } else {
        const array = new Float32Array((value as number[] | number[][]).flat());
        if (type === gl.FLOAT_VEC4) gl.uniform4fv(target, array); else if (type === gl.FLOAT_VEC3) gl.uniform3fv(target, array);
        else if (type === gl.FLOAT_VEC2) gl.uniform2fv(target, array); else gl.uniform1fv(target, array);
      }
    }
    ready = true; resize(); self.postMessage({ type: 'ready' });
  } catch (error) { self.postMessage({ type: 'error', message: error instanceof Error ? error.message : 'Worker initialization failed' }); }
};
