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
}, 14302, e => {
    var t = e.i(18050),
        l = e.i(71645),
        a = e.i(34479),
        i = e.i(57210),
        r = e.i(53021),
        n = e.i(86817);

    function o({
        label: e,
        count: l
    }) {
        return (0, t.jsxs)(n.f, {
            children: [e, (0, t.jsxs)("sup", {
                children: ["(", l, ")"]
            })]
        })
    }
    e.i(8089);
    let s = "topicfilter";

    function d(e) {
        return window.addEventListener("hashchange", e), window.addEventListener(s, e), () => {
            window.removeEventListener("hashchange", e), window.removeEventListener(s, e)
        }
    }
    let c = () => window.location.hash.slice(1),
        u = (e, t) => "all" === t || (e.dataset.topics ? ? "").split(" ").includes(t),
        f = "ix-preset";
    e.s(["default", 0, function({
        topics: e,
        total: n,
        allLabel: m,
        ariaLabel: h
    }) {
        let g, [p, v] = (0, l.useState)(""),
            y = (0, l.useRef)(null),
            w = (0, l.useSyncExternalStore)(d, c, () => ""),
            x = e.some(e => e.slug === w) ? w : "all";
        (0, l.useLayoutEffect)(() => {
            let t = y.current ? .closest("main");
            if (!t) return;
            let l = c(),
                a = e.some(e => e.slug === l) ? l : "all",
                r = 0;
            for (let e of t.querySelectorAll("[data-topics]")) {
                let t = u(e, a);
                e.hidden = !t, t && r++
            }
            let n = t.querySelector(".ix-empty");
            n && (n.hidden = r > 0, n.ariaHidden = r > 0 ? "true" : null), document.getElementById(f) ? .remove(), (0, i.W)()
        }, [x, e]);
        let b = e => {
                let {
                    pathname: t,
                    search: l
                } = window.location;
                window.history.replaceState(window.history.state, "", t + l + ("all" === e.slug ? "" : `#${e.slug}`)), window.dispatchEvent(new Event(s)), v("all" === e.slug ? a.f.filterStatus.all(e.count) : a.f.filterStatus.topic(e.count, e.label))
            },
            j = [{
                slug: "all",
                label: m,
                count: n
            }, ...e.map(e => ({
                slug: e.slug,
                label: e.name,
                count: e.count
            }))];
        return (0, t.jsxs)("nav", {
            ref: y,
            className: "ix-filter ix-pg",
            "aria-label": h,
            "data-pg": !0,
            children: [(0, t.jsx)("script", {
                dangerouslySetInnerHTML: {
                    __html: (g = e.map(e => e.slug), `(function(){var h=location.hash.slice(1);if(${JSON.stringify(g)}.indexOf(h)<0)return;var s=document.createElement('style');s.id='${f}';s.textContent='.ix2-card:not([data-topics~="'+h+'"]){display:none}';document.head.appendChild(s)})()`)
                }
            }), (0, t.jsx)("span", {
                className: "ix-filter__rule",
                "data-pr": "rule",
                "aria-hidden": "true"
            }), (0, t.jsx)("div", {
                className: "ix-filter__row",
                children: j.map(e => {
                    let l;
                    return (0, t.jsx)("a", {
                        className: "ix-filter__a",
                        href: "all" === (l = e.slug) ? r.h ? "/insights" : "#" : r.h ? (0, r.Y)(l) : `#${l}`,
                        "data-no-ptx": !0,
                        role: "button",
                        "aria-pressed": e.slug === x,
                        onClick: t => {
                            t.preventDefault(), b(e)
                        },
                        onKeyDown: t => {
                            " " === t.key && (t.preventDefault(), b(e))
                        },
                        children: (0, t.jsx)(o, {
                            label: e.label,
                            count: e.count
                        })
                    }, e.slug)
                })
            }), (0, t.jsx)("p", {
                className: "sr-only",
                role: "status",
                "aria-live": "polite",
                children: p
            })]
        })
    }], 14302)
}, 65028, e => {
    var t = e.i(89278),
        l = e.i(41116),
        a = e.i(60138),
        i = e.i(74759);
    let r = e => {
        let {
            gsap: r,
            phone: n,
            reduced: o,
            revealed: s,
            signal: d
        } = e;
        if (o || !document.documentElement.classList.contains("motion")) return;
        let c = document.querySelector(".ix");
        if (!c) return;
        (0, t.s)(e, (0, t.L)(".ix"));
        let u = (0, i.N)(c, {
            scroller: document.documentElement,
            reduced: o,
            phone: n,
            fx: a.j
        });
        return u.prepare(), s.then(() => {
            d.aborted || u.watch()
        }), addEventListener("topicfilter", () => {
            let e = [...c.querySelectorAll("[data-topics]")],
                t = location.hash.slice(1),
                a = e => (e.dataset.topics ? ? "").split(" ").includes(t),
                i = e.some(a) ? t : null,
                n = e.filter(e => (null === i || a(e)) && u.played(e));
            if (!n.length) return;
            let {
                y: o,
                ...s
            } = l.H;
            r.fromTo(n.map(e => e.querySelector("a") ? ? e), {
                y: o,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                ...s,
                overwrite: !0,
                clearProps: "transform,opacity"
            })
        }, {
            signal: d
        }), () => u.destroy()
    };
    var n = e.i(46281);
    e.s(["default", 0, function() {
        return (0, n.f)("listing", r), null
    }], 65028)
}, 94523, e => {
    var t = e.i(71645),
        l = e.i(51034);
    e.s(["default", 0, function(e) {
        return (0, t.useLayoutEffect)(() => (0, l.x)(e), [e]), null
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
        let o, s, d, c, u, f = (0, l.useSyncExternalStore)(i, () => Math.floor(Date.now() / 6e4), () => null),
            m = null === f ? null : (n = new Date(6e4 * f), u = (c = Math.abs(d = Math.round((Date.UTC(+(s = Object.fromEntries((!(o = a.get(e)) && (o = new Intl.DateTimeFormat("en-GB", {
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
                dateTime: m ? .time,
                children: m ? .time ? ? "--:--"
            }), " ", (0, t.jsx)("span", {
                className: "f-clock__tz",
                children: m ? .tz
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
                f = !1,
                m = "",
                h = 0,
                g = async e => {
                    var l;
                    let a = `${e.url} ${e.playing} ${e.cover?.src??""}`;
                    if (a !== m && (m = a, e.cover && !await (l = e.cover.src, new Promise(e => {
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
                                f = !0;
                                let {
                                    live: e,
                                    ...l
                                } = t;
                                await g(l)
                            } else f || (s = !1)
                        } catch {}
                        u = !1, n && s && (e = setTimeout(p, 6e4))
                    }
                },
                v = () => {
                    c && s && !u && "visible" === document.visibilityState && (clearTimeout(e), e = setTimeout(p, Math.max(0, h + 6e4 - Date.now())))
                };
            document.addEventListener("visibilitychange", v);
            let y = () => {
                    c = !0, p()
                },
                w = () => {
                    "function" == typeof requestIdleCallback ? a = requestIdleCallback(y, {
                        timeout: 5e3
                    }) : i = setTimeout(y, 1e3)
                };
            return "complete" === document.readyState ? w() : window.addEventListener("load", w, {
                once: !0
            }), () => {
                n = !1, window.removeEventListener("load", w), document.removeEventListener("visibilitychange", v), void 0 !== a && cancelIdleCallback(a), clearTimeout(i), clearTimeout(e), clearTimeout(t), l ? .abort()
            }
        }, []);
        let c = n ? .title ? ? e.title,
            u = n ? .artist ? ? e.artist,
            f = n ? .url ? ? e.url ? ? "#",
            m = n ? n.cover : e.cover,
            h = null !== n && !n.playing;
        return (0, t.jsxs)("a", {
            className: `f-now__item f-now__music${s?" is-swapping":""}`,
            href: f,
            target: "#" === f ? void 0 : "_blank",
            rel: "#" === f ? void 0 : "noopener",
            "data-playing": h ? "false" : void 0,
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
            ScrollTrigger: f,
            signal: m
        } = d;
        if (d.reduced) return m.addEventListener("abort", (0, l.M)("liquid", n), {
            once: !0
        }), n;
        let h = navigator.vendor === a.W,
            g = e => !c.skip || !e.closest(c.skip),
            p = [...document.querySelectorAll(c.heads)].filter(g),
            v = c.words ? [...document.querySelectorAll(c.words)].filter(g) : [];
        for (let e of p) e.dataset.liquidHead = String(a.S.head);
        for (let e of v) e.dataset.liquidHead = String(a.S.lede), e.dataset.liquidDrive = "";
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
                svg: h ? null : (0, i.f)(e),
                cl: null
            })),
            w = e => y.find(t => t.el === e),
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
            S = e => {
                let t = Math.min(Math.max(e.sp, e.floor), e.gate);
                j(e, t >= 1 ? 0 : e.max * Math.pow(1 - t, a.C.exp))
            };
        for (let e of y) b(e), j(e, e.max);
        for (let e of y.slice(0, p.length)) {
            let t = t => {
                e.sp = t.progress, S(e)
            };
            e.trig = f.create({
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
        let _ = y.slice(p.length),
            E = c.lede ? document.querySelector(c.lede) : null;
        if (E && _.length) {
            let e = _.length,
                t = c.opens ? a.H : a.m.window;
            _.forEach((l, a) => {
                l.at = e > 1 ? a / (e - 1) * (1 - t) : 0, l.win = t
            });
            let l = e => _.forEach(t => {
                    t.sp = o((e - t.at) / t.win), S(t)
                }),
                i = () => d.phone() ? a.m.phone : a.m.desk;
            c.opens ? f.create({
                trigger: E,
                onRefresh: () => _.forEach(e => {
                    b(e), S(e)
                })
            }) : f.create({
                trigger: E,
                start: () => i().start,
                end: () => i().end,
                onUpdate: e => l(e.progress),
                onRefresh: e => {
                    _.forEach(b), l(e.progress)
                }
            })
        }
        let T = null,
            C = 0,
            q = e => {
                e.playing = !1, e.svg && (e.el.style.willChange = e.trig ? .isActive ? "filter" : "")
            },
            N = (e, t, l = a.z) => {
                T ? .kill(), T = null;
                let i = ++C;
                for (let t of y) {
                    let l = e.includes(t);
                    t.playing && !l && q(t), t.gate !== +!l && (t.gate = +!l, S(t))
                }
                e.length && t.then(() => requestAnimationFrame(() => {
                    if (i !== C || m.aborted) return;
                    for (let t of e) t.playing = !0, t.svg && (t.el.style.willChange = "filter");
                    let t = {
                        T: 0
                    };
                    T = u.to(t, {
                        T: 1,
                        ...l,
                        onUpdate: () => e.forEach(e => {
                            e.gate = o((t.T - e.at) / e.win), S(e)
                        }),
                        onComplete: () => {
                            T = null, e.forEach(e => {
                                e.gate = 1, S(e), q(e)
                            })
                        }
                    })
                }))
            },
            M = {
                drive(e, t) {
                    let l = w(e);
                    l ? .el.hasAttribute("data-liquid-drive") && (l.sp = t, S(l))
                },
                stagger(e, t, l) {
                    let a = w(e);
                    a && (a.at = t, a.win = l)
                },
                landed({
                    after: e = d.revealed
                } = {}) {
                    N(y.filter(e => {
                        let t;
                        return (t = e.el.getBoundingClientRect()).width > 0 && t.bottom > 0 && t.top < innerHeight
                    }), e)
                }
            };
        if (h && e.A(75163).then(async ({
                createCanvasLiquid: e,
                cssRgb: t
            }) => {
                if (await document.fonts.ready, !m.aborted)
                    for (let l of (x = t, y)) l.cl = e(l.el, {
                        ink: s
                    }), b(l), S(l)
            }), c.opens) {
            let e = y.filter(e => e.el.hasAttribute("data-liquid-drive") || e.el.getBoundingClientRect().top + scrollY < innerHeight);
            for (let t of e) t.floor = 1;
            N(e, d.revealed, _.length ? a.K : a.z)
        }
        document.addEventListener(t.U, e => M.landed({
            after: e.detail ? .after
        }), {
            signal: m
        });
        let $ = (0, l.M)("liquid", M);
        return m.addEventListener("abort", () => {
            for (let e of ($(), T ? .kill(), C++, y)) {
                e.svg ? .destroy(), e.cl ? .destroy();
                let t = e.el.style;
                t.removeProperty("--liquid"), t.filter = "", t.color = "", t.willChange = "", delete e.el.dataset.liquidHead, delete e.el.dataset.liquidDrive
            }
        }, {
            once: !0
        }), M
    }, "L", 0, (e, t) => ({
        heads: a.V.map(t => `${e} ${t}`).join(", "),
        range: a.D,
        ...t && {
            lede: t,
            words: `${t} .f-w`
        },
        opens: !0
    })])
}], 75163, e => {
    e.v(t => Promise.all(["static/immutable/chunks/0acmvbzwp39fz.js"].map(t => e.l(t))).then(() => t(96227)))
}]);