(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, [11269, e => {
    var t = e.i(18050),
        l = e.i(76677);
    e.s(["default", 0, function({
        className: e,
        children: i
    }) {
        return (0, t.jsx)("button", {
            type: "button",
            className: e,
            onClick: e => (0, l.e)(e.currentTarget),
            children: i
        })
    }])
}, 94523, e => {
    var t = e.i(71645),
        l = e.i(51034);
    e.s(["default", 0, function(e) {
        return (0, t.useLayoutEffect)(() => (0, l.x)(e), [e]), null
    }])
}, 8321, e => {
    var t = e.i(18050),
        l = e.i(71645);
    let i = new Map;

    function a(e) {
        let t, l = () => {
            t = setTimeout(() => {
                e(), l()
            }, 6e4 - Date.now() % 6e4)
        };
        return l(), () => clearTimeout(t)
    }
    e.s(["default", 0, function({
        timeZone: e,
        location: r
    }) {
        var n;
        let o, s, d, c, u, f = (0, l.useSyncExternalStore)(a, () => Math.floor(Date.now() / 6e4), () => null),
            m = null === f ? null : (n = new Date(6e4 * f), u = (c = Math.abs(d = Math.round((Date.UTC(+(s = Object.fromEntries((!(o = i.get(e)) && (o = new Intl.DateTimeFormat("en-GB", {
                timeZone: e,
                hourCycle: "h23",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }), i.set(e, o)), o).formatToParts(n).map(e => [e.type, e.value]))).year, s.month - 1, +s.day, +s.hour, +s.minute) - 6e4 * Math.floor(n.getTime() / 6e4)) / 6e4))) % 60 ? `:${String(c%60).padStart(2,"0")}` : "", {
                time: `${s.hour}:${s.minute}`,
                tz: `UTC${d>=0?"+":"−"}${Math.floor(c/60)}${u}`
            });
        return (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsx)("time", {
                className: "f-clock",
                dateTime: m ? .time,
                children: m ? .time ? ? "--:--"
            }), " ", (0, t.jsx)("span", {
                className: "f-clock__tz",
                children: m ? .tz
            }), " ", r]
        })
    }], 8321)
}, 42657, e => {
    var t = e.i(71645),
        l = e.i(13125),
        i = e.i(63082),
        a = e.i(39524),
        r = e.i(24843);

    function n(e) {
        let t = new Map,
            n = (e, t) => {
                let l = e.getBoundingClientRect();
                if (!t) return {
                    x: l.width / 2,
                    y: l.height / 2
                };
                let i = (e, t) => Math.min(t, Math.max(0, e));
                return {
                    x: i(t.clientX - l.left, l.width),
                    y: i(t.clientY - l.top, l.height)
                }
            },
            o = e => {
                let l = t.get(e);
                l && (t.delete(e), l.px.destroy(), l.host.remove(), e.removeAttribute("data-lit"))
            },
            s = (e, i) => {
                let s = t.get(e);
                if (!s) {
                    let i, a, n = document.createElement("span");
                    n.className = "f-cl__burn", n.setAttribute("aria-hidden", "true"), e.prepend(n);
                    let d = {
                        host: n,
                        on: !0,
                        px: (0, r.f)(n, {
                            fill: ((i = document.createElement("i")).style.color = "var(--cl-lit)", e.append(i), a = getComputedStyle(i).color, i.remove(), (0, l.f)(a)),
                            rest: 0,
                            onCover: (t, l) => {
                                if (t) {
                                    let i, a, r;
                                    i = e.querySelector(".f-cl__mark") ? .getBoundingClientRect(), a = n.getBoundingClientRect(), r = i ? Math.floor((i.left + i.width / 2 - a.left) / l) : t.length >> 1, e.toggleAttribute("data-lit", (t[Math.min(t.length - 1, Math.max(0, r))] ? ? 0) > .5)
                                } else d.on ? e.setAttribute("data-lit", "") : o(e)
                            }
                        })
                    };
                    t.set(e, s = d)
                }
                s.on = !0, s.px.fill(1, n(s.host, i), a.K.fill)
            },
            d = (e, l) => {
                let i = t.get(e);
                i ? .on && (i.on = !1, i.px.fill(0, n(i.host, l), a.K.chipOut) || o(e))
            },
            c = e => e instanceof Element ? e.closest(".f-cl__in") : null,
            u = (e, t) => !(t.relatedTarget instanceof Node && e.contains(t.relatedTarget)),
            f = e => {
                let t = c(e.target);
                t && "touch" !== e.pointerType && u(t, e) && s(t, e)
            },
            m = e => {
                let t = c(e.target);
                t && "touch" !== e.pointerType && u(t, e) && !t.matches(":focus-visible") && d(t, e)
            },
            g = l => {
                if ("touch" !== l.pointerType) return;
                let i = e.contains(l.target) ? c(l.target) : null;
                for (let e of t.keys()) e !== i && d(e);
                i && s(i, l)
            },
            h = e => {
                let t = c(e.target);
                t ? .matches(":focus-visible") && s(t)
            },
            p = e => {
                let t = c(e.target);
                t && !t.matches(":hover") && d(t)
            },
            v = null,
            y = l => {
                if (!!v == !l) return;
                if (e.toggleAttribute("data-burn", !l), l) {
                    for (let e of (v ? .abort(), v = null, [...t.keys()])) o(e);
                    return
                }
                let i = {
                    signal: (v = new AbortController).signal
                };
                e.addEventListener("pointerover", f, i), e.addEventListener("pointerout", m, i), e.addEventListener("focusin", h, i), e.addEventListener("focusout", p, i), document.addEventListener("pointerdown", g, i)
            };
        y((0, i.p)());
        let w = (0, i.N)(y);
        return () => {
            w(), y(!0)
        }
    }
    e.s(["default", 0, function() {
        return (0, t.useEffect)(() => {
            let e = [...document.querySelectorAll(".f-cl")].map(n);
            return () => e.forEach(e => e())
        }, []), null
    }], 42657)
}, 7981, e => {
    var t = e.i(18050),
        l = e.i(25164),
        i = e.i(71645),
        a = e.i(34479),
        r = e.i(63082);
    e.s(["default", 0, function({
        music: e
    }) {
        let [n, o] = (0, i.useState)(null), [s, d] = (0, i.useState)(!1);
        (0, i.useEffect)(() => {
            let e, t, l, i, a, n = !0,
                s = !0,
                c = !1,
                u = !1,
                f = !1,
                m = "",
                g = 0,
                h = async e => {
                    var l;
                    let i = `${e.url} ${e.playing} ${e.cover?.src??""}`;
                    if (i !== m && (m = i, e.cover && !await (l = e.cover.src, new Promise(e => {
                            let t = new window.Image;
                            t.onload = () => e(!0), t.onerror = () => e(!1), t.src = l
                        })) && (e = { ...e,
                            cover: void 0
                        }), n)) {
                        if ((0, r.p)()) return o(e);
                        d(!0), clearTimeout(t), t = setTimeout(() => {
                            o(e), d(!1)
                        }, 200)
                    }
                },
                p = async () => {
                    if (clearTimeout(e), n && "visible" === document.visibilityState) {
                        u = !0, g = Date.now(), l = new AbortController;
                        try {
                            let e = await fetch("/api/now-playing", {
                                    signal: l.signal
                                }),
                                t = e.ok ? await e.json() : {
                                    live: !1
                                };
                            if (t.live) {
                                f = !0;
                                let {
                                    live: e,
                                    ...l
                                } = t;
                                await h(l)
                            } else f || (s = !1)
                        } catch {}
                        u = !1, n && s && (e = setTimeout(p, 6e4))
                    }
                },
                v = () => {
                    c && s && !u && "visible" === document.visibilityState && (clearTimeout(e), e = setTimeout(p, Math.max(0, g + 6e4 - Date.now())))
                };
            document.addEventListener("visibilitychange", v);
            let y = () => {
                    c = !0, p()
                },
                w = () => {
                    "function" == typeof requestIdleCallback ? i = requestIdleCallback(y, {
                        timeout: 5e3
                    }) : a = setTimeout(y, 1e3)
                };
            return "complete" === document.readyState ? w() : window.addEventListener("load", w, {
                once: !0
            }), () => {
                n = !1, window.removeEventListener("load", w), document.removeEventListener("visibilitychange", v), void 0 !== i && cancelIdleCallback(i), clearTimeout(a), clearTimeout(e), clearTimeout(t), l ? .abort()
            }
        }, []);
        let c = n ? .title ? ? e.title,
            u = n ? .artist ? ? e.artist,
            f = n ? .url ? ? e.url ? ? "#",
            m = n ? n.cover : e.cover,
            g = null !== n && !n.playing;
        return (0, t.jsxs)("a", {
            className: `f-now__item f-now__music${s?" is-swapping":""}`,
            href: f,
            target: "#" === f ? void 0 : "_blank",
            rel: "#" === f ? void 0 : "noopener",
            "data-playing": g ? "false" : void 0,
            children: [(0, t.jsx)("span", {
                className: "f-cover f-cover--album",
                "aria-hidden": "true",
                children: m ? (0, t.jsx)(l.default, {
                    className: "f-cover__img",
                    src: m.src,
                    width: m.width,
                    height: m.height,
                    alt: ""
                }) : (0, t.jsxs)("span", {
                    className: "f-rec__gen",
                    children: [(0, t.jsx)("span", {
                        className: "f-rec__gen-t",
                        children: c
                    }), (0, t.jsx)("span", {
                        className: "f-rec__gen-a",
                        children: u
                    })]
                })
            }), (0, t.jsxs)("span", {
                className: "f-now__meta",
                children: [(0, t.jsxs)("span", {
                    className: "f-now__kicker",
                    children: [(0, t.jsxs)("span", {
                        className: "f-eq",
                        "aria-hidden": "true",
                        children: [(0, t.jsx)("i", {}), (0, t.jsx)("i", {}), (0, t.jsx)("i", {}), (0, t.jsx)("i", {})]
                    }), g ? a.f.footer.lastPlayed : a.f.footer.nowPlaying]
                }), (0, t.jsx)("span", {
                    className: "f-now__title f-u",
                    children: c
                }), (0, t.jsx)("span", {
                    className: "f-now__by",
                    children: u
                })]
            })]
        })
    }])
}, 89278, e => {
    var t = e.i(27773),
        l = e.i(66657),
        i = e.i(53191),
        a = e.i(12171);
    let r = {
            heads: i.B,
            lede: i.c,
            words: i.v
        },
        n = {
            drive() {},
            stagger() {},
            landed() {}
        },
        o = e => Math.min(1, Math.max(0, e));

    function s(e, t) {
        let l = Math.min(1, e / (i.C.white * t / i.C.max));
        return `color-mix(in srgb, var(--liquid-from) ${(100*l).toFixed(1)}%, currentColor)`
    }
    e.s(["s", 0, function(d, c = r) {
        let {
            gsap: u,
            ScrollTrigger: f,
            signal: m
        } = d;
        if (d.reduced) return m.addEventListener("abort", (0, l.M)("liquid", n), {
            once: !0
        }), n;
        let g = navigator.vendor === i.W,
            h = e => !c.skip || !e.closest(c.skip),
            p = [...document.querySelectorAll(c.heads)].filter(h),
            v = c.words ? [...document.querySelectorAll(c.words)].filter(h) : [];
        for (let e of p) e.dataset.liquidHead = String(i.S.head);
        for (let e of v) e.dataset.liquidHead = String(i.S.lede), e.dataset.liquidDrive = "";
        let y = [...p, ...v].map(e => ({
                el: e,
                em: Number(e.dataset.liquidHead),
                max: 0,
                last: -1,
                sp: 0,
                gate: 1,
                floor: 0,
                at: 0,
                win: 1,
                playing: !1,
                trig: null,
                svg: g ? null : (0, a.f)(e),
                cl: null
            })),
            w = e => y.find(t => t.el === e),
            x = null,
            b = e => {
                e.max = Math.max(i.y, Math.min(i.C.max, e.em * parseFloat(getComputedStyle(e.el).fontSize))), e.cl && x ? e.cl.refresh(e.max, x(getComputedStyle(e.el).getPropertyValue("--liquid-from").trim())) : e.svg ? .region(e.max), e.last = -1
            },
            T = (e, t) => {
                let l = t < i.J ? 0 : Math.min(e.max, t);
                if (l !== e.last && (!(e.last >= 0 && Math.abs(l - e.last) < i.J) || 0 === l || l === e.max)) {
                    if (e.el.style.setProperty("--liquid", l.toFixed(2)), e.last = l, e.cl) return void e.cl.drive(l);
                    if (g) {
                        e.el.style.filter = 0 === l ? "" : `blur(${(l*i.P).toFixed(2)}px)`, e.el.style.color = 0 === l ? "" : s(l, e.max);
                        return
                    }
                    0 === l ? e.svg.sharp() : e.svg.blur(l, e.max), e.el.style.color = 0 === l ? "" : s(l, e.max)
                }
            },
            C = e => {
                let t = Math.min(Math.max(e.sp, e.floor), e.gate);
                T(e, t >= 1 ? 0 : e.max * Math.pow(1 - t, i.C.exp))
            };
        for (let e of y) b(e), T(e, e.max);
        for (let e of y.slice(0, p.length)) {
            let t = t => {
                e.sp = t.progress, C(e)
            };
            e.trig = f.create({
                trigger: e.el,
                ...c.range ? ? i.s,
                onUpdate : t,
                onRefresh : l => {
                    b(e), t(l)
                },
                onToggle: t => {
                    e.svg && !e.playing && (e.el.style.willChange = t.isActive ? "filter" : "")
                }
            })
        }
        let _ = y.slice(p.length),
            E = c.lede ? document.querySelector(c.lede) : null;
        if (E && _.length) {
            let e = _.length,
                t = c.opens ? i.H : i.m.window;
            _.forEach((l, i) => {
                l.at = e > 1 ? i / (e - 1) * (1 - t) : 0, l.win = t
            });
            let l = e => _.forEach(t => {
                    t.sp = o((e - t.at) / t.win), C(t)
                }),
                a = () => d.phone() ? i.m.phone : i.m.desk;
            c.opens ? f.create({
                trigger: E,
                onRefresh: () => _.forEach(e => {
                    b(e), C(e)
                })
            }) : f.create({
                trigger: E,
                start: () => a().start,
                end: () => a().end,
                onUpdate: e => l(e.progress),
                onRefresh: e => {
                    _.forEach(b), l(e.progress)
                }
            })
        }
        let j = null,
            M = 0,
            q = e => {
                e.playing = !1, e.svg && (e.el.style.willChange = e.trig ? .isActive ? "filter" : "")
            },
            S = (e, t, l = i.z) => {
                j ? .kill(), j = null;
                let a = ++M;
                for (let t of y) {
                    let l = e.includes(t);
                    t.playing && !l && q(t), t.gate !== +!l && (t.gate = +!l, C(t))
                }
                e.length && t.then(() => requestAnimationFrame(() => {
                    if (a !== M || m.aborted) return;
                    for (let t of e) t.playing = !0, t.svg && (t.el.style.willChange = "filter");
                    let t = {
                        T: 0
                    };
                    j = u.to(t, {
                        T: 1,
                        ...l,
                        onUpdate: () => e.forEach(e => {
                            e.gate = o((t.T - e.at) / e.win), C(e)
                        }),
                        onComplete: () => {
                            j = null, e.forEach(e => {
                                e.gate = 1, C(e), q(e)
                            })
                        }
                    })
                }))
            },
            k = {
                drive(e, t) {
                    let l = w(e);
                    l ? .el.hasAttribute("data-liquid-drive") && (l.sp = t, C(l))
                },
                stagger(e, t, l) {
                    let i = w(e);
                    i && (i.at = t, i.win = l)
                },
                landed({
                    after: e = d.revealed
                } = {}) {
                    S(y.filter(e => {
                        let t;
                        return (t = e.el.getBoundingClientRect()).width > 0 && t.bottom > 0 && t.top < innerHeight
                    }), e)
                }
            };
        if (g && e.A(75163).then(async ({
                createCanvasLiquid: e,
                cssRgb: t
            }) => {
                if (await document.fonts.ready, !m.aborted)
                    for (let l of (x = t, y)) l.cl = e(l.el, {
                        ink: s
                    }), b(l), C(l)
            }), c.opens) {
            let e = y.filter(e => e.el.hasAttribute("data-liquid-drive") || e.el.getBoundingClientRect().top + scrollY < innerHeight);
            for (let t of e) t.floor = 1;
            S(e, d.revealed, _.length ? i.K : i.z)
        }
        document.addEventListener(t.U, e => k.landed({
            after: e.detail ? .after
        }), {
            signal: m
        });
        let A = (0, l.M)("liquid", k);
        return m.addEventListener("abort", () => {
            for (let e of (A(), j ? .kill(), M++, y)) {
                e.svg ? .destroy(), e.cl ? .destroy();
                let t = e.el.style;
                t.removeProperty("--liquid"), t.filter = "", t.color = "", t.willChange = "", delete e.el.dataset.liquidHead, delete e.el.dataset.liquidDrive
            }
        }, {
            once: !0
        }), k
    }, "L", 0, (e, t) => ({
        heads: i.V.map(t => `${e} ${t}`).join(", "),
        range: i.D,
        ...t && {
            lede: t,
            words: `${t} .f-w`
        },
        opens: !0
    })])
}], 75163, e => {
    e.v(t => Promise.all(["static/immutable/chunks/0acmvbzwp39fz.js"].map(t => e.l(t))).then(() => t(96227)))
}, 78534, e => {
    e.v(t => Promise.all(["static/immutable/chunks/30ftby4ffsb63.js"].map(t => e.l(t))).then(() => t(32544)))
}]);