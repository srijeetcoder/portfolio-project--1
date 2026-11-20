(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, [11269, e => {
    var t = e.i(18050),
        l = e.i(76677);
    e.s(["default", 0, function({
        className: e,
        children: a
    }) {
        return (0, t.jsx)("button", {
            type: "button",
            className: e,
            onClick: e => (0, l.e)(e.currentTarget),
            children: a
        })
    }])
}, 98155, e => {
    var t = e.i(18050),
        l = e.i(71645);
    e.s(["default", 0, function({
        items: e,
        label: a
    }) {
        let [i, r] = (0, l.useState)(null);
        return (0, l.useEffect)(() => {
            let t = e.map(e => document.getElementById(e.id)).filter(e => null !== e),
                l = new Map,
                a = new IntersectionObserver(t => {
                    for (let e of t) l.set(e.target.id, e.isIntersecting);
                    let a = e.find(e => l.get(e.id));
                    a && r(a.id)
                }, {
                    rootMargin: "-30% 0px -69% 0px"
                });
            for (let e of t) a.observe(e);
            return () => a.disconnect()
        }, [e]), (0, t.jsxs)("nav", {
            className: "dc-toc",
            "aria-label": a,
            "data-pg": !0,
            children: [(0, t.jsx)("p", {
                className: "dc-toc__label",
                "data-pr": "el",
                children: a
            }), (0, t.jsx)("ol", {
                className: "dc-toc__list",
                children: e.map(e => (0, t.jsx)("li", {
                    "data-pr": "el",
                    children: (0, t.jsx)("a", {
                        href: `#${e.id}`,
                        "aria-current": i === e.id ? "location" : void 0,
                        children: e.label
                    })
                }, e.id))
            })]
        })
    }])
}, 90262, e => {
    var t = e.i(92450),
        l = e.i(46281);
    e.s(["default", 0, function({
        id: e,
        root: a
    }) {
        return (0, l.f)(e, (0, t.f)(a)), null
    }])
}, 8321, e => {
    var t = e.i(18050),
        l = e.i(71645);
    let a = new Map;

    function i(e) {
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
        let o, s, d, c, u, m = (0, l.useSyncExternalStore)(i, () => Math.floor(Date.now() / 6e4), () => null),
            f = null === m ? null : (n = new Date(6e4 * m), u = (c = Math.abs(d = Math.round((Date.UTC(+(s = Object.fromEntries((!(o = a.get(e)) && (o = new Intl.DateTimeFormat("en-GB", {
                timeZone: e,
                hourCycle: "h23",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }), a.set(e, o)), o).formatToParts(n).map(e => [e.type, e.value]))).year, s.month - 1, +s.day, +s.hour, +s.minute) - 6e4 * Math.floor(n.getTime() / 6e4)) / 6e4))) % 60 ? `:${String(c%60).padStart(2,"0")}` : "", {
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
            }), " ", r]
        })
    }], 8321)
}, 7981, e => {
    var t = e.i(18050),
        l = e.i(25164),
        a = e.i(71645),
        i = e.i(34479),
        r = e.i(63082);
    e.s(["default", 0, function({
        music: e
    }) {
        let [n, o] = (0, a.useState)(null), [s, d] = (0, a.useState)(!1);
        (0, a.useEffect)(() => {
            let e, t, l, a, i, n = !0,
                s = !0,
                c = !1,
                u = !1,
                m = !1,
                f = "",
                h = 0,
                g = async e => {
                    var l;
                    let a = `${e.url} ${e.playing} ${e.cover?.src??""}`;
                    if (a !== f && (f = a, e.cover && !await (l = e.cover.src, new Promise(e => {
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
                                await g(l)
                            } else m || (s = !1)
                        } catch {}
                        u = !1, n && s && (e = setTimeout(p, 6e4))
                    }
                },
                v = () => {
                    c && s && !u && "visible" === document.visibilityState && (clearTimeout(e), e = setTimeout(p, Math.max(0, h + 6e4 - Date.now())))
                };
            document.addEventListener("visibilitychange", v);
            let w = () => {
                    c = !0, p()
                },
                y = () => {
                    "function" == typeof requestIdleCallback ? a = requestIdleCallback(w, {
                        timeout: 5e3
                    }) : i = setTimeout(w, 1e3)
                };
            return "complete" === document.readyState ? y() : window.addEventListener("load", y, {
                once: !0
            }), () => {
                n = !1, window.removeEventListener("load", y), document.removeEventListener("visibilitychange", v), void 0 !== a && cancelIdleCallback(a), clearTimeout(i), clearTimeout(e), clearTimeout(t), l ? .abort()
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
                    }), h ? i.f.footer.lastPlayed : i.f.footer.nowPlaying]
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
        a = e.i(53191),
        i = e.i(12171);
    let r = {
            heads: a.B,
            lede: a.c,
            words: a.v
        },
        n = {
            drive() {},
            stagger() {},
            landed() {}
        },
        o = e => Math.min(1, Math.max(0, e));

    function s(e, t) {
        let l = Math.min(1, e / (a.C.white * t / a.C.max));
        return `color-mix(in srgb, var(--liquid-from) ${(100*l).toFixed(1)}%, currentColor)`
    }
    e.s(["s", 0, function(d, c = r) {
        let {
            gsap: u,
            ScrollTrigger: m,
            signal: f
        } = d;
        if (d.reduced) return f.addEventListener("abort", (0, l.M)("liquid", n), {
            once: !0
        }), n;
        let h = navigator.vendor === a.W,
            g = e => !c.skip || !e.closest(c.skip),
            p = [...document.querySelectorAll(c.heads)].filter(g),
            v = c.words ? [...document.querySelectorAll(c.words)].filter(g) : [];
        for (let e of p) e.dataset.liquidHead = String(a.S.head);
        for (let e of v) e.dataset.liquidHead = String(a.S.lede), e.dataset.liquidDrive = "";
        let w = [...p, ...v].map(e => ({
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
                svg: h ? null : (0, i.f)(e),
                cl: null
            })),
            y = e => w.find(t => t.el === e),
            x = null,
            b = e => {
                e.max = Math.max(a.y, Math.min(a.C.max, e.em * parseFloat(getComputedStyle(e.el).fontSize))), e.cl && x ? e.cl.refresh(e.max, x(getComputedStyle(e.el).getPropertyValue("--liquid-from").trim())) : e.svg ? .region(e.max), e.last = -1
            },
            j = (e, t) => {
                let l = t < a.J ? 0 : Math.min(e.max, t);
                if (l !== e.last && (!(e.last >= 0 && Math.abs(l - e.last) < a.J) || 0 === l || l === e.max)) {
                    if (e.el.style.setProperty("--liquid", l.toFixed(2)), e.last = l, e.cl) return void e.cl.drive(l);
                    if (h) {
                        e.el.style.filter = 0 === l ? "" : `blur(${(l*a.P).toFixed(2)}px)`, e.el.style.color = 0 === l ? "" : s(l, e.max);
                        return
                    }
                    0 === l ? e.svg.sharp() : e.svg.blur(l, e.max), e.el.style.color = 0 === l ? "" : s(l, e.max)
                }
            },
            T = e => {
                let t = Math.min(Math.max(e.sp, e.floor), e.gate);
                j(e, t >= 1 ? 0 : e.max * Math.pow(1 - t, a.C.exp))
            };
        for (let e of w) b(e), j(e, e.max);
        for (let e of w.slice(0, p.length)) {
            let t = t => {
                e.sp = t.progress, T(e)
            };
            e.trig = m.create({
                trigger: e.el,
                ...c.range ? ? a.s,
                onUpdate : t,
                onRefresh : l => {
                    b(e), t(l)
                },
                onToggle: t => {
                    e.svg && !e.playing && (e.el.style.willChange = t.isActive ? "filter" : "")
                }
            })
        }
        let _ = w.slice(p.length),
            C = c.lede ? document.querySelector(c.lede) : null;
        if (C && _.length) {
            let e = _.length,
                t = c.opens ? a.H : a.m.window;
            _.forEach((l, a) => {
                l.at = e > 1 ? a / (e - 1) * (1 - t) : 0, l.win = t
            });
            let l = e => _.forEach(t => {
                    t.sp = o((e - t.at) / t.win), T(t)
                }),
                i = () => d.phone() ? a.m.phone : a.m.desk;
            c.opens ? m.create({
                trigger: C,
                onRefresh: () => _.forEach(e => {
                    b(e), T(e)
                })
            }) : m.create({
                trigger: C,
                start: () => i().start,
                end: () => i().end,
                onUpdate: e => l(e.progress),
                onRefresh: e => {
                    _.forEach(b), l(e.progress)
                }
            })
        }
        let q = null,
            S = 0,
            M = e => {
                e.playing = !1, e.svg && (e.el.style.willChange = e.trig ? .isActive ? "filter" : "")
            },
            E = (e, t, l = a.z) => {
                q ? .kill(), q = null;
                let i = ++S;
                for (let t of w) {
                    let l = e.includes(t);
                    t.playing && !l && M(t), t.gate !== +!l && (t.gate = +!l, T(t))
                }
                e.length && t.then(() => requestAnimationFrame(() => {
                    if (i !== S || f.aborted) return;
                    for (let t of e) t.playing = !0, t.svg && (t.el.style.willChange = "filter");
                    let t = {
                        T: 0
                    };
                    q = u.to(t, {
                        T: 1,
                        ...l,
                        onUpdate: () => e.forEach(e => {
                            e.gate = o((t.T - e.at) / e.win), T(e)
                        }),
                        onComplete: () => {
                            q = null, e.forEach(e => {
                                e.gate = 1, T(e), M(e)
                            })
                        }
                    })
                }))
            },
            N = {
                drive(e, t) {
                    let l = y(e);
                    l ? .el.hasAttribute("data-liquid-drive") && (l.sp = t, T(l))
                },
                stagger(e, t, l) {
                    let a = y(e);
                    a && (a.at = t, a.win = l)
                },
                landed({
                    after: e = d.revealed
                } = {}) {
                    E(w.filter(e => {
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
                    for (let l of (x = t, w)) l.cl = e(l.el, {
                        ink: s
                    }), b(l), T(l)
            }), c.opens) {
            let e = w.filter(e => e.el.hasAttribute("data-liquid-drive") || e.el.getBoundingClientRect().top + scrollY < innerHeight);
            for (let t of e) t.floor = 1;
            E(e, d.revealed, _.length ? a.K : a.z)
        }
        document.addEventListener(t.U, e => N.landed({
            after: e.detail ? .after
        }), {
            signal: f
        });
        let $ = (0, l.M)("liquid", N);
        return f.addEventListener("abort", () => {
            for (let e of ($(), q ? .kill(), S++, w)) {
                e.svg ? .destroy(), e.cl ? .destroy();
                let t = e.el.style;
                t.removeProperty("--liquid"), t.filter = "", t.color = "", t.willChange = "", delete e.el.dataset.liquidHead, delete e.el.dataset.liquidDrive
            }
        }, {
            once: !0
        }), N
    }, "L", 0, (e, t) => ({
        heads: a.V.map(t => `${e} ${t}`).join(", "),
        range: a.D,
        ...t && {
            lede: t,
            words: `${t} .f-w`
        },
        opens: !0
    })])
}, 92450, e => {
    var t = e.i(89278),
        l = e.i(60138),
        a = e.i(74759);
    e.s(["f", 0, (e, {
        lede: i,
        heads: r
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
        let m = (0, t.L)(e, i);
        (0, t.s)(n, { ...m,
            heads: r ? `${m.heads}, ${r}` : m.heads
        });
        let f = (0, a.N)(u, {
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