(() => {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 7200, e => {
        var t = e.i(18050),
            r = e.i(71645),
            n = e.i(46281),
            l = e.i(93122),
            a = e.i(47193);
        e.s(["default", 0, function() {
            let e = (0, r.useRef)(null);
            return (0, n.f)("hero", t => (function(e, t) {
                let r = t.closest(".hero"),
                    n = r ? .querySelector(".hero__inner");
                if (!r || !n) return () => {};
                let o = document.querySelector(".atf-what") ? .style;
                e.readiness.expect("hero");
                let i = -1,
                    s = (t, a = !1) => {
                        let s = r.offsetHeight || innerHeight,
                            c = Math.max(0, Math.min(t, s));
                        if (!a && c === i) return;
                        i = c;
                        let u = (c * l.S.parallax * (e.phone() ? l.j : 1)).toFixed(2);
                        n.style.transform = c ? `translate3d(0, ${u}px, 0)` : "", c ? o ? .setProperty("--hero-y", `${u}px`) : o ? .removeProperty("--hero-y");
                        let d = (c / s - l.S.fadeStart) / Math.max(.001, l.S.fadeEnd - l.S.fadeStart);
                        r.style.setProperty("--hero-fade", Math.min(1, Math.max(0, d)).toFixed(3))
                    };
                s(e.scroll.y, !0);
                let c = e.scroll.onScroll(e => s(e)),
                    u = (0, a.f)(e, {
                        hook: "hero",
                        host: t,
                        layer: r,
                        params: l.S,
                        frame: l.c,
                        settled: () => e.readiness.report("hero", 1),
                        refreshed: () => s(e.scroll.y, !0)
                    });
                return () => {
                    c(), u(), n.style.transform = "", o ? .removeProperty("--hero-y"), r.style.removeProperty("--hero-fade")
                }
            })(t, e.current), e), (0, t.jsx)("div", {
                className: "hero__wave",
                ref: e
            })
        }], 7200)
    }, 319, e => {
        var t = e.i(18050),
            r = e.i(71645),
            n = e.i(8089),
            l = e.i(34479),
            a = e.i(86860);
        let o = e => String(e).padStart(2, "0"),
            i = () => () => {};
        e.s(["default", 0, function({
            title: e,
            items: s
        }) {
            let [c, u] = (0, r.useState)(0), [d, f] = (0, r.useState)(""), h = (0, r.useSyncExternalStore)(i, () => !0, () => !1), p = (0, r.useRef)([]), m = (0, r.useRef)(null);
            (0, r.useEffect)(() => () => void m.current ? .kill(), []);
            let y = e => {
                var t;
                let r, n = (e + s.length) % s.length;
                if (n === c || m.current && 1 > m.current.progress()) return;
                let o = p.current[c],
                    i = p.current[n];
                o && i && (m.current = (0, a.r)(o, i, e > c ? 1 : -1)), u(n), f(l.f.reviews.announce(n + 1, s.length, (r = (t = s[n] ? .quote ? ? "").split(/\s+/).filter(Boolean)).length > 12 ? `${r.slice(0,12).join(" ")}…` : t))
            };
            return (0, t.jsxs)("div", {
                className: "f-rv__box",
                role: "group",
                tabIndex: 0,
                "aria-roledescription": "carousel",
                "aria-label": e,
                onKeyDown: e => {
                    "ArrowRight" === e.key ? (e.preventDefault(), y(c + 1)) : "ArrowLeft" === e.key && (e.preventDefault(), y(c - 1))
                },
                children: [(0, t.jsx)("span", {
                    className: "f-rv__mark",
                    "aria-hidden": "true",
                    children: (0, t.jsx)("span", {
                        className: "f-rv__mark-in",
                        children: "“"
                    })
                }), (0, t.jsx)("div", {
                    className: "f-rv__stage",
                    children: s.map((e, r) => (0, t.jsxs)("figure", {
                        className: "f-rv__item",
                        hidden: r !== c,
                        ref: e => {
                            p.current[r] = e
                        },
                        children: [(0, t.jsx)("blockquote", {
                            className: "f-rv__quote",
                            children: e.quote
                        }), (0, t.jsxs)("figcaption", {
                            className: "f-rv__who",
                            children: [(0, t.jsx)("span", {
                                className: "f-rv__dash",
                                "aria-hidden": "true"
                            }), (0, t.jsx)("span", {
                                className: "f-rv__name",
                                children: e.name
                            }), (0, t.jsx)("span", {
                                className: "f-rv__role",
                                children: e.role
                            })]
                        }), e.link && (0, t.jsx)("p", {
                            className: "f-rv__case",
                            children: (0, t.jsxs)(n.SiteLink, {
                                className: "f-rv__link f-u",
                                href: e.link.href,
                                children: [e.link.label, (0, t.jsx)("svg", {
                                    className: "f-rv__arr",
                                    viewBox: "0 0 16 16",
                                    "aria-hidden": "true",
                                    children: (0, t.jsx)("path", {
                                        d: "M4 12 12 4M5.5 4H12v6.5"
                                    })
                                })]
                            })
                        })]
                    }, e.name))
                }), (0, t.jsxs)("div", {
                    className: "f-rv__nav",
                    "aria-hidden": !h || void 0,
                    children: [(0, t.jsx)("button", {
                        className: "f-rv__btn",
                        type: "button",
                        "aria-label": l.f.reviews.prev,
                        onClick: () => y(c - 1),
                        children: "←"
                    }), (0, t.jsxs)("span", {
                        className: "f-rv__count",
                        children: [o(c + 1), (0, t.jsx)("span", {
                            className: "f-rv__sep",
                            children: "/"
                        }), o(s.length)]
                    }), (0, t.jsx)("button", {
                        className: "f-rv__btn",
                        type: "button",
                        "aria-label": l.f.reviews.next,
                        onClick: () => y(c + 1),
                        children: "→"
                    })]
                }), (0, t.jsx)("span", {
                    className: "sr-only",
                    "aria-live": "polite",
                    "aria-atomic": "true",
                    children: d
                })]
            })
        }])
    }, 60740, e => {
        var t = e.i(46281),
            r = e.i(89278),
            n = e.i(36416);
        e.s(["default", 0, function() {
            return (0, t.f)("type-swap", e => void(0, n.f)(e)), (0, t.f)("liquid", e => void(0, r.s)(e)), null
        }])
    }, 51078, e => {
        var t = e.i(46281),
            r = e.i(8915),
            n = e.i(28205),
            l = e.i(70382),
            a = e.i(49442),
            o = e.i(27773),
            i = e.i(17724),
            s = e.i(89970),
            c = e.i(18365);
        let u = [e.i(88718).R, ({
                ScrollTrigger: e
            }) => {
                let t = document.querySelector(".topbar.is-blend"),
                    r = document.getElementById("hero");
                if (t && r) return e.create({
                    id: "topbar-blend",
                    trigger: r,
                    start: "bottom 96px",
                    end: "max",
                    onEnter: () => t.classList.add("is-blend"),
                    onLeaveBack: () => t.classList.remove("is-blend"),
                    onRefresh: e => t.classList.toggle("is-blend", e.scroll() >= e.start)
                }), () => t.classList.add("is-blend")
            }, ({
                gsap: e,
                ScrollTrigger: t,
                reduced: r
            }) => {
                let n = document.querySelector(".topbar");
                if (!n || r) return;
                let l = !1,
                    a = t => {
                        t !== l && (l = t, e.to(n, {
                            y: t ? -c.J.px : 0,
                            duration: c.J.dur,
                            ease: "power1.out",
                            overwrite: !0
                        }))
                    },
                    o = 0;
                t.create({
                    id: "f-nav",
                    start: 0,
                    end: "max",
                    onUpdate: e => {
                        let t = e.scroll(),
                            r = t - o;
                        if (t <= c.J.after) {
                            a(!1), o = t;
                            return
                        }
                        if (r > 0) {
                            if (r < c.J.down) return;
                            a(!0), o = t;
                            return
                        } - r < c.J.up || (a(!1), o = t)
                    }
                });
                let i = () => a(!1);
                return n.addEventListener("focusin", i), () => {
                    n.removeEventListener("focusin", i), e.killTweensOf(n), e.set(n, {
                        clearProps: "transform"
                    })
                }
            }, ({
                reduced: e
            }) => {
                let t = document.querySelector(".f-now");
                if (!t || e) return;
                let r = new IntersectionObserver(e => {
                    for (let r of e) t.classList.toggle("is-live", r.isIntersecting)
                });
                return r.observe(t), () => {
                    r.disconnect(), t.classList.remove("is-live")
                }
            }, ({
                signal: e,
                reduced: t,
                transition: c
            }) => {
                let u = document.querySelector("#insights .hb1-peek__frame");
                if (!u) return;
                let d = new Map([...u.querySelectorAll(":scope > .pfx__l")].map(e => [e.dataset.slug, e]));
                if (!d.size) return;
                let f = t ? null : r.f,
                    h = function(e, t) {
                        let {
                            reduced: r,
                            gl: n,
                            onSwap: c
                        } = t, u = [...e.children].filter(e => e instanceof HTMLElement && e.classList.contains("pfx__l")), d = u.find(e => e.classList.contains("is-on")) ? ? u[0], f = d, h = null, p = [], m = () => {
                            let e = p;
                            for (let t of (p = [], e)) t()
                        }, y = e => {
                            for (let t of u) t.classList.toggle("is-on", t === e)
                        };

                        function v(e) {
                            e !== d && (d = e, y(e), c(e))
                        }
                        let g = null,
                            _ = null,
                            x = 0,
                            w = 0,
                            b = 0,
                            S = 0,
                            P = 1,
                            k = [],
                            A = null,
                            q = null,
                            E = 0;

                        function C() {
                            if (!k.length || !A) return;
                            for (let e of k) {
                                e.level = (0, a.i)(e.field, e.s.p);
                                let t = (0, a.F)((0, a.m)(e.field, e.level, e.val), e.field.gx, e.field.gy, 6);
                                e.clone.style.clipPath = t ? `path(evenodd, "${t}")` : "inset(100%)"
                            }
                            E++;
                            let e = k.slice(-3),
                                {
                                    canvas: t,
                                    gl: r,
                                    programs: n
                                } = A,
                                {
                                    prog: o,
                                    U: i
                                } = n.through;
                            (t.width < x || t.height < w) && (t.width = Math.max(t.width, x), t.height = Math.max(t.height, w)), r.viewport(0, 0, x, w), r.enable(r.SCISSOR_TEST), r.scissor(0, 0, x, w), r.clear(r.COLOR_BUFFER_BIT), r.disable(r.SCISSOR_TEST), r.useProgram(o);
                            let s = e[0];
                            r.uniform2f(i.res, x, w), r.uniform1f(i.dpr, x / b), r.uniform1f(i.cell, 6), r.uniform2f(i.gn, s.field.gx, s.field.gy), r.uniform2f(i.lohi, l.s[0], l.s[1]), r.uniform1f(i.n, e.length), r.uniform1f(i.frame, E % 97), r.uniform1f(i.spray, l.U.spray), r.uniform1f(i.core, l.U.core), r.uniform1f(i.band, .03);
                            for (let t = 0; t < 3; t++) {
                                let n = e[t];
                                r.activeTexture(r.TEXTURE0 + t), r.bindTexture(r.TEXTURE_2D, (n ? ? s).tex), r.uniform1i(i[`t${t}`], t), n && r.uniform3f(i[`f${t}`], n.level, n.o.x * P, 1 - n.o.y)
                            }
                            r.activeTexture(r.TEXTURE0), r.drawArrays(r.TRIANGLES, 0, 3), _ ? .clearRect(0, 0, x, w), _ ? .drawImage(t, 0, t.height - w, x, w, 0, 0, x, w)
                        }

                        function L(e) {
                            e.tween ? .kill(), e.clone.remove(), e.gl.deleteTexture(e.tex)
                        }

                        function N() {
                            for (let e of k.splice(0)) L(e);
                            q ? .(), q = null, g && (_ ? .clearRect(0, 0, g.width, g.height), g.style.visibility = "hidden"), A && (A.canvas.width = A.canvas.height = 1), A = null
                        }

                        function T(e) {
                            let t = k.indexOf(e);
                            if (!(t < 0)) {
                                for (let r of (v(e.target), k.splice(0, t + 1))) L(r);
                                k.length || (N(), m())
                            }
                        }
                        let j = null;

                        function R(e) {
                            h = null, v(e), f !== d ? M() : m()
                        }

                        function M() {
                            if (f === d) m();
                            else if (r) {
                                let e;
                                (e = f).classList.add("is-on"), s.e.set(e, {
                                    zIndex: 2
                                }), (h = s.e.timeline({
                                    onComplete: () => {
                                        s.e.set(e, {
                                            clearProps: "zIndex,opacity"
                                        }), R(e)
                                    }
                                })).fromTo(e, {
                                    opacity: 0
                                }, {
                                    opacity: 1,
                                    duration: o.z,
                                    ease: "power1.inOut"
                                })
                            } else {
                                let t, r, n, l;
                                t = d, r = f, j || ((j = document.createElement("span")).className = "pfx__sheet", j.setAttribute("aria-hidden", "true"), e.append(j)), r.classList.add("is-on"), r.style.zIndex = "1", t.style.zIndex = "3", j.style.zIndex = "2", s.e.set(j, {
                                    yPercent: 0,
                                    visibility: "visible"
                                }), n = {
                                    v: 0
                                }, l = {
                                    v: 0
                                }, (h = s.e.timeline({
                                    defaults: {
                                        ease: "hesitate",
                                        duration: .62
                                    },
                                    onUpdate: () => {
                                        s.e.set(t, {
                                            yPercent: n.v
                                        }), s.e.set(j, {
                                            yPercent: Math.min(l.v, n.v + 9)
                                        })
                                    },
                                    onComplete: () => {
                                        s.e.set(t, {
                                            clearProps: "transform,zIndex"
                                        }), s.e.set(j, {
                                            yPercent: 101,
                                            visibility: "hidden"
                                        }), s.e.set(r, {
                                            clearProps: "zIndex"
                                        }), R(r)
                                    }
                                })).to(n, {
                                    v: -101
                                }, 0).to(l, {
                                    v: -101
                                }, .07)
                            }
                        }
                        return {
                            show: function(t, {
                                from: l
                            } = {}) {
                                if (!u.includes(t)) return Promise.resolve();
                                let o = new Promise(e => p.push(e)),
                                    c = k.length ? A : h || r ? null : n ? .get() ? ? null;
                                return c ? t === (k.at(-1) ? .target ? ? d) ? k.length || m() : (f = t, ! function(t, r, n) {
                                    if (!k.length) {
                                        let t, r;
                                        A = n, g || ((g = document.createElement("canvas")).className = "pfx__fx", g.setAttribute("aria-hidden", "true"), e.append(g), _ = g.getContext("2d")), t = e.getBoundingClientRect(), r = Math.min(devicePixelRatio || 1, 1.5), x = Math.max(1, Math.round(t.width * r)), w = Math.max(1, Math.round(t.height * r)), b = t.width, S = t.height, P = x / w, (g.width !== x || g.height !== w) && (g.width = x, g.height = w), g.style.visibility = "visible"
                                    }
                                    for (; k.length >= 3;) T(k[0]);
                                    let l = t.cloneNode(!0);
                                    l.classList.add("is-on", "pfx__clone"), l.style.clipPath = "inset(100%)", e.insertBefore(l, g);
                                    let o = (0, a.V)({
                                            w: b,
                                            h: S,
                                            cell: 6,
                                            origin: r
                                        }),
                                        c = {
                                            target: t,
                                            clone: l,
                                            o: r,
                                            s: {
                                                p: 0
                                            },
                                            field: o,
                                            val: new Float32Array(o.gx * o.gy),
                                            tex: (0, a.W)(A.gl, o),
                                            gl: A.gl,
                                            level: 0,
                                            tween: null
                                        };
                                    c.tween = s.e.to(c.s, {
                                        p: 1,
                                        duration: .65,
                                        ease: "power1.inOut",
                                        onComplete: () => T(c)
                                    }), k.push(c), q ? ? = (0, i.f)("peek", C), C()
                                }(t, l ? ? {
                                    x: .5,
                                    y: .5
                                }, c)) : (f = t, h || M()), o
                            },
                            set: function(e) {
                                if (u.includes(e)) {
                                    if (N(), h)
                                        for (let e of (h.kill(), h = null, j && s.e.set(j, {
                                                yPercent: 101,
                                                visibility: "hidden"
                                            }), u)) s.e.set(e, {
                                            clearProps: "transform,zIndex,opacity"
                                        });
                                    f = e, v(e), y(e), m()
                                }
                            },
                            get current() {
                                return k.at(-1) ? .target ? ? d
                            },
                            get busy() {
                                return k.length > 0 || null !== h
                            },
                            destroy() {
                                h ? .kill(), h = null, N(), g ? .remove(), j ? .remove(), m()
                            }
                        }
                    }(u, {
                        reduced: t,
                        gl: f,
                        onSwap: e => {
                            u.dataset.post = e.dataset.slug
                        }
                    }),
                    p = e => {
                        let t = u.getBoundingClientRect(),
                            r = e.getBoundingClientRect();
                        return {
                            x: .96,
                            y: Math.min(1, Math.max(0, (r.top + r.height / 2 - t.top) / t.height))
                        }
                    },
                    m = {
                        signal: e
                    };
                for (let e of document.querySelectorAll("#insights .hb1-a[data-post]")) {
                    let t = d.get(e.dataset.post);
                    t && (e.addEventListener("pointerenter", r => "mouse" === r.pointerType && void h.show(t, {
                        from: p(e)
                    }), m), e.addEventListener("focus", () => void h.show(t, {
                        from: p(e)
                    }), m), e.addEventListener("pointerdown", () => h.set(t), m), e.addEventListener("keydown", e => "Enter" === e.key && h.set(t), m))
                }
                document.addEventListener("post:show", e => {
                    let t = d.get(e.detail ? .slug);
                    t && h.set(t)
                }, m);
                let y = c.onNavigate(e => {
                    let r = () => h.set(h.current);
                    "burn" === (0, n.m)(t) ? e.covered.then(r): r()
                });
                return () => {
                    y(), h.destroy()
                }
            }],
            d = e => {
                let t = u.map(t => t(e));
                return () => {
                    for (let e of t) e && e()
                }
            };
        e.s(["default", 0, function() {
            return (0, t.f)("home-sections", d), null
        }], 51078)
    }, 29790, e => {
        var t = e.i(18050),
            r = e.i(71645),
            n = e.i(93122),
            l = e.i(47193),
            a = e.i(46281);
        e.s(["default", 0, function() {
            let e = (0, r.useRef)(null);
            return (0, a.f)("kind-words-grain", t => {
                var r;
                let a;
                return (a = (r = e.current).closest(".f-kw-bg")) ? (0, l.f)(t, {
                    hook: "kw",
                    host: r,
                    layer: a,
                    params: n.b,
                    frame: n.b.frame
                }) : () => {}
            }, e), (0, t.jsx)("div", {
                className: "f-kw-grain",
                ref: e
            })
        }], 29790)
    }, 95643, e => {
        var t = e.i(46281),
            r = e.i(27773),
            n = e.i(15877),
            l = e.i(89203);

        function a(e, t, r) {
            return Number.isFinite(t) && Number.isFinite(r) ? Object.entries({
                top: (r - e.top) / e.height,
                bottom: (e.bottom - r) / e.height,
                left: (t - e.left) / e.width * n.O.horizontal,
                right: (e.right - t) / e.width * n.O.horizontal
            }).sort((e, t) => e[1] - t[1])[0][0] : "left"
        }
        let o = {
                top: "bottom",
                bottom: "top",
                left: "left",
                right: "right"
            },
            i = new WeakSet,
            s = new Set;
        var c = e.i(86860),
            u = e.i(37753);

        function d(e, t, r) {
            if (!t) return;
            let {
                gsap: l,
                reduced: a
            } = e.ctx, o = t.querySelector(".f-roll__in"), i = t.querySelector(".f-showall__arrs");
            if (o && i) {
                if (a) return void e.fadeIn(t.closest(".f-work__head, .f-head") ? ? t, [o, i], r);
                l.set(o, {
                    yPercent: n.y.line.y
                }), l.set(i, {
                    autoAlpha: 0,
                    x: n.U.arrows.x
                }), e.once(t, n.y.start, () => {
                    let t = (0, n.j)(n.y.line.dur, e.phone()),
                        a = l.timeline({
                            delay: n.U.delay,
                            onComplete() {
                                l.set([o, i], {
                                    clearProps: "transform,opacity,visibility"
                                })
                            }
                        }).to(o, {
                            yPercent: 0,
                            duration: t,
                            ease: "reveal"
                        }, 0).to(i, {
                            autoAlpha: 1,
                            x: 0,
                            duration: t,
                            ease: "reveal"
                        }, n.U.arrows.at);
                    return e.record(r, a), a
                }, r)
            }
        }
        let f = "http://www.w3.org/2000/svg",
            h = (e, t) => `${(e/t*100).toFixed(3)}%`;

        function p(e, t, r) {
            if (!t) return;
            let {
                gsap: a,
                reduced: o
            } = e.ctx;
            if (o) return void e.fadeIn(t, [t], r);
            let i = (0, l.t)(t, {
                linesClass: "f-line",
                maskClass: "f-lmask",
                variant: e.phone,
                build: t => {
                    let r = e.phone();
                    return a.timeline().fromTo(t, {
                        yPercent: n.y.line.y
                    }, {
                        yPercent: 0,
                        duration: (0, n.j)(n.y.line.dur, r),
                        ease: "reveal",
                        stagger: (0, n.j)(n.y.line.stagger, r)
                    })
                }
            });
            e.undo(() => i.revert()), e.once(t, n.y.start, () => {
                let t = a.timeline({
                    onComplete: () => i.revert()
                });
                return i.place(t, 0), e.record(r, t), t
            }, r)
        }
        e.s(["default", 0, function({
            wordmark: e
        }) {
            return (0, t.f)("text", t => {
                if (!document.documentElement.classList.contains("motion")) return;
                let {
                    gsap: m
                } = t, y = m.context(() => {}), v = function(e, t, l) {
                    let {
                        gsap: a,
                        ScrollTrigger: o
                    } = e, c = "traverse" === e.transition.arrival || i.has(e.revealed);
                    c || s.clear();
                    let u = c;
                    e.revealed.then(() => {
                        e.signal.aborted || (i.add(e.revealed), requestAnimationFrame(() => u = !1))
                    });
                    let d = [],
                        f = 0,
                        h = () => {
                            var r, l;
                            let a, o = d;
                            if (d = [], e.signal.aborted) return;
                            let i = (r = o.map((e, t) => ({
                                id: t,
                                enteredAt: e.cascade ? f : -1 - t,
                                passed: e.instant || e.el.getBoundingClientRect().bottom < 0
                            })), l = n.y.cascade, a = new Map, r.map(({
                                id: e,
                                enteredAt: t,
                                passed: r
                            }) => {
                                if (r) return {
                                    id: e,
                                    delay: "end"
                                };
                                let n = a.get(t) ? ? 0;
                                return a.set(t, n + 1), {
                                    id: e,
                                    delay: n * l
                                }
                            }));
                            f++, t.add(() => {
                                for (let {
                                        id: e,
                                        delay: t
                                    } of i) {
                                    let r = o[e].play();
                                    "end" === t ? r.progress(1) : t && r.delay(r.delay() + t)
                                }
                            })
                        },
                        p = [],
                        m = [],
                        y = {
                            ctx: e,
                            scope: t,
                            atRest: c,
                            phone: e.phone,
                            once(t, r, n, l, {
                                cascade: a = !0
                            } = {}) {
                                let i = !1,
                                    f = r => {
                                        if (i) return;
                                        i = !0, p.push(l), s.add(l), queueMicrotask(() => m.kill());
                                        let o = r || u;
                                        e.revealed.then(() => {
                                            var e;
                                            return e = {
                                                el: t,
                                                play: n,
                                                instant: o,
                                                cascade: a
                                            }, void(!d.length && queueMicrotask(h), d.push(e))
                                        })
                                    },
                                    m = o.create({
                                        trigger: t,
                                        start: r,
                                        end: "bottom top",
                                        onEnter: () => f(!1),
                                        onLeave: () => f(!0),
                                        onEnterBack: () => f(!1),
                                        onRefresh: e => {
                                            !i && 0 >= e.scroll() && t.getBoundingClientRect().top < innerHeight && f(!1)
                                        }
                                    });
                                return c && s.has(l) && f(!0), () => m.kill()
                            },
                            fadeIn(e, t, l) {
                                t.length && (a.set(t, {
                                    autoAlpha: 0
                                }), y.once(e, n.y.start, () => {
                                    let e = a.to(t, {
                                        autoAlpha: 1,
                                        duration: r.z,
                                        ease: "power1.out",
                                        clearProps: "opacity,visibility"
                                    });
                                    return y.record(l, e), e
                                }, l))
                            },
                            record(e, t) {
                                l ? .(e, t)
                            },
                            played: () => [...p],
                            undo(e) {
                                m.push(e)
                            },
                            destroy() {
                                for (let e of m.reverse()) e();
                                m.length = 0
                            }
                        };
                    return y
                }(t, y, void 0);
                return t.revealed.then(() => m.globalTimeline.time()), y.add(() => {
                    ! function(e, t, l) {
                        let {
                            gsap: a,
                            reduced: o
                        } = e.ctx, i = l.querySelector("#hero"), s = l.querySelector(".topbar"), c = [l.querySelector(".hero__logo-blend"), l.querySelector(".hero__silhouette")].filter(e => !!e), u = "load" === e.ctx.transition.arrival, d = [l.querySelector(".topbar__logo img"), ...l.querySelectorAll(".topbar__nav .f-nav__in")].filter(e => !!e);
                        if (!i) return;
                        let p = o ? null : function(e, t) {
                            let r = e.querySelector(".hero__wordmark"),
                                l = e.querySelector(".hero__silhouette");
                            if (!r || !l || !t.paths.length) return null;
                            let [a, o, i, s] = t.viewBox, c = document.createElementNS(f, "svg");
                            for (let e of (c.setAttribute("viewBox", t.viewBox.join(" ")), c.style.cssText = "position:absolute;left:0;top:0;width:10px;height:10px;visibility:hidden;pointer-events:none", t.paths)) {
                                let t = document.createElementNS(f, "path");
                                t.setAttribute("d", e), c.append(t)
                            }
                            document.body.append(c);
                            let u = [...c.children].map(e => e.getBBox());
                            c.remove();
                            let d = [],
                                p = [],
                                m = t.paths.map((e, t) => ({
                                    d: e,
                                    b: u[t]
                                })).sort((e, t) => e.b.x - t.b.x).map(({
                                    d: e,
                                    b: t
                                }) => {
                                    let r = Math.max(o, t.y - n.Y),
                                        l = Math.min(o + s, t.y + t.height + n.Y),
                                        c = Math.max(a, t.x - n.Y),
                                        u = Math.min(a + i, t.x + t.width + n.Y),
                                        m = `inset(${h(r-o,s)} ${h(a+i-u,i)} ${h(o+s-l,s)} ${h(c-a,i)})`,
                                        y = `<svg xmlns="${f}" viewBox="${a} ${o} ${i} ${s}" width="${i}" height="${s}" preserveAspectRatio="none"><path fill="white" d="${e}"/></svg>`,
                                        v = `url("data:image/svg+xml,${encodeURIComponent(y)}")`,
                                        g = (e, t) => {
                                            let r = document.createElement("div");
                                            r.className = "f-wm__clip", r.style.clipPath = m;
                                            let n = document.createElement("div");
                                            return n.className = e, n.style.setProperty("--m", v), r.append(n), t.push(r), n
                                        };
                                    return {
                                        layers: [g("f-wm__l", d), g("f-sil__l", p)],
                                        y: (l - r) / s * n.y.wm.y
                                    }
                                });
                            return r.replaceChildren(...d), l.replaceChildren(...p), e.dataset.wm = "split", {
                                letters: m,
                                revert() {
                                    r.replaceChildren(), l.replaceChildren(), delete e.dataset.wm
                                }
                            }
                        }(i, t);
                        if (p && e.undo(p.revert), o) a.set(u ? [...c, ...d] : c, {
                            autoAlpha: 0
                        });
                        else if (u && a.set(d, {
                                yPercent: n.y.nav.y
                            }), p)
                            for (let e of p.letters) a.set(e.layers, {
                                yPercent: e.y
                            });
                        else a.set(c, {
                            autoAlpha: 0
                        });
                        let m = () => s ? .classList.add("f-nav-done");
                        e.undo(() => s ? .classList.remove("f-nav-done")), u || m(), e.ctx.revealed.then(() => {
                            e.ctx.signal.aborted || e.scope.add(() => {
                                let t = a.timeline({
                                    onComplete() {
                                        u && a.set(d, {
                                            clearProps: "transform,opacity,visibility"
                                        }), (o || !p) && a.set(c, {
                                            clearProps: "opacity,visibility"
                                        }), m()
                                    }
                                });
                                o ? (t.to(c, {
                                    autoAlpha: 1,
                                    duration: r.z,
                                    ease: "power1.out"
                                }, 0), u && t.to(d, {
                                    autoAlpha: 1,
                                    duration: r.z,
                                    ease: "power1.out"
                                }, n.y.nav.at)) : (p ? p.letters.forEach((e, r) => t.to(e.layers, {
                                    yPercent: 0,
                                    duration: n.y.wm.dur,
                                    ease: "reveal"
                                }, r * n.y.wm.stagger)) : t.to(c, {
                                    autoAlpha: 1,
                                    duration: n.S,
                                    ease: "power1.out"
                                }, 0), u && t.to(d, {
                                    yPercent: 0,
                                    duration: n.y.nav.dur,
                                    ease: "reveal",
                                    stagger: n.y.nav.stagger
                                }, n.y.nav.at)), e.record("hero", t), e.atRest && t.progress(1)
                            })
                        })
                    }(v, e, document),
                    function(e, t) {
                        let {
                            gsap: a,
                            reduced: o
                        } = e.ctx, i = t.querySelector(".atf-what"), s = i ? .querySelector(".atf-st");
                        if (!i || !s) return;
                        let c = [...i.querySelectorAll(".atf-meta .atf-m__in")];
                        o ? a.set(i, {
                            autoAlpha: 0
                        }) : a.set(c, {
                            yPercent: n.h.y
                        });
                        let u = o ? null : (0, l.t)(s, {
                            linesClass: "atf-line",
                            maskClass: "atf-lmask",
                            build: e => a.timeline().fromTo(e, {
                                yPercent: n.h.y
                            }, {
                                yPercent: 0,
                                duration: n.h.dur,
                                ease: "reveal",
                                stagger: n.h.stagger
                            })
                        });
                        u && e.undo(() => u.revert()), e.ctx.revealed.then(() => {
                            e.ctx.signal.aborted || e.scope.add(() => {
                                let t = a.timeline({
                                    onComplete() {
                                        u ? .revert(), a.set([i, ...c], {
                                            clearProps: "transform,opacity,visibility"
                                        })
                                    }
                                });
                                o ? t.to(i, {
                                    autoAlpha: 1,
                                    duration: r.z,
                                    ease: "power1.out"
                                }, n.h.at) : (u ? .place(t, n.h.at), t.to(c, {
                                    yPercent: 0,
                                    duration: n.h.dur,
                                    ease: "reveal",
                                    stagger: n.h.meta.stagger
                                }, n.h.at + n.h.meta.at)), e.record("atf", t), e.atRest && t.progress(1)
                            })
                        })
                    }(v, document), d(v, document.querySelector("#work .f-showall"), "work-all"), document.querySelectorAll("#about .f-about__body p").forEach((e, t) => p(v, e, `about-${t}`)), d(v, document.querySelector("#about .f-showall"), "about-all"), (0, u.j)(v, document), d(v, document.querySelector("#insights .f-showall"), "insights-all"),
                        function(e, t) {
                            let {
                                gsap: r,
                                reduced: a
                            } = e.ctx, o = t.querySelector("#insights"), i = o ? .querySelector(".hb1-list");
                            if (!o || !i) return;
                            let s = [o.querySelector(".hb1-peek"), ...i.querySelectorAll(":scope > .f-row")].filter(e => !!e);
                            if (a) return e.fadeIn(i, s, "insights");
                            let c = s.map(t => {
                                    let a = [...t.querySelectorAll(".hb1-title, .hb1-ex")],
                                        o = [...t.querySelectorAll(".hb-pic")],
                                        i = o.map(e => e.firstElementChild).filter(e => !!e),
                                        s = [...t.querySelectorAll(".f-rule")],
                                        c = [...t.querySelectorAll(".hb1-date, .hb1-meta > span")];
                                    return c.length && r.set(c, {
                                        yPercent: n.X.yPercent,
                                        clipPath: n.X.from
                                    }), o.length && r.set(o, {
                                        clipPath: n.K.bottom
                                    }), i.length && r.set(i, {
                                        yPercent: n.a.yPercent,
                                        scale: n.a.scale,
                                        transformOrigin: "50% 100%"
                                    }), s.length && r.set(s, {
                                        scaleX: 0,
                                        transformOrigin: "0% 50%"
                                    }), {
                                        labels: c,
                                        pics: o,
                                        inner: i,
                                        rules: s,
                                        lines: a.map(t => (0, l.t)(t, {
                                            linesClass: "hb-line",
                                            maskClass: "f-lmask",
                                            variant: e.phone,
                                            build: t => {
                                                let l = e.phone();
                                                return r.timeline().fromTo(t, {
                                                    yPercent: n.y.line.y
                                                }, {
                                                    yPercent: 0,
                                                    duration: (0, n.j)(n.y.line.dur, l),
                                                    ease: "reveal",
                                                    stagger: (0, n.j)(n.y.line.stagger, l)
                                                })
                                            }
                                        }))
                                    }
                                }),
                                u = () => {
                                    for (let e of c)
                                        for (let t of e.lines) t.revert()
                                };
                            e.undo(u), e.once(i, n.i.start, () => {
                                let t = e.phone(),
                                    l = r.timeline({
                                        onComplete() {
                                            for (let e of (u(), c)) r.set([...e.labels, ...e.pics, ...e.inner, ...e.rules], {
                                                clearProps: "transform,transformOrigin,clipPath"
                                            })
                                        }
                                    });
                                return c.forEach((e, r) => {
                                    let a = r * n.i.step;
                                    e.rules.length && l.to(e.rules, {
                                        scaleX: 1,
                                        duration: (0, n.j)(n.y.rule, t),
                                        ease: "reveal"
                                    }, a), e.pics.length && (l.to(e.pics, {
                                        clipPath: n.K.full,
                                        duration: n.a.duration,
                                        ease: n.a.ease,
                                        stagger: n.a.stagger
                                    }, a), l.to(e.inner, {
                                        yPercent: 0,
                                        scale: 1,
                                        duration: n.a.duration,
                                        ease: n.a.ease,
                                        stagger: n.a.stagger
                                    }, a)), e.labels.length && l.to(e.labels, {
                                        yPercent: 0,
                                        clipPath: n.X.to,
                                        duration: (0, n.j)(n.y.line.dur, t),
                                        ease: "reveal",
                                        stagger: n.X.stagger
                                    }, a + n.X.at), e.lines.forEach((e, t) => e.place(l, a + n.A.at + t * n.A.step))
                                }), e.record("insights", l), l
                            }, "insights", {
                                cascade: !1
                            })
                        }(v, document), p(v, document.querySelector(".f-clients__note"), "clients-note"), (0, u.G)(v, document), (0, c.g)(v, document),
                        function(e, t) {
                            let {
                                gsap: r,
                                reduced: a
                            } = e.ctx, o = t.querySelector(".f-contact__mail");
                            if (!o) return;
                            if (a) return e.fadeIn(o, [o], "mail");
                            let i = (0, l.t)(o, {
                                chars: !0,
                                linesClass: "f-line",
                                maskClass: "f-lmask",
                                variant: e.phone,
                                build: t => {
                                    let l = e.phone();
                                    return r.timeline().fromTo(t, {
                                        yPercent: n.f.y,
                                        autoAlpha: 0
                                    }, {
                                        yPercent: 0,
                                        autoAlpha: 1,
                                        duration: (0, n.j)(n.f.dur, l),
                                        ease: n.f.ease,
                                        stagger: (0, n.j)(n.f.stagger, l)
                                    })
                                }
                            });
                            e.undo(() => i.revert()), e.once(o, n.y.start, () => {
                                let t = r.timeline({
                                    onComplete: () => i.revert()
                                });
                                return i.place(t, 0), e.record("mail", t), t
                            }, "mail")
                        }(v, document), d(v, document.querySelector("#contact .f-showall"), "contact-all"),
                        function(e, t) {
                            let r, a, {
                                    gsap: o,
                                    reduced: i
                                } = e.ctx,
                                s = t.querySelector("#foot");
                            if (!s) return;
                            let c = (r = [], (a = e => {
                                for (let t of e.children) {
                                    if (!(t instanceof HTMLElement || t instanceof SVGElement) || t.matches("script, style")) continue;
                                    let e = getComputedStyle(t);
                                    if ("none" === e.display) continue;
                                    if (t.matches(".f-foot__rule")) {
                                        r.push({
                                            el: t,
                                            kind: "rule"
                                        });
                                        continue
                                    }
                                    if (t.matches('[aria-hidden="true"]:empty')) continue;
                                    let n = [...t.childNodes].some(e => 3 === e.nodeType && e.textContent ? .trim()),
                                        l = /grid/.test(getComputedStyle(t.parentElement).display) || "contents" === e.display;
                                    t.matches('img, svg, canvas, video, .f-cover, .foot__logo, [class*="__logo"]') ? r.push({
                                        el: t,
                                        kind: "media"
                                    }) : n && /flex|grid/.test(e.display) ? r.push({
                                        el: t,
                                        kind: l ? "media" : "out"
                                    }) : n ? r.push({
                                        el: t,
                                        kind: "in"
                                    }) : a(t)
                                }
                            })(s), r.sort((e, t) => e.el.compareDocumentPosition(t.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
                            if (e.undo(() => s.classList.remove("f-foot--shown")), i) return e.fadeIn(s, c.filter(e => "rule" !== e.kind).map(e => e.el), "footer");
                            let u = [],
                                d = c.map(({
                                    el: e,
                                    kind: t
                                }) => {
                                    if ("in" === t) {
                                        let t = (0, l.Q)(e);
                                        return u.push(t.restore), {
                                            el: t.inner,
                                            kind: "line"
                                        }
                                    }
                                    return "out" === t && u.push((0, l.z)(e).restore), {
                                        el: e,
                                        kind: "out" === t ? "line" : t
                                    }
                                }),
                                f = () => {
                                    for (let e of u) e();
                                    u.length = 0
                                };
                            e.undo(f);
                            let h = {
                                line: {
                                    yPercent: n.y.line.y
                                },
                                media: {
                                    autoAlpha: 0,
                                    y: n.y.media.y
                                },
                                rule: {
                                    scaleX: 0,
                                    transformOrigin: "0% 50%"
                                }
                            };
                            for (let e of d) o.set(e.el, h[e.kind]);
                            e.once(s, n.y.start, () => {
                                let t = e.phone(),
                                    r = {
                                        line: {
                                            yPercent: 0,
                                            duration: (0, n.j)(n.y.line.dur, t),
                                            ease: "reveal"
                                        },
                                        media: {
                                            autoAlpha: 1,
                                            y: 0,
                                            duration: (0, n.j)(n.y.media.dur, t),
                                            ease: "reveal"
                                        },
                                        rule: {
                                            scaleX: 1,
                                            duration: (0, n.j)(n.y.rule, t),
                                            ease: "reveal"
                                        }
                                    },
                                    l = o.timeline({
                                        onComplete() {
                                            f(), o.set(d.map(e => e.el), {
                                                clearProps: "transform,transformOrigin,opacity,visibility"
                                            }), s.classList.add("f-foot--shown")
                                        }
                                    });
                                return d.forEach((e, t) => l.to(e.el, r[e.kind], t * n.F)), e.record("footer", l), l
                            }, "footer")
                        }(v, document),
                        function(e, t) {
                            let {
                                gsap: l,
                                reduced: i,
                                signal: s,
                                scroll: c
                            } = e.ctx, u = [...t.querySelectorAll("#insights .hb1-a")];
                            if (!u.length) return;
                            let d = matchMedia("(hover: hover) and (pointer: fine)"),
                                f = new Map;
                            for (let e of u) {
                                let t = document.createElement("span");
                                t.className = "hb-fill", t.setAttribute("aria-hidden", "true"), e.prepend(t), f.set(e, t), l.set(t, i ? {
                                    opacity: 0,
                                    clipPath: n.K.full
                                } : {
                                    clipPath: n.K.left
                                })
                            }
                            let h = new Set;
                            e.undo(() => {
                                for (let [e, t] of f) t.remove(), e.classList.remove("is-hot")
                            });
                            let p = null,
                                m = 0 / 0,
                                y = 0 / 0,
                                v = (e, t, a) => {
                                    let o = f.get(e);
                                    (e.classList.toggle("is-hot", t), t ? h.add(e) : h.delete(e), i) ? l.to(o, {
                                        opacity: +!!t,
                                        duration: r.z,
                                        overwrite: !0
                                    }): t ? l.fromTo(o, {
                                        clipPath: n.K[a]
                                    }, {
                                        clipPath: n.K.full,
                                        ...n.O.in,
                                        overwrite: !0
                                    }) : l.to(o, {
                                        clipPath: n.K[a],
                                        ...n.O.out,
                                        overwrite: !0
                                    })
                                },
                                g = (e, t) => {
                                    p && p !== e && v(p, !1, o[t]), p = e, h.has(e) || v(e, !0, t)
                                },
                                _ = (e, t) => {
                                    h.has(e) && v(e, !1, t), p === e && (p = null)
                                },
                                x = (e, t, r) => e.addEventListener(t, r, {
                                    signal: s
                                });
                            for (let e of u) x(e, "pointerenter", t => {
                                if ("mouse" !== t.pointerType || !d.matches) return;
                                let r = Number.isFinite(m) ? m : t.clientX,
                                    n = Number.isFinite(y) ? y : t.clientY;
                                g(e, a(e.getBoundingClientRect(), r, n))
                            }), x(e, "pointerleave", t => {
                                "mouse" !== t.pointerType || e.matches(":focus-visible") || _(e, a(e.getBoundingClientRect(), t.clientX, t.clientY))
                            }), x(e, "focus", () => {
                                e.matches(":focus-visible") && g(e, "left")
                            }), x(e, "blur", () => _(e, "right"));
                            addEventListener("pointermove", e => {
                                m = e.clientX, y = e.clientY
                            }, {
                                signal: s,
                                passive: !0
                            });
                            let w = c.onScroll(() => {
                                if (!p || p.matches(":focus-visible")) return;
                                let e = p.getBoundingClientRect();
                                m >= e.left && m <= e.right && y >= e.top && y <= e.bottom || _(p, y < e.top ? "top" : y > e.bottom ? "bottom" : "right")
                            });
                            e.undo(w)
                        }(v, document)
                }), ! function(e, t) {
                    let {
                        signal: r
                    } = e.ctx;
                    t.querySelectorAll(".f-u").forEach(t => {
                        let n = t.closest(".f-now__item") ? ? t;
                        n.addEventListener("pointerenter", e => {
                            "touch" !== e.pointerType && t.classList.add("is-u")
                        }, {
                            signal: r
                        }), n.addEventListener("pointerleave", () => t.classList.remove("is-u"), {
                            signal: r
                        }), e.undo(() => t.classList.remove("is-u"))
                    })
                }(v, document), ! function(e, t) {
                    let {
                        signal: r
                    } = e.ctx;
                    t.querySelectorAll(".f-showall").forEach(t => {
                        t.addEventListener("pointerenter", e => {
                            "touch" !== e.pointerType && t.classList.add("is-hover")
                        }, {
                            signal: r
                        }), t.addEventListener("pointerleave", () => t.classList.remove("is-hover"), {
                            signal: r
                        }), e.undo(() => t.classList.remove("is-hover"))
                    })
                }(v, document), () => {
                    y.revert(), v.destroy()
                }
            }), null
        }], 95643)
    }, 93122, 47193, e => {
        let t = {
            minPixelRatio: 2,
            maxPixelCount: (e, t, r) => e >= 2 || t * r * e ** 2 > 4e6 ? 16e5 : 26e5
        };
        e.s(["S", 0, {
            colors: ["oklch(53.9% 0.221 29.23)", "oklch(62.8% 0.2577 29.23)", "oklch(64.6% 0.2402 29.15)"],
            speed: .8,
            scale: 1.82,
            rotation: 180,
            offsetX: .04,
            offsetY: .02,
            intensity: .08,
            softness: 1,
            noise: 0,
            waveAmp: .25,
            parallax: .4,
            fadeStart: .03,
            fadeEnd: .22
        }, "c", 0, 10500, "b", 0, {
            colors: ["oklch(60% 0.2461 29.23)", "oklch(63% 0.2557 28.99)", "oklch(64.3% 0.2423 27.5)"],
            speed: .8,
            scale: 1.7,
            rotation: 180,
            offsetX: .06,
            offsetY: .14,
            intensity: .08,
            softness: 1,
            noise: 0,
            frame: 10500,
            waveAmp: 1
        }, "j", 0, .5, "G", 0, t], 93122);
        var r = e.i(56385);
        let n = /float wave = cos\(\.5 \* shape_uv\.x - 4\. \* t\) \* sin\(1\.5 \* shape_uv\.x \+ 2\. \* t\) \* \(\.75 \+ \.25 \* cos\(6\. \* t\)\);/,
            l = e => Number.isInteger(e) ? `${e}.` : String(e),
            a = null,
            o = new Map;

        function i(e) {
            let t = o.get(e);
            return t || o.set(e, t = [...(0, r.M)(e).map(e => Math.round(255 * e) / 255), 1]), t
        }
        let s = e => ({
            u_colorBack: [0, 0, 0, 0],
            u_colors: e.colors.map(i),
            u_colorsCount: e.colors.length,
            u_softness: e.softness,
            u_intensity: e.intensity,
            u_noise: e.noise,
            u_shape: 1,
            u_fit: 1,
            u_scale: e.scale,
            u_rotation: e.rotation,
            u_originX: .5,
            u_originY: .5,
            u_offsetX: e.offsetX,
            u_offsetY: e.offsetY,
            u_worldWidth: 0,
            u_worldHeight: 0
        });
        async function c(r, o, i) {
            let c, u;
            try {
                c = await (!a && (a = e.A(78534).then(async e => {
                    let t = e.getShaderNoiseTexture();
                    return await t.decode(), {
                        lib: e,
                        noise: t
                    }
                })).catch(() => a = null), a)
            } catch {
                return null
            }
            let {
                lib: d,
                noise: f
            } = c, h = function(e, t) {
                if (1 === t.amp) return e;
                if (!n.test(e) || !e.includes("void main()")) throw Error("boundWaveShader: the wave line of grainGradientFragmentShader is not there");
                let r = l(+(.1 * (.001 * t.frame + 7)).toFixed(6)),
                    a = l(t.amp);
                return e.replace("void main()", `float mfWave(float x, float t) { return cos(.5 * x - 4. * t) * sin(1.5 * x + 2. * t) * (.75 + .25 * cos(6. * t)); }
void main()`).replace(n, `float wave = mfWave(shape_uv.x, ${r}) + ${a} * (mfWave(shape_uv.x, t) - mfWave(shape_uv.x, ${r}));`)
            }(d.grainGradientFragmentShader, {
                amp: i.waveAmp,
                frame: i.frame
            });
            try {
                u = new d.ShaderMount(r, h, { ...s(o),
                    u_noiseTexture: f
                }, void 0, i.speed, i.frame, t.minPixelRatio, t.maxPixelCount(devicePixelRatio, innerWidth, innerHeight))
            } catch {
                for (let e of r.querySelectorAll(":scope > canvas")) e.remove();
                return null
            }
            return {
                bounded: h !== d.grainGradientFragmentShader,
                frame: () => u.getCurrentFrame(),
                setSpeed: e => u.setSpeed(e),
                setFrame: e => u.setFrame(e),
                setUniforms: e => u.setUniforms(s(e)),
                destroy() {
                    let e = u.canvasElement;
                    u.dispose(), e.getContext("webgl2") ? .getExtension("WEBGL_lose_context") ? .loseContext()
                }
            }
        }
        e.s(["f", 0, function(e, t) {
            let {
                ScrollTrigger: r,
                reduced: n,
                signal: l
            } = e, a = null, o = !1, i = e => {
                a ? .setSpeed(e)
            }, s = [];
            for (let e = t.host.parentElement; e && e !== document.body; e = e.parentElement) s.push(e);
            let u = () => !s.some(e => "hidden" === e.style.visibility),
                d = u(),
                f = new MutationObserver(() => {
                    d !== u() && (d = !d, i(h()))
                });
            for (let e of s) f.observe(e, {
                attributes: !0,
                attributeFilter: ["style"]
            });
            let h = () => !n && o && d ? t.params.speed : 0,
                p = () => t.settled ? .();
            c(t.host, t.params, {
                speed: h(),
                frame: t.frame,
                waveAmp: t.params.waveAmp
            }).then(async e => {
                let r;
                return l.aborted ? e ? .destroy() : e ? void(a = e, t.host.classList.add("is-live"), i(h()), await (r = 2, new Promise(e => {
                    let t = () => --r <= 0 ? e() : requestAnimationFrame(t);
                    requestAnimationFrame(t)
                })), l.aborted || p()) : p()
            }).catch(e => {
                l.aborted || p(), reportError(e)
            }), r.create({
                trigger: t.layer,
                start: "top bottom",
                end: "bottom top",
                onToggle: e => {
                    o = e.isActive, i(h())
                },
                onRefresh: e => {
                    let r;
                    o = (r = e.scroll()) >= e.start && r <= e.end, i(h()), t.refreshed ? .()
                }
            });
            let m = (t.hook, () => {});
            return () => {
                m(), f.disconnect(), a ? .destroy(), a = null, t.host.classList.remove("is-live")
            }
        }], 47193)
    }, 86860, 15877, 89203, 37753, e => {
        e.i(17724);
        var t = e.i(89970),
            r = e.i(27773),
            n = e.i(63082);
        let l = (e, t) => t ? e.phone : e.desk,
            a = {
                start: "clamp(top 85%)",
                cascade: .1,
                wm: {
                    y: 105,
                    dur: 1.2,
                    stagger: .06
                },
                nav: {
                    y: 105,
                    dur: 1.2,
                    stagger: .05,
                    at: .1
                },
                line: {
                    y: 105,
                    dur: {
                        desk: 1.2,
                        phone: .9
                    },
                    stagger: {
                        desk: .08,
                        phone: .06
                    }
                },
                rule: {
                    desk: 1.7,
                    phone: 1.2
                },
                media: {
                    y: 18,
                    dur: {
                        desk: 1.2,
                        phone: .9
                    }
                }
            },
            o = {
                ruleStagger: .12,
                at: .06,
                rowStep: .05,
                freeStep: .06,
                cellStep: .025,
                whoStep: .08
            },
            i = {
                at: 4 * a.wm.stagger + .1,
                stagger: .1,
                y: 105,
                dur: 1.2,
                meta: {
                    at: .2,
                    stagger: .08
                }
            },
            s = {
                y: 12,
                duration: .5,
                ease: "power2.out"
            };
        e.s(["h", 0, i, "K", 0, {
            full: "inset(0% 0% 0% 0%)",
            top: "inset(0% 0% 100% 0%)",
            bottom: "inset(100% 0% 0% 0%)",
            left: "inset(0% 100% 0% 0%)",
            right: "inset(0% 0% 0% 100%)"
        }, "a", 0, {
            yPercent: 18,
            scale: 1.08,
            duration: 1.2,
            stagger: .08,
            ease: "expo.out"
        }, "O", 0, { in: {
                duration: .38,
                ease: "power3.out"
            },
            out: {
                duration: .3,
                ease: "power2.inOut"
            },
            horizontal: 4
        }, "F", 0, .06, "L", 0, o, "i", 0, {
            start: "top 85%",
            step: .09
        }, "A", 0, {
            at: .08,
            step: .06
        }, "X", 0, {
            yPercent: 100,
            from: "inset(-120% -6% 100% -6%)",
            to: "inset(-20% -6% -20% -6%)",
            at: .08,
            stagger: .05
        }, "f", 0, {
            y: 150,
            dur: {
                desk: .8,
                phone: .7
            },
            stagger: {
                desk: .03,
                phone: .02
            },
            ease: "power3.out"
        }, "y", 0, a, "c", 0, s, "U", 0, {
            delay: .25,
            arrows: {
                x: -6,
                at: .1
            }
        }, "S", 0, 1, "Y", 0, 6, "j", 0, l], 15877);
        var c = e.i(75324);

        function u(e, t) {
            let r, n = null,
                l = null,
                a = {
                    type: t.chars ? "lines,chars" : "lines",
                    mask: "lines",
                    linesClass: t.linesClass,
                    ...t.chars ? {
                        charsClass: "f-ch"
                    } : {
                        aria: "none"
                    },
                    autoSplit: !0,
                    onSplit(e) {
                        for (let r of e.masks) r.classList.add(t.maskClass);
                        return r = t.variant ? .(), l = t.build(t.chars ? e.chars : e.lines), n ? n.master.add(l, n.at) : l.pause(), l
                    }
                },
                o = c.f.create(e, a);
            return {
                place(e, i) {
                    n = {
                        master: e,
                        at: i
                    }, t.variant && t.variant() !== r ? o.split(a) : l && e.add(l.paused(!1), i)
                },
                revert() {
                    n = null, o.revert()
                }
            }
        }

        function d(e, t) {
            let r = document.activeElement,
                n = r instanceof HTMLElement && e.contains(r) ? r : null;
            t(), n && document.activeElement !== n && n.focus({
                preventScroll: !0
            })
        }

        function f(e) {
            let t = document.createElement("span"),
                r = document.createElement("span");
            return t.className = "f-m", r.className = "f-m__in", r.append(...e.childNodes), t.append(r), e.append(t), {
                inner: r,
                restore() {
                    t.parentNode === e && d(t, () => t.replaceWith(...r.childNodes))
                }
            }
        }
        e.s(["Q", 0, f, "z", 0, function(e) {
            let t = document.createElement("span");
            return t.className = "f-m f-m--out", e.before(t), t.append(e), {
                restore() {
                    e.parentNode === t && d(t, () => t.replaceWith(e))
                }
            }
        }, "t", 0, u], 89203);
        let h = (e = []) => e.filter(e => !!e);

        function p(e, t, r, n) {
            if (!t) return;
            let {
                gsap: i,
                reduced: s
            } = e.ctx, c = h(n.masks), u = h(n.media), d = h(n.rules);
            if (s) return void e.fadeIn(t, n.fade ? [n.fade] : [...c, ...u], r);
            let p = c.map(f),
                m = p.map(e => e.inner);
            m.length && i.set(m, {
                yPercent: a.line.y
            }), u.length && i.set(u, {
                autoAlpha: 0,
                y: a.media.y
            }), d.length && i.set(d, {
                scaleX: 0,
                transformOrigin: "0% 50%"
            });
            let y = () => {
                for (let e of p) e.restore()
            };
            e.undo(y), e.once(t, a.start, () => {
                let t = e.phone(),
                    s = i.timeline({
                        onComplete() {
                            y(), i.set([...u, ...d], {
                                clearProps: "transform,transformOrigin,opacity,visibility"
                            })
                        }
                    });
                d.length && s.to(d, {
                    scaleX: 1,
                    duration: l(a.rule, t),
                    ease: "reveal",
                    stagger: o.ruleStagger
                }, 0);
                let c = {
                    duration: l(a.line.dur, t),
                    ease: "reveal",
                    stagger: n.step
                };
                return m.length && s.to(m, {
                    yPercent: 0,
                    ...c
                }, o.at), u.length && s.to(u, {
                    autoAlpha: 1,
                    y: 0,
                    ...c,
                    duration: l(a.media.dur, t)
                }, o.at), e.record(r, s), s
            }, r)
        }
        e.s(["G", 0, function(e, t) {
            let r = t.querySelector("#clients .f-cl");
            p(e, r, "clients", {
                media: r ? [...r.querySelectorAll(":scope > .f-cl__cell")] : [],
                step: o.cellStep
            })
        }, "j", 0, function(e, t) {
            t.querySelectorAll("#experience .f-row").forEach((t, r) => {
                let n = t.querySelector(".f-rule"),
                    l = `row-${r}`;
                t.classList.contains("f-row--end") ? p(e, t, l, {
                    rules: [n],
                    step: o.rowStep
                }) : p(e, t, l, {
                    masks: [...t.querySelectorAll(".f-xp__company, .f-xp__role, .f-xp__years")],
                    media: [...t.querySelectorAll(".f-xp__tile")],
                    rules: [n],
                    step: o.rowStep,
                    fade: t.querySelector(".f-row__in")
                })
            });
            let r = t.querySelector("#experience .f-free");
            p(e, r, "free", {
                masks: [r ? .querySelector(".f-free__label") ? ? null],
                media: r ? [...r.querySelectorAll(".f-free__item")] : [],
                step: o.freeStep
            })
        }, "W", 0, p], 37753), e.s(["g", 0, function(e, r) {
            let {
                reduced: n
            } = e.ctx, i = r.querySelector(".f-rv__box");
            if (!i) return;
            if (n) return void e.fadeIn(i, [i], "reviews");
            let s = r => {
                    let n = e.phone();
                    return t.e.timeline().fromTo(r, {
                        yPercent: a.line.y
                    }, {
                        yPercent: 0,
                        duration: l(a.line.dur, n),
                        ease: "reveal",
                        stagger: l(a.line.stagger, n)
                    })
                },
                c = [...i.querySelectorAll(".f-rv__quote")].map(t => u(t, {
                    linesClass: "f-line",
                    maskClass: "f-lmask",
                    variant: e.phone,
                    build: s
                })),
                d = () => {
                    for (let e of c) e.revert()
                };
            e.undo(d);
            let f = i.querySelector(".f-rv__mark-in");
            f && t.e.set(f, {
                yPercent: a.line.y
            }), e.once(i, a.start, () => {
                let r = t.e.timeline({
                    onComplete() {
                        d(), f && t.e.set(f, {
                            clearProps: "transform"
                        })
                    }
                });
                for (let t of (f && r.to(f, {
                        yPercent: 0,
                        duration: l(a.line.dur, e.phone()),
                        ease: "reveal"
                    }, 0), c)) t.place(r, 0);
                return e.record("reviews", r), r
            }, "reviews"), p(e, i, "reviews-who", {
                masks: [...i.querySelectorAll(".f-rv__name, .f-rv__role, .f-rv__case")],
                rules: [...i.querySelectorAll(".f-rv__dash")],
                media: [i.querySelector(".f-rv__nav")],
                step: o.whoStep
            })
        }, "r", 0, function(e, l, a) {
            if (!document.documentElement.classList.contains("motion-live")) return null;
            let o = (0, n.p)(),
                i = o ? 0 : s.y * a,
                c = o ? {
                    duration: r.z,
                    ease: "power1.inOut"
                } : {
                    duration: s.duration,
                    ease: s.ease
                };
            return t.e.timeline({
                onComplete() {
                    t.e.set([e, l], {
                        clearProps: "opacity,visibility,transform"
                    })
                }
            }).fromTo(l, {
                autoAlpha: 0,
                y: i
            }, {
                autoAlpha: 1,
                y: 0,
                ...c
            }, 0).fromTo(e, {
                autoAlpha: 1,
                y: 0
            }, {
                autoAlpha: 0,
                y: -i,
                ...c
            }, 0)
        }], 86860)
    }])
})();