import { ribbonFragmentShader, ribbonVertexShader } from './shaders';
import { ribbonCamera, ribbonDesktop, ribbonPhone } from './settings';
import { scrollRuntime } from '../scrollRuntime';
import { ribbonBridge } from './bridge';
import type { FlightRect, RibbonBridge } from './bridge';
import type { RibbonSettings } from './settings';
import { compileProgram } from '../compileProgram';
import { prewarmRibbon } from './warmup';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / Math.max(0.000001, max - min));
  return x * x * (3 - 2 * x);
};
const quintic = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const edge = (x: number, span: number, band: number) => quintic(clamp(x * span / band)) * quintic(clamp((1 - x) * span / band));
const easeInOut = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
interface Tween { from: number; to: number; value: number; started: number; duration: number }
function tweenValue(tween: Tween, time: number, expo = false) {
  const progress = clamp((time - tween.started) / tween.duration);
  const eased = expo ? (progress >= 1 ? 1 : 1 - Math.pow(2, -10 * progress)) : easeInOut(progress);
  tween.value = tween.from + (tween.to - tween.from) * eased;
  return progress < 1;
}
interface Card {
  element: HTMLElement; hit: HTMLButtonElement; image: HTMLImageElement; caption: HTMLElement; cue: HTMLElement;
  base: { left: number; top: number; width: number; height: number };
  pose: { x: number; y: number; w: number; h: number };
  poster: WebGLTexture | null; posterSource: string; videoTexture: WebGLTexture | null;
  video: HTMLVideoElement | null; videoSize: [number, number]; videoFrame: number | null; videoDirty: boolean;
  pointer: { x: number; y: number } | null; mouse: { x: number; y: number };
  hover: Tween; fade: Tween; drawn: boolean; focused: boolean; dx: number; captionOpacity: string; captionPosition: string; cuePosition: string;
  flat: number; lift: number; stretch: [number, number];
  disposeEvents: () => void;
}
interface Flight {
  card: Card; dialog: HTMLDialogElement; figure: () => FlightRect; video: HTMLVideoElement | null;
  from: number; to: number; value: number; previous: number; started: number; duration: number;
  handoff: number | null; resolve: ((complete: boolean) => void) | null;
}

export interface RibbonRenderer { frame: (time: number, delta: number) => void; dispose: () => void }

