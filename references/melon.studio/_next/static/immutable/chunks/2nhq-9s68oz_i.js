(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 94002, e => {
    "use strict";
    let t;
    var a = e.i(8560),
        r = e.i(90072),
        l = e.i(46302),
        n = e.i(17724),
        i = e.i(89970),
        o = e.i(66657),
        u = e.i(67521),
        s = e.i(4342);
    let h = (e, t, a) => Math.min(a, Math.max(t, e)),
        d = (e, t, a) => {
            let r = h((a - e) / Math.max(1e-6, t - e), 0, 1);
            return r * r * (3 - 2 * r)
        },
        f = e => e * e * e * (e * (6 * e - 15) + 10);

    function c(e, t, a = s.p) {
        return f(h(e * t / a, 0, 1)) * f(h((1 - e) * t / a, 0, 1))
    }
    let v = Math.tan(s.V.fov * Math.PI / 360);

    function _(e, t, a, r) {
        let l, n = e.uniforms,
            {
                w: i,
                h: o
            } = e.pose,
            u = 0;
        if (n.u_hover.value > 1e-4) {
            let e = i / o,
                r = Math.max(n.u_dentR.value * n.u_dentR.value, 1e-4),
                l = n.u_mouse.value,
                h = (t - l.x) * e,
                d = a - l.y,
                f = .5 + .5 * c(l.x, e, s.N) * c(l.y, 1, s.N);
            u -= n.u_hover.value * n.u_dent.value * o * f * Math.exp(-(h * h + d * d) / r) * c(t, e) * c(a, 1)
        }
        let f = e.pose.x + (t - .5) * i,
            v = -(e.pose.y + (a - .5) * o),
            _ = f,
            p = n.u_sheetW.value,
            m = n.u_sheetP.value,
            g = n.u_sheetD.value,
            x = n.u_sheetV.value,
            w = n.u_tail.value,
            b = n.u_sheetC.value,
            y = v / Math.max(p, 1e-4) * n.u_sheetT.value + n.u_shift.value,
            S = p < .001 ? 0 : n.u_bank.value * (l = Math.PI * Math.cos(Math.PI * y) - 2 * w * y * Math.sin(Math.PI * y), (-2 * y * (1 + w * (1 - y * y)) * (1 - b) + b * l) * Math.exp(-w * y * y)) / Math.PI * b * m;
        if (x > .001 && p > .001 && m > .001) {
            let e = v / p;
            S += n.u_vtwist.value * x * d(.3, .9, Math.abs(e)) * Math.sign(e) * m
        }
        if (Math.abs(S) >= 1e-4) {
            let e = Math.sin(S),
                t = Math.cos(S),
                a = _;
            _ = a * t - u * e, u = a * e + u * t
        }
        if (u += -(((1 - b) * (1 - y * y) + b * Math.sin(Math.PI * y)) * Math.exp(-w * y * y) * g) * m, p > .001 && x > .001) {
            let e = 1 - d(-1, .3, v / p);
            _ += n.u_rearY.value * p * x * e * m, u += n.u_rearZ.value * p * x * e * m
        }
        let E = n.u_leanW.value;
        if (E > .001 && m > .001) {
            let e = h(v / E, -1, 1);
            u += n.u_leanA.value * e * (1.5 - .5 * e * e) * m
        }
        let z = -v,
            T = _ + n.u_diagX.value * z * m,
            M = 1 - u / s.V.z,
            {
                W: P,
                H: D,
                ww: k,
                wh: R
            } = e.view;
        return r.x = (T / (P * M) + 1) * .5 * k, r.y = (1 - z / (D * M)) * .5 * R, r
    }
    let p = (e, t) => {
            let a = v * s.V.z;
            return {
                W: a * e / t,
                H: a,
                ww: e,
                wh: t
            }
        },
        m = {
            x: 0,
            y: 0
        },
        g = {
            x: 0,
            y: 0
        },
        x = {
            x: 0,
            y: 0
        };

    function w(e, t, a) {
        let r = e.rect;
        if (!r.width || !r.height) return null;
        let l = (t - r.left - e.dx) / r.width,
            n = 1 - (a - r.top) / r.height;
        if (e.drawn)
            for (let r = 0; r < 4; r++) {
                _(e, l, n, m);
                let r = m.x - t,
                    i = m.y - a;
                if (r * r + i * i < .01) break;
                _(e, l + .01, n, g), _(e, l, n + .01, x);
                let o = (g.x - m.x) / .01,
                    u = (g.y - m.y) / .01,
                    s = (x.x - m.x) / .01,
                    d = (x.y - m.y) / .01,
                    f = o * d - s * u;
                if (1e-6 > Math.abs(f)) break;
                l = h(l - (d * r - s * i) / f, -.5, 1.5), n = h(n - (o * i - u * r) / f, -.5, 1.5)
            }
        return {
            x: h(l, 0, 1),
            y: h(n, 0, 1)
        }
    }
    let b = "cap-pin",
        y = (e, t, a) => {
            let r = Math.min(1, Math.max(0, (a - e) / Math.max(1e-6, t - e)));
            return r * r * (3 - 2 * r)
        },
        S = e => Math.round(10 * e) / 10;
    var E = e.i(1603);
    let z = e => Number.isInteger(e) ? e.toFixed(1) : String(e),
        T = `
uniform float u_leanA; // signed depth at the frustum edge, world units (0 = flat)
uniform float u_leanW; // frustum half-extent at z = 0

float leanRamp(float s) {
	s = clamp(s, -1.0, 1.0);
	return s * (1.5 - 0.5 * s * s);
}

float leanSlope(float s) {
	s = min(abs(s), 1.0);
	return 1.5 * (1.0 - s * s);
}

vec4 lean(vec4 w, float k) {
	if (u_leanW > 0.001 && k > 0.001) {
		w.z += u_leanA * leanRamp(w.x / u_leanW) * k;
	}
	return w;
}
`,
        M = `
const float SHEET_PI = 3.141592653589793;

uniform float u_bank;
uniform float u_rearY;
uniform float u_rearZ;
uniform float u_vtwist;
uniform float u_tail;
uniform float u_shift;

uniform float u_sheetW; // frustum half-extent at z = 0 (0 = sheet off)
uniform float u_sheetD; // the S's amplitude, world units
uniform float u_sheetT; // how much of the frame the S spans
uniform float u_sheetC; // 0 = symmetric bowl, 1 = the near-to-far S
uniform float u_sheetP; // sheet strength
uniform float u_sheetV; // scroll speed, 0..1
uniform float u_hover;  // 0 at rest, 1 with the pointer on this card
uniform float u_dent;   // dent depth, \xd7 card height
uniform float u_dentR;  // dent radius (gaussian 1/e), \xd7 card height
uniform vec2 u_mouse;   // per card: the dent's centre in the plane's uv

float sheetQ(float wx) {
	return wx / max(u_sheetW, 0.0001) * u_sheetT + u_shift;
}

float sheetShape(float q) {
	return mix(1.0 - q * q, sin(SHEET_PI * q), u_sheetC) * exp(-u_tail * q * q);
}

float sheetShapeSlope(float q) {
	float g = exp(-u_tail * q * q);
	float bowl = -2.0 * q * (1.0 + u_tail * (1.0 - q * q));
	float ess = SHEET_PI * cos(SHEET_PI * q) - 2.0 * u_tail * q * sin(SHEET_PI * q);
	return mix(bowl, ess, u_sheetC) * g;
}

float sheetZ(float wx) {
	return -u_sheetD * sheetShape(sheetQ(wx));
}

float sheetRoll(float wx) {
	if (u_sheetW < 0.001) return 0.0;
	return u_bank * sheetShapeSlope(sheetQ(wx)) / SHEET_PI * u_sheetC * u_sheetP;
}

vec4 sheetWind(vec4 w) {
	float a = sheetRoll(w.x);
	if (u_sheetV > 0.001 && u_sheetW > 0.001 && u_sheetP > 0.001) {
		float qe = w.x / u_sheetW;
		a += u_vtwist * u_sheetV * smoothstep(0.3, 0.9, abs(qe)) * sign(qe) * u_sheetP;
	}
	if (abs(a) < 0.0001) return w;
	float s = sin(a);
	float c = cos(a);
	return vec4(w.x, w.y * c - w.z * s, w.y * s + w.z * c, w.w);
}

vec4 sheet(vec4 w) {
	w = sheetWind(w);
	w.z += sheetZ(w.x) * u_sheetP;
	if (u_sheetW > 0.001 && u_sheetV > 0.001) {
		float m = 1.0 - smoothstep(-1.0, 0.3, w.x / u_sheetW);
		w.y += u_rearY * u_sheetW * u_sheetV * m * u_sheetP;
		w.z += u_rearZ * u_sheetW * u_sheetV * m * u_sheetP;
	}
	return w;
}

float sheetDome(vec2 uv) {
	vec2 q = uv * 2.0 - 1.0;
	return (1.0 - q.x * q.x) * (1.0 - q.y * q.y);
}

// The hover dent: a gaussian under the cursor, flat (zero slope) on a DENT_EDGE band at each border so
// the border stays in place, and shallower near a border (the DENT_NEAR mask taken at the cursor).
// Quintic, not cubic: its slope has no kink, so the relief light shows no Mach band.
// dentField returns vec3(f, df/du, df/dv); the plane's z is -u_hover\xb7u_dent\xb7res.y\xb7f.
const float DENT_EDGE = ${z(s.p)};
const float DENT_NEAR = ${z(s.N)};
const float DENT_SHADE = 1.3; // depth shade per unit of dent depth (\xd7 card height)

// vec2(mask, d mask / dx) for x in 0..1 across a side 'span' card heights long
vec2 dentEdge(float x, float span, float band) {
	float a = clamp(x * span / band, 0.0, 1.0);
	float b = clamp((1.0 - x) * span / band, 0.0, 1.0);
	float ma = a * a * a * (a * (a * 6.0 - 15.0) + 10.0);
	float mb = b * b * b * (b * (b * 6.0 - 15.0) + 10.0);
	float da = 30.0 * a * a * (1.0 - a) * (1.0 - a);
	float db = 30.0 * b * b * (1.0 - b) * (1.0 - b);
	return vec2(ma * mb, span / band * (da * mb - ma * db));
}

vec3 dentField(vec2 uv, vec2 res) {
	float asp = res.x / max(res.y, 0.0001);
	vec2 sc = vec2(asp, 1.0);
	vec2 d = (uv - u_mouse) * sc;
	float r2 = max(u_dentR * u_dentR, 0.0001);
	float g = exp(-dot(d, d) / r2);
	vec2 dg = g * (-2.0 / r2) * d * sc;
	vec2 ex = dentEdge(uv.x, asp, DENT_EDGE);
	vec2 ey = dentEdge(uv.y, 1.0, DENT_EDGE);
	float m = ex.x * ey.x;
	float am = 0.5 + 0.5 * dentEdge(u_mouse.x, asp, DENT_NEAR).x * dentEdge(u_mouse.y, 1.0, DENT_NEAR).x;
	return am * vec3(g * m, dg * m + g * vec2(ex.y * ey.x, ex.x * ey.y));
}

// the dent's gradient (dz/dx, dz/dy) in world units, in the plane's own axes
vec2 dentGrad(vec2 uv, vec2 res) {
	if (u_hover < 0.0001) return vec2(0.0);
	vec3 f = dentField(uv, res);
	float a = u_hover * u_dent;
	return vec2(-a * res.y * f.y / max(res.x, 0.0001), -a * f.z);
}

float sheetShade(float wx, vec2 uv, vec2 res) {
	if (u_sheetD < 0.001) return 0.0;
	float d = u_sheetW > 0.001 && u_sheetP > 0.001
		? clamp((u_sheetD - sheetZ(wx)) / (2.0 * u_sheetD), 0.0, 1.0) * u_sheetP
		: 0.0;
	// the dent sinks by its depth as a share of the card height, not of the S's amplitude
	if (u_hover > 0.0001) {
		d += u_hover * u_dent * DENT_SHADE * dentField(uv, res).x;
	}
	return clamp(d, 0.0, 1.0);
}

float sheetOffset(float wx, vec2 uv, vec2 res) {
	float z = 0.0;
	if (u_sheetW > 0.001 && u_sheetP > 0.001 && u_sheetD > 0.001) z += sheetZ(wx) * u_sheetP;
	if (u_leanW > 0.001) z += u_leanA * leanRamp(wx / u_leanW) * u_sheetP;
	if (u_hover > 0.0001) z -= u_hover * u_dent * res.y * dentField(uv, res).x;
	return z;
}

// the sheet + lean slope plus an extra gradient g (ribbon-frame axes), then the resting roll
vec3 sheetNormalG(float wx, vec2 g) {
	float dzdx = g.x;
	float dzdy = g.y;
	if (u_sheetW > 0.001 && u_sheetP > 0.001 && u_sheetD > 0.001) {
		dzdx += -u_sheetD * sheetShapeSlope(sheetQ(wx)) * u_sheetT / u_sheetW * u_sheetP;
	}
	if (u_leanW > 0.001) {
		dzdx += (u_leanA / u_leanW) * leanSlope(wx / u_leanW) * u_sheetP;
	}
	vec3 n = normalize(vec3(-dzdx, -dzdy, 1.0));
	float a = sheetRoll(wx);
	if (abs(a) > 0.0001) {
		float s = sin(a);
		float c = cos(a);
		n = vec3(n.x, n.y * c - n.z * s, n.y * s + n.z * c);
	}
	return n;
}
`,
        P = `
uniform float u_diagX;

vec4 toRibbon(vec4 w) {
	return vec4(-w.y, w.x, w.z, w.w);
}

vec4 fromRibbon(vec4 r) {
	return vec4(r.y, -r.x, r.z, r.w);
}

vec3 fromRibbonDir(vec3 r) {
	return vec3(r.y, -r.x, r.z);
}

float ribbonAlong(vec3 flatW) {
	return -flatW.y;
}

vec4 ribbonDiag(vec4 w) {
	w.x += u_diagX * w.y * u_sheetP;
	return w;
}

vec3 ribbonSurface(vec3 flatW, vec2 uv, vec2 res) {
	vec3 p = flatW + vec3(0.0, 0.0, sheetOffset(ribbonAlong(flatW), uv, res));
	p.x += u_diagX * p.y * u_sheetP;
	return p;
}

// The analytic normal in world space: the dent's gradient (plane axes) is turned into the ribbon's frame
// and added before the resting roll, the normal is turned back, then through the shear's inverse-transpose.
vec3 ribbonNormal(vec3 flatW, vec2 uv, vec2 res) {
	float al = ribbonAlong(flatW);
	vec2 gw = dentGrad(uv, res);
	vec3 n = sheetNormalG(al, vec2(-gw.y, gw.x));
	n = fromRibbonDir(n);
	float k = u_diagX * u_sheetP;
	return normalize(vec3(n.x, n.y - k * n.x, n.z));
}
`,
        D = `
uniform vec3 u_lightDir;  // normalised in JS
uniform float u_gloss;
uniform float u_spec;
uniform float u_diff;
uniform vec3 u_specTint;  // highlight colour
uniform vec3 u_diffTint;  // per-channel shadow weight (1 = neutral darkening)

vec3 sheetLit(vec3 col, vec3 n, vec3 v, float amt) {
	if (amt < 0.001) return col;
	float d = dot(n, u_lightDir) * 0.5 + 0.5;
	col *= 1.0 - u_diff * amt * (1.0 - d) * u_diffTint;
	vec3 h = normalize(u_lightDir + v);
	return col + pow(max(dot(n, h), 0.0), u_gloss) * u_spec * amt * u_specTint;
}
`,
        k = `
vec2 uvCover(vec2 planeSize, vec2 imageSize, vec2 uv) {
	float planeRatio = planeSize.x / planeSize.y;
	float imageRatio = imageSize.x / imageSize.y;
	vec2 newSize = planeRatio < imageRatio
		? vec2(imageSize.x * (planeSize.y / imageSize.y), planeSize.y)
		: vec2(planeSize.x, imageSize.y * (planeSize.x / imageSize.x));
	vec2 newOffset = (planeRatio < imageRatio
		? vec2((newSize.x - planeSize.x) / 2.0, 0.0)
		: vec2(0.0, (newSize.y - planeSize.y) / 2.0)) / newSize;
	return uv * planeSize / newSize + newOffset;
}
`,
        R = `
float roundedBox(vec2 p, vec2 mid, float r) {
	vec2 q = abs(p - mid) - (mid - r);
	return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
`,
        W = `
uniform vec2 u_res;     // the plane's world size
uniform float u_flat;   // per card. 0 = on the ribbon, 1 = a flat unshaded rectangle (the project's figure)
uniform float u_lift;   // per card, world units: in-flight bulge toward the camera
uniform vec2 u_stretch; // per card, world units: in-flight lead, the edge facing the travel runs ahead
varying vec2 vUv;
varying vec3 vFlat; // the world position before any z is written

${T}
${M}
${P}

void main() {
	vUv = uv;
	vFlat = (modelMatrix * vec4(position, 1.0)).xyz;

	vec3 p = position;
	if (u_hover > 0.0001) {
		p.z -= u_hover * u_dent * u_res.y * dentField(uv, u_res).x;
	}

	vec4 w = modelMatrix * vec4(p, 1.0);
	w = toRibbon(w);
	w = sheet(w);
	w = lean(w, u_sheetP);
	w = fromRibbon(w);
	w = ribbonDiag(w);

	// the project flight: one lerp of every displacement above back to the flat plane
	w.xyz = mix(w.xyz, vFlat, u_flat);

	// the in-flight shape (zero at rest and at both ends of a flight)
	float sl = length(u_stretch);
	if (sl > 0.0001) {
		float lead = dot(uv - 0.5, u_stretch / sl);
		w.xy += u_stretch * lead;
	}
	w.z += u_lift * (0.5 + 0.5 * sheetDome(uv));

	gl_Position = projectionMatrix * viewMatrix * w;
}
`,
        A = `
uniform sampler2D u_texture;
uniform vec2 u_size;
uniform sampler2D u_texB;   // the texture being faded to (tiles.ts)
uniform vec2 u_sizeB;
uniform float u_fade;       // 0 = u_texture, 1 = u_texB
uniform vec2 u_res;
uniform float u_alpha;
uniform float u_shade;      // depth-shade strength
uniform float u_shadeS;     // depth-shade spread: below 1 widens it
uniform vec3 u_shadeColor;  // receding parts sink toward this (raw bytes / 255)
uniform float u_sheen;      // sheen amount
uniform float u_corner;     // border radius, normalised to the plane's height
uniform float u_flat;       // per card: 1 = plain texture, no depth shade, no sheen (matches an <img>)
uniform float u_dentLit;    // hover dent relief: the dent's own slope against the light

varying vec2 vUv;
varying vec3 vFlat;

${T}
${M}
${P}
${D}
${k}
${R}

void main() {
	vec4 tex = texture2D(u_texture, uvCover(u_res, u_size, vUv));
	if (u_fade > 0.0001) {
		tex = mix(tex, texture2D(u_texB, uvCover(u_res, u_sizeB, vUv)), u_fade);
	}

	float al = ribbonAlong(vFlat);
	float bent = 1.0 - u_flat;

	if (u_shade > 0.001 && bent > 0.001) {
		float depth = sheetShade(al, vUv, u_res);
		tex.rgb = mix(tex.rgb, u_shadeColor, u_shade * bent * 0.8 * pow(depth, u_shadeS));
	}

	// the dent's relief: the wall facing away from the light darkens (multiply), the wall facing it lifts
	// toward the light's tint (screen, so it also reads on dark images)
	if (u_hover > 0.0001 && u_dentLit > 0.001 && bent > 0.001) {
		vec3 nd = normalize(vec3(-dentGrad(vUv, u_res), 1.0));
		float rel = dot(nd, u_lightDir) - u_lightDir.z;
		float k = u_dentLit * bent;
		tex.rgb *= 1.0 + k * min(rel, 0.0);
		tex.rgb += (1.0 - tex.rgb) * k * max(rel, 0.0) * u_specTint;
	}

	if (u_sheen > 0.001 && bent > 0.001) {
		vec3 p = ribbonSurface(vFlat, vUv, u_res);
		tex.rgb = sheetLit(tex.rgb, ribbonNormal(vFlat, vUv, u_res), normalize(cameraPosition - p), u_sheen * bent);
	}

	float alpha = u_alpha;
	if (u_corner > 0.0001) {
		vec2 sz = vec2(u_res.x / max(u_res.y, 0.0001), 1.0);
		vec2 mid = sz * 0.5;
		float r = min(u_corner, min(mid.x, mid.y));
		float d = roundedBox(vUv * sz, mid, r);
		float aa = max(fwidth(d), 0.0001);
		alpha *= 1.0 - smoothstep(-aa, aa, d);
	}

	gl_FragColor = vec4(tex.rgb, alpha);
}
`,
        C = e => {
            let t = e.image;
            return new r.wq(t.videoWidth || t.width, t.videoHeight || t.height)
        };

    function L(e, t, a) {
        let r = e.uniforms;
        if (r.u_texture.value === t && !r.u_texB.value) return;
        i.e.killTweensOf(r.u_fade);
        let l = () => {
            r.u_texture.value = t, r.u_size.value.copy(C(t)), r.u_texB.value = null, r.u_fade.value = 0
        };
        if (!a || !r.u_texture.value) return l();
        r.u_texB.value = t, r.u_sizeB.value.copy(C(t)), r.u_fade.value = 0, i.e.to(r.u_fade, {
            value: 1,
            ...s.a,
            onComplete: l
        })
    }
    var q = e.i(56385);

    function F(e, t) {
        e.u_sheetT.value = t.SPAN, e.u_sheetC.value = t.sheetC, e.u_bank.value = t.BANK, e.u_rearY.value = t.REAR_Y, e.u_rearZ.value = t.REAR_Z, e.u_vtwist.value = t.VTWIST, e.u_tail.value = t.TAIL, e.u_shift.value = t.SHIFT, e.u_diagX.value = t.DIAG_X, e.u_shade.value = t.shade ? t.shadeA : 0, e.u_shadeS.value = t.shadeS, e.u_shadeColor.value.set(...(0, q.M)(t.shadeColor)), e.u_sheen.value = +!!t.sheen, e.u_dent.value = t.DENT, e.u_dentR.value = t.DENT_R, e.u_dentLit.value = t.DENT_LIT, e.u_lightDir.value.set(t.lightX, t.lightY, t.lightZ).normalize(), e.u_gloss.value = t.GLOSS, e.u_spec.value = t.SPEC, e.u_diff.value = t.DIFF;
        let [a, r, l] = (0, q.M)(t.tintColor), n = t.warmth;
        e.u_specTint.value.set(1 + (a - 1) * n, 1 + (r - 1) * n, 1 + (l - 1) * n), e.u_diffTint.value.set(1 - .45 * n, 1, 1)
    }
    let N = e => e,
        V = e => e.hold && e.ui.alpha <= .001 && !e.cards().some(e => e.fly && !e.fly.handoff),
        I = "is-gl",
        H = 0;
    e.s(["initRibbon", 0, function(e) {
        return void 0 === t && (t = function(e) {
            let h, d, f, c, v, m, g, x = e.getContext("webgl2", {
                alpha: !0,
                depth: !0,
                stencil: !1,
                antialias: !0,
                premultipliedAlpha: !0,
                preserveDrawingBuffer: !1,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: !1
            });
            if (!x) return null;
            H++;
            let z = new a.f({
                canvas: e,
                context: x,
                antialias: !0,
                alpha: !0,
                powerPreference: "high-performance"
            });
            z.setPixelRatio(Math.min(s.Z, devicePixelRatio)), z.setSize(innerWidth, innerHeight), z.outputColorSpace = r.Rg, z.setClearAlpha(0);
            let T = new r.zm(s.V.fov, innerWidth / innerHeight, s.V.near, s.V.far);
            T.position.z = s.V.z;
            let M = new r.P6,
                P = new r.CQ(1, 1, s.E.x, s.E.y),
                {
                    VERT: D,
                    FRAG: k
                } = {
                    VERT: W,
                    FRAG: A
                },
                R = p(innerWidth, innerHeight),
                C = (0, E.z)((0, l.u)()),
                q = {
                    u_sheetW: (h = e => ({
                        value: e
                    }))(0),
                    u_sheetD: h(0),
                    u_sheetT: h(0),
                    u_sheetC: h(0),
                    u_sheetP: h(1),
                    u_sheetV: h(0),
                    u_leanA: h(0),
                    u_leanW: h(0),
                    u_bank: h(0),
                    u_rearY: h(0),
                    u_rearZ: h(0),
                    u_vtwist: h(0),
                    u_tail: h(0),
                    u_shift: h(0),
                    u_diagX: h(0),
                    u_shade: h(0),
                    u_shadeS: h(0),
                    u_sheen: h(0),
                    u_dent: h(0),
                    u_dentR: h(0),
                    u_dentLit: h(0),
                    u_shadeColor: h(new r.cE),
                    u_lightDir: h(new r.cE),
                    u_gloss: h(0),
                    u_spec: h(0),
                    u_diff: h(0),
                    u_specTint: h(new r.cE),
                    u_diffTint: h(new r.cE)
                };
            F(q, C);
            let B = new r.H5,
                O = new Map,
                Y = Math.min(s.n, z.capabilities.getMaxAnisotropy()),
                $ = e => {
                    let t = O.get(e);
                    return t || (t = B.loadAsync(e).then(e => (e.colorSpace = r.Ik, e.wrapS = e.wrapT = r.Jr, e.minFilter = r.Q4, e.magFilter = r.VV, e.anisotropy = Y, e.needsUpdate = !0, e.image.decode().catch(() => {}).then(() => (z.initTexture(e), e))), () => null), O.set(e, t)), t
                },
                X = null,
                U = 0,
                G = 0,
                Z = !0,
                j = 0,
                K = () => X ? .cards ? ? [],
                Q = {
                    cards: K,
                    hold: !1,
                    ui: {
                        alpha: 1
                    },
                    click: null,
                    cardScroll: et
                },
                J = (d = e => {
                    let t = Q.cards()[e.i];
                    if (!t || t.slug !== e.slug) throw Error(`ribbon: no card ${e.slug} on this route`);
                    return t
                }, {
                    ui: Q.ui,
                    setHold(e) {
                        Q.hold = e
                    },
                    get parked() {
                        return V(Q)
                    },
                    onCardClick: e => (Q.click = e, () => {
                        Q.click === e && (Q.click = null)
                    }),
                    card: e => Q.cards().find(t => t.slug === e) ? ? null,
                    startFlight(e, {
                        figure: t,
                        radius: a = 0,
                        ease: r = N,
                        p: l = 0,
                        back: n = !1
                    }) {
                        let i = d(e);
                        i.hidden = !1;
                        let o = {
                            p: l,
                            back: n,
                            handoff: !n && V(Q),
                            figure: t,
                            radius: a,
                            lastE: 0,
                            eased() {
                                return this.back ? 1 - r(1 - this.p) : r(this.p)
                            }
                        };
                        return o.lastE = o.eased(), i.fly = o, o
                    },
                    endFlight(e, {
                        hidden: t
                    }) {
                        let a = d(e);
                        a.fly = null, a.hidden = t, a.uniforms.u_lift.value = 0, a.uniforms.u_stretch.value.set(0, 0)
                    },
                    cardScroll: e => Q.cardScroll(e)
                }),
                ee = (f = new Map, c = new Map, v = e => {
                    let t = c.get(e);
                    return t || ((t = new r.TS(e)).colorSpace = r.Ik, t.wrapS = t.wrapT = r.Jr, t.minFilter = r.VV, t.magFilter = r.VV, t.generateMipmaps = !1, c.set(e, t)), t
                }, m = new Set, g = e => {
                    let t = K()[e];
                    if (!t) throw Error(`ribbon tiles: no tile ${e}`);
                    return t
                }, {
                    get count() {
                        return K().length
                    },
                    slug: e => g(e).slug,
                    setSource(e, t) {
                        let a = g(e);
                        t ? f.set(a.slug, t) : f.delete(a.slug);
                        let r = t ? v(t) : a.thumb;
                        r && L(a, r, !0)
                    },
                    onFrameNeeded(e, t) {
                        let a = g(e);
                        return a.listeners.add(t), t(a.heard), () => void a.listeners.delete(t)
                    },
                    onChange: e => (m.add(e), () => void m.delete(e)),
                    showThumbnail(e, t) {
                        e.thumb = t;
                        let a = f.get(e.slug);
                        L(e, a && a.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ? v(a) : t, !1)
                    },
                    changed() {
                        for (let e of m) e()
                    },
                    destroy() {
                        for (let e of c.values()) e.dispose();
                        c.clear(), f.clear(), m.clear()
                    },
                    drawn(e, t) {
                        if (t !== e.heard)
                            for (let a of (e.heard = t, e.listeners)) a(t)
                    }
                });

            function et(e) {
                let t = X;
                if (!t) return 0;
                let a = t.cards[Math.max(0, Math.min(t.cards.length - 1, e))];
                return t.section.getBoundingClientRect().top + scrollY + a.base.top + a.base.height / 2 - innerHeight / 2
            }

            function ea() {
                let e = X;
                if (!e) return;
                for (let t of e.cards) t.el.style.transform = "", t.dx = 0;
                let t = e.section.getBoundingClientRect();
                for (let a of (e.top = t.top + scrollY, e.bottom = t.bottom + scrollY, e.cards)) {
                    let e = a.hit.getBoundingClientRect();
                    a.base = {
                        left: e.left - t.left,
                        top: e.top - t.top,
                        width: e.width,
                        height: e.height
                    }
                }
            }

            function er(e, t) {
                let a = e.querySelector(".proj__card"),
                    l = { ...q,
                        u_texture: {
                            value: null
                        },
                        u_size: {
                            value: new r.wq(1, 1)
                        },
                        u_texB: {
                            value: null
                        },
                        u_sizeB: {
                            value: new r.wq(1, 1)
                        },
                        u_fade: {
                            value: 0
                        },
                        u_res: {
                            value: new r.wq(1, 1)
                        },
                        u_alpha: {
                            value: 1
                        },
                        u_corner: {
                            value: 0
                        },
                        u_hover: {
                            value: 0
                        },
                        u_mouse: {
                            value: new r.wq(.5, .5)
                        },
                        u_flat: {
                            value: 0
                        },
                        u_lift: {
                            value: 0
                        },
                        u_stretch: {
                            value: new r.wq(0, 0)
                        }
                    },
                    n = new r.Zg({
                        vertexShader: D,
                        fragmentShader: k,
                        uniforms: l,
                        transparent: !0,
                        depthTest: !1,
                        depthWrite: !1
                    }),
                    i = new r.kE(P, n);
                return i.frustumCulled = !1, i.visible = !1, M.add(i), {
                    i: t,
                    slug: e.dataset.slug ? ? "",
                    href: a.href,
                    el: e,
                    hit: a,
                    cap: e.querySelector(".proj__cap"),
                    mesh: i,
                    uniforms: l,
                    view: R,
                    base: {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0
                    },
                    rect: {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0
                    },
                    pose: {
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0
                    },
                    dx: 0,
                    drawn: !1,
                    thumb: null,
                    fly: null,
                    hidden: !1,
                    pointer: null,
                    capA: "",
                    capT: "",
                    capV: !1,
                    sk: null,
                    heard: !1,
                    listeners: new Set
                }
            }

            function el(e) {
                var t;
                let a = X;
                if (!a) return;
                let r = 1;
                void 0 !== e && (r = G ? Math.min(s.B, (e - G) * 60) : 1, G = e);
                let l = a.ctx.scroll.lag,
                    n = a.ctx.reduced ? 0 : Math.min(1, Math.tanh(l / C.VEL_NORM) ** 2);
                (U += (n - U) * (1 - Math.pow(1 - C.V_SMOOTH, r))) < s.o && (U = 0);
                let i = U,
                    {
                        W: o,
                        H: u,
                        ww: h,
                        wh: d
                    } = R,
                    f = V(Q),
                    c = a.ctx.scroll.y;
                if (!(Q.hold || a.bottom - c > s.k.above * d && a.top - c < s.k.below * d) || f && !a.cards.some(e => e.fly)) {
                    if (Z) {
                        for (let e of a.cards) e.mesh.visible = e.drawn = !1, a.captions.show(e, !1), ee.drawn(e, !1);
                        z.render(M, T), Z = !1
                    }
                    return
                }
                Z = !0, t = C, q.u_sheetW.value = u, q.u_leanW.value = u, q.u_sheetD.value = u * t.DEPTH * (1 + t.VEL_BULGE * i), q.u_sheetV.value = i, q.u_leanA.value = u * t.DOOR;
                let v = a.section.getBoundingClientRect(),
                    _ = h / (2 * o);
                for (let e of a.cards) {
                    let t = e.rect;
                    t.left = v.left + e.base.left, t.top = v.top + e.base.top, t.width = e.base.width, t.height = e.base.height;
                    let l = C.radius,
                        n = 0,
                        i = 0,
                        h = 0;
                    if (e.fly) {
                        let a = e.fly,
                            o = a.eased(),
                            s = a.figure(),
                            {
                                left: f,
                                top: c,
                                width: v,
                                height: p
                            } = t;
                        t.left = f + (s.left - f) * o, t.top = c + (s.top - c) * o, t.width = v + (s.width - v) * o, t.height = p + (s.height - p) * o, l = C.radius + (a.radius - C.radius) * o, n = 4 * C.FLY_LIFT * o * (1 - o) * (2 * u * t.height / d);
                        let m = (o - a.lastE) / Math.max(.25, r);
                        a.lastE = o, i = (s.left + s.width / 2 - (f + v / 2)) * m * C.FLY_STRETCH / _, h = -(s.top + s.height / 2 - (c + p / 2)) * m * C.FLY_STRETCH / _
                    }
                    e.uniforms.u_lift.value = n, e.uniforms.u_stretch.value.set(i, h),
                        function(e, t, a) {
                            let {
                                W: r,
                                H: l,
                                ww: n,
                                wh: i
                            } = e;
                            a.w = 2 * r * t.width / n, a.h = 2 * l * t.height / i, a.x = -r + a.w / 2 + t.left / n * 2 * r, a.y = l - a.h / 2 - t.top / i * 2 * l
                        }(R, t, e.pose), a.captions.fade(e, function(e, t, a, r) {
                            if (!e.CAP_FADE) return t;
                            let l = Math.max(e.capFrom + .01, e.capTo);
                            return t * (1 - y(e.capFrom, l, Math.abs(a))) * (1 - y(s.m.from, s.m.to, Math.abs(r)))
                        }(C, Q.ui.alpha, e.pose.y / u, e.pose.x / o));
                    let c = null !== e.uniforms.u_texture.value && !e.hidden && (null !== e.fly || !f && t.top < s.k.below * d && t.top + t.height > s.k.above * d);
                    if (e.mesh.visible = e.drawn = c, e.mesh.renderOrder = 10 * !!e.fly, a.captions.show(e, c), !c) continue;
                    e.mesh.position.set(e.pose.x, e.pose.y, 0), e.mesh.scale.set(e.pose.w, e.pose.h, 1), e.uniforms.u_res.value.set(e.pose.w, e.pose.h), e.uniforms.u_corner.value = l / t.height;
                    let p = Math.round(C.DIAG_X * e.pose.y * _ * 10) / 10;
                    p !== e.dx && (e.dx = p, e.el.style.transform = p ? `translate3d(${p}px, 0, 0)` : ""), a.captions.place(e, C),
                        function(e, t, a) {
                            if (!e.pointer || e.fly) return;
                            let r = w(e, e.pointer.x, e.pointer.y);
                            if (!r) return;
                            let l = e.uniforms.u_mouse.value,
                                n = 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), a);
                            l.x += (r.x - l.x) * n, l.y += (r.y - l.y) * n
                        }(e, C.DENT_FOLLOW, r)
                }
                for (let e of (a.captions.label(Q.ui.alpha), z.render(M, T), j++, a.cards)) e.drawn && e.el.classList.add(I), ee.drawn(e, e.drawn)
            }
            let en = (0, l.l)(function(e) {
                    F(q, C = (0, E.z)(e)), X ? .captions.setPinned(C.CAP_PIN, X.cards)
                }),
                ei = () => {
                    T.aspect = innerWidth / innerHeight, T.updateProjectionMatrix(), z.setPixelRatio(Math.min(s.Z, devicePixelRatio)), z.setSize(innerWidth, innerHeight), Object.assign(R, p(innerWidth, innerHeight))
                };
            addEventListener("resize", ei);
            let eo = (0, o.M)("ribbon", {
                    tiles: ee,
                    transition: J
                }),
                eu = null;
            return {
                mount: function(t, a) {
                    let r, l, o, h, d, f, c, v, p = [...a.querySelectorAll("#track .proj")],
                        m = {
                            ctx: t,
                            section: a,
                            cards: p.map(er),
                            captions: (r = document.documentElement, l = a.querySelector(".work__heading"), o = a.querySelector(".f-showall"), h = !1, d = 0, f = "", c = {
                                x: 0,
                                y: 0
                            }, v = e => {
                                e.capA = "", e.capT = "", e.capV = !1, e.sk = null, e.cap.style.opacity = "", e.cap.style.transform = "", e.cap.style.translate = "", e.cap.style.visibility = ""
                            }, {
                                setPinned(e, t) {
                                    if (e !== h)
                                        for (let l of (h = e, r.classList.toggle(b, e), d = e && parseFloat(getComputedStyle(a).getPropertyValue("--cap-gap")) || 0, t)) v(l)
                                },
                                fade(e, t) {
                                    let a = t.toFixed(3);
                                    a !== e.capA && (e.capA = a, e.cap.style.opacity = a)
                                },
                                show(e, t) {
                                    h && t !== e.capV && (e.capV = t, e.cap.style.visibility = t ? "visible" : "")
                                },
                                place(e, t) {
                                    if (h) {
                                        if (e.fly) return;
                                        _(e, 0, 0, c);
                                        let t = `translate3d(${S(c.x)}px, ${S(c.y+d)}px, 0)`;
                                        t !== e.capT && (e.capT = t, e.cap.style.transform = t);
                                        return
                                    }
                                    let a = Math.round(t.DIAG_X * (e.rect.height / 2 - 9));
                                    a !== e.sk && (e.sk = a, e.cap.style.translate = a ? `${a}px 0` : "")
                                },
                                label(e) {
                                    let t = e.toFixed(3);
                                    t !== f && (f = t, l && (l.style.opacity = t), o && (o.style.opacity = t))
                                },
                                destroy(e) {
                                    for (let t of e) v(t);
                                    r.classList.remove(b), h = !1, l && (l.style.opacity = ""), o && (o.style.opacity = "")
                                }
                            }),
                            top: 0,
                            bottom: 0
                        };
                    X = m, e.hidden = !1, U = 0, G = 0, Z = !0;
                    let g = 0;
                    for (let e of m.cards) {
                        let a = e.el.querySelector("img");
                        (a ? $(a.src) : Promise.resolve(null)).then(a => {
                            X === m && (a && ee.showThumbnail(e, a), t.readiness.report("ribbon", ++g / m.cards.length))
                        })
                    }
                    let x = (e, a) => {
                            Q.click ? Q.click(e, a) : t.transition.navigate(e.href)
                        },
                        y = m.cards.flatMap(e => {
                            let t, a, r;
                            return [function(e) {
                                let {
                                    hit: t,
                                    uniforms: a
                                } = e, r = () => null !== e.fly || e.hidden, l = e => i.e.to(a.u_hover, {
                                    value: e,
                                    ...s.d,
                                    overwrite: !0
                                }), n = t => {
                                    if ("touch" !== t.pointerType && (e.pointer = {
                                            x: t.clientX,
                                            y: t.clientY
                                        }, !r())) {
                                        if (a.u_hover.value < .05) {
                                            let r = w(e, t.clientX, t.clientY);
                                            r && a.u_mouse.value.set(r.x, r.y)
                                        }
                                        l(1)
                                    }
                                }, o = t => {
                                    e.pointer && (e.pointer = {
                                        x: t.clientX,
                                        y: t.clientY
                                    })
                                }, u = () => {
                                    e.pointer = null, r() || l(0)
                                };
                                return t.addEventListener("pointerenter", n), t.addEventListener("pointermove", o), t.addEventListener("pointerleave", u), () => {
                                    t.removeEventListener("pointerenter", n), t.removeEventListener("pointermove", o), t.removeEventListener("pointerleave", u), i.e.killTweensOf(a.u_hover)
                                }
                            }(e), (t = null, a = e => {
                                t = {
                                    x: e.clientX,
                                    y: e.clientY
                                }
                            }, r = a => {
                                let r = t ? Math.hypot(a.clientX - t.x, a.clientY - t.y) : 0;
                                (t = null, r > s.A) ? a.preventDefault(): a.metaKey || a.ctrlKey || a.shiftKey || a.altKey || 0 !== a.button || (a.preventDefault(), x(e, a))
                            }, e.hit.addEventListener("pointerdown", a), e.hit.addEventListener("click", r), () => {
                                e.hit.removeEventListener("pointerdown", a), e.hit.removeEventListener("click", r)
                            })]
                        });
                    m.captions.setPinned(C.CAP_PIN, m.cards), ea(), t.ScrollTrigger.addEventListener("refreshInit", ea), t.ScrollTrigger.addEventListener("refresh", ea);
                    let E = (0, u.m)("work", () => et(0)),
                        T = (0, n.f)("ribbon", el);
                    ee.changed();
                    let P = !0,
                        D = () => {
                            if (P) {
                                for (let e of (P = !1, eu = null, T(), E(), t.ScrollTrigger.removeEventListener("refreshInit", ea), t.ScrollTrigger.removeEventListener("refresh", ea), y)) e();
                                for (let e of (m.captions.destroy(m.cards), m.cards)) ee.drawn(e, !1), e.listeners.clear(), i.e.killTweensOf(e.uniforms.u_fade), e.el.style.transform = "", e.el.classList.remove(I), M.remove(e.mesh), e.mesh.material.dispose();
                                X = null, ee.changed(), z.clear(), e.hidden = !0
                            }
                        };
                    return eu = D, D
                },
                destroy() {
                    eu ? .(), eo(), en(), removeEventListener("resize", ei), ee.destroy(), Promise.all(O.values()).then(e => e.forEach(e => e ? .dispose())), P.dispose(), z.dispose(), H--, t = void 0
                }
            }
        }(e)), t
    }], 94002)
}]);