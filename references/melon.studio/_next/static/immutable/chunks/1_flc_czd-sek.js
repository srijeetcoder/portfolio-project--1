(() => {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 54810, e => {
        var r = e.i(18050),
            s = e.i(71645),
            l = e.i(72739);
        e.s(["default", 0, function({
            error: e,
            retry: a
        }) {
            return (0, s.useEffect)(() => console.error(e), [e]), (0, r.jsx)(l.f, {
                error: e,
                retry: a
            })
        }])
    }, 72739, e => {
        var r = e.i(18050),
            s = e.i(25164),
            l = e.i(22016),
            a = e.i(566),
            t = e.i(48),
            n = e.i(34479);
        e.s(["f", 0, function({
            error: e,
            retry: i
        }) {
            let o = e instanceof Error && "digest" in e && "string" == typeof e.digest ? e.digest : null;
            return (0, r.jsxs)(r.Fragment, {
                children: [(0, r.jsx)("title", {
                    children: n.f.error.title
                }), (0, r.jsx)("header", {
                    className: "topbar",
                    children: (0, r.jsx)(l.default, {
                        className: "topbar__logo",
                        href: "/",
                        "aria-label": n.f.error.home,
                        children: (0, r.jsx)(s.default, {
                            src: "/brand/Logo-melon.svg",
                            width: 110,
                            height: 50,
                            alt: "",
                            loading: "eager"
                        })
                    })
                }), (0, r.jsxs)("main", {
                    className: "nf f-grid",
                    id: "main",
                    tabIndex: -1,
                    children: [(0, r.jsx)("h1", {
                        className: "nf__title",
                        children: n.f.error.title
                    }), (0, r.jsx)(t.default, { of: ".nf__title"
                    }), (0, r.jsx)("p", {
                        className: "nf__text",
                        children: n.f.error.text
                    }), (0, r.jsxs)("div", {
                        className: "nf__links",
                        children: [(0, r.jsx)("button", {
                            type: "button",
                            className: "f-showall nf__retry",
                            onClick: i,
                            children: (0, r.jsx)("span", {
                                className: "f-roll",
                                children: (0, r.jsxs)("span", {
                                    className: "f-roll__in",
                                    children: [(0, r.jsx)("span", {
                                        className: "f-roll__t",
                                        children: n.f.error.retry
                                    }), (0, r.jsx)("span", {
                                        className: "f-roll__t f-roll__t--b",
                                        "aria-hidden": "true",
                                        children: n.f.error.retry
                                    })]
                                })
                            })
                        }), (0, r.jsx)(a.f, {
                            href: "/",
                            label: n.f.error.home
                        })]
                    }), o && (0, r.jsx)("p", {
                        className: "nf__ref",
                        children: n.f.error.code(o)
                    })]
                })]
            })
        }])
    }, 566, e => {
        var r = e.i(18050),
            s = e.i(8089);
        let l = ({
            b: e
        }) => (0, r.jsx)("svg", {
            className: e ? "f-showall__arr f-showall__arr--b" : "f-showall__arr",
            viewBox: "0 0 16 16",
            children: (0, r.jsx)("path", {
                d: "M2 8h11M9 4l4 4-4 4"
            })
        });
        e.s(["f", 0, function({
            href: e,
            label: a,
            className: t
        }) {
            return (0, r.jsxs)(s.SiteLink, {
                className: t ? `f-showall ${t}` : "f-showall",
                href: e,
                children: [(0, r.jsx)("span", {
                    className: "f-roll",
                    children: (0, r.jsxs)("span", {
                        className: "f-roll__in",
                        children: [(0, r.jsx)("span", {
                            className: "f-roll__t",
                            children: a
                        }), (0, r.jsx)("span", {
                            className: "f-roll__t f-roll__t--b",
                            "aria-hidden": "true",
                            children: a
                        })]
                    })
                }), (0, r.jsxs)("span", {
                    className: "f-showall__arrs",
                    "aria-hidden": "true",
                    children: [(0, r.jsx)(l, {}), (0, r.jsx)(l, {
                        b: !0
                    })]
                })]
            })
        }])
    }, 48, e => {
        var r = e.i(71645);
        e.i(17724);
        var s = e.i(89970),
            l = e.i(63082),
            a = e.i(47333);
        e.s(["default", 0, function({ of: e
        }) {
            return (0, r.useLayoutEffect)(() => {
                let r = document.documentElement,
                    t = document.querySelector(e);
                if (!t || (0, l.p)()) return void r.classList.remove("nf-hold");
                let n = (0, a.F)(t, s.e);
                r.classList.remove("nf-hold");
                let i = !0,
                    o = () => void document.fonts.ready.then(() => i && (0, a.t)(n, s.e)),
                    c = () => !r.classList.contains("motion") || r.classList.contains("motion-revealed"),
                    f = null;
                return c() ? o() : (f = new MutationObserver(() => {
                    c() && (f ? .disconnect(), o())
                })).observe(r, {
                    attributes: !0,
                    attributeFilter: ["class"]
                }), () => {
                    i = !1, f ? .disconnect(), (0, a.p)(n)
                }
            }, [e]), null
        }])
    }])
})();