export async function createRibbonRenderer(canvas: HTMLCanvasElement, section: HTMLElement, signal?: AbortSignal): Promise<RibbonRenderer> {
  await prewarmRibbon();
  if (signal?.aborted) throw new DOMException('Gallery setup cancelled', 'AbortError');
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, depth: false,
    stencil: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
  if (!gl) throw new Error('WebGL 2 is unavailable.');
  const program = await compileProgram(gl, ribbonVertexShader, ribbonFragmentShader, signal);
  const uniforms = new Map<string, WebGLUniformLocation | null>();
  const location = (name: string) => {
    if (!uniforms.has(name)) uniforms.set(name, gl.getUniformLocation(program, name));
    return uniforms.get(name)!;
  };
  const float = (name: string, value: number) => gl.uniform1f(location(name), value);
  const vec2 = (name: string, x: number, y: number) => gl.uniform2f(location(name), x, y);
  const vec3 = (name: string, x: number, y: number, z: number) => gl.uniform3f(location(name), x, y, z);
  const matrix = (name: string, value: Float32Array) => gl.uniformMatrix4fv(location(name), false, value);
  const vertices: number[] = [], indices: number[] = [];
  for (let y = 0; y <= 64; y++) for (let x = 0; x <= 36; x++) vertices.push(x / 36 - 0.5, y / 64 - 0.5, 0, x / 36, y / 64);
  for (let y = 0; y < 64; y++) for (let x = 0; x < 36; x++) {
    const a = y * 37 + x, b = a + 1, c = a + 37, d = c + 1;
    indices.push(a, b, c, b, d, c);
  }
  const vao = gl.createVertexArray()!, vertexBuffer = gl.createBuffer()!, indexBuffer = gl.createBuffer()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position'), uv = gl.getAttribLocation(program, 'uv');
  gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 20, 0);
  gl.enableVertexAttribArray(uv); gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 20, 12);
  gl.useProgram(program); gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  const anisotropy = gl.getExtension('EXT_texture_filter_anisotropic');
  const textures = new Set<WebGLTexture>();
  let width = innerWidth, height = innerHeight, halfWidth = 1, halfHeight = 1;
  let settings: RibbonSettings = ribbonDesktop;
  let dirty = true, disposed = false, contextLost = false, previouslyDrawn = false, velocity = 0, lastScroll = NaN, lastTime = 0, lastSectionTop = NaN;
  let flight: Flight | null = null, held: Flight | null = null, snapshot: HTMLCanvasElement | null = null;
  let forceDraw = false, removeSnapshotAfterDraw = false;
  const projection = new Float32Array(16), model = new Float32Array(16);
  const view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -ribbonCamera.z, 1]);

  function texture(source: TexImageSource, video = false) {
    const result = gl!.createTexture()!;
    textures.add(result); gl!.bindTexture(gl!.TEXTURE_2D, result);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, video ? gl!.LINEAR : gl!.LINEAR_MIPMAP_LINEAR);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, source);
    if (!video) {
      gl!.generateMipmap(gl!.TEXTURE_2D);
      if (anisotropy) gl!.texParameterf(gl!.TEXTURE_2D, anisotropy.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, gl!.getParameter(anisotropy.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
    }
    return result;
  }
  function deleteTexture(value: WebGLTexture | null) {
    if (value) { gl!.deleteTexture(value); textures.delete(value); }
  }
  function projectPoint(card: Card, u: number, v: number) {
    const { pose, mouse } = card, s = settings;
    let z = 0;
    if (card.hover.value > 0.0001) {
      const aspect = pose.w / pose.h, dx = (u - mouse.x) * aspect, dy = v - mouse.y;
      const amplitude = 0.5 + 0.5 * edge(mouse.x, aspect, 0.45) * edge(mouse.y, 1, 0.45);
      z -= card.hover.value * s.dent * pose.h * amplitude * Math.exp(-(dx * dx + dy * dy) / (s.dentRadius * s.dentRadius)) * edge(u, aspect, 0.25) * edge(v, 1, 0.25);
    }
    let x = pose.x + (u - 0.5) * pose.w;
    const y = pose.y + (v - 0.5) * pose.h, along = -y;
    const q = along / halfHeight * s.span + s.shift;
    const slope = (Math.PI * Math.cos(Math.PI * q) - 2 * s.tail * q * Math.sin(Math.PI * q)) * Math.exp(-s.tail * q * q);
    let roll = s.bank * slope / Math.PI;
    roll += s.velocityTwist * velocity * smoothstep(0.3, 0.9, Math.abs(along / halfHeight)) * Math.sign(along);
    if (Math.abs(roll) >= 0.0001) {
      const previousX = x;
      x = previousX * Math.cos(roll) - z * Math.sin(roll);
      z = previousX * Math.sin(roll) + z * Math.cos(roll);
    }
    z -= Math.sin(Math.PI * q) * Math.exp(-s.tail * q * q) * halfHeight * s.depth * (1 + s.velocityBulge * velocity);
    const rear = 1 - smoothstep(-1, 0.3, along / halfHeight);
    x += s.rearY * halfHeight * velocity * rear;
    z += s.rearZ * halfHeight * velocity * rear;
    const lean = clamp(along / halfHeight, -1, 1);
    z += halfHeight * s.door * lean * (1.5 - 0.5 * lean * lean);
    x += s.diagonal * y;
    const perspective = 1 - z / ribbonCamera.z;
    return { x: (x / (halfWidth * perspective) + 1) * width * 0.5,
      y: (1 - y / (halfHeight * perspective)) * height * 0.5 };
  }
  function pointerUv(card: Card, x: number, y: number) {
    let u = clamp((x - (card.pose.x / (2 * halfWidth) + 0.5) * width + card.base.width / 2) / card.base.width);
    let v = clamp(1 - (y - (0.5 - card.pose.y / (2 * halfHeight)) * height + card.base.height / 2) / card.base.height);
    for (let iteration = 0; iteration < 4; iteration++) {
      const current = projectPoint(card, u, v), errorX = current.x - x, errorY = current.y - y;
      if (errorX * errorX + errorY * errorY < 0.01) break;
      const horizontal = projectPoint(card, u + 0.01, v), vertical = projectPoint(card, u, v + 0.01);
      const a = (horizontal.x - current.x) / 0.01, b = (horizontal.y - current.y) / 0.01;
      const c = (vertical.x - current.x) / 0.01, d = (vertical.y - current.y) / 0.01, determinant = a * d - c * b;
      if (Math.abs(determinant) < 0.000001) break;
      u = clamp(u - (d * errorX - c * errorY) / determinant, -0.5, 1.5);
      v = clamp(v - (a * errorY - b * errorX) / determinant, -0.5, 1.5);
    }
    return { x: clamp(u), y: clamp(v) };
  }

  const cards: Card[] = [...section.querySelectorAll<HTMLElement>('.proj')].map(element => {
    const hit = element.querySelector<HTMLButtonElement>('.project-card')!;
    const image = element.querySelector<HTMLImageElement>('.proj__img')!;
    const caption = element.querySelector<HTMLElement>('.proj__cap')!;
    // The cue sits above the shared WebGL canvas and follows the actual curved
    // edge, rather than disappearing beneath the image's rendered surface.
    const cue = document.createElement('span');
    cue.className = 'ribbon-cue-anchor'; cue.setAttribute('aria-hidden', 'true');
    const cueTemplate = element.querySelector('.project-play-cue');
    if (cueTemplate) cue.append(cueTemplate.cloneNode(true));
    section.append(cue);
    const card: Card = { element, hit, image, caption, cue, base: { left: 0, top: 0, width: 1, height: 1 }, pose: { x: 0, y: 0, w: 1, h: 1 },
      poster: null, posterSource: '', videoTexture: null, video: null, videoSize: [1, 1], videoFrame: null, videoDirty: false,
      pointer: null, mouse: { x: 0.5, y: 0.5 }, hover: { from: 0, to: 0, value: 0, started: 0, duration: 500 },
      fade: { from: 0, to: 0, value: 0, started: 0, duration: 350 }, drawn: false, focused: false, dx: NaN, captionOpacity: '', captionPosition: '', cuePosition: '',
      flat: 0, lift: 0, stretch: [0, 0], disposeEvents: () => {} };
    const hoverTo = (value: number) => { card.hover = { ...card.hover, from: card.hover.value, to: value, started: lastTime || performance.now() }; dirty = true; };
    const enter = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      card.pointer = { x: event.clientX, y: event.clientY };
      if (card.hover.value < 0.05) card.mouse = pointerUv(card, event.clientX, event.clientY);
      hoverTo(1);
    };
    const move = (event: PointerEvent) => { if (card.pointer) { card.pointer = { x: event.clientX, y: event.clientY }; dirty = true; } };
    const leave = () => { card.pointer = null; hoverTo(0); };
    let pendingSource = '';
    const load = () => {
      if (disposed || contextLost || !image.complete || !image.naturalWidth) return;
      const source = image.currentSrc;
      if (card.posterSource === source || pendingSource === source) return;
      pendingSource = source;
      void (async () => {
        let bitmap: ImageBitmap | null = null;
        try {
          // Prepare the flipped pixels asynchronously; ImageBitmap ignores
          // UNPACK_FLIP_Y_WEBGL, so its orientation must be explicit.
          if (typeof createImageBitmap === 'function') {
            try { bitmap = await createImageBitmap(image, { imageOrientation: 'flipY', premultiplyAlpha: 'none' }); }
            catch { /* The decoded image remains a compatible texture source. */ }
          }
          if (disposed || contextLost || image.currentSrc !== source || pendingSource !== source) return;
          const next = texture(bitmap || image);
          deleteTexture(card.poster);
          card.poster = next; card.posterSource = source; dirty = true;
        } catch {
          deleteTexture(card.poster); card.poster = null; card.posterSource = '';
          card.element.classList.remove('is-gl'); dirty = true;
        } finally {
          bitmap?.close();
          if (pendingSource === source) pendingSource = '';
        }
      })();
    };
    hit.addEventListener('pointerenter', enter); hit.addEventListener('pointermove', move); hit.addEventListener('pointerleave', leave);
    image.addEventListener('load', load);
    card.disposeEvents = () => { hit.removeEventListener('pointerenter', enter); hit.removeEventListener('pointermove', move); hit.removeEventListener('pointerleave', leave); image.removeEventListener('load', load); };
    load();
    return card;
  });

  function measure() {
    if (disposed || contextLost) return;
    width = innerWidth; height = innerHeight;
    settings = width <= 809.98 ? ribbonPhone : ribbonDesktop;
    section.classList.toggle('ribbon-mobile', settings.captionPinned);
    const dpr = Math.min(2, devicePixelRatio || 1);
    const pixelWidth = Math.round(width * dpr), pixelHeight = Math.round(height * dpr);
    if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
    if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
    gl!.viewport(0, 0, canvas.width, canvas.height);
    halfHeight = Math.tan(ribbonCamera.fov * Math.PI / 360) * ribbonCamera.z;
    halfWidth = halfHeight * width / height;
    const f = 1 / Math.tan(ribbonCamera.fov * Math.PI / 360), near = ribbonCamera.near, far = ribbonCamera.far;
    projection.fill(0); projection[0] = f * height / width; projection[5] = f;
    projection[10] = (far + near) / (near - far); projection[11] = -1; projection[14] = 2 * far * near / (near - far);
    cards.forEach(card => { card.element.style.transform = ''; });
    const sectionBox = section.getBoundingClientRect();
    cards.forEach(card => {
      const box = card.hit.getBoundingClientRect();
      card.base = { left: box.left - sectionBox.left, top: box.top - sectionBox.top, width: box.width, height: box.height };
      card.dx = NaN;
    });
    gl!.useProgram(program); matrix('projectionMatrix', projection); matrix('viewMatrix', view); vec3('cameraPosition', 0, 0, ribbonCamera.z);
    float('u_sheetT', settings.span); float('u_sheetC', settings.curve); float('u_sheetP', 1); float('u_bank', settings.bank);
    float('u_rearY', settings.rearY); float('u_rearZ', settings.rearZ); float('u_vtwist', settings.velocityTwist);
    float('u_tail', settings.tail); float('u_shift', settings.shift); float('u_diagX', settings.diagonal);
    float('u_shade', settings.shade); float('u_shadeS', settings.shadeSpread); vec3('u_shadeColor', 0, 0, 0);
    float('u_sheen', 1); float('u_dent', settings.dent); float('u_dentR', settings.dentRadius); float('u_dentLit', settings.dentLight);
    const lightLength = Math.hypot(...settings.light);
    vec3('u_lightDir', settings.light[0] / lightLength, settings.light[1] / lightLength, settings.light[2] / lightLength);
    float('u_gloss', settings.gloss); float('u_spec', settings.specular); float('u_diff', settings.diffuse);
    vec3('u_specTint', 1, 1, 1); vec3('u_diffTint', 1 - 0.45 * settings.warmth, 1, 1);
    float('u_alpha', 1); float('u_flat', 0); float('u_lift', 0); vec2('u_stretch', 0, 0);
    gl!.uniform1i(location('u_texture'), 0); gl!.uniform1i(location('u_texB'), 1);
    dirty = true;
    if (snapshot && held) {
      captureBackground(held.card);
      dirty = true;
      if (flight) renderer.frame(lastTime, 0);
      else gl!.clear(gl!.COLOR_BUFFER_BIT);
    }
  }

  function cancelVideo(card: Card) {
    if (card.videoFrame !== null && card.video?.cancelVideoFrameCallback) card.video.cancelVideoFrameCallback(card.videoFrame);
    card.videoFrame = null;
  }
  function syncVideo(card: Card, time: number) {
    const video = held?.card === card && held.video ? held.video : card.element.querySelector<HTMLVideoElement>('.preview-video.preview-ready');
    const ready = video && video.readyState >= 2 && video.videoWidth > 0 ? video : null;
    if (ready !== card.video) {
      cancelVideo(card); card.video = ready; card.videoDirty = Boolean(ready);
      card.fade = { ...card.fade, from: card.fade.value, to: ready ? 1 : 0, started: time };
      if (ready?.requestVideoFrameCallback) {
        const update = () => {
          if (disposed || card.video !== ready || !ready.isConnected) return;
          card.videoDirty = true; dirty = true;
          card.videoFrame = ready.requestVideoFrameCallback(update);
        };
        card.videoFrame = ready.requestVideoFrameCallback(update);
      }
      dirty = true;
    }
    if (ready && (!ready.requestVideoFrameCallback || card.videoDirty)) {
      if (!card.videoTexture) card.videoTexture = texture(ready, true);
      else { gl!.bindTexture(gl!.TEXTURE_2D, card.videoTexture); gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, ready); }
      card.videoSize = [ready.videoWidth, ready.videoHeight]; card.videoDirty = false; dirty = true;
    }
    if (tweenValue(card.fade, time)) dirty = true;
    if (!ready && card.fade.value < 0.0001 && card.videoTexture) { deleteTexture(card.videoTexture); card.videoTexture = null; }
  }

  const observer = new ResizeObserver(measure);
  observer.observe(section); cards.forEach(card => observer.observe(card.caption));
  const resize = () => measure();
  addEventListener('resize', resize);
  const lost = (event: Event) => {
    event.preventDefault(); contextLost = true;
    bridge.cancel();
    section.classList.remove('ribbon-live');
    cards.forEach(card => { card.element.classList.remove('is-gl'); card.caption.style.visibility = ''; card.caption.style.transform = ''; card.cue.classList.remove('is-active'); });
    canvas.dataset.rendererError = 'WebGL context lost';
  };
  canvas.addEventListener('webglcontextlost', lost);
  section.classList.add('ribbon-live'); canvas.classList.add('is-live');
  measure();

  const renderer: RibbonRenderer = {
    frame(time, delta) {
      lastTime = time;
      if (disposed || contextLost || document.hidden) return;
      if (scrollRuntime.paused && !flight && !forceDraw) return;
      const scroll = scrollRuntime.smooth ? scrollRuntime.y : window.scrollY;
      const normalizedDelta = clamp(delta / (1000 / 60), 0, 3);
      if (held && !flight && !forceDraw) return;
      const targetVelocity = held ? velocity : Math.min(1, Math.pow(Math.tanh((scrollRuntime.smooth ? scrollRuntime.lag : 0) / settings.velocityNorm), 2));
      const nextVelocity = velocity + (targetVelocity - velocity) * (1 - Math.pow(1 - settings.velocitySmooth, normalizedDelta));
      if (Math.abs(nextVelocity - velocity) > 0.0001 || Math.abs(scroll - lastScroll) > 0.01) dirty = true;
      velocity = nextVelocity < 0.0005 ? 0 : nextVelocity; lastScroll = scroll;
      const box = section.getBoundingClientRect();
      if (!Number.isFinite(lastSectionTop) || Math.abs(box.top - lastSectionTop) > 0.1) dirty = true;
      lastSectionTop = box.top;
      if (!flight && !forceDraw && (box.bottom < -height * 0.5 || box.top > height * 1.5)) {
        if (previouslyDrawn) { gl.clear(gl.COLOR_BUFFER_BIT); previouslyDrawn = false; }
        cards.forEach(card => {
          if (card.dx !== 0) { card.dx = 0; card.element.style.transform = ''; }
          if (settings.captionPinned) card.caption.style.visibility = 'hidden';
          card.cue.classList.remove('is-active');
        });
        return;
      }
      gl.useProgram(program);
      let completedFlight: 'open' | 'close' | null = null;
      if (flight && !forceDraw) {
        const progress = clamp((time - flight.started) / flight.duration);
        flight.value = flight.from + (flight.to - flight.from) * (1 - Math.cos(Math.PI * progress)) / 2;
        dirty = true;
        if (progress >= 1 && flight.to === 0) completedFlight = 'close';
        if (progress >= 1 && flight.to === 1) {
          if (flight.handoff === null) { flight.handoff = time; flight.resolve?.(true); flight.resolve = null; }
          canvas.style.opacity = String(1 - clamp((time - flight.handoff) / 200));
          if (time - flight.handoff >= 200) completedFlight = 'open';
        }
      }
      cards.forEach(card => {
        const focused = !held && document.activeElement === card.hit && card.hit.matches(':focus-visible');
        if (focused !== card.focused) { card.focused = focused; dirty = true; }
        const rect = { top: box.top + card.base.top, left: box.left + card.base.left, width: card.base.width, height: card.base.height };
        card.flat = 0; card.lift = 0; card.stretch = [0, 0];
        if (flight?.card === card && !forceDraw) {
          const target = flight.figure(), p = flight.value;
          const dx = target.left + target.width / 2 - (rect.left + rect.width / 2);
          const dy = target.top + target.height / 2 - (rect.top + rect.height / 2);
          rect.left += (target.left - rect.left) * p; rect.top += (target.top - rect.top) * p;
          rect.width += (target.width - rect.width) * p; rect.height += (target.height - rect.height) * p;
          card.flat = p;
          card.lift = 4 * 0.03 * p * (1 - p) * 2 * halfHeight * rect.height / height;
          const travel = (p - flight.previous) / Math.max(0.25, normalizedDelta);
          card.stretch = [dx * travel * 0.08 * 2 * halfWidth / width, -dy * travel * 0.08 * 2 * halfHeight / height];
          flight.previous = p;
        }
        card.pose = { w: 2 * halfWidth * rect.width / width, h: 2 * halfHeight * rect.height / height,
          x: -halfWidth + halfWidth * rect.width / width + rect.left / width * 2 * halfWidth,
          y: halfHeight - halfHeight * rect.height / height - rect.top / height * 2 * halfHeight };
        if (!held && tweenValue(card.hover, time, true)) dirty = true;
        if (!held && card.pointer) {
          const target = pointerUv(card, card.pointer.x, card.pointer.y), follow = 1 - Math.pow(1 - settings.dentFollow, normalizedDelta);
          const dx = (target.x - card.mouse.x) * follow, dy = (target.y - card.mouse.y) * follow;
          card.mouse.x += dx; card.mouse.y += dy;
          if (Math.abs(dx) + Math.abs(dy) > 0.0001) dirty = true;
        }
        syncVideo(card, time);
        const onDeck = rect.top < height * 1.5 && rect.top + rect.height > -height * 0.5;
        const dx = onDeck ? Math.round(settings.diagonal * card.pose.y * width / (2 * halfWidth) * 10) / 10 : 0;
        if (dx !== card.dx) { card.dx = dx; card.element.style.transform = dx ? `translate3d(${dx}px,0,0)` : ''; }
        card.drawn = Boolean(card.poster) && (flight && !forceDraw ? flight.card === card : onDeck);
        const opacity = settings.captionFade ? 1 - smoothstep(settings.captionFrom, settings.captionTo, Math.abs(card.pose.y / halfHeight)) : 1;
        const alpha = opacity.toFixed(3);
        if (alpha !== card.captionOpacity) { card.captionOpacity = alpha; card.caption.style.opacity = alpha; }
        if (settings.captionPinned) {
          const point = projectPoint(card, 0, 0);
          const transform = `translate3d(${point.x.toFixed(1)}px,${(point.y + 14).toFixed(1)}px,0)`;
          if (transform !== card.captionPosition) { card.captionPosition = transform; card.caption.style.transform = transform; }
          card.caption.style.visibility = card.drawn ? 'visible' : 'hidden';
        } else {
          card.caption.style.translate = `${Math.round(settings.diagonal * (card.base.height / 2 - 9))}px 0`;
        }
        const cueActive = card.drawn && !held && (card.hover.to > 0 || focused);
        card.cue.classList.toggle('is-active', cueActive);
        if (cueActive) {
          const point = projectPoint(card, .98, .12);
          const transform = `translate3d(${clamp(point.x - 12, 235, width - 18).toFixed(1)}px,${clamp(point.y - 8, 50, height - 20).toFixed(1)}px,0)`;
          if (transform !== card.cuePosition) { card.cuePosition = transform; card.cue.style.transform = transform; }
        }
      });
      if (!dirty) return;
      gl.bindVertexArray(vao); gl.clear(gl.COLOR_BUFFER_BIT);
      float('u_sheetW', halfHeight); float('u_leanW', halfHeight);
      float('u_sheetD', halfHeight * settings.depth * (1 + settings.velocityBulge * velocity));
      float('u_sheetV', velocity); float('u_leanA', halfHeight * settings.door);
      cards.forEach(card => {
        if (!card.drawn || !card.poster) return;
        model.fill(0); model[0] = card.pose.w; model[5] = card.pose.h; model[10] = 1; model[15] = 1; model[12] = card.pose.x; model[13] = card.pose.y;
        matrix('modelMatrix', model); vec2('u_res', card.pose.w, card.pose.h);
        vec2('u_size', card.image.naturalWidth, card.image.naturalHeight); vec2('u_sizeB', ...card.videoSize);
        float('u_corner', settings.radius / (card.pose.h * height / (2 * halfHeight))); float('u_hover', card.hover.value); vec2('u_mouse', card.mouse.x, card.mouse.y);
        float('u_focus', card.focused ? 1 : 0);
        float('u_flat', card.flat); float('u_lift', card.lift); vec2('u_stretch', ...card.stretch);
        float('u_fade', card.videoTexture ? card.fade.value : 0);
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, card.poster);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, card.videoTexture || card.poster);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        card.element.classList.add('is-gl');
      });
      previouslyDrawn = true; dirty = false;
      canvas.dataset.drawnCards = String(cards.filter(card => card.drawn).length);
      canvas.dataset.velocity = velocity.toFixed(3);
      if (removeSnapshotAfterDraw && !flight) { snapshot?.remove(); snapshot = null; removeSnapshotAfterDraw = false; }
      if (completedFlight === 'open') {
        cancelVideo(flight!.card); flight!.card.video = null;
        flight = null; gl.clear(gl.COLOR_BUFFER_BIT); previouslyDrawn = false;
        section.append(canvas); canvas.classList.remove('ribbon-flight'); canvas.style.opacity = '';
      } else if (completedFlight === 'close') {
        const finished = flight!;
        flight = null; held = null;
        section.append(canvas); canvas.classList.remove('ribbon-flight'); canvas.style.opacity = '';
        removeSnapshotAfterDraw = true; dirty = true;
        finished.resolve?.(true);
      }
    },
    dispose() {
      bridge.cancel();
      if (ribbonBridge.current === bridge) ribbonBridge.current = null;
      disposed = true; observer.disconnect(); removeEventListener('resize', resize); canvas.removeEventListener('webglcontextlost', lost);
      cards.forEach(card => {
        card.disposeEvents(); cancelVideo(card); card.element.style.transform = ''; card.element.classList.remove('is-gl');
        card.cue.remove();
        card.caption.style.opacity = ''; card.caption.style.visibility = ''; card.caption.style.transform = ''; card.caption.style.translate = '';
      });
      section.classList.remove('ribbon-live', 'ribbon-mobile'); canvas.classList.remove('is-live');
      textures.forEach(value => gl.deleteTexture(value)); textures.clear();
      gl.deleteBuffer(vertexBuffer); gl.deleteBuffer(indexBuffer); gl.deleteVertexArray(vao); gl.deleteProgram(program);
      if (!gl.isContextLost()) gl.clear(gl.COLOR_BUFFER_BIT);
    },
  };
  function captureBackground(card: Card) {
    forceDraw = true; dirty = true; renderer.frame(lastTime || 0, 16.67); forceDraw = false;
    snapshot?.remove();
    snapshot = document.createElement('canvas'); snapshot.className = 'ribbon-canvas ribbon-snapshot';
    snapshot.setAttribute('aria-hidden', 'true'); snapshot.width = canvas.width; snapshot.height = canvas.height;
    const context = snapshot.getContext('2d');
    if (context) {
      context.drawImage(canvas, 0, 0); context.globalCompositeOperation = 'destination-out';
      const ratio = canvas.width / width;
      context.beginPath();
      for (let side = 0; side < 4; side++) for (let step = 0; step <= 36; step++) {
        const t = step / 36;
        const uv = side === 0 ? [t, 0] : side === 1 ? [1, t] : side === 2 ? [1 - t, 1] : [0, 1 - t];
        const point = projectPoint(card, uv[0], uv[1]);
        if (side === 0 && step === 0) context.moveTo(point.x * ratio, point.y * ratio);
        else context.lineTo(point.x * ratio, point.y * ratio);
      }
      context.closePath(); context.fill();
    }
    section.append(snapshot);
  }
  const bridge: RibbonBridge = {
    open(id, dialog, figure, video) {
      const card = cards.find(item => item.element.dataset.projectId === id);
      if (!card?.poster || disposed || contextLost) return Promise.resolve(false);
      cards.forEach(item => item.cue.classList.remove('is-active'));
      captureBackground(card);
      flight?.resolve?.(false);
      canvas.classList.add('ribbon-flight'); canvas.style.opacity = ''; dialog.append(canvas);
      return new Promise(resolve => {
        flight = { card, dialog, figure, video, from: 0, to: 1, value: 0, previous: 0,
          started: lastTime, duration: 850, handoff: null, resolve };
        held = flight; dirty = true;
      });
    },
    close(id) {
      if (!held || held.card.element.dataset.projectId !== id || disposed || contextLost) return Promise.resolve(false);
      const from = flight?.value ?? 1;
      flight?.resolve?.(false);
      canvas.classList.add('ribbon-flight'); canvas.style.opacity = ''; held.dialog.append(canvas);
      return new Promise(resolve => {
        flight = { ...held!, from, to: 0, value: from, previous: from, started: lastTime,
          duration: Math.max(120, 660 * from), handoff: null, resolve };
        held = flight; dirty = true;
      });
    },
    holding: id => Boolean(held && held.card.element.dataset.projectId === id),
    cancel() {
      flight?.resolve?.(false); flight = null; held = null;
      snapshot?.remove(); snapshot = null;
      if (canvas.parentNode !== section) section.append(canvas);
      canvas.classList.remove('ribbon-flight'); canvas.style.opacity = ''; dirty = true;
    },
  };
  ribbonBridge.current = bridge;
  return renderer;
}
