(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, [90262, e => {
    var t = e.i(92450),
        l = e.i(46281);
    e.s(["default", 0, function({
        id: e,
        root: r
    }) {
        return (0, l.f)(e, (0, t.f)(r)), null
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
        o = {
            drive() {},
            stagger() {},
            landed() {}
        },
        n = e => Math.min(1, Math.max(0, e));

    function s(e, t) {
        let l = Math.min(1, e / (r.C.white * t / r.C.max));
        return `color-mix(in srgb, var(--liquid-from) ${(100*l).toFixed(1)}%, currentColor)`
    }
    e.s(["s", 0, function(d, u = i) {
        let {
            gsap: f,
            ScrollTrigger: g,
            signal: c
        } = d;
        if (d.reduced) return c.addEventListener("abort", (0, l.M)("liquid", o), {
            once: !0
        }), o;
        let m = navigator.vendor === r.W,
            h = e => !u.skip || !e.closest(u.skip),
            p = [...document.querySelectorAll(u.heads)].filter(h),
            v = u.words ? [...document.querySelectorAll(u.words)].filter(h) : [];
        for (let e of p) e.dataset.liquidHead = String(r.S.head);
        for (let e of v) e.dataset.liquidHead = String(r.S.lede), e.dataset.liquidDrive = "";
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
                svg: m ? null : (0, a.f)(e),
                cl: null
            })),
            x = e => y.find(t => t.el === e),
            w = null,
            q = e => {
                e.max = Math.max(r.y, Math.min(r.C.max, e.em * parseFloat(getComputedStyle(e.el).fontSize))), e.cl && w ? e.cl.refresh(e.max, w(getComputedStyle(e.el).getPropertyValue("--liquid-from").trim())) : e.svg ? .region(e.max), e.last = -1
            },
            b = (e, t) => {
                let l = t < r.J ? 0 : Math.min(e.max, t);
                if (l !== e.last && (!(e.last >= 0 && Math.abs(l - e.last) < r.J) || 0 === l || l === e.max)) {
                    if (e.el.style.setProperty("--liquid", l.toFixed(2)), e.last = l, e.cl) return void e.cl.drive(l);
                    if (m) {
                        e.el.style.filter = 0 === l ? "" : `blur(${(l*r.P).toFixed(2)}px)`, e.el.style.color = 0 === l ? "" : s(l, e.max);
                        return
                    }
                    0 === l ? e.svg.sharp() : e.svg.blur(l, e.max), e.el.style.color = 0 === l ? "" : s(l, e.max)
                }
            },
            C = e => {
                let t = Math.min(Math.max(e.sp, e.floor), e.gate);
                b(e, t >= 1 ? 0 : e.max * Math.pow(1 - t, r.C.exp))
            };
        for (let e of y) q(e), b(e, e.max);
        for (let e of y.slice(0, p.length)) {
            let t = t => {
                e.sp = t.progress, C(e)
            };
            e.trig = g.create({
                trigger: e.el,
                ...u.range ? ? r.s,
                onUpdate : t,
                onRefresh : l => {
                    q(e), t(l)
                },
                onToggle: t => {
                    e.svg && !e.playing && (e.el.style.willChange = t.isActive ? "filter" : "")
                }
            })
        }
        let M = y.slice(p.length),
            S = u.lede ? document.querySelector(u.lede) : null;
        if (S && M.length) {
            let e = M.length,
                t = u.opens ? r.H : r.m.window;
            M.forEach((l, r) => {
                l.at = e > 1 ? r / (e - 1) * (1 - t) : 0, l.win = t
            });
            let l = e => M.forEach(t => {
                    t.sp = n((e - t.at) / t.win), C(t)
                }),
                a = () => d.phone() ? r.m.phone : r.m.desk;
            u.opens ? g.create({
                trigger: S,
                onRefresh: () => M.forEach(e => {
                    q(e), C(e)
                })
            }) : g.create({
                trigger: S,
                start: () => a().start,
                end: () => a().end,
                onUpdate: e => l(e.progress),
                onRefresh: e => {
                    M.forEach(q), l(e.progress)
                }
            })
        }
        let E = null,
            A = 0,
            T = e => {
                e.playing = !1, e.svg && (e.el.style.willChange = e.trig ? .isActive ? "filter" : "")
            },
            H = (e, t, l = r.z) => {
                E ? .kill(), E = null;
                let a = ++A;
                for (let t of y) {
                    let l = e.includes(t);
                    t.playing && !l && T(t), t.gate !== +!l && (t.gate = +!l, C(t))
                }
                e.length && t.then(() => requestAnimationFrame(() => {
                    if (a !== A || c.aborted) return;
                    for (let t of e) t.playing = !0, t.svg && (t.el.style.willChange = "filter");
                    let t = {
                        T: 0
                    };
                    E = f.to(t, {
                        T: 1,
                        ...l,
                        onUpdate: () => e.forEach(e => {
                            e.gate = n((t.T - e.at) / e.win), C(e)
                        }),
                        onComplete: () => {
                            E = null, e.forEach(e => {
                                e.gate = 1, C(e), T(e)
                            })
                        }
                    })
                }))
            },
            P = {
                drive(e, t) {
                    let l = x(e);
                    l ? .el.hasAttribute("data-liquid-drive") && (l.sp = t, C(l))
                },
                stagger(e, t, l) {
                    let r = x(e);
                    r && (r.at = t, r.win = l)
                },
                landed({
                    after: e = d.revealed
                } = {}) {
                    H(y.filter(e => {
                        let t;
                        return (t = e.el.getBoundingClientRect()).width > 0 && t.bottom > 0 && t.top < innerHeight
                    }), e)
                }
            };
        if (m && e.A(75163).then(async ({
                createCanvasLiquid: e,
                cssRgb: t
            }) => {
                if (await document.fonts.ready, !c.aborted)
                    for (let l of (w = t, y)) l.cl = e(l.el, {
                        ink: s
                    }), q(l), C(l)
            }), u.opens) {
            let e = y.filter(e => e.el.hasAttribute("data-liquid-drive") || e.el.getBoundingClientRect().top + scrollY < innerHeight);
            for (let t of e) t.floor = 1;
            H(e, d.revealed, M.length ? r.K : r.z)
        }
        document.addEventListener(t.U, e => P.landed({
            after: e.detail ? .after
        }), {
            signal: c
        });
        let R = (0, l.M)("liquid", P);
        return c.addEventListener("abort", () => {
            for (let e of (R(), E ? .kill(), A++, y)) {
                e.svg ? .destroy(), e.cl ? .destroy();
                let t = e.el.style;
                t.removeProperty("--liquid"), t.filter = "", t.color = "", t.willChange = "", delete e.el.dataset.liquidHead, delete e.el.dataset.liquidDrive
            }
        }, {
            once: !0
        }), P
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
    } = {}) => o => {
        let {
            reduced: n,
            phone: s,
            revealed: d,
            signal: u
        } = o;
        if (n || !document.documentElement.classList.contains("motion")) return;
        let f = document.querySelector(e);
        if (!f) return;
        let g = (0, t.L)(e, a);
        (0, t.s)(o, { ...g,
            heads: i ? `${g.heads}, ${i}` : g.heads
        });
        let c = (0, r.N)(f, {
            scroller: document.documentElement,
            reduced: n,
            phone: s,
            fx: l.j
        });
        return c.prepare(), d.then(() => {
            u.aborted || c.watch()
        }), () => c.destroy()
    }])
}], 75163, e => {
    e.v(t => Promise.all(["static/immutable/chunks/0acmvbzwp39fz.js"].map(t => e.l(t))).then(() => t(96227)))
}]);