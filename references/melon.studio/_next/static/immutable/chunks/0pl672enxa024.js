(() => {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 94523, t => {
        var e = t.i(71645),
            i = t.i(51034);
        t.s(["default", 0, function(t) {
            return (0, e.useLayoutEffect)(() => (0, i.x)(t), [t]), null
        }])
    }, 49689, t => {
        var e = t.i(46281),
            i = t.i(66657),
            r = t.i(52473);
        t.s(["default", 0, function({
            kind: t,
            slug: a
        }) {
            return (0, e.f)("sheet-adopt", e => {
                Promise.all([(0, i.j)("overlay"), (0, r.T)()]).then(([i]) => {
                    e.signal.aborted || i.adopt(t, a, "traverse" === e.transition.arrival ? "instant" : "intro")
                })
            }), null
        }], 49689)
    }])
})();