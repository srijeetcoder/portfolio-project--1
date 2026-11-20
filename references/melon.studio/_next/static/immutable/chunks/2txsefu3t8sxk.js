(() => {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 82035, 70382, t => {
        var e = t.i(13125),
            r = t.i(56385);
        let n = {
            deep: "oklch(49.1% 0.2017 29.23)",
            hot: "oklch(64.6% 0.2402 29.15)",
            pale: "oklch(87.4% 0.0699 40.55)"
        };
        t.s(["U", 0, {
            warp: .34,
            spray: .06,
            tail: .12,
            core: .014
        }, "s", 0, [0, 4], "I", 0, n], 70382);
        let i = `
float h21(vec2 p){ vec3 q = fract(p.xyx * .1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  float a = h21(i), b = h21(i + vec2(1., 0.)), c = h21(i + vec2(0., 1.)), d = h21(i + 1.);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float s = .5 * vnoise(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p;
  s += .25 * vnoise(p);     p = mat2(1.6, 1.2, -1.2, 1.6) * p;
  s += .125 * vnoise(p);
  return s / .875;
}`,
            s = t => t.startsWith("oklch(") ? (0, r.M)(t) : (0, e.f)(t).map(t => t / 255),
            a = t => `vec3(${s(t).map(t=>t.toFixed(4)).join(", ")})`;

        function o(t) {
            return `vec3 ramp(float h){
  vec3 c = mix(${a(t.black)}, ${a(n.deep)}, smoothstep(0., .4, h));
  c = mix(c, ${a(t.red)}, smoothstep(.3, .72, h));
  c = mix(c, ${a(n.hot)}, smoothstep(.72, .92, h));
  return mix(c, ${a(n.pale)}, smoothstep(.93, 1.02, h));
}`
        }
        t.s(["K", 0, i, "I", 0, "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}", "l", 0, function(t) {
            return `precision highp float;
uniform vec2 u_res;      // canvas px
uniform vec2 u_o;        // origin, in height units (y up)
uniform float u_r;       // front radius, height units
uniform float u_heat;    // 0..1 red intensity of the front / trail
uniform float u_mode;    // 0 cover (the covered side is behind the front), 1 uncover (ahead of it)
uniform float u_seed;    // film-grain frame
uniform float u_warp, u_spray, u_tail, u_core;
${i}
${o(t)}
void main(){
  vec2 px = gl_FragCoord.xy;
  vec2 p = px / u_res.y;
  float d = length(p - u_o);
  // organic front: low-frequency fbm warps the threshold, eased in away from the origin (a clean bloom there)
  vec2 q = px / min(u_res.x, u_res.y);       // noise space: per the shorter side (a phone's front bends too)
  float n = (fbm(q * 1.15 + u_o * 3.1) - .5) * 2.4;   // value-noise fbm clusters near .5: spread it to \xb1~.5
  float n2 = vnoise(q * 6. - u_o * 5.) - .5;
  d += (n * u_warp + n2 * .03) * smoothstep(0., .35, d);
  // embers: the hot edge is brighter in patches along the front, never a uniform outline
  float ember = smoothstep(.35, .75, vnoise(q * 4.2 + u_o * 7. + u_r * 1.3));
  float c = u_r - d;               // > 0: the front has passed
  if (u_mode > .5) c = -c;         // c > 0: covered side
  float g = h21(px + u_seed * 61.7);          // per-pixel film grain, re-seeded per frame
  float g2 = h21(px + 917.3 + u_seed * 37.3);
  // coverage: solid on the covered side, a dithered spray within u_spray ahead of it
  float a = smoothstep(-u_spray, 0., c);
  a = a * a;
  float cov = step(g, a) * step(-u_spray, c);
  if (c >= 0.) cov = 1.;
  // heat: hot at the edge, cooling into the covered side (the hero's wave in profile)
  float heat = c < 0. ? 1. : exp(-c / u_tail);
  float core = (1. - smoothstep(0., u_core * (.6 + ember), abs(c))) * step(g2, .35 + .65 * ember);
  float edge = .84 + .2 * core * (.45 + .55 * ember) + (g2 - .5) * .32;   // grain dithers it, as Paper's grain does
  float h = edge * heat;
  h = clamp(h, 0., 1.05) * u_heat;
  vec3 col = ramp(h);
  gl_FragColor = vec4(col * cov, cov);         // premultiplied
}`
        }, "O", 0, function(t) {
            return `precision highp float;
uniform vec2 u_res; uniform float u_dpr, u_cell; uniform vec2 u_gn, u_lohi;
uniform float u_n, u_frame, u_spray, u_core, u_band;
uniform sampler2D u_t0, u_t1, u_t2;
uniform vec3 u_f0, u_f1, u_f2;   // per front: (r, origin x, origin y)
${i}
${o(t)}
float dec(vec4 t){ return (t.r * 65280. + t.g * 255.) / 65535.; }
float fieldAt(sampler2D s, vec2 g){
  vec2 f = floor(g), w = g - f;
  vec2 uv = (f + .5) / u_gn, dx = vec2(1. / u_gn.x, 0.), dy = vec2(0., 1. / u_gn.y);
  float a = dec(texture2D(s, uv)), b = dec(texture2D(s, uv + dx)), c = dec(texture2D(s, uv + dy)), d = dec(texture2D(s, uv + dx + dy));
  return mix(u_lohi.x, u_lohi.y, mix(mix(a, b, w.x), mix(c, d, w.x), w.y));
}
vec4 rim(sampler2D s, vec3 f, vec2 px, vec2 g, out float inside){
  float base = fieldAt(s, g);
  float c = f.x - base;                       // > 0: the new picture (box heights)
  inside = step(0., c);
  vec2 q = px / min(u_res.x, u_res.y);
  float ember = smoothstep(.35, .75, vnoise(q * 4.2 + f.yz * 7. + f.x * 1.3));
  float gr = h21(px + u_frame * 61.7), g2 = h21(px + 917.3 + u_frame * 37.3);
  float a = smoothstep(-u_spray, 0., c); a *= a;
  float cov = c >= 0. ? exp(-c / u_band) : step(gr, a) * step(-u_spray, c);
  float core = (1. - smoothstep(0., u_core * (.6 + ember), abs(c))) * step(g2, .35 + .65 * ember);
  float edge = .84 + .2 * core * (.45 + .55 * ember) + (g2 - .5) * .32;
  return vec4(ramp(clamp(edge, 0., 1.05)) * cov, cov);
}
void main(){
  vec2 px = gl_FragCoord.xy;
  vec2 g = vec2(px.x, u_res.y - px.y) / u_dpr / u_cell + 1.;
  vec4 acc = vec4(0.), r; float ins;
  if (u_n > .5) { r = rim(u_t0, u_f0, px, g, ins); acc = r; }
  if (u_n > 1.5) { r = rim(u_t1, u_f1, px, g, ins); acc *= 1. - ins; acc = r + acc * (1. - r.a); }
  if (u_n > 2.5) { r = rim(u_t2, u_f2, px, g, ins); acc *= 1. - ins; acc = r + acc * (1. - r.a); }
  gl_FragColor = acc;
}`
        }, "X", 0, function() {
            let t = getComputedStyle(document.documentElement);
            return {
                black: t.getPropertyValue("--black").trim(),
                red: t.getPropertyValue("--red").trim()
            }
        }, "v", 0, s], 82035)
    }, 17724, 63208, 83495, 75324, t => {
        var e, r, n = t.i(89970),
            i = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
            s = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
            a = Math.PI / 180,
            o = Math.sin,
            u = Math.cos,
            l = Math.abs,
            c = Math.sqrt,
            h = function(t) {
                return Math.round(1e5 * t) / 1e5 || 0
            },
            f = function() {
                return e || "u" > typeof window && (e = window.gsap) && e.registerPlugin && e
            },
            p = function() {
                (e = f()) ? (e.registerEase("_CE", x.create), r = 1) : console.warn("Please gsap.registerPlugin(CustomEase)")
            },
            d = function(t) {
                return ~~(1e3 * t + (t < 0 ? -.5 : .5)) / 1e3
            },
            g = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,
            _ = /[cLlsSaAhHvVtTqQ]/g,
            m = function(t) {
                var e, r = t.length,
                    n = 1e20;
                for (e = 1; e < r; e += 6) + t[e] < n && (n = +t[e]);
                return n
            },
            v = function(t, e, r) {
                r || 0 === r || (r = Math.max(+t[t.length - 1], +t[1]));
                var n, i = -1 * t[0],
                    s = -r,
                    a = t.length,
                    o = 1 / (+t[a - 2] + i),
                    u = -e || (Math.abs(t[a - 1] - t[1]) < .01 * (t[a - 2] - t[0]) ? m(t) + s : +t[a - 1] + s);
                for (u = u ? 1 / u : -o, n = 0; n < a; n += 2) t[n] = (+t[n] + i) * o, t[n + 1] = (+t[n + 1] + s) * u
            },
            y = function t(e, r, n, i, s, a, o, u, l, c, h) {
                var f, p = (e + n) / 2,
                    d = (r + i) / 2,
                    g = (n + s) / 2,
                    _ = (i + a) / 2,
                    m = (s + o) / 2,
                    v = (a + u) / 2,
                    y = (p + g) / 2,
                    x = (d + _) / 2,
                    b = (g + m) / 2,
                    w = (_ + v) / 2,
                    T = (y + b) / 2,
                    C = (x + w) / 2,
                    M = o - e,
                    k = u - r,
                    O = Math.abs((n - o) * k - (i - u) * M),
                    E = Math.abs((s - o) * k - (a - u) * M);
                return c || (c = [{
                    x: e,
                    y: r
                }, {
                    x: o,
                    y: u
                }], h = 1), c.splice(h || c.length - 1, 0, {
                    x: T,
                    y: C
                }), (O + E) * (O + E) > l * (M * M + k * k) && (f = c.length, t(e, r, p, d, y, x, T, C, l, c, h), t(T, C, b, w, m, v, o, u, l, c, h + 1 + (c.length - f))), c
            },
            x = function() {
                function t(t, e, n) {
                    r || p(), this.id = t, this.setData(e, n)
                }
                var n = t.prototype;
                return n.setData = function(t, r) {
                    r = r || {};
                    var n, h, f, p, d, m, x, b, w, T = (t = t || "0,0,1,1").match(g),
                        C = 1,
                        M = [],
                        k = [],
                        O = r.precision || 1,
                        E = O <= 1;
                    if (this.data = t, (_.test(t) || ~t.indexOf("M") && 0 > t.indexOf("C")) && (T = function(t) {
                            var e, r, n, h, f, p, d, g, _, m, v, y, x, b, w, T = (t + "").replace(s, function(t) {
                                    var e = +t;
                                    return e < 1e-4 && e > -1e-4 ? 0 : e
                                }).match(i) || [],
                                C = [],
                                M = 0,
                                k = 0,
                                O = 2 / 3,
                                E = T.length,
                                S = 0,
                                A = "ERROR: malformed path: " + t,
                                P = function(t, e, r, n) {
                                    m = (r - t) / 3, v = (n - e) / 3, d.push(t + m, e + v, r - m, n - v, r, n)
                                };
                            if (!t || !isNaN(T[0]) || isNaN(T[1])) return console.log(A), C;
                            for (e = 0; e < E; e++)
                                if (x = f, isNaN(T[e]) ? p = (f = T[e].toUpperCase()) !== T[e] : e--, n = +T[e + 1], h = +T[e + 2], p && (n += M, h += k), e || (g = n, _ = h), "M" === f) d && (d.length < 8 ? C.length -= 1 : S += d.length), M = g = n, k = _ = h, d = [n, h], C.push(d), e += 2, f = "L";
                                else if ("C" === f) d || (d = [0, 0]), p || (M = k = 0), d.push(n, h, M + +T[e + 3], k + +T[e + 4], M += +T[e + 5], k += +T[e + 6]), e += 6;
                            else if ("S" === f) m = M, v = k, ("C" === x || "S" === x) && (m += M - d[d.length - 4], v += k - d[d.length - 3]), p || (M = k = 0), d.push(m, v, n, h, M += +T[e + 3], k += +T[e + 4]), e += 4;
                            else if ("Q" === f) m = M + (n - M) * O, v = k + (h - k) * O, p || (M = k = 0), M += +T[e + 3], k += +T[e + 4], d.push(m, v, M + (n - M) * O, k + (h - k) * O, M, k), e += 4;
                            else if ("T" === f) m = M - d[d.length - 4], v = k - d[d.length - 3], d.push(M + m, k + v, n + (M + 1.5 * m - n) * O, h + (k + 1.5 * v - h) * O, M = n, k = h), e += 2;
                            else if ("H" === f) P(M, k, M = n, k), e += 1;
                            else if ("V" === f) P(M, k, M, k = n + (p ? k - M : 0)), e += 1;
                            else if ("L" === f || "Z" === f) "Z" === f && (n = g, h = _, d.closed = !0), ("L" === f || l(M - n) > .5 || l(k - h) > .5) && (P(M, k, n, h), "L" === f && (e += 2)), M = n, k = h;
                            else if ("A" === f) {
                                if (b = T[e + 4], w = T[e + 5], m = T[e + 6], v = T[e + 7], r = 7, b.length > 1 && (b.length < 3 ? (v = m, m = w, r--) : (v = w, m = b.substr(2), r -= 2), w = b.charAt(1), b = b.charAt(0)), y = function(t, e, r, n, i, s, h, f, p) {
                                        if (t !== f || e !== p) {
                                            r = l(r), n = l(n);
                                            var d = i % 360 * a,
                                                g = u(d),
                                                _ = o(d),
                                                m = Math.PI,
                                                v = 2 * m,
                                                y = (t - f) / 2,
                                                x = (e - p) / 2,
                                                b = g * y + _ * x,
                                                w = -_ * y + g * x,
                                                T = b * b,
                                                C = w * w,
                                                M = T / (r * r) + C / (n * n);
                                            M > 1 && (r = c(M) * r, n = c(M) * n);
                                            var k = r * r,
                                                O = n * n,
                                                E = (k * O - k * C - O * T) / (k * C + O * T);
                                            E < 0 && (E = 0);
                                            var S = (s === h ? -1 : 1) * c(E),
                                                A = r * w / n * S,
                                                P = -(n * b / r * S),
                                                D = (t + f) / 2 + (g * A - _ * P),
                                                R = (e + p) / 2 + (_ * A + g * P),
                                                z = (b - A) / r,
                                                F = (w - P) / n,
                                                N = (-b - A) / r,
                                                I = (-w - P) / n,
                                                B = z * z + F * F,
                                                L = (F < 0 ? -1 : 1) * Math.acos(z / c(B)),
                                                Y = (z * I - F * N < 0 ? -1 : 1) * Math.acos((z * N + F * I) / c(B * (N * N + I * I)));
                                            isNaN(Y) && (Y = m), !h && Y > 0 ? Y -= v : h && Y < 0 && (Y += v), L %= v;
                                            var X, q = Math.ceil(l(Y %= v) / (v / 4)),
                                                U = [],
                                                W = Y / q,
                                                H = 4 / 3 * o(W / 2) / (1 + u(W / 2)),
                                                V = g * r,
                                                j = _ * r,
                                                G = -(_ * n),
                                                $ = g * n;
                                            for (X = 0; X < q; X++) b = u(i = L + X * W), w = o(i), z = u(i += W), F = o(i), U.push(b - H * w, w + H * b, z + H * F, F - H * z, z, F);
                                            for (X = 0; X < U.length; X += 2) b = U[X], w = U[X + 1], U[X] = b * V + w * G + D, U[X + 1] = b * j + w * $ + R;
                                            return U[X - 2] = f, U[X - 1] = p, U
                                        }
                                    }(M, k, +T[e + 1], +T[e + 2], +T[e + 3], +b, +w, (p ? M : 0) + +m, (p ? k : 0) + +v), e += r, y)
                                    for (r = 0; r < y.length; r++) d.push(y[r]);
                                M = d[d.length - 2], k = d[d.length - 1]
                            } else console.log(A);
                            return (e = d.length) < 6 ? (C.pop(), e = 0) : d[0] === d[e - 2] && d[1] === d[e - 1] && (d.closed = !0), C.totalPoints = S + e, C
                        }(t)[0]), 4 === (n = T.length)) T.unshift(0, 0), T.push(1, 1), n = 8;
                    else if ((n - 2) % 6) throw "Invalid CustomEase";
                    for ((0 != +T[0] || 1 != +T[n - 2]) && v(T, r.height, r.originY), this.segment = T, p = 2; p < n; p += 6) h = {
                        x: +T[p - 2],
                        y: +T[p - 1]
                    }, f = {
                        x: +T[p + 4],
                        y: +T[p + 5]
                    }, M.push(h, f), y(h.x, h.y, +T[p], +T[p + 1], +T[p + 2], +T[p + 3], f.x, f.y, 1 / (2e5 * O), M, M.length - 1);
                    for (n = M.length, p = 0; p < n; p++) x = M[p], b = M[p - 1] || x, (x.x > b.x || b.y !== x.y && b.x === x.x || x === b) && x.x <= 1 ? (b.cx = x.x - b.x, b.cy = x.y - b.y, b.n = x, b.nx = x.x, E && p > 1 && Math.abs(b.cy / b.cx - M[p - 2].cy / M[p - 2].cx) > 2 && (E = 0), b.cx < C && (b.cx ? C = b.cx : (b.cx = .001, p === n - 1 && (b.x -= .001, C = Math.min(C, .001), E = 0)))) : (M.splice(p--, 1), n--);
                    if (d = 1 / (n = 1 / C + 1 | 0), m = 0, x = M[0], E) {
                        for (p = 0; p < n; p++) w = p * d, x.nx < w && (x = M[++m]), h = x.y + (w - x.x) / x.cx * x.cy, k[p] = {
                            x: w,
                            cx: d,
                            y: h,
                            cy: 0,
                            nx: 9
                        }, p && (k[p - 1].cy = h - k[p - 1].y);
                        m = M[M.length - 1], k[n - 1].cy = m.y - h, k[n - 1].cx = m.x - k[k.length - 1].x
                    } else {
                        for (p = 0; p < n; p++) x.nx < p * d && (x = M[++m]), k[p] = x;
                        m < M.length - 1 && (k[p - 1] = M[M.length - 2])
                    }
                    return this.ease = function(t) {
                        var e = k[t * n | 0] || k[n - 1];
                        return e.nx < t && (e = e.n), e.y + (t - e.x) / e.cx * e.cy
                    }, this.ease.custom = this, this.id && e && e.registerEase(this.id, this.ease), this
                }, n.getSVGData = function(e) {
                    return t.getSVGData(this, e)
                }, t.create = function(e, r, n) {
                    return new t(e, r, n).ease
                }, t.register = function(t) {
                    e = t, p()
                }, t.get = function(t) {
                    return e.parseEase(t)
                }, t.getSVGData = function(r, n) {
                    var i, s, a, o, u, l, c, f, p, g, _ = (n = n || {}).width || 100,
                        m = n.height || 100,
                        v = n.x || 0,
                        y = (n.y || 0) + m,
                        x = e.utils.toArray(n.path)[0];
                    if (n.invert && (m = -m, y = 0), "string" == typeof r && (r = e.parseEase(r)), r.custom && (r = r.custom), r instanceof t) i = function(t) {
                        "number" == typeof t[0] && (t = [t]);
                        var e, r, n, i, s = "",
                            a = t.length;
                        for (r = 0; r < a; r++) {
                            for (s += "M" + h((i = t[r])[0]) + "," + h(i[1]) + " C", e = i.length, n = 2; n < e; n++) s += h(i[n++]) + "," + h(i[n++]) + " " + h(i[n++]) + "," + h(i[n++]) + " " + h(i[n++]) + "," + h(i[n]) + " ";
                            i.closed && (s += "z")
                        }
                        return s
                    }(function(t, e, r, n, i) {
                        for (var s, a, o, u, l, c = t.length; --c > -1;)
                            for (a = (s = t[c]).length, o = 0; o < a; o += 2) u = s[o], l = s[o + 1], s[o] = u * e + 0 * l + n, s[o + 1] = 0 * u + l * r + i;
                        return t._dirty = 1, t
                    }([r.segment], _, -m, v, y));
                    else {
                        for (i = [v, y], o = 1 / (c = Math.max(5, 200 * (n.precision || 1))), c += 2, f = 5 / c, p = d(v + o * _), s = ((g = d(y + -(r(o) * m))) - y) / (p - v), a = 2; a < c; a++) u = d(v + a * o * _), (Math.abs(((l = d(y + -(r(a * o) * m))) - g) / (u - p) - s) > f || a === c - 1) && (i.push(p, g), s = (l - g) / (u - p)), p = u, g = l;
                        i = "M" + i.join(",")
                    }
                    return x && x.setAttribute("d", i), i
                }, t
            }();
        x.version = "3.13.0", x.headless = !0, f() && e.registerPlugin(x), t.s(["f", 0, x], 63208);
        var b, w, T, C, M, k, O, E, S, A, P, D, R, z = function() {
                return b || "u" > typeof window && (b = window.gsap) && b.registerPlugin && b
            },
            F = 1,
            N = [],
            I = [],
            B = [],
            L = Date.now,
            Y = function(t, e) {
                return e
            },
            X = function() {
                var t = S.core,
                    e = t.bridge || {},
                    r = t._scrollers,
                    n = t._proxies;
                r.push.apply(r, I), n.push.apply(n, B), I = r, B = n, Y = function(t, r) {
                    return e[t](r)
                }
            },
            q = function(t, e) {
                return ~B.indexOf(t) && B[B.indexOf(t) + 1][e]
            },
            U = function(t) {
                return !!~A.indexOf(t)
            },
            W = function(t, e, r, n, i) {
                return t.addEventListener(e, r, {
                    passive: !1 !== n,
                    capture: !!i
                })
            },
            H = function(t, e, r, n) {
                return t.removeEventListener(e, r, !!n)
            },
            V = "scrollLeft",
            j = "scrollTop",
            G = function() {
                return P && P.isPressed || I.cache++
            },
            $ = function(t, e) {
                var r = function r(n) {
                    if (n || 0 === n) {
                        F && (T.history.scrollRestoration = "manual");
                        var i = P && P.isPressed;
                        t(n = r.v = Math.round(n) || (P && P.iOS ? 1 : 0)), r.cacheID = I.cache, i && Y("ss", n)
                    } else(e || I.cache !== r.cacheID || Y("ref")) && (r.cacheID = I.cache, r.v = t());
                    return r.v + r.offset
                };
                return r.offset = 0, t && r
            },
            Q = {
                s: V,
                p: "left",
                p2: "Left",
                os: "right",
                os2: "Right",
                d: "width",
                d2: "Width",
                a: "x",
                sc: $(function(t) {
                    return arguments.length ? T.scrollTo(t, Z.sc()) : T.pageXOffset || C[V] || M[V] || k[V] || 0
                })
            },
            Z = {
                s: j,
                p: "top",
                p2: "Top",
                os: "bottom",
                os2: "Bottom",
                d: "height",
                d2: "Height",
                a: "y",
                op: Q,
                sc: $(function(t) {
                    return arguments.length ? T.scrollTo(Q.sc(), t) : T.pageYOffset || C[j] || M[j] || k[j] || 0
                })
            },
            K = function(t, e) {
                return (e && e._ctx && e._ctx.selector || b.utils.toArray)(t)[0] || ("string" == typeof t && !1 !== b.config().nullTargetWarn ? console.warn("Element not found:", t) : null)
            },
            J = function(t, e) {
                for (var r = e.length; r--;)
                    if (e[r] === t || e[r].contains(t)) return !0;
                return !1
            },
            tt = function(t, e) {
                var r = e.s,
                    n = e.sc;
                U(t) && (t = C.scrollingElement || M);
                var i = I.indexOf(t),
                    s = n === Z.sc ? 1 : 2;
                ~i || (i = I.push(t) - 1), I[i + s] || W(t, "scroll", G);
                var a = I[i + s],
                    o = a || (I[i + s] = $(q(t, r), !0) || (U(t) ? n : $(function(e) {
                        return arguments.length ? t[r] = e : t[r]
                    })));
                return o.target = t, a || (o.smooth = "smooth" === b.getProperty(t, "scrollBehavior")), o
            },
            te = function(t, e, r) {
                var n = t,
                    i = t,
                    s = L(),
                    a = s,
                    o = e || 50,
                    u = Math.max(500, 3 * o),
                    l = function(t, e) {
                        var u = L();
                        e || u - s > o ? (i = n, n = t, a = s, s = u) : r ? n += t : n = i + (t - i) / (u - a) * (s - a)
                    };
                return {
                    update: l,
                    reset: function() {
                        i = n = r ? 0 : n, a = s = 0
                    },
                    getVelocity: function(t) {
                        var e = a,
                            o = i,
                            c = L();
                        return (t || 0 === t) && t !== n && l(t), s === a || c - a > u ? 0 : (n + (r ? o : -o)) / ((r ? c : s) - e) * 1e3
                    }
                }
            },
            tr = function(t, e) {
                return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t
            },
            tn = function(t) {
                var e = Math.max.apply(Math, t),
                    r = Math.min.apply(Math, t);
                return Math.abs(e) >= Math.abs(r) ? e : r
            },
            ti = function() {
                (S = b.core.globals().ScrollTrigger) && S.core && X()
            },
            ts = function(t) {
                return b = t || z(), !w && b && "u" > typeof document && document.body && (T = window, M = (C = document).documentElement, k = C.body, A = [T, C, M, k], b.utils.clamp, R = b.core.context || function() {}, E = "onpointerenter" in k ? "pointer" : "mouse", O = ta.isTouch = T.matchMedia && T.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : 2 * ("ontouchstart" in T || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), D = ta.eventTypes = ("ontouchstart" in M ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in M) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(","), setTimeout(function() {
                    return F = 0
                }, 500), ti(), w = 1), w
            };
        Q.op = Z, I.cache = 0;
        var ta = function() {
            var t;

            function e(t) {
                this.init(t)
            }
            return e.prototype.init = function(t) {
                    w || ts(b) || console.warn("Please gsap.registerPlugin(Observer)"), S || ti();
                    var e = t.tolerance,
                        r = t.dragMinimum,
                        n = t.type,
                        i = t.target,
                        s = t.lineHeight,
                        a = t.debounce,
                        o = t.preventDefault,
                        u = t.onStop,
                        l = t.onStopDelay,
                        c = t.ignore,
                        h = t.wheelSpeed,
                        f = t.event,
                        p = t.onDragStart,
                        d = t.onDragEnd,
                        g = t.onDrag,
                        _ = t.onPress,
                        m = t.onRelease,
                        v = t.onRight,
                        y = t.onLeft,
                        x = t.onUp,
                        A = t.onDown,
                        z = t.onChangeX,
                        F = t.onChangeY,
                        I = t.onChange,
                        B = t.onToggleX,
                        Y = t.onToggleY,
                        X = t.onHover,
                        q = t.onHoverEnd,
                        V = t.onMove,
                        j = t.ignoreCheck,
                        $ = t.isNormalizer,
                        ta = t.onGestureStart,
                        to = t.onGestureEnd,
                        tu = t.onWheel,
                        tl = t.onEnable,
                        tc = t.onDisable,
                        th = t.onClick,
                        tf = t.scrollSpeed,
                        tp = t.capture,
                        td = t.allowClicks,
                        tg = t.lockAxis,
                        t_ = t.onLockAxis;
                    this.target = i = K(i) || M, this.vars = t, c && (c = b.utils.toArray(c)), e = e || 1e-9, r = r || 0, h = h || 1, tf = tf || 1, n = n || "wheel,touch,pointer", a = !1 !== a, s || (s = parseFloat(T.getComputedStyle(k).lineHeight) || 22);
                    var tm, tv, ty, tx, tb, tw, tT, tC = this,
                        tM = 0,
                        tk = 0,
                        tO = t.passive || !o && !1 !== t.passive,
                        tE = tt(i, Q),
                        tS = tt(i, Z),
                        tA = tE(),
                        tP = tS(),
                        tD = ~n.indexOf("touch") && !~n.indexOf("pointer") && "pointerdown" === D[0],
                        tR = U(i),
                        tz = i.ownerDocument || C,
                        tF = [0, 0, 0],
                        tN = [0, 0, 0],
                        tI = 0,
                        tB = function() {
                            return tI = L()
                        },
                        tL = function(t, e) {
                            return (tC.event = t) && c && J(t.target, c) || e && tD && "touch" !== t.pointerType || j && j(t, e)
                        },
                        tY = function() {
                            var t = tC.deltaX = tn(tF),
                                r = tC.deltaY = tn(tN),
                                n = Math.abs(t) >= e,
                                i = Math.abs(r) >= e;
                            I && (n || i) && I(tC, t, r, tF, tN), n && (v && tC.deltaX > 0 && v(tC), y && tC.deltaX < 0 && y(tC), z && z(tC), B && tC.deltaX < 0 != tM < 0 && B(tC), tM = tC.deltaX, tF[0] = tF[1] = tF[2] = 0), i && (A && tC.deltaY > 0 && A(tC), x && tC.deltaY < 0 && x(tC), F && F(tC), Y && tC.deltaY < 0 != tk < 0 && Y(tC), tk = tC.deltaY, tN[0] = tN[1] = tN[2] = 0), (tx || ty) && (V && V(tC), ty && (p && 1 === ty && p(tC), g && g(tC), ty = 0), tx = !1), tw && (tw = !1, 1) && t_ && t_(tC), tb && (tu(tC), tb = !1), tm = 0
                        },
                        tX = function(t, e, r) {
                            tF[r] += t, tN[r] += e, tC._vx.update(t), tC._vy.update(e), a ? tm || (tm = requestAnimationFrame(tY)) : tY()
                        },
                        tq = function(t, e) {
                            tg && !tT && (tC.axis = tT = Math.abs(t) > Math.abs(e) ? "x" : "y", tw = !0), "y" !== tT && (tF[2] += t, tC._vx.update(t, !0)), "x" !== tT && (tN[2] += e, tC._vy.update(e, !0)), a ? tm || (tm = requestAnimationFrame(tY)) : tY()
                        },
                        tU = function(t) {
                            if (!tL(t, 1)) {
                                var e = (t = tr(t, o)).clientX,
                                    n = t.clientY,
                                    i = e - tC.x,
                                    s = n - tC.y,
                                    a = tC.isDragging;
                                tC.x = e, tC.y = n, (a || (i || s) && (Math.abs(tC.startX - e) >= r || Math.abs(tC.startY - n) >= r)) && (ty = a ? 2 : 1, a || (tC.isDragging = !0), tq(i, s))
                            }
                        },
                        tW = tC.onPress = function(t) {
                            tL(t, 1) || t && t.button || (tC.axis = tT = null, tv.pause(), tC.isPressed = !0, t = tr(t), tM = tk = 0, tC.startX = tC.x = t.clientX, tC.startY = tC.y = t.clientY, tC._vx.reset(), tC._vy.reset(), W($ ? i : tz, D[1], tU, tO, !0), tC.deltaX = tC.deltaY = 0, _ && _(tC))
                        },
                        tH = tC.onRelease = function(t) {
                            if (!tL(t, 1)) {
                                H($ ? i : tz, D[1], tU, !0);
                                var e = !isNaN(tC.y - tC.startY),
                                    r = tC.isDragging,
                                    n = r && (Math.abs(tC.x - tC.startX) > 3 || Math.abs(tC.y - tC.startY) > 3),
                                    s = tr(t);
                                !n && e && (tC._vx.reset(), tC._vy.reset(), o && td && b.delayedCall(.08, function() {
                                    if (L() - tI > 300 && !t.defaultPrevented) {
                                        if (t.target.click) t.target.click();
                                        else if (tz.createEvent) {
                                            var e = tz.createEvent("MouseEvents");
                                            e.initMouseEvent("click", !0, !0, T, 1, s.screenX, s.screenY, s.clientX, s.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(e)
                                        }
                                    }
                                })), tC.isDragging = tC.isGesturing = tC.isPressed = !1, u && r && !$ && tv.restart(!0), ty && tY(), d && r && d(tC), m && m(tC, n)
                            }
                        },
                        tV = function(t) {
                            return t.touches && t.touches.length > 1 && (tC.isGesturing = !0) && ta(t, tC.isDragging)
                        },
                        tj = function() {
                            return tC.isGesturing = !1, to(tC)
                        },
                        tG = function(t) {
                            if (!tL(t)) {
                                var e = tE(),
                                    r = tS();
                                tX((e - tA) * tf, (r - tP) * tf, 1), tA = e, tP = r, u && tv.restart(!0)
                            }
                        },
                        t$ = function(t) {
                            if (!tL(t)) {
                                t = tr(t, o), tu && (tb = !0);
                                var e = (1 === t.deltaMode ? s : 2 === t.deltaMode ? T.innerHeight : 1) * h;
                                tX(t.deltaX * e, t.deltaY * e, 0), u && !$ && tv.restart(!0)
                            }
                        },
                        tQ = function(t) {
                            if (!tL(t)) {
                                var e = t.clientX,
                                    r = t.clientY,
                                    n = e - tC.x,
                                    i = r - tC.y;
                                tC.x = e, tC.y = r, tx = !0, u && tv.restart(!0), (n || i) && tq(n, i)
                            }
                        },
                        tZ = function(t) {
                            tC.event = t, X(tC)
                        },
                        tK = function(t) {
                            tC.event = t, q(tC)
                        },
                        tJ = function(t) {
                            return tL(t) || tr(t, o) && th(tC)
                        };
                    tv = tC._dc = b.delayedCall(l || .25, function() {
                        tC._vx.reset(), tC._vy.reset(), tv.pause(), u && u(tC)
                    }).pause(), tC.deltaX = tC.deltaY = 0, tC._vx = te(0, 50, !0), tC._vy = te(0, 50, !0), tC.scrollX = tE, tC.scrollY = tS, tC.isDragging = tC.isGesturing = tC.isPressed = !1, R(this), tC.enable = function(t) {
                        return !tC.isEnabled && (W(tR ? tz : i, "scroll", G), n.indexOf("scroll") >= 0 && W(tR ? tz : i, "scroll", tG, tO, tp), n.indexOf("wheel") >= 0 && W(i, "wheel", t$, tO, tp), (n.indexOf("touch") >= 0 && O || n.indexOf("pointer") >= 0) && (W(i, D[0], tW, tO, tp), W(tz, D[2], tH), W(tz, D[3], tH), td && W(i, "click", tB, !0, !0), th && W(i, "click", tJ), ta && W(tz, "gesturestart", tV), to && W(tz, "gestureend", tj), X && W(i, E + "enter", tZ), q && W(i, E + "leave", tK), V && W(i, E + "move", tQ)), tC.isEnabled = !0, tC.isDragging = tC.isGesturing = tC.isPressed = tx = ty = !1, tC._vx.reset(), tC._vy.reset(), tA = tE(), tP = tS(), t && t.type && tW(t), tl && tl(tC)), tC
                    }, tC.disable = function() {
                        tC.isEnabled && (N.filter(function(t) {
                            return t !== tC && U(t.target)
                        }).length || H(tR ? tz : i, "scroll", G), tC.isPressed && (tC._vx.reset(), tC._vy.reset(), H($ ? i : tz, D[1], tU, !0)), H(tR ? tz : i, "scroll", tG, tp), H(i, "wheel", t$, tp), H(i, D[0], tW, tp), H(tz, D[2], tH), H(tz, D[3], tH), H(i, "click", tB, !0), H(i, "click", tJ), H(tz, "gesturestart", tV), H(tz, "gestureend", tj), H(i, E + "enter", tZ), H(i, E + "leave", tK), H(i, E + "move", tQ), tC.isEnabled = tC.isPressed = tC.isDragging = !1, tc && tc(tC))
                    }, tC.kill = tC.revert = function() {
                        tC.disable();
                        var t = N.indexOf(tC);
                        t >= 0 && N.splice(t, 1), P === tC && (P = 0)
                    }, N.push(tC), $ && U(i) && (P = tC), tC.enable(f)
                }, t = [{
                    key: "velocityX",
                    get: function() {
                        return this._vx.getVelocity()
                    }
                }, {
                    key: "velocityY",
                    get: function() {
                        return this._vy.getVelocity()
                    }
                }],
                function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(e.prototype, t), e
        }();
        ta.version = "3.13.0", ta.create = function(t) {
            return new ta(t)
        }, ta.register = ts, ta.getAll = function() {
            return N.slice()
        }, ta.getById = function(t) {
            return N.filter(function(e) {
                return e.vars.id === t
            })[0]
        }, z() && b.registerPlugin(ta);
        var to, tu, tl, tc, th, tf, tp, td, tg, t_, tm, tv, ty, tx, tb, tw, tT, tC, tM, tk, tO, tE, tS, tA, tP, tD, tR, tz, tF, tN, tI, tB, tL, tY, tX, tq, tU, tW, tH = 1,
            tV = Date.now,
            tj = tV(),
            tG = 0,
            t$ = 0,
            tQ = function(t, e, r) {
                var n = et(t) && ("clamp(" === t.substr(0, 6) || t.indexOf("max") > -1);
                return r["_" + e + "Clamp"] = n, n ? t.substr(6, t.length - 7) : t
            },
            tZ = function(t, e) {
                return e && (!et(t) || "clamp(" !== t.substr(0, 6)) ? "clamp(" + t + ")" : t
            },
            tK = function() {
                return tx = 1
            },
            tJ = function() {
                return tx = 0
            },
            t0 = function(t) {
                return t
            },
            t1 = function(t) {
                return Math.round(1e5 * t) / 1e5 || 0
            },
            t2 = function() {
                return "u" > typeof window
            },
            t5 = function() {
                return to || t2() && (to = window.gsap) && to.registerPlugin && to
            },
            t3 = function(t) {
                return !!~tp.indexOf(t)
            },
            t8 = function(t) {
                return ("Height" === t ? tI : tl["inner" + t]) || th["client" + t] || tf["client" + t]
            },
            t4 = function(t) {
                return q(t, "getBoundingClientRect") || (t3(t) ? function() {
                    return rr.width = tl.innerWidth, rr.height = tI, rr
                } : function() {
                    return ew(t)
                })
            },
            t6 = function(t, e, r) {
                var n = r.d,
                    i = r.d2,
                    s = r.a;
                return (s = q(t, "getBoundingClientRect")) ? function() {
                    return s()[n]
                } : function() {
                    return (e ? t8(i) : t["client" + i]) || 0
                }
            },
            t7 = function(t, e) {
                var r = e.s,
                    n = e.d2,
                    i = e.d,
                    s = e.a;
                return Math.max(0, (s = q(t, r = "scroll" + n)) ? s() - t4(t)()[i] : t3(t) ? (th[r] || tf[r]) - t8(n) : t[r] - t["offset" + n])
            },
            t9 = function(t, e) {
                for (var r = 0; r < tM.length; r += 3)(!e || ~e.indexOf(tM[r + 1])) && t(tM[r], tM[r + 1], tM[r + 2])
            },
            et = function(t) {
                return "string" == typeof t
            },
            ee = function(t) {
                return "function" == typeof t
            },
            er = function(t) {
                return "number" == typeof t
            },
            en = function(t) {
                return "object" == typeof t
            },
            ei = function(t, e, r) {
                return t && t.progress(+!e) && r && t.pause()
            },
            es = function(t, e) {
                if (t.enabled) {
                    var r = t._ctx ? t._ctx.add(function() {
                        return e(t)
                    }) : e(t);
                    r && r.totalTime && (t.callbackAnimation = r)
                }
            },
            ea = Math.abs,
            eo = "left",
            eu = "right",
            el = "bottom",
            ec = "width",
            eh = "height",
            ef = "Right",
            ep = "Left",
            ed = "Bottom",
            eg = "padding",
            e_ = "margin",
            em = "Width",
            ev = "Height",
            ey = function(t) {
                return tl.getComputedStyle(t)
            },
            ex = function(t) {
                var e = ey(t).position;
                t.style.position = "absolute" === e || "fixed" === e ? e : "relative"
            },
            eb = function(t, e) {
                for (var r in e) r in t || (t[r] = e[r]);
                return t
            },
            ew = function(t, e) {
                var r = e && "matrix(1, 0, 0, 1, 0, 0)" !== ey(t)[tb] && to.to(t, {
                        x: 0,
                        y: 0,
                        xPercent: 0,
                        yPercent: 0,
                        rotation: 0,
                        rotationX: 0,
                        rotationY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0
                    }).progress(1),
                    n = t.getBoundingClientRect();
                return r && r.progress(0).kill(), n
            },
            eT = function(t, e) {
                var r = e.d2;
                return t["offset" + r] || t["client" + r] || 0
            },
            eC = function(t) {
                var e, r = [],
                    n = t.labels,
                    i = t.duration();
                for (e in n) r.push(n[e] / i);
                return r
            },
            eM = function(t) {
                var e = to.utils.snap(t),
                    r = Array.isArray(t) && t.slice(0).sort(function(t, e) {
                        return t - e
                    });
                return r ? function(t, n, i) {
                    var s;
                    if (void 0 === i && (i = .001), !n) return e(t);
                    if (n > 0) {
                        for (t -= i, s = 0; s < r.length; s++)
                            if (r[s] >= t) return r[s];
                        return r[s - 1]
                    }
                    for (s = r.length, t += i; s--;)
                        if (r[s] <= t) return r[s];
                    return r[0]
                } : function(r, n, i) {
                    void 0 === i && (i = .001);
                    var s = e(r);
                    return !n || Math.abs(s - r) < i || s - r < 0 == n < 0 ? s : e(n < 0 ? r - t : r + t)
                }
            },
            ek = function(t, e, r, n) {
                return r.split(",").forEach(function(r) {
                    return t(e, r, n)
                })
            },
            eO = function(t, e, r, n, i) {
                return t.addEventListener(e, r, {
                    passive: !n,
                    capture: !!i
                })
            },
            eE = function(t, e, r, n) {
                return t.removeEventListener(e, r, !!n)
            },
            eS = function(t, e, r) {
                (r = r && r.wheelHandler) && (t(e, "wheel", r), t(e, "touchmove", r))
            },
            eA = {
                startColor: "green",
                endColor: "red",
                indent: 0,
                fontSize: "16px",
                fontWeight: "normal"
            },
            eP = {
                toggleActions: "play",
                anticipatePin: 0
            },
            eD = {
                top: 0,
                left: 0,
                center: .5,
                bottom: 1,
                right: 1
            },
            eR = function(t, e) {
                if (et(t)) {
                    var r = t.indexOf("="),
                        n = ~r ? (t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0;
                    ~r && (t.indexOf("%") > r && (n *= e / 100), t = t.substr(0, r - 1)), t = n + (t in eD ? eD[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0)
                }
                return t
            },
            ez = function(t, e, r, n, i, s, a, o) {
                var u = i.startColor,
                    l = i.endColor,
                    c = i.fontSize,
                    h = i.indent,
                    f = i.fontWeight,
                    p = tc.createElement("div"),
                    d = t3(r) || "fixed" === q(r, "pinType"),
                    g = -1 !== t.indexOf("scroller"),
                    _ = d ? tf : r,
                    m = -1 !== t.indexOf("start"),
                    v = m ? u : l,
                    y = "border-color:" + v + ";font-size:" + c + ";color:" + v + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
                return y += "position:" + ((g || o) && d ? "fixed;" : "absolute;"), (g || o || !d) && (y += (n === Z ? eu : el) + ":" + (s + parseFloat(h)) + "px;"), a && (y += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), p._isStart = m, p.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), p.style.cssText = y, p.innerText = e || 0 === e ? t + "-" + e : t, _.children[0] ? _.insertBefore(p, _.children[0]) : _.appendChild(p), p._offset = p["offset" + n.op.d2], eF(p, 0, n, m), p
            },
            eF = function(t, e, r, n) {
                var i = {
                        display: "block"
                    },
                    s = r[n ? "os2" : "p2"],
                    a = r[n ? "p2" : "os2"];
                t._isFlipped = n, i[r.a + "Percent"] = n ? -100 : 0, i[r.a] = n ? "1px" : 0, i["border" + s + em] = 1, i["border" + a + em] = 0, i[r.p] = e + "px", to.set(t, i)
            },
            eN = [],
            eI = {},
            eB = function() {
                return tV() - tG > 34 && (tX || (tX = requestAnimationFrame(e5)))
            },
            eL = function() {
                tS && tS.isPressed && !(tS.startX > tf.clientWidth) || (I.cache++, tS ? tX || (tX = requestAnimationFrame(e5)) : e5(), tG || eH("scrollStart"), tG = tV())
            },
            eY = function() {
                tD = tl.innerWidth, tP = tl.innerHeight
            },
            eX = function(t) {
                I.cache++, (!0 === t || !ty && !tE && !tc.fullscreenElement && !tc.webkitFullscreenElement && (!tA || tD !== tl.innerWidth || Math.abs(tl.innerHeight - tP) > .25 * tl.innerHeight)) && td.restart(!0)
            },
            eq = {},
            eU = [],
            eW = function t() {
                return eE(rl, "scrollEnd", t) || e0(!0)
            },
            eH = function(t) {
                return eq[t] && eq[t].map(function(t) {
                    return t()
                }) || eU
            },
            eV = [],
            ej = function(t) {
                for (var e = 0; e < eV.length; e += 5)(!t || eV[e + 4] && eV[e + 4].query === t) && (eV[e].style.cssText = eV[e + 1], eV[e].getBBox && eV[e].setAttribute("transform", eV[e + 2] || ""), eV[e + 3].uncache = 1)
            },
            eG = function(t, e) {
                var r;
                for (tw = 0; tw < eN.length; tw++)(r = eN[tw]) && (!e || r._ctx === e) && (t ? r.kill(1) : r.revert(!0, !0));
                tB = !0, e && ej(e), e || eH("revert")
            },
            e$ = function(t, e) {
                I.cache++, (e || !tq) && I.forEach(function(t) {
                    return ee(t) && t.cacheID++ && (t.rec = 0)
                }), et(t) && (tl.history.scrollRestoration = tF = t)
            },
            eQ = 0,
            eZ = function() {
                if (tU !== eQ) {
                    var t = tU = eQ;
                    requestAnimationFrame(function() {
                        return t === eQ && e0(!0)
                    })
                }
            },
            eK = function() {
                tf.appendChild(tN), tI = !tS && tN.offsetHeight || tl.innerHeight, tf.removeChild(tN)
            },
            eJ = function(t) {
                return tg(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
                    return e.style.display = t ? "none" : "block"
                })
            },
            e0 = function(t, e) {
                if (th = tc.documentElement, tf = tc.body, tp = [tl, tc, th, tf], tG && !t && !tB) return void eO(rl, "scrollEnd", eW);
                eK(), tq = rl.isRefreshing = !0, I.forEach(function(t) {
                    return ee(t) && ++t.cacheID && (t.rec = t())
                });
                var r = eH("refreshInit");
                tk && rl.sort(), e || eG(), I.forEach(function(t) {
                    ee(t) && (t.smooth && (t.target.style.scrollBehavior = "auto"), t(0))
                }), eN.slice(0).forEach(function(t) {
                    return t.refresh()
                }), tB = !1, eN.forEach(function(t) {
                    if (t._subPinOffset && t.pin) {
                        var e = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
                            r = t.pin[e];
                        t.revert(!0, 1), t.adjustPinSpacing(t.pin[e] - r), t.refresh()
                    }
                }), tL = 1, eJ(!0), eN.forEach(function(t) {
                    var e = t7(t.scroller, t._dir),
                        r = "max" === t.vars.end || t._endClamp && t.end > e,
                        n = t._startClamp && t.start >= e;
                    (r || n) && t.setPositions(n ? e - 1 : t.start, r ? Math.max(n ? e : t.start + 1, e) : t.end, !0)
                }), eJ(!1), tL = 0, r.forEach(function(t) {
                    return t && t.render && t.render(-1)
                }), I.forEach(function(t) {
                    ee(t) && (t.smooth && requestAnimationFrame(function() {
                        return t.target.style.scrollBehavior = "smooth"
                    }), t.rec && t(t.rec))
                }), e$(tF, 1), td.pause(), eQ++, tq = 2, e5(2), eN.forEach(function(t) {
                    return ee(t.vars.onRefresh) && t.vars.onRefresh(t)
                }), tq = rl.isRefreshing = !1, eH("refresh")
            },
            e1 = 0,
            e2 = 1,
            e5 = function(t) {
                if (2 === t || !tq && !tB) {
                    rl.isUpdating = !0, tW && tW.update(0);
                    var e = eN.length,
                        r = tV(),
                        n = r - tj >= 50,
                        i = e && eN[0].scroll();
                    if (e2 = e1 > i ? -1 : 1, tq || (e1 = i), n && (tG && !tx && r - tG > 200 && (tG = 0, eH("scrollEnd")), tm = tj, tj = r), e2 < 0) {
                        for (tw = e; tw-- > 0;) eN[tw] && eN[tw].update(0, n);
                        e2 = 1
                    } else
                        for (tw = 0; tw < e; tw++) eN[tw] && eN[tw].update(0, n);
                    rl.isUpdating = !1
                }
                tX = 0
            },
            e3 = [eo, "top", el, eu, e_ + ed, e_ + ef, e_ + "Top", e_ + ep, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
            e8 = e3.concat([ec, eh, "boxSizing", "max" + em, "max" + ev, "position", e_, eg, eg + "Top", eg + ef, eg + ed, eg + ep]),
            e4 = function(t, e, r) {
                e9(r);
                var n = t._gsap;
                if (n.spacerIsNative) e9(n.spacerState);
                else if (t._gsap.swappedIn) {
                    var i = e.parentNode;
                    i && (i.insertBefore(t, e), i.removeChild(e))
                }
                t._gsap.swappedIn = !1
            },
            e6 = function(t, e, r, n) {
                if (!t._gsap.swappedIn) {
                    for (var i, s = e3.length, a = e.style, o = t.style; s--;) a[i = e3[s]] = r[i];
                    a.position = "absolute" === r.position ? "absolute" : "relative", "inline" === r.display && (a.display = "inline-block"), o[el] = o[eu] = "auto", a.flexBasis = r.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[ec] = eT(t, Q) + "px", a[eh] = eT(t, Z) + "px", a[eg] = o[e_] = o.top = o[eo] = "0", e9(n), o[ec] = o["max" + em] = r[ec], o[eh] = o["max" + ev] = r[eh], o[eg] = r[eg], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0
                }
            },
            e7 = /([A-Z])/g,
            e9 = function(t) {
                if (t) {
                    var e, r, n = t.t.style,
                        i = t.length,
                        s = 0;
                    for ((t.t._gsap || to.core.getCache(t.t)).uncache = 1; s < i; s += 2) r = t[s + 1], e = t[s], r ? n[e] = r : n[e] && n.removeProperty(e.replace(e7, "-$1").toLowerCase())
                }
            },
            rt = function(t) {
                for (var e = e8.length, r = t.style, n = [], i = 0; i < e; i++) n.push(e8[i], r[e8[i]]);
                return n.t = t, n
            },
            re = function(t, e, r) {
                for (var n, i = [], s = t.length, a = 8 * !!r; a < s; a += 2) n = t[a], i.push(n, n in e ? e[n] : t[a + 1]);
                return i.t = t.t, i
            },
            rr = {
                left: 0,
                top: 0
            },
            rn = function(t, e, r, n, i, s, a, o, u, l, c, h, f, p) {
                ee(t) && (t = t(o)), et(t) && "max" === t.substr(0, 3) && (t = h + ("=" === t.charAt(4) ? eR("0" + t.substr(3), r) : 0));
                var d, g, _, m = f ? f.time() : 0;
                if (f && f.seek(0), isNaN(t) || (t *= 1), er(t)) f && (t = to.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, h, t)), a && eF(a, r, n, !0);
                else {
                    ee(e) && (e = e(o));
                    var v, y, x, b, w = (t || "0").split(" ");
                    (v = ew(_ = K(e, o) || tf) || {}).left || v.top || "none" !== ey(_).display || (b = _.style.display, _.style.display = "block", v = ew(_), b ? _.style.display = b : _.style.removeProperty("display")), y = eR(w[0], v[n.d]), x = eR(w[1] || "0", r), t = v[n.p] - u[n.p] - l + y + i - x, a && eF(a, x, n, r - x < 20 || a._isStart && x > 20), r -= r - x
                }
                if (p && (o[p] = t || -.001, t < 0 && (t = 0)), s) {
                    var T = t + r,
                        C = s._isStart;
                    d = "scroll" + n.d2, eF(s, T, n, C && T > 20 || !C && (c ? Math.max(tf[d], th[d]) : s.parentNode[d]) <= T + 1), c && (u = ew(a), c && (s.style[n.op.p] = u[n.op.p] - n.op.m - s._offset + "px"))
                }
                return f && _ && (d = ew(_), f.seek(h), g = ew(_), f._caScrollDist = d[n.p] - g[n.p], t = t / f._caScrollDist * h), f && f.seek(m), f ? t : Math.round(t)
            },
            ri = /(webkit|moz|length|cssText|inset)/i,
            rs = function(t, e, r, n) {
                if (t.parentNode !== e) {
                    var i, s, a = t.style;
                    if (e === tf) {
                        for (i in t._stOrig = a.cssText, s = ey(t)) + i || ri.test(i) || !s[i] || "string" != typeof a[i] || "0" === i || (a[i] = s[i]);
                        a.top = r, a.left = n
                    } else a.cssText = t._stOrig;
                    to.core.getCache(t).uncache = 1, e.appendChild(t)
                }
            },
            ra = function(t, e, r) {
                var n = e,
                    i = n;
                return function(e) {
                    var s = Math.round(t());
                    return s !== n && s !== i && Math.abs(s - n) > 3 && Math.abs(s - i) > 3 && (e = s, r && r()), i = n, n = Math.round(e)
                }
            },
            ro = function(t, e, r) {
                var n = {};
                n[e.p] = "+=" + r, to.set(t, n)
            },
            ru = function(t, e) {
                var r = tt(t, e),
                    n = "_scroll" + e.p2,
                    i = function e(i, s, a, o, u) {
                        var l = e.tween,
                            c = s.onComplete,
                            h = {};
                        a = a || r();
                        var f = ra(r, a, function() {
                            l.kill(), e.tween = 0
                        });
                        return u = o && u || 0, o = o || i - a, l && l.kill(), s[n] = i, s.inherit = !1, s.modifiers = h, h[n] = function() {
                            return f(a + o * l.ratio + u * l.ratio * l.ratio)
                        }, s.onUpdate = function() {
                            I.cache++, e.tween && e5()
                        }, s.onComplete = function() {
                            e.tween = 0, c && c.call(l)
                        }, l = e.tween = to.to(t, s)
                    };
                return t[n] = r, r.wheelHandler = function() {
                    return i.tween && i.tween.kill() && (i.tween = 0)
                }, eO(t, "wheel", r.wheelHandler), rl.isTouch && eO(t, "touchmove", r.wheelHandler), i
            },
            rl = function() {
                function t(e, r) {
                    tu || t.register(to) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), tz(this), this.init(e, r)
                }
                return t.prototype.init = function(e, r) {
                    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !t$) {
                        this.update = this.refresh = this.kill = t0;
                        return
                    }
                    var n, i, s, a, o, u, l, c, h, f, p, d, g, _, m, v, y, x, b, w, T, C, M, k, O, E, S, A, P, D, R, z, F, N, L, Y, X, U, W, H, V, j = e = eb(et(e) || er(e) || e.nodeType ? {
                            trigger: e
                        } : e, eP),
                        G = j.onUpdate,
                        $ = j.toggleClass,
                        J = j.id,
                        te = j.onToggle,
                        tr = j.onRefresh,
                        tn = j.scrub,
                        ti = j.trigger,
                        ts = j.pin,
                        ta = j.pinSpacing,
                        tu = j.invalidateOnRefresh,
                        tp = j.anticipatePin,
                        td = j.onScrubComplete,
                        tv = j.onSnapComplete,
                        tb = j.once,
                        tT = j.snap,
                        tC = j.pinReparent,
                        tM = j.pinSpacer,
                        tE = j.containerAnimation,
                        tS = j.fastScrollEnd,
                        tA = j.preventOverlaps,
                        tP = e.horizontal || e.containerAnimation && !1 !== e.horizontal ? Q : Z,
                        tD = !tn && 0 !== tn,
                        tR = K(e.scroller || tl),
                        tz = to.core.getCache(tR),
                        tF = t3(tR),
                        tN = ("pinType" in e ? e.pinType : q(tR, "pinType") || tF && "fixed") === "fixed",
                        tI = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
                        tB = tD && e.toggleActions.split(" "),
                        tX = "markers" in e ? e.markers : eP.markers,
                        tU = tF ? 0 : parseFloat(ey(tR)["border" + tP.p2 + em]) || 0,
                        tj = this,
                        tK = e.onRefreshInit && function() {
                            return e.onRefreshInit(tj)
                        },
                        tJ = t6(tR, tF, tP),
                        t2 = !tF || ~B.indexOf(tR) ? t4(tR) : function() {
                            return rr
                        },
                        t5 = 0,
                        t8 = 0,
                        t9 = 0,
                        eo = tt(tR, tP);
                    if (tj._startClamp = tj._endClamp = !1, tj._dir = tP, tp *= 45, tj.scroller = tR, tj.scroll = tE ? tE.time.bind(tE) : eo, u = eo(), tj.vars = e, r = r || e.animation, "refreshPriority" in e && (tk = 1, -9999 === e.refreshPriority && (tW = tj)), tz.tweenScroll = tz.tweenScroll || {
                            top: ru(tR, Z),
                            left: ru(tR, Q)
                        }, tj.tweenTo = s = tz.tweenScroll[tP.p], tj.scrubDuration = function(t) {
                            (L = er(t) && t) ? N ? N.duration(t) : N = to.to(r, {
                                ease: "expo",
                                totalProgress: "+=0",
                                inherit: !1,
                                duration: L,
                                paused: !0,
                                onComplete: function() {
                                    return td && td(tj)
                                }
                            }): (N && N.progress(1).kill(), N = 0)
                        }, r && (r.vars.lazy = !1, r._initted && !tj.isReverted || !1 !== r.vars.immediateRender && !1 !== e.immediateRender && r.duration() && r.render(0, !0, !0), tj.animation = r.pause(), r.scrollTrigger = tj, tj.scrubDuration(tn), z = 0, J || (J = r.vars.id)), tT && ((!en(tT) || tT.push) && (tT = {
                            snapTo: tT
                        }), "scrollBehavior" in tf.style && to.set(tF ? [tf, th] : tR, {
                            scrollBehavior: "auto"
                        }), I.forEach(function(t) {
                            return ee(t) && t.target === (tF ? tc.scrollingElement || th : tR) && (t.smooth = !1)
                        }), o = ee(tT.snapTo) ? tT.snapTo : "labels" === tT.snapTo ? (n = r, function(t) {
                            return to.utils.snap(eC(n), t)
                        }) : "labelsDirectional" === tT.snapTo ? (i = r, function(t, e) {
                            return eM(eC(i))(t, e.direction)
                        }) : !1 !== tT.directional ? function(t, e) {
                            return eM(tT.snapTo)(t, tV() - t8 < 500 ? 0 : e.direction)
                        } : to.utils.snap(tT.snapTo), Y = en(Y = tT.duration || {
                            min: .1,
                            max: 2
                        }) ? t_(Y.min, Y.max) : t_(Y, Y), X = to.delayedCall(tT.delay || L / 2 || .1, function() {
                            var t = eo(),
                                e = tV() - t8 < 500,
                                n = s.tween;
                            if ((e || 10 > Math.abs(tj.getVelocity())) && !n && !tx && t5 !== t) {
                                var i, a, u = (t - c) / v,
                                    l = r && !tD ? r.totalProgress() : u,
                                    f = e ? 0 : (l - F) / (tV() - tm) * 1e3 || 0,
                                    p = to.utils.clamp(-u, 1 - u, ea(f / 2) * f / .185),
                                    d = u + (!1 === tT.inertia ? 0 : p),
                                    g = tT,
                                    _ = g.onStart,
                                    m = g.onInterrupt,
                                    y = g.onComplete;
                                if (er(i = o(d, tj)) || (i = d), a = Math.max(0, Math.round(c + i * v)), t <= h && t >= c && a !== t) {
                                    if (n && !n._initted && n.data <= ea(a - t)) return;
                                    !1 === tT.inertia && (p = i - u), s(a, {
                                        duration: Y(ea(.185 * Math.max(ea(d - l), ea(i - l)) / f / .05 || 0)),
                                        ease: tT.ease || "power3",
                                        data: ea(a - t),
                                        onInterrupt: function() {
                                            return X.restart(!0) && m && m(tj)
                                        },
                                        onComplete: function() {
                                            tj.update(), t5 = eo(), r && !tD && (N ? N.resetTo("totalProgress", i, r._tTime / r._tDur) : r.progress(i)), z = F = r && !tD ? r.totalProgress() : tj.progress, tv && tv(tj), y && y(tj)
                                        }
                                    }, t, p * v, a - t - p * v), _ && _(tj, s.tween)
                                }
                            } else tj.isActive && t5 !== t && X.restart(!0)
                        }).pause()), J && (eI[J] = tj), (V = (ti = tj.trigger = K(ti || !0 !== ts && ts)) && ti._gsap && ti._gsap.stRevert) && (V = V(tj)), ts = !0 === ts ? ti : K(ts), et($) && ($ = {
                            targets: ti,
                            className: $
                        }), ts && (!1 === ta || ta === e_ || (ta = (!!ta || !ts.parentNode || !ts.parentNode.style || "flex" !== ey(ts.parentNode).display) && eg), tj.pin = ts, (a = to.core.getCache(ts)).spacer ? y = a.pinState : (tM && ((tM = K(tM)) && !tM.nodeType && (tM = tM.current || tM.nativeElement), a.spacerIsNative = !!tM, tM && (a.spacerState = rt(tM))), a.spacer = w = tM || tc.createElement("div"), w.classList.add("pin-spacer"), J && w.classList.add("pin-spacer-" + J), a.pinState = y = rt(ts)), !1 !== e.force3D && to.set(ts, {
                            force3D: !0
                        }), tj.spacer = w = a.spacer, E = (R = ey(ts))[ta + tP.os2], C = to.getProperty(ts), M = to.quickSetter(ts, tP.a, "px"), e6(ts, w, R), b = rt(ts)), tX) {
                        _ = en(tX) ? eb(tX, eA) : eA, d = ez("scroller-start", J, tR, tP, _, 0), g = ez("scroller-end", J, tR, tP, _, 0, d), T = d["offset" + tP.op.d2];
                        var eu = K(q(tR, "content") || tR);
                        f = this.markerStart = ez("start", J, eu, tP, _, T, 0, tE), p = this.markerEnd = ez("end", J, eu, tP, _, T, 0, tE), tE && (H = to.quickSetter([f, p], tP.a, "px")), tN || B.length && !0 === q(tR, "fixedMarkers") || (ex(tF ? tf : tR), to.set([d, g], {
                            force3D: !0
                        }), A = to.quickSetter(d, tP.a, "px"), D = to.quickSetter(g, tP.a, "px"))
                    }
                    if (tE) {
                        var el = tE.vars.onUpdate,
                            ek = tE.vars.onUpdateParams;
                        tE.eventCallback("onUpdate", function() {
                            tj.update(0, 0, 1), el && el.apply(tE, ek || [])
                        })
                    }
                    if (tj.previous = function() {
                            return eN[eN.indexOf(tj) - 1]
                        }, tj.next = function() {
                            return eN[eN.indexOf(tj) + 1]
                        }, tj.revert = function(t, e) {
                            if (!e) return tj.kill(!0);
                            var n = !1 !== t || !tj.enabled,
                                i = ty;
                            n !== tj.isReverted && (n && (U = Math.max(eo(), tj.scroll.rec || 0), t9 = tj.progress, W = r && r.progress()), f && [f, p, d, g].forEach(function(t) {
                                return t.style.display = n ? "none" : "block"
                            }), n && (ty = tj, tj.update(n)), !ts || tC && tj.isActive || (n ? e4(ts, w, y) : e6(ts, w, ey(ts), S)), n || tj.update(n), ty = i, tj.isReverted = n)
                        }, tj.refresh = function(n, i, a, o) {
                            if (!ty && tj.enabled || i) {
                                if (ts && n && tG) return void eO(t, "scrollEnd", eW);
                                !tq && tK && tK(tj), ty = tj, s.tween && !a && (s.tween.kill(), s.tween = 0), N && N.pause(), tu && r && (r.revert({
                                    kill: !1
                                }).invalidate(), r.getChildren && r.getChildren(!0, !0, !1).forEach(function(t) {
                                    return t.vars.immediateRender && t.render(0, !0, !0)
                                })), tj.isReverted || tj.revert(!0, !0), tj._subPinOffset = !1;
                                var _, T, M, E, A, D, R, z, F, I, B, L, Y, q = tJ(),
                                    H = t2(),
                                    V = tE ? tE.duration() : t7(tR, tP),
                                    j = v <= .01 || !v,
                                    G = 0,
                                    $ = o || 0,
                                    J = en(a) ? a.end : e.end,
                                    te = e.endTrigger || ti,
                                    tn = en(a) ? a.start : e.start || (0 !== e.start && ti ? ts ? "0 0" : "0 100%" : 0),
                                    tl = tj.pinnedContainer = e.pinnedContainer && K(e.pinnedContainer, tj),
                                    tp = ti && Math.max(0, eN.indexOf(tj)) || 0,
                                    td = tp;
                                for (tX && en(a) && (L = to.getProperty(d, tP.p), Y = to.getProperty(g, tP.p)); td-- > 0;)(D = eN[td]).end || D.refresh(0, 1) || (ty = tj), (R = D.pin) && (R === ti || R === ts || R === tl) && !D.isReverted && (I || (I = []), I.unshift(D), D.revert(!0, !0)), D !== eN[td] && (tp--, td--);
                                for (ee(tn) && (tn = tn(tj)), c = rn(tn = tQ(tn, "start", tj), ti, q, tP, eo(), f, d, tj, H, tU, tN, V, tE, tj._startClamp && "_startClamp") || (ts ? -.001 : 0), ee(J) && (J = J(tj)), et(J) && !J.indexOf("+=") && (~J.indexOf(" ") ? J = (et(tn) ? tn.split(" ")[0] : "") + J : (G = eR(J.substr(2), q), J = et(tn) ? tn : (tE ? to.utils.mapRange(0, tE.duration(), tE.scrollTrigger.start, tE.scrollTrigger.end, c) : c) + G, te = ti)), J = tQ(J, "end", tj), h = Math.max(c, rn(J || (te ? "100% 0" : V), te, q, tP, eo() + G, p, g, tj, H, tU, tN, V, tE, tj._endClamp && "_endClamp")) || -.001, G = 0, td = tp; td--;)(R = (D = eN[td]).pin) && D.start - D._pinPush <= c && !tE && D.end > 0 && (_ = D.end - (tj._startClamp ? Math.max(0, D.start) : D.start), (R === ti && D.start - D._pinPush < c || R === tl) && isNaN(tn) && (G += _ * (1 - D.progress)), R === ts && ($ += _));
                                if (c += G, h += G, tj._startClamp && (tj._startClamp += G), tj._endClamp && !tq && (tj._endClamp = h || -.001, h = Math.min(h, t7(tR, tP))), v = h - c || (c -= .01) && .001, j && (t9 = to.utils.clamp(0, 1, to.utils.normalize(c, h, U))), tj._pinPush = $, f && G && ((_ = {})[tP.a] = "+=" + G, tl && (_[tP.p] = "-=" + eo()), to.set([f, p], _)), ts && !(tL && tj.end >= t7(tR, tP))) _ = ey(ts), E = tP === Z, M = eo(), k = parseFloat(C(tP.a)) + $, !V && h > 1 && (B = {
                                    style: B = (tF ? tc.scrollingElement || th : tR).style,
                                    value: B["overflow" + tP.a.toUpperCase()]
                                }, tF && "scroll" !== ey(tf)["overflow" + tP.a.toUpperCase()] && (B.style["overflow" + tP.a.toUpperCase()] = "scroll")), e6(ts, w, _), b = rt(ts), T = ew(ts, !0), z = tN && tt(tR, E ? Q : Z)(), ta ? ((S = [ta + tP.os2, v + $ + "px"]).t = w, (td = ta === eg ? eT(ts, tP) + v + $ : 0) && (S.push(tP.d, td + "px"), "auto" !== w.style.flexBasis && (w.style.flexBasis = td + "px")), e9(S), tl && eN.forEach(function(t) {
                                    t.pin === tl && !1 !== t.vars.pinSpacing && (t._subPinOffset = !0)
                                }), tN && eo(U)) : (td = eT(ts, tP)) && "auto" !== w.style.flexBasis && (w.style.flexBasis = td + "px"), tN && ((A = {
                                    top: T.top + (E ? M - c : z) + "px",
                                    left: T.left + (E ? z : M - c) + "px",
                                    boxSizing: "border-box",
                                    position: "fixed"
                                })[ec] = A["max" + em] = Math.ceil(T.width) + "px", A[eh] = A["max" + ev] = Math.ceil(T.height) + "px", A[e_] = A[e_ + "Top"] = A[e_ + ef] = A[e_ + ed] = A[e_ + ep] = "0", A[eg] = _[eg], A[eg + "Top"] = _[eg + "Top"], A[eg + ef] = _[eg + ef], A[eg + ed] = _[eg + ed], A[eg + ep] = _[eg + ep], x = re(y, A, tC), tq && eo(0)), r ? (F = r._initted, tO(1), r.render(r.duration(), !0, !0), O = C(tP.a) - k + v + $, P = Math.abs(v - O) > 1, tN && P && x.splice(x.length - 2, 2), r.render(0, !0, !0), F || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), tO(0)) : O = v, B && (B.value ? B.style["overflow" + tP.a.toUpperCase()] = B.value : B.style.removeProperty("overflow-" + tP.a));
                                else if (ti && eo() && !tE)
                                    for (T = ti.parentNode; T && T !== tf;) T._pinOffset && (c -= T._pinOffset, h -= T._pinOffset), T = T.parentNode;
                                I && I.forEach(function(t) {
                                    return t.revert(!1, !0)
                                }), tj.start = c, tj.end = h, u = l = tq ? U : eo(), tE || tq || (u < U && eo(U), tj.scroll.rec = 0), tj.revert(!1, !0), t8 = tV(), X && (t5 = -1, X.restart(!0)), ty = 0, r && tD && (r._initted || W) && r.progress() !== W && r.progress(W || 0, !0).render(r.time(), !0, !0), (j || t9 !== tj.progress || tE || tu || r && !r._initted) && (r && !tD && (r._initted || t9 || !1 !== r.vars.immediateRender) && r.totalProgress(tE && c < -.001 && !t9 ? to.utils.normalize(c, h, 0) : t9, !0), tj.progress = j || (u - c) / v === t9 ? 0 : t9), ts && ta && (w._pinOffset = Math.round(tj.progress * O)), N && N.invalidate(), isNaN(L) || (L -= to.getProperty(d, tP.p), Y -= to.getProperty(g, tP.p), ro(d, tP, L), ro(f, tP, L - (o || 0)), ro(g, tP, Y), ro(p, tP, Y - (o || 0))), j && !tq && tj.update(), !tr || tq || m || (m = !0, tr(tj), m = !1)
                            }
                        }, tj.getVelocity = function() {
                            return (eo() - l) / (tV() - tm) * 1e3 || 0
                        }, tj.endAnimation = function() {
                            ei(tj.callbackAnimation), r && (N ? N.progress(1) : r.paused() ? tD || ei(r, tj.direction < 0, 1) : ei(r, r.reversed()))
                        }, tj.labelToScroll = function(t) {
                            return r && r.labels && (c || tj.refresh() || c) + r.labels[t] / r.duration() * v || 0
                        }, tj.getTrailing = function(t) {
                            var e = eN.indexOf(tj),
                                r = tj.direction > 0 ? eN.slice(0, e).reverse() : eN.slice(e + 1);
                            return (et(t) ? r.filter(function(e) {
                                return e.vars.preventOverlaps === t
                            }) : r).filter(function(t) {
                                return tj.direction > 0 ? t.end <= c : t.start >= h
                            })
                        }, tj.update = function(t, e, n) {
                            if (!tE || n || t) {
                                var i, a, o, f, p, g, _, m = !0 === tq ? U : tj.scroll(),
                                    y = t ? 0 : (m - c) / v,
                                    T = y < 0 ? 0 : y > 1 ? 1 : y || 0,
                                    C = tj.progress;
                                if (e && (l = u, u = tE ? eo() : m, tT && (F = z, z = r && !tD ? r.totalProgress() : T)), tp && ts && !ty && !tH && tG && (!T && c < m + (m - l) / (tV() - tm) * tp ? T = 1e-4 : 1 === T && h > m + (m - l) / (tV() - tm) * tp && (T = .9999)), T !== C && tj.enabled) {
                                    if (f = (p = (i = tj.isActive = !!T && T < 1) != (!!C && C < 1)) || !!T != !!C, tj.direction = T > C ? 1 : -1, tj.progress = T, f && !ty && (a = T && !C ? 0 : 1 === T ? 1 : 1 === C ? 2 : 3, tD && (o = !p && "none" !== tB[a + 1] && tB[a + 1] || tB[a], _ = r && ("complete" === o || "reset" === o || o in r))), tA && (p || _) && (_ || tn || !r) && (ee(tA) ? tA(tj) : tj.getTrailing(tA).forEach(function(t) {
                                            return t.endAnimation()
                                        })), !tD && (!N || ty || tH ? r && r.totalProgress(T, !!(ty && (t8 || t))) : (N._dp._time - N._start !== N._time && N.render(N._dp._time - N._start), N.resetTo ? N.resetTo("totalProgress", T, r._tTime / r._tDur) : (N.vars.totalProgress = T, N.invalidate().restart()))), ts)
                                        if (t && ta && (w.style[ta + tP.os2] = E), tN) {
                                            if (f) {
                                                if (g = !t && T > C && h + 1 > m && m + 1 >= t7(tR, tP), tC)
                                                    if (!t && (i || g)) {
                                                        var S = ew(ts, !0),
                                                            R = m - c;
                                                        rs(ts, tf, S.top + (tP === Z ? R : 0) + "px", S.left + (tP === Z ? 0 : R) + "px")
                                                    } else rs(ts, w);
                                                e9(i || g ? x : b), P && T < 1 && i || M(k + (1 !== T || g ? 0 : O))
                                            }
                                        } else M(t1(k + O * T));
                                    !tT || s.tween || ty || tH || X.restart(!0), $ && (p || tb && T && (T < 1 || !tY)) && tg($.targets).forEach(function(t) {
                                        return t.classList[i || tb ? "add" : "remove"]($.className)
                                    }), !G || tD || t || G(tj), f && !ty ? (tD && (_ && ("complete" === o ? r.pause().totalProgress(1) : "reset" === o ? r.restart(!0).pause() : "restart" === o ? r.restart(!0) : r[o]()), G && G(tj)), (p || !tY) && (te && p && es(tj, te), tI[a] && es(tj, tI[a]), tb && (1 === T ? tj.kill(!1, 1) : tI[a] = 0), !p && tI[a = 1 === T ? 1 : 3] && es(tj, tI[a])), tS && !i && Math.abs(tj.getVelocity()) > (er(tS) ? tS : 2500) && (ei(tj.callbackAnimation), N ? N.progress(1) : ei(r, "reverse" === o ? 1 : !T, 1))) : tD && G && !ty && G(tj)
                                }
                                if (D) {
                                    var I = tE ? m / tE.duration() * (tE._caScrollDist || 0) : m;
                                    A(I + +!!d._isFlipped), D(I)
                                }
                                H && H(-m / tE.duration() * (tE._caScrollDist || 0))
                            }
                        }, tj.enable = function(e, r) {
                            tj.enabled || (tj.enabled = !0, eO(tR, "resize", eX), tF || eO(tR, "scroll", eL), tK && eO(t, "refreshInit", tK), !1 !== e && (tj.progress = t9 = 0, u = l = t5 = eo()), !1 !== r && tj.refresh())
                        }, tj.getTween = function(t) {
                            return t && s ? s.tween : N
                        }, tj.setPositions = function(t, e, r, n) {
                            if (tE) {
                                var i = tE.scrollTrigger,
                                    s = tE.duration(),
                                    a = i.end - i.start;
                                t = i.start + a * t / s, e = i.start + a * e / s
                            }
                            tj.refresh(!1, !1, {
                                start: tZ(t, r && !!tj._startClamp),
                                end: tZ(e, r && !!tj._endClamp)
                            }, n), tj.update()
                        }, tj.adjustPinSpacing = function(t) {
                            if (S && t) {
                                var e = S.indexOf(tP.d) + 1;
                                S[e] = parseFloat(S[e]) + t + "px", S[1] = parseFloat(S[1]) + t + "px", e9(S)
                            }
                        }, tj.disable = function(e, r) {
                            if (tj.enabled && (!1 !== e && tj.revert(!0, !0), tj.enabled = tj.isActive = !1, r || N && N.pause(), U = 0, a && (a.uncache = 1), tK && eE(t, "refreshInit", tK), X && (X.pause(), s.tween && s.tween.kill() && (s.tween = 0)), !tF)) {
                                for (var n = eN.length; n--;)
                                    if (eN[n].scroller === tR && eN[n] !== tj) return;
                                eE(tR, "resize", eX), tF || eE(tR, "scroll", eL)
                            }
                        }, tj.kill = function(t, n) {
                            tj.disable(t, n), N && !n && N.kill(), J && delete eI[J];
                            var i = eN.indexOf(tj);
                            i >= 0 && eN.splice(i, 1), i === tw && e2 > 0 && tw--, i = 0, eN.forEach(function(t) {
                                return t.scroller === tj.scroller && (i = 1)
                            }), i || tq || (tj.scroll.rec = 0), r && (r.scrollTrigger = null, t && r.revert({
                                kill: !1
                            }), n || r.kill()), f && [f, p, d, g].forEach(function(t) {
                                return t.parentNode && t.parentNode.removeChild(t)
                            }), tW === tj && (tW = 0), ts && (a && (a.uncache = 1), i = 0, eN.forEach(function(t) {
                                return t.pin === ts && i++
                            }), i || (a.spacer = 0)), e.onKill && e.onKill(tj)
                        }, eN.push(tj), tj.enable(!1, !1), V && V(tj), r && r.add && !v) {
                        var eS = tj.update;
                        tj.update = function() {
                            tj.update = eS, I.cache++, c || h || tj.refresh()
                        }, to.delayedCall(.01, tj.update), v = .01, c = h = 0
                    } else tj.refresh();
                    ts && eZ()
                }, t.register = function(e) {
                    return tu || (to = e || t5(), t2() && window.document && t.enable(), tu = t$), tu
                }, t.defaults = function(t) {
                    if (t)
                        for (var e in t) eP[e] = t[e];
                    return eP
                }, t.disable = function(t, e) {
                    t$ = 0, eN.forEach(function(r) {
                        return r[e ? "kill" : "disable"](t)
                    }), eE(tl, "wheel", eL), eE(tc, "scroll", eL), clearInterval(tv), eE(tc, "touchcancel", t0), eE(tf, "touchstart", t0), ek(eE, tc, "pointerdown,touchstart,mousedown", tK), ek(eE, tc, "pointerup,touchend,mouseup", tJ), td.kill(), t9(eE);
                    for (var r = 0; r < I.length; r += 3) eS(eE, I[r], I[r + 1]), eS(eE, I[r], I[r + 2])
                }, t.enable = function() {
                    if (tl = window, th = (tc = document).documentElement, tf = tc.body, to && (tg = to.utils.toArray, t_ = to.utils.clamp, tz = to.core.context || t0, tO = to.core.suppressOverwrites || t0, tF = tl.history.scrollRestoration || "auto", e1 = tl.pageYOffset || 0, to.core.globals("ScrollTrigger", t), tf)) {
                        t$ = 1, (tN = document.createElement("div")).style.height = "100vh", tN.style.position = "absolute", eK(),
                            function t() {
                                return t$ && requestAnimationFrame(t)
                            }(), ta.register(to), t.isTouch = ta.isTouch, tR = ta.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), tA = 1 === ta.isTouch, eO(tl, "wheel", eL), tp = [tl, tc, th, tf], to.matchMedia ? (t.matchMedia = function(t) {
                                var e, r = to.matchMedia();
                                for (e in t) r.add(e, t[e]);
                                return r
                            }, to.addEventListener("matchMediaInit", function() {
                                return eG()
                            }), to.addEventListener("matchMediaRevert", function() {
                                return ej()
                            }), to.addEventListener("matchMedia", function() {
                                e0(0, 1), eH("matchMedia")
                            }), to.matchMedia().add("(orientation: portrait)", function() {
                                return eY(), eY
                            })) : console.warn("Requires GSAP 3.11.0 or later"), eY(), eO(tc, "scroll", eL);
                        var e, r, n = tf.hasAttribute("style"),
                            i = tf.style,
                            s = i.borderTopStyle,
                            a = to.core.Animation.prototype;
                        for (a.revert || Object.defineProperty(a, "revert", {
                                value: function() {
                                    return this.time(-.01, !0)
                                }
                            }), i.borderTopStyle = "solid", Z.m = Math.round((e = ew(tf)).top + Z.sc()) || 0, Q.m = Math.round(e.left + Q.sc()) || 0, s ? i.borderTopStyle = s : i.removeProperty("border-top-style"), n || (tf.setAttribute("style", ""), tf.removeAttribute("style")), tv = setInterval(eB, 250), to.delayedCall(.5, function() {
                                return tH = 0
                            }), eO(tc, "touchcancel", t0), eO(tf, "touchstart", t0), ek(eO, tc, "pointerdown,touchstart,mousedown", tK), ek(eO, tc, "pointerup,touchend,mouseup", tJ), tb = to.utils.checkPrefix("transform"), e8.push(tb), tu = tV(), td = to.delayedCall(.2, e0).pause(), tM = [tc, "visibilitychange", function() {
                                var t = tl.innerWidth,
                                    e = tl.innerHeight;
                                tc.hidden ? (tT = t, tC = e) : (tT !== t || tC !== e) && eX()
                            }, tc, "DOMContentLoaded", e0, tl, "load", e0, tl, "resize", eX], t9(eO), eN.forEach(function(t) {
                                return t.enable(0, 1)
                            }), r = 0; r < I.length; r += 3) eS(eE, I[r], I[r + 1]), eS(eE, I[r], I[r + 2])
                    }
                }, t.config = function(e) {
                    "limitCallbacks" in e && (tY = !!e.limitCallbacks);
                    var r = e.syncInterval;
                    r && clearInterval(tv) || (tv = r) && setInterval(eB, r), "ignoreMobileResize" in e && (tA = 1 === t.isTouch && e.ignoreMobileResize), "autoRefreshEvents" in e && (t9(eE) || t9(eO, e.autoRefreshEvents || "none"), tE = -1 === (e.autoRefreshEvents + "").indexOf("resize"))
                }, t.scrollerProxy = function(t, e) {
                    var r = K(t),
                        n = I.indexOf(r),
                        i = t3(r);
                    ~n && I.splice(n, i ? 6 : 2), e && (i ? B.unshift(tl, e, tf, e, th, e) : B.unshift(r, e))
                }, t.clearMatchMedia = function(t) {
                    eN.forEach(function(e) {
                        return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0)
                    })
                }, t.isInViewport = function(t, e, r) {
                    var n = (et(t) ? K(t) : t).getBoundingClientRect(),
                        i = n[r ? ec : eh] * e || 0;
                    return r ? n.right - i > 0 && n.left + i < tl.innerWidth : n.bottom - i > 0 && n.top + i < tl.innerHeight
                }, t.positionInViewport = function(t, e, r) {
                    et(t) && (t = K(t));
                    var n = t.getBoundingClientRect(),
                        i = n[r ? ec : eh],
                        s = null == e ? i / 2 : e in eD ? eD[e] * i : ~e.indexOf("%") ? parseFloat(e) * i / 100 : parseFloat(e) || 0;
                    return r ? (n.left + s) / tl.innerWidth : (n.top + s) / tl.innerHeight
                }, t.killAll = function(t) {
                    if (eN.slice(0).forEach(function(t) {
                            return "ScrollSmoother" !== t.vars.id && t.kill()
                        }), !0 !== t) {
                        var e = eq.killAll || [];
                        eq = {}, e.forEach(function(t) {
                            return t()
                        })
                    }
                }, t
            }();
        rl.version = "3.13.0", rl.saveStyles = function(t) {
            return t ? tg(t).forEach(function(t) {
                if (t && t.style) {
                    var e = eV.indexOf(t);
                    e >= 0 && eV.splice(e, 5), eV.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), to.core.getCache(t), tz())
                }
            }) : eV
        }, rl.revert = function(t, e) {
            return eG(!t, e)
        }, rl.create = function(t, e) {
            return new rl(t, e)
        }, rl.refresh = function(t) {
            return t ? eX(!0) : (tu || rl.register()) && e0(!0)
        }, rl.update = function(t) {
            return ++I.cache && e5(2 * (!0 === t))
        }, rl.clearScrollMemory = e$, rl.maxScroll = function(t, e) {
            return t7(t, e ? Q : Z)
        }, rl.getScrollFunc = function(t, e) {
            return tt(K(t), e ? Q : Z)
        }, rl.getById = function(t) {
            return eI[t]
        }, rl.getAll = function() {
            return eN.filter(function(t) {
                return "ScrollSmoother" !== t.vars.id
            })
        }, rl.isScrolling = function() {
            return !!tG
        }, rl.snapDirectional = eM, rl.addEventListener = function(t, e) {
            var r = eq[t] || (eq[t] = []);
            ~r.indexOf(e) || r.push(e)
        }, rl.removeEventListener = function(t, e) {
            var r = eq[t],
                n = r && r.indexOf(e);
            n >= 0 && r.splice(n, 1)
        }, rl.batch = function(t, e) {
            var r, n = [],
                i = {},
                s = e.interval || .016,
                a = e.batchMax || 1e9,
                o = function(t, e) {
                    var r = [],
                        n = [],
                        i = to.delayedCall(s, function() {
                            e(r, n), r = [], n = []
                        }).pause();
                    return function(t) {
                        r.length || i.restart(!0), r.push(t.trigger), n.push(t), a <= r.length && i.progress(1)
                    }
                };
            for (r in e) i[r] = "on" === r.substr(0, 2) && ee(e[r]) && "onRefreshInit" !== r ? o(r, e[r]) : e[r];
            return ee(a) && (a = a(), eO(rl, "refresh", function() {
                return a = e.batchMax()
            })), tg(t).forEach(function(t) {
                var e = {};
                for (r in i) e[r] = i[r];
                e.trigger = t, n.push(rl.create(e))
            }), n
        };
        var rc, rh = function(t, e, r, n) {
                return e > n ? t(n) : e < 0 && t(0), r > n ? (n - e) / (r - e) : r < 0 ? e / (e - r) : 1
            },
            rf = function t(e, r) {
                !0 === r ? e.style.removeProperty("touch-action") : e.style.touchAction = !0 === r ? "auto" : r ? "pan-" + r + (ta.isTouch ? " pinch-zoom" : "") : "none", e === th && t(tf, r)
            },
            rp = {
                auto: 1,
                scroll: 1
            },
            rd = function(t) {
                var e, r = t.event,
                    n = t.target,
                    i = t.axis,
                    s = (r.changedTouches ? r.changedTouches[0] : r).target,
                    a = s._gsap || to.core.getCache(s),
                    o = tV();
                if (!a._isScrollT || o - a._isScrollT > 2e3) {
                    for (; s && s !== tf && (s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth || !(rp[(e = ey(s)).overflowY] || rp[e.overflowX]));) s = s.parentNode;
                    a._isScroll = s && s !== n && !t3(s) && (rp[(e = ey(s)).overflowY] || rp[e.overflowX]), a._isScrollT = o
                }(a._isScroll || "x" === i) && (r.stopPropagation(), r._gsapAllow = !0)
            },
            rg = function(t, e, r, n) {
                return ta.create({
                    target: t,
                    capture: !0,
                    debounce: !1,
                    lockAxis: !0,
                    type: e,
                    onWheel: n = n && rd,
                    onPress: n,
                    onDrag: n,
                    onScroll: n,
                    onEnable: function() {
                        return r && eO(tc, ta.eventTypes[0], rm, !1, !0)
                    },
                    onDisable: function() {
                        return eE(tc, ta.eventTypes[0], rm, !0)
                    }
                })
            },
            r_ = /(input|label|select|textarea)/i,
            rm = function(t) {
                var e = r_.test(t.target.tagName);
                (e || rc) && (t._gsapAllow = !0, rc = e)
            },
            rv = function(t) {
                en(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
                var e, r, n, i, s, a, o, u, l = t,
                    c = l.normalizeScrollX,
                    h = l.momentum,
                    f = l.allowNestedScroll,
                    p = l.onRelease,
                    d = K(t.target) || th,
                    g = to.core.globals().ScrollSmoother,
                    _ = g && g.get(),
                    m = tR && (t.content && K(t.content) || _ && !1 !== t.content && !_.smooth() && _.content()),
                    v = tt(d, Z),
                    y = tt(d, Q),
                    x = 1,
                    b = (ta.isTouch && tl.visualViewport ? tl.visualViewport.scale * tl.visualViewport.width : tl.outerWidth) / tl.innerWidth,
                    w = 0,
                    T = ee(h) ? function() {
                        return h(e)
                    } : function() {
                        return h || 2.8
                    },
                    C = rg(d, t.type, !0, f),
                    M = function() {
                        return i = !1
                    },
                    k = t0,
                    O = t0,
                    E = function() {
                        r = t7(d, Z), O = t_(+!!tR, r), c && (k = t_(0, t7(d, Q))), n = eQ
                    },
                    S = function() {
                        m._gsap.y = t1(parseFloat(m._gsap.y) + v.offset) + "px", m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(m._gsap.y) + ", 0, 1)", v.offset = v.cacheID = 0
                    },
                    A = function() {
                        if (i) {
                            requestAnimationFrame(M);
                            var t = t1(e.deltaY / 2),
                                r = O(v.v - t);
                            if (m && r !== v.v + v.offset) {
                                v.offset = r - v.v;
                                var n = t1((parseFloat(m && m._gsap.y) || 0) - v.offset);
                                m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + n + ", 0, 1)", m._gsap.y = n + "px", v.cacheID = I.cache, e5()
                            }
                            return !0
                        }
                        v.offset && S(), i = !0
                    },
                    P = function() {
                        E(), s.isActive() && s.vars.scrollY > r && (v() > r ? s.progress(1) && v(r) : s.resetTo("scrollY", r))
                    };
                return m && to.set(m, {
                    y: "+=0"
                }), t.ignoreCheck = function(t) {
                    return tR && "touchmove" === t.type && A() || x > 1.05 && "touchstart" !== t.type || e.isGesturing || t.touches && t.touches.length > 1
                }, t.onPress = function() {
                    i = !1;
                    var t = x;
                    x = t1((tl.visualViewport && tl.visualViewport.scale || 1) / b), s.pause(), t !== x && rf(d, x > 1.01 || !c && "x"), a = y(), o = v(), E(), n = eQ
                }, t.onRelease = t.onGestureStart = function(t, e) {
                    if (v.offset && S(), e) {
                        I.cache++;
                        var n, i, a = T();
                        c && (i = (n = y()) + -(.05 * a * t.velocityX) / .227, a *= rh(y, n, i, t7(d, Q)), s.vars.scrollX = k(i)), i = (n = v()) + -(.05 * a * t.velocityY) / .227, a *= rh(v, n, i, t7(d, Z)), s.vars.scrollY = O(i), s.invalidate().duration(a).play(.01), (tR && s.vars.scrollY >= r || n >= r - 1) && to.to({}, {
                            onUpdate: P,
                            duration: a
                        })
                    } else u.restart(!0);
                    p && p(t)
                }, t.onWheel = function() {
                    s._ts && s.pause(), tV() - w > 1e3 && (n = 0, w = tV())
                }, t.onChange = function(t, e, r, i, s) {
                    if (eQ !== n && E(), e && c && y(k(i[2] === e ? a + (t.startX - t.x) : y() + e - i[1])), r) {
                        v.offset && S();
                        var u = s[2] === r,
                            l = u ? o + t.startY - t.y : v() + r - s[1],
                            h = O(l);
                        u && l !== h && (o += h - l), v(h)
                    }(r || e) && e5()
                }, t.onEnable = function() {
                    rf(d, !c && "x"), rl.addEventListener("refresh", P), eO(tl, "resize", P), v.smooth && (v.target.style.scrollBehavior = "auto", v.smooth = y.smooth = !1), C.enable()
                }, t.onDisable = function() {
                    rf(d, !0), eE(tl, "resize", P), rl.removeEventListener("refresh", P), C.kill()
                }, t.lockAxis = !1 !== t.lockAxis, (e = new ta(t)).iOS = tR, tR && !v() && v(1), tR && to.ticker.add(t0), u = e._dc, s = to.to(e, {
                    ease: "power4",
                    paused: !0,
                    inherit: !1,
                    scrollX: c ? "+=0.1" : "+=0",
                    scrollY: "+=0.1",
                    modifiers: {
                        scrollY: ra(v, v(), function() {
                            return s.pause()
                        })
                    },
                    onUpdate: e5,
                    onComplete: u.vars.onComplete
                }), e
            };
        rl.sort = function(t) {
            if (ee(t)) return eN.sort(t);
            var e = tl.pageYOffset || 0;
            return rl.getAll().forEach(function(t) {
                return t._sortY = t.trigger ? e + t.trigger.getBoundingClientRect().top : t.start + tl.innerHeight
            }), eN.sort(t || function(t, e) {
                return -1e6 * (t.vars.refreshPriority || 0) + (t.vars.containerAnimation ? 1e6 : t._sortY) - ((e.vars.containerAnimation ? 1e6 : e._sortY) + -1e6 * (e.vars.refreshPriority || 0))
            })
        }, rl.observe = function(t) {
            return new ta(t)
        }, rl.normalizeScroll = function(t) {
            if (void 0 === t) return tS;
            if (!0 === t && tS) return tS.enable();
            if (!1 === t) {
                tS && tS.kill(), tS = t;
                return
            }
            var e = t instanceof ta ? t : rv(t);
            return tS && tS.target === e.target && tS.kill(), t3(e.target) && (tS = e), e
        }, rl.core = {
            _getVelocityProp: te,
            _inputObserver: rg,
            _scrollers: I,
            _proxies: B,
            bridge: {
                ss: function() {
                    tG || eH("scrollStart"), tG = tV()
                },
                ref: function() {
                    return ty
                }
            }
        }, t5() && to.registerPlugin(rl), t.s(["f", 0, rl], 83495);
        let ry, rx, rb, rw = "u" > typeof Intl ? new Intl.Segmenter : 0,
            rT = t => "string" == typeof t ? rT(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t],
            rC = t => rT(t).filter(t => t instanceof HTMLElement),
            rM = [],
            rk = function() {},
            rO = /\s+/g,
            rE = RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"),
            rS = {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            },
            rA = (t, e) => {
                if (e) {
                    let r = new Set(t.join("").match(e) || rM),
                        n = t.length,
                        i, s, a, o;
                    if (r.size) {
                        for (; --n > -1;)
                            for (a of (s = t[n], r))
                                if (a.startsWith(s) && a.length > s.length) {
                                    for (i = 0, o = s; a.startsWith(o += t[n + ++i]) && o.length < a.length;);
                                    if (i && o.length === a.length) {
                                        t[n] = a, t.splice(n + 1, i);
                                        break
                                    }
                                }
                    }
                }
                return t
            },
            rP = t => "inline" === window.getComputedStyle(t).display && (t.style.display = "inline-block"),
            rD = (t, e, r) => e.insertBefore("string" == typeof t ? document.createTextNode(t) : t, r),
            rR = (t, e, r) => {
                let n = e[t + "sClass"] || "",
                    {
                        tag: i = "div",
                        aria: s = "auto",
                        propIndex: a = !1
                    } = e,
                    o = "line" === t ? "block" : "inline-block",
                    u = n.indexOf("++") > -1,
                    l = e => {
                        let l = document.createElement(i),
                            c = r.length + 1;
                        return n && (l.className = n + (u ? " " + n + c : "")), a && l.style.setProperty("--" + t, c + ""), "none" !== s && l.setAttribute("aria-hidden", "true"), "span" !== i && (l.style.position = "relative", l.style.display = o), l.textContent = e, r.push(l), l
                    };
                return u && (n = n.replace("++", "")), l.collection = r, l
            },
            rz = (t, e, r, n, i, s, a, o, u, l) => {
                var c;
                let h = Array.from(t.childNodes),
                    f = 0,
                    {
                        wordDelimiter: p,
                        reduceWhiteSpace: d = !0,
                        prepareText: g
                    } = e,
                    _ = t.getBoundingClientRect(),
                    m = _,
                    v = !d && "pre" === window.getComputedStyle(t).whiteSpace.substring(0, 3),
                    y = 0,
                    x = r.collection,
                    b, w, T, C, M, k, O, E, S, A, P, D, R, z, F, N, I, B;
                for ("object" == typeof p ? (T = p.delimiter || p, w = p.replaceWith || "") : w = "" === p ? "" : p || " ", b = " " !== w; f < h.length; f++)
                    if (3 === (C = h[f]).nodeType) {
                        for (F = C.textContent || "", d ? F = F.replace(rO, " ") : v && (F = F.replace(/\n/g, w + "\n")), g && (F = g(F, t)), C.textContent = F, I = (M = w || T ? F.split(T || w) : F.match(o) || rM)[M.length - 1], E = b ? " " === I.slice(-1) : !I, I || M.pop(), m = _, (O = b ? " " === M[0].charAt(0) : !M[0]) && rD(" ", t, C), M[0] || M.shift(), rA(M, u), s && l || (C.textContent = ""), S = 1; S <= M.length; S++)
                            if (N = M[S - 1], !d && v && "\n" === N.charAt(0) && (null == (c = C.previousSibling) || c.remove(), rD(document.createElement("br"), t, C), N = N.slice(1)), d || "" !== N)
                                if (" " === N) t.insertBefore(document.createTextNode(" "), C);
                                else {
                                    if (b && " " === N.charAt(0) && rD(" ", t, C), y && 1 === S && !O && x.indexOf(y.parentNode) > -1 ? (k = x[x.length - 1]).appendChild(document.createTextNode(n ? "" : N)) : (rD(k = r(n ? "" : N), t, C), y && 1 === S && !O && k.insertBefore(y, k.firstChild)), n)
                                        for (P = rw ? rA([...rw.segment(N)].map(t => t.segment), u) : N.match(o) || rM, B = 0; B < P.length; B++) k.appendChild(" " === P[B] ? document.createTextNode(" ") : n(P[B]));
                                    if (s && l) {
                                        if (F = C.textContent = F.substring(N.length + 1, F.length), (A = k.getBoundingClientRect()).top > m.top && A.left <= m.left) {
                                            for (D = t.cloneNode(), R = t.childNodes[0]; R && R !== k;) z = R, R = R.nextSibling, D.appendChild(z);
                                            t.parentNode.insertBefore(D, t), i && rP(D)
                                        }
                                        m = A
                                    }(S < M.length || E) && rD(S >= M.length ? " " : b && " " === N.slice(-1) ? " " + w : w, t, C)
                                }
                        else rD(w, t, C);
                        t.removeChild(C), y = 0
                    } else 1 === C.nodeType && (a && a.indexOf(C) > -1 ? (x.indexOf(C.previousSibling) > -1 && x[x.length - 1].appendChild(C), y = C) : (rz(C, e, r, n, i, s, a, o, u, !0), y = 0), i && rP(C))
            },
            rF = class t {
                constructor(t, e) {
                    this.isSplit = !1, rb || rN.register(window.gsap), this.elements = rC(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
                    let r = [],
                        n, i = () => {
                            let t = r.length,
                                e;
                            for (; t--;) {
                                let n = (e = r[t]).element.offsetWidth;
                                if (n !== e.width) {
                                    e.width = n, this._split();
                                    return
                                }
                            }
                        };
                    this._data = {
                        orig: r,
                        obs: "u" > typeof ResizeObserver && new ResizeObserver(() => {
                            clearTimeout(n), n = setTimeout(i, 200)
                        })
                    }, rk(this), this.split(e)
                }
                split(t) {
                    this.isSplit && this.revert(), this.vars = t = t || this.vars || {};
                    let {
                        type: e = "chars,words,lines",
                        aria: r = "auto",
                        deepSlice: n = !0,
                        smartWrap: i,
                        onSplit: s,
                        autoSplit: a = !1,
                        specialChars: o,
                        mask: u
                    } = this.vars, l = e.indexOf("lines") > -1, c = e.indexOf("chars") > -1, h = e.indexOf("words") > -1, f = c && !h && !l, p = o && ("push" in o ? RegExp("(?:" + o.join("|") + ")", "gu") : o), d = p ? RegExp(p.source + "|" + rE.source, "gu") : rE, g = !!t.ignore && rC(t.ignore), {
                        orig: _,
                        animTime: m,
                        obs: v
                    } = this._data, y;
                    return (c || h || l) && (this.elements.forEach((e, s) => {
                        _[s] = {
                            element: e,
                            html: e.innerHTML,
                            ariaL: e.getAttribute("aria-label"),
                            ariaH: e.getAttribute("aria-hidden")
                        }, "auto" === r ? e.setAttribute("aria-label", (e.textContent || "").trim()) : "hidden" === r && e.setAttribute("aria-hidden", "true");
                        let a = [],
                            o = [],
                            u = [],
                            m = c ? rR("char", t, a) : null,
                            v = rR("word", t, o),
                            y, x, b, w;
                        if (rz(e, t, v, m, f, n && (l || f), g, d, p, !1), l) {
                            let r, n, i = rT(e.childNodes),
                                s = (r = rR("line", t, u), n = window.getComputedStyle(e).textAlign || "left", (t, s) => {
                                    let a = r("");
                                    for (a.style.textAlign = n, e.insertBefore(a, i[t]); t < s; t++) a.appendChild(i[t]);
                                    a.normalize()
                                }),
                                a, o = [],
                                l = 0,
                                c = i.map(t => 1 === t.nodeType ? t.getBoundingClientRect() : rS),
                                h = rS;
                            for (y = 0; y < i.length; y++) 1 === (a = i[y]).nodeType && ("BR" === a.nodeName ? (o.push(a), s(l, y + 1), h = c[l = y + 1]) : (y && c[y].top > h.top && c[y].left <= h.left && (s(l, y), l = y), h = c[y]));
                            l < y && s(l, y), o.forEach(t => {
                                var e;
                                return null == (e = t.parentNode) ? void 0 : e.removeChild(t)
                            })
                        }
                        if (!h) {
                            for (y = 0; y < o.length; y++)
                                if (x = o[y], c || !x.nextSibling || 3 !== x.nextSibling.nodeType)
                                    if (i && !l) {
                                        for ((b = document.createElement("span")).style.whiteSpace = "nowrap"; x.firstChild;) b.appendChild(x.firstChild);
                                        x.replaceWith(b)
                                    } else x.replaceWith(...x.childNodes);
                            else(w = x.nextSibling) && 3 === w.nodeType && (w.textContent = (x.textContent || "") + (w.textContent || ""), x.remove());
                            o.length = 0, e.normalize()
                        }
                        this.lines.push(...u), this.words.push(...o), this.chars.push(...a)
                    }), u && this[u] && this.masks.push(...this[u].map(t => {
                        let e = t.cloneNode();
                        return t.replaceWith(e), e.appendChild(t), t.className && (e.className = t.className.replace(/(\b\w+\b)/g, "$1-mask")), e.style.overflow = "clip", e
                    }))), this.isSplit = !0, rx && (a ? rx.addEventListener("loadingdone", this._split) : "loading" === rx.status && console.warn("SplitText called before fonts loaded")), (y = s && s(this)) && y.totalTime && (this._data.anim = m ? y.totalTime(m) : y), l && a && this.elements.forEach((t, e) => {
                        _[e].width = t.offsetWidth, v && v.observe(t)
                    }), this
                }
                revert() {
                    var t, e;
                    let {
                        orig: r,
                        anim: n,
                        obs: i
                    } = this._data;
                    return i && i.disconnect(), r.forEach(({
                        element: t,
                        html: e,
                        ariaL: r,
                        ariaH: n
                    }) => {
                        t.innerHTML = e, r ? t.setAttribute("aria-label", r) : t.removeAttribute("aria-label"), n ? t.setAttribute("aria-hidden", n) : t.removeAttribute("aria-hidden")
                    }), this.chars.length = this.words.length = this.lines.length = r.length = this.masks.length = 0, this.isSplit = !1, null == rx || rx.removeEventListener("loadingdone", this._split), n && (this._data.animTime = n.totalTime(), n.revert()), null == (e = (t = this.vars).onRevert) || e.call(t, this), this
                }
                static create(e, r) {
                    return new t(e, r)
                }
                static register(t) {
                    (ry = ry || t || window.gsap) && (rT = ry.utils.toArray, rk = ry.core.context || rk), !rb && window.innerWidth > 0 && (rx = document.fonts, rb = !0)
                }
            };
        rF.version = "3.13.0";
        let rN = rF;
        t.s(["f", 0, rN], 75324), n.e.registerPlugin(rl, x, rN), t.s(["f", 0, function(t, e, {
            first: r = !1
        } = {}) {
            let i = (t, r, n) => {
                e(t, r, n)
            };
            return n.e.ticker.add(i, !1, r), () => n.e.ticker.remove(i)
        }], 17724)
    }, 89970, t => {
        function e(t) {
            if (void 0 === t) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function r(t, e) {
            t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
        }
        var n, i, s, a, o, u, l, c, h, f, p, d, g, _, m, v, y, x, b, w, T, C, M, k, O, E, S, A, P = {
                autoSleep: 120,
                force3D: "auto",
                nullTargetWarn: 1,
                units: {
                    lineHeight: ""
                }
            },
            D = {
                duration: .5,
                overwrite: !1,
                delay: 0
            },
            R = 2 * Math.PI,
            z = R / 4,
            F = 0,
            N = Math.sqrt,
            I = Math.cos,
            B = Math.sin,
            L = function(t) {
                return "string" == typeof t
            },
            Y = function(t) {
                return "function" == typeof t
            },
            X = function(t) {
                return "number" == typeof t
            },
            q = function(t) {
                return void 0 === t
            },
            U = function(t) {
                return "object" == typeof t
            },
            W = function(t) {
                return !1 !== t
            },
            H = function() {
                return "u" > typeof window
            },
            V = function(t) {
                return Y(t) || L(t)
            },
            j = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {},
            G = Array.isArray,
            $ = /(?:-?\.?\d|\.)+/gi,
            Q = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
            Z = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
            K = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
            J = /[+-]=-?[.\d]+/,
            tt = /[^,'"\[\]\s]+/gi,
            te = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
            tr = {},
            tn = {},
            ti = function(t) {
                return (tn = tz(t, tr)) && rk
            },
            ts = function(t, e) {
                return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
            },
            ta = function(t, e) {
                return !e && console.warn(t)
            },
            to = function(t, e) {
                return t && (tr[t] = e) && tn && (tn[t] = e) || tr
            },
            tu = function() {
                return 0
            },
            tl = {
                suppressEvents: !0,
                isStart: !0,
                kill: !1
            },
            tc = {
                suppressEvents: !0,
                kill: !1
            },
            th = {
                suppressEvents: !0
            },
            tf = {},
            tp = [],
            td = {},
            tg = {},
            t_ = {},
            tm = 30,
            tv = [],
            ty = "",
            tx = function(t) {
                var e, r, n = t[0];
                if (U(n) || Y(n) || (t = [t]), !(e = (n._gsap || {}).harness)) {
                    for (r = tv.length; r-- && !tv[r].targetTest(n););
                    e = tv[r]
                }
                for (r = t.length; r--;) t[r] && (t[r]._gsap || (t[r]._gsap = new eq(t[r], e))) || t.splice(r, 1);
                return t
            },
            tb = function(t) {
                return t._gsap || tx(ei(t))[0]._gsap
            },
            tw = function(t, e, r) {
                return (r = t[e]) && Y(r) ? t[e]() : q(r) && t.getAttribute && t.getAttribute(e) || r
            },
            tT = function(t, e) {
                return (t = t.split(",")).forEach(e) || t
            },
            tC = function(t) {
                return Math.round(1e5 * t) / 1e5 || 0
            },
            tM = function(t) {
                return Math.round(1e7 * t) / 1e7 || 0
            },
            tk = function(t, e) {
                var r = e.charAt(0),
                    n = parseFloat(e.substr(2));
                return t = parseFloat(t), "+" === r ? t + n : "-" === r ? t - n : "*" === r ? t * n : t / n
            },
            tO = function(t, e) {
                for (var r = e.length, n = 0; 0 > t.indexOf(e[n]) && ++n < r;);
                return n < r
            },
            tE = function() {
                var t, e, r = tp.length,
                    n = tp.slice(0);
                for (td = {}, tp.length = 0, t = 0; t < r; t++)(e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
            },
            tS = function(t) {
                return !!(t._initted || t._startAt || t.add)
            },
            tA = function(t, e, r, n) {
                tp.length && !b && tE(), t.render(e, r, n || !!(b && e < 0 && tS(t))), tp.length && !b && tE()
            },
            tP = function(t) {
                var e = parseFloat(t);
                return (e || 0 === e) && (t + "").match(tt).length < 2 ? e : L(t) ? t.trim() : t
            },
            tD = function(t) {
                return t
            },
            tR = function(t, e) {
                for (var r in e) r in t || (t[r] = e[r]);
                return t
            },
            tz = function(t, e) {
                for (var r in e) t[r] = e[r];
                return t
            },
            tF = function t(e, r) {
                for (var n in r) "__proto__" !== n && "constructor" !== n && "prototype" !== n && (e[n] = U(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);
                return e
            },
            tN = function(t, e) {
                var r, n = {};
                for (r in t) r in e || (n[r] = t[r]);
                return n
            },
            tI = function(t) {
                var e, r = t.parent || T,
                    n = t.keyframes ? (e = G(t.keyframes), function(t, r) {
                        for (var n in r) n in t || "duration" === n && e || "ease" === n || (t[n] = r[n])
                    }) : tR;
                if (W(t.inherit))
                    for (; r;) n(t, r.vars.defaults), r = r.parent || r._dp;
                return t
            },
            tB = function(t, e) {
                for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r];);
                return r < 0
            },
            tL = function(t, e, r, n, i) {
                void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
                var s, a = t[n];
                if (i)
                    for (s = e[i]; a && a[i] > s;) a = a._prev;
                return a ? (e._next = a._next, a._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = a, e.parent = e._dp = t, e
            },
            tY = function(t, e, r, n) {
                void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
                var i = e._prev,
                    s = e._next;
                i ? i._next = s : t[r] === e && (t[r] = s), s ? s._prev = i : t[n] === e && (t[n] = i), e._next = e._prev = e.parent = null
            },
            tX = function(t, e) {
                t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0
            },
            tq = function(t, e) {
                if (t && (!e || e._end > t._dur || e._start < 0))
                    for (var r = t; r;) r._dirty = 1, r = r.parent;
                return t
            },
            tU = function(t) {
                for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
                return t
            },
            tW = function(t, e, r, n) {
                return t._startAt && (b ? t._startAt.revert(tc) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n))
            },
            tH = function(t) {
                return t._repeat ? tV(t._tTime, t = t.duration() + t._rDelay) * t : 0
            },
            tV = function(t, e) {
                var r = Math.floor(t = tM(t / e));
                return t && r === t ? r - 1 : r
            },
            tj = function(t, e) {
                return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
            },
            tG = function(t) {
                return t._end = tM(t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0))
            },
            t$ = function(t, e) {
                var r = t._dp;
                return r && r.smoothChildTiming && t._ts && (t._start = tM(r._time - (t._ts > 0 ? e / t._ts : -(((t._dirty ? t.totalDuration() : t._tDur) - e) / t._ts))), tG(t), r._dirty || tq(r, t)), t
            },
            tQ = function(t, e) {
                var r;
                if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (r = tj(t.rawTime(), e), (!e._dur || et(0, e.totalDuration(), r) - e._tTime > 1e-8) && e.render(r, !0)), tq(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
                    if (t._dur < t.duration())
                        for (r = t; r._dp;) r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
                    t._zTime = -1e-8
                }
            },
            tZ = function(t, e, r, n) {
                return e.parent && tX(e), e._start = tM((X(r) ? r : r || t !== T ? t6(t, r, e) : t._time) + e._delay), e._end = tM(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), tL(t, e, "_first", "_last", t._sort ? "_start" : 0), t1(e) || (t._recent = e), n || tQ(t, e), t._ts < 0 && t$(t, t._tTime), t
            },
            tK = function(t, e) {
                return (tr.ScrollTrigger || ts("scrollTrigger", e)) && tr.ScrollTrigger.create(e, t)
            },
            tJ = function(t, e, r, n, i) {
                return (e1(t, e, i), t._initted) ? !r && t._pt && !b && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && E !== eO.frame ? (tp.push(t), t._lazy = [i, n], 1) : void 0 : 1
            },
            t0 = function t(e) {
                var r = e.parent;
                return r && r._ts && r._initted && !r._lock && (0 > r.rawTime() || t(r))
            },
            t1 = function(t) {
                var e = t.data;
                return "isFromStart" === e || "isStart" === e
            },
            t2 = function(t, e, r, n) {
                var i, s, a, o = t.ratio,
                    u = e < 0 || !e && (!t._start && t0(t) && !(!t._initted && t1(t)) || (t._ts < 0 || t._dp._ts < 0) && !t1(t)) ? 0 : 1,
                    l = t._rDelay,
                    c = 0;
                if (l && t._repeat && (s = tV(c = et(0, t._tDur, e), l), t._yoyo && 1 & s && (u = 1 - u), s !== tV(t._tTime, l) && (o = 1 - u, t.vars.repeatRefresh && t._initted && t.invalidate())), u !== o || b || n || 1e-8 === t._zTime || !e && t._zTime) {
                    if (!t._initted && tJ(t, e, n, r, c)) return;
                    for (a = t._zTime, t._zTime = e || 1e-8 * !!r, r || (r = e && !a), t.ratio = u, t._from && (u = 1 - u), t._time = 0, t._tTime = c, i = t._pt; i;) i.r(u, i.d), i = i._next;
                    e < 0 && tW(t, e, r, !0), t._onUpdate && !r && eg(t, "onUpdate"), c && t._repeat && !r && t.parent && eg(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === u && (u && tX(t, 1), r || b || (eg(t, u ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
                } else t._zTime || (t._zTime = e)
            },
            t5 = function(t, e, r) {
                var n;
                if (r > e)
                    for (n = t._first; n && n._start <= r;) {
                        if ("isPause" === n.data && n._start > e) return n;
                        n = n._next
                    } else
                        for (n = t._last; n && n._start >= r;) {
                            if ("isPause" === n.data && n._start < e) return n;
                            n = n._prev
                        }
            },
            t3 = function(t, e, r, n) {
                var i = t._repeat,
                    s = tM(e) || 0,
                    a = t._tTime / t._tDur;
                return a && !n && (t._time *= s / t._dur), t._dur = s, t._tDur = i ? i < 0 ? 1e10 : tM(s * (i + 1) + t._rDelay * i) : s, a > 0 && !n && t$(t, t._tTime = t._tDur * a), t.parent && tG(t), r || tq(t.parent, t), t
            },
            t8 = function(t) {
                return t instanceof eW ? tq(t) : t3(t, t._dur)
            },
            t4 = {
                _start: 0,
                endTime: tu,
                totalDuration: tu
            },
            t6 = function t(e, r, n) {
                var i, s, a, o = e.labels,
                    u = e._recent || t4,
                    l = e.duration() >= 1e8 ? u.endTime(!1) : e._dur;
                return L(r) && (isNaN(r) || r in o) ? (s = r.charAt(0), a = "%" === r.substr(-1), i = r.indexOf("="), "<" === s || ">" === s) ? (i >= 0 && (r = r.replace(/=/, "")), ("<" === s ? u._start : u.endTime(u._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (a ? (i < 0 ? u : n).totalDuration() / 100 : 1)) : i < 0 ? (r in o || (o[r] = l), o[r]) : (s = parseFloat(r.charAt(i - 1) + r.substr(i + 1)), a && n && (s = s / 100 * (G(n) ? n[0] : n).totalDuration()), i > 1 ? t(e, r.substr(0, i - 1), n) + s : l + s) : null == r ? l : +r
            },
            t7 = function(t, e, r) {
                var n, i, s = X(e[1]),
                    a = (s ? 2 : 1) + (t < 2 ? 0 : 1),
                    o = e[a];
                if (s && (o.duration = e[1]), o.parent = r, t) {
                    for (n = o, i = r; i && !("immediateRender" in n);) n = i.vars.defaults || {}, i = W(i.vars.inherit) && i.parent;
                    o.immediateRender = W(n.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[a - 1]
                }
                return new e7(e[0], o, e[a + 1])
            },
            t9 = function(t, e) {
                return t || 0 === t ? e(t) : e
            },
            et = function(t, e, r) {
                return r < t ? t : r > e ? e : r
            },
            ee = function(t, e) {
                return L(t) && (e = te.exec(t)) ? e[1] : ""
            },
            er = [].slice,
            en = function(t, e) {
                return t && U(t) && "length" in t && (!e && !t.length || t.length - 1 in t && U(t[0])) && !t.nodeType && t !== C
            },
            ei = function(t, e, r) {
                var n;
                return w && !e && w.selector ? w.selector(t) : L(t) && !r && (M || !eE()) ? er.call((e || k).querySelectorAll(t), 0) : G(t) ? (void 0 === n && (n = []), t.forEach(function(t) {
                    var e;
                    return L(t) && !r || en(t, 1) ? (e = n).push.apply(e, ei(t)) : n.push(t)
                }) || n) : en(t) ? er.call(t, 0) : t ? [t] : []
            },
            es = function(t) {
                return t = ei(t)[0] || ta("Invalid scope") || {},
                    function(e) {
                        var r = t.current || t.nativeElement || t;
                        return ei(e, r.querySelectorAll ? r : r === t ? ta("Invalid scope") || k.createElement("div") : t)
                    }
            },
            ea = function(t) {
                return t.sort(function() {
                    return .5 - Math.random()
                })
            },
            eo = function(t) {
                if (Y(t)) return t;
                var e = U(t) ? t : {
                        each: t
                    },
                    r = eI(e.ease),
                    n = e.from || 0,
                    i = parseFloat(e.base) || 0,
                    s = {},
                    a = n > 0 && n < 1,
                    o = isNaN(n) || a,
                    u = e.axis,
                    l = n,
                    c = n;
                return L(n) ? l = c = ({
                        center: .5,
                        edges: .5,
                        end: 1
                    })[n] || 0 : !a && o && (l = n[0], c = n[1]),
                    function(t, a, h) {
                        var f, p, d, g, _, m, v, y, x, b = (h || e).length,
                            w = s[b];
                        if (!w) {
                            if (!(x = "auto" === e.grid ? 0 : (e.grid || [1, 1e8])[1])) {
                                for (v = -1e8; v < (v = h[x++].getBoundingClientRect().left) && x < b;);
                                x < b && x--
                            }
                            for (w = s[b] = [], f = o ? Math.min(x, b) * l - .5 : n % x, p = 1e8 === x ? 0 : o ? b * c / x - .5 : n / x | 0, v = 0, y = 1e8, m = 0; m < b; m++) d = m % x - f, g = p - (m / x | 0), w[m] = _ = u ? Math.abs("y" === u ? g : d) : N(d * d + g * g), _ > v && (v = _), _ < y && (y = _);
                            "random" === n && ea(w), w.max = v - y, w.min = y, w.v = b = (parseFloat(e.amount) || parseFloat(e.each) * (x > b ? b - 1 : u ? "y" === u ? b / x : x : Math.max(x, b / x)) || 0) * ("edges" === n ? -1 : 1), w.b = b < 0 ? i - b : i, w.u = ee(e.amount || e.each) || 0, r = r && b < 0 ? eF(r) : r
                        }
                        return b = (w[t] - w.min) / w.max || 0, tM(w.b + (r ? r(b) : b) * w.v) + w.u
                    }
            },
            eu = function(t) {
                var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
                return function(r) {
                    var n = tM(Math.round(parseFloat(r) / t) * t * e);
                    return (n - n % 1) / e + (X(r) ? 0 : ee(r))
                }
            },
            el = function(t, e) {
                var r, n, i = G(t);
                return !i && U(t) && (r = i = t.radius || 1e8, t.values ? (n = !X((t = ei(t.values))[0])) && (r *= r) : t = eu(t.increment)), t9(e, i ? Y(t) ? function(e) {
                    return Math.abs((n = t(e)) - e) <= r ? n : e
                } : function(e) {
                    for (var i, s, a = parseFloat(n ? e.x : e), o = parseFloat(n ? e.y : 0), u = 1e8, l = 0, c = t.length; c--;)(i = n ? (i = t[c].x - a) * i + (s = t[c].y - o) * s : Math.abs(t[c] - a)) < u && (u = i, l = c);
                    return l = !r || u <= r ? t[l] : e, n || l === e || X(e) ? l : l + ee(e)
                } : eu(t))
            },
            ec = function(t, e, r, n) {
                return t9(G(t) ? !e : !0 === r ? (r = 0, !1) : !n, function() {
                    return G(t) ? t[~~(Math.random() * t.length)] : (n = (r = r || 1e-5) < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * n) / n
                })
            },
            eh = function(t, e, r) {
                return t9(r, function(r) {
                    return t[~~e(r)]
                })
            },
            ef = function(t) {
                for (var e, r, n, i, s = 0, a = ""; ~(e = t.indexOf("random(", s));) n = t.indexOf(")", e), i = "[" === t.charAt(e + 7), r = t.substr(e + 7, n - e - 7).match(i ? tt : $), a += t.substr(s, e - s) + ec(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5), s = n + 1;
                return a + t.substr(s, t.length - s)
            },
            ep = function(t, e, r, n, i) {
                var s = e - t,
                    a = n - r;
                return t9(i, function(e) {
                    return r + ((e - t) / s * a || 0)
                })
            },
            ed = function(t, e, r) {
                var n, i, s, a = t.labels,
                    o = 1e8;
                for (n in a)(i = a[n] - e) < 0 == !!r && i && o > (i = Math.abs(i)) && (s = n, o = i);
                return s
            },
            eg = function(t, e, r) {
                var n, i, s, a = t.vars,
                    o = a[e],
                    u = w,
                    l = t._ctx;
                if (o) return n = a[e + "Params"], i = a.callbackScope || t, r && tp.length && tE(), l && (w = l), s = n ? o.apply(i, n) : o.call(i), w = u, s
            },
            e_ = function(t) {
                return tX(t), t.scrollTrigger && t.scrollTrigger.kill(!!b), 1 > t.progress() && eg(t, "onInterrupt"), t
            },
            em = [],
            ev = function(t) {
                if (t)
                    if (t = !t.name && t.default || t, H() || t.headless) {
                        var e = t.name,
                            r = Y(t),
                            n = e && !r && t.init ? function() {
                                this._props = []
                            } : t,
                            i = {
                                init: tu,
                                render: ro,
                                add: eK,
                                kill: rl,
                                modifier: ru,
                                rawVars: 0
                            },
                            s = {
                                targetTest: 0,
                                get: 0,
                                getSetter: rn,
                                aliases: {},
                                register: 0
                            };
                        if (eE(), t !== n) {
                            if (tg[e]) return;
                            tR(n, tR(tN(t, i), s)), tz(n.prototype, tz(i, tN(t, s))), tg[n.prop = e] = n, t.targetTest && (tv.push(n), tf[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
                        }
                        to(e, n), t.register && t.register(rk, n, rf)
                    } else em.push(t)
            },
            ey = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            ex = function(t, e, r) {
                return (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * 255 + .5 | 0
            },
            eb = function(t, e, r) {
                var n, i, s, a, o, u, l, c, h, f, p = t ? X(t) ? [t >> 16, t >> 8 & 255, 255 & t] : 0 : ey.black;
                if (!p) {
                    if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), ey[t]) p = ey[t];
                    else if ("#" === t.charAt(0)) {
                        if (t.length < 6 && (n = t.charAt(1), t = "#" + n + n + (i = t.charAt(2)) + i + (s = t.charAt(3)) + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(p = parseInt(t.substr(1, 6), 16)) >> 16, p >> 8 & 255, 255 & p, parseInt(t.substr(7), 16) / 255];
                        p = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & 255, 255 & t]
                    } else if ("hsl" === t.substr(0, 3))
                        if (p = f = t.match($), e) {
                            if (~t.indexOf("=")) return p = t.match(Q), r && p.length < 4 && (p[3] = 1), p
                        } else a = p[0] % 360 / 360, o = p[1] / 100, i = (u = p[2] / 100) <= .5 ? u * (o + 1) : u + o - u * o, n = 2 * u - i, p.length > 3 && (p[3] *= 1), p[0] = ex(a + 1 / 3, n, i), p[1] = ex(a, n, i), p[2] = ex(a - 1 / 3, n, i);
                    else p = t.match($) || ey.transparent;
                    p = p.map(Number)
                }
                return e && !f && (n = p[0] / 255, u = ((l = Math.max(n, i = p[1] / 255, s = p[2] / 255)) + (c = Math.min(n, i, s))) / 2, l === c ? a = o = 0 : (h = l - c, o = u > .5 ? h / (2 - l - c) : h / (l + c), a = (l === n ? (i - s) / h + 6 * (i < s) : l === i ? (s - n) / h + 2 : (n - i) / h + 4) * 60), p[0] = ~~(a + .5), p[1] = ~~(100 * o + .5), p[2] = ~~(100 * u + .5)), r && p.length < 4 && (p[3] = 1), p
            },
            ew = function(t) {
                var e = [],
                    r = [],
                    n = -1;
                return t.split(eC).forEach(function(t) {
                    var i = t.match(Z) || [];
                    e.push.apply(e, i), r.push(n += i.length + 1)
                }), e.c = r, e
            },
            eT = function(t, e, r) {
                var n, i, s, a, o = "",
                    u = (t + o).match(eC),
                    l = e ? "hsla(" : "rgba(",
                    c = 0;
                if (!u) return t;
                if (u = u.map(function(t) {
                        return (t = eb(t, e, 1)) && l + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
                    }), r && (s = ew(t), (n = r.c).join(o) !== s.c.join(o)))
                    for (a = (i = t.replace(eC, "1").split(Z)).length - 1; c < a; c++) o += i[c] + (~n.indexOf(c) ? u.shift() || l + "0,0,0,0)" : (s.length ? s : u.length ? u : r).shift());
                if (!i)
                    for (a = (i = t.split(eC)).length - 1; c < a; c++) o += i[c] + u[c];
                return o + i[a]
            },
            eC = function() {
                var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
                for (t in ey) e += "|" + t + "\\b";
                return RegExp(e + ")", "gi")
            }(),
            eM = /hsl[a]?\(/,
            ek = function(t) {
                var e, r = t.join(" ");
                if (eC.lastIndex = 0, eC.test(r)) return e = eM.test(r), t[1] = eT(t[1], e), t[0] = eT(t[0], e, ew(t[1])), !0
            },
            eO = (h = Date.now, f = 500, p = 33, g = d = h(), _ = 1e3 / 240, m = 1e3 / 240, v = [], y = function t(e) {
                var r, n, i, o, y = h() - g,
                    x = !0 === e;
                if ((y > f || y < 0) && (d += y - p), g += y, ((r = (i = g - d) - m) > 0 || x) && (o = ++u.frame, l = i - 1e3 * u.time, u.time = i /= 1e3, m += r + (r >= _ ? 4 : _ - r), n = 1), x || (s = a(t)), n)
                    for (c = 0; c < v.length; c++) v[c](i, l, o, e)
            }, u = {
                time: 0,
                frame: 0,
                tick: function() {
                    y(!0)
                },
                deltaRatio: function(t) {
                    return l / (1e3 / (t || 60))
                },
                wake: function() {
                    O && (!M && H() && (k = (C = M = window).document || {}, tr.gsap = rk, (C.gsapVersions || (C.gsapVersions = [])).push(rk.version), ti(tn || C.GreenSockGlobals || !C.gsap && C || {}), em.forEach(ev)), o = "u" > typeof requestAnimationFrame && requestAnimationFrame, s && u.sleep(), a = o || function(t) {
                        return setTimeout(t, m - 1e3 * u.time + 1 | 0)
                    }, A = 1, y(2))
                },
                sleep: function() {
                    (o ? cancelAnimationFrame : clearTimeout)(s), A = 0, a = tu
                },
                lagSmoothing: function(t, e) {
                    p = Math.min(e || 33, f = t || 1 / 0)
                },
                fps: function(t) {
                    _ = 1e3 / (t || 240), m = 1e3 * u.time + _
                },
                add: function(t, e, r) {
                    var n = e ? function(e, r, i, s) {
                        t(e, r, i, s), u.remove(n)
                    } : t;
                    return u.remove(t), v[r ? "unshift" : "push"](n), eE(), n
                },
                remove: function(t, e) {
                    ~(e = v.indexOf(t)) && v.splice(e, 1) && c >= e && c--
                },
                _listeners: v
            }),
            eE = function() {
                return !A && eO.wake()
            },
            eS = {},
            eA = /^[\d.\-M][\d.\-,\s]/,
            eP = /["']/g,
            eD = function(t) {
                for (var e, r, n, i = {}, s = t.substr(1, t.length - 3).split(":"), a = s[0], o = 1, u = s.length; o < u; o++) r = s[o], e = o !== u - 1 ? r.lastIndexOf(",") : r.length, n = r.substr(0, e), i[a] = isNaN(n) ? n.replace(eP, "").trim() : +n, a = r.substr(e + 1).trim();
                return i
            },
            eR = function(t) {
                var e = t.indexOf("(") + 1,
                    r = t.indexOf(")"),
                    n = t.indexOf("(", e);
                return t.substring(e, ~n && n < r ? t.indexOf(")", r + 1) : r)
            },
            ez = function(t) {
                var e = (t + "").split("("),
                    r = eS[e[0]];
                return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [eD(e[1])] : eR(t).split(",").map(tP)) : eS._CE && eA.test(t) ? eS._CE("", t) : r
            },
            eF = function(t) {
                return function(e) {
                    return 1 - t(1 - e)
                }
            },
            eN = function t(e, r) {
                for (var n, i = e._first; i;) i instanceof eW ? t(i, r) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === r || (i.timeline ? t(i.timeline, r) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = r)), i = i._next
            },
            eI = function(t, e) {
                return t && (Y(t) ? t : eS[t] || ez(t)) || e
            },
            eB = function(t, e, r, n) {
                void 0 === r && (r = function(t) {
                    return 1 - e(1 - t)
                }), void 0 === n && (n = function(t) {
                    return t < .5 ? e(2 * t) / 2 : 1 - e((1 - t) * 2) / 2
                });
                var i, s = {
                    easeIn: e,
                    easeOut: r,
                    easeInOut: n
                };
                return tT(t, function(t) {
                    for (var e in eS[t] = tr[t] = s, eS[i = t.toLowerCase()] = r, s) eS[i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = eS[t + "." + e] = s[e]
                }), s
            },
            eL = function(t) {
                return function(e) {
                    return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t((e - .5) * 2) / 2
                }
            },
            eY = function t(e, r, n) {
                var i = r >= 1 ? r : 1,
                    s = (n || (e ? .3 : .45)) / (r < 1 ? r : 1),
                    a = s / R * (Math.asin(1 / i) || 0),
                    o = function(t) {
                        return 1 === t ? 1 : i * Math.pow(2, -10 * t) * B((t - a) * s) + 1
                    },
                    u = "out" === e ? o : "in" === e ? function(t) {
                        return 1 - o(1 - t)
                    } : eL(o);
                return s = R / s, u.config = function(r, n) {
                    return t(e, r, n)
                }, u
            },
            eX = function t(e, r) {
                void 0 === r && (r = 1.70158);
                var n = function(t) {
                        return t ? --t * t * ((r + 1) * t + r) + 1 : 0
                    },
                    i = "out" === e ? n : "in" === e ? function(t) {
                        return 1 - n(1 - t)
                    } : eL(n);
                return i.config = function(r) {
                    return t(e, r)
                }, i
            };
        tT("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
            var r = e < 5 ? e + 1 : e;
            eB(t + ",Power" + (r - 1), e ? function(t) {
                return Math.pow(t, r)
            } : function(t) {
                return t
            }, function(t) {
                return 1 - Math.pow(1 - t, r)
            }, function(t) {
                return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow((1 - t) * 2, r) / 2
            })
        }), eS.Linear.easeNone = eS.none = eS.Linear.easeIn, eB("Elastic", eY("in"), eY("out"), eY()), eV = 2 * (eH = 1 / 2.75), ej = 2.5 * eH, eB("Bounce", function(t) {
            return 1 - eG(1 - t)
        }, eG = function(t) {
            return t < eH ? 7.5625 * t * t : t < eV ? 7.5625 * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < ej ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * Math.pow(t - 2.625 / 2.75, 2) + .984375
        }), eB("Expo", function(t) {
            return Math.pow(2, 10 * (t - 1)) * t + t * t * t * t * t * t * (1 - t)
        }), eB("Circ", function(t) {
            return -(N(1 - t * t) - 1)
        }), eB("Sine", function(t) {
            return 1 === t ? 1 : -I(t * z) + 1
        }), eB("Back", eX("in"), eX("out"), eX()), eS.SteppedEase = eS.steps = tr.SteppedEase = {
            config: function(t, e) {
                void 0 === t && (t = 1);
                var r = 1 / t,
                    n = t + +!e,
                    i = +!!e,
                    s = 1 - 1e-8;
                return function(t) {
                    return ((n * et(0, s, t) | 0) + i) * r
                }
            }
        }, D.ease = eS["quad.out"], tT("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
            return ty += t + "," + t + "Params,"
        });
        var eq = function(t, e) {
                this.id = F++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : tw, this.set = e ? e.getSetter : rn
            },
            eU = function() {
                function t(t) {
                    this.vars = t, this._delay = +t.delay || 0, (this._repeat = 1 / 0 === t.repeat ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, t3(this, +t.duration, 1, 1), this.data = t.data, w && (this._ctx = w, w.data.push(this)), A || eO.wake()
                }
                var e = t.prototype;
                return e.delay = function(t) {
                    return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
                }, e.duration = function(t) {
                    return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
                }, e.totalDuration = function(t) {
                    return arguments.length ? (this._dirty = 0, t3(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
                }, e.totalTime = function(t, e) {
                    if (eE(), !arguments.length) return this._tTime;
                    var r = this._dp;
                    if (r && r.smoothChildTiming && this._ts) {
                        for (t$(this, t), !r._dp || r.parent || tQ(r, this); r && r.parent;) r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : -((r.totalDuration() - r._tTime) / r._ts)) && r.totalTime(r._tTime, !0), r = r.parent;
                        !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && tZ(this._dp, this, this._start - this._delay)
                    }
                    return this._tTime === t && (this._dur || e) && (!this._initted || 1e-8 !== Math.abs(this._zTime)) && (t || this._initted || !this.add && !this._ptLookup) || (this._ts || (this._pTime = t), tA(this, t, e)), this
                }, e.time = function(t, e) {
                    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + tH(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
                }, e.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0
                }, e.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(1 & this.iteration()) ? 1 - t : t) + tH(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : +(this.rawTime() > 0)
                }, e.iteration = function(t, e) {
                    var r = this.duration() + this._rDelay;
                    return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? tV(this._tTime, r) + 1 : 1
                }, e.timeScale = function(t, e) {
                    if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
                    if (this._rts === t) return this;
                    var r = this.parent && this._ts ? tj(this.parent._time, this) : this._tTime;
                    return this._rts = +t || 0, this._ts = this._ps || -1e-8 === t ? 0 : this._rts, this.totalTime(et(-Math.abs(this._delay), this.totalDuration(), r), !1 !== e), tG(this), tU(this)
                }, e.paused = function(t) {
                    return arguments.length ? (this._ps !== t && (this._ps = t, t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (eE(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && 1e-8 !== Math.abs(this._zTime) && (this._tTime -= 1e-8)))), this) : this._ps
                }, e.startTime = function(t) {
                    if (arguments.length) {
                        this._start = t;
                        var e = this.parent || this._dp;
                        return e && (e._sort || !this.parent) && tZ(e, this, t - this._delay), this
                    }
                    return this._start
                }, e.endTime = function(t) {
                    return this._start + (W(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
                }, e.rawTime = function(t) {
                    var e = this.parent || this._dp;
                    return e ? t && (!this._ts || this._repeat && this._time && 1 > this.totalProgress()) ? this._tTime % (this._dur + this._rDelay) : this._ts ? tj(e.rawTime(t), this) : this._tTime : this._tTime
                }, e.revert = function(t) {
                    void 0 === t && (t = th);
                    var e = b;
                    return b = t, tS(this) && (this.timeline && this.timeline.revert(t), this.totalTime(-.01, t.suppressEvents)), "nested" !== this.data && !1 !== t.kill && this.kill(), b = e, this
                }, e.globalTime = function(t) {
                    for (var e = this, r = arguments.length ? t : e.rawTime(); e;) r = e._start + r / (Math.abs(e._ts) || 1), e = e._dp;
                    return !this.parent && this._sat ? this._sat.globalTime(t) : r
                }, e.repeat = function(t) {
                    return arguments.length ? (this._repeat = 1 / 0 === t ? -2 : t, t8(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
                }, e.repeatDelay = function(t) {
                    if (arguments.length) {
                        var e = this._time;
                        return this._rDelay = t, t8(this), e ? this.time(e) : this
                    }
                    return this._rDelay
                }, e.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, e.seek = function(t, e) {
                    return this.totalTime(t6(this, t), W(e))
                }, e.restart = function(t, e) {
                    return this.play().totalTime(t ? -this._delay : 0, W(e)), this._dur || (this._zTime = -1e-8), this
                }, e.play = function(t, e) {
                    return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                }, e.reverse = function(t, e) {
                    return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
                }, e.pause = function(t, e) {
                    return null != t && this.seek(t, e), this.paused(!0)
                }, e.resume = function() {
                    return this.paused(!1)
                }, e.reversed = function(t) {
                    return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)), this) : this._rts < 0
                }, e.invalidate = function() {
                    return this._initted = this._act = 0, this._zTime = -1e-8, this
                }, e.isActive = function() {
                    var t, e = this.parent || this._dp,
                        r = this._start;
                    return !!(!e || this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - 1e-8)
                }, e.eventCallback = function(t, e, r) {
                    var n = this.vars;
                    return arguments.length > 1 ? (e ? (n[t] = e, r && (n[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete n[t], this) : n[t]
                }, e.then = function(t) {
                    var e = this;
                    return new Promise(function(r) {
                        var n = Y(t) ? t : tD,
                            i = function() {
                                var t = e.then;
                                e.then = null, Y(n) && (n = n(e)) && (n.then || n === e) && (e.then = t), r(n), e.then = t
                            };
                        e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? i() : e._prom = i
                    })
                }, e.kill = function() {
                    e_(this)
                }, t
            }();
        tR(eU.prototype, {
            _time: 0,
            _start: 0,
            _end: 0,
            _tTime: 0,
            _tDur: 0,
            _dirty: 0,
            _repeat: 0,
            _yoyo: !1,
            parent: null,
            _initted: !1,
            _rDelay: 0,
            _ts: 1,
            _dp: 0,
            ratio: 0,
            _zTime: -1e-8,
            _prom: 0,
            _ps: !1,
            _rts: 1
        });
        var eW = function(t) {
            function n(r, n) {
                var i;
                return void 0 === r && (r = {}), (i = t.call(this, r) || this).labels = {}, i.smoothChildTiming = !!r.smoothChildTiming, i.autoRemoveChildren = !!r.autoRemoveChildren, i._sort = W(r.sortChildren), T && tZ(r.parent || T, e(i), n), r.reversed && i.reverse(), r.paused && i.paused(!0), r.scrollTrigger && tK(e(i), r.scrollTrigger), i
            }
            r(n, t);
            var i = n.prototype;
            return i.to = function(t, e, r) {
                return t7(0, arguments, this), this
            }, i.from = function(t, e, r) {
                return t7(1, arguments, this), this
            }, i.fromTo = function(t, e, r, n) {
                return t7(2, arguments, this), this
            }, i.set = function(t, e, r) {
                return e.duration = 0, e.parent = this, tI(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new e7(t, e, t6(this, r), 1), this
            }, i.call = function(t, e, r) {
                return tZ(this, e7.delayedCall(0, t, e), r)
            }, i.staggerTo = function(t, e, r, n, i, s, a) {
                return r.duration = e, r.stagger = r.stagger || n, r.onComplete = s, r.onCompleteParams = a, r.parent = this, new e7(t, r, t6(this, i)), this
            }, i.staggerFrom = function(t, e, r, n, i, s, a) {
                return r.runBackwards = 1, tI(r).immediateRender = W(r.immediateRender), this.staggerTo(t, e, r, n, i, s, a)
            }, i.staggerFromTo = function(t, e, r, n, i, s, a, o) {
                return n.startAt = r, tI(n).immediateRender = W(n.immediateRender), this.staggerTo(t, e, n, i, s, a, o)
            }, i.render = function(t, e, r) {
                var n, i, s, a, o, u, l, c, h, f, p, d, g = this._time,
                    _ = this._dirty ? this.totalDuration() : this._tDur,
                    m = this._dur,
                    v = t <= 0 ? 0 : tM(t),
                    y = this._zTime < 0 != t < 0 && (this._initted || !m);
                if (this !== T && v > _ && t >= 0 && (v = _), v !== this._tTime || r || y) {
                    if (g !== this._time && m && (v += this._time - g, t += this._time - g), n = v, h = this._start, u = !(c = this._ts), y && (m || (g = this._zTime), (t || !e) && (this._zTime = t)), this._repeat) {
                        if (p = this._yoyo, o = m + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * o + t, e, r);
                        if (n = tM(v % o), v === _ ? (a = this._repeat, n = m) : ((a = ~~(f = tM(v / o))) && a === f && (n = m, a--), n > m && (n = m)), f = tV(this._tTime, o), !g && this._tTime && f !== a && this._tTime - f * o - this._dur <= 0 && (f = a), p && 1 & a && (n = m - n, d = 1), a !== f && !this._lock) {
                            var x = p && 1 & f,
                                w = x === (p && 1 & a);
                            if (a < f && (x = !x), g = x ? 0 : v % m ? m : v, this._lock = 1, this.render(g || (d ? 0 : tM(a * o)), e, !m)._lock = 0, this._tTime = v, !e && this.parent && eg(this, "onRepeat"), this.vars.repeatRefresh && !d && (this.invalidate()._lock = 1), g && g !== this._time || u !== !this._ts || this.vars.onRepeat && !this.parent && !this._act || (m = this._dur, _ = this._tDur, w && (this._lock = 2, g = x ? m : -1e-4, this.render(g, !0), this.vars.repeatRefresh && !d && this.invalidate()), this._lock = 0, !this._ts && !u)) return this;
                            eN(this, d)
                        }
                    }
                    if (this._hasPause && !this._forcing && this._lock < 2 && (l = t5(this, tM(g), tM(n))) && (v -= n - (n = l._start)), this._tTime = v, this._time = n, this._act = !c, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, g = 0), !g && v && !e && !f && (eg(this, "onStart"), this._tTime !== v)) return this;
                    if (n >= g && t >= 0)
                        for (i = this._first; i;) {
                            if (s = i._next, (i._act || n >= i._start) && i._ts && l !== i) {
                                if (i.parent !== this) return this.render(t, e, r);
                                if (i.render(i._ts > 0 ? (n - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (n - i._start) * i._ts, e, r), n !== this._time || !this._ts && !u) {
                                    l = 0, s && (v += this._zTime = -1e-8);
                                    break
                                }
                            }
                            i = s
                        } else {
                            i = this._last;
                            for (var C = t < 0 ? t : n; i;) {
                                if (s = i._prev, (i._act || C <= i._end) && i._ts && l !== i) {
                                    if (i.parent !== this) return this.render(t, e, r);
                                    if (i.render(i._ts > 0 ? (C - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (C - i._start) * i._ts, e, r || b && tS(i)), n !== this._time || !this._ts && !u) {
                                        l = 0, s && (v += this._zTime = C ? -1e-8 : 1e-8);
                                        break
                                    }
                                }
                                i = s
                            }
                        }
                    if (l && !e && (this.pause(), l.render(n >= g ? 0 : -1e-8)._zTime = n >= g ? 1 : -1, this._ts)) return this._start = h, tG(this), this.render(t, e, r);
                    this._onUpdate && !e && eg(this, "onUpdate", !0), (v === _ && this._tTime >= this.totalDuration() || !v && g) && (h === this._start || Math.abs(c) !== Math.abs(this._ts)) && !this._lock && ((t || !m) && (v === _ && this._ts > 0 || !v && this._ts < 0) && tX(this, 1), e || t < 0 && !g || !v && !g && _ || (eg(this, v === _ && t >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(v < _ && this.timeScale() > 0) && this._prom()))
                }
                return this
            }, i.add = function(t, e) {
                var r = this;
                if (X(e) || (e = t6(this, e, t)), !(t instanceof eU)) {
                    if (G(t)) return t.forEach(function(t) {
                        return r.add(t, e)
                    }), this;
                    if (L(t)) return this.addLabel(t, e);
                    if (!Y(t)) return this;
                    t = e7.delayedCall(0, t)
                }
                return this !== t ? tZ(this, t, e) : this
            }, i.getChildren = function(t, e, r, n) {
                void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === n && (n = -1e8);
                for (var i = [], s = this._first; s;) s._start >= n && (s instanceof e7 ? e && i.push(s) : (r && i.push(s), t && i.push.apply(i, s.getChildren(!0, e, r)))), s = s._next;
                return i
            }, i.getById = function(t) {
                for (var e = this.getChildren(1, 1, 1), r = e.length; r--;)
                    if (e[r].vars.id === t) return e[r]
            }, i.remove = function(t) {
                return L(t) ? this.removeLabel(t) : Y(t) ? this.killTweensOf(t) : (t.parent === this && tY(this, t), t === this._recent && (this._recent = this._last), tq(this))
            }, i.totalTime = function(e, r) {
                return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = tM(eO.time - (this._ts > 0 ? e / this._ts : -((this.totalDuration() - e) / this._ts)))), t.prototype.totalTime.call(this, e, r), this._forcing = 0, this) : this._tTime
            }, i.addLabel = function(t, e) {
                return this.labels[t] = t6(this, e), this
            }, i.removeLabel = function(t) {
                return delete this.labels[t], this
            }, i.addPause = function(t, e, r) {
                var n = e7.delayedCall(0, e || tu, r);
                return n.data = "isPause", this._hasPause = 1, tZ(this, n, t6(this, t))
            }, i.removePause = function(t) {
                var e = this._first;
                for (t = t6(this, t); e;) e._start === t && "isPause" === e.data && tX(e), e = e._next
            }, i.killTweensOf = function(t, e, r) {
                for (var n = this.getTweensOf(t, r), i = n.length; i--;) e$ !== n[i] && n[i].kill(t, e);
                return this
            }, i.getTweensOf = function(t, e) {
                for (var r, n = [], i = ei(t), s = this._first, a = X(e); s;) s instanceof e7 ? tO(s._targets, i) && (a ? (!e$ || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && n.push(s) : (r = s.getTweensOf(i, e)).length && n.push.apply(n, r), s = s._next;
                return n
            }, i.tweenTo = function(t, e) {
                e = e || {};
                var r, n = this,
                    i = t6(n, t),
                    s = e,
                    a = s.startAt,
                    o = s.onStart,
                    u = s.onStartParams,
                    l = s.immediateRender,
                    c = e7.to(n, tR({
                        ease: e.ease || "none",
                        lazy: !1,
                        immediateRender: !1,
                        time: i,
                        overwrite: "auto",
                        duration: e.duration || Math.abs((i - (a && "time" in a ? a.time : n._time)) / n.timeScale()) || 1e-8,
                        onStart: function() {
                            if (n.pause(), !r) {
                                var t = e.duration || Math.abs((i - (a && "time" in a ? a.time : n._time)) / n.timeScale());
                                c._dur !== t && t3(c, t, 0, 1).render(c._time, !0, !0), r = 1
                            }
                            o && o.apply(c, u || [])
                        }
                    }, e));
                return l ? c.render(0) : c
            }, i.tweenFromTo = function(t, e, r) {
                return this.tweenTo(e, tR({
                    startAt: {
                        time: t6(this, t)
                    }
                }, r))
            }, i.recent = function() {
                return this._recent
            }, i.nextLabel = function(t) {
                return void 0 === t && (t = this._time), ed(this, t6(this, t))
            }, i.previousLabel = function(t) {
                return void 0 === t && (t = this._time), ed(this, t6(this, t), 1)
            }, i.currentLabel = function(t) {
                return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + 1e-8)
            }, i.shiftChildren = function(t, e, r) {
                void 0 === r && (r = 0);
                for (var n, i = this._first, s = this.labels; i;) i._start >= r && (i._start += t, i._end += t), i = i._next;
                if (e)
                    for (n in s) s[n] >= r && (s[n] += t);
                return tq(this)
            }, i.invalidate = function(e) {
                var r = this._first;
                for (this._lock = 0; r;) r.invalidate(e), r = r._next;
                return t.prototype.invalidate.call(this, e)
            }, i.clear = function(t) {
                void 0 === t && (t = !0);
                for (var e, r = this._first; r;) e = r._next, this.remove(r), r = e;
                return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), tq(this)
            }, i.totalDuration = function(t) {
                var e, r, n, i = 0,
                    s = this._last,
                    a = 1e8;
                if (arguments.length) return this.timeScale((this._repeat < 0 ? this.duration() : this.totalDuration()) / (this.reversed() ? -t : t));
                if (this._dirty) {
                    for (n = this.parent; s;) e = s._prev, s._dirty && s.totalDuration(), (r = s._start) > a && this._sort && s._ts && !this._lock ? (this._lock = 1, tZ(this, s, r - s._delay, 1)._lock = 0) : a = r, r < 0 && s._ts && (i -= r, (!n && !this._dp || n && n.smoothChildTiming) && (this._start += r / this._ts, this._time -= r, this._tTime -= r), this.shiftChildren(-r, !1, -1 / 0), a = 0), s._end > i && s._ts && (i = s._end), s = e;
                    t3(this, this === T && this._time > i ? this._time : i, 1, 1), this._dirty = 0
                }
                return this._tDur
            }, n.updateRoot = function(t) {
                if (T._ts && (tA(T, tj(t, T)), E = eO.frame), eO.frame >= tm) {
                    tm += P.autoSleep || 120;
                    var e = T._first;
                    if ((!e || !e._ts) && P.autoSleep && eO._listeners.length < 2) {
                        for (; e && !e._ts;) e = e._next;
                        e || eO.sleep()
                    }
                }
            }, n
        }(eU);
        tR(eW.prototype, {
            _lock: 0,
            _hasPause: 0,
            _forcing: 0
        });
        var eH, eV, ej, eG, e$, eQ, eZ = function(t, e, r, n, i, s, a) {
                var o, u, l, c, h, f, p, d, g = new rf(this._pt, t, e, 0, 1, ra, null, i),
                    _ = 0,
                    m = 0;
                for (g.b = r, g.e = n, r += "", n += "", (p = ~n.indexOf("random(")) && (n = ef(n)), s && (s(d = [r, n], t, e), r = d[0], n = d[1]), u = r.match(K) || []; o = K.exec(n);) c = o[0], h = n.substring(_, o.index), l ? l = (l + 1) % 5 : "rgba(" === h.substr(-5) && (l = 1), c !== u[m++] && (f = parseFloat(u[m - 1]) || 0, g._pt = {
                    _next: g._pt,
                    p: h || 1 === m ? h : ",",
                    s: f,
                    c: "=" === c.charAt(1) ? tk(f, c) - f : parseFloat(c) - f,
                    m: l && l < 4 ? Math.round : 0
                }, _ = K.lastIndex);
                return g.c = _ < n.length ? n.substring(_, n.length) : "", g.fp = a, (J.test(n) || p) && (g.e = 0), this._pt = g, g
            },
            eK = function(t, e, r, n, i, s, a, o, u, l) {
                Y(n) && (n = n(i || 0, t, s));
                var c, h = t[e],
                    f = "get" !== r ? r : Y(h) ? u ? t[e.indexOf("set") || !Y(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : h,
                    p = Y(h) ? u ? re : rt : e9;
                if (L(n) && (~n.indexOf("random(") && (n = ef(n)), "=" === n.charAt(1) && ((c = tk(f, n) + (ee(f) || 0)) || 0 === c) && (n = c)), !l || f !== n || eQ) return isNaN(f * n) || "" === n ? (h || e in t || ts(e, n), eZ.call(this, t, e, f, n, p, o || P.stringFilter, u)) : (c = new rf(this._pt, t, e, +f || 0, n - (f || 0), "boolean" == typeof h ? rs : ri, 0, p), u && (c.fp = u), a && c.modifier(a, this, t), this._pt = c)
            },
            eJ = function(t, e, r, n, i) {
                if (Y(t) && (t = e8(t, i, e, r, n)), !U(t) || t.style && t.nodeType || G(t) || j(t)) return L(t) ? e8(t, i, e, r, n) : t;
                var s, a = {};
                for (s in t) a[s] = e8(t[s], i, e, r, n);
                return a
            },
            e0 = function(t, e, r, n, i, s) {
                var a, o, u, l;
                if (tg[t] && !1 !== (a = new tg[t]).init(i, a.rawVars ? e[t] : eJ(e[t], n, i, s, r), r, n, s) && (r._pt = o = new rf(r._pt, i, t, 0, 1, a.render, a, 0, a.priority), r !== S))
                    for (u = r._ptLookup[r._targets.indexOf(i)], l = a._props.length; l--;) u[a._props[l]] = o;
                return a
            },
            e1 = function t(e, r, n) {
                var i, s, a, o, u, l, c, h, f, p, d, g, _, m = e.vars,
                    v = m.ease,
                    y = m.startAt,
                    w = m.immediateRender,
                    C = m.lazy,
                    M = m.onUpdate,
                    k = m.runBackwards,
                    O = m.yoyoEase,
                    E = m.keyframes,
                    S = m.autoRevert,
                    A = e._dur,
                    P = e._startAt,
                    R = e._targets,
                    z = e.parent,
                    F = z && "nested" === z.data ? z.vars.targets : R,
                    N = "auto" === e._overwrite && !x,
                    I = e.timeline;
                if (!I || E && v || (v = "none"), e._ease = eI(v, D.ease), e._yEase = O ? eF(eI(!0 === O ? v : O, D.ease)) : 0, O && e._yoyo && !e._repeat && (O = e._yEase, e._yEase = e._ease, e._ease = O), e._from = !I && !!m.runBackwards, !I || E && !m.stagger) {
                    if (g = (h = R[0] ? tb(R[0]).harness : 0) && m[h.prop], i = tN(m, tf), P && (P._zTime < 0 && P.progress(1), r < 0 && k && w && !S ? P.render(-1, !0) : P.revert(k && A ? tc : tl), P._lazy = 0), y) {
                        if (tX(e._startAt = e7.set(R, tR({
                                data: "isStart",
                                overwrite: !1,
                                parent: z,
                                immediateRender: !0,
                                lazy: !P && W(C),
                                startAt: null,
                                delay: 0,
                                onUpdate: M && function() {
                                    return eg(e, "onUpdate")
                                },
                                stagger: 0
                            }, y))), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (b || !w && !S) && e._startAt.revert(tc), w && A && r <= 0 && n <= 0) {
                            r && (e._zTime = r);
                            return
                        }
                    } else if (k && A && !P)
                        if (r && (w = !1), a = tR({
                                overwrite: !1,
                                data: "isFromStart",
                                lazy: w && !P && W(C),
                                immediateRender: w,
                                stagger: 0,
                                parent: z
                            }, i), g && (a[h.prop] = g), tX(e._startAt = e7.set(R, a)), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (b ? e._startAt.revert(tc) : e._startAt.render(-1, !0)), e._zTime = r, w) {
                            if (!r) return
                        } else t(e._startAt, 1e-8, 1e-8);
                    for (e._pt = e._ptCache = 0, C = A && W(C) || C && !A, s = 0; s < R.length; s++) {
                        if (c = (u = R[s])._gsap || tx(R)[s]._gsap, e._ptLookup[s] = p = {}, td[c.id] && tp.length && tE(), d = F === R ? s : F.indexOf(u), h && !1 !== (f = new h).init(u, g || i, e, d, F) && (e._pt = o = new rf(e._pt, u, f.name, 0, 1, f.render, f, 0, f.priority), f._props.forEach(function(t) {
                                p[t] = o
                            }), f.priority && (l = 1)), !h || g)
                            for (a in i) tg[a] && (f = e0(a, i, e, d, u, F)) ? f.priority && (l = 1) : p[a] = o = eK.call(e, u, a, "get", i[a], d, F, 0, m.stringFilter);
                        e._op && e._op[s] && e.kill(u, e._op[s]), N && e._pt && (e$ = e, T.killTweensOf(u, p, e.globalTime(r)), _ = !e.parent, e$ = 0), e._pt && C && (td[c.id] = 1)
                    }
                    l && rh(e), e._onInit && e._onInit(e)
                }
                e._onUpdate = M, e._initted = (!e._op || e._pt) && !_, E && r <= 0 && I.render(1e8, !0, !0)
            },
            e2 = function(t, e, r, n, i, s, a, o) {
                var u, l, c, h, f = (t._pt && t._ptCache || (t._ptCache = {}))[e];
                if (!f)
                    for (f = t._ptCache[e] = [], c = t._ptLookup, h = t._targets.length; h--;) {
                        if ((u = c[h][e]) && u.d && u.d._pt)
                            for (u = u.d._pt; u && u.p !== e && u.fp !== e;) u = u._next;
                        if (!u) return eQ = 1, t.vars[e] = "+=0", e1(t, a), eQ = 0, o ? ta(e + " not eligible for reset") : 1;
                        f.push(u)
                    }
                for (h = f.length; h--;)(u = (l = f[h])._pt || l).s = (n || 0 === n) && !i ? n : u.s + (n || 0) + s * u.c, u.c = r - u.s, l.e && (l.e = tC(r) + ee(l.e)), l.b && (l.b = u.s + ee(l.b))
            },
            e5 = function(t, e) {
                var r, n, i, s, a = t[0] ? tb(t[0]).harness : 0,
                    o = a && a.aliases;
                if (!o) return e;
                for (n in r = tz({}, e), o)
                    if (n in r)
                        for (i = (s = o[n].split(",")).length; i--;) r[s[i]] = r[n];
                return r
            },
            e3 = function(t, e, r, n) {
                var i, s, a = e.ease || n || "power1.inOut";
                if (G(e)) s = r[t] || (r[t] = []), e.forEach(function(t, r) {
                    return s.push({
                        t: r / (e.length - 1) * 100,
                        v: t,
                        e: a
                    })
                });
                else
                    for (i in e) s = r[i] || (r[i] = []), "ease" === i || s.push({
                        t: parseFloat(t),
                        v: e[i],
                        e: a
                    })
            },
            e8 = function(t, e, r, n, i) {
                return Y(t) ? t.call(e, r, n, i) : L(t) && ~t.indexOf("random(") ? ef(t) : t
            },
            e4 = ty + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
            e6 = {};
        tT(e4 + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
            return e6[t] = 1
        });
        var e7 = function(t) {
            function n(r, n, i, s) {
                "number" == typeof n && (i.duration = n, n = i, i = null);
                var a, o, u, l, c, h, f, p, d = t.call(this, s ? n : tI(n)) || this,
                    g = d.vars,
                    _ = g.duration,
                    m = g.delay,
                    v = g.immediateRender,
                    y = g.stagger,
                    b = g.overwrite,
                    w = g.keyframes,
                    C = g.defaults,
                    M = g.scrollTrigger,
                    k = g.yoyoEase,
                    O = n.parent || T,
                    E = (G(r) || j(r) ? X(r[0]) : "length" in n) ? [r] : ei(r);
                if (d._targets = E.length ? tx(E) : ta("GSAP target " + r + " not found. https://gsap.com", !P.nullTargetWarn) || [], d._ptLookup = [], d._overwrite = b, w || y || V(_) || V(m)) {
                    if (n = d.vars, (a = d.timeline = new eW({
                            data: "nested",
                            defaults: C || {},
                            targets: O && "nested" === O.data ? O.vars.targets : E
                        })).kill(), a.parent = a._dp = e(d), a._start = 0, y || V(_) || V(m)) {
                        if (l = E.length, f = y && eo(y), U(y))
                            for (c in y) ~e4.indexOf(c) && (p || (p = {}), p[c] = y[c]);
                        for (o = 0; o < l; o++)(u = tN(n, e6)).stagger = 0, k && (u.yoyoEase = k), p && tz(u, p), h = E[o], u.duration = +e8(_, e(d), o, h, E), u.delay = (+e8(m, e(d), o, h, E) || 0) - d._delay, !y && 1 === l && u.delay && (d._delay = m = u.delay, d._start += m, u.delay = 0), a.to(h, u, f ? f(o, h, E) : 0), a._ease = eS.none;
                        a.duration() ? _ = m = 0 : d.timeline = 0
                    } else if (w) {
                        tI(tR(a.vars.defaults, {
                            ease: "none"
                        })), a._ease = eI(w.ease || n.ease || "none");
                        var S, A, D, R = 0;
                        if (G(w)) w.forEach(function(t) {
                            return a.to(E, t, ">")
                        }), a.duration();
                        else {
                            for (c in u = {}, w) "ease" === c || "easeEach" === c || e3(c, w[c], u, w.easeEach);
                            for (c in u)
                                for (S = u[c].sort(function(t, e) {
                                        return t.t - e.t
                                    }), R = 0, o = 0; o < S.length; o++)(D = {
                                    ease: (A = S[o]).e,
                                    duration: (A.t - (o ? S[o - 1].t : 0)) / 100 * _
                                })[c] = A.v, a.to(E, D, R), R += D.duration;
                            a.duration() < _ && a.to({}, {
                                duration: _ - a.duration()
                            })
                        }
                    }
                    _ || d.duration(_ = a.duration())
                } else d.timeline = 0;
                return !0 !== b || x || (e$ = e(d), T.killTweensOf(E), e$ = 0), tZ(O, e(d), i), n.reversed && d.reverse(), n.paused && d.paused(!0), (v || !_ && !w && d._start === tM(O._time) && W(v) && function t(e) {
                    return !e || e._ts && t(e.parent)
                }(e(d)) && "nested" !== O.data) && (d._tTime = -1e-8, d.render(Math.max(0, -m) || 0)), M && tK(e(d), M), d
            }
            r(n, t);
            var i = n.prototype;
            return i.render = function(t, e, r) {
                var n, i, s, a, o, u, l, c, h, f = this._time,
                    p = this._tDur,
                    d = this._dur,
                    g = t < 0,
                    _ = t > p - 1e-8 && !g ? p : t < 1e-8 ? 0 : t;
                if (d) {
                    if (_ !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== g || this._lazy) {
                        if (n = _, c = this.timeline, this._repeat) {
                            if (a = d + this._rDelay, this._repeat < -1 && g) return this.totalTime(100 * a + t, e, r);
                            if (n = tM(_ % a), _ === p ? (s = this._repeat, n = d) : (s = ~~(o = tM(_ / a))) && s === o ? (n = d, s--) : n > d && (n = d), (u = this._yoyo && 1 & s) && (h = this._yEase, n = d - n), o = tV(this._tTime, a), n === f && !r && this._initted && s === o) return this._tTime = _, this;
                            s !== o && (c && this._yEase && eN(c, u), this.vars.repeatRefresh && !u && !this._lock && n !== a && this._initted && (this._lock = r = 1, this.render(tM(a * s), !0).invalidate()._lock = 0))
                        }
                        if (!this._initted) {
                            if (tJ(this, g ? t : n, r, e, _)) return this._tTime = 0, this;
                            if (f !== this._time && !(r && this.vars.repeatRefresh && s !== o)) return this;
                            if (d !== this._dur) return this.render(t, e, r)
                        }
                        if (this._tTime = _, this._time = n, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = l = (h || this._ease)(n / d), this._from && (this.ratio = l = 1 - l), !f && _ && !e && !o && (eg(this, "onStart"), this._tTime !== _)) return this;
                        for (i = this._pt; i;) i.r(l, i.d), i = i._next;
                        c && c.render(t < 0 ? t : c._dur * c._ease(n / this._dur), e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (g && tW(this, t, e, r), eg(this, "onUpdate")), this._repeat && s !== o && this.vars.onRepeat && !e && this.parent && eg(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (g && !this._onUpdate && tW(this, t, !0, !0), (t || !d) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && tX(this, 1), !e && !(g && !f) && (_ || f || u) && (eg(this, _ === p ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < p && this.timeScale() > 0) && this._prom()))
                    }
                } else t2(this, t, e, r);
                return this
            }, i.targets = function() {
                return this._targets
            }, i.invalidate = function(e) {
                return e && this.vars.runBackwards || (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(e), t.prototype.invalidate.call(this, e)
            }, i.resetTo = function(t, e, r, n, i) {
                A || eO.wake(), this._ts || this.play();
                var s = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
                return (this._initted || e1(this, s), e2(this, t, e, r, n, this._ease(s / this._dur), s, i)) ? this.resetTo(t, e, r, n, 1) : (t$(this, 0), this.parent || tL(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
            }, i.kill = function(t, e) {
                if (void 0 === e && (e = "all"), !t && (!e || "all" === e)) return this._lazy = this._pt = 0, this.parent ? e_(this) : this.scrollTrigger && this.scrollTrigger.kill(!!b), this;
                if (this.timeline) {
                    var r = this.timeline.totalDuration();
                    return this.timeline.killTweensOf(t, e, e$ && !0 !== e$.vars.overwrite)._first || e_(this), this.parent && r !== this.timeline.totalDuration() && t3(this, this._dur * this.timeline._tDur / r, 0, 1), this
                }
                var n, i, s, a, o, u, l, c = this._targets,
                    h = t ? ei(t) : c,
                    f = this._ptLookup,
                    p = this._pt;
                if ((!e || "all" === e) && tB(c, h)) return "all" === e && (this._pt = 0), e_(this);
                for (n = this._op = this._op || [], "all" !== e && (L(e) && (o = {}, tT(e, function(t) {
                        return o[t] = 1
                    }), e = o), e = e5(c, e)), l = c.length; l--;)
                    if (~h.indexOf(c[l]))
                        for (o in i = f[l], "all" === e ? (n[l] = e, a = i, s = {}) : (s = n[l] = n[l] || {}, a = e), a)(u = i && i[o]) && ("kill" in u.d && !0 !== u.d.kill(o) || tY(this, u, "_pt"), delete i[o]), "all" !== s && (s[o] = 1);
                return this._initted && !this._pt && p && e_(this), this
            }, n.to = function(t, e) {
                return new n(t, e, arguments[2])
            }, n.from = function(t, e) {
                return t7(1, arguments)
            }, n.delayedCall = function(t, e, r, i) {
                return new n(e, 0, {
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: t,
                    onComplete: e,
                    onReverseComplete: e,
                    onCompleteParams: r,
                    onReverseCompleteParams: r,
                    callbackScope: i
                })
            }, n.fromTo = function(t, e, r) {
                return t7(2, arguments)
            }, n.set = function(t, e) {
                return e.duration = 0, e.repeatDelay || (e.repeat = 0), new n(t, e)
            }, n.killTweensOf = function(t, e, r) {
                return T.killTweensOf(t, e, r)
            }, n
        }(eU);
        tR(e7.prototype, {
            _targets: [],
            _lazy: 0,
            _startAt: 0,
            _op: 0,
            _onInit: 0
        }), tT("staggerTo,staggerFrom,staggerFromTo", function(t) {
            e7[t] = function() {
                var e = new eW,
                    r = er.call(arguments, 0);
                return r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r)
            }
        });
        var e9 = function(t, e, r) {
                return t[e] = r
            },
            rt = function(t, e, r) {
                return t[e](r)
            },
            re = function(t, e, r, n) {
                return t[e](n.fp, r)
            },
            rr = function(t, e, r) {
                return t.setAttribute(e, r)
            },
            rn = function(t, e) {
                return Y(t[e]) ? rt : q(t[e]) && t.setAttribute ? rr : e9
            },
            ri = function(t, e) {
                return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e)
            },
            rs = function(t, e) {
                return e.set(e.t, e.p, !!(e.s + e.c * t), e)
            },
            ra = function(t, e) {
                var r = e._pt,
                    n = "";
                if (!t && e.b) n = e.b;
                else if (1 === t && e.e) n = e.e;
                else {
                    for (; r;) n = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round((r.s + r.c * t) * 1e4) / 1e4) + n, r = r._next;
                    n += e.c
                }
                e.set(e.t, e.p, n, e)
            },
            ro = function(t, e) {
                for (var r = e._pt; r;) r.r(t, r.d), r = r._next
            },
            ru = function(t, e, r, n) {
                for (var i, s = this._pt; s;) i = s._next, s.p === n && s.modifier(t, e, r), s = i
            },
            rl = function(t) {
                for (var e, r, n = this._pt; n;) r = n._next, (n.p !== t || n.op) && n.op !== t ? n.dep || (e = 1) : tY(this, n, "_pt"), n = r;
                return !e
            },
            rc = function(t, e, r, n) {
                n.mSet(t, e, n.m.call(n.tween, r, n.mt), n)
            },
            rh = function(t) {
                for (var e, r, n, i, s = t._pt; s;) {
                    for (e = s._next, r = n; r && r.pr > s.pr;) r = r._next;
                    (s._prev = r ? r._prev : i) ? s._prev._next = s: n = s, (s._next = r) ? r._prev = s : i = s, s = e
                }
                t._pt = n
            },
            rf = function() {
                function t(t, e, r, n, i, s, a, o, u) {
                    this.t = e, this.s = n, this.c = i, this.p = r, this.r = s || ri, this.d = a || this, this.set = o || e9, this.pr = u || 0, this._next = t, t && (t._prev = this)
                }
                return t.prototype.modifier = function(t, e, r) {
                    this.mSet = this.mSet || this.set, this.set = rc, this.m = t, this.mt = r, this.tween = e
                }, t
            }();
        tT(ty + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(t) {
            return tf[t] = 1
        }), tr.TweenMax = tr.TweenLite = e7, tr.TimelineLite = tr.TimelineMax = eW, T = new eW({
            sortChildren: !1,
            defaults: D,
            autoRemoveChildren: !0,
            id: "root",
            smoothChildTiming: !0
        }), P.stringFilter = ek;
        var rp = [],
            rd = {},
            rg = [],
            r_ = 0,
            rm = 0,
            rv = function(t) {
                return (rd[t] || rg).map(function(t) {
                    return t()
                })
            },
            ry = function() {
                var t = Date.now(),
                    e = [];
                t - r_ > 2 && (rv("matchMediaInit"), rp.forEach(function(t) {
                    var r, n, i, s, a = t.queries,
                        o = t.conditions;
                    for (n in a)(r = C.matchMedia(a[n]).matches) && (i = 1), r !== o[n] && (o[n] = r, s = 1);
                    s && (t.revert(), i && e.push(t))
                }), rv("matchMediaRevert"), e.forEach(function(t) {
                    return t.onMatch(t, function(e) {
                        return t.add(null, e)
                    })
                }), r_ = t, rv("matchMedia"))
            },
            rx = function() {
                function t(t, e) {
                    this.selector = e && es(e), this.data = [], this._r = [], this.isReverted = !1, this.id = rm++, t && this.add(t)
                }
                var e = t.prototype;
                return e.add = function(t, e, r) {
                    Y(t) && (r = e, e = t, t = Y);
                    var n = this,
                        i = function() {
                            var t, i = w,
                                s = n.selector;
                            return i && i !== n && i.data.push(n), r && (n.selector = es(r)), w = n, t = e.apply(n, arguments), Y(t) && n._r.push(t), w = i, n.selector = s, n.isReverted = !1, t
                        };
                    return n.last = i, t === Y ? i(n, function(t) {
                        return n.add(null, t)
                    }) : t ? n[t] = i : i
                }, e.ignore = function(t) {
                    var e = w;
                    w = null, t(this), w = e
                }, e.getTweens = function() {
                    var e = [];
                    return this.data.forEach(function(r) {
                        return r instanceof t ? e.push.apply(e, r.getTweens()) : r instanceof e7 && !(r.parent && "nested" === r.parent.data) && e.push(r)
                    }), e
                }, e.clear = function() {
                    this._r.length = this.data.length = 0
                }, e.kill = function(t, e) {
                    var r = this;
                    if (t) {
                        for (var n, i = r.getTweens(), s = r.data.length; s--;) "isFlip" === (n = r.data[s]).data && (n.revert(), n.getChildren(!0, !0, !1).forEach(function(t) {
                            return i.splice(i.indexOf(t), 1)
                        }));
                        for (i.map(function(t) {
                                return {
                                    g: t._dur || t._delay || t._sat && !t._sat.vars.immediateRender ? t.globalTime(0) : -1 / 0,
                                    t: t
                                }
                            }).sort(function(t, e) {
                                return e.g - t.g || -1 / 0
                            }).forEach(function(e) {
                                return e.t.revert(t)
                            }), s = r.data.length; s--;)(n = r.data[s]) instanceof eW ? "nested" !== n.data && (n.scrollTrigger && n.scrollTrigger.revert(), n.kill()) : n instanceof e7 || !n.revert || n.revert(t);
                        r._r.forEach(function(e) {
                            return e(t, r)
                        }), r.isReverted = !0
                    } else this.data.forEach(function(t) {
                        return t.kill && t.kill()
                    });
                    if (this.clear(), e)
                        for (var a = rp.length; a--;) rp[a].id === this.id && rp.splice(a, 1)
                }, e.revert = function(t) {
                    this.kill(t || {})
                }, t
            }(),
            rb = function() {
                function t(t) {
                    this.contexts = [], this.scope = t, w && w.data.push(this)
                }
                var e = t.prototype;
                return e.add = function(t, e, r) {
                    U(t) || (t = {
                        matches: t
                    });
                    var n, i, s, a = new rx(0, r || this.scope),
                        o = a.conditions = {};
                    for (i in w && !a.selector && (a.selector = w.selector), this.contexts.push(a), e = a.add("onMatch", e), a.queries = t, t) "all" === i ? s = 1 : (n = C.matchMedia(t[i])) && (0 > rp.indexOf(a) && rp.push(a), (o[i] = n.matches) && (s = 1), n.addListener ? n.addListener(ry) : n.addEventListener("change", ry));
                    return s && e(a, function(t) {
                        return a.add(null, t)
                    }), this
                }, e.revert = function(t) {
                    this.kill(t || {})
                }, e.kill = function(t) {
                    this.contexts.forEach(function(e) {
                        return e.kill(t, !0)
                    })
                }, t
            }(),
            rw = {
                registerPlugin: function() {
                    for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                    e.forEach(function(t) {
                        return ev(t)
                    })
                },
                timeline: function(t) {
                    return new eW(t)
                },
                getTweensOf: function(t, e) {
                    return T.getTweensOf(t, e)
                },
                getProperty: function(t, e, r, n) {
                    L(t) && (t = ei(t)[0]);
                    var i = tb(t || {}).get,
                        s = r ? tD : tP;
                    return "native" === r && (r = ""), t ? e ? s((tg[e] && tg[e].get || i)(t, e, r, n)) : function(e, r, n) {
                        return s((tg[e] && tg[e].get || i)(t, e, r, n))
                    } : t
                },
                quickSetter: function(t, e, r) {
                    if ((t = ei(t)).length > 1) {
                        var n = t.map(function(t) {
                                return rk.quickSetter(t, e, r)
                            }),
                            i = n.length;
                        return function(t) {
                            for (var e = i; e--;) n[e](t)
                        }
                    }
                    t = t[0] || {};
                    var s = tg[e],
                        a = tb(t),
                        o = a.harness && (a.harness.aliases || {})[e] || e,
                        u = s ? function(e) {
                            var n = new s;
                            S._pt = 0, n.init(t, r ? e + r : e, S, 0, [t]), n.render(1, n), S._pt && ro(1, S)
                        } : a.set(t, o);
                    return s ? u : function(e) {
                        return u(t, o, r ? e + r : e, a, 1)
                    }
                },
                quickTo: function(t, e, r) {
                    var n, i = rk.to(t, tR(((n = {})[e] = "+=0.1", n.paused = !0, n.stagger = 0, n), r || {})),
                        s = function(t, r, n) {
                            return i.resetTo(e, t, r, n)
                        };
                    return s.tween = i, s
                },
                isTweening: function(t) {
                    return T.getTweensOf(t, !0).length > 0
                },
                defaults: function(t) {
                    return t && t.ease && (t.ease = eI(t.ease, D.ease)), tF(D, t || {})
                },
                config: function(t) {
                    return tF(P, t || {})
                },
                registerEffect: function(t) {
                    var e = t.name,
                        r = t.effect,
                        n = t.plugins,
                        i = t.defaults,
                        s = t.extendTimeline;
                    (n || "").split(",").forEach(function(t) {
                        return t && !tg[t] && !tr[t] && ta(e + " effect requires " + t + " plugin.")
                    }), t_[e] = function(t, e, n) {
                        return r(ei(t), tR(e || {}, i), n)
                    }, s && (eW.prototype[e] = function(t, r, n) {
                        return this.add(t_[e](t, U(r) ? r : (n = r) && {}, this), n)
                    })
                },
                registerEase: function(t, e) {
                    eS[t] = eI(e)
                },
                parseEase: function(t, e) {
                    return arguments.length ? eI(t, e) : eS
                },
                getById: function(t) {
                    return T.getById(t)
                },
                exportRoot: function(t, e) {
                    void 0 === t && (t = {});
                    var r, n, i = new eW(t);
                    for (i.smoothChildTiming = W(t.smoothChildTiming), T.remove(i), i._dp = 0, i._time = i._tTime = T._time, r = T._first; r;) n = r._next, (e || !(!r._dur && r instanceof e7 && r.vars.onComplete === r._targets[0])) && tZ(i, r, r._start - r._delay), r = n;
                    return tZ(T, i, 0), i
                },
                context: function(t, e) {
                    return t ? new rx(t, e) : w
                },
                matchMedia: function(t) {
                    return new rb(t)
                },
                matchMediaRefresh: function() {
                    return rp.forEach(function(t) {
                        var e, r, n = t.conditions;
                        for (r in n) n[r] && (n[r] = !1, e = 1);
                        e && t.revert()
                    }) || ry()
                },
                addEventListener: function(t, e) {
                    var r = rd[t] || (rd[t] = []);
                    ~r.indexOf(e) || r.push(e)
                },
                removeEventListener: function(t, e) {
                    var r = rd[t],
                        n = r && r.indexOf(e);
                    n >= 0 && r.splice(n, 1)
                },
                utils: {
                    wrap: function t(e, r, n) {
                        var i = r - e;
                        return G(e) ? eh(e, t(0, e.length), r) : t9(n, function(t) {
                            return (i + (t - e) % i) % i + e
                        })
                    },
                    wrapYoyo: function t(e, r, n) {
                        var i = r - e,
                            s = 2 * i;
                        return G(e) ? eh(e, t(0, e.length - 1), r) : t9(n, function(t) {
                            return t = (s + (t - e) % s) % s || 0, e + (t > i ? s - t : t)
                        })
                    },
                    distribute: eo,
                    random: ec,
                    snap: el,
                    normalize: function(t, e, r) {
                        return ep(t, e, 0, 1, r)
                    },
                    getUnit: ee,
                    clamp: function(t, e, r) {
                        return t9(r, function(r) {
                            return et(t, e, r)
                        })
                    },
                    splitColor: eb,
                    toArray: ei,
                    selector: es,
                    mapRange: ep,
                    pipe: function() {
                        for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                        return function(t) {
                            return e.reduce(function(t, e) {
                                return e(t)
                            }, t)
                        }
                    },
                    unitize: function(t, e) {
                        return function(r) {
                            return t(parseFloat(r)) + (e || ee(r))
                        }
                    },
                    interpolate: function t(e, r, n, i) {
                        var s = isNaN(e + r) ? 0 : function(t) {
                            return (1 - t) * e + t * r
                        };
                        if (!s) {
                            var a, o, u, l, c, h = L(e),
                                f = {};
                            if (!0 === n && (i = 1) && (n = null), h) e = {
                                p: e
                            }, r = {
                                p: r
                            };
                            else if (G(e) && !G(r)) {
                                for (u = [], c = (l = e.length) - 2, o = 1; o < l; o++) u.push(t(e[o - 1], e[o]));
                                l--, s = function(t) {
                                    var e = Math.min(c, ~~(t *= l));
                                    return u[e](t - e)
                                }, n = r
                            } else i || (e = tz(G(e) ? [] : {}, e));
                            if (!u) {
                                for (a in r) eK.call(f, e, a, "get", r[a]);
                                s = function(t) {
                                    return ro(t, f) || (h ? e.p : e)
                                }
                            }
                        }
                        return t9(n, s)
                    },
                    shuffle: ea
                },
                install: ti,
                effects: t_,
                ticker: eO,
                updateRoot: eW.updateRoot,
                plugins: tg,
                globalTimeline: T,
                core: {
                    PropTween: rf,
                    globals: to,
                    Tween: e7,
                    Timeline: eW,
                    Animation: eU,
                    getCache: tb,
                    _removeLinkedListItem: tY,
                    reverting: function() {
                        return b
                    },
                    context: function(t) {
                        return t && w && (w.data.push(t), t._ctx = w), w
                    },
                    suppressOverwrites: function(t) {
                        return x = t
                    }
                }
            };
        tT("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
            return rw[t] = e7[t]
        }), eO.add(eW.updateRoot), S = rw.to({}, {
            duration: 0
        });
        var rT = function(t, e) {
                for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) r = r._next;
                return r
            },
            rC = function(t, e) {
                var r, n, i, s = t._targets;
                for (r in e)
                    for (n = s.length; n--;)(i = t._ptLookup[n][r]) && (i = i.d) && (i._pt && (i = rT(i, r)), i && i.modifier && i.modifier(e[r], t, s[n], r))
            },
            rM = function(t, e) {
                return {
                    name: t,
                    headless: 1,
                    rawVars: 1,
                    init: function(t, r, n) {
                        n._onInit = function(t) {
                            var n, i;
                            if (L(r) && (n = {}, tT(r, function(t) {
                                    return n[t] = 1
                                }), r = n), e) {
                                for (i in n = {}, r) n[i] = e(r[i]);
                                r = n
                            }
                            rC(t, r)
                        }
                    }
                }
            },
            rk = rw.registerPlugin({
                name: "attr",
                init: function(t, e, r, n, i) {
                    var s, a, o;
                    for (s in this.tween = r, e) o = t.getAttribute(s) || "", (a = this.add(t, "setAttribute", (o || 0) + "", e[s], n, i, 0, 0, s)).op = s, a.b = o, this._props.push(s)
                },
                render: function(t, e) {
                    for (var r = e._pt; r;) b ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next
                }
            }, {
                name: "endArray",
                headless: 1,
                init: function(t, e) {
                    for (var r = e.length; r--;) this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1)
                }
            }, rM("roundProps", eu), rM("modifiers"), rM("snap", el)) || rw;
        e7.version = eW.version = rk.version = "3.13.0", O = 1, H() && eE(), eS.Power0, eS.Power1, eS.Power2, eS.Power3, eS.Power4, eS.Linear, eS.Quad, eS.Cubic, eS.Quart, eS.Quint, eS.Strong, eS.Elastic, eS.Back, eS.SteppedEase, eS.Bounce, eS.Sine, eS.Expo, eS.Circ;
        var rO, rE, rS, rA, rP, rD, rR, rz = {},
            rF = 180 / Math.PI,
            rN = Math.PI / 180,
            rI = Math.atan2,
            rB = /([A-Z])/g,
            rL = /(left|right|width|margin|padding|x)/i,
            rY = /[\s,\(]\S/,
            rX = {
                autoAlpha: "opacity,visibility",
                scale: "scaleX,scaleY",
                alpha: "opacity"
            },
            rq = function(t, e) {
                return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
            },
            rU = function(t, e) {
                return e.set(e.t, e.p, 1 === t ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
            },
            rW = function(t, e) {
                return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e)
            },
            rH = function(t, e) {
                var r = e.s + e.c * t;
                e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
            },
            rV = function(t, e) {
                return e.set(e.t, e.p, t ? e.e : e.b, e)
            },
            rj = function(t, e) {
                return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
            },
            rG = function(t, e, r) {
                return t.style[e] = r
            },
            r$ = function(t, e, r) {
                return t.style.setProperty(e, r)
            },
            rQ = function(t, e, r) {
                return t._gsap[e] = r
            },
            rZ = function(t, e, r) {
                return t._gsap.scaleX = t._gsap.scaleY = r
            },
            rK = function(t, e, r, n, i) {
                var s = t._gsap;
                s.scaleX = s.scaleY = r, s.renderTransform(i, s)
            },
            rJ = function(t, e, r, n, i) {
                var s = t._gsap;
                s[e] = r, s.renderTransform(i, s)
            },
            r0 = "transform",
            r1 = r0 + "Origin",
            r2 = function t(e, r) {
                var n = this,
                    i = this.target,
                    s = i.style,
                    a = i._gsap;
                if (e in rz && s) {
                    if (this.tfm = this.tfm || {}, "transform" === e) return rX.transform.split(",").forEach(function(e) {
                        return t.call(n, e, r)
                    });
                    if (~(e = rX[e] || e).indexOf(",") ? e.split(",").forEach(function(t) {
                            return n.tfm[t] = nc(i, t)
                        }) : this.tfm[e] = a.x ? a[e] : nc(i, e), e === r1 && (this.tfm.zOrigin = a.zOrigin), this.props.indexOf(r0) >= 0) return;
                    a.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(r1, r, "")), e = r0
                }(s || r) && this.props.push(e, r, s[e])
            },
            r5 = function(t) {
                t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"))
            },
            r3 = function() {
                var t, e, r = this.props,
                    n = this.target,
                    i = n.style,
                    s = n._gsap;
                for (t = 0; t < r.length; t += 3) r[t + 1] ? 2 === r[t + 1] ? n[r[t]](r[t + 2]) : n[r[t]] = r[t + 2] : r[t + 2] ? i[r[t]] = r[t + 2] : i.removeProperty("--" === r[t].substr(0, 2) ? r[t] : r[t].replace(rB, "-$1").toLowerCase());
                if (this.tfm) {
                    for (e in this.tfm) s[e] = this.tfm[e];
                    s.svg && (s.renderTransform(), n.setAttribute("data-svg-origin", this.svgo || "")), (t = rD()) && t.isStart || i[r0] || (r5(i), s.zOrigin && i[r1] && (i[r1] += " " + s.zOrigin + "px", s.zOrigin = 0, s.renderTransform()), s.uncache = 1)
                }
            },
            r8 = function(t, e) {
                var r = {
                    target: t,
                    props: [],
                    revert: r3,
                    save: r2
                };
                return t._gsap || rk.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(t) {
                    return r.save(t)
                }), r
            },
            r4 = function(t, e) {
                var r = rO.createElementNS ? rO.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : rO.createElement(t);
                return r && r.style ? r : rO.createElement(t)
            },
            r6 = function t(e, r, n) {
                var i = getComputedStyle(e);
                return i[r] || i.getPropertyValue(r.replace(rB, "-$1").toLowerCase()) || i.getPropertyValue(r) || !n && t(e, r9(r) || r, 1) || ""
            },
            r7 = "O,Moz,ms,Ms,Webkit".split(","),
            r9 = function(t, e, r) {
                var n = (e || rA).style,
                    i = 5;
                if (t in n && !r) return t;
                for (t = t.charAt(0).toUpperCase() + t.substr(1); i-- && !(r7[i] + t in n););
                return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? r7[i] : "") + t
            },
            nt = function() {
                "u" > typeof window && window.document && (rE = (rO = window.document).documentElement, rA = r4("div") || {
                    style: {}
                }, r4("div"), r1 = (r0 = r9(r0)) + "Origin", rA.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", rR = !!r9("perspective"), rD = rk.core.reverting, rS = 1)
            },
            ne = function(t) {
                var e, r = t.ownerSVGElement,
                    n = r4("svg", r && r.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                    i = t.cloneNode(!0);
                i.style.display = "block", n.appendChild(i), rE.appendChild(n);
                try {
                    e = i.getBBox()
                } catch (t) {}
                return n.removeChild(i), rE.removeChild(n), e
            },
            nr = function(t, e) {
                for (var r = e.length; r--;)
                    if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
            },
            nn = function(t) {
                var e, r;
                try {
                    e = t.getBBox()
                } catch (n) {
                    e = ne(t), r = 1
                }
                return e && (e.width || e.height) || r || (e = ne(t)), !e || e.width || e.x || e.y ? e : {
                    x: +nr(t, ["x", "cx", "x1"]) || 0,
                    y: +nr(t, ["y", "cy", "y1"]) || 0,
                    width: 0,
                    height: 0
                }
            },
            ni = function(t) {
                return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && nn(t))
            },
            ns = function(t, e) {
                if (e) {
                    var r, n = t.style;
                    e in rz && e !== r1 && (e = r0), n.removeProperty ? (("ms" === (r = e.substr(0, 2)) || "webkit" === e.substr(0, 6)) && (e = "-" + e), n.removeProperty("--" === r ? e : e.replace(rB, "-$1").toLowerCase())) : n.removeAttribute(e)
                }
            },
            na = function(t, e, r, n, i, s) {
                var a = new rf(t._pt, e, r, 0, 1, s ? rj : rV);
                return t._pt = a, a.b = n, a.e = i, t._props.push(r), a
            },
            no = {
                deg: 1,
                rad: 1,
                turn: 1
            },
            nu = {
                grid: 1,
                flex: 1
            },
            nl = function t(e, r, n, i) {
                var s, a, o, u, l = parseFloat(n) || 0,
                    c = (n + "").trim().substr((l + "").length) || "px",
                    h = rA.style,
                    f = rL.test(r),
                    p = "svg" === e.tagName.toLowerCase(),
                    d = (p ? "client" : "offset") + (f ? "Width" : "Height"),
                    g = "px" === i,
                    _ = "%" === i;
                if (i === c || !l || no[i] || no[c]) return l;
                if ("px" === c || g || (l = t(e, r, n, "px")), u = e.getCTM && ni(e), (_ || "%" === c) && (rz[r] || ~r.indexOf("adius"))) return s = u ? e.getBBox()[f ? "width" : "height"] : e[d], tC(_ ? l / s * 100 : l / 100 * s);
                if (h[f ? "width" : "height"] = 100 + (g ? c : i), a = "rem" !== i && ~r.indexOf("adius") || "em" === i && e.appendChild && !p ? e : e.parentNode, u && (a = (e.ownerSVGElement || {}).parentNode), a && a !== rO && a.appendChild || (a = rO.body), (o = a._gsap) && _ && o.width && f && o.time === eO.time && !o.uncache) return tC(l / o.width * 100);
                if (_ && ("height" === r || "width" === r)) {
                    var m = e.style[r];
                    e.style[r] = 100 + i, s = e[d], m ? e.style[r] = m : ns(e, r)
                } else(_ || "%" === c) && !nu[r6(a, "display")] && (h.position = r6(e, "position")), a === e && (h.position = "static"), a.appendChild(rA), s = rA[d], a.removeChild(rA), h.position = "absolute";
                return f && _ && ((o = tb(a)).time = eO.time, o.width = a[d]), tC(g ? s * l / 100 : s && l ? 100 / s * l : 0)
            },
            nc = function(t, e, r, n) {
                var i;
                return rS || nt(), e in rX && "transform" !== e && ~(e = rX[e]).indexOf(",") && (e = e.split(",")[0]), rz[e] && "transform" !== e ? (i = nw(t, n), i = "transformOrigin" !== e ? i[e] : i.svg ? i.origin : nT(r6(t, r1)) + " " + i.zOrigin + "px") : (!(i = t.style[e]) || "auto" === i || n || ~(i + "").indexOf("calc(")) && (i = ng[e] && ng[e](t, e, r) || r6(t, e) || tw(t, e) || +("opacity" === e)), r && !~(i + "").trim().indexOf(" ") ? nl(t, e, i, r) + r : i
            },
            nh = function(t, e, r, n) {
                if (!r || "none" === r) {
                    var i = r9(e, t, 1),
                        s = i && r6(t, i, 1);
                    s && s !== r ? (e = i, r = s) : "borderColor" === e && (r = r6(t, "borderTopColor"))
                }
                var a, o, u, l, c, h, f, p, d, g, _, m = new rf(this._pt, t.style, e, 0, 1, ra),
                    v = 0,
                    y = 0;
                if (m.b = r, m.e = n, r += "", "var(--" === (n += "").substring(0, 6) && (n = r6(t, n.substring(4, n.indexOf(")")))), "auto" === n && (h = t.style[e], t.style[e] = n, n = r6(t, e) || n, h ? t.style[e] = h : ns(t, e)), ek(a = [r, n]), r = a[0], n = a[1], u = r.match(Z) || [], (n.match(Z) || []).length) {
                    for (; o = Z.exec(n);) f = o[0], d = n.substring(v, o.index), c ? c = (c + 1) % 5 : ("rgba(" === d.substr(-5) || "hsla(" === d.substr(-5)) && (c = 1), f !== (h = u[y++] || "") && (l = parseFloat(h) || 0, _ = h.substr((l + "").length), "=" === f.charAt(1) && (f = tk(l, f) + _), p = parseFloat(f), g = f.substr((p + "").length), v = Z.lastIndex - g.length, g || (g = g || P.units[e] || _, v === n.length && (n += g, m.e += g)), _ !== g && (l = nl(t, e, h, g) || 0), m._pt = {
                        _next: m._pt,
                        p: d || 1 === y ? d : ",",
                        s: l,
                        c: p - l,
                        m: c && c < 4 || "zIndex" === e ? Math.round : 0
                    });
                    m.c = v < n.length ? n.substring(v, n.length) : ""
                } else m.r = "display" === e && "none" === n ? rj : rV;
                return J.test(n) && (m.e = 0), this._pt = m, m
            },
            nf = {
                top: "0%",
                bottom: "100%",
                left: "0%",
                right: "100%",
                center: "50%"
            },
            np = function(t) {
                var e = t.split(" "),
                    r = e[0],
                    n = e[1] || "50%";
                return ("top" === r || "bottom" === r || "left" === n || "right" === n) && (t = r, r = n, n = t), e[0] = nf[r] || r, e[1] = nf[n] || n, e.join(" ")
            },
            nd = function(t, e) {
                if (e.tween && e.tween._time === e.tween._dur) {
                    var r, n, i, s = e.t,
                        a = s.style,
                        o = e.u,
                        u = s._gsap;
                    if ("all" === o || !0 === o) a.cssText = "", n = 1;
                    else
                        for (i = (o = o.split(",")).length; --i > -1;) rz[r = o[i]] && (n = 1, r = "transformOrigin" === r ? r1 : r0), ns(s, r);
                    n && (ns(s, r0), u && (u.svg && s.removeAttribute("transform"), a.scale = a.rotate = a.translate = "none", nw(s, 1), u.uncache = 1, r5(a)))
                }
            },
            ng = {
                clearProps: function(t, e, r, n, i) {
                    if ("isFromStart" !== i.data) {
                        var s = t._pt = new rf(t._pt, e, r, 0, 0, nd);
                        return s.u = n, s.pr = -10, s.tween = i, t._props.push(r), 1
                    }
                }
            },
            n_ = [1, 0, 0, 1, 0, 0],
            nm = {},
            nv = function(t) {
                return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
            },
            ny = function(t) {
                var e = r6(t, r0);
                return nv(e) ? n_ : e.substr(7).match(Q).map(tC)
            },
            nx = function(t, e) {
                var r, n, i, s, a = t._gsap || tb(t),
                    o = t.style,
                    u = ny(t);
                return a.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(i = t.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f]).join(",") ? n_ : u : (u !== n_ || t.offsetParent || t === rE || a.svg || (i = o.display, o.display = "block", (r = t.parentNode) && (t.offsetParent || t.getBoundingClientRect().width) || (s = 1, n = t.nextElementSibling, rE.appendChild(t)), u = ny(t), i ? o.display = i : ns(t, "display"), s && (n ? r.insertBefore(t, n) : r ? r.appendChild(t) : rE.removeChild(t))), e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u)
            },
            nb = function(t, e, r, n, i, s) {
                var a, o, u, l, c = t._gsap,
                    h = i || nx(t, !0),
                    f = c.xOrigin || 0,
                    p = c.yOrigin || 0,
                    d = c.xOffset || 0,
                    g = c.yOffset || 0,
                    _ = h[0],
                    m = h[1],
                    v = h[2],
                    y = h[3],
                    x = h[4],
                    b = h[5],
                    w = e.split(" "),
                    T = parseFloat(w[0]) || 0,
                    C = parseFloat(w[1]) || 0;
                r ? h !== n_ && (o = _ * y - m * v) && (u = y / o * T + -v / o * C + (v * b - y * x) / o, l = -m / o * T + _ / o * C - (_ * b - m * x) / o, T = u, C = l) : (T = (a = nn(t)).x + (~w[0].indexOf("%") ? T / 100 * a.width : T), C = a.y + (~(w[1] || w[0]).indexOf("%") ? C / 100 * a.height : C)), n || !1 !== n && c.smooth ? (c.xOffset = d + ((x = T - f) * _ + (b = C - p) * v) - x, c.yOffset = g + (x * m + b * y) - b) : c.xOffset = c.yOffset = 0, c.xOrigin = T, c.yOrigin = C, c.smooth = !!n, c.origin = e, c.originIsAbsolute = !!r, t.style[r1] = "0px 0px", s && (na(s, c, "xOrigin", f, T), na(s, c, "yOrigin", p, C), na(s, c, "xOffset", d, c.xOffset), na(s, c, "yOffset", g, c.yOffset)), t.setAttribute("data-svg-origin", T + " " + C)
            },
            nw = function(t, e) {
                var r = t._gsap || new eq(t);
                if ("x" in r && !e && !r.uncache) return r;
                var n, i, s, a, o, u, l, c, h, f, p, d, g, _, m, v, y, x, b, w, T, C, M, k, O, E, S, A, D, R, z, F, N = t.style,
                    I = r.scaleX < 0,
                    B = getComputedStyle(t),
                    L = r6(t, r1) || "0";
                return n = i = s = u = l = c = h = f = p = 0, a = o = 1, r.svg = !!(t.getCTM && ni(t)), B.translate && (("none" !== B.translate || "none" !== B.scale || "none" !== B.rotate) && (N[r0] = ("none" !== B.translate ? "translate3d(" + (B.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== B.rotate ? "rotate(" + B.rotate + ") " : "") + ("none" !== B.scale ? "scale(" + B.scale.split(" ").join(",") + ") " : "") + ("none" !== B[r0] ? B[r0] : "")), N.scale = N.rotate = N.translate = "none"), _ = nx(t, r.svg), r.svg && (r.uncache ? (O = t.getBBox(), L = r.xOrigin - O.x + "px " + (r.yOrigin - O.y) + "px", k = "") : k = !e && t.getAttribute("data-svg-origin"), nb(t, k || L, !!k || r.originIsAbsolute, !1 !== r.smooth, _)), d = r.xOrigin || 0, g = r.yOrigin || 0, _ !== n_ && (x = _[0], b = _[1], w = _[2], T = _[3], n = C = _[4], i = M = _[5], 6 === _.length ? (a = Math.sqrt(x * x + b * b), o = Math.sqrt(T * T + w * w), u = x || b ? rI(b, x) * rF : 0, (h = w || T ? rI(w, T) * rF + u : 0) && (o *= Math.abs(Math.cos(h * rN))), r.svg && (n -= d - (d * x + g * w), i -= g - (d * b + g * T))) : (F = _[6], R = _[7], S = _[8], A = _[9], D = _[10], z = _[11], n = _[12], i = _[13], s = _[14], l = (m = rI(F, D)) * rF, m && (k = C * (v = Math.cos(-m)) + S * (y = Math.sin(-m)), O = M * v + A * y, E = F * v + D * y, S = -(C * y) + S * v, A = -(M * y) + A * v, D = -(F * y) + D * v, z = -(R * y) + z * v, C = k, M = O, F = E), c = (m = rI(-w, D)) * rF, m && (k = x * (v = Math.cos(-m)) - S * (y = Math.sin(-m)), O = b * v - A * y, E = w * v - D * y, z = T * y + z * v, x = k, b = O, w = E), u = (m = rI(b, x)) * rF, m && (k = x * (v = Math.cos(m)) + b * (y = Math.sin(m)), O = C * v + M * y, b = b * v - x * y, M = M * v - C * y, x = k, C = O), l && Math.abs(l) + Math.abs(u) > 359.9 && (l = u = 0, c = 180 - c), a = tC(Math.sqrt(x * x + b * b + w * w)), o = tC(Math.sqrt(M * M + F * F)), h = Math.abs(m = rI(C, M)) > 2e-4 ? m * rF : 0, p = z ? 1 / (z < 0 ? -z : z) : 0), r.svg && (k = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !nv(r6(t, r0)), k && t.setAttribute("transform", k))), Math.abs(h) > 90 && 270 > Math.abs(h) && (I ? (a *= -1, h += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (o *= -1, h += h <= 0 ? 180 : -180)), e = e || r.uncache, r.x = n - ((r.xPercent = n && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + "px", r.y = i - ((r.yPercent = i && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + "px", r.z = s + "px", r.scaleX = tC(a), r.scaleY = tC(o), r.rotation = tC(u) + "deg", r.rotationX = tC(l) + "deg", r.rotationY = tC(c) + "deg", r.skewX = h + "deg", r.skewY = f + "deg", r.transformPerspective = p + "px", (r.zOrigin = parseFloat(L.split(" ")[2]) || !e && r.zOrigin || 0) && (N[r1] = nT(L)), r.xOffset = r.yOffset = 0, r.force3D = P.force3D, r.renderTransform = r.svg ? nE : rR ? nO : nM, r.uncache = 0, r
            },
            nT = function(t) {
                return (t = t.split(" "))[0] + " " + t[1]
            },
            nC = function(t, e, r) {
                var n = ee(e);
                return tC(parseFloat(e) + parseFloat(nl(t, "x", r + "px", n))) + n
            },
            nM = function(t, e) {
                e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, nO(t, e)
            },
            nk = "0deg",
            nO = function(t, e) {
                var r = e || this,
                    n = r.xPercent,
                    i = r.yPercent,
                    s = r.x,
                    a = r.y,
                    o = r.z,
                    u = r.rotation,
                    l = r.rotationY,
                    c = r.rotationX,
                    h = r.skewX,
                    f = r.skewY,
                    p = r.scaleX,
                    d = r.scaleY,
                    g = r.transformPerspective,
                    _ = r.force3D,
                    m = r.target,
                    v = r.zOrigin,
                    y = "",
                    x = "auto" === _ && t && 1 !== t || !0 === _;
                if (v && (c !== nk || l !== nk)) {
                    var b, w = parseFloat(l) * rN,
                        T = Math.sin(w),
                        C = Math.cos(w);
                    s = nC(m, s, -(T * (b = Math.cos(w = parseFloat(c) * rN)) * v)), a = nC(m, a, -(-Math.sin(w) * v)), o = nC(m, o, -(C * b * v) + v)
                }
                "0px" !== g && (y += "perspective(" + g + ") "), (n || i) && (y += "translate(" + n + "%, " + i + "%) "), (x || "0px" !== s || "0px" !== a || "0px" !== o) && (y += "0px" !== o || x ? "translate3d(" + s + ", " + a + ", " + o + ") " : "translate(" + s + ", " + a + ") "), u !== nk && (y += "rotate(" + u + ") "), l !== nk && (y += "rotateY(" + l + ") "), c !== nk && (y += "rotateX(" + c + ") "), (h !== nk || f !== nk) && (y += "skew(" + h + ", " + f + ") "), (1 !== p || 1 !== d) && (y += "scale(" + p + ", " + d + ") "), m.style[r0] = y || "translate(0, 0)"
            },
            nE = function(t, e) {
                var r, n, i, s, a, o = e || this,
                    u = o.xPercent,
                    l = o.yPercent,
                    c = o.x,
                    h = o.y,
                    f = o.rotation,
                    p = o.skewX,
                    d = o.skewY,
                    g = o.scaleX,
                    _ = o.scaleY,
                    m = o.target,
                    v = o.xOrigin,
                    y = o.yOrigin,
                    x = o.xOffset,
                    b = o.yOffset,
                    w = o.forceCSS,
                    T = parseFloat(c),
                    C = parseFloat(h);
                f = parseFloat(f), p = parseFloat(p), (d = parseFloat(d)) && (p += d = parseFloat(d), f += d), f || p ? (f *= rN, p *= rN, r = Math.cos(f) * g, n = Math.sin(f) * g, i = -(Math.sin(f - p) * _), s = Math.cos(f - p) * _, p && (d *= rN, i *= a = Math.sqrt(1 + (a = Math.tan(p - d)) * a), s *= a, d && (r *= a = Math.sqrt(1 + (a = Math.tan(d)) * a), n *= a)), r = tC(r), n = tC(n), i = tC(i), s = tC(s)) : (r = g, s = _, n = i = 0), (T && !~(c + "").indexOf("px") || C && !~(h + "").indexOf("px")) && (T = nl(m, "x", c, "px"), C = nl(m, "y", h, "px")), (v || y || x || b) && (T = tC(T + v - (v * r + y * i) + x), C = tC(C + y - (v * n + y * s) + b)), (u || l) && (T = tC(T + u / 100 * (a = m.getBBox()).width), C = tC(C + l / 100 * a.height)), a = "matrix(" + r + "," + n + "," + i + "," + s + "," + T + "," + C + ")", m.setAttribute("transform", a), w && (m.style[r0] = a)
            },
            nS = function(t, e, r, n, i) {
                var s, a, o = L(i),
                    u = parseFloat(i) * (o && ~i.indexOf("rad") ? rF : 1) - n,
                    l = n + u + "deg";
                return o && ("short" === (s = i.split("_")[1]) && (u %= 360) != u % 180 && (u += u < 0 ? 360 : -360), "cw" === s && u < 0 ? u = (u + 36e9) % 360 - 360 * ~~(u / 360) : "ccw" === s && u > 0 && (u = (u - 36e9) % 360 - 360 * ~~(u / 360))), t._pt = a = new rf(t._pt, e, r, n, u, rU), a.e = l, a.u = "deg", t._props.push(r), a
            },
            nA = function(t, e) {
                for (var r in e) t[r] = e[r];
                return t
            },
            nP = function(t, e, r) {
                var n, i, s, a, o, u, l, c = nA({}, r._gsap),
                    h = r.style;
                for (i in c.svg ? (s = r.getAttribute("transform"), r.setAttribute("transform", ""), h[r0] = e, n = nw(r, 1), ns(r, r0), r.setAttribute("transform", s)) : (s = getComputedStyle(r)[r0], h[r0] = e, n = nw(r, 1), h[r0] = s), rz)(s = c[i]) !== (a = n[i]) && 0 > "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) && (o = ee(s) !== (l = ee(a)) ? nl(r, i, s, l) : parseFloat(s), u = parseFloat(a), t._pt = new rf(t._pt, n, i, o, u - o, rq), t._pt.u = l || 0, t._props.push(i));
                nA(n, c)
            };
        tT("padding,margin,Width,Radius", function(t, e) {
            var r = "Right",
                n = "Bottom",
                i = "Left",
                s = (e < 3 ? ["Top", r, n, i] : ["Top" + i, "Top" + r, n + r, n + i]).map(function(r) {
                    return e < 2 ? t + r : "border" + r + t
                });
            ng[e > 1 ? "border" + t : t] = function(t, e, r, n, i) {
                var a, o;
                if (arguments.length < 4) return 5 === (o = (a = s.map(function(e) {
                    return nc(t, e, r)
                })).join(" ")).split(a[0]).length ? a[0] : o;
                a = (n + "").split(" "), o = {}, s.forEach(function(t, e) {
                    return o[t] = a[e] = a[e] || a[(e - 1) / 2 | 0]
                }), t.init(e, o, i)
            }
        });
        var nD = {
            name: "css",
            register: nt,
            targetTest: function(t) {
                return t.style && t.nodeType
            },
            init: function(t, e, r, n, i) {
                var s, a, o, u, l, c, h, f, p, d, g, _, m, v, y, x, b = this._props,
                    w = t.style,
                    T = r.vars.startAt;
                for (h in rS || nt(), this.styles = this.styles || r8(t), x = this.styles.props, this.tween = r, e)
                    if ("autoRound" !== h && (a = e[h], !(tg[h] && e0(h, e, r, n, t, i)))) {
                        if (l = typeof a, c = ng[h], "function" === l && (l = typeof(a = a.call(r, n, t, i))), "string" === l && ~a.indexOf("random(") && (a = ef(a)), c) c(this, t, h, a, r) && (y = 1);
                        else if ("--" === h.substr(0, 2)) s = (getComputedStyle(t).getPropertyValue(h) + "").trim(), a += "", eC.lastIndex = 0, eC.test(s) || (f = ee(s), p = ee(a)), p ? f !== p && (s = nl(t, h, s, p) + p) : f && (a += f), this.add(w, "setProperty", s, a, n, i, 0, 0, h), b.push(h), x.push(h, 0, w[h]);
                        else if ("undefined" !== l) {
                            if (T && h in T ? (L(s = "function" == typeof T[h] ? T[h].call(r, n, t, i) : T[h]) && ~s.indexOf("random(") && (s = ef(s)), ee(s + "") || "auto" === s || (s += P.units[h] || ee(nc(t, h)) || ""), "=" === (s + "").charAt(1) && (s = nc(t, h))) : s = nc(t, h), u = parseFloat(s), (d = "string" === l && "=" === a.charAt(1) && a.substr(0, 2)) && (a = a.substr(2)), o = parseFloat(a), h in rX && ("autoAlpha" === h && (1 === u && "hidden" === nc(t, "visibility") && o && (u = 0), x.push("visibility", 0, w.visibility), na(this, w, "visibility", u ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), "scale" !== h && "transform" !== h && ~(h = rX[h]).indexOf(",") && (h = h.split(",")[0])), g = h in rz) {
                                if (this.styles.save(h), "string" === l && "var(--" === a.substring(0, 6) && (o = parseFloat(a = r6(t, a.substring(4, a.indexOf(")"))))), _ || ((m = t._gsap).renderTransform && !e.parseTransform || nw(t, e.parseTransform), v = !1 !== e.smoothOrigin && m.smooth, (_ = this._pt = new rf(this._pt, w, r0, 0, 1, m.renderTransform, m, 0, -1)).dep = 1), "scale" === h) this._pt = new rf(this._pt, m, "scaleY", m.scaleY, (d ? tk(m.scaleY, d + o) : o) - m.scaleY || 0, rq), this._pt.u = 0, b.push("scaleY", h), h += "X";
                                else if ("transformOrigin" === h) {
                                    x.push(r1, 0, w[r1]), a = np(a), m.svg ? nb(t, a, 0, v, 0, this) : ((p = parseFloat(a.split(" ")[2]) || 0) !== m.zOrigin && na(this, m, "zOrigin", m.zOrigin, p), na(this, w, h, nT(s), nT(a)));
                                    continue
                                } else if ("svgOrigin" === h) {
                                    nb(t, a, 1, v, 0, this);
                                    continue
                                } else if (h in nm) {
                                    nS(this, m, h, u, d ? tk(u, d + a) : a);
                                    continue
                                } else if ("smoothOrigin" === h) {
                                    na(this, m, "smooth", m.smooth, a);
                                    continue
                                } else if ("force3D" === h) {
                                    m[h] = a;
                                    continue
                                } else if ("transform" === h) {
                                    nP(this, a, t);
                                    continue
                                }
                            } else h in w || (h = r9(h) || h);
                            if (g || (o || 0 === o) && (u || 0 === u) && !rY.test(a) && h in w) f = (s + "").substr((u + "").length), o || (o = 0), p = ee(a) || (h in P.units ? P.units[h] : f), f !== p && (u = nl(t, h, s, p)), this._pt = new rf(this._pt, g ? m : w, h, u, (d ? tk(u, d + o) : o) - u, !g && ("px" === p || "zIndex" === h) && !1 !== e.autoRound ? rH : rq), this._pt.u = p || 0, f !== p && "%" !== p && (this._pt.b = s, this._pt.r = rW);
                            else if (h in w) nh.call(this, t, h, s, d ? d + a : a);
                            else if (h in t) this.add(t, h, s || t[h], d ? d + a : a, n, i);
                            else if ("parseTransform" !== h) {
                                ts(h, a);
                                continue
                            }
                            g || (h in w ? x.push(h, 0, w[h]) : "function" == typeof t[h] ? x.push(h, 2, t[h]()) : x.push(h, 1, s || t[h])), b.push(h)
                        }
                    }
                y && rh(this)
            },
            render: function(t, e) {
                if (e.tween._time || !rD())
                    for (var r = e._pt; r;) r.r(t, r.d), r = r._next;
                else e.styles.revert()
            },
            get: nc,
            aliases: rX,
            getSetter: function(t, e, r) {
                var n = rX[e];
                return n && 0 > n.indexOf(",") && (e = n), e in rz && e !== r1 && (t._gsap.x || nc(t, "x")) ? r && rP === r ? "scale" === e ? rZ : rQ : (rP = r || {}, "scale" === e ? rK : rJ) : t.style && !q(t.style[e]) ? rG : ~e.indexOf("-") ? r$ : rn(t, e)
            },
            core: {
                _removeProperty: ns,
                _getMatrix: nx
            }
        };
        rk.utils.checkPrefix = r9, rk.core.getStyleSaver = r8, i = tT("x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + (n = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function(t) {
            rz[t] = 1
        }), tT(n, function(t) {
            P.units[t] = "deg", nm[t] = 1
        }), rX[i[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + n, tT("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function(t) {
            var e = t.split(":");
            rX[e[1]] = i[e[0]]
        }), tT("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
            P.units[t] = "px"
        }), rk.registerPlugin(nD);
        var nR = rk.registerPlugin(nD) || rk;
        nR.core.Tween, t.s(["U", 0, nR, "e", 0, nR], 89970)
    }])
})();