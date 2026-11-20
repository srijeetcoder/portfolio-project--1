import { vertexShaderSource } from '../../node_modules/@paper-design/shaders/dist/vertex-shader.js';
import { compileProgram } from './compileProgram';

type Uniform = number | number[] | number[][] | HTMLImageElement;
export interface GradientMount { setSpeed: (speed: number) => void; dispose: () => void }

async function workerMount(parent: HTMLElement, fragment: string, values: Record<string, Uniform>, speed: number,
  frame: number, maxPixels: number, signal: AbortSignal): Promise<GradientMount> {
  const canvas = document.createElement('canvas');
  const worker = new Worker(new URL('./gradient.worker.ts', import.meta.url), { type: 'module' });
  const surface = canvas.transferControlToOffscreen();
  const encoded: Record<string, number | number[] | number[][] | ImageBitmap> = {};
  const bitmaps: ImageBitmap[] = [];
  for (const [name, value] of Object.entries(values)) {
    if (value instanceof HTMLImageElement) { const bitmap = await createImageBitmap(value); encoded[name] = bitmap; bitmaps.push(bitmap); }
    else encoded[name] = value;
  }
  let visible = true, actualSpeed = speed, disposed = false;
  const dimensions = () => {
    const box = parent.getBoundingClientRect(), targetRatio = Math.max(2, devicePixelRatio || 1) * (window.visualViewport?.scale || 1);
    const wantedWidth = Math.round(box.width) * targetRatio, wantedHeight = Math.round(box.height) * targetRatio;
    const scale = Math.min(1, Math.sqrt(maxPixels / Math.max(1, wantedWidth * wantedHeight)));
    const width = Math.max(1, Math.round(wantedWidth * scale)), height = Math.max(1, Math.round(wantedHeight * scale));
    return { width, height, ratio: width / Math.max(1, Math.round(box.width)) };
  };
  const abort = () => { worker.terminate(); canvas.remove(); };
  signal.addEventListener('abort', abort, { once: true });
  const initialized = new Promise<void>((resolve, reject) => {
    worker.onmessage = event => {
      if (event.data.type === 'ready') resolve();
      if (event.data.type === 'error') reject(new Error(event.data.message));
    };
    worker.onerror = event => reject(new Error(event.message));
    signal.addEventListener('abort', () => reject(new DOMException('Shader setup cancelled', 'AbortError')), { once: true });
  });
  worker.postMessage({ type: 'init', canvas: surface, fragment, values: encoded, speed, frame, ...dimensions() }, [surface, ...bitmaps]);
  try { await initialized; } catch (error) { worker.terminate(); throw error; }
  if (signal.aborted) { abort(); throw new DOMException('Shader setup cancelled', 'AbortError'); }
  parent.append(canvas);
  const update = () => worker.postMessage({ type: 'speed', speed: visible && !document.hidden ? actualSpeed : 0 });
  const resize = () => { if (!disposed) worker.postMessage({ type: 'resize', ...dimensions() }); };
  const observer = new ResizeObserver(resize), visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
  observer.observe(parent); visibility.observe(parent); document.addEventListener('visibilitychange', update);
  window.visualViewport?.addEventListener('resize', resize);
  return { setSpeed(value) { actualSpeed = value; update(); }, dispose() {
    disposed = true; observer.disconnect(); visibility.disconnect(); document.removeEventListener('visibilitychange', update);
    window.visualViewport?.removeEventListener('resize', resize); signal.removeEventListener('abort', abort); abort();
  } };
}

// The reference's Paper gradient shaders, with non-blocking program creation.
export async function createGradientMount(parent: HTMLElement, fragment: string, values: Record<string, Uniform>,
  speed: number, frame: number, maxPixels: number, signal: AbortSignal): Promise<GradientMount> {
  if (typeof Worker !== 'undefined' && 'transferControlToOffscreen' in HTMLCanvasElement.prototype) {
    try { return await workerMount(parent, fragment, values, speed, frame, maxPixels, signal); }
    catch (error) { if (signal.aborted) throw error; }
  }
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) throw new Error('WebGL 2 is unavailable');
  const vertex = vertexShaderSource.replace(/precision\s+(lowp|mediump)\s+float;/g, 'precision highp float;');
  fragment = fragment.replace(/precision\s+(lowp|mediump)\s+float/g, 'precision highp float');
  const program = await compileProgram(gl, vertex, fragment, signal);
  const locations = new Map<string, WebGLUniformLocation | null>();
  const types = new Map<string, number>();
  for (let index = 0; index < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); index++) {
    const info = gl.getActiveUniform(program, index)!;
    types.set(info.name.replace(/\[0\]$/, ''), info.type);
  }
  const location = (name: string) => {
    if (!locations.has(name)) locations.set(name, gl.getUniformLocation(program, name));
    return locations.get(name)!;
  };
  gl.useProgram(program);
  const buffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const textures: WebGLTexture[] = [];
  for (const [name, value] of Object.entries(values)) {
    const target = location(name), type = types.get(name);
    if (value instanceof HTMLImageElement) {
      const unit = textures.length, texture = gl.createTexture()!;
      textures.push(texture); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
      gl.uniform1i(target, unit); gl.uniform1f(location(name + 'AspectRatio'), value.width / value.height);
    } else if (typeof value === 'number') {
      if (type === gl.INT || type === gl.BOOL) gl.uniform1i(target, value); else gl.uniform1f(target, value);
    } else {
      const array = new Float32Array(value.flat());
      if (type === gl.FLOAT_VEC4) gl.uniform4fv(target, array);
      else if (type === gl.FLOAT_VEC3) gl.uniform3fv(target, array);
      else if (type === gl.FLOAT_VEC2) gl.uniform2fv(target, array);
      else gl.uniform1fv(target, array);
    }
  }
  let disposed = false, visible = true, raf = 0, last = performance.now(), current = frame;
  let actualSpeed = speed;
  const render = (time: number) => {
    if (disposed) return;
    const running = visible && !document.hidden ? actualSpeed : 0;
    current += (time - last) * running; last = time;
    gl.useProgram(program); gl.uniform1f(location('u_time'), current / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    raf = running ? requestAnimationFrame(render) : 0;
  };
  const resume = () => {
    cancelAnimationFrame(raf); last = performance.now();
    render(last);
  };
  const resize = () => {
    if (disposed) return;
    const box = parent.getBoundingClientRect();
    const ratio = Math.max(2, devicePixelRatio || 1) * (window.visualViewport?.scale || 1);
    const wantedWidth = Math.round(box.width) * ratio, wantedHeight = Math.round(box.height) * ratio;
    const scale = Math.min(1, Math.sqrt(maxPixels / Math.max(1, wantedWidth * wantedHeight)));
    canvas.width = Math.max(1, Math.round(wantedWidth * scale)); canvas.height = Math.max(1, Math.round(wantedHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height); gl.useProgram(program);
    gl.uniform2f(location('u_resolution'), canvas.width, canvas.height);
    gl.uniform1f(location('u_pixelRatio'), canvas.width / Math.max(1, Math.round(box.width)));
    resume();
  };
  const observer = new ResizeObserver(resize);
  const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
  parent.append(canvas); resize(); observer.observe(parent); visibility.observe(parent);
  document.addEventListener('visibilitychange', resume); window.visualViewport?.addEventListener('resize', resize);
  return {
    setSpeed(value) { actualSpeed = value; resume(); },
    dispose() {
      disposed = true; cancelAnimationFrame(raf); observer.disconnect(); visibility.disconnect();
      document.removeEventListener('visibilitychange', resume); window.visualViewport?.removeEventListener('resize', resize);
      textures.forEach(texture => gl.deleteTexture(texture)); gl.deleteBuffer(buffer); gl.deleteProgram(program); canvas.remove();
    },
  };
}
