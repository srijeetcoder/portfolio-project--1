(() => {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 11269, e => {
        var t = e.i(18050),
            a = e.i(76677);
        e.s(["default", 0, function({
            className: e,
            children: i
        }) {
            return (0, t.jsx)("button", {
                type: "button",
                className: e,
                onClick: e => (0, a.e)(e.currentTarget),
                children: i
            })
        }])
    }, 53160, e => {
        var t = e.i(18050),
            a = e.i(71645),
            i = e.i(566),
            l = e.i(48),
            n = e.i(8089),
            r = e.i(34479);
        let s = {
                name: {
                    min: 2,
                    max: 100
                },
                company: {
                    max: 120
                },
                about: {
                    min: 20,
                    max: 3e3
                },
                success: {
                    min: 20,
                    max: 3e3
                },
                choice: {
                    max: 60
                }
            },
            c = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        function o(e, t, a, i) {
            return e ? e.length < t ? "short" : e.length > a ? "long" : void 0 : i ? "required" : void 0
        }

        function d(e) {
            let t = {},
                a = (e, a) => {
                    a && (t[e] = a)
                };
            return a("name", o(e.name, s.name.min, s.name.max, !0)), a("email", e.email ? e.email.length > 254 || !c.test(e.email) ? "email" : void 0 : "required"), a("company", o(e.company, 0, s.company.max, !1)), a("type", o(e.type, 0, s.choice.max, !1)), a("about", o(e.about, s.about.min, s.about.max, !0)), a("success", o(e.success, s.success.min, s.success.max, !0)), a("budget", o(e.budget, 0, s.choice.max, !0)), a("timeline", o(e.timeline, 0, s.choice.max, !1)), t
        }
        var u = e.i(95613),
            m = e.i(46281),
            f = e.i(98076),
            h = e.i(82035),
            p = e.i(37921),
            v = e.i(70382);
        let x = {
                dprMax: 1.5,
                pxMax: 1296e3,
                rise: 1.4,
                riseEase: "power2.out",
                poke: .9,
                seedFps: 30
            },
            g = { ...v.U,
                tail: .42,
                below: 1.4,
                from: .07,
                to: 1.12,
                flicker: .006,
                cold: .25
            },
            b = e.i(41116).r.rise,
            y = {
                ticket: {
                    frag: () => (0, h.l)((0, h.X)()),
                    uniforms: "res o r heat mode seed warp spray tail core".split(" ")
                }
            },
            j = r.f.contact.brief,
            _ = e => e.trim().replace(/[.!?…]+$/, ""),
            w = () => (0, t.jsx)("span", {
                className: "ct-brief__blank",
                children: j.blank
            });

        function N({
            value: e,
            choice: a = !1
        }) {
            return e ? (0, t.jsx)("span", {
                className: "ct-brief__embers",
                children: [...e].map((e, a) => (0, t.jsx)("span", {
                    children: e
                }, a))
            }, a ? e : void 0) : (0, t.jsx)(w, {})
        }

        function k({
            values: e,
            level: i
        }) {
            let l, n, r, s, c = (l = (0, a.useRef)(null), n = (0, a.useRef)(null), r = (0, a.useRef)(i), (0, m.f)("contact-brief", e => {
                    let t;
                    return (t = {
                        host: l.current,
                        api: n,
                        level: () => r.current
                    }, ({
                        gsap: e,
                        reduced: a,
                        revealed: i,
                        signal: l
                    }) => {
                        let {
                            host: n
                        } = t, r = (0, f.f)(y), s = {
                            v: t.level()
                        }, c = {
                            v: 0
                        }, o = {
                            v: +!!a
                        }, d = performance.now(), u = null, m = !1, h = !1, v = !1, j = !1, _ = "no", w = 0, N = () => {
                            u && ((0, p.l)(u.canvas, Math.max(1, n.clientWidth), Math.max(1, n.clientHeight), x), u.gl.viewport(0, 0, u.canvas.width, u.canvas.height))
                        }, k = () => {
                            if (!u || u.gl.isContextLost()) return;
                            let {
                                gl: e,
                                canvas: t
                            } = u, {
                                prog: i,
                                U: l
                            } = u.programs.ticket, n = a ? 0 : (performance.now() - d) / 1e3, r = Math.floor(n * x.seedFps) % 97;
                            e.useProgram(i), e.uniform2f(l.res, t.width, t.height), e.uniform1f(l.seed, r);
                            let m = t.width / t.height,
                                f = Math.sin(1.7 * n) * g.flicker,
                                h = g.from + (g.to - g.from) * s.v + f,
                                p = .3 * Math.sin(Math.PI * o.v);
                            e.uniform2f(l.o, m / 2, -g.below), e.uniform1f(l.r, g.below - g.cold + (g.cold + h) * o.v), e.uniform1f(l.heat, Math.min(1, (.85 + .15 * c.v) * o.v + p)), e.uniform1f(l.mode, 0), e.uniform1f(l.warp, g.warp), e.uniform1f(l.spray, g.spray), e.uniform1f(l.tail, g.tail), e.uniform1f(l.core, g.core), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.drawArrays(e.TRIANGLES, 0, 3)
                        }, C = () => h && !a && !document.hidden, M = () => {
                            w = 0, C() && (k(), w = requestAnimationFrame(M))
                        }, T = () => {
                            if (v && !m) {
                                if ("no" === _) {
                                    let e;
                                    _ = "building", r.warm(), e = () => {
                                        l.aborted || (_ = "built", T())
                                    }, "function" == typeof requestIdleCallback ? requestIdleCallback(e, {
                                        timeout: 1500
                                    }) : setTimeout(e, 200)
                                }
                                j && h && "built" === _ && (u || m ? u : (u = r.get()) ? (n.append(u.canvas), N(), n.classList.add("is-live"), u) : (m = !0, null)) && (a ? k() : !w && C() && (w = requestAnimationFrame(M)))
                            }
                        }, $ = new IntersectionObserver(([e]) => {
                            h = !!e ? .isIntersecting, T()
                        });
                        $.observe(n);
                        let q = new IntersectionObserver(([e]) => {
                            e ? .isIntersecting && (v = !0, q.disconnect(), T())
                        }, {
                            rootMargin: "0px 0px 100% 0px"
                        });
                        q.observe(n);
                        let E = new ResizeObserver(() => {
                            N(), C() || k()
                        });
                        E.observe(n), document.addEventListener("visibilitychange", T), i.then(() => {
                            j = !l.aborted, T()
                        }), t.api.current = {
                            set(t) {
                                if (a) return s.v = t, T();
                                e.to(s, {
                                    v: t,
                                    duration: x.rise,
                                    ease: x.riseEase,
                                    overwrite: !0
                                })
                            },
                            poke() {
                                a || e.fromTo(c, {
                                    v: 1
                                }, {
                                    v: 0,
                                    duration: x.poke,
                                    ease: "power2.out",
                                    overwrite: !0
                                })
                            }
                        };
                        let S = a ? () => {} : function({
                            gsap: e,
                            revealed: t,
                            signal: a
                        }, i, l) {
                            let n = i.closest("[data-pg]"),
                                r = i.querySelectorAll(":scope > :not(.ct-brief__fx, dl), :scope > dl > div"),
                                s = null;
                            return t.then(() => {
                                if (!a.aborted) {
                                    if (!n ? .hasAttribute("data-parked")) return l();
                                    (s = new MutationObserver(() => {
                                        n.hasAttribute("data-parked") || (s ? .disconnect(), e.fromTo(r, {
                                            opacity: 0,
                                            y: b.y
                                        }, {
                                            opacity: 1,
                                            y: 0,
                                            duration: b.duration,
                                            ease: b.ease,
                                            stagger: b.stagger,
                                            delay: .3,
                                            clearProps: "transform,opacity"
                                        }), l(.45))
                                    })).observe(n, {
                                        attributes: !0,
                                        attributeFilter: ["data-parked"]
                                    })
                                }
                            }), () => {
                                s ? .disconnect(), e.killTweensOf(r), e.set(r, {
                                    clearProps: "transform,opacity"
                                })
                            }
                        }({
                            gsap: e,
                            revealed: i,
                            signal: l
                        }, n.parentElement, t => {
                            void 0 === t ? o.v = 1 : e.to(o, {
                                v: 1,
                                delay: t,
                                duration: 1.8,
                                ease: "power2.inOut"
                            })
                        });
                        return () => {
                            t.api.current = null, S(), cancelAnimationFrame(w), $.disconnect(), q.disconnect(), E.disconnect(), document.removeEventListener("visibilitychange", T), e.killTweensOf([s, c, o]), u && (0, p.I)(u.canvas, u.gl, n), n.classList.remove("is-live"), r.destroy()
                        }
                    })(e)
                }, l), (0, a.useEffect)(() => {
                    r.current = i, n.current ? .set(i)
                }, [i]), s = (0, a.useRef)(!0), (0, a.useEffect)(() => {
                    s.current ? s.current = !1 : n.current ? .poke()
                }, [e]), l),
                o = Math.round(100 * i),
                d = (e, t, a = !1) => ({
                    label: e,
                    value: t,
                    choice: a
                }),
                u = e => (0, t.jsx)("dl", {
                    className: "ct-ticket__rows",
                    children: e.map(e => (0, t.jsxs)("div", {
                        children: [(0, t.jsx)("dt", {
                            children: e.label
                        }), (0, t.jsx)("dd", {
                            children: (0, t.jsx)(N, {
                                value: e.value,
                                choice: e.choice
                            })
                        })]
                    }, e.label))
                });
            return (0, t.jsxs)("div", {
                className: "ct-ticket",
                children: [(0, t.jsx)("div", {
                    className: "ct-brief__fx",
                    ref: c
                }), (0, t.jsxs)("p", {
                    className: "ct-ticket__head",
                    children: [(0, t.jsx)("span", {
                        children: j.label
                    }), (0, t.jsx)("span", {
                        children: 100 === o ? j.ready : j.draft
                    })]
                }), u([d(j.name, _(e.name)), d(j.email, e.email.trim()), d(j.company, _(e.company)), d(j.type, e.type, !0)]), [{
                    label: j.about,
                    value: e.about,
                    n: 90
                }, {
                    label: j.success,
                    value: e.success,
                    n: 80
                }].map(e => {
                    var a, i;
                    let l;
                    return e.value.trim() && (0, t.jsxs)("p", {
                        className: "ct-ticket__p",
                        children: [(0, t.jsx)("span", {
                            children: e.label
                        }), (0, t.jsx)(N, {
                            value: (a = e.value, i = e.n, (l = a.trim()).length > i ? `${l.slice(0,i).replace(/[\s.,;:!?…–—-]+$/,"").trimEnd()}…` : l)
                        })]
                    }, e.label)
                }), u([d(j.budget, e.budget, !0), d(j.timing, e.timeline, !0)]), (0, t.jsxs)("p", {
                    className: "ct-ticket__total",
                    children: [(0, t.jsx)("span", {
                        children: j.written
                    }), (0, t.jsx)("span", {
                        className: "ct-ticket__pct",
                        children: j.pct(o)
                    })]
                })]
            })
        }

        function C({
            values: e
        }) {
            let a, i, l = (a = (e, t) => Math.min(1, e.trim().length / t), i = e.email && !d(e).email ? 1 : Math.min(.5, e.email.length / 12), (a(e.name, s.name.min) + i + a(e.about, s.about.min) + a(e.success, s.success.min) + +!!e.budget) / 5 * .85 + [e.company, e.type, e.timeline].filter(e => e.trim()).length / 3 * .15);
            return (0, t.jsx)("aside", {
                className: "ct-brief",
                "aria-hidden": "true",
                "data-pg": !0,
                "data-pr": "fig",
                style: {
                    "--p": l.toFixed(3)
                },
                children: (0, t.jsx)(k, {
                    values: e,
                    level: l
                })
            })
        }
        let M = r.f.contact,
            T = {
                name: "",
                email: "",
                company: "",
                type: "",
                about: "",
                success: "",
                budget: "",
                timeline: ""
            },
            $ = ["name", "email", "company", "type", "about", "success", "budget", "timeline"],
            q = (e, t) => t && "required" === e ? M.errors.pick : M.errors[e];

        function E({
            label: e,
            children: a
        }) {
            return (0, t.jsxs)("fieldset", {
                className: "ct-step",
                "data-pg": !0,
                children: [(0, t.jsx)("legend", {
                    className: "sr-only",
                    children: e
                }), (0, t.jsx)("div", {
                    className: "ct-step__fields",
                    children: a
                })]
            })
        }

        function S({
            name: e,
            label: a,
            hint: i,
            optional: l,
            error: n,
            counter: r,
            children: s
        }) {
            let c = `ct-${e}`,
                o = n ? `${c}-err` : i ? `${c}-hint` : void 0;
            return (0, t.jsxs)("div", {
                className: n ? "ct-field is-invalid" : "ct-field",
                "data-pr": "el",
                children: [(0, t.jsxs)("label", {
                    className: "ct-field__label",
                    htmlFor: c,
                    children: [a, l && (0, t.jsxs)("span", {
                        className: "ct-field__opt",
                        children: [" (", M.optional, ")"]
                    })]
                }), s({
                    id: c,
                    describedBy: o
                }), (0, t.jsx)("span", {
                    className: "ct-field__line",
                    "aria-hidden": "true"
                }), (0, t.jsxs)("div", {
                    className: "ct-field__foot",
                    children: [n ? (0, t.jsx)("p", {
                        className: "ct-field__err",
                        id: `${c}-err`,
                        children: q(n, !1)
                    }) : i && (0, t.jsx)("p", {
                        className: "ct-field__hint",
                        id: `${c}-hint`,
                        children: i
                    }), r]
                })]
            })
        }

        function L({
            name: e,
            label: i,
            options: l,
            value: n,
            error: r,
            optional: s,
            note: c,
            onChange: o
        }) {
            let d = `ct-${e}`,
                m = (0, a.useRef)(new Map),
                f = (0, a.useRef)(null),
                h = (0, a.useRef)(n);
            return (0, a.useLayoutEffect)(() => {
                let e = h.current;
                if (h.current = n, e === n) return;
                let t = e => {
                    let t = f.current;
                    return t && t.option === e && performance.now() - t.t < 800 ? t.at : void 0
                };
                for (let [a, i] of [
                        [e, !1],
                        [n, !0]
                    ]) {
                    let e = a && m.current.get(a);
                    e && (0, u.Z)(e, i, t(a))
                }
            }, [n]), (0, t.jsxs)("div", {
                className: r ? "ct-field ct-chips is-invalid" : "ct-field ct-chips",
                role: "radiogroup",
                "aria-labelledby": `${d}-label`,
                "aria-describedby": [c && `${d}-note`, r && `${d}-err`].filter(Boolean).join(" ") || void 0,
                "aria-required": !s || void 0,
                "data-pr": "el",
                children: [(0, t.jsxs)("p", {
                    className: "ct-field__label",
                    id: `${d}-label`,
                    children: [i, s && (0, t.jsxs)("span", {
                        className: "ct-field__opt",
                        children: [" (", M.optional, ")"]
                    })]
                }), c && (0, t.jsx)("p", {
                    className: "ct-field__hint ct-chips__note",
                    id: `${d}-note`,
                    children: c
                }), (0, t.jsx)("div", {
                    className: "ct-chips__row",
                    children: l.map((a, i) => (0, t.jsxs)("label", {
                        className: "ct-chip",
                        "data-fx-btn": !0,
                        ref: e => {
                            e ? m.current.set(a, e) : m.current.delete(a)
                        },
                        onPointerDown: e => {
                            let t = e.currentTarget.querySelector("[data-fx-host]");
                            if (!t) return;
                            let i = t.getBoundingClientRect();
                            f.current = {
                                option: a,
                                at: {
                                    x: e.clientX - i.left,
                                    y: e.clientY - i.top
                                },
                                t: performance.now()
                            }
                        },
                        children: [(0, t.jsx)("input", {
                            type: "radio",
                            name: e,
                            value: a,
                            id: 0 === i ? d : void 0,
                            checked: n === a,
                            onChange: () => o(a),
                            onClick: () => s && n === a && o(""),
                            onKeyDown: e => {
                                s && n === a && ("Backspace" === e.key || "Delete" === e.key) && (e.preventDefault(), o(""))
                            }
                        }), (0, t.jsxs)("span", {
                            className: "ct-chip__in",
                            children: [(0, t.jsx)("span", {
                                className: "ct-chip__fx",
                                "data-fx-host": !0,
                                "aria-hidden": "true"
                            }), (0, t.jsx)("span", {
                                className: "ct-chip__t",
                                "data-fx-t": !0,
                                children: a
                            })]
                        })]
                    }, a))
                }), r && (0, t.jsx)("p", {
                    className: "ct-field__err",
                    id: `${d}-err`,
                    children: q(r, !0)
                })]
            })
        }

        function R({
            value: e,
            min: a
        }) {
            let i = a - e.trim().length;
            return (0, t.jsx)("span", {
                className: "ct-field__count",
                "aria-live": "polite",
                children: "" !== e && (i > 0 ? (0, t.jsx)("span", {
                    "aria-hidden": "true",
                    children: M.more(i)
                }) : (0, t.jsx)("span", {
                    className: "sr-only",
                    children: M.enough
                }))
            })
        }
        e.s(["default", 0, function({
            email: e,
            projectTypes: c,
            budgets: o,
            timelines: u,
            sent: m
        }) {
            let [f, h] = (0, a.useState)(T), [p, v] = (0, a.useState)({}), [x, g] = (0, a.useState)("idle"), [b, y] = (0, a.useState)(null), j = (0, a.useRef)(0), _ = (0, a.useRef)(null), w = (0, a.useRef)(null), N = (0, a.useRef)(null), k = (0, a.useRef)(null), q = (0, a.useId)();
            (0, a.useEffect)(() => {
                j.current = Date.now()
            }, []);
            let I = (0, a.useCallback)(e => t => {
                let a = { ...f,
                    [e]: t
                };
                if (h(a), !p[e]) return;
                let i = { ...p
                    },
                    l = d(a)[e];
                l ? i[e] = l : delete i[e], v(i), 0 === Object.keys(i).length && y(e => "invalid" === e ? null : e)
            }, [f, p]);
            (0, a.useEffect)(() => {
                "sent" === x && w.current ? .focus(), "idle" === x && k.current && ("again" === k.current ? document.getElementById("ct-name") ? .focus() : N.current && (N.current.scrollIntoView({
                    block: "center"
                }), N.current.focus({
                    preventScroll: !0
                })), k.current = null)
            }, [x]);
            let F = e => {
                let t = $.find(t => e[t]);
                return t && document.getElementById(`ct-${t}`) ? .focus(), !!t
            };
            async function A(e) {
                if (e.preventDefault(), "sending" === x) return;
                y(null);
                let t = d(f);
                if (v(t), F(t)) return void y("invalid");
                g("sending");
                try {
                    let e = await fetch("/api/contact", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ ...f,
                                website: _.current ? .elements.namedItem("website") ? .value,
                                t: Date.now() - j.current
                            })
                        }),
                        t = await e.json();
                    if (t.ok) return void g("sent");
                    y(t.error ? ? "unavailable"), t.fields && v(t.fields), t.fields && F(t.fields) || (k.current = "status")
                } catch {
                    y("network"), k.current = "status"
                }
                g("idle")
            }
            if ("sent" === x) return (0, t.jsxs)("div", {
                className: "ct-sent",
                children: [(0, t.jsx)("h2", {
                    className: "ct-sent__title",
                    tabIndex: -1,
                    ref: w,
                    children: m.title
                }), (0, t.jsx)(l.default, { of: ".ct-sent__title"
                }), (0, t.jsx)("p", {
                    className: "ct-sent__text",
                    children: m.text
                }), (0, t.jsxs)("div", {
                    className: "ct-sent__links",
                    children: [(0, t.jsxs)("button", {
                        type: "button",
                        className: "dc-btn",
                        "data-fx-btn": !0,
                        onClick: () => {
                            h(T), v({}), y(null), k.current = "again", g("idle"), j.current = Date.now()
                        },
                        children: [(0, t.jsx)("span", {
                            className: "dc-btn__fx",
                            "data-fx-host": !0,
                            "aria-hidden": "true"
                        }), (0, t.jsx)("span", {
                            "data-fx-t": !0,
                            children: M.again
                        })]
                    }), (0, t.jsx)(i.f, {
                        href: "/",
                        label: r.f.error.home
                    })]
                })]
            });
            let D = "sending" === x;
            return (0, t.jsxs)("form", {
                ref: _,
                className: "ct-form",
                method: "post",
                noValidate: !0,
                onSubmit: A,
                "aria-describedby": b ? q : void 0,
                children: [(0, t.jsxs)("noscript", {
                    children: [(0, t.jsx)("style", {
                        children: ".ct-step, .ct-brief { display: none; }"
                    }), (0, t.jsxs)("p", {
                        className: "ct-noscript",
                        children: [M.noscript, " ", (0, t.jsx)("a", {
                            href: `mailto:${e}`,
                            children: e
                        })]
                    })]
                }), (0, t.jsx)("div", {
                    className: "ct-hp",
                    "aria-hidden": "true",
                    children: (0, t.jsxs)("label", {
                        children: ["Website", (0, t.jsx)("input", {
                            type: "text",
                            name: "website",
                            tabIndex: -1,
                            autoComplete: "off",
                            defaultValue: ""
                        })]
                    })
                }), (0, t.jsxs)(E, {
                    label: M.steps.you,
                    children: [(0, t.jsxs)("div", {
                        className: "ct-pair",
                        children: [(0, t.jsx)(S, {
                            name: "name",
                            label: M.name,
                            error: p.name,
                            children: ({
                                id: e,
                                describedBy: a
                            }) => (0, t.jsx)("input", {
                                id: e,
                                className: "ct-input",
                                name: "name",
                                autoComplete: "name",
                                autoCapitalize: "words",
                                required: !0,
                                maxLength: s.name.max,
                                value: f.name,
                                onChange: e => I("name")(e.target.value),
                                "aria-invalid": !!p.name || void 0,
                                "aria-describedby": a
                            })
                        }), (0, t.jsx)(S, {
                            name: "email",
                            label: M.email,
                            error: p.email,
                            children: ({
                                id: e,
                                describedBy: a
                            }) => (0, t.jsx)("input", {
                                id: e,
                                className: "ct-input",
                                name: "email",
                                type: "email",
                                inputMode: "email",
                                autoComplete: "email",
                                required: !0,
                                value: f.email,
                                onChange: e => I("email")(e.target.value),
                                "aria-invalid": !!p.email || void 0,
                                "aria-describedby": a
                            })
                        })]
                    }), (0, t.jsx)(S, {
                        name: "company",
                        label: M.company,
                        optional: !0,
                        error: p.company,
                        children: ({
                            id: e,
                            describedBy: a
                        }) => (0, t.jsx)("input", {
                            id: e,
                            className: "ct-input",
                            name: "company",
                            autoComplete: "organization",
                            maxLength: s.company.max,
                            value: f.company,
                            onChange: e => I("company")(e.target.value),
                            "aria-invalid": !!p.company || void 0,
                            "aria-describedby": a
                        })
                    })]
                }), (0, t.jsxs)(E, {
                    label: M.steps.project,
                    children: [(0, t.jsx)(L, {
                        name: "type",
                        label: M.type,
                        options: c,
                        value: f.type,
                        optional: !0,
                        onChange: I("type")
                    }), ["about", "success"].map(e => (0, t.jsx)(S, {
                        name: e,
                        label: M[e],
                        hint: "about" === e ? M.aboutHint : M.successHint,
                        error: p[e],
                        counter: (0, t.jsx)(R, {
                            value: f[e],
                            min: s[e].min
                        }),
                        children: ({
                            id: a,
                            describedBy: i
                        }) => (0, t.jsx)("textarea", {
                            id: a,
                            className: "ct-input ct-area",
                            name: e,
                            rows: 2,
                            required: !0,
                            minLength: s[e].min,
                            maxLength: s[e].max,
                            value: f[e],
                            onChange: t => I(e)(t.target.value),
                            "aria-invalid": !!p[e] || void 0,
                            "aria-describedby": i
                        })
                    }, e))]
                }), (0, t.jsxs)(E, {
                    label: M.steps.budget,
                    children: [(0, t.jsx)(L, {
                        name: "budget",
                        label: M.budget,
                        note: o.note,
                        options: o.options,
                        value: f.budget,
                        error: p.budget,
                        onChange: I("budget")
                    }), (0, t.jsx)(L, {
                        name: "timeline",
                        label: M.timeline,
                        options: u,
                        value: f.timeline,
                        optional: !0,
                        onChange: I("timeline")
                    })]
                }), (0, t.jsx)(C, {
                    values: f
                }), (0, t.jsxs)(E, {
                    label: M.steps.send,
                    children: [(0, t.jsxs)("div", {
                        className: "ct-send",
                        "data-pr": "el",
                        children: [(0, t.jsxs)("button", {
                            type: "submit",
                            className: "ct-submit",
                            "data-fx-btn": !0,
                            "aria-disabled": D || void 0,
                            "aria-busy": D,
                            children: [(0, t.jsx)("span", {
                                className: "ct-submit__fill",
                                "data-fx-host": !0,
                                "aria-hidden": "true"
                            }), (0, t.jsx)("span", {
                                className: "ct-submit__t",
                                "data-fx-t": !0,
                                children: D ? M.sending : M.send
                            }), (0, t.jsx)("svg", {
                                className: "ct-submit__arr",
                                viewBox: "0 0 16 16",
                                "aria-hidden": "true",
                                children: (0, t.jsx)("path", {
                                    d: "M2 8h11M9 4l4 4-4 4"
                                })
                            })]
                        }), (0, t.jsxs)("p", {
                            className: "ct-privacy",
                            children: [M.privacy, " ", (0, t.jsx)(n.SiteLink, {
                                className: "f-u",
                                href: "/privacy",
                                children: M.privacyLink
                            }), "."]
                        })]
                    }), (0, t.jsx)("div", {
                        className: "ct-status",
                        id: q,
                        role: "alert",
                        tabIndex: -1,
                        ref: N,
                        children: b && (0, t.jsxs)("p", {
                            children: [M.failure[b], ("unavailable" === b || "network" === b || "bot" === b) && (0, t.jsxs)(t.Fragment, {
                                children: [" ", M.orMail, " ", (0, t.jsx)("a", {
                                    className: "f-u",
                                    href: `mailto:${e}`,
                                    children: e
                                })]
                            })]
                        })
                    })]
                })]
            })
        }], 53160)
    }, 90262, e => {
        var t = e.i(92450),
            a = e.i(46281);
        e.s(["default", 0, function({
            id: e,
            root: i
        }) {
            return (0, a.f)(e, (0, t.f)(i)), null
        }])
    }, 8321, e => {
        var t = e.i(18050),
            a = e.i(71645);
        let i = new Map;

        function l(e) {
            let t, a = () => {
                t = setTimeout(() => {
                    e(), a()
                }, 6e4 - Date.now() % 6e4)
            };
            return a(), () => clearTimeout(t)
        }
        e.s(["default", 0, function({
            timeZone: e,
            location: n
        }) {
            var r;
            let s, c, o, d, u, m = (0, a.useSyncExternalStore)(l, () => Math.floor(Date.now() / 6e4), () => null),
                f = null === m ? null : (r = new Date(6e4 * m), u = (d = Math.abs(o = Math.round((Date.UTC(+(c = Object.fromEntries((!(s = i.get(e)) && (s = new Intl.DateTimeFormat("en-GB", {
                    timeZone: e,
                    hourCycle: "h23",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                }), i.set(e, s)), s).formatToParts(r).map(e => [e.type, e.value]))).year, c.month - 1, +c.day, +c.hour, +c.minute) - 6e4 * Math.floor(r.getTime() / 6e4)) / 6e4))) % 60 ? `:${String(d%60).padStart(2,"0")}` : "", {
                    time: `${c.hour}:${c.minute}`,
                    tz: `UTC${o>=0?"+":"−"}${Math.floor(d/60)}${u}`
                });
            return (0, t.jsxs)(t.Fragment, {
                children: [(0, t.jsx)("time", {
                    className: "f-clock",
                    dateTime: f ? .time,
                    children: f ? .time ? ? "--:--"
                }), " ", (0, t.jsx)("span", {
                    className: "f-clock__tz",
                    children: f ? .tz
                }), " ", n]
            })
        }], 8321)
    }, 7981, e => {
        var t = e.i(18050),
            a = e.i(25164),
            i = e.i(71645),
            l = e.i(34479),
            n = e.i(63082);
        e.s(["default", 0, function({
            music: e
        }) {
            let [r, s] = (0, i.useState)(null), [c, o] = (0, i.useState)(!1);
            (0, i.useEffect)(() => {
                let e, t, a, i, l, r = !0,
                    c = !0,
                    d = !1,
                    u = !1,
                    m = !1,
                    f = "",
                    h = 0,
                    p = async e => {
                        var a;
                        let i = `${e.url} ${e.playing} ${e.cover?.src??""}`;
                        if (i !== f && (f = i, e.cover && !await (a = e.cover.src, new Promise(e => {
                                let t = new window.Image;
                                t.onload = () => e(!0), t.onerror = () => e(!1), t.src = a
                            })) && (e = { ...e,
                                cover: void 0
                            }), r)) {
                            if ((0, n.p)()) return s(e);
                            o(!0), clearTimeout(t), t = setTimeout(() => {
                                s(e), o(!1)
                            }, 200)
                        }
                    },
                    v = async () => {
                        if (clearTimeout(e), r && "visible" === document.visibilityState) {
                            u = !0, h = Date.now(), a = new AbortController;
                            try {
                                let e = await fetch("/api/now-playing", {
                                        signal: a.signal
                                    }),
                                    t = e.ok ? await e.json() : {
                                        live: !1
                                    };
                                if (t.live) {
                                    m = !0;
                                    let {
                                        live: e,
                                        ...a
                                    } = t;
                                    await p(a)
                                } else m || (c = !1)
                            } catch {}
                            u = !1, r && c && (e = setTimeout(v, 6e4))
                        }
                    },
                    x = () => {
                        d && c && !u && "visible" === document.visibilityState && (clearTimeout(e), e = setTimeout(v, Math.max(0, h + 6e4 - Date.now())))
                    };
                document.addEventListener("visibilitychange", x);
                let g = () => {
                        d = !0, v()
                    },
                    b = () => {
                        "function" == typeof requestIdleCallback ? i = requestIdleCallback(g, {
                            timeout: 5e3
                        }) : l = setTimeout(g, 1e3)
                    };
                return "complete" === document.readyState ? b() : window.addEventListener("load", b, {
                    once: !0
                }), () => {
                    r = !1, window.removeEventListener("load", b), document.removeEventListener("visibilitychange", x), void 0 !== i && cancelIdleCallback(i), clearTimeout(l), clearTimeout(e), clearTimeout(t), a ? .abort()
                }
            }, []);
            let d = r ? .title ? ? e.title,
                u = r ? .artist ? ? e.artist,
                m = r ? .url ? ? e.url ? ? "#",
                f = r ? r.cover : e.cover,
                h = null !== r && !r.playing;
            return (0, t.jsxs)("a", {
                className: `f-now__item f-now__music${c?" is-swapping":""}`,
                href: m,
                target: "#" === m ? void 0 : "_blank",
                rel: "#" === m ? void 0 : "noopener",
                "data-playing": h ? "false" : void 0,
                children: [(0, t.jsx)("span", {
                    className: "f-cover f-cover--album",
                    "aria-hidden": "true",
                    children: f ? (0, t.jsx)(a.default, {
                        className: "f-cover__img",
                        src: f.src,
                        width: f.width,
                        height: f.height,
                        alt: ""
                    }) : (0, t.jsxs)("span", {
                        className: "f-rec__gen",
                        children: [(0, t.jsx)("span", {
                            className: "f-rec__gen-t",
                            children: d
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
                        }), h ? l.f.footer.lastPlayed : l.f.footer.nowPlaying]
                    }), (0, t.jsx)("span", {
                        className: "f-now__title f-u",
                        children: d
                    }), (0, t.jsx)("span", {
                        className: "f-now__by",
                        children: u
                    })]
                })]
            })
        }])
    }, 566, e => {
        var t = e.i(18050),
            a = e.i(8089);
        let i = ({
            b: e
        }) => (0, t.jsx)("svg", {
            className: e ? "f-showall__arr f-showall__arr--b" : "f-showall__arr",
            viewBox: "0 0 16 16",
            children: (0, t.jsx)("path", {
                d: "M2 8h11M9 4l4 4-4 4"
            })
        });
        e.s(["f", 0, function({
            href: e,
            label: l,
            className: n
        }) {
            return (0, t.jsxs)(a.SiteLink, {
                className: n ? `f-showall ${n}` : "f-showall",
                href: e,
                children: [(0, t.jsx)("span", {
                    className: "f-roll",
                    children: (0, t.jsxs)("span", {
                        className: "f-roll__in",
                        children: [(0, t.jsx)("span", {
                            className: "f-roll__t",
                            children: l
                        }), (0, t.jsx)("span", {
                            className: "f-roll__t f-roll__t--b",
                            "aria-hidden": "true",
                            children: l
                        })]
                    })
                }), (0, t.jsxs)("span", {
                    className: "f-showall__arrs",
                    "aria-hidden": "true",
                    children: [(0, t.jsx)(i, {}), (0, t.jsx)(i, {
                        b: !0
                    })]
                })]
            })
        }])
    }, 48, e => {
        var t = e.i(71645);
        e.i(17724);
        var a = e.i(89970),
            i = e.i(63082),
            l = e.i(47333);
        e.s(["default", 0, function({ of: e
        }) {
            return (0, t.useLayoutEffect)(() => {
                let t = document.documentElement,
                    n = document.querySelector(e);
                if (!n || (0, i.p)()) return void t.classList.remove("nf-hold");
                let r = (0, l.F)(n, a.e);
                t.classList.remove("nf-hold");
                let s = !0,
                    c = () => void document.fonts.ready.then(() => s && (0, l.t)(r, a.e)),
                    o = () => !t.classList.contains("motion") || t.classList.contains("motion-revealed"),
                    d = null;
                return o() ? c() : (d = new MutationObserver(() => {
                    o() && (d ? .disconnect(), c())
                })).observe(t, {
                    attributes: !0,
                    attributeFilter: ["class"]
                }), () => {
                    s = !1, d ? .disconnect(), (0, l.p)(r)
                }
            }, [e]), null
        }])
    }, 89278, e => {
        var t = e.i(27773),
            a = e.i(66657),
            i = e.i(53191),
            l = e.i(12171);
        let n = {
                heads: i.B,
                lede: i.c,
                words: i.v
            },
            r = {
                drive() {},
                stagger() {},
                landed() {}
            },
            s = e => Math.min(1, Math.max(0, e));

        function c(e, t) {
            let a = Math.min(1, e / (i.C.white * t / i.C.max));
            return `color-mix(in srgb, var(--liquid-from) ${(100*a).toFixed(1)}%, currentColor)`
        }
        e.s(["s", 0, function(o, d = n) {
            let {
                gsap: u,
                ScrollTrigger: m,
                signal: f
            } = o;
            if (o.reduced) return f.addEventListener("abort", (0, a.M)("liquid", r), {
                once: !0
            }), r;
            let h = navigator.vendor === i.W,
                p = e => !d.skip || !e.closest(d.skip),
                v = [...document.querySelectorAll(d.heads)].filter(p),
                x = d.words ? [...document.querySelectorAll(d.words)].filter(p) : [];
            for (let e of v) e.dataset.liquidHead = String(i.S.head);
            for (let e of x) e.dataset.liquidHead = String(i.S.lede), e.dataset.liquidDrive = "";
            let g = [...v, ...x].map(e => ({
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
                    svg: h ? null : (0, l.f)(e),
                    cl: null
                })),
                b = e => g.find(t => t.el === e),
                y = null,
                j = e => {
                    e.max = Math.max(i.y, Math.min(i.C.max, e.em * parseFloat(getComputedStyle(e.el).fontSize))), e.cl && y ? e.cl.refresh(e.max, y(getComputedStyle(e.el).getPropertyValue("--liquid-from").trim())) : e.svg ? .region(e.max), e.last = -1
                },
                _ = (e, t) => {
                    let a = t < i.J ? 0 : Math.min(e.max, t);
                    if (a !== e.last && (!(e.last >= 0 && Math.abs(a - e.last) < i.J) || 0 === a || a === e.max)) {
                        if (e.el.style.setProperty("--liquid", a.toFixed(2)), e.last = a, e.cl) return void e.cl.drive(a);
                        if (h) {
                            e.el.style.filter = 0 === a ? "" : `blur(${(a*i.P).toFixed(2)}px)`, e.el.style.color = 0 === a ? "" : c(a, e.max);
                            return
                        }
                        0 === a ? e.svg.sharp() : e.svg.blur(a, e.max), e.el.style.color = 0 === a ? "" : c(a, e.max)
                    }
                },
                w = e => {
                    let t = Math.min(Math.max(e.sp, e.floor), e.gate);
                    _(e, t >= 1 ? 0 : e.max * Math.pow(1 - t, i.C.exp))
                };
            for (let e of g) j(e), _(e, e.max);
            for (let e of g.slice(0, v.length)) {
                let t = t => {
                    e.sp = t.progress, w(e)
                };
                e.trig = m.create({
                    trigger: e.el,
                    ...d.range ? ? i.s,
                    onUpdate : t,
                    onRefresh : a => {
                        j(e), t(a)
                    },
                    onToggle: t => {
                        e.svg && !e.playing && (e.el.style.willChange = t.isActive ? "filter" : "")
                    }
                })
            }
            let N = g.slice(v.length),
                k = d.lede ? document.querySelector(d.lede) : null;
            if (k && N.length) {
                let e = N.length,
                    t = d.opens ? i.H : i.m.window;
                N.forEach((a, i) => {
                    a.at = e > 1 ? i / (e - 1) * (1 - t) : 0, a.win = t
                });
                let a = e => N.forEach(t => {
                        t.sp = s((e - t.at) / t.win), w(t)
                    }),
                    l = () => o.phone() ? i.m.phone : i.m.desk;
                d.opens ? m.create({
                    trigger: k,
                    onRefresh: () => N.forEach(e => {
                        j(e), w(e)
                    })
                }) : m.create({
                    trigger: k,
                    start: () => l().start,
                    end: () => l().end,
                    onUpdate: e => a(e.progress),
                    onRefresh: e => {
                        N.forEach(j), a(e.progress)
                    }
                })
            }
            let C = null,
                M = 0,
                T = e => {
                    e.playing = !1, e.svg && (e.el.style.willChange = e.trig ? .isActive ? "filter" : "")
                },
                $ = (e, t, a = i.z) => {
                    C ? .kill(), C = null;
                    let l = ++M;
                    for (let t of g) {
                        let a = e.includes(t);
                        t.playing && !a && T(t), t.gate !== +!a && (t.gate = +!a, w(t))
                    }
                    e.length && t.then(() => requestAnimationFrame(() => {
                        if (l !== M || f.aborted) return;
                        for (let t of e) t.playing = !0, t.svg && (t.el.style.willChange = "filter");
                        let t = {
                            T: 0
                        };
                        C = u.to(t, {
                            T: 1,
                            ...a,
                            onUpdate: () => e.forEach(e => {
                                e.gate = s((t.T - e.at) / e.win), w(e)
                            }),
                            onComplete: () => {
                                C = null, e.forEach(e => {
                                    e.gate = 1, w(e), T(e)
                                })
                            }
                        })
                    }))
                },
                q = {
                    drive(e, t) {
                        let a = b(e);
                        a ? .el.hasAttribute("data-liquid-drive") && (a.sp = t, w(a))
                    },
                    stagger(e, t, a) {
                        let i = b(e);
                        i && (i.at = t, i.win = a)
                    },
                    landed({
                        after: e = o.revealed
                    } = {}) {
                        $(g.filter(e => {
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
                        for (let a of (y = t, g)) a.cl = e(a.el, {
                            ink: c
                        }), j(a), w(a)
                }), d.opens) {
                let e = g.filter(e => e.el.hasAttribute("data-liquid-drive") || e.el.getBoundingClientRect().top + scrollY < innerHeight);
                for (let t of e) t.floor = 1;
                $(e, o.revealed, N.length ? i.K : i.z)
            }
            document.addEventListener(t.U, e => q.landed({
                after: e.detail ? .after
            }), {
                signal: f
            });
            let E = (0, a.M)("liquid", q);
            return f.addEventListener("abort", () => {
                for (let e of (E(), C ? .kill(), M++, g)) {
                    e.svg ? .destroy(), e.cl ? .destroy();
                    let t = e.el.style;
                    t.removeProperty("--liquid"), t.filter = "", t.color = "", t.willChange = "", delete e.el.dataset.liquidHead, delete e.el.dataset.liquidDrive
                }
            }, {
                once: !0
            }), q
        }, "L", 0, (e, t) => ({
            heads: i.V.map(t => `${e} ${t}`).join(", "),
            range: i.D,
            ...t && {
                lede: t,
                words: `${t} .f-w`
            },
            opens: !0
        })])
    }, 92450, e => {
        var t = e.i(89278),
            a = e.i(60138),
            i = e.i(74759);
        e.s(["f", 0, (e, {
            lede: l,
            heads: n
        } = {}) => r => {
            let {
                reduced: s,
                phone: c,
                revealed: o,
                signal: d
            } = r;
            if (s || !document.documentElement.classList.contains("motion")) return;
            let u = document.querySelector(e);
            if (!u) return;
            let m = (0, t.L)(e, l);
            (0, t.s)(r, { ...m,
                heads: n ? `${m.heads}, ${n}` : m.heads
            });
            let f = (0, i.N)(u, {
                scroller: document.documentElement,
                reduced: s,
                phone: c,
                fx: a.j
            });
            return f.prepare(), o.then(() => {
                d.aborted || f.watch()
            }), () => f.destroy()
        }])
    }])
})();