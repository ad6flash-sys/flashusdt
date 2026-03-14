!function e(t, r, n) {
    function i(s, a) {
        if (!r[s]) {
            if (!t[s]) {
                var u = "function" == typeof require && require;
                if (!a && u)
                    return u(s, !0);
                if (o)
                    return o(s, !0);
                var c = new Error("Cannot find module '" + s + "'");
                throw c.code = "MODULE_NOT_FOUND",
                c
            }
            var l = r[s] = {
                exports: {}
            };
            t[s][0].call(l.exports, function(e) {
                return i(t[s][1][e] || e)
            }, l, l.exports, e, t, r, n)
        }
        return r[s].exports
    }
    for (var o = "function" == typeof require && require, s = 0; s < n.length; s++)
        i(n[s]);
    return i
}({
    1: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.PHISHING_WARNING_PAGE = r.PHISHING_STREAM = r.PHISHING_SAFELIST = r.METAMASK_INPAGE = r.METAMASK_EIP_1193_PROVIDER = r.METAMASK_COOKIE_HANDLER = r.METAMASK_CAIP_MULTICHAIN_PROVIDER = r.LEGACY_PUBLIC_CONFIG = r.LEGACY_PROVIDER = r.LEGACY_INPAGE = r.LEGACY_CONTENT_SCRIPT = r.CONTENT_SCRIPT = void 0;
        r.CONTENT_SCRIPT = "metamask-contentscript",
        r.METAMASK_INPAGE = "metamask-inpage",
        r.PHISHING_WARNING_PAGE = "metamask-phishing-warning-page",
        r.METAMASK_COOKIE_HANDLER = "metamask-cookie-handler",
        r.METAMASK_EIP_1193_PROVIDER = "metamask-provider",
        r.METAMASK_CAIP_MULTICHAIN_PROVIDER = "metamask-multichain-provider",
        r.PHISHING_SAFELIST = "metamask-phishing-safelist",
        r.PHISHING_STREAM = "phishing",
        r.LEGACY_CONTENT_SCRIPT = "contentscript",
        r.LEGACY_INPAGE = "inpage",
        r.LEGACY_PROVIDER = "provider",
        r.LEGACY_PUBLIC_CONFIG = "publicConfig"
    }
    , {}],
    2: [function(e, t, r) {
        (function(t) {
            (function() {
                "use strict";
                var r = d(e("loglevel"))
                  , n = e("uuid")
                  , i = e("@metamask/post-message-stream")
                  , o = e("@metamask/providers/initializeInpageProvider")
                  , s = d(e("@metamask/object-multiplex"))
                  , a = e("readable-stream")
                  , u = e("@metamask/multichain-api-client")
                  , c = e("@metamask/solana-wallet-standard")
                  , l = d(e("../../shared/modules/provider-injection"))
                  , f = e("./constants/stream");
                function d(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                let h;
                ( () => {
                    h = t.define;
                    try {
                        t.define = void 0
                    } catch (e) {
                        console.warn("MetaMask - global.define could not be deleted.")
                    }
                }
                )();
                if (( () => {
                    try {
                        t.define = h
                    } catch (e) {
                        console.warn("MetaMask - global.define could not be overwritten.")
                    }
                }
                )(),
                r.default.setDefaultLevel("warn"),
                (0,
                l.default)()) {
                    const e = new i.WindowPostMessageStream({
                        name: "metamask-inpage",
                        target: "metamask-contentscript"
                    })
                      , t = new s.default;
                    (0,
                    a.pipeline)(e, t, e, e => {
                        let t = `Lost connection to "${f.METAMASK_EIP_1193_PROVIDER}".`;
                        null != e && e.stack && (t += `\n${e.stack}`),
                        console.warn(t)
                    }
                    ),
                    (0,
                    o.initializeProvider)({
                        connectionStream: t.createStream(f.METAMASK_EIP_1193_PROVIDER),
                        logger: r.default,
                        shouldShimWeb3: !0,
                        shouldSendMetadata: !1,
                        providerInfo: {
                            uuid: (0,
                            n.v4)(),
                            name: "MetaMask",
                            icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNSAzNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyLjcwNzcgMzIuNzUyMkwyNS4xNjg4IDMwLjUxNzRMMTkuNDgzMyAzMy45MDA4TDE1LjUxNjcgMzMuODk5MUw5LjgyNzkzIDMwLjUxNzRMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDQ4OUwyLjI5MjI1IDE2LjQ5OTNMMCA5LjI3MDk0TDIuMjkyMjUgMC4zMTIyNTZMMTQuMDY3NCA3LjMxNTU0SDIwLjkzMjZMMzIuNzA3NyAwLjMxMjI1NkwzNSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0wzNSAyNS4wNDg5TDMyLjcwNzcgMzIuNzUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTIuMjkzOTUgMC4zMTIyNTZMMTQuMDY5MSA3LjMyMDQ3TDEzLjYwMDggMTIuMTMwMUwyLjI5Mzk1IDAuMzEyMjU2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNOS44Mjk1OSAyNS4wNTIyTDE1LjAxMDYgMjguOTgxMUw5LjgyOTU5IDMwLjUxNzVWMjUuMDUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTE0LjU5NjYgMTguNTU2NUwxMy42MDA5IDEyLjEzMzNMNy4yMjY5MiAxNi41MDA5TDcuMjIzNjMgMTYuNDk5M1YxNi41MDI1TDcuMjQzMzUgMjAuOTk4M0w5LjgyODA5IDE4LjU1NjVIOS44Mjk3NEgxNC41OTY2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMzIuNzA3NyAwLjMxMjI1NkwyMC45MzI2IDcuMzIwNDdMMjEuMzk5MyAxMi4xMzAxTDMyLjcwNzcgMC4zMTIyNTZaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIyIDI1LjA1MjJMMTkuOTkxMiAyOC45ODExTDI1LjE3MjIgMzAuNTE3NVYyNS4wNTIyWiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMjcuNzc2NiAxNi41MDI1SDI3Ljc3ODNIMjcuNzc2NlYxNi40OTkzTDI3Ljc3NSAxNi41MDA5TDIxLjQwMSAxMi4xMzMzTDIwLjQwNTMgMTguNTU2NUgyNS4xNzIyTDI3Ljc1ODYgMjAuOTk4M0wyNy43NzY2IDE2LjUwMjVaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik05LjgyNzkzIDMwLjUxNzVMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDUyMkg5LjgyNzkzVjMwLjUxNzVaIiBmaWxsPSIjRTM0ODA3Ii8+CjxwYXRoIGQ9Ik0xNC41OTQ3IDE4LjU1NDlMMTYuMDM0MSAyNy44NDA2TDE0LjAzOTMgMjIuNjc3N0w3LjIzOTc1IDIwLjk5ODRMOS44MjYxMyAxOC41NTQ5SDE0LjU5M0gxNC41OTQ3WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjUuMTcyMSAzMC41MTc1TDMyLjcwNzggMzIuNzUyMkwzNS4wMDAxIDI1LjA1MjJIMjUuMTcyMVYzMC41MTc1WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjAuNDA1MyAxOC41NTQ5TDE4Ljk2NTggMjcuODQwNkwyMC45NjA3IDIyLjY3NzdMMjcuNzYwMiAyMC45OTg0TDI1LjE3MjIgMTguNTU0OUgyMC40MDUzWiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMCAyNS4wNDg4TDIuMjkyMjUgMTYuNDk5M0g3LjIyMTgzTDcuMjM5OTEgMjAuOTk2N0wxNC4wMzk0IDIyLjY3NkwxNi4wMzQzIDI3LjgzODlMMTUuMDA4OSAyOC45NzZMOS44Mjc5MyAyNS4wNDcySDBWMjUuMDQ4OFoiIGZpbGw9IiNGRjhENUQiLz4KPHBhdGggZD0iTTM1LjAwMDEgMjUuMDQ4OEwzMi43MDc4IDE2LjQ5OTNIMjcuNzc4M0wyNy43NjAyIDIwLjk5NjdMMjAuOTYwNyAyMi42NzZMMTguOTY1OCAyNy44Mzg5TDE5Ljk5MTIgMjguOTc2TDI1LjE3MjIgMjUuMDQ3MkgzNS4wMDAxVjI1LjA0ODhaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yMC45MzI1IDcuMzE1NDNIMTcuNDk5OUgxNC4wNjczTDEzLjYwMDYgMTIuMTI1MUwxNi4wMzQyIDI3LjgzNEgxOC45NjU2TDIxLjQwMDggMTIuMTI1MUwyMC45MzI1IDcuMzE1NDNaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yLjI5MjI1IDAuMzEyMjU2TDAgOS4yNzA5NEwyLjI5MjI1IDE2LjQ5OTNINy4yMjE4M0wxMy41OTkxIDEyLjEzMDFMMi4yOTIyNSAwLjMxMjI1NloiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTEzLjE3IDIwLjQxOTlIMTAuOTM2OUw5LjcyMDk1IDIxLjYwNjJMMTQuMDQwOSAyMi42NzI3TDEzLjE3IDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTMyLjcwNzcgMC4zMTIyNTZMMzQuOTk5OSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0gyNy43NzgxTDIxLjQwMDkgMTIuMTMwMUwzMi43MDc3IDAuMzEyMjU2WiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMjEuODMzIDIwLjQxOTlIMjQuMDY5NEwyNS4yODUzIDIxLjYwNzlMMjAuOTYwNCAyMi42NzZMMjEuODMzIDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTE5LjQ4MTcgMzAuODM2MkwxOS45OTExIDI4Ljk3OTRMMTguOTY1OCAyNy44NDIzSDE2LjAzMjdMMTUuMDA3MyAyOC45Nzk0TDE1LjUxNjcgMzAuODM2MiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMTkuNDgxNiAzMC44MzU5VjMzLjkwMjFIMTUuNTE2NlYzMC44MzU5SDE5LjQ4MTZaIiBmaWxsPSIjQzBDNENEIi8+CjxwYXRoIGQ9Ik05LjgyOTU5IDMwLjUxNDJMMTUuNTIgMzMuOTAwOFYzMC44MzQ2TDE1LjAxMDYgMjguOTc3OEw5LjgyOTU5IDMwLjUxNDJaIiBmaWxsPSIjRTdFQkY2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIxIDMwLjUxNDJMMTkuNDgxNyAzMy45MDA4VjMwLjgzNDZMMTkuOTkxMSAyOC45Nzc4TDI1LjE3MjEgMzAuNTE0MloiIGZpbGw9IiNFN0VCRjYiLz4KPC9zdmc+Cg==",
                            rdns: "io.metamask"
                        }
                    });
                    const l = (0,
                    u.getMultichainClient)({
                        transport: (0,
                        u.getDefaultTransport)()
                    });
                    (0,
                    c.registerSolanaWalletStandard)({
                        client: l,
                        walletName: "MetaMask"
                    })
                }
            }
            ).call(this)
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../../shared/modules/provider-injection": 285,
        "./constants/stream": 1,
        "@metamask/multichain-api-client": 34,
        "@metamask/object-multiplex": 42,
        "@metamask/post-message-stream": 59,
        "@metamask/providers/initializeInpageProvider": 92,
        "@metamask/solana-wallet-standard": 115,
        loglevel: 189,
        "readable-stream": 214,
        uuid: 269
    }],
    3: [function(e, t, r) {
        "use strict";
        var n, i, o, s, a, u, c, l, f, d, h, p, g, b = this && this.__classPrivateFieldSet || function(e, t, r, n, i) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? i.call(e, r) : i ? i.value = r : t.set(e, r),
            r
        }
        , y = this && this.__classPrivateFieldGet || function(e, t, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
        }
        , m = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.JsonRpcEngine = void 0;
        const w = e("@metamask/rpc-errors")
          , _ = m(e("@metamask/safe-event-emitter"))
          , v = e("@metamask/utils")
          , E = e("./v2/utils.cjs");
        class S extends _.default {
            constructor({notificationHandler: e}={}) {
                super(),
                n.add(this),
                o.set(this, !1),
                s.set(this, void 0),
                a.set(this, void 0),
                b(this, s, [], "f"),
                b(this, a, e, "f")
            }
            destroy() {
                y(this, s, "f").forEach(e => {
                    "destroy"in e && "function" == typeof e.destroy && e.destroy()
                }
                ),
                b(this, s, [], "f"),
                b(this, o, !0, "f")
            }
            push(e) {
                y(this, n, "m", u).call(this),
                y(this, s, "f").push(e)
            }
            handle(e, t) {
                if (y(this, n, "m", u).call(this),
                t && "function" != typeof t)
                    throw new Error('"callback" must be a function if provided.');
                return Array.isArray(e) ? t ? y(this, n, "m", c).call(this, e, t) : y(this, n, "m", c).call(this, e) : t ? y(this, n, "m", l).call(this, e, t) : this._promiseHandle(e)
            }
            asMiddleware() {
                return y(this, n, "m", u).call(this),
                async (e, t, r, n) => {
                    try {
                        const [o,a,u] = await y(i, i, "m", d).call(i, e, t, y(this, s, "f"));
                        return a ? (await y(i, i, "m", p).call(i, u),
                        n(o)) : r(async e => {
                            try {
                                await y(i, i, "m", p).call(i, u)
                            } catch (t) {
                                return e(t)
                            }
                            return e()
                        }
                        )
                    } catch (e) {
                        return n(e)
                    }
                }
            }
            async _promiseHandle(e) {
                return new Promise( (t, r) => {
                    y(this, n, "m", l).call(this, e, (e, n) => {
                        e && void 0 === n ? r(e) : t(n)
                    }
                    ).catch(r)
                }
                )
            }
        }
        r.JsonRpcEngine = S,
        i = S,
        o = new WeakMap,
        s = new WeakMap,
        a = new WeakMap,
        n = new WeakSet,
        u = function() {
            if (y(this, o, "f"))
                throw new Error("This engine is destroyed and can no longer be used.")
        }
        ,
        c = async function(e, t) {
            try {
                if (0 === e.length) {
                    const e = [{
                        id: null,
                        jsonrpc: "2.0",
                        error: new w.JsonRpcError(w.errorCodes.rpc.invalidRequest,"Request batch must contain plain objects. Received an empty array")
                    }];
                    return t ? t(null, e) : e
                }
                const r = (await Promise.all(e.map(this._promiseHandle.bind(this)))).filter(e => void 0 !== e);
                return t ? t(null, r) : r
            } catch (e) {
                if (t)
                    return t(e);
                throw e
            }
        }
        ,
        l = async function(e, t) {
            if (!e || Array.isArray(e) || "object" != typeof e) {
                const r = new w.JsonRpcError(w.errorCodes.rpc.invalidRequest,"Requests must be plain objects. Received: " + typeof e,{
                    request: e
                });
                return t(r, {
                    id: null,
                    jsonrpc: "2.0",
                    error: r
                })
            }
            if ("string" != typeof e.method) {
                const r = new w.JsonRpcError(w.errorCodes.rpc.invalidRequest,"Must specify a string method. Received: " + typeof e.method,{
                    request: e
                });
                return y(this, a, "f") && !(0,
                v.isJsonRpcRequest)(e) ? t(null) : t(r, {
                    id: e.id ?? null,
                    jsonrpc: "2.0",
                    error: r
                })
            }
            if (y(this, a, "f") && (0,
            v.isJsonRpcNotification)(e) && !(0,
            v.isJsonRpcRequest)(e)) {
                try {
                    await y(this, a, "f").call(this, e)
                } catch (r) {
                    return t(r)
                }
                return t(null)
            }
            let r = null;
            const n = {
                ...e
            }
              , o = {
                id: n.id,
                jsonrpc: n.jsonrpc
            };
            try {
                await y(i, i, "m", f).call(i, n, o, y(this, s, "f"))
            } catch (e) {
                r = e
            }
            return r && (delete o.result,
            o.error ?? (o.error = (0,
            w.serializeError)(r))),
            t(r, o)
        }
        ,
        f = async function(e, t, r) {
            const [n,o,s] = await y(i, i, "m", d).call(i, e, t, r);
            if (y(i, i, "m", g).call(i, e, t, o),
            await y(i, i, "m", p).call(i, s),
            n)
                throw n
        }
        ,
        d = async function(e, t, r) {
            const n = [];
            let o = null
              , s = !1;
            for (const a of r)
                if ([o,s] = await y(i, i, "m", h).call(i, e, t, a, n),
                s)
                    break;
            return [o, s, n.reverse()]
        }
        ,
        h = async function(e, t, r, n) {
            return new Promise(i => {
                const o = e => {
                    const r = e ?? t.error;
                    r && (t.error = (0,
                    w.serializeError)(r)),
                    i([r, !0])
                }
                  , s = r => {
                    t.error ? o(t.error) : (r && ("function" != typeof r && o(new w.JsonRpcError(w.errorCodes.rpc.internal,`JsonRpcEngine: "next" return handlers must be functions. Received "${typeof r}" for request:\n${(0,
                    E.stringify)(e)}`,{
                        request: e
                    })),
                    n.push(r)),
                    i([null, !1]))
                }
                ;
                try {
                    r(e, t, s, o)
                } catch (e) {
                    o(e)
                }
            }
            )
        }
        ,
        p = async function(e) {
            for (const t of e)
                await new Promise( (e, r) => {
                    t(t => t ? r(t) : e())
                }
                )
        }
        ,
        g = function(e, t, r) {
            if (!(0,
            v.hasProperty)(t, "result") && !(0,
            v.hasProperty)(t, "error"))
                throw new w.JsonRpcError(w.errorCodes.rpc.internal,`JsonRpcEngine: Response has no error or result for request:\n${(0,
                E.stringify)(e)}`,{
                    request: e
                });
            if (!r)
                throw new w.JsonRpcError(w.errorCodes.rpc.internal,`JsonRpcEngine: Nothing ended request:\n${(0,
                E.stringify)(e)}`,{
                    request: e
                })
        }
    }
    , {
        "./v2/utils.cjs": 13,
        "@metamask/rpc-errors": 111,
        "@metamask/safe-event-emitter": 113,
        "@metamask/utils": 138
    }],
    4: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.asV2Middleware = void 0;
        const n = e("@metamask/rpc-errors")
          , i = e("@metamask/utils")
          , o = e("./mergeMiddleware.cjs")
          , s = e("./v2/compatibility-utils.cjs");
        r.asV2Middleware = function(e, ...t) {
            const r = "function" == typeof e ? (0,
            o.mergeMiddleware)([e, ...t]) : e.asMiddleware();
            return async ({request: e, context: t, next: o}) => {
                const a = (0,
                s.deepClone)(e);
                (0,
                s.propagateToRequest)(a, t);
                const u = await new Promise(e => {
                    const t = {
                        jsonrpc: "2.0",
                        id: a.id
                    }
                      , i = r => {
                        void 0 !== r && (t.error = (0,
                        n.serializeError)(r)),
                        e(t)
                    }
                    ;
                    r(a, t, e => e(i), i)
                }
                );
                if ((0,
                s.propagateToContext)(a, t),
                (0,
                i.hasProperty)(u, "error") && u.error)
                    throw (0,
                    s.deserializeError)(u.error);
                return (0,
                i.hasProperty)(u, "result") ? u.result : o((0,
                s.fromLegacyRequest)(a))
            }
        }
    }
    , {
        "./mergeMiddleware.cjs": 10,
        "./v2/compatibility-utils.cjs": 12,
        "@metamask/rpc-errors": 111,
        "@metamask/utils": 138
    }],
    5: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.createAsyncMiddleware = void 0,
        r.createAsyncMiddleware = function(e) {
            return async (t, r, n, i) => {
                let o;
                const s = new Promise(e => {
                    o = e
                }
                );
                let a = null
                  , u = !1;
                const c = async () => (u = !0,
                n(e => {
                    a = e,
                    o()
                }
                ),
                s);
                try {
                    await e(t, r, c),
                    u ? (await s,
                    a(null)) : i(null)
                } catch (e) {
                    a ? a(e) : i(e)
                }
            }
        }
    }
    , {}],
    6: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.createScaffoldMiddleware = void 0,
        r.createScaffoldMiddleware = function(e) {
            return (t, r, n, i) => {
                const o = e[t.method];
                return void 0 === o ? n() : "function" == typeof o ? o(t, r, n, i) : (r.result = o,
                i())
            }
        }
    }
    , {}],
    7: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.getUniqueId = void 0;
        const n = 4294967295;
        let i = Math.floor(Math.random() * n);
        r.getUniqueId = function() {
            return i = (i + 1) % n,
            i
        }
    }
    , {}],
    8: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.createIdRemapMiddleware = void 0;
        const n = e("./getUniqueId.cjs");
        r.createIdRemapMiddleware = function() {
            return (e, t, r, i) => {
                const o = e.id
                  , s = (0,
                n.getUniqueId)();
                e.id = s,
                t.id = s,
                r(r => {
                    e.id = o,
                    t.id = o,
                    r()
                }
                )
            }
        }
    }
    , {
        "./getUniqueId.cjs": 7
    }],
    9: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.mergeMiddleware = r.JsonRpcEngine = r.createIdRemapMiddleware = r.getUniqueId = r.createScaffoldMiddleware = r.createAsyncMiddleware = r.asV2Middleware = void 0;
        var n = e("./asV2Middleware.cjs");
        Object.defineProperty(r, "asV2Middleware", {
            enumerable: !0,
            get: function() {
                return n.asV2Middleware
            }
        });
        var i = e("./createAsyncMiddleware.cjs");
        Object.defineProperty(r, "createAsyncMiddleware", {
            enumerable: !0,
            get: function() {
                return i.createAsyncMiddleware
            }
        });
        var o = e("./createScaffoldMiddleware.cjs");
        Object.defineProperty(r, "createScaffoldMiddleware", {
            enumerable: !0,
            get: function() {
                return o.createScaffoldMiddleware
            }
        });
        var s = e("./getUniqueId.cjs");
        Object.defineProperty(r, "getUniqueId", {
            enumerable: !0,
            get: function() {
                return s.getUniqueId
            }
        });
        var a = e("./idRemapMiddleware.cjs");
        Object.defineProperty(r, "createIdRemapMiddleware", {
            enumerable: !0,
            get: function() {
                return a.createIdRemapMiddleware
            }
        });
        var u = e("./JsonRpcEngine.cjs");
        Object.defineProperty(r, "JsonRpcEngine", {
            enumerable: !0,
            get: function() {
                return u.JsonRpcEngine
            }
        });
        var c = e("./mergeMiddleware.cjs");
        Object.defineProperty(r, "mergeMiddleware", {
            enumerable: !0,
            get: function() {
                return c.mergeMiddleware
            }
        })
    }
    , {
        "./JsonRpcEngine.cjs": 3,
        "./asV2Middleware.cjs": 4,
        "./createAsyncMiddleware.cjs": 5,
        "./createScaffoldMiddleware.cjs": 6,
        "./getUniqueId.cjs": 7,
        "./idRemapMiddleware.cjs": 8,
        "./mergeMiddleware.cjs": 10
    }],
    10: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.mergeMiddleware = void 0;
        const n = e("./JsonRpcEngine.cjs");
        r.mergeMiddleware = function(e) {
            const t = new n.JsonRpcEngine;
            return e.forEach(e => t.push(e)),
            t.asMiddleware()
        }
    }
    , {
        "./JsonRpcEngine.cjs": 3
    }],
    11: [function(e, t, r) {
        "use strict";
        var n;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.MiddlewareContext = void 0;
        const i = e("./utils.cjs")
          , o = Symbol.for("json-rpc-engine#MiddlewareContext");
        class s extends Map {
            static isInstance(e) {
                return (0,
                i.isInstance)(e, o)
            }
            constructor(e) {
                var t, r;
                super(e && (r = e,
                Symbol.iterator in r) ? e : (t = e ?? {},
                Reflect.ownKeys(t).map(e => [e, t[e]]))),
                this[n] = !0,
                Object.freeze(this)
            }
            get(e) {
                return super.get(e)
            }
            assertGet(e) {
                if (!super.has(e))
                    throw new Error(`Context key "${String(e)}" not found`);
                return super.get(e)
            }
            set(e, t) {
                if (super.has(e))
                    throw new Error(`MiddlewareContext key "${String(e)}" already exists`);
                return super.set(e, t),
                this
            }
        }
        r.MiddlewareContext = s,
        n = o
    }
    , {
        "./utils.cjs": 13
    }],
    12: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.deserializeError = r.propagateToRequest = r.propagateToContext = r.makeContext = r.fromLegacyRequest = r.requestProps = r.deepClone = void 0;
        const n = e("@metamask/rpc-errors")
          , i = e("@metamask/utils")
          , o = e("klona")
          , s = e("./MiddlewareContext.cjs")
          , a = e("./utils.cjs");
        function u(e, t) {
            Object.keys(e).filter(e => "string" == typeof e && !r.requestProps.includes(e) && !t.has(e)).forEach(r => {
                t.set(r, e[r])
            }
            )
        }
        r.deepClone = e => (0,
        o.klona)(e),
        r.requestProps = ["jsonrpc", "method", "params", "id"],
        r.fromLegacyRequest = function(e) {
            const t = {
                jsonrpc: "2.0",
                method: e.method
            };
            return t.id = e.id,
            (0,
            i.hasProperty)(e, "params") && void 0 !== e.params && (t.params = (0,
            r.deepClone)(e.params)),
            t
        }
        ,
        r.makeContext = function(e) {
            const t = new s.MiddlewareContext;
            return u(e, t),
            t
        }
        ,
        r.propagateToContext = u,
        r.propagateToRequest = function(e, t) {
            Array.from(t.keys()).filter(e => "string" == typeof e && !r.requestProps.includes(e)).forEach(r => {
                e[r] = t.get(r)
            }
            )
        }
        ,
        r.deserializeError = function(e) {
            if ("function" == typeof Error.isError && Error.isError(e))
                return e;
            if (e instanceof Error)
                return e;
            if ("string" == typeof e)
                return new Error(e);
            if (!(0,
            i.isObject)(e))
                return new Error(`Unknown error: ${(0,
                a.stringify)(e)}`);
            const t = "number" == typeof e.code && Number.isInteger(e.code) ? e.code : void 0;
            let r = "Unknown error";
            "string" == typeof e.message ? r = e.message : "number" == typeof t && (r = (0,
            n.getMessageFromCode)(t, r));
            const {stack: o, cause: s, data: u} = e
              , c = void 0 === t ? new Error(r,{
                cause: s
            }) : new n.JsonRpcError(t,r,function(e, t) {
                return (0,
                i.isObject)(e) ? {
                    ...e,
                    cause: t ?? e.cause
                } : (0,
                i.isValidJson)(e) ? e : {
                    cause: t
                }
            }(u, s));
            return "string" == typeof o && (c.stack = o),
            c
        }
    }
    , {
        "./MiddlewareContext.cjs": 11,
        "./utils.cjs": 13,
        "@metamask/rpc-errors": 111,
        "@metamask/utils": 138,
        klona: 187
    }],
    13: [function(e, t, r) {
        "use strict";
        var n;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.JsonRpcEngineError = r.isInstance = r.stringify = r.isNotification = r.isRequest = void 0;
        const i = e("@metamask/utils");
        r.isRequest = e => (0,
        i.hasProperty)(e, "id");
        r.isNotification = e => !(0,
        r.isRequest)(e),
        r.stringify = function(e) {
            return JSON.stringify(e, null, 2)
        }
        ;
        r.isInstance = (e, t) => (0,
        i.isObject)(e) && t in e && !0 === e[t];
        const o = Symbol.for("json-rpc-engine#JsonRpcEngineError");
        class s extends Error {
            constructor(e) {
                super(e),
                this[n] = !0,
                this.name = "JsonRpcEngineError"
            }
            static isInstance(e) {
                return (0,
                r.isInstance)(e, o)
            }
        }
        r.JsonRpcEngineError = s,
        n = o
    }
    , {
        "@metamask/utils": 138
    }],
    14: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        const n = e("readable-stream");
        r.default = function(e) {
            if (!e?.engine)
                throw new Error("Missing engine parameter!");
            const {engine: t} = e
              , r = new n.Duplex({
                objectMode: !0,
                read: () => {}
                ,
                write: function(e, n, i) {
                    t.handle(e, (e, t) => {
                        r.push(t)
                    }
                    ),
                    i()
                }
            });
            return t.on && t.on("notification", e => {
                r.push(e)
            }
            ),
            r
        }
    }
    , {
        "readable-stream": 31
    }],
    15: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        const i = n(e("@metamask/safe-event-emitter"))
          , o = e("@metamask/utils")
          , s = e("readable-stream");
        r.default = function(e={}) {
            const t = {}
              , r = new s.Duplex({
                objectMode: !0,
                read: () => {}
                ,
                write: function(r, i, s) {
                    let u = null;
                    try {
                        !(0,
                        o.hasProperty)(r, "id") ? function(r) {
                            e?.retryOnMessage && r.method === e.retryOnMessage && Object.values(t).forEach( ({req: e, retryCount: r=0}) => {
                                if (!e.id)
                                    return;
                                if (r >= 3)
                                    throw new Error(`StreamMiddleware - Retry limit exceeded for request id "${e.id}"`);
                                const n = t[e.id];
                                n && (n.retryCount = r + 1),
                                a(e)
                            }
                            );
                            n.emit("notification", r)
                        }(r) : function(e) {
                            const {id: r} = e;
                            if (null === r)
                                return;
                            const n = t[r];
                            if (!n)
                                return void console.warn(`StreamMiddleware - Unknown response id "${r}"`);
                            delete t[r],
                            Object.assign(n.res, e),
                            setTimeout(n.end)
                        }(r)
                    } catch (e) {
                        u = e
                    }
                    s(u)
                }
            })
              , n = new i.default;
            return {
                events: n,
                middleware: (e, r, n, i) => {
                    t[e.id] = {
                        req: e,
                        res: r,
                        next: n,
                        end: i
                    },
                    a(e)
                }
                ,
                stream: r
            };
            function a(e) {
                r.push(e)
            }
        }
    }
    , {
        "@metamask/safe-event-emitter": 113,
        "@metamask/utils": 138,
        "readable-stream": 31
    }],
    16: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.createStreamMiddleware = r.createEngineStream = void 0;
        const i = n(e("./createEngineStream.cjs"));
        r.createEngineStream = i.default;
        const o = n(e("./createStreamMiddleware.cjs"));
        r.createStreamMiddleware = o.default
    }
    , {
        "./createEngineStream.cjs": 14,
        "./createStreamMiddleware.cjs": 15
    }],
    17: [function(e, t, r) {
        "use strict";
        var n = {};
        function i(e, t, r) {
            r || (r = Error);
            var i = function(e) {
                var r, n;
                function i(r, n, i) {
                    return e.call(this, function(e, r, n) {
                        return "string" == typeof t ? t : t(e, r, n)
                    }(r, n, i)) || this
                }
                return n = e,
                (r = i).prototype = Object.create(n.prototype),
                r.prototype.constructor = r,
                r.__proto__ = n,
                i
            }(r);
            i.prototype.name = r.name,
            i.prototype.code = e,
            n[e] = i
        }
        function o(e, t) {
            if (Array.isArray(e)) {
                var r = e.length;
                return e = e.map(function(e) {
                    return String(e)
                }),
                r > 2 ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0])
            }
            return "of ".concat(t, " ").concat(String(e))
        }
        i("ERR_INVALID_OPT_VALUE", function(e, t) {
            return 'The value "' + t + '" is invalid for option "' + e + '"'
        }, TypeError),
        i("ERR_INVALID_ARG_TYPE", function(e, t, r) {
            var n, i, s, a;
            if ("string" == typeof t && (i = "not ",
            t.substr(!s || s < 0 ? 0 : +s, i.length) === i) ? (n = "must not be",
            t = t.replace(/^not /, "")) : n = "must be",
            function(e, t, r) {
                return (void 0 === r || r > e.length) && (r = e.length),
                e.substring(r - t.length, r) === t
            }(e, " argument"))
                a = "The ".concat(e, " ").concat(n, " ").concat(o(t, "type"));
            else {
                var u = function(e, t, r) {
                    return "number" != typeof r && (r = 0),
                    !(r + t.length > e.length) && -1 !== e.indexOf(t, r)
                }(e, ".") ? "property" : "argument";
                a = 'The "'.concat(e, '" ').concat(u, " ").concat(n, " ").concat(o(t, "type"))
            }
            return a += ". Received type ".concat(typeof r)
        }, TypeError),
        i("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
        i("ERR_METHOD_NOT_IMPLEMENTED", function(e) {
            return "The " + e + " method is not implemented"
        }),
        i("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
        i("ERR_STREAM_DESTROYED", function(e) {
            return "Cannot call " + e + " after a stream was destroyed"
        }),
        i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
        i("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
        i("ERR_STREAM_WRITE_AFTER_END", "write after end"),
        i("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError),
        i("ERR_UNKNOWN_ENCODING", function(e) {
            return "Unknown encoding: " + e
        }, TypeError),
        i("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"),
        t.exports.codes = n
    }
    , {}],
    18: [function(e, t, r) {
        (function(r) {
            (function() {
                "use strict";
                var n = Object.keys || function(e) {
                    var t = [];
                    for (var r in e)
                        t.push(r);
                    return t
                }
                ;
                t.exports = c;
                var i = e("./_stream_readable")
                  , o = e("./_stream_writable");
                e("inherits")(c, i);
                for (var s = n(o.prototype), a = 0; a < s.length; a++) {
                    var u = s[a];
                    c.prototype[u] || (c.prototype[u] = o.prototype[u])
                }
                function c(e) {
                    if (!(this instanceof c))
                        return new c(e);
                    i.call(this, e),
                    o.call(this, e),
                    this.allowHalfOpen = !0,
                    e && (!1 === e.readable && (this.readable = !1),
                    !1 === e.writable && (this.writable = !1),
                    !1 === e.allowHalfOpen && (this.allowHalfOpen = !1,
                    this.once("end", l)))
                }
                function l() {
                    this._writableState.ended || r.nextTick(f, this)
                }
                function f(e) {
                    e.end()
                }
                Object.defineProperty(c.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                Object.defineProperty(c.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }),
                Object.defineProperty(c.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }),
                Object.defineProperty(c.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                    },
                    set: function(e) {
                        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e,
                        this._writableState.destroyed = e)
                    }
                })
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./_stream_readable": 20,
        "./_stream_writable": 22,
        _process: 195,
        inherits: 185
    }],
    19: [function(e, t, r) {
        "use strict";
        t.exports = i;
        var n = e("./_stream_transform");
        function i(e) {
            if (!(this instanceof i))
                return new i(e);
            n.call(this, e)
        }
        e("inherits")(i, n),
        i.prototype._transform = function(e, t, r) {
            r(null, e)
        }
    }
    , {
        "./_stream_transform": 21,
        inherits: 185
    }],
    20: [function(e, t, r) {
        (function(r, n) {
            (function() {
                "use strict";
                var i;
                t.exports = A,
                A.ReadableState = M;
                e("events").EventEmitter;
                var o = function(e, t) {
                    return e.listeners(t).length
                }
                  , s = e("./internal/streams/stream")
                  , a = e("buffer").Buffer
                  , u = (void 0 !== n ? n : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {}
                ;
                var c, l = e("util");
                c = l && l.debuglog ? l.debuglog("stream") : function() {}
                ;
                var f, d, h, p = e("./internal/streams/buffer_list"), g = e("./internal/streams/destroy"), b = e("./internal/streams/state").getHighWaterMark, y = e("../errors").codes, m = y.ERR_INVALID_ARG_TYPE, w = y.ERR_STREAM_PUSH_AFTER_EOF, _ = y.ERR_METHOD_NOT_IMPLEMENTED, v = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                e("inherits")(A, s);
                var E = g.errorOrDestroy
                  , S = ["error", "close", "destroy", "pause", "resume"];
                function M(t, r, n) {
                    i = i || e("./_stream_duplex"),
                    t = t || {},
                    "boolean" != typeof n && (n = r instanceof i),
                    this.objectMode = !!t.objectMode,
                    n && (this.objectMode = this.objectMode || !!t.readableObjectMode),
                    this.highWaterMark = b(this, t, "readableHighWaterMark", n),
                    this.buffer = new p,
                    this.length = 0,
                    this.pipes = null,
                    this.pipesCount = 0,
                    this.flowing = null,
                    this.ended = !1,
                    this.endEmitted = !1,
                    this.reading = !1,
                    this.sync = !0,
                    this.needReadable = !1,
                    this.emittedReadable = !1,
                    this.readableListening = !1,
                    this.resumeScheduled = !1,
                    this.paused = !0,
                    this.emitClose = !1 !== t.emitClose,
                    this.autoDestroy = !!t.autoDestroy,
                    this.destroyed = !1,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.awaitDrain = 0,
                    this.readingMore = !1,
                    this.decoder = null,
                    this.encoding = null,
                    t.encoding && (f || (f = e("string_decoder/").StringDecoder),
                    this.decoder = new f(t.encoding),
                    this.encoding = t.encoding)
                }
                function A(t) {
                    if (i = i || e("./_stream_duplex"),
                    !(this instanceof A))
                        return new A(t);
                    var r = this instanceof i;
                    this._readableState = new M(t,this,r),
                    this.readable = !0,
                    t && ("function" == typeof t.read && (this._read = t.read),
                    "function" == typeof t.destroy && (this._destroy = t.destroy)),
                    s.call(this)
                }
                function j(e, t, r, n, i) {
                    c("readableAddChunk", t);
                    var o, s = e._readableState;
                    if (null === t)
                        s.reading = !1,
                        function(e, t) {
                            if (c("onEofChunk"),
                            t.ended)
                                return;
                            if (t.decoder) {
                                var r = t.decoder.end();
                                r && r.length && (t.buffer.push(r),
                                t.length += t.objectMode ? 1 : r.length)
                            }
                            t.ended = !0,
                            t.sync ? O(e) : (t.needReadable = !1,
                            t.emittedReadable || (t.emittedReadable = !0,
                            C(e)))
                        }(e, s);
                    else if (i || (o = function(e, t) {
                        var r;
                        n = t,
                        a.isBuffer(n) || n instanceof u || "string" == typeof t || void 0 === t || e.objectMode || (r = new m("chunk",["string", "Buffer", "Uint8Array"],t));
                        var n;
                        return r
                    }(s, t)),
                    o)
                        E(e, o);
                    else if (s.objectMode || t && t.length > 0)
                        if ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = function(e) {
                            return a.from(e)
                        }(t)),
                        n)
                            s.endEmitted ? E(e, new v) : R(e, s, t, !0);
                        else if (s.ended)
                            E(e, new w);
                        else {
                            if (s.destroyed)
                                return !1;
                            s.reading = !1,
                            s.decoder && !r ? (t = s.decoder.write(t),
                            s.objectMode || 0 !== t.length ? R(e, s, t, !1) : x(e, s)) : R(e, s, t, !1)
                        }
                    else
                        n || (s.reading = !1,
                        x(e, s));
                    return !s.ended && (s.length < s.highWaterMark || 0 === s.length)
                }
                function R(e, t, r, n) {
                    t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0,
                    e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length,
                    n ? t.buffer.unshift(r) : t.buffer.push(r),
                    t.needReadable && O(e)),
                    x(e, t)
                }
                Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }),
                A.prototype.destroy = g.destroy,
                A.prototype._undestroy = g.undestroy,
                A.prototype._destroy = function(e, t) {
                    t(e)
                }
                ,
                A.prototype.push = function(e, t) {
                    var r, n = this._readableState;
                    return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = a.from(e, t),
                    t = ""),
                    r = !0),
                    j(this, e, t, !1, r)
                }
                ,
                A.prototype.unshift = function(e) {
                    return j(this, e, null, !0, !1)
                }
                ,
                A.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                }
                ,
                A.prototype.setEncoding = function(t) {
                    f || (f = e("string_decoder/").StringDecoder);
                    var r = new f(t);
                    this._readableState.decoder = r,
                    this._readableState.encoding = this._readableState.decoder.encoding;
                    for (var n = this._readableState.buffer.head, i = ""; null !== n; )
                        i += r.write(n.data),
                        n = n.next;
                    return this._readableState.buffer.clear(),
                    "" !== i && this._readableState.buffer.push(i),
                    this._readableState.length = i.length,
                    this
                }
                ;
                var I = 1073741824;
                function T(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function(e) {
                        return e >= I ? e = I : (e--,
                        e |= e >>> 1,
                        e |= e >>> 2,
                        e |= e >>> 4,
                        e |= e >>> 8,
                        e |= e >>> 16,
                        e++),
                        e
                    }(e)),
                    e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0,
                    0))
                }
                function O(e) {
                    var t = e._readableState;
                    c("emitReadable", t.needReadable, t.emittedReadable),
                    t.needReadable = !1,
                    t.emittedReadable || (c("emitReadable", t.flowing),
                    t.emittedReadable = !0,
                    r.nextTick(C, e))
                }
                function C(e) {
                    var t = e._readableState;
                    c("emitReadable_", t.destroyed, t.length, t.ended),
                    t.destroyed || !t.length && !t.ended || (e.emit("readable"),
                    t.emittedReadable = !1),
                    t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark,
                    D(e)
                }
                function x(e, t) {
                    t.readingMore || (t.readingMore = !0,
                    r.nextTick(N, e, t))
                }
                function N(e, t) {
                    for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length); ) {
                        var r = t.length;
                        if (c("maybeReadMore read 0"),
                        e.read(0),
                        r === t.length)
                            break
                    }
                    t.readingMore = !1
                }
                function P(e) {
                    var t = e._readableState;
                    t.readableListening = e.listenerCount("readable") > 0,
                    t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
                }
                function k(e) {
                    c("readable nexttick read 0"),
                    e.read(0)
                }
                function L(e, t) {
                    c("resume", t.reading),
                    t.reading || e.read(0),
                    t.resumeScheduled = !1,
                    e.emit("resume"),
                    D(e),
                    t.flowing && !t.reading && e.read(0)
                }
                function D(e) {
                    var t = e._readableState;
                    for (c("flow", t.flowing); t.flowing && null !== e.read(); )
                        ;
                }
                function U(e, t) {
                    return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length),
                    t.buffer.clear()) : r = t.buffer.consume(e, t.decoder),
                    r);
                    var r
                }
                function $(e) {
                    var t = e._readableState;
                    c("endReadable", t.endEmitted),
                    t.endEmitted || (t.ended = !0,
                    r.nextTick(B, t, e))
                }
                function B(e, t) {
                    if (c("endReadableNT", e.endEmitted, e.length),
                    !e.endEmitted && 0 === e.length && (e.endEmitted = !0,
                    t.readable = !1,
                    t.emit("end"),
                    e.autoDestroy)) {
                        var r = t._writableState;
                        (!r || r.autoDestroy && r.finished) && t.destroy()
                    }
                }
                function W(e, t) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t)
                            return r;
                    return -1
                }
                A.prototype.read = function(e) {
                    c("read", e),
                    e = parseInt(e, 10);
                    var t = this._readableState
                      , r = e;
                    if (0 !== e && (t.emittedReadable = !1),
                    0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
                        return c("read: emitReadable", t.length, t.ended),
                        0 === t.length && t.ended ? $(this) : O(this),
                        null;
                    if (0 === (e = T(e, t)) && t.ended)
                        return 0 === t.length && $(this),
                        null;
                    var n, i = t.needReadable;
                    return c("need readable", i),
                    (0 === t.length || t.length - e < t.highWaterMark) && c("length less than watermark", i = !0),
                    t.ended || t.reading ? c("reading or ended", i = !1) : i && (c("do read"),
                    t.reading = !0,
                    t.sync = !0,
                    0 === t.length && (t.needReadable = !0),
                    this._read(t.highWaterMark),
                    t.sync = !1,
                    t.reading || (e = T(r, t))),
                    null === (n = e > 0 ? U(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark,
                    e = 0) : (t.length -= e,
                    t.awaitDrain = 0),
                    0 === t.length && (t.ended || (t.needReadable = !0),
                    r !== e && t.ended && $(this)),
                    null !== n && this.emit("data", n),
                    n
                }
                ,
                A.prototype._read = function(e) {
                    E(this, new _("_read()"))
                }
                ,
                A.prototype.pipe = function(e, t) {
                    var n = this
                      , i = this._readableState;
                    switch (i.pipesCount) {
                    case 0:
                        i.pipes = e;
                        break;
                    case 1:
                        i.pipes = [i.pipes, e];
                        break;
                    default:
                        i.pipes.push(e)
                    }
                    i.pipesCount += 1,
                    c("pipe count=%d opts=%j", i.pipesCount, t);
                    var s = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? u : b;
                    function a(t, r) {
                        c("onunpipe"),
                        t === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0,
                        c("cleanup"),
                        e.removeListener("close", p),
                        e.removeListener("finish", g),
                        e.removeListener("drain", l),
                        e.removeListener("error", h),
                        e.removeListener("unpipe", a),
                        n.removeListener("end", u),
                        n.removeListener("end", b),
                        n.removeListener("data", d),
                        f = !0,
                        !i.awaitDrain || e._writableState && !e._writableState.needDrain || l())
                    }
                    function u() {
                        c("onend"),
                        e.end()
                    }
                    i.endEmitted ? r.nextTick(s) : n.once("end", s),
                    e.on("unpipe", a);
                    var l = function(e) {
                        return function() {
                            var t = e._readableState;
                            c("pipeOnDrain", t.awaitDrain),
                            t.awaitDrain && t.awaitDrain--,
                            0 === t.awaitDrain && o(e, "data") && (t.flowing = !0,
                            D(e))
                        }
                    }(n);
                    e.on("drain", l);
                    var f = !1;
                    function d(t) {
                        c("ondata");
                        var r = e.write(t);
                        c("dest.write", r),
                        !1 === r && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== W(i.pipes, e)) && !f && (c("false write response, pause", i.awaitDrain),
                        i.awaitDrain++),
                        n.pause())
                    }
                    function h(t) {
                        c("onerror", t),
                        b(),
                        e.removeListener("error", h),
                        0 === o(e, "error") && E(e, t)
                    }
                    function p() {
                        e.removeListener("finish", g),
                        b()
                    }
                    function g() {
                        c("onfinish"),
                        e.removeListener("close", p),
                        b()
                    }
                    function b() {
                        c("unpipe"),
                        n.unpipe(e)
                    }
                    return n.on("data", d),
                    function(e, t, r) {
                        if ("function" == typeof e.prependListener)
                            return e.prependListener(t, r);
                        e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                    }(e, "error", h),
                    e.once("close", p),
                    e.once("finish", g),
                    e.emit("pipe", n),
                    i.flowing || (c("pipe resume"),
                    n.resume()),
                    e
                }
                ,
                A.prototype.unpipe = function(e) {
                    var t = this._readableState
                      , r = {
                        hasUnpiped: !1
                    };
                    if (0 === t.pipesCount)
                        return this;
                    if (1 === t.pipesCount)
                        return e && e !== t.pipes || (e || (e = t.pipes),
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1,
                        e && e.emit("unpipe", this, r)),
                        this;
                    if (!e) {
                        var n = t.pipes
                          , i = t.pipesCount;
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1;
                        for (var o = 0; o < i; o++)
                            n[o].emit("unpipe", this, {
                                hasUnpiped: !1
                            });
                        return this
                    }
                    var s = W(t.pipes, e);
                    return -1 === s || (t.pipes.splice(s, 1),
                    t.pipesCount -= 1,
                    1 === t.pipesCount && (t.pipes = t.pipes[0]),
                    e.emit("unpipe", this, r)),
                    this
                }
                ,
                A.prototype.on = function(e, t) {
                    var n = s.prototype.on.call(this, e, t)
                      , i = this._readableState;
                    return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0,
                    !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0,
                    i.flowing = !1,
                    i.emittedReadable = !1,
                    c("on readable", i.length, i.reading),
                    i.length ? O(this) : i.reading || r.nextTick(k, this))),
                    n
                }
                ,
                A.prototype.addListener = A.prototype.on,
                A.prototype.removeListener = function(e, t) {
                    var n = s.prototype.removeListener.call(this, e, t);
                    return "readable" === e && r.nextTick(P, this),
                    n
                }
                ,
                A.prototype.removeAllListeners = function(e) {
                    var t = s.prototype.removeAllListeners.apply(this, arguments);
                    return "readable" !== e && void 0 !== e || r.nextTick(P, this),
                    t
                }
                ,
                A.prototype.resume = function() {
                    var e = this._readableState;
                    return e.flowing || (c("resume"),
                    e.flowing = !e.readableListening,
                    function(e, t) {
                        t.resumeScheduled || (t.resumeScheduled = !0,
                        r.nextTick(L, e, t))
                    }(this, e)),
                    e.paused = !1,
                    this
                }
                ,
                A.prototype.pause = function() {
                    return c("call pause flowing=%j", this._readableState.flowing),
                    !1 !== this._readableState.flowing && (c("pause"),
                    this._readableState.flowing = !1,
                    this.emit("pause")),
                    this._readableState.paused = !0,
                    this
                }
                ,
                A.prototype.wrap = function(e) {
                    var t = this
                      , r = this._readableState
                      , n = !1;
                    for (var i in e.on("end", function() {
                        if (c("wrapped end"),
                        r.decoder && !r.ended) {
                            var e = r.decoder.end();
                            e && e.length && t.push(e)
                        }
                        t.push(null)
                    }),
                    e.on("data", function(i) {
                        (c("wrapped data"),
                        r.decoder && (i = r.decoder.write(i)),
                        r.objectMode && null == i) || (r.objectMode || i && i.length) && (t.push(i) || (n = !0,
                        e.pause()))
                    }),
                    e)
                        void 0 === this[i] && "function" == typeof e[i] && (this[i] = function(t) {
                            return function() {
                                return e[t].apply(e, arguments)
                            }
                        }(i));
                    for (var o = 0; o < S.length; o++)
                        e.on(S[o], this.emit.bind(this, S[o]));
                    return this._read = function(t) {
                        c("wrapped _read", t),
                        n && (n = !1,
                        e.resume())
                    }
                    ,
                    this
                }
                ,
                "function" == typeof Symbol && (A.prototype[Symbol.asyncIterator] = function() {
                    return void 0 === d && (d = e("./internal/streams/async_iterator")),
                    d(this)
                }
                ),
                Object.defineProperty(A.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.highWaterMark
                    }
                }),
                Object.defineProperty(A.prototype, "readableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState && this._readableState.buffer
                    }
                }),
                Object.defineProperty(A.prototype, "readableFlowing", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.flowing
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.flowing = e)
                    }
                }),
                A._fromList = U,
                Object.defineProperty(A.prototype, "readableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.length
                    }
                }),
                "function" == typeof Symbol && (A.from = function(t, r) {
                    return void 0 === h && (h = e("./internal/streams/from")),
                    h(A, t, r)
                }
                )
            }
            ).call(this)
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../errors": 17,
        "./_stream_duplex": 18,
        "./internal/streams/async_iterator": 23,
        "./internal/streams/buffer_list": 24,
        "./internal/streams/destroy": 25,
        "./internal/streams/from": 27,
        "./internal/streams/state": 29,
        "./internal/streams/stream": 30,
        _process: 195,
        buffer: 176,
        events: 181,
        inherits: 185,
        "string_decoder/": 267,
        util: 175
    }],
    21: [function(e, t, r) {
        "use strict";
        t.exports = l;
        var n = e("../errors").codes
          , i = n.ERR_METHOD_NOT_IMPLEMENTED
          , o = n.ERR_MULTIPLE_CALLBACK
          , s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING
          , a = n.ERR_TRANSFORM_WITH_LENGTH_0
          , u = e("./_stream_duplex");
        function c(e, t) {
            var r = this._transformState;
            r.transforming = !1;
            var n = r.writecb;
            if (null === n)
                return this.emit("error", new o);
            r.writechunk = null,
            r.writecb = null,
            null != t && this.push(t),
            n(e);
            var i = this._readableState;
            i.reading = !1,
            (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
        }
        function l(e) {
            if (!(this instanceof l))
                return new l(e);
            u.call(this, e),
            this._transformState = {
                afterTransform: c.bind(this),
                needTransform: !1,
                transforming: !1,
                writecb: null,
                writechunk: null,
                writeencoding: null
            },
            this._readableState.needReadable = !0,
            this._readableState.sync = !1,
            e && ("function" == typeof e.transform && (this._transform = e.transform),
            "function" == typeof e.flush && (this._flush = e.flush)),
            this.on("prefinish", f)
        }
        function f() {
            var e = this;
            "function" != typeof this._flush || this._readableState.destroyed ? d(this, null, null) : this._flush(function(t, r) {
                d(e, t, r)
            })
        }
        function d(e, t, r) {
            if (t)
                return e.emit("error", t);
            if (null != r && e.push(r),
            e._writableState.length)
                throw new a;
            if (e._transformState.transforming)
                throw new s;
            return e.push(null)
        }
        e("inherits")(l, u),
        l.prototype.push = function(e, t) {
            return this._transformState.needTransform = !1,
            u.prototype.push.call(this, e, t)
        }
        ,
        l.prototype._transform = function(e, t, r) {
            r(new i("_transform()"))
        }
        ,
        l.prototype._write = function(e, t, r) {
            var n = this._transformState;
            if (n.writecb = r,
            n.writechunk = e,
            n.writeencoding = t,
            !n.transforming) {
                var i = this._readableState;
                (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
            }
        }
        ,
        l.prototype._read = function(e) {
            var t = this._transformState;
            null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0,
            this._transform(t.writechunk, t.writeencoding, t.afterTransform))
        }
        ,
        l.prototype._destroy = function(e, t) {
            u.prototype._destroy.call(this, e, function(e) {
                t(e)
            })
        }
    }
    , {
        "../errors": 17,
        "./_stream_duplex": 18,
        inherits: 185
    }],
    22: [function(e, t, r) {
        (function(r, n) {
            (function() {
                "use strict";
                function i(e) {
                    var t = this;
                    this.next = null,
                    this.entry = null,
                    this.finish = function() {
                        !function(e, t, r) {
                            var n = e.entry;
                            e.entry = null;
                            for (; n; ) {
                                var i = n.callback;
                                t.pendingcb--,
                                i(r),
                                n = n.next
                            }
                            t.corkedRequestsFree.next = e
                        }(t, e)
                    }
                }
                var o;
                t.exports = A,
                A.WritableState = M;
                var s = {
                    deprecate: e("util-deprecate")
                }
                  , a = e("./internal/streams/stream")
                  , u = e("buffer").Buffer
                  , c = (void 0 !== n ? n : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {}
                ;
                var l, f = e("./internal/streams/destroy"), d = e("./internal/streams/state").getHighWaterMark, h = e("../errors").codes, p = h.ERR_INVALID_ARG_TYPE, g = h.ERR_METHOD_NOT_IMPLEMENTED, b = h.ERR_MULTIPLE_CALLBACK, y = h.ERR_STREAM_CANNOT_PIPE, m = h.ERR_STREAM_DESTROYED, w = h.ERR_STREAM_NULL_VALUES, _ = h.ERR_STREAM_WRITE_AFTER_END, v = h.ERR_UNKNOWN_ENCODING, E = f.errorOrDestroy;
                function S() {}
                function M(t, n, s) {
                    o = o || e("./_stream_duplex"),
                    t = t || {},
                    "boolean" != typeof s && (s = n instanceof o),
                    this.objectMode = !!t.objectMode,
                    s && (this.objectMode = this.objectMode || !!t.writableObjectMode),
                    this.highWaterMark = d(this, t, "writableHighWaterMark", s),
                    this.finalCalled = !1,
                    this.needDrain = !1,
                    this.ending = !1,
                    this.ended = !1,
                    this.finished = !1,
                    this.destroyed = !1;
                    var a = !1 === t.decodeStrings;
                    this.decodeStrings = !a,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.length = 0,
                    this.writing = !1,
                    this.corked = 0,
                    this.sync = !0,
                    this.bufferProcessing = !1,
                    this.onwrite = function(e) {
                        !function(e, t) {
                            var n = e._writableState
                              , i = n.sync
                              , o = n.writecb;
                            if ("function" != typeof o)
                                throw new b;
                            if (function(e) {
                                e.writing = !1,
                                e.writecb = null,
                                e.length -= e.writelen,
                                e.writelen = 0
                            }(n),
                            t)
                                !function(e, t, n, i, o) {
                                    --t.pendingcb,
                                    n ? (r.nextTick(o, i),
                                    r.nextTick(C, e, t),
                                    e._writableState.errorEmitted = !0,
                                    E(e, i)) : (o(i),
                                    e._writableState.errorEmitted = !0,
                                    E(e, i),
                                    C(e, t))
                                }(e, n, i, t, o);
                            else {
                                var s = T(n) || e.destroyed;
                                s || n.corked || n.bufferProcessing || !n.bufferedRequest || I(e, n),
                                i ? r.nextTick(R, e, n, s, o) : R(e, n, s, o)
                            }
                        }(n, e)
                    }
                    ,
                    this.writecb = null,
                    this.writelen = 0,
                    this.bufferedRequest = null,
                    this.lastBufferedRequest = null,
                    this.pendingcb = 0,
                    this.prefinished = !1,
                    this.errorEmitted = !1,
                    this.emitClose = !1 !== t.emitClose,
                    this.autoDestroy = !!t.autoDestroy,
                    this.bufferedRequestCount = 0,
                    this.corkedRequestsFree = new i(this)
                }
                function A(t) {
                    var r = this instanceof (o = o || e("./_stream_duplex"));
                    if (!r && !l.call(A, this))
                        return new A(t);
                    this._writableState = new M(t,this,r),
                    this.writable = !0,
                    t && ("function" == typeof t.write && (this._write = t.write),
                    "function" == typeof t.writev && (this._writev = t.writev),
                    "function" == typeof t.destroy && (this._destroy = t.destroy),
                    "function" == typeof t.final && (this._final = t.final)),
                    a.call(this)
                }
                function j(e, t, r, n, i, o, s) {
                    t.writelen = n,
                    t.writecb = s,
                    t.writing = !0,
                    t.sync = !0,
                    t.destroyed ? t.onwrite(new m("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite),
                    t.sync = !1
                }
                function R(e, t, r, n) {
                    r || function(e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1,
                        e.emit("drain"))
                    }(e, t),
                    t.pendingcb--,
                    n(),
                    C(e, t)
                }
                function I(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var n = t.bufferedRequestCount
                          , o = new Array(n)
                          , s = t.corkedRequestsFree;
                        s.entry = r;
                        for (var a = 0, u = !0; r; )
                            o[a] = r,
                            r.isBuf || (u = !1),
                            r = r.next,
                            a += 1;
                        o.allBuffers = u,
                        j(e, t, !0, t.length, o, "", s.finish),
                        t.pendingcb++,
                        t.lastBufferedRequest = null,
                        s.next ? (t.corkedRequestsFree = s.next,
                        s.next = null) : t.corkedRequestsFree = new i(t),
                        t.bufferedRequestCount = 0
                    } else {
                        for (; r; ) {
                            var c = r.chunk
                              , l = r.encoding
                              , f = r.callback;
                            if (j(e, t, !1, t.objectMode ? 1 : c.length, c, l, f),
                            r = r.next,
                            t.bufferedRequestCount--,
                            t.writing)
                                break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = r,
                    t.bufferProcessing = !1
                }
                function T(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }
                function O(e, t) {
                    e._final(function(r) {
                        t.pendingcb--,
                        r && E(e, r),
                        t.prefinished = !0,
                        e.emit("prefinish"),
                        C(e, t)
                    })
                }
                function C(e, t) {
                    var n = T(t);
                    if (n && (function(e, t) {
                        t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0,
                        e.emit("prefinish")) : (t.pendingcb++,
                        t.finalCalled = !0,
                        r.nextTick(O, e, t)))
                    }(e, t),
                    0 === t.pendingcb && (t.finished = !0,
                    e.emit("finish"),
                    t.autoDestroy))) {
                        var i = e._readableState;
                        (!i || i.autoDestroy && i.endEmitted) && e.destroy()
                    }
                    return n
                }
                e("inherits")(A, a),
                M.prototype.getBuffer = function() {
                    for (var e = this.bufferedRequest, t = []; e; )
                        t.push(e),
                        e = e.next;
                    return t
                }
                ,
                function() {
                    try {
                        Object.defineProperty(M.prototype, "buffer", {
                            get: s.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                        })
                    } catch (e) {}
                }(),
                "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (l = Function.prototype[Symbol.hasInstance],
                Object.defineProperty(A, Symbol.hasInstance, {
                    value: function(e) {
                        return !!l.call(this, e) || this === A && (e && e._writableState instanceof M)
                    }
                })) : l = function(e) {
                    return e instanceof this
                }
                ,
                A.prototype.pipe = function() {
                    E(this, new y)
                }
                ,
                A.prototype.write = function(e, t, n) {
                    var i, o = this._writableState, s = !1, a = !o.objectMode && (i = e,
                    u.isBuffer(i) || i instanceof c);
                    return a && !u.isBuffer(e) && (e = function(e) {
                        return u.from(e)
                    }(e)),
                    "function" == typeof t && (n = t,
                    t = null),
                    a ? t = "buffer" : t || (t = o.defaultEncoding),
                    "function" != typeof n && (n = S),
                    o.ending ? function(e, t) {
                        var n = new _;
                        E(e, n),
                        r.nextTick(t, n)
                    }(this, n) : (a || function(e, t, n, i) {
                        var o;
                        return null === n ? o = new w : "string" == typeof n || t.objectMode || (o = new p("chunk",["string", "Buffer"],n)),
                        !o || (E(e, o),
                        r.nextTick(i, o),
                        !1)
                    }(this, o, e, n)) && (o.pendingcb++,
                    s = function(e, t, r, n, i, o) {
                        if (!r) {
                            var s = function(e, t, r) {
                                e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = u.from(t, r));
                                return t
                            }(t, n, i);
                            n !== s && (r = !0,
                            i = "buffer",
                            n = s)
                        }
                        var a = t.objectMode ? 1 : n.length;
                        t.length += a;
                        var c = t.length < t.highWaterMark;
                        c || (t.needDrain = !0);
                        if (t.writing || t.corked) {
                            var l = t.lastBufferedRequest;
                            t.lastBufferedRequest = {
                                chunk: n,
                                encoding: i,
                                isBuf: r,
                                callback: o,
                                next: null
                            },
                            l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest,
                            t.bufferedRequestCount += 1
                        } else
                            j(e, t, !1, a, n, i, o);
                        return c
                    }(this, o, a, e, t, n)),
                    s
                }
                ,
                A.prototype.cork = function() {
                    this._writableState.corked++
                }
                ,
                A.prototype.uncork = function() {
                    var e = this._writableState;
                    e.corked && (e.corked--,
                    e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || I(this, e))
                }
                ,
                A.prototype.setDefaultEncoding = function(e) {
                    if ("string" == typeof e && (e = e.toLowerCase()),
                    !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1))
                        throw new v(e);
                    return this._writableState.defaultEncoding = e,
                    this
                }
                ,
                Object.defineProperty(A.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }),
                Object.defineProperty(A.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                A.prototype._write = function(e, t, r) {
                    r(new g("_write()"))
                }
                ,
                A.prototype._writev = null,
                A.prototype.end = function(e, t, n) {
                    var i = this._writableState;
                    return "function" == typeof e ? (n = e,
                    e = null,
                    t = null) : "function" == typeof t && (n = t,
                    t = null),
                    null != e && this.write(e, t),
                    i.corked && (i.corked = 1,
                    this.uncork()),
                    i.ending || function(e, t, n) {
                        t.ending = !0,
                        C(e, t),
                        n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                        t.ended = !0,
                        e.writable = !1
                    }(this, i, n),
                    this
                }
                ,
                Object.defineProperty(A.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }),
                Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }),
                A.prototype.destroy = f.destroy,
                A.prototype._undestroy = f.undestroy,
                A.prototype._destroy = function(e, t) {
                    t(e)
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../errors": 17,
        "./_stream_duplex": 18,
        "./internal/streams/destroy": 25,
        "./internal/streams/state": 29,
        "./internal/streams/stream": 30,
        _process: 195,
        buffer: 176,
        inherits: 185,
        "util-deprecate": 268
    }],
    23: [function(e, t, r) {
        (function(r) {
            (function() {
                "use strict";
                var n;
                function i(e, t, r) {
                    return (t = function(e) {
                        var t = function(e, t) {
                            if ("object" != typeof e || null === e)
                                return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != typeof n)
                                    return n;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == typeof t ? t : String(t)
                    }(t))in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r,
                    e
                }
                var o = e("./end-of-stream")
                  , s = Symbol("lastResolve")
                  , a = Symbol("lastReject")
                  , u = Symbol("error")
                  , c = Symbol("ended")
                  , l = Symbol("lastPromise")
                  , f = Symbol("handlePromise")
                  , d = Symbol("stream");
                function h(e, t) {
                    return {
                        value: e,
                        done: t
                    }
                }
                function p(e) {
                    var t = e[s];
                    if (null !== t) {
                        var r = e[d].read();
                        null !== r && (e[l] = null,
                        e[s] = null,
                        e[a] = null,
                        t(h(r, !1)))
                    }
                }
                function g(e) {
                    r.nextTick(p, e)
                }
                var b = Object.getPrototypeOf(function() {})
                  , y = Object.setPrototypeOf((i(n = {
                    get stream() {
                        return this[d]
                    },
                    next: function() {
                        var e = this
                          , t = this[u];
                        if (null !== t)
                            return Promise.reject(t);
                        if (this[c])
                            return Promise.resolve(h(void 0, !0));
                        if (this[d].destroyed)
                            return new Promise(function(t, n) {
                                r.nextTick(function() {
                                    e[u] ? n(e[u]) : t(h(void 0, !0))
                                })
                            }
                            );
                        var n, i = this[l];
                        if (i)
                            n = new Promise(function(e, t) {
                                return function(r, n) {
                                    e.then(function() {
                                        t[c] ? r(h(void 0, !0)) : t[f](r, n)
                                    }, n)
                                }
                            }(i, this));
                        else {
                            var o = this[d].read();
                            if (null !== o)
                                return Promise.resolve(h(o, !1));
                            n = new Promise(this[f])
                        }
                        return this[l] = n,
                        n
                    }
                }, Symbol.asyncIterator, function() {
                    return this
                }),
                i(n, "return", function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e[d].destroy(null, function(e) {
                            e ? r(e) : t(h(void 0, !0))
                        })
                    }
                    )
                }),
                n), b);
                t.exports = function(e) {
                    var t, r = Object.create(y, (i(t = {}, d, {
                        value: e,
                        writable: !0
                    }),
                    i(t, s, {
                        value: null,
                        writable: !0
                    }),
                    i(t, a, {
                        value: null,
                        writable: !0
                    }),
                    i(t, u, {
                        value: null,
                        writable: !0
                    }),
                    i(t, c, {
                        value: e._readableState.endEmitted,
                        writable: !0
                    }),
                    i(t, f, {
                        value: function(e, t) {
                            var n = r[d].read();
                            n ? (r[l] = null,
                            r[s] = null,
                            r[a] = null,
                            e(h(n, !1))) : (r[s] = e,
                            r[a] = t)
                        },
                        writable: !0
                    }),
                    t));
                    return r[l] = null,
                    o(e, function(e) {
                        if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                            var t = r[a];
                            return null !== t && (r[l] = null,
                            r[s] = null,
                            r[a] = null,
                            t(e)),
                            void (r[u] = e)
                        }
                        var n = r[s];
                        null !== n && (r[l] = null,
                        r[s] = null,
                        r[a] = null,
                        n(h(void 0, !0))),
                        r[c] = !0
                    }),
                    e.on("readable", g.bind(null, r)),
                    r
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./end-of-stream": 26,
        _process: 195
    }],
    24: [function(e, t, r) {
        "use strict";
        function n(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })),
                r.push.apply(r, n)
            }
            return r
        }
        function i(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? n(Object(r), !0).forEach(function(t) {
                    o(e, t, r[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                })
            }
            return e
        }
        function o(e, t, r) {
            return (t = a(t))in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
            e
        }
        function s(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(e, a(n.key), n)
            }
        }
        function a(e) {
            var t = function(e, t) {
                if ("object" != typeof e || null === e)
                    return e;
                var r = e[Symbol.toPrimitive];
                if (void 0 !== r) {
                    var n = r.call(e, t || "default");
                    if ("object" != typeof n)
                        return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return ("string" === t ? String : Number)(e)
            }(e, "string");
            return "symbol" == typeof t ? t : String(t)
        }
        var u = e("buffer").Buffer
          , c = e("util").inspect
          , l = c && c.custom || "inspect";
        function f(e, t, r) {
            u.prototype.copy.call(e, t, r)
        }
        t.exports = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.head = null,
                this.tail = null,
                this.length = 0
            }
            var t, r, n;
            return t = e,
            (r = [{
                key: "push",
                value: function(e) {
                    var t = {
                        data: e,
                        next: null
                    };
                    this.length > 0 ? this.tail.next = t : this.head = t,
                    this.tail = t,
                    ++this.length
                }
            }, {
                key: "unshift",
                value: function(e) {
                    var t = {
                        data: e,
                        next: this.head
                    };
                    0 === this.length && (this.tail = t),
                    this.head = t,
                    ++this.length
                }
            }, {
                key: "shift",
                value: function() {
                    if (0 !== this.length) {
                        var e = this.head.data;
                        return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next,
                        --this.length,
                        e
                    }
                }
            }, {
                key: "clear",
                value: function() {
                    this.head = this.tail = null,
                    this.length = 0
                }
            }, {
                key: "join",
                value: function(e) {
                    if (0 === this.length)
                        return "";
                    for (var t = this.head, r = "" + t.data; t = t.next; )
                        r += e + t.data;
                    return r
                }
            }, {
                key: "concat",
                value: function(e) {
                    if (0 === this.length)
                        return u.alloc(0);
                    for (var t = u.allocUnsafe(e >>> 0), r = this.head, n = 0; r; )
                        f(r.data, t, n),
                        n += r.data.length,
                        r = r.next;
                    return t
                }
            }, {
                key: "consume",
                value: function(e, t) {
                    var r;
                    return e < this.head.data.length ? (r = this.head.data.slice(0, e),
                    this.head.data = this.head.data.slice(e)) : r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e),
                    r
                }
            }, {
                key: "first",
                value: function() {
                    return this.head.data
                }
            }, {
                key: "_getString",
                value: function(e) {
                    var t = this.head
                      , r = 1
                      , n = t.data;
                    for (e -= n.length; t = t.next; ) {
                        var i = t.data
                          , o = e > i.length ? i.length : e;
                        if (o === i.length ? n += i : n += i.slice(0, e),
                        0 === (e -= o)) {
                            o === i.length ? (++r,
                            t.next ? this.head = t.next : this.head = this.tail = null) : (this.head = t,
                            t.data = i.slice(o));
                            break
                        }
                        ++r
                    }
                    return this.length -= r,
                    n
                }
            }, {
                key: "_getBuffer",
                value: function(e) {
                    var t = u.allocUnsafe(e)
                      , r = this.head
                      , n = 1;
                    for (r.data.copy(t),
                    e -= r.data.length; r = r.next; ) {
                        var i = r.data
                          , o = e > i.length ? i.length : e;
                        if (i.copy(t, t.length - e, 0, o),
                        0 === (e -= o)) {
                            o === i.length ? (++n,
                            r.next ? this.head = r.next : this.head = this.tail = null) : (this.head = r,
                            r.data = i.slice(o));
                            break
                        }
                        ++n
                    }
                    return this.length -= n,
                    t
                }
            }, {
                key: l,
                value: function(e, t) {
                    return c(this, i(i({}, t), {}, {
                        depth: 0,
                        customInspect: !1
                    }))
                }
            }]) && s(t.prototype, r),
            n && s(t, n),
            Object.defineProperty(t, "prototype", {
                writable: !1
            }),
            e
        }()
    }
    , {
        buffer: 176,
        util: 175
    }],
    25: [function(e, t, r) {
        (function(e) {
            (function() {
                "use strict";
                function r(e, t) {
                    i(e, t),
                    n(e)
                }
                function n(e) {
                    e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
                }
                function i(e, t) {
                    e.emit("error", t)
                }
                t.exports = {
                    destroy: function(t, o) {
                        var s = this
                          , a = this._readableState && this._readableState.destroyed
                          , u = this._writableState && this._writableState.destroyed;
                        return a || u ? (o ? o(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0,
                        e.nextTick(i, this, t)) : e.nextTick(i, this, t)),
                        this) : (this._readableState && (this._readableState.destroyed = !0),
                        this._writableState && (this._writableState.destroyed = !0),
                        this._destroy(t || null, function(t) {
                            !o && t ? s._writableState ? s._writableState.errorEmitted ? e.nextTick(n, s) : (s._writableState.errorEmitted = !0,
                            e.nextTick(r, s, t)) : e.nextTick(r, s, t) : o ? (e.nextTick(n, s),
                            o(t)) : e.nextTick(n, s)
                        }),
                        this)
                    },
                    undestroy: function() {
                        this._readableState && (this._readableState.destroyed = !1,
                        this._readableState.reading = !1,
                        this._readableState.ended = !1,
                        this._readableState.endEmitted = !1),
                        this._writableState && (this._writableState.destroyed = !1,
                        this._writableState.ended = !1,
                        this._writableState.ending = !1,
                        this._writableState.finalCalled = !1,
                        this._writableState.prefinished = !1,
                        this._writableState.finished = !1,
                        this._writableState.errorEmitted = !1)
                    },
                    errorOrDestroy: function(e, t) {
                        var r = e._readableState
                          , n = e._writableState;
                        r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t)
                    }
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 195
    }],
    26: [function(e, t, r) {
        "use strict";
        var n = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
        function i() {}
        t.exports = function e(t, r, o) {
            if ("function" == typeof r)
                return e(t, null, r);
            r || (r = {}),
            o = function(e) {
                var t = !1;
                return function() {
                    if (!t) {
                        t = !0;
                        for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++)
                            n[i] = arguments[i];
                        e.apply(this, n)
                    }
                }
            }(o || i);
            var s = r.readable || !1 !== r.readable && t.readable
              , a = r.writable || !1 !== r.writable && t.writable
              , u = function() {
                t.writable || l()
            }
              , c = t._writableState && t._writableState.finished
              , l = function() {
                a = !1,
                c = !0,
                s || o.call(t)
            }
              , f = t._readableState && t._readableState.endEmitted
              , d = function() {
                s = !1,
                f = !0,
                a || o.call(t)
            }
              , h = function(e) {
                o.call(t, e)
            }
              , p = function() {
                var e;
                return s && !f ? (t._readableState && t._readableState.ended || (e = new n),
                o.call(t, e)) : a && !c ? (t._writableState && t._writableState.ended || (e = new n),
                o.call(t, e)) : void 0
            }
              , g = function() {
                t.req.on("finish", l)
            };
            return !function(e) {
                return e.setHeader && "function" == typeof e.abort
            }(t) ? a && !t._writableState && (t.on("end", u),
            t.on("close", u)) : (t.on("complete", l),
            t.on("abort", p),
            t.req ? g() : t.on("request", g)),
            t.on("end", d),
            t.on("finish", l),
            !1 !== r.error && t.on("error", h),
            t.on("close", p),
            function() {
                t.removeListener("complete", l),
                t.removeListener("abort", p),
                t.removeListener("request", g),
                t.req && t.req.removeListener("finish", l),
                t.removeListener("end", u),
                t.removeListener("close", u),
                t.removeListener("finish", l),
                t.removeListener("end", d),
                t.removeListener("error", h),
                t.removeListener("close", p)
            }
        }
    }
    , {
        "../../../errors": 17
    }],
    27: [function(e, t, r) {
        t.exports = function() {
            throw new Error("Readable.from is not available in the browser")
        }
    }
    , {}],
    28: [function(e, t, r) {
        "use strict";
        var n;
        var i = e("../../../errors").codes
          , o = i.ERR_MISSING_ARGS
          , s = i.ERR_STREAM_DESTROYED;
        function a(e) {
            if (e)
                throw e
        }
        function u(e) {
            e()
        }
        function c(e, t) {
            return e.pipe(t)
        }
        t.exports = function() {
            for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++)
                r[i] = arguments[i];
            var l, f = function(e) {
                return e.length ? "function" != typeof e[e.length - 1] ? a : e.pop() : a
            }(r);
            if (Array.isArray(r[0]) && (r = r[0]),
            r.length < 2)
                throw new o("streams");
            var d = r.map(function(t, i) {
                var o = i < r.length - 1;
                return function(t, r, i, o) {
                    o = function(e) {
                        var t = !1;
                        return function() {
                            t || (t = !0,
                            e.apply(void 0, arguments))
                        }
                    }(o);
                    var a = !1;
                    t.on("close", function() {
                        a = !0
                    }),
                    void 0 === n && (n = e("./end-of-stream")),
                    n(t, {
                        readable: r,
                        writable: i
                    }, function(e) {
                        if (e)
                            return o(e);
                        a = !0,
                        o()
                    });
                    var u = !1;
                    return function(e) {
                        if (!a && !u)
                            return u = !0,
                            function(e) {
                                return e.setHeader && "function" == typeof e.abort
                            }(t) ? t.abort() : "function" == typeof t.destroy ? t.destroy() : void o(e || new s("pipe"))
                    }
                }(t, o, i > 0, function(e) {
                    l || (l = e),
                    e && d.forEach(u),
                    o || (d.forEach(u),
                    f(l))
                })
            });
            return r.reduce(c)
        }
    }
    , {
        "../../../errors": 17,
        "./end-of-stream": 26
    }],
    29: [function(e, t, r) {
        "use strict";
        var n = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
        t.exports = {
            getHighWaterMark: function(e, t, r, i) {
                var o = function(e, t, r) {
                    return null != e.highWaterMark ? e.highWaterMark : t ? e[r] : null
                }(t, i, r);
                if (null != o) {
                    if (!isFinite(o) || Math.floor(o) !== o || o < 0)
                        throw new n(i ? r : "highWaterMark",o);
                    return Math.floor(o)
                }
                return e.objectMode ? 16 : 16384
            }
        }
    }
    , {
        "../../../errors": 17
    }],
    30: [function(e, t, r) {
        t.exports = e("events").EventEmitter
    }
    , {
        events: 181
    }],
    31: [function(e, t, r) {
        (r = t.exports = e("./lib/_stream_readable.js")).Stream = r,
        r.Readable = r,
        r.Writable = e("./lib/_stream_writable.js"),
        r.Duplex = e("./lib/_stream_duplex.js"),
        r.Transform = e("./lib/_stream_transform.js"),
        r.PassThrough = e("./lib/_stream_passthrough.js"),
        r.finished = e("./lib/internal/streams/end-of-stream.js"),
        r.pipeline = e("./lib/internal/streams/pipeline.js")
    }
    , {
        "./lib/_stream_duplex.js": 18,
        "./lib/_stream_passthrough.js": 19,
        "./lib/_stream_readable.js": 20,
        "./lib/_stream_transform.js": 21,
        "./lib/_stream_writable.js": 22,
        "./lib/internal/streams/end-of-stream.js": 26,
        "./lib/internal/streams/pipeline.js": 28
    }],
    32: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.detectMetamaskExtensionId = async function() {
            return new Promise( (e, t) => {
                const r = t => {
                    if (function(e) {
                        const {target: t, data: r} = e.data;
                        return t === n.INPAGE && r?.name === i.METAMASK_PROVIDER_STREAM_NAME && e.origin === location.origin
                    }(t)) {
                        const i = t?.data?.data?.data;
                        if (i?.method === n.METAMASK_EXTENSION_CONNECT_CAN_RETRY)
                            o();
                        else if (i?.result?.extensionId) {
                            const t = i?.result?.extensionId;
                            e(t),
                            window.removeEventListener("message", r),
                            clearTimeout(s)
                        }
                    }
                }
                  , s = setTimeout( () => {
                    window.removeEventListener("message", r),
                    t(new Error("MetaMask extension not found"))
                }
                , 1e4);
                window.addEventListener("message", r),
                o()
            }
            )
        }
        ;
        const n = e("../transports/constants.cjs")
          , i = e("../transports/constants.cjs");
        function o() {
            window.postMessage({
                target: n.CONTENT_SCRIPT,
                data: {
                    name: i.METAMASK_PROVIDER_STREAM_NAME,
                    data: {
                        method: "metamask_getProviderState"
                    }
                }
            }, location.origin)
        }
    }
    , {
        "../transports/constants.cjs": 36
    }],
    33: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.isChromeRuntime = r.getUniqueId = void 0,
        r.withRetry = async function(e, t={}) {
            const {maxRetries: r=10, retryDelay: n=200, timeoutErrorClass: i} = t;
            for (let t = 0; t <= r; t++)
                try {
                    return await e()
                } catch (e) {
                    if (t >= r)
                        throw e;
                    if (i && "function" == typeof i && e instanceof i)
                        continue;
                    await new Promise(e => setTimeout(e, n))
                }
            throw new Error("Max retries exceeded")
        }
        ,
        r.withTimeout = function(e, t, r) {
            if (-1 === t)
                return e;
            return new Promise( (n, i) => {
                const o = setTimeout( () => {
                    i(r ? r() : new Error(`Timeout after ${t}ms`))
                }
                , t);
                e.then(e => {
                    clearTimeout(o),
                    n(e)
                }
                ).catch(e => {
                    clearTimeout(o),
                    i(e)
                }
                )
            }
            )
        }
        ;
        const n = 4294967295;
        let i = Math.floor(Math.random() * n);
        r.getUniqueId = () => (i = (i + 1) % n,
        i);
        r.isChromeRuntime = () => "undefined" != typeof chrome && chrome.runtime && "function" == typeof chrome.runtime.connect
    }
    , {}],
    34: [function(e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
            void 0 === n && (n = r);
            var i = Object.getOwnPropertyDescriptor(t, r);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[r]
                }
            }),
            Object.defineProperty(e, n, i)
        }
        : function(e, t, r, n) {
            void 0 === n && (n = r),
            e[n] = t[r]
        }
        )
          , i = this && this.__exportStar || function(e, t) {
            for (var r in e)
                "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.getWindowPostMessageTransport = r.getExternallyConnectableTransport = r.getMultichainClient = void 0,
        r.getDefaultTransport = function({extensionId: e, defaultTimeout: t, warmupTimeout: r}={}) {
            return (0,
            o.isChromeRuntime)() ? (0,
            a.getExternallyConnectableTransport)({
                extensionId: e,
                defaultTimeout: t,
                warmupTimeout: r
            }) : (0,
            u.getWindowPostMessageTransport)({
                defaultTimeout: t,
                warmupTimeout: r
            })
        }
        ;
        const o = e("./helpers/utils.cjs")
          , s = e("./multichainClient.cjs");
        Object.defineProperty(r, "getMultichainClient", {
            enumerable: !0,
            get: function() {
                return s.getMultichainClient
            }
        });
        const a = e("./transports/externallyConnectableTransport.cjs");
        Object.defineProperty(r, "getExternallyConnectableTransport", {
            enumerable: !0,
            get: function() {
                return a.getExternallyConnectableTransport
            }
        });
        const u = e("./transports/windowPostMessageTransport.cjs");
        Object.defineProperty(r, "getWindowPostMessageTransport", {
            enumerable: !0,
            get: function() {
                return u.getWindowPostMessageTransport
            }
        }),
        i(e("./types/errors.cjs"), r)
    }
    , {
        "./helpers/utils.cjs": 33,
        "./multichainClient.cjs": 35,
        "./transports/externallyConnectableTransport.cjs": 37,
        "./transports/windowPostMessageTransport.cjs": 38,
        "./types/errors.cjs": 39
    }],
    35: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.getMultichainClient = function e({transport: t}) {
            let r, i;
            async function s() {
                t.isConnected() || (i || (i = t.connect()),
                await i)
            }
            async function a() {
                return r || (r = (async () => {
                    await s(),
                    await (0,
                    n.withRetry)( () => t.request({
                        method: "wallet_getSession"
                    }, {
                        timeout: t.warmupTimeout ?? 1e3
                    }))
                }
                )()),
                await r
            }
            return s(),
            {
                createSession: async e => (await a(),
                await o({
                    transport: t,
                    method: "wallet_createSession",
                    params: e
                })),
                getSession: async () => (await a(),
                await o({
                    transport: t,
                    method: "wallet_getSession"
                })),
                revokeSession: async e => {
                    await a(),
                    r = void 0,
                    i = void 0,
                    await o({
                        transport: t,
                        method: "wallet_revokeSession",
                        params: e
                    }),
                    await t.disconnect()
                }
                ,
                invokeMethod: async e => (await a(),
                await o({
                    transport: t,
                    method: "wallet_invokeMethod",
                    params: e
                })),
                extendsRpcApi: () => e({
                    transport: t
                }),
                onNotification: e => t.onNotification(e)
            }
        }
        ;
        const n = e("./helpers/utils.cjs")
          , i = e("./types/errors.cjs");
        async function o({transport: e, method: t, params: r, timeout: n}) {
            const o = await e.request({
                method: t,
                params: r
            }, {
                timeout: n
            });
            if (o?.error)
                throw new i.MultichainApiError(o.error);
            return o.result
        }
    }
    , {
        "./helpers/utils.cjs": 33,
        "./types/errors.cjs": 39
    }],
    36: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.DEFAULT_WARMUP_TIMEOUT = r.DEFAULT_REQUEST_TIMEOUT = r.METAMASK_EXTENSION_CONNECT_CAN_RETRY = r.METAMASK_PROVIDER_STREAM_NAME = r.MULTICHAIN_SUBSTREAM_NAME = r.INPAGE = r.CONTENT_SCRIPT = r.REQUEST_CAIP = void 0,
        r.REQUEST_CAIP = "caip-348",
        r.CONTENT_SCRIPT = "metamask-contentscript",
        r.INPAGE = "metamask-inpage",
        r.MULTICHAIN_SUBSTREAM_NAME = "metamask-multichain-provider",
        r.METAMASK_PROVIDER_STREAM_NAME = "metamask-provider",
        r.METAMASK_EXTENSION_CONNECT_CAN_RETRY = "METAMASK_EXTENSION_CONNECT_CAN_RETRY",
        r.DEFAULT_REQUEST_TIMEOUT = -1,
        r.DEFAULT_WARMUP_TIMEOUT = 200
    }
    , {}],
    37: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.getExternallyConnectableTransport = function(e={}) {
            let {extensionId: t} = e;
            const {defaultTimeout: r=s.DEFAULT_REQUEST_TIMEOUT, warmupTimeout: a=s.DEFAULT_WARMUP_TIMEOUT} = e;
            let u, c = (0,
            i.getUniqueId)();
            const l = new Map
              , f = new Set;
            function d(e) {
                const {data: t} = e;
                if (null == t?.id)
                    !function(e) {
                        for (const t of f)
                            try {
                                t(e)
                            } catch (e) {
                                console.log("[ChromeTransport] notifyCallbacks error:", e)
                            }
                    }(t);
                else if (l.has(t.id)) {
                    const e = l.get(t.id);
                    l.delete(t.id),
                    e?.(t)
                }
            }
            return {
                warmupTimeout: a,
                connect: async () => {
                    try {
                        t || (t = await (0,
                        n.detectMetamaskExtensionId)());
                        const e = chrome.runtime.connect(t);
                        let r = !0;
                        if (e.onDisconnect.addListener( () => {
                            console.log("[ChromeTransport] chromePort disconnected"),
                            u = void 0,
                            r = !1
                        }
                        ),
                        await new Promise(e => setTimeout(e, 10)),
                        !r)
                            throw new Error(`No extension found with id: ${t}`);
                        e.onMessage.addListener(d),
                        u = e
                    } catch (e) {
                        throw new o.TransportError("Failed to connect to MetaMask",e)
                    }
                }
                ,
                disconnect: async () => {
                    if (u)
                        try {
                            u.disconnect(),
                            u = void 0,
                            f.clear(),
                            l.clear()
                        } catch (e) {
                            console.log("[ChromeTransport] disconnect error:", e)
                        }
                }
                ,
                isConnected: () => void 0 !== u,
                request: async (e, t={}) => {
                    const {timeout: n=r} = t
                      , a = u;
                    if (!a)
                        throw new o.TransportError("Chrome port not connected");
                    const f = c++
                      , d = {
                        id: f,
                        jsonrpc: "2.0",
                        ...e
                    };
                    try {
                        return await (0,
                        i.withTimeout)(new Promise(e => {
                            l.set(f, e),
                            a.postMessage({
                                type: s.REQUEST_CAIP,
                                data: d
                            })
                        }
                        ), n, () => new o.TransportTimeoutError)
                    } catch (e) {
                        throw l.has(f) && l.delete(f),
                        e
                    }
                }
                ,
                onNotification: e => (f.add(e),
                () => {
                    f.delete(e)
                }
                )
            }
        }
        ;
        const n = e("../helpers/metamaskExtensionId.cjs")
          , i = e("../helpers/utils.cjs")
          , o = e("../types/errors.cjs")
          , s = e("./constants.cjs")
    }
    , {
        "../helpers/metamaskExtensionId.cjs": 32,
        "../helpers/utils.cjs": 33,
        "../types/errors.cjs": 39,
        "./constants.cjs": 36
    }],
    38: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.getWindowPostMessageTransport = function(e={}) {
            const {defaultTimeout: t=o.DEFAULT_REQUEST_TIMEOUT, warmupTimeout: r=o.DEFAULT_WARMUP_TIMEOUT} = e;
            let s = null;
            const a = new Map
              , u = new Set;
            function c(e) {
                if (null == e?.id)
                    !function(e) {
                        for (const t of u)
                            try {
                                t(e)
                            } catch (e) {
                                console.log("[WindowPostMessageTransport] notifyCallbacks error:", e)
                            }
                    }(e);
                else if (a.has(e.id)) {
                    const t = a.get(e.id);
                    a.delete(e.id),
                    t?.(e)
                }
            }
            async function l() {
                s && (window.removeEventListener("message", s),
                s = null),
                a.clear(),
                u.clear()
            }
            const f = () => Boolean(s);
            return {
                warmupTimeout: r,
                connect: async () => {
                    f() && await l(),
                    s = e => {
                        const {target: t, data: r} = e.data;
                        t === o.INPAGE && r?.name === o.MULTICHAIN_SUBSTREAM_NAME && e.origin === location.origin && c(r.data)
                    }
                    ,
                    window.addEventListener("message", s)
                }
                ,
                disconnect: l,
                isConnected: f,
                request: (e, r={}) => {
                    const {timeout: s=t} = r;
                    if (!f())
                        throw new i.TransportError("Transport not connected");
                    const u = (0,
                    n.getUniqueId)()
                      , c = {
                        jsonrpc: "2.0",
                        id: u,
                        ...e
                    };
                    return (0,
                    n.withTimeout)(new Promise(e => {
                        a.set(u, t => e(t)),
                        function(e) {
                            window.postMessage({
                                target: o.CONTENT_SCRIPT,
                                data: {
                                    name: o.MULTICHAIN_SUBSTREAM_NAME,
                                    data: e
                                }
                            }, location.origin)
                        }(c)
                    }
                    ), s, () => new i.TransportTimeoutError).catch(e => {
                        throw a.has(u) && a.delete(u),
                        e
                    }
                    )
                }
                ,
                onNotification: e => (u.add(e),
                () => {
                    u.delete(e)
                }
                )
            }
        }
        ;
        const n = e("../helpers/utils.cjs")
          , i = e("../types/errors.cjs")
          , o = e("./constants.cjs")
    }
    , {
        "../helpers/utils.cjs": 33,
        "../types/errors.cjs": 39,
        "./constants.cjs": 36
    }],
    39: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.TransportTimeoutError = r.TransportError = r.MultichainApiError = void 0;
        class n extends Error {
            constructor(e) {
                super(e.message),
                this.name = this.constructor.name,
                this.cause = e,
                Object.setPrototypeOf(this, this.constructor.prototype)
            }
        }
        r.MultichainApiError = n;
        class i extends Error {
            constructor(e, t) {
                super(e),
                this.name = this.constructor.name,
                this.cause = t,
                Object.setPrototypeOf(this, this.constructor.prototype)
            }
        }
        r.TransportError = i;
        r.TransportTimeoutError = class extends i {
            constructor(e="Transport request timed out", t) {
                super(e, t)
            }
        }
    }
    , {}],
    40: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.ObjectMultiplex = void 0;
        const i = e("readable-stream")
          , o = n(e("once"))
          , s = e("./Substream")
          , a = Symbol("IGNORE_SUBSTREAM");
        class u extends i.Duplex {
            constructor(e={}) {
                super(Object.assign({
                    objectMode: !0
                }, e)),
                this._substreams = {}
            }
            createStream(e, t={}) {
                if (this.destroyed)
                    throw new Error(`ObjectMultiplex - parent stream for name "${e}" already destroyed`);
                if (this._readableState.ended || this._writableState.ended)
                    throw new Error(`ObjectMultiplex - parent stream for name "${e}" already ended`);
                if (!e)
                    throw new Error("ObjectMultiplex - name must not be empty");
                if (this._substreams[e])
                    throw new Error(`ObjectMultiplex - Substream for name "${e}" already exists`);
                const r = new s.Substream(Object.assign({
                    name: e,
                    parent: this
                }, t));
                return this._substreams[e] = r,
                function(e, t) {
                    const r = (0,
                    o.default)(t);
                    (0,
                    i.finished)(e, {
                        readable: !1
                    }, r),
                    (0,
                    i.finished)(e, {
                        writable: !1
                    }, r)
                }(this, e => r.destroy(e || void 0)),
                r
            }
            ignoreStream(e) {
                if (!e)
                    throw new Error("ObjectMultiplex - name must not be empty");
                if (this._substreams[e])
                    throw new Error(`ObjectMultiplex - Substream for name "${e}" already exists`);
                this._substreams[e] = a
            }
            _read() {}
            _write(e, t, r) {
                const {name: n, data: i} = e;
                if (!n)
                    return console.warn(`ObjectMultiplex - malformed chunk without name "${e}"`),
                    r();
                const o = this._substreams[n];
                return o ? (o !== a && o.push(i),
                r()) : (console.warn(`ObjectMultiplex - orphaned data for stream "${n}"`),
                r())
            }
        }
        r.ObjectMultiplex = u
    }
    , {
        "./Substream": 41,
        once: 191,
        "readable-stream": 57
    }],
    41: [function(e, t, r) {
        "use strict";
        var n = this && this.__rest || function(e, t) {
            var r = {};
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                    t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]])
            }
            return r
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.Substream = void 0;
        const i = e("readable-stream");
        class o extends i.Duplex {
            constructor(e) {
                var {parent: t, name: r} = e
                  , i = n(e, ["parent", "name"]);
                super(Object.assign({
                    objectMode: !0
                }, i)),
                this._parent = t,
                this._name = r
            }
            _read() {}
            _write(e, t, r) {
                this._parent.push({
                    name: this._name,
                    data: e
                }),
                r()
            }
        }
        r.Substream = o
    }
    , {
        "readable-stream": 57
    }],
    42: [function(e, t, r) {
        "use strict";
        const n = e("./ObjectMultiplex");
        t.exports = n.ObjectMultiplex
    }
    , {
        "./ObjectMultiplex": 40
    }],
    43: [function(e, t, r) {
        arguments[4][17][0].apply(r, arguments)
    }
    , {
        dup: 17
    }],
    44: [function(e, t, r) {
        (function(r) {
            (function() {
                "use strict";
                var n = Object.keys || function(e) {
                    var t = [];
                    for (var r in e)
                        t.push(r);
                    return t
                }
                ;
                t.exports = c;
                var i = e("./_stream_readable")
                  , o = e("./_stream_writable");
                e("inherits")(c, i);
                for (var s = n(o.prototype), a = 0; a < s.length; a++) {
                    var u = s[a];
                    c.prototype[u] || (c.prototype[u] = o.prototype[u])
                }
                function c(e) {
                    if (!(this instanceof c))
                        return new c(e);
                    i.call(this, e),
                    o.call(this, e),
                    this.allowHalfOpen = !0,
                    e && (!1 === e.readable && (this.readable = !1),
                    !1 === e.writable && (this.writable = !1),
                    !1 === e.allowHalfOpen && (this.allowHalfOpen = !1,
                    this.once("end", l)))
                }
                function l() {
                    this._writableState.ended || r.nextTick(f, this)
                }
                function f(e) {
                    e.end()
                }
                Object.defineProperty(c.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                Object.defineProperty(c.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }),
                Object.defineProperty(c.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }),
                Object.defineProperty(c.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                    },
                    set: function(e) {
                        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e,
                        this._writableState.destroyed = e)
                    }
                })
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./_stream_readable": 46,
        "./_stream_writable": 48,
        _process: 195,
        inherits: 185
    }],
    45: [function(e, t, r) {
        arguments[4][19][0].apply(r, arguments)
    }
    , {
        "./_stream_transform": 47,
        dup: 19,
        inherits: 185
    }],
    46: [function(e, t, r) {
        (function(r, n) {
            (function() {
                "use strict";
                var i;
                t.exports = A,
                A.ReadableState = M;
                e("events").EventEmitter;
                var o = function(e, t) {
                    return e.listeners(t).length
                }
                  , s = e("./internal/streams/stream")
                  , a = e("buffer").Buffer
                  , u = (void 0 !== n ? n : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {}
                ;
                var c, l = e("util");
                c = l && l.debuglog ? l.debuglog("stream") : function() {}
                ;
                var f, d, h, p = e("./internal/streams/buffer_list"), g = e("./internal/streams/destroy"), b = e("./internal/streams/state").getHighWaterMark, y = e("../errors").codes, m = y.ERR_INVALID_ARG_TYPE, w = y.ERR_STREAM_PUSH_AFTER_EOF, _ = y.ERR_METHOD_NOT_IMPLEMENTED, v = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                e("inherits")(A, s);
                var E = g.errorOrDestroy
                  , S = ["error", "close", "destroy", "pause", "resume"];
                function M(t, r, n) {
                    i = i || e("./_stream_duplex"),
                    t = t || {},
                    "boolean" != typeof n && (n = r instanceof i),
                    this.objectMode = !!t.objectMode,
                    n && (this.objectMode = this.objectMode || !!t.readableObjectMode),
                    this.highWaterMark = b(this, t, "readableHighWaterMark", n),
                    this.buffer = new p,
                    this.length = 0,
                    this.pipes = null,
                    this.pipesCount = 0,
                    this.flowing = null,
                    this.ended = !1,
                    this.endEmitted = !1,
                    this.reading = !1,
                    this.sync = !0,
                    this.needReadable = !1,
                    this.emittedReadable = !1,
                    this.readableListening = !1,
                    this.resumeScheduled = !1,
                    this.paused = !0,
                    this.emitClose = !1 !== t.emitClose,
                    this.autoDestroy = !!t.autoDestroy,
                    this.destroyed = !1,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.awaitDrain = 0,
                    this.readingMore = !1,
                    this.decoder = null,
                    this.encoding = null,
                    t.encoding && (f || (f = e("string_decoder/").StringDecoder),
                    this.decoder = new f(t.encoding),
                    this.encoding = t.encoding)
                }
                function A(t) {
                    if (i = i || e("./_stream_duplex"),
                    !(this instanceof A))
                        return new A(t);
                    var r = this instanceof i;
                    this._readableState = new M(t,this,r),
                    this.readable = !0,
                    t && ("function" == typeof t.read && (this._read = t.read),
                    "function" == typeof t.destroy && (this._destroy = t.destroy)),
                    s.call(this)
                }
                function j(e, t, r, n, i) {
                    c("readableAddChunk", t);
                    var o, s = e._readableState;
                    if (null === t)
                        s.reading = !1,
                        function(e, t) {
                            if (c("onEofChunk"),
                            t.ended)
                                return;
                            if (t.decoder) {
                                var r = t.decoder.end();
                                r && r.length && (t.buffer.push(r),
                                t.length += t.objectMode ? 1 : r.length)
                            }
                            t.ended = !0,
                            t.sync ? O(e) : (t.needReadable = !1,
                            t.emittedReadable || (t.emittedReadable = !0,
                            C(e)))
                        }(e, s);
                    else if (i || (o = function(e, t) {
                        var r;
                        n = t,
                        a.isBuffer(n) || n instanceof u || "string" == typeof t || void 0 === t || e.objectMode || (r = new m("chunk",["string", "Buffer", "Uint8Array"],t));
                        var n;
                        return r
                    }(s, t)),
                    o)
                        E(e, o);
                    else if (s.objectMode || t && t.length > 0)
                        if ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = function(e) {
                            return a.from(e)
                        }(t)),
                        n)
                            s.endEmitted ? E(e, new v) : R(e, s, t, !0);
                        else if (s.ended)
                            E(e, new w);
                        else {
                            if (s.destroyed)
                                return !1;
                            s.reading = !1,
                            s.decoder && !r ? (t = s.decoder.write(t),
                            s.objectMode || 0 !== t.length ? R(e, s, t, !1) : x(e, s)) : R(e, s, t, !1)
                        }
                    else
                        n || (s.reading = !1,
                        x(e, s));
                    return !s.ended && (s.length < s.highWaterMark || 0 === s.length)
                }
                function R(e, t, r, n) {
                    t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0,
                    e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length,
                    n ? t.buffer.unshift(r) : t.buffer.push(r),
                    t.needReadable && O(e)),
                    x(e, t)
                }
                Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }),
                A.prototype.destroy = g.destroy,
                A.prototype._undestroy = g.undestroy,
                A.prototype._destroy = function(e, t) {
                    t(e)
                }
                ,
                A.prototype.push = function(e, t) {
                    var r, n = this._readableState;
                    return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = a.from(e, t),
                    t = ""),
                    r = !0),
                    j(this, e, t, !1, r)
                }
                ,
                A.prototype.unshift = function(e) {
                    return j(this, e, null, !0, !1)
                }
                ,
                A.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                }
                ,
                A.prototype.setEncoding = function(t) {
                    f || (f = e("string_decoder/").StringDecoder);
                    var r = new f(t);
                    this._readableState.decoder = r,
                    this._readableState.encoding = this._readableState.decoder.encoding;
                    for (var n = this._readableState.buffer.head, i = ""; null !== n; )
                        i += r.write(n.data),
                        n = n.next;
                    return this._readableState.buffer.clear(),
                    "" !== i && this._readableState.buffer.push(i),
                    this._readableState.length = i.length,
                    this
                }
                ;
                var I = 1073741824;
                function T(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function(e) {
                        return e >= I ? e = I : (e--,
                        e |= e >>> 1,
                        e |= e >>> 2,
                        e |= e >>> 4,
                        e |= e >>> 8,
                        e |= e >>> 16,
                        e++),
                        e
                    }(e)),
                    e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0,
                    0))
                }
                function O(e) {
                    var t = e._readableState;
                    c("emitReadable", t.needReadable, t.emittedReadable),
                    t.needReadable = !1,
                    t.emittedReadable || (c("emitReadable", t.flowing),
                    t.emittedReadable = !0,
                    r.nextTick(C, e))
                }
                function C(e) {
                    var t = e._readableState;
                    c("emitReadable_", t.destroyed, t.length, t.ended),
                    t.destroyed || !t.length && !t.ended || (e.emit("readable"),
                    t.emittedReadable = !1),
                    t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark,
                    D(e)
                }
                function x(e, t) {
                    t.readingMore || (t.readingMore = !0,
                    r.nextTick(N, e, t))
                }
                function N(e, t) {
                    for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length); ) {
                        var r = t.length;
                        if (c("maybeReadMore read 0"),
                        e.read(0),
                        r === t.length)
                            break
                    }
                    t.readingMore = !1
                }
                function P(e) {
                    var t = e._readableState;
                    t.readableListening = e.listenerCount("readable") > 0,
                    t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
                }
                function k(e) {
                    c("readable nexttick read 0"),
                    e.read(0)
                }
                function L(e, t) {
                    c("resume", t.reading),
                    t.reading || e.read(0),
                    t.resumeScheduled = !1,
                    e.emit("resume"),
                    D(e),
                    t.flowing && !t.reading && e.read(0)
                }
                function D(e) {
                    var t = e._readableState;
                    for (c("flow", t.flowing); t.flowing && null !== e.read(); )
                        ;
                }
                function U(e, t) {
                    return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length),
                    t.buffer.clear()) : r = t.buffer.consume(e, t.decoder),
                    r);
                    var r
                }
                function $(e) {
                    var t = e._readableState;
                    c("endReadable", t.endEmitted),
                    t.endEmitted || (t.ended = !0,
                    r.nextTick(B, t, e))
                }
                function B(e, t) {
                    if (c("endReadableNT", e.endEmitted, e.length),
                    !e.endEmitted && 0 === e.length && (e.endEmitted = !0,
                    t.readable = !1,
                    t.emit("end"),
                    e.autoDestroy)) {
                        var r = t._writableState;
                        (!r || r.autoDestroy && r.finished) && t.destroy()
                    }
                }
                function W(e, t) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t)
                            return r;
                    return -1
                }
                A.prototype.read = function(e) {
                    c("read", e),
                    e = parseInt(e, 10);
                    var t = this._readableState
                      , r = e;
                    if (0 !== e && (t.emittedReadable = !1),
                    0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
                        return c("read: emitReadable", t.length, t.ended),
                        0 === t.length && t.ended ? $(this) : O(this),
                        null;
                    if (0 === (e = T(e, t)) && t.ended)
                        return 0 === t.length && $(this),
                        null;
                    var n, i = t.needReadable;
                    return c("need readable", i),
                    (0 === t.length || t.length - e < t.highWaterMark) && c("length less than watermark", i = !0),
                    t.ended || t.reading ? c("reading or ended", i = !1) : i && (c("do read"),
                    t.reading = !0,
                    t.sync = !0,
                    0 === t.length && (t.needReadable = !0),
                    this._read(t.highWaterMark),
                    t.sync = !1,
                    t.reading || (e = T(r, t))),
                    null === (n = e > 0 ? U(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark,
                    e = 0) : (t.length -= e,
                    t.awaitDrain = 0),
                    0 === t.length && (t.ended || (t.needReadable = !0),
                    r !== e && t.ended && $(this)),
                    null !== n && this.emit("data", n),
                    n
                }
                ,
                A.prototype._read = function(e) {
                    E(this, new _("_read()"))
                }
                ,
                A.prototype.pipe = function(e, t) {
                    var n = this
                      , i = this._readableState;
                    switch (i.pipesCount) {
                    case 0:
                        i.pipes = e;
                        break;
                    case 1:
                        i.pipes = [i.pipes, e];
                        break;
                    default:
                        i.pipes.push(e)
                    }
                    i.pipesCount += 1,
                    c("pipe count=%d opts=%j", i.pipesCount, t);
                    var s = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? u : b;
                    function a(t, r) {
                        c("onunpipe"),
                        t === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0,
                        c("cleanup"),
                        e.removeListener("close", p),
                        e.removeListener("finish", g),
                        e.removeListener("drain", l),
                        e.removeListener("error", h),
                        e.removeListener("unpipe", a),
                        n.removeListener("end", u),
                        n.removeListener("end", b),
                        n.removeListener("data", d),
                        f = !0,
                        !i.awaitDrain || e._writableState && !e._writableState.needDrain || l())
                    }
                    function u() {
                        c("onend"),
                        e.end()
                    }
                    i.endEmitted ? r.nextTick(s) : n.once("end", s),
                    e.on("unpipe", a);
                    var l = function(e) {
                        return function() {
                            var t = e._readableState;
                            c("pipeOnDrain", t.awaitDrain),
                            t.awaitDrain && t.awaitDrain--,
                            0 === t.awaitDrain && o(e, "data") && (t.flowing = !0,
                            D(e))
                        }
                    }(n);
                    e.on("drain", l);
                    var f = !1;
                    function d(t) {
                        c("ondata");
                        var r = e.write(t);
                        c("dest.write", r),
                        !1 === r && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== W(i.pipes, e)) && !f && (c("false write response, pause", i.awaitDrain),
                        i.awaitDrain++),
                        n.pause())
                    }
                    function h(t) {
                        c("onerror", t),
                        b(),
                        e.removeListener("error", h),
                        0 === o(e, "error") && E(e, t)
                    }
                    function p() {
                        e.removeListener("finish", g),
                        b()
                    }
                    function g() {
                        c("onfinish"),
                        e.removeListener("close", p),
                        b()
                    }
                    function b() {
                        c("unpipe"),
                        n.unpipe(e)
                    }
                    return n.on("data", d),
                    function(e, t, r) {
                        if ("function" == typeof e.prependListener)
                            return e.prependListener(t, r);
                        e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                    }(e, "error", h),
                    e.once("close", p),
                    e.once("finish", g),
                    e.emit("pipe", n),
                    i.flowing || (c("pipe resume"),
                    n.resume()),
                    e
                }
                ,
                A.prototype.unpipe = function(e) {
                    var t = this._readableState
                      , r = {
                        hasUnpiped: !1
                    };
                    if (0 === t.pipesCount)
                        return this;
                    if (1 === t.pipesCount)
                        return e && e !== t.pipes || (e || (e = t.pipes),
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1,
                        e && e.emit("unpipe", this, r)),
                        this;
                    if (!e) {
                        var n = t.pipes
                          , i = t.pipesCount;
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1;
                        for (var o = 0; o < i; o++)
                            n[o].emit("unpipe", this, {
                                hasUnpiped: !1
                            });
                        return this
                    }
                    var s = W(t.pipes, e);
                    return -1 === s || (t.pipes.splice(s, 1),
                    t.pipesCount -= 1,
                    1 === t.pipesCount && (t.pipes = t.pipes[0]),
                    e.emit("unpipe", this, r)),
                    this
                }
                ,
                A.prototype.on = function(e, t) {
                    var n = s.prototype.on.call(this, e, t)
                      , i = this._readableState;
                    return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0,
                    !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0,
                    i.flowing = !1,
                    i.emittedReadable = !1,
                    c("on readable", i.length, i.reading),
                    i.length ? O(this) : i.reading || r.nextTick(k, this))),
                    n
                }
                ,
                A.prototype.addListener = A.prototype.on,
                A.prototype.removeListener = function(e, t) {
                    var n = s.prototype.removeListener.call(this, e, t);
                    return "readable" === e && r.nextTick(P, this),
                    n
                }
                ,
                A.prototype.removeAllListeners = function(e) {
                    var t = s.prototype.removeAllListeners.apply(this, arguments);
                    return "readable" !== e && void 0 !== e || r.nextTick(P, this),
                    t
                }
                ,
                A.prototype.resume = function() {
                    var e = this._readableState;
                    return e.flowing || (c("resume"),
                    e.flowing = !e.readableListening,
                    function(e, t) {
                        t.resumeScheduled || (t.resumeScheduled = !0,
                        r.nextTick(L, e, t))
                    }(this, e)),
                    e.paused = !1,
                    this
                }
                ,
                A.prototype.pause = function() {
                    return c("call pause flowing=%j", this._readableState.flowing),
                    !1 !== this._readableState.flowing && (c("pause"),
                    this._readableState.flowing = !1,
                    this.emit("pause")),
                    this._readableState.paused = !0,
                    this
                }
                ,
                A.prototype.wrap = function(e) {
                    var t = this
                      , r = this._readableState
                      , n = !1;
                    for (var i in e.on("end", function() {
                        if (c("wrapped end"),
                        r.decoder && !r.ended) {
                            var e = r.decoder.end();
                            e && e.length && t.push(e)
                        }
                        t.push(null)
                    }),
                    e.on("data", function(i) {
                        (c("wrapped data"),
                        r.decoder && (i = r.decoder.write(i)),
                        r.objectMode && null == i) || (r.objectMode || i && i.length) && (t.push(i) || (n = !0,
                        e.pause()))
                    }),
                    e)
                        void 0 === this[i] && "function" == typeof e[i] && (this[i] = function(t) {
                            return function() {
                                return e[t].apply(e, arguments)
                            }
                        }(i));
                    for (var o = 0; o < S.length; o++)
                        e.on(S[o], this.emit.bind(this, S[o]));
                    return this._read = function(t) {
                        c("wrapped _read", t),
                        n && (n = !1,
                        e.resume())
                    }
                    ,
                    this
                }
                ,
                "function" == typeof Symbol && (A.prototype[Symbol.asyncIterator] = function() {
                    return void 0 === d && (d = e("./internal/streams/async_iterator")),
                    d(this)
                }
                ),
                Object.defineProperty(A.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.highWaterMark
                    }
                }),
                Object.defineProperty(A.prototype, "readableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState && this._readableState.buffer
                    }
                }),
                Object.defineProperty(A.prototype, "readableFlowing", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.flowing
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.flowing = e)
                    }
                }),
                A._fromList = U,
                Object.defineProperty(A.prototype, "readableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.length
                    }
                }),
                "function" == typeof Symbol && (A.from = function(t, r) {
                    return void 0 === h && (h = e("./internal/streams/from")),
                    h(A, t, r)
                }
                )
            }
            ).call(this)
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../errors": 43,
        "./_stream_duplex": 44,
        "./internal/streams/async_iterator": 49,
        "./internal/streams/buffer_list": 50,
        "./internal/streams/destroy": 51,
        "./internal/streams/from": 53,
        "./internal/streams/state": 55,
        "./internal/streams/stream": 56,
        _process: 195,
        buffer: 176,
        events: 181,
        inherits: 185,
        "string_decoder/": 267,
        util: 175
    }],
    47: [function(e, t, r) {
        arguments[4][21][0].apply(r, arguments)
    }
    , {
        "../errors": 43,
        "./_stream_duplex": 44,
        dup: 21,
        inherits: 185
    }],
    48: [function(e, t, r) {
        (function(r, n) {
            (function() {
                "use strict";
                function i(e) {
                    var t = this;
                    this.next = null,
                    this.entry = null,
                    this.finish = function() {
                        !function(e, t, r) {
                            var n = e.entry;
                            e.entry = null;
                            for (; n; ) {
                                var i = n.callback;
                                t.pendingcb--,
                                i(r),
                                n = n.next
                            }
                            t.corkedRequestsFree.next = e
                        }(t, e)
                    }
                }
                var o;
                t.exports = A,
                A.WritableState = M;
                var s = {
                    deprecate: e("util-deprecate")
                }
                  , a = e("./internal/streams/stream")
                  , u = e("buffer").Buffer
                  , c = (void 0 !== n ? n : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {}
                ;
                var l, f = e("./internal/streams/destroy"), d = e("./internal/streams/state").getHighWaterMark, h = e("../errors").codes, p = h.ERR_INVALID_ARG_TYPE, g = h.ERR_METHOD_NOT_IMPLEMENTED, b = h.ERR_MULTIPLE_CALLBACK, y = h.ERR_STREAM_CANNOT_PIPE, m = h.ERR_STREAM_DESTROYED, w = h.ERR_STREAM_NULL_VALUES, _ = h.ERR_STREAM_WRITE_AFTER_END, v = h.ERR_UNKNOWN_ENCODING, E = f.errorOrDestroy;
                function S() {}
                function M(t, n, s) {
                    o = o || e("./_stream_duplex"),
                    t = t || {},
                    "boolean" != typeof s && (s = n instanceof o),
                    this.objectMode = !!t.objectMode,
                    s && (this.objectMode = this.objectMode || !!t.writableObjectMode),
                    this.highWaterMark = d(this, t, "writableHighWaterMark", s),
                    this.finalCalled = !1,
                    this.needDrain = !1,
                    this.ending = !1,
                    this.ended = !1,
                    this.finished = !1,
                    this.destroyed = !1;
                    var a = !1 === t.decodeStrings;
                    this.decodeStrings = !a,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.length = 0,
                    this.writing = !1,
                    this.corked = 0,
                    this.sync = !0,
                    this.bufferProcessing = !1,
                    this.onwrite = function(e) {
                        !function(e, t) {
                            var n = e._writableState
                              , i = n.sync
                              , o = n.writecb;
                            if ("function" != typeof o)
                                throw new b;
                            if (function(e) {
                                e.writing = !1,
                                e.writecb = null,
                                e.length -= e.writelen,
                                e.writelen = 0
                            }(n),
                            t)
                                !function(e, t, n, i, o) {
                                    --t.pendingcb,
                                    n ? (r.nextTick(o, i),
                                    r.nextTick(C, e, t),
                                    e._writableState.errorEmitted = !0,
                                    E(e, i)) : (o(i),
                                    e._writableState.errorEmitted = !0,
                                    E(e, i),
                                    C(e, t))
                                }(e, n, i, t, o);
                            else {
                                var s = T(n) || e.destroyed;
                                s || n.corked || n.bufferProcessing || !n.bufferedRequest || I(e, n),
                                i ? r.nextTick(R, e, n, s, o) : R(e, n, s, o)
                            }
                        }(n, e)
                    }
                    ,
                    this.writecb = null,
                    this.writelen = 0,
                    this.bufferedRequest = null,
                    this.lastBufferedRequest = null,
                    this.pendingcb = 0,
                    this.prefinished = !1,
                    this.errorEmitted = !1,
                    this.emitClose = !1 !== t.emitClose,
                    this.autoDestroy = !!t.autoDestroy,
                    this.bufferedRequestCount = 0,
                    this.corkedRequestsFree = new i(this)
                }
                function A(t) {
                    var r = this instanceof (o = o || e("./_stream_duplex"));
                    if (!r && !l.call(A, this))
                        return new A(t);
                    this._writableState = new M(t,this,r),
                    this.writable = !0,
                    t && ("function" == typeof t.write && (this._write = t.write),
                    "function" == typeof t.writev && (this._writev = t.writev),
                    "function" == typeof t.destroy && (this._destroy = t.destroy),
                    "function" == typeof t.final && (this._final = t.final)),
                    a.call(this)
                }
                function j(e, t, r, n, i, o, s) {
                    t.writelen = n,
                    t.writecb = s,
                    t.writing = !0,
                    t.sync = !0,
                    t.destroyed ? t.onwrite(new m("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite),
                    t.sync = !1
                }
                function R(e, t, r, n) {
                    r || function(e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1,
                        e.emit("drain"))
                    }(e, t),
                    t.pendingcb--,
                    n(),
                    C(e, t)
                }
                function I(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var n = t.bufferedRequestCount
                          , o = new Array(n)
                          , s = t.corkedRequestsFree;
                        s.entry = r;
                        for (var a = 0, u = !0; r; )
                            o[a] = r,
                            r.isBuf || (u = !1),
                            r = r.next,
                            a += 1;
                        o.allBuffers = u,
                        j(e, t, !0, t.length, o, "", s.finish),
                        t.pendingcb++,
                        t.lastBufferedRequest = null,
                        s.next ? (t.corkedRequestsFree = s.next,
                        s.next = null) : t.corkedRequestsFree = new i(t),
                        t.bufferedRequestCount = 0
                    } else {
                        for (; r; ) {
                            var c = r.chunk
                              , l = r.encoding
                              , f = r.callback;
                            if (j(e, t, !1, t.objectMode ? 1 : c.length, c, l, f),
                            r = r.next,
                            t.bufferedRequestCount--,
                            t.writing)
                                break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = r,
                    t.bufferProcessing = !1
                }
                function T(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }
                function O(e, t) {
                    e._final(function(r) {
                        t.pendingcb--,
                        r && E(e, r),
                        t.prefinished = !0,
                        e.emit("prefinish"),
                        C(e, t)
                    })
                }
                function C(e, t) {
                    var n = T(t);
                    if (n && (function(e, t) {
                        t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0,
                        e.emit("prefinish")) : (t.pendingcb++,
                        t.finalCalled = !0,
                        r.nextTick(O, e, t)))
                    }(e, t),
                    0 === t.pendingcb && (t.finished = !0,
                    e.emit("finish"),
                    t.autoDestroy))) {
                        var i = e._readableState;
                        (!i || i.autoDestroy && i.endEmitted) && e.destroy()
                    }
                    return n
                }
                e("inherits")(A, a),
                M.prototype.getBuffer = function() {
                    for (var e = this.bufferedRequest, t = []; e; )
                        t.push(e),
                        e = e.next;
                    return t
                }
                ,
                function() {
                    try {
                        Object.defineProperty(M.prototype, "buffer", {
                            get: s.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                        })
                    } catch (e) {}
                }(),
                "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (l = Function.prototype[Symbol.hasInstance],
                Object.defineProperty(A, Symbol.hasInstance, {
                    value: function(e) {
                        return !!l.call(this, e) || this === A && (e && e._writableState instanceof M)
                    }
                })) : l = function(e) {
                    return e instanceof this
                }
                ,
                A.prototype.pipe = function() {
                    E(this, new y)
                }
                ,
                A.prototype.write = function(e, t, n) {
                    var i, o = this._writableState, s = !1, a = !o.objectMode && (i = e,
                    u.isBuffer(i) || i instanceof c);
                    return a && !u.isBuffer(e) && (e = function(e) {
                        return u.from(e)
                    }(e)),
                    "function" == typeof t && (n = t,
                    t = null),
                    a ? t = "buffer" : t || (t = o.defaultEncoding),
                    "function" != typeof n && (n = S),
                    o.ending ? function(e, t) {
                        var n = new _;
                        E(e, n),
                        r.nextTick(t, n)
                    }(this, n) : (a || function(e, t, n, i) {
                        var o;
                        return null === n ? o = new w : "string" == typeof n || t.objectMode || (o = new p("chunk",["string", "Buffer"],n)),
                        !o || (E(e, o),
                        r.nextTick(i, o),
                        !1)
                    }(this, o, e, n)) && (o.pendingcb++,
                    s = function(e, t, r, n, i, o) {
                        if (!r) {
                            var s = function(e, t, r) {
                                e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = u.from(t, r));
                                return t
                            }(t, n, i);
                            n !== s && (r = !0,
                            i = "buffer",
                            n = s)
                        }
                        var a = t.objectMode ? 1 : n.length;
                        t.length += a;
                        var c = t.length < t.highWaterMark;
                        c || (t.needDrain = !0);
                        if (t.writing || t.corked) {
                            var l = t.lastBufferedRequest;
                            t.lastBufferedRequest = {
                                chunk: n,
                                encoding: i,
                                isBuf: r,
                                callback: o,
                                next: null
                            },
                            l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest,
                            t.bufferedRequestCount += 1
                        } else
                            j(e, t, !1, a, n, i, o);
                        return c
                    }(this, o, a, e, t, n)),
                    s
                }
                ,
                A.prototype.cork = function() {
                    this._writableState.corked++
                }
                ,
                A.prototype.uncork = function() {
                    var e = this._writableState;
                    e.corked && (e.corked--,
                    e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || I(this, e))
                }
                ,
                A.prototype.setDefaultEncoding = function(e) {
                    if ("string" == typeof e && (e = e.toLowerCase()),
                    !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1))
                        throw new v(e);
                    return this._writableState.defaultEncoding = e,
                    this
                }
                ,
                Object.defineProperty(A.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }),
                Object.defineProperty(A.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                A.prototype._write = function(e, t, r) {
                    r(new g("_write()"))
                }
                ,
                A.prototype._writev = null,
                A.prototype.end = function(e, t, n) {
                    var i = this._writableState;
                    return "function" == typeof e ? (n = e,
                    e = null,
                    t = null) : "function" == typeof t && (n = t,
                    t = null),
                    null != e && this.write(e, t),
                    i.corked && (i.corked = 1,
                    this.uncork()),
                    i.ending || function(e, t, n) {
                        t.ending = !0,
                        C(e, t),
                        n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                        t.ended = !0,
                        e.writable = !1
                    }(this, i, n),
                    this
                }
                ,
                Object.defineProperty(A.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }),
                Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }),
                A.prototype.destroy = f.destroy,
                A.prototype._undestroy = f.undestroy,
                A.prototype._destroy = function(e, t) {
                    t(e)
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../errors": 43,
        "./_stream_duplex": 44,
        "./internal/streams/destroy": 51,
        "./internal/streams/state": 55,
        "./internal/streams/stream": 56,
        _process: 195,
        buffer: 176,
        inherits: 185,
        "util-deprecate": 268
    }],
    49: [function(e, t, r) {
        (function(r) {
            (function() {
                "use strict";
                var n;
                function i(e, t, r) {
                    return (t = function(e) {
                        var t = function(e, t) {
                            if ("object" != typeof e || null === e)
                                return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != typeof n)
                                    return n;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == typeof t ? t : String(t)
                    }(t))in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r,
                    e
                }
                var o = e("./end-of-stream")
                  , s = Symbol("lastResolve")
                  , a = Symbol("lastReject")
                  , u = Symbol("error")
                  , c = Symbol("ended")
                  , l = Symbol("lastPromise")
                  , f = Symbol("handlePromise")
                  , d = Symbol("stream");
                function h(e, t) {
                    return {
                        value: e,
                        done: t
                    }
                }
                function p(e) {
                    var t = e[s];
                    if (null !== t) {
                        var r = e[d].read();
                        null !== r && (e[l] = null,
                        e[s] = null,
                        e[a] = null,
                        t(h(r, !1)))
                    }
                }
                function g(e) {
                    r.nextTick(p, e)
                }
                var b = Object.getPrototypeOf(function() {})
                  , y = Object.setPrototypeOf((i(n = {
                    get stream() {
                        return this[d]
                    },
                    next: function() {
                        var e = this
                          , t = this[u];
                        if (null !== t)
                            return Promise.reject(t);
                        if (this[c])
                            return Promise.resolve(h(void 0, !0));
                        if (this[d].destroyed)
                            return new Promise(function(t, n) {
                                r.nextTick(function() {
                                    e[u] ? n(e[u]) : t(h(void 0, !0))
                                })
                            }
                            );
                        var n, i = this[l];
                        if (i)
                            n = new Promise(function(e, t) {
                                return function(r, n) {
                                    e.then(function() {
                                        t[c] ? r(h(void 0, !0)) : t[f](r, n)
                                    }, n)
                                }
                            }(i, this));
                        else {
                            var o = this[d].read();
                            if (null !== o)
                                return Promise.resolve(h(o, !1));
                            n = new Promise(this[f])
                        }
                        return this[l] = n,
                        n
                    }
                }, Symbol.asyncIterator, function() {
                    return this
                }),
                i(n, "return", function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e[d].destroy(null, function(e) {
                            e ? r(e) : t(h(void 0, !0))
                        })
                    }
                    )
                }),
                n), b);
                t.exports = function(e) {
                    var t, r = Object.create(y, (i(t = {}, d, {
                        value: e,
                        writable: !0
                    }),
                    i(t, s, {
                        value: null,
                        writable: !0
                    }),
                    i(t, a, {
                        value: null,
                        writable: !0
                    }),
                    i(t, u, {
                        value: null,
                        writable: !0
                    }),
                    i(t, c, {
                        value: e._readableState.endEmitted,
                        writable: !0
                    }),
                    i(t, f, {
                        value: function(e, t) {
                            var n = r[d].read();
                            n ? (r[l] = null,
                            r[s] = null,
                            r[a] = null,
                            e(h(n, !1))) : (r[s] = e,
                            r[a] = t)
                        },
                        writable: !0
                    }),
                    t));
                    return r[l] = null,
                    o(e, function(e) {
                        if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                            var t = r[a];
                            return null !== t && (r[l] = null,
                            r[s] = null,
                            r[a] = null,
                            t(e)),
                            void (r[u] = e)
                        }
                        var n = r[s];
                        null !== n && (r[l] = null,
                        r[s] = null,
                        r[a] = null,
                        n(h(void 0, !0))),
                        r[c] = !0
                    }),
                    e.on("readable", g.bind(null, r)),
                    r
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./end-of-stream": 52,
        _process: 195
    }],
    50: [function(e, t, r) {
        arguments[4][24][0].apply(r, arguments)
    }
    , {
        buffer: 176,
        dup: 24,
        util: 175
    }],
    51: [function(e, t, r) {
        (function(e) {
            (function() {
                "use strict";
                function r(e, t) {
                    i(e, t),
                    n(e)
                }
                function n(e) {
                    e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
                }
                function i(e, t) {
                    e.emit("error", t)
                }
                t.exports = {
                    destroy: function(t, o) {
                        var s = this
                          , a = this._readableState && this._readableState.destroyed
                          , u = this._writableState && this._writableState.destroyed;
                        return a || u ? (o ? o(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0,
                        e.nextTick(i, this, t)) : e.nextTick(i, this, t)),
                        this) : (this._readableState && (this._readableState.destroyed = !0),
                        this._writableState && (this._writableState.destroyed = !0),
                        this._destroy(t || null, function(t) {
                            !o && t ? s._writableState ? s._writableState.errorEmitted ? e.nextTick(n, s) : (s._writableState.errorEmitted = !0,
                            e.nextTick(r, s, t)) : e.nextTick(r, s, t) : o ? (e.nextTick(n, s),
                            o(t)) : e.nextTick(n, s)
                        }),
                        this)
                    },
                    undestroy: function() {
                        this._readableState && (this._readableState.destroyed = !1,
                        this._readableState.reading = !1,
                        this._readableState.ended = !1,
                        this._readableState.endEmitted = !1),
                        this._writableState && (this._writableState.destroyed = !1,
                        this._writableState.ended = !1,
                        this._writableState.ending = !1,
                        this._writableState.finalCalled = !1,
                        this._writableState.prefinished = !1,
                        this._writableState.finished = !1,
                        this._writableState.errorEmitted = !1)
                    },
                    errorOrDestroy: function(e, t) {
                        var r = e._readableState
                          , n = e._writableState;
                        r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t)
                    }
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 195
    }],
    52: [function(e, t, r) {
        arguments[4][26][0].apply(r, arguments)
    }
    , {
        "../../../errors": 43,
        dup: 26
    }],
    53: [function(e, t, r) {
        arguments[4][27][0].apply(r, arguments)
    }
    , {
        dup: 27
    }],
    54: [function(e, t, r) {
        arguments[4][28][0].apply(r, arguments)
    }
    , {
        "../../../errors": 43,
        "./end-of-stream": 52,
        dup: 28
    }],
    55: [function(e, t, r) {
        arguments[4][29][0].apply(r, arguments)
    }
    , {
        "../../../errors": 43,
        dup: 29
    }],
    56: [function(e, t, r) {
        arguments[4][30][0].apply(r, arguments)
    }
    , {
        dup: 30,
        events: 181
    }],
    57: [function(e, t, r) {
        arguments[4][31][0].apply(r, arguments)
    }
    , {
        "./lib/_stream_duplex.js": 44,
        "./lib/_stream_passthrough.js": 45,
        "./lib/_stream_readable.js": 46,
        "./lib/_stream_transform.js": 47,
        "./lib/_stream_writable.js": 48,
        "./lib/internal/streams/end-of-stream.js": 52,
        "./lib/internal/streams/pipeline.js": 54,
        dup: 31
    }],
    58: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.BasePostMessageStream = void 0;
        const n = e("readable-stream")
          , i = () => {}
          , o = "SYN"
          , s = "ACK";
        class a extends n.Duplex {
            constructor(e) {
                super(Object.assign({
                    objectMode: !0
                }, e)),
                this._init = !1,
                this._haveSyn = !1,
                this._log = () => null
            }
            _handshake() {
                this._write(o, null, i),
                this.cork()
            }
            _onData(e) {
                if (this._init)
                    try {
                        this.push(e),
                        this._log(e, !1)
                    } catch (e) {
                        this.emit("error", e)
                    }
                else
                    e === o ? (this._haveSyn = !0,
                    this._write(s, null, i)) : e === s && (this._init = !0,
                    this._haveSyn || this._write(s, null, i),
                    this.uncork())
            }
            _read() {}
            _write(e, t, r) {
                e !== s && e !== o && this._log(e, !0),
                this._postMessage(e),
                r()
            }
            _setLogger(e) {
                this._log = e
            }
        }
        r.BasePostMessageStream = a
    }
    , {
        "readable-stream": 79
    }],
    59: [function(e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
            void 0 === n && (n = r);
            var i = Object.getOwnPropertyDescriptor(t, r);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[r]
                }
            }),
            Object.defineProperty(e, n, i)
        }
        : function(e, t, r, n) {
            void 0 === n && (n = r),
            e[n] = t[r]
        }
        )
          , i = this && this.__exportStar || function(e, t) {
            for (var r in e)
                "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.isValidStreamMessage = void 0,
        i(e("./window/WindowPostMessageStream.cjs"), r),
        i(e("./web-worker/WebWorkerPostMessageStream.cjs"), r),
        i(e("./web-worker/WebWorkerParentPostMessageStream.cjs"), r),
        i(e("./runtime/BrowserRuntimePostMessageStream.cjs"), r),
        i(e("./BasePostMessageStream.cjs"), r);
        var o = e("./utils.cjs");
        Object.defineProperty(r, "isValidStreamMessage", {
            enumerable: !0,
            get: function() {
                return o.isValidStreamMessage
            }
        })
    }
    , {
        "./BasePostMessageStream.cjs": 58,
        "./runtime/BrowserRuntimePostMessageStream.cjs": 60,
        "./utils.cjs": 61,
        "./web-worker/WebWorkerParentPostMessageStream.cjs": 62,
        "./web-worker/WebWorkerPostMessageStream.cjs": 63,
        "./window/WindowPostMessageStream.cjs": 64
    }],
    60: [function(e, t, r) {
        "use strict";
        var n, i, o = this && this.__classPrivateFieldSet || function(e, t, r, n, i) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? i.call(e, r) : i ? i.value = r : t.set(e, r),
            r
        }
        , s = this && this.__classPrivateFieldGet || function(e, t, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
        }
        , a = this && this.__rest || function(e, t) {
            var r = {};
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                    t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]])
            }
            return r
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.BrowserRuntimePostMessageStream = void 0;
        const u = e("../BasePostMessageStream.cjs")
          , c = e("../utils.cjs");
        class l extends u.BasePostMessageStream {
            constructor(e) {
                var {name: t, target: r} = e;
                super(a(e, ["name", "target"])),
                n.set(this, void 0),
                i.set(this, void 0),
                o(this, n, t, "f"),
                o(this, i, r, "f"),
                this._onMessage = this._onMessage.bind(this),
                this._getRuntime().onMessage.addListener(this._onMessage),
                this._handshake()
            }
            _postMessage(e) {
                this._getRuntime().sendMessage({
                    target: s(this, i, "f"),
                    data: e
                })
            }
            _onMessage(e) {
                (0,
                c.isValidStreamMessage)(e) && e.target === s(this, n, "f") && this._onData(e.data)
            }
            _getRuntime() {
                var e, t;
                if ("chrome"in globalThis && "function" == typeof (null === (e = null === chrome || void 0 === chrome ? void 0 : chrome.runtime) || void 0 === e ? void 0 : e.sendMessage))
                    return chrome.runtime;
                if ("browser"in globalThis && "function" == typeof (null === (t = null === browser || void 0 === browser ? void 0 : browser.runtime) || void 0 === t ? void 0 : t.sendMessage))
                    return browser.runtime;
                throw new Error("browser.runtime.sendMessage is not a function. This class should only be instantiated in a web extension.")
            }
            _destroy() {
                this._getRuntime().onMessage.removeListener(this._onMessage)
            }
        }
        r.BrowserRuntimePostMessageStream = l,
        n = new WeakMap,
        i = new WeakMap
    }
    , {
        "../BasePostMessageStream.cjs": 58,
        "../utils.cjs": 61
    }],
    61: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.isValidStreamMessage = r.DEDICATED_WORKER_NAME = void 0;
        const n = e("@metamask/utils");
        r.DEDICATED_WORKER_NAME = "dedicatedWorker",
        r.isValidStreamMessage = function(e) {
            return (0,
            n.isObject)(e) && Boolean(e.data) && ("number" == typeof e.data || "object" == typeof e.data || "string" == typeof e.data)
        }
    }
    , {
        "@metamask/utils": 138
    }],
    62: [function(e, t, r) {
        "use strict";
        var n = this && this.__rest || function(e, t) {
            var r = {};
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                    t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]])
            }
            return r
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.WebWorkerParentPostMessageStream = void 0;
        const i = e("../BasePostMessageStream.cjs")
          , o = e("../utils.cjs");
        class s extends i.BasePostMessageStream {
            constructor(e) {
                var {worker: t} = e;
                super(n(e, ["worker"])),
                this._target = o.DEDICATED_WORKER_NAME,
                this._worker = t,
                this._worker.onmessage = this._onMessage.bind(this),
                this._handshake()
            }
            _postMessage(e) {
                this._worker.postMessage({
                    target: this._target,
                    data: e
                })
            }
            _onMessage(e) {
                const t = e.data;
                (0,
                o.isValidStreamMessage)(t) && this._onData(t.data)
            }
            _destroy() {
                this._worker.onmessage = null,
                this._worker = null
            }
        }
        r.WebWorkerParentPostMessageStream = s
    }
    , {
        "../BasePostMessageStream.cjs": 58,
        "../utils.cjs": 61
    }],
    63: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.WebWorkerPostMessageStream = void 0;
        const n = e("../BasePostMessageStream.cjs")
          , i = e("../utils.cjs");
        class o extends n.BasePostMessageStream {
            constructor(e={}) {
                if ("undefined" == typeof self || "undefined" == typeof WorkerGlobalScope)
                    throw new Error("WorkerGlobalScope not found. This class should only be instantiated in a WebWorker.");
                super(e),
                this._name = i.DEDICATED_WORKER_NAME,
                self.addEventListener("message", this._onMessage.bind(this)),
                this._handshake()
            }
            _postMessage(e) {
                self.postMessage({
                    data: e
                })
            }
            _onMessage(e) {
                const t = e.data;
                (0,
                i.isValidStreamMessage)(t) && t.target === this._name && this._onData(t.data)
            }
            _destroy() {}
        }
        r.WebWorkerPostMessageStream = o
    }
    , {
        "../BasePostMessageStream.cjs": 58,
        "../utils.cjs": 61
    }],
    64: [function(e, t, r) {
        "use strict";
        var n, i, o = this && this.__rest || function(e, t) {
            var r = {};
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                    t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]])
            }
            return r
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.WindowPostMessageStream = void 0;
        const s = e("@metamask/utils")
          , a = e("../BasePostMessageStream.cjs")
          , u = e("../utils.cjs")
          , c = null === (n = Object.getOwnPropertyDescriptor(MessageEvent.prototype, "source")) || void 0 === n ? void 0 : n.get;
        (0,
        s.assert)(c, "MessageEvent.prototype.source getter is not defined.");
        const l = null === (i = Object.getOwnPropertyDescriptor(MessageEvent.prototype, "origin")) || void 0 === i ? void 0 : i.get;
        (0,
        s.assert)(l, "MessageEvent.prototype.origin getter is not defined.");
        class f extends a.BasePostMessageStream {
            constructor(e) {
                var {name: t, target: r, targetOrigin: n=location.origin, targetWindow: i=window} = e;
                if (super(o(e, ["name", "target", "targetOrigin", "targetWindow"])),
                "undefined" == typeof window || "function" != typeof window.postMessage)
                    throw new Error("window.postMessage is not a function. This class should only be instantiated in a Window.");
                this._name = t,
                this._target = r,
                this._targetOrigin = n,
                this._targetWindow = i,
                this._onMessage = this._onMessage.bind(this),
                window.addEventListener("message", this._onMessage, !1),
                this._handshake()
            }
            _postMessage(e) {
                this._targetWindow.postMessage({
                    target: this._target,
                    data: e
                }, this._targetOrigin)
            }
            _onMessage(e) {
                const t = e.data;
                "*" !== this._targetOrigin && l.call(e) !== this._targetOrigin || c.call(e) !== this._targetWindow || !(0,
                u.isValidStreamMessage)(t) || t.target !== this._name || this._onData(t.data)
            }
            _destroy() {
                window.removeEventListener("message", this._onMessage, !1)
            }
        }
        r.WindowPostMessageStream = f
    }
    , {
        "../BasePostMessageStream.cjs": 58,
        "../utils.cjs": 61,
        "@metamask/utils": 138
    }],
    65: [function(e, t, r) {
        arguments[4][17][0].apply(r, arguments)
    }
    , {
        dup: 17
    }],
    66: [function(e, t, r) {
        (function(r) {
            (function() {
                "use strict";
                var n = Object.keys || function(e) {
                    var t = [];
                    for (var r in e)
                        t.push(r);
                    return t
                }
                ;
                t.exports = c;
                var i = e("./_stream_readable")
                  , o = e("./_stream_writable");
                e("inherits")(c, i);
                for (var s = n(o.prototype), a = 0; a < s.length; a++) {
                    var u = s[a];
                    c.prototype[u] || (c.prototype[u] = o.prototype[u])
                }
                function c(e) {
                    if (!(this instanceof c))
                        return new c(e);
                    i.call(this, e),
                    o.call(this, e),
                    this.allowHalfOpen = !0,
                    e && (!1 === e.readable && (this.readable = !1),
                    !1 === e.writable && (this.writable = !1),
                    !1 === e.allowHalfOpen && (this.allowHalfOpen = !1,
                    this.once("end", l)))
                }
                function l() {
                    this._writableState.ended || r.nextTick(f, this)
                }
                function f(e) {
                    e.end()
                }
                Object.defineProperty(c.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                Object.defineProperty(c.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }),
                Object.defineProperty(c.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }),
                Object.defineProperty(c.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                    },
                    set: function(e) {
                        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e,
                        this._writableState.destroyed = e)
                    }
                })
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./_stream_readable": 68,
        "./_stream_writable": 70,
        _process: 195,
        inherits: 185
    }],
    67: [function(e, t, r) {
        arguments[4][19][0].apply(r, arguments)
    }
    , {
        "./_stream_transform": 69,
        dup: 19,
        inherits: 185
    }],
    68: [function(e, t, r) {
        (function(r, n) {
            (function() {
                "use strict";
                var i;
                t.exports = A,
                A.ReadableState = M;
                e("events").EventEmitter;
                var o = function(e, t) {
                    return e.listeners(t).length
                }
                  , s = e("./internal/streams/stream")
                  , a = e("buffer").Buffer
                  , u = (void 0 !== n ? n : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {}
                ;
                var c, l = e("util");
                c = l && l.debuglog ? l.debuglog("stream") : function() {}
                ;
                var f, d, h, p = e("./internal/streams/buffer_list"), g = e("./internal/streams/destroy"), b = e("./internal/streams/state").getHighWaterMark, y = e("../errors").codes, m = y.ERR_INVALID_ARG_TYPE, w = y.ERR_STREAM_PUSH_AFTER_EOF, _ = y.ERR_METHOD_NOT_IMPLEMENTED, v = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                e("inherits")(A, s);
                var E = g.errorOrDestroy
                  , S = ["error", "close", "destroy", "pause", "resume"];
                function M(t, r, n) {
                    i = i || e("./_stream_duplex"),
                    t = t || {},
                    "boolean" != typeof n && (n = r instanceof i),
                    this.objectMode = !!t.objectMode,
                    n && (this.objectMode = this.objectMode || !!t.readableObjectMode),
                    this.highWaterMark = b(this, t, "readableHighWaterMark", n),
                    this.buffer = new p,
                    this.length = 0,
                    this.pipes = null,
                    this.pipesCount = 0,
                    this.flowing = null,
                    this.ended = !1,
                    this.endEmitted = !1,
                    this.reading = !1,
                    this.sync = !0,
                    this.needReadable = !1,
                    this.emittedReadable = !1,
                    this.readableListening = !1,
                    this.resumeScheduled = !1,
                    this.paused = !0,
                    this.emitClose = !1 !== t.emitClose,
                    this.autoDestroy = !!t.autoDestroy,
                    this.destroyed = !1,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.awaitDrain = 0,
                    this.readingMore = !1,
                    this.decoder = null,
                    this.encoding = null,
                    t.encoding && (f || (f = e("string_decoder/").StringDecoder),
                    this.decoder = new f(t.encoding),
                    this.encoding = t.encoding)
                }
                function A(t) {
                    if (i = i || e("./_stream_duplex"),
                    !(this instanceof A))
                        return new A(t);
                    var r = this instanceof i;
                    this._readableState = new M(t,this,r),
                    this.readable = !0,
                    t && ("function" == typeof t.read && (this._read = t.read),
                    "function" == typeof t.destroy && (this._destroy = t.destroy)),
                    s.call(this)
                }
                function j(e, t, r, n, i) {
                    c("readableAddChunk", t);
                    var o, s = e._readableState;
                    if (null === t)
                        s.reading = !1,
                        function(e, t) {
                            if (c("onEofChunk"),
                            t.ended)
                                return;
                            if (t.decoder) {
                                var r = t.decoder.end();
                                r && r.length && (t.buffer.push(r),
                                t.length += t.objectMode ? 1 : r.length)
                            }
                            t.ended = !0,
                            t.sync ? O(e) : (t.needReadable = !1,
                            t.emittedReadable || (t.emittedReadable = !0,
                            C(e)))
                        }(e, s);
                    else if (i || (o = function(e, t) {
                        var r;
                        n = t,
                        a.isBuffer(n) || n instanceof u || "string" == typeof t || void 0 === t || e.objectMode || (r = new m("chunk",["string", "Buffer", "Uint8Array"],t));
                        var n;
                        return r
                    }(s, t)),
                    o)
                        E(e, o);
                    else if (s.objectMode || t && t.length > 0)
                        if ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = function(e) {
                            return a.from(e)
                        }(t)),
                        n)
                            s.endEmitted ? E(e, new v) : R(e, s, t, !0);
                        else if (s.ended)
                            E(e, new w);
                        else {
                            if (s.destroyed)
                                return !1;
                            s.reading = !1,
                            s.decoder && !r ? (t = s.decoder.write(t),
                            s.objectMode || 0 !== t.length ? R(e, s, t, !1) : x(e, s)) : R(e, s, t, !1)
                        }
                    else
                        n || (s.reading = !1,
                        x(e, s));
                    return !s.ended && (s.length < s.highWaterMark || 0 === s.length)
                }
                function R(e, t, r, n) {
                    t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0,
                    e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length,
                    n ? t.buffer.unshift(r) : t.buffer.push(r),
                    t.needReadable && O(e)),
                    x(e, t)
                }
                Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }),
                A.prototype.destroy = g.destroy,
                A.prototype._undestroy = g.undestroy,
                A.prototype._destroy = function(e, t) {
                    t(e)
                }
                ,
                A.prototype.push = function(e, t) {
                    var r, n = this._readableState;
                    return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = a.from(e, t),
                    t = ""),
                    r = !0),
                    j(this, e, t, !1, r)
                }
                ,
                A.prototype.unshift = function(e) {
                    return j(this, e, null, !0, !1)
                }
                ,
                A.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                }
                ,
                A.prototype.setEncoding = function(t) {
                    f || (f = e("string_decoder/").StringDecoder);
                    var r = new f(t);
                    this._readableState.decoder = r,
                    this._readableState.encoding = this._readableState.decoder.encoding;
                    for (var n = this._readableState.buffer.head, i = ""; null !== n; )
                        i += r.write(n.data),
                        n = n.next;
                    return this._readableState.buffer.clear(),
                    "" !== i && this._readableState.buffer.push(i),
                    this._readableState.length = i.length,
                    this
                }
                ;
                var I = 1073741824;
                function T(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function(e) {
                        return e >= I ? e = I : (e--,
                        e |= e >>> 1,
                        e |= e >>> 2,
                        e |= e >>> 4,
                        e |= e >>> 8,
                        e |= e >>> 16,
                        e++),
                        e
                    }(e)),
                    e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0,
                    0))
                }
                function O(e) {
                    var t = e._readableState;
                    c("emitReadable", t.needReadable, t.emittedReadable),
                    t.needReadable = !1,
                    t.emittedReadable || (c("emitReadable", t.flowing),
                    t.emittedReadable = !0,
                    r.nextTick(C, e))
                }
                function C(e) {
                    var t = e._readableState;
                    c("emitReadable_", t.destroyed, t.length, t.ended),
                    t.destroyed || !t.length && !t.ended || (e.emit("readable"),
                    t.emittedReadable = !1),
                    t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark,
                    D(e)
                }
                function x(e, t) {
                    t.readingMore || (t.readingMore = !0,
                    r.nextTick(N, e, t))
                }
                function N(e, t) {
                    for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length); ) {
                        var r = t.length;
                        if (c("maybeReadMore read 0"),
                        e.read(0),
                        r === t.length)
                            break
                    }
                    t.readingMore = !1
                }
                function P(e) {
                    var t = e._readableState;
                    t.readableListening = e.listenerCount("readable") > 0,
                    t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
                }
                function k(e) {
                    c("readable nexttick read 0"),
                    e.read(0)
                }
                function L(e, t) {
                    c("resume", t.reading),
                    t.reading || e.read(0),
                    t.resumeScheduled = !1,
                    e.emit("resume"),
                    D(e),
                    t.flowing && !t.reading && e.read(0)
                }
                function D(e) {
                    var t = e._readableState;
                    for (c("flow", t.flowing); t.flowing && null !== e.read(); )
                        ;
                }
                function U(e, t) {
                    return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length),
                    t.buffer.clear()) : r = t.buffer.consume(e, t.decoder),
                    r);
                    var r
                }
                function $(e) {
                    var t = e._readableState;
                    c("endReadable", t.endEmitted),
                    t.endEmitted || (t.ended = !0,
                    r.nextTick(B, t, e))
                }
                function B(e, t) {
                    if (c("endReadableNT", e.endEmitted, e.length),
                    !e.endEmitted && 0 === e.length && (e.endEmitted = !0,
                    t.readable = !1,
                    t.emit("end"),
                    e.autoDestroy)) {
                        var r = t._writableState;
                        (!r || r.autoDestroy && r.finished) && t.destroy()
                    }
                }
                function W(e, t) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t)
                            return r;
                    return -1
                }
                A.prototype.read = function(e) {
                    c("read", e),
                    e = parseInt(e, 10);
                    var t = this._readableState
                      , r = e;
                    if (0 !== e && (t.emittedReadable = !1),
                    0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
                        return c("read: emitReadable", t.length, t.ended),
                        0 === t.length && t.ended ? $(this) : O(this),
                        null;
                    if (0 === (e = T(e, t)) && t.ended)
                        return 0 === t.length && $(this),
                        null;
                    var n, i = t.needReadable;
                    return c("need readable", i),
                    (0 === t.length || t.length - e < t.highWaterMark) && c("length less than watermark", i = !0),
                    t.ended || t.reading ? c("reading or ended", i = !1) : i && (c("do read"),
                    t.reading = !0,
                    t.sync = !0,
                    0 === t.length && (t.needReadable = !0),
                    this._read(t.highWaterMark),
                    t.sync = !1,
                    t.reading || (e = T(r, t))),
                    null === (n = e > 0 ? U(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark,
                    e = 0) : (t.length -= e,
                    t.awaitDrain = 0),
                    0 === t.length && (t.ended || (t.needReadable = !0),
                    r !== e && t.ended && $(this)),
                    null !== n && this.emit("data", n),
                    n
                }
                ,
                A.prototype._read = function(e) {
                    E(this, new _("_read()"))
                }
                ,
                A.prototype.pipe = function(e, t) {
                    var n = this
                      , i = this._readableState;
                    switch (i.pipesCount) {
                    case 0:
                        i.pipes = e;
                        break;
                    case 1:
                        i.pipes = [i.pipes, e];
                        break;
                    default:
                        i.pipes.push(e)
                    }
                    i.pipesCount += 1,
                    c("pipe count=%d opts=%j", i.pipesCount, t);
                    var s = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? u : b;
                    function a(t, r) {
                        c("onunpipe"),
                        t === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0,
                        c("cleanup"),
                        e.removeListener("close", p),
                        e.removeListener("finish", g),
                        e.removeListener("drain", l),
                        e.removeListener("error", h),
                        e.removeListener("unpipe", a),
                        n.removeListener("end", u),
                        n.removeListener("end", b),
                        n.removeListener("data", d),
                        f = !0,
                        !i.awaitDrain || e._writableState && !e._writableState.needDrain || l())
                    }
                    function u() {
                        c("onend"),
                        e.end()
                    }
                    i.endEmitted ? r.nextTick(s) : n.once("end", s),
                    e.on("unpipe", a);
                    var l = function(e) {
                        return function() {
                            var t = e._readableState;
                            c("pipeOnDrain", t.awaitDrain),
                            t.awaitDrain && t.awaitDrain--,
                            0 === t.awaitDrain && o(e, "data") && (t.flowing = !0,
                            D(e))
                        }
                    }(n);
                    e.on("drain", l);
                    var f = !1;
                    function d(t) {
                        c("ondata");
                        var r = e.write(t);
                        c("dest.write", r),
                        !1 === r && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== W(i.pipes, e)) && !f && (c("false write response, pause", i.awaitDrain),
                        i.awaitDrain++),
                        n.pause())
                    }
                    function h(t) {
                        c("onerror", t),
                        b(),
                        e.removeListener("error", h),
                        0 === o(e, "error") && E(e, t)
                    }
                    function p() {
                        e.removeListener("finish", g),
                        b()
                    }
                    function g() {
                        c("onfinish"),
                        e.removeListener("close", p),
                        b()
                    }
                    function b() {
                        c("unpipe"),
                        n.unpipe(e)
                    }
                    return n.on("data", d),
                    function(e, t, r) {
                        if ("function" == typeof e.prependListener)
                            return e.prependListener(t, r);
                        e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                    }(e, "error", h),
                    e.once("close", p),
                    e.once("finish", g),
                    e.emit("pipe", n),
                    i.flowing || (c("pipe resume"),
                    n.resume()),
                    e
                }
                ,
                A.prototype.unpipe = function(e) {
                    var t = this._readableState
                      , r = {
                        hasUnpiped: !1
                    };
                    if (0 === t.pipesCount)
                        return this;
                    if (1 === t.pipesCount)
                        return e && e !== t.pipes || (e || (e = t.pipes),
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1,
                        e && e.emit("unpipe", this, r)),
                        this;
                    if (!e) {
                        var n = t.pipes
                          , i = t.pipesCount;
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1;
                        for (var o = 0; o < i; o++)
                            n[o].emit("unpipe", this, {
                                hasUnpiped: !1
                            });
                        return this
                    }
                    var s = W(t.pipes, e);
                    return -1 === s || (t.pipes.splice(s, 1),
                    t.pipesCount -= 1,
                    1 === t.pipesCount && (t.pipes = t.pipes[0]),
                    e.emit("unpipe", this, r)),
                    this
                }
                ,
                A.prototype.on = function(e, t) {
                    var n = s.prototype.on.call(this, e, t)
                      , i = this._readableState;
                    return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0,
                    !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0,
                    i.flowing = !1,
                    i.emittedReadable = !1,
                    c("on readable", i.length, i.reading),
                    i.length ? O(this) : i.reading || r.nextTick(k, this))),
                    n
                }
                ,
                A.prototype.addListener = A.prototype.on,
                A.prototype.removeListener = function(e, t) {
                    var n = s.prototype.removeListener.call(this, e, t);
                    return "readable" === e && r.nextTick(P, this),
                    n
                }
                ,
                A.prototype.removeAllListeners = function(e) {
                    var t = s.prototype.removeAllListeners.apply(this, arguments);
                    return "readable" !== e && void 0 !== e || r.nextTick(P, this),
                    t
                }
                ,
                A.prototype.resume = function() {
                    var e = this._readableState;
                    return e.flowing || (c("resume"),
                    e.flowing = !e.readableListening,
                    function(e, t) {
                        t.resumeScheduled || (t.resumeScheduled = !0,
                        r.nextTick(L, e, t))
                    }(this, e)),
                    e.paused = !1,
                    this
                }
                ,
                A.prototype.pause = function() {
                    return c("call pause flowing=%j", this._readableState.flowing),
                    !1 !== this._readableState.flowing && (c("pause"),
                    this._readableState.flowing = !1,
                    this.emit("pause")),
                    this._readableState.paused = !0,
                    this
                }
                ,
                A.prototype.wrap = function(e) {
                    var t = this
                      , r = this._readableState
                      , n = !1;
                    for (var i in e.on("end", function() {
                        if (c("wrapped end"),
                        r.decoder && !r.ended) {
                            var e = r.decoder.end();
                            e && e.length && t.push(e)
                        }
                        t.push(null)
                    }),
                    e.on("data", function(i) {
                        (c("wrapped data"),
                        r.decoder && (i = r.decoder.write(i)),
                        r.objectMode && null == i) || (r.objectMode || i && i.length) && (t.push(i) || (n = !0,
                        e.pause()))
                    }),
                    e)
                        void 0 === this[i] && "function" == typeof e[i] && (this[i] = function(t) {
                            return function() {
                                return e[t].apply(e, arguments)
                            }
                        }(i));
                    for (var o = 0; o < S.length; o++)
                        e.on(S[o], this.emit.bind(this, S[o]));
                    return this._read = function(t) {
                        c("wrapped _read", t),
                        n && (n = !1,
                        e.resume())
                    }
                    ,
                    this
                }
                ,
                "function" == typeof Symbol && (A.prototype[Symbol.asyncIterator] = function() {
                    return void 0 === d && (d = e("./internal/streams/async_iterator")),
                    d(this)
                }
                ),
                Object.defineProperty(A.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.highWaterMark
                    }
                }),
                Object.defineProperty(A.prototype, "readableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState && this._readableState.buffer
                    }
                }),
                Object.defineProperty(A.prototype, "readableFlowing", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.flowing
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.flowing = e)
                    }
                }),
                A._fromList = U,
                Object.defineProperty(A.prototype, "readableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.length
                    }
                }),
                "function" == typeof Symbol && (A.from = function(t, r) {
                    return void 0 === h && (h = e("./internal/streams/from")),
                    h(A, t, r)
                }
                )
            }
            ).call(this)
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../errors": 65,
        "./_stream_duplex": 66,
        "./internal/streams/async_iterator": 71,
        "./internal/streams/buffer_list": 72,
        "./internal/streams/destroy": 73,
        "./internal/streams/from": 75,
        "./internal/streams/state": 77,
        "./internal/streams/stream": 78,
        _process: 195,
        buffer: 176,
        events: 181,
        inherits: 185,
        "string_decoder/": 267,
        util: 175
    }],
    69: [function(e, t, r) {
        arguments[4][21][0].apply(r, arguments)
    }
    , {
        "../errors": 65,
        "./_stream_duplex": 66,
        dup: 21,
        inherits: 185
    }],
    70: [function(e, t, r) {
        (function(r, n) {
            (function() {
                "use strict";
                function i(e) {
                    var t = this;
                    this.next = null,
                    this.entry = null,
                    this.finish = function() {
                        !function(e, t, r) {
                            var n = e.entry;
                            e.entry = null;
                            for (; n; ) {
                                var i = n.callback;
                                t.pendingcb--,
                                i(r),
                                n = n.next
                            }
                            t.corkedRequestsFree.next = e
                        }(t, e)
                    }
                }
                var o;
                t.exports = A,
                A.WritableState = M;
                var s = {
                    deprecate: e("util-deprecate")
                }
                  , a = e("./internal/streams/stream")
                  , u = e("buffer").Buffer
                  , c = (void 0 !== n ? n : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {}
                ;
                var l, f = e("./internal/streams/destroy"), d = e("./internal/streams/state").getHighWaterMark, h = e("../errors").codes, p = h.ERR_INVALID_ARG_TYPE, g = h.ERR_METHOD_NOT_IMPLEMENTED, b = h.ERR_MULTIPLE_CALLBACK, y = h.ERR_STREAM_CANNOT_PIPE, m = h.ERR_STREAM_DESTROYED, w = h.ERR_STREAM_NULL_VALUES, _ = h.ERR_STREAM_WRITE_AFTER_END, v = h.ERR_UNKNOWN_ENCODING, E = f.errorOrDestroy;
                function S() {}
                function M(t, n, s) {
                    o = o || e("./_stream_duplex"),
                    t = t || {},
                    "boolean" != typeof s && (s = n instanceof o),
                    this.objectMode = !!t.objectMode,
                    s && (this.objectMode = this.objectMode || !!t.writableObjectMode),
                    this.highWaterMark = d(this, t, "writableHighWaterMark", s),
                    this.finalCalled = !1,
                    this.needDrain = !1,
                    this.ending = !1,
                    this.ended = !1,
                    this.finished = !1,
                    this.destroyed = !1;
                    var a = !1 === t.decodeStrings;
                    this.decodeStrings = !a,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.length = 0,
                    this.writing = !1,
                    this.corked = 0,
                    this.sync = !0,
                    this.bufferProcessing = !1,
                    this.onwrite = function(e) {
                        !function(e, t) {
                            var n = e._writableState
                              , i = n.sync
                              , o = n.writecb;
                            if ("function" != typeof o)
                                throw new b;
                            if (function(e) {
                                e.writing = !1,
                                e.writecb = null,
                                e.length -= e.writelen,
                                e.writelen = 0
                            }(n),
                            t)
                                !function(e, t, n, i, o) {
                                    --t.pendingcb,
                                    n ? (r.nextTick(o, i),
                                    r.nextTick(C, e, t),
                                    e._writableState.errorEmitted = !0,
                                    E(e, i)) : (o(i),
                                    e._writableState.errorEmitted = !0,
                                    E(e, i),
                                    C(e, t))
                                }(e, n, i, t, o);
                            else {
                                var s = T(n) || e.destroyed;
                                s || n.corked || n.bufferProcessing || !n.bufferedRequest || I(e, n),
                                i ? r.nextTick(R, e, n, s, o) : R(e, n, s, o)
                            }
                        }(n, e)
                    }
                    ,
                    this.writecb = null,
                    this.writelen = 0,
                    this.bufferedRequest = null,
                    this.lastBufferedRequest = null,
                    this.pendingcb = 0,
                    this.prefinished = !1,
                    this.errorEmitted = !1,
                    this.emitClose = !1 !== t.emitClose,
                    this.autoDestroy = !!t.autoDestroy,
                    this.bufferedRequestCount = 0,
                    this.corkedRequestsFree = new i(this)
                }
                function A(t) {
                    var r = this instanceof (o = o || e("./_stream_duplex"));
                    if (!r && !l.call(A, this))
                        return new A(t);
                    this._writableState = new M(t,this,r),
                    this.writable = !0,
                    t && ("function" == typeof t.write && (this._write = t.write),
                    "function" == typeof t.writev && (this._writev = t.writev),
                    "function" == typeof t.destroy && (this._destroy = t.destroy),
                    "function" == typeof t.final && (this._final = t.final)),
                    a.call(this)
                }
                function j(e, t, r, n, i, o, s) {
                    t.writelen = n,
                    t.writecb = s,
                    t.writing = !0,
                    t.sync = !0,
                    t.destroyed ? t.onwrite(new m("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite),
                    t.sync = !1
                }
                function R(e, t, r, n) {
                    r || function(e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1,
                        e.emit("drain"))
                    }(e, t),
                    t.pendingcb--,
                    n(),
                    C(e, t)
                }
                function I(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var n = t.bufferedRequestCount
                          , o = new Array(n)
                          , s = t.corkedRequestsFree;
                        s.entry = r;
                        for (var a = 0, u = !0; r; )
                            o[a] = r,
                            r.isBuf || (u = !1),
                            r = r.next,
                            a += 1;
                        o.allBuffers = u,
                        j(e, t, !0, t.length, o, "", s.finish),
                        t.pendingcb++,
                        t.lastBufferedRequest = null,
                        s.next ? (t.corkedRequestsFree = s.next,
                        s.next = null) : t.corkedRequestsFree = new i(t),
                        t.bufferedRequestCount = 0
                    } else {
                        for (; r; ) {
                            var c = r.chunk
                              , l = r.encoding
                              , f = r.callback;
                            if (j(e, t, !1, t.objectMode ? 1 : c.length, c, l, f),
                            r = r.next,
                            t.bufferedRequestCount--,
                            t.writing)
                                break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = r,
                    t.bufferProcessing = !1
                }
                function T(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }
                function O(e, t) {
                    e._final(function(r) {
                        t.pendingcb--,
                        r && E(e, r),
                        t.prefinished = !0,
                        e.emit("prefinish"),
                        C(e, t)
                    })
                }
                function C(e, t) {
                    var n = T(t);
                    if (n && (function(e, t) {
                        t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0,
                        e.emit("prefinish")) : (t.pendingcb++,
                        t.finalCalled = !0,
                        r.nextTick(O, e, t)))
                    }(e, t),
                    0 === t.pendingcb && (t.finished = !0,
                    e.emit("finish"),
                    t.autoDestroy))) {
                        var i = e._readableState;
                        (!i || i.autoDestroy && i.endEmitted) && e.destroy()
                    }
                    return n
                }
                e("inherits")(A, a),
                M.prototype.getBuffer = function() {
                    for (var e = this.bufferedRequest, t = []; e; )
                        t.push(e),
                        e = e.next;
                    return t
                }
                ,
                function() {
                    try {
                        Object.defineProperty(M.prototype, "buffer", {
                            get: s.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                        })
                    } catch (e) {}
                }(),
                "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (l = Function.prototype[Symbol.hasInstance],
                Object.defineProperty(A, Symbol.hasInstance, {
                    value: function(e) {
                        return !!l.call(this, e) || this === A && (e && e._writableState instanceof M)
                    }
                })) : l = function(e) {
                    return e instanceof this
                }
                ,
                A.prototype.pipe = function() {
                    E(this, new y)
                }
                ,
                A.prototype.write = function(e, t, n) {
                    var i, o = this._writableState, s = !1, a = !o.objectMode && (i = e,
                    u.isBuffer(i) || i instanceof c);
                    return a && !u.isBuffer(e) && (e = function(e) {
                        return u.from(e)
                    }(e)),
                    "function" == typeof t && (n = t,
                    t = null),
                    a ? t = "buffer" : t || (t = o.defaultEncoding),
                    "function" != typeof n && (n = S),
                    o.ending ? function(e, t) {
                        var n = new _;
                        E(e, n),
                        r.nextTick(t, n)
                    }(this, n) : (a || function(e, t, n, i) {
                        var o;
                        return null === n ? o = new w : "string" == typeof n || t.objectMode || (o = new p("chunk",["string", "Buffer"],n)),
                        !o || (E(e, o),
                        r.nextTick(i, o),
                        !1)
                    }(this, o, e, n)) && (o.pendingcb++,
                    s = function(e, t, r, n, i, o) {
                        if (!r) {
                            var s = function(e, t, r) {
                                e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = u.from(t, r));
                                return t
                            }(t, n, i);
                            n !== s && (r = !0,
                            i = "buffer",
                            n = s)
                        }
                        var a = t.objectMode ? 1 : n.length;
                        t.length += a;
                        var c = t.length < t.highWaterMark;
                        c || (t.needDrain = !0);
                        if (t.writing || t.corked) {
                            var l = t.lastBufferedRequest;
                            t.lastBufferedRequest = {
                                chunk: n,
                                encoding: i,
                                isBuf: r,
                                callback: o,
                                next: null
                            },
                            l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest,
                            t.bufferedRequestCount += 1
                        } else
                            j(e, t, !1, a, n, i, o);
                        return c
                    }(this, o, a, e, t, n)),
                    s
                }
                ,
                A.prototype.cork = function() {
                    this._writableState.corked++
                }
                ,
                A.prototype.uncork = function() {
                    var e = this._writableState;
                    e.corked && (e.corked--,
                    e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || I(this, e))
                }
                ,
                A.prototype.setDefaultEncoding = function(e) {
                    if ("string" == typeof e && (e = e.toLowerCase()),
                    !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1))
                        throw new v(e);
                    return this._writableState.defaultEncoding = e,
                    this
                }
                ,
                Object.defineProperty(A.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }),
                Object.defineProperty(A.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                A.prototype._write = function(e, t, r) {
                    r(new g("_write()"))
                }
                ,
                A.prototype._writev = null,
                A.prototype.end = function(e, t, n) {
                    var i = this._writableState;
                    return "function" == typeof e ? (n = e,
                    e = null,
                    t = null) : "function" == typeof t && (n = t,
                    t = null),
                    null != e && this.write(e, t),
                    i.corked && (i.corked = 1,
                    this.uncork()),
                    i.ending || function(e, t, n) {
                        t.ending = !0,
                        C(e, t),
                        n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                        t.ended = !0,
                        e.writable = !1
                    }(this, i, n),
                    this
                }
                ,
                Object.defineProperty(A.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }),
                Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }),
                A.prototype.destroy = f.destroy,
                A.prototype._undestroy = f.undestroy,
                A.prototype._destroy = function(e, t) {
                    t(e)
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../errors": 65,
        "./_stream_duplex": 66,
        "./internal/streams/destroy": 73,
        "./internal/streams/state": 77,
        "./internal/streams/stream": 78,
        _process: 195,
        buffer: 176,
        inherits: 185,
        "util-deprecate": 268
    }],
    71: [function(e, t, r) {
        (function(r) {
            (function() {
                "use strict";
                var n;
                function i(e, t, r) {
                    return (t = function(e) {
                        var t = function(e, t) {
                            if ("object" != typeof e || null === e)
                                return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != typeof n)
                                    return n;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == typeof t ? t : String(t)
                    }(t))in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r,
                    e
                }
                var o = e("./end-of-stream")
                  , s = Symbol("lastResolve")
                  , a = Symbol("lastReject")
                  , u = Symbol("error")
                  , c = Symbol("ended")
                  , l = Symbol("lastPromise")
                  , f = Symbol("handlePromise")
                  , d = Symbol("stream");
                function h(e, t) {
                    return {
                        value: e,
                        done: t
                    }
                }
                function p(e) {
                    var t = e[s];
                    if (null !== t) {
                        var r = e[d].read();
                        null !== r && (e[l] = null,
                        e[s] = null,
                        e[a] = null,
                        t(h(r, !1)))
                    }
                }
                function g(e) {
                    r.nextTick(p, e)
                }
                var b = Object.getPrototypeOf(function() {})
                  , y = Object.setPrototypeOf((i(n = {
                    get stream() {
                        return this[d]
                    },
                    next: function() {
                        var e = this
                          , t = this[u];
                        if (null !== t)
                            return Promise.reject(t);
                        if (this[c])
                            return Promise.resolve(h(void 0, !0));
                        if (this[d].destroyed)
                            return new Promise(function(t, n) {
                                r.nextTick(function() {
                                    e[u] ? n(e[u]) : t(h(void 0, !0))
                                })
                            }
                            );
                        var n, i = this[l];
                        if (i)
                            n = new Promise(function(e, t) {
                                return function(r, n) {
                                    e.then(function() {
                                        t[c] ? r(h(void 0, !0)) : t[f](r, n)
                                    }, n)
                                }
                            }(i, this));
                        else {
                            var o = this[d].read();
                            if (null !== o)
                                return Promise.resolve(h(o, !1));
                            n = new Promise(this[f])
                        }
                        return this[l] = n,
                        n
                    }
                }, Symbol.asyncIterator, function() {
                    return this
                }),
                i(n, "return", function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e[d].destroy(null, function(e) {
                            e ? r(e) : t(h(void 0, !0))
                        })
                    }
                    )
                }),
                n), b);
                t.exports = function(e) {
                    var t, r = Object.create(y, (i(t = {}, d, {
                        value: e,
                        writable: !0
                    }),
                    i(t, s, {
                        value: null,
                        writable: !0
                    }),
                    i(t, a, {
                        value: null,
                        writable: !0
                    }),
                    i(t, u, {
                        value: null,
                        writable: !0
                    }),
                    i(t, c, {
                        value: e._readableState.endEmitted,
                        writable: !0
                    }),
                    i(t, f, {
                        value: function(e, t) {
                            var n = r[d].read();
                            n ? (r[l] = null,
                            r[s] = null,
                            r[a] = null,
                            e(h(n, !1))) : (r[s] = e,
                            r[a] = t)
                        },
                        writable: !0
                    }),
                    t));
                    return r[l] = null,
                    o(e, function(e) {
                        if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                            var t = r[a];
                            return null !== t && (r[l] = null,
                            r[s] = null,
                            r[a] = null,
                            t(e)),
                            void (r[u] = e)
                        }
                        var n = r[s];
                        null !== n && (r[l] = null,
                        r[s] = null,
                        r[a] = null,
                        n(h(void 0, !0))),
                        r[c] = !0
                    }),
                    e.on("readable", g.bind(null, r)),
                    r
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./end-of-stream": 74,
        _process: 195
    }],
    72: [function(e, t, r) {
        arguments[4][24][0].apply(r, arguments)
    }
    , {
        buffer: 176,
        dup: 24,
        util: 175
    }],
    73: [function(e, t, r) {
        (function(e) {
            (function() {
                "use strict";
                function r(e, t) {
                    i(e, t),
                    n(e)
                }
                function n(e) {
                    e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
                }
                function i(e, t) {
                    e.emit("error", t)
                }
                t.exports = {
                    destroy: function(t, o) {
                        var s = this
                          , a = this._readableState && this._readableState.destroyed
                          , u = this._writableState && this._writableState.destroyed;
                        return a || u ? (o ? o(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0,
                        e.nextTick(i, this, t)) : e.nextTick(i, this, t)),
                        this) : (this._readableState && (this._readableState.destroyed = !0),
                        this._writableState && (this._writableState.destroyed = !0),
                        this._destroy(t || null, function(t) {
                            !o && t ? s._writableState ? s._writableState.errorEmitted ? e.nextTick(n, s) : (s._writableState.errorEmitted = !0,
                            e.nextTick(r, s, t)) : e.nextTick(r, s, t) : o ? (e.nextTick(n, s),
                            o(t)) : e.nextTick(n, s)
                        }),
                        this)
                    },
                    undestroy: function() {
                        this._readableState && (this._readableState.destroyed = !1,
                        this._readableState.reading = !1,
                        this._readableState.ended = !1,
                        this._readableState.endEmitted = !1),
                        this._writableState && (this._writableState.destroyed = !1,
                        this._writableState.ended = !1,
                        this._writableState.ending = !1,
                        this._writableState.finalCalled = !1,
                        this._writableState.prefinished = !1,
                        this._writableState.finished = !1,
                        this._writableState.errorEmitted = !1)
                    },
                    errorOrDestroy: function(e, t) {
                        var r = e._readableState
                          , n = e._writableState;
                        r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t)
                    }
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 195
    }],
    74: [function(e, t, r) {
        arguments[4][26][0].apply(r, arguments)
    }
    , {
        "../../../errors": 65,
        dup: 26
    }],
    75: [function(e, t, r) {
        arguments[4][27][0].apply(r, arguments)
    }
    , {
        dup: 27
    }],
    76: [function(e, t, r) {
        arguments[4][28][0].apply(r, arguments)
    }
    , {
        "../../../errors": 65,
        "./end-of-stream": 74,
        dup: 28
    }],
    77: [function(e, t, r) {
        arguments[4][29][0].apply(r, arguments)
    }
    , {
        "../../../errors": 65,
        dup: 29
    }],
    78: [function(e, t, r) {
        arguments[4][30][0].apply(r, arguments)
    }
    , {
        dup: 30,
        events: 181
    }],
    79: [function(e, t, r) {
        arguments[4][31][0].apply(r, arguments)
    }
    , {
        "./lib/_stream_duplex.js": 66,
        "./lib/_stream_passthrough.js": 67,
        "./lib/_stream_readable.js": 68,
        "./lib/_stream_transform.js": 69,
        "./lib/_stream_writable.js": 70,
        "./lib/internal/streams/end-of-stream.js": 74,
        "./lib/internal/streams/pipeline.js": 76,
        dup: 31
    }],
    80: [function(e, t, r) {
        "use strict";
        var n, i, o = this && this.__classPrivateFieldSet || function(e, t, r, n, i) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? i.call(e, r) : i ? i.value = r : t.set(e, r),
            r
        }
        , s = this && this.__classPrivateFieldGet || function(e, t, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
        }
        , a = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.BaseProvider = void 0;
        const u = e("@metamask/json-rpc-engine")
          , c = e("@metamask/rpc-errors")
          , l = a(e("@metamask/safe-event-emitter"))
          , f = a(e("fast-deep-equal"))
          , d = a(e("./messages.cjs"))
          , h = e("./utils.cjs");
        class p extends l.default {
            constructor({logger: e=console, maxEventListeners: t=100, rpcMiddleware: r=[]}={}) {
                super(),
                n.set(this, void 0),
                i.set(this, void 0),
                this._log = e,
                this.setMaxListeners(t),
                this._state = {
                    ...p._defaultState
                },
                o(this, i, null, "f"),
                o(this, n, null, "f"),
                this._handleAccountsChanged = this._handleAccountsChanged.bind(this),
                this._handleConnect = this._handleConnect.bind(this),
                this._handleChainChanged = this._handleChainChanged.bind(this),
                this._handleDisconnect = this._handleDisconnect.bind(this),
                this._rpcRequest = this._rpcRequest.bind(this),
                this.request = this.request.bind(this);
                const s = new u.JsonRpcEngine;
                r.forEach(e => s.push(e)),
                this._rpcEngine = s
            }
            get chainId() {
                return s(this, n, "f")
            }
            get selectedAddress() {
                return s(this, i, "f")
            }
            isConnected() {
                return this._state.isConnected
            }
            async request(e) {
                if (!e || "object" != typeof e || Array.isArray(e))
                    throw c.rpcErrors.invalidRequest({
                        message: d.default.errors.invalidRequestArgs(),
                        data: e
                    });
                const {method: t, params: r} = e;
                if ("string" != typeof t || 0 === t.length)
                    throw c.rpcErrors.invalidRequest({
                        message: d.default.errors.invalidRequestMethod(),
                        data: e
                    });
                if (void 0 !== r && !Array.isArray(r) && ("object" != typeof r || null === r))
                    throw c.rpcErrors.invalidRequest({
                        message: d.default.errors.invalidRequestParams(),
                        data: e
                    });
                const n = null == r ? {
                    method: t
                } : {
                    method: t,
                    params: r
                };
                return new Promise( (e, t) => {
                    this._rpcRequest(n, (0,
                    h.getRpcPromiseCallback)(e, t))
                }
                )
            }
            _initializeState(e) {
                if (this._state.initialized)
                    throw new Error("Provider already initialized.");
                if (e) {
                    const {accounts: t, chainId: r, networkVersion: n, isConnected: i} = e;
                    this._handleConnect({
                        chainId: r,
                        isConnected: i
                    }),
                    this._handleChainChanged({
                        chainId: r,
                        networkVersion: n,
                        isConnected: i
                    }),
                    this._handleAccountsChanged(t)
                }
                this._state.initialized = !0,
                this.emit("_initialized")
            }
            _rpcRequest(e, t) {
                let r = t;
                return Array.isArray(e) || (e.jsonrpc || (e.jsonrpc = "2.0"),
                "eth_accounts" !== e.method && "eth_requestAccounts" !== e.method || (r = (r, n) => {
                    this._handleAccountsChanged(n.result ?? [], "eth_accounts" === e.method),
                    t(r, n)
                }
                )),
                this._rpcEngine.handle(e, r)
            }
            _handleConnect({chainId: e, isConnected: t}) {
                !this._state.isConnected && t && (this._state.isConnected = !0,
                this.emit("connect", {
                    chainId: e
                }),
                this._log.debug(d.default.info.connected(e)))
            }
            _handleDisconnect(e, t) {
                if (this._state.isConnected || !this._state.isPermanentlyDisconnected && !e) {
                    let r;
                    this._state.isConnected = !1,
                    e ? (r = new c.JsonRpcError(1013,t ?? d.default.errors.disconnected()),
                    this._log.debug(r)) : (r = new c.JsonRpcError(1011,t ?? d.default.errors.permanentlyDisconnected()),
                    this._log.error(r),
                    o(this, n, null, "f"),
                    this._state.accounts = null,
                    o(this, i, null, "f"),
                    this._state.isPermanentlyDisconnected = !0),
                    this.emit("disconnect", r)
                }
            }
            _handleChainChanged({chainId: e, isConnected: t}={}) {
                (0,
                h.isValidChainId)(e) ? (this._handleConnect({
                    chainId: e,
                    isConnected: t
                }),
                e !== s(this, n, "f") && (o(this, n, e, "f"),
                this._state.initialized && this.emit("chainChanged", s(this, n, "f")))) : this._log.error(d.default.errors.invalidNetworkParams(), {
                    chainId: e
                })
            }
            _handleAccountsChanged(e, t=!1) {
                let r = e;
                Array.isArray(e) || (this._log.error("MetaMask: Received invalid accounts parameter. Please report this bug.", e),
                r = []);
                for (const t of e)
                    if ("string" != typeof t) {
                        this._log.error("MetaMask: Received non-string account. Please report this bug.", e),
                        r = [];
                        break
                    }
                if (!(0,
                f.default)(this._state.accounts, r) && (t && null !== this._state.accounts && this._log.error("MetaMask: 'eth_accounts' unexpectedly updated accounts. Please report this bug.", r),
                this._state.accounts = r,
                s(this, i, "f") !== r[0] && o(this, i, r[0] || null, "f"),
                this._state.initialized)) {
                    const e = [...r];
                    this.emit("accountsChanged", e)
                }
            }
        }
        r.BaseProvider = p,
        n = new WeakMap,
        i = new WeakMap,
        p._defaultState = {
            accounts: null,
            isConnected: !1,
            initialized: !1,
            isPermanentlyDisconnected: !1
        }
    }
    , {
        "./messages.cjs": 87,
        "./utils.cjs": 91,
        "@metamask/json-rpc-engine": 9,
        "@metamask/rpc-errors": 111,
        "@metamask/safe-event-emitter": 113,
        "fast-deep-equal": 182
    }],
    81: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.CAIP294EventNames = void 0,
        r.announceWallet = function(e) {
            a(e) || u(`Invalid CAIP-294 WalletData object received from ${o.Prompt}.`);
            const t = () => window.dispatchEvent(new CustomEvent(o.Announce,{
                detail: {
                    id: 1,
                    jsonrpc: "2.0",
                    method: "wallet_announce",
                    params: e
                }
            }));
            t(),
            window.addEventListener(o.Prompt, e => {
                (function(e) {
                    return e instanceof CustomEvent && e.type === o.Prompt && (0,
                    n.isObject)(e.detail) && "wallet_prompt" === e.detail.method && function(e) {
                        const t = void 0 === e.chains || Array.isArray(e.chains) && e.chains.every(e => "string" == typeof e)
                          , r = void 0 === e.authName || "string" == typeof e.authName;
                        return t && r
                    }(e.detail.params)
                }
                )(e) || u(`Invalid CAIP-294 RequestWalletEvent object received from ${o.Prompt}.`),
                t()
            }
            )
        }
        ,
        r.requestWallet = function(e) {
            window.addEventListener(o.Announce, t => {
                (function(e) {
                    return e instanceof CustomEvent && e.type === o.Announce && (0,
                    n.isObject)(e.detail) && "wallet_announce" === e.detail.method && a(e.detail.params)
                }
                )(t) || u(`Invalid CAIP-294 WalletData object received from ${o.Announce}.`),
                e(t.detail)
            }
            ),
            window.dispatchEvent(new CustomEvent(o.Prompt,{
                detail: {
                    id: 1,
                    jsonrpc: "2.0",
                    method: "wallet_prompt",
                    params: {}
                }
            }))
        }
        ;
        const n = e("@metamask/utils")
          , i = e("./utils.cjs");
        var o;
        function s(e) {
            return (0,
            n.isObject)(e) && "string" == typeof e.type && Boolean(e.type)
        }
        function a(e) {
            return (0,
            n.isObject)(e) && "string" == typeof e.uuid && i.UUID_V4_REGEX.test(e.uuid) && "string" == typeof e.name && Boolean(e.name) && "string" == typeof e.icon && e.icon.startsWith("data:image") && "string" == typeof e.rdns && i.FQDN_REGEX.test(e.rdns) && (void 0 === e.targets || Array.isArray(e.targets) && e.targets.every(s))
        }
        function u(e) {
            throw new Error(`${e} See https://github.com/ChainAgnostic/CAIPs/blob/bc4942857a8e04593ed92f7dc66653577a1c4435/CAIPs/caip-294.md for requirements.`)
        }
        !function(e) {
            e.Announce = "caip294:wallet_announce",
            e.Prompt = "caip294:wallet_prompt"
        }(o || (r.CAIP294EventNames = o = {}))
    }
    , {
        "./utils.cjs": 91,
        "@metamask/utils": 138
    }],
    82: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.requestProvider = function(e) {
            window.addEventListener(o.Announce, t => {
                (function(e) {
                    return e instanceof CustomEvent && e.type === o.Announce && Object.isFrozen(e.detail) && s(e.detail)
                }
                )(t) || a(`Invalid EIP-6963 AnnounceProviderEvent object received from ${o.Announce} event.`),
                e(t.detail)
            }
            ),
            window.dispatchEvent(new Event(o.Request))
        }
        ,
        r.announceProvider = function(e) {
            s(e) || a("Invalid EIP-6963 ProviderDetail object.");
            const {info: t, provider: r} = e
              , n = () => window.dispatchEvent(new CustomEvent(o.Announce,{
                detail: Object.freeze({
                    info: {
                        ...t
                    },
                    provider: r
                })
            }));
            n(),
            window.addEventListener(o.Request, e => {
                (function(e) {
                    return e instanceof Event && e.type === o.Request
                }
                )(e) || a(`Invalid EIP-6963 RequestProviderEvent object received from ${o.Request} event.`),
                n()
            }
            )
        }
        ;
        const n = e("@metamask/utils")
          , i = e("./utils.cjs");
        var o;
        function s(e) {
            if (!(0,
            n.isObject)(e) || !(0,
            n.isObject)(e.info) || !(0,
            n.isObject)(e.provider))
                return !1;
            const {info: t} = e;
            return "string" == typeof t.uuid && i.UUID_V4_REGEX.test(t.uuid) && "string" == typeof t.name && Boolean(t.name) && "string" == typeof t.icon && t.icon.startsWith("data:image") && "string" == typeof t.rdns && i.FQDN_REGEX.test(t.rdns)
        }
        function a(e) {
            throw new Error(`${e} See https://eips.ethereum.org/EIPS/eip-6963 for requirements.`)
        }
        !function(e) {
            e.Announce = "eip6963:announceProvider",
            e.Request = "eip6963:requestProvider"
        }(o || (o = {}))
    }
    , {
        "./utils.cjs": 91,
        "@metamask/utils": 138
    }],
    83: [function(e, t, r) {
        "use strict";
        var n, i = this && this.__classPrivateFieldSet || function(e, t, r, n, i) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? i.call(e, r) : i ? i.value = r : t.set(e, r),
            r
        }
        , o = this && this.__classPrivateFieldGet || function(e, t, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
        }
        , s = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.MetaMaskInpageProvider = r.MetaMaskInpageProviderStreamName = void 0;
        const a = e("@metamask/rpc-errors")
          , u = s(e("./messages.cjs"))
          , c = e("./siteMetadata.cjs")
          , l = e("./StreamProvider.cjs")
          , f = e("./utils.cjs");
        r.MetaMaskInpageProviderStreamName = "metamask-provider";
        class d extends l.AbstractStreamProvider {
            constructor(e, {logger: t=console, maxEventListeners: r=100, shouldSendMetadata: o}={}) {
                if (super(e, {
                    logger: t,
                    maxEventListeners: r,
                    rpcMiddleware: (0,
                    f.getDefaultExternalMiddleware)(t)
                }),
                this._sentWarnings = {
                    enable: !1,
                    experimentalMethods: !1,
                    send: !1,
                    events: {
                        close: !1,
                        data: !1,
                        networkChanged: !1,
                        notification: !1
                    }
                },
                n.set(this, void 0),
                this._initializeStateAsync(),
                i(this, n, null, "f"),
                this.isMetaMask = !0,
                this._sendSync = this._sendSync.bind(this),
                this.enable = this.enable.bind(this),
                this.send = this.send.bind(this),
                this.sendAsync = this.sendAsync.bind(this),
                this._warnOfDeprecation = this._warnOfDeprecation.bind(this),
                this._metamask = this._getExperimentalApi(),
                this._jsonRpcConnection.events.on("notification", e => {
                    const {method: t} = e;
                    f.EMITTED_NOTIFICATIONS.includes(t) && (this.emit("data", e),
                    this.emit("notification", e.params.result))
                }
                ),
                o)
                    if ("complete" === document.readyState)
                        (0,
                        c.sendSiteMetadata)(this._rpcEngine, this._log);
                    else {
                        const e = () => {
                            (0,
                            c.sendSiteMetadata)(this._rpcEngine, this._log),
                            window.removeEventListener("DOMContentLoaded", e)
                        }
                        ;
                        window.addEventListener("DOMContentLoaded", e)
                    }
            }
            get chainId() {
                return super.chainId
            }
            get networkVersion() {
                return o(this, n, "f")
            }
            get selectedAddress() {
                return super.selectedAddress
            }
            sendAsync(e, t) {
                this._rpcRequest(e, t)
            }
            addListener(e, t) {
                return this._warnOfDeprecation(e),
                super.addListener(e, t)
            }
            on(e, t) {
                return this._warnOfDeprecation(e),
                super.on(e, t)
            }
            once(e, t) {
                return this._warnOfDeprecation(e),
                super.once(e, t)
            }
            prependListener(e, t) {
                return this._warnOfDeprecation(e),
                super.prependListener(e, t)
            }
            prependOnceListener(e, t) {
                return this._warnOfDeprecation(e),
                super.prependOnceListener(e, t)
            }
            _handleDisconnect(e, t) {
                super._handleDisconnect(e, t),
                o(this, n, "f") && !e && i(this, n, null, "f")
            }
            _warnOfDeprecation(e) {
                !1 === this._sentWarnings?.events[e] && (this._log.warn(u.default.warnings.events[e]),
                this._sentWarnings.events[e] = !0)
            }
            async enable() {
                return this._sentWarnings.enable || (this._log.warn(u.default.warnings.enableDeprecation),
                this._sentWarnings.enable = !0),
                new Promise( (e, t) => {
                    try {
                        this._rpcRequest({
                            method: "eth_requestAccounts",
                            params: []
                        }, (0,
                        f.getRpcPromiseCallback)(e, t))
                    } catch (e) {
                        t(e)
                    }
                }
                )
            }
            send(e, t) {
                return this._sentWarnings.send || (this._log.warn(u.default.warnings.sendDeprecation),
                this._sentWarnings.send = !0),
                "string" != typeof e || t && !Array.isArray(t) ? e && "object" == typeof e && "function" == typeof t ? this._rpcRequest(e, t) : this._sendSync(e) : new Promise( (r, n) => {
                    try {
                        this._rpcRequest({
                            method: e,
                            params: t
                        }, (0,
                        f.getRpcPromiseCallback)(r, n, !1))
                    } catch (e) {
                        n(e)
                    }
                }
                )
            }
            _sendSync(e) {
                let t;
                switch (e.method) {
                case "eth_accounts":
                    t = this.selectedAddress ? [this.selectedAddress] : [];
                    break;
                case "eth_coinbase":
                    t = this.selectedAddress ?? null;
                    break;
                case "eth_uninstallFilter":
                    this._rpcRequest(e, f.NOOP),
                    t = !0;
                    break;
                case "net_version":
                    t = o(this, n, "f") ?? null;
                    break;
                default:
                    throw new Error(u.default.errors.unsupportedSync(e.method))
                }
                return {
                    id: e.id,
                    jsonrpc: e.jsonrpc,
                    result: t
                }
            }
            _getExperimentalApi() {
                return new Proxy({
                    isUnlocked: async () => !this._state.isPermanentlyDisconnected,
                    requestBatch: async e => {
                        if (!Array.isArray(e))
                            throw a.rpcErrors.invalidRequest({
                                message: "Batch requests must be made with an array of request objects.",
                                data: e
                            });
                        return new Promise( (t, r) => {
                            this._rpcRequest(e, (0,
                            f.getRpcPromiseCallback)(t, r))
                        }
                        )
                    }
                },{
                    get: (e, t, ...r) => (this._sentWarnings.experimentalMethods || (this._log.warn(u.default.warnings.experimentalMethods),
                    this._sentWarnings.experimentalMethods = !0),
                    Reflect.get(e, t, ...r))
                })
            }
            _handleChainChanged({chainId: e, networkVersion: t, isConnected: r}={}) {
                super._handleChainChanged({
                    chainId: e,
                    networkVersion: t,
                    isConnected: r
                });
                const s = "loading" === t ? null : t;
                s !== o(this, n, "f") && (i(this, n, s, "f"),
                this._state.initialized && this.emit("networkChanged", o(this, n, "f")))
            }
        }
        r.MetaMaskInpageProvider = d,
        n = new WeakMap
    }
    , {
        "./StreamProvider.cjs": 84,
        "./messages.cjs": 87,
        "./siteMetadata.cjs": 90,
        "./utils.cjs": 91,
        "@metamask/rpc-errors": 111
    }],
    84: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.StreamProvider = r.AbstractStreamProvider = void 0;
        const i = e("@metamask/json-rpc-middleware-stream")
          , o = e("is-stream/index.js")
          , s = e("readable-stream")
          , a = e("./BaseProvider.cjs")
          , u = n(e("./messages.cjs"))
          , c = e("./utils.cjs");
        class l extends a.BaseProvider {
            constructor(e, {logger: t=console, maxEventListeners: r=100, rpcMiddleware: n=[]}={}) {
                if (super({
                    logger: t,
                    maxEventListeners: r,
                    rpcMiddleware: n
                }),
                !(0,
                o.duplex)(e))
                    throw new Error(u.default.errors.invalidDuplexStream());
                this._handleStreamDisconnect = this._handleStreamDisconnect.bind(this),
                this._jsonRpcConnection = (0,
                i.createStreamMiddleware)({
                    retryOnMessage: "METAMASK_EXTENSION_CONNECT_CAN_RETRY"
                }),
                (0,
                s.pipeline)(e, this._jsonRpcConnection.stream, e, this._handleStreamDisconnect.bind(this, "MetaMask RpcProvider")),
                this._rpcEngine.push(this._jsonRpcConnection.middleware),
                this._jsonRpcConnection.events.on("notification", t => {
                    const {method: r, params: n} = t;
                    "metamask_accountsChanged" === r ? this._handleAccountsChanged(n) : "metamask_chainChanged" === r ? this._handleChainChanged(n) : c.EMITTED_NOTIFICATIONS.includes(r) ? this.emit("message", {
                        type: r,
                        data: n
                    }) : "METAMASK_STREAM_FAILURE" === r && e.destroy(new Error(u.default.errors.permanentlyDisconnected()))
                }
                )
            }
            async _initializeStateAsync() {
                let e;
                try {
                    e = await this.request({
                        method: "metamask_getProviderState",
                        params: {
                            isInitializingStreamProvider: !0
                        }
                    })
                } catch (e) {
                    this._log.error("MetaMask: Failed to get initial state. Please report this bug.", e)
                }
                this._initializeState(e)
            }
            _handleStreamDisconnect(e, t) {
                let r = `MetaMask: Lost connection to "${e}".`;
                t?.stack && (r += `\n${t.stack}`),
                this._log.warn(r),
                this.listenerCount("error") > 0 && this.emit("error", r),
                this._handleDisconnect(!1, t ? t.message : void 0)
            }
            _handleChainChanged({chainId: e, networkVersion: t, isConnected: r}={}) {
                (0,
                c.isValidChainId)(e) && (0,
                c.isValidNetworkVersion)(t) ? (super._handleChainChanged({
                    chainId: e,
                    isConnected: r
                }),
                r || this._handleDisconnect(!0)) : this._log.error(u.default.errors.invalidNetworkParams(), {
                    chainId: e,
                    networkVersion: t
                })
            }
        }
        r.AbstractStreamProvider = l;
        r.StreamProvider = class extends l {
            async initialize() {
                return this._initializeStateAsync()
            }
        }
    }
    , {
        "./BaseProvider.cjs": 80,
        "./messages.cjs": 87,
        "./utils.cjs": 91,
        "@metamask/json-rpc-middleware-stream": 16,
        "is-stream/index.js": 186,
        "readable-stream": 107
    }],
    85: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.ERC20 = r.ERC1155 = r.ERC721 = void 0,
        r.ERC721 = "ERC721",
        r.ERC1155 = "ERC1155",
        r.ERC20 = "ERC20"
    }
    , {}],
    86: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.initializeProvider = function({connectionStream: e, logger: t=console, maxEventListeners: r=100, providerInfo: n, shouldSendMetadata: c=!0, shouldSetOnWindow: l=!0, shouldShimWeb3: f=!1, shouldAnnounceCaip294: d=!0}) {
            const h = new o.MetaMaskInpageProvider(e,{
                logger: t,
                maxEventListeners: r,
                shouldSendMetadata: c
            })
              , p = new Proxy(h,{
                deleteProperty: () => !0,
                get: (e, t) => e[t]
            });
            n && ((0,
            i.announceProvider)({
                info: n,
                provider: p
            }),
            d && u(h, n));
            l && a(p);
            f && (0,
            s.shimWeb3)(p, t);
            return p
        }
        ,
        r.setGlobalProvider = a,
        r.announceCaip294WalletData = u;
        const n = e("./CAIP294.cjs")
          , i = e("./EIP6963.cjs")
          , o = e("./MetaMaskInpageProvider.cjs")
          , s = e("./shimWeb3.cjs");
        function a(e) {
            try {
                window.ethereum = e,
                window.dispatchEvent(new Event("ethereum#initialized"))
            } catch (e) {
                console.error("MetaMask encountered an error setting the global Ethereum provider - this is likely due to another Ethereum wallet extension also setting the global Ethereum provider:", e)
            }
        }
        async function u(e, t) {
            const r = await e.request({
                method: "metamask_getProviderState"
            })
              , i = []
              , o = r?.extensionId;
            o && i.push({
                type: "caip-348",
                value: o
            });
            const s = {
                ...t,
                targets: i
            };
            (0,
            n.announceWallet)(s)
        }
    }
    , {
        "./CAIP294.cjs": 81,
        "./EIP6963.cjs": 82,
        "./MetaMaskInpageProvider.cjs": 83,
        "./shimWeb3.cjs": 89
    }],
    87: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        const n = {
            errors: {
                disconnected: () => "MetaMask: Disconnected from chain. Attempting to connect.",
                permanentlyDisconnected: () => "MetaMask: Disconnected from MetaMask background. Page reload required.",
                sendSiteMetadata: () => "MetaMask: Failed to send site metadata. This is an internal error, please report this bug.",
                unsupportedSync: e => `MetaMask: The MetaMask Ethereum provider does not support synchronous methods like ${e} without a callback parameter.`,
                invalidDuplexStream: () => "Must provide a Node.js-style duplex stream.",
                invalidNetworkParams: () => "MetaMask: Received invalid network parameters. Please report this bug.",
                invalidRequestArgs: () => "Expected a single, non-array, object argument.",
                invalidRequestMethod: () => "'args.method' must be a non-empty string.",
                invalidRequestParams: () => "'args.params' must be an object or array if provided.",
                invalidLoggerObject: () => "'args.logger' must be an object if provided.",
                invalidLoggerMethod: e => `'args.logger' must include required method '${e}'.`
            },
            info: {
                connected: e => `MetaMask: Connected to chain with ID "${e}".`
            },
            warnings: {
                enableDeprecation: "MetaMask: 'ethereum.enable()' is deprecated and may be removed in the future. Please use the 'eth_requestAccounts' RPC method instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1102",
                sendDeprecation: "MetaMask: 'ethereum.send(...)' is deprecated and may be removed in the future. Please use 'ethereum.sendAsync(...)' or 'ethereum.request(...)' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193",
                events: {
                    close: "MetaMask: The event 'close' is deprecated and may be removed in the future. Please use 'disconnect' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#disconnect",
                    data: "MetaMask: The event 'data' is deprecated and will be removed in the future. Use 'message' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message",
                    networkChanged: "MetaMask: The event 'networkChanged' is deprecated and may be removed in the future. Use 'chainChanged' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#chainchanged",
                    notification: "MetaMask: The event 'notification' is deprecated and may be removed in the future. Use 'message' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message"
                },
                rpc: {
                    ethDecryptDeprecation: "MetaMask: The RPC method 'eth_decrypt' is deprecated and may be removed in the future.\nFor more information, see: https://medium.com/metamask/metamask-api-method-deprecation-2b0564a84686",
                    ethGetEncryptionPublicKeyDeprecation: "MetaMask: The RPC method 'eth_getEncryptionPublicKey' is deprecated and may be removed in the future.\nFor more information, see: https://medium.com/metamask/metamask-api-method-deprecation-2b0564a84686",
                    walletWatchAssetNFTExperimental: "MetaMask: The RPC method 'wallet_watchAsset' is experimental for ERC721/ERC1155 assets and may change in the future.\nFor more information, see: https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-1.md and https://github.com/MetaMask/metamask-improvement-proposals/blob/main/PROCESS-GUIDE.md#proposal-lifecycle"
                },
                experimentalMethods: "MetaMask: 'ethereum._metamask' exposes non-standard, experimental methods. They may be removed or changed without warning."
            }
        };
        r.default = n
    }
    , {}],
    88: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.createRpcWarningMiddleware = function(e) {
            const t = {
                ethDecryptDeprecation: !1,
                ethGetEncryptionPublicKeyDeprecation: !1,
                walletWatchAssetNFTExperimental: !1
            };
            return (r, n, s) => {
                t.ethDecryptDeprecation || "eth_decrypt" !== r.method ? t.ethGetEncryptionPublicKeyDeprecation || "eth_getEncryptionPublicKey" !== r.method ? !t.walletWatchAssetNFTExperimental && "wallet_watchAsset" === r.method && [i.ERC721, i.ERC1155].includes(r.params?.type || "") && (e.warn(o.default.warnings.rpc.walletWatchAssetNFTExperimental),
                t.walletWatchAssetNFTExperimental = !0) : (e.warn(o.default.warnings.rpc.ethGetEncryptionPublicKeyDeprecation),
                t.ethGetEncryptionPublicKeyDeprecation = !0) : (e.warn(o.default.warnings.rpc.ethDecryptDeprecation),
                t.ethDecryptDeprecation = !0),
                s()
            }
        }
        ;
        const i = e("../constants.cjs")
          , o = n(e("../messages.cjs"))
    }
    , {
        "../constants.cjs": 85,
        "../messages.cjs": 87
    }],
    89: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.shimWeb3 = function(e, t=console) {
            let r = !1
              , n = !1;
            if (!window.web3) {
                const i = "__isMetaMaskShim__";
                let o = {
                    currentProvider: e
                };
                Object.defineProperty(o, i, {
                    value: !0,
                    enumerable: !0,
                    configurable: !1,
                    writable: !1
                }),
                o = new Proxy(o,{
                    get: (o, s, ...a) => ("currentProvider" !== s || r ? "currentProvider" === s || s === i || n || (n = !0,
                    t.error("MetaMask no longer injects web3. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3"),
                    e.request({
                        method: "metamask_logWeb3ShimUsage"
                    }).catch(e => {
                        t.debug("MetaMask: Failed to log web3 shim usage.", e)
                    }
                    )) : (r = !0,
                    t.warn("You are accessing the MetaMask window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3")),
                    Reflect.get(o, s, ...a)),
                    set: (...e) => (t.warn("You are accessing the MetaMask window.web3 shim. This object is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3"),
                    Reflect.set(...e))
                }),
                Object.defineProperty(window, "web3", {
                    value: o,
                    enumerable: !1,
                    configurable: !0,
                    writable: !0
                })
            }
        }
    }
    , {}],
    90: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.sendSiteMetadata = async function(e, t) {
            try {
                const t = await async function() {
                    return {
                        name: s(window),
                        icon: await a(window)
                    }
                }();
                e.handle({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "metamask_sendDomainMetadata",
                    params: t
                }, o.NOOP)
            } catch (e) {
                t.error({
                    message: i.default.errors.sendSiteMetadata(),
                    originalError: e
                })
            }
        }
        ;
        const i = n(e("./messages.cjs"))
          , o = e("./utils.cjs");
        function s(e) {
            const {document: t} = e
              , r = t.querySelector('head > meta[property="og:site_name"]');
            if (r)
                return r.content;
            const n = t.querySelector('head > meta[name="title"]');
            return n ? n.content : t.title && t.title.length > 0 ? t.title : window.location.hostname
        }
        async function a(e) {
            const {document: t} = e
              , r = t.querySelectorAll('head > link[rel~="icon"]');
            for (const e of Array.from(r))
                if (e && await u(e.href))
                    return e.href;
            return null
        }
        async function u(e) {
            return new Promise( (t, r) => {
                try {
                    const r = document.createElement("img");
                    r.onload = () => t(!0),
                    r.onerror = () => t(!1),
                    r.src = e
                } catch (e) {
                    r(e)
                }
            }
            )
        }
    }
    , {
        "./messages.cjs": 87,
        "./utils.cjs": 91
    }],
    91: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.NOOP = r.isValidNetworkVersion = r.isValidChainId = r.getRpcPromiseCallback = r.getDefaultExternalMiddleware = r.EMITTED_NOTIFICATIONS = r.FQDN_REGEX = r.UUID_V4_REGEX = void 0;
        const n = e("@metamask/json-rpc-engine")
          , i = e("@metamask/rpc-errors")
          , o = e("./middleware/createRpcWarningMiddleware.cjs");
        r.UUID_V4_REGEX = /(?:^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$)|(?:^0{8}-0{4}-0{4}-0{4}-0{12}$)/u,
        r.FQDN_REGEX = /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/u;
        const s = /^(\d*[1-9]\d*|0)$/u;
        r.EMITTED_NOTIFICATIONS = Object.freeze(["eth_subscription"]);
        r.getDefaultExternalMiddleware = (e=console) => {
            return [(0,
            n.createIdRemapMiddleware)(), (t = e,
            (e, r, n) => {
                "string" == typeof e.method && e.method || (r.error = i.rpcErrors.invalidRequest({
                    message: "The request 'method' must be a non-empty string.",
                    data: e
                })),
                n(e => {
                    const {error: n} = r;
                    return n ? (t.warn(`MetaMask - RPC Error: ${n.message}`, n),
                    e()) : e()
                }
                )
            }
            ), (0,
            o.createRpcWarningMiddleware)(e)];
            var t
        }
        ;
        r.getRpcPromiseCallback = (e, t, r=!0) => (n, i) => {
            n || i.error ? t(n || i.error) : !r || Array.isArray(i) ? e(i) : e(i.result)
        }
        ;
        r.isValidChainId = e => Boolean(e) && "string" == typeof e && e.startsWith("0x");
        r.isValidNetworkVersion = e => "string" == typeof e && (s.test(e) || "loading" === e);
        r.NOOP = () => {}
    }
    , {
        "./middleware/createRpcWarningMiddleware.cjs": 88,
        "@metamask/json-rpc-engine": 9,
        "@metamask/rpc-errors": 111
    }],
    92: [function(e, t, r) {
        t.exports = e("./dist/initializeInpageProvider.cjs")
    }
    , {
        "./dist/initializeInpageProvider.cjs": 86
    }],
    93: [function(e, t, r) {
        arguments[4][17][0].apply(r, arguments)
    }
    , {
        dup: 17
    }],
    94: [function(e, t, r) {
        (function(r) {
            (function() {
                "use strict";
                var n = Object.keys || function(e) {
                    var t = [];
                    for (var r in e)
                        t.push(r);
                    return t
                }
                ;
                t.exports = c;
                var i = e("./_stream_readable")
                  , o = e("./_stream_writable");
                e("inherits")(c, i);
                for (var s = n(o.prototype), a = 0; a < s.length; a++) {
                    var u = s[a];
                    c.prototype[u] || (c.prototype[u] = o.prototype[u])
                }
                function c(e) {
                    if (!(this instanceof c))
                        return new c(e);
                    i.call(this, e),
                    o.call(this, e),
                    this.allowHalfOpen = !0,
                    e && (!1 === e.readable && (this.readable = !1),
                    !1 === e.writable && (this.writable = !1),
                    !1 === e.allowHalfOpen && (this.allowHalfOpen = !1,
                    this.once("end", l)))
                }
                function l() {
                    this._writableState.ended || r.nextTick(f, this)
                }
                function f(e) {
                    e.end()
                }
                Object.defineProperty(c.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                Object.defineProperty(c.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }),
                Object.defineProperty(c.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }),
                Object.defineProperty(c.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                    },
                    set: function(e) {
                        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e,
                        this._writableState.destroyed = e)
                    }
                })
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./_stream_readable": 96,
        "./_stream_writable": 98,
        _process: 195,
        inherits: 185
    }],
    95: [function(e, t, r) {
        arguments[4][19][0].apply(r, arguments)
    }
    , {
        "./_stream_transform": 97,
        dup: 19,
        inherits: 185
    }],
    96: [function(e, t, r) {
        (function(r, n) {
            (function() {
                "use strict";
                var i;
                t.exports = A,
                A.ReadableState = M;
                e("events").EventEmitter;
                var o = function(e, t) {
                    return e.listeners(t).length
                }
                  , s = e("./internal/streams/stream")
                  , a = e("buffer").Buffer
                  , u = (void 0 !== n ? n : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {}
                ;
                var c, l = e("util");
                c = l && l.debuglog ? l.debuglog("stream") : function() {}
                ;
                var f, d, h, p = e("./internal/streams/buffer_list"), g = e("./internal/streams/destroy"), b = e("./internal/streams/state").getHighWaterMark, y = e("../errors").codes, m = y.ERR_INVALID_ARG_TYPE, w = y.ERR_STREAM_PUSH_AFTER_EOF, _ = y.ERR_METHOD_NOT_IMPLEMENTED, v = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                e("inherits")(A, s);
                var E = g.errorOrDestroy
                  , S = ["error", "close", "destroy", "pause", "resume"];
                function M(t, r, n) {
                    i = i || e("./_stream_duplex"),
                    t = t || {},
                    "boolean" != typeof n && (n = r instanceof i),
                    this.objectMode = !!t.objectMode,
                    n && (this.objectMode = this.objectMode || !!t.readableObjectMode),
                    this.highWaterMark = b(this, t, "readableHighWaterMark", n),
                    this.buffer = new p,
                    this.length = 0,
                    this.pipes = null,
                    this.pipesCount = 0,
                    this.flowing = null,
                    this.ended = !1,
                    this.endEmitted = !1,
                    this.reading = !1,
                    this.sync = !0,
                    this.needReadable = !1,
                    this.emittedReadable = !1,
                    this.readableListening = !1,
                    this.resumeScheduled = !1,
                    this.paused = !0,
                    this.emitClose = !1 !== t.emitClose,
                    this.autoDestroy = !!t.autoDestroy,
                    this.destroyed = !1,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.awaitDrain = 0,
                    this.readingMore = !1,
                    this.decoder = null,
                    this.encoding = null,
                    t.encoding && (f || (f = e("string_decoder/").StringDecoder),
                    this.decoder = new f(t.encoding),
                    this.encoding = t.encoding)
                }
                function A(t) {
                    if (i = i || e("./_stream_duplex"),
                    !(this instanceof A))
                        return new A(t);
                    var r = this instanceof i;
                    this._readableState = new M(t,this,r),
                    this.readable = !0,
                    t && ("function" == typeof t.read && (this._read = t.read),
                    "function" == typeof t.destroy && (this._destroy = t.destroy)),
                    s.call(this)
                }
                function j(e, t, r, n, i) {
                    c("readableAddChunk", t);
                    var o, s = e._readableState;
                    if (null === t)
                        s.reading = !1,
                        function(e, t) {
                            if (c("onEofChunk"),
                            t.ended)
                                return;
                            if (t.decoder) {
                                var r = t.decoder.end();
                                r && r.length && (t.buffer.push(r),
                                t.length += t.objectMode ? 1 : r.length)
                            }
                            t.ended = !0,
                            t.sync ? O(e) : (t.needReadable = !1,
                            t.emittedReadable || (t.emittedReadable = !0,
                            C(e)))
                        }(e, s);
                    else if (i || (o = function(e, t) {
                        var r;
                        n = t,
                        a.isBuffer(n) || n instanceof u || "string" == typeof t || void 0 === t || e.objectMode || (r = new m("chunk",["string", "Buffer", "Uint8Array"],t));
                        var n;
                        return r
                    }(s, t)),
                    o)
                        E(e, o);
                    else if (s.objectMode || t && t.length > 0)
                        if ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = function(e) {
                            return a.from(e)
                        }(t)),
                        n)
                            s.endEmitted ? E(e, new v) : R(e, s, t, !0);
                        else if (s.ended)
                            E(e, new w);
                        else {
                            if (s.destroyed)
                                return !1;
                            s.reading = !1,
                            s.decoder && !r ? (t = s.decoder.write(t),
                            s.objectMode || 0 !== t.length ? R(e, s, t, !1) : x(e, s)) : R(e, s, t, !1)
                        }
                    else
                        n || (s.reading = !1,
                        x(e, s));
                    return !s.ended && (s.length < s.highWaterMark || 0 === s.length)
                }
                function R(e, t, r, n) {
                    t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0,
                    e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length,
                    n ? t.buffer.unshift(r) : t.buffer.push(r),
                    t.needReadable && O(e)),
                    x(e, t)
                }
                Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }),
                A.prototype.destroy = g.destroy,
                A.prototype._undestroy = g.undestroy,
                A.prototype._destroy = function(e, t) {
                    t(e)
                }
                ,
                A.prototype.push = function(e, t) {
                    var r, n = this._readableState;
                    return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = a.from(e, t),
                    t = ""),
                    r = !0),
                    j(this, e, t, !1, r)
                }
                ,
                A.prototype.unshift = function(e) {
                    return j(this, e, null, !0, !1)
                }
                ,
                A.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                }
                ,
                A.prototype.setEncoding = function(t) {
                    f || (f = e("string_decoder/").StringDecoder);
                    var r = new f(t);
                    this._readableState.decoder = r,
                    this._readableState.encoding = this._readableState.decoder.encoding;
                    for (var n = this._readableState.buffer.head, i = ""; null !== n; )
                        i += r.write(n.data),
                        n = n.next;
                    return this._readableState.buffer.clear(),
                    "" !== i && this._readableState.buffer.push(i),
                    this._readableState.length = i.length,
                    this
                }
                ;
                var I = 1073741824;
                function T(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function(e) {
                        return e >= I ? e = I : (e--,
                        e |= e >>> 1,
                        e |= e >>> 2,
                        e |= e >>> 4,
                        e |= e >>> 8,
                        e |= e >>> 16,
                        e++),
                        e
                    }(e)),
                    e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0,
                    0))
                }
                function O(e) {
                    var t = e._readableState;
                    c("emitReadable", t.needReadable, t.emittedReadable),
                    t.needReadable = !1,
                    t.emittedReadable || (c("emitReadable", t.flowing),
                    t.emittedReadable = !0,
                    r.nextTick(C, e))
                }
                function C(e) {
                    var t = e._readableState;
                    c("emitReadable_", t.destroyed, t.length, t.ended),
                    t.destroyed || !t.length && !t.ended || (e.emit("readable"),
                    t.emittedReadable = !1),
                    t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark,
                    D(e)
                }
                function x(e, t) {
                    t.readingMore || (t.readingMore = !0,
                    r.nextTick(N, e, t))
                }
                function N(e, t) {
                    for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length); ) {
                        var r = t.length;
                        if (c("maybeReadMore read 0"),
                        e.read(0),
                        r === t.length)
                            break
                    }
                    t.readingMore = !1
                }
                function P(e) {
                    var t = e._readableState;
                    t.readableListening = e.listenerCount("readable") > 0,
                    t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
                }
                function k(e) {
                    c("readable nexttick read 0"),
                    e.read(0)
                }
                function L(e, t) {
                    c("resume", t.reading),
                    t.reading || e.read(0),
                    t.resumeScheduled = !1,
                    e.emit("resume"),
                    D(e),
                    t.flowing && !t.reading && e.read(0)
                }
                function D(e) {
                    var t = e._readableState;
                    for (c("flow", t.flowing); t.flowing && null !== e.read(); )
                        ;
                }
                function U(e, t) {
                    return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length),
                    t.buffer.clear()) : r = t.buffer.consume(e, t.decoder),
                    r);
                    var r
                }
                function $(e) {
                    var t = e._readableState;
                    c("endReadable", t.endEmitted),
                    t.endEmitted || (t.ended = !0,
                    r.nextTick(B, t, e))
                }
                function B(e, t) {
                    if (c("endReadableNT", e.endEmitted, e.length),
                    !e.endEmitted && 0 === e.length && (e.endEmitted = !0,
                    t.readable = !1,
                    t.emit("end"),
                    e.autoDestroy)) {
                        var r = t._writableState;
                        (!r || r.autoDestroy && r.finished) && t.destroy()
                    }
                }
                function W(e, t) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t)
                            return r;
                    return -1
                }
                A.prototype.read = function(e) {
                    c("read", e),
                    e = parseInt(e, 10);
                    var t = this._readableState
                      , r = e;
                    if (0 !== e && (t.emittedReadable = !1),
                    0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
                        return c("read: emitReadable", t.length, t.ended),
                        0 === t.length && t.ended ? $(this) : O(this),
                        null;
                    if (0 === (e = T(e, t)) && t.ended)
                        return 0 === t.length && $(this),
                        null;
                    var n, i = t.needReadable;
                    return c("need readable", i),
                    (0 === t.length || t.length - e < t.highWaterMark) && c("length less than watermark", i = !0),
                    t.ended || t.reading ? c("reading or ended", i = !1) : i && (c("do read"),
                    t.reading = !0,
                    t.sync = !0,
                    0 === t.length && (t.needReadable = !0),
                    this._read(t.highWaterMark),
                    t.sync = !1,
                    t.reading || (e = T(r, t))),
                    null === (n = e > 0 ? U(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark,
                    e = 0) : (t.length -= e,
                    t.awaitDrain = 0),
                    0 === t.length && (t.ended || (t.needReadable = !0),
                    r !== e && t.ended && $(this)),
                    null !== n && this.emit("data", n),
                    n
                }
                ,
                A.prototype._read = function(e) {
                    E(this, new _("_read()"))
                }
                ,
                A.prototype.pipe = function(e, t) {
                    var n = this
                      , i = this._readableState;
                    switch (i.pipesCount) {
                    case 0:
                        i.pipes = e;
                        break;
                    case 1:
                        i.pipes = [i.pipes, e];
                        break;
                    default:
                        i.pipes.push(e)
                    }
                    i.pipesCount += 1,
                    c("pipe count=%d opts=%j", i.pipesCount, t);
                    var s = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? u : b;
                    function a(t, r) {
                        c("onunpipe"),
                        t === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0,
                        c("cleanup"),
                        e.removeListener("close", p),
                        e.removeListener("finish", g),
                        e.removeListener("drain", l),
                        e.removeListener("error", h),
                        e.removeListener("unpipe", a),
                        n.removeListener("end", u),
                        n.removeListener("end", b),
                        n.removeListener("data", d),
                        f = !0,
                        !i.awaitDrain || e._writableState && !e._writableState.needDrain || l())
                    }
                    function u() {
                        c("onend"),
                        e.end()
                    }
                    i.endEmitted ? r.nextTick(s) : n.once("end", s),
                    e.on("unpipe", a);
                    var l = function(e) {
                        return function() {
                            var t = e._readableState;
                            c("pipeOnDrain", t.awaitDrain),
                            t.awaitDrain && t.awaitDrain--,
                            0 === t.awaitDrain && o(e, "data") && (t.flowing = !0,
                            D(e))
                        }
                    }(n);
                    e.on("drain", l);
                    var f = !1;
                    function d(t) {
                        c("ondata");
                        var r = e.write(t);
                        c("dest.write", r),
                        !1 === r && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== W(i.pipes, e)) && !f && (c("false write response, pause", i.awaitDrain),
                        i.awaitDrain++),
                        n.pause())
                    }
                    function h(t) {
                        c("onerror", t),
                        b(),
                        e.removeListener("error", h),
                        0 === o(e, "error") && E(e, t)
                    }
                    function p() {
                        e.removeListener("finish", g),
                        b()
                    }
                    function g() {
                        c("onfinish"),
                        e.removeListener("close", p),
                        b()
                    }
                    function b() {
                        c("unpipe"),
                        n.unpipe(e)
                    }
                    return n.on("data", d),
                    function(e, t, r) {
                        if ("function" == typeof e.prependListener)
                            return e.prependListener(t, r);
                        e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                    }(e, "error", h),
                    e.once("close", p),
                    e.once("finish", g),
                    e.emit("pipe", n),
                    i.flowing || (c("pipe resume"),
                    n.resume()),
                    e
                }
                ,
                A.prototype.unpipe = function(e) {
                    var t = this._readableState
                      , r = {
                        hasUnpiped: !1
                    };
                    if (0 === t.pipesCount)
                        return this;
                    if (1 === t.pipesCount)
                        return e && e !== t.pipes || (e || (e = t.pipes),
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1,
                        e && e.emit("unpipe", this, r)),
                        this;
                    if (!e) {
                        var n = t.pipes
                          , i = t.pipesCount;
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1;
                        for (var o = 0; o < i; o++)
                            n[o].emit("unpipe", this, {
                                hasUnpiped: !1
                            });
                        return this
                    }
                    var s = W(t.pipes, e);
                    return -1 === s || (t.pipes.splice(s, 1),
                    t.pipesCount -= 1,
                    1 === t.pipesCount && (t.pipes = t.pipes[0]),
                    e.emit("unpipe", this, r)),
                    this
                }
                ,
                A.prototype.on = function(e, t) {
                    var n = s.prototype.on.call(this, e, t)
                      , i = this._readableState;
                    return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0,
                    !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0,
                    i.flowing = !1,
                    i.emittedReadable = !1,
                    c("on readable", i.length, i.reading),
                    i.length ? O(this) : i.reading || r.nextTick(k, this))),
                    n
                }
                ,
                A.prototype.addListener = A.prototype.on,
                A.prototype.removeListener = function(e, t) {
                    var n = s.prototype.removeListener.call(this, e, t);
                    return "readable" === e && r.nextTick(P, this),
                    n
                }
                ,
                A.prototype.removeAllListeners = function(e) {
                    var t = s.prototype.removeAllListeners.apply(this, arguments);
                    return "readable" !== e && void 0 !== e || r.nextTick(P, this),
                    t
                }
                ,
                A.prototype.resume = function() {
                    var e = this._readableState;
                    return e.flowing || (c("resume"),
                    e.flowing = !e.readableListening,
                    function(e, t) {
                        t.resumeScheduled || (t.resumeScheduled = !0,
                        r.nextTick(L, e, t))
                    }(this, e)),
                    e.paused = !1,
                    this
                }
                ,
                A.prototype.pause = function() {
                    return c("call pause flowing=%j", this._readableState.flowing),
                    !1 !== this._readableState.flowing && (c("pause"),
                    this._readableState.flowing = !1,
                    this.emit("pause")),
                    this._readableState.paused = !0,
                    this
                }
                ,
                A.prototype.wrap = function(e) {
                    var t = this
                      , r = this._readableState
                      , n = !1;
                    for (var i in e.on("end", function() {
                        if (c("wrapped end"),
                        r.decoder && !r.ended) {
                            var e = r.decoder.end();
                            e && e.length && t.push(e)
                        }
                        t.push(null)
                    }),
                    e.on("data", function(i) {
                        (c("wrapped data"),
                        r.decoder && (i = r.decoder.write(i)),
                        r.objectMode && null == i) || (r.objectMode || i && i.length) && (t.push(i) || (n = !0,
                        e.pause()))
                    }),
                    e)
                        void 0 === this[i] && "function" == typeof e[i] && (this[i] = function(t) {
                            return function() {
                                return e[t].apply(e, arguments)
                            }
                        }(i));
                    for (var o = 0; o < S.length; o++)
                        e.on(S[o], this.emit.bind(this, S[o]));
                    return this._read = function(t) {
                        c("wrapped _read", t),
                        n && (n = !1,
                        e.resume())
                    }
                    ,
                    this
                }
                ,
                "function" == typeof Symbol && (A.prototype[Symbol.asyncIterator] = function() {
                    return void 0 === d && (d = e("./internal/streams/async_iterator")),
                    d(this)
                }
                ),
                Object.defineProperty(A.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.highWaterMark
                    }
                }),
                Object.defineProperty(A.prototype, "readableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState && this._readableState.buffer
                    }
                }),
                Object.defineProperty(A.prototype, "readableFlowing", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.flowing
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.flowing = e)
                    }
                }),
                A._fromList = U,
                Object.defineProperty(A.prototype, "readableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.length
                    }
                }),
                "function" == typeof Symbol && (A.from = function(t, r) {
                    return void 0 === h && (h = e("./internal/streams/from")),
                    h(A, t, r)
                }
                )
            }
            ).call(this)
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../errors": 93,
        "./_stream_duplex": 94,
        "./internal/streams/async_iterator": 99,
        "./internal/streams/buffer_list": 100,
        "./internal/streams/destroy": 101,
        "./internal/streams/from": 103,
        "./internal/streams/state": 105,
        "./internal/streams/stream": 106,
        _process: 195,
        buffer: 176,
        events: 181,
        inherits: 185,
        "string_decoder/": 267,
        util: 175
    }],
    97: [function(e, t, r) {
        arguments[4][21][0].apply(r, arguments)
    }
    , {
        "../errors": 93,
        "./_stream_duplex": 94,
        dup: 21,
        inherits: 185
    }],
    98: [function(e, t, r) {
        (function(r, n) {
            (function() {
                "use strict";
                function i(e) {
                    var t = this;
                    this.next = null,
                    this.entry = null,
                    this.finish = function() {
                        !function(e, t, r) {
                            var n = e.entry;
                            e.entry = null;
                            for (; n; ) {
                                var i = n.callback;
                                t.pendingcb--,
                                i(r),
                                n = n.next
                            }
                            t.corkedRequestsFree.next = e
                        }(t, e)
                    }
                }
                var o;
                t.exports = A,
                A.WritableState = M;
                var s = {
                    deprecate: e("util-deprecate")
                }
                  , a = e("./internal/streams/stream")
                  , u = e("buffer").Buffer
                  , c = (void 0 !== n ? n : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {}
                ;
                var l, f = e("./internal/streams/destroy"), d = e("./internal/streams/state").getHighWaterMark, h = e("../errors").codes, p = h.ERR_INVALID_ARG_TYPE, g = h.ERR_METHOD_NOT_IMPLEMENTED, b = h.ERR_MULTIPLE_CALLBACK, y = h.ERR_STREAM_CANNOT_PIPE, m = h.ERR_STREAM_DESTROYED, w = h.ERR_STREAM_NULL_VALUES, _ = h.ERR_STREAM_WRITE_AFTER_END, v = h.ERR_UNKNOWN_ENCODING, E = f.errorOrDestroy;
                function S() {}
                function M(t, n, s) {
                    o = o || e("./_stream_duplex"),
                    t = t || {},
                    "boolean" != typeof s && (s = n instanceof o),
                    this.objectMode = !!t.objectMode,
                    s && (this.objectMode = this.objectMode || !!t.writableObjectMode),
                    this.highWaterMark = d(this, t, "writableHighWaterMark", s),
                    this.finalCalled = !1,
                    this.needDrain = !1,
                    this.ending = !1,
                    this.ended = !1,
                    this.finished = !1,
                    this.destroyed = !1;
                    var a = !1 === t.decodeStrings;
                    this.decodeStrings = !a,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.length = 0,
                    this.writing = !1,
                    this.corked = 0,
                    this.sync = !0,
                    this.bufferProcessing = !1,
                    this.onwrite = function(e) {
                        !function(e, t) {
                            var n = e._writableState
                              , i = n.sync
                              , o = n.writecb;
                            if ("function" != typeof o)
                                throw new b;
                            if (function(e) {
                                e.writing = !1,
                                e.writecb = null,
                                e.length -= e.writelen,
                                e.writelen = 0
                            }(n),
                            t)
                                !function(e, t, n, i, o) {
                                    --t.pendingcb,
                                    n ? (r.nextTick(o, i),
                                    r.nextTick(C, e, t),
                                    e._writableState.errorEmitted = !0,
                                    E(e, i)) : (o(i),
                                    e._writableState.errorEmitted = !0,
                                    E(e, i),
                                    C(e, t))
                                }(e, n, i, t, o);
                            else {
                                var s = T(n) || e.destroyed;
                                s || n.corked || n.bufferProcessing || !n.bufferedRequest || I(e, n),
                                i ? r.nextTick(R, e, n, s, o) : R(e, n, s, o)
                            }
                        }(n, e)
                    }
                    ,
                    this.writecb = null,
                    this.writelen = 0,
                    this.bufferedRequest = null,
                    this.lastBufferedRequest = null,
                    this.pendingcb = 0,
                    this.prefinished = !1,
                    this.errorEmitted = !1,
                    this.emitClose = !1 !== t.emitClose,
                    this.autoDestroy = !!t.autoDestroy,
                    this.bufferedRequestCount = 0,
                    this.corkedRequestsFree = new i(this)
                }
                function A(t) {
                    var r = this instanceof (o = o || e("./_stream_duplex"));
                    if (!r && !l.call(A, this))
                        return new A(t);
                    this._writableState = new M(t,this,r),
                    this.writable = !0,
                    t && ("function" == typeof t.write && (this._write = t.write),
                    "function" == typeof t.writev && (this._writev = t.writev),
                    "function" == typeof t.destroy && (this._destroy = t.destroy),
                    "function" == typeof t.final && (this._final = t.final)),
                    a.call(this)
                }
                function j(e, t, r, n, i, o, s) {
                    t.writelen = n,
                    t.writecb = s,
                    t.writing = !0,
                    t.sync = !0,
                    t.destroyed ? t.onwrite(new m("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite),
                    t.sync = !1
                }
                function R(e, t, r, n) {
                    r || function(e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1,
                        e.emit("drain"))
                    }(e, t),
                    t.pendingcb--,
                    n(),
                    C(e, t)
                }
                function I(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var n = t.bufferedRequestCount
                          , o = new Array(n)
                          , s = t.corkedRequestsFree;
                        s.entry = r;
                        for (var a = 0, u = !0; r; )
                            o[a] = r,
                            r.isBuf || (u = !1),
                            r = r.next,
                            a += 1;
                        o.allBuffers = u,
                        j(e, t, !0, t.length, o, "", s.finish),
                        t.pendingcb++,
                        t.lastBufferedRequest = null,
                        s.next ? (t.corkedRequestsFree = s.next,
                        s.next = null) : t.corkedRequestsFree = new i(t),
                        t.bufferedRequestCount = 0
                    } else {
                        for (; r; ) {
                            var c = r.chunk
                              , l = r.encoding
                              , f = r.callback;
                            if (j(e, t, !1, t.objectMode ? 1 : c.length, c, l, f),
                            r = r.next,
                            t.bufferedRequestCount--,
                            t.writing)
                                break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = r,
                    t.bufferProcessing = !1
                }
                function T(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }
                function O(e, t) {
                    e._final(function(r) {
                        t.pendingcb--,
                        r && E(e, r),
                        t.prefinished = !0,
                        e.emit("prefinish"),
                        C(e, t)
                    })
                }
                function C(e, t) {
                    var n = T(t);
                    if (n && (function(e, t) {
                        t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0,
                        e.emit("prefinish")) : (t.pendingcb++,
                        t.finalCalled = !0,
                        r.nextTick(O, e, t)))
                    }(e, t),
                    0 === t.pendingcb && (t.finished = !0,
                    e.emit("finish"),
                    t.autoDestroy))) {
                        var i = e._readableState;
                        (!i || i.autoDestroy && i.endEmitted) && e.destroy()
                    }
                    return n
                }
                e("inherits")(A, a),
                M.prototype.getBuffer = function() {
                    for (var e = this.bufferedRequest, t = []; e; )
                        t.push(e),
                        e = e.next;
                    return t
                }
                ,
                function() {
                    try {
                        Object.defineProperty(M.prototype, "buffer", {
                            get: s.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                        })
                    } catch (e) {}
                }(),
                "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (l = Function.prototype[Symbol.hasInstance],
                Object.defineProperty(A, Symbol.hasInstance, {
                    value: function(e) {
                        return !!l.call(this, e) || this === A && (e && e._writableState instanceof M)
                    }
                })) : l = function(e) {
                    return e instanceof this
                }
                ,
                A.prototype.pipe = function() {
                    E(this, new y)
                }
                ,
                A.prototype.write = function(e, t, n) {
                    var i, o = this._writableState, s = !1, a = !o.objectMode && (i = e,
                    u.isBuffer(i) || i instanceof c);
                    return a && !u.isBuffer(e) && (e = function(e) {
                        return u.from(e)
                    }(e)),
                    "function" == typeof t && (n = t,
                    t = null),
                    a ? t = "buffer" : t || (t = o.defaultEncoding),
                    "function" != typeof n && (n = S),
                    o.ending ? function(e, t) {
                        var n = new _;
                        E(e, n),
                        r.nextTick(t, n)
                    }(this, n) : (a || function(e, t, n, i) {
                        var o;
                        return null === n ? o = new w : "string" == typeof n || t.objectMode || (o = new p("chunk",["string", "Buffer"],n)),
                        !o || (E(e, o),
                        r.nextTick(i, o),
                        !1)
                    }(this, o, e, n)) && (o.pendingcb++,
                    s = function(e, t, r, n, i, o) {
                        if (!r) {
                            var s = function(e, t, r) {
                                e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = u.from(t, r));
                                return t
                            }(t, n, i);
                            n !== s && (r = !0,
                            i = "buffer",
                            n = s)
                        }
                        var a = t.objectMode ? 1 : n.length;
                        t.length += a;
                        var c = t.length < t.highWaterMark;
                        c || (t.needDrain = !0);
                        if (t.writing || t.corked) {
                            var l = t.lastBufferedRequest;
                            t.lastBufferedRequest = {
                                chunk: n,
                                encoding: i,
                                isBuf: r,
                                callback: o,
                                next: null
                            },
                            l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest,
                            t.bufferedRequestCount += 1
                        } else
                            j(e, t, !1, a, n, i, o);
                        return c
                    }(this, o, a, e, t, n)),
                    s
                }
                ,
                A.prototype.cork = function() {
                    this._writableState.corked++
                }
                ,
                A.prototype.uncork = function() {
                    var e = this._writableState;
                    e.corked && (e.corked--,
                    e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || I(this, e))
                }
                ,
                A.prototype.setDefaultEncoding = function(e) {
                    if ("string" == typeof e && (e = e.toLowerCase()),
                    !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1))
                        throw new v(e);
                    return this._writableState.defaultEncoding = e,
                    this
                }
                ,
                Object.defineProperty(A.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }),
                Object.defineProperty(A.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                A.prototype._write = function(e, t, r) {
                    r(new g("_write()"))
                }
                ,
                A.prototype._writev = null,
                A.prototype.end = function(e, t, n) {
                    var i = this._writableState;
                    return "function" == typeof e ? (n = e,
                    e = null,
                    t = null) : "function" == typeof t && (n = t,
                    t = null),
                    null != e && this.write(e, t),
                    i.corked && (i.corked = 1,
                    this.uncork()),
                    i.ending || function(e, t, n) {
                        t.ending = !0,
                        C(e, t),
                        n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                        t.ended = !0,
                        e.writable = !1
                    }(this, i, n),
                    this
                }
                ,
                Object.defineProperty(A.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }),
                Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }),
                A.prototype.destroy = f.destroy,
                A.prototype._undestroy = f.undestroy,
                A.prototype._destroy = function(e, t) {
                    t(e)
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../errors": 93,
        "./_stream_duplex": 94,
        "./internal/streams/destroy": 101,
        "./internal/streams/state": 105,
        "./internal/streams/stream": 106,
        _process: 195,
        buffer: 176,
        inherits: 185,
        "util-deprecate": 268
    }],
    99: [function(e, t, r) {
        (function(r) {
            (function() {
                "use strict";
                var n;
                function i(e, t, r) {
                    return (t = function(e) {
                        var t = function(e, t) {
                            if ("object" != typeof e || null === e)
                                return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != typeof n)
                                    return n;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == typeof t ? t : String(t)
                    }(t))in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r,
                    e
                }
                var o = e("./end-of-stream")
                  , s = Symbol("lastResolve")
                  , a = Symbol("lastReject")
                  , u = Symbol("error")
                  , c = Symbol("ended")
                  , l = Symbol("lastPromise")
                  , f = Symbol("handlePromise")
                  , d = Symbol("stream");
                function h(e, t) {
                    return {
                        value: e,
                        done: t
                    }
                }
                function p(e) {
                    var t = e[s];
                    if (null !== t) {
                        var r = e[d].read();
                        null !== r && (e[l] = null,
                        e[s] = null,
                        e[a] = null,
                        t(h(r, !1)))
                    }
                }
                function g(e) {
                    r.nextTick(p, e)
                }
                var b = Object.getPrototypeOf(function() {})
                  , y = Object.setPrototypeOf((i(n = {
                    get stream() {
                        return this[d]
                    },
                    next: function() {
                        var e = this
                          , t = this[u];
                        if (null !== t)
                            return Promise.reject(t);
                        if (this[c])
                            return Promise.resolve(h(void 0, !0));
                        if (this[d].destroyed)
                            return new Promise(function(t, n) {
                                r.nextTick(function() {
                                    e[u] ? n(e[u]) : t(h(void 0, !0))
                                })
                            }
                            );
                        var n, i = this[l];
                        if (i)
                            n = new Promise(function(e, t) {
                                return function(r, n) {
                                    e.then(function() {
                                        t[c] ? r(h(void 0, !0)) : t[f](r, n)
                                    }, n)
                                }
                            }(i, this));
                        else {
                            var o = this[d].read();
                            if (null !== o)
                                return Promise.resolve(h(o, !1));
                            n = new Promise(this[f])
                        }
                        return this[l] = n,
                        n
                    }
                }, Symbol.asyncIterator, function() {
                    return this
                }),
                i(n, "return", function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e[d].destroy(null, function(e) {
                            e ? r(e) : t(h(void 0, !0))
                        })
                    }
                    )
                }),
                n), b);
                t.exports = function(e) {
                    var t, r = Object.create(y, (i(t = {}, d, {
                        value: e,
                        writable: !0
                    }),
                    i(t, s, {
                        value: null,
                        writable: !0
                    }),
                    i(t, a, {
                        value: null,
                        writable: !0
                    }),
                    i(t, u, {
                        value: null,
                        writable: !0
                    }),
                    i(t, c, {
                        value: e._readableState.endEmitted,
                        writable: !0
                    }),
                    i(t, f, {
                        value: function(e, t) {
                            var n = r[d].read();
                            n ? (r[l] = null,
                            r[s] = null,
                            r[a] = null,
                            e(h(n, !1))) : (r[s] = e,
                            r[a] = t)
                        },
                        writable: !0
                    }),
                    t));
                    return r[l] = null,
                    o(e, function(e) {
                        if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                            var t = r[a];
                            return null !== t && (r[l] = null,
                            r[s] = null,
                            r[a] = null,
                            t(e)),
                            void (r[u] = e)
                        }
                        var n = r[s];
                        null !== n && (r[l] = null,
                        r[s] = null,
                        r[a] = null,
                        n(h(void 0, !0))),
                        r[c] = !0
                    }),
                    e.on("readable", g.bind(null, r)),
                    r
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./end-of-stream": 102,
        _process: 195
    }],
    100: [function(e, t, r) {
        arguments[4][24][0].apply(r, arguments)
    }
    , {
        buffer: 176,
        dup: 24,
        util: 175
    }],
    101: [function(e, t, r) {
        (function(e) {
            (function() {
                "use strict";
                function r(e, t) {
                    i(e, t),
                    n(e)
                }
                function n(e) {
                    e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
                }
                function i(e, t) {
                    e.emit("error", t)
                }
                t.exports = {
                    destroy: function(t, o) {
                        var s = this
                          , a = this._readableState && this._readableState.destroyed
                          , u = this._writableState && this._writableState.destroyed;
                        return a || u ? (o ? o(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0,
                        e.nextTick(i, this, t)) : e.nextTick(i, this, t)),
                        this) : (this._readableState && (this._readableState.destroyed = !0),
                        this._writableState && (this._writableState.destroyed = !0),
                        this._destroy(t || null, function(t) {
                            !o && t ? s._writableState ? s._writableState.errorEmitted ? e.nextTick(n, s) : (s._writableState.errorEmitted = !0,
                            e.nextTick(r, s, t)) : e.nextTick(r, s, t) : o ? (e.nextTick(n, s),
                            o(t)) : e.nextTick(n, s)
                        }),
                        this)
                    },
                    undestroy: function() {
                        this._readableState && (this._readableState.destroyed = !1,
                        this._readableState.reading = !1,
                        this._readableState.ended = !1,
                        this._readableState.endEmitted = !1),
                        this._writableState && (this._writableState.destroyed = !1,
                        this._writableState.ended = !1,
                        this._writableState.ending = !1,
                        this._writableState.finalCalled = !1,
                        this._writableState.prefinished = !1,
                        this._writableState.finished = !1,
                        this._writableState.errorEmitted = !1)
                    },
                    errorOrDestroy: function(e, t) {
                        var r = e._readableState
                          , n = e._writableState;
                        r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t)
                    }
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 195
    }],
    102: [function(e, t, r) {
        arguments[4][26][0].apply(r, arguments)
    }
    , {
        "../../../errors": 93,
        dup: 26
    }],
    103: [function(e, t, r) {
        arguments[4][27][0].apply(r, arguments)
    }
    , {
        dup: 27
    }],
    104: [function(e, t, r) {
        arguments[4][28][0].apply(r, arguments)
    }
    , {
        "../../../errors": 93,
        "./end-of-stream": 102,
        dup: 28
    }],
    105: [function(e, t, r) {
        arguments[4][29][0].apply(r, arguments)
    }
    , {
        "../../../errors": 93,
        dup: 29
    }],
    106: [function(e, t, r) {
        arguments[4][30][0].apply(r, arguments)
    }
    , {
        dup: 30,
        events: 181
    }],
    107: [function(e, t, r) {
        arguments[4][31][0].apply(r, arguments)
    }
    , {
        "./lib/_stream_duplex.js": 94,
        "./lib/_stream_passthrough.js": 95,
        "./lib/_stream_readable.js": 96,
        "./lib/_stream_transform.js": 97,
        "./lib/_stream_writable.js": 98,
        "./lib/internal/streams/end-of-stream.js": 102,
        "./lib/internal/streams/pipeline.js": 104,
        dup: 31
    }],
    108: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.EthereumProviderError = r.JsonRpcError = void 0;
        const i = e("@metamask/utils")
          , o = n(e("fast-safe-stringify"))
          , s = e("./utils.cjs");
        class a extends Error {
            constructor(e, t, r) {
                if (!Number.isInteger(e))
                    throw new Error('"code" must be an integer.');
                if (!t || "string" != typeof t)
                    throw new Error('"message" must be a non-empty string.');
                (0,
                s.dataHasCause)(r) ? (super(t, {
                    cause: r.cause
                }),
                (0,
                i.hasProperty)(this, "cause") || Object.assign(this, {
                    cause: r.cause
                })) : super(t),
                void 0 !== r && (this.data = r),
                this.code = e
            }
            serialize() {
                const e = {
                    code: this.code,
                    message: this.message
                };
                return void 0 !== this.data && (e.data = this.data,
                (0,
                i.isPlainObject)(this.data) && (e.data.cause = (0,
                s.serializeCause)(this.data.cause))),
                this.stack && (e.stack = this.stack),
                e
            }
            toString() {
                return (0,
                o.default)(this.serialize(), u, 2)
            }
        }
        r.JsonRpcError = a;
        function u(e, t) {
            if ("[Circular]" !== t)
                return t
        }
        r.EthereumProviderError = class extends a {
            constructor(e, t, r) {
                if (!function(e) {
                    return Number.isInteger(e) && e >= 1e3 && e <= 4999
                }(e))
                    throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
                super(e, t, r)
            }
        }
    }
    , {
        "./utils.cjs": 112,
        "@metamask/utils": 138,
        "fast-safe-stringify": 183
    }],
    109: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.errorValues = r.errorCodes = void 0,
        r.errorCodes = {
            rpc: {
                invalidInput: -32e3,
                resourceNotFound: -32001,
                resourceUnavailable: -32002,
                transactionRejected: -32003,
                methodNotSupported: -32004,
                limitExceeded: -32005,
                parse: -32700,
                invalidRequest: -32600,
                methodNotFound: -32601,
                invalidParams: -32602,
                internal: -32603
            },
            provider: {
                userRejectedRequest: 4001,
                unauthorized: 4100,
                unsupportedMethod: 4200,
                disconnected: 4900,
                chainDisconnected: 4901
            }
        },
        r.errorValues = {
            "-32700": {
                standard: "JSON RPC 2.0",
                message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
            },
            "-32600": {
                standard: "JSON RPC 2.0",
                message: "The JSON sent is not a valid Request object."
            },
            "-32601": {
                standard: "JSON RPC 2.0",
                message: "The method does not exist / is not available."
            },
            "-32602": {
                standard: "JSON RPC 2.0",
                message: "Invalid method parameter(s)."
            },
            "-32603": {
                standard: "JSON RPC 2.0",
                message: "Internal JSON-RPC error."
            },
            "-32000": {
                standard: "EIP-1474",
                message: "Invalid input."
            },
            "-32001": {
                standard: "EIP-1474",
                message: "Resource not found."
            },
            "-32002": {
                standard: "EIP-1474",
                message: "Resource unavailable."
            },
            "-32003": {
                standard: "EIP-1474",
                message: "Transaction rejected."
            },
            "-32004": {
                standard: "EIP-1474",
                message: "Method not supported."
            },
            "-32005": {
                standard: "EIP-1474",
                message: "Request limit exceeded."
            },
            4001: {
                standard: "EIP-1193",
                message: "User rejected the request."
            },
            4100: {
                standard: "EIP-1193",
                message: "The requested account and/or method has not been authorized by the user."
            },
            4200: {
                standard: "EIP-1193",
                message: "The requested method is not supported by this Ethereum provider."
            },
            4900: {
                standard: "EIP-1193",
                message: "The provider is disconnected from all chains."
            },
            4901: {
                standard: "EIP-1193",
                message: "The provider is disconnected from the specified chain."
            }
        }
    }
    , {}],
    110: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.providerErrors = r.rpcErrors = void 0;
        const n = e("./classes.cjs")
          , i = e("./error-constants.cjs")
          , o = e("./utils.cjs");
        function s(e, t) {
            const [r,i] = u(t);
            return new n.JsonRpcError(e,r ?? (0,
            o.getMessageFromCode)(e),i)
        }
        function a(e, t) {
            const [r,i] = u(t);
            return new n.EthereumProviderError(e,r ?? (0,
            o.getMessageFromCode)(e),i)
        }
        function u(e) {
            if (e) {
                if ("string" == typeof e)
                    return [e];
                if ("object" == typeof e && !Array.isArray(e)) {
                    const {message: t, data: r} = e;
                    if (t && "string" != typeof t)
                        throw new Error("Must specify string message.");
                    return [t ?? void 0, r]
                }
            }
            return []
        }
        r.rpcErrors = {
            parse: e => s(i.errorCodes.rpc.parse, e),
            invalidRequest: e => s(i.errorCodes.rpc.invalidRequest, e),
            invalidParams: e => s(i.errorCodes.rpc.invalidParams, e),
            methodNotFound: e => s(i.errorCodes.rpc.methodNotFound, e),
            internal: e => s(i.errorCodes.rpc.internal, e),
            server: e => {
                if (!e || "object" != typeof e || Array.isArray(e))
                    throw new Error("Ethereum RPC Server errors must provide single object argument.");
                const {code: t} = e;
                if (!Number.isInteger(t) || t > -32005 || t < -32099)
                    throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
                return s(t, e)
            }
            ,
            invalidInput: e => s(i.errorCodes.rpc.invalidInput, e),
            resourceNotFound: e => s(i.errorCodes.rpc.resourceNotFound, e),
            resourceUnavailable: e => s(i.errorCodes.rpc.resourceUnavailable, e),
            transactionRejected: e => s(i.errorCodes.rpc.transactionRejected, e),
            methodNotSupported: e => s(i.errorCodes.rpc.methodNotSupported, e),
            limitExceeded: e => s(i.errorCodes.rpc.limitExceeded, e)
        },
        r.providerErrors = {
            userRejectedRequest: e => a(i.errorCodes.provider.userRejectedRequest, e),
            unauthorized: e => a(i.errorCodes.provider.unauthorized, e),
            unsupportedMethod: e => a(i.errorCodes.provider.unsupportedMethod, e),
            disconnected: e => a(i.errorCodes.provider.disconnected, e),
            chainDisconnected: e => a(i.errorCodes.provider.chainDisconnected, e),
            custom: e => {
                if (!e || "object" != typeof e || Array.isArray(e))
                    throw new Error("Ethereum Provider custom errors must provide single object argument.");
                const {code: t, message: r, data: i} = e;
                if (!r || "string" != typeof r)
                    throw new Error('"message" must be a nonempty string');
                return new n.EthereumProviderError(t,r,i)
            }
        }
    }
    , {
        "./classes.cjs": 108,
        "./error-constants.cjs": 109,
        "./utils.cjs": 112
    }],
    111: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.errorCodes = r.providerErrors = r.rpcErrors = r.getMessageFromCode = r.serializeError = r.serializeCause = r.dataHasCause = r.EthereumProviderError = r.JsonRpcError = void 0;
        var n = e("./classes.cjs");
        Object.defineProperty(r, "JsonRpcError", {
            enumerable: !0,
            get: function() {
                return n.JsonRpcError
            }
        }),
        Object.defineProperty(r, "EthereumProviderError", {
            enumerable: !0,
            get: function() {
                return n.EthereumProviderError
            }
        });
        var i = e("./utils.cjs");
        Object.defineProperty(r, "dataHasCause", {
            enumerable: !0,
            get: function() {
                return i.dataHasCause
            }
        }),
        Object.defineProperty(r, "serializeCause", {
            enumerable: !0,
            get: function() {
                return i.serializeCause
            }
        }),
        Object.defineProperty(r, "serializeError", {
            enumerable: !0,
            get: function() {
                return i.serializeError
            }
        }),
        Object.defineProperty(r, "getMessageFromCode", {
            enumerable: !0,
            get: function() {
                return i.getMessageFromCode
            }
        });
        var o = e("./errors.cjs");
        Object.defineProperty(r, "rpcErrors", {
            enumerable: !0,
            get: function() {
                return o.rpcErrors
            }
        }),
        Object.defineProperty(r, "providerErrors", {
            enumerable: !0,
            get: function() {
                return o.providerErrors
            }
        });
        var s = e("./error-constants.cjs");
        Object.defineProperty(r, "errorCodes", {
            enumerable: !0,
            get: function() {
                return s.errorCodes
            }
        })
    }
    , {
        "./classes.cjs": 108,
        "./error-constants.cjs": 109,
        "./errors.cjs": 110,
        "./utils.cjs": 112
    }],
    112: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.dataHasCause = r.serializeCause = r.serializeError = r.isValidCode = r.getMessageFromCode = r.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
        const n = e("@metamask/utils")
          , i = e("./error-constants.cjs")
          , o = i.errorCodes.rpc.internal
          , s = {
            code: o,
            message: a(o)
        };
        function a(e, t="Unspecified error message. This is a bug, please report it.") {
            if (u(e)) {
                const t = e.toString();
                if ((0,
                n.hasProperty)(i.errorValues, t))
                    return i.errorValues[t].message;
                if (function(e) {
                    return e >= -32099 && e <= -32e3
                }(e))
                    return r.JSON_RPC_SERVER_ERROR_MESSAGE
            }
            return t
        }
        function u(e) {
            return Number.isInteger(e)
        }
        function c(e) {
            return Array.isArray(e) ? e.map(e => (0,
            n.isValidJson)(e) ? e : (0,
            n.isObject)(e) ? l(e) : null) : (0,
            n.isObject)(e) ? l(e) : (0,
            n.isValidJson)(e) ? e : null
        }
        function l(e) {
            return Object.getOwnPropertyNames(e).reduce( (t, r) => {
                const i = e[r];
                return (0,
                n.isValidJson)(i) && (t[r] = i),
                t
            }
            , {})
        }
        r.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.",
        r.getMessageFromCode = a,
        r.isValidCode = u,
        r.serializeError = function(e, {fallbackError: t=s, shouldIncludeStack: r=!0, shouldPreserveMessage: i=!0}={}) {
            if (!(0,
            n.isJsonRpcError)(t))
                throw new Error("Must provide fallback error with integer number code and string message.");
            const o = function(e, t, r) {
                if (e && "object" == typeof e && "serialize"in e && "function" == typeof e.serialize)
                    return e.serialize();
                if ((0,
                n.isJsonRpcError)(e))
                    return e;
                const i = function(e) {
                    if ((0,
                    n.isObject)(e) && (0,
                    n.hasProperty)(e, "message") && "string" == typeof e.message && e.message.length > 0)
                        return e.message;
                    return
                }(e)
                  , o = c(e)
                  , s = {
                    ...t,
                    ...r && i && {
                        message: i
                    },
                    data: {
                        cause: o
                    }
                };
                return s
            }(e, t, i);
            return r || delete o.stack,
            o
        }
        ,
        r.serializeCause = c,
        r.dataHasCause = function(e) {
            return (0,
            n.isObject)(e) && (0,
            n.hasProperty)(e, "cause") && (0,
            n.isObject)(e.cause)
        }
    }
    , {
        "./error-constants.cjs": 109,
        "@metamask/utils": 138
    }],
    113: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        const n = e("events");
        function i(e, t, r) {
            try {
                Reflect.apply(e, t, r)
            } catch (e) {
                setTimeout( () => {
                    throw e
                }
                )
            }
        }
        class o extends n.EventEmitter {
            emit(e, ...t) {
                let r = "error" === e;
                const n = this._events;
                if (void 0 !== n)
                    r = r && void 0 === n.error;
                else if (!r)
                    return !1;
                if (r) {
                    let e;
                    if (t.length > 0 && ([e] = t),
                    e instanceof Error)
                        throw e;
                    const r = new Error("Unhandled error." + (e ? ` (${e.message})` : ""));
                    throw r.context = e,
                    r
                }
                const o = n[e];
                if (void 0 === o)
                    return !1;
                if ("function" == typeof o)
                    i(o, this, t);
                else {
                    const e = o.length
                      , r = function(e) {
                        const t = e.length
                          , r = new Array(t);
                        for (let n = 0; n < t; n += 1)
                            r[n] = e[n];
                        return r
                    }(o);
                    for (let n = 0; n < e; n += 1)
                        i(r[n], this, t)
                }
                return !0
            }
        }
        r.default = o
    }
    , {
        events: 181
    }],
    114: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.metamaskIcon = void 0,
        r.metamaskIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIzIiBoZWlnaHQ9IjIzIiB4PSIzLjUiIHk9IjMuNSIgdmlld0JveD0iMCAwIDE0MS41MSAxMzYuNDIiPjxwYXRoIGZpbGw9IiNGRjVDMTYiIGQ9Im0xMzIuMjQgMTMxLjc1LTMwLjQ4LTkuMDctMjIuOTkgMTMuNzQtMTYuMDMtLjAxLTIzLTEzLjc0LTMwLjQ3IDkuMDhMMCAxMDAuNDdsOS4yNy0zNC43M0wwIDM2LjQgOS4yNyAwbDQ3LjYgMjguNDRoMjcuNzZMMTMyLjI0IDBsOS4yNyAzNi4zOC05LjI3IDI5LjM2IDkuMjcgMzQuNzItOS4yNyAzMS4zWiIvPjxwYXRoIGZpbGw9IiNGRjVDMTYiIGQ9Im05LjI3IDAgNDcuNjEgMjguNDZMNTQuOTggNDggOS4yOSAwWm0zMC40NyAxMDAuNDggMjAuOTUgMTUuOTUtMjAuOTUgNi4yNHYtMjIuMlpNNTkuMDEgNzQuMSA1NSA0OCAyOS4yMiA2NS43NWgtLjAybC4wOCAxOC4yNyAxMC40NS05LjkyaDE5LjI5Wk0xMzIuMjUgMGwtNDcuNiAyOC40Nkw4Ni41MSA0OGw0NS43Mi00OFptLTMwLjQ3IDEwMC40OC0yMC45NCAxNS45NSAyMC45NCA2LjI0di0yMi4yWm0xMC41My0zNC43M0w4Ni41MyA0OCA4Mi41IDc0LjFoMTkuMjdsMTAuNDYgOS45LjA3LTE4LjI2WiIvPjxwYXRoIGZpbGw9IiNFMzQ4MDciIGQ9Im0zOS43MyAxMjIuNjctMzAuNDYgOS4wOEwwIDEwMC40OGgzOS43M3YyMi4yWk01OS4wMiA3NC4xbDUuODIgMzcuNzEtOC4wNy0yMC45Ny0yNy40OS02LjgyIDEwLjQ2LTkuOTJINTlabTQyLjc2IDQ4LjU5IDMwLjQ3IDkuMDcgOS4yNy0zMS4yN2gtMzkuNzR6TTgyLjUgNzQuMDlsLTUuODIgMzcuNzEgOC4wNi0yMC45NyAyNy41LTYuODItMTAuNDctOS45MnoiLz48cGF0aCBmaWxsPSIjRkY4RDVEIiBkPSJtMCAxMDAuNDcgOS4yNy0zNC43M0gyOS4ybC4wNyAxOC4yNyAyNy41IDYuODIgOC4wNiAyMC45Ny00LjE1IDQuNjItMjAuOTQtMTUuOTZIMFptMTQxLjUgMC05LjI2LTM0LjczaC0xOS45M2wtLjA3IDE4LjI3LTI3LjUgNi44Mi04LjA2IDIwLjk3IDQuMTUgNC42MiAyMC45NC0xNS45NmgzOS43NFpNODQuNjQgMjguNDRINTYuODhsLTEuODkgMTkuNTQgOS44NCA2My44aDExLjg1bDkuODUtNjMuOC0xLjktMTkuNTRaIi8+PHBhdGggZmlsbD0iIzY2MTgwMCIgZD0iTTkuMjcgMCAwIDM2LjM4bDkuMjcgMjkuMzZIMjkuMkw1NC45OCA0OHptNDMuOTggODEuNjdoLTkuMDNsLTQuOTIgNC44MSAxNy40NyA0LjMzLTMuNTItOS4xNVpNMTMyLjI0IDBsOS4yNyAzNi4zOC05LjI3IDI5LjM2aC0xOS45M0w4Ni41MyA0OHpNODguMjcgODEuNjdoOS4wNGw0LjkyIDQuODItMTcuNDkgNC4zNCAzLjUzLTkuMTdabS05LjUgNDIuMyAyLjA2LTcuNTQtNC4xNS00LjYySDY0LjgybC00LjE0IDQuNjIgMi4wNSA3LjU0Ii8+PHBhdGggZmlsbD0iI0MwQzRDRCIgZD0iTTc4Ljc3IDEyMy45N3YxMi40NUg2Mi43NHYtMTIuNDVoMTYuMDJaIi8+PHBhdGggZmlsbD0iI0U3RUJGNiIgZD0ibTM5Ljc0IDEyMi42NiAyMyAxMy43NnYtMTIuNDZsLTIuMDUtNy41NHptNjIuMDMgMC0yMyAxMy43NnYtMTIuNDZsMi4wNi03LjU0eiIvPjwvc3ZnPjwvc3ZnPg=="
    }
    , {}],
    115: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.getWalletStandard = o,
        r.registerSolanaWalletStandard = async function(e) {
            const t = o(e);
            (0,
            n.registerWallet)(t)
        }
        ;
        const n = e("@wallet-standard/wallet")
          , i = e("./wallet.cjs");
        function o(e) {
            return new i.MetamaskWallet(e)
        }
    }
    , {
        "./wallet.cjs": 118,
        "@wallet-standard/wallet": 170
    }],
    116: [function(e, t, r) {
        "use strict";
        var n;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.scopes = r.Scope = void 0,
        function(e) {
            e.MAINNET = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
            e.DEVNET = "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
            e.TESTNET = "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z"
        }(n || (r.Scope = n = {})),
        r.scopes = Object.values(n)
    }
    , {}],
    117: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.CAIP_ACCOUNT_ID_REGEX = void 0,
        r.getAddressFromCaipAccountId = function(e) {
            const t = r.CAIP_ACCOUNT_ID_REGEX.exec(e);
            if (!t?.groups?.accountAddress)
                throw new Error("Invalid CAIP account ID.");
            return t.groups.accountAddress
        }
        ,
        r.getScopeFromWalletStandardChain = function(e) {
            switch (e) {
            case n.SOLANA_MAINNET_CHAIN:
            case void 0:
                return i.Scope.MAINNET;
            case n.SOLANA_TESTNET_CHAIN:
                return i.Scope.TESTNET;
            case n.SOLANA_DEVNET_CHAIN:
                return i.Scope.DEVNET;
            default:
                if (i.scopes.includes(e))
                    return e;
                throw new Error(`Unsupported chainId: ${e}`)
            }
        }
        ,
        r.isAccountChangedEvent = function(e) {
            return "metamask_accountsChanged" === e.params?.notification?.method
        }
        ;
        const n = e("@solana/wallet-standard-chains")
          , i = e("./types.cjs");
        r.CAIP_ACCOUNT_ID_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})):(?<accountAddress>[-.%a-zA-Z0-9]{1,128})$/u
    }
    , {
        "./types.cjs": 116,
        "@solana/wallet-standard-chains": 159
    }],
    118: [function(e, t, r) {
        (function(t) {
            (function() {
                "use strict";
                var n, i, o, s, a, u, c, l, f, d, h, p, g, b, y, m, w, _, v, E = this && this.__classPrivateFieldGet || function(e, t, r, n) {
                    if ("a" === r && !n)
                        throw new TypeError("Private accessor was defined without a getter");
                    if ("function" == typeof t ? e !== t || !n : !t.has(e))
                        throw new TypeError("Cannot read private member from an object whose class did not declare it");
                    return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
                }
                , S = this && this.__classPrivateFieldSet || function(e, t, r, n, i) {
                    if ("m" === n)
                        throw new TypeError("Private method is not writable");
                    if ("a" === n && !i)
                        throw new TypeError("Private accessor was defined without a setter");
                    if ("function" == typeof t ? e !== t || !i : !t.has(e))
                        throw new TypeError("Cannot write private member to an object whose class did not declare it");
                    return "a" === n ? i.call(e, r) : i ? i.value = r : t.set(e, r),
                    r
                }
                , M = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                ;
                Object.defineProperty(r, "__esModule", {
                    value: !0
                }),
                r.MetamaskWallet = r.MetamaskWalletAccount = void 0;
                const A = e("@solana/wallet-standard-chains")
                  , j = e("@solana/wallet-standard-features")
                  , R = e("@wallet-standard/features")
                  , I = e("@wallet-standard/wallet")
                  , T = M(e("bs58"))
                  , O = e("./icon.cjs")
                  , C = e("./types.cjs")
                  , x = e("./utils.cjs");
                class N extends I.ReadonlyWalletAccount {
                    constructor({address: e, publicKey: t, chains: r}) {
                        super({
                            address: e,
                            publicKey: t,
                            chains: r,
                            features: [j.SolanaSignAndSendTransaction, j.SolanaSignTransaction, j.SolanaSignMessage, j.SolanaSignIn]
                        }),
                        new.target === N && Object.freeze(this)
                    }
                }
                r.MetamaskWalletAccount = N;
                r.MetamaskWallet = class {
                    getInitialSelectedAddress() {
                        return new Promise(e => {
                            const t = setTimeout( () => {
                                e(void 0)
                            }
                            , 2e3)
                              , r = this.client.onNotification(n => {
                                if ((0,
                                x.isAccountChangedEvent)(n)) {
                                    const i = n?.params?.notification?.params?.[0];
                                    i && (clearTimeout(t),
                                    r?.(),
                                    e(i))
                                }
                            }
                            )
                        }
                        )
                    }
                    get accounts() {
                        return E(this, s, "f") ? [E(this, s, "f")] : []
                    }
                    get features() {
                        return {
                            [R.StandardConnect]: {
                                version: this.version,
                                connect: E(this, f, "f")
                            },
                            [j.SolanaSignIn]: {
                                version: this.version,
                                signIn: E(this, d, "f")
                            },
                            [R.StandardDisconnect]: {
                                version: this.version,
                                disconnect: E(this, h, "f")
                            },
                            [R.StandardEvents]: {
                                version: this.version,
                                on: E(this, u, "f")
                            },
                            [j.SolanaSignAndSendTransaction]: {
                                version: this.version,
                                supportedTransactionVersions: ["legacy", 0],
                                signAndSendTransaction: E(this, p, "f")
                            },
                            [j.SolanaSignTransaction]: {
                                version: this.version,
                                supportedTransactionVersions: ["legacy", 0],
                                signTransaction: E(this, g, "f")
                            },
                            [j.SolanaSignMessage]: {
                                version: this.version,
                                signMessage: E(this, b, "f")
                            }
                        }
                    }
                    constructor({client: e, walletName: r}) {
                        n.add(this),
                        i.set(this, {}),
                        this.version = "1.0.0",
                        this.icon = O.metamaskIcon,
                        this.chains = [A.SOLANA_MAINNET_CHAIN, A.SOLANA_DEVNET_CHAIN, A.SOLANA_TESTNET_CHAIN],
                        o.set(this, void 0),
                        s.set(this, void 0),
                        a.set(this, void 0),
                        u.set(this, (e, t) => (E(this, i, "f")[e] ? E(this, i, "f")[e]?.push(t) : E(this, i, "f")[e] = [t],
                        () => E(this, n, "m", l).call(this, e, t))),
                        f.set(this, async () => this.accounts.length ? {
                            accounts: this.accounts
                        } : (await E(this, _, "f").call(this),
                        this.accounts.length || await E(this, v, "f").call(this, C.Scope.MAINNET),
                        this.accounts.length ? (S(this, a, this.client.onNotification(E(this, n, "m", y).bind(this)), "f"),
                        {
                            accounts: this.accounts
                        }) : {
                            accounts: []
                        })),
                        d.set(this, async (...e) => {
                            if (!(E(this, s, "f") && this.scope || (await E(this, f, "f").call(this),
                            E(this, s, "f") && this.scope)))
                                throw new Error("Not connected");
                            const r = [];
                            for (const n of e) {
                                const e = await this.client.invokeMethod({
                                    scope: this.scope,
                                    request: {
                                        method: "signIn",
                                        params: {
                                            ...n,
                                            domain: n.domain || window.location.host,
                                            address: n.address || E(this, s, "f").address
                                        }
                                    }
                                });
                                r.push({
                                    account: E(this, s, "f"),
                                    signedMessage: t.from(e.signedMessage, "base64"),
                                    signature: T.default.decode(e.signature)
                                })
                            }
                            return r
                        }
                        ),
                        h.set(this, async (e={}) => {
                            const {revokeSession: t=!0} = e;
                            S(this, s, void 0, "f"),
                            this.scope = void 0,
                            E(this, a, "f")?.call(this),
                            S(this, a, void 0, "f"),
                            E(this, n, "m", c).call(this, "change", {
                                accounts: this.accounts
                            }),
                            t && await this.client.revokeSession({
                                scopes: [C.Scope.MAINNET, C.Scope.DEVNET, C.Scope.TESTNET]
                            })
                        }
                        ),
                        p.set(this, async (...e) => {
                            const r = E(this, s, "f");
                            if (!r)
                                throw new Error("Not connected");
                            E(this, w, "f").call(this, e);
                            const n = (0,
                            x.getScopeFromWalletStandardChain)(e[0]?.chain)
                              , i = await this.client.getSession()
                              , o = i?.sessionScopes[n]?.accounts;
                            o?.includes(`${n}:${r.address}`) ? this.scope = n : await E(this, v, "f").call(this, n, [r.address]);
                            const a = [];
                            for (const {transaction: r, account: i} of e) {
                                const e = t.from(r).toString("base64")
                                  , o = await this.client.invokeMethod({
                                    scope: n,
                                    request: {
                                        method: "signAndSendTransaction",
                                        params: {
                                            account: {
                                                address: i.address
                                            },
                                            transaction: e,
                                            scope: n
                                        }
                                    }
                                });
                                a.push({
                                    signature: T.default.decode(o.signature)
                                })
                            }
                            return a
                        }
                        ),
                        g.set(this, async (...e) => {
                            if (!this.scope)
                                throw new Error("Not connected");
                            const r = [];
                            for (const {transaction: n, account: i} of e) {
                                const e = t.from(n).toString("base64")
                                  , o = await this.client.invokeMethod({
                                    scope: this.scope,
                                    request: {
                                        method: "signTransaction",
                                        params: {
                                            account: {
                                                address: i.address
                                            },
                                            transaction: e,
                                            scope: this.scope
                                        }
                                    }
                                });
                                r.push({
                                    signedTransaction: Uint8Array.from(t.from(o.signedTransaction, "base64"))
                                })
                            }
                            return r
                        }
                        ),
                        b.set(this, async (...e) => {
                            if (!this.scope)
                                throw new Error("Not connected");
                            const r = [];
                            for (const {message: n, account: i} of e) {
                                const e = t.from(n).toString("base64")
                                  , o = await this.client.invokeMethod({
                                    scope: this.scope,
                                    request: {
                                        method: "signMessage",
                                        params: {
                                            message: e,
                                            account: {
                                                address: i.address
                                            }
                                        }
                                    }
                                });
                                r.push({
                                    signedMessage: t.from(o.signedMessage, "base64"),
                                    signature: T.default.decode(o.signature),
                                    signatureType: o.signatureType
                                })
                            }
                            return r
                        }
                        ),
                        w.set(this, e => {
                            const t = E(this, s, "f")?.address
                              , r = e[0]?.chain;
                            for (const {account: {address: n}, chain: i} of e) {
                                if (n !== t)
                                    throw new Error("Invalid transaction addresses");
                                if (i !== r)
                                    throw new Error("All transactions must be on the same chain")
                            }
                        }
                        ),
                        _.set(this, async () => {
                            try {
                                const e = await this.client.getSession();
                                if (!e)
                                    return;
                                const t = await E(this, o, "f");
                                this.updateSession(e, t)
                            } catch (e) {
                                console.warn("Error restoring session", e)
                            }
                        }
                        ),
                        v.set(this, async (e, t) => {
                            let r;
                            const n = new Promise(e => {
                                r = e
                            }
                            )
                              , i = this.client.onNotification(e => {
                                if (!(0,
                                x.isAccountChangedEvent)(e))
                                    return;
                                const t = e?.params?.notification?.params?.[0];
                                t && (i(),
                                r(t))
                            }
                            )
                              , o = await this.client.createSession({
                                optionalScopes: {
                                    [e]: {
                                        ...t ? {
                                            accounts: t.map(t => `${e}:${t}`)
                                        } : {},
                                        methods: [],
                                        notifications: []
                                    }
                                },
                                sessionProperties: {
                                    solana_accountChanged_notifications: !0
                                }
                            })
                              , s = await Promise.race([n, new Promise(e => setTimeout( () => e(void 0), 200))]);
                            this.updateSession(o, s)
                        }
                        ),
                        this.client = e,
                        this.name = `${r ?? "MetaMask"}`,
                        S(this, o, this.getInitialSelectedAddress(), "f")
                    }
                    updateSession(e, t) {
                        const r = new Set(Object.keys(e?.sessionScopes ?? {}))
                          , i = [C.Scope.MAINNET, C.Scope.DEVNET, C.Scope.TESTNET].find(e => r.has(e));
                        if (!i)
                            return void S(this, s, void 0, "f");
                        const o = e?.sessionScopes[i]?.accounts;
                        if (!o?.[0])
                            return void S(this, s, void 0, "f");
                        let a;
                        a = t && o.includes(`${i}:${t}`) ? t : E(this, s, "f")?.address && o.includes(`${i}:${E(this, s, "f")?.address}`) ? E(this, s, "f").address : (0,
                        x.getAddressFromCaipAccountId)(o[0]),
                        S(this, s, E(this, n, "m", m).call(this, a), "f"),
                        this.scope = i,
                        E(this, n, "m", c).call(this, "change", {
                            accounts: this.accounts
                        })
                    }
                }
                ,
                i = new WeakMap,
                o = new WeakMap,
                s = new WeakMap,
                a = new WeakMap,
                u = new WeakMap,
                f = new WeakMap,
                d = new WeakMap,
                h = new WeakMap,
                p = new WeakMap,
                g = new WeakMap,
                b = new WeakMap,
                w = new WeakMap,
                _ = new WeakMap,
                v = new WeakMap,
                n = new WeakSet,
                c = function(e, ...t) {
                    for (const r of E(this, i, "f")[e] ?? [])
                        r.apply(null, t)
                }
                ,
                l = function(e, t) {
                    E(this, i, "f")[e] = E(this, i, "f")[e]?.filter(e => t !== e)
                }
                ,
                y = async function(e) {
                    if (!(0,
                    x.isAccountChangedEvent)(e))
                        return;
                    const t = e?.params?.notification?.params?.[0];
                    if (!t)
                        return void await E(this, h, "f").call(this, {
                            revokeSession: !1
                        });
                    const r = await this.client.getSession();
                    this.updateSession(r, t)
                }
                ,
                m = function(e) {
                    return new N({
                        address: e,
                        publicKey: new Uint8Array(T.default.decode(e)),
                        chains: this.chains
                    })
                }
            }
            ).call(this)
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "./icon.cjs": 114,
        "./types.cjs": 116,
        "./utils.cjs": 117,
        "@solana/wallet-standard-chains": 159,
        "@solana/wallet-standard-features": 160,
        "@wallet-standard/features": 169,
        "@wallet-standard/wallet": 170,
        bs58: 178,
        buffer: 176
    }],
    119: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.StructError = void 0;
        class n extends TypeError {
            constructor(e, t) {
                let r;
                const {message: n, explanation: i, ...o} = e
                  , {path: s} = e
                  , a = 0 === s.length ? n : `At path: ${s.join(".")} -- ${n}`;
                super(i ?? a),
                null != i && (this.cause = a),
                Object.assign(this, o),
                this.name = this.constructor.name,
                this.failures = () => r ?? (r = [e, ...t()])
            }
        }
        r.StructError = n
    }
    , {}],
    120: [function(e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
            void 0 === n && (n = r);
            var i = Object.getOwnPropertyDescriptor(t, r);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[r]
                }
            }),
            Object.defineProperty(e, n, i)
        }
        : function(e, t, r, n) {
            void 0 === n && (n = r),
            e[n] = t[r]
        }
        )
          , i = this && this.__exportStar || function(e, t) {
            for (var r in e)
                "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        i(e("./error.cjs"), r),
        i(e("./struct.cjs"), r),
        i(e("./structs/coercions.cjs"), r),
        i(e("./structs/refinements.cjs"), r),
        i(e("./structs/types.cjs"), r),
        i(e("./structs/utilities.cjs"), r)
    }
    , {
        "./error.cjs": 119,
        "./struct.cjs": 121,
        "./structs/coercions.cjs": 122,
        "./structs/refinements.cjs": 123,
        "./structs/types.cjs": 124,
        "./structs/utilities.cjs": 125
    }],
    121: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.validate = r.is = r.mask = r.create = r.assert = r.ExactOptionalStruct = r.Struct = void 0;
        const n = e("./error.cjs")
          , i = e("./utils.cjs");
        class o {
            constructor(e) {
                const {type: t, schema: r, validator: n, refiner: o, coercer: s=e => e, entries: a=function*() {}
                } = e;
                this.type = t,
                this.schema = r,
                this.entries = a,
                this.coercer = s,
                this.validator = n ? (e, t) => {
                    const r = n(e, t);
                    return (0,
                    i.toFailures)(r, t, this, e)
                }
                : () => [],
                this.refiner = o ? (e, t) => {
                    const r = o(e, t);
                    return (0,
                    i.toFailures)(r, t, this, e)
                }
                : () => []
            }
            assert(e, t) {
                return a(e, this, t)
            }
            create(e, t) {
                return u(e, this, t)
            }
            is(e) {
                return l(e, this)
            }
            mask(e, t) {
                return c(e, this, t)
            }
            validate(e, t={}) {
                return f(e, this, t)
            }
        }
        r.Struct = o;
        const s = "EXACT_OPTIONAL";
        function a(e, t, r) {
            const n = f(e, t, {
                message: r
            });
            if (n[0])
                throw n[0]
        }
        function u(e, t, r) {
            const n = f(e, t, {
                coerce: !0,
                message: r
            });
            if (n[0])
                throw n[0];
            return n[1]
        }
        function c(e, t, r) {
            const n = f(e, t, {
                coerce: !0,
                mask: !0,
                message: r
            });
            if (n[0])
                throw n[0];
            return n[1]
        }
        function l(e, t) {
            return !f(e, t)[0]
        }
        function f(e, t, r={}) {
            const o = (0,
            i.run)(e, t, r)
              , s = (0,
            i.shiftIterator)(o);
            if (s[0]) {
                return [new n.StructError(s[0],function*() {
                    for (const e of o)
                        e[0] && (yield e[0])
                }
                ), void 0]
            }
            return [void 0, s[1]]
        }
        r.ExactOptionalStruct = class extends o {
            constructor(e) {
                super({
                    ...e,
                    type: `exact optional ${e.type}`
                }),
                this.brand = s
            }
            static isExactOptional(e) {
                return (0,
                i.isObject)(e) && "brand"in e && e.brand === s
            }
        }
        ,
        r.assert = a,
        r.create = u,
        r.mask = c,
        r.is = l,
        r.validate = f
    }
    , {
        "./error.cjs": 119,
        "./utils.cjs": 126
    }],
    122: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.trimmed = r.defaulted = r.coerce = void 0;
        const n = e("../struct.cjs")
          , i = e("../utils.cjs")
          , o = e("./types.cjs");
        function s(e, t, r) {
            return new n.Struct({
                ...e,
                coercer: (i, o) => (0,
                n.is)(i, t) ? e.coercer(r(i, o), o) : e.coercer(i, o)
            })
        }
        r.coerce = s,
        r.defaulted = function(e, t, r={}) {
            return s(e, (0,
            o.unknown)(), e => {
                const n = "function" == typeof t ? t() : t;
                if (void 0 === e)
                    return n;
                if (!r.strict && (0,
                i.isPlainObject)(e) && (0,
                i.isPlainObject)(n)) {
                    const t = {
                        ...e
                    };
                    let r = !1;
                    for (const e in n)
                        void 0 === t[e] && (t[e] = n[e],
                        r = !0);
                    if (r)
                        return t
                }
                return e
            }
            )
        }
        ,
        r.trimmed = function(e) {
            return s(e, (0,
            o.string)(), e => e.trim())
        }
    }
    , {
        "../struct.cjs": 121,
        "../utils.cjs": 126,
        "./types.cjs": 124
    }],
    123: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.refine = r.size = r.pattern = r.nonempty = r.min = r.max = r.empty = void 0;
        const n = e("../struct.cjs")
          , i = e("../utils.cjs");
        function o(e) {
            return e instanceof Map || e instanceof Set ? e.size : e.length
        }
        function s(e, t, r) {
            return new n.Struct({
                ...e,
                *refiner(n, o) {
                    yield*e.refiner(n, o);
                    const s = r(n, o)
                      , a = (0,
                    i.toFailures)(s, o, e, n);
                    for (const e of a)
                        yield{
                            ...e,
                            refinement: t
                        }
                }
            })
        }
        r.empty = function(e) {
            return s(e, "empty", t => {
                const r = o(t);
                return 0 === r || `Expected an empty ${e.type} but received one with a size of \`${r}\``
            }
            )
        }
        ,
        r.max = function(e, t, r={}) {
            const {exclusive: n} = r;
            return s(e, "max", r => n ? r < t : r <= t || `Expected a ${e.type} less than ${n ? "" : "or equal to "}${t} but received \`${r}\``)
        }
        ,
        r.min = function(e, t, r={}) {
            const {exclusive: n} = r;
            return s(e, "min", r => n ? r > t : r >= t || `Expected a ${e.type} greater than ${n ? "" : "or equal to "}${t} but received \`${r}\``)
        }
        ,
        r.nonempty = function(e) {
            return s(e, "nonempty", t => o(t) > 0 || `Expected a nonempty ${e.type} but received an empty one`)
        }
        ,
        r.pattern = function(e, t) {
            return s(e, "pattern", r => t.test(r) || `Expected a ${e.type} matching \`/${t.source}/\` but received "${r}"`)
        }
        ,
        r.size = function(e, t, r=t) {
            const n = `Expected a ${e.type}`
              , i = t === r ? `of \`${t}\`` : `between \`${t}\` and \`${r}\``;
            return s(e, "size", e => {
                if ("number" == typeof e || e instanceof Date)
                    return t <= e && e <= r || `${n} ${i} but received \`${e}\``;
                if (e instanceof Map || e instanceof Set) {
                    const {size: o} = e;
                    return t <= o && o <= r || `${n} with a size ${i} but received one with a size of \`${o}\``
                }
                const {length: o} = e;
                return t <= o && o <= r || `${n} with a length ${i} but received one with a length of \`${o}\``
            }
            )
        }
        ,
        r.refine = s
    }
    , {
        "../struct.cjs": 121,
        "../utils.cjs": 126
    }],
    124: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.unknown = r.union = r.type = r.tuple = r.string = r.set = r.regexp = r.record = r.exactOptional = r.optional = r.object = r.number = r.nullable = r.never = r.map = r.literal = r.intersection = r.integer = r.instance = r.func = r.enums = r.date = r.boolean = r.bigint = r.array = r.any = void 0;
        const n = e("../struct.cjs")
          , i = e("../utils.cjs")
          , o = e("./utilities.cjs");
        function s() {
            return (0,
            o.define)("never", () => !1)
        }
        r.any = function() {
            return (0,
            o.define)("any", () => !0)
        }
        ,
        r.array = function(e) {
            return new n.Struct({
                type: "array",
                schema: e,
                *entries(t) {
                    if (e && Array.isArray(t))
                        for (const [r,n] of t.entries())
                            yield[r, n, e]
                },
                coercer: e => Array.isArray(e) ? e.slice() : e,
                validator: e => Array.isArray(e) || `Expected an array value, but received: ${(0,
                i.print)(e)}`
            })
        }
        ,
        r.bigint = function() {
            return (0,
            o.define)("bigint", e => "bigint" == typeof e)
        }
        ,
        r.boolean = function() {
            return (0,
            o.define)("boolean", e => "boolean" == typeof e)
        }
        ,
        r.date = function() {
            return (0,
            o.define)("date", e => e instanceof Date && !isNaN(e.getTime()) || `Expected a valid \`Date\` object, but received: ${(0,
            i.print)(e)}`)
        }
        ,
        r.enums = function(e) {
            const t = {}
              , r = e.map(e => (0,
            i.print)(e)).join();
            for (const r of e)
                t[r] = r;
            return new n.Struct({
                type: "enums",
                schema: t,
                validator: t => e.includes(t) || `Expected one of \`${r}\`, but received: ${(0,
                i.print)(t)}`
            })
        }
        ,
        r.func = function() {
            return (0,
            o.define)("func", e => "function" == typeof e || `Expected a function, but received: ${(0,
            i.print)(e)}`)
        }
        ,
        r.instance = function(e) {
            return (0,
            o.define)("instance", t => t instanceof e || `Expected a \`${e.name}\` instance, but received: ${(0,
            i.print)(t)}`)
        }
        ,
        r.integer = function() {
            return (0,
            o.define)("integer", e => "number" == typeof e && !isNaN(e) && Number.isInteger(e) || `Expected an integer, but received: ${(0,
            i.print)(e)}`)
        }
        ,
        r.intersection = function(e) {
            return new n.Struct({
                type: "intersection",
                schema: null,
                *entries(t, r) {
                    for (const {entries: n} of e)
                        yield*n(t, r)
                },
                *validator(t, r) {
                    for (const {validator: n} of e)
                        yield*n(t, r)
                },
                *refiner(t, r) {
                    for (const {refiner: n} of e)
                        yield*n(t, r)
                }
            })
        }
        ,
        r.literal = function(e) {
            const t = (0,
            i.print)(e)
              , r = typeof e;
            return new n.Struct({
                type: "literal",
                schema: "string" === r || "number" === r || "boolean" === r ? e : null,
                validator: r => r === e || `Expected the literal \`${t}\`, but received: ${(0,
                i.print)(r)}`
            })
        }
        ,
        r.map = function(e, t) {
            return new n.Struct({
                type: "map",
                schema: null,
                *entries(r) {
                    if (e && t && r instanceof Map)
                        for (const [n,i] of r.entries())
                            yield[n, n, e],
                            yield[n, i, t]
                },
                coercer: e => e instanceof Map ? new Map(e) : e,
                validator: e => e instanceof Map || `Expected a \`Map\` object, but received: ${(0,
                i.print)(e)}`
            })
        }
        ,
        r.never = s,
        r.nullable = function(e) {
            return new n.Struct({
                ...e,
                validator: (t, r) => null === t || e.validator(t, r),
                refiner: (t, r) => null === t || e.refiner(t, r)
            })
        }
        ,
        r.number = function() {
            return (0,
            o.define)("number", e => "number" == typeof e && !isNaN(e) || `Expected a number, but received: ${(0,
            i.print)(e)}`)
        }
        ,
        r.object = function(e) {
            const t = e ? Object.keys(e) : []
              , r = s();
            return new n.Struct({
                type: "object",
                schema: e ?? null,
                *entries(o) {
                    if (e && (0,
                    i.isObject)(o)) {
                        const i = new Set(Object.keys(o));
                        for (const r of t) {
                            i.delete(r);
                            const t = e[r];
                            n.ExactOptionalStruct.isExactOptional(t) && !Object.prototype.hasOwnProperty.call(o, r) || (yield[r, o[r], e[r]])
                        }
                        for (const e of i)
                            yield[e, o[e], r]
                    }
                },
                validator: e => (0,
                i.isObject)(e) || `Expected an object, but received: ${(0,
                i.print)(e)}`,
                coercer: e => (0,
                i.isObject)(e) ? {
                    ...e
                } : e
            })
        }
        ,
        r.optional = function(e) {
            return new n.Struct({
                ...e,
                validator: (t, r) => void 0 === t || e.validator(t, r),
                refiner: (t, r) => void 0 === t || e.refiner(t, r)
            })
        }
        ,
        r.exactOptional = function(e) {
            return new n.ExactOptionalStruct(e)
        }
        ,
        r.record = function(e, t) {
            return new n.Struct({
                type: "record",
                schema: null,
                *entries(r) {
                    if ((0,
                    i.isObject)(r))
                        for (const n in r) {
                            const i = r[n];
                            yield[n, n, e],
                            yield[n, i, t]
                        }
                },
                validator: e => (0,
                i.isObject)(e) || `Expected an object, but received: ${(0,
                i.print)(e)}`
            })
        }
        ,
        r.regexp = function() {
            return (0,
            o.define)("regexp", e => e instanceof RegExp)
        }
        ,
        r.set = function(e) {
            return new n.Struct({
                type: "set",
                schema: null,
                *entries(t) {
                    if (e && t instanceof Set)
                        for (const r of t)
                            yield[r, r, e]
                },
                coercer: e => e instanceof Set ? new Set(e) : e,
                validator: e => e instanceof Set || `Expected a \`Set\` object, but received: ${(0,
                i.print)(e)}`
            })
        }
        ,
        r.string = function() {
            return (0,
            o.define)("string", e => "string" == typeof e || `Expected a string, but received: ${(0,
            i.print)(e)}`)
        }
        ,
        r.tuple = function(e) {
            const t = s();
            return new n.Struct({
                type: "tuple",
                schema: null,
                *entries(r) {
                    if (Array.isArray(r)) {
                        const n = Math.max(e.length, r.length);
                        for (let i = 0; i < n; i++)
                            yield[i, r[i], e[i] || t]
                    }
                },
                validator: e => Array.isArray(e) || `Expected an array, but received: ${(0,
                i.print)(e)}`
            })
        }
        ,
        r.type = function(e) {
            const t = Object.keys(e);
            return new n.Struct({
                type: "type",
                schema: e,
                *entries(r) {
                    if ((0,
                    i.isObject)(r))
                        for (const n of t)
                            yield[n, r[n], e[n]]
                },
                validator: e => (0,
                i.isObject)(e) || `Expected an object, but received: ${(0,
                i.print)(e)}`,
                coercer: e => (0,
                i.isObject)(e) ? {
                    ...e
                } : e
            })
        }
        ,
        r.union = function(e) {
            const t = e.map(e => e.type).join(" | ");
            return new n.Struct({
                type: "union",
                schema: null,
                coercer(t) {
                    for (const r of e) {
                        const [e,n] = r.validate(t, {
                            coerce: !0
                        });
                        if (!e)
                            return n
                    }
                    return t
                },
                validator(r, n) {
                    const o = [];
                    for (const t of e) {
                        const [...e] = (0,
                        i.run)(r, t, n)
                          , [s] = e;
                        if (!s?.[0])
                            return [];
                        for (const [t] of e)
                            t && o.push(t)
                    }
                    return [`Expected the value to satisfy a union of \`${t}\`, but received: ${(0,
                    i.print)(r)}`, ...o]
                }
            })
        }
        ,
        r.unknown = function() {
            return (0,
            o.define)("unknown", () => !0)
        }
    }
    , {
        "../struct.cjs": 121,
        "../utils.cjs": 126,
        "./utilities.cjs": 125
    }],
    125: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.pick = r.partial = r.omit = r.lazy = r.dynamic = r.deprecated = r.define = r.assign = void 0;
        const n = e("../struct.cjs")
          , i = e("./types.cjs");
        r.assign = function(...e) {
            const t = "type" === e[0]?.type
              , r = e.map( ({schema: e}) => e)
              , n = Object.assign({}, ...r);
            return t ? (0,
            i.type)(n) : (0,
            i.object)(n)
        }
        ,
        r.define = function(e, t) {
            return new n.Struct({
                type: e,
                schema: null,
                validator: t
            })
        }
        ,
        r.deprecated = function(e, t) {
            return new n.Struct({
                ...e,
                refiner: (t, r) => void 0 === t || e.refiner(t, r),
                validator: (r, n) => void 0 === r || (t(r, n),
                e.validator(r, n))
            })
        }
        ,
        r.dynamic = function(e) {
            return new n.Struct({
                type: "dynamic",
                schema: null,
                *entries(t, r) {
                    const n = e(t, r);
                    yield*n.entries(t, r)
                },
                validator: (t, r) => e(t, r).validator(t, r),
                coercer: (t, r) => e(t, r).coercer(t, r),
                refiner: (t, r) => e(t, r).refiner(t, r)
            })
        }
        ,
        r.lazy = function(e) {
            let t;
            return new n.Struct({
                type: "lazy",
                schema: null,
                *entries(r, n) {
                    t ?? (t = e()),
                    yield*t.entries(r, n)
                },
                validator: (r, n) => (t ?? (t = e()),
                t.validator(r, n)),
                coercer: (r, n) => (t ?? (t = e()),
                t.coercer(r, n)),
                refiner: (r, n) => (t ?? (t = e()),
                t.refiner(r, n))
            })
        }
        ,
        r.omit = function(e, t) {
            const {schema: r} = e
              , n = {
                ...r
            };
            for (const e of t)
                delete n[e];
            return "type" === e.type ? (0,
            i.type)(n) : (0,
            i.object)(n)
        }
        ,
        r.partial = function(e) {
            const t = e instanceof n.Struct
              , r = t ? {
                ...e.schema
            } : {
                ...e
            };
            for (const e in r)
                r[e] = (0,
                i.optional)(r[e]);
            return t && "type" === e.type ? (0,
            i.type)(r) : (0,
            i.object)(r)
        }
        ,
        r.pick = function(e, t) {
            const {schema: r} = e
              , n = {};
            for (const e of t)
                n[e] = r[e];
            return "type" === e.type ? (0,
            i.type)(n) : (0,
            i.object)(n)
        }
    }
    , {
        "../struct.cjs": 121,
        "./types.cjs": 124
    }],
    126: [function(e, t, r) {
        "use strict";
        function n(e) {
            return "object" == typeof e && null !== e
        }
        function i(e) {
            return "symbol" == typeof e ? e.toString() : "string" == typeof e ? JSON.stringify(e) : `${e}`
        }
        function o(e, t, r, n) {
            if (!0 === e)
                return;
            !1 === e ? e = {} : "string" == typeof e && (e = {
                message: e
            });
            const {path: o, branch: s} = t
              , {type: a} = r
              , {refinement: u, message: c=`Expected a value of type \`${a}\`${u ? ` with refinement \`${u}\`` : ""}, but received: \`${i(n)}\``} = e;
            return {
                value: n,
                type: a,
                refinement: u,
                key: o[o.length - 1],
                path: o,
                branch: s,
                ...e,
                message: c
            }
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.run = r.toFailures = r.toFailure = r.shiftIterator = r.print = r.isPlainObject = r.isObject = void 0,
        r.isObject = n,
        r.isPlainObject = function(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e))
                return !1;
            const t = Object.getPrototypeOf(e);
            return null === t || t === Object.prototype
        }
        ,
        r.print = i,
        r.shiftIterator = function(e) {
            const {done: t, value: r} = e.next();
            return t ? void 0 : r
        }
        ,
        r.toFailure = o,
        r.toFailures = function*(e, t, r, i) {
            (function(e) {
                return n(e) && "function" == typeof e[Symbol.iterator]
            }
            )(e) || (e = [e]);
            for (const n of e) {
                const e = o(n, t, r, i);
                e && (yield e)
            }
        }
        ,
        r.run = function *e(t, r, i={}) {
            const {path: o=[], branch: s=[t], coerce: a=!1, mask: u=!1} = i
              , c = {
                path: o,
                branch: s
            };
            if (a && (t = r.coercer(t, c),
            u && "type" !== r.type && n(r.schema) && n(t) && !Array.isArray(t)))
                for (const e in t)
                    void 0 === r.schema[e] && delete t[e];
            let l = "valid";
            for (const e of r.validator(t, c))
                e.explanation = i.message,
                l = "not_valid",
                yield[e, void 0];
            for (let[f,d,h] of r.entries(t, c)) {
                const r = e(d, h, {
                    path: void 0 === f ? o : [...o, f],
                    branch: void 0 === f ? s : [...s, d],
                    coerce: a,
                    mask: u,
                    message: i.message
                });
                for (const e of r)
                    e[0] ? (l = null === e[0].refinement || void 0 === e[0].refinement ? "not_valid" : "not_refined",
                    yield[e[0], void 0]) : a && (d = e[1],
                    void 0 === f ? t = d : t instanceof Map ? t.set(f, d) : t instanceof Set ? t.add(d) : n(t) && (void 0 !== d || f in t) && (t[f] = d))
            }
            if ("not_valid" !== l)
                for (const e of r.refiner(t, c))
                    e.explanation = i.message,
                    l = "not_refined",
                    yield[e, void 0];
            "valid" === l && (yield[void 0, t])
        }
    }
    , {}],
    127: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.assertExhaustive = r.assertStruct = r.assert = r.AssertionError = void 0;
        const n = e("@metamask/superstruct")
          , i = e("./errors.cjs");
        function o(e, t) {
            return r = e,
            Boolean("string" == typeof r?.prototype?.constructor?.name) ? new e({
                message: t
            }) : e({
                message: t
            });
            var r
        }
        class s extends Error {
            constructor(e) {
                super(e.message),
                this.code = "ERR_ASSERTION"
            }
        }
        r.AssertionError = s,
        r.assert = function(e, t="Assertion failed.", r=s) {
            if (!e) {
                if (t instanceof Error)
                    throw t;
                throw o(r, t)
            }
        }
        ,
        r.assertStruct = function(e, t, r="Assertion failed", a=s) {
            try {
                (0,
                n.assert)(e, t)
            } catch (e) {
                throw o(a, `${r}: ${function(e) {
                    return (0,
                    i.getErrorMessage)(e).replace(/\.$/u, "")
                }(e)}.`)
            }
        }
        ,
        r.assertExhaustive = function(e) {
            throw new Error("Invalid branch reached. Should be detected during compilation.")
        }
    }
    , {
        "./errors.cjs": 135,
        "@metamask/superstruct": 120
    }],
    128: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.base64 = void 0;
        const n = e("@metamask/superstruct")
          , i = e("./assert.cjs");
        r.base64 = (e, t={}) => {
            const r = t.paddingRequired ?? !1
              , o = t.characterSet ?? "base64";
            let s, a;
            return "base64" === o ? s = String.raw`[A-Za-z0-9+\/]` : ((0,
            i.assert)("base64url" === o),
            s = String.raw`[-_A-Za-z0-9]`),
            a = r ? new RegExp(`^(?:${s}{4})*(?:${s}{3}=|${s}{2}==)?$`,"u") : new RegExp(`^(?:${s}{4})*(?:${s}{2,3}|${s}{3}=|${s}{2}==)?$`,"u"),
            (0,
            n.pattern)(e, a)
        }
    }
    , {
        "./assert.cjs": 127,
        "@metamask/superstruct": 120
    }],
    129: [function(e, t, r) {
        (function(t) {
            (function() {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                }),
                r.areUint8ArraysEqual = r.createDataView = r.concatBytes = r.valueToBytes = r.base64ToBytes = r.stringToBytes = r.numberToBytes = r.signedBigIntToBytes = r.bigIntToBytes = r.hexToBytes = r.bytesToBase64 = r.bytesToString = r.bytesToNumber = r.bytesToSignedBigInt = r.bytesToBigInt = r.bytesToHex = r.assertIsBytes = r.isBytes = void 0;
                const n = e("@scure/base")
                  , i = e("./assert.cjs")
                  , o = e("./hex.cjs");
                const s = function() {
                    const e = [];
                    return () => {
                        if (0 === e.length)
                            for (let t = 0; t < 256; t++)
                                e.push(t.toString(16).padStart(2, "0"));
                        return e
                    }
                }();
                function a(e) {
                    return e instanceof Uint8Array
                }
                function u(e) {
                    (0,
                    i.assert)(a(e), "Value must be a Uint8Array.")
                }
                function c(e) {
                    if (u(e),
                    0 === e.length)
                        return "0x";
                    const t = s()
                      , r = new Array(e.length);
                    for (let n = 0; n < e.length; n++)
                        r[n] = t[e[n]];
                    return (0,
                    o.add0x)(r.join(""))
                }
                function l(e) {
                    u(e);
                    const t = c(e);
                    return BigInt(t)
                }
                function f(e) {
                    if ("0x" === e?.toLowerCase?.())
                        return new Uint8Array;
                    (0,
                    o.assertIsHexString)(e);
                    const t = (0,
                    o.remove0x)(e).toLowerCase()
                      , r = t.length % 2 == 0 ? t : `0${t}`
                      , n = new Uint8Array(r.length / 2);
                    for (let e = 0; e < n.length; e++) {
                        const t = r.charCodeAt(2 * e)
                          , i = r.charCodeAt(2 * e + 1)
                          , o = t - (t < 58 ? 48 : 87)
                          , s = i - (i < 58 ? 48 : 87);
                        n[e] = 16 * o + s
                    }
                    return n
                }
                function d(e) {
                    (0,
                    i.assert)("bigint" == typeof e, "Value must be a bigint."),
                    (0,
                    i.assert)(e >= BigInt(0), "Value must be a non-negative bigint.");
                    return f(e.toString(16))
                }
                function h(e) {
                    (0,
                    i.assert)("number" == typeof e, "Value must be a number."),
                    (0,
                    i.assert)(e >= 0, "Value must be a non-negative number."),
                    (0,
                    i.assert)(Number.isSafeInteger(e), "Value is not a safe integer. Use `bigIntToBytes` instead.");
                    return f(e.toString(16))
                }
                function p(e) {
                    return (0,
                    i.assert)("string" == typeof e, "Value must be a string."),
                    (new TextEncoder).encode(e)
                }
                function g(e) {
                    if ("bigint" == typeof e)
                        return d(e);
                    if ("number" == typeof e)
                        return h(e);
                    if ("string" == typeof e)
                        return e.startsWith("0x") ? f(e) : p(e);
                    if (a(e))
                        return e;
                    throw new TypeError(`Unsupported value type: "${typeof e}".`)
                }
                r.isBytes = a,
                r.assertIsBytes = u,
                r.bytesToHex = c,
                r.bytesToBigInt = l,
                r.bytesToSignedBigInt = function(e) {
                    u(e);
                    let t = BigInt(0);
                    for (const r of e)
                        t = (t << BigInt(8)) + BigInt(r);
                    return BigInt.asIntN(8 * e.length, t)
                }
                ,
                r.bytesToNumber = function(e) {
                    u(e);
                    const t = l(e);
                    return (0,
                    i.assert)(t <= BigInt(Number.MAX_SAFE_INTEGER), "Number is not a safe integer. Use `bytesToBigInt` instead."),
                    Number(t)
                }
                ,
                r.bytesToString = function(e) {
                    return u(e),
                    (new TextDecoder).decode(e)
                }
                ,
                r.bytesToBase64 = function(e) {
                    return u(e),
                    n.base64.encode(e)
                }
                ,
                r.hexToBytes = f,
                r.bigIntToBytes = d,
                r.signedBigIntToBytes = function(e, t) {
                    (0,
                    i.assert)("bigint" == typeof e, "Value must be a bigint."),
                    (0,
                    i.assert)("number" == typeof t, "Byte length must be a number."),
                    (0,
                    i.assert)(t > 0, "Byte length must be greater than 0."),
                    (0,
                    i.assert)(function(e, t) {
                        (0,
                        i.assert)(t > 0);
                        const r = e >> BigInt(31);
                        return !((~e & r) + (e & ~r) >> BigInt(8 * t - 1))
                    }(e, t), "Byte length is too small to represent the given value.");
                    let r = e;
                    const n = new Uint8Array(t);
                    for (let e = 0; e < n.length; e++)
                        n[e] = Number(BigInt.asUintN(8, r)),
                        r >>= BigInt(8);
                    return n.reverse()
                }
                ,
                r.numberToBytes = h,
                r.stringToBytes = p,
                r.base64ToBytes = function(e) {
                    return (0,
                    i.assert)("string" == typeof e, "Value must be a string."),
                    n.base64.decode(e)
                }
                ,
                r.valueToBytes = g,
                r.concatBytes = function(e) {
                    const t = new Array(e.length);
                    let r = 0;
                    for (let n = 0; n < e.length; n++) {
                        const i = g(e[n]);
                        t[n] = i,
                        r += i.length
                    }
                    const n = new Uint8Array(r);
                    for (let e = 0, r = 0; e < t.length; e++)
                        n.set(t[e], r),
                        r += t[e].length;
                    return n
                }
                ,
                r.createDataView = function(e) {
                    if (void 0 !== t && e instanceof t) {
                        const t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
                        return new DataView(t)
                    }
                    return new DataView(e.buffer,e.byteOffset,e.byteLength)
                }
                ,
                r.areUint8ArraysEqual = function(e, t) {
                    let r = e.byteLength ^ t.byteLength;
                    const n = Math.max(e.byteLength, t.byteLength);
                    for (let i = 0; i < n; i++) {
                        r |= (e[i] ?? 0) ^ (t[i] ?? 0)
                    }
                    return 0 === r
                }
            }
            ).call(this)
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "./assert.cjs": 127,
        "./hex.cjs": 137,
        "@scure/base": 158,
        buffer: 176
    }],
    130: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.toCaipAssetId = r.toCaipAssetType = r.toCaipAccountId = r.toCaipChainId = r.parseCaipAssetId = r.parseCaipAssetType = r.parseCaipAccountId = r.parseCaipChainId = r.isCaipAssetId = r.isCaipAssetType = r.isCaipTokenId = r.isCaipAssetReference = r.isCaipAssetNamespace = r.isCaipAccountAddress = r.isCaipAccountId = r.isCaipReference = r.isCaipNamespace = r.isCaipChainId = r.KnownCaipNamespace = r.CaipAssetTypeOrIdStruct = r.CaipAssetIdStruct = r.CaipAssetTypeStruct = r.CaipTokenIdStruct = r.CaipAssetReferenceStruct = r.CaipAssetNamespaceStruct = r.CaipAccountAddressStruct = r.CaipAccountIdStruct = r.CaipReferenceStruct = r.CaipNamespaceStruct = r.CaipChainIdStruct = r.CAIP_ASSET_ID_REGEX = r.CAIP_ASSET_TYPE_REGEX = r.CAIP_TOKEN_ID_REGEX = r.CAIP_ASSET_REFERENCE_REGEX = r.CAIP_ASSET_NAMESPACE_REGEX = r.CAIP_ACCOUNT_ADDRESS_REGEX = r.CAIP_ACCOUNT_ID_REGEX = r.CAIP_REFERENCE_REGEX = r.CAIP_NAMESPACE_REGEX = r.CAIP_CHAIN_ID_REGEX = void 0;
        const n = e("./superstruct.cjs");
        r.CAIP_CHAIN_ID_REGEX = /^(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})$/u,
        r.CAIP_NAMESPACE_REGEX = /^[-a-z0-9]{3,8}$/u,
        r.CAIP_REFERENCE_REGEX = /^[-_a-zA-Z0-9]{1,32}$/u,
        r.CAIP_ACCOUNT_ID_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})):(?<accountAddress>[-.%a-zA-Z0-9]{1,128})$/u,
        r.CAIP_ACCOUNT_ADDRESS_REGEX = /^[-.%a-zA-Z0-9]{1,128}$/u,
        r.CAIP_ASSET_NAMESPACE_REGEX = /^[-a-z0-9]{3,8}$/u,
        r.CAIP_ASSET_REFERENCE_REGEX = /^[-.%a-zA-Z0-9]{1,128}$/u,
        r.CAIP_TOKEN_ID_REGEX = /^[-.%a-zA-Z0-9]{1,78}$/u,
        r.CAIP_ASSET_TYPE_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})$/u,
        r.CAIP_ASSET_ID_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})\/(?<tokenId>[-.%a-zA-Z0-9]{1,78})$/u;
        function i(e) {
            return "string" == typeof e && r.CAIP_NAMESPACE_REGEX.test(e)
        }
        function o(e) {
            return "string" == typeof e && r.CAIP_REFERENCE_REGEX.test(e)
        }
        function s(e) {
            return "string" == typeof e && r.CAIP_ACCOUNT_ADDRESS_REGEX.test(e)
        }
        function a(e) {
            return "string" == typeof e && r.CAIP_ASSET_NAMESPACE_REGEX.test(e)
        }
        function u(e) {
            return "string" == typeof e && r.CAIP_ASSET_REFERENCE_REGEX.test(e)
        }
        function c(e) {
            return "string" == typeof e && r.CAIP_TOKEN_ID_REGEX.test(e)
        }
        r.CaipChainIdStruct = (0,
        n.definePattern)("CaipChainId", r.CAIP_CHAIN_ID_REGEX),
        r.CaipNamespaceStruct = (0,
        n.definePattern)("CaipNamespace", r.CAIP_NAMESPACE_REGEX),
        r.CaipReferenceStruct = (0,
        n.definePattern)("CaipReference", r.CAIP_REFERENCE_REGEX),
        r.CaipAccountIdStruct = (0,
        n.definePattern)("CaipAccountId", r.CAIP_ACCOUNT_ID_REGEX),
        r.CaipAccountAddressStruct = (0,
        n.definePattern)("CaipAccountAddress", r.CAIP_ACCOUNT_ADDRESS_REGEX),
        r.CaipAssetNamespaceStruct = (0,
        n.definePattern)("CaipAssetNamespace", r.CAIP_ASSET_NAMESPACE_REGEX),
        r.CaipAssetReferenceStruct = (0,
        n.definePattern)("CaipAssetReference", r.CAIP_ASSET_REFERENCE_REGEX),
        r.CaipTokenIdStruct = (0,
        n.definePattern)("CaipTokenId", r.CAIP_TOKEN_ID_REGEX),
        r.CaipAssetTypeStruct = (0,
        n.definePattern)("CaipAssetType", r.CAIP_ASSET_TYPE_REGEX),
        r.CaipAssetIdStruct = (0,
        n.definePattern)("CaipAssetId", r.CAIP_ASSET_ID_REGEX),
        r.CaipAssetTypeOrIdStruct = (0,
        n.definePattern)("CaipAssetTypeOrId", /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})(\/(?<tokenId>[-.%a-zA-Z0-9]{1,78}))?$/u),
        function(e) {
            e.Bip122 = "bip122",
            e.Solana = "solana",
            e.Tron = "tron",
            e.Eip155 = "eip155",
            e.Wallet = "wallet"
        }(r.KnownCaipNamespace || (r.KnownCaipNamespace = {})),
        r.isCaipChainId = function(e) {
            return "string" == typeof e && r.CAIP_CHAIN_ID_REGEX.test(e)
        }
        ,
        r.isCaipNamespace = i,
        r.isCaipReference = o,
        r.isCaipAccountId = function(e) {
            return "string" == typeof e && r.CAIP_ACCOUNT_ID_REGEX.test(e)
        }
        ,
        r.isCaipAccountAddress = s,
        r.isCaipAssetNamespace = a,
        r.isCaipAssetReference = u,
        r.isCaipTokenId = c,
        r.isCaipAssetType = function(e) {
            return "string" == typeof e && r.CAIP_ASSET_TYPE_REGEX.test(e)
        }
        ,
        r.isCaipAssetId = function(e) {
            return "string" == typeof e && r.CAIP_ASSET_ID_REGEX.test(e)
        }
        ,
        r.parseCaipChainId = function(e) {
            const t = r.CAIP_CHAIN_ID_REGEX.exec(e);
            if (!t?.groups)
                throw new Error("Invalid CAIP chain ID.");
            return {
                namespace: t.groups.namespace,
                reference: t.groups.reference
            }
        }
        ,
        r.parseCaipAccountId = function(e) {
            const t = r.CAIP_ACCOUNT_ID_REGEX.exec(e);
            if (!t?.groups)
                throw new Error("Invalid CAIP account ID.");
            return {
                address: t.groups.accountAddress,
                chainId: t.groups.chainId,
                chain: {
                    namespace: t.groups.namespace,
                    reference: t.groups.reference
                }
            }
        }
        ,
        r.parseCaipAssetType = function(e) {
            const t = r.CAIP_ASSET_TYPE_REGEX.exec(e);
            if (!t?.groups)
                throw new Error("Invalid CAIP asset type.");
            return {
                assetNamespace: t.groups.assetNamespace,
                assetReference: t.groups.assetReference,
                chainId: t.groups.chainId,
                chain: {
                    namespace: t.groups.namespace,
                    reference: t.groups.reference
                }
            }
        }
        ,
        r.parseCaipAssetId = function(e) {
            const t = r.CAIP_ASSET_ID_REGEX.exec(e);
            if (!t?.groups)
                throw new Error("Invalid CAIP asset ID.");
            return {
                assetNamespace: t.groups.assetNamespace,
                assetReference: t.groups.assetReference,
                tokenId: t.groups.tokenId,
                chainId: t.groups.chainId,
                chain: {
                    namespace: t.groups.namespace,
                    reference: t.groups.reference
                }
            }
        }
        ,
        r.toCaipChainId = function(e, t) {
            if (!i(e))
                throw new Error(`Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`);
            if (!o(t))
                throw new Error(`Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`);
            return `${e}:${t}`
        }
        ,
        r.toCaipAccountId = function(e, t, n) {
            if (!i(e))
                throw new Error(`Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`);
            if (!o(t))
                throw new Error(`Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`);
            if (!s(n))
                throw new Error(`Invalid "accountAddress", must match: ${r.CAIP_ACCOUNT_ADDRESS_REGEX.toString()}`);
            return `${e}:${t}:${n}`
        }
        ,
        r.toCaipAssetType = function(e, t, n, s) {
            if (!i(e))
                throw new Error(`Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`);
            if (!o(t))
                throw new Error(`Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`);
            if (!a(n))
                throw new Error(`Invalid "assetNamespace", must match: ${r.CAIP_ASSET_NAMESPACE_REGEX.toString()}`);
            if (!u(s))
                throw new Error(`Invalid "assetReference", must match: ${r.CAIP_ASSET_REFERENCE_REGEX.toString()}`);
            return `${e}:${t}/${n}:${s}`
        }
        ,
        r.toCaipAssetId = function(e, t, n, s, l) {
            if (!i(e))
                throw new Error(`Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`);
            if (!o(t))
                throw new Error(`Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`);
            if (!a(n))
                throw new Error(`Invalid "assetNamespace", must match: ${r.CAIP_ASSET_NAMESPACE_REGEX.toString()}`);
            if (!u(s))
                throw new Error(`Invalid "assetReference", must match: ${r.CAIP_ASSET_REFERENCE_REGEX.toString()}`);
            if (!c(l))
                throw new Error(`Invalid "tokenId", must match: ${r.CAIP_TOKEN_ID_REGEX.toString()}`);
            return `${e}:${t}/${n}:${s}/${l}`
        }
    }
    , {
        "./superstruct.cjs": 146
    }],
    131: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.ChecksumStruct = void 0;
        const n = e("@metamask/superstruct")
          , i = e("./base64.cjs");
        r.ChecksumStruct = (0,
        n.size)((0,
        i.base64)((0,
        n.string)(), {
            paddingRequired: !0
        }), 44, 44)
    }
    , {
        "./base64.cjs": 128,
        "@metamask/superstruct": 120
    }],
    132: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.createHex = r.createBytes = r.createBigInt = r.createNumber = void 0;
        const n = e("@metamask/superstruct")
          , i = e("./assert.cjs")
          , o = e("./bytes.cjs")
          , s = e("./hex.cjs")
          , a = (0,
        n.union)([(0,
        n.number)(), (0,
        n.bigint)(), (0,
        n.string)(), s.StrictHexStruct])
          , u = (0,
        n.coerce)((0,
        n.number)(), a, Number)
          , c = (0,
        n.coerce)((0,
        n.bigint)(), a, BigInt)
          , l = ((0,
        n.union)([s.StrictHexStruct, (0,
        n.instance)(Uint8Array)]),
        (0,
        n.coerce)((0,
        n.instance)(Uint8Array), (0,
        n.union)([s.StrictHexStruct]), o.hexToBytes))
          , f = (0,
        n.coerce)(s.StrictHexStruct, (0,
        n.instance)(Uint8Array), o.bytesToHex);
        r.createNumber = function(e) {
            try {
                const t = (0,
                n.create)(e, u);
                return (0,
                i.assert)(Number.isFinite(t), `Expected a number-like value, got "${e}".`),
                t
            } catch (t) {
                if (t instanceof n.StructError)
                    throw new Error(`Expected a number-like value, got "${e}".`);
                throw t
            }
        }
        ,
        r.createBigInt = function(e) {
            try {
                return (0,
                n.create)(e, c)
            } catch (e) {
                if (e instanceof n.StructError)
                    throw new Error(`Expected a number-like value, got "${String(e.value)}".`);
                throw e
            }
        }
        ,
        r.createBytes = function(e) {
            if ("string" == typeof e && "0x" === e.toLowerCase())
                return new Uint8Array;
            try {
                return (0,
                n.create)(e, l)
            } catch (e) {
                if (e instanceof n.StructError)
                    throw new Error(`Expected a bytes-like value, got "${String(e.value)}".`);
                throw e
            }
        }
        ,
        r.createHex = function(e) {
            if (e instanceof Uint8Array && 0 === e.length || "string" == typeof e && "0x" === e.toLowerCase())
                return "0x";
            try {
                return (0,
                n.create)(e, f)
            } catch (e) {
                if (e instanceof n.StructError)
                    throw new Error(`Expected a bytes-like value, got "${String(e.value)}".`);
                throw e
            }
        }
    }
    , {
        "./assert.cjs": 127,
        "./bytes.cjs": 129,
        "./hex.cjs": 137,
        "@metamask/superstruct": 120
    }],
    133: [function(e, t, r) {
        "use strict";
        var n, i, o = this && this.__classPrivateFieldGet || function(e, t, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
        }
        , s = this && this.__classPrivateFieldSet || function(e, t, r, n, i) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? i.call(e, r) : i ? i.value = r : t.set(e, r),
            r
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.FrozenSet = r.FrozenMap = void 0;
        class a {
            get size() {
                return o(this, n, "f").size
            }
            [(n = new WeakMap,
            Symbol.iterator)]() {
                return o(this, n, "f")[Symbol.iterator]()
            }
            constructor(e) {
                n.set(this, void 0),
                s(this, n, new Map(e), "f"),
                Object.freeze(this)
            }
            entries() {
                return o(this, n, "f").entries()
            }
            forEach(e, t) {
                return o(this, n, "f").forEach( (r, n, i) => e.call(t, r, n, this))
            }
            get(e) {
                return o(this, n, "f").get(e)
            }
            has(e) {
                return o(this, n, "f").has(e)
            }
            keys() {
                return o(this, n, "f").keys()
            }
            values() {
                return o(this, n, "f").values()
            }
            toString() {
                return `FrozenMap(${this.size}) {${this.size > 0 ? ` ${[...this.entries()].map( ([e,t]) => `${String(e)} => ${String(t)}`).join(", ")} ` : ""}}`
            }
        }
        r.FrozenMap = a;
        class u {
            get size() {
                return o(this, i, "f").size
            }
            [(i = new WeakMap,
            Symbol.iterator)]() {
                return o(this, i, "f")[Symbol.iterator]()
            }
            constructor(e) {
                i.set(this, void 0),
                s(this, i, new Set(e), "f"),
                Object.freeze(this)
            }
            entries() {
                return o(this, i, "f").entries()
            }
            forEach(e, t) {
                return o(this, i, "f").forEach( (r, n, i) => e.call(t, r, n, this))
            }
            has(e) {
                return o(this, i, "f").has(e)
            }
            keys() {
                return o(this, i, "f").keys()
            }
            values() {
                return o(this, i, "f").values()
            }
            toString() {
                return `FrozenSet(${this.size}) {${this.size > 0 ? ` ${[...this.values()].map(e => String(e)).join(", ")} ` : ""}}`
            }
        }
        r.FrozenSet = u,
        Object.freeze(a),
        Object.freeze(a.prototype),
        Object.freeze(u),
        Object.freeze(u.prototype)
    }
    , {}],
    134: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        })
    }
    , {}],
    135: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.wrapError = r.getErrorMessage = r.isErrorWithStack = r.isErrorWithMessage = r.isErrorWithCode = void 0;
        const n = e("pony-cause")
          , i = e("./misc.cjs");
        function o(e) {
            return "object" == typeof e && null !== e && "code"in e
        }
        function s(e) {
            return "object" == typeof e && null !== e && "message"in e
        }
        r.isErrorWithCode = o,
        r.isErrorWithMessage = s,
        r.isErrorWithStack = function(e) {
            return "object" == typeof e && null !== e && "stack"in e
        }
        ,
        r.getErrorMessage = function(e) {
            return s(e) && "string" == typeof e.message ? e.message : (0,
            i.isNullOrUndefined)(e) ? "" : String(e)
        }
        ,
        r.wrapError = function(e, t) {
            if ((r = e)instanceof Error || (0,
            i.isObject)(r) && "Error" === r.constructor.name) {
                let r;
                return r = 2 === Error.length ? new Error(t,{
                    cause: e
                }) : new n.ErrorWithCause(t,{
                    cause: e
                }),
                o(e) && (r.code = e.code),
                r
            }
            var r;
            return t.length > 0 ? new Error(`${String(e)}: ${t}`) : new Error(String(e))
        }
    }
    , {
        "./misc.cjs": 142,
        "pony-cause": 192
    }],
    136: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.sha256 = void 0;
        const n = e("@noble/hashes/sha256");
        r.sha256 = async function(e) {
            return "crypto"in globalThis && "object" == typeof globalThis.crypto && globalThis.crypto.subtle?.digest ? new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", e)) : (0,
            n.sha256)(e)
        }
    }
    , {
        "@noble/hashes/sha256": 155
    }],
    137: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.remove0x = r.add0x = r.isValidHexAddress = r.isValidHexAddressUnmemoized = r.isValidChecksumAddress = r.isValidChecksumAddressUnmemoized = r.getChecksumAddress = r.getChecksumAddressUnmemoized = r.assertIsStrictHexString = r.assertIsHexString = r.isHexChecksumAddress = r.isHexAddress = r.isStrictHexString = r.isHexString = r.HexChecksumAddressStruct = r.HexAddressStruct = r.StrictHexStruct = r.HexStruct = void 0;
        const n = e("@metamask/superstruct")
          , i = e("@noble/hashes/sha3")
          , o = e("lodash")
          , s = e("./assert.cjs")
          , a = /^(?:0x)?[0-9a-f]+$/iu
          , u = /^0x[0-9a-f]+$/iu
          , c = /^0x[0-9a-f]{40}$/u
          , l = /^0x[0-9a-fA-F]{40}$/u;
        r.HexStruct = (0,
        n.pattern)((0,
        n.string)(), a),
        r.StrictHexStruct = (0,
        n.pattern)((0,
        n.string)(), u),
        r.HexAddressStruct = (0,
        n.pattern)((0,
        n.string)(), c),
        r.HexChecksumAddressStruct = (0,
        n.pattern)((0,
        n.string)(), l);
        const f = e => "string" == typeof e;
        function d(e) {
            return f(e) && a.test(e)
        }
        function h(e) {
            return f(e) && u.test(e)
        }
        function p(e) {
            return f(e) && c.test(e)
        }
        function g(e) {
            return f(e) && l.test(e)
        }
        function b(e) {
            (0,
            s.assert)(g(e), "Invalid hex address.");
            const t = w(e).toLowerCase()
              , r = (0,
            i.keccak_256)(t)
              , {length: n} = t
              , o = new Array(n);
            for (let e = 0; e < n; e++) {
                const n = 1 & e
                  , i = r[e >> 1]
                  , s = 0 === n ? i >> 4 : 15 & i;
                o[e] = s >= 8 ? t[e].toUpperCase() : t[e]
            }
            return `0x${o.join("")}`
        }
        function y(e) {
            return !!g(e) && (0,
            r.getChecksumAddress)(e) === e
        }
        function m(e) {
            return p(e) || (0,
            r.isValidChecksumAddress)(e)
        }
        function w(e) {
            return e.startsWith("0x") || e.startsWith("0X") ? e.substring(2) : e
        }
        r.isHexString = d,
        r.isStrictHexString = h,
        r.isHexAddress = p,
        r.isHexChecksumAddress = g,
        r.assertIsHexString = function(e) {
            (0,
            s.assert)(d(e), "Value must be a hexadecimal string.")
        }
        ,
        r.assertIsStrictHexString = function(e) {
            (0,
            s.assert)(h(e), 'Value must be a hexadecimal string, starting with "0x".')
        }
        ,
        r.getChecksumAddressUnmemoized = b,
        r.getChecksumAddress = (0,
        o.memoize)(b),
        r.isValidChecksumAddressUnmemoized = y,
        r.isValidChecksumAddress = (0,
        o.memoize)(y),
        r.isValidHexAddressUnmemoized = m,
        r.isValidHexAddress = (0,
        o.memoize)(m),
        r.add0x = function(e) {
            return e.startsWith("0x") ? e : e.startsWith("0X") ? `0x${e.substring(2)}` : `0x${e}`
        }
        ,
        r.remove0x = w
    }
    , {
        "./assert.cjs": 127,
        "@metamask/superstruct": 120,
        "@noble/hashes/sha3": 156,
        lodash: 188
    }],
    138: [function(e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
            void 0 === n && (n = r);
            var i = Object.getOwnPropertyDescriptor(t, r);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[r]
                }
            }),
            Object.defineProperty(e, n, i)
        }
        : function(e, t, r, n) {
            void 0 === n && (n = r),
            e[n] = t[r]
        }
        )
          , i = this && this.__exportStar || function(e, t) {
            for (var r in e)
                "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.unitMap = r.getValueOfUnit = r.numberToString = r.fromWei = r.toWei = r.remove0x = r.add0x = r.isValidChecksumAddress = r.getChecksumAddress = r.isValidHexAddress = r.assertIsStrictHexString = r.assertIsHexString = r.isHexChecksumAddress = r.isHexAddress = r.isStrictHexString = r.isHexString = r.HexChecksumAddressStruct = r.HexAddressStruct = r.StrictHexStruct = r.HexStruct = void 0,
        i(e("./assert.cjs"), r),
        i(e("./base64.cjs"), r),
        i(e("./bytes.cjs"), r),
        i(e("./caip-types.cjs"), r),
        i(e("./checksum.cjs"), r),
        i(e("./coercers.cjs"), r),
        i(e("./collections.cjs"), r),
        i(e("./encryption-types.cjs"), r),
        i(e("./errors.cjs"), r),
        i(e("./hashing.cjs"), r);
        var o = e("./hex.cjs");
        Object.defineProperty(r, "HexStruct", {
            enumerable: !0,
            get: function() {
                return o.HexStruct
            }
        }),
        Object.defineProperty(r, "StrictHexStruct", {
            enumerable: !0,
            get: function() {
                return o.StrictHexStruct
            }
        }),
        Object.defineProperty(r, "HexAddressStruct", {
            enumerable: !0,
            get: function() {
                return o.HexAddressStruct
            }
        }),
        Object.defineProperty(r, "HexChecksumAddressStruct", {
            enumerable: !0,
            get: function() {
                return o.HexChecksumAddressStruct
            }
        }),
        Object.defineProperty(r, "isHexString", {
            enumerable: !0,
            get: function() {
                return o.isHexString
            }
        }),
        Object.defineProperty(r, "isStrictHexString", {
            enumerable: !0,
            get: function() {
                return o.isStrictHexString
            }
        }),
        Object.defineProperty(r, "isHexAddress", {
            enumerable: !0,
            get: function() {
                return o.isHexAddress
            }
        }),
        Object.defineProperty(r, "isHexChecksumAddress", {
            enumerable: !0,
            get: function() {
                return o.isHexChecksumAddress
            }
        }),
        Object.defineProperty(r, "assertIsHexString", {
            enumerable: !0,
            get: function() {
                return o.assertIsHexString
            }
        }),
        Object.defineProperty(r, "assertIsStrictHexString", {
            enumerable: !0,
            get: function() {
                return o.assertIsStrictHexString
            }
        }),
        Object.defineProperty(r, "isValidHexAddress", {
            enumerable: !0,
            get: function() {
                return o.isValidHexAddress
            }
        }),
        Object.defineProperty(r, "getChecksumAddress", {
            enumerable: !0,
            get: function() {
                return o.getChecksumAddress
            }
        }),
        Object.defineProperty(r, "isValidChecksumAddress", {
            enumerable: !0,
            get: function() {
                return o.isValidChecksumAddress
            }
        }),
        Object.defineProperty(r, "add0x", {
            enumerable: !0,
            get: function() {
                return o.add0x
            }
        }),
        Object.defineProperty(r, "remove0x", {
            enumerable: !0,
            get: function() {
                return o.remove0x
            }
        }),
        i(e("./json.cjs"), r),
        i(e("./keyring.cjs"), r),
        i(e("./logging.cjs"), r),
        i(e("./misc.cjs"), r),
        i(e("./number.cjs"), r),
        i(e("./opaque.cjs"), r),
        i(e("./promise.cjs"), r),
        i(e("./superstruct.cjs"), r),
        i(e("./time.cjs"), r),
        i(e("./transaction-types.cjs"), r),
        i(e("./versions.cjs"), r);
        var s = e("./unitsConversion.cjs");
        Object.defineProperty(r, "toWei", {
            enumerable: !0,
            get: function() {
                return s.toWei
            }
        }),
        Object.defineProperty(r, "fromWei", {
            enumerable: !0,
            get: function() {
                return s.fromWei
            }
        }),
        Object.defineProperty(r, "numberToString", {
            enumerable: !0,
            get: function() {
                return s.numberToString
            }
        }),
        Object.defineProperty(r, "getValueOfUnit", {
            enumerable: !0,
            get: function() {
                return s.getValueOfUnit
            }
        }),
        Object.defineProperty(r, "unitMap", {
            enumerable: !0,
            get: function() {
                return s.unitMap
            }
        })
    }
    , {
        "./assert.cjs": 127,
        "./base64.cjs": 128,
        "./bytes.cjs": 129,
        "./caip-types.cjs": 130,
        "./checksum.cjs": 131,
        "./coercers.cjs": 132,
        "./collections.cjs": 133,
        "./encryption-types.cjs": 134,
        "./errors.cjs": 135,
        "./hashing.cjs": 136,
        "./hex.cjs": 137,
        "./json.cjs": 139,
        "./keyring.cjs": 140,
        "./logging.cjs": 141,
        "./misc.cjs": 142,
        "./number.cjs": 143,
        "./opaque.cjs": 144,
        "./promise.cjs": 145,
        "./superstruct.cjs": 146,
        "./time.cjs": 147,
        "./transaction-types.cjs": 148,
        "./unitsConversion.cjs": 149,
        "./versions.cjs": 150
    }],
    139: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.getJsonRpcIdValidator = r.assertIsJsonRpcError = r.isJsonRpcError = r.assertIsJsonRpcFailure = r.isJsonRpcFailure = r.assertIsJsonRpcSuccess = r.isJsonRpcSuccess = r.assertIsJsonRpcResponse = r.isJsonRpcResponse = r.assertIsPendingJsonRpcResponse = r.isPendingJsonRpcResponse = r.JsonRpcResponseStruct = r.JsonRpcFailureStruct = r.JsonRpcSuccessStruct = r.PendingJsonRpcResponseStruct = r.assertIsJsonRpcRequest = r.isJsonRpcRequest = r.assertIsJsonRpcNotification = r.isJsonRpcNotification = r.JsonRpcNotificationStruct = r.JsonRpcRequestStruct = r.JsonRpcParamsStruct = r.JsonRpcErrorStruct = r.JsonRpcIdStruct = r.JsonRpcVersionStruct = r.jsonrpc2 = r.getJsonSize = r.getSafeJson = r.isValidJson = r.JsonStruct = r.UnsafeJsonStruct = r.exactOptional = r.object = void 0;
        const n = e("@metamask/superstruct")
          , i = e("./assert.cjs")
          , o = e("./misc.cjs");
        function s({path: e, branch: t}) {
            const r = e[e.length - 1];
            return (0,
            o.hasProperty)(t[t.length - 2], r)
        }
        function a(e) {
            return new n.Struct({
                ...e,
                type: `optional ${e.type}`,
                validator: (t, r) => !s(r) || e.validator(t, r),
                refiner: (t, r) => !s(r) || e.refiner(t, r)
            })
        }
        function u(e) {
            if (null === e || "boolean" == typeof e || "string" == typeof e)
                return !0;
            if ("number" == typeof e && Number.isFinite(e))
                return !0;
            if ("object" == typeof e) {
                let t = !0;
                if (Array.isArray(e)) {
                    for (let r = 0; r < e.length; r++)
                        if (!u(e[r])) {
                            t = !1;
                            break
                        }
                    return t
                }
                const r = Object.entries(e);
                for (let e = 0; e < r.length; e++)
                    if ("string" != typeof r[e][0] || !u(r[e][1])) {
                        t = !1;
                        break
                    }
                return t
            }
            return !1
        }
        function c(e) {
            return (0,
            n.create)(e, r.JsonStruct)
        }
        r.object = e => (0,
        n.object)(e),
        r.exactOptional = a,
        r.UnsafeJsonStruct = (0,
        n.define)("JSON", e => u(e)),
        r.JsonStruct = (0,
        n.coerce)(r.UnsafeJsonStruct, (0,
        n.refine)((0,
        n.any)(), "JSON", e => (0,
        n.is)(e, r.UnsafeJsonStruct)), e => JSON.parse(JSON.stringify(e, (e, t) => {
            if ("__proto__" !== e && "constructor" !== e)
                return t
        }
        ))),
        r.isValidJson = function(e) {
            try {
                return c(e),
                !0
            } catch {
                return !1
            }
        }
        ,
        r.getSafeJson = c,
        r.getJsonSize = function(e) {
            (0,
            i.assertStruct)(e, r.JsonStruct, "Invalid JSON value");
            const t = JSON.stringify(e);
            return (new TextEncoder).encode(t).byteLength
        }
        ,
        r.jsonrpc2 = "2.0",
        r.JsonRpcVersionStruct = (0,
        n.literal)(r.jsonrpc2),
        r.JsonRpcIdStruct = (0,
        n.nullable)((0,
        n.union)([(0,
        n.number)(), (0,
        n.string)()])),
        r.JsonRpcErrorStruct = (0,
        r.object)({
            code: (0,
            n.integer)(),
            message: (0,
            n.string)(),
            data: a(r.JsonStruct),
            stack: a((0,
            n.string)())
        }),
        r.JsonRpcParamsStruct = (0,
        n.union)([(0,
        n.record)((0,
        n.string)(), r.JsonStruct), (0,
        n.array)(r.JsonStruct)]),
        r.JsonRpcRequestStruct = (0,
        r.object)({
            id: r.JsonRpcIdStruct,
            jsonrpc: r.JsonRpcVersionStruct,
            method: (0,
            n.string)(),
            params: a(r.JsonRpcParamsStruct)
        }),
        r.JsonRpcNotificationStruct = (0,
        r.object)({
            jsonrpc: r.JsonRpcVersionStruct,
            method: (0,
            n.string)(),
            params: a(r.JsonRpcParamsStruct)
        }),
        r.isJsonRpcNotification = function(e) {
            return (0,
            n.is)(e, r.JsonRpcNotificationStruct)
        }
        ,
        r.assertIsJsonRpcNotification = function(e, t) {
            (0,
            i.assertStruct)(e, r.JsonRpcNotificationStruct, "Invalid JSON-RPC notification", t)
        }
        ,
        r.isJsonRpcRequest = function(e) {
            return (0,
            n.is)(e, r.JsonRpcRequestStruct)
        }
        ,
        r.assertIsJsonRpcRequest = function(e, t) {
            (0,
            i.assertStruct)(e, r.JsonRpcRequestStruct, "Invalid JSON-RPC request", t)
        }
        ,
        r.PendingJsonRpcResponseStruct = (0,
        n.object)({
            id: r.JsonRpcIdStruct,
            jsonrpc: r.JsonRpcVersionStruct,
            result: (0,
            n.optional)((0,
            n.unknown)()),
            error: (0,
            n.optional)(r.JsonRpcErrorStruct)
        }),
        r.JsonRpcSuccessStruct = (0,
        r.object)({
            id: r.JsonRpcIdStruct,
            jsonrpc: r.JsonRpcVersionStruct,
            result: r.JsonStruct
        }),
        r.JsonRpcFailureStruct = (0,
        r.object)({
            id: r.JsonRpcIdStruct,
            jsonrpc: r.JsonRpcVersionStruct,
            error: r.JsonRpcErrorStruct
        }),
        r.JsonRpcResponseStruct = (0,
        n.union)([r.JsonRpcSuccessStruct, r.JsonRpcFailureStruct]),
        r.isPendingJsonRpcResponse = function(e) {
            return (0,
            n.is)(e, r.PendingJsonRpcResponseStruct)
        }
        ,
        r.assertIsPendingJsonRpcResponse = function(e, t) {
            (0,
            i.assertStruct)(e, r.PendingJsonRpcResponseStruct, "Invalid pending JSON-RPC response", t)
        }
        ,
        r.isJsonRpcResponse = function(e) {
            return (0,
            n.is)(e, r.JsonRpcResponseStruct)
        }
        ,
        r.assertIsJsonRpcResponse = function(e, t) {
            (0,
            i.assertStruct)(e, r.JsonRpcResponseStruct, "Invalid JSON-RPC response", t)
        }
        ,
        r.isJsonRpcSuccess = function(e) {
            return (0,
            n.is)(e, r.JsonRpcSuccessStruct)
        }
        ,
        r.assertIsJsonRpcSuccess = function(e, t) {
            (0,
            i.assertStruct)(e, r.JsonRpcSuccessStruct, "Invalid JSON-RPC success response", t)
        }
        ,
        r.isJsonRpcFailure = function(e) {
            return (0,
            n.is)(e, r.JsonRpcFailureStruct)
        }
        ,
        r.assertIsJsonRpcFailure = function(e, t) {
            (0,
            i.assertStruct)(e, r.JsonRpcFailureStruct, "Invalid JSON-RPC failure response", t)
        }
        ,
        r.isJsonRpcError = function(e) {
            return (0,
            n.is)(e, r.JsonRpcErrorStruct)
        }
        ,
        r.assertIsJsonRpcError = function(e, t) {
            (0,
            i.assertStruct)(e, r.JsonRpcErrorStruct, "Invalid JSON-RPC error", t)
        }
        ,
        r.getJsonRpcIdValidator = function(e) {
            const {permitEmptyString: t, permitFractions: r, permitNull: n} = {
                permitEmptyString: !0,
                permitFractions: !1,
                permitNull: !0,
                ...e
            };
            return e => Boolean("number" == typeof e && (r || Number.isInteger(e)) || "string" == typeof e && (t || e.length > 0) || n && null === e)
        }
    }
    , {
        "./assert.cjs": 127,
        "./misc.cjs": 142,
        "@metamask/superstruct": 120
    }],
    140: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        })
    }
    , {}],
    141: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.createModuleLogger = r.createProjectLogger = void 0;
        const i = (0,
        n(e("debug")).default)("metamask");
        r.createProjectLogger = function(e) {
            return i.extend(e)
        }
        ,
        r.createModuleLogger = function(e, t) {
            return e.extend(t)
        }
    }
    , {
        debug: 179
    }],
    142: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.calculateNumberSize = r.calculateStringSize = r.isASCII = r.isPlainObject = r.ESCAPE_CHARACTERS_REGEXP = r.JsonSize = r.getKnownPropertyNames = r.hasProperty = r.isObject = r.isNullOrUndefined = r.isNonEmptyArray = void 0,
        r.isNonEmptyArray = function(e) {
            return Array.isArray(e) && e.length > 0
        }
        ,
        r.isNullOrUndefined = function(e) {
            return null == e
        }
        ,
        r.isObject = function(e) {
            return Boolean(e) && "object" == typeof e && !Array.isArray(e)
        }
        ;
        function n(e) {
            return e.charCodeAt(0) <= 127
        }
        r.hasProperty = (e, t) => Object.hasOwnProperty.call(e, t),
        r.getKnownPropertyNames = function(e) {
            return Object.getOwnPropertyNames(e)
        }
        ,
        function(e) {
            e[e.Null = 4] = "Null",
            e[e.Comma = 1] = "Comma",
            e[e.Wrapper = 1] = "Wrapper",
            e[e.True = 4] = "True",
            e[e.False = 5] = "False",
            e[e.Quote = 1] = "Quote",
            e[e.Colon = 1] = "Colon",
            e[e.Date = 24] = "Date"
        }(r.JsonSize || (r.JsonSize = {})),
        r.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu,
        r.isPlainObject = function(e) {
            if ("object" != typeof e || null === e)
                return !1;
            try {
                let t = e;
                for (; null !== Object.getPrototypeOf(t); )
                    t = Object.getPrototypeOf(t);
                return Object.getPrototypeOf(e) === t
            } catch (e) {
                return !1
            }
        }
        ,
        r.isASCII = n,
        r.calculateStringSize = function(e) {
            return e.split("").reduce( (e, t) => n(t) ? e + 1 : e + 2, 0) + (e.match(r.ESCAPE_CHARACTERS_REGEXP) ?? []).length
        }
        ,
        r.calculateNumberSize = function(e) {
            return e.toString().length
        }
    }
    , {}],
    143: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.hexToBigInt = r.hexToNumber = r.bigIntToHex = r.numberToHex = void 0;
        const n = e("./assert.cjs")
          , i = e("./hex.cjs");
        r.numberToHex = e => ((0,
        n.assert)("number" == typeof e, "Value must be a number."),
        (0,
        n.assert)(e >= 0, "Value must be a non-negative number."),
        (0,
        n.assert)(Number.isSafeInteger(e), "Value is not a safe integer. Use `bigIntToHex` instead."),
        (0,
        i.add0x)(e.toString(16)));
        r.bigIntToHex = e => ((0,
        n.assert)("bigint" == typeof e, "Value must be a bigint."),
        (0,
        n.assert)(e >= 0, "Value must be a non-negative bigint."),
        (0,
        i.add0x)(e.toString(16)));
        r.hexToNumber = e => {
            (0,
            i.assertIsHexString)(e);
            const t = parseInt(e, 16);
            return (0,
            n.assert)(Number.isSafeInteger(t), "Value is not a safe integer. Use `hexToBigInt` instead."),
            t
        }
        ;
        r.hexToBigInt = e => ((0,
        i.assertIsHexString)(e),
        BigInt((0,
        i.add0x)(e)))
    }
    , {
        "./assert.cjs": 127,
        "./hex.cjs": 137
    }],
    144: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        })
    }
    , {}],
    145: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.createDeferredPromise = void 0,
        r.createDeferredPromise = function({suppressUnhandledRejection: e=!1}={}) {
            let t, r;
            const n = new Promise( (e, n) => {
                t = e,
                r = n
            }
            );
            return e && n.catch(e => {}
            ),
            {
                promise: n,
                resolve: t,
                reject: r
            }
        }
    }
    , {}],
    146: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.definePattern = void 0;
        const n = e("@metamask/superstruct");
        r.definePattern = function(e, t) {
            return (0,
            n.define)(e, e => "string" == typeof e && t.test(e))
        }
    }
    , {
        "@metamask/superstruct": 120
    }],
    147: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.timeSince = r.inMilliseconds = r.Duration = void 0,
        function(e) {
            e[e.Millisecond = 1] = "Millisecond",
            e[e.Second = 1e3] = "Second",
            e[e.Minute = 6e4] = "Minute",
            e[e.Hour = 36e5] = "Hour",
            e[e.Day = 864e5] = "Day",
            e[e.Week = 6048e5] = "Week",
            e[e.Year = 31536e6] = "Year"
        }(r.Duration || (r.Duration = {}));
        const n = (e, t) => {
            if (!(e => Number.isInteger(e) && e >= 0)(e))
                throw new Error(`"${t}" must be a non-negative integer. Received: "${e}".`)
        }
        ;
        r.inMilliseconds = function(e, t) {
            return n(e, "count"),
            e * t
        }
        ,
        r.timeSince = function(e) {
            return n(e, "timestamp"),
            Date.now() - e
        }
    }
    , {}],
    148: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        })
    }
    , {}],
    149: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.toWei = r.fromWei = r.numberToString = r.getValueOfUnit = r.unitMap = r.numericToBigInt = void 0;
        const n = BigInt(0)
          , i = BigInt(-1);
        function o(e) {
            if ("string" == typeof e)
                return BigInt(e);
            if ("number" == typeof e)
                return BigInt(e);
            if ("bigint" == typeof e)
                return e;
            throw new Error(`Cannot convert ${typeof e} to BigInt`)
        }
        r.numericToBigInt = o,
        r.unitMap = {
            noether: "0",
            wei: "1",
            kwei: "1000",
            Kwei: "1000",
            babbage: "1000",
            femtoether: "1000",
            mwei: "1000000",
            Mwei: "1000000",
            lovelace: "1000000",
            picoether: "1000000",
            gwei: "1000000000",
            Gwei: "1000000000",
            shannon: "1000000000",
            nanoether: "1000000000",
            nano: "1000000000",
            szabo: "1000000000000",
            microether: "1000000000000",
            micro: "1000000000000",
            finney: "1000000000000000",
            milliether: "1000000000000000",
            milli: "1000000000000000",
            ether: "1000000000000000000",
            kether: "1000000000000000000000",
            grand: "1000000000000000000000",
            mether: "1000000000000000000000000",
            gether: "1000000000000000000000000000",
            tether: "1000000000000000000000000000000"
        };
        const s = Object.fromEntries(Object.entries(r.unitMap).map( ([e,t]) => [e, BigInt(t)]))
          , a = Object.fromEntries(Object.entries(r.unitMap).map( ([e,t]) => [e, t.length - 1 || 1]))
          , u = /^-?[0-9.]+$/u
          , c = /^([0-9]*[1-9]|0)(0*)/u
          , l = /\B(?=(\d{3})+(?!\d))/gu;
        function f(e) {
            if ("string" == typeof e) {
                if (!u.test(e))
                    throw new Error(`while converting number to string, invalid number value '${e}', should be a number matching (^-?[0-9.]+).`);
                return e
            }
            if ("number" == typeof e)
                return String(e);
            if ("bigint" == typeof e)
                return e.toString();
            throw new Error(`while converting number to string, invalid number value '${String(e)}' type ${typeof e}.`)
        }
        r.getValueOfUnit = function(e="ether") {
            const t = e.toLowerCase()
              , n = s[t];
            if (void 0 === n)
                throw new Error(`The unit provided ${e} doesn't exist, please use the one of the following units ${JSON.stringify(r.unitMap, null, 2)}`);
            return n
        }
        ,
        r.numberToString = f,
        r.fromWei = function(e, t, u) {
            let f = o(e);
            const d = f < n
              , h = t.toLowerCase()
              , p = s[h]
              , g = a[h]
              , b = u ?? {};
            if (void 0 === p)
                throw new Error(`The unit provided ${t} doesn't exist, please use the one of the following units ${JSON.stringify(r.unitMap, null, 2)}`);
            if (p === n)
                return d ? "-0" : "0";
            d && (f *= i);
            let y = (f % p).toString();
            if (y = y.padStart(g, "0"),
            !b.pad) {
                const e = y.match(c);
                y = e?.[1] ?? "0"
            }
            let m = (f / p).toString();
            b.commify && (m = m.replace(l, ","));
            let w = `${m}${"0" === y ? "" : `.${y}`}`;
            return d && (w = `-${w}`),
            w
        }
        ,
        r.toWei = function(e, t) {
            const o = t.toLowerCase()
              , u = s[o]
              , c = a[o];
            if (void 0 === u)
                throw new Error(`The unit provided ${t} doesn't exist, please use the one of the following units ${JSON.stringify(r.unitMap, null, 2)}`);
            if (u === n)
                return n;
            if ("bigint" == typeof e && "wei" === o)
                return e;
            if ("bigint" == typeof e)
                return e * u;
            let l = f(e);
            const d = l.startsWith("-");
            if (d && (l = l.substring(1)),
            "." === l)
                throw new Error(`While converting number ${e} to wei, invalid value`);
            const h = l.split(".");
            if (h.length > 2)
                throw new Error(`While converting number ${e} to wei,  too many decimal points`);
            let p = h[0]
              , g = h[1];
            if (p || (p = "0"),
            g || (g = "0"),
            g.length > c)
                throw new Error(`While converting number ${e} to wei, too many decimal places`);
            g = g.padEnd(c, "0");
            let b = BigInt(p) * u + BigInt(g);
            return d && (b *= i),
            b
        }
    }
    , {}],
    150: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.satisfiesVersionRange = r.gtRange = r.gtVersion = r.assertIsSemVerRange = r.assertIsSemVerVersion = r.isValidSemVerRange = r.isValidSemVerVersion = r.VersionRangeStruct = r.VersionStruct = void 0;
        const n = e("@metamask/superstruct")
          , i = e("semver")
          , o = e("./assert.cjs");
        r.VersionStruct = (0,
        n.refine)((0,
        n.string)(), "Version", e => null !== (0,
        i.valid)(e) || `Expected SemVer version, got "${e}"`),
        r.VersionRangeStruct = (0,
        n.refine)((0,
        n.string)(), "Version range", e => null !== (0,
        i.validRange)(e) || `Expected SemVer range, got "${e}"`),
        r.isValidSemVerVersion = function(e) {
            return (0,
            n.is)(e, r.VersionStruct)
        }
        ,
        r.isValidSemVerRange = function(e) {
            return (0,
            n.is)(e, r.VersionRangeStruct)
        }
        ,
        r.assertIsSemVerVersion = function(e) {
            (0,
            o.assertStruct)(e, r.VersionStruct)
        }
        ,
        r.assertIsSemVerRange = function(e) {
            (0,
            o.assertStruct)(e, r.VersionRangeStruct)
        }
        ,
        r.gtVersion = function(e, t) {
            return (0,
            i.gt)(e, t)
        }
        ,
        r.gtRange = function(e, t) {
            return (0,
            i.gtr)(e, t)
        }
        ,
        r.satisfiesVersionRange = function(e, t) {
            return (0,
            i.satisfies)(e, t, {
                includePrerelease: !0
            })
        }
    }
    , {
        "./assert.cjs": 127,
        "@metamask/superstruct": 120,
        semver: 249
    }],
    151: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.SHA512_IV = r.SHA384_IV = r.SHA224_IV = r.SHA256_IV = r.HashMD = void 0,
        r.setBigUint64 = i,
        r.Chi = function(e, t, r) {
            return e & t ^ ~e & r
        }
        ,
        r.Maj = function(e, t, r) {
            return e & t ^ e & r ^ t & r
        }
        ;
        const n = e("./utils.js");
        function i(e, t, r, n) {
            if ("function" == typeof e.setBigUint64)
                return e.setBigUint64(t, r, n);
            const i = BigInt(32)
              , o = BigInt(4294967295)
              , s = Number(r >> i & o)
              , a = Number(r & o)
              , u = n ? 4 : 0
              , c = n ? 0 : 4;
            e.setUint32(t + u, s, n),
            e.setUint32(t + c, a, n)
        }
        class o extends n.Hash {
            constructor(e, t, r, i) {
                super(),
                this.finished = !1,
                this.length = 0,
                this.pos = 0,
                this.destroyed = !1,
                this.blockLen = e,
                this.outputLen = t,
                this.padOffset = r,
                this.isLE = i,
                this.buffer = new Uint8Array(e),
                this.view = (0,
                n.createView)(this.buffer)
            }
            update(e) {
                (0,
                n.aexists)(this),
                e = (0,
                n.toBytes)(e),
                (0,
                n.abytes)(e);
                const {view: t, buffer: r, blockLen: i} = this
                  , o = e.length;
                for (let s = 0; s < o; ) {
                    const a = Math.min(i - this.pos, o - s);
                    if (a === i) {
                        const t = (0,
                        n.createView)(e);
                        for (; i <= o - s; s += i)
                            this.process(t, s);
                        continue
                    }
                    r.set(e.subarray(s, s + a), this.pos),
                    this.pos += a,
                    s += a,
                    this.pos === i && (this.process(t, 0),
                    this.pos = 0)
                }
                return this.length += e.length,
                this.roundClean(),
                this
            }
            digestInto(e) {
                (0,
                n.aexists)(this),
                (0,
                n.aoutput)(e, this),
                this.finished = !0;
                const {buffer: t, view: r, blockLen: o, isLE: s} = this;
                let {pos: a} = this;
                t[a++] = 128,
                (0,
                n.clean)(this.buffer.subarray(a)),
                this.padOffset > o - a && (this.process(r, 0),
                a = 0);
                for (let e = a; e < o; e++)
                    t[e] = 0;
                i(r, o - 8, BigInt(8 * this.length), s),
                this.process(r, 0);
                const u = (0,
                n.createView)(e)
                  , c = this.outputLen;
                if (c % 4)
                    throw new Error("_sha2: outputLen should be aligned to 32bit");
                const l = c / 4
                  , f = this.get();
                if (l > f.length)
                    throw new Error("_sha2: outputLen bigger than state");
                for (let e = 0; e < l; e++)
                    u.setUint32(4 * e, f[e], s)
            }
            digest() {
                const {buffer: e, outputLen: t} = this;
                this.digestInto(e);
                const r = e.slice(0, t);
                return this.destroy(),
                r
            }
            _cloneInto(e) {
                e || (e = new this.constructor),
                e.set(...this.get());
                const {blockLen: t, buffer: r, length: n, finished: i, destroyed: o, pos: s} = this;
                return e.destroyed = o,
                e.finished = i,
                e.length = n,
                e.pos = s,
                n % t && e.buffer.set(r),
                e
            }
            clone() {
                return this._cloneInto()
            }
        }
        r.HashMD = o,
        r.SHA256_IV = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
        r.SHA224_IV = Uint32Array.from([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]),
        r.SHA384_IV = Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]),
        r.SHA512_IV = Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209])
    }
    , {
        "./utils.js": 157
    }],
    152: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.toBig = r.shrSL = r.shrSH = r.rotrSL = r.rotrSH = r.rotrBL = r.rotrBH = r.rotr32L = r.rotr32H = r.rotlSL = r.rotlSH = r.rotlBL = r.rotlBH = r.add5L = r.add5H = r.add4L = r.add4H = r.add3L = r.add3H = void 0,
        r.add = _,
        r.fromBig = o,
        r.split = s;
        const n = BigInt(2 ** 32 - 1)
          , i = BigInt(32);
        function o(e, t=!1) {
            return t ? {
                h: Number(e & n),
                l: Number(e >> i & n)
            } : {
                h: 0 | Number(e >> i & n),
                l: 0 | Number(e & n)
            }
        }
        function s(e, t=!1) {
            const r = e.length;
            let n = new Uint32Array(r)
              , i = new Uint32Array(r);
            for (let s = 0; s < r; s++) {
                const {h: r, l: a} = o(e[s], t);
                [n[s],i[s]] = [r, a]
            }
            return [n, i]
        }
        const a = (e, t) => BigInt(e >>> 0) << i | BigInt(t >>> 0);
        r.toBig = a;
        const u = (e, t, r) => e >>> r;
        r.shrSH = u;
        const c = (e, t, r) => e << 32 - r | t >>> r;
        r.shrSL = c;
        const l = (e, t, r) => e >>> r | t << 32 - r;
        r.rotrSH = l;
        const f = (e, t, r) => e << 32 - r | t >>> r;
        r.rotrSL = f;
        const d = (e, t, r) => e << 64 - r | t >>> r - 32;
        r.rotrBH = d;
        const h = (e, t, r) => e >>> r - 32 | t << 64 - r;
        r.rotrBL = h;
        const p = (e, t) => t;
        r.rotr32H = p;
        const g = (e, t) => e;
        r.rotr32L = g;
        const b = (e, t, r) => e << r | t >>> 32 - r;
        r.rotlSH = b;
        const y = (e, t, r) => t << r | e >>> 32 - r;
        r.rotlSL = y;
        const m = (e, t, r) => t << r - 32 | e >>> 64 - r;
        r.rotlBH = m;
        const w = (e, t, r) => e << r - 32 | t >>> 64 - r;
        function _(e, t, r, n) {
            const i = (t >>> 0) + (n >>> 0);
            return {
                h: e + r + (i / 2 ** 32 | 0) | 0,
                l: 0 | i
            }
        }
        r.rotlBL = w;
        const v = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0);
        r.add3L = v;
        const E = (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0;
        r.add3H = E;
        const S = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0);
        r.add4L = S;
        const M = (e, t, r, n, i) => t + r + n + i + (e / 2 ** 32 | 0) | 0;
        r.add4H = M;
        const A = (e, t, r, n, i) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0);
        r.add5L = A;
        const j = (e, t, r, n, i, o) => t + r + n + i + o + (e / 2 ** 32 | 0) | 0;
        r.add5H = j;
        const R = {
            fromBig: o,
            split: s,
            toBig: a,
            shrSH: u,
            shrSL: c,
            rotrSH: l,
            rotrSL: f,
            rotrBH: d,
            rotrBL: h,
            rotr32H: p,
            rotr32L: g,
            rotlSH: b,
            rotlSL: y,
            rotlBH: m,
            rotlBL: w,
            add: _,
            add3L: v,
            add3H: E,
            add4L: S,
            add4H: M,
            add5H: j,
            add5L: A
        };
        r.default = R
    }
    , {}],
    153: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.crypto = void 0,
        r.crypto = "object" == typeof globalThis && "crypto"in globalThis ? globalThis.crypto : void 0
    }
    , {}],
    154: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.sha512_224 = r.sha512_256 = r.sha384 = r.sha512 = r.sha224 = r.sha256 = r.SHA512_256 = r.SHA512_224 = r.SHA384 = r.SHA512 = r.SHA224 = r.SHA256 = void 0;
        const n = e("./_md.js")
          , i = e("./_u64.js")
          , o = e("./utils.js")
          , s = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])
          , a = new Uint32Array(64);
        class u extends n.HashMD {
            constructor(e=32) {
                super(64, e, 8, !1),
                this.A = 0 | n.SHA256_IV[0],
                this.B = 0 | n.SHA256_IV[1],
                this.C = 0 | n.SHA256_IV[2],
                this.D = 0 | n.SHA256_IV[3],
                this.E = 0 | n.SHA256_IV[4],
                this.F = 0 | n.SHA256_IV[5],
                this.G = 0 | n.SHA256_IV[6],
                this.H = 0 | n.SHA256_IV[7]
            }
            get() {
                const {A: e, B: t, C: r, D: n, E: i, F: o, G: s, H: a} = this;
                return [e, t, r, n, i, o, s, a]
            }
            set(e, t, r, n, i, o, s, a) {
                this.A = 0 | e,
                this.B = 0 | t,
                this.C = 0 | r,
                this.D = 0 | n,
                this.E = 0 | i,
                this.F = 0 | o,
                this.G = 0 | s,
                this.H = 0 | a
            }
            process(e, t) {
                for (let r = 0; r < 16; r++,
                t += 4)
                    a[r] = e.getUint32(t, !1);
                for (let e = 16; e < 64; e++) {
                    const t = a[e - 15]
                      , r = a[e - 2]
                      , n = (0,
                    o.rotr)(t, 7) ^ (0,
                    o.rotr)(t, 18) ^ t >>> 3
                      , i = (0,
                    o.rotr)(r, 17) ^ (0,
                    o.rotr)(r, 19) ^ r >>> 10;
                    a[e] = i + a[e - 7] + n + a[e - 16] | 0
                }
                let {A: r, B: i, C: u, D: c, E: l, F: f, G: d, H: h} = this;
                for (let e = 0; e < 64; e++) {
                    const t = h + ((0,
                    o.rotr)(l, 6) ^ (0,
                    o.rotr)(l, 11) ^ (0,
                    o.rotr)(l, 25)) + (0,
                    n.Chi)(l, f, d) + s[e] + a[e] | 0
                      , p = ((0,
                    o.rotr)(r, 2) ^ (0,
                    o.rotr)(r, 13) ^ (0,
                    o.rotr)(r, 22)) + (0,
                    n.Maj)(r, i, u) | 0;
                    h = d,
                    d = f,
                    f = l,
                    l = c + t | 0,
                    c = u,
                    u = i,
                    i = r,
                    r = t + p | 0
                }
                r = r + this.A | 0,
                i = i + this.B | 0,
                u = u + this.C | 0,
                c = c + this.D | 0,
                l = l + this.E | 0,
                f = f + this.F | 0,
                d = d + this.G | 0,
                h = h + this.H | 0,
                this.set(r, i, u, c, l, f, d, h)
            }
            roundClean() {
                (0,
                o.clean)(a)
            }
            destroy() {
                this.set(0, 0, 0, 0, 0, 0, 0, 0),
                (0,
                o.clean)(this.buffer)
            }
        }
        r.SHA256 = u;
        class c extends u {
            constructor() {
                super(28),
                this.A = 0 | n.SHA224_IV[0],
                this.B = 0 | n.SHA224_IV[1],
                this.C = 0 | n.SHA224_IV[2],
                this.D = 0 | n.SHA224_IV[3],
                this.E = 0 | n.SHA224_IV[4],
                this.F = 0 | n.SHA224_IV[5],
                this.G = 0 | n.SHA224_IV[6],
                this.H = 0 | n.SHA224_IV[7]
            }
        }
        r.SHA224 = c;
        const l = ( () => i.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(e => BigInt(e))))()
          , f = ( () => l[0])()
          , d = ( () => l[1])()
          , h = new Uint32Array(80)
          , p = new Uint32Array(80);
        class g extends n.HashMD {
            constructor(e=64) {
                super(128, e, 16, !1),
                this.Ah = 0 | n.SHA512_IV[0],
                this.Al = 0 | n.SHA512_IV[1],
                this.Bh = 0 | n.SHA512_IV[2],
                this.Bl = 0 | n.SHA512_IV[3],
                this.Ch = 0 | n.SHA512_IV[4],
                this.Cl = 0 | n.SHA512_IV[5],
                this.Dh = 0 | n.SHA512_IV[6],
                this.Dl = 0 | n.SHA512_IV[7],
                this.Eh = 0 | n.SHA512_IV[8],
                this.El = 0 | n.SHA512_IV[9],
                this.Fh = 0 | n.SHA512_IV[10],
                this.Fl = 0 | n.SHA512_IV[11],
                this.Gh = 0 | n.SHA512_IV[12],
                this.Gl = 0 | n.SHA512_IV[13],
                this.Hh = 0 | n.SHA512_IV[14],
                this.Hl = 0 | n.SHA512_IV[15]
            }
            get() {
                const {Ah: e, Al: t, Bh: r, Bl: n, Ch: i, Cl: o, Dh: s, Dl: a, Eh: u, El: c, Fh: l, Fl: f, Gh: d, Gl: h, Hh: p, Hl: g} = this;
                return [e, t, r, n, i, o, s, a, u, c, l, f, d, h, p, g]
            }
            set(e, t, r, n, i, o, s, a, u, c, l, f, d, h, p, g) {
                this.Ah = 0 | e,
                this.Al = 0 | t,
                this.Bh = 0 | r,
                this.Bl = 0 | n,
                this.Ch = 0 | i,
                this.Cl = 0 | o,
                this.Dh = 0 | s,
                this.Dl = 0 | a,
                this.Eh = 0 | u,
                this.El = 0 | c,
                this.Fh = 0 | l,
                this.Fl = 0 | f,
                this.Gh = 0 | d,
                this.Gl = 0 | h,
                this.Hh = 0 | p,
                this.Hl = 0 | g
            }
            process(e, t) {
                for (let r = 0; r < 16; r++,
                t += 4)
                    h[r] = e.getUint32(t),
                    p[r] = e.getUint32(t += 4);
                for (let e = 16; e < 80; e++) {
                    const t = 0 | h[e - 15]
                      , r = 0 | p[e - 15]
                      , n = i.rotrSH(t, r, 1) ^ i.rotrSH(t, r, 8) ^ i.shrSH(t, r, 7)
                      , o = i.rotrSL(t, r, 1) ^ i.rotrSL(t, r, 8) ^ i.shrSL(t, r, 7)
                      , s = 0 | h[e - 2]
                      , a = 0 | p[e - 2]
                      , u = i.rotrSH(s, a, 19) ^ i.rotrBH(s, a, 61) ^ i.shrSH(s, a, 6)
                      , c = i.rotrSL(s, a, 19) ^ i.rotrBL(s, a, 61) ^ i.shrSL(s, a, 6)
                      , l = i.add4L(o, c, p[e - 7], p[e - 16])
                      , f = i.add4H(l, n, u, h[e - 7], h[e - 16]);
                    h[e] = 0 | f,
                    p[e] = 0 | l
                }
                let {Ah: r, Al: n, Bh: o, Bl: s, Ch: a, Cl: u, Dh: c, Dl: l, Eh: g, El: b, Fh: y, Fl: m, Gh: w, Gl: _, Hh: v, Hl: E} = this;
                for (let e = 0; e < 80; e++) {
                    const t = i.rotrSH(g, b, 14) ^ i.rotrSH(g, b, 18) ^ i.rotrBH(g, b, 41)
                      , S = i.rotrSL(g, b, 14) ^ i.rotrSL(g, b, 18) ^ i.rotrBL(g, b, 41)
                      , M = g & y ^ ~g & w
                      , A = b & m ^ ~b & _
                      , j = i.add5L(E, S, A, d[e], p[e])
                      , R = i.add5H(j, v, t, M, f[e], h[e])
                      , I = 0 | j
                      , T = i.rotrSH(r, n, 28) ^ i.rotrBH(r, n, 34) ^ i.rotrBH(r, n, 39)
                      , O = i.rotrSL(r, n, 28) ^ i.rotrBL(r, n, 34) ^ i.rotrBL(r, n, 39)
                      , C = r & o ^ r & a ^ o & a
                      , x = n & s ^ n & u ^ s & u;
                    v = 0 | w,
                    E = 0 | _,
                    w = 0 | y,
                    _ = 0 | m,
                    y = 0 | g,
                    m = 0 | b,
                    ({h: g, l: b} = i.add(0 | c, 0 | l, 0 | R, 0 | I)),
                    c = 0 | a,
                    l = 0 | u,
                    a = 0 | o,
                    u = 0 | s,
                    o = 0 | r,
                    s = 0 | n;
                    const N = i.add3L(I, O, x);
                    r = i.add3H(N, R, T, C),
                    n = 0 | N
                }
                ({h: r, l: n} = i.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)),
                ({h: o, l: s} = i.add(0 | this.Bh, 0 | this.Bl, 0 | o, 0 | s)),
                ({h: a, l: u} = i.add(0 | this.Ch, 0 | this.Cl, 0 | a, 0 | u)),
                ({h: c, l: l} = i.add(0 | this.Dh, 0 | this.Dl, 0 | c, 0 | l)),
                ({h: g, l: b} = i.add(0 | this.Eh, 0 | this.El, 0 | g, 0 | b)),
                ({h: y, l: m} = i.add(0 | this.Fh, 0 | this.Fl, 0 | y, 0 | m)),
                ({h: w, l: _} = i.add(0 | this.Gh, 0 | this.Gl, 0 | w, 0 | _)),
                ({h: v, l: E} = i.add(0 | this.Hh, 0 | this.Hl, 0 | v, 0 | E)),
                this.set(r, n, o, s, a, u, c, l, g, b, y, m, w, _, v, E)
            }
            roundClean() {
                (0,
                o.clean)(h, p)
            }
            destroy() {
                (0,
                o.clean)(this.buffer),
                this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            }
        }
        r.SHA512 = g;
        class b extends g {
            constructor() {
                super(48),
                this.Ah = 0 | n.SHA384_IV[0],
                this.Al = 0 | n.SHA384_IV[1],
                this.Bh = 0 | n.SHA384_IV[2],
                this.Bl = 0 | n.SHA384_IV[3],
                this.Ch = 0 | n.SHA384_IV[4],
                this.Cl = 0 | n.SHA384_IV[5],
                this.Dh = 0 | n.SHA384_IV[6],
                this.Dl = 0 | n.SHA384_IV[7],
                this.Eh = 0 | n.SHA384_IV[8],
                this.El = 0 | n.SHA384_IV[9],
                this.Fh = 0 | n.SHA384_IV[10],
                this.Fl = 0 | n.SHA384_IV[11],
                this.Gh = 0 | n.SHA384_IV[12],
                this.Gl = 0 | n.SHA384_IV[13],
                this.Hh = 0 | n.SHA384_IV[14],
                this.Hl = 0 | n.SHA384_IV[15]
            }
        }
        r.SHA384 = b;
        const y = Uint32Array.from([2352822216, 424955298, 1944164710, 2312950998, 502970286, 855612546, 1738396948, 1479516111, 258812777, 2077511080, 2011393907, 79989058, 1067287976, 1780299464, 286451373, 2446758561])
          , m = Uint32Array.from([573645204, 4230739756, 2673172387, 3360449730, 596883563, 1867755857, 2520282905, 1497426621, 2519219938, 2827943907, 3193839141, 1401305490, 721525244, 746961066, 246885852, 2177182882]);
        class w extends g {
            constructor() {
                super(28),
                this.Ah = 0 | y[0],
                this.Al = 0 | y[1],
                this.Bh = 0 | y[2],
                this.Bl = 0 | y[3],
                this.Ch = 0 | y[4],
                this.Cl = 0 | y[5],
                this.Dh = 0 | y[6],
                this.Dl = 0 | y[7],
                this.Eh = 0 | y[8],
                this.El = 0 | y[9],
                this.Fh = 0 | y[10],
                this.Fl = 0 | y[11],
                this.Gh = 0 | y[12],
                this.Gl = 0 | y[13],
                this.Hh = 0 | y[14],
                this.Hl = 0 | y[15]
            }
        }
        r.SHA512_224 = w;
        class _ extends g {
            constructor() {
                super(32),
                this.Ah = 0 | m[0],
                this.Al = 0 | m[1],
                this.Bh = 0 | m[2],
                this.Bl = 0 | m[3],
                this.Ch = 0 | m[4],
                this.Cl = 0 | m[5],
                this.Dh = 0 | m[6],
                this.Dl = 0 | m[7],
                this.Eh = 0 | m[8],
                this.El = 0 | m[9],
                this.Fh = 0 | m[10],
                this.Fl = 0 | m[11],
                this.Gh = 0 | m[12],
                this.Gl = 0 | m[13],
                this.Hh = 0 | m[14],
                this.Hl = 0 | m[15]
            }
        }
        r.SHA512_256 = _,
        r.sha256 = (0,
        o.createHasher)( () => new u),
        r.sha224 = (0,
        o.createHasher)( () => new c),
        r.sha512 = (0,
        o.createHasher)( () => new g),
        r.sha384 = (0,
        o.createHasher)( () => new b),
        r.sha512_256 = (0,
        o.createHasher)( () => new _),
        r.sha512_224 = (0,
        o.createHasher)( () => new w)
    }
    , {
        "./_md.js": 151,
        "./_u64.js": 152,
        "./utils.js": 157
    }],
    155: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.sha224 = r.SHA224 = r.sha256 = r.SHA256 = void 0;
        const n = e("./sha2.js");
        r.SHA256 = n.SHA256,
        r.sha256 = n.sha256,
        r.SHA224 = n.SHA224,
        r.sha224 = n.sha224
    }
    , {
        "./sha2.js": 154
    }],
    156: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.shake256 = r.shake128 = r.keccak_512 = r.keccak_384 = r.keccak_256 = r.keccak_224 = r.sha3_512 = r.sha3_384 = r.sha3_256 = r.sha3_224 = r.Keccak = void 0,
        r.keccakP = w;
        const n = e("./_u64.js")
          , i = e("./utils.js")
          , o = BigInt(0)
          , s = BigInt(1)
          , a = BigInt(2)
          , u = BigInt(7)
          , c = BigInt(256)
          , l = BigInt(113)
          , f = []
          , d = []
          , h = [];
        for (let e = 0, t = s, r = 1, n = 0; e < 24; e++) {
            [r,n] = [n, (2 * r + 3 * n) % 5],
            f.push(2 * (5 * n + r)),
            d.push((e + 1) * (e + 2) / 2 % 64);
            let i = o;
            for (let e = 0; e < 7; e++)
                t = (t << s ^ (t >> u) * l) % c,
                t & a && (i ^= s << (s << BigInt(e)) - s);
            h.push(i)
        }
        const p = (0,
        n.split)(h, !0)
          , g = p[0]
          , b = p[1]
          , y = (e, t, r) => r > 32 ? (0,
        n.rotlBH)(e, t, r) : (0,
        n.rotlSH)(e, t, r)
          , m = (e, t, r) => r > 32 ? (0,
        n.rotlBL)(e, t, r) : (0,
        n.rotlSL)(e, t, r);
        function w(e, t=24) {
            const r = new Uint32Array(10);
            for (let n = 24 - t; n < 24; n++) {
                for (let t = 0; t < 10; t++)
                    r[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
                for (let t = 0; t < 10; t += 2) {
                    const n = (t + 8) % 10
                      , i = (t + 2) % 10
                      , o = r[i]
                      , s = r[i + 1]
                      , a = y(o, s, 1) ^ r[n]
                      , u = m(o, s, 1) ^ r[n + 1];
                    for (let r = 0; r < 50; r += 10)
                        e[t + r] ^= a,
                        e[t + r + 1] ^= u
                }
                let t = e[2]
                  , i = e[3];
                for (let r = 0; r < 24; r++) {
                    const n = d[r]
                      , o = y(t, i, n)
                      , s = m(t, i, n)
                      , a = f[r];
                    t = e[a],
                    i = e[a + 1],
                    e[a] = o,
                    e[a + 1] = s
                }
                for (let t = 0; t < 50; t += 10) {
                    for (let n = 0; n < 10; n++)
                        r[n] = e[t + n];
                    for (let n = 0; n < 10; n++)
                        e[t + n] ^= ~r[(n + 2) % 10] & r[(n + 4) % 10]
                }
                e[0] ^= g[n],
                e[1] ^= b[n]
            }
            (0,
            i.clean)(r)
        }
        class _ extends i.Hash {
            constructor(e, t, r, n=!1, o=24) {
                if (super(),
                this.pos = 0,
                this.posOut = 0,
                this.finished = !1,
                this.destroyed = !1,
                this.enableXOF = !1,
                this.blockLen = e,
                this.suffix = t,
                this.outputLen = r,
                this.enableXOF = n,
                this.rounds = o,
                (0,
                i.anumber)(r),
                !(0 < e && e < 200))
                    throw new Error("only keccak-f1600 function is supported");
                this.state = new Uint8Array(200),
                this.state32 = (0,
                i.u32)(this.state)
            }
            clone() {
                return this._cloneInto()
            }
            keccak() {
                (0,
                i.swap32IfBE)(this.state32),
                w(this.state32, this.rounds),
                (0,
                i.swap32IfBE)(this.state32),
                this.posOut = 0,
                this.pos = 0
            }
            update(e) {
                (0,
                i.aexists)(this),
                e = (0,
                i.toBytes)(e),
                (0,
                i.abytes)(e);
                const {blockLen: t, state: r} = this
                  , n = e.length;
                for (let i = 0; i < n; ) {
                    const o = Math.min(t - this.pos, n - i);
                    for (let t = 0; t < o; t++)
                        r[this.pos++] ^= e[i++];
                    this.pos === t && this.keccak()
                }
                return this
            }
            finish() {
                if (this.finished)
                    return;
                this.finished = !0;
                const {state: e, suffix: t, pos: r, blockLen: n} = this;
                e[r] ^= t,
                128 & t && r === n - 1 && this.keccak(),
                e[n - 1] ^= 128,
                this.keccak()
            }
            writeInto(e) {
                (0,
                i.aexists)(this, !1),
                (0,
                i.abytes)(e),
                this.finish();
                const t = this.state
                  , {blockLen: r} = this;
                for (let n = 0, i = e.length; n < i; ) {
                    this.posOut >= r && this.keccak();
                    const o = Math.min(r - this.posOut, i - n);
                    e.set(t.subarray(this.posOut, this.posOut + o), n),
                    this.posOut += o,
                    n += o
                }
                return e
            }
            xofInto(e) {
                if (!this.enableXOF)
                    throw new Error("XOF is not possible for this instance");
                return this.writeInto(e)
            }
            xof(e) {
                return (0,
                i.anumber)(e),
                this.xofInto(new Uint8Array(e))
            }
            digestInto(e) {
                if ((0,
                i.aoutput)(e, this),
                this.finished)
                    throw new Error("digest() was already called");
                return this.writeInto(e),
                this.destroy(),
                e
            }
            digest() {
                return this.digestInto(new Uint8Array(this.outputLen))
            }
            destroy() {
                this.destroyed = !0,
                (0,
                i.clean)(this.state)
            }
            _cloneInto(e) {
                const {blockLen: t, suffix: r, outputLen: n, rounds: i, enableXOF: o} = this;
                return e || (e = new _(t,r,n,o,i)),
                e.state32.set(this.state32),
                e.pos = this.pos,
                e.posOut = this.posOut,
                e.finished = this.finished,
                e.rounds = i,
                e.suffix = r,
                e.outputLen = n,
                e.enableXOF = o,
                e.destroyed = this.destroyed,
                e
            }
        }
        r.Keccak = _;
        const v = (e, t, r) => (0,
        i.createHasher)( () => new _(t,e,r));
        r.sha3_224 = v(6, 144, 28),
        r.sha3_256 = v(6, 136, 32),
        r.sha3_384 = v(6, 104, 48),
        r.sha3_512 = v(6, 72, 64),
        r.keccak_224 = v(1, 144, 28),
        r.keccak_256 = v(1, 136, 32),
        r.keccak_384 = v(1, 104, 48),
        r.keccak_512 = v(1, 72, 64);
        const E = (e, t, r) => (0,
        i.createXOFer)( (n={}) => new _(t,e,void 0 === n.dkLen ? r : n.dkLen,!0));
        r.shake128 = E(31, 168, 16),
        r.shake256 = E(31, 136, 32)
    }
    , {
        "./_u64.js": 152,
        "./utils.js": 157
    }],
    157: [function(e, t, r) {
        "use strict";
        /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.wrapXOFConstructorWithOpts = r.wrapConstructorWithOpts = r.wrapConstructor = r.Hash = r.nextTick = r.swap32IfBE = r.byteSwapIfBE = r.swap8IfBE = r.isLE = void 0,
        r.isBytes = i,
        r.anumber = o,
        r.abytes = s,
        r.ahash = function(e) {
            if ("function" != typeof e || "function" != typeof e.create)
                throw new Error("Hash should be wrapped by utils.createHasher");
            o(e.outputLen),
            o(e.blockLen)
        }
        ,
        r.aexists = function(e, t=!0) {
            if (e.destroyed)
                throw new Error("Hash instance has been destroyed");
            if (t && e.finished)
                throw new Error("Hash#digest() has already been called")
        }
        ,
        r.aoutput = function(e, t) {
            s(e);
            const r = t.outputLen;
            if (e.length < r)
                throw new Error("digestInto() expects output buffer of length at least " + r)
        }
        ,
        r.u8 = function(e) {
            return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)
        }
        ,
        r.u32 = function(e) {
            return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength / 4))
        }
        ,
        r.clean = function(...e) {
            for (let t = 0; t < e.length; t++)
                e[t].fill(0)
        }
        ,
        r.createView = function(e) {
            return new DataView(e.buffer,e.byteOffset,e.byteLength)
        }
        ,
        r.rotr = function(e, t) {
            return e << 32 - t | e >>> t
        }
        ,
        r.rotl = function(e, t) {
            return e << t | e >>> 32 - t >>> 0
        }
        ,
        r.byteSwap = a,
        r.byteSwap32 = u,
        r.bytesToHex = function(e) {
            if (s(e),
            c)
                return e.toHex();
            let t = "";
            for (let r = 0; r < e.length; r++)
                t += l[e[r]];
            return t
        }
        ,
        r.hexToBytes = function(e) {
            if ("string" != typeof e)
                throw new Error("hex string expected, got " + typeof e);
            if (c)
                return Uint8Array.fromHex(e);
            const t = e.length
              , r = t / 2;
            if (t % 2)
                throw new Error("hex string expected, got unpadded hex of length " + t);
            const n = new Uint8Array(r);
            for (let t = 0, i = 0; t < r; t++,
            i += 2) {
                const r = d(e.charCodeAt(i))
                  , o = d(e.charCodeAt(i + 1));
                if (void 0 === r || void 0 === o) {
                    const t = e[i] + e[i + 1];
                    throw new Error('hex string expected, got non-hex character "' + t + '" at index ' + i)
                }
                n[t] = 16 * r + o
            }
            return n
        }
        ,
        r.asyncLoop = async function(e, t, n) {
            let i = Date.now();
            for (let o = 0; o < e; o++) {
                n(o);
                const e = Date.now() - i;
                e >= 0 && e < t || (await (0,
                r.nextTick)(),
                i += e)
            }
        }
        ,
        r.utf8ToBytes = h,
        r.bytesToUtf8 = function(e) {
            return (new TextDecoder).decode(e)
        }
        ,
        r.toBytes = p,
        r.kdfInputToBytes = function(e) {
            "string" == typeof e && (e = h(e));
            return s(e),
            e
        }
        ,
        r.concatBytes = function(...e) {
            let t = 0;
            for (let r = 0; r < e.length; r++) {
                const n = e[r];
                s(n),
                t += n.length
            }
            const r = new Uint8Array(t);
            for (let t = 0, n = 0; t < e.length; t++) {
                const i = e[t];
                r.set(i, n),
                n += i.length
            }
            return r
        }
        ,
        r.checkOpts = function(e, t) {
            if (void 0 !== t && "[object Object]" !== {}.toString.call(t))
                throw new Error("options should be object or undefined");
            return Object.assign(e, t)
        }
        ,
        r.createHasher = g,
        r.createOptHasher = b,
        r.createXOFer = y,
        r.randomBytes = function(e=32) {
            if (n.crypto && "function" == typeof n.crypto.getRandomValues)
                return n.crypto.getRandomValues(new Uint8Array(e));
            if (n.crypto && "function" == typeof n.crypto.randomBytes)
                return Uint8Array.from(n.crypto.randomBytes(e));
            throw new Error("crypto.getRandomValues must be defined")
        }
        ;
        const n = e("@noble/hashes/crypto");
        function i(e) {
            return e instanceof Uint8Array || ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name
        }
        function o(e) {
            if (!Number.isSafeInteger(e) || e < 0)
                throw new Error("positive integer expected, got " + e)
        }
        function s(e, ...t) {
            if (!i(e))
                throw new Error("Uint8Array expected");
            if (t.length > 0 && !t.includes(e.length))
                throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length)
        }
        function a(e) {
            return e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255
        }
        function u(e) {
            for (let t = 0; t < e.length; t++)
                e[t] = a(e[t]);
            return e
        }
        r.isLE = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0],
        r.swap8IfBE = r.isLE ? e => e : e => a(e),
        r.byteSwapIfBE = r.swap8IfBE,
        r.swap32IfBE = r.isLE ? e => e : u;
        const c = ( () => "function" == typeof Uint8Array.from([]).toHex && "function" == typeof Uint8Array.fromHex)()
          , l = Array.from({
            length: 256
        }, (e, t) => t.toString(16).padStart(2, "0"));
        const f = {
            _0: 48,
            _9: 57,
            A: 65,
            F: 70,
            a: 97,
            f: 102
        };
        function d(e) {
            return e >= f._0 && e <= f._9 ? e - f._0 : e >= f.A && e <= f.F ? e - (f.A - 10) : e >= f.a && e <= f.f ? e - (f.a - 10) : void 0
        }
        function h(e) {
            if ("string" != typeof e)
                throw new Error("string expected");
            return new Uint8Array((new TextEncoder).encode(e))
        }
        function p(e) {
            return "string" == typeof e && (e = h(e)),
            s(e),
            e
        }
        r.nextTick = async () => {}
        ;
        function g(e) {
            const t = t => e().update(p(t)).digest()
              , r = e();
            return t.outputLen = r.outputLen,
            t.blockLen = r.blockLen,
            t.create = () => e(),
            t
        }
        function b(e) {
            const t = (t, r) => e(r).update(p(t)).digest()
              , r = e({});
            return t.outputLen = r.outputLen,
            t.blockLen = r.blockLen,
            t.create = t => e(t),
            t
        }
        function y(e) {
            const t = (t, r) => e(r).update(p(t)).digest()
              , r = e({});
            return t.outputLen = r.outputLen,
            t.blockLen = r.blockLen,
            t.create = t => e(t),
            t
        }
        r.Hash = class {
        }
        ,
        r.wrapConstructor = g,
        r.wrapConstructorWithOpts = b,
        r.wrapXOFConstructorWithOpts = y
    }
    , {
        "@noble/hashes/crypto": 153
    }],
    158: [function(e, t, r) {
        "use strict";
        /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
        function n(e) {
            return e instanceof Uint8Array || ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name
        }
        function i(e, ...t) {
            if (!n(e))
                throw new Error("Uint8Array expected");
            if (t.length > 0 && !t.includes(e.length))
                throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length)
        }
        function o(e, t) {
            return !!Array.isArray(t) && (0 === t.length || (e ? t.every(e => "string" == typeof e) : t.every(e => Number.isSafeInteger(e))))
        }
        function s(e) {
            if ("function" != typeof e)
                throw new Error("function expected");
            return !0
        }
        function a(e, t) {
            if ("string" != typeof t)
                throw new Error(`${e}: string expected`);
            return !0
        }
        function u(e) {
            if (!Number.isSafeInteger(e))
                throw new Error(`invalid integer: ${e}`)
        }
        function c(e) {
            if (!Array.isArray(e))
                throw new Error("array expected")
        }
        function l(e, t) {
            if (!o(!0, t))
                throw new Error(`${e}: array of strings expected`)
        }
        function f(e, t) {
            if (!o(!1, t))
                throw new Error(`${e}: array of numbers expected`)
        }
        function d(...e) {
            const t = e => e
              , r = (e, t) => r => e(t(r));
            return {
                encode: e.map(e => e.encode).reduceRight(r, t),
                decode: e.map(e => e.decode).reduce(r, t)
            }
        }
        function h(e) {
            const t = "string" == typeof e ? e.split("") : e
              , r = t.length;
            l("alphabet", t);
            const n = new Map(t.map( (e, t) => [e, t]));
            return {
                encode: n => (c(n),
                n.map(n => {
                    if (!Number.isSafeInteger(n) || n < 0 || n >= r)
                        throw new Error(`alphabet.encode: digit index outside alphabet "${n}". Allowed: ${e}`);
                    return t[n]
                }
                )),
                decode: t => (c(t),
                t.map(t => {
                    a("alphabet.decode", t);
                    const r = n.get(t);
                    if (void 0 === r)
                        throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
                    return r
                }
                ))
            }
        }
        function p(e="") {
            return a("join", e),
            {
                encode: t => (l("join.decode", t),
                t.join(e)),
                decode: t => (a("join.decode", t),
                t.split(e))
            }
        }
        function g(e, t="=") {
            return u(e),
            a("padding", t),
            {
                encode(r) {
                    for (l("padding.encode", r); r.length * e % 8; )
                        r.push(t);
                    return r
                },
                decode(r) {
                    l("padding.decode", r);
                    let n = r.length;
                    if (n * e % 8)
                        throw new Error("padding: invalid, string should have whole number of bytes");
                    for (; n > 0 && r[n - 1] === t; n--) {
                        if ((n - 1) * e % 8 == 0)
                            throw new Error("padding: invalid, string has too much padding")
                    }
                    return r.slice(0, n)
                }
            }
        }
        function b(e) {
            return s(e),
            {
                encode: e => e,
                decode: t => e(t)
            }
        }
        function y(e, t, r) {
            if (t < 2)
                throw new Error(`convertRadix: invalid from=${t}, base cannot be less than 2`);
            if (r < 2)
                throw new Error(`convertRadix: invalid to=${r}, base cannot be less than 2`);
            if (c(e),
            !e.length)
                return [];
            let n = 0;
            const i = []
              , o = Array.from(e, e => {
                if (u(e),
                e < 0 || e >= t)
                    throw new Error(`invalid integer: ${e}`);
                return e
            }
            )
              , s = o.length;
            for (; ; ) {
                let e = 0
                  , a = !0;
                for (let i = n; i < s; i++) {
                    const s = o[i]
                      , u = t * e
                      , c = u + s;
                    if (!Number.isSafeInteger(c) || u / t !== e || c - s !== u)
                        throw new Error("convertRadix: carry overflow");
                    const l = c / r;
                    e = c % r;
                    const f = Math.floor(l);
                    if (o[i] = f,
                    !Number.isSafeInteger(f) || f * r + e !== c)
                        throw new Error("convertRadix: carry overflow");
                    a && (f ? a = !1 : n = i)
                }
                if (i.push(e),
                a)
                    break
            }
            for (let t = 0; t < e.length - 1 && 0 === e[t]; t++)
                i.push(0);
            return i.reverse()
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.bytes = r.stringToBytes = r.str = r.bytesToString = r.hex = r.utf8 = r.bech32m = r.bech32 = r.base58check = r.createBase58check = r.base58xmr = r.base58xrp = r.base58flickr = r.base58 = r.base64urlnopad = r.base64url = r.base64nopad = r.base64 = r.base32crockford = r.base32hexnopad = r.base32hex = r.base32nopad = r.base32 = r.base16 = r.utils = void 0;
        const m = (e, t) => 0 === t ? e : m(t, e % t)
          , w = (e, t) => e + (t - m(e, t))
          , _ = ( () => {
            let e = [];
            for (let t = 0; t < 40; t++)
                e.push(2 ** t);
            return e
        }
        )();
        function v(e, t, r, n) {
            if (c(e),
            t <= 0 || t > 32)
                throw new Error(`convertRadix2: wrong from=${t}`);
            if (r <= 0 || r > 32)
                throw new Error(`convertRadix2: wrong to=${r}`);
            if (w(t, r) > 32)
                throw new Error(`convertRadix2: carry overflow from=${t} to=${r} carryBits=${w(t, r)}`);
            let i = 0
              , o = 0;
            const s = _[t]
              , a = _[r] - 1
              , l = [];
            for (const n of e) {
                if (u(n),
                n >= s)
                    throw new Error(`convertRadix2: invalid data word=${n} from=${t}`);
                if (i = i << t | n,
                o + t > 32)
                    throw new Error(`convertRadix2: carry overflow pos=${o} from=${t}`);
                for (o += t; o >= r; o -= r)
                    l.push((i >> o - r & a) >>> 0);
                const e = _[o];
                if (void 0 === e)
                    throw new Error("invalid carry");
                i &= e - 1
            }
            if (i = i << r - o & a,
            !n && o >= t)
                throw new Error("Excess padding");
            if (!n && i > 0)
                throw new Error(`Non-zero padding: ${i}`);
            return n && o > 0 && l.push(i >>> 0),
            l
        }
        function E(e) {
            u(e);
            return {
                encode: t => {
                    if (!n(t))
                        throw new Error("radix.encode input should be Uint8Array");
                    return y(Array.from(t), 256, e)
                }
                ,
                decode: t => (f("radix.decode", t),
                Uint8Array.from(y(t, e, 256)))
            }
        }
        function S(e, t=!1) {
            if (u(e),
            e <= 0 || e > 32)
                throw new Error("radix2: bits should be in (0..32]");
            if (w(8, e) > 32 || w(e, 8) > 32)
                throw new Error("radix2: carry overflow");
            return {
                encode: r => {
                    if (!n(r))
                        throw new Error("radix2.encode input should be Uint8Array");
                    return v(Array.from(r), 8, e, !t)
                }
                ,
                decode: r => (f("radix2.decode", r),
                Uint8Array.from(v(r, e, 8, t)))
            }
        }
        function M(e) {
            return s(e),
            function(...t) {
                try {
                    return e.apply(null, t)
                } catch (e) {}
            }
        }
        function A(e, t) {
            return u(e),
            s(t),
            {
                encode(r) {
                    if (!n(r))
                        throw new Error("checksum.encode: input should be Uint8Array");
                    const i = t(r).slice(0, e)
                      , o = new Uint8Array(r.length + e);
                    return o.set(r),
                    o.set(i, r.length),
                    o
                },
                decode(r) {
                    if (!n(r))
                        throw new Error("checksum.decode: input should be Uint8Array");
                    const i = r.slice(0, -e)
                      , o = r.slice(-e)
                      , s = t(i).slice(0, e);
                    for (let t = 0; t < e; t++)
                        if (s[t] !== o[t])
                            throw new Error("Invalid checksum");
                    return i
                }
            }
        }
        r.utils = {
            alphabet: h,
            chain: d,
            checksum: A,
            convertRadix: y,
            convertRadix2: v,
            radix: E,
            radix2: S,
            join: p,
            padding: g
        },
        r.base16 = d(S(4), h("0123456789ABCDEF"), p("")),
        r.base32 = d(S(5), h("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), g(5), p("")),
        r.base32nopad = d(S(5), h("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), p("")),
        r.base32hex = d(S(5), h("0123456789ABCDEFGHIJKLMNOPQRSTUV"), g(5), p("")),
        r.base32hexnopad = d(S(5), h("0123456789ABCDEFGHIJKLMNOPQRSTUV"), p("")),
        r.base32crockford = d(S(5), h("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), p(""), b(e => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
        const j = ( () => "function" == typeof Uint8Array.from([]).toBase64 && "function" == typeof Uint8Array.fromBase64)()
          , R = (e, t) => {
            a("base64", e);
            const r = t ? /^[A-Za-z0-9=_-]+$/ : /^[A-Za-z0-9=+/]+$/
              , n = t ? "base64url" : "base64";
            if (e.length > 0 && !r.test(e))
                throw new Error("invalid base64");
            return Uint8Array.fromBase64(e, {
                alphabet: n,
                lastChunkHandling: "strict"
            })
        }
        ;
        r.base64 = j ? {
            encode: e => (i(e),
            e.toBase64()),
            decode: e => R(e, !1)
        } : d(S(6), h("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), g(6), p("")),
        r.base64nopad = d(S(6), h("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), p("")),
        r.base64url = j ? {
            encode: e => (i(e),
            e.toBase64({
                alphabet: "base64url"
            })),
            decode: e => R(e, !0)
        } : d(S(6), h("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), g(6), p("")),
        r.base64urlnopad = d(S(6), h("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), p(""));
        const I = e => d(E(58), h(e), p(""));
        r.base58 = I("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),
        r.base58flickr = I("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"),
        r.base58xrp = I("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
        const T = [0, 2, 3, 5, 6, 7, 9, 10, 11];
        r.base58xmr = {
            encode(e) {
                let t = "";
                for (let n = 0; n < e.length; n += 8) {
                    const i = e.subarray(n, n + 8);
                    t += r.base58.encode(i).padStart(T[i.length], "1")
                }
                return t
            },
            decode(e) {
                let t = [];
                for (let n = 0; n < e.length; n += 11) {
                    const i = e.slice(n, n + 11)
                      , o = T.indexOf(i.length)
                      , s = r.base58.decode(i);
                    for (let e = 0; e < s.length - o; e++)
                        if (0 !== s[e])
                            throw new Error("base58xmr: wrong padding");
                    t = t.concat(Array.from(s.slice(s.length - o)))
                }
                return Uint8Array.from(t)
            }
        };
        r.createBase58check = e => d(A(4, t => e(e(t))), r.base58),
        r.base58check = r.createBase58check;
        const O = d(h("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), p(""))
          , C = [996825010, 642813549, 513874426, 1027748829, 705979059];
        function x(e) {
            const t = e >> 25;
            let r = (33554431 & e) << 5;
            for (let e = 0; e < C.length; e++)
                1 == (t >> e & 1) && (r ^= C[e]);
            return r
        }
        function N(e, t, r=1) {
            const n = e.length;
            let i = 1;
            for (let t = 0; t < n; t++) {
                const r = e.charCodeAt(t);
                if (r < 33 || r > 126)
                    throw new Error(`Invalid prefix (${e})`);
                i = x(i) ^ r >> 5
            }
            i = x(i);
            for (let t = 0; t < n; t++)
                i = x(i) ^ 31 & e.charCodeAt(t);
            for (let e of t)
                i = x(i) ^ e;
            for (let e = 0; e < 6; e++)
                i = x(i);
            return i ^= r,
            O.encode(v([i % _[30]], 30, 5, !1))
        }
        function P(e) {
            const t = "bech32" === e ? 1 : 734539939
              , r = S(5)
              , i = r.decode
              , o = r.encode
              , s = M(i);
            function u(e, r, i=90) {
                a("bech32.encode prefix", e),
                n(r) && (r = Array.from(r)),
                f("bech32.encode", r);
                const o = e.length;
                if (0 === o)
                    throw new TypeError(`Invalid prefix length ${o}`);
                const s = o + 7 + r.length;
                if (!1 !== i && s > i)
                    throw new TypeError(`Length ${s} exceeds limit ${i}`);
                const u = e.toLowerCase()
                  , c = N(u, r, t);
                return `${u}1${O.encode(r)}${c}`
            }
            function c(e, r=90) {
                a("bech32.decode input", e);
                const n = e.length;
                if (n < 8 || !1 !== r && n > r)
                    throw new TypeError(`invalid string length: ${n} (${e}). Expected (8..${r})`);
                const i = e.toLowerCase();
                if (e !== i && e !== e.toUpperCase())
                    throw new Error("String must be lowercase or uppercase");
                const o = i.lastIndexOf("1");
                if (0 === o || -1 === o)
                    throw new Error('Letter "1" must be present between prefix and data only');
                const s = i.slice(0, o)
                  , u = i.slice(o + 1);
                if (u.length < 6)
                    throw new Error("Data must be at least 6 characters long");
                const c = O.decode(u).slice(0, -6)
                  , l = N(s, c, t);
                if (!u.endsWith(l))
                    throw new Error(`Invalid checksum in ${e}: expected "${l}"`);
                return {
                    prefix: s,
                    words: c
                }
            }
            return {
                encode: u,
                decode: c,
                encodeFromBytes: function(e, t) {
                    return u(e, o(t))
                },
                decodeToBytes: function(e) {
                    const {prefix: t, words: r} = c(e, !1);
                    return {
                        prefix: t,
                        words: r,
                        bytes: i(r)
                    }
                },
                decodeUnsafe: M(c),
                fromWords: i,
                fromWordsUnsafe: s,
                toWords: o
            }
        }
        r.bech32 = P("bech32"),
        r.bech32m = P("bech32m"),
        r.utf8 = {
            encode: e => (new TextDecoder).decode(e),
            decode: e => (new TextEncoder).encode(e)
        };
        const k = ( () => "function" == typeof Uint8Array.from([]).toHex && "function" == typeof Uint8Array.fromHex)()
          , L = {
            encode: e => (i(e),
            e.toHex()),
            decode: e => (a("hex", e),
            Uint8Array.fromHex(e))
        };
        r.hex = k ? L : d(S(4), h("0123456789abcdef"), p(""), b(e => {
            if ("string" != typeof e || e.length % 2 != 0)
                throw new TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);
            return e.toLowerCase()
        }
        ));
        const D = {
            utf8: r.utf8,
            hex: r.hex,
            base16: r.base16,
            base32: r.base32,
            base64: r.base64,
            base64url: r.base64url,
            base58: r.base58,
            base58xmr: r.base58xmr
        }
          , U = "Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr";
        r.bytesToString = (e, t) => {
            if ("string" != typeof e || !D.hasOwnProperty(e))
                throw new TypeError(U);
            if (!n(t))
                throw new TypeError("bytesToString() expects Uint8Array");
            return D[e].encode(t)
        }
        ,
        r.str = r.bytesToString;
        r.stringToBytes = (e, t) => {
            if (!D.hasOwnProperty(e))
                throw new TypeError(U);
            if ("string" != typeof t)
                throw new TypeError("stringToBytes() expects string");
            return D[e].decode(t)
        }
        ,
        r.bytes = r.stringToBytes
    }
    , {}],
    159: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.SOLANA_CHAINS = r.SOLANA_LOCALNET_CHAIN = r.SOLANA_TESTNET_CHAIN = r.SOLANA_DEVNET_CHAIN = r.SOLANA_MAINNET_CHAIN = void 0,
        r.isSolanaChain = function(e) {
            return r.SOLANA_CHAINS.includes(e)
        }
        ,
        r.SOLANA_MAINNET_CHAIN = "solana:mainnet",
        r.SOLANA_DEVNET_CHAIN = "solana:devnet",
        r.SOLANA_TESTNET_CHAIN = "solana:testnet",
        r.SOLANA_LOCALNET_CHAIN = "solana:localnet",
        r.SOLANA_CHAINS = [r.SOLANA_MAINNET_CHAIN, r.SOLANA_DEVNET_CHAIN, r.SOLANA_TESTNET_CHAIN, r.SOLANA_LOCALNET_CHAIN]
    }
    , {}],
    160: [function(e, t, r) {
        "use strict";
        var n = Object.create ? function(e, t, r, n) {
            void 0 === n && (n = r);
            var i = Object.getOwnPropertyDescriptor(t, r);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[r]
                }
            }),
            Object.defineProperty(e, n, i)
        }
        : function(e, t, r, n) {
            void 0 === n && (n = r),
            e[n] = t[r]
        }
          , i = function(e, t) {
            for (var r in e)
                "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
        };
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        i(e("./signAndSendTransaction.js"), r),
        i(e("./signIn.js"), r),
        i(e("./signMessage.js"), r),
        i(e("./signTransaction.js"), r),
        i(e("./signAndSendAllTransactions.js"), r)
    }
    , {
        "./signAndSendAllTransactions.js": 161,
        "./signAndSendTransaction.js": 162,
        "./signIn.js": 163,
        "./signMessage.js": 164,
        "./signTransaction.js": 165
    }],
    161: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.SignAndSendAllTransactions = void 0,
        r.SignAndSendAllTransactions = "solana:signAndSendAllTransactions"
    }
    , {}],
    162: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.SolanaSignAndSendTransaction = void 0,
        r.SolanaSignAndSendTransaction = "solana:signAndSendTransaction"
    }
    , {}],
    163: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.SolanaSignIn = void 0,
        r.SolanaSignIn = "solana:signIn"
    }
    , {}],
    164: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.SolanaSignMessage = void 0,
        r.SolanaSignMessage = "solana:signMessage"
    }
    , {}],
    165: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.SolanaSignTransaction = void 0,
        r.SolanaSignTransaction = "solana:signTransaction"
    }
    , {}],
    166: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.Connect = r.StandardConnect = void 0,
        r.StandardConnect = "standard:connect",
        r.Connect = r.StandardConnect
    }
    , {}],
    167: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.Disconnect = r.StandardDisconnect = void 0,
        r.StandardDisconnect = "standard:disconnect",
        r.Disconnect = r.StandardDisconnect
    }
    , {}],
    168: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.Events = r.StandardEvents = void 0,
        r.StandardEvents = "standard:events",
        r.Events = r.StandardEvents
    }
    , {}],
    169: [function(e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
            void 0 === n && (n = r);
            var i = Object.getOwnPropertyDescriptor(t, r);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[r]
                }
            }),
            Object.defineProperty(e, n, i)
        }
        : function(e, t, r, n) {
            void 0 === n && (n = r),
            e[n] = t[r]
        }
        )
          , i = this && this.__exportStar || function(e, t) {
            for (var r in e)
                "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        i(e("./connect.js"), r),
        i(e("./disconnect.js"), r),
        i(e("./events.js"), r)
    }
    , {
        "./connect.js": 166,
        "./disconnect.js": 167,
        "./events.js": 168
    }],
    170: [function(e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
            void 0 === n && (n = r);
            var i = Object.getOwnPropertyDescriptor(t, r);
            i && !("get"in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function() {
                    return t[r]
                }
            }),
            Object.defineProperty(e, n, i)
        }
        : function(e, t, r, n) {
            void 0 === n && (n = r),
            e[n] = t[r]
        }
        )
          , i = this && this.__exportStar || function(e, t) {
            for (var r in e)
                "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        i(e("./register.js"), r),
        i(e("./util.js"), r)
    }
    , {
        "./register.js": 171,
        "./util.js": 172
    }],
    171: [function(e, t, r) {
        "use strict";
        var n, i = this && this.__classPrivateFieldGet || function(e, t, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
        }
        , o = this && this.__classPrivateFieldSet || function(e, t, r, n, i) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? i.call(e, r) : i ? i.value = r : t.set(e, r),
            r
        }
        ;
        function s(e) {
            const t = ({register: t}) => t(e);
            try {
                window.dispatchEvent(new a(t))
            } catch (e) {
                console.error("wallet-standard:register-wallet event could not be dispatched\n", e)
            }
            try {
                window.addEventListener("wallet-standard:app-ready", ({detail: e}) => t(e))
            } catch (e) {
                console.error("wallet-standard:app-ready event listener could not be added\n", e)
            }
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.DEPRECATED_registerWallet = r.registerWallet = void 0,
        r.registerWallet = s;
        class a extends Event {
            get detail() {
                return i(this, n, "f")
            }
            get type() {
                return "wallet-standard:register-wallet"
            }
            constructor(e) {
                super("wallet-standard:register-wallet", {
                    bubbles: !1,
                    cancelable: !1,
                    composed: !1
                }),
                n.set(this, void 0),
                o(this, n, e, "f")
            }
            preventDefault() {
                throw new Error("preventDefault cannot be called")
            }
            stopImmediatePropagation() {
                throw new Error("stopImmediatePropagation cannot be called")
            }
            stopPropagation() {
                throw new Error("stopPropagation cannot be called")
            }
        }
        n = new WeakMap,
        r.DEPRECATED_registerWallet = function(e) {
            var t;
            s(e);
            try {
                ((t = window.navigator).wallets || (t.wallets = [])).push( ({register: t}) => t(e))
            } catch (e) {
                console.error("window.navigator.wallets could not be pushed\n", e)
            }
        }
    }
    , {}],
    172: [function(e, t, r) {
        "use strict";
        var n, i, o, s, a, u, c = this && this.__classPrivateFieldGet || function(e, t, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
        }
        , l = this && this.__classPrivateFieldSet || function(e, t, r, n, i) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !i)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? i.call(e, r) : i ? i.value = r : t.set(e, r),
            r
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.guard = r.pick = r.concatBytes = r.bytesEqual = r.arraysEqual = r.ReadonlyWalletAccount = void 0;
        class f {
            get address() {
                return c(this, n, "f")
            }
            get publicKey() {
                return c(this, i, "f").slice()
            }
            get chains() {
                return c(this, o, "f").slice()
            }
            get features() {
                return c(this, s, "f").slice()
            }
            get label() {
                return c(this, a, "f")
            }
            get icon() {
                return c(this, u, "f")
            }
            constructor(e) {
                n.set(this, void 0),
                i.set(this, void 0),
                o.set(this, void 0),
                s.set(this, void 0),
                a.set(this, void 0),
                u.set(this, void 0),
                new.target === f && Object.freeze(this),
                l(this, n, e.address, "f"),
                l(this, i, e.publicKey.slice(), "f"),
                l(this, o, e.chains.slice(), "f"),
                l(this, s, e.features.slice(), "f"),
                l(this, a, e.label, "f"),
                l(this, u, e.icon, "f")
            }
        }
        function d(e, t) {
            if (e === t)
                return !0;
            const r = e.length;
            if (r !== t.length)
                return !1;
            for (let n = 0; n < r; n++)
                if (e[n] !== t[n])
                    return !1;
            return !0
        }
        r.ReadonlyWalletAccount = f,
        n = new WeakMap,
        i = new WeakMap,
        o = new WeakMap,
        s = new WeakMap,
        a = new WeakMap,
        u = new WeakMap,
        r.arraysEqual = d,
        r.bytesEqual = function(e, t) {
            return d(e, t)
        }
        ,
        r.concatBytes = function(e, ...t) {
            const r = t.reduce( (e, t) => e + t.length, e.length)
              , n = new Uint8Array(r);
            n.set(e, 0);
            for (const e of t)
                n.set(e, n.length);
            return n
        }
        ,
        r.pick = function(e, ...t) {
            const r = {};
            for (const n of t)
                r[n] = e[n];
            return r
        }
        ,
        r.guard = function(e) {
            try {
                e()
            } catch (e) {
                console.error(e)
            }
        }
    }
    , {}],
    173: [function(e, t, r) {
        "use strict";
        const {AbortController: n} = globalThis;
        t.exports = {
            AbortController: n
        }
    }
    , {}],
    174: [function(e, t, r) {
        "use strict";
        r.byteLength = function(e) {
            var t = u(e)
              , r = t[0]
              , n = t[1];
            return 3 * (r + n) / 4 - n
        }
        ,
        r.toByteArray = function(e) {
            var t, r, n = u(e), s = n[0], a = n[1], c = new o(function(e, t, r) {
                return 3 * (t + r) / 4 - r
            }(0, s, a)), l = 0, f = a > 0 ? s - 4 : s;
            for (r = 0; r < f; r += 4)
                t = i[e.charCodeAt(r)] << 18 | i[e.charCodeAt(r + 1)] << 12 | i[e.charCodeAt(r + 2)] << 6 | i[e.charCodeAt(r + 3)],
                c[l++] = t >> 16 & 255,
                c[l++] = t >> 8 & 255,
                c[l++] = 255 & t;
            2 === a && (t = i[e.charCodeAt(r)] << 2 | i[e.charCodeAt(r + 1)] >> 4,
            c[l++] = 255 & t);
            1 === a && (t = i[e.charCodeAt(r)] << 10 | i[e.charCodeAt(r + 1)] << 4 | i[e.charCodeAt(r + 2)] >> 2,
            c[l++] = t >> 8 & 255,
            c[l++] = 255 & t);
            return c
        }
        ,
        r.fromByteArray = function(e) {
            for (var t, r = e.length, i = r % 3, o = [], s = 16383, a = 0, u = r - i; a < u; a += s)
                o.push(l(e, a, a + s > u ? u : a + s));
            1 === i ? (t = e[r - 1],
            o.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === i && (t = (e[r - 2] << 8) + e[r - 1],
            o.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
            return o.join("")
        }
        ;
        for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0; a < 64; ++a)
            n[a] = s[a],
            i[s.charCodeAt(a)] = a;
        function u(e) {
            var t = e.length;
            if (t % 4 > 0)
                throw new Error("Invalid string. Length must be a multiple of 4");
            var r = e.indexOf("=");
            return -1 === r && (r = t),
            [r, r === t ? 0 : 4 - r % 4]
        }
        function c(e) {
            return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[63 & e]
        }
        function l(e, t, r) {
            for (var n, i = [], o = t; o < r; o += 3)
                n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]),
                i.push(c(n));
            return i.join("")
        }
        i["-".charCodeAt(0)] = 62,
        i["_".charCodeAt(0)] = 63
    }
    , {}],
    175: [function(e, t, r) {}
    , {}],
    176: [function(e, t, r) {
        /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
        "use strict";
        var n = e("base64-js")
          , i = e("ieee754");
        r.Buffer = a,
        r.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return a.alloc(+e)
        }
        ,
        r.INSPECT_MAX_BYTES = 50;
        var o = 2147483647;
        function s(e) {
            if (e > o)
                throw new RangeError('The value "' + e + '" is invalid for option "size"');
            var t = new Uint8Array(e);
            return t.__proto__ = a.prototype,
            t
        }
        function a(e, t, r) {
            if ("number" == typeof e) {
                if ("string" == typeof t)
                    throw new TypeError('The "string" argument must be of type string. Received type number');
                return l(e)
            }
            return u(e, t, r)
        }
        function u(e, t, r) {
            if ("string" == typeof e)
                return function(e, t) {
                    "string" == typeof t && "" !== t || (t = "utf8");
                    if (!a.isEncoding(t))
                        throw new TypeError("Unknown encoding: " + t);
                    var r = 0 | h(e, t)
                      , n = s(r)
                      , i = n.write(e, t);
                    i !== r && (n = n.slice(0, i));
                    return n
                }(e, t);
            if (ArrayBuffer.isView(e))
                return f(e);
            if (null == e)
                throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
            if (W(e, ArrayBuffer) || e && W(e.buffer, ArrayBuffer))
                return function(e, t, r) {
                    if (t < 0 || e.byteLength < t)
                        throw new RangeError('"offset" is outside of buffer bounds');
                    if (e.byteLength < t + (r || 0))
                        throw new RangeError('"length" is outside of buffer bounds');
                    var n;
                    n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e,t) : new Uint8Array(e,t,r);
                    return n.__proto__ = a.prototype,
                    n
                }(e, t, r);
            if ("number" == typeof e)
                throw new TypeError('The "value" argument must not be of type number. Received type number');
            var n = e.valueOf && e.valueOf();
            if (null != n && n !== e)
                return a.from(n, t, r);
            var i = function(e) {
                if (a.isBuffer(e)) {
                    var t = 0 | d(e.length)
                      , r = s(t);
                    return 0 === r.length || e.copy(r, 0, 0, t),
                    r
                }
                if (void 0 !== e.length)
                    return "number" != typeof e.length || F(e.length) ? s(0) : f(e);
                if ("Buffer" === e.type && Array.isArray(e.data))
                    return f(e.data)
            }(e);
            if (i)
                return i;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive])
                return a.from(e[Symbol.toPrimitive]("string"), t, r);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
        }
        function c(e) {
            if ("number" != typeof e)
                throw new TypeError('"size" argument must be of type number');
            if (e < 0)
                throw new RangeError('The value "' + e + '" is invalid for option "size"')
        }
        function l(e) {
            return c(e),
            s(e < 0 ? 0 : 0 | d(e))
        }
        function f(e) {
            for (var t = e.length < 0 ? 0 : 0 | d(e.length), r = s(t), n = 0; n < t; n += 1)
                r[n] = 255 & e[n];
            return r
        }
        function d(e) {
            if (e >= o)
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
            return 0 | e
        }
        function h(e, t) {
            if (a.isBuffer(e))
                return e.length;
            if (ArrayBuffer.isView(e) || W(e, ArrayBuffer))
                return e.byteLength;
            if ("string" != typeof e)
                throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
            var r = e.length
              , n = arguments.length > 2 && !0 === arguments[2];
            if (!n && 0 === r)
                return 0;
            for (var i = !1; ; )
                switch (t) {
                case "ascii":
                case "latin1":
                case "binary":
                    return r;
                case "utf8":
                case "utf-8":
                    return U(e).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * r;
                case "hex":
                    return r >>> 1;
                case "base64":
                    return $(e).length;
                default:
                    if (i)
                        return n ? -1 : U(e).length;
                    t = ("" + t).toLowerCase(),
                    i = !0
                }
        }
        function p(e, t, r) {
            var n = !1;
            if ((void 0 === t || t < 0) && (t = 0),
            t > this.length)
                return "";
            if ((void 0 === r || r > this.length) && (r = this.length),
            r <= 0)
                return "";
            if ((r >>>= 0) <= (t >>>= 0))
                return "";
            for (e || (e = "utf8"); ; )
                switch (e) {
                case "hex":
                    return T(this, t, r);
                case "utf8":
                case "utf-8":
                    return A(this, t, r);
                case "ascii":
                    return R(this, t, r);
                case "latin1":
                case "binary":
                    return I(this, t, r);
                case "base64":
                    return M(this, t, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return O(this, t, r);
                default:
                    if (n)
                        throw new TypeError("Unknown encoding: " + e);
                    e = (e + "").toLowerCase(),
                    n = !0
                }
        }
        function g(e, t, r) {
            var n = e[t];
            e[t] = e[r],
            e[r] = n
        }
        function b(e, t, r, n, i) {
            if (0 === e.length)
                return -1;
            if ("string" == typeof r ? (n = r,
            r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
            F(r = +r) && (r = i ? 0 : e.length - 1),
            r < 0 && (r = e.length + r),
            r >= e.length) {
                if (i)
                    return -1;
                r = e.length - 1
            } else if (r < 0) {
                if (!i)
                    return -1;
                r = 0
            }
            if ("string" == typeof t && (t = a.from(t, n)),
            a.isBuffer(t))
                return 0 === t.length ? -1 : y(e, t, r, n, i);
            if ("number" == typeof t)
                return t &= 255,
                "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : y(e, [t], r, n, i);
            throw new TypeError("val must be string, number or Buffer")
        }
        function y(e, t, r, n, i) {
            var o, s = 1, a = e.length, u = t.length;
            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (e.length < 2 || t.length < 2)
                    return -1;
                s = 2,
                a /= 2,
                u /= 2,
                r /= 2
            }
            function c(e, t) {
                return 1 === s ? e[t] : e.readUInt16BE(t * s)
            }
            if (i) {
                var l = -1;
                for (o = r; o < a; o++)
                    if (c(e, o) === c(t, -1 === l ? 0 : o - l)) {
                        if (-1 === l && (l = o),
                        o - l + 1 === u)
                            return l * s
                    } else
                        -1 !== l && (o -= o - l),
                        l = -1
            } else
                for (r + u > a && (r = a - u),
                o = r; o >= 0; o--) {
                    for (var f = !0, d = 0; d < u; d++)
                        if (c(e, o + d) !== c(t, d)) {
                            f = !1;
                            break
                        }
                    if (f)
                        return o
                }
            return -1
        }
        function m(e, t, r, n) {
            r = Number(r) || 0;
            var i = e.length - r;
            n ? (n = Number(n)) > i && (n = i) : n = i;
            var o = t.length;
            n > o / 2 && (n = o / 2);
            for (var s = 0; s < n; ++s) {
                var a = parseInt(t.substr(2 * s, 2), 16);
                if (F(a))
                    return s;
                e[r + s] = a
            }
            return s
        }
        function w(e, t, r, n) {
            return B(U(t, e.length - r), e, r, n)
        }
        function _(e, t, r, n) {
            return B(function(e) {
                for (var t = [], r = 0; r < e.length; ++r)
                    t.push(255 & e.charCodeAt(r));
                return t
            }(t), e, r, n)
        }
        function v(e, t, r, n) {
            return _(e, t, r, n)
        }
        function E(e, t, r, n) {
            return B($(t), e, r, n)
        }
        function S(e, t, r, n) {
            return B(function(e, t) {
                for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s)
                    n = (r = e.charCodeAt(s)) >> 8,
                    i = r % 256,
                    o.push(i),
                    o.push(n);
                return o
            }(t, e.length - r), e, r, n)
        }
        function M(e, t, r) {
            return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
        }
        function A(e, t, r) {
            r = Math.min(e.length, r);
            for (var n = [], i = t; i < r; ) {
                var o, s, a, u, c = e[i], l = null, f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                if (i + f <= r)
                    switch (f) {
                    case 1:
                        c < 128 && (l = c);
                        break;
                    case 2:
                        128 == (192 & (o = e[i + 1])) && (u = (31 & c) << 6 | 63 & o) > 127 && (l = u);
                        break;
                    case 3:
                        o = e[i + 1],
                        s = e[i + 2],
                        128 == (192 & o) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (l = u);
                        break;
                    case 4:
                        o = e[i + 1],
                        s = e[i + 2],
                        a = e[i + 3],
                        128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (l = u)
                    }
                null === l ? (l = 65533,
                f = 1) : l > 65535 && (l -= 65536,
                n.push(l >>> 10 & 1023 | 55296),
                l = 56320 | 1023 & l),
                n.push(l),
                i += f
            }
            return function(e) {
                var t = e.length;
                if (t <= j)
                    return String.fromCharCode.apply(String, e);
                var r = ""
                  , n = 0;
                for (; n < t; )
                    r += String.fromCharCode.apply(String, e.slice(n, n += j));
                return r
            }(n)
        }
        r.kMaxLength = o,
        a.TYPED_ARRAY_SUPPORT = function() {
            try {
                var e = new Uint8Array(1);
                return e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                },
                42 === e.foo()
            } catch (e) {
                return !1
            }
        }(),
        a.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
        Object.defineProperty(a.prototype, "parent", {
            enumerable: !0,
            get: function() {
                if (a.isBuffer(this))
                    return this.buffer
            }
        }),
        Object.defineProperty(a.prototype, "offset", {
            enumerable: !0,
            get: function() {
                if (a.isBuffer(this))
                    return this.byteOffset
            }
        }),
        "undefined" != typeof Symbol && null != Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
            value: null,
            configurable: !0,
            enumerable: !1,
            writable: !1
        }),
        a.poolSize = 8192,
        a.from = function(e, t, r) {
            return u(e, t, r)
        }
        ,
        a.prototype.__proto__ = Uint8Array.prototype,
        a.__proto__ = Uint8Array,
        a.alloc = function(e, t, r) {
            return function(e, t, r) {
                return c(e),
                e <= 0 ? s(e) : void 0 !== t ? "string" == typeof r ? s(e).fill(t, r) : s(e).fill(t) : s(e)
            }(e, t, r)
        }
        ,
        a.allocUnsafe = function(e) {
            return l(e)
        }
        ,
        a.allocUnsafeSlow = function(e) {
            return l(e)
        }
        ,
        a.isBuffer = function(e) {
            return null != e && !0 === e._isBuffer && e !== a.prototype
        }
        ,
        a.compare = function(e, t) {
            if (W(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
            W(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
            !a.isBuffer(e) || !a.isBuffer(t))
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (e === t)
                return 0;
            for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i)
                if (e[i] !== t[i]) {
                    r = e[i],
                    n = t[i];
                    break
                }
            return r < n ? -1 : n < r ? 1 : 0
        }
        ,
        a.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ,
        a.concat = function(e, t) {
            if (!Array.isArray(e))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length)
                return a.alloc(0);
            var r;
            if (void 0 === t)
                for (t = 0,
                r = 0; r < e.length; ++r)
                    t += e[r].length;
            var n = a.allocUnsafe(t)
              , i = 0;
            for (r = 0; r < e.length; ++r) {
                var o = e[r];
                if (W(o, Uint8Array) && (o = a.from(o)),
                !a.isBuffer(o))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                o.copy(n, i),
                i += o.length
            }
            return n
        }
        ,
        a.byteLength = h,
        a.prototype._isBuffer = !0,
        a.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 != 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2)
                g(this, t, t + 1);
            return this
        }
        ,
        a.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4)
                g(this, t, t + 3),
                g(this, t + 1, t + 2);
            return this
        }
        ,
        a.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8)
                g(this, t, t + 7),
                g(this, t + 1, t + 6),
                g(this, t + 2, t + 5),
                g(this, t + 3, t + 4);
            return this
        }
        ,
        a.prototype.toString = function() {
            var e = this.length;
            return 0 === e ? "" : 0 === arguments.length ? A(this, 0, e) : p.apply(this, arguments)
        }
        ,
        a.prototype.toLocaleString = a.prototype.toString,
        a.prototype.equals = function(e) {
            if (!a.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === a.compare(this, e)
        }
        ,
        a.prototype.inspect = function() {
            var e = ""
              , t = r.INSPECT_MAX_BYTES;
            return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(),
            this.length > t && (e += " ... "),
            "<Buffer " + e + ">"
        }
        ,
        a.prototype.compare = function(e, t, r, n, i) {
            if (W(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
            !a.isBuffer(e))
                throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
            if (void 0 === t && (t = 0),
            void 0 === r && (r = e ? e.length : 0),
            void 0 === n && (n = 0),
            void 0 === i && (i = this.length),
            t < 0 || r > e.length || n < 0 || i > this.length)
                throw new RangeError("out of range index");
            if (n >= i && t >= r)
                return 0;
            if (n >= i)
                return -1;
            if (t >= r)
                return 1;
            if (this === e)
                return 0;
            for (var o = (i >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), u = Math.min(o, s), c = this.slice(n, i), l = e.slice(t, r), f = 0; f < u; ++f)
                if (c[f] !== l[f]) {
                    o = c[f],
                    s = l[f];
                    break
                }
            return o < s ? -1 : s < o ? 1 : 0
        }
        ,
        a.prototype.includes = function(e, t, r) {
            return -1 !== this.indexOf(e, t, r)
        }
        ,
        a.prototype.indexOf = function(e, t, r) {
            return b(this, e, t, r, !0)
        }
        ,
        a.prototype.lastIndexOf = function(e, t, r) {
            return b(this, e, t, r, !1)
        }
        ,
        a.prototype.write = function(e, t, r, n) {
            if (void 0 === t)
                n = "utf8",
                r = this.length,
                t = 0;
            else if (void 0 === r && "string" == typeof t)
                n = t,
                r = this.length,
                t = 0;
            else {
                if (!isFinite(t))
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t >>>= 0,
                isFinite(r) ? (r >>>= 0,
                void 0 === n && (n = "utf8")) : (n = r,
                r = void 0)
            }
            var i = this.length - t;
            if ((void 0 === r || r > i) && (r = i),
            e.length > 0 && (r < 0 || t < 0) || t > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1; ; )
                switch (n) {
                case "hex":
                    return m(this, e, t, r);
                case "utf8":
                case "utf-8":
                    return w(this, e, t, r);
                case "ascii":
                    return _(this, e, t, r);
                case "latin1":
                case "binary":
                    return v(this, e, t, r);
                case "base64":
                    return E(this, e, t, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return S(this, e, t, r);
                default:
                    if (o)
                        throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(),
                    o = !0
                }
        }
        ,
        a.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        var j = 4096;
        function R(e, t, r) {
            var n = "";
            r = Math.min(e.length, r);
            for (var i = t; i < r; ++i)
                n += String.fromCharCode(127 & e[i]);
            return n
        }
        function I(e, t, r) {
            var n = "";
            r = Math.min(e.length, r);
            for (var i = t; i < r; ++i)
                n += String.fromCharCode(e[i]);
            return n
        }
        function T(e, t, r) {
            var n = e.length;
            (!t || t < 0) && (t = 0),
            (!r || r < 0 || r > n) && (r = n);
            for (var i = "", o = t; o < r; ++o)
                i += D(e[o]);
            return i
        }
        function O(e, t, r) {
            for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2)
                i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i
        }
        function C(e, t, r) {
            if (e % 1 != 0 || e < 0)
                throw new RangeError("offset is not uint");
            if (e + t > r)
                throw new RangeError("Trying to access beyond buffer length")
        }
        function x(e, t, r, n, i, o) {
            if (!a.isBuffer(e))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > i || t < o)
                throw new RangeError('"value" argument is out of bounds');
            if (r + n > e.length)
                throw new RangeError("Index out of range")
        }
        function N(e, t, r, n, i, o) {
            if (r + n > e.length)
                throw new RangeError("Index out of range");
            if (r < 0)
                throw new RangeError("Index out of range")
        }
        function P(e, t, r, n, o) {
            return t = +t,
            r >>>= 0,
            o || N(e, 0, r, 4),
            i.write(e, t, r, n, 23, 4),
            r + 4
        }
        function k(e, t, r, n, o) {
            return t = +t,
            r >>>= 0,
            o || N(e, 0, r, 8),
            i.write(e, t, r, n, 52, 8),
            r + 8
        }
        a.prototype.slice = function(e, t) {
            var r = this.length;
            (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            t < e && (t = e);
            var n = this.subarray(e, t);
            return n.__proto__ = a.prototype,
            n
        }
        ,
        a.prototype.readUIntLE = function(e, t, r) {
            e >>>= 0,
            t >>>= 0,
            r || C(e, t, this.length);
            for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
                n += this[e + o] * i;
            return n
        }
        ,
        a.prototype.readUIntBE = function(e, t, r) {
            e >>>= 0,
            t >>>= 0,
            r || C(e, t, this.length);
            for (var n = this[e + --t], i = 1; t > 0 && (i *= 256); )
                n += this[e + --t] * i;
            return n
        }
        ,
        a.prototype.readUInt8 = function(e, t) {
            return e >>>= 0,
            t || C(e, 1, this.length),
            this[e]
        }
        ,
        a.prototype.readUInt16LE = function(e, t) {
            return e >>>= 0,
            t || C(e, 2, this.length),
            this[e] | this[e + 1] << 8
        }
        ,
        a.prototype.readUInt16BE = function(e, t) {
            return e >>>= 0,
            t || C(e, 2, this.length),
            this[e] << 8 | this[e + 1]
        }
        ,
        a.prototype.readUInt32LE = function(e, t) {
            return e >>>= 0,
            t || C(e, 4, this.length),
            (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        }
        ,
        a.prototype.readUInt32BE = function(e, t) {
            return e >>>= 0,
            t || C(e, 4, this.length),
            16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }
        ,
        a.prototype.readIntLE = function(e, t, r) {
            e >>>= 0,
            t >>>= 0,
            r || C(e, t, this.length);
            for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
                n += this[e + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)),
            n
        }
        ,
        a.prototype.readIntBE = function(e, t, r) {
            e >>>= 0,
            t >>>= 0,
            r || C(e, t, this.length);
            for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256); )
                o += this[e + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)),
            o
        }
        ,
        a.prototype.readInt8 = function(e, t) {
            return e >>>= 0,
            t || C(e, 1, this.length),
            128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
        }
        ,
        a.prototype.readInt16LE = function(e, t) {
            e >>>= 0,
            t || C(e, 2, this.length);
            var r = this[e] | this[e + 1] << 8;
            return 32768 & r ? 4294901760 | r : r
        }
        ,
        a.prototype.readInt16BE = function(e, t) {
            e >>>= 0,
            t || C(e, 2, this.length);
            var r = this[e + 1] | this[e] << 8;
            return 32768 & r ? 4294901760 | r : r
        }
        ,
        a.prototype.readInt32LE = function(e, t) {
            return e >>>= 0,
            t || C(e, 4, this.length),
            this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }
        ,
        a.prototype.readInt32BE = function(e, t) {
            return e >>>= 0,
            t || C(e, 4, this.length),
            this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }
        ,
        a.prototype.readFloatLE = function(e, t) {
            return e >>>= 0,
            t || C(e, 4, this.length),
            i.read(this, e, !0, 23, 4)
        }
        ,
        a.prototype.readFloatBE = function(e, t) {
            return e >>>= 0,
            t || C(e, 4, this.length),
            i.read(this, e, !1, 23, 4)
        }
        ,
        a.prototype.readDoubleLE = function(e, t) {
            return e >>>= 0,
            t || C(e, 8, this.length),
            i.read(this, e, !0, 52, 8)
        }
        ,
        a.prototype.readDoubleBE = function(e, t) {
            return e >>>= 0,
            t || C(e, 8, this.length),
            i.read(this, e, !1, 52, 8)
        }
        ,
        a.prototype.writeUIntLE = function(e, t, r, n) {
            (e = +e,
            t >>>= 0,
            r >>>= 0,
            n) || x(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            var i = 1
              , o = 0;
            for (this[t] = 255 & e; ++o < r && (i *= 256); )
                this[t + o] = e / i & 255;
            return t + r
        }
        ,
        a.prototype.writeUIntBE = function(e, t, r, n) {
            (e = +e,
            t >>>= 0,
            r >>>= 0,
            n) || x(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            var i = r - 1
              , o = 1;
            for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
                this[t + i] = e / o & 255;
            return t + r
        }
        ,
        a.prototype.writeUInt8 = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 1, 255, 0),
            this[t] = 255 & e,
            t + 1
        }
        ,
        a.prototype.writeUInt16LE = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 2, 65535, 0),
            this[t] = 255 & e,
            this[t + 1] = e >>> 8,
            t + 2
        }
        ,
        a.prototype.writeUInt16BE = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 2, 65535, 0),
            this[t] = e >>> 8,
            this[t + 1] = 255 & e,
            t + 2
        }
        ,
        a.prototype.writeUInt32LE = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 4, 4294967295, 0),
            this[t + 3] = e >>> 24,
            this[t + 2] = e >>> 16,
            this[t + 1] = e >>> 8,
            this[t] = 255 & e,
            t + 4
        }
        ,
        a.prototype.writeUInt32BE = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 4, 4294967295, 0),
            this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = 255 & e,
            t + 4
        }
        ,
        a.prototype.writeIntLE = function(e, t, r, n) {
            if (e = +e,
            t >>>= 0,
            !n) {
                var i = Math.pow(2, 8 * r - 1);
                x(this, e, t, r, i - 1, -i)
            }
            var o = 0
              , s = 1
              , a = 0;
            for (this[t] = 255 & e; ++o < r && (s *= 256); )
                e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1),
                this[t + o] = (e / s | 0) - a & 255;
            return t + r
        }
        ,
        a.prototype.writeIntBE = function(e, t, r, n) {
            if (e = +e,
            t >>>= 0,
            !n) {
                var i = Math.pow(2, 8 * r - 1);
                x(this, e, t, r, i - 1, -i)
            }
            var o = r - 1
              , s = 1
              , a = 0;
            for (this[t + o] = 255 & e; --o >= 0 && (s *= 256); )
                e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1),
                this[t + o] = (e / s | 0) - a & 255;
            return t + r
        }
        ,
        a.prototype.writeInt8 = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 1, 127, -128),
            e < 0 && (e = 255 + e + 1),
            this[t] = 255 & e,
            t + 1
        }
        ,
        a.prototype.writeInt16LE = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 2, 32767, -32768),
            this[t] = 255 & e,
            this[t + 1] = e >>> 8,
            t + 2
        }
        ,
        a.prototype.writeInt16BE = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 2, 32767, -32768),
            this[t] = e >>> 8,
            this[t + 1] = 255 & e,
            t + 2
        }
        ,
        a.prototype.writeInt32LE = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 4, 2147483647, -2147483648),
            this[t] = 255 & e,
            this[t + 1] = e >>> 8,
            this[t + 2] = e >>> 16,
            this[t + 3] = e >>> 24,
            t + 4
        }
        ,
        a.prototype.writeInt32BE = function(e, t, r) {
            return e = +e,
            t >>>= 0,
            r || x(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = 255 & e,
            t + 4
        }
        ,
        a.prototype.writeFloatLE = function(e, t, r) {
            return P(this, e, t, !0, r)
        }
        ,
        a.prototype.writeFloatBE = function(e, t, r) {
            return P(this, e, t, !1, r)
        }
        ,
        a.prototype.writeDoubleLE = function(e, t, r) {
            return k(this, e, t, !0, r)
        }
        ,
        a.prototype.writeDoubleBE = function(e, t, r) {
            return k(this, e, t, !1, r)
        }
        ,
        a.prototype.copy = function(e, t, r, n) {
            if (!a.isBuffer(e))
                throw new TypeError("argument should be a Buffer");
            if (r || (r = 0),
            n || 0 === n || (n = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            n > 0 && n < r && (n = r),
            n === r)
                return 0;
            if (0 === e.length || 0 === this.length)
                return 0;
            if (t < 0)
                throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length)
                throw new RangeError("Index out of range");
            if (n < 0)
                throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length),
            e.length - t < n - r && (n = e.length - t + r);
            var i = n - r;
            if (this === e && "function" == typeof Uint8Array.prototype.copyWithin)
                this.copyWithin(t, r, n);
            else if (this === e && r < t && t < n)
                for (var o = i - 1; o >= 0; --o)
                    e[o + t] = this[o + r];
            else
                Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
            return i
        }
        ,
        a.prototype.fill = function(e, t, r, n) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (n = t,
                t = 0,
                r = this.length) : "string" == typeof r && (n = r,
                r = this.length),
                void 0 !== n && "string" != typeof n)
                    throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !a.isEncoding(n))
                    throw new TypeError("Unknown encoding: " + n);
                if (1 === e.length) {
                    var i = e.charCodeAt(0);
                    ("utf8" === n && i < 128 || "latin1" === n) && (e = i)
                }
            } else
                "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < r)
                throw new RangeError("Out of range index");
            if (r <= t)
                return this;
            var o;
            if (t >>>= 0,
            r = void 0 === r ? this.length : r >>> 0,
            e || (e = 0),
            "number" == typeof e)
                for (o = t; o < r; ++o)
                    this[o] = e;
            else {
                var s = a.isBuffer(e) ? e : a.from(e, n)
                  , u = s.length;
                if (0 === u)
                    throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                for (o = 0; o < r - t; ++o)
                    this[o + t] = s[o % u]
            }
            return this
        }
        ;
        var L = /[^+/0-9A-Za-z-_]/g;
        function D(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16)
        }
        function U(e, t) {
            var r;
            t = t || 1 / 0;
            for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
                if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                    if (!i) {
                        if (r > 56319) {
                            (t -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === n) {
                            (t -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = r;
                        continue
                    }
                    if (r < 56320) {
                        (t -= 3) > -1 && o.push(239, 191, 189),
                        i = r;
                        continue
                    }
                    r = 65536 + (i - 55296 << 10 | r - 56320)
                } else
                    i && (t -= 3) > -1 && o.push(239, 191, 189);
                if (i = null,
                r < 128) {
                    if ((t -= 1) < 0)
                        break;
                    o.push(r)
                } else if (r < 2048) {
                    if ((t -= 2) < 0)
                        break;
                    o.push(r >> 6 | 192, 63 & r | 128)
                } else if (r < 65536) {
                    if ((t -= 3) < 0)
                        break;
                    o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                } else {
                    if (!(r < 1114112))
                        throw new Error("Invalid code point");
                    if ((t -= 4) < 0)
                        break;
                    o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                }
            }
            return o
        }
        function $(e) {
            return n.toByteArray(function(e) {
                if ((e = (e = e.split("=")[0]).trim().replace(L, "")).length < 2)
                    return "";
                for (; e.length % 4 != 0; )
                    e += "=";
                return e
            }(e))
        }
        function B(e, t, r, n) {
            for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i)
                t[i + r] = e[i];
            return i
        }
        function W(e, t) {
            return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
        }
        function F(e) {
            return e != e
        }
    }
    , {
        "base64-js": 174,
        ieee754: 184
    }],
    177: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }),
        r.default = function(e) {
            if (e.length >= 255)
                throw new TypeError("Alphabet too long");
            const t = new Uint8Array(256);
            for (let e = 0; e < t.length; e++)
                t[e] = 255;
            for (let r = 0; r < e.length; r++) {
                const n = e.charAt(r)
                  , i = n.charCodeAt(0);
                if (255 !== t[i])
                    throw new TypeError(n + " is ambiguous");
                t[i] = r
            }
            const r = e.length
              , n = e.charAt(0)
              , i = Math.log(r) / Math.log(256)
              , o = Math.log(256) / Math.log(r);
            function s(e) {
                if ("string" != typeof e)
                    throw new TypeError("Expected String");
                if (0 === e.length)
                    return new Uint8Array;
                let o = 0
                  , s = 0
                  , a = 0;
                for (; e[o] === n; )
                    s++,
                    o++;
                const u = (e.length - o) * i + 1 >>> 0
                  , c = new Uint8Array(u);
                for (; o < e.length; ) {
                    const n = e.charCodeAt(o);
                    if (n > 255)
                        return;
                    let i = t[n];
                    if (255 === i)
                        return;
                    let s = 0;
                    for (let e = u - 1; (0 !== i || s < a) && -1 !== e; e--,
                    s++)
                        i += r * c[e] >>> 0,
                        c[e] = i % 256 >>> 0,
                        i = i / 256 >>> 0;
                    if (0 !== i)
                        throw new Error("Non-zero carry");
                    a = s,
                    o++
                }
                let l = u - a;
                for (; l !== u && 0 === c[l]; )
                    l++;
                const f = new Uint8Array(s + (u - l));
                let d = s;
                for (; l !== u; )
                    f[d++] = c[l++];
                return f
            }
            return {
                encode: function(t) {
                    if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer,t.byteOffset,t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))),
                    !(t instanceof Uint8Array))
                        throw new TypeError("Expected Uint8Array");
                    if (0 === t.length)
                        return "";
                    let i = 0
                      , s = 0
                      , a = 0;
                    const u = t.length;
                    for (; a !== u && 0 === t[a]; )
                        a++,
                        i++;
                    const c = (u - a) * o + 1 >>> 0
                      , l = new Uint8Array(c);
                    for (; a !== u; ) {
                        let e = t[a]
                          , n = 0;
                        for (let t = c - 1; (0 !== e || n < s) && -1 !== t; t--,
                        n++)
                            e += 256 * l[t] >>> 0,
                            l[t] = e % r >>> 0,
                            e = e / r >>> 0;
                        if (0 !== e)
                            throw new Error("Non-zero carry");
                        s = n,
                        a++
                    }
                    let f = c - s;
                    for (; f !== c && 0 === l[f]; )
                        f++;
                    let d = n.repeat(i);
                    for (; f < c; ++f)
                        d += e.charAt(l[f]);
                    return d
                },
                decodeUnsafe: s,
                decode: function(e) {
                    const t = s(e);
                    if (t)
                        return t;
                    throw new Error("Non-base" + r + " character")
                }
            }
        }
    }
    , {}],
    178: [function(e, t, r) {
        "use strict";
        var n = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        var i = n(e("base-x"));
        r.default = (0,
        i.default)("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
    }
    , {
        "base-x": 177
    }],
    179: [function(e, t, r) {
        (function(n) {
            (function() {
                r.formatArgs = function(e) {
                    if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff),
                    !this.useColors)
                        return;
                    const r = "color: " + this.color;
                    e.splice(1, 0, r, "color: inherit");
                    let n = 0
                      , i = 0;
                    e[0].replace(/%[a-zA-Z%]/g, e => {
                        "%%" !== e && (n++,
                        "%c" === e && (i = n))
                    }
                    ),
                    e.splice(i, 0, r)
                }
                ,
                r.save = function(e) {
                    try {
                        e ? r.storage.setItem("debug", e) : r.storage.removeItem("debug")
                    } catch (e) {}
                }
                ,
                r.load = function() {
                    let e;
                    try {
                        e = r.storage.getItem("debug") || r.storage.getItem("DEBUG")
                    } catch (e) {}
                    !e && void 0 !== n && "env"in n && (e = n.env.DEBUG);
                    return e
                }
                ,
                r.useColors = function() {
                    if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs))
                        return !0;
                    if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
                        return !1;
                    let e;
                    return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e[1], 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
                }
                ,
                r.storage = function() {
                    try {
                        return localStorage
                    } catch (e) {}
                }(),
                r.destroy = ( () => {
                    let e = !1;
                    return () => {
                        e || (e = !0,
                        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))
                    }
                }
                )(),
                r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
                r.log = console.debug || console.log || ( () => {}
                ),
                t.exports = e("./common")(r);
                const {formatters: i} = t.exports;
                i.j = function(e) {
                    try {
                        return JSON.stringify(e)
                    } catch (e) {
                        return "[UnexpectedJSONParseError]: " + e.message
                    }
                }
            }
            ).call(this)
        }
        ).call(this, e("_process"))
    }
    , {
        "./common": 180,
        _process: 195
    }],
    180: [function(e, t, r) {
        t.exports = function(t) {
            function r(e) {
                let t, i, o, s = null;
                function a(...e) {
                    if (!a.enabled)
                        return;
                    const n = a
                      , i = Number(new Date)
                      , o = i - (t || i);
                    n.diff = o,
                    n.prev = t,
                    n.curr = i,
                    t = i,
                    e[0] = r.coerce(e[0]),
                    "string" != typeof e[0] && e.unshift("%O");
                    let s = 0;
                    e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, i) => {
                        if ("%%" === t)
                            return "%";
                        s++;
                        const o = r.formatters[i];
                        if ("function" == typeof o) {
                            const r = e[s];
                            t = o.call(n, r),
                            e.splice(s, 1),
                            s--
                        }
                        return t
                    }
                    ),
                    r.formatArgs.call(n, e);
                    (n.log || r.log).apply(n, e)
                }
                return a.namespace = e,
                a.useColors = r.useColors(),
                a.color = r.selectColor(e),
                a.extend = n,
                a.destroy = r.destroy,
                Object.defineProperty(a, "enabled", {
                    enumerable: !0,
                    configurable: !1,
                    get: () => null !== s ? s : (i !== r.namespaces && (i = r.namespaces,
                    o = r.enabled(e)),
                    o),
                    set: e => {
                        s = e
                    }
                }),
                "function" == typeof r.init && r.init(a),
                a
            }
            function n(e, t) {
                const n = r(this.namespace + (void 0 === t ? ":" : t) + e);
                return n.log = this.log,
                n
            }
            function i(e, t) {
                let r = 0
                  , n = 0
                  , i = -1
                  , o = 0;
                for (; r < e.length; )
                    if (n < t.length && (t[n] === e[r] || "*" === t[n]))
                        "*" === t[n] ? (i = n,
                        o = r,
                        n++) : (r++,
                        n++);
                    else {
                        if (-1 === i)
                            return !1;
                        n = i + 1,
                        o++,
                        r = o
                    }
                for (; n < t.length && "*" === t[n]; )
                    n++;
                return n === t.length
            }
            return r.debug = r,
            r.default = r,
            r.coerce = function(e) {
                if (e instanceof Error)
                    return e.stack || e.message;
                return e
            }
            ,
            r.disable = function() {
                const e = [...r.names, ...r.skips.map(e => "-" + e)].join(",");
                return r.enable(""),
                e
            }
            ,
            r.enable = function(e) {
                r.save(e),
                r.namespaces = e,
                r.names = [],
                r.skips = [];
                const t = ("string" == typeof e ? e : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
                for (const e of t)
                    "-" === e[0] ? r.skips.push(e.slice(1)) : r.names.push(e)
            }
            ,
            r.enabled = function(e) {
                for (const t of r.skips)
                    if (i(e, t))
                        return !1;
                for (const t of r.names)
                    if (i(e, t))
                        return !0;
                return !1
            }
            ,
            r.humanize = e("ms"),
            r.destroy = function() {
                console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
            }
            ,
            Object.keys(t).forEach(e => {
                r[e] = t[e]
            }
            ),
            r.names = [],
            r.skips = [],
            r.formatters = {},
            r.selectColor = function(e) {
                let t = 0;
                for (let r = 0; r < e.length; r++)
                    t = (t << 5) - t + e.charCodeAt(r),
                    t |= 0;
                return r.colors[Math.abs(t) % r.colors.length]
            }
            ,
            r.enable(r.load()),
            r
        }
    }
    , {
        ms: 190
    }],
    181: [function(e, t, r) {
        "use strict";
        var n, i = "object" == typeof Reflect ? Reflect : null, o = i && "function" == typeof i.apply ? i.apply : function(e, t, r) {
            return Function.prototype.apply.call(e, t, r)
        }
        ;
        n = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function(e) {
            return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
        }
        : function(e) {
            return Object.getOwnPropertyNames(e)
        }
        ;
        var s = Number.isNaN || function(e) {
            return e != e
        }
        ;
        function a() {
            a.init.call(this)
        }
        t.exports = a,
        t.exports.once = function(e, t) {
            return new Promise(function(r, n) {
                function i(r) {
                    e.removeListener(t, o),
                    n(r)
                }
                function o() {
                    "function" == typeof e.removeListener && e.removeListener("error", i),
                    r([].slice.call(arguments))
                }
                y(e, t, o, {
                    once: !0
                }),
                "error" !== t && function(e, t, r) {
                    "function" == typeof e.on && y(e, "error", t, r)
                }(e, i, {
                    once: !0
                })
            }
            )
        }
        ,
        a.EventEmitter = a,
        a.prototype._events = void 0,
        a.prototype._eventsCount = 0,
        a.prototype._maxListeners = void 0;
        var u = 10;
        function c(e) {
            if ("function" != typeof e)
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }
        function l(e) {
            return void 0 === e._maxListeners ? a.defaultMaxListeners : e._maxListeners
        }
        function f(e, t, r, n) {
            var i, o, s, a;
            if (c(r),
            void 0 === (o = e._events) ? (o = e._events = Object.create(null),
            e._eventsCount = 0) : (void 0 !== o.newListener && (e.emit("newListener", t, r.listener ? r.listener : r),
            o = e._events),
            s = o[t]),
            void 0 === s)
                s = o[t] = r,
                ++e._eventsCount;
            else if ("function" == typeof s ? s = o[t] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r),
            (i = l(e)) > 0 && s.length > i && !s.warned) {
                s.warned = !0;
                var u = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                u.name = "MaxListenersExceededWarning",
                u.emitter = e,
                u.type = t,
                u.count = s.length,
                a = u,
                console && console.warn && console.warn(a)
            }
            return e
        }
        function d() {
            if (!this.fired)
                return this.target.removeListener(this.type, this.wrapFn),
                this.fired = !0,
                0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
        }
        function h(e, t, r) {
            var n = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: r
            }
              , i = d.bind(n);
            return i.listener = r,
            n.wrapFn = i,
            i
        }
        function p(e, t, r) {
            var n = e._events;
            if (void 0 === n)
                return [];
            var i = n[t];
            return void 0 === i ? [] : "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function(e) {
                for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                    t[r] = e[r].listener || e[r];
                return t
            }(i) : b(i, i.length)
        }
        function g(e) {
            var t = this._events;
            if (void 0 !== t) {
                var r = t[e];
                if ("function" == typeof r)
                    return 1;
                if (void 0 !== r)
                    return r.length
            }
            return 0
        }
        function b(e, t) {
            for (var r = new Array(t), n = 0; n < t; ++n)
                r[n] = e[n];
            return r
        }
        function y(e, t, r, n) {
            if ("function" == typeof e.on)
                n.once ? e.once(t, r) : e.on(t, r);
            else {
                if ("function" != typeof e.addEventListener)
                    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
                e.addEventListener(t, function i(o) {
                    n.once && e.removeEventListener(t, i),
                    r(o)
                })
            }
        }
        Object.defineProperty(a, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return u
            },
            set: function(e) {
                if ("number" != typeof e || e < 0 || s(e))
                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                u = e
            }
        }),
        a.init = function() {
            void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null),
            this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0
        }
        ,
        a.prototype.setMaxListeners = function(e) {
            if ("number" != typeof e || e < 0 || s(e))
                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
            return this._maxListeners = e,
            this
        }
        ,
        a.prototype.getMaxListeners = function() {
            return l(this)
        }
        ,
        a.prototype.emit = function(e) {
            for (var t = [], r = 1; r < arguments.length; r++)
                t.push(arguments[r]);
            var n = "error" === e
              , i = this._events;
            if (void 0 !== i)
                n = n && void 0 === i.error;
            else if (!n)
                return !1;
            if (n) {
                var s;
                if (t.length > 0 && (s = t[0]),
                s instanceof Error)
                    throw s;
                var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                throw a.context = s,
                a
            }
            var u = i[e];
            if (void 0 === u)
                return !1;
            if ("function" == typeof u)
                o(u, this, t);
            else {
                var c = u.length
                  , l = b(u, c);
                for (r = 0; r < c; ++r)
                    o(l[r], this, t)
            }
            return !0
        }
        ,
        a.prototype.addListener = function(e, t) {
            return f(this, e, t, !1)
        }
        ,
        a.prototype.on = a.prototype.addListener,
        a.prototype.prependListener = function(e, t) {
            return f(this, e, t, !0)
        }
        ,
        a.prototype.once = function(e, t) {
            return c(t),
            this.on(e, h(this, e, t)),
            this
        }
        ,
        a.prototype.prependOnceListener = function(e, t) {
            return c(t),
            this.prependListener(e, h(this, e, t)),
            this
        }
        ,
        a.prototype.removeListener = function(e, t) {
            var r, n, i, o, s;
            if (c(t),
            void 0 === (n = this._events))
                return this;
            if (void 0 === (r = n[e]))
                return this;
            if (r === t || r.listener === t)
                0 === --this._eventsCount ? this._events = Object.create(null) : (delete n[e],
                n.removeListener && this.emit("removeListener", e, r.listener || t));
            else if ("function" != typeof r) {
                for (i = -1,
                o = r.length - 1; o >= 0; o--)
                    if (r[o] === t || r[o].listener === t) {
                        s = r[o].listener,
                        i = o;
                        break
                    }
                if (i < 0)
                    return this;
                0 === i ? r.shift() : function(e, t) {
                    for (; t + 1 < e.length; t++)
                        e[t] = e[t + 1];
                    e.pop()
                }(r, i),
                1 === r.length && (n[e] = r[0]),
                void 0 !== n.removeListener && this.emit("removeListener", e, s || t)
            }
            return this
        }
        ,
        a.prototype.off = a.prototype.removeListener,
        a.prototype.removeAllListeners = function(e) {
            var t, r, n;
            if (void 0 === (r = this._events))
                return this;
            if (void 0 === r.removeListener)
                return 0 === arguments.length ? (this._events = Object.create(null),
                this._eventsCount = 0) : void 0 !== r[e] && (0 === --this._eventsCount ? this._events = Object.create(null) : delete r[e]),
                this;
            if (0 === arguments.length) {
                var i, o = Object.keys(r);
                for (n = 0; n < o.length; ++n)
                    "removeListener" !== (i = o[n]) && this.removeAllListeners(i);
                return this.removeAllListeners("removeListener"),
                this._events = Object.create(null),
                this._eventsCount = 0,
                this
            }
            if ("function" == typeof (t = r[e]))
                this.removeListener(e, t);
            else if (void 0 !== t)
                for (n = t.length - 1; n >= 0; n--)
                    this.removeListener(e, t[n]);
            return this
        }
        ,
        a.prototype.listeners = function(e) {
            return p(this, e, !0)
        }
        ,
        a.prototype.rawListeners = function(e) {
            return p(this, e, !1)
        }
        ,
        a.listenerCount = function(e, t) {
            return "function" == typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t)
        }
        ,
        a.prototype.listenerCount = g,
        a.prototype.eventNames = function() {
            return this._eventsCount > 0 ? n(this._events) : []
        }
    }
    , {}],
    182: [function(e, t, r) {
        "use strict";
        t.exports = function e(t, r) {
            if (t === r)
                return !0;
            if (t && r && "object" == typeof t && "object" == typeof r) {
                if (t.constructor !== r.constructor)
                    return !1;
                var n, i, o;
                if (Array.isArray(t)) {
                    if ((n = t.length) != r.length)
                        return !1;
                    for (i = n; 0 !== i--; )
                        if (!e(t[i], r[i]))
                            return !1;
                    return !0
                }
                if (t.constructor === RegExp)
                    return t.source === r.source && t.flags === r.flags;
                if (t.valueOf !== Object.prototype.valueOf)
                    return t.valueOf() === r.valueOf();
                if (t.toString !== Object.prototype.toString)
                    return t.toString() === r.toString();
                if ((n = (o = Object.keys(t)).length) !== Object.keys(r).length)
                    return !1;
                for (i = n; 0 !== i--; )
                    if (!Object.prototype.hasOwnProperty.call(r, o[i]))
                        return !1;
                for (i = n; 0 !== i--; ) {
                    var s = o[i];
                    if (!e(t[s], r[s]))
                        return !1
                }
                return !0
            }
            return t != t && r != r
        }
    }
    , {}],
    183: [function(e, t, r) {
        t.exports = u,
        u.default = u,
        u.stable = d,
        u.stableStringify = d;
        var n = "[...]"
          , i = "[Circular]"
          , o = []
          , s = [];
        function a() {
            return {
                depthLimit: Number.MAX_SAFE_INTEGER,
                edgesLimit: Number.MAX_SAFE_INTEGER
            }
        }
        function u(e, t, r, n) {
            var i;
            void 0 === n && (n = a()),
            l(e, "", 0, [], void 0, 0, n);
            try {
                i = 0 === s.length ? JSON.stringify(e, t, r) : JSON.stringify(e, p(t), r)
            } catch (e) {
                return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")
            } finally {
                for (; 0 !== o.length; ) {
                    var u = o.pop();
                    4 === u.length ? Object.defineProperty(u[0], u[1], u[3]) : u[0][u[1]] = u[2]
                }
            }
            return i
        }
        function c(e, t, r, n) {
            var i = Object.getOwnPropertyDescriptor(n, r);
            void 0 !== i.get ? i.configurable ? (Object.defineProperty(n, r, {
                value: e
            }),
            o.push([n, r, t, i])) : s.push([t, r, e]) : (n[r] = e,
            o.push([n, r, t]))
        }
        function l(e, t, r, o, s, a, u) {
            var f;
            if (a += 1,
            "object" == typeof e && null !== e) {
                for (f = 0; f < o.length; f++)
                    if (o[f] === e)
                        return void c(i, e, t, s);
                if (void 0 !== u.depthLimit && a > u.depthLimit)
                    return void c(n, e, t, s);
                if (void 0 !== u.edgesLimit && r + 1 > u.edgesLimit)
                    return void c(n, e, t, s);
                if (o.push(e),
                Array.isArray(e))
                    for (f = 0; f < e.length; f++)
                        l(e[f], f, f, o, e, a, u);
                else {
                    var d = Object.keys(e);
                    for (f = 0; f < d.length; f++) {
                        var h = d[f];
                        l(e[h], h, f, o, e, a, u)
                    }
                }
                o.pop()
            }
        }
