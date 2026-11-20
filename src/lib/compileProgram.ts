export async function compileProgram(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string, signal?: AbortSignal) {
  const vertex = gl.createShader(gl.VERTEX_SHADER)!, fragment = gl.createShader(gl.FRAGMENT_SHADER)!, program = gl.createProgram()!;
  gl.shaderSource(vertex, vertexSource); gl.shaderSource(fragment, fragmentSource);
  gl.compileShader(vertex); gl.compileShader(fragment);
  gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
  try {
    const parallel = gl.getExtension('KHR_parallel_shader_compile');
    if (parallel) {
      while (!gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) {
        if (signal?.aborted) throw new DOMException('Shader setup cancelled', 'AbortError');
        await new Promise<void>(resolve => typeof requestAnimationFrame === 'function' ? requestAnimationFrame(() => resolve()) : setTimeout(resolve, 8));
      }
    } else {
      // Give the document a paint before querying a driver without parallel compilation.
      await new Promise<void>(resolve => typeof requestAnimationFrame === 'function' ? requestAnimationFrame(() => requestAnimationFrame(() => resolve())) : setTimeout(resolve, 16));
    }
    if (signal?.aborted) throw new DOMException('Shader setup cancelled', 'AbortError');
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getShaderInfoLog(vertex) || gl.getShaderInfoLog(fragment) || gl.getProgramInfoLog(program) || 'Shader compilation failed');
    }
    return program;
  } catch (error) { gl.deleteProgram(program); throw error; }
  finally { gl.deleteShader(vertex); gl.deleteShader(fragment); }
}
