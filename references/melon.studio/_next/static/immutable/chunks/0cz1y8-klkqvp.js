(() => {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 80192, e => {
        var t = e.i(71645),
            i = e.i(95613),
            l = e.i(63082);
        e.s(["default", 0, function() {
            return (0, t.useEffect)(() => (0, i.D)(), []), (0, t.useEffect)(() => {
                let e = document.documentElement,
                    t = t => {
                        t ? delete e.dataset.fx : e.dataset.fx = ""
                    };
                t((0, l.p)());
                let i = (0, l.N)(t);
                return () => {
                    i(), delete e.dataset.fx
                }
            }, []), null
        }])
    }, 69634, e => {
        var t = e.i(18050),
            i = e.i(71645),
            l = e.i(34479),
            r = e.i(27773),
            s = e.i(17724),
            n = e.i(89970),
            o = e.i(75324),
            a = e.i(57210);
        let d = new Set([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"]),
            c = {
                dom: .08,
                fonts: .17,
                boot: .2,
                images: .2,
                hero: .15,
                ribbon: .2
            },
            h = {
                duration: .6,
                ease: "power2.out"
            },
            u = {
                duration: .2,
                ease: "power1.out"
            },
            p = {
                from: 125,
                duration: .6,
                ease: "hesitate",
                stagger: .02,
                delay: .1
            },
            m = {
                at: .05,
                yPercent: -125,
                duration: .4,
                inDuration: .6,
                stagger: .02
            },
            f = {
                labelsAt: .15,
                revealAt: .45,
                fade: r.z,
                ease: "power1.inOut"
            },
            g = {
                phase: "skipped",
                count: 0
            },
            v = null;
        var y = e.i(46281);
        let {
            loading: j,
            ready: b,
            count: x,
            percent: w,
            aria: _
        } = l.f.loader;
        e.s(["default", 0, function() {
            let e = (0, i.useRef)(null),
                [l, S] = (0, i.useState)(!1);
            return ((0, y.f)("loader", t => (function(e, t, i) {
                if (e.readiness.done.then(i), v) return v.attach(e);
                let l = document.documentElement;
                if (!t || "load" !== e.transition.arrival || !l.classList.contains("f-loading") || l.classList.contains("motion-timeout")) return;
                let y = e.readiness.claim();
                y && (v = function(e, t, i) {
                    let l, v, y, j = e,
                        b = document.documentElement;
                    g.phase = "loading";
                    let x = performance.now();
                    t.removeAttribute("hidden"), t.removeAttribute("aria-hidden"), scrollTo(0, 0), j.scroll.stop(), j.scroll.to(0, {
                        immediate: !0
                    });
                    let w = (l = e => {
                            e.preventDefault(), e.stopPropagation()
                        }, v = e => {
                            d.has(e.key) && e.preventDefault()
                        }, addEventListener("wheel", l, y = {
                            capture: !0,
                            passive: !1
                        }), addEventListener("touchmove", l, y), addEventListener("keydown", v, !0), () => {
                            removeEventListener("wheel", l, y), removeEventListener("touchmove", l, y), removeEventListener("keydown", v, !0)
                        }),
                        _ = {
                            v: 0
                        },
                        S = {
                            v: 0
                        },
                        E = !1,
                        k = !1,
                        N = null,
                        T = () => {
                            let e;
                            return e = j.readiness.progress(), E ? Object.fromEntries(Object.keys(e).map(e => [e, 1])) : e
                        },
                        L = () => {
                            let e;
                            k || n.e.to(_, {
                                v: (e = T(), Object.keys(c).reduce((t, i) => t + c[i] * e[i], 0)),
                                ...h,
                                overwrite: !0
                            })
                        },
                        A = t.querySelector(".f-ld__bar"),
                        M = t.querySelector(".f-ld__mark-fill"),
                        C = t.querySelector(".f-ld__num"),
                        [P, R] = t.querySelectorAll(".f-ld__label"),
                        z = j.reduced,
                        H = null,
                        O = null,
                        q = () => {
                            let e = Math.min(_.v, S.v);
                            n.e.set(A, {
                                scaleX: e
                            }), n.e.set(M, {
                                clipPath: `inset(0% ${((1-e)*100).toFixed(2)}% 0% 0%)`
                            });
                            let i = Math.max(g.count, Math.round(100 * e));
                            i !== g.count && (g.count = i, C.textContent = String(i).padStart(3, "0"), t.setAttribute("aria-valuenow", String(i)))
                        },
                        W = () => {
                            (!E && performance.now() - x >= 1e4 && (E = !0, L()), Object.values(T()).every(e => e >= 1)) && (k || (k = !0, n.e.to(_, {
                                v: 1,
                                ...u,
                                overwrite: !0
                            })), Math.min(_.v, S.v) >= .995 && (F(), function() {
                                if (g.phase = "exit", q(), j.scroll.start(), (0, a.o)(Y), z) N = n.e.timeline({
                                    onComplete: V
                                }).set(P, {
                                    visibility: "hidden"
                                }, f.labelsAt).set(R, {
                                    visibility: "visible"
                                }, f.labelsAt).addLabel("hide", f.revealAt).call(B, void 0, "hide").addLabel("reveal", f.revealAt).call(D, void 0, "reveal").to(t, {
                                    autoAlpha: 0,
                                    duration: f.fade,
                                    ease: f.ease
                                }, "reveal");
                                else {
                                    let e = t.querySelector(".f-ld__panel"),
                                        i = t.querySelector(".f-ld__sheet"),
                                        l = {
                                            v: 0
                                        },
                                        r = {
                                            v: 0
                                        },
                                        s = () => {
                                            let t = innerHeight / 100,
                                                s = Math.min(r.v, l.v + 100 * .07);
                                            n.e.set(e, {
                                                y: l.v * t
                                            }), n.e.set(i, {
                                                y: s * t
                                            })
                                        },
                                        {
                                            at: o,
                                            yPercent: a,
                                            duration: d,
                                            inDuration: c,
                                            stagger: h
                                        } = m;
                                    N = n.e.timeline({
                                        defaults: {
                                            ease: "hesitate"
                                        },
                                        onComplete: V
                                    }).to(H.chars, {
                                        yPercent: a,
                                        autoAlpha: 0,
                                        duration: d,
                                        stagger: h
                                    }, o).to(O.chars, {
                                        yPercent: 0,
                                        autoAlpha: 1,
                                        duration: c,
                                        stagger: h
                                    }, o).addLabel("hide", .5).call(B, void 0, "hide").to(t.querySelector(".f-ld__content"), {
                                        autoAlpha: 0,
                                        duration: .5
                                    }, "hide").to(A, {
                                        scaleX: 0,
                                        transformOrigin: "100% 50%",
                                        duration: .5
                                    }, "hide").to(l, {
                                        v: -101,
                                        duration: 1,
                                        onUpdate: s
                                    }, "hide").to(r, {
                                        v: -101,
                                        duration: 1,
                                        onUpdate: s
                                    }, "hide+=0.1").addLabel("reveal", "hide+=" + .55).call(D, void 0, "reveal")
                                }
                            }()))
                        },
                        $ = () => {},
                        F = () => {},
                        I = () => {};
                    n.e.ticker.add(() => {
                        if ("loading" === g.phase) {
                            if (I = j.readiness.onChange(L), L(), n.e.to(S, {
                                    v: 1,
                                    duration: 2.2,
                                    ease: "hesitate"
                                }), z) n.e.set(P, {
                                visibility: "visible"
                            });
                            else {
                                let e = e => o.f.create(e, {
                                    type: "lines,chars",
                                    mask: "lines",
                                    linesClass: "f-ld__ln"
                                });
                                for (let t of (H = e(P), O = e(R), [...H.masks, ...O.masks])) t.classList.add("f-ld__mask");
                                n.e.set([H.chars, O.chars], {
                                    yPercent: p.from,
                                    autoAlpha: 0
                                }), n.e.set([P, R], {
                                    visibility: "visible"
                                });
                                let {
                                    duration: t,
                                    ease: i,
                                    stagger: l,
                                    delay: r
                                } = p;
                                n.e.to(H.chars, {
                                    yPercent: 0,
                                    autoAlpha: 1,
                                    duration: t,
                                    ease: i,
                                    stagger: l,
                                    delay: r
                                })
                            }
                            $ = (0, s.f)("loader", q), F = (0, s.f)("loader:ready", W)
                        }
                    }, !0);
                    let B = () => {
                            $()
                        },
                        D = () => {
                            g.phase = "reveal", i.reveal()
                        },
                        V = () => {
                            b.classList.remove("f-loading"), i.finish()
                        },
                        Y = () => {
                            let e = function(e) {
                                try {
                                    let t = decodeURIComponent(e.slice(1));
                                    return t ? document.getElementById(t) : null
                                } catch {
                                    return null
                                }
                            }(location.hash);
                            e && (j.scroll.to(e, {
                                immediate: !0
                            }), document.dispatchEvent(new CustomEvent(r.U, {
                                detail: {
                                    after: j.readiness.revealed
                                }
                            })))
                        };
                    return j.readiness.done.then(() => {
                        g.phase = "gone", $(), F(), I(), w(), N ? .kill(), n.e.killTweensOf([_, S])
                    }), {
                        attach(e) {
                            j = e, "loading" === g.phase && e.scroll.stop()
                        }
                    }
                }(e, t, y))
            })(t, e.current, () => S(!0))), l) ? null : (0, t.jsxs)("div", {
                ref: e,
                className: "f-ld",
                hidden: !0,
                "aria-hidden": "true",
                role: "progressbar",
                "aria-label": _,
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": 0,
                children: [(0, t.jsx)("div", {
                    className: "f-ld__sheet",
                    "aria-hidden": "true"
                }), (0, t.jsxs)("div", {
                    className: "f-ld__panel",
                    children: [(0, t.jsxs)("div", {
                        className: "f-ld__content",
                        "aria-hidden": "true",
                        children: [(0, t.jsxs)("div", {
                            className: "f-ld__mark",
                            children: [(0, t.jsx)("span", {
                                className: "f-ld__mark-ghost"
                            }), (0, t.jsx)("span", {
                                className: "f-ld__mark-fill"
                            })]
                        }), (0, t.jsxs)("div", {
                            className: "f-ld__labels",
                            children: [(0, t.jsx)("span", {
                                className: "f-ld__label",
                                children: j
                            }), (0, t.jsx)("span", {
                                className: "f-ld__label",
                                children: b
                            })]
                        }), (0, t.jsxs)("p", {
                            className: "f-ld__count",
                            children: [(0, t.jsx)("span", {
                                className: "f-ld__num",
                                children: x
                            }), (0, t.jsx)("span", {
                                className: "f-ld__pct",
                                children: w
                            })]
                        })]
                    }), (0, t.jsx)("div", {
                        className: "f-ld__bar",
                        "aria-hidden": "true"
                    })]
                })]
            })
        }], 69634)
    }, 39394, e => {
        var t = e.i(18566),
            i = e.i(71645),
            l = e.i(8915),
            r = e.i(46302),
            s = e.i(63208);
        let n = (e, t, i, l) => `M0,0 C${e},${t} ${i},${l} 1,1`,
            o = {
                hesitate: "0.65,0.01,0.05,0.99",
                reveal: "0.18,0.66,0.18,1",
                underline: "0.18,0.83,0.27,1",
                snappy: "M0,0 C0.094,0.026 0.124,0.127 0.157,0.29 0.197,0.486 0.254,0.8 0.348,0.884 0.42,0.949 0.374,1 1,1",
                "pj-out": n(.33, 1, .68, 1),
                "pj-in": n(.32, 0, .67, 0),
                "pj-glide": n(.81, .03, .06, 1)
            },
            a = !1;
        e.i(17724);
        var d = e.i(89970),
            c = e.i(83495),
            h = e.i(1537),
            u = e.i(27773),
            p = e.i(50929);
        let m = e => {
                try {
                    history.replaceState(e, "")
                } catch {}
            },
            f = ["dom", "fonts", "boot", "images", "hero", "ribbon"];
        var g = e.i(63082),
            v = e.i(57210),
            y = e.i(30036),
            j = e.i(67521),
            b = e.i(11189),
            x = e.i(15852);
        let w = {
                x: .5,
                y: .5
            },
            _ = e => Math.min(1, Math.max(0, e));
        var S = e.i(28205);
        e.i(94598), e.s(["default", 0, function({
            children: e
        }) {
            let n = (0, t.useRouter)();
            return (0, i.useLayoutEffect)(() => (function(e) {
                let t, i, n, E, k, N, T, L, A, M, C, P, R, z, H, O, q, W, $, F, I = document.documentElement;
                history.scrollRestoration = "manual";
                var B, D, V, Y = d.e;
                if (!a)
                    for (let [e, t] of (a = !0, Y.registerPlugin(s.f), Object.entries(o))) s.f.create(e, t);
                d.e.ticker.lagSmoothing(0);
                let U = (0, g.p)(),
                    X = (0, y.f)({
                        reduced: U,
                        gsap: d.e,
                        ScrollTrigger: c.f
                    }),
                    K = (B = j.q, i = new Map, n = new Set, m((0, p.y)(history.state, {
                        kind: "route",
                        depth: 0
                    })), addEventListener("popstate", E = e => {
                        clearTimeout(t), (0, h.K)("popstate");
                        let l = (0, p.l)(e.state);
                        for (let t of n) t(l, e);
                        let r = (0, p.x)(i, e.state);
                        r ? .handler(r.pf, e)
                    }), {
                        on: (e, t) => (i.set(e, t), () => {
                            i.get(e) === t && i.delete(e)
                        }),
                        onTraverse: e => (n.add(e), () => void n.delete(e)),
                        push(e, i, l) {
                            clearTimeout(t);
                            let r = B(),
                                s = (0, p.J)(history.state, e, null === r ? i : { ...i,
                                    route: r
                                });
                            history.pushState({
                                pf: s
                            }, "", l)
                        },
                        replace(e, t) {
                            m((0, p.y)(history.state, (0, p.r)(history.state, e, t)))
                        },
                        get depth() {
                            return (0, p.l)(history.state).depth
                        },
                        save: k = e => {
                            clearTimeout(t), m((0, p.y)(history.state, (0, p.S)(history.state, Math.round(e), B() ? ? void 0)))
                        },
                        saveSoon(e) {
                            clearTimeout(t), t = setTimeout(() => k(e), 1e3 * u.c)
                        },
                        stamp(e) {
                            m((0, p.y)(history.state, (0, p.A)(history.state, e)))
                        },
                        destroy() {
                            clearTimeout(t), removeEventListener("popstate", E)
                        }
                    }),
                    J = X.onScroll(e => K.saveSoon(e)),
                    Q = () => X.resize();
                c.f.addEventListener("refresh", Q);
                let G = (D = () => {
                    X.start(), I.classList.remove("f-loading")
                }, L = Object.fromEntries(f.map(e => [e, 0])), A = new Set, M = new Set, C = !1, P = new Promise(e => N = e), R = new Promise(e => T = e), z = !1, H = !1, O = () => {
                    z || (z = !0, N())
                }, q = () => {
                    H || (O(), H = !0, T())
                }, {
                    expect: e => void A.add(e),
                    report: W = (e, t) => {
                        let i = Math.max(L[e], Math.min(1, t));
                        if (i === L[e]) return;
                        L[e] = i;
                        let l = { ...L
                        };
                        for (let e of M) e(l)
                    },
                    progress: () => ({ ...L
                    }),
                    onChange: e => (M.add(e), () => void M.delete(e)),
                    claim: () => C ? null : (C = !0, setTimeout(() => {
                        H || (q(), D())
                    }, 1e3 * u.l), {
                        reveal: O,
                        finish: q
                    }),
                    revealed: P,
                    done: R,
                    settleFirstCommit() {
                        for (let e of f) A.has(e) || W(e, 1);
                        return !C && (C = !0, q(), !0)
                    }
                });
                for (let e of ["dom", "fonts", "images", "boot"]) G.expect(e);
                G.report("dom", 1);
                let Z = [...document.images].filter(e => "lazy" !== e.loading && !e.closest(".f-ld"));
                Z.length || G.report("images", 1);
                let ee = 0;
                for (let e of Z)(e.complete ? Promise.resolve() : new Promise(t => {
                    e.addEventListener("load", t, {
                        once: !0
                    }), e.addEventListener("error", t, {
                        once: !0
                    })
                })).then(() => e.naturalWidth ? e.decode() : void 0).catch(() => {}).finally(() => G.report("images", ++ee / Z.length));
                let et = (V = {
                        prepare: e => !U && (0, S.h)(e)
                    }, $ = null, addEventListener("pointerdown", F = e => {
                        $ = {
                            x: _(e.clientX / innerWidth),
                            y: _(e.clientY / innerHeight),
                            t: performance.now()
                        };
                        let t = e.target ? .closest ? .("a[href]");
                        t instanceof HTMLAnchorElement && (t.hasAttribute("data-nav") || !(0, b.f)(t, e)) && V.prepare({
                            x: $.x,
                            y: $.y
                        })
                    }, {
                        capture: !0,
                        passive: !0
                    }), {
                        origin: () => $ && performance.now() - $.t < 1e3 * x.$ ? {
                            x: $.x,
                            y: $.y
                        } : w,
                        destroy: () => removeEventListener("pointerdown", F, {
                            capture: !0
                        })
                    }),
                    ei = (0, j.F)({
                        router: e,
                        scroll: () => X,
                        history: K,
                        reduced: () => U,
                        origin: et.origin,
                        firstRevealed: G.revealed,
                        onFirstCommit() {
                            G.report("boot", 1), G.settleFirstCommit() && I.classList.remove("f-loading")
                        }
                    }),
                    el = () => (0, v.v)({
                        gsap: d.e,
                        ScrollTrigger: c.f,
                        scroll: X,
                        reduced: U,
                        phone: r.u,
                        readiness: G,
                        transition: ei,
                        history: K
                    });
                el();
                let er = !0;
                document.fonts ? .ready.then(() => {
                    er && (G.report("fonts", 1), (0, v.W)())
                }), U || l.f.warm(), G.revealed.then(() => {
                    er && I.classList.add("motion-revealed")
                });
                let es = (0, g.N)(e => {
                    (U = e) || l.f.warm(), (0, v.t)(), J(), X.destroy(), J = (X = (0, y.f)({
                        reduced: U,
                        gsap: d.e,
                        ScrollTrigger: c.f
                    })).onScroll(e => K.saveSoon(e)), el()
                });
                return I.classList.contains("motion-timeout") || I.classList.add("motion"), I.classList.add("motion-live"), () => {
                    er = !1, es(), (0, v.t)(), ei.destroy(), et.destroy(), l.f.destroy(), c.f.removeEventListener("refresh", Q), J(), K.destroy(), X.destroy(), I.classList.remove("motion-live", "motion-revealed")
                }
            })(n), [n]), e
        }], 39394)
    }, 70616, e => {
        var t = e.i(18050),
            i = e.i(18566),
            l = e.i(71645),
            r = e.i(57210);
        e.s(["default", 0, function() {
            let s = (0, l.useRef)(null),
                n = (0, l.useRef)(null),
                o = (0, i.useSelectedLayoutSegments)().join("/");
            return (0, l.useLayoutEffect)(() => (0, r.O)("ribbon", t => (function(t, i, l) {
                let r = document.getElementById("work");
                if (!r ? .querySelector(".proj__card")) return;
                t.readiness.expect("ribbon");
                let s = null;
                return e.A(90743).then(({
                    initRibbon: e
                }) => {
                    if (t.signal.aborted) return;
                    let n = e(i);
                    l.current = n, n ? s = n.mount(t, r) : t.readiness.report("ribbon", 1)
                }).catch(() => t.readiness.report("ribbon", 1)), () => s ? .()
            })(t, s.current, n)), [o]), (0, l.useLayoutEffect)(() => () => {
                n.current ? .destroy(), n.current = null
            }, []), (0, t.jsx)("canvas", {
                ref: s,
                className: "gl",
                "aria-hidden": "true",
                hidden: !0
            })
        }])
    }, 33586, e => {
        var t = e.i(91699),
            i = e.i(66657),
            l = e.i(10629),
            r = e.i(98631),
            s = e.i(15391);
        let n = new Map;
        var o = e.i(46281);
        e.s(["default", 0, function({
            base: e
        }) {
            return (0, o.f)("tile-videos", o => (function(e, o) {
                if (e.reduced) return () => {};
                let a = null,
                    d = (0, i.A)("ribbon", d => {
                        a ? .(), a = d ? function(e, o, a) {
                            var d, c;
                            let h, u, p, m, f, g = new AbortController,
                                v = {
                                    signal: g.signal
                                },
                                y = new Map,
                                j = null,
                                b = !1,
                                x = !1,
                                w = e => {
                                    clearTimeout(e.watchdog), e.watchdog = void 0
                                },
                                _ = t => {
                                    if (g.signal.aborted) return;
                                    let i = t.video,
                                        r = !!t.src && !t.error && !document.hidden && (j ? j === t.slug : t.inView);
                                    !r || x || t.shown ? w(t) : t.watchdog ? ? = setTimeout(() => {
                                        t.watchdog = void 0, t.src ? .codec === "av1" ? k(t, (0, s.i)({
                                            phone: e.phone(),
                                            sources: t.sources
                                        })) : N(t, "no first frame")
                                    }, 1e3 * l.q), r && i.paused && !x ? i.play().catch(e => {
                                        "NotAllowedError" === e.name && E()
                                    }) : r || i.paused || i.pause()
                                },
                                S = () => y.forEach(_),
                                E = () => {
                                    if (x) return;
                                    x = !0, y.forEach(w);
                                    let e = () => {
                                        for (let t of (x = !1, l.f)) removeEventListener(t, e, !0);
                                        S()
                                    };
                                    for (let t of l.f) addEventListener(t, e, {
                                        capture: !0,
                                        passive: !0,
                                        signal: g.signal
                                    })
                                },
                                k = (t, i) => {
                                    w(t), t.src = i, t.video.preload = e.phone() ? "metadata" : "auto", t.video.src = i.url, _(t)
                                },
                                N = (e, t) => {
                                    e.error || (e.error = t, w(e), e.shown && e.index >= 0 && o.setSource(e.index, null), e.shown = !1, e.video.pause(), e.video.preload = "none", e.video.removeAttribute("src"), e.video.load())
                                },
                                T = t => {
                                    if (t.src || t.error || !b || !(t.near || j === t.slug)) return;
                                    let i = t.video.canPlayType(l.d.av1);
                                    k(t, (0, s.m)({
                                        canPlayAv1: i,
                                        phone: e.phone(),
                                        sources: t.sources
                                    }))
                                },
                                L = e => {
                                    if (!e.shown && !e.error && !(e.video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA)) {
                                        if (! function(e) {
                                                try {
                                                    var t;
                                                    let i, l;
                                                    return "function" == typeof VideoFrame ? new VideoFrame(e).close() : (t = e, (i = document.createElement("canvas")).width = i.height = 1, l = i.getContext("2d", {
                                                        willReadFrequently: !0
                                                    }), l ? .drawImage(t, 0, 0, 1, 1), l ? .getImageData(0, 0, 1, 1)), !0
                                                } catch (e) {
                                                    return !(e instanceof DOMException && "SecurityError" === e.name)
                                                }
                                            }(e.video)) return N(e, "cross-origin frame");
                                        w(e), e.shown = !0, e.index >= 0 && o.setSource(e.index, e.video)
                                    }
                                },
                                A = (e, i) => {
                                    let l, s = ((l = n.get(e)) || ((l = document.createElement("video")).muted = l.defaultMuted = l.loop = l.playsInline = !0, l.setAttribute("muted", ""), l.setAttribute("playsinline", ""), l.setAttribute("loop", ""), l.setAttribute("aria-hidden", "true"), l.disablePictureInPicture = !0, l.crossOrigin = "anonymous", n.set(e, l)), l.preload = "none", l),
                                        o = {
                                            slug: e,
                                            sources: (0, t.f)(a, i),
                                            video: s,
                                            src: null,
                                            shown: !1,
                                            playing: !1,
                                            error: null,
                                            near: !1,
                                            inView: !1,
                                            index: -1,
                                            watchdog: void 0
                                        };
                                    return s.addEventListener("loadeddata", () => L(o), v), s.addEventListener("playing", () => {
                                        o.playing = !0, L(o)
                                    }, v), s.addEventListener("pause", () => {
                                        o.playing = !1, requestAnimationFrame(() => _(o))
                                    }, v), s.addEventListener("error", () => N(o, `media error ${s.error?.code??""}`), v), (0, r.V)(s), y.set(e, o), o
                                },
                                M = (d = {
                                    bound(e) {
                                        for (let e of y.values()) e.index = -1, e.inView = !1;
                                        for (let {
                                                slug: t,
                                                stem: i,
                                                index: l
                                            } of e) {
                                            let e = y.get(t) ? ? A(t, i);
                                            e.index = l, e.shown && o.setSource(l, e.video)
                                        }
                                        S()
                                    },
                                    near(e) {
                                        let t = y.get(e);
                                        t && (t.near = !0, T(t))
                                    },
                                    view(e, t) {
                                        let i = y.get(e);
                                        i && (i.inView = t, _(i))
                                    }
                                }, c = e => !!y.get(e) ? .near, h = new Map, u = new IntersectionObserver(e => {
                                    for (let t of e) {
                                        let e = h.get(t.target);
                                        e && t.isIntersecting && (u.unobserve(t.target), d.near(e))
                                    }
                                }, {
                                    rootMargin: l.d.near
                                }), p = new IntersectionObserver(e => {
                                    for (let t of e) {
                                        let e = h.get(t.target);
                                        e && d.view(e, t.isIntersecting)
                                    }
                                }), m = () => {
                                    u.disconnect(), p.disconnect(), h.clear();
                                    let e = [];
                                    for (let t = 0; t < o.count; t++) {
                                        let i = o.slug(t),
                                            l = document.querySelector(`#track .proj[data-slug="${CSS.escape(i)}"]`),
                                            r = l ? .dataset.video;
                                        l && r && (h.set(l, i), e.push({
                                            slug: i,
                                            stem: r,
                                            index: t
                                        }), c(i) || u.observe(l), p.observe(l))
                                    }
                                    d.bound(e)
                                }, f = o.onChange(m), m(), () => {
                                    f(), u.disconnect(), p.disconnect()
                                });
                            e.readiness.done.then(() => {
                                g.signal.aborted || (b = !0, y.forEach(T))
                            }), document.addEventListener("visibilitychange", S, v);
                            let C = {
                                    video(e) {
                                        let t = y.get(e);
                                        return t && !t.error ? t.video : null
                                    },
                                    exclusive(e) {
                                        j = e, y.forEach(T), S()
                                    }
                                },
                                P = (0, i.M)("videos", C);
                            return { ...C,
                                destroy() {
                                    for (let e of (g.abort(), M(), P(), y.values())) w(e), e.shown && e.index >= 0 && o.setSource(e.index, null), e.video.pause(), e.video.removeAttribute("src"), e.video.load(), (0, r.m)(e.video)
                                }
                            }
                        }(e, d.tiles, o).destroy : null
                    });
                return () => {
                    d(), a ? .()
                }
            })(o, e)), null
        }], 33586)
    }, 45010, e => {
        let t;
        var i = e.i(18050),
            l = e.i(18566),
            r = e.i(71645),
            s = e.i(46281),
            n = e.i(25164);
        let o = {
            full: "pj__fig pj__fig--extra",
            half: "pj__fig pj__fig--extra pj__fig--half",
            third: "pj__fig pj__fig--extra pj__fig--third",
            side: "pj__fig pj__fig--extra pj-st__img"
        };

        function a({
            img: e,
            caption: t,
            variant: l = "full",
            ratio: r = `${e.width} / ${e.height}`,
            eager: s = !1,
            reveal: d = !1
        }) {
            return (0, i.jsxs)("figure", {
                className: o[l],
                "data-pg": d ? "" : void 0,
                "data-pr": d ? "fig" : void 0,
                children: [(0, i.jsx)("div", {
                    className: "pj__frame",
                    style: {
                        aspectRatio: r
                    },
                    children: (0, i.jsx)("div", {
                        className: "pj__par",
                        children: (0, i.jsx)(n.default, {
                            src: e.src,
                            width: e.width,
                            height: e.height,
                            alt: e.alt,
                            loading: s ? "eager" : void 0
                        })
                    })
                }), null != t && (0, i.jsx)("figcaption", {
                    className: "pj__cap",
                    "data-pr": d ? "lines" : void 0,
                    children: t
                })]
            })
        }
        var d = e.i(86817),
            c = e.i(69553),
            h = e.i(34479);
        let u = e => String(e).padStart(2, "0"),
            p = () => (0, i.jsx)("span", {
                className: "ps__rule",
                "data-pr": "rule",
                "aria-hidden": "true"
            });

        function m({
            items: e,
            lede: t
        }) {
            let l = t ? e.findIndex(({
                b: e
            }) => "p" === e.type) : -1;
            return (0, i.jsx)("div", {
                className: "pj-st__body",
                children: e.map(({
                    b: e
                }, t) => {
                    switch (e.type) {
                        case "p":
                            return (0, i.jsx)("p", {
                                className: t === l ? "pj-st__p pj-st__p--lede" : "pj-st__p",
                                "data-pr": "lines",
                                children: e.text
                            }, t);
                        case "ul":
                            return (0, i.jsx)("ul", {
                                className: "ps__rows",
                                children: e.items.map((e, t) => (0, i.jsx)("li", {
                                    "data-pr": "el",
                                    children: e
                                }, t))
                            }, t);
                        case "ol":
                            return (0, i.jsx)("dl", {
                                className: "pj-st__list ps__list--n",
                                children: e.items.map((e, t) => (0, i.jsxs)("div", {
                                    "data-pr": "el",
                                    children: [(0, i.jsx)("dt", {
                                        children: u(t + 1)
                                    }), (0, i.jsx)("dd", {
                                        children: e
                                    })]
                                }, t))
                            }, t);
                        case "code":
                            return (0, i.jsxs)("figure", {
                                className: "ps__fig ps__fig--code",
                                "data-pr": "fig",
                                children: [(0, i.jsx)("div", {
                                    className: "pj__frame",
                                    children: (0, i.jsx)("pre", {
                                        className: "ps__code",
                                        children: e.text
                                    })
                                }), (0, i.jsx)("figcaption", {
                                    className: "pj__cap",
                                    "data-pr": "lines",
                                    children: e.file
                                })]
                            }, t)
                    }
                })
            })
        }

        function f({
            loop: e
        }) {
            return (0, i.jsxs)("section", {
                className: "pj-st ps--list",
                "data-pg": !0,
                children: [(0, i.jsx)(p, {}), (0, i.jsx)("h2", {
                    className: "pj-st__title",
                    "data-pr": "lines",
                    children: e.title
                }), (0, i.jsx)("dl", {
                    className: "pj-st__list ps__list--n ps__list--loop",
                    children: e.steps.map((e, t) => (0, i.jsxs)("div", {
                        "data-pr": "el",
                        children: [(0, i.jsx)("dt", {
                            children: u(t + 1)
                        }), (0, i.jsxs)("dd", {
                            children: [(0, i.jsx)("span", {
                                className: "ps__step",
                                children: e.name
                            }), (0, i.jsx)("span", {
                                className: "me" === e.who || "both" === e.who ? "ps__who ps__who--me" : "ps__who",
                                children: h.f.post.who[e.who]
                            }), (0, i.jsx)("span", {
                                className: "ps__t",
                                children: e.text
                            })]
                        })]
                    }, t))
                }), (0, i.jsx)("p", {
                    className: "pj__cap ps__cap--list",
                    "data-pr": "lines",
                    children: e.caption
                })]
            })
        }

        function g({
            body: e,
            eager: t = !1
        }) {
            let l = (0, c.z)(e),
                r = [],
                s = [-1, ...e.flatMap((e, t) => "h" === e.type ? [t] : [])];
            return s.forEach((n, o) => {
                let c = s[o + 1] ? ? e.length,
                    h = -1 === n,
                    u = !0,
                    g = [],
                    v = () => {
                        if (!g.length && !(u && !h)) return;
                        let t = u && !h ? e[n] : null,
                            s = g[0] ? .i ? ? n;
                        r.push((0, i.jsxs)("section", {
                            className: h && u ? "pj-st ps--text ps--intro" : "pj-st ps--text",
                            "data-pg": !0,
                            children: [!h && (0, i.jsx)(p, {}), t && (0, i.jsxs)(i.Fragment, {
                                children: [(0, i.jsx)("p", {
                                    className: "pj-st__label",
                                    children: (0, i.jsx)(d.f, {
                                        children: (0, i.jsx)("span", {
                                            className: "pj-st__n",
                                            children: l[n]
                                        })
                                    })
                                }), (0, i.jsx)("h2", {
                                    className: "pj-st__title",
                                    "data-pr": "lines",
                                    children: t.text
                                })]
                            }), (0, i.jsx)(m, {
                                items: g,
                                lede: h && u
                            })]
                        }, s)), u = !1, g = []
                    };
                for (let l = n + 1; l < c; l++) {
                    let s = e[l];
                    switch (s.type) {
                        case "q":
                            v(), r.push((0, i.jsx)("section", {
                                className: "pj-st pj-st--statement",
                                "data-pg": !0,
                                children: (0, i.jsx)("p", {
                                    className: "pj-st__statement",
                                    "data-pr": "lines",
                                    children: s.text
                                })
                            }, l));
                            break;
                        case "loop":
                            v(), r.push((0, i.jsx)(f, {
                                loop: s
                            }, l));
                            break;
                        case "fig":
                            v(), r.push((0, i.jsx)(a, {
                                img: s.img,
                                caption: s.cap,
                                ratio: "16 / 9",
                                eager: t,
                                reveal: !0
                            }, l));
                            break;
                        case "h":
                            break;
                        default:
                            g.push({
                                b: s,
                                i: l
                            })
                    }
                }
                v()
            }), (0, i.jsx)("div", {
                className: "pj-story",
                children: r
            })
        }
        var v = e.i(8089);

        function y({
            href: e,
            label: t,
            current: l,
            peek: r = !1
        }) {
            let s = (0, i.jsxs)(d.f, {
                children: [r ? (0, i.jsx)("span", {
                    className: "pj-crumb__up",
                    children: t
                }) : (0, i.jsx)(v.SiteLink, {
                    className: "pj-crumb__up",
                    href: e,
                    children: t
                }), (0, i.jsx)("span", {
                    className: "pj-crumb__sep",
                    "aria-hidden": "true",
                    children: "›"
                }), (0, i.jsx)("span", {
                    className: "pj-crumb__here",
                    "aria-current": r ? void 0 : "page",
                    children: l
                })]
            });
            return r ? (0, i.jsx)("p", {
                className: "pj-crumb",
                children: s
            }) : (0, i.jsx)("nav", {
                className: "pj-crumb",
                "aria-label": h.f.crumbAria,
                children: s
            })
        }

        function j({
            items: e
        }) {
            return (0, i.jsx)("dl", {
                className: "pj__meta",
                children: e.map(({
                    label: e,
                    values: t
                }) => (0, i.jsxs)("div", {
                    children: [(0, i.jsx)("dt", {
                        children: (0, i.jsx)(d.f, {
                            children: e
                        })
                    }), (0, i.jsx)("dd", {
                        children: t.map((e, t) => (0, i.jsx)(d.f, {
                            children: e
                        }, t))
                    })]
                }, e))
            })
        }
        var b = e.i(53021),
            x = e.i(44196);

        function w({
            post: e,
            author: t,
            peek: l
        }) {
            let r = [{
                label: e.topics.length > 1 ? h.f.post.topics : h.f.post.topic,
                values: e.topics.map(e => b.h && !l ? (0, i.jsx)(v.SiteLink, {
                    className: "pj__topic",
                    href: (0, b.Y)(e.slug),
                    children: e.name
                }, e.slug) : e.name)
            }, {
                label: h.f.post.published,
                values: [(0, i.jsx)("time", {
                    dateTime: e.date,
                    children: (0, c.C)(e.date, "dmy")
                }, "date")]
            }, {
                label: h.f.post.readingTime,
                values: [(0, c.d)(e.body).label]
            }, {
                label: h.f.post.author,
                values: [t]
            }];
            return (0, i.jsxs)("div", {
                className: "pj__info",
                "data-pg": l ? void 0 : "",
                "aria-hidden": l || void 0,
                children: [(0, i.jsxs)("div", {
                    className: "pj__head",
                    children: [(0, i.jsx)(y, {
                        href: "/insights",
                        label: h.f.crumb.insights,
                        current: e.title,
                        peek: l
                    }), l ? (0, i.jsx)("p", {
                        className: "pj__title",
                        children: e.title
                    }) : (0, i.jsx)("h1", {
                        className: "pj__title",
                        tabIndex: -1,
                        "data-pr": "lines",
                        children: e.title
                    }), (0, i.jsx)("p", {
                        className: "pj__kind",
                        children: (0, i.jsx)(d.f, {
                            children: `${e.topics[0].name}, ${(0,c.C)(e.date,"dmy")}`
                        })
                    })]
                }), (0, i.jsxs)("div", {
                    className: "pj__body",
                    children: [(0, i.jsx)("p", {
                        className: "pj__desc",
                        "data-pr": l ? void 0 : "lines",
                        children: e.excerpt
                    }), (0, i.jsx)(j, {
                        items: r
                    }), (0, i.jsx)("p", {
                        className: "pj__link",
                        children: (0, i.jsx)(d.f, {
                            children: l ? (0, i.jsx)("span", {
                                className: "pp-copy",
                                children: h.f.post.copyLink
                            }) : (0, i.jsx)(x.default, {})
                        })
                    })]
                })]
            })
        }

        function _({
            post: e,
            author: t
        }) {
            return (0, i.jsxs)(i.Fragment, {
                children: [(0, i.jsx)(w, {
                    post: e,
                    author: t,
                    peek: !1
                }), (0, i.jsx)("figure", {
                    className: "pj__fig pj__fig--hero",
                    "data-pg": !0,
                    "data-pr": "fig",
                    children: (0, i.jsx)(n.default, {
                        src: e.image.src,
                        width: e.image.width,
                        height: e.image.height,
                        alt: e.image.alt,
                        preload: !0,
                        fetchPriority: "high"
                    })
                })]
            })
        }

        function S({
            post: e,
            author: t
        }) {
            return (0, i.jsxs)(i.Fragment, {
                children: [(0, i.jsx)(w, {
                    post: e,
                    author: t,
                    peek: !0
                }), (0, i.jsx)("div", {
                    className: "pj__fig pj__fig--hero",
                    "aria-hidden": "true",
                    children: (0, i.jsx)(n.default, {
                        src: e.image.src,
                        width: e.image.width,
                        height: e.image.height,
                        alt: ""
                    })
                })]
            })
        }
        var E = e.i(5219),
            k = e.i(17811),
            N = e.i(56385),
            T = e.i(41116);
        let L = e => (0, k.R)([e[0] / 255, e[1] / 255, e[2] / 255]);

        function A(e, t) {
            return {
                aBg: L((0, N.B)(e.bg)),
                bBg: L((0, N.B)(t.bg)),
                aFg: (0, N.B)(e.fg),
                bFg: (0, N.B)(t.fg),
                a: e,
                b: t
            }
        }
        let M = e => Math.min(1, Math.max(0, e)),
            C = e => -(Math.cos(Math.PI * e) - 1) / 2;

        function P(e, t) {
            let i, l = (t.phone ? T.k.phoneBand : T.k.band) * t.vh,
                r = t.phone ? T.k.phonePace : T.k.pace,
                s = T.k.at * t.vh;
            t.limit > 0 && s + l > t.limit && (s = Math.max(0, t.limit - l));
            let n = M((t.y - s) / l),
                o = t.reduced ? +(n >= .5) : t.phone ? C(M((n - r) / (1 - 2 * r))) : C((i = M((n - r) / (1 - r - r))) * i * (3 - 2 * i)),
                a = (0, k.z)([0, 1, 2].map(t => e.aBg[t] + (e.bBg[t] - e.aBg[t]) * o)),
                d = (0, k.a)(e.bFg, a) > (0, k.a)(e.aFg, a) ? e.b.fg : e.a.fg;
            return {
                bg: (0, k.$)(L(a)),
                fg: d
            }
        }
        var R = e.i(22016);

        function z({
            href: e,
            ariaLabel: t,
            count: l,
            label: r,
            title: s,
            images: o
        }) {
            let a = String(l).padStart(2, "0");
            return (0, i.jsxs)(R.default, {
                prefetch: !1,
                className: "pj-teaser__card pj-teaser__card--all",
                href: e,
                "data-close": !0,
                "aria-label": t,
                children: [(0, i.jsxs)("span", {
                    className: "pj-teaser__label",
                    children: [r, " ", (0, i.jsxs)("span", {
                        className: "pj-teaser__n",
                        children: [a, " / ", a]
                    })]
                }), (0, i.jsxs)("span", {
                    className: "pj-all",
                    children: [(0, i.jsx)("span", {
                        className: "pj-all__t",
                        children: s
                    }), (0, i.jsx)("span", {
                        className: "pj-all__strip",
                        style: {
                            "--strip-n": o.length
                        },
                        children: o.map(e => (0, i.jsx)(n.default, {
                            src: e.src,
                            width: e.width,
                            height: e.height,
                            alt: ""
                        }, e.src))
                    })]
                })]
            })
        }
        let H = () => (0, i.jsx)("svg", {
            className: "pj-end__arr",
            viewBox: "0 0 16 16",
            "aria-hidden": "true",
            children: (0, i.jsx)("path", {
                d: "M2 8h11M9 4l4 4-4 4"
            })
        });

        function O({
            kind: e,
            theme: t,
            ruled: l = !1
        }) {
            let r = "project" === e,
                s = {
                    "--pj-bg": t.bg,
                    "--pj-fg": t.fg
                },
                n = r ? {
                    href: "/work",
                    label: h.f.end.allWork
                } : {
                    href: "/insights",
                    label: h.f.end.allInsights
                },
                o = (e, t, l) => {
                    let s = (0, i.jsxs)(v.SiteLink, {
                        className: l ? "pj-end__go pj-end__go--main" : "pj-end__go",
                        href: e,
                        children: [t, (0, i.jsx)(H, {})]
                    });
                    return r ? (0, i.jsx)(d.f, {
                        children: s
                    }) : (0, i.jsx)("span", {
                        "data-pr": "el",
                        children: s
                    })
                };
            return (0, i.jsxs)("section", {
                className: l ? "pj-end pj-end--ruled pj-st" : "pj-end pj-st",
                style: s,
                "data-pg": r ? void 0 : "",
                children: [r ? (0, i.jsx)("h2", {
                    className: "pj-st__title pj-end__title",
                    children: (0, i.jsx)(d.f, {
                        children: h.f.end.title
                    })
                }) : (0, i.jsx)("h2", {
                    className: "pj-st__title pj-end__title",
                    "data-pr": "lines",
                    children: h.f.end.title
                }), (0, i.jsxs)("p", {
                    className: "pj-end__links",
                    children: [o("/contact", h.f.end.start, !0), o(n.href, n.label, !1)]
                })]
            })
        }

        function q({
            theme: e,
            closeHref: t,
            closeLabel: l,
            chrome: r = !0,
            head: s,
            children: n,
            end: o,
            after: a
        }) {
            let d = {
                "--pj-bg": e.a.bg,
                "--pj-fg": e.a.fg,
                "--pj-b-bg": e.b.bg,
                "--pj-b-fg": e.b.fg
            };
            return (0, i.jsxs)("div", {
                className: "pj",
                style: d,
                children: [r && (0, i.jsx)("div", {
                    className: "ov-bar",
                    children: (0, i.jsx)(R.default, {
                        prefetch: !1,
                        className: "ov-close",
                        href: t,
                        "data-close": !0,
                        children: l
                    })
                }), (0, i.jsxs)("main", {
                    className: "pj-wrap",
                    id: "main",
                    tabIndex: r ? -1 : void 0,
                    children: [(0, i.jsxs)("article", {
                        className: "pj-sheet",
                        children: [s, (0, i.jsx)("div", {
                            className: "pj-sheet__b",
                            children: n
                        }), o]
                    }), (0, i.jsx)("div", {
                        className: "pj-teaser",
                        children: a
                    })]
                })]
            })
        }

        function W({
            href: e,
            slug: t,
            theme: l,
            image: r,
            ariaLabel: s,
            children: o
        }) {
            let a = {
                "--pj-bg": l.bg,
                "--pj-fg": l.fg
            };
            return (0, i.jsxs)(R.default, {
                prefetch: !1,
                className: "pj-teaser__card",
                href: e,
                "data-next": t,
                "aria-label": s,
                style: a,
                children: [r && (0, i.jsx)(n.default, {
                    className: "pj-teaser__img",
                    src: r.src,
                    width: r.width,
                    height: r.height,
                    alt: ""
                }), o]
            })
        }

        function $({
            post: e,
            posts: t,
            site: l,
            chrome: r = !0,
            eager: s = !1
        }) {
            let n = (0, c.e)(t, e.slug),
                o = e.topics[0].theme;
            return (0, i.jsx)("div", {
                className: "pa",
                children: (0, i.jsx)(q, {
                    theme: {
                        a: o,
                        b: E.n
                    },
                    closeHref: "/insights",
                    closeLabel: h.f.post.close,
                    chrome: r,
                    head: (0, i.jsx)(_, {
                        post: e,
                        author: l.author
                    }),
                    end: (0, i.jsx)(O, {
                        kind: "post",
                        theme: o,
                        ruled: o.bg === E.n.bg
                    }),
                    after: "end" === n ? (0, i.jsx)(z, {
                        href: "/insights",
                        ariaLabel: h.f.post.endAria,
                        count: t.length,
                        label: l.endCard.label,
                        title: l.endCard.title,
                        images: t.map(e => e.image)
                    }) : (0, i.jsx)(W, {
                        href: `/insights/${n.slug}`,
                        slug: n.slug,
                        theme: function(e, t) {
                            let {
                                fg: i
                            } = P(A(e, t), {
                                y: 0,
                                vh: 1,
                                limit: 0,
                                phone: !1,
                                reduced: !1
                            });
                            return {
                                bg: e.bg,
                                fg: i
                            }
                        }(n.topics[0].theme, E.n),
                        ariaLabel: h.f.post.next(n.title),
                        children: (0, i.jsx)(S, {
                            post: n,
                            author: l.author
                        })
                    }),
                    children: (0, i.jsx)(g, {
                        body: e.body,
                        eager: s
                    })
                })
            })
        }
        let F = ["agency", "development", "brand"];

        function I({
            href: e,
            className: t,
            children: l
        }) {
            return (0, i.jsxs)("a", {
                className: t,
                href: e,
                target: "_blank",
                rel: "noopener noreferrer",
                children: [l, (0, i.jsx)("svg", {
                    className: "pj__arr",
                    viewBox: "0 0 16 16",
                    "aria-hidden": "true",
                    children: (0, i.jsx)("path", {
                        d: "M4.5 11.5l7-7M6 4.5h5.5V10"
                    })
                })]
            })
        }

        function B({
            name: e,
            url: t
        }) {
            return t ? (0, i.jsx)(I, {
                href: t,
                className: "pj__ext",
                children: e
            }) : e
        }

        function D({
            project: e
        }) {
            let t = F.flatMap(t => {
                    let l = e.credits.filter(e => e.role === t);
                    return l.length ? [{
                        label: h.f.project.credit[t],
                        values: l.map(e => (0, i.jsx)(B, { ...e
                        }, e.name))
                    }] : []
                }),
                l = [{
                    label: h.f.project.role,
                    values: [e.role]
                }, {
                    label: h.f.project.client,
                    values: [(0, i.jsx)(B, {
                        name: e.client,
                        url: e.clientUrl
                    }, "client")]
                }, ...t, {
                    label: h.f.project.year,
                    values: [e.year]
                }, ...e.services.length ? [{
                    label: h.f.project.services,
                    values: e.services
                }] : []];
            return (0, i.jsxs)(i.Fragment, {
                children: [(0, i.jsx)("figure", {
                    className: "pj__fig pj__fig--hero",
                    children: (0, i.jsx)(n.default, {
                        src: e.thumbnail.src,
                        width: e.thumbnail.width,
                        height: e.thumbnail.height,
                        alt: e.thumbnail.alt,
                        preload: !0,
                        fetchPriority: "high"
                    })
                }), (0, i.jsxs)("div", {
                    className: "pj__info",
                    children: [(0, i.jsxs)("div", {
                        className: "pj__head",
                        children: [(0, i.jsx)(y, {
                            href: "/work",
                            label: h.f.crumb.work,
                            current: e.title
                        }), (0, i.jsx)("h1", {
                            className: "pj__title",
                            tabIndex: -1,
                            children: (0, i.jsx)(d.f, {
                                children: e.title
                            })
                        }), (0, i.jsx)("p", {
                            className: "pj__kind",
                            children: (0, i.jsx)(d.f, {
                                children: `${e.kind}, ${e.year}`
                            })
                        })]
                    }), (0, i.jsxs)("div", {
                        className: "pj__body",
                        children: [(0, i.jsx)("p", {
                            className: "pj__desc",
                            "data-split": !0,
                            children: e.description
                        }), (0, i.jsx)(j, {
                            items: l
                        }), e.link && (0, i.jsx)("p", {
                            className: "pj__link",
                            children: (0, i.jsx)("span", {
                                className: "mask",
                                children: (0, i.jsx)(I, {
                                    href: e.link,
                                    className: "up",
                                    children: h.f.project.visit
                                })
                            })
                        })]
                    })]
                })]
            })
        }

        function V({
            n: e,
            label: t,
            className: l
        }) {
            return (0, i.jsx)("p", {
                className: l ? `pj-st__label ${l}` : "pj-st__label",
                children: (0, i.jsxs)(d.f, {
                    children: [(0, i.jsx)("span", {
                        className: "pj-st__n",
                        children: e
                    }), h.f.project.chapterRest(t)]
                })
            })
        }
        let Y = ({
                body: e
            }) => (0, i.jsx)("div", {
                className: "pj-st__body",
                children: e.map((e, t) => (0, i.jsx)("p", {
                    className: 0 === t ? "pj-st__p pj-st__p--lede" : "pj-st__p",
                    "data-split": !0,
                    children: e
                }, t))
            }),
            U = ({
                text: e
            }) => (0, i.jsx)("h2", {
                className: "pj-st__title",
                children: (0, i.jsx)(d.f, {
                    children: e
                })
            });

        function X({
            story: e,
            eager: t = !1
        }) {
            let l = (0, c.z)(e),
                r = 0;
            return (0, i.jsx)("div", {
                className: "pj-story",
                children: e.map((e, s) => {
                    let n = l[s] ? ? "";
                    switch (e.type) {
                        case "text":
                            return (0, i.jsxs)("section", {
                                className: "pj-st pj-st--text",
                                children: [(0, i.jsx)(V, {
                                    n: n,
                                    label: e.label
                                }), (0, i.jsx)(U, {
                                    text: e.title
                                }), (0, i.jsx)(Y, {
                                    body: e.body
                                })]
                            }, s);
                        case "list":
                            return (0, i.jsxs)("section", {
                                className: "pj-st pj-st--list",
                                children: [(0, i.jsx)(V, {
                                    n: n,
                                    label: e.label
                                }), (0, i.jsx)(U, {
                                    text: e.title
                                }), (0, i.jsx)("dl", {
                                    className: "pj-st__list",
                                    children: e.items.map((e, t) => (0, i.jsxs)("div", {
                                        className: "pj-rise",
                                        children: [(0, i.jsx)("dt", {
                                            children: e.k
                                        }), (0, i.jsx)("dd", {
                                            children: e.v
                                        })]
                                    }, t))
                                })]
                            }, s);
                        case "split":
                            return (0, i.jsxs)("section", {
                                className: r++ % 2 ? "pj-st pj-st--split is-flip" : "pj-st pj-st--split",
                                children: [(0, i.jsxs)("div", {
                                    className: "pj-st__side",
                                    children: [(0, i.jsx)(V, {
                                        n: n,
                                        label: e.label
                                    }), (0, i.jsx)(U, {
                                        text: e.title
                                    }), (0, i.jsx)(Y, {
                                        body: e.body
                                    })]
                                }), (0, i.jsx)(a, {
                                    img: e.img,
                                    caption: e.img.caption,
                                    variant: "side",
                                    eager: t
                                })]
                            }, s);
                        case "statement":
                            return (0, i.jsx)("section", {
                                className: "pj-st pj-st--statement",
                                children: (0, i.jsx)("p", {
                                    className: "pj-st__statement",
                                    "data-split": !0,
                                    children: (0, i.jsx)("span", {
                                        children: e.text
                                    })
                                })
                            }, s);
                        case "img":
                            return (0, i.jsx)(a, {
                                img: e.img,
                                caption: e.img.caption,
                                eager: t
                            }, s);
                        case "pair":
                        case "trio":
                            return (0, i.jsx)("div", {
                                className: "pair" === e.type ? "pj-st-pair" : "pj-st-trio",
                                children: e.items.map((l, r) => (0, i.jsx)(a, {
                                    img: l,
                                    caption: l.caption,
                                    variant: "pair" === e.type ? "half" : "third",
                                    eager: t
                                }, r))
                            }, s)
                    }
                })
            })
        }

        function K({
            project: e,
            projects: t,
            site: l,
            chrome: r = !0,
            eager: s = !1
        }) {
            let n = (0, c.E)(t, e.slug);
            return (0, i.jsx)(q, {
                theme: e.theme,
                closeHref: "/",
                closeLabel: h.f.project.close,
                chrome: r,
                head: (0, i.jsx)(D, {
                    project: e
                }),
                end: (0, i.jsx)(O, {
                    kind: "project",
                    theme: e.theme.a,
                    ruled: e.theme.a.bg === e.theme.b.bg
                }),
                after: "end" === n ? (0, i.jsx)(z, {
                    href: "/",
                    ariaLabel: h.f.project.endAria,
                    count: t.length,
                    label: l.endCard.label,
                    title: l.endCard.title,
                    images: t.map(e => e.thumbnail)
                }) : (0, i.jsx)(W, {
                    href: `/work/${n.slug}`,
                    slug: n.slug,
                    theme: n.theme.a,
                    image: n.thumbnail,
                    ariaLabel: h.f.project.next(n.title)
                }),
                children: (0, i.jsx)(X, {
                    story: e.story,
                    eager: s
                })
            })
        }
        var J = e.i(1537),
            Q = e.i(27773),
            G = e.i(50929),
            Z = e.i(66657),
            ee = e.i(67521),
            et = e.i(51034),
            ei = e.i(17724),
            el = e.i(89970);
        let er = T.r.flight,
            es = T.r.flightDelayOnClose,
            en = {
                duration: .3,
                ease: "power2.out"
            },
            eo = {
                duration: .35,
                ease: "power1.out"
            },
            ea = e => document.documentElement.classList.toggle("pj-flying", e),
            ed = e => (parseFloat(getComputedStyle(e).borderRadius) || 0) * (e.getBoundingClientRect().width / e.offsetWidth || 1),
            ec = e => Math.pow(e, T.r.flatPow);
        var eh = e.i(91699),
            eu = e.i(10629),
            ep = e.i(98631),
            em = e.i(15391);
        let ef = T.r.reduced,
            eg = new WeakMap,
            ev = null,
            ey = e => eg.get(e.el) ? ? null,
            ej = e => el.e.fromTo(e, {
                "--pj-vid": 0
            }, {
                "--pj-vid": 1,
                ...ef,
                overwrite: !0
            }),
            eb = ["#hero", ".atf-what-box", ".f-work__head", "#chapters", "#foot", ".topbar"],
            ex = () => eb.flatMap(e => {
                let t = document.querySelector(e);
                return t ? [t] : []
            }),
            ew = ["SCRIPT", "STYLE", "LINK", "TEMPLATE", "NEXT-ROUTE-ANNOUNCER"],
            e_ = e => [...document.body.children].filter(t => t instanceof HTMLElement && t !== e && !t.hidden && !ew.includes(t.tagName) && !t.matches("svg[aria-hidden], .f-ld"));
        var eS = e.i(30036);

        function eE() {
            if (void 0 === t) {
                let e = document.createElement("canvas").getContext("webgl2");
                e ? .getExtension("WEBGL_lose_context") ? .loseContext(), t = null !== e
            }
            return t
        }
        var ek = e.i(60138);
        let eN = null,
            eT = null,
            eL = {
                get gsap() {
                    return eT.gsap
                },
                get overlay() {
                    return eT.overlay
                },
                get scroller() {
                    return eT.scroller
                },
                scroll: () => eT.scroll(),
                live: () => eT.live(),
                get reduced() {
                    return eT.reduced
                },
                get light() {
                    return eT.light
                }
            };
        var eA = e.i(1603),
            eM = e.i(88718);
        let eC = T.r.edge,
            eP = T.r.touch,
            eR = T.r.pull,
            ez = 2 * Math.PI * T.J,
            eH = (e, t, i) => Math.min(i, Math.max(t, e)),
            eO = () => ({
                target: 0,
                value: 0,
                vel: 0
            });

        function eq(e, t) {
            let i = Math.max(1, Math.ceil(t / .002)),
                l = t / i;
            for (let t = 0; t < i; t++) {
                let t = eC.stiffness * (e.target - e.value) - eC.damping * e.vel;
                e.vel += t * l, e.value += e.vel * l
            }
            0 === e.target && .01 > Math.abs(e.value) && .01 > Math.abs(e.vel) && (e.value = 0, e.vel = 0)
        }
        let eW = e => Math.min(1, Math.max(0, e));

        function e$(e, t) {
            let i = e || t,
                [l, r, s] = T.S.inset,
                n = i <= T.S.phoneAt ? l : i <= T.S.wideAt ? r : s,
                o = t <= 809.98 ? T.S.bar.phone : T.S.bar.desk,
                a = i <= T.S.phoneAt ? T.r.breathe.endStepPhone : T.r.breathe.endStep;
            return {
                vw: i,
                inset: n,
                bar: o,
                T: 1 - 2 * n / i,
                step: a,
                S: (i - 2 * (n + a)) / (i - 2 * n)
            }
        }
        let eF = e => ({
            scale: e.T,
            y: e.bar
        });

        function eI(e, t) {
            let i = e.limit - t;
            return e.limit > i ? eW((e.animated - i) / (e.limit - i)) : 0
        }
        let eB = new WeakSet;

        function eD(e, t) {
            t ? eB.add(e) : eB.delete(e)
        }
        let eV = (e, t) => {
            let i = document.createElement("span");
            return i.className = e, i.textContent = t, i
        };

        function eY(e) {
            e.dataset.text ? ? = (e.textContent ? ? "").trim();
            let t = e.dataset.text.split(/\s+/).map(e => eV("w", e));
            e.replaceChildren(...t.flatMap((e, t) => t ? [" ", e] : [e]));
            let i = [],
                l = null;
            for (let e of t) e.offsetTop !== l && (i.push([]), l = e.offsetTop), i[i.length - 1].push(e.textContent ? ? "");
            return e.replaceChildren(...i.flatMap((e, t) => {
                let i = document.createElement("span");
                return i.className = "mask", i.append(eV("up", e.join(" "))), t ? [" ", i] : [i]
            })), e.dataset.w = String(e.clientWidth), i.length
        }

        function eU(e, {
            force: t = !1
        } = {}) {
            for (let i of e.querySelectorAll("[data-split]")) {
                if (!i.isConnected || void 0 === i.dataset.text || !t && String(i.clientWidth) === i.dataset.w) continue;
                let e = [...i.querySelectorAll(".mask")].map(e => e.textContent).join("\n"),
                    l = i.cloneNode(!1);
                i.after(l), eY(l);
                let r = [...l.querySelectorAll(".mask")].map(e => e.textContent).join("\n");
                l.remove(), i.dataset.w = String(i.clientWidth), r !== e && (el.e.killTweensOf(i.querySelectorAll(".up")), eY(i), eB.has(i) && el.e.set(i.querySelectorAll(".up"), {
                    yPercent: T.r.lines.yPercent
                }))
            }
        }
        let eX = "[data-split], .pj__meta, .pj__link, .pj-st__list",
            eK = `.pj__fig--extra, .pj__head, .pj-st, ${eX}`,
            eJ = new WeakSet,
            eQ = e => eJ.has(e),
            eG = e => e.classList.contains("pj__fig"),
            eZ = e => eG(e) ? "fig" : e.matches(eX) ? "text" : "head",
            e0 = e => [...e.querySelectorAll(".up")].filter(t => "text" === eZ(e) || !t.closest(eX)).filter(e => !e.closest(".is-liquid")),
            e1 = e => "text" === eZ(e) ? [...e.querySelectorAll(".pj-rise")] : [],
            e2 = e => e.querySelector(".pj__par, img"),
            e5 = e => parseFloat(getComputedStyle(e).borderRadius) || 0,
            e6 = e => e.matches("[data-split]") && !e.dataset.w;

        function e3(e, t) {
            for (let i of e.el.querySelectorAll(".pj__par")) {
                let e = i.closest(".pj__fig"),
                    l = i.firstElementChild;
                if (!l || e && eQ(e)) continue;
                let r = i.getBoundingClientRect();
                if (r.bottom < 0 || r.top > t) continue;
                let s = (r.top + r.height / 2 - t / 2) / (t / 2 + r.height / 2);
                l.style.transform = `translate3d(0, ${(-s*T.r.parallax*r.height).toFixed(1)}px, 0)`
            }
        }
        var e4 = e.i(74759),
            e7 = e.i(36416);
        let e9 = {
            lerp: .12,
            wheelMultiplier: 1.1
        };
        var e8 = e.i(52473);
        let te = {
                project: "pj-open",
                post: "po-open"
            },
            tt = {
                preventScroll: !0,
                focusVisible: !1
            };

        function ti(e, t) {
            let i = e.querySelector(t);
            if (!i) throw Error(`overlay: no ${t}`);
            return i
        }
        let tl = /^\/(work|insights)\/[^/]+\/?$/;

        function tr(e, t, i) {
            t.ctx.transition.revealed.then(async () => {
                var l;
                if (!t.still()) return;
                let r = eE() ? await (l = t.ribbon, new Promise(t => {
                    let i = () => {},
                        r = e => {
                            i(), clearTimeout(s), t(e)
                        },
                        s = setTimeout(() => r(l() ? .card(e) ? ? null), 3e3);
                    i = (0, ei.f)("overlay:leave", () => {
                        let t = l() ? .card(e);
                        t && r(t)
                    })
                })) : null;
                t.still() && i(r)
            })
        }
        let ts = T.r.flight,
            tn = T.r.sheetIn,
            to = T.r.flightDelayOnClose,
            ta = e => {
                let t = e.getBoundingClientRect();
                return {
                    left: t.left,
                    top: t.top,
                    width: t.width,
                    height: t.height
                }
            },
            td = (e, t) => e.classList.toggle("po-wait", t);

        function tc(e, t, i) {
            let l = document.createElement("div");
            l.className = "po-fly", l.setAttribute("aria-hidden", "true");
            let r = e.querySelector(":scope > .pfx__l.is-on:not(.pfx__clone)") ? ? e,
                s = r instanceof HTMLImageElement ? r : r.querySelector("img");
            if (s) {
                let e = document.createElement("img");
                e.src = s.currentSrc || s.src, e.alt = "", e.decoding = "sync", l.append(e)
            }
            return l.style.borderRadius = i ? ? getComputedStyle(e).borderRadius, Object.assign(l.style, {
                left: `${t.left}px`,
                top: `${t.top}px`,
                width: `${t.width}px`,
                height: `${t.height}px`
            }), document.body.append(l), l
        }

        function th(e, t) {
            let i = document.createElement("div");
            i.className = "po-fly po-fly--title", i.textContent = t, i.setAttribute("aria-hidden", "true");
            let l = getComputedStyle(e),
                r = ta(e);
            return Object.assign(i.style, {
                left: `${r.left}px`,
                top: `${r.top}px`,
                width: `${r.width}px`,
                fontSize: l.fontSize,
                lineHeight: l.lineHeight,
                letterSpacing: l.letterSpacing,
                fontWeight: l.fontWeight,
                color: l.color
            }), document.body.append(i), i
        }
        let tu = e => {
            let t = getComputedStyle(e);
            return {
                fontSize: t.fontSize,
                lineHeight: t.lineHeight,
                letterSpacing: t.letterSpacing
            }
        };

        function tp(e, t) {
            t.hero ? .classList.add("is-live");
            let {
                card: i,
                ribbon: l
            } = e;
            i && (i.uniforms.u_flat.value = 1, l ? .endFlight(i, {
                hidden: !0
            }))
        }
        let tm = T.r.flight,
            tf = T.r.sheetIn,
            tg = tf.at + tf.textAfter,
            tv = T.r.flightDelayOnClose,
            ty = {
                duration: tf.duration,
                ease: tf.ease
            },
            tj = {
                duration: .5,
                ease: "power1.out"
            },
            tb = T.r.overlayOut,
            {
                homeOut: tx,
                homeIn: tw
            } = T.r,
            t_ = "--ov-a",
            tS = (e, t) => Number(e.gsap.getProperty(t, "opacity")),
            tE = T.r.handoff;

        function tk(e, t) {
            if (e.gsap.set(e.els.bar, {
                    autoAlpha: 1
                }), "post" === e.kind) return e.gsap.set(e.hosts, {
                autoAlpha: 0
            }), null;
            let {
                card: i
            } = e;
            return i && e.home.parkCard(null, i), e.home.homeState(i, !0), tp(e, t), null
        }
        let tN = T.r.reduced;

        function tT(e, t) {
            let {
                gsap: i,
                els: l,
                card: r,
                ribbon: s
            } = e;
            t.frozen = !0;
            let n = i.timeline();
            return (n.to(l.root, {
                autoAlpha: 0,
                ...tN
            }, 0), "post" === e.kind) ? n.to(e.hosts, {
                autoAlpha: 1,
                y: 0,
                ...tN
            }, 0) : (n.to(ex(), {
                autoAlpha: 1,
                ...tN
            }, 0), s && n.to(s.ui, {
                alpha: 1,
                ...tN
            }, 0), r && (n.to(e.home.others(r), {
                value: 1,
                ...tN
            }, 0), n.add(() => {
                s ? .endFlight(r, {
                    hidden: !1
                }), r.uniforms.u_flat.value = 0
            }, tN.duration))), n
        }
        let tL = e => !e.reduced && ("post" === e.kind || null !== e.card),
            tA = (e, t, i) => (tL(e) ? function(e, t, i) {
                var l, r;
                let s, n, {
                        gsap: o,
                        els: a,
                        card: d,
                        ribbon: c
                    } = e,
                    h = t.hero,
                    u = "project" === e.kind && d && c,
                    p = t.el.querySelector(".pj__title"),
                    m = i ? .media ? .isConnected ? i.media : null;
                if (!h || !u && !m && !(i ? .title && p)) return null;
                t.engine.freeze();
                let f = o.timeline();
                f.to([a.bar, a.pull], {
                    autoAlpha: 0,
                    ...tb
                }, 0), f.to(t.el, {
                    autoAlpha: 0,
                    ...tb
                }, 0), f.fromTo(a.root, {
                    [t_]: 1
                }, {
                    [t_]: 0,
                    ...tw
                }, tv);
                let {
                    box: g,
                    alpha0: v
                } = (s = ta(h), n = Math.min(1, Math.max(0, tS(e, t.el) * tS(e, t.sheet))), s.top + s.height < s.height / 3 && (s.top = -s.height * (2 / 3), n = 0), {
                    box: s,
                    alpha0: n
                });
                if (u) {
                    let i, r = ed(h);
                    h.classList.remove("is-live"), l = {
                        ribbon: c,
                        radius: r
                    }, d.uniforms.u_flat.value = 1, d.uniforms.u_alpha.value = v, ea(!0), i = l.ribbon.startFlight(d, {
                        figure: () => g,
                        radius: l.radius,
                        ease: el.e.parseEase(er.ease),
                        p: 1,
                        back: !0
                    }), v < 1 && f.to(d.uniforms.u_alpha, {
                        value: 1,
                        ...eo
                    }, 0), f.to(i, {
                        p: 0,
                        duration: er.duration,
                        ease: "none",
                        onUpdate: () => void(d.uniforms.u_flat.value = ec(i.eased()))
                    }, es);
                    let s = t.engine.reveals.outEls().map(e => e.querySelector(".pj__par") ? ? e);
                    f.to(s, {
                        autoAlpha: 0,
                        ...T.r.extrasOut
                    }, 0), f.to(ex(), {
                        autoAlpha: 1,
                        ...tw
                    }, tv), f.to(c.ui, {
                        alpha: 1,
                        ...tw
                    }, tv), f.to(e.home.others(d), {
                        value: 1,
                        ...tw
                    }, tb.duration), e.fx.close({
                        tl: f,
                        kind: "flight"
                    })
                } else if (f.to(e.hosts, {
                        autoAlpha: 1,
                        y: 0,
                        ...tw
                    }, tv), m) {
                    let e, t;
                    e = tc(h, g, "0px"), td(h, !0), el.e.set(m, {
                        visibility: "hidden"
                    }), el.e.set(e, {
                        opacity: v
                    }), v < 1 && f.to(e, {
                        opacity: 1,
                        duration: .35,
                        ease: "power1.out"
                    }, 0), t = ta(m), f.to(e, { ...t,
                        borderRadius: getComputedStyle(m).borderRadius,
                        ...ts
                    }, to), f.add(() => {
                        el.e.set(m, {
                            clearProps: "visibility"
                        }), e.remove()
                    }, to + ts.duration)
                } else {
                    let e, t, l;
                    r = i.title, e = th(p, p.textContent ? ? ""), (t = ta(p)).top + t.height < 0 && (e.style.top = "0px"), el.e.set([p, r], {
                        visibility: "hidden"
                    }), l = ta(r), f.to(e, {
                        left: l.left,
                        top: l.top,
                        width: l.width,
                        ...tu(r),
                        ...ts
                    }, to), f.to(e, {
                        color: getComputedStyle(r).color,
                        ...T.r.overlayOut
                    }, to), f.add(() => {
                        el.e.set([p, r], {
                            clearProps: "visibility"
                        }), e.remove()
                    }, to + ts.duration)
                }
                return f.add(() => {
                    o.set(a.root, {
                        clearProps: t_
                    })
                }, tv + tm.duration), f
            }(e, t, i) : null) ? ? tT(e, t);

        function tM(e, t) {
            if (!e) return !1;
            let i = e.getBoundingClientRect();
            return i.width > 2 && i.height > 2 && (t || "hidden" !== getComputedStyle(e).visibility) && i.bottom > 0 && i.top < innerHeight
        }

        function tC(e, {
            hidden: t = !1
        } = {}) {
            let i = e.dataset.post,
                l = e.closest("[data-post-item]") ? ? e,
                r = e.querySelector("[data-post-media]") ? ? l.querySelector("[data-post-media]") ? ? null;
            if (tM(r, t) || (r = null), !r && i) {
                let e = document.getElementById("overlay");
                r = [...document.querySelectorAll(`[data-post-media][data-post="${i}"]`)].find(i => !e ? .contains(i) && tM(i, t)) ? ? null
            }
            let s = e.querySelector("[data-post-title]") ? ? l.querySelector("[data-post-title]") ? ? e.querySelector("h1, h2, h3");
            return {
                link: e,
                media: r,
                title: tM(s, t) ? s : null
            }
        }
        let tP = {
                project: "work",
                post: "insights"
            },
            tR = {
                home: "/",
                insights: "/insights"
            },
            tz = (e, t) => `${tP[e]}/${t}`,
            tH = e => ("project" === e.overlay || "post" === e.overlay) && "string" == typeof e.slug ? {
                kind: e.overlay,
                slug: e.slug
            } : null,
            tO = e => "" === e ? "home" : "insights" === e ? "insights" : "self",
            tq = (e, t) => ("project" === e ? (0, et.u)(t) : (0, et.e)(t)) !== null,
            tW = e => e.defaultPrevented || 0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey,
            t$ = /^\/insights\/([^/]+)\/?$/,
            tF = [],
            tI = (0, r.memo)(function({
                kind: e,
                slug: t
            }) {
                let l = (0, et.l)();
                if (!l) return null;
                if ("project" === e) {
                    let e = (0, et.u)(t);
                    return e && (0, i.jsx)(K, {
                        project: e,
                        projects: (0, et.X)("project"),
                        site: l,
                        chrome: !1,
                        eager: !0
                    })
                }
                let r = (0, et.e)(t);
                return r && (0, i.jsx)($, {
                    post: r,
                    posts: (0, et.X)("post"),
                    site: l,
                    chrome: !1,
                    eager: !0
                })
            });

        function tB({
            kind: e,
            slug: t,
            role: l,
            top: r
        }) {
            let s = "leaving" === l,
                n = s ? " pj--leaving" : "arriving" === l ? " pj--arriving" : "";
            return (0, i.jsx)("div", {
                className: `ov-page${n}`,
                "data-ov-page": (0, e8.X)(e, t),
                style: s ? {
                    top: r
                } : void 0,
                inert: s,
                "aria-hidden": s || void 0,
                children: (0, i.jsx)(tI, {
                    kind: e,
                    slug: t
                })
            })
        }
        e.s(["default", 0, function() {
            var t, n;
            let o, a = (0, r.useSyncExternalStore)(e8.Q, e8.R, () => tF),
                d = (0, r.useRef)(null);
            (0, s.f)("overlay", t => {
                let i = function(t) {
                    let i, {
                            gsap: l
                        } = t,
                        r = null,
                        s = null,
                        n = () => {},
                        o = function(t, i, l) {
                            var r;
                            let s, n, o, a, {
                                    gsap: d
                                } = t,
                                c = ti(document, "#overlay"),
                                h = {
                                    root: c,
                                    bar: ti(c, ".ov-bar"),
                                    pull: ti(c, ".ov-pull"),
                                    scroller: ti(c, ".ov-scroll"),
                                    content: ti(c, ".ov-content")
                                },
                                u = document.documentElement,
                                p = (0, e7.f)(t, null),
                                m = new Map,
                                f = null,
                                g = null,
                                v = null,
                                y = null,
                                j = null,
                                b = null,
                                x = "",
                                w = null,
                                _ = null,
                                S = (0, ek.R)((r = {
                                    gsap: d,
                                    overlay: c,
                                    scroller: h.scroller,
                                    scroll: () => L,
                                    live: () => w ? .kind === "project" ? w : null,
                                    reduced: t.reduced,
                                    light: eA.H
                                }).reduced || !eE() ? (eN ? .destroy(), ek.j) : (eT = r, eN ? ? = (s = null, n = !1, o = {
                                    mount(e, t) {
                                        eL.live() ? .el === e && (s ? s.mount(e, t) : a())
                                    },
                                    unmount: e => s ? .unmount(e),
                                    scroll: e => s ? .scroll(e),
                                    edge: e => s ? .edge(e),
                                    reveal: e => s ? .reveal(e),
                                    open: e => s ? .open(e),
                                    close: e => s ? .close(e),
                                    handoff: e => s ? .handoff(e),
                                    destroy() {
                                        s ? .destroy(), s = null, eN === o && (eN = null)
                                    }
                                }, a = () => {
                                    n || (n = !0, e.A(94703).then(e => {
                                        if (eN !== o) return;
                                        s = e.createFabricFx(eL);
                                        let t = eL.live();
                                        t && s.mount(t.el, t.slug)
                                    }, () => n = !1))
                                }, o))),
                                E = e$(h.scroller.clientWidth, innerWidth),
                                k = () => {
                                    E = e$(h.scroller.clientWidth, innerWidth), c.style.setProperty("--pj-inset", `${E.inset}px`), c.style.setProperty("--pj-bar", `${E.bar}px`)
                                };
                            addEventListener("resize", () => {
                                c.hidden || k()
                            }, {
                                signal: t.signal
                            });
                            let N = new Set,
                                L = {
                                    get target() {
                                        return f ? .target ? ? 0
                                    },
                                    get animated() {
                                        return f ? .y ? ? 0
                                    },
                                    get limit() {
                                        return f ? .limit ? ? 0
                                    },
                                    get velocity() {
                                        return f ? .velocity ? ? 0
                                    },
                                    onScroll: e => (N.add(e), () => void N.delete(e))
                                },
                                M = function(e, t, i) {
                                    let l = t.querySelector(".ov-pull__ring"),
                                        r = e.querySelector(".ov-bar"),
                                        s = eO(),
                                        n = eO(),
                                        o = !1,
                                        a = -1,
                                        d = -1,
                                        c = !1,
                                        h = 0,
                                        u = null,
                                        p = eP.max,
                                        m = {
                                            down: 0,
                                            up: 0
                                        },
                                        f = [],
                                        g = () => {
                                            s.target = 0, n.target = 0
                                        };

                                    function v(e) {
                                        i.page() && !o && (o = !0, clearTimeout(h), i.onCommit(e))
                                    }
                                    let y = (0, ei.f)("sheet-edge", (h, u) => {
                                            let p = i.page();
                                            if (!p || o || e.hidden) return;
                                            let m = Math.min(u, 64) / 1e3;
                                            eq(s, m), eq(n, m),
                                                function(e, o, h) {
                                                    let u = i.reduced();
                                                    if (Math.abs(o - a) > 1e-4 && (i.fx.edge({
                                                            dir: "down",
                                                            p: s.value / eC.down
                                                        }), a = o, u ? el.e.set(e.sheet, {
                                                            opacity: 1 - eR.downFade * o
                                                        }) : (el.e.set(e.sheet, {
                                                            y: -eR.downY * o,
                                                            scale: e.engine.sS * (1 - eR.downScale * o),
                                                            opacity: 1 - eR.downFade * o,
                                                            transformOrigin: "50% 100%"
                                                        }), el.e.set(e.teaser, {
                                                            y: -eR.downY * o
                                                        }))), Math.abs(h - d) > 1e-4) {
                                                        i.fx.edge({
                                                            dir: "up",
                                                            p: n.value / eC.up
                                                        }), d = h, el.e.set(e.el, u ? {
                                                            opacity: 1 - h
                                                        } : {
                                                            y: eR.upY * h,
                                                            opacity: 1 - h
                                                        }), el.e.set(t, {
                                                            autoAlpha: eH(6 * h, 0, 1),
                                                            y: u ? 0 : eR.pillY * h
                                                        }), t.classList.toggle("is-on", h > .01), l && (l.style.strokeDashoffset = (ez * (1 - h)).toFixed(2));
                                                        let s = h > .01;
                                                        s !== c && (c = s, el.e.to(r, {
                                                            autoAlpha: +!s,
                                                            duration: .2,
                                                            overwrite: !0
                                                        }))
                                                    }
                                                }(p, eH(s.value / eC.down, 0, 1), eH(n.value / eC.up, 0, 1)), s.value >= eC.down ? v("down") : n.value >= eC.up && v("up")
                                        }),
                                        j = new AbortController,
                                        b = {
                                            passive: !0,
                                            signal: j.signal
                                        };
                                    return e.addEventListener("wheel", t => {
                                        e.hidden || function(e) {
                                            if (!i.armed()) return;
                                            let t = eH(e, -eC.cap, eC.cap);
                                            s.target = i.atBottom() ? Math.max(0, s.value + t) : 0, n.target = i.atTop() ? Math.max(0, n.value - t) : 0, clearTimeout(h), h = window.setTimeout(g, eC.reset)
                                        }(t.deltaY * (1 === t.deltaMode ? 16 : 2 === t.deltaMode ? innerHeight : 1))
                                    }, b), e.addEventListener("touchstart", e => {
                                        u = 1 === e.touches.length ? e.touches[0].clientY : null, p = eH(innerHeight * eP.reach, eP.min, eP.max), m = {
                                            down: 0,
                                            up: 0
                                        }, f = []
                                    }, b), e.addEventListener("touchmove", e => {
                                        if (null === u || 1 !== e.touches.length) return;
                                        let t = e.touches[0].clientY,
                                            l = t - u;
                                        u = t;
                                        var r = e.timeStamp;
                                        if (i.armed())
                                            for (m = {
                                                    down: i.atBottom() ? Math.max(0, m.down - l) : 0,
                                                    up: i.atTop() ? Math.max(0, m.up + l) : 0
                                                }, s.target = eC.down * Math.min(1, m.down / p), n.target = eC.up * Math.min(1, m.up / p), f.push({
                                                    t: r,
                                                    ...m
                                                }); f.length > 2 && r - f[0].t > eP.window;) f.shift()
                                    }, b), e.addEventListener("touchend", e => {
                                        u = null,
                                            function(e) {
                                                let t = f[f.length - 1],
                                                    i = f[0],
                                                    l = n.target > 0 ? "up" : s.target > 0 ? "down" : null;
                                                if (f = [], m = {
                                                        down: 0,
                                                        up: 0
                                                    }, !l || !t || !i) return g();
                                                let r = "up" === l ? n : s,
                                                    o = "up" === l ? eC.up : eC.down,
                                                    a = t.t - i.t,
                                                    d = a > 0 && e - t.t < eP.window ? (t[l] - i[l]) / a : 0,
                                                    c = r.target / o;
                                                if (c < 1 && !(d >= eP.flick && c >= eP.flickFrom)) return g();
                                                r.target = o * eP.over, r.vel = Math.max(r.vel, 1e3 * d * o / p)
                                            }(e.timeStamp)
                                    }, b), e.addEventListener("touchcancel", () => {
                                        u = null, m = {
                                            down: 0,
                                            up: 0
                                        }, f = [], g()
                                    }, b), t.addEventListener("click", () => v("up"), {
                                        signal: j.signal
                                    }), {
                                        reset() {
                                            clearTimeout(h), s = eO(), n = eO(), o = !1, a = -1, d = -1, c = !1, u = null, m = {
                                                down: 0,
                                                up: 0
                                            }, f = [], el.e.set(t, {
                                                autoAlpha: 0,
                                                y: 0
                                            }), t.classList.remove("is-on"), l && (l.style.strokeDashoffset = String(ez)), i.fx.edge({
                                                dir: "down",
                                                p: 0
                                            }), i.fx.edge({
                                                dir: "up",
                                                p: 0
                                            })
                                        },
                                        hold(e) {
                                            o = e
                                        },
                                        get pd() {
                                            return Math.max(0, a)
                                        },
                                        get pu() {
                                            return Math.max(0, d)
                                        },
                                        destroy() {
                                            clearTimeout(h), y(), j.abort()
                                        }
                                    }
                                }(h.root, h.pull, {
                                    armed: () => !!w && !!f && "open" === l.phase() && performance.now() - w.born > T.r.edge.arm,
                                    atBottom: () => {
                                        if (!f) return !1;
                                        let e = h.scroller.scrollHeight - h.scroller.clientHeight;
                                        return e > 0 && f.target >= e - 1 && f.y > e - 1.5
                                    },
                                    atTop: () => !!f && f.target <= .5 && f.y < 1.5,
                                    page: () => "open" === l.phase() ? w : null,
                                    onCommit: e => l.edgeCommit(e),
                                    fx: S,
                                    reduced: () => t.reduced
                                });
                            t.signal.addEventListener("abort", () => M.destroy()), t.signal.addEventListener("abort", () => {});
                            let C = e => {
                                    S.unmount(e.el), e.engine.destroy()
                                },
                                R = e => {
                                    let t, i, l = (t = e.kind, i = e.slug, ("project" === t ? (0, et.u)(i) : (0, et.e)(i)) ? .title ? ? null);
                                    if (null === l) return;
                                    let r = x.lastIndexOf(" — ");
                                    document.title = `${l} — ${r<0?x:x.slice(r+3)}`
                                },
                                z = e => {
                                    let t = "project" === e.kind ? e.el.querySelector("h1") : null;
                                    t && m.set(e, p.attach(t))
                                },
                                H = e => {
                                    let t = e_(c);
                                    return v = function(e, {
                                        hide: t
                                    }) {
                                        let i = e.map(e => ({
                                            el: e,
                                            inert: e.inert,
                                            aria: e.getAttribute("aria-hidden"),
                                            visibility: e.style.visibility
                                        }));
                                        for (let {
                                                el: e
                                            } of i) e.inert = !0, e.setAttribute("aria-hidden", "true"), t && (e.style.visibility = "hidden");
                                        return () => {
                                            for (let e of i) e.el.inert = e.inert, null === e.aria ? e.el.removeAttribute("aria-hidden") : e.el.setAttribute("aria-hidden", e.aria), t && (e.el.style.visibility = e.visibility)
                                        }
                                    }(t, {
                                        hide: "self" === e
                                    }), t
                                };
                            return {
                                els: h,
                                fx: S,
                                get scroll() {
                                    return f
                                },
                                show() {
                                    c.hidden = !1, c.removeAttribute("aria-hidden"), k()
                                },
                                attach: e => (w = e, e.engine = function(e, t) {
                                    let i = t.overlay.querySelector(".ov-scroll") ? ? t.overlay,
                                        {
                                            wrap: l,
                                            sheet: r,
                                            teaser: s,
                                            tcard: n
                                        } = e,
                                        o = [l, r, ...n ? [n] : []],
                                        a = l.closest(".pj"),
                                        d = e => a ? .style.getPropertyValue(e).trim() ? ? "",
                                        c = A({
                                            bg: d("--pj-bg"),
                                            fg: d("--pj-fg")
                                        }, {
                                            bg: d("--pj-b-bg"),
                                            fg: d("--pj-b-fg")
                                        }),
                                        h = "top",
                                        u = null,
                                        p = 0,
                                        m = 1,
                                        f = 0,
                                        g = "",
                                        v = (e, i) => {
                                            t.live() && (t.overlay.style.setProperty("--pj-bar-t", i), t.overlay.style.setProperty("--pj-bar-inset", `${e}px`))
                                        };

                                    function y(e) {
                                        if (.5 > Math.abs(e - p)) return;
                                        let t = Number(el.e.getProperty(l, "scale")),
                                            i = Number(el.e.getProperty(l, "y"));
                                        el.e.set(l, {
                                            transformOrigin: `50% ${e}px`,
                                            y: i + (1 - t) * (p - e)
                                        }), p = e
                                    }

                                    function j(e) {
                                        var i;
                                        let s, o, a, d, c = (i = t.geo(), o = (s = eW(e)) * s * (3 - 2 * s), a = 1 + (i.T - 1) * o, d = T.r.teaserIn.from, {
                                            wrapScale: a,
                                            sheetScale: 1 + (i.S - 1) * o,
                                            card: {
                                                opacity: o,
                                                scale: d + (1 - d) * o,
                                                y: T.e / a - T.e
                                            },
                                            barInset: i.inset + i.step * o
                                        });
                                        f = e, m = c.sheetScale, el.e.set(l, {
                                            scale: c.wrapScale,
                                            y: 0
                                        }), el.e.set(r, {
                                            scale: m,
                                            transformOrigin: "50% 100%"
                                        }), n && el.e.set(n, c.card), v(c.barInset, "0s")
                                    }

                                    function b({
                                        immediate: i = !1
                                    } = {}) {
                                        var a, d;
                                        let c;
                                        if (e.frozen || t.reduced()) return;
                                        let {
                                            target: p,
                                            limit: g
                                        } = t.scroll;
                                        a = {
                                            target: p,
                                            limit: g
                                        }, d = s.offsetHeight;
                                        let x = "end" == (h = a.target <= .5 ? "top" : a.target >= a.limit - d + 1 ? "end" : "full") ? "full" : h;
                                        if (x === u && !i) return;
                                        let w = i || null === u;
                                        if (u = x, el.e.killTweensOf(o), "full" === x && w) {
                                            y(l.offsetHeight), j(eI({
                                                animated: t.scroll.animated,
                                                limit: g
                                            }, s.offsetHeight));
                                            return
                                        }
                                        f = 0, m = 1, y((c = l.offsetHeight, g > 0 && p / g > .5 ? c : 0));
                                        let _ = t.geo(),
                                            S = T.r.breathe,
                                            E = S[x],
                                            k = (e, t) => w ? el.e.set(e, t) : el.e.to(e, { ...t,
                                                duration: E,
                                                ease: S.ease
                                            });
                                        k(l, "top" === x ? eF(_) : {
                                            scale: 1,
                                            y: 0
                                        }), k(r, {
                                            scale: 1,
                                            transformOrigin: "50% 100%"
                                        }), v(_.inset, w ? "0s" : `${E}s`);
                                        let N = {
                                            opacity: 0,
                                            scale: T.r.teaserIn.from,
                                            y: 0
                                        };
                                        n && (w ? el.e.set(n, N) : el.e.to(n, { ...N,
                                            duration: T.r.teaserIn.duration,
                                            ease: S.ease,
                                            overwrite: !0
                                        }))
                                    }

                                    function x() {
                                        if (e.frozen || t.reduced()) return;
                                        let i = eI({
                                            animated: t.scroll.animated,
                                            limit: t.scroll.limit
                                        }, s.offsetHeight);
                                        if (i <= 0) {
                                            f > 0 && (f = 0, "full" === u && j(0));
                                            return
                                        }
                                        f > 0 || (el.e.killTweensOf(o), y(l.offsetHeight)), j(i)
                                    }

                                    function w({
                                        force: l = !1,
                                        y: r
                                    } = {}) {
                                        let s = P(c, {
                                                y: r ? ? (t.live() ? t.scroll.animated : 0),
                                                vh: i.clientHeight || innerHeight,
                                                limit: t.scroll.limit,
                                                phone: t.phone(),
                                                reduced: t.reduced()
                                            }),
                                            n = `${s.bg}|${s.fg}`;
                                        if (n !== g || l) {
                                            g = n;
                                            var o = t.live() ? t.overlay : null;
                                            let i = e.wrap.closest(".pj");
                                            for (let e of o ? [i, o] : [i]) e ? .style.setProperty("--pj-bg", s.bg), e ? .style.setProperty("--pj-fg", s.fg)
                                        }
                                    }
                                    let _ = t.scroll.onScroll(() => {
                                            t.live() && ("project" === e.kind && e3(e, innerHeight), t.handing() || (b(), x(), w()), t.fx.scroll({
                                                y: t.scroll.animated,
                                                v: t.scroll.velocity,
                                                limit: t.scroll.limit,
                                                vh: i.clientHeight
                                            }))
                                        }),
                                        S = 0,
                                        E = () => {
                                            !t.live() || t.overlay.hidden || (t.handing() || (b({
                                                immediate: !0
                                            }), w({
                                                force: !0
                                            })), "project" === e.kind && (clearTimeout(S), S = window.setTimeout(() => t.live() && eU(e.el), 1e3 * T.R)))
                                        };
                                    addEventListener("resize", E), w({
                                        force: !0,
                                        y: 0
                                    }), t.reduced() ? n && el.e.set(n, {
                                        opacity: 1,
                                        scale: 1
                                    }) : b({
                                        immediate: !0
                                    });
                                    let k = ("project" === e.kind ? function(e, t) {
                                        let i = [...e.el.querySelectorAll(eK)],
                                            l = new WeakSet,
                                            r = [],
                                            s = !1,
                                            n = null,
                                            o = 0,
                                            a = !0;

                                        function d(e, i = t.scroller.getBoundingClientRect()) {
                                            let l = e.getBoundingClientRect();
                                            return l.height > 0 && (l.bottom <= i.top || ("text" === eZ(e) ? l.top <= i.top + i.height * T.r.lines.at : Math.min(l.bottom, i.bottom) - Math.max(l.top, i.top) >= l.height * T.G))
                                        }

                                        function c(e) {
                                            eY(e), s && !l.has(e) && el.e.set(e.querySelectorAll(".up"), {
                                                yPercent: T.r.lines.yPercent
                                            })
                                        }
                                        let h = t.scroller.getBoundingClientRect(),
                                            u = [];
                                        for (let t of e.el.querySelectorAll("[data-split]")) d(t, h) ? eY(t) : u.push(t);
                                        let p = () => {
                                            o = 0;
                                            let e = u.shift();
                                            e && (e6(e) && c(e), o = requestAnimationFrame(p))
                                        };

                                        function m(e) {
                                            if (eJ.add(e), eG(e)) {
                                                let t;
                                                el.e.set(e, {
                                                    clipPath: (t = e5(e), `inset(100% 0% 0% 0% round ${t}px)`)
                                                }), el.e.set(e2(e), {
                                                    yPercent: T.r.reveal.yPercent,
                                                    scale: T.r.reveal.scale,
                                                    transformOrigin: "50% 100%"
                                                });
                                                return
                                            }
                                            e.matches("[data-split]") && eD(e, !0);
                                            let t = e0(e),
                                                i = e1(e);
                                            t.length && el.e.set(t, {
                                                yPercent: T.r.lines.yPercent
                                            }), i.length && el.e.set(i, {
                                                autoAlpha: 0,
                                                y: T.r.rise.y
                                            })
                                        }

                                        function f(e, i, s, n) {
                                            if (!e.length) return;
                                            for (let t of e) e6(t) && c(t), l.add(t), eJ.delete(t), eD(t, !1);
                                            let o = i ? ? el.e.timeline();
                                            i || r.push(o);
                                            let a = e.filter(eG);
                                            a.length && (o.to(a, {
                                                clipPath: (e, t) => {
                                                    let i;
                                                    return i = e5(t), `inset(0% 0% 0% 0% round ${i}px)`
                                                },
                                                ...n
                                            }, s), o.to(a.map(e2), {
                                                yPercent: 0,
                                                scale: 1,
                                                ...n,
                                                clearProps: "transform"
                                            }, s));
                                            let d = T.r.masked,
                                                h = T.r.lines,
                                                u = T.r.rise;
                                            for (let i of e.filter(e => !eG(e))) {
                                                let e = e0(i),
                                                    l = e.filter(e => e.closest("[data-split]")),
                                                    r = e.filter(e => !e.closest("[data-split]"));
                                                if (r.length && o.to(r, {
                                                        yPercent: 0,
                                                        duration: d.duration,
                                                        stagger: d.stagger,
                                                        ease: d.ease
                                                    }, s), l.length) {
                                                    let e = h.stagger[t.phone() ? "phone" : "desk"];
                                                    o.to(l, {
                                                        yPercent: 0,
                                                        duration: h.duration,
                                                        stagger: e,
                                                        ease: h.ease
                                                    }, s + h.after)
                                                }
                                                let n = e1(i);
                                                n.length && o.to(n, {
                                                    autoAlpha: 1,
                                                    y: 0,
                                                    duration: u.duration,
                                                    stagger: u.stagger,
                                                    ease: u.ease,
                                                    clearProps: "transform"
                                                }, s + u.after)
                                            }
                                            for (let i of e) t.fx.reveal({
                                                el: i,
                                                at: s,
                                                tl: o
                                            })
                                        }
                                        u.length && (o = requestAnimationFrame(p)), "loaded" !== document.fonts.status && document.fonts.ready.then(() => a && eU(e.el, {
                                            force: !0
                                        }));
                                        let g = e => {
                                            l.add(e), eJ.delete(e), eD(e, !1)
                                        };
                                        return {
                                            prepare() {
                                                if (!t.reduced)
                                                    for (let e of (s = !0, i)) l.has(e) || m(e)
                                            },
                                            enter(s, n, {
                                                intro: o = !1
                                            } = {}) {
                                                let a = i.filter(e => !l.has(e) && d(e));
                                                if (t.reduced) return void a.forEach(g);
                                                o && e.hero && (m(e.hero), a.unshift(e.hero));
                                                let c = o ? T.r.intro : T.r.reveal,
                                                    h = s ? ? el.e.timeline({
                                                        delay: n
                                                    });
                                                f(a, h, s ? n : 0, {
                                                    duration: c.duration,
                                                    stagger: c.stagger,
                                                    ease: c.ease
                                                }), s || r.push(h)
                                            },
                                            settleAll() {
                                                for (let e of i) {
                                                    if (!s || l.has(e)) {
                                                        g(e);
                                                        continue
                                                    }
                                                    g(e), eG(e) ? (el.e.set(e, {
                                                        clearProps: "clipPath"
                                                    }), el.e.set(e2(e), {
                                                        clearProps: "transform"
                                                    })) : (el.e.set(e0(e), {
                                                        yPercent: 0
                                                    }), el.e.set(e1(e), {
                                                        clearProps: "opacity,visibility,transform"
                                                    }))
                                                }
                                            },
                                            watch() {
                                                n ? .();
                                                let e = i.filter(e => !l.has(e));
                                                if (!e.length) return;
                                                let r = () => {
                                                    let i = t.scroller.getBoundingClientRect(),
                                                        r = [];
                                                    for (let t = e.length - 1; t >= 0; t--) {
                                                        let s = e[t];
                                                        l.has(s) || !s.isConnected ? e.splice(t, 1) : d(s, i) && r.unshift(...e.splice(t, 1))
                                                    }
                                                    if (r.length) {
                                                        let e = T.r.reveal;
                                                        f(r, null, 0, {
                                                            duration: e.duration,
                                                            stagger: e.cueStagger,
                                                            ease: e.ease
                                                        })
                                                    }
                                                    e.length || n ? .()
                                                };
                                                t.scroller.addEventListener("scroll", r, {
                                                    passive: !0
                                                }), addEventListener("resize", r), n = () => {
                                                    t.scroller.removeEventListener("scroll", r), removeEventListener("resize", r), n = null
                                                }, r()
                                            },
                                            outEls: () => [...e.el.querySelectorAll(".pj__fig--extra, .pj-st")],
                                            destroy() {
                                                for (let e of (a = !1, cancelAnimationFrame(o), n ? .(), r)) e.kill()
                                            }
                                        }
                                    } : e4.D)(e, {
                                        scroller: i,
                                        reduced: t.reduced(),
                                        phone: t.phone,
                                        fx: t.fx
                                    });
                                    return "project" === e.kind && e3(e, innerHeight), {
                                        breathe: b,
                                        scrub: x,
                                        paint: w,
                                        freeze() {
                                            e.frozen = !0, el.e.killTweensOf(o)
                                        },
                                        get state() {
                                            return h
                                        },
                                        get endP() {
                                            return f
                                        },
                                        get sS() {
                                            return m
                                        },
                                        reveals: k,
                                        destroy() {
                                            _(), removeEventListener("resize", E), clearTimeout(S), k.destroy(), el.e.killTweensOf(o)
                                        }
                                    }
                                }(e, {
                                    scroll: L,
                                    overlay: c,
                                    geo: () => E,
                                    reduced: () => t.reduced,
                                    phone: t.phone,
                                    fx: S,
                                    live: () => w === e,
                                    handing: () => "handing" === l.phase()
                                }), S.mount(e.el, e.slug), e),
                                mount(e, l) {
                                    g = e.kind, u.classList.add(te[g]), d.set(c, {
                                        autoAlpha: 1
                                    }), d.set(h.bar, {
                                        autoAlpha: 0
                                    }), h.scroller.scrollTop = 0, (f = (0, eS.f)({
                                        reduced: t.reduced,
                                        gsap: d,
                                        ScrollTrigger: t.ScrollTrigger,
                                        own: {
                                            wrapper: h.scroller,
                                            content: h.content,
                                            lenis: e9
                                        }
                                    })).onScroll(e => {
                                        for (let t of N) t(e)
                                    }), e.engine.breathe({
                                        immediate: !0
                                    }), M.reset();
                                    let r = H(l),
                                        s = i();
                                    if (s ? .setHold(!0), "post" === g) {
                                        let e;
                                        e = r.map(e => ({
                                            el: e,
                                            opacity: e.style.opacity,
                                            visibility: e.style.visibility,
                                            transform: e.style.transform
                                        })), y = () => {
                                            for (let t of e) Object.assign(t.el.style, {
                                                opacity: t.opacity,
                                                visibility: t.visibility,
                                                transform: t.transform
                                            })
                                        }, s && (b = s.ui.alpha, s.ui.alpha = 0)
                                    }
                                    j ? .(), j = (0, ei.f)("overlay:stop", () => {
                                        Math.abs(t.scroll.lag) >= .5 || (t.scroll.stop(), j ? .(), j = null)
                                    }), (0, eM.L)(!1), x = document.title, R(e), z(e)
                                },
                                rehost(e) {
                                    v ? .(), H(e), x = document.title
                                },
                                swap(e, t) {
                                    e.engine.freeze(), _ = e, m.get(e) ? .(), m.delete(e), R(t), z(t), f ? .to(0, {
                                        immediate: !0
                                    }), h.scroller.scrollTop = 0, f ? .stop(), t.engine.breathe({
                                        immediate: !0
                                    }), t.engine.paint({
                                        force: !0,
                                        y: 0
                                    }), M.reset()
                                },
                                landed() {
                                    _ && C(_), _ = null, f ? .resize(), f ? .start(), requestAnimationFrame(() => {
                                        f ? .resize(), w ? .engine.breathe()
                                    })
                                },
                                unmount(e) {
                                    for (let e of (j ? .(), j = null, f ? .destroy(), f = null, m.values())) e();
                                    for (let e of (m.clear(), [w, _])) e && C(e);
                                    w = null, _ = null, M.reset(), c.hidden = !0, c.setAttribute("aria-hidden", "true"), (0, e8.r)(), d.set([c, h.bar, h.pull], {
                                        clearProps: "opacity,visibility,backgroundColor"
                                    }), g && u.classList.remove(te[g]), g = null, v ? .(), v = null, y ? .(), y = null;
                                    let l = i();
                                    l && null !== b && (l.ui.alpha = b), b = null, l ? .setHold(!1), t.scroll.start(), (0, eM.L)(!0), document.title = x, e ? .focus(tt)
                                }
                            }
                        }(t, () => r, {
                            phase: () => d,
                            edgeCommit: e => B.edgeCommit(e)
                        }),
                        a = function({
                            gsap: e,
                            ScrollTrigger: t,
                            scroll: i,
                            ribbon: l,
                            slugs: r
                        }) {
                            let s = null,
                                n = e => r().flatMap(t => {
                                    let i = t === e.slug ? null : l() ? .card(t);
                                    return i ? [i.uniforms.u_alpha] : []
                                }),
                                o = e => (l() ? .cardScroll(e.i) ? ? 0) + (s ? .slug === e.slug ? s.dy : 0),
                                a = e => {
                                    i.resize(), i.to(o(e), {
                                        immediate: !0
                                    })
                                };
                            return {
                                opened(e) {
                                    let t = l();
                                    t && (s = {
                                        slug: e.slug,
                                        dy: i.target - t.cardScroll(e.i)
                                    })
                                },
                                homeState(t, i) {
                                    e.set(ex(), {
                                        autoAlpha: +!i
                                    });
                                    let r = l();
                                    if (r && t)
                                        for (let e of (r.ui.alpha = +!i, n(t))) e.value = i ? T.r.parked : 1
                                },
                                parkCard(e, t) {
                                    let i = e ? l() ? .card(e) : null;
                                    i && i.slug !== t.slug && (l() ? .endFlight(i, {
                                        hidden: !1
                                    }), i.uniforms.u_flat.value = 0, i.uniforms.u_alpha.value = T.r.parked), t.uniforms.u_alpha.value = 1, t.uniforms.u_flat.value = 1, a(t)
                                },
                                homeY: o,
                                others: n,
                                keep(e) {
                                    let i = () => {
                                        let t = e();
                                        t && a(t)
                                    };
                                    return t.addEventListener("refresh", i), () => t.removeEventListener("refresh", i)
                                }
                            }
                        }({
                            gsap: l,
                            ScrollTrigger: t.ScrollTrigger,
                            scroll: t.scroll,
                            ribbon: () => r,
                            slugs: () => (0, et.X)("project").map(e => e.slug)
                        }),
                        d = "idle",
                        c = null,
                        h = null,
                        u = null,
                        p = !1,
                        m = [],
                        f = null,
                        g = null,
                        v = null,
                        y = null,
                        j = e => r ? .card(e) ? ? null,
                        b = e => document.querySelector(`#work .proj[data-slug="${e}"] .proj__card`),
                        x = () => ({
                            gsap: l,
                            kind: c.kind,
                            host: c.host,
                            els: o.els,
                            ribbon: r,
                            card: "project" === c.kind ? j(c.slug) : null,
                            home: a,
                            hosts: m,
                            reduced: t.reduced,
                            revealed: t.transition.revealed,
                            fx: o.fx
                        });

                    function w(e) {
                        "project" === e.kind && e.hero && !t.reduced && function(e, t, i) {
                            let l = e.closest(".pj"),
                                r = i.pool ? .video(t) ? ? null,
                                s = i.pool ? r : function(e, t) {
                                    let i = (0, et.u)(e) ? .video,
                                        l = (0, et.l)() ? .mediaBaseUrl;
                                    if (!i || !l) return null;
                                    let r = document.createElement("video");
                                    return r.muted = r.defaultMuted = r.loop = r.playsInline = !0, r.setAttribute("aria-hidden", "true"), r.disablePictureInPicture = !0, r.crossOrigin = "anonymous", r.preload = "auto", r.src = (0, em.m)({
                                        canPlayAv1: r.canPlayType(eu.d.av1),
                                        phone: t,
                                        sources: (0, eh.f)(l, i)
                                    }).url, r
                                }(t, i.phone());
                            if (!s || !l) return;
                            let n = e.querySelector("img");
                            i.pool && (ev = t, i.pool.exclusive(t)), el.e.set(s, {
                                "--pj-vid": r && s.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ? 1 : 0
                            });
                            let o = function(e, t) {
                                if (e.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return t(), () => {};
                                let i = () => {
                                    e.removeEventListener("loadeddata", i), t()
                                };
                                return e.addEventListener("loadeddata", i), () => e.removeEventListener("loadeddata", i)
                            }(s, () => ej(s));
                            e.append(s), r || s.play().catch(() => {});
                            let a = () => {
                                n && (s.style.transform = n.style.transform, s.style.transformOrigin = n.style.transformOrigin)
                            };
                            a();
                            let d = new MutationObserver(a);
                            n && d.observe(n, {
                                attributes: !0,
                                attributeFilter: ["style"]
                            });
                            let c = 0;
                            eg.set(l, {
                                rewind() {
                                    let e = ++c;
                                    if (s.readyState < HTMLMediaElement.HAVE_METADATA) {
                                        s.currentTime = 0;
                                        return
                                    }
                                    s.style.visibility = "hidden", el.e.set(s, {
                                        "--pj-vid": 0
                                    });
                                    let t = () => {
                                        e === c && "hidden" === s.style.visibility && (s.style.visibility = "", ej(s))
                                    };
                                    s.addEventListener("seeked", () => {
                                        s.requestVideoFrameCallback ? s.requestVideoFrameCallback(t) : t(), setTimeout(t, 250)
                                    }, {
                                        once: !0
                                    }), s.currentTime = 0, setTimeout(t, 1e3)
                                },
                                detach() {
                                    if (c++, o(), o = () => {}, d.disconnect(), eg.delete(l), el.e.killTweensOf(s), el.e.set(s, {
                                            clearProps: "transform,transformOrigin,visibility,--pj-vid"
                                        }), r) {
                                        (0, ep.V)(s), ev === t && (ev = null, i.pool ? .exclusive(null));
                                        return
                                    }
                                    s.pause(), s.removeAttribute("src"), s.load(), s.remove()
                                }
                            })
                        }(e.hero, e.slug, {
                            pool: s,
                            phone: t.phone
                        })
                    }

                    function _(e, t, i) {
                        (d = e, t) ? (f = t, g = (0, J.Y)("overlay", () => {
                            g = null, S()
                        }), t.eventCallback("onComplete", () => {
                            f = null, g ? .(), g = null, i()
                        })) : i()
                    }

                    function S() {
                        f && 1 > f.progress() && f.progress(1)
                    }

                    function E(e) {
                        h === e && (d = "open", e.born = performance.now(), e.el.querySelector("h1") ? .focus({
                            preventScroll: !0
                        }))
                    }

                    function k(e, t, i, l) {
                        let r, s, n, a;
                        if (!tq(e, t)) return;
                        S();
                        let d = tO((0, ee.q)());
                        c = {
                            kind: e,
                            slug: t,
                            host: d
                        }, u = l, p = "flight" === i && !!(l ? .media ? ? l ? .title), m = "self" === d ? [] : e_(o.els.root), o.show();
                        let f = o.attach((0, e8.f)(e, t, "live"));
                        h = f, o.mount(f, d), w(f), _("opening", (r = x(), s = f, n = i, a = l, "flight" === n ? tL(r) ? function(e, t, i) {
                            let {
                                gsap: l,
                                els: r
                            } = e, {
                                reveals: s
                            } = t.engine, n = l.timeline();
                            return l.set(r.root, {
                                [t_]: 0
                            }), l.set(t.el, {
                                autoAlpha: 0
                            }), "project" === e.kind ? ! function(e, t, i) {
                                var l;
                                let r, {
                                    card: s,
                                    ribbon: n,
                                    els: o
                                } = e;
                                if (!s || !n) return;
                                t.hero && (l = t.hero, el.e.killTweensOf(s.uniforms.u_hover), ea(!0), r = n.startFlight(s, {
                                    figure: () => {
                                        let e = l.getBoundingClientRect();
                                        return {
                                            left: e.left,
                                            top: e.top,
                                            width: e.width,
                                            height: e.height
                                        }
                                    },
                                    radius: ed(l),
                                    ease: el.e.parseEase(er.ease),
                                    p: 0
                                }), i.to(r, {
                                    p: 1,
                                    duration: er.duration,
                                    ease: "none",
                                    onUpdate: () => void(s.uniforms.u_flat.value = ec(r.eased()))
                                }, 0), i.to(s.uniforms.u_hover, {
                                    value: 0,
                                    ...en
                                }, 0)), i.add(() => {
                                    tp(e, t), ea(!1)
                                }, tm.duration);
                                let a = e.home.others(s);
                                i.to(ex(), {
                                    autoAlpha: 0,
                                    ...tx
                                }, 0), i.to(n.ui, {
                                    alpha: 0,
                                    ...tx
                                }, 0), i.to(a, {
                                    value: T.r.dim,
                                    ...tx
                                }, 0), i.to(o.root, {
                                    [t_]: 1,
                                    ...ty
                                }, tf.at), i.to(a, {
                                    value: T.r.parked,
                                    ...ty
                                }, tf.at)
                            }(e, t, n) : ! function(e, t, i, l) {
                                var r, s;
                                let n = i ? .media ? .isConnected ? i.media : null,
                                    o = t.el.querySelector(".pj__title");
                                if (n && t.hero) {
                                    let e, i;
                                    td(r = t.hero, !0), e = ta(r), i = tc(n, ta(n)), el.e.set(n, {
                                        visibility: "hidden"
                                    }), l.to(i, { ...e,
                                        borderRadius: "0px",
                                        ...ts
                                    }, 0), l.add(() => {
                                        td(r, !1), i.remove(), el.e.set(n, {
                                            clearProps: "visibility"
                                        })
                                    }, ts.duration)
                                } else if (i ? .title && o) {
                                    let e, t;
                                    o.removeAttribute("data-pr"), s = i.title, e = ta(o), t = th(s, o.textContent ? ? ""), el.e.set([s, o], {
                                        visibility: "hidden"
                                    }), l.to(t, {
                                        left: e.left,
                                        top: e.top,
                                        width: e.width,
                                        ...tu(o),
                                        ...ts
                                    }, 0), l.to(t, {
                                        color: getComputedStyle(o).color,
                                        duration: tn.duration,
                                        ease: tn.ease
                                    }, tn.at), l.add(() => {
                                        el.e.set([s, o], {
                                            clearProps: "visibility"
                                        }), t.remove()
                                    }, ts.duration)
                                }
                                l.to(e.hosts, {
                                    autoAlpha: 0,
                                    ...tx
                                }, 0), l.to(e.els.root, {
                                    [t_]: 1,
                                    ...tx
                                }, 0)
                            }(e, t, i, n), n.to(t.el, {
                                autoAlpha: 1,
                                ...ty
                            }, tf.at), n.to(r.bar, {
                                autoAlpha: 1,
                                ...tj
                            }, tg), s.prepare(), s.enter(n, tg), e.fx.open({
                                tl: n,
                                kind: "flight"
                            }), n.add(() => {
                                l.set(r.root, {
                                    clearProps: t_
                                }), s.watch()
                            }), n
                        }(r, s, a) : function(e, t) {
                            let {
                                gsap: i,
                                els: l,
                                card: r,
                                ribbon: s
                            } = e, n = i.timeline();
                            return "post" === e.kind ? (n.fromTo(t.el, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1,
                                ...tN
                            }, 0), n.to(e.hosts, {
                                autoAlpha: 0,
                                ...tN
                            }, 0), n.to(l.bar, {
                                autoAlpha: 1,
                                ...tN
                            }, 0)) : (tp(e, t), i.set(l.bar, {
                                autoAlpha: 1
                            }), n.fromTo(l.root, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1,
                                ...tN
                            }, 0), n.to(ex(), {
                                autoAlpha: 0,
                                ...tN
                            }, 0), s && n.to(s.ui, {
                                alpha: 0,
                                ...tN
                            }, 0), r && n.to(e.home.others(r), {
                                value: T.r.parked,
                                ...tN
                            }, 0)), n
                        }(r, s) : "intro" !== n || r.reduced ? tk(r, s) : function(e, t) {
                            tk(e, t);
                            let i = T.r.intro,
                                {
                                    reveals: l
                                } = t.engine,
                                r = e.gsap.timeline({
                                    paused: !0
                                });
                            return l.prepare(), r.fromTo(e.els.bar, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1,
                                duration: .5
                            }, .1), "project" === t.kind ? l.enter(r, 0, {
                                intro: !0
                            }) : (t.hero && r.fromTo(t.hero, {
                                clipPath: "inset(100% 0 0 0)"
                            }, {
                                clipPath: "inset(0% 0 0 0)",
                                duration: i.duration,
                                ease: i.ease,
                                clearProps: "clipPath"
                            }, 0), l.enter(r, .15)), e.fx.open({
                                tl: r,
                                kind: "intro"
                            }), r.add(() => l.watch()), e.revealed.then(() => {
                                r.play()
                            }), r
                        }(r, s)), () => E(f))
                    }

                    function N(e) {
                        v ? .(), v = null, y = null;
                        let t = c;
                        h && ey(h) ? .detach(), c = null, h = null, u = null, d = "idle", ea(!1), o.unmount(e), t ? .kind === "project" && function(e) {
                            l.set(ex(), {
                                clearProps: "opacity,visibility"
                            });
                            let t = j(e);
                            if (r && (r.ui.alpha = 1, t))
                                for (let e of (r.endFlight(t, {
                                        hidden: !1
                                    }), t.uniforms.u_flat.value = 0, t.uniforms.u_alpha.value = 1, a.others(t))) e.value = 1
                        }(t.slug)
                    }

                    function L(e) {
                        if ("project" === e.kind) {
                            let t = b(e.slug);
                            return t ? {
                                link: t,
                                media: null,
                                title: null
                            } : null
                        }
                        return function(e, t) {
                            if (t.from ? .link ? .dataset.post === e && t.from.link.isConnected) return t.from;
                            let i = document.getElementById("overlay"),
                                l = [...document.querySelectorAll(`a[data-post="${e}"]`)].find(e => !i ? .contains(e) && e.getClientRects().length > 0);
                            if (!l) return null;
                            document.dispatchEvent(new CustomEvent("post:show", {
                                detail: {
                                    slug: e
                                }
                            }));
                            let r = l.closest("[data-post-item]") ? ? l,
                                s = (r.querySelector("[data-post-media]") ? ? r).getBoundingClientRect();
                            return (s.bottom < 0 || s.top > innerHeight) && t.scroll.to(t.scroll.y + s.top + s.height / 2 - innerHeight / 2, {
                                immediate: !0
                            }), tC(l, {
                                hidden: !0
                            })
                        }(e.slug, {
                            from: u,
                            scroll: t.scroll
                        }) ? ? u
                    }

                    function M() {
                        if (!c || !h) return;
                        S();
                        let e = h,
                            t = L(c),
                            i = "post" !== c.kind || p ? t : null;
                        _("closing", tA(x(), e, i), () => N(t ? .link ? ? null))
                    }

                    function C(e) {
                        if (v ? .(), v = null, !c || !h) return;
                        c = { ...c,
                            host: "home"
                        }, m = [], o.rehost("home");
                        let t = h,
                            i = L(c),
                            l = { ...x(),
                                card: e
                            };
                        "project" === c.kind && (tk(l, t), !e && i ? .link && R(i.link)), _("closing", e ? tA(l, t, i) : tT(l, t), () => N(i ? .link ? ? null))
                    }

                    function R(e) {
                        let i = e.getBoundingClientRect();
                        t.scroll.resize(), t.scroll.to(scrollY + i.top + i.height / 2 - innerHeight / 2, {
                            immediate: !0
                        })
                    }

                    function z(e) {
                        S();
                        let i = c,
                            l = !1;
                        d = "closing", e({
                            ctx: t,
                            ribbon: () => r,
                            still: () => !l && c === i,
                            closeOnto: C,
                            unmount: () => {
                                if (!i || c !== i) return;
                                let e = b(i.slug);
                                e && R(e), N(e)
                            },
                            back: (e, i) => $(e, () => void t.transition.navigate(i))
                        }) && (v = (0, J.Y)("overlay", () => {
                            l = !0, v = null, c === i && (d = "open")
                        }))
                    }

                    function H() {
                        S(), c && N(null)
                    }

                    function O(e, t) {
                        let i, l, r, s;
                        if (!c || !h) return;
                        S();
                        let n = h,
                            d = c.slug;
                        (0, e8.C)(n);
                        let u = "project" === (c = { ...c,
                            slug: e
                        }).kind ? j(e) : null;
                        u && a.parkCard(d, u);
                        let p = o.attach((0, e8.f)(c.kind, e, "arriving"));
                        h = p, o.swap(n, p), w(p), _("handing", (i = x(), l = n, r = p, s = t, i.reduced ? function(e, t, i) {
                            let {
                                gsap: l
                            } = e;
                            "project" === i.kind && tp(e, i), i.tcard && l.set(i.tcard, {
                                opacity: 1,
                                scale: 1
                            });
                            let r = l.timeline();
                            return r.fromTo(i.el, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1,
                                ...tN
                            }, 0), r.to(t.el, {
                                autoAlpha: 0,
                                ...tN
                            }, 0), r
                        }(i, l, r) : function(e, t, i, l) {
                            let r, {
                                    gsap: s,
                                    els: n
                                } = e,
                                o = "teaser" === l && t.tcard ? t.tcard.getBoundingClientRect() : null;
                            s.to(n.pull, {
                                autoAlpha: 0,
                                duration: .2,
                                overwrite: !0
                            }), s.to(n.bar, {
                                autoAlpha: 1,
                                duration: .2,
                                overwrite: !0
                            }), "project" === i.kind && tp(e, i), ey(i) ? .rewind();
                            let a = s.timeline(),
                                d = e.fx.handoff({
                                    dir: "above" === l ? "up" : "down",
                                    from: l,
                                    to: i.el,
                                    fromEl: t.el,
                                    tl: a
                                }),
                                c = e$(n.scroller.clientWidth, innerWidth),
                                h = eF(c),
                                u = h.scale;
                            d ? .glide === !1 ? r = 0 : o ? (r = o.top - h.y, u = o.width / c.vw) : r = "above" === l ? -innerHeight : innerHeight, s.set(i.wrap, {
                                scale: u
                            });
                            let {
                                reveals: p
                            } = i.engine;
                            return o ? (p.prepare({
                                peeked: !0
                            }), p.enter(null, tE.rise)) : p.settleAll(), a.fromTo(i.el, {
                                y: r
                            }, {
                                y: 0,
                                duration: tE.duration,
                                ease: tE.ease
                            }, 0), u !== h.scale && a.to(i.wrap, {
                                scale: h.scale,
                                duration: tE.duration,
                                ease: tE.ease
                            }, 0), a.to(t.el, {
                                y: `+=${tE.drop}`,
                                opacity: 0,
                                duration: tE.out,
                                ease: tE.outEase
                            }, 0), a.add(() => p.watch(), tE.duration), a
                        }(i, l, r, s)), () => {
                            ey(n) ? .detach(), (0, e8.A)(n), o.landed(), E(p)
                        })
                    }

                    function q(e) {
                        if (!c) return;
                        let t = e => (0, et.t)(c.kind, e) ? .index ? ? 0;
                        O(e, t(e) < t(c.slug) ? "above" : "below")
                    }
                    let W = e => void t.transition.revealed.then(e);

                    function $(e, t) {
                        let l = c;
                        y = l, history.go(-e), clearTimeout(i), i = setTimeout(() => {
                            c === l && y === l && (y = null, t())
                        }, 1e3 * Q.i)
                    }

                    function F(e, i, l) {
                        t.history.push("overlay", {
                            overlay: e,
                            slug: i,
                            host: l
                        }, `/${tz(e,i)}`)
                    }

                    function I(e, t, i, l) {
                        return "idle" === d && !!tq(e, t) && (F(e, t, tO((0, ee.q)())), k(e, t, l, i), !0)
                    }
                    let B = {
                        get phase() {
                            return d
                        },
                        get current() {
                            return c && { ...c
                            }
                        },
                        open(e, t, {
                            source: i,
                            how: l
                        }) {
                            I(e, t, i, l)
                        },
                        requestClose() {
                            if (!c || y === c || "open" !== d && "opening" !== d) return;
                            let {
                                host: e,
                                kind: i
                            } = c;
                            if ("self" === e) {
                                let {
                                    slug: e
                                } = c;
                                z(t => (function(e, t, i) {
                                    let {
                                        transition: l,
                                        history: r
                                    } = i.ctx, s = l.from;
                                    if (null !== s && null !== s && !tl.test(s) && ("project" !== e || "/" !== s)) return i.back(r.depth + 1, s), !1;
                                    if ("post" === e) return l.navigate("/insights"), !0;
                                    let n = l.origin();
                                    return l.navigate("/", {
                                        scroll: "keep",
                                        rest: !0
                                    }), tr(t, i, e => {
                                        e || i.ctx.reduced ? i.closeOnto(e) : l.swap(() => i.unmount(), {
                                            origin: n
                                        })
                                    }), !0
                                })(i, e, t));
                                return
                            }
                            $(t.history.depth, () => {
                                t.history.push("route", {}, tR[e]), M()
                            })
                        },
                        navigateTo(e, t) {
                            c && "open" === d && e !== c.slug && tq(c.kind, e) && (F(c.kind, e, c.host), O(e, t))
                        },
                        edgeCommit(e) {
                            if (!c || "open" !== d) return;
                            let t = (0, et.t)(c.kind, c.slug),
                                i = "down" === e ? t ? .next : t ? .prev;
                            i ? B.navigateTo(i, "down" === e ? "teaser" : "above") : B.requestClose()
                        },
                        adopt(e, t, i) {
                            let l = (0, G.l)(history.state),
                                r = "overlay" === l.kind ? tH(l) : null,
                                s = r ? .kind === e ? r.slug : t;
                            if (null !== c && c.kind === e && c.slug === s) {
                                c = { ...c,
                                    host: "self"
                                }, m = [], o.rehost("self");
                                return
                            }
                            H(), k(e, s, i, null)
                        },
                        routed(e) {
                            if (c && "closing" === d && e !== tz(c.kind, c.slug)) return void o.rehost("insights" === e ? "insights" : "home");
                            if (!c || "closing" === d || e === tz(c.kind, c.slug) || "traverse" === t.transition.arrival) return;
                            let i = c;
                            W(() => c === i && H())
                        },
                        destroy() {
                            for (let e of (clearTimeout(i), c && "self" !== c.host && t.history.push("route", {}, tR[c.host]), V)) e();
                            n(), H()
                        }
                    };

                    function D(e) {
                        var t;
                        let i;
                        y = null;
                        let l = void 0 !== e.route && e.route !== (0, ee.q)();
                        if ("overlay" === e.kind) {
                            let t, i = tH(e);
                            if (!i) return;
                            let {
                                kind: r,
                                slug: s
                            } = i, n = () => null !== c && c.kind === r && c.slug === s;
                            if (l) return void W(() => {
                                n() || (H(), k(r, s, "instant", null))
                            });
                            if (n()) return;
                            if (null !== c && c.kind === r) return void q(s);
                            H();
                            let a = (t = "project" === r ? j(s) && b(s) : [...document.querySelectorAll(`a[data-post="${s}"]`)].find(e => !o.els.root.contains(e))) ? "post" === r ? tC(t) : {
                                link: t,
                                media: null,
                                title: null
                            } : null;
                            return void k(r, s, a ? "flight" : "instant", a)
                        }
                        if (!c) return;
                        if (l) {
                            if ("project" === c.kind && "" === e.route) {
                                let {
                                    slug: e
                                } = c;
                                z(t => (tr(e, t, e => t.closeOnto(e)), !0));
                                return
                            }
                            let t = c;
                            W(() => c === t && H());
                            return
                        }
                        if ("self" !== c.host) return void M();
                        let r = (t = e.route, (i = t ? .match(/^(work|insights)\/([^/]+)$/)) ? {
                            kind: "work" === i[1] ? "project" : "post",
                            slug: i[2]
                        } : null);
                        r ? .kind === c.kind && r.slug !== c.slug && q(r.slug)
                    }
                    let V = [t.history.on("overlay", D), t.transition.onNavigate(e => {
                            if (!c || e.rest || null === e.href) return;
                            let t = c;
                            e.covered.then(() => {
                                c === t && H()
                            })
                        }), t.history.onTraverse(e => "overlay" !== e.kind && D(e)), (0, Z.A)("videos", e => void(s = e)), (0, Z.A)("ribbon", e => {
                            n(), r = e ? .transition ? ? null, n = e ? .transition.onCardClick(e => {
                                if ("idle" !== d) return;
                                a.opened(e);
                                let i = b(e.slug);
                                I("project", e.slug, {
                                    link: i,
                                    media: null,
                                    title: null
                                }, "flight") || t.transition.navigate(e.href)
                            }) ? ? (() => {})
                        }), a.keep(() => c ? .kind === "project" && "home" === c.host ? j(c.slug) : null), (0, Z.M)("overlay", B), () => {}],
                        Y = {
                            signal: t.signal
                        };
                    return addEventListener("click", function(e) {
                        let t, i, l = e.target ? .closest ? .("a[href]");
                        if (!(!(l instanceof HTMLAnchorElement) || o.els.root.contains(l) || tW(e) || l.target && "_self" !== l.target)) {
                            if (l.matches("#work .proj__card")) {
                                if (r) return;
                                t = "project", i = l.closest(".proj") ? .dataset.slug
                            } else t = "post", i = l.dataset.post ? ? l.pathname.match(t$) ? .[1];
                            i && tq(t, i) && (e.preventDefault(), e.stopPropagation(), I(t, i, "post" === t ? tC(l) : {
                                link: l,
                                media: null,
                                title: null
                            }, "flight"))
                        }
                    }, { ...Y,
                        capture: !0
                    }), o.els.root.addEventListener("click", function(e) {
                        if ("handing" === d) return void e.preventDefault();
                        let t = e.target,
                            i = t.closest("a");
                        if (i ? .hasAttribute("data-close")) {
                            e.preventDefault(), B.requestClose();
                            return
                        }
                        let l = i ? .dataset.next;
                        if (l) {
                            if (tW(e)) return;
                            e.preventDefault(), B.navigateTo(l, i.classList.contains("pj-teaser__card") ? "teaser" : "below");
                            return
                        }!i && t.matches(".ov-scroll, .ov-content, .ov-page, .pa, .pj, .pj-wrap") && B.requestClose()
                    }, Y), addEventListener("keydown", function(e) {
                        var t;
                        let i, l, r, s;
                        "Escape" === e.key && ("open" === d || "opening" === d) && B.requestClose(), "Tab" !== e.key || o.els.root.hidden || (t = e, l = [...(i = o.els.root).querySelectorAll("a[href], button:not(:disabled), input, select, textarea, [tabindex]")].filter(e => e.tabIndex >= 0 && !e.closest("[inert]") && e.getClientRects().length > 0), r = document.activeElement, !(s = t.shiftKey ? l[0] : l.at(-1)) || i.contains(r) && r !== s || (t.preventDefault(), (t.shiftKey ? l.at(-1) : l[0]).focus()))
                    }, Y), B
                }(t);
                return d.current = i, () => {
                    i.destroy(), d.current = null
                }
            });
            let c = (0, l.useSelectedLayoutSegments)().join("/");
            (0, r.useLayoutEffect)(() => d.current ? .routed(c), [c]);
            let u = a.find(e => "leaving" !== e.role),
                p = u ? .kind === "post";
            return (0, i.jsxs)("div", {
                id: "overlay",
                className: p ? "overlay pa" : "overlay",
                role: "dialog",
                "aria-modal": "true",
                "aria-label": p ? h.f.overlay.note : h.f.overlay.dialog,
                "aria-hidden": "true",
                hidden: !0,
                children: [(0, i.jsx)("div", {
                    className: "ov-bar",
                    children: (0, i.jsx)("a", {
                        className: "ov-close",
                        href: p ? "/insights" : "/",
                        "data-close": !0,
                        children: p ? h.f.post.close : h.f.project.close
                    })
                }), (0, i.jsxs)("button", {
                    className: "ov-pull",
                    type: "button",
                    tabIndex: -1,
                    children: [(0, i.jsxs)("svg", {
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: [(0, i.jsx)("circle", {
                            className: "ov-pull__track",
                            cx: "12",
                            cy: "12",
                            r: T.J
                        }), (0, i.jsx)("circle", {
                            className: "ov-pull__ring",
                            cx: "12",
                            cy: "12",
                            r: T.J
                        })]
                    }), (0, i.jsx)("span", {
                        className: "ov-pull__label",
                        children: u && (t = u.kind, n = u.slug, o = (0, et.t)(t, n) ? .prev, "post" === t ? o ? h.f.overlay.pullNewer : h.f.overlay.pullNewest : o ? (0, et.u)(o) ? .title ? ? "" : h.f.overlay.pullFirst)
                    })]
                }), (0, i.jsx)("div", {
                    className: "ov-scroll",
                    "data-lenis-prevent": !0,
                    children: (0, i.jsx)("div", {
                        className: "ov-content",
                        children: a.map(e => (0, i.jsx)(tB, { ...e
                        }, (0, e8.X)(e.kind, e.slug)))
                    })
                })]
            })
        }], 45010)
    }, 30036, e => {
        var t = "1.3.26";

        function i(e, t, i) {
            return Math.max(e, Math.min(t, i))
        }
        var l = class {
                isRunning = !1;
                value = 0;
                from = 0;
                to = 0;
                currentTime = 0;
                lerp;
                duration;
                easing;
                onUpdate;
                advance(e) {
                    if (!this.isRunning) return;
                    let t = !1;
                    if (this.duration && this.easing) {
                        this.currentTime += e;
                        let l = i(0, this.currentTime / this.duration, 1),
                            r = (t = l >= 1) ? 1 : this.easing(l);
                        this.value = this.from + (this.to - this.from) * r
                    } else if (this.lerp) {
                        var l, r, s, n;
                        this.value = (l = this.value, r = this.to, s = 60 * this.lerp, (1 - (n = 1 - Math.exp(-s * e))) * l + n * r), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t = !0)
                    } else this.value = this.to, t = !0;
                    t && this.stop(), this.onUpdate ? .(this.value, t)
                }
                stop() {
                    this.isRunning = !1
                }
                fromTo(e, t, {
                    lerp: i,
                    duration: l,
                    easing: r,
                    onStart: s,
                    onUpdate: n
                }) {
                    this.from = this.value = e, this.to = t, this.lerp = i, this.duration = l, this.easing = r, this.currentTime = 0, this.isRunning = !0, s ? .(), this.onUpdate = n
                }
            },
            r = class {
                width = 0;
                height = 0;
                scrollHeight = 0;
                scrollWidth = 0;
                debouncedResize;
                wrapperResizeObserver;
                contentResizeObserver;
                constructor(e, t, {
                    autoResize: i = !0,
                    debounce: l = 250
                } = {}) {
                    if (this.wrapper = e, this.content = t, i) {
                        var r;
                        let e;
                        this.debouncedResize = (r = this.resize, function(...t) {
                            clearTimeout(e), e = setTimeout(() => {
                                e = void 0, r.apply(this, t)
                            }, l)
                        }), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)
                    }
                    this.resize()
                }
                destroy() {
                    this.wrapperResizeObserver ? .disconnect(), this.contentResizeObserver ? .disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize)
                }
                resize = () => {
                    this.onWrapperResize(), this.onContentResize()
                };
                onWrapperResize = () => {
                    this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight)
                };
                onContentResize = () => {
                    this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth)
                };
                get limit() {
                    return {
                        x: this.scrollWidth - this.width,
                        y: this.scrollHeight - this.height
                    }
                }
            },
            s = class {
                events = {};
                emit(e, ...t) {
                    let i = this.events[e] || [];
                    for (let e = 0, l = i.length; e < l; e++) i[e] ? .(...t)
                }
                on(e, t) {
                    return this.events[e] ? this.events[e].push(t) : this.events[e] = [t], () => {
                        this.events[e] = this.events[e] ? .filter(e => t !== e)
                    }
                }
                off(e, t) {
                    this.events[e] = this.events[e] ? .filter(e => t !== e)
                }
                destroy() {
                    this.events = {}
                }
            };
        let n = 100 / 6,
            o = {
                passive: !1
            };

        function a(e, t) {
            return 1 === e ? n : 2 === e ? t : 1
        }
        var d = class {
            touchStart = {
                x: 0,
                y: 0
            };
            lastDelta = {
                x: 0,
                y: 0
            };
            window = {
                width: 0,
                height: 0
            };
            emitter = new s;
            constructor(e, t = {
                wheelMultiplier: 1,
                touchMultiplier: 1
            }) {
                this.element = e, this.options = t, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, o), this.element.addEventListener("touchstart", this.onTouchStart, o), this.element.addEventListener("touchmove", this.onTouchMove, o), this.element.addEventListener("touchend", this.onTouchEnd, o)
            }
            on(e, t) {
                return this.emitter.on(e, t)
            }
            destroy() {
                this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, o), this.element.removeEventListener("touchstart", this.onTouchStart, o), this.element.removeEventListener("touchmove", this.onTouchMove, o), this.element.removeEventListener("touchend", this.onTouchEnd, o)
            }
            onTouchStart = e => {
                let {
                    clientX: t,
                    clientY: i
                } = e.targetTouches ? e.targetTouches[0] : e;
                this.touchStart.x = t, this.touchStart.y = i, this.lastDelta = {
                    x: 0,
                    y: 0
                }, this.emitter.emit("scroll", {
                    deltaX: 0,
                    deltaY: 0,
                    event: e
                })
            };
            onTouchMove = e => {
                let {
                    clientX: t,
                    clientY: i
                } = e.targetTouches ? e.targetTouches[0] : e, l = -(t - this.touchStart.x) * this.options.touchMultiplier, r = -(i - this.touchStart.y) * this.options.touchMultiplier;
                this.touchStart.x = t, this.touchStart.y = i, this.lastDelta = {
                    x: l,
                    y: r
                }, this.emitter.emit("scroll", {
                    deltaX: l,
                    deltaY: r,
                    event: e
                })
            };
            onTouchEnd = e => {
                this.emitter.emit("scroll", {
                    deltaX: this.lastDelta.x,
                    deltaY: this.lastDelta.y,
                    event: e
                })
            };
            onWheel = e => {
                let {
                    deltaX: t,
                    deltaY: i,
                    deltaMode: l
                } = e, r = a(l, this.window.width), s = a(l, this.window.height);
                t *= r, i *= s, t *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
                    deltaX: t,
                    deltaY: i,
                    event: e
                })
            };
            onWindowResize = () => {
                this.window = {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }
        };
        let c = e => Math.min(1, 1.001 - 2 ** (-10 * e));
        var h = class {
                _isScrolling = !1;
                _isStopped = !1;
                _isLocked = !1;
                _preventNextNativeScrollEvent = !1;
                _resetVelocityTimeout = null;
                _rafId = null;
                _isDraggingSelection = !1;
                reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
                isTouching;
                isIos;
                time = 0;
                userData = {};
                lastVelocity = 0;
                velocity = 0;
                direction = 0;
                options;
                targetScroll;
                animatedScroll;
                animate = new l;
                emitter = new s;
                dimensions;
                virtualScroll;
                constructor({
                    wrapper: e = window,
                    content: i = document.documentElement,
                    eventsTarget: l = e,
                    smoothWheel: s = !0,
                    syncTouch: n = !1,
                    syncTouchLerp: o = .075,
                    touchInertiaExponent: a = 1.7,
                    duration: h,
                    easing: u,
                    lerp: p = .1,
                    infinite: m = !1,
                    orientation: f = "vertical",
                    gestureOrientation: g = "horizontal" === f ? "both" : "vertical",
                    touchMultiplier: v = 1,
                    wheelMultiplier: y = 1,
                    autoResize: j = !0,
                    prevent: b,
                    virtualScroll: x,
                    overscroll: w = !0,
                    autoRaf: _ = !1,
                    anchors: S = !1,
                    autoToggle: E = !1,
                    allowNestedScroll: k = !1,
                    __experimental__naiveDimensions: N = !1,
                    naiveDimensions: T = N,
                    stopInertiaOnNavigate: L = !1,
                    respectReducedMotion: A = !0
                } = {}) {
                    window.lenisVersion = t, window.lenis || (window.lenis = {}), window.lenis.version = t, "horizontal" === f && (window.lenis.horizontal = !0), !0 === n && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), e && e !== document.documentElement || (e = window), "number" == typeof h && "function" != typeof u ? u = c : "function" == typeof u && "number" != typeof h && (h = 1), this.options = {
                        wrapper: e,
                        content: i,
                        eventsTarget: l,
                        smoothWheel: s,
                        syncTouch: n,
                        syncTouchLerp: o,
                        touchInertiaExponent: a,
                        duration: h,
                        easing: u,
                        lerp: p,
                        infinite: m,
                        gestureOrientation: g,
                        orientation: f,
                        touchMultiplier: v,
                        wheelMultiplier: y,
                        autoResize: j,
                        prevent: b,
                        virtualScroll: x,
                        overscroll: w,
                        autoRaf: _,
                        anchors: S,
                        autoToggle: E,
                        allowNestedScroll: k,
                        naiveDimensions: T,
                        stopInertiaOnNavigate: L,
                        respectReducedMotion: A
                    }, this.dimensions = new r(e, i, {
                        autoResize: j
                    }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
                        capture: !0
                    }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new d(l, {
                        touchMultiplier: v,
                        wheelMultiplier: y
                    }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf))
                }
                destroy() {
                    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
                        capture: !0
                    }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId)
                }
                on(e, t) {
                    return this.emitter.on(e, t)
                }
                off(e, t) {
                    return this.emitter.off(e, t)
                }
                onScrollEnd = e => {
                    e instanceof CustomEvent || "smooth" !== this.isScrolling && !1 !== this.isScrolling || e.stopPropagation()
                };
                dispatchScrollendEvent = () => {
                    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
                        bubbles: this.options.wrapper === window,
                        detail: {
                            lenisScrollEnd: !0
                        }
                    }))
                };
                get overflow() {
                    let e = this.isHorizontal ? "overflow-x" : "overflow-y";
                    return getComputedStyle(this.rootElement)[e]
                }
                checkOverflow() {
                    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart()
                }
                onTransitionEnd = e => {
                    e.propertyName ? .includes("overflow") && e.target === this.rootElement && this.checkOverflow()
                };
                setScroll(e) {
                    this.isHorizontal ? this.options.wrapper.scrollTo({
                        left: e,
                        behavior: "instant"
                    }) : this.options.wrapper.scrollTo({
                        top: e,
                        behavior: "instant"
                    })
                }
                onClick = e => {
                    let t = e.composedPath().filter(e => e instanceof HTMLAnchorElement && e.href).map(e => new URL(e.href)),
                        i = new URL(window.location.href);
                    if (this.options.anchors) {
                        let e = t.find(e => i.host === e.host && i.pathname === e.pathname && e.hash);
                        if (e) {
                            let t = "object" == typeof this.options.anchors && this.options.anchors ? this.options.anchors : void 0,
                                i = decodeURIComponent(e.hash);
                            this.scrollTo(i, t);
                            return
                        }
                    }
                    if (this.options.stopInertiaOnNavigate && t.some(e => i.host === e.host && i.pathname !== e.pathname)) return void this.reset()
                };
                onPointerDown = e => {
                    1 === e.button && this.reset()
                };
                isTouchOnSelectionHandle(e) {
                    let t = window.getSelection();
                    if (!t || t.isCollapsed || 0 === t.rangeCount) return !1;
                    let i = e.targetTouches[0] ? ? e.changedTouches[0];
                    if (!i) return !1;
                    let l = t.getRangeAt(0).getClientRects();
                    if (0 === l.length) return !1;
                    let r = l[0],
                        s = l[l.length - 1],
                        n = 40 >= Math.hypot(i.clientX - r.left, i.clientY - r.top),
                        o = 40 >= Math.hypot(i.clientX - s.right, i.clientY - s.bottom);
                    return n || o
                }
                onVirtualScroll = e => {
                    if ("function" == typeof this.options.virtualScroll && !1 === this.options.virtualScroll(e)) return;
                    let {
                        deltaX: t,
                        deltaY: i,
                        event: l
                    } = e;
                    if (this.emitter.emit("virtual-scroll", {
                            deltaX: t,
                            deltaY: i,
                            event: l
                        }), l.ctrlKey || l.lenisStopPropagation) return;
                    let r = l.type.includes("touch"),
                        s = l.type.includes("wheel");
                    if (r && this.isIos && ("touchstart" === l.type && (this._isDraggingSelection = this.isTouchOnSelectionHandle(l)), this._isDraggingSelection)) {
                        "touchend" === l.type && (this._isDraggingSelection = !1);
                        return
                    }
                    this.isTouching = "touchstart" === l.type || "touchmove" === l.type;
                    let n = 0 === t && 0 === i;
                    if (this.options.syncTouch && r && "touchstart" === l.type && n && !this.isStopped && !this.isLocked) return void this.reset();
                    let o = "vertical" === this.options.gestureOrientation && 0 === i || "horizontal" === this.options.gestureOrientation && 0 === t;
                    if (n || o) return;
                    let a = l.composedPath();
                    a = a.slice(0, a.indexOf(this.rootElement));
                    let d = this.options.prevent,
                        c = Math.abs(t) >= Math.abs(i) ? "horizontal" : "vertical";
                    if (a.find(e => e instanceof HTMLElement && ("function" == typeof d && d ? .(e) || e.hasAttribute ? .("data-lenis-prevent") || "vertical" === c && e.hasAttribute ? .("data-lenis-prevent-vertical") || "horizontal" === c && e.hasAttribute ? .("data-lenis-prevent-horizontal") || r && e.hasAttribute ? .("data-lenis-prevent-touch") || s && e.hasAttribute ? .("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(e, {
                            deltaX: t,
                            deltaY: i
                        })))) return;
                    if (this.isStopped || this.isLocked) {
                        l.cancelable && l.preventDefault();
                        return
                    }
                    if (!(this.options.syncTouch && r || this.options.smoothWheel && s)) {
                        this.isScrolling = "native", this.animate.stop(), l.lenisStopPropagation = !0;
                        return
                    }
                    let h = i;
                    "both" === this.options.gestureOrientation ? h = Math.abs(i) > Math.abs(t) ? i : t : "horizontal" === this.options.gestureOrientation && (h = t), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || 0 === this.animatedScroll && i > 0 || this.animatedScroll === this.limit && i < 0)) && (l.lenisStopPropagation = !0), l.cancelable && l.preventDefault();
                    let u = r && this.options.syncTouch,
                        p = r && "touchend" === l.type;
                    p && (h = Math.sign(h) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + h, {
                        programmatic: !1,
                        ...u ? {
                            lerp: p ? this.options.syncTouchLerp : 1
                        } : {
                            lerp: this.options.lerp,
                            duration: this.options.duration,
                            easing: this.options.easing
                        }
                    })
                };
                resize() {
                    this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit()
                }
                emit() {
                    this.emitter.emit("scroll", this)
                }
                onNativeScroll = () => {
                    if (null !== this._resetVelocityTimeout && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
                        this._preventNextNativeScrollEvent = !1;
                        return
                    }
                    if (!1 === this.isScrolling || "native" === this.isScrolling) {
                        let e = this.animatedScroll;
                        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - e, this.direction = Math.sign(this.animatedScroll - e), this.isStopped || (this.isScrolling = "native"), this.emit(), 0 !== this.velocity && (this._resetVelocityTimeout = setTimeout(() => {
                            this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit()
                        }, 400))
                    }
                };
                reset() {
                    this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop()
                }
                start() {
                    if (this.isStopped) {
                        if (this.options.autoToggle) return void this.rootElement.style.removeProperty("overflow");
                        this.internalStart()
                    }
                }
                internalStart() {
                    this.isStopped && (this.reset(), this.isStopped = !1, this.emit())
                }
                stop() {
                    if (!this.isStopped) {
                        if (this.options.autoToggle) return void this.rootElement.style.setProperty("overflow", "clip");
                        this.internalStop()
                    }
                }
                internalStop() {
                    this.isStopped || (this.reset(), this.isStopped = !0, this.emit())
                }
                raf = e => {
                    let t = e - (this.time || e);
                    this.time = e, this.animate.advance(.001 * t), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf))
                };
                scrollTo(e, {
                    offset: t = 0,
                    immediate: l = !1,
                    lock: r = !1,
                    programmatic: s = !0,
                    lerp: n = s ? this.options.lerp : void 0,
                    duration: o = s ? this.options.duration : void 0,
                    easing: a = s ? this.options.easing : void 0,
                    onStart: d,
                    onComplete: h,
                    force: u = !1,
                    userData: p
                } = {}) {
                    if (this.prefersReducedMotion && (s ? l = !0 : (n = 1, o = void 0, a = void 0)), (this.isStopped || this.isLocked) && !u) return;
                    let m = e,
                        f = t;
                    if ("string" == typeof m && ["top", "left", "start", "#"].includes(m)) m = 0;
                    else if ("string" == typeof m && ["bottom", "right", "end"].includes(m)) m = this.limit;
                    else {
                        let e = null;
                        if ("string" == typeof m ? (e = m.startsWith("#") ? document.getElementById(m.slice(1)) : document.querySelector(m)) || ("#top" === m ? m = 0 : console.warn("Lenis: Target not found", m)) : m instanceof HTMLElement && m ? .nodeType && (e = m), e) {
                            if (this.options.wrapper !== window) {
                                let e = this.rootElement.getBoundingClientRect();
                                f -= this.isHorizontal ? e.left : e.top
                            }
                            let t = e.getBoundingClientRect(),
                                i = getComputedStyle(e),
                                l = this.isHorizontal ? Number.parseFloat(i.scrollMarginLeft) : Number.parseFloat(i.scrollMarginTop),
                                r = getComputedStyle(this.rootElement),
                                s = this.isHorizontal ? Number.parseFloat(r.scrollPaddingLeft) : Number.parseFloat(r.scrollPaddingTop);
                            m = (this.isHorizontal ? t.left : t.top) + this.animatedScroll - (Number.isNaN(l) ? 0 : l) - (Number.isNaN(s) ? 0 : s)
                        }
                    }
                    if ("number" == typeof m) {
                        if (m += f, this.options.infinite) {
                            if (s) {
                                this.targetScroll = this.animatedScroll = this.scroll;
                                let e = m - this.animatedScroll;
                                e > this.limit / 2 ? m -= this.limit : e < -this.limit / 2 && (m += this.limit)
                            }
                        } else m = i(0, m, this.limit);
                        if (m === this.targetScroll) {
                            d ? .(this), h ? .(this);
                            return
                        }
                        if (this.userData = p ? ? {}, l) {
                            this.animatedScroll = this.targetScroll = m, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), h ? .(this), this.userData = {}, requestAnimationFrame(() => {
                                this.dispatchScrollendEvent()
                            });
                            return
                        }
                        s || (this.targetScroll = m), "number" == typeof o && "function" != typeof a ? a = c : "function" == typeof a && "number" != typeof o && (o = 1), this.animate.fromTo(this.animatedScroll, m, {
                            duration: o,
                            easing: a,
                            lerp: n,
                            onStart: () => {
                                r && (this.isLocked = !0), this.isScrolling = "smooth", d ? .(this)
                            },
                            onUpdate: (e, t) => {
                                this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = e - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = e, this.setScroll(this.scroll), s && (this.targetScroll = e), t || this.emit(), t && (this.reset(), this.emit(), h ? .(this), this.userData = {}, requestAnimationFrame(() => {
                                    this.dispatchScrollendEvent()
                                }), this.preventNextNativeScrollEvent())
                            }
                        })
                    }
                }
                preventNextNativeScrollEvent() {
                    this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
                        this._preventNextNativeScrollEvent = !1
                    })
                }
                hasNestedScroll(e, {
                    deltaX: t,
                    deltaY: i
                }) {
                    let l, r, s, n, o, a, d, c, h, u, p, m, f, g, v, y, j = Date.now();
                    e._lenis || (e._lenis = {});
                    let b = e._lenis;
                    if (j - (b.time ? ? 0) > 2e3) {
                        b.time = Date.now();
                        let t = window.getComputedStyle(e);
                        if (b.computedStyle = t, l = ["auto", "overlay", "scroll"].includes(t.overflowX), r = ["auto", "overlay", "scroll"].includes(t.overflowY), o = ["auto"].includes(t.overscrollBehaviorX), a = ["auto"].includes(t.overscrollBehaviorY), b.hasOverflowX = l, b.hasOverflowY = r, !(l || r)) return !1;
                        d = e.scrollWidth, c = e.scrollHeight, h = e.clientWidth, u = e.clientHeight, s = d > h, n = c > u, b.isScrollableX = s, b.isScrollableY = n, b.scrollWidth = d, b.scrollHeight = c, b.clientWidth = h, b.clientHeight = u, b.hasOverscrollBehaviorX = o, b.hasOverscrollBehaviorY = a
                    } else s = b.isScrollableX, n = b.isScrollableY, l = b.hasOverflowX, r = b.hasOverflowY, d = b.scrollWidth, c = b.scrollHeight, h = b.clientWidth, u = b.clientHeight, o = b.hasOverscrollBehaviorX, a = b.hasOverscrollBehaviorY;
                    if (!(l && s || r && n)) return !1;
                    let x = Math.abs(t) >= Math.abs(i) ? "horizontal" : "vertical";
                    if ("horizontal" === x) p = Math.round(e.scrollLeft), m = d - h, f = t, g = l, v = s, y = o;
                    else {
                        if ("vertical" !== x) return !1;
                        p = Math.round(e.scrollTop), m = c - u, f = i, g = r, v = n, y = a
                    }
                    return !y && (p >= m || p <= 0) || (f > 0 ? p < m : p > 0) && g && v
                }
                get rootElement() {
                    return this.options.wrapper === window ? document.documentElement : this.options.wrapper
                }
                get limit() {
                    return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
                }
                get isHorizontal() {
                    return "horizontal" === this.options.orientation
                }
                get actualScroll() {
                    let e = this.options.wrapper;
                    return this.isHorizontal ? e.scrollX ? ? e.scrollLeft : e.scrollY ? ? e.scrollTop
                }
                get scroll() {
                    var e;
                    return this.options.infinite ? (this.animatedScroll % (e = this.limit) + e) % e : this.animatedScroll
                }
                get progress() {
                    return 0 === this.limit ? 1 : this.scroll / this.limit
                }
                get isScrolling() {
                    return this._isScrolling
                }
                set isScrolling(e) {
                    this._isScrolling !== e && (this._isScrolling = e, this.updateClassName())
                }
                get isStopped() {
                    return this._isStopped
                }
                set isStopped(e) {
                    this._isStopped !== e && (this._isStopped = e, this.updateClassName())
                }
                get isLocked() {
                    return this._isLocked
                }
                set isLocked(e) {
                    this._isLocked !== e && (this._isLocked = e, this.updateClassName())
                }
                get isSmooth() {
                    return "smooth" === this.isScrolling
                }
                get prefersReducedMotion() {
                    return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches
                }
                get className() {
                    let e = "lenis";
                    return this.options.autoToggle && (e += " lenis-autoToggle"), this.isStopped && (e += " lenis-stopped"), this.isLocked && (e += " lenis-locked"), this.isScrolling && (e += " lenis-scrolling"), "smooth" === this.isScrolling && (e += " lenis-smooth"), e
                }
                updateClassName() {
                    this.cleanUpClassName(), this.className.split(" ").forEach(e => {
                        this.rootElement.classList.add(e)
                    })
                }
                cleanUpClassName() {
                    for (let e of Array.from(this.rootElement.classList))("lenis" === e || e.startsWith("lenis-")) && this.rootElement.classList.remove(e)
                }
            },
            u = e.i(27773),
            p = e.i(17724);
        let m = "motion-stopped",
            f = e => "string" == typeof e ? document.querySelector(e) : e;
        e.s(["f", 0, function(e) {
            return e.reduced ? function({
                ScrollTrigger: e,
                own: t
            }) {
                let i = t ? .wrapper ? ? null,
                    l = document.documentElement,
                    r = i ? ? l,
                    s = () => i ? i.scrollTop : scrollY,
                    n = () => Math.max(0, r.scrollHeight - (i ? i.clientHeight : innerHeight));
                return {
                    lenis: null,
                    get y() {
                        return s()
                    },
                    get target() {
                        return s()
                    },
                    velocity: 0,
                    lag: 0,
                    get limit() {
                        return n()
                    },
                    get stopped() {
                        return r.classList.contains(m)
                    },
                    to(t, {
                        offset: l = 0
                    } = {}) {
                        let r = ((e, t) => {
                            if ("number" == typeof e) return e + t;
                            let l = f(e);
                            if (!l) return null;
                            let r = i ? i.getBoundingClientRect().top : 0;
                            return l.getBoundingClientRect().top - r + s() + t
                        })(t, l);
                        if (null !== r) {
                            let t = Math.min(n(), Math.max(0, r));
                            i ? i.scrollTop = t : (scrollTo(0, t), e.update())
                        }
                        return Promise.resolve()
                    },
                    stop: () => r.classList.add(m),
                    start() {
                        r.classList.remove(m)
                    },
                    resize: () => {},
                    onScroll(e) {
                        let t = i ? ? window,
                            l = () => e(s());
                        return t.addEventListener("scroll", l, {
                            passive: !0
                        }), () => t.removeEventListener("scroll", l)
                    },
                    destroy() {
                        r.classList.remove(m)
                    }
                }
            }(e) : function({
                ScrollTrigger: e,
                own: t
            }) {
                let i = new h({ ...t ? {
                            wrapper: t.wrapper,
                            content: t.content,
                            ...t.lenis
                        } : u.m,
                        smoothWheel: !0,
                        autoRaf: !1,
                        respectReducedMotion: !1
                    }),
                    l = t ? () => {} : i.on("scroll", () => e.update()),
                    r = (0, p.f)(t ? "lenis:own" : "lenis", e => i.raf(1e3 * e), {
                        first: !0
                    }),
                    s = null,
                    n = () => {
                        let e = s;
                        s = null, e ? .()
                    },
                    o = i.on("virtual-scroll", n);
                return {
                    lenis: i,
                    get y() {
                        return i.animatedScroll
                    },
                    get target() {
                        return i.targetScroll
                    },
                    get velocity() {
                        return i.velocity
                    },
                    get lag() {
                        return i.targetScroll - i.animatedScroll
                    },
                    get limit() {
                        return i.limit
                    },
                    get stopped() {
                        return i.isStopped
                    },
                    to(l, {
                        immediate: r = !1,
                        offset: o = 0,
                        duration: a,
                        easing: d
                    } = {}) {
                        n();
                        let c = "number" == typeof l ? l : f(l);
                        return null === c ? Promise.resolve() : r ? ("smooth" !== i.isScrolling || i.isStopped || (i.stop(), i.start()), i.scrollTo(c, {
                            offset: o,
                            immediate: !0,
                            force: !0
                        }), t || e.update(), Promise.resolve()) : new Promise(e => {
                            s = e, i.scrollTo(c, {
                                offset: o,
                                duration: a,
                                easing: d,
                                force: !0,
                                onComplete: () => {
                                    s === e && n()
                                }
                            })
                        })
                    },
                    stop() {
                        n(), i.stop()
                    },
                    start() {
                        i.start()
                    },
                    resize: () => i.resize(),
                    onScroll: e => i.on("scroll", () => e(i.animatedScroll)),
                    destroy() {
                        n(), o(), l(), r(), i.destroy()
                    }
                }
            }(e)
        }], 30036)
    }, 98631, e => {
        var t = e.i(10629);
        let i = null;
        e.s(["V", 0, function(e) {
            i || ((i = document.createElement("div")).className = "f-vid-park", i.setAttribute("aria-hidden", "true"), i.style.cssText = t.Y, document.body.append(i)), i.append(e)
        }, "m", 0, function(e) {
            e.remove(), i && !i.childElementCount && (i.remove(), i = null)
        }])
    }])
})();