// Adapted from the preserved reference ribbon shader for native WebGL 2.
// Regenerate with scripts/extract-reference-shaders.mjs.

export const ribbonVertexShader = `#version 300 es
precision highp float;
in vec3 position;
in vec2 uv;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform vec2 u_res;     // the plane's world size
uniform float u_flat;   // per card. 0 = on the ribbon, 1 = a flat unshaded rectangle (the project's figure)
uniform float u_lift;   // per card, world units: in-flight bulge toward the camera
uniform vec2 u_stretch; // per card, world units: in-flight lead, the edge facing the travel runs ahead
out vec2 vUv;
out vec3 vFlat; // the world position before any z is written


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
const float DENT_EDGE = 0.25;
const float DENT_NEAR = 0.45;
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
`;

export const ribbonFragmentShader = `#version 300 es
precision highp float;
uniform vec3 cameraPosition;
out vec4 fragmentColor;

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

in vec2 vUv;
in vec3 vFlat;


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
const float DENT_EDGE = 0.25;
const float DENT_NEAR = 0.45;
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


float roundedBox(vec2 p, vec2 mid, float r) {
	vec2 q = abs(p - mid) - (mid - r);
	return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}


void main() {
	vec4 tex = texture(u_texture, uvCover(u_res, u_size, vUv));
	if (u_fade > 0.0001) {
		tex = mix(tex, texture(u_texB, uvCover(u_res, u_sizeB, vUv)), u_fade);
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

	fragmentColor = vec4(tex.rgb, alpha);
}
`;
