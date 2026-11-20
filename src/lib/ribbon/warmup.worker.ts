import { ribbonFragmentShader, ribbonVertexShader } from './shaders';
import { compileProgram } from '../compileProgram';

self.onmessage = async () => {
  try {
    const canvas = new OffscreenCanvas(8, 8);
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, depth: false,
      stencil: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!gl) throw new Error('Worker WebGL is unavailable');
    const program = await compileProgram(gl, ribbonVertexShader, ribbonFragmentShader);
    // Warm the driver's program and pipeline caches before the UI renderer
    // uses this same shader. The blocking driver flush stays in the worker.
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.finish();
    gl.deleteProgram(program);
  } catch {
    // The gallery retains its regular WebGL setup on unsupported drivers.
  }
  self.postMessage({ type: 'ready' });
};
