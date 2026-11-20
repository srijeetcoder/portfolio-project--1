(() => {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 53348, e => {
        var s = e.i(18050),
            r = e.i(71645),
            l = e.i(72739);
        e.s(["default", 0, function({
            error: e,
            retry: t
        }) {
            return (0, r.useEffect)(() => console.error(e), [e]), (0, s.jsxs)("html", {
                lang: "en",
                children: [(0, s.jsx)("head", {
                    children: (0, s.jsx)("link", {
                        rel: "stylesheet",
                        href: "https://use.typekit.net/omg1nuw.css"
                    })
                }), (0, s.jsx)("body", {
                    children: (0, s.jsx)(l.f, {
                        error: e,
                        retry: t
                    })
                })]
            })
        }])
    }, 72739, e => {
        var s = e.i(18050),
            r = e.i(25164),
            l = e.i(22016),
            t = e.i(566),
            a = e.i(48),
            n = e.i(34479);
        e.s(["f", 0, function({
            error: e,
            retry: i
        }) {
            let o = e instanceof Error && "digest" in e && "string" == typeof e.digest ? e.digest : null;
            return (0, s.jsxs)(s.Fragment, {
                children: [(0, s.jsx)("title", {
                    children: n.f.error.title
                }), (0, s.jsx)("header", {
                    className: "topbar",
                    children: (0, s.jsx)(l.default, {
                        className: "topbar__logo",
                        href: "/",
                        "aria-label": n.f.error.home,
                        children: (0, s.jsx)(r.default, {
                            src: "/brand/Logo-melon.svg",
                            width: 110,
                            height: 50,
                            alt: "",
                            loading: "eager"
                        })
                    })
                }), (0, s.jsxs)("main", {
                    className: "nf f-grid",
                    id: "main",
                    tabIndex: -1,
                    children: [(0, s.jsx)("h1", {
                        className: "nf__title",
                        children: n.f.error.title
                    }), (0, s.jsx)(a.default, { of: ".nf__title"
                    }), (0, s.jsx)("p", {
                        className: "nf__text",
                        children: n.f.error.text
                    }), (0, s.jsxs)("div", {
                        className: "nf__links",
                        children: [(0, s.jsx)("button", {
                            type: "button",
                            className: "f-showall nf__retry",
                            onClick: i,
                            children: (0, s.jsx)("span", {
                                className: "f-roll",
                                children: (0, s.jsxs)("span", {
                                    className: "f-roll__in",
                                    children: [(0, s.jsx)("span", {
                                        className: "f-roll__t",
                                        children: n.f.error.retry
                                    }), (0, s.jsx)("span", {
                                        className: "f-roll__t f-roll__t--b",
                                        "aria-hidden": "true",
                                        children: n.f.error.retry
                                    })]
                                })
                            })
                        }), (0, s.jsx)(t.f, {
                            href: "/",
                            label: n.f.error.home
                        })]
                    }), o && (0, s.jsx)("p", {
                        className: "nf__ref",
                        children: n.f.error.code(o)
                    })]
                })]
            })
        }])
    }, 566, e => {
        var s = e.i(18050),
            r = e.i(8089);
        let l = ({
            b: e
        }) => (0, s.jsx)("svg", {
            className: e ? "f-showall__arr f-showall__arr--b" : "f-showall__arr",
            viewBox: "0 0 16 16",
            children: (0, s.jsx)("path", {
                d: "M2 8h11M9 4l4 4-4 4"
            })
        });
        e.s(["f", 0, function({
            href: e,
            label: t,
            className: a
        }) {
            return (0, s.jsxs)(r.SiteLink, {
                className: a ? `f-showall ${a}` : "f-showall",
                href: e,
                children: [(0, s.jsx)("span", {
                    className: "f-roll",
                    children: (0, s.jsxs)("span", {
                        className: "f-roll__in",
                        children: [(0, s.jsx)("span", {
                            className: "f-roll__t",
                            children: t
                        }), (0, s.jsx)("span", {
                            className: "f-roll__t f-roll__t--b",
                            "aria-hidden": "true",
                            children: t
                        })]
                    })
                }), (0, s.jsxs)("span", {
                    className: "f-showall__arrs",
                    "aria-hidden": "true",
                    children: [(0, s.jsx)(l, {}), (0, s.jsx)(l, {
                        b: !0
                    })]
                })]
            })
        }])
    }, 48, e => {
        var s = e.i(71645);
        e.i(17724);
        var r = e.i(89970),
            l = e.i(63082),
            t = e.i(47333);
        e.s(["default", 0, function({ of: e
        }) {
            return (0, s.useLayoutEffect)(() => {
                let s = document.documentElement,
                    a = document.querySelector(e);
                if (!a || (0, l.p)()) return void s.classList.remove("nf-hold");
                let n = (0, t.F)(a, r.e);
                s.classList.remove("nf-hold");
                let i = !0,
                    o = () => void document.fonts.ready.then(() => i && (0, t.t)(n, r.e)),
                    c = () => !s.classList.contains("motion") || s.classList.contains("motion-revealed"),
                    d = null;
                return c() ? o() : (d = new MutationObserver(() => {
                    c() && (d ? .disconnect(), o())
                })).observe(s, {
                    attributes: !0,
                    attributeFilter: ["class"]
                }), () => {
                    i = !1, d ? .disconnect(), (0, t.p)(n)
                }
            }, [e]), null
        }])
    }])
})();