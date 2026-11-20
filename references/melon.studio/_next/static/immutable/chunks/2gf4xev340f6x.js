(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, [8614, e => {
    var t = e.i(18050),
        n = e.i(3303),
        r = e.i(71645),
        l = e.i(8089),
        a = e.i(76677),
        o = e.i(34479);

    function i(e) {
        return addEventListener(a.T, e), () => removeEventListener(a.T, e)
    }
    e.s(["default", 0, function({
        analytics: e,
        gaId: s
    }) {
        let c = (0, r.useSyncExternalStore)(i, a._, () => null),
            [u, d] = (0, r.useState)(null),
            [f, p] = (0, r.useState)(!1),
            [m, h] = (0, r.useState)(""),
            g = (0, r.useRef)(null),
            y = (0, r.useRef)(null);
        (0, r.useEffect)(() => {
            if (null === (0, a._)() && e) return function(e) {
                let t = document.documentElement,
                    n = 0,
                    r = () => {
                        n = window.setTimeout(e, 900)
                    };
                if (!t.classList.contains("motion") || t.classList.contains("motion-revealed")) return r(), () => clearTimeout(n);
                let l = new MutationObserver(() => {
                    !t.classList.contains("motion-revealed") && t.classList.contains("motion") || (l.disconnect(), r())
                });
                return l.observe(t, {
                    attributes: !0,
                    attributeFilter: ["class"]
                }), () => {
                    l.disconnect(), clearTimeout(n)
                }
            }(() => d("banner"))
        }, [e]), (0, r.useEffect)(() => {
            let e = e => {
                y.current = e.detail, h(""), d("settings")
            };
            return addEventListener(a.Y, e), () => removeEventListener(a.Y, e)
        }, []), (0, r.useEffect)(() => {
            if (!u) return;
            let e = requestAnimationFrame(() => p(!0));
            return () => cancelAnimationFrame(e)
        }, [u]), (0, r.useEffect)(() => {
            f && "settings" === u && g.current ? .focus({
                preventScroll: !0
            })
        }, [f, u]);
        let v = (0, r.useCallback)(() => {
            p(!1), "settings" === u && y.current ? .focus({
                preventScroll: !0
            })
        }, [u]);
        (0, r.useEffect)(() => {
            if ("settings" !== u) return;
            let e = e => {
                "Escape" === e.key && v()
            };
            return addEventListener("keydown", e), () => removeEventListener("keydown", e)
        }, [u, v]), (0, r.useEffect)(() => {
            s && "denied" === c && Object.assign(window, {
                [`ga-disable-${s}`]: !0
            })
        }, [s, c]);
        let b = e => {
            (0, a.w)(e), h(o.f.consent.saved), v()
        };
        return (0, t.jsxs)(t.Fragment, {
            children: [s && "granted" === c && (0, t.jsxs)(t.Fragment, {
                children: [(0, t.jsx)(n.default, {
                    id: "ga",
                    src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(s)}`,
                    strategy: "afterInteractive"
                }), (0, t.jsx)(n.default, {
                    id: "ga-config",
                    strategy: "afterInteractive",
                    children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(s)},{cookie_expires:34128000});`
                })]
            }), (0, t.jsx)("p", {
                className: "sr-only",
                role: "status",
                children: m
            }), u && (0, t.jsxs)("div", {
                ref: g,
                className: f ? "ck is-in" : "ck",
                role: "dialog",
                "aria-modal": "false",
                "aria-labelledby": "ck-label",
                "aria-describedby": "ck-text",
                tabIndex: -1,
                onTransitionEnd: e => {
                    e.target !== g.current || "clip-path" !== e.propertyName || f || d(null)
                },
                children: [(0, t.jsx)("p", {
                    className: "sr-only",
                    id: "ck-label",
                    children: o.f.consent.label
                }), (0, t.jsx)("p", {
                    className: "ck__text",
                    id: "ck-text",
                    children: o.f.consent.text
                }), "settings" === u && c && (0, t.jsx)("p", {
                    className: "ck__state",
                    children: o.f.consent.state[c]
                }), (0, t.jsxs)("div", {
                    className: "ck__actions",
                    children: [(0, t.jsxs)("button", {
                        type: "button",
                        className: "banner" === u ? "ck__btn ck__btn--fill" : "ck__btn",
                        "data-fx-btn": !0,
                        "aria-pressed": "settings" === u ? "granted" === c : void 0,
                        onClick: () => b("granted"),
                        children: [(0, t.jsx)("span", {
                            className: "ck__fx",
                            "data-fx-host": !0,
                            "aria-hidden": "true"
                        }), (0, t.jsx)("span", {
                            "data-fx-t": !0,
                            children: o.f.consent.accept
                        })]
                    }), (0, t.jsxs)("button", {
                        type: "button",
                        className: "ck__btn",
                        "data-fx-btn": !0,
                        "aria-pressed": "settings" === u ? "denied" === c : void 0,
                        onClick: () => b("denied"),
                        children: [(0, t.jsx)("span", {
                            className: "ck__fx",
                            "data-fx-host": !0,
                            "aria-hidden": "true"
                        }), (0, t.jsx)("span", {
                            "data-fx-t": !0,
                            children: o.f.consent.decline
                        })]
                    })]
                }), (0, t.jsx)(l.SiteLink, {
                    className: "ck__more f-u",
                    href: "/cookies",
                    onClick: v,
                    children: o.f.consent.policy
                }), "settings" === u && (0, t.jsx)("button", {
                    type: "button",
                    className: "ck__close",
                    "aria-label": o.f.consent.close,
                    onClick: v,
                    children: (0, t.jsx)("svg", {
                        viewBox: "0 0 16 16",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            d: "M4 4l8 8M12 4l-8 8"
                        })
                    })
                })]
            })]
        })
    }])
}, 46281, e => {
    var t = e.i(71645),
        n = e.i(89970);
    let r = "u" > typeof document ? t.useLayoutEffect : t.useEffect,
        l = e => e && !Array.isArray(e) && "object" == typeof e,
        a = [],
        o = {},
        i = n.U,
        s = (e, n = a) => {
            let s = o;
            l(e) ? (s = e, e = null, n = "dependencies" in s ? s.dependencies : a) : l(n) && (n = "dependencies" in (s = n) ? s.dependencies : a), e && "function" != typeof e && console.warn("First parameter must be a function or config object");
            let {
                scope: c,
                revertOnUpdate: u
            } = s, d = (0, t.useRef)(!1), f = (0, t.useRef)(i.context(() => {}, c)), p = (0, t.useRef)(e => f.current.add(null, e)), m = n && n.length && !u;
            return m && r(() => (d.current = !0, () => f.current.revert()), a), r(() => {
                if (e && f.current.add(e, c), !m || !d.current) return () => f.current.revert()
            }, n), {
                context: f.current,
                contextSafe: p.current
            }
        };
    s.register = e => {
        i = e
    }, s.headless = !0;
    var c = e.i(57210);
    e.s(["f", 0, function(e, t, n) {
        s(() => (0, c.O)(e, t, n ? .current ? ? void 0), {
            scope: n
        })
    }], 46281)
}, 44196, e => {
    var t = e.i(18050),
        n = e.i(71645),
        r = e.i(34479);
    e.s(["default", 0, function() {
        let [e, l] = (0, n.useState)(r.f.post.copyLink), a = (0, n.useRef)(void 0);
        async function o() {
            let e = !1;
            try {
                await navigator.clipboard.writeText(location.origin + location.pathname), e = !0
            } catch {}
            l(e ? r.f.post.copied : r.f.post.copyFailed), clearTimeout(a.current), a.current = setTimeout(() => l(r.f.post.copyLink), 1600)
        }
        return (0, n.useEffect)(() => () => clearTimeout(a.current), []), (0, t.jsx)("button", {
            className: "pp-copy",
            type: "button",
            "aria-live": "polite",
            onClick: o,
            children: e
        })
    }])
}, 86817, e => {
    var t = e.i(18050);
    e.s(["f", 0, function({
        children: e
    }) {
        return (0, t.jsx)("span", {
            className: "mask",
            children: (0, t.jsx)("span", {
                className: "up",
                children: e
            })
        })
    }])
}, 76677, e => {
    let t = "consent",
        n = "consent:change",
        r = "consent:open",
        l = e => "_ga" === e || e.startsWith("_ga_");
    e.s(["T", 0, n, "Y", 0, r, "e", 0, e => dispatchEvent(new CustomEvent(r, {
        detail: e
    })), "_", 0, () => (function(e) {
        for (let n of e.split(";")) {
            let [e, r] = n.trim().split("=");
            if (e === t && ("granted" === r || "denied" === r)) return r
        }
        return null
    })(document.cookie), "w", 0, function(e) {
        let r = "https:" === location.protocol ? "; Secure" : "";
        document.cookie = `${t}=${e}; Max-Age=31536000; Path=/; SameSite=Lax${r}`, "denied" === e && function() {
            for (let e of document.cookie.split(";").map(e => e.trim().split("=")[0] ? ? "").filter(l))
                for (let t of [... function(e) {
                        let t = e.split("."),
                            n = [e];
                        for (let e = 1; e < t.length - 1; e++) n.push(`.${t.slice(e).join(".")}`);
                        return n
                    }(location.hostname), ""]) document.cookie = `${e}=; Max-Age=0; Path=/${t?`; Domain=${t}`:""}`
        }(), dispatchEvent(new CustomEvent(n, {
            detail: e
        }))
    }])
}, 5219, e => {
    e.s(["n", 0, {
        bg: "oklch(95.7% 0.008 36.55)",
        fg: "oklch(10.6% 0.0434 29.23)"
    }, "S", 0, ["ink", "paper", "red"]])
}, 53021, e => {
    e.s(["h", 0, !1, "Y", 0, e => `/insights/topics/${e}`])
}, 91699, e => {
    let t = {
        mp4: ".mp4",
        webm: ".webm",
        mp4Small: "-768.mp4",
        webmSmall: "-768.webm"
    };
    e.s(["f", 0, function(e, n) {
        return Object.fromEntries(Object.entries(t).map(([t, r]) => [t, `${e}/${n}${r}`]))
    }])
}, 46302, e => {
    let t = "(max-width: 809.98px)";
    e.s(["u", 0, () => matchMedia(t).matches, "l", 0, function(e) {
        let n = matchMedia(t),
            r = t => e(t.matches);
        return n.addEventListener("change", r), () => n.removeEventListener("change", r)
    }])
}, 66657, e => {
    let t = new Map,
        n = new Map,
        r = new Map;
    e.s(["M", 0, function(e, l) {
        for (let r of (t.set(e, l), n.get(e) ? ? [])) r(l);
        for (let t of (n.delete(e), r.get(e) ? ? [])) t(l);
        return () => {
            if (t.get(e) === l)
                for (let n of (t.delete(e), r.get(e) ? ? [])) n(null)
        }
    }, "j", 0, function(e) {
        return t.has(e) ? Promise.resolve(t.get(e)) : new Promise(t => {
            let r = n.get(e) ? ? [];
            r.push(t), n.set(e, r)
        })
    }, "A", 0, function(e, n) {
        let l = r.get(e) ? ? new Set;
        return r.set(e, l), l.add(n), t.has(e) && n(t.get(e)), () => void l.delete(n)
    }])
}, 39524, 21804, 24843, e => {
    let t = {
            budget: 3e4,
            scaleMax: 1.5
        },
        n = {
            rim: .18,
            band: .05,
            core: 2.4,
            spray: .06,
            warp: .24,
            lead: .08,
            ash: .22,
            ring: 9
        };
    e.s(["F", 0, n, "d", 0, t, "K", 0, {
        chipIn: 1,
        chipOut: .8,
        fill: .68,
        drain: .65,
        press: .9
    }], 39524), e.i(17724);
    var r = e.i(89970),
        l = e.i(70382),
        a = e.i(82035),
        o = e.i(13125);
    let i = null,
        s = (e, t, n) => {
            let r = 43758.5453 * Math.sin((e % n + n) % n * 127.1 + (t % n + n) % n * 311.7);
            return r - Math.floor(r)
        };

    function c(e, t, n) {
        let r = Math.floor(e),
            l = Math.floor(t),
            a = e - r,
            o = t - l;
        a = a * a * (3 - 2 * a), o = o * o * (3 - 2 * o);
        let i = s(r, l, n),
            c = s(r + 1, l, n),
            u = s(r, l + 1, n);
        return i + (c - i) * a + (u + (s(r + 1, l + 1, n) - u) * a - (i + (c - i) * a)) * o
    }

    function u() {
        if (i) return i;
        i = new Float32Array(65536);
        for (let e = 0; e < 256; e++)
            for (let t = 0; t < 256; t++) {
                let n = .5 * c(t / 256 * 8, e / 256 * 8, 8) + .25 * c(t / 256 * 16, e / 256 * 16, 16) + .125 * c(t / 256 * 32, e / 256 * 32, 32);
                i[256 * e + t] = n / .875
            }
        return i
    }
    let d = (e, t, n, r = 1) => e[(n * r & 255) * 256 + (t * r & 255)],
        f = new Float32Array(65536).map(() => Math.random()),
        p = (e, t) => f[e + t & 65535],
        m = null,
        h = (e, t, n) => {
            let r = Math.min(1, Math.max(0, (n - e) / (t - e)));
            return r * r * (3 - 2 * r)
        };

    function g() {
        if (m) return m;
        let e = (0, a.X)(),
            t = [e.black, l.I.deep, e.red, l.I.hot, l.I.pale].map(e => (0, a.v)(e).map(e => 255 * e));
        m = new Uint8Array(768);
        let n = (e, t, n) => e.map((e, r) => e + (t[r] - e) * n);
        for (let e = 0; e < 256; e++) {
            let r = e / 255 * 1.05,
                l = n(t[0], t[1], h(0, .4, r));
            l = n(l, t[2], h(.3, .72, r)), l = n(l, t[3], h(.72, .92, r)), l = n(l, t[4], h(.93, 1.02, r)), m.set(l, 3 * e)
        }
        return m
    }
    let y = e => 3 * Math.max(0, Math.min(255, e / 1.05 * 255 | 0)),
        v = new WeakMap;

    function b(e) {
        let n = v.get(e);
        if (n ? .canvas.isConnected) return n;
        let r = e.clientWidth,
            l = e.clientHeight;
        if (!r || !l) return null;
        let a = Math.min(t.scaleMax, Math.sqrt(t.budget / (r * l))),
            o = Math.max(1, Math.round(r * a)),
            i = Math.max(1, Math.round(l * a)),
            s = Object.assign(document.createElement("canvas"), {
                width: o,
                height: i
            });
        s.className = "fx-px", s.setAttribute("aria-hidden", "true");
        let c = s.getContext("2d");
        if (!c) return null;
        e.append(s);
        let u = {
            host: e,
            canvas: s,
            ctx: c,
            img: c.createImageData(o, i),
            w: o,
            h: i,
            k: r / o,
            cw: r,
            ch: l
        };
        return v.set(e, u), u
    }

    function x(e) {
        w.delete(e), e.canvas.remove(), v.delete(e.host)
    }
    let w = new Map,
        k = 0,
        E = 0;

    function _(e) {
        for (let [t, n] of (k = 0, E = E + 7919 & 65535, w)) {
            if (!t.canvas.isConnected) {
                w.delete(t);
                continue
            }
            let r = n.paint(t, e, E);
            t.ctx.putImageData(t.img, 0, 0), r || (w.delete(t), n.done ? .())
        }
        w.size && (k = requestAnimationFrame(_))
    }

    function M(e, t, n) {
        w.set(e, {
            paint: t,
            done: n
        }), k || (k = requestAnimationFrame(_))
    }
    let S = (e, t) => Math.hypot(Math.max(t.x, e.cw - t.x), Math.max(t.y, e.ch - t.y));
    e.s(["G", 0, M, "T", 0, (e, t, n = "--ink") => {
        let r = getComputedStyle(e);
        return (0, o.f)(r.getPropertyValue(t).trim() || r.getPropertyValue(n).trim())
    }, "E", 0, x, "y", 0, p, "f", 0, y, "q", 0, d, "Z", 0, u, "l", 0, g, "e", 0, S, "A", 0, b], 21804);
    let L = r.e.parseEase("sine.inOut"),
        j = r.e.parseEase("power2.out"),
        P = r.e.parseEase("power2.out"),
        C = e => e < 0 ? 0 : e > 1 ? 1 : e,
        A = (e, t, n) => {
            let r = C((n - e) / (t - e));
            return r * r * (3 - 2 * r)
        },
        T = (e, t, n) => (.2126 * e + .7152 * t + .0722 * n) / 255,
        O = [70, 60, 58],
        I = [16, 9, 8],
        $ = (e, t, r) => .84 + .2 * ((1 - A(0, n.core * (.6 + t), Math.abs(e))) * (r < .35 + .65 * t)) * (.45 + .55 * t) + (r - .5) * .32;
    e.s(["f", 0, function(e, t) {
        let r = u(),
            l = g(),
            a = null,
            o = null,
            i = t.rest,
            s = null,
            c = (e, t) => C((t - e.t0) / (1e3 * e.dur)),
            f = (e, t) => e.a + (e.b - e.a) * (e.look && e.b > e.a ? j(t) : L(t)),
            m = T(t.fill[0], t.fill[1], t.fill[2]),
            h = null,
            v = (e, a, u) => {
                let g = e.img.data,
                    v = 1,
                    b = 1,
                    x = +!!i;
                o && (v = c(o, a), b = f(o, v), x = o.look);
                let w = o ? .o ? ? {
                        x: e.cw / 2,
                        y: e.ch / 2
                    },
                    k = S(e, w),
                    E = s ? c(s, a) : 1,
                    _ = P(E),
                    M = s ? S(e, s.o) : 0,
                    L = x ? n.lead * Math.min(1, 30 * b) + b * (1 + n.rim - n.lead) : b * (1 + n.ash),
                    j = 64 / e.ch,
                    R = (o ? .seed ? ? 0) * 37 + L * e.ch * 2.5,
                    N = (s ? .seed ? ? 0) * 37 + E * e.ch * 4,
                    q = 0,
                    F = 0,
                    D = 0,
                    B = 0,
                    H = (e, t, n) => {
                        if (n <= 0) return;
                        let r = 1 - n;
                        q = e[t] * n + q * r, F = e[t + 1] * n + F * r, D = e[t + 2] * n + D * r, B = n + B * r
                    };
                o && (h = h ? .length === e.w ? h.fill(0) : new Float32Array(e.w));
                let Y = Math.floor(.35 * e.h),
                    W = Math.max(Y + 1, Math.ceil(.65 * e.h)),
                    X = 0;
                for (let a = 0; a < e.h; a++) {
                    let c = o && a >= Y && a < W,
                        f = (a + .5) * e.k;
                    for (let a = 0; a < e.w; a++, X += 4) {
                        let v = (a + .5) * e.k,
                            b = d(r, v, f, 1.1),
                            S = p(X >> 2, u);
                        if (q = F = D = B = 0, o) {
                            let e = Math.hypot(v - w.x, f - w.y) / k,
                                a = x ? L - (e * (1 - n.warp) + b * n.warp) : L - (.7 * e + .3 * b),
                                o = x ? n.rim : n.ash;
                            if (a >= -n.spray && a < o) {
                                let e = y($(a * k, A(.35, .75, d(r, v + R, f + .6 * R, j)), p((X >> 2) + 32768, u)));
                                if (a >= 0) {
                                    if (x) H(t.fill, 0, 1);
                                    else {
                                        let e = a / n.ash;
                                        S > .9 * e && (H(t.fill, 0, 1 - A(0, .35, e)), H(O, 0, A(.25, .6, e) * (1 - e)))
                                    }
                                    H(l, e, Math.exp(-a / n.band) * (1 - A(.6 * o, o, a)))
                                } else {
                                    x || H(t.fill, 0, 1);
                                    let r = 1 + a / n.spray;
                                    S < r * r ? H(l, e, 1) : x && S < r * r * 1.15 && H(I, 0, .85)
                                }
                            } else(x ? a >= o : a < 0) && H(t.fill, 0, 1)
                        } else i && H(t.fill, 0, 1);
                        if (c && B > .003 && (h[a] += B * B * C(1 - 2 * Math.abs(T(q / B, F / B, D / B) - m)) / (W - Y)), s) {
                            let e = Math.hypot(v - s.o.x, f - s.o.y) + (b - .5) * 18,
                                t = _ * M * 1.1,
                                a = n.ring * (1 + E),
                                o = t - e;
                            if (o > a && H(I, 0, .32 * (1 - E) * (1 - o / (M + 1))), o > -(.6 * a) && o < 2 * a) {
                                let e = y($(o, A(.35, .75, d(r, v + N, f + .6 * N, j)), p((X >> 2) + 32768, u)) * (1 - .45 * E)),
                                    t = 1 - E * E;
                                if (o >= 0) H(l, e, Math.exp(-o / (.45 * a)) * (1 - A(a, 2 * a, o)) * t);
                                else {
                                    let n = 1 + o / (.6 * a);
                                    S < n * n && H(l, e, t)
                                }
                            }
                        }
                        B > .003 ? (g[X] = q / B, g[X + 1] = F / B, g[X + 2] = D / B, g[X + 3] = 255 * B) : g[X + 3] = 0
                    }
                }
                return o && t.onCover(h, e.k), o && v >= 1 && (i = o.to, o = null, t.onCover(null, e.k)), s && E >= 1 && (s = null), !!(o || s)
            },
            w = () => {
                a && !i && (x(a), a = null)
            },
            k = () => !!(a ? ? = b(e)) && (M(a, v, w), !0);
        return {
            fill(e, t, n) {
                if ((o ? o.to : i) === e) return !1;
                let r = performance.now();
                if (o) {
                    let t = f(o, c(o, r)),
                        l = +(e === o.look);
                    return o = { ...o,
                        to: e,
                        a: t,
                        b: l,
                        t0: r,
                        dur: Math.max(.12, n * Math.abs(l - t))
                    }, !0
                }
                return o = {
                    to: e,
                    look: e,
                    a: 0,
                    b: 1,
                    t0: r,
                    dur: n,
                    o: t,
                    seed: 100 * Math.random()
                }, !!k() || (i = e, o = null, !1)
            },
            press(e, t) {
                s = {
                    t0: performance.now(),
                    dur: t,
                    o: e,
                    seed: 100 * Math.random()
                }, k()
            },
            destroy() {
                a && x(a), a = null
            }
        }
    }], 24843)
}, 95613, e => {
    var t = e.i(39524),
        n = e.i(21804),
        r = e.i(24843);
    let l = new WeakMap,
        a = e => e.querySelector("[data-fx-host]") ? ? e,
        o = e => ({
            x: e.clientWidth / 2,
            y: e.clientHeight / 2
        }),
        i = e => e.querySelector(':scope > input[type="radio"]') ? .checked ? ? !1;

    function s(e, t = +!!i(e)) {
        let o = l.get(e);
        if (o) return o;
        let c = a(e),
            u = (0, r.f)(c, {
                fill: (0, n.T)(e, "--fx-fill"),
                rest: t,
                onCover: (t, n) => (function(e, t, n, r) {
                    if (!n) {
                        delete e.dataset.fxRun, e.removeAttribute("data-fx-arr"), e.style.removeProperty("--fx-cover");
                        return
                    }
                    let l = t.getBoundingClientRect(),
                        a = (e.querySelector("[data-fx-t]") ? .getBoundingClientRect().left ? ? l.left) - l.left,
                        o = e.querySelector(":scope > svg") ? .getBoundingClientRect(),
                        i = e => `var(${e?"--fx-on":"--fx-off"})`,
                        s = n[0] > .5,
                        c = [`${i(s)} 0`];
                    for (let e = 1; e < n.length; e++) {
                        if (n[e] > .5 === s) continue;
                        let t = `${(e*r-a).toFixed(1)}px`;
                        s = !s, c.push(`${i(!s)} ${t}`, `${i(s)} ${t}`)
                    }
                    if (e.style.setProperty("--fx-cover", `linear-gradient(90deg, ${c.join(", ")})`), o) {
                        let t = Math.floor((o.left + o.width / 2 - l.left) / r);
                        e.toggleAttribute("data-fx-arr", (n[Math.min(n.length - 1, Math.max(0, t))] ? ? 0) > .5)
                    }
                })(e, c, t, n)
            });
        return l.set(e, u), u
    }

    function c(e, t, n, r, l) {
        t.fill(n, r, l) && ("fxRun" in e.dataset || (e.style.setProperty("--fx-cover", `linear-gradient(var(--fx-${n?"off":"on"}) 0 0)`), e.toggleAttribute("data-fx-arr", !n)), e.dataset.fxRun = "", e.toggleAttribute("data-fx-lit", 1 === n))
    }

    function u(e, t) {
        let n = a(e).getBoundingClientRect();
        return {
            x: t.clientX - n.left,
            y: t.clientY - n.top
        }
    }
    e.s(["Z", 0, function(e, n, r) {
        if (!("fx" in document.documentElement.dataset)) return;
        let l = s(e, +!n);
        c(e, l, +!!n, r ? ? o(a(e)), n ? t.K.chipIn : t.K.chipOut)
    }, "D", 0, function() {
        let e = e => e.target instanceof Element ? e.target.closest("[data-fx-btn]") : null,
            r = (e, t) => !(t.relatedTarget instanceof Node && e.contains(t.relatedTarget)),
            d = setTimeout(() => {
                (0, n.Z)(), (0, n.l)()
            }, 400),
            f = n => {
                let l = e(n);
                l && "fx" in document.documentElement.dataset && "touch" !== n.pointerType && r(l, n) && "true" !== l.getAttribute("aria-disabled") && c(l, s(l), 1, u(l, n), t.K.fill)
            },
            p = n => {
                let a = e(n);
                if (!a || !("fx" in document.documentElement.dataset) || "touch" === n.pointerType || !r(a, n) || i(a)) return;
                let o = l.get(a);
                o && c(a, o, 0, u(a, n), t.K.drain)
            },
            m = n => {
                let r = e(n);
                !(!r || !("fx" in document.documentElement.dataset) || 0 !== n.button || i(r)) && s(r).press(u(r, n), t.K.press)
            },
            h = n => {
                if ("Enter" !== n.key && " " !== n.key || n.repeat) return;
                let r = e(n);
                !r || !("fx" in document.documentElement.dataset) || r.querySelector(':scope > input[type="radio"]') || s(r).press(o(a(r)), t.K.press)
            };
        return document.addEventListener("pointerover", f), document.addEventListener("pointerout", p), document.addEventListener("pointerdown", m), document.addEventListener("keydown", h), () => {
            clearTimeout(d), document.removeEventListener("pointerover", f), document.removeEventListener("pointerout", p), document.removeEventListener("pointerdown", m), document.removeEventListener("keydown", h)
        }
    }])
}, 52473, e => {
    var t = e.i(74080);
    let n = [],
        r = new Set;

    function l(e, a = !0) {
        let o = () => {
            for (let t of (n = e, r)) t()
        };
        a ? (0, t.flushSync)(o) : o()
    }
    let a = () => {},
        o = new Promise(e => a = e),
        i = (e, t) => `${e}:${t}`,
        s = (e, t) => e.kind === t.kind && e.slug === t.slug;

    function c(e, t) {
        let n = e.querySelector(t);
        if (!n) throw Error(`overlay page: no ${t}`);
        return n
    }
    e.s(["A", 0, function(e) {
        l(n.filter(t => !s(t, e)).map(e => "arriving" === e.role ? { ...e,
            role: "live"
        } : e))
    }, "r", 0, function() {
        l([], !1)
    }, "C", 0, function(e) {
        e.frozen = !0;
        let t = -(e.el.closest(".ov-scroll") ? .scrollTop ? ? 0);
        l(n.map(n => s(n, e) ? { ...n,
            role: "leaving",
            top: t
        } : n))
    }, "X", 0, i, "R", 0, () => n, "T", 0, () => o, "f", 0, function(e, t, r) {
        l([...n.filter(n => !s(n, {
            kind: e,
            slug: t
        })), {
            kind: e,
            slug: t,
            role: r,
            top: 0
        }]);
        let a = document.querySelector(`[data-ov-page="${i(e,t)}"]`);
        if (!a) throw Error(`overlay page ${e} ${t} did not render`);
        let o = c(a, ".pj");
        return {
            kind: e,
            slug: t,
            el: o,
            wrap: c(o, ".pj-wrap"),
            sheet: c(o, ".pj-sheet"),
            teaser: c(o, ".pj-teaser"),
            tcard: o.querySelector(".pj-teaser__card"),
            hero: o.querySelector(".pj__fig--hero"),
            born: performance.now(),
            frozen: !1
        }
    }, "Q", 0, function(e) {
        return r.add(e), a(), () => void r.delete(e)
    }])
}, 1603, e => {
    let t = {
            VEL_NORM: 400,
            V_SMOOTH: .35,
            VTWIST: .9,
            VEL_BULGE: .5,
            REAR_Y: .05,
            REAR_Z: .1,
            DEPTH: .12,
            SPAN: 1.15,
            SHIFT: -.2,
            BANK: -.1,
            DOOR: -.06,
            TAIL: 1,
            sheetC: 1,
            DIAG_X: .18,
            shade: !0,
            shadeColor: "oklch(0% 0 0)",
            shadeA: .5,
            shadeS: 3,
            sheen: !0,
            warmth: .16,
            tintColor: "oklch(100% 0 0)",
            lightX: -.09,
            lightY: 1,
            lightZ: .61,
            SPEC: .31,
            DIFF: .3,
            GLOSS: 48,
            radius: 6,
            DENT: .065,
            DENT_R: .24,
            DENT_FOLLOW: .41,
            DENT_LIT: .55,
            capFrom: .28,
            capTo: .62,
            CAP_PIN: !1,
            CAP_FADE: !0,
            FLY_LIFT: .03,
            FLY_STRETCH: .08
        },
        n = { ...t,
            DIAG_X: 0,
            BANK: 0,
            REAR_Y: 0,
            VTWIST: .15,
            DEPTH: .08,
            DOOR: -.03,
            CAP_PIN: !0,
            CAP_FADE: !1
        };
    e.s(["H", 0, t, "z", 0, e => e ? n : t])
}, 88718, 18365, e => {
    var t = e.i(17811),
        n = e.i(56385),
        r = e.i(27773);
    let l = {
            band: .6,
            centre: .48,
            pace: .14,
            aa: 4.5
        },
        a = {
            band: .85,
            pace: .06
        },
        o = {
            black: {
                bg: "oklch(10.6% 0.0434 29.23)",
                fg: "oklch(100% 0 0)",
                a2: .55,
                rule: .16
            },
            white: {
                bg: "oklch(95.7% 0.008 36.55)",
                fg: "oklch(10.6% 0.0434 29.23)",
                a2: .62,
                rule: .16
            }
        },
        i = ["about", "experience", "insights", "clients"],
        s = ["black", "white", "black", "white", "black"],
        c = {
            duration: .5,
            ease: "power2.out"
        };
    e.s(["L", 0, i, "E", 0, l, "f", 0, a, "J", 0, {
        px: 96,
        dur: .3,
        after: 80,
        up: 24,
        down: 4
    }, "i", 0, c, "S", 0, o, "h", 0, s], 18365);
    let u = e => (0, t.R)([e[0] / 255, e[1] / 255, e[2] / 255]),
        d = e => ({
            a2: o[e].a2,
            rule: o[e].rule,
            bgL: u((0, n.B)(o[e].bg)),
            fg: (0, n.B)(o[e].fg)
        }),
        f = {
            black: d("black"),
            white: d("white")
        },
        p = e => Math.min(1, Math.max(0, e)),
        m = e => -(Math.cos(Math.PI * e) - 1) / 2,
        h = (e, t, n) => [Math.round(e[0] * n + t[0] * (1 - n)), Math.round(e[1] * n + t[1] * (1 - n)), Math.round(e[2] * n + t[2] * (1 - n))],
        g = null;
    e.s(["L", 0, function(e) {
        g && g.gsap.to(g.el, {
            opacity: +!!e,
            duration: g.reduced ? r.z : c.duration,
            ease: c.ease,
            overwrite: !0
        })
    }, "R", 0, ({
        ScrollTrigger: e,
        gsap: n,
        phone: r,
        reduced: o
    }) => {
        let c = document.querySelector(".f-page"),
            d = i.map(e => document.getElementById(e));
        if (!c || d.some(e => !e)) return;
        let y = document.documentElement,
            v = document.body,
            b = e => e ? e.getBoundingClientRect().top + scrollY : 0,
            x = [],
            w = 1 / 0,
            k = "";

        function E() {
            var e;
            let t, n = innerHeight,
                o = Math.max(0, y.scrollHeight - n);
            e = d.map(b), t = n * (r() ? a.band : l.band), w = (x = e.map(e => {
                let r = e - n * l.centre,
                    a = r - t / 2,
                    i = r + t / 2;
                return i > o && (a -= i - o, i = o), [a, i]
            }))[0][0] - 1
        }

        function _(e) {
            let n = function(e, n, r, o = !1) {
                var i;
                let s, c = 0,
                    u = 0;
                for (; c < n.length; c++) {
                    let [t, r] = n[c];
                    if (e < t) break;
                    if (e < r) {
                        u = (e - t) / (r - t);
                        break
                    }
                }
                let d = f[r[Math.min(c, r.length - 1)]],
                    g = f[r[Math.min(c + 1, r.length - 1)]],
                    y = o ? m(p((u - a.pace) / (1 - 2 * a.pace))) : m((i = l.pace, (s = p((u - i) / (1 - l.pace - i))) * s * (3 - 2 * s))),
                    v = d.bgL.map((e, t) => e + (g.bgL[t] - e) * y),
                    b = (0, t.z)([v[0], v[1], v[2]]),
                    x = (0, t.a)(g.fg, b) > (0, t.a)(d.fg, b) ? g : d,
                    w = x.fg,
                    k = d.fg.join() === g.fg.join() ? d.a2 + (g.a2 - d.a2) * y : x.a2;
                for (; k < 1 && (0, t.a)(h(w, b, k), b) < l.aa;) k = Math.min(1, k + .01);
                return {
                    k: c,
                    p: u,
                    bg: b,
                    fg: w,
                    a2: k,
                    rule: d.rule + (g.rule - d.rule) * y
                }
            }(e, x, s, r());
            y.classList.toggle("f-solid", e >= w);
            let o = 0 === n.k && 0 === n.p ? "hidden" : "visible";
            c.style.visibility !== o && (c.style.visibility = o);
            let i = `${n.bg}|${n.fg}|${n.a2.toFixed(3)}|${n.rule.toFixed(3)}`;
            if (i === k) return;
            k = i;
            let d = u(n.fg),
                g = (e, t) => v.style.setProperty(e, t);
            g("--f-bg", (0, t.$)(u(n.bg))), g("--f-fg", (0, t.$)(d)), g("--f-fg2", (0, t.$)(d, n.a2)), g("--f-rule", (0, t.$)(d, n.rule)), g("--f-inv", (1 - (n.fg[0] - 15) / 240).toFixed(3))
        }
        return g = {
            el: c,
            gsap: n,
            reduced: o
        }, E(), _(scrollY), e.create({
            id: "f-tone",
            start: 0,
            end: "max",
            onUpdate: e => _(e.scroll()),
            onRefresh: e => {
                E(), k = "", _(e.scroll())
            }
        }), () => {
            for (let e of (g = null, n.killTweensOf(c), c.style.removeProperty("opacity"), c.style.removeProperty("visibility"), y.classList.remove("f-solid"), ["--f-bg", "--f-fg", "--f-fg2", "--f-rule", "--f-inv"])) v.style.removeProperty(e)
        }
    }], 88718)
}, 41116, e => {
    e.s(["k", 0, {
        at: 2,
        band: .6,
        pace: .14,
        phoneBand: .85,
        phonePace: .06
    }, "S", 0, {
        phoneAt: 768,
        wideAt: 1536,
        inset: [16, 24, 64],
        bar: {
            desk: 80,
            phone: 64
        }
    }, "H", 0, {
        y: 18,
        duration: .7,
        ease: "power2.out",
        stagger: .04
    }, "Y", 0, {
        rule: {
            desk: 1.7,
            phone: 1.2
        },
        cascade: .1,
        cascadeMax: .5
    }, "R", 0, .15, "G", 0, .12, "J", 0, 10, "e", 0, 40, "r", 0, {
        flight: {
            duration: 1.5,
            ease: "snappy"
        },
        flatPow: .7,
        homeOut: {
            duration: .3,
            ease: "power1.out"
        },
        homeIn: {
            duration: .75,
            ease: "power1.inOut"
        },
        dim: .1,
        parked: 0,
        sheetIn: {
            at: 1.125,
            duration: .375,
            ease: "power1.inOut",
            textAfter: .15
        },
        overlayOut: {
            duration: .3,
            ease: "power1.out"
        },
        masked: {
            yPercent: 105,
            duration: .7,
            stagger: .035,
            ease: "power2.out"
        },
        rise: {
            y: 24,
            duration: .9,
            stagger: .08,
            ease: "expo.out",
            after: .12
        },
        lines: {
            yPercent: 105,
            duration: 1,
            stagger: {
                desk: .11,
                phone: .09
            },
            ease: "power3.out",
            after: .05,
            at: .82
        },
        reveal: {
            yPercent: 18,
            scale: 1.08,
            duration: 1.2,
            stagger: .08,
            cueStagger: .06,
            ease: "expo.out"
        },
        extrasOut: {
            duration: .3,
            y: 28,
            ease: "power1.in",
            stagger: .02
        },
        flightDelayOnClose: .08,
        parallax: .05,
        intro: {
            duration: 1.3,
            ease: "expo.out",
            stagger: .075
        },
        reduced: {
            duration: .35,
            ease: "power1.inOut"
        },
        breathe: {
            full: .5,
            top: .2,
            ease: "pj-out",
            endStep: 24,
            endStepPhone: 16
        },
        teaserIn: {
            duration: .5,
            from: .9
        },
        handoff: {
            duration: .7,
            ease: "pj-glide",
            out: .3,
            outEase: "pj-in",
            drop: 100,
            rise: .35
        },
        edge: {
            down: 80,
            up: 160,
            cap: 50,
            stiffness: 1500,
            damping: 200,
            reset: 140,
            arm: 1e3
        },
        touch: {
            reach: .24,
            min: 120,
            max: 200,
            flick: 1,
            flickFrom: .25,
            window: 100,
            over: 1.1
        },
        pull: {
            downY: 100,
            downScale: .05,
            downFade: .9,
            upY: 120,
            pillY: 20
        }
    }])
}, 60138, e => {
    e.i(47167);
    let t = () => {};
    e.s(["R", 0, function(e) {
        let t = (t, n) => (...t) => {
            try {
                return n.apply(e, t)
            } catch (e) {
                return
            }
        };
        return {
            mount: t("mount", e.mount),
            unmount: t("unmount", e.unmount),
            scroll: t("scroll", e.scroll),
            edge: t("edge", e.edge),
            reveal: t("reveal", e.reveal),
            open: t("open", e.open),
            close: t("close", e.close),
            handoff: n => t("handoff", e.handoff)(n) ? ? void 0,
            destroy: t("destroy", e.destroy)
        }
    }, "j", 0, {
        mount: t,
        unmount: t,
        scroll: t,
        edge: t,
        reveal: t,
        open: t,
        close: t,
        handoff: t,
        destroy: t
    }])
}, 74759, e => {
    e.i(17724);
    var t = e.i(89970),
        n = e.i(75324),
        r = e.i(47333),
        l = e.i(41116);
    let a = l.r.lines,
        o = a.at,
        i = {
            visibility: "hidden"
        },
        s = {
            visibility: "visible"
        },
        c = e => e.el.removeAttribute("data-parked"),
        u = (e, n) => t.e.fromTo(e, {
            yPercent: a.yPercent
        }, { ...s,
            yPercent: 0,
            duration: a.duration,
            ease: a.ease,
            stagger: a.stagger[n ? "phone" : "desk"]
        });

    function d(e, f, p = null, m = null) {
        let h = e => "string" == typeof p ? !!e.closest(p) : !!p ? .contains(e),
            g = [...e.querySelectorAll("[data-pg]")].filter(e => !h(e)).map(e => ({
                el: e,
                items: [],
                heads: [],
                played: !1,
                tl: null
            })),
            y = [],
            v = null,
            b = !1;

        function x(e, n = 0) {
            if (e.played) return;
            if (e.played = !0, f.reduced || !(e.items.length || e.heads.length)) return void c(e);
            let o = f.phone(),
                i = t.e.timeline({
                    delay: n,
                    onStart: () => c(e)
                });
            for (let n of e.heads) i.add(() => (0, r.t)(n, t.e), 0);
            e.tl = i, y.push(i);
            let d = l.r.masked,
                p = l.r.rise,
                m = l.r.reveal,
                h = 0,
                g = 0;
            for (let t of e.items)
                if ("rule" === t.kind) {
                    let e = l.Y.rule[o ? "phone" : "desk"];
                    i.to(t.el, {
                        scaleX: 1,
                        duration: e,
                        ease: "power3.out"
                    }, 0)
                } else "el" === t.kind ? i.to(t.el, {
                    opacity: 1,
                    y: 0,
                    duration: p.duration,
                    ease: p.ease,
                    clearProps: "transform,opacity"
                }, g++ * p.stagger) : "fig" === t.kind ? (i.to(t.frame, {
                    clipPath: "inset(0% 0 0 0)",
                    duration: m.duration,
                    ease: m.ease,
                    clearProps: "clipPath"
                }, 0), t.inner && i.to(t.inner, {
                    yPercent: 0,
                    scale: 1,
                    duration: m.duration,
                    ease: m.ease,
                    clearProps: "transform"
                }, 0)) : "lines" === t.kind ? i.add(u(t.split.lines, o), a.after) : i.to(t.el, { ...s,
                    yPercent: 0,
                    duration: d.duration,
                    ease: d.ease
                }, h++ * d.stagger)
        }
        let w = e => e.getBoundingClientRect().top < innerHeight * o,
            k = e => {
                let t = e.getBoundingClientRect();
                return t.bottom > 0 && t.top < innerHeight
            };

        function E() {
            if (b) return;
            b = !0;
            let e = 0,
                t = [];
            for (let n of g) n.played || (w(n.el) ? x(n, k(n.el) ? Math.min(l.Y.cascadeMax, e++ * l.Y.cascade) : 0) : t.push(n));
            if (!t.length) return;
            let n = new Map(t.map(e => [e.el, e])),
                r = new IntersectionObserver(e => {
                    for (let t of e) {
                        if (!t.isIntersecting) continue;
                        let e = n.get(t.target);
                        e && x(e), r.unobserve(t.target)
                    }
                }, {
                    root: f.scroller === document.documentElement ? null : f.scroller,
                    rootMargin: `0px 0px -${Math.round((1-o)*100)}% 0px`,
                    threshold: 0
                });
            for (let e of t) r.observe(e.el);
            v = r
        }
        return {
            prepare({
                peeked: e = !1
            } = {}) {
                if (!f.reduced)
                    for (let o of g) o.played || e && o.el.matches(".pj__info") || function(e) {
                        e.el.setAttribute("data-parked", "");
                        let o = t => t.closest("[data-pg]") === e.el && !h(t);
                        if (m)
                            for (let n of e.el.querySelectorAll(m)) o(n) && e.heads.push((0, r.F)(n, t.e));
                        for (let r of [...e.el.matches("[data-pr]") ? [e.el] : [], ...e.el.querySelectorAll("[data-pr], .mask > .up")].filter(e => o(e) && !e.matches("[data-liquid-head], .is-liquid"))) {
                            let o = r.dataset.pr;
                            if ("lines" === o) {
                                let l = n.f.create(r, {
                                    type: "lines",
                                    mask: "lines",
                                    linesClass: "pp-ln",
                                    aria: "none",
                                    autoSplit: !0,
                                    onSplit(n) {
                                        for (let e of n.masks) e.classList.add("pp-lmask");
                                        if (!e.played) return void t.e.set(n.lines, {
                                            yPercent: a.yPercent,
                                            ...i
                                        });
                                        if (!e.tl || 1 === e.tl.progress()) return;
                                        let r = u(n.lines, f.phone());
                                        return e.tl.add(r, a.after), r
                                    }
                                });
                                e.items.push({
                                    kind: "lines",
                                    split: l
                                })
                            } else if ("rule" === o) t.e.set(r, {
                                scaleX: 0
                            }), e.items.push({
                                kind: "rule",
                                el: r
                            });
                            else if ("el" === o) t.e.set(r, {
                                opacity: 0,
                                y: l.r.rise.y
                            }), e.items.push({
                                kind: "el",
                                el: r
                            });
                            else if ("fig" === o) {
                                let n = r.querySelector(".pj__frame") ? ? r,
                                    a = r.querySelector(".pj__par, img");
                                t.e.set(n, {
                                    clipPath: "inset(100% 0 0 0)"
                                }), a && t.e.set(a, {
                                    yPercent: l.r.reveal.yPercent,
                                    scale: l.r.reveal.scale,
                                    transformOrigin: "50% 100%"
                                }), e.items.push({
                                    kind: "fig",
                                    frame: n,
                                    inner: a
                                })
                            } else r.closest('[data-pr="lines"]') || (t.e.set(r, {
                                yPercent: l.r.masked.yPercent,
                                ...i
                            }), e.items.push({
                                kind: "mask",
                                el: r
                            }))
                        }
                    }(o)
            },
            enter(e, n) {
                e ? e.add(E, n) : t.e.delayedCall(n, E)
            },
            settleAll() {
                for (let e of g)
                    if (!e.played)
                        for (let n of (e.played = !0, c(e), e.heads.forEach(r.p), e.heads = [], e.items)) "lines" === n.kind ? t.e.set(n.split.lines, {
                            yPercent: 0,
                            ...s
                        }) : "fig" === n.kind ? (t.e.set(n.frame, {
                            clearProps: "clipPath"
                        }), n.inner && t.e.set(n.inner, {
                            clearProps: "transform"
                        })) : t.e.set(n.el, {
                            clearProps: "transform,opacity,visibility"
                        })
            },
            watch: E,
            played: e => g.find(t => t.el === e || t.el.contains(e)) ? .played !== !1,
            outEls: () => [],
            destroy() {
                for (let e of (v ? .disconnect(), t.e.killTweensOf(E), y)) e.kill();
                for (let e of g)
                    for (let t of (c(e), e.heads.forEach(r.p), e.items)) "lines" === t.kind && t.split.revert()
            }
        }
    }
    e.s(["N", 0, d, "D", 0, (e, t) => d(e.el, t, e.hero, `:is(${r.B})[data-pr="lines"]`)])
}, 36416, e => {
    e.s(["f", 0, function(e, t = document) {
        let {
            gsap: n,
            signal: r
        } = e;
        if (e.reduced) return {
            attach: () => () => {}
        };
        let l = new Map,
            a = new Map;

        function o(e = [...l.values()]) {
            if (!(e = e.filter(e => e.el.isConnected)).length) return;
            for (let t of e) t.el.classList.add("ts-measure");
            let t = e.map(e => {
                    let t = (e.el.offsetWidth ? e.el.getBoundingClientRect().width / e.el.offsetWidth : 1) || 1;
                    return .01 > Math.abs(t - 1) ? 1 : t
                }),
                n = e.map((e, n) => e.chars.map(e => e.getBoundingClientRect().width / t[n]));
            for (let t of e) t.el.classList.replace("ts-measure", "ts-measure-alt");
            let r = e.map((e, n) => e.chars.map(e => e.getBoundingClientRect().width / t[n]));
            for (let t of e) t.el.classList.remove("ts-measure-alt");
            e.forEach((e, t) => {
                if (!n[t].some(e => e > 0)) {
                    e.locked = !1;
                    return
                }
                e.chars.forEach((e, l) => {
                    let a = n[t][l],
                        o = r[t][l];
                    e.style.setProperty("--ts-w", `${a.toFixed(3)}px`), e.style.removeProperty("--ts-fit")
                }), e.el.classList.add("ts-locked"), e.locked = !0
            })
        }
        let i = e => {
            a.get(e) ? .kill(), a.delete(e)
        };

        function s(e, t) {
            var r;
            t !== e.hot && (e.hot && (i(r = e.hot), a.set(r, n.delayedCall(1, () => {
                r.classList.remove("is-alt"), a.delete(r)
            }))), e.hot = t, t && (i(t), t.classList.add("is-alt")))
        }

        function c(e) {
            for (let t of (e.hot = null, e.chars)) i(t);
            for (let {
                    node: t,
                    parts: n
                } of e.splits)
                for (let e of (n[0] ? .parentNode ? .insertBefore(t, n[0]), n)) e.parentNode ? .removeChild(e);
            e.el.classList.remove("ts-locked"), null === e.label ? e.el.removeAttribute("aria-label") : e.el.setAttribute("aria-label", e.label), l.delete(e.el)
        }

        function u(e, t = !0) {
            if (l.has(e)) return () => {};
            let n = e.getAttribute("aria-label");
            e.setAttribute("aria-label", (e.textContent ? ? "").trim().replace(/\s+/g, " "));
            let a = {
                el: e,
                hot: null,
                locked: !1,
                label: n,
                ... function(e) {
                    let t = document.createTreeWalker(e, NodeFilter.SHOW_TEXT),
                        n = [];
                    for (; t.nextNode();) n.push(t.currentNode);
                    let r = n.map(e => {
                        let t = [];
                        for (let n of (e.textContent ? ? "").split(/(\s+)/)) {
                            if (!n) continue;
                            if (/^\s+$/.test(n)) {
                                t.push(document.createTextNode(" "));
                                continue
                            }
                            let e = document.createElement("span");
                            for (let t of (e.className = "ts-w", e.setAttribute("aria-hidden", "true"), n)) {
                                let n = document.createElement("span");
                                n.className = "ts-c", n.textContent = t, e.append(n)
                            }
                            t.push(e)
                        }
                        return e.replaceWith(...t), {
                            node: e,
                            parts: t
                        }
                    });
                    return {
                        chars: [...e.querySelectorAll(".ts-c")],
                        splits: r
                    }
                }(e)
            };
            l.set(e, a);
            let i = new AbortController,
                d = {
                    signal: AbortSignal.any([r, i.signal])
                },
                f = e => {
                    ("mouse" === e.pointerType || "pen" === e.pointerType) && (a.locked || o([a]), s(a, function(e, t, n) {
                        let r = null;
                        for (let l of e.el.querySelectorAll(".ts-w")) {
                            let e = l.getBoundingClientRect();
                            if (!(n < e.top) && !(n > e.bottom) && !(t < e.left) && !(t > e.right)) {
                                r = l;
                                break
                            }
                        }
                        if (!r) return null;
                        for (let e of r.children) {
                            let n = e.getBoundingClientRect();
                            if (t >= n.left && t < n.right) return e
                        }
                        return null
                    }(a, e.clientX, e.clientY)))
                };
            return e.addEventListener("pointerenter", f, d), e.addEventListener("pointermove", f, d), e.addEventListener("pointerleave", () => s(a, null), d), t && o([a]), () => {
                l.get(e) === a && (i.abort(), c(a))
            }
        }
        for (let e of t ? .querySelectorAll("h1:not(.sr-only):not([data-no-swap]), h2:not([data-no-swap]), h3:not([data-no-swap])") ? ? []) e.closest("#overlay") || u(e, !1);
        o();
        let d = () => {
            r.aborted || o()
        };
        document.fonts.load('400 1em "lekick-regular"').then(d, () => {}), document.fonts.ready.then(d), document.fonts.addEventListener("loadingdone", d, {
            signal: r
        });
        let f = 0;
        return addEventListener("resize", () => {
            clearTimeout(f), f = window.setTimeout(d, 120)
        }, {
            signal: r
        }), e.ScrollTrigger.addEventListener("refreshInit", d), r.addEventListener("abort", () => {
            for (let t of (clearTimeout(f), e.ScrollTrigger.removeEventListener("refreshInit", d), [...l.values()])) c(t)
        }, {
            once: !0
        }), {
            attach: e => u(e)
        }
    }], 36416)
}, 10629, e => {
    e.s(["f", 0, ["touchend", "pointerdown", "click", "keydown"], "Y", 0, "position:fixed;left:0;top:0;width:1px;height:1px;overflow:hidden;opacity:0.01;pointer-events:none;z-index:-1", "d", 0, {
        near: "100% 0px",
        av1: 'video/webm; codecs="av01.0.05M.08"'
    }, "q", 0, 4])
}, 15391, e => {
    function t(e) {
        return {
            url: e.phone ? e.sources.mp4Small : e.sources.mp4,
            codec: "h264"
        }
    }
    e.s(["i", 0, t, "m", 0, function(e) {
        return "probably" !== e.canPlayAv1 ? t(e) : {
            url: e.phone ? e.sources.webmSmall : e.sources.webm,
            codec: "av1"
        }
    }])
}, 51034, 69553, e => {
    let t = (e, t) => e.order - t.order,
        n = (e, t) => t.date.localeCompare(e.date) || e.slug.localeCompare(t.slug);

    function r(e, t) {
        let n = e.findIndex(e => e.slug === t);
        if (-1 === n) throw Error(`unknown slug "${t}"`);
        return e[n + 1] ? ? "end"
    }
    let l = e => e.split(/\s+/).filter(Boolean).length,
        a = /^(\d{4})-(\d{2})-(\d{2})$/,
        o = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "UTC"
        });
    e.s(["q", 0, n, "D", 0, t, "z", 0, function(e) {
        let t = 0;
        return e.map(e => "label" in e || "h" === e.type ? String(++t).padStart(2, "0") : null)
    }, "C", 0, function(e, t) {
        let n = a.exec(e);
        if (!n) throw Error(`not a yyyy-mm-dd date: ${e}`);
        let [, r, l, i] = n;
        switch (t) {
            case "dmy":
                return `${i}.${l}.${r}`;
            case "monD":
                return o.format(new Date(`${e}T00:00:00Z`));
            case "iso":
                return e
        }
    }, "e", 0, function(e, t) {
        return r([...e].sort(n), t)
    }, "E", 0, function(e, n) {
        return r([...e].sort(t), n)
    }, "d", 0, function(e) {
        let t = e.reduce((e, t) => e + function(e) {
                switch (e.type) {
                    case "p":
                    case "h":
                    case "q":
                    case "code":
                        return l(e.text);
                    case "ul":
                    case "ol":
                        return l(e.items.join(" "));
                    case "fig":
                    case "loop":
                        return 0
                }
            }(t), 0),
            n = Math.round(t / 200);
        return {
            words: t,
            label: n >= 2 ? `${n} min read` : "Quick read"
        }
    }], 69553);
    let i = new Map,
        s = new Map,
        c = null,
        u = null,
        d = null;

    function f(e) {
        return "project" === e ? u ? ? = [...i.values()].sort(t) : d ? ? = [...s.values()].sort(n)
    }
    e.s(["x", 0, function(e) {
        for (let t of (c = e.site, e.projects ? ? [])) i.has(t.slug) || (i.set(t.slug, t), u = null);
        for (let t of e.posts ? ? []) s.has(t.slug) || (s.set(t.slug, t), d = null)
    }, "e", 0, e => s.get(e) ? ? null, "u", 0, e => i.get(e) ? ? null, "t", 0, (e, t) => {
        var n;
        let r;
        return n = "project" === e ? f("project") : f("post"), -1 === (r = n.findIndex(e => e.slug === t)) ? null : {
            kind: e,
            slug: t,
            index: r,
            count: n.length,
            prev: n[r - 1] ? .slug ? ? null,
            next: n[r + 1] ? .slug ? ? null
        }
    }, "X", 0, f, "l", 0, () => c], 51034)
}, 8341, (e, t, n) => {
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var r = {
        cancelIdleCallback: function() {
            return o
        },
        requestIdleCallback: function() {
            return a
        }
    };
    for (var l in r) Object.defineProperty(n, l, {
        enumerable: !0,
        get: r[l]
    });
    let a = "u" > typeof self && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(e) {
            let t = Date.now();
            return self.setTimeout(function() {
                e({
                    didTimeout: !1,
                    timeRemaining: function() {
                        return Math.max(0, 50 - (Date.now() - t))
                    }
                })
            }, 1)
        },
        o = "u" > typeof self && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(e) {
            return clearTimeout(e)
        };
    ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", {
        value: !0
    }), Object.assign(n.default, n), t.exports = n.default)
}, 79520, (e, t, n) => {
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var r = {
        default: function() {
            return x
        },
        handleClientScriptLoad: function() {
            return y
        },
        initScriptLoader: function() {
            return v
        }
    };
    for (var l in r) Object.defineProperty(n, l, {
        enumerable: !0,
        get: r[l]
    });
    let a = e.r(55682),
        o = e.r(90809),
        i = e.r(18050),
        s = a._(e.r(74080)),
        c = o._(e.r(71645)),
        u = e.r(42732),
        d = e.r(22737),
        f = e.r(8341),
        p = e.r(19083),
        m = new Map,
        h = new Set,
        g = e => {
            let {
                src: t,
                id: n,
                onLoad: r = () => {},
                onReady: l = null,
                dangerouslySetInnerHTML: a,
                children: o = "",
                strategy: i = "afterInteractive",
                onError: c,
                stylesheets: u
            } = e, f = n || t;
            if (f && h.has(f)) return;
            if (m.has(t)) {
                h.add(f), m.get(t).then(r, c);
                return
            }
            let p = () => {
                    l && l(), h.add(f)
                },
                g = document.createElement("script"),
                y = new Promise((e, t) => {
                    g.addEventListener("load", function(t) {
                        e(), r && r.call(this, t), p()
                    }), g.addEventListener("error", function(e) {
                        t(e)
                    })
                }).catch(function(e) {
                    c && c(e)
                });
            a ? (g.innerHTML = a.__html || "", p()) : o ? (g.textContent = "string" == typeof o ? o : Array.isArray(o) ? o.join("") : "", p()) : t && (g.src = t, m.set(t, y)), (0, d.setAttributesFromProps)(g, e), "worker" === i && g.setAttribute("type", "text/partytown"), g.setAttribute("data-nscript", i), u && (e => {
                if (s.default.preinit) return e.forEach(e => {
                    s.default.preinit(e, {
                        as: "style"
                    })
                });
                if ("u" > typeof window) {
                    let t = document.head;
                    e.forEach(e => {
                        let n = document.createElement("link");
                        n.type = "text/css", n.rel = "stylesheet", n.href = e, t.appendChild(n)
                    })
                }
            })(u), document.body.appendChild(g)
        };

    function y(e) {
        let {
            strategy: t = "afterInteractive"
        } = e;
        "lazyOnload" === t ? window.addEventListener("load", () => {
            (0, f.requestIdleCallback)(() => g(e))
        }) : g(e)
    }

    function v(e) {
        e.forEach(y), [...document.querySelectorAll('[data-nscript="beforeInteractive"]'), ...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e => {
            let t = e.id || e.getAttribute("src");
            h.add(t)
        })
    }

    function b(e) {
        let {
            id: t,
            src: n = "",
            onLoad: r = () => {},
            onReady: l = null,
            strategy: a = "afterInteractive",
            onError: o,
            stylesheets: d,
            ...m
        } = e, {
            updateScripts: y,
            scripts: v,
            getIsSsr: b,
            appDir: x,
            nonce: w
        } = (0, c.useContext)(u.HeadManagerContext);
        w = m.nonce || w;
        let k = (0, c.useRef)(!1);
        (0, c.useEffect)(() => {
            let e = t || n;
            k.current || (l && e && h.has(e) && l(), k.current = !0)
        }, [l, t, n]);
        let E = (0, c.useRef)(!1);
        if ((0, c.useEffect)(() => {
                if (!E.current) {
                    if ("afterInteractive" === a) g(e);
                    else "lazyOnload" === a && ("complete" === document.readyState ? (0, f.requestIdleCallback)(() => g(e)) : window.addEventListener("load", () => {
                        (0, f.requestIdleCallback)(() => g(e))
                    }));
                    E.current = !0
                }
            }, [e, a]), ("beforeInteractive" === a || "worker" === a) && (y ? (v[a] = (v[a] || []).concat([{
                id: t,
                src: n,
                onLoad: r,
                onReady: l,
                onError: o,
                ...m,
                nonce: w
            }]), y(v)) : b && b() ? h.add(t || n) : b && !b() && g({ ...e,
                nonce: w
            })), x) {
            if (d && d.forEach(e => {
                    s.default.preinit(e, {
                        as: "style"
                    })
                }), "beforeInteractive" === a)
                if (!n) return m.dangerouslySetInnerHTML && (m.children = m.dangerouslySetInnerHTML.__html, delete m.dangerouslySetInnerHTML), (0, i.jsx)("script", {
                    nonce: w,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${(0,p.htmlEscapeJsonString)(JSON.stringify([0,{...m,id:t}]))})`
                    }
                });
                else return s.default.preload(n, m.integrity ? {
                    as: "script",
                    integrity: m.integrity,
                    nonce: w,
                    crossOrigin: m.crossOrigin
                } : {
                    as: "script",
                    nonce: w,
                    crossOrigin: m.crossOrigin
                }), (0, i.jsx)("script", {
                    nonce: w,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${(0,p.htmlEscapeJsonString)(JSON.stringify([n,{...m,id:t}]))})`
                    }
                });
            "afterInteractive" === a && n && s.default.preload(n, m.integrity ? {
                as: "script",
                integrity: m.integrity,
                nonce: w,
                crossOrigin: m.crossOrigin
            } : {
                as: "script",
                nonce: w,
                crossOrigin: m.crossOrigin
            })
        }
        return null
    }
    Object.defineProperty(b, "__nextScript", {
        value: !0
    });
    let x = b;
    ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", {
        value: !0
    }), Object.assign(n.default, n), t.exports = n.default)
}, 19083, (e, t, n) => {
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var r = {
        ESCAPE_REGEX: function() {
            return o
        },
        htmlEscapeAttributeString: function() {
            return u
        },
        htmlEscapeJsonString: function() {
            return c
        }
    };
    for (var l in r) Object.defineProperty(n, l, {
        enumerable: !0,
        get: r[l]
    });
    let a = {
            "&": "\\u0026",
            ">": "\\u003e",
            "<": "\\u003c",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
        },
        o = /[&><\u2028\u2029]/g,
        i = {
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
            "<": "&lt;",
            ">": "&gt;"
        },
        s = /[&"'<>]/g;

    function c(e) {
        return e.replace(o, e => a[e])
    }

    function u(e) {
        return e.replace(s, e => i[e])
    }
}], 3303, (e, t, n) => {
    t.exports = e.r(79520)
}]);