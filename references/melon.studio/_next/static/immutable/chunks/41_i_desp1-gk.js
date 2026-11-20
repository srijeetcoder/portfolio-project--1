(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, [13125, e => {
    let t = null;
    e.s(["f", 0, function(e) {
        (t ? ? = Object.assign(document.createElement("canvas"), {
            width: 1,
            height: 1
        }).getContext("2d", {
            willReadFrequently: !0
        })).clearRect(0, 0, 1, 1), t.fillStyle = e, t.fillRect(0, 0, 1, 1);
        let [n, r, o] = t.getImageData(0, 0, 1, 1).data;
        return [n, r, o]
    }])
}, 17811, e => {
    let t = e => e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4,
        n = e => {
            let [n, r, o] = e.map(e => t(e / 255));
            return .2126 * n + .7152 * r + .0722 * o
        };
    e.s(["a", 0, function(e, t) {
        let r = n(e),
            o = n(t);
        return (Math.max(r, o) + .05) / (Math.min(r, o) + .05)
    }, "z", 0, function([e, t, n]) {
        let r = (e + .3963377774 * t + .2158037573 * n) ** 3,
            o = (e - .1055613458 * t - .0638541728 * n) ** 3,
            i = (e - .0894841775 * t - 1.291485548 * n) ** 3;
        return [4.0767416621 * r - 3.3077115913 * o + .2309699292 * i, -1.2684380046 * r + 2.6097574011 * o - .3413193965 * i, -.0041960863 * r - .7034186147 * o + 1.707614701 * i].map(e => Math.round(255 * Math.min(1, Math.max(0, e <= .0031308 ? 12.92 * e : 1.055 * e ** (1 / 2.4) - .055))))
    }, "R", 0, function([e, n, r]) {
        let [o, i, a] = [e, n, r].map(t), l = Math.cbrt(.4122214708 * o + .5363325363 * i + .0514459929 * a), s = Math.cbrt(.2119034982 * o + .6806995451 * i + .1073969566 * a), u = Math.cbrt(.0883024619 * o + .2817188376 * i + .6299787005 * a);
        return [.2104542553 * l + .793617785 * s - .0040720468 * u, 1.9779984951 * l - 2.428592205 * s + .4505937099 * u, .0259040371 * l + .7827717662 * s - .808675766 * u]
    }, "$", 0, function([e, t, n], r) {
        let o = Math.hypot(t, n),
            i = o < 1e-6 ? 0 : (180 * Math.atan2(n, t) / Math.PI + 360) % 360,
            a = void 0 === r ? "" : ` / ${r.toFixed(3)}`;
        return `oklch(${(100*e).toFixed(3)}% ${o.toFixed(5)} ${i.toFixed(2)}${a})`
    }])
}, 56385, 21323, e => {
    let t = /^oklch\((\d{1,3}(?:\.\d+)?)% (\d(?:\.\d+)?) (\d{1,3}(?:\.\d+)?)\)$/;
    e.s(["f", 0, t], 21323);
    let n = e => {
        let t = Math.min(1, Math.max(0, e));
        return t <= .0031308 ? 12.92 * t : 1.055 * t ** (1 / 2.4) - .055
    };

    function r(e) {
        let r = t.exec(e);
        if (!r) throw Error(`not an oklch(L% C H) colour: ${e}`);
        let o = Number(r[1]) / 100,
            i = Number(r[2]),
            a = Number(r[3]) * Math.PI / 180,
            l = i * Math.cos(a),
            s = i * Math.sin(a),
            u = (o + .3963377774 * l + .2158037573 * s) ** 3,
            c = (o - .1055613458 * l - .0638541728 * s) ** 3,
            d = (o - .0894841775 * l - 1.291485548 * s) ** 3;
        return [n(4.0767416621 * u - 3.3077115913 * c + .2309699292 * d), n(-1.2684380046 * u + 2.6097574011 * c - .3413193965 * d), n(-.0041960863 * u - .7034186147 * c + 1.707614701 * d)]
    }
    e.s(["B", 0, function(e) {
        let [t, n, o] = r(e);
        return [Math.round(255 * t), Math.round(255 * n), Math.round(255 * o)]
    }, "M", 0, r], 56385)
}, 34479, e => {
    let t = e => ` — ${e}`;
    e.s(["f", 0, {
        nav: {
            aria: "Main",
            work: "work",
            articles: "articles",
            about: "about",
            contact: "contact"
        },
        logoAria: {
            home: e => `${e}, back to top`,
            other: e => `${e}, home`
        },
        home: {
            heroAria: "Introduction",
            title: "melon studio — UX/UI, web, app and SaaS design studio in Poznań, Poland",
            workAria: "Selected work",
            portraitAria: "Piotr",
            moreAbout: "More about me",
            startProject: "Start a project"
        },
        tile: {
            open: e => `${e}: open project`
        },
        crumbAria: "Breadcrumb",
        crumb: {
            work: "Work",
            insights: "Insights"
        },
        end: {
            title: "Need a website, app or SaaS designed?",
            start: "Start a project",
            allWork: "All work",
            allInsights: "All insights"
        },
        project: {
            close: "Close",
            role: "Role",
            client: "Client",
            credit: {
                agency: "Agency",
                development: "Build",
                brand: "Brand"
            },
            year: "Year",
            services: "Services",
            visit: "Visit the live site",
            next: e => `Next project: ${e}`,
            endAria: "All done: back to the projects",
            chapter: (e, n) => `${e}${t(n)}`,
            chapterRest: t
        },
        post: {
            close: "Close",
            topic: "Topic",
            topics: "Topics",
            published: "Published",
            readingTime: "Reading time",
            author: "Author",
            copyLink: "Copy link",
            copied: "Link copied",
            copyFailed: "Copy failed",
            next: e => `Next note: ${e}`,
            endAria: "All done: back to the articles",
            who: {
                me: "me",
                model: "model",
                both: "model + me",
                people: "people"
            }
        },
        filterStatus: {
            all: e => `Showing all ${e} notes`,
            topic: (e, t) => `Showing ${e} ${1===e?"note":"notes"} in ${t}`
        },
        overlay: {
            dialog: "Project",
            note: "Note",
            pullFirst: "All work",
            pullNewer: "Newer note",
            pullNewest: "All notes"
        },
        listing: {
            all: "All",
            filterAria: "Filter by topic",
            topicsAria: "Topics",
            empty: "No notes on this topic yet."
        },
        work: {
            backHome: "Back to home",
            title: "Work",
            backTop: "Back to top",
            gridAria: "All projects",
            endAria: "Leave the index"
        },
        reviews: {
            prev: "Previous review",
            next: "Next review",
            announce: (e, t, n) => `Review ${e} of ${t}: ${n}`,
            caseStudy: e => `${e} case study`
        },
        footer: {
            nowPlaying: "Now playing",
            lastPlayed: "Last played",
            reading: "Reading",
            nowAria: "Listening and reading",
            socialAria: "Social",
            legalAria: "Legal",
            privacy: "Privacy",
            cookies: "Cookies",
            terms: "Terms",
            cookieSettings: "Cookie settings",
            services: "Services",
            servicesAria: "Services",
            polish: "Polski"
        },
        skip: "Skip to content",
        consent: {
            aria: "Cookie consent",
            label: "Cookies",
            text: "Analytics cookies, only if you agree.",
            accept: "Accept",
            decline: "Decline",
            policy: "Cookie policy",
            close: "Close",
            state: {
                granted: "Analytics is on.",
                denied: "Analytics is off."
            },
            saved: "Choice saved"
        },
        legal: {
            updated: "Last updated",
            sections: "Sections",
            contact: "Questions",
            contents: "On this page",
            settings: "Cookie settings"
        },
        error: {
            title: "Something broke",
            text: "An error stopped this page from loading. Try again, or start from the home page.",
            retry: "Try again",
            home: "Home",
            code: e => `Ref. ${e}`
        },
        contact: {
            steps: {
                you: "About you",
                project: "The project",
                budget: "Budget and timing",
                send: "Send"
            },
            meta: {
                email: "Email",
                reply: "Reply",
                time: "Local time"
            },
            name: "Your name",
            email: "Email",
            company: "Company",
            optional: "optional",
            type: "What kind of project?",
            about: "What are we building?",
            aboutHint: "The product, who it is for and where it stands today.",
            success: "What would make it a success?",
            successHint: "The result you would call a win, in a sentence or two.",
            budget: "Rough budget",
            timeline: "Timing",
            send: "Send the brief",
            sending: "Sending",
            privacy: "I use your details only to answer you. More in the",
            privacyLink: "privacy policy",
            more: e => `${e} more ${1===e?"character":"characters"}`,
            enough: "Long enough.",
            errors: {
                required: "Please fill this in.",
                short: "A little more, please.",
                long: "That is longer than the form takes.",
                email: "This doesn’t look like an email address.",
                pick: "Pick one, even a rough guess."
            },
            failure: {
                invalid: "Some answers need a second look.",
                bot: "The spam check took this for an automated message.",
                busy: "Too many messages in a short time. Please try again in a few minutes.",
                unavailable: "The message couldn’t be sent right now.",
                network: "The message didn’t go out. Check your connection and try again."
            },
            orMail: "Or write to me directly:",
            noscript: "The form needs JavaScript for its spam check. Write to me directly:",
            again: "Write another",
            brief: {
                label: "Your brief",
                success: "A success",
                type: "Type",
                budget: "Budget",
                timing: "Timing",
                blank: "…",
                name: "From",
                email: "Reply to",
                company: "Company",
                about: "Building",
                written: "Written",
                draft: "Draft",
                ready: "Ready to send",
                pct: e => `${e}%`
            }
        },
        clients: {
            ask: "This spot’s open.",
            start: "Let’s talk"
        },
        services: {
            caseStudy: "Case study",
            more: "More services"
        },
        about: {
            caseStudy: "Case study",
            facts: {
                based: "Based in",
                focus: "Focus",
                now: "Now",
                write: "Write"
            },
            experience: "Experience",
            clients: "Clients",
            reviews: "Kind words",
            tools: "Tools"
        },
        loader: {
            loading: "Loading",
            ready: "Ready",
            count: "000",
            percent: "%",
            aria: "Loading the page"
        },
        notFound: {
            title: "Page not found",
            home: "Home",
            work: "Work",
            insights: "Insights"
        },
        seo: {
            home: {
                title: {
                    absolute: "melon studio — web, app & SaaS design studio in Poznań"
                },
                description: "Piotr Brzeziński, UX/UI and product designer in Poznań, Poland. Websites, web and mobile apps, SaaS products and design systems for companies and agencies."
            },
            work: {
                title: "Website, app & SaaS design case studies",
                description: "Selected UX/UI case studies: SaaS and web apps, company websites and brands for Mastercard, Huuuge Games, IPG and agencies like zu.agency and WMC."
            },
            about: {
                title: "Piotr Brzeziński — UX/UI & product designer",
                description: "Product designer and design engineer in Poznań. I design SaaS products, apps, websites and design systems, and work in code with your developers."
            },
            contact: {
                title: "Hire a UX/UI designer — start a project",
                description: "Tell me about your website, app or SaaS project and a rough budget. Based in Poznań, working with companies and agencies across Europe."
            },
            notFound: "There is no page at this address."
        }
    }])
}, 49442, e => {
    var t = e.i(70382);
    let n = e => e - Math.floor(e);

    function r(e, t) {
        let r = n(.1031 * e),
            o = n(.1031 * t),
            i = n(.1031 * e),
            a = r * (o + 33.33) + o * (i + 33.33) + i * (r + 33.33);
        return n(((r += a) + (o += a)) * (i += a))
    }

    function o(e, t) {
        let n = Math.floor(e),
            o = Math.floor(t),
            i = e - n,
            a = t - o;
        i = i * i * (3 - 2 * i), a = a * a * (3 - 2 * a);
        let l = r(n, o),
            s = r(n + 1, o),
            u = r(n, o + 1);
        return l + (s - l) * i + (u + (r(n + 1, o + 1) - u) * i - (l + (s - l) * i)) * a
    }
    let [i, a] = t.s, l = [
        [],
        [
            [3, 0]
        ],
        [
            [0, 1]
        ],
        [
            [3, 1]
        ],
        [
            [1, 2]
        ], null, [
            [0, 2]
        ],
        [
            [3, 2]
        ],
        [
            [2, 3]
        ],
        [
            [0, 2]
        ], null, [
            [1, 2]
        ],
        [
            [3, 1]
        ],
        [
            [0, 1]
        ],
        [
            [3, 0]
        ],
        []
    ];
    e.s(["V", 0, function({
        w: e,
        h: n,
        cell: r,
        origin: i
    }) {
        let l = Math.ceil(e / r) + 3,
            s = Math.ceil(n / r) + 3,
            u = new Float32Array(l * s),
            c = i.x * (e / n),
            d = 1 - i.y,
            f = Math.min(e, n),
            h = 1 / 0,
            p = -1 / 0;
        for (let e = 0; e < s; e++)
            for (let i = 0; i < l; i++) {
                let m = e * l + i;
                if (0 === i || 0 === e || i === l - 1 || e === s - 1) {
                    u[m] = a;
                    continue
                }
                let g = (i - 1) * r,
                    y = (e - 1) * r,
                    v = g / n,
                    w = (n - y) / n,
                    b = g / f,
                    x = (n - y) / f,
                    A = Math.hypot(v - c, w - d),
                    M = (function(e, t) {
                        let n = .5 * o(e, t);
                        return [e, t] = [1.6 * e - 1.2 * t, 1.2 * e + 1.6 * t], n += .25 * o(e, t), [e, t] = [1.6 * e - 1.2 * t, 1.2 * e + 1.6 * t], (n += .125 * o(e, t)) / .875
                    }(1.15 * b + 3.1 * c, 1.15 * x + 3.1 * d) - .5) * 2.4,
                    E = o(6 * b - 5 * c, 6 * x - 5 * d) - .5;
                A += (M * t.U.warp + .03 * E) * function(e) {
                    let t = Math.min(1, Math.max(0, (e - 0) / .35));
                    return t * t * (3 - 2 * t)
                }(A), u[m] = A, A < h && (h = A), A > p && (p = A)
            }
        return {
            f: u,
            gx: l,
            gy: s,
            min: h,
            max: p,
            cell: r
        }
    }, "F", 0, function(e, t, n, r) {
        let o = new Map,
            i = new Map,
            a = (n, i, a) => {
                let l = i * t + n << 1 | !a;
                if (!o.has(l)) {
                    let s = e[i * t + n],
                        u = s / (s - (a ? e[i * t + n + 1] : e[(i + 1) * t + n]));
                    o.set(l, a ? [(n - 1 + u) * r, (i - 1) * r] : [(n - 1) * r, (i - 1 + u) * r])
                }
                return l
            },
            s = (e, t) => {
                let n = i.get(e);
                n ? n.push(t) : i.set(e, [t])
            },
            u = (e, t) => {
                s(e, t), s(t, e)
            };
        for (let r = 0; r < n - 1; r++)
            for (let n = 0; n < t - 1; n++) {
                let o = e[r * t + n],
                    i = e[r * t + n + 1],
                    s = e[(r + 1) * t + n + 1],
                    c = e[(r + 1) * t + n],
                    d = o > 0 | 2 * (i > 0) | 4 * (s > 0) | 8 * (c > 0);
                if (0 === d || 15 === d) continue;
                let f = [() => a(n, r, !0), () => a(n + 1, r, !1), () => a(n, r + 1, !0), () => a(n, r, !1)],
                    h = l[d];
                if (!h) {
                    let e = o + i + s + c > 0;
                    h = 5 === d ? e ? [
                        [0, 1],
                        [2, 3]
                    ] : [
                        [3, 0],
                        [1, 2]
                    ] : e ? [
                        [3, 0],
                        [1, 2]
                    ] : [
                        [0, 1],
                        [2, 3]
                    ]
                }
                for (let [e, t] of h) u(f[e](), f[t]())
            }
        let c = "",
            d = new Set;
        for (let e of i.keys()) {
            if (d.has(e)) continue;
            let t = -1,
                n = e,
                r = 0;
            do {
                d.add(n);
                let [e, a] = o.get(n);
                c += `${r++?"L":"M"}${e.toFixed(1)} ${a.toFixed(1)}`;
                let l = i.get(n),
                    s = l[0] !== t ? l[0] : l[1];
                t = n, n = s
            } while (n !== e && void 0 !== n && !d.has(n)) c += "Z"
        }
        return c
    }, "W", 0, function(e, t) {
        let n = new Uint8Array(t.gx * t.gy * 4);
        for (let e = 0; e < t.f.length; e++) {
            let r = Math.round(65535 * Math.min(1, Math.max(0, (t.f[e] - i) / (a - i))));
            n[4 * e] = r >> 8, n[4 * e + 1] = 255 & r, n[4 * e + 3] = 255
        }
        let r = e.createTexture();
        return e.bindTexture(e.TEXTURE_2D, r), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.pixelStorei(e.UNPACK_ALIGNMENT, 1), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, t.gx, t.gy, 0, e.RGBA, e.UNSIGNED_BYTE, n), r
    }, "i", 0, function(e, n) {
        let r = e.min - t.U.spray - .01;
        return r + (e.max + .01 - r) * n
    }, "m", 0, function(e, t, n = new Float32Array(e.f.length)) {
        let r = e.f;
        for (let e = 0; e < r.length; e++) n[e] = t - r[e];
        return n
    }], 49442)
}, 8915, 98076, e => {
    var t = e.i(82035);
    let n = {
            alpha: !0,
            premultipliedAlpha: !0,
            antialias: !1,
            depth: !1,
            stencil: !1
        },
        r = e => "function" == typeof requestIdleCallback ? requestIdleCallback(e, {
            timeout: 1500
        }) : setTimeout(e, 200);

    function o(e) {
        let o = null,
            i = !1,
            a = !1,
            l = !1;

        function s() {
            let r = document.createElement("canvas");
            r.width = r.height = 1;
            let i = r.getContext("webgl2", n) || r.getContext("webgl", n);
            if (!i) return null;
            let a = {};
            for (let [n, {
                    frag: r
                }] of Object.entries(e)) {
                let e = i.createProgram();
                for (let [n, o] of [
                        [i.VERTEX_SHADER, t.I],
                        [i.FRAGMENT_SHADER, r()]
                    ]) {
                    let t = i.createShader(n);
                    i.shaderSource(t, o), i.compileShader(t), i.attachShader(e, t)
                }
                i.bindAttribLocation(e, 0, "a"), i.linkProgram(e), a[n] = e
            }
            let l = {
                canvas: r,
                gl: i,
                ext: i.getExtension("KHR_parallel_shader_compile"),
                progs: a,
                programs: null
            };
            return r.addEventListener("webglcontextlost", e => {
                e.preventDefault(), o === l && (o = null)
            }), l
        }

        function u(t) {
            let {
                gl: n,
                progs: r
            } = t;
            if (!Object.values(r).every(e => n.getProgramParameter(e, n.LINK_STATUS))) return n.getExtension("WEBGL_lose_context") ? .loseContext(), !1;
            n.bindBuffer(n.ARRAY_BUFFER, n.createBuffer()), n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), n.STATIC_DRAW), n.enableVertexAttribArray(0), n.vertexAttribPointer(0, 2, n.FLOAT, !1, 0, 0), n.viewport(0, 0, 1, 1);
            let o = {};
            for (let [t, i] of Object.entries(r)) {
                n.useProgram(i);
                let r = {};
                for (let o of e[t].uniforms) r[o] = n.getUniformLocation(i, `u_${o}`);
                o[t] = {
                    prog: i,
                    U: r
                }, n.drawArrays(n.TRIANGLES, 0, 3)
            }
            return t.programs = o, !0
        }

        function c() {
            o = null, i = !0
        }

        function d() {
            if (!o) return;
            let e = o;
            o = null, e.gl.getExtension("WEBGL_lose_context") ? .loseContext()
        }

        function f(e) {
            e.persisted && p()
        }

        function h() {
            a || (a = !0, addEventListener("pagehide", d), addEventListener("pageshow", f))
        }

        function p() {
            o || i || (h(), r(() => {
                if (o || i) return;
                let e = null;
                try {
                    e = s()
                } catch {
                    e = null
                }
                if (!e) return c();
                o = e;
                let t = () => {
                        o !== e || e.programs || u(e) || c()
                    },
                    n = e.ext;
                if (!n) return r(t);
                let a = () => {
                    o !== e || e.programs || (Object.values(e.progs).every(t => e.gl.getProgramParameter(t, n.COMPLETION_STATUS_KHR)) ? t() : setTimeout(a, 16))
                };
                a()
            }))
        }

        function m() {
            if (i || l) return null;
            if (h(), o && o.gl.isContextLost() && (o = null), !o) {
                try {
                    o = s()
                } catch {
                    o = null
                }
                if (!o) return c(), null
            }
            return o.programs || u(o) ? {
                canvas: o.canvas,
                gl: o.gl,
                programs: o.programs
            } : (c(), null)
        }
        return {
            warm: p,
            get: m,
            take: function() {
                let e = m();
                if (!e) return null;
                l = !0;
                let t = !1;
                return { ...e,
                    give() {
                        t || (t = !0, l = !1)
                    }
                }
            },
            destroy: function() {
                removeEventListener("pagehide", d), removeEventListener("pageshow", f), a = !1, d()
            }
        }
    }
    e.s(["f", 0, o], 98076);
    let i = o({
        through: {
            frag: () => (0, t.O)((0, t.X)()),
            uniforms: "res dpr cell gn lohi n frame spray core band t0 t1 t2 f0 f1 f2".split(" ")
        },
        grain: {
            frag: () => (0, t.l)((0, t.X)()),
            uniforms: "res o r heat mode seed warp spray tail core".split(" ")
        }
    });
    e.s(["f", 0, i], 8915)
}, 27773, e => {
    e.s(["l", 0, 15, "s", 0, 6, "i", 0, .6, "U", 0, "motion:landed", "m", 0, {
        lerp: .09,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.4
    }, "M", 0, {
        contactLift: .22
    }, "z", 0, .35, "c", 0, .2])
}, 63082, e => {
    let t = "(prefers-reduced-motion: reduce)";
    e.s(["N", 0, function(e) {
        let n = matchMedia(t),
            r = t => e(t.matches);
        return n.addEventListener("change", r), () => n.removeEventListener("change", r)
    }, "p", 0, () => matchMedia(t).matches])
}, 57210, e => {
    e.i(47167);
    let t = new Map,
        n = null,
        r = !1,
        o = [];

    function i(e, t) {
        let n, r = new AbortController,
            o = e.gsap.context(() => {
                n = t.mod({ ...e,
                    revealed: e.transition.revealed,
                    signal: r.signal
                })
            }, t.scope);
        t.destroy = () => {
            t.destroy = null, r.abort(), n ? .(), o.revert()
        }
    }

    function a() {
        if (!r || (r = !1, !n)) return;
        let e = o;
        for (let t of (o = [], n.ScrollTrigger.sort(), n.ScrollTrigger.refresh(), e)) t()
    }

    function l(e) {
        e && o.push(e), r || (r = !0, requestAnimationFrame(a))
    }
    e.s(["v", 0, function(e) {
        for (let e of t.values()) e.destroy ? .();
        for (let r of (n = e, t.values())) i(e, r);
        l()
    }, "W", 0, () => l(), "i", 0, function() {
        r = !0, a()
    }, "$", 0, () => r, "O", 0, function(e, r, o) {
        t.get(e) ? .destroy ? .();
        let a = {
            mod: r,
            scope: o,
            destroy: null
        };
        return t.set(e, a), n && (i(n, a), l()), () => {
            t.get(e) === a && (t.delete(e), a.destroy ? .())
        }
    }, "o", 0, l, "t", 0, function() {
        for (let e of t.values()) e.destroy ? .();
        n = null
    }])
}, 67521, 1537, 50929, 11189, e => {
    var t = e.i(28205);
    let n = new Set;

    function r(e, t) {
        let r = {
            owner: e,
            onAbort: t
        };
        return n.add(r), () => {
            n.delete(r)
        }
    }

    function o(e) {
        let t = [...n];
        for (let r of (n.clear(), t)) r.onAbort ? .(e)
    }
    e.s(["K", 0, o, "Y", 0, r], 1537);
    var i = e.i(27773);
    let a = "route";

    function l(e) {
        let t = e ? .pf;
        return "object" == typeof t && null !== t && "string" == typeof t.kind && "number" == typeof t.depth ? t : {
            kind: a,
            depth: 0
        }
    }
    let s = (e, t, n) => void 0 !== e.route ? e.route !== n.route : t !== n.pathname;
    e.s(["x", 0, function(e, t) {
        let n = l(t),
            r = e.get(n.kind);
        return r ? {
            pf: n,
            handler: r
        } : null
    }, "W", 0, s, "J", 0, (e, t, n = {}) => ({ ...n,
        kind: t,
        depth: t === a ? 0 : l(e).depth + 1
    }), "l", 0, l, "r", 0, (e, t, n = {}) => ({ ...n,
        kind: t,
        depth: l(e).depth
    }), "y", 0, (e, t) => ({ ..."object" == typeof e && null !== e ? e : {},
        pf: t
    }), "A", 0, (e, t) => ({ ...l(e),
        route: t
    }), "S", 0, (e, t, n) => {
        let r = l(e);
        return { ...r,
            y: t,
            ...void 0 === r.route && void 0 !== n ? {
                route: n
            } : {}
        }
    }], 50929);
    let u = ["download", "data-close", "data-next", "data-no-ptx", "data-post"];

    function c(e, t) {
        if (t.defaultPrevented || 0 !== t.button || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || e.target && "_self" !== e.target || u.some(t => e.hasAttribute(t)) || e.classList.contains("proj__card")) return !0;
        let n = e.ownerDocument.location;
        if (!n) return !0;
        let r = new URL(n.href),
            o = new URL(e.href, r);
        return o.origin !== r.origin || o.pathname === r.pathname && o.search === r.search && "" !== o.hash
    }
    e.s(["f", 0, c], 11189);
    var d = e.i(57210);
    let f = null,
        h = Promise.resolve(),
        p = !1,
        m = null,
        g = Promise.resolve(),
        y = new Map,
        v = e => e.getBoundingClientRect().top + scrollY;

    function w(e, t) {
        let n = decodeURIComponent(e.replace(/^#/, ""));
        if (!n) return null;
        let r = y.get(n);
        if (r) return r();
        if ("hero" === n) return 0;
        let o = document.getElementById(n);
        return o ? "contact" === n ? Math.min(t.limit, v(o) - innerHeight * i.M.contactLift) : Math.min(t.limit, v(o)) : null
    }

    function b() {
        let e;
        return [new Promise(t => e = t), e]
    }
    let x = e => document.dispatchEvent(new CustomEvent(i.U, {
        detail: {
            after: e
        }
    }));
    e.s(["F", 0, function(e) {
        let n = e.firstRevealed;
        h = n;
        let a = "load",
            l = null,
            u = !0,
            g = location.pathname,
            y = null,
            v = null,
            A = 0,
            M = null,
            E = new Set,
            T = (e, t = null) => {
                M ? .(), a = e, l = t, h = n = new Promise(e => M = e)
            },
            k = t => {
                let n = e.scroll(),
                    r = "number" == typeof t ? t : w(t, n);
                null !== r && n.to(r, {
                    immediate: !0
                })
            },
            S = (n, i, a, {
                onAbort: l,
                onReveal: s,
                origin: u = e.origin()
            } = {}) => {
                let [c, d] = b(), [f, p] = b();
                for (let e of (h = f, E)) e({
                    href: n,
                    rest: !1,
                    covered: c,
                    revealed: f
                });
                o("navigate");
                let m = e.scroll(),
                    g = !m.stopped;
                return g && m.stop(), new Promise(n => {
                    let o = !1,
                        c = () => {
                            o || (o = !0, h(), g && e.scroll().start(), d(), p(), n())
                        },
                        h = r(i, () => {
                            l ? .(), m.abort(), c()
                        }),
                        m = (0, t.i)(async () => {
                            await a(f), g || e.scroll().stopped || (e.scroll().stop(), g = !0)
                        }, {
                            reduced: e.reduced(),
                            origin: u
                        });
                    m.covered.then(d), m.revealed.then(() => {
                        s ? .(), p()
                    }), m.done.then(c)
                })
            },
            L = e.history.onTraverse(e => {
                s(e, location.pathname, {
                    route: m,
                    pathname: g
                }) && (y = null, v = e.y ? ? 0, T("traverse"))
            }),
            P = {
                get revealed() {
                    return n
                },
                get arrival() {
                    return a
                },
                get from() {
                    return l
                },
                onNavigate: e => (E.add(e), () => void E.delete(e)),
                navigate(t, {
                    scroll: a = "top",
                    rest: l = !1
                } = {}) {
                    let s = new URL(t, location.href);
                    e.history.save(e.scroll().y);
                    let u = ++A;
                    T(l ? "traverse" : "push", g);
                    let c = M,
                        d = (t, n) => {
                            y = {
                                id: u,
                                scroll: a,
                                hash: s.hash,
                                held: !l,
                                finish: t
                            }, e.router.push(s.pathname + s.search + s.hash, {
                                scroll: !1
                            }), s.pathname === g && setTimeout(() => {
                                y ? .id === u && P.committed()
                            }), setTimeout(() => {
                                y ? .id === u && (y = null, n())
                            }, 1e3 * i.s)
                        };
                    if (l) {
                        for (let e of E) e({
                            href: t,
                            rest: l,
                            covered: Promise.resolve(),
                            revealed: n
                        });
                        return o("navigate"), new Promise(e => {
                            let t = r("navigate", () => {
                                    y ? .id === u && (y = null), e()
                                }),
                                n = () => {
                                    t(), e()
                                };
                            d(n, () => {
                                c(), n()
                            })
                        })
                    }
                    let f = () => {};
                    return S(t, "navigate", e => new Promise(t => {
                        f = t, d(() => {
                            s.hash && x(e), t()
                        }, t)
                    }), {
                        onAbort() {
                            y ? .id === u && (y = null), f()
                        },
                        onReveal: c
                    })
                },
                jump: t => null === w(t, e.scroll()) ? Promise.resolve() : S(null, "jump", async e => {
                    (0, d.$)() && (0, d.i)(), k(t), x(e)
                }),
                swap: (e, {
                    origin: t
                } = {}) => S(null, "navigate", async () => {
                    await e()
                }, {
                    origin: t
                }),
                origin: () => e.origin(),
                committed() {
                    if (g = location.pathname, null !== m && e.history.stamp(m), u) {
                        u = !1, (0, d.o)(e.onFirstCommit);
                        return
                    }
                    let t = y;
                    y = null;
                    let n = v;
                    v = null, t || null !== n || T("push");
                    let r = t ? "keep" === t.scroll ? null : t.hash || 0 : n ? ? 0;
                    if (null !== r && k(r), t ? .held) return void queueMicrotask(() => {
                        (0, d.i)(), null !== r && k(r), t.finish()
                    });
                    let o = M;
                    (0, d.o)(() => {
                        null !== r && k(r), o ? .(), t ? .finish()
                    })
                },
                destroy() {
                    L(), document.removeEventListener("click", _, !0), f === P && (f = null)
                }
            };

        function _(t) {
            let n = t.target ? .closest ? .("a[href]");
            if (n instanceof HTMLAnchorElement) {
                if (n.hasAttribute("data-nav") && !t.defaultPrevented && 0 === t.button && !t.metaKey && !t.ctrlKey && !t.shiftKey && !t.altKey && n.pathname === location.pathname) {
                    t.preventDefault(), P.jump(n.hash);
                    return
                }
                if (c(n, t)) {
                    t.defaultPrevented || e.history.save(e.scroll().y);
                    return
                }
                t.preventDefault(), P.navigate(n.href)
            }
        }
        return document.addEventListener("click", _, !0), f = P, p && (p = !1, P.committed()), P
    }, "q", 0, () => m, "J", 0, function(e) {
        m = e, f ? f.committed() : p = !0
    }, "m", 0, function(e, t) {
        return y.set(e, t), () => {
            y.get(e) === t && y.delete(e)
        }
    }, "y", 0, () => f ? h : g], 67521)
}, 47333, 46869, 17843, e => {
    var t = e.i(17811),
        n = e.i(21787),
        r = e.i(13125),
        o = e.i(53191),
        i = e.i(12171);
    let a = (e, t, n) => Math.min(n, Math.max(t, e));

    function l(e, t) {
        let n = 1,
            r = 1;
        for (let o = e; o && o !== t; o = o.parentElement) {
            let e = o.style;
            if ("hidden" === e.visibility) return {
                a: 0,
                fade: r
            };
            "" !== e.opacity && (o.classList.contains("pj") || o.classList.contains("pj-sheet") ? r *= Number(e.opacity) : n *= Number(e.opacity))
        }
        return {
            a: n,
            fade: r
        }
    }
    e.s(["W", 0, l, "O", 0, a], 46869);
    let s = {
            VEL_NORM: 400,
            V_SMOOTH: .35,
            TWIST: .12,
            REAR: .03,
            SAG: .03,
            ROLL_MIN: .035,
            ROLL_MAX: .09,
            DENT: .085,
            DENT_R: .24,
            DENT_E: .25,
            DENT_REF: 560,
            DENT_FOLLOW: .41,
            LIT: .75,
            SHADE: .5,
            TEASER_WIND: .12,
            PULL_WIND: -.09,
            ABOVE_WIND: -.09,
            BELOW_WIND: .08,
            FLY_LIFT: .03,
            FLAT_POW: .7,
            LIQ_MAX: 40,
            LIQ_EM: .24,
            LIQ_DUR: 1.25,
            LIQ_EXP: 1.6,
            LIQ_WHITE: 8,
            CLIP_PAD: 32
        },
        u = {
            token: "--red-3",
            minContrast: 1.6
        },
        c = {
            top: .9,
            alpha: .6
        },
        d = {
            duration: s.LIQ_DUR,
            ease: "power1.out"
        };

    function f(e, t) {
        return Math.round(4 * Math.min(Math.min(2, devicePixelRatio || 1), Math.max(1, Math.sqrt(6e5 / Math.max(1, (e.width + 6 * t) * (e.height + 6 * t)))))) / 4
    }

    function h(e) {
        let n = e.closest(".pj-end, .pj-sheet__b, .pj-sheet") ? ? document.body,
            o = (0, r.f)(getComputedStyle(document.documentElement).getPropertyValue(u.token));
        return (0, t.a)(o, (0, r.f)(getComputedStyle(n).backgroundColor)) >= u.minContrast ? [`var(${u.token})`, o] : ["currentColor", (0, r.f)(getComputedStyle(e.parentElement ? ? e).color)]
    }

    function p(e, t) {
        if (0 === t) return "";
        let n = Math.min(1, t / (s.LIQ_WHITE * e.max / s.LIQ_MAX));
        return `color-mix(in srgb, ${e.blob} ${(100*n).toFixed(1)}%, currentColor)`
    }

    function m(e, t) {
        let n = t < o.J ? 0 : Math.min(e.max, t);
        if (n !== e.last && (!(e.last >= 0 && Math.abs(n - e.last) < o.J) || 0 === n || n === e.max)) {
            if (e.last = n, e.cl) return void e.cl.drive(n);
            0 === n ? (e.svg ? .destroy(), e.svg = null) : e.svg ? .blur(n, e.max), e.h.style.color = p(e, n)
        }
    }

    function g(e, t) {
        if (e.tw || e.done) return;
        let [n, r] = h(e.h);
        e.blob = n, e.last = -1, e.cl ? .refresh(e.max, r), e.svg ? .region(e.max), e.tw = t.to(e, {
            e: 1,
            ...d,
            onUpdate: () => m(e, e.e >= 1 ? 0 : e.max * Math.pow(1 - e.e, s.LIQ_EXP)),
            onComplete: () => {
                e.done = !0, e.tw = null
            }
        })
    }
    e.s(["v", 0, "--black", "L", 0, u, "T", 0, s, "n", 0, {
        duration: .3,
        ease: "power1.in"
    }, "S", 0, c, "Z", 0, d, "W", 0, {
        antialias: !0,
        alpha: !0,
        powerPreference: "high-performance"
    }, "c", 0, {
        share: .85,
        screen: .7
    }, "E", 0, {
        x: 40,
        y: 48
    }, "X", 0, 4e3, "$", 0, f], 17843), e.s(["B", 0, ".pj__title, .pj-st__title", "t", 0, g, "S", 0, function(e, t, n, r) {
        if (e.tw || e.done || e.up && Number(t.getProperty(e.up, "yPercent")) >= 100) return;
        let o = e.h.getBoundingClientRect();
        if (o.top > n * c.top || o.bottom < 0) return;
        let i = l(e.h, r);
        i.a * i.fade < c.alpha || g(e, t)
    }, "p", 0, function(e) {
        e.tw ? .kill(), e.svg ? .destroy(), e.cl ? .destroy(), e.h.classList.remove("is-liquid"), e.h.style.filter = "", e.h.style.color = ""
    }, "F", 0, function(e, t) {
        let r = a(s.LIQ_EM * parseFloat(getComputedStyle(e).fontSize), o.y, s.LIQ_MAX);
        e.classList.add("is-liquid"), t.set(e.querySelectorAll(".up"), {
            clearProps: "transform"
        });
        let [l, u] = h(e), c = {
            h: e,
            up: e.querySelector(".up"),
            max: r,
            blob: l,
            last: -1,
            e: 0,
            tw: null,
            done: !1,
            svg: null,
            cl: null
        };
        return navigator.vendor === o.W ? (c.cl = (0, n.f)(e, {
            local: !0,
            scale: f,
            ink: e => p(c, e)
        }), c.cl.refresh(r, u)) : (c.svg = (0, i.f)(e), c.svg.region(r)), m(c, r), c
    }], 47333)
}, 21787, e => {
    e.i(13125);
    var t = e.i(53191),
        n = e.i(92440);
    let r = [],
        o = !1;

    function i() {
        let e = performance.now();
        for (; r.length && performance.now() - e < t.f.slice;) r[0]() && r.shift();
        r.length ? setTimeout(i, t.f.gap) : o = !1
    }
    e.s(["f", 0, function(e, a = {}) {
        let l = t.f.scale,
            s = 0,
            u = [255, 0, 0],
            c = null,
            d = null,
            f = null,
            h = null,
            p = new Float32Array(0),
            m = new Float32Array(0),
            g = 0,
            y = 0,
            v = 0,
            w = new Map,
            b = -1,
            x = !1,
            A = "",
            M = !1;

        function E() {
            let n = e.getBoundingClientRect(),
                r = a.local && n.width / Math.max(1, e.offsetWidth) || 1,
                o = a.local ? {
                    left: n.left,
                    top: n.top,
                    width: e.offsetWidth,
                    height: e.offsetHeight
                } : n;
            l = "function" == typeof a.scale ? a.scale(o, s) : a.scale ? ? t.f.scale;
            let i = `${o.width.toFixed(1)}x${o.height.toFixed(1)}|${getComputedStyle(e).font}|${s.toFixed(2)}|${l}`;
            if (h && i === A) return !1;
            A = i, v = Math.ceil(s * t.f.pad * l), g = Math.max(1, Math.ceil(o.width * l) + 2 * v), y = Math.max(1, Math.ceil(o.height * l) + 2 * v);
            let u = document.createElement("canvas");
            u.width = g, u.height = y;
            let x = u.getContext("2d", {
                willReadFrequently: !0
            });
            if (x.fillStyle = "black", e.querySelector("img")) x.beginPath(), x.ellipse(g / 2, y / 2, o.width * l / 2, o.height * l / 2, 0, 0, 2 * Math.PI), x.fill();
            else {
                let t = document.createTreeWalker(e, NodeFilter.SHOW_TEXT),
                    n = document.createRange();
                for (let e = t.nextNode(); e; e = t.nextNode()) {
                    let t = getComputedStyle(e.parentElement);
                    x.font = `${t.fontStyle} ${t.fontWeight} ${parseFloat(t.fontSize)*l}px ${t.fontFamily}`, x.textBaseline = "alphabetic";
                    let i = e.textContent ? ? "";
                    for (let t = 0; t < i.length; t++) {
                        if (!i[t].trim()) continue;
                        n.setStart(e, t), n.setEnd(e, t + 1);
                        let a = n.getBoundingClientRect();
                        if (!a.width && !a.height) continue;
                        let s = x.measureText(i[t]),
                            u = s.fontBoundingBoxAscent ? ? s.actualBoundingBoxAscent,
                            c = s.fontBoundingBoxDescent ? ? s.actualBoundingBoxDescent,
                            d = (a.left - o.left) / r,
                            f = (a.top - o.top) / r,
                            h = a.height / r,
                            p = f * l + (h * l - (u + c)) / 2 + u;
                        x.fillText(i[t], d * l + v, p + v)
                    }
                }
            }
            let M = x.getImageData(0, 0, g, y).data;
            h = new Uint8ClampedArray(g * y);
            for (let e = 0; e < g * y; e++) h[e] = M[4 * e + 3];
            return p = new Float32Array(g * y), m = new Float32Array(g * y), w = new Map, b = -1, c && d && (c.width = g, c.height = y, T(), f = d.createImageData(g, y)), !0
        }

        function T() {
            Object.assign(c.style, {
                left: `${-v/l}px`,
                top: `${-v/l}px`,
                width: `${g/l}px`,
                height: `${y/l}px`
            })
        }

        function k(e) {
            let r = w.get(e);
            return r || (r = function(e) {
                var t;
                let r, o, i, [a, u] = (0, n.D)(e, s);
                for (let e = 0; e < g * y; e++) p[e] = h[e] / 255;
                for (let n of ((r = Math.floor(Math.sqrt(12 * (t = Math.max(.3, e * l)) * t / 3 + 1))) % 2 == 0 && r--, o = r + 2, i = Math.round((12 * t * t - 3 * r * r - 12 * r - 9) / (-4 * r - 4)), [0, 1, 2].map(e => ((e < i ? r : o) - 1) / 2))) {
                    let e = Math.max(0, Math.round(n));
                    e && (! function(e, t, n, r, o) {
                        let i = 1 / (o + o + 1);
                        for (let a = 0; a < r; a++) {
                            let r = a * n,
                                l = r,
                                s = r + o,
                                u = e[r],
                                c = e[r + n - 1],
                                d = (o + 1) * u;
                            for (let t = 0; t < o; t++) d += e[r + Math.min(t, n - 1)];
                            for (let l = 0; l <= o; l++) d += (s < a * n + n ? e[s++] : c) - u, t[r++] = d * i;
                            for (let a = o + 1; a < n - o; a++) d += e[s++] - e[l++], t[r++] = d * i;
                            for (let a = Math.max(n - o, o + 1); a < n; a++) d += c - e[l++], t[r++] = d * i
                        }
                    }(p, m, g, y, e), function(e, t, n, r, o) {
                        let i = 1 / (o + o + 1);
                        for (let a = 0; a < n; a++) {
                            let l = a,
                                s = l,
                                u = l + o * n,
                                c = e[l],
                                d = e[l + n * (r - 1)],
                                f = (o + 1) * c;
                            for (let t = 0; t < o; t++) f += e[l + Math.min(t, r - 1) * n];
                            for (let a = 0; a <= o; a++) f += (u < n * r ? e[u] : d) - c, u += n, t[l] = f * i, l += n;
                            for (let a = o + 1; a < r - o; a++) f += e[u] - e[s], u += n, s += n, t[l] = f * i, l += n;
                            for (let a = Math.max(r - o, o + 1); a < r; a++) f += d - e[s], s += n, t[l] = f * i, l += n
                        }
                    }(m, p, g, y, e))
                }
                let c = new Uint8ClampedArray(g * y);
                for (let e = 0; e < g * y; e++) {
                    let t = p[e] * a + u;
                    t > 0 && (c[e] = t >= 1 ? 255 : 255 * t)
                }
                return c
            }(s * e / t.f.steps), w.set(e, r)), r
        }
        return {
            refresh(e, n) {
                if (String(n) !== String(u) && (u = n, b = -1), s = e, !E()) return;
                let a = h,
                    l = t.f.steps;
                r.push(() => a !== h || l < 1 || (k(l--), l < 1)), o || (o = !0, setTimeout(i, t.f.delay))
            },
            drive(n) {
                if (n > s * t.U) {
                    ! function(n) {
                        let r;
                        h || E(), c || ((c = document.createElement("canvas")).className = "liq-cv", c.setAttribute("aria-hidden", "true"), c.style.cssText = "position:absolute;pointer-events:none;display:none;z-index:1", "static" === getComputedStyle(e).position && (e.style.position = "relative", M = !0), e.appendChild(c), d = c.getContext("2d"), c.width = g, c.height = y, T(), f = d.createImageData(g, y));
                        let o = (r = s, Math.max(1, Math.min(t.f.steps, Math.ceil(n / r * t.f.steps))));
                        if (x || (c.style.display = "block", x = !0), o === b) return;
                        b = o;
                        let i = k(o),
                            a = f.data,
                            [l, p, m] = u;
                        for (let e = 0, t = 0; e < i.length; e++, t += 4) a[t] = l, a[t + 1] = p, a[t + 2] = m, a[t + 3] = i[e];
                        d.putImageData(f, 0, 0)
                    }(n), e.style.color = "transparent", e.style.filter = "";
                    return
                }
                c && x && (c.style.display = "none", x = !1, b = -1), e.style.filter = 0 === n ? "" : `blur(${(n*t.P).toFixed(2)}px)`, e.style.color = 0 === n ? "" : a.ink ? .(n, s) ? ? ""
            },
            destroy() {
                h = null, w = new Map, c ? .remove(), c = null, d = null, f = null, x = !1, M && (e.style.position = ""), e.style.filter = "", e.style.color = ""
            }
        }
    }])
}, 53191, 92440, e => {
    let t = {
            max: 40,
            exp: 1.6,
            white: 8
        },
        n = {
            start: "top bottom",
            end: "top 40%"
        },
        r = {
            start: n.start,
            end: `clamp(${n.end})`
        };

    function o(e, n = t.max) {
        let r = Math.min(.42, .5 * Math.min(1, .19 + 5.3 / Math.max(e * (t.max / n), .01))),
            i = 24 - 18 * Math.min(1, e / n);
        return [i, .5 - i * r]
    }
    e.s(["A", 0, {
        id: "liquid",
        region: {
            x: "-20%",
            y: "-40%",
            width: "140%",
            height: "180%"
        },
        matrix: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
    }, "f", 0, {
        steps: 24,
        scale: .5,
        pad: 2.5,
        slice: 6,
        gap: 16,
        delay: 200
    }, "P", 0, .3, "B", 0, "#work .work__heading, #chapters .f-title, #chapters .f-clients__title, #chapters .f-rv__title", "s", 0, n, "z", 0, {
        duration: 1.3,
        ease: "sine.out"
    }, "c", 0, "#chapters .f-lede", "v", 0, "#chapters .f-lede .f-w", "C", 0, t, "S", 0, {
        head: .24,
        lede: .2
    }, "U", 0, .2, "m", 0, {
        window: .22,
        desk: {
            start: "top 92%",
            end: "bottom 45%"
        },
        phone: {
            start: "top 95%",
            end: "bottom 60%"
        }
    }, "y", 0, 2, "K", 0, {
        duration: 1.5,
        ease: "sine.out"
    }, "H", 0, .34, "V", 0, [".dc-title", ".dc-h", ".f-title", ".ab-mf__statement", ".ab-cta__title", ".ew-title", ".ix-title"], "D", 0, r, "Z", 0, 3, "W", 0, "Apple Computer, Inc.", "J", 0, .25], 53191), e.s(["L", 0, function(e, n = t.max) {
        let [r, i] = o(e, n);
        return `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${r.toFixed(3)} ${i.toFixed(3)}`
    }, "D", 0, o], 92440)
}, 12171, e => {
    var t = e.i(53191),
        n = e.i(92440);
    let r = "http://www.w3.org/2000/svg",
        o = 0;
    e.s(["f", 0, function(e) {
        let i = function() {
                let e = document.getElementById(t.A.id);
                if (e instanceof SVGFilterElement) return e;
                let n = document.createElementNS(r, "svg");
                n.setAttribute("class", "fx-defs"), n.setAttribute("width", "0"), n.setAttribute("height", "0"), n.setAttribute("aria-hidden", "true"), n.setAttribute("focusable", "false");
                let o = document.createElementNS(r, "filter");
                for (let [e, n] of (o.id = t.A.id, Object.entries(t.A.region))) o.setAttribute(e, n);
                o.setAttribute("color-interpolation-filters", "sRGB");
                let i = document.createElementNS(r, "feGaussianBlur");
                i.setAttribute("in", "SourceGraphic"), i.setAttribute("stdDeviation", "0"), i.setAttribute("result", "b");
                let a = document.createElementNS(r, "feColorMatrix");
                return a.setAttribute("in", "b"), a.setAttribute("type", "matrix"), a.setAttribute("values", t.A.matrix), o.append(i, a), n.append(o), document.body.append(n), o
            }(),
            a = i.cloneNode(!0);
        a.id = `${t.A.id}-${++o}`, i.parentNode.appendChild(a);
        let l = a.querySelector("feGaussianBlur"),
            s = a.querySelector("feColorMatrix"),
            u = !1;
        return {
            region(n) {
                let r = n * t.Z,
                    o = Math.max(1, e.offsetWidth),
                    i = Math.max(1, e.offsetHeight);
                a.setAttribute("x", (-r / o).toFixed(4)), a.setAttribute("width", (1 + 2 * r / o).toFixed(4)), a.setAttribute("y", (-r / i).toFixed(4)), a.setAttribute("height", (1 + 2 * r / i).toFixed(4))
            },
            blur(t, r) {
                u || (e.style.filter = `url(#${a.id})`, u = !0), l.setAttribute("stdDeviation", t.toFixed(2)), s.setAttribute("values", (0, n.L)(t, r))
            },
            sharp() {
                e.style.filter = "none", u = !1
            },
            destroy() {
                a.remove(), e.style.filter = ""
            }
        }
    }])
}, 28205, 15852, 37921, 94598, e => {
    var t = e.i(49442),
        n = e.i(8915),
        r = e.i(70382);
    e.i(17724);
    var o = e.i(89970);
    let i = {
            duration: 1.1,
            ease: "sine.inOut",
            reveal: .55,
            cell: 8,
            band: .035,
            dprMax: 1.5,
            pxMax: 2903040
        },
        a = {
            cover: .66,
            coverEase: "power2.inOut",
            coolAt: .42,
            cool: .24,
            uncover: .85,
            uncoverEase: "power1.inOut",
            heat: .1,
            reveal: .36,
            seedFps: 30,
            uncoverSeed: 100
        },
        l = {
            cover: .35,
            uncover: .45,
            ease: "cubic-bezier(.65,0,.35,1)"
        },
        s = {
            opacity: .996,
            frames: 3
        };

    function u(e, t, n, {
        dprMax: r,
        pxMax: o
    }) {
        let i = Math.min(devicePixelRatio || 1, r);
        t * n * i * i > o && (i = Math.sqrt(o / (t * n))), e.width = Math.round(t * i), e.height = Math.round(n * i)
    }

    function c(e, t, n) {
        e.parentNode !== n || (e.remove(), t.isContextLost() || (e.width = e.height = 1, t.viewport(0, 0, 1, 1)))
    }
    e.s(["Q", 0, i, "b", 0, a, "r", 0, l, "G", 0, s, "$", 0, 2.5], 15852), e.s(["I", 0, c, "l", 0, u], 37921), e.s(["f", 0, {
        kind: null,
        phase: "idle",
        origin: null,
        tl: null,
        t0: 0,
        last: null
    }], 94598);
    var d = e.i(27773);

    function f(e, t, n) {
        return e.style.background = "var(--black)", e.animate([{
            opacity: t
        }, {
            opacity: n
        }], {
            duration: 1e3 * d.z,
            easing: "ease-in-out",
            fill: "forwards"
        }).finished.then(() => {})
    }
    let h = "var(--black)",
        p = -r.U.spray - .02;

    function m(e, t) {
        let n = e.x * t,
            r = 1 - e.y;
        return Math.max(Math.hypot(n, r), Math.hypot(t - n, r), Math.hypot(n, 1 - r), Math.hypot(t - n, 1 - r))
    }

    function g(e, t, n, r) {
        return e.style.background = h, e.animate([{
            opacity: t
        }, {
            opacity: n
        }], {
            duration: 1e3 * r,
            easing: l.ease,
            fill: "forwards"
        }).finished.then(() => {})
    }

    function y(e, t, n, o) {
        if (!o) return null;
        let {
            canvas: a,
            gl: l
        } = o, {
            prog: s,
            U: d
        } = o.programs.grain;
        u(a, Math.max(1, e.clientWidth), Math.max(1, e.clientHeight), i), l.viewport(0, 0, a.width, a.height), l.useProgram(s);
        let f = a.width / a.height;
        return l.uniform2f(d.res, a.width, a.height), l.uniform1f(d.warp, r.U.warp), l.uniform1f(d.spray, r.U.spray), l.uniform1f(d.tail, r.U.tail), l.uniform1f(d.core, r.U.core), l.uniform2f(d.o, t.x * f, 1 - t.y), l.uniform1f(d.mode, n), e.append(a), {
            aspect: f,
            draw(e, t, n) {
                l.isContextLost() || (l.uniform1f(d.r, e), l.uniform1f(d.heat, t), l.uniform1f(d.seed, n), l.drawArrays(l.TRIANGLES, 0, 3))
            },
            release: () => c(a, l, e)
        }
    }

    function v(e, t, n, r) {
        return new Promise(o => {
            let i = () => {
                t.kill(), r(), o()
            };
            t.eventCallback("onUpdate", () => e.isConnected ? n() : i()), t.eventCallback("onComplete", () => {
                n(), i()
            }), n(), t.play()
        })
    }
    async function w(e, t, n) {
        let i = y(e, t, 0, n);
        if (!i) return g(e, 0, 1, l.cover);
        let s = m(t, i.aspect) + .75 * r.U.warp + r.U.spray + .04,
            u = {
                p: 0,
                heat: 1
            },
            c = o.e.timeline({
                paused: !0
            });
        c.to(u, {
            p: 1,
            duration: a.cover,
            ease: a.coverEase
        }, 0).to(u, {
            heat: 0,
            duration: a.cool,
            ease: "power1.in"
        }, a.coolAt), await v(e, c, () => i.draw(p + (s - p) * u.p, u.heat, Math.floor(c.time() * a.seedFps)), i.release), e.style.background = h
    }
    let b = e => e ? "fade" : "function" == typeof document.startViewTransition ? "burn" : "grain";

    function x() {
        let e;
        return [new Promise(t => e = t), e]
    }
    let A = null;
    e.s(["h", 0, function(e) {
        if ("function" != typeof document.startViewTransition) return;
        let n = innerWidth,
            r = innerHeight;
        A = {
            origin: e,
            w: n,
            h: r,
            field: (0, t.V)({
                w: n,
                h: r,
                cell: i.cell,
                origin: e
            })
        }
    }, "i", 0, function(e, {
        reduced: d,
        origin: M
    }) {
        let E = b(d),
            T = "fade" === E ? null : n.f.take(),
            k = e => {},
            [S, L] = x(),
            [P, _] = x(),
            [C, R] = x(),
            F = () => {
                _()
            },
            I = () => {},
            U = !1,
            $ = () => {
                U || (U = !0, I(), T ? .give(), k("idle"), L(), F(), R())
            },
            N = async () => {
                U || (L(), k("updating"), await e().catch(reportError))
            };
        if ("burn" === E) {
            let e = document.documentElement;
            e.classList.add("ptx-burn");
            let n = null,
                a = document.startViewTransition(N);
            I = () => {
                a.skipTransition(), n ? .cancel(), e.classList.remove("ptx-burn")
            }, a.ready.then(() => {
                U || (k("burning"), (n = function({
                    origin: e,
                    field: n,
                    gl: a
                }) {
                    let l;
                    performance.now();
                    let s = innerWidth,
                        d = innerHeight,
                        f = n ? ? (0, t.V)({
                            w: s,
                            h: d,
                            cell: i.cell,
                            origin: e
                        }),
                        h = new Float32Array(f.f.length),
                        p = document.documentElement.animate([{
                            clipPath: "inset(50%)"
                        }, {
                            clipPath: "inset(50%)"
                        }], {
                            pseudoElement: "::view-transition-new(root)",
                            duration: 1e9,
                            fill: "forwards"
                        }),
                        m = p.effect,
                        g = document.createElement("div");
                    g.className = "ptx-bt-layer", g.setAttribute("aria-hidden", "true"), document.body.append(g), performance.now();
                    let y = function(e, n, o, a, l) {
                            if (!l) return null;
                            let {
                                canvas: s,
                                gl: d
                            } = l, {
                                prog: f,
                                U: h
                            } = l.programs.through;
                            u(s, n, o, i), d.viewport(0, 0, s.width, s.height), d.useProgram(f), d.activeTexture(d.TEXTURE0);
                            let p = (0, t.W)(d, a);
                            for (let e of ["t0", "t1", "t2"]) d.uniform1i(h[e], 0);
                            return d.uniform2f(h.res, s.width, s.height), d.uniform1f(h.dpr, s.width / n), d.uniform1f(h.cell, a.cell), d.uniform2f(h.gn, a.gx, a.gy), d.uniform2f(h.lohi, r.s[0], r.s[1]), d.uniform1f(h.n, 1), d.uniform1f(h.spray, r.U.spray), d.uniform1f(h.core, r.U.core), d.uniform1f(h.band, i.band), e.append(s), {
                                draw(e, t, r) {
                                    d.isContextLost() || (d.uniform3f(h.f0, e, t.x * (n / o), 1 - t.y), d.uniform1f(h.frame, r % 97), d.clear(d.COLOR_BUFFER_BIT), d.drawArrays(d.TRIANGLES, 0, 3))
                                },
                                release() {
                                    d.isContextLost() || d.deleteTexture(p), c(s, d, e)
                                }
                            }
                        }(g, s, d, f, a),
                        v = {
                            p: 0
                        },
                        w = 0,
                        b = () => {
                            var n;
                            let r, o = (0, t.i)(f, v.p);
                            r = (n = (0, t.F)((0, t.m)(f, o, h), f.gx, f.gy, f.cell)) ? `path(evenodd, "${n}")` : "inset(50%)", m.setKeyframes([{
                                clipPath: r
                            }, {
                                clipPath: r
                            }]), y ? .draw(o, e, w++)
                        },
                        x = new Promise(e => l = e),
                        A = o.e.timeline({
                            onUpdate: b,
                            paused: !0
                        });
                    A.to(v, {
                        p: 1,
                        duration: i.duration,
                        ease: i.ease
                    }, 0).call(l, void 0, i.duration * i.reveal), b(), A.play();
                    let M = !1,
                        E = () => {
                            M || (M = !0, p.cancel(), y ? .release(), g.remove())
                        },
                        T = () => {};
                    return {
                        revealed: x,
                        done: new Promise(e => {
                            A.eventCallback("onComplete", () => {
                                for (let e of (v.p = 1, b(), document.getAnimations().filter(e => e.effect ? .pseudoElement ? .startsWith("::view-transition")))) e.finish();
                                requestAnimationFrame(() => {
                                    E(), e()
                                })
                            }), T = () => {
                                A.kill(), E(), l(), e()
                            }
                        }),
                        cancel: () => T()
                    }
                }({
                    origin: M,
                    field: function(e) {
                        let t = A;
                        if (A = null, t && t.w === innerWidth && t.h === innerHeight) return t.origin.x === e.x && t.origin.y === e.y ? t.field : void 0
                    }(M),
                    gl: T
                })).revealed.then(F), n.done.then($))
            }, $)
        } else {
            let e = document.createElement("div");
            e.className = "ptx is-blocking", e.setAttribute("aria-hidden", "true"), document.body.append(e);
            let t = () => {
                for (let t of e.getAnimations()) t.cancel()
            };
            I = () => {
                t(), e.remove()
            }, (async () => {
                let n;
                k("covering"), await ("grain" === E ? w(e, M, T) : f(e, 0, 1)).catch(() => {}), U || (t(), await N(), !U && (e.style.opacity = String(s.opacity), await (n = s.frames, new Promise(e => {
                    let t = () => --n <= 0 ? e() : requestAnimationFrame(t);
                    requestAnimationFrame(t)
                })), U || (e.style.opacity = "", k("uncovering"), await ("grain" === E ? function(e, t, n, {
                    onReveal: i
                }) {
                    e.style.background = h;
                    let s = y(e, t, 1, n);
                    if (!s) return i(), g(e, 1, 0, l.uncover);
                    let u = m(t, s.aspect) + .5 * r.U.warp + r.U.spray + .04,
                        c = {
                            p: 0,
                            heat: 0
                        },
                        d = o.e.timeline({
                            paused: !0
                        });
                    d.to(c, {
                        heat: 1,
                        duration: a.heat,
                        ease: "power2.out"
                    }, 0).to(c, {
                        p: 1,
                        duration: a.uncover - .04,
                        ease: a.uncoverEase
                    }, .04).call(i, void 0, a.reveal);
                    let f = v(e, d, () => s.draw(p + (u - p) * c.p, c.heat, Math.floor(d.time() * a.seedFps) + a.uncoverSeed), s.release);
                    return e.style.background = "", f
                }(e, M, T, {
                    onReveal: F
                }) : function(e, {
                    onReveal: t
                }) {
                    return t(), f(e, 1, 0)
                }(e, {
                    onReveal: F
                })).catch(() => {}), $())))
            })()
        }
        return {
            kind: E,
            covered: S,
            revealed: P,
            done: C,
            abort: $
        }
    }, "m", 0, b], 28205)
}, 25164, e => {
    var t = e.i(5500);
    e.s(["default", () => t.Image])
}], 18566, (e, t, n) => {
    t.exports = e.r(76562)
}]);