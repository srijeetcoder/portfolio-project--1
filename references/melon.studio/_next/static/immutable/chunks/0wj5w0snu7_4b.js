(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, [11269, e => {
    var t = e.i(18050),
        l = e.i(76677);
    e.s(["default", 0, function({
        className: e,
        children: r
    }) {
        return (0, t.jsx)("button", {
            type: "button",
            className: e,
            onClick: e => (0, l.e)(e.currentTarget),
            children: r
        })
    }])
}, 4354, e => {
    var t = e.i(92450),
        l = e.i(46281);
    e.s(["default", 0, function() {
        return (0, l.f)("pl", (0, t.f)(".pl", {
            lede: ".ab-me .f-lede",
            heads: ".pl .ab-sv__title"
        })), null
    }])
}, 16989, e => {
    var t = e.i(18050),
        l = e.i(71645),
        r = e.i(46302),
        a = e.i(63082),
        i = e.i(15391),
        n = e.i(10629),
        o = e.i(91699);
    e.s(["default", 0, function({
        base: e,
        stem: s
    }) {
        let d = (0, l.useRef)(null);
        return (0, l.useEffect)(() => {
            let t = d.current,
                l = t ? .closest("[data-case]");
            if (!t || !l || (0, a.p)()) return;
            let c = !1,
                u = () => ({
                    phone: (0, r.u)(),
                    sources: (0, o.f)(e, s)
                }),
                m = () => {
                    let e = (0, i.i)(u()).url;
                    !t.src.endsWith(e) && (t.src = e, c && t.play().catch(() => {}))
                },
                f = () => {
                    c = !0, t.src || (t.src = (0, i.m)({ ...u(),
                        canPlayAv1: t.canPlayType(n.d.av1)
                    }).url), t.play().catch(() => {})
                },
                h = () => {
                    c = !1, t.pause(), matchMedia("(hover: hover)").matches && l.removeAttribute("data-on")
                },
                v = () => {
                    c && l.setAttribute("data-on", "")
                };
            if (t.addEventListener("playing", v), t.addEventListener("error", m), matchMedia("(hover: hover)").matches) return l.addEventListener("pointerenter", f), l.addEventListener("pointerleave", h), () => {
                t.removeEventListener("playing", v), t.removeEventListener("error", m), l.removeEventListener("pointerenter", f), l.removeEventListener("pointerleave", h), t.pause()
            };
            let g = new IntersectionObserver(([e]) => {
                e ? .isIntersecting ? f() : h()
            }, {
                threshold: .6
            });
            return g.observe(l), () => {
                t.removeEventListener("playing", v), t.removeEventListener("error", m), g.disconnect(), t.pause()
            }
        }, [e, s]), (0, t.jsx)("video", {
            ref: d,
            className: "sv-case__vid",
            muted: !0,
            loop: !0,
            playsInline: !0,
            preload: "none",
            disablePictureInPicture: !0,
            "aria-hidden": "true",
            tabIndex: -1
        })
    }])
}, 8321, e => {
    var t = e.i(18050),
        l = e.i(71645);
    let r = new Map;

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
        location: i
    }) {
        var n;
        let o, s, d, c, u, m = (0, l.useSyncExternalStore)(a, () => Math.floor(Date.now() / 6e4), () => null),
            f = null === m ? null : (n = new Date(6e4 * m), u = (c = Math.abs(d = Math.round((Date.UTC(+(s = Object.fromEntries((!(o = r.get(e)) && (o = new Intl.DateTimeFormat("en-GB", {
                timeZone: e,
                hourCycle: "h23",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }), r.set(e, o)), o).formatToParts(n).map(e => [e.type, e.value]))).year, s.month - 1, +s.day, +s.hour, +s.minute) - 6e4 * Math.floor(n.getTime() / 6e4)) / 6e4))) % 60 ? `:${String(c%60).padStart(2,"0")}` : "", {
                time: `${s.hour}:${s.minute}`,
                tz: `UTC${d>=0?"+":"−"}${Math.floor(c/60)}${u}`
            });
        return (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsx)("time", {
                className: "f-clock",
                dateTime: f ? .time,
                children: f ? .time ? ? "--:--"
            }), " ", (0, t.jsx)("span", {
                className: "f-clock__tz",
                children: f ? .tz
            }), " ", i]
        })
    }], 8321)
}, 7981, e => {
    var t = e.i(18050),
        l = e.i(25164),
        r = e.i(71645),
        a = e.i(34479),
        i = e.i(63082);
    e.s(["default", 0, function({
        music: e
    }) {
        let [n, o] = (0, r.useState)(null), [s, d] = (0, r.useState)(!1);
        (0, r.useEffect)(() => {
            let e, t, l, r, a, n = !0,
                s = !0,
                c = !1,
                u = !1,
                m = !1,
                f = "",
                h = 0,
                v = async e => {
                    var l;
                    let r = `${e.url} ${e.playing} ${e.cover?.src??""}`;
                    if (r !== f && (f = r, e.cover && !await (l = e.cover.src, new Promise(e => {
                            let t = new window.Image;
                            t.onload = () => e(!0), t.onerror = () => e(!1), t.src = l
                        })) && (e = { ...e,
                            cover: void 0
                        }), n)) {
                        if ((0, i.p)()) return o(e);
                        d(!0), clearTimeout(t), t = setTimeout(() => {
                            o(e), d(!1)
                        }, 200)
                    }
                },
                g = async () => {
                    if (clearTimeout(e), n && "visible" === document.visibilityState) {
                        u = !0, h = Date.now(), l = new AbortController;
                        try {
                            let e = await fetch("/api/now-playing", {
                                    signal: l.signal
                                }),
                                t = e.ok ? await e.json() : {
                                    live: !1
                                };
                            if (t.live) {
                                m = !0;
                                let {
                                    live: e,
                                    ...l
                                } = t;
                                await v(l)
                            } else m || (s = !1)
                        } catch {}
                        u = !1, n && s && (e = setTimeout(g, 6e4))
                    }
                },
                p = () => {
                    c && s && !u && "visible" === document.visibilityState && (clearTimeout(e), e = setTimeout(g, Math.max(0, h + 6e4 - Date.now())))
                };
            document.addEventListener("visibilitychange", p);
            let y = () => {
                    c = !0, g()
                },
                w = () => {
                    "function" == typeof requestIdleCallback ? r = requestIdleCallback(y, {
                        timeout: 5e3
                    }) : a = setTimeout(y, 1e3)
                };
            return "complete" === document.readyState ? w() : window.addEventListener("load", w, {
                once: !0
            }), () => {
                n = !1, window.removeEventListener("load", w), document.removeEventListener("visibilitychange", p), void 0 !== r && cancelIdleCallback(r), clearTimeout(a), clearTimeout(e), clearTimeout(t), l ? .abort()
            }
        }, []);
        let c = n ? .title ? ? e.title,
            u = n ? .artist ? ? e.artist,
            m = n ? .url ? ? e.url ? ? "#",
            f = n ? n.cover : e.cover,
            h = null !== n && !n.playing;
        return (0, t.jsxs)("a", {
            className: `f-now__item f-now__music${s?" is-swapping":""}`,
            href: m,
            target: "#" === m ? void 0 : "_blank",
            rel: "#" === m ? void 0 : "noopener",
            "data-playing": h ? "false" : void 0,
            children: [(0, t.jsx)("span", {
                className: "f-cover f-cover--album",
                "aria-hidden": "true",
                children: f ? (0, t.jsx)(l.default, {
                    className: "f-cover__img",
                    src: f.src,
                    width: f.width,
                    height: f.height,
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
                    }), h ? a.f.footer.lastPlayed : a.f.footer.nowPlaying]
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
        r = e.i(53191),
        a = e.i(12171);
    let i = {
            heads: r.B,
            lede: r.c,
            words: r.v
        },
        n = {
            drive() {},
            stagger() {},
            landed() {}
        },
        o = e => Math.min(1, Math.max(0, e));

    function s(e, t) {
        let l = Math.min(1, e / (r.C.white * t / r.C.max));
        return `color-mix(in srgb, var(--liquid-from) ${(100*l).toFixed(1)}%, currentColor)`
    }
    e.s(["s", 0, function(d, c = i) {
        let {
            gsap: u,
            ScrollTrigger: m,
            signal: f
        } = d;
        if (d.reduced) return f.addEventListener("abort", (0, l.M)("liquid", n), {
            once: !0
        }), n;
        let h = navigator.vendor === r.W,
            v = e => !c.skip || !e.closest(c.skip),
            g = [...document.querySelectorAll(c.heads)].filter(v),
            p = c.words ? [...document.querySelectorAll(c.words)].filter(v) : [];
        for (let e of g) e.dataset.liquidHead = String(r.S.head);
        for (let e of p) e.dataset.liquidHead = String(r.S.lede), e.dataset.liquidDrive = "";
        let y = [...g, ...p].map(e => ({
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
                svg: h ? null : (0, a.f)(e),
                cl: null
            })),
            w = e => y.find(t => t.el === e),
            x = null,
            b = e => {
                e.max = Math.max(r.y, Math.min(r.C.max, e.em * parseFloat(getComputedStyle(e.el).fontSize))), e.cl && x ? e.cl.refresh(e.max, x(getComputedStyle(e.el).getPropertyValue("--liquid-from").trim())) : e.svg ? .region(e.max), e.last = -1
            },
            E = (e, t) => {
                let l = t < r.J ? 0 : Math.min(e.max, t);
                if (l !== e.last && (!(e.last >= 0 && Math.abs(l - e.last) < r.J) || 0 === l || l === e.max)) {
                    if (e.el.style.setProperty("--liquid", l.toFixed(2)), e.last = l, e.cl) return void e.cl.drive(l);
                    if (h) {
                        e.el.style.filter = 0 === l ? "" : `blur(${(l*r.P).toFixed(2)}px)`, e.el.style.color = 0 === l ? "" : s(l, e.max);
                        return
                    }
                    0 === l ? e.svg.sharp() : e.svg.blur(l, e.max), e.el.style.color = 0 === l ? "" : s(l, e.max)
                }
            },
            T = e => {
                let t = Math.min(Math.max(e.sp, e.floor), e.gate);
                E(e, t >= 1 ? 0 : e.max * Math.pow(1 - t, r.C.exp))
            };
        for (let e of y) b(e), E(e, e.max);
        for (let e of y.slice(0, g.length)) {
            let t = t => {
                e.sp = t.progress, T(e)
            };
            e.trig = m.create({
                trigger: e.el,
                ...c.range ? ? r.s,
                onUpdate : t,
                onRefresh : l => {
                    b(e), t(l)
                },
                onToggle: t => {
                    e.svg && !e.playing && (e.el.style.willChange = t.isActive ? "filter" : "")
                }
            })
        }
        let _ = y.slice(g.length),
            j = c.lede ? document.querySelector(c.lede) : null;
        if (j && _.length) {
            let e = _.length,
                t = c.opens ? r.H : r.m.window;
            _.forEach((l, r) => {
                l.at = e > 1 ? r / (e - 1) * (1 - t) : 0, l.win = t
            });
            let l = e => _.forEach(t => {
                    t.sp = o((e - t.at) / t.win), T(t)
                }),
                a = () => d.phone() ? r.m.phone : r.m.desk;
            c.opens ? m.create({
                trigger: j,
                onRefresh: () => _.forEach(e => {
                    b(e), T(e)
                })
            }) : m.create({
                trigger: j,
                start: () => a().start,
                end: () => a().end,
                onUpdate: e => l(e.progress),
                onRefresh: e => {
                    _.forEach(b), l(e.progress)
                }
            })
        }
        let C = null,
            q = 0,
            M = e => {
                e.playing = !1, e.svg && (e.el.style.willChange = e.trig ? .isActive ? "filter" : "")
            },
            S = (e, t, l = r.z) => {
                C ? .kill(), C = null;
                let a = ++q;
                for (let t of y) {
                    let l = e.includes(t);
                    t.playing && !l && M(t), t.gate !== +!l && (t.gate = +!l, T(t))
                }
                e.length && t.then(() => requestAnimationFrame(() => {
                    if (a !== q || f.aborted) return;
                    for (let t of e) t.playing = !0, t.svg && (t.el.style.willChange = "filter");
                    let t = {
                        T: 0
                    };
                    C = u.to(t, {
                        T: 1,
                        ...l,
                        onUpdate: () => e.forEach(e => {
                            e.gate = o((t.T - e.at) / e.win), T(e)
                        }),
                        onComplete: () => {
                            C = null, e.forEach(e => {
                                e.gate = 1, T(e), M(e)
                            })
                        }
                    })
                }))
            },
            L = {
                drive(e, t) {
                    let l = w(e);
                    l ? .el.hasAttribute("data-liquid-drive") && (l.sp = t, T(l))
                },
                stagger(e, t, l) {
                    let r = w(e);
                    r && (r.at = t, r.win = l)
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
        if (h && e.A(75163).then(async ({
                createCanvasLiquid: e,
                cssRgb: t
            }) => {
                if (await document.fonts.ready, !f.aborted)
                    for (let l of (x = t, y)) l.cl = e(l.el, {
                        ink: s
                    }), b(l), T(l)
            }), c.opens) {
            let e = y.filter(e => e.el.hasAttribute("data-liquid-drive") || e.el.getBoundingClientRect().top + scrollY < innerHeight);
            for (let t of e) t.floor = 1;
            S(e, d.revealed, _.length ? r.K : r.z)
        }
        document.addEventListener(t.U, e => L.landed({
            after: e.detail ? .after
        }), {
            signal: f
        });
        let N = (0, l.M)("liquid", L);
        return f.addEventListener("abort", () => {
            for (let e of (N(), C ? .kill(), q++, y)) {
                e.svg ? .destroy(), e.cl ? .destroy();
                let t = e.el.style;
                t.removeProperty("--liquid"), t.filter = "", t.color = "", t.willChange = "", delete e.el.dataset.liquidHead, delete e.el.dataset.liquidDrive
            }
        }, {
            once: !0
        }), L
    }, "L", 0, (e, t) => ({
        heads: r.V.map(t => `${e} ${t}`).join(", "),
        range: r.D,
        ...t && {
            lede: t,
            words: `${t} .f-w`
        },
        opens: !0
    })])
}, 92450, e => {
    var t = e.i(89278),
        l = e.i(60138),
        r = e.i(74759);
    e.s(["f", 0, (e, {
        lede: a,
        heads: i
    } = {}) => n => {
        let {
            reduced: o,
            phone: s,
            revealed: d,
            signal: c
        } = n;
        if (o || !document.documentElement.classList.contains("motion")) return;
        let u = document.querySelector(e);
        if (!u) return;
        let m = (0, t.L)(e, a);
        (0, t.s)(n, { ...m,
            heads: i ? `${m.heads}, ${i}` : m.heads
        });
        let f = (0, r.N)(u, {
            scroller: document.documentElement,
            reduced: o,
            phone: s,
            fx: l.j
        });
        return f.prepare(), d.then(() => {
            c.aborted || f.watch()
        }), () => f.destroy()
    }])
}], 75163, e => {
    e.v(t => Promise.all(["static/immutable/chunks/0acmvbzwp39fz.js"].map(t => e.l(t))).then(() => t(96227)))
}]);