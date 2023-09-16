window.__adroll || (function() {
    function g() {
        this.pxlstart = (new Date).getTime();
        this.version = "1.0";
        this.exp = 8760;
        this.eexp = 720;
        this.pv = 1E11 * Math.random();
        this.__adc = "__ar_v4";
        this._nad = 0;
        this._lce = null;
        this._loaded = this._broken = !1;
        this._url = 2E3;
        this._kwl = 300;
        this._r = {};
        this.cm_urls = [];
        this._logs = [];
        this.consent_networks = {
            facebook: "f",
            linkedin: "linkedin"
        };
        this.pixelstart = this.session_time = 0;
        this._init_idb();
        this._init_floc_trial();
        for (var a = Array(4), b = 0; b < a.length; b++) a[b] = (Math.round(1E11 * Math.random()).toString(16) + Array(9).join("0")).substr(0,
            8);
        this._set_global("adroll_sid", a.join(""));
        this._has_global("adroll_adv_id") && (this.load_experiment_js(), this.init_pixchk(), this._load_precheck_js(), this.trigger_gtm_consent_event(), this.load_pixel_assistant(), ["adroll_adv_id", "adroll_pix_id"].forEach(function(a) {
            window.hasOwnProperty(a) && ("string" === typeof window[a] || window[a] instanceof String) && (window[a] = window[a].replace(/[^A-Z0-9_]/g, ""))
        }));
        window.adroll = window.adroll || {};
        window.adroll.identify_email = this.identify_email.bind(this);
        a = "ABCDEFG".split("");
        this._has_global("adroll_adv_id") && 0 <= a.indexOf(window.adroll_adv_id.substr(0, 1)) && this._pixel_timing(!0, !0, null)
    };
    g.prototype.call_consent_check = function() {
        function a() {
            var a = ["_s=" + b.get_adroll_sid(), "_b=2"];
            "#_ar_gdpr=" === (window.location.hash || "").substr(0, 10) && a.push("dbg=" + unescape((window.location.hash || "").substr(10)));
            window.adroll_fpconsent && a.push("_afc=1");
            a = b._srv("/consent/check/" + b._global("adroll_adv_id") + "?" + a.join("&"));
            b.add_script_element(a)
        }
        var b = this;
        this._is_defined(window.adroll_fpconsent) ? a() : window.setTimeout(a, 100)
    };
    g.prototype.call_consent_write = function(a) {
        window.adroll_fpconsent && (a += "&_afc=1");
        this.add_script_element(this._srv("/consent/write?" + a))
    };
    g.prototype._consent_cookie = function(a) {
        return a ? (this.set("__adroll_consent", a, 8760), a) : this.get("__adroll_consent")
    };
    g.prototype.load_consent_banner = function() {
        window.document.getElementById("__adroll_consent_banner_el") || this.add_script_element("s.adroll.com/j/consent_tcfv2.js", {
            id: "__adroll_consent_banner_el"
        })
    };
    g.prototype.get_consent_params = function() {
        return this.get("__adroll_consent_params")
    };
    g.prototype.set_consent_params = function(a) {
        this.set("__adroll_consent_params", a)
    };
    g.prototype.clear_consent_params = function() {
        this.del("__adroll_consent_params")
    };
    g.prototype.handle_null_consent = function(a) {
        a || (a = this.get_consent_params()) && this.call_consent_write(a)
    };
    g.prototype.save_first_party_consent = function(a) {
        var b = (a || {}).euconsent;
        if ((a = (a || {}).arconsent) || b) this._consent_cookie(a), window.localStorage.setItem("__adroll_consent_data", this.jsonStringify({
            arconsent: a,
            euconsent: b
        }))
    };
    g.prototype.get_first_party_consent = function() {
        if (this._has_global("__adroll_consent_data")) return this._global("__adroll_consent_data");
        var a = null;
        try {
            if (window.localStorage) {
                var b = window.localStorage.getItem("__adroll_consent_data");
                b && (a = this.jsonParse(b))
            }
        } catch (c) {}
        if (b = this._consent_cookie()) a = a || {}, a.arconsent = b;
        this._set_global("__adroll_consent_data", a);
        return a
    };
    g.prototype.trigger_gtm_consent_event = function(a) {
        function b(a, b, c) {
            b = isNaN(Number(b)) ? "c:" + b : "tcf:" + b;
            !0 !== c && !1 !== c && (c = "unknown");
            a[c][b] = 1
        }

        function c(a) {
            return "," + r.object_keys(a).join(",") + ","
        }
        if (!window.dataLayer || "function" === typeof window.dataLayer.push)
            if (window.dataLayer = window.dataLayer || [], a) {
                var d = this._global("__adroll_consent"),
                    e = this._global("__adroll_consent_data") || {},
                    h = e.eucookie || {},
                    f = h.max_vendor_id || e.max_vendor_id || 0,
                    p = e.networks || [],
                    m = h.purposes_allowed || 0,
                    l = {
                        "true": {},
                        "false": {},
                        unknown: {}
                    },
                    k = {
                        "true": {},
                        "false": {},
                        unknown: {}
                    },
                    n = {
                        "true": {},
                        "false": {}
                    },
                    r = this,
                    q;
                if ("boolean" === typeof d) {
                    for (q = 0; q < p.length; q++) b(l, p[q], d);
                    for (q = 1; q < f; q++) b(l, q, d), b(k, q, d);
                    for (q = 1; 25 > q; q++) n[d][q] = 1
                } else {
                    for (q in d) d.hasOwnProperty(q) && b(l, q, d[q]);
                    for (q = 1; q <= f; q++) b(k, q, (h.vendor_consent || {})[q]);
                    for (q = 0; 24 > q; q++) n[!!(m & 1 << q)][q + 1] = 1
                }
                window.dataLayer.push({
                    event: a,
                    nextrollVendorsConsent: c(l["true"]),
                    nextrollVendorsConsentUnknown: c(l.unknown),
                    nextrollVendorsConsentDenied: c(l["false"]),
                    nextrollVendorsRawConsent: c(k["true"]),
                    nextrollVendorsRawConsentUnknown: c(k.unknown),
                    nextrollVendorsRawConsentDenied: c(k["false"]),
                    nextrollPurposesConsent: c(n["true"]),
                    nextrollPurposesConsentUnknown: null,
                    nextrollPurposesConsentDenied: c(n["false"]),
                    nextrollgdpr: this._global("__adroll_consent_is_gdpr"),
                    nextrolliab: e.euconsent
                })
            } else window.dataLayer.push({
                event: "nextroll-ready"
            })
    };
    g.prototype.set_consent = function(a, b, c, d, e, h) {
        if (0 === arguments.length) {
            if (!this._has_global("__adroll_consent")) return;
            a = this._global("__adroll_consent")
        }
        var f = "nextroll-consent";
        this._has_global("__adroll_consent") && (f = "nextroll-consent-modified");
        this._set_global("__adroll_consent", a);
        this._set_global("__adroll_consent_is_gdpr", c);
        this._set_global("__adroll_consent_data", h || {});
        d && this._set_global("__adroll_consent_user_country", d);
        e && this._set_global("__adroll_consent_adv_country", e);
        if (h) {
            var p =
                h.gppconsent || this.gpp_from_tcfstr(h.euconsent);
            p && (p = this.gpp_decode_string(p), this._set_global("__adroll_consent_gpp", p))
        }
        var p = ["5L5IV3X4ZNCUZFMLN5KKOD", "VMYZUWPHFRH37EAOEU2EQS", "3QOM4TKN4RD7TO3HCPYRKV"],
            m = this._global("adroll_adv_id");
        "CA" === d && 0 <= p.indexOf(m) && (c = !0);
        c && ("adroll" === (h || {}).banner || b) && this.load_consent_banner();
        if (this._install_cmp) this._install_cmp();
        else {
            var l = this;
            window.setTimeout(function() {
                l._install_cmp && l._install_cmp()
            }, 1E3)
        }
        null === a ? this.handle_null_consent(b) : (this.save_first_party_consent(h),
            b || this.clear_consent_params(), this._trigger_consent_event && this._trigger_consent_event(), !1 !== a && !1 !== (a || {}).a && (this._log_floc_cohort(), this._sync_fpid(), this.trigger_gtm_consent_event(f), this._log_multiple_ids(), this.call_next_tpc()))
    };
    g.prototype._load_precheck_js = function() {
        this.add_script_element("https://s.adroll.com/j/pre/" + window.adroll_adv_id + "/" + window.adroll_pix_id + "/fpconsent.js");
        this.add_script_element("https://s.adroll.com/j/pre/" + window.adroll_adv_id + "/" + window.adroll_pix_id + "/index.js")
    };
    g.prototype.cookieEnabled = function(a) {
        if (this._global("adroll_ext_network") || this._global("adroll_optout") || this._broken) return !1;
        if (2 <= this._nad || a) return this._lce;
        this.set("_te_", "1");
        return "1" === this.get("_te_") ? (this.del("_te_"), 0 < this._nad && !this.get(this.__adc) ? this._lce = !1 : this._lce = !0) : this._lce = !1
    };
    g.prototype.get = function(a) {
        var b = window.document.cookie;
        if (null === b) return this._broken = !0, null;
        var c;
        0 > b.indexOf(a + "=") ? b = null : (a = b.indexOf(a + "=") + a.length + 1, c = b.indexOf(";", a), -1 === c && (c = b.length), b = b.substring(a, c), b = "" === b ? null : window.unescape(b));
        return b
    };
    g.prototype.set = function(a, b, c) {
        var d;
        c && "number" === typeof c ? (d = new Date, d.setTime(d.getTime() + 36E5 * c), c = d.toGMTString(), c = "; expires=" + c) : c = "";
        d = "; domain=" + window.location.hostname;
        b = window.escape(b);
        window.document.cookie = a + "=" + b + c + "; path=/" + d + "; samesite=lax"
    };
    g.prototype.del = function(a) {
        this.set(a, "", -8760)
    };
    g.prototype.check_cookie = function(a, b) {
        if (this._global("adroll_ext_network") || this._global("adroll_optout")) return "";
        for (var c = a.split("|"), d = c.length - 1; 0 <= d; d--)
            if (c[d]) {
                var e = c[d].split(":");
                b === e[0] && (e[2] = "" + (parseInt(e[2]) + 1), c[d] = e.join(":"))
            }
        return c.join("|")
    };
    g.prototype.handle = function(a) {
        var b = this.get(this.__adc) || ""; - 1 !== b.indexOf(a) ? this.set(this.__adc, this.check_cookie(b, a), this.exp) : (a = [b, [a, this.get_date(this.eexp), "1"].join(":")].join("|"), this.set(this.__adc, a, this.exp))
    };
    g.prototype.expire_old = function() {
        if (!this._global("adroll_ext_network") && !this._global("adroll_optout")) {
            for (var a = this.get_date(!1), b = this.get(this.__adc), b = b ? b.split("|") : [""], c = [], d = b.length - 1; 0 <= d; d--) b[d] && b[d].split(":")[1] > a && c.push(b[d]);
            this.set(this.__adc, c.join("|"), this.exp)
        }
    };
    g.prototype.get_date = function(a) {
        var b = new Date;
        a && b.setTime(b.getTime() + 36E5 * a);
        a = "" + b.getUTCFullYear();
        var c = b.getUTCMonth(),
            c = 10 <= c ? c : "0" + c,
            b = b.getUTCDate();
        return [a, c, 10 <= b ? b : "0" + b].join("")
    };
    g.prototype.consent_allowed = function(a) {
        var b = this._global("__adroll_consent");
        return "object" === typeof b ? b[a] : b
    };
    g.prototype.generate_link = function() {
        return ""
    };
    g.prototype.view = function(a) {
        var b = new window.Image;
        b.src = this._srv("/view/" + a);
        b.setAttribute("width", "1");
        b.setAttribute("height", "1");
        b.setAttribute("border", "0");
        b.setAttribute("alt", "");
        this._head().appendChild(b)
    };
    g.prototype.set_cookie = function() {};
    g.prototype.reset = function() {
        this._set_global("adroll_c_id", null);
        this._set_global("adroll_url_macro", "");
        this._set_global("adroll_c_macro", "");
        this._set_global("adroll_cpm_macro", "");
        this._set_global("adroll_ext_network", null);
        this._set_global("adroll_subnetwork", null);
        this._set_global("adroll_ad_payload", null);
        this._set_global("adroll_win_notif", null)
    };
    g.prototype.set_pixel_cookie = function(a, b, c) {
        this._global("adroll_optout") || (this.handle(a), this.handle(b), this.handle(c), this.pixel_loaded())
    };
    g.prototype.add_pixel_load_callback = function(a) {
        this._loaded ? a() : this._ensure_global("adroll_callbacks", []).push(a)
    };
    g.prototype.pixel_loaded = function() {
        this._loaded = !0;
        for (var a = this._ensure_global("adroll_callbacks", []), b = 0; b < a.length; b++) a[b].called || (a[b](), a[b].called = !0)
    };
    g.prototype.addLoadEvent = function(a) {
        if (this._has_global("__adroll_loaded") && this._global("__adroll_loaded") || this._has_global("_adroll_ie") && this._global("_adroll_ie") || /msie/i.test(window.navigator.userAgent)) return a();
        if (/WebKit/i.test(window.navigator.userAgent)) {
            var b = window.setInterval(function() {
                /loaded|complete/.test(window.document.readyState) && window.clearInterval(b);
                a()
            }, 10);
            return null
        }
        var c = window.onload;
        window.onload = function() {
            a();
            c && c()
        }
    };
    g.prototype._head = function() {
        return (window.document.getElementsByTagName("head") || [null])[0] || (window.document.getElementsByTagName("body") || [null])[0] || window.document.getElementsByTagName("script")[0].parentNode
    };
    g.prototype._body = function() {
        return window.document.body || (window.document.getElementsByTagName("body") || [null])[0]
    };
    g.prototype.listenToEvent = function(a, b, c) {
        a.addEventListener ? a.addEventListener(b, this.wrapException(c), !1) : a.attachEvent("on" + b, this.wrapException(c))
    };
    g.prototype.matchesSelector = function(a, b) {
        var c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
        return c && c.call(a, b)
    };
    g.prototype.runCookieMatch = function() {
        var a = this.cm_urls.length;
        if (!(0 >= a))
            for (var b = 0; b <= a; b++) this.popAndSend()
    };
    g.prototype.popAndSend = function() {
        if (!(0 >= this.cm_urls.length)) {
            var a = this.cm_urls.shift(),
                b = new Image;
            b.src = a;
            b.setAttribute("alt", "")
        }
    };
    g.prototype.add_param_to_url = function(a, b) {
        var c = a.indexOf("?"),
            d = "",
            e = ""; - 1 !== c ? (d = a.slice(0, c + 1), e = "&" + a.slice(c + 1)) : (c = a.indexOf("#", -1 === c ? 0 : c), -1 === c ? d = a + "?" : (d = a.slice(0, c) + "?", e = a.slice(c)));
        return d + b + e
    };
    g.prototype._init_idb = function() {
        function a() {
            return b._adroll_idb.transaction("adroll", "readwrite").objectStore("adroll")
        }
        var b = this,
            c = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (c && !this._adroll_idb) {
            this._adroll_idb = !0;
            var d = c.open("adroll", 1);
            d.onupgradeneeded = function() {
                b._adroll_idb = d.result;
                b._adroll_idb.createObjectStore("adroll", {
                    keyPath: "id"
                });
                b._adroll_idb.getStore = a
            };
            d.onsuccess = function() {
                b._adroll_idb = d.result;
                b._adroll_idb.getStore = a
            };
            d.onblocked =
                function() {
                    b._adroll_idb = null
                }
        }
    };
    g.prototype._get_idb_row = function(a, b, c) {
        var d = this;
        if (this._adroll_idb)
            if (!0 === this._adroll_idb) 5 > c ? window.setTimeout(this._get_idb_row.call(this, a, b, (c || 1) + 1), 100) : b && b.call(d, null);
            else {
                var e = b,
                    h = window.setTimeout(function() {
                        e && e.call(d, null)
                    }, 1E3);
                this._adroll_idb.getStore().get(a).onsuccess = function() {
                    e = null;
                    window.clearTimeout(h);
                    b && b.call(d, this.result)
                }
            }
        else b.call(this, null)
    };
    g.prototype._set_idb_row = function(a, b, c) {
        if ("object" !== typeof b) throw Error("Row must be object");
        this._adroll_idb && (!0 === this._adroll_idb ? 5 > c && window.setTimeout(this._set_idb_row.call(this, a, b, (c || 1) + 1), 100) : (b.id = a, this._adroll_idb.getStore().put(b)))
    };
    g.prototype.closest = function(a, b) {
        if (a.closest) return a.closest(b);
        if (!b) return null;
        for (var c = a; null !== c; c = c.parentNode) {
            var d = c.matches || c.webkitMatchesSelector || c.mozMatchesSelector || c.msMatchesSelector || c.oMatchesSelector;
            if (d && d.call(c, b)) return c
        }
        return null
    };
    g.prototype.is_under_experiment = function(a) {
        return window.adroll_exp_list && 0 <= window.adroll_exp_list.indexOf(a)
    };
    g.prototype.load_experiment_js = function() {
        var a = window.document.getElementById("adroll_scr_exp");
        return a ? a : this.add_script_element("https://s.adroll.com/j/exp/" + window.adroll_adv_id + "/index.js", {
            id: "adroll_scr_exp",
            onError: "window.adroll_exp_list = [];"
        })
    };
    g.prototype.is_experiment_js_loaded = function() {
        return !!window.adroll_exp_list
    };
    g.prototype.is_test_advertisable = function() {
        return "ADV_EID" === this._global("adroll_adv_id")
    };
    g.prototype.if_under_experiment_js = function(a, b, c, d) {
        var e = this;
        this.load_experiment_js();
        this.on_experiment_loaded(function() {
            e.is_under_experiment(a) ? "function" === typeof b && b.call(e) : "function" === typeof c && c.call(e)
        }, d)
    };
    g.prototype.on_experiment_loaded = function(a, b) {
        function c() {
            if (e.is_experiment_js_loaded() || e.is_test_advertisable()) d = !0;
            d ? a.call(e) : window.setTimeout(c, 10)
        }
        var d = !1,
            e = this;
        window.setTimeout(function() {
            d = !0
        }, b || 500);
        c()
    };
    g.prototype.external_data_to_qs = function(a) {
        var b = [],
            c = this.get_external_data();
        if (!c) return null;
        for (var d in c) c.hasOwnProperty(d) && this._is_defined(c[d]) && null !== c[d] && b.push(this.normalize_var(window.escape("" + d) + "=" + window.escape("" + c[d]), !1));
        b = b.join("&");
        a && (b = window.escape(b));
        return "adroll_external_data=" + b
    };
    g.prototype.replace_external_data = function(a) {
        var b = this.get_external_data(),
            c = this.get_conversion_value(),
            d = null,
            e;
        if (b)
            for (e in b) b.hasOwnProperty(e) && (d = new RegExp("\\[" + e + "\\]", "gi"), a = a.replace(d, b[e]), d = new RegExp("\\[" + e + "_ESC\\]", "gi"), a = a.replace(d, window.escape(b[e])));
        if (c)
            for (e in c) c.hasOwnProperty(e) && (d = new RegExp("\\[" + e + "\\]", "gi"), a = a.replace(d, c[e]), d = new RegExp("\\[" + e + "_ESC\\]", "gi"), a = a.replace(d, window.escape(c[e])));
        return a
    };
    g.prototype.get_external_data = function() {
        if (this._has_global("adroll_custom_data")) {
            var a = this._global("adroll_custom_data"),
                b = {},
                c;
            for (c in a) a.hasOwnProperty(c) && "undefined" !== a[c] && (b[c.toLowerCase()] = a[c]);
            return b
        }
        return null
    };
    g.prototype.get_conversion_value = function() {
        var a = this._ensure_global("adroll_currency", null),
            b = this._ensure_global("adroll_conversion_value", null),
            c = this._ensure_global("adroll_conversion_value_in_dollars", null);
        return b ? {
            conv_value: "" + b,
            currency: a
        } : c ? {
            conv_value: "" + parseInt(100 * c),
            currency: "USC"
        } : null
    };
    g.prototype.fibonacci = function() {
        return [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976, 7778742049, 12586269025, 20365011074, 32951280099, 53316291173, 86267571272, 139583862445, 225851433717, 365435296162, 591286729879, 956722026041, 1548008755920, 2504730781961,
            4052739537881, 6557470319842, 0x9a661ca20bb, 0xf9d297a859d, 27777890035288, 44945570212853, 72723460248141, 0x6b04f4c2fe42, 0xad2934c6d08f, 308061521170129, 498454011879264, 806515533049393, 0x4a2dce62b0d91, 0x780626e057bc2, 0xc233f54308953, 5527939700884757, 8944394323791464
        ]
    };
    g.prototype.tofib = function(a) {
        var b = this.fibonacci();
        if (1 > a) throw Error("Must be num >= 1");
        for (var c = 1; b[c] <= a;) c += 1;
        --c;
        for (var d = "1"; 0 < c;) b[c] > a ? d = "0" + d : (d = "1" + d, a -= b[c]), --c;
        return d
    };
    g.prototype.fromfib = function(a) {
        for (var b = this.fibonacci(), c = 1, d = 0, e, h, f = a.split(""); 0 < f.length;) {
            e = f.shift();
            if ("1" === e) {
                if ("1" === h) return d;
                d += b[c];
                c += 1
            } else if ("0" === e) c += 1;
            else throw Error("Invalid char in bstr " + a);
            h = e
        }
    };
    g.prototype._form_attach = function() {
        var a = this._form_els_allowed();
        if (a) {
            var b = [],
                c;
            for (c in a) a.hasOwnProperty(c) && "submit" === a[c].type && b.push(c);
            this._adroll_submit_sels = b.join(",");
            a = window.document.querySelectorAll("input,select,textarea");
            for (b = 0; b < a.length; b++) this._form_data(a[b]);
            a = this._body();
            this.listenToEvent(a, "blur", this._form_change.bind(this));
            this.listenToEvent(a, "change", this._form_change.bind(this));
            this.listenToEvent(a, "focusout", this._form_change.bind(this));
            this.listenToEvent(a,
                "click", this._form_click.bind(this));
            this.listenToEvent(a, "submit", this._form_save.bind(this))
        }
    };
    g.prototype._form_els_allowed = function() {
        return 0 === this.object_keys(this._ensure_global("adroll_form_fields", {})).length ? null : this._global("adroll_form_fields")
    };
    g.prototype._form_el_allowed = function(a) {
        if (!a || !a.type || !this._form_els_allowed()) return a._adroll_el_ok = !1;
        if (this._is_defined(a._adroll_el_ok)) return a._adroll_el_ok;
        var b = a.type.toLowerCase(),
            c = (a.name || "").toLowerCase(),
            d = this._form_els_allowed(),
            e = ((a.form ? this._desc_el(a.form) : "") + " " + this._desc_el(a)).trim();
        if ("password" === b || "file" === b || c.match(/cc_number|credit_card|card_number|cv[cv]_code/)) return a._adroll_el_ok = !1;
        if (this._is_defined(d.length)) {
            if (0 <= d.indexOf(e)) return a._adroll_el_ok = [!0];
            for (e = 0; e < d.length; e++)
                if (this.closest(a, d[e])) return a._adroll_el_ok = [!0]
        } else {
            if (d[e]) return d[e + ":is(*)"] ? a._adroll_el_ok = [d[e], d[e + ":is(*)"]] : a._adroll_el_ok = [d[e]];
            a._adroll_el_ok = !1;
            for (e in d) d.hasOwnProperty(e) && (b = this.closest(a, e.replace(/\s*(:not\(:is\(.*?\)\)|:is\(.*?\))/, ""))) && b === a && (a._adroll_el_ok ? a._adroll_el_ok.push(d[e]) : a._adroll_el_ok = [d[e]])
        }
        return a._adroll_el_ok
    };
    g.prototype._desc_el = function(a) {
        if (!a) return "";
        var b = a.tagName.toLowerCase();
        return b = a.id ? b + "#" + a.id : a.getAttribute("name") ? b + '[name="' + a.getAttribute("name") + '"]' : a.className ? b + "." + a.className.replace(/ /g, ".") : b + ":not(:is([id],[class],[name]))"
    };
    g.prototype._find_el = function(a, b) {
        var c;
        b = b || window.document;
        try {
            c = b.querySelector(a)
        } catch (e) {
            c = null
        }
        if (c) return c;
        try {
            c = this.matchesSelector(b, a) && b
        } catch (e) {
            c = null
        }
        if (c) return c;
        var d = a.match(/(\s*):is\(([^\)]*)\)/);
        d && (c = d[1] ? b.querySelector(d[2]) : this.matchesSelector(b, d[2]) && b);
        return c || null
    };
    g.prototype._form_data = function(a) {
        var b = "form" === a.tagName.toLowerCase(),
            c = this._desc_el(b ? a : a.form);
        this._is_defined(this._adroll_form_data) || (this._adroll_form_data = {});
        this._is_defined(this._adroll_form_data[c]) || (this._adroll_form_data[c] = {
            data: {},
            kind: {},
            contact: {}
        });
        if (!b) {
            var b = this._form_el_allowed(a),
                d = this._desc_el(a);
            if (!b) return delete this._adroll_form_data[c].contact[d], null;
            for (var e = 0; e < b.length; e++) {
                var h = b[e];
                if (":contact" === h.type) ":is(*)" === h.sel.substr(-6) ? this._adroll_form_data[c].contact[d] =
                    h.sel : this._find_el(h.sel, a) ? this._adroll_form_data[c].contact[d] = h.sel : delete this._adroll_form_data[c].contact[d];
                else {
                    var f = a.value,
                        p = h.auth || 0;
                    this._is_defined(a.options) && this._is_defined(a.selectedIndex) ? f = (a.options[a.selectedIndex] || {}).value : "button" === a.tagName.toLowerCase() && (f = f || a.textContent);
                    f ? (this._adroll_form_data[c].data[d] = {
                        val: f,
                        auth: p
                    }, h.type && (this._adroll_form_data[c].kind[h.type] = {
                        val: f,
                        auth: p
                    })) : (delete this._adroll_form_data[c].data[d], h.type && delete this._adroll_form_data[c].kind[h.type])
                }
            }
        }
        a = {
            contact: this._adroll_form_data[c].contact,
            data: {},
            kind: this._adroll_form_data[c].kind
        };
        a.data[c] = this._adroll_form_data[c].data;
        return 0 === this.object_keys(a.data[c]).length ? null : a
    };
    g.prototype._form_change = function(a) {
        a = a.target;
        this._form_el_allowed(a) && this._form_data(a)
    };
    g.prototype._form_click = function(a) {
        a = a.target;
        this.closest(a, this._adroll_submit_sels) && (a = this.closest(a, "form")) && this._form_save({
            target: a
        })
    };
    g.prototype._form_save = function(a) {
        var b = this._form_data(a.target);
        b && b.contact && (a = this.object_keys(b.contact), 0 < a.length ? b.contact = a : delete b.contact);
        a = this._redact_pci(this.jsonStringify(b));
        b && !a.match(/^{"data":{"contact":\[[^\]]*\],"[^"]+":{}},"kind":{}}$/) && (b.kind.email && b.kind.email.auth && this.identify_email(b.kind.email.val), b = this._ensure_global("adroll_adv_id", ""), b = this._srv("/form/" + b + "?pv=" + encodeURIComponent(this.pv)), this._xhr({
            body: a,
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            url: b,
            withCredentials: !0
        }))
    };
    g.prototype._redact_pci = function(a) {
        a = a.split(/([\d\-\.\ ]+)/);
        for (var b = 0; b < a.length; b++) this.is_luhn(a[b]) && (a[b] = " <PCI_REDACTED> ");
        return a.join("")
    };
    g.prototype._xhr = function(a) {
        a = a || {};
        var b = new XMLHttpRequest;
        b.open(a.method || "GET", a.url, !1 !== a.async);
        for (var c in a.headers || {}) a.headers.hasOwnProperty(c) && b.setRequestHeader(c, a.headers[c]);
        a.withCredentials && (b.withCredentials = a.withCredentials);
        b.send(a.body || null)
    };
    g.prototype._form_tp_change = function(a) {
        a = a.target;
        this._form_el_tp_allowed(a) && this._form_tp_data(a)
    };
    g.prototype._get_form_tp_obj = function() {
        return this._adroll_tp_forms.map(this._get_tpform_sel)
    };
    g.prototype._form_tp_click = function(a) {
        a = a.target;
        var b = this.closest(a, "form"),
            c = b.querySelector("[type=submit]");
        a === c && b && this._form_tp_save({
            target: b
        })
    };
    g.prototype._set_tp_auth = function(a, b) {
        function c(a, b) {
            for (var h in a)
                if (a.hasOwnProperty(h)) {
                    var f = a[h];
                    "object" === typeof f && null !== f ? c(f, b) : "auth" === h && (a[h] = b)
                }
        }
        return c(a, b)
    };
    g.prototype._form_tp_is_legitimate_interest = function(a, b) {
        var c = !1;
        if (b.context) {
            var d = a.querySelector(b.context);
            d && "undefined" !== typeof d.value && (c = (c = (c = JSON.parse(d.value)) && c.legalConsentOptions ? JSON.parse(c.legalConsentOptions) : null) && !0 === c.isLegitimateInterest || !1)
        }
        return c
    };
    g.prototype._form_tp_save = function(a) {
        a = a.target;
        var b = this._form_tp_data(a);
        if (b && b.contact) {
            var c = this.object_keys(b.contact);
            0 < c.length ? b.contact = c : delete b.contact
        }
        for (var c = this._get_form_tp_obj(), d = 0; d < c.length; d++) {
            var e = c[d];
            if (this.matchesSelector(a, e.form) && null !== b) {
                var h = this._form_tp_provider_allowed()[e.name].has_marketing_consent_comm,
                    f = this._form_tp_is_legitimate_interest(a, e),
                    p = (((b || {}).kind || {}).gdpr_consent || {}).val;
                !0 === h || "true" === h || f || p ? this._set_tp_auth(b, 1) : delete b.contact;
                h = this._redact_pci(this.jsonStringify(b));
                if (!b || h.match(/^{"data":{"contact":\[[^\]]*\],"[^"]+":{}},"kind":{}}$/)) break;
                b.kind.email && b.kind.email.auth && this.identify_email(b.kind.email.val);
                e = e.name;
                f = this._ensure_global("adroll_adv_id", "");
                e = this._srv("/form/" + f + "?pv=" + encodeURIComponent(this.pv) + "&fp=" + encodeURIComponent(e));
                this._xhr({
                    body: h,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    url: e,
                    withCredentials: !0
                })
            }
        }
    };
    g.prototype._form_tp_provider_allowed = function() {
        return 0 === this.object_keys(this._ensure_global("adroll_third_party_forms", {})).length ? null : this._global("adroll_third_party_forms")
    };
    g.prototype._get_tpform_sel = function(a) {
        var b = {
            HUBSPOT: {
                name: "HUBSPOT",
                form: ".hbspt-form form",
                iframe: ".hs-form-iframe",
                context: 'input[name="hs_context"]',
                _field_sel: function(a) {
                    return '.hs-input[name^="' + a + '"]'
                },
                fields: {
                    firstname: "first_name",
                    lastname: "last_name",
                    email: "email",
                    company: "organization",
                    jobtitle: "title",
                    phone: "phone_number",
                    address: "address_1",
                    city: "city",
                    state: "state",
                    country: "country",
                    zip: "zip_code",
                    "LEGAL_CONSENT.subscription": "gdpr_consent"
                }
            },
            MAILCHIMP: {
                name: "MAILCHIMP",
                form: "#mc-embedded-subscribe-form",
                iframe: null,
                _field_sel: function(a) {
                    return '[name^="' + a + '"]'
                },
                fields: {
                    FNAME: "first_name",
                    LNAME: "last_name",
                    EMAIL: "email",
                    PHONE: "phone_number",
                    "ADDRESS[addr1]": "address_1",
                    "ADDRESS[addr2]": "address_2",
                    "ADDRESS[city]": "city",
                    "ADDRESS[state]": "state",
                    "ADDRESS[zip]": "zip_code",
                    "ADDRESS[country]": "country",
                    gdpr: "gdpr_consent"
                }
            },
            MARKETO: {
                name: "MARKETO",
                form: ".mktoForm",
                iframe: null,
                _field_sel: function(a) {
                    return '[name="' + a + '"]'
                },
                fields: {
                    FirstName: "first_name",
                    LastName: "last_name",
                    Email: "email",
                    Company: "organization",
                    Title: "title",
                    Phone: "phone_number",
                    Address: "address_1",
                    City: "city",
                    State: "state",
                    Country: "country",
                    PostalCode: "zip_code"
                }
            }
        };
        return b.hasOwnProperty(a) ? b[a] : {
            form: "",
            _field_sel: function() {},
            fields: {}
        }
    };
    g.prototype._form_tp_data = function(a, b) {
        var c = "form" === a.tagName.toLowerCase(),
            d = this._desc_el(c ? a : a.form);
        this._adroll_form_tp_data || (this._adroll_form_tp_data = {});
        this._adroll_form_tp_data[d] || (this._adroll_form_tp_data[d] = {
            data: {},
            kind: {},
            contact: {}
        });
        if (!c) {
            var e = this._form_el_tp_allowed(a, b),
                c = this._desc_el(a);
            if (e) {
                e = a.value;
                this._is_defined(a.options) && this._is_defined(a.selectedIndex) ? e = (a.options[a.selectedIndex] || {}).value : "button" === a.tagName.toLowerCase() ? e = e || a.textContent : "input" ===
                    a.tagName.toLowerCase() && "checkbox" === a.type.toLowerCase() && (e = a.checked ? !0 : !1);
                for (var h = null, f = ["email"], p = this._get_form_tp_obj(), m = 0; m < p.length; m++) {
                    var l = p[m],
                        h = l.fields[a.name];
                    if (!h)
                        for (var k = this.object_keys(l.fields), n = 0; n < k.length; n++) {
                            var r = k[n],
                                q = a.name;
                            if (0 === r.indexOf(q.slice(0, 24)) || 0 === r.indexOf(q.slice(0, 4))) {
                                h = l.fields[k[n]];
                                break
                            }
                        }
                    e && h ? (this._adroll_form_tp_data[d].data[c] = {
                        val: e,
                        auth: null
                    }, this._adroll_form_tp_data[d].kind[h] = {
                        val: e,
                        auth: null
                    }, -1 !== f.indexOf(h) && (this._adroll_form_tp_data[d].contact[c] =
                        c)) : (-1 !== f.indexOf(h) && delete this._adroll_form_tp_data[d].contact[c], delete this._adroll_form_tp_data[d].data[c], delete this._adroll_form_tp_data[d].kind[h])
                }
            }
        }
        c = {
            contact: this._adroll_form_tp_data[d].contact,
            data: {},
            kind: this._adroll_form_tp_data[d].kind
        };
        c.data[d] = this._adroll_form_tp_data[d].data;
        return 0 === this.object_keys(c.data[d]).length ? null : c
    };
    g.prototype._form_tp_attach = function() {
        var a = this._form_tp_provider_allowed();
        if (a) {
            var b = [],
                c = [],
                d, e, h, f;
            for (f in a)
                if (a.hasOwnProperty(f)) {
                    d = this._get_tpform_sel(f);
                    null !== d.iframe && null !== d.form ? (e = window.document.querySelector(d.iframe), h = {}, e && e.contentDocument ? h = e.contentDocument : e && e.contentWindow && (h = e.contentWindow.document), h = h.body ? h.body.querySelector(d.form) : null) : null !== d.form && (h = window.document.querySelector(d.form));
                    if (null !== d.form && null !== h) {
                        d = this.object_keys(d.fields).map(d._field_sel);
                        d = h.querySelectorAll(d);
                        for (var p = 0; p < d.length; p++) c.push(this._desc_el(d[p])), this._form_tp_data(d[p], f);
                        b.push(f)
                    }
                    e && null !== e && (this.listenToEvent(e.contentWindow.document.body, "blur", this._form_tp_change.bind(this)), this.listenToEvent(e.contentWindow.document.body, "change", this._form_tp_change.bind(this)), this.listenToEvent(e.contentWindow.document.body, "focusout", this._form_tp_change.bind(this)), this.listenToEvent(e.contentWindow.document.body, "click", this._form_tp_click.bind(this)))
                }
            this._adroll_tp_forms =
                b;
            this._adroll_tp_fields = c.join(",");
            a = this._body();
            this.listenToEvent(a, "blur", this._form_tp_change.bind(this));
            this.listenToEvent(a, "change", this._form_tp_change.bind(this));
            this.listenToEvent(a, "focusout", this._form_tp_change.bind(this));
            this.listenToEvent(a, "click", this._form_tp_click.bind(this))
        }
    };
    g.prototype._form_el_tp_allowed = function(a, b) {
        if (!a || !a.type || !this._form_tp_provider_allowed()) return a._adroll_el_provider = b, a._adroll_el_ok = !1;
        var c = a.type.toLowerCase(),
            d = (a.name || "").toLowerCase(),
            e = this._desc_el(a);
        return "password" === c || "file" === c || d.match(/cc_number|credit_card|card_number|cv[cv]_code/) ? (a._adroll_el_provider = b, a._adroll_el_ok = !1) : this._is_defined(this._adroll_tp_fields) && 0 <= this._adroll_tp_fields.indexOf(e) ? (a._adroll_el_provider = b, a._adroll_el_ok = !0) : (a._adroll_el_provider =
            b, a._adroll_el_ok = !1)
    };
    g.prototype._has_global = function(a) {
        return this._is_defined(this._global(a))
    };
    g.prototype._global = function(a) {
        return window[a]
    };
    g.prototype._set_global = function(a, b) {
        window[a] = b
    };
    g.prototype._unset_global = function(a) {
        delete window[a]
    };
    g.prototype._ensure_global = function(a, b) {
        this._has_global(a) || this._set_global(a, b);
        return this._global(a)
    };
    g.prototype.GppTypes = function() {
        function a(a) {
            this.size = a;
            this.data = null
        }

        function b(a, b) {
            this.size = a;
            this.data = b || 0
        }

        function c(a) {
            this.data = a || 0
        }

        function d(a) {
            this.size = 36;
            this.data = new Date(a || 0)
        }

        function e(a) {
            this.data = !0 === a
        }

        function h(a, b) {
            this.size = a;
            this.data = b || ""
        }

        function f(a, b) {
            this.size = a;
            this.data = b || Array(a)
        }

        function p(a, b) {
            this.size = a;
            this.data = b || Array(a)
        }

        function m(a) {
            this.data = a || []
        }

        function l(a) {
            this.data = a
        }

        function k(a, b) {
            this.type = null;
            this.data = b || []
        }

        function n(a, b, c) {
            this.maxval =
                a || 0;
            this.type = b || !1;
            this.data = c || []
        }

        function r(a, b, c, d) {
            this.type = this.defaultconsent = this.maxvendorid = null;
            this.data = d || []
        }

        function q() {
            this.PurposeId = new b(6);
            this.RestrictionType = new b(2);
            this.PubRestrictionEntry = new n
        }

        function u(a) {
            this.PubRestrictions = a || [];
            this.NumPubRestrictions = new b(12, this.PubRestrictions.length)
        }

        function v(a, b) {
            this.name = a;
            this._fields = [];
            for (var c in b) b.hasOwnProperty(c) && (this._fields.push(c), this[c] = b[c])
        }
        var t = this;
        a.prototype.set = function(a) {
            this.data = a
        };
        a.prototype.valueOf =
            function() {
                return this.data instanceof Array ? this.data.concat() : this.data instanceof Date ? this.data : this.data instanceof Object ? t.extendObj({}, this.data) : "string" === typeof this.data ? "" + this.data : this.data
            };
        b.prototype = Object.create(a.prototype);
        b.prototype.toString = function() {
            return this.data || 0 === this.data ? t.inttobits(this.data, this.size) : ""
        };
        b.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = parseInt(a.substr(0, this.size), 2);
            this.set(b);
            return a.substr(this.size)
        };
        c.prototype = Object.create(a.prototype);
        c.prototype.toString = function() {
            return t.tofib(this.data)
        };
        c.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b, c = "";
            for (b = 0; b < a.length; b++)
                if (c += a[b], 0 < b && "1" === a[b] && "1" === a[b - 1]) return this.set(t.fromfib(c)), a.substr(b + 1);
            return ""
        };
        d.prototype = Object.create(a.prototype);
        d.prototype.toString = function() {
            return this.data ? t.inttobits(Math.round(this.data.getTime() / 100), this.size) : ""
        };
        d.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = a.substr(0, this.size),
                c = new Date;
            c.setTime(100 *
                parseInt(b, 2));
            this.set(c);
            return a.substr(this.size)
        };
        e.prototype = Object.create(a.prototype);
        e.prototype.toString = function() {
            return this.data ? "1" : "0"
        };
        e.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            this.set("1" === a[0]);
            return a.substr(1)
        };
        h.prototype = Object.create(a.prototype);
        h.prototype.toString = function() {
            if (!this.data) return "";
            for (var a = "", b, c = 0; c < this.data.length; c++) b = Number(this.data.charCodeAt(c) - 65), a += t.inttobits(b, 6);
            return a
        };
        h.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            for (var b = a.substr(0, 6 * this.size), c = "", d, e = 0; e < b.length; e += 6) d = parseInt(b.substr(e, 6), 2), c += String.fromCharCode(d + 65);
            this.set(c);
            return a.substr(b.length)
        };
        f.prototype = Object.create(a.prototype);
        f.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b;
            this.data = [];
            for (b = 0; b < this.size; b++) this.data[b] = "1" === a[b];
            return a.substr(this.size)
        };
        f.prototype.toString = function() {
            var a, b = "";
            for (a = 0; a < this.size; a++) b += this.data[a] ? "1" : "0";
            return b
        };
        p.prototype = Object.create(a.prototype);
        p.prototype.fromString =
            function(a) {
                if (!a || !a.length) return a;
                var b;
                this.size = parseInt(a.substr(0, 16), 2);
                a = a.substr(16);
                this.data = [];
                for (b = 0; b < this.size; b++) this.data[b] = "1" === a[b];
                return a.substr(this.size)
            };
        p.prototype.toString = function() {
            var a = "",
                b;
            for (b = 0; b < this.data.length; b++) a += this.data[b] ? "1" : "0";
            return t.inttobits(this.data.length, 16) + a
        };
        m.prototype = Object.create(a.prototype);
        m.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = 12,
                c = parseInt(a.substr(0, b), 2),
                d, e, k;
            this.data = [];
            for (k = 0; k < c; k++)
                if (d =
                    "1" === a[b], b += 1, d)
                    for (d = parseInt(a.substr(b, 16), 2), b += 16, e = parseInt(a.substr(b, 16), 2), b += 16; d <= e; d++) this.data.push(d);
                else this.data.push(parseInt(a.substr(b, 16), 2)), b += 16;
            return a.substr(b)
        };
        m.prototype.toString = function() {
            for (var a = 0, b, c = "", d = 0, a = 0; a < this.data.length; a++)
                if (d += 1, this.data[a] + 1 === this.data[a + 1]) {
                    for (b = 1; this.data[a + b] === this.data[a] + b; b++);
                    b = a + b - 1;
                    c += "1" + t.inttobits(this.data[a], 16) + t.inttobits(this.data[b], 16);
                    a = b
                } else c += "0" + t.inttobits(this.data[a], 16);
            return t.inttobits(d, 12) +
                c
        };
        l.prototype = Object.create(a.prototype);
        l.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b, d, e = parseInt(a.substr(0, 12), 2),
                k, m = 0;
            a = a.substr(12);
            this.data = [];
            for (d = 0; d < e; d++)
                if (b = "1" === a[0], a = a.substr(1), k = new c, a = k.fromString(a), b) {
                    m += k.valueOf();
                    k = new c;
                    a = k.fromString(a);
                    k = k.valueOf();
                    for (b = 0; b < k; b++) this.data.push(m + b);
                    m += k
                } else m += k.valueOf(), this.data.push(m);
            return a
        };
        l.prototype.toString = function() {
            var a, b, d = "",
                e = 0,
                k;
            for (a = b = 0; a < this.data.length; a++) {
                e += 1;
                k = new c;
                k.set(this.data[a] -
                    b);
                if (this.data[a] + 1 === this.data[a + 1]) {
                    d += "1" + k.toString();
                    for (b = 1; this.data[a + b] === this.data[a] + b; b++);
                    --b;
                    k = new c;
                    k.set(b);
                    d += k.toString();
                    a += b
                } else d += "0" + k.toString();
                b = this.data[a]
            }
            return t.inttobits(e, 12) + d
        };
        k.prototype.set = function(a, b) {
            this.type = a;
            this.data = b
        };
        k.prototype.toString = function() {
            var a;
            if (this.type) return a = new l(this.data), "1" + a.toString();
            a = new p(this.data.length);
            a.set(this.data);
            return "0" + a.toString()
        };
        k.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = "1" ===
                a[0],
                c;
            a = a.substr(1);
            c = b ? new l : new p;
            a = c.fromString(a);
            this.set(b, c.valueOf());
            return a
        };
        n.prototype.set = function(a, b, c) {
            this.maxval = a;
            this.type = b;
            this.data = c
        };
        n.prototype.toString = function() {
            var a = (new b(12, this.maxval)).toString(),
                a = this.type ? new m : new f(this.data.length);
            a.set(this.data);
            a = a.toString();
            return t.inttobits(this.maxval, 16) + (this.type ? "1" : "0") + a
        };
        n.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b;
            this.maxval = parseInt(a.substr(0, 16), 2);
            (this.type = "1" === a[16]) ? (b = new m,
                a = b.fromString(a.substr(17))) : (a = a.substr(16), b = new f(this.maxval), a = b.fromString(a));
            this.data = b.valueOf();
            return a
        };
        n.prototype.valueOf = function() {
            return this.data
        };
        r.prototype.set = function(a, b, c, d) {
            this.maxvendorid = a;
            this.defaultconsent = b;
            this.type = c;
            this.data = d
        };
        r.prototype.toString = function() {
            var a = t.inttobits(this.maxvendorid, 16) + (this.type ? "1" : "0"),
                b = this.type ? new m : new f(this.maxvendorid);
            b.set(this.data);
            return a += b.toString()
        };
        r.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = parseInt(a.substr(0, 16), 2),
                c = "1" === a.substr(16, 1);
            if (this.type) {
                var d = "1" === a.substr(17, 1),
                    e = new m;
                a = e.fromString(a.substr(18));
                this.set(c, e.valueOf(), b, d)
            } else a = (new f(this.maxvendorid)).fromString(a.substr(17)), this.set(c, a.valueOf(), b, !1);
            return a
        };
        q.prototype.toString = function() {
            return this.PurposeId.toString() + this.RestrictionType.toString() + this.PubRestrictionEntry.toString()
        };
        q.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            a = this.PurposeId.fromString(a);
            a = this.RestrictionType.fromString(a);
            return a = this.PubRestrictionEntry.fromString(a)
        };
        q.prototype.valueOf = function() {
            return {
                PurposeId: this.PurposeId.valueOf(),
                RestrictionType: this.RestrictionType.valueOf(),
                PubRestrictionEntry: this.PubRestrictionEntry.valueOf()
            }
        };
        u.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            a = this.NumPubRestrictions.fromString(a);
            this.PubRestrictions = [];
            for (var b = 0; b < this.NumPubRestrictions.valueOf(); b++) {
                var c = new q;
                a = c.fromString(a);
                this.PubRestrictions.push(c)
            }
            return a
        };
        u.prototype.toString = function() {
            for (var a =
                    this.NumPubRestrictions.toString(), b = 0; b < this.NumPubRestrictions.valueOf(); b++) a += this.PubRestrictions[b].toString();
            return a
        };
        u.prototype.valueOf = function() {
            for (var a = [], b = 0; b < this.NumPubRestrictions.valueOf(); b++) a.push(this.PubRestrictions[b].valueOf());
            return a
        };
        v.prototype.toString = function() {
            for (var a = "", b = 0; b < this._fields.length; b++) a += this[this._fields[b]].toString();
            return a
        };
        v.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            for (var b = 0; b < this._fields.length; b++) a = this[this._fields[b]].fromString(a);
            return a
        };
        v.prototype.valueOf = function() {
            for (var a = {}, b = 0; b < this._fields.length; b++) a[this._fields[b]] = this[this._fields[b]].valueOf();
            return a
        };
        return {
            Section: v,
            Int: b,
            Fibonacci: c,
            DateTime: d,
            Boolean: e,
            String: h,
            Bitfield: f,
            BitfieldVariable: p,
            RangeInt: m,
            RangeFibonacci: l,
            OptimizedRange: k,
            OptimizedIntRange: n,
            TcfV1Consent: r,
            TcfV2PubRestriction: q,
            TcfV2PublisherRestrictions: u
        }
    };
    g.prototype.GppStruct = function() {
        var a = this.GppTypes(),
            b = new a.Section("SECTION_GPP_HEADER", {
                Type: new a.Int(6, 3),
                Version: new a.Int(6, 1),
                Sections: new a.RangeFibonacci
            }),
            c = new a.Section("tcfeuv1", {
                Version: new a.Int(6, 1),
                Created: new a.DateTime,
                LastUpdated: new a.DateTime,
                CmpId: new a.Int(12),
                CmpVersion: new a.Int(12),
                ConsentScreen: new a.Int(6),
                ConsentLanguage: new a.String(2),
                VendorListVersion: new a.Int(12),
                PurposesAllowed: new a.Int(24),
                TcfV1Consent: new a.TcfV1Consent
            }),
            a = new a.Section("tcfeuv2", {
                Version: new a.Int(6,
                    2),
                Created: new a.DateTime,
                LastUpdated: new a.DateTime,
                CmpId: new a.Int(12),
                CmpVersion: new a.Int(12),
                ConsentScreen: new a.Int(6),
                ConsentLanguage: new a.String(2),
                VendorListVersion: new a.Int(12),
                TcfPolicyVersion: new a.Int(6),
                IsServiceSpecific: new a.Boolean,
                UseNonStandardStacks: new a.Boolean,
                SpecialFeatureOptIns: new a.Bitfield(12),
                PurposeConsent: new a.Bitfield(24),
                PurposesLITransparency: new a.Bitfield(24),
                PurposeOneTreatment: new a.Boolean,
                PublisherCC: new a.String(2),
                VendorConsent: new a.OptimizedIntRange,
                VendorLegitimateInterest: new a.OptimizedIntRange,
                PublisherRestrictions: new a.TcfV2PublisherRestrictions
            });
        return {
            SECTION_DELIMITER: "~",
            ids: {
                tcfeuv1: 1,
                tcfeuv2: 2,
                SECTION_GPP_HEADER: 3,
                SECTION_GPP_SIGNAL: 4,
                tcfcav1: 5,
                uspv1: 6,
                usnat: 7,
                usca: 8,
                usva: 9,
                usco: 10,
                usut: 11,
                usct: 12
            },
            sections: [null, c, a, b]
        }
    };
    g.prototype.gpp_decode_string = function(a) {
        var b = {
                str: a,
                sections: {}
            },
            c = this.GppStruct();
        a = a.split(c.SECTION_DELIMITER);
        var d, e = [];
        d = this.b64tobits(a.shift());
        e = c.sections[c.ids.SECTION_GPP_HEADER];
        e.fromString(d);
        b.header = e.valueOf();
        for (e = [].concat(b.header.Sections); 0 < a.length;) {
            d = a.shift();
            d = this.b64tobits(d);
            var h = e.shift();
            if (h = c.sections[h]) h.fromString(d), b.sections[h.name] = h.valueOf()
        }
        return b
    };
    g.prototype.gpp_encode_string = function(a) {
        for (var b = [], c = this.GppStruct(), d = [], e = 0; e < a.length; e++) d.push(a[e].Version.valueOf()), b.push(this.bitstob64(a[e].toString(), !0));
        a = c.sections[c.ids.SECTION_GPP_HEADER];
        a.Sections.set(d);
        b.unshift(this.bitstob64(a.toString(), !0));
        return b.join(c.SECTION_DELIMITER)
    };
    g.prototype.gpp_from_tcfstr = function(a) {
        if (!a) return null;
        var b = {
            B: "DBABYA",
            C: "DBABMA"
        }[a.charAt(0)];
        return b ? b + "~" + a : null
    };
    g.prototype.set_first_party_cookie = function(a) {
        if (a = this.get_first_party_cookie() || a) return this.set("__adroll_fpc", a, 8766), a;
        a = this.md5((new Date).getTime() + Math.round(1E11 * Math.random()) + window.navigator.userAgent.toLowerCase() + window.document.referrer) + "-" + (new Date).getTime();
        this.set("__adroll_fpc", a, 8766);
        return a
    };
    g.prototype.get_first_party_cookie = function() {
        try {
            var a = this.get("__adroll_fpc");
            if (a) {
                var b = a.replace("-s2-", "-").replace(/-$/, "");
                if ("-" === b.charAt(32) && b.substr(33).match(/\D/) && Date.parse) {
                    var c = new Date(b.substr(33));
                    if (c && !isNaN(c.getTime())) return b.substr(0, 33) + c.getTime()
                }
                return b
            }
        } catch (d) {}
        return null
    };
    g.prototype._get_fpid_ls = function() {
        return window.localStorage.getItem("__adroll_fpc")
    };
    g.prototype._set_fpid_ls = function(a) {
        window.localStorage.setItem("__adroll_fpc", a)
    };
    g.prototype._get_fpid_idb = function(a) {
        var b = this;
        this._get_idb_row("__adroll_fpc", function(c) {
            a && a.call(b, (c || {}).val)
        })
    };
    g.prototype._set_fpid_idb = function(a) {
        this._set_idb_row("__adroll_fpc", {
            val: a
        })
    };
    g.prototype._sync_fpid = function() {
        var a = this;
        this.if_under_experiment_js("fpidexp", function() {
            var b = a.get_first_party_cookie(),
                c = a._get_fpid_ls();
            a._get_fpid_idb(function(d) {
                a._log_pex_event("fpidexp", "load", "", "", {
                    fpc: b || "",
                    lsid: c || "",
                    idbid: d || ""
                });
                (d = b || c || d) ? a.set_first_party_cookie(d): d = a.set_first_party_cookie();
                a._set_fpid_ls(d);
                a._set_fpid_idb(d)
            })
        }, function() {
            this.set_first_party_cookie()
        })
    };
    g.prototype.jsonStringify = function(a) {
        this.jsonStringifyFunc || this.initJsonStringify();
        return this.jsonStringifyFunc(a)
    };
    g.prototype.jsonParse = function(a) {
        var b = this._global("JSON");
        return "function" === typeof b.parse ? b.parse(a) : eval("(" + a + ")")
    };
    g.prototype.initJsonStringify = function() {
        var a = this._global("JSON");
        this.jsonStringifyFunc = a && a.stringify && "function" === typeof a.stringify ? a.stringify : function() {
            function a(b) {
                return e[b] || "\\u" + (b.charCodeAt(0) + 65536).toString(16).substr(1)
            }
            var c = Object.prototype.toString,
                d = Array.isArray || function(a) {
                    return "[object Array]" === c.call(a)
                },
                e = {
                    '"': '\\"',
                    "\\": "\\\\",
                    "\b": "\\b",
                    "\f": "\\f",
                    "\n": "\\n",
                    "\r": "\\r",
                    "\t": "\\t"
                },
                h = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function p(e) {
                if (null === e) return "null";
                if ("number" === typeof e) return isFinite(e) ? e.toString() : "null";
                if ("boolean" === typeof e) return e.toString();
                if ("object" === typeof e) {
                    if ("function" === typeof e.toJSON) return p(e.toJSON());
                    if (d(e)) {
                        for (var l = "[", k = 0; k < e.length; k++) l += (k ? ", " : "") + p(e[k]);
                        return l + "]"
                    }
                    if ("[object Object]" === c.call(e)) {
                        l = [];
                        for (k in e) e.hasOwnProperty(k) && l.push(p(k) + ": " + p(e[k]));
                        return "{" + l.join(", ") + "}"
                    }
                }
                return '"' + e.toString().replace(h, a) + '"'
            }
        }()
    };
    g.prototype.macro_values = function() {
        var a = this._ensure_global("adroll_cpm_macro", null),
            b = this._ensure_global("adroll_url_macro", null),
            c = this._ensure_global("adroll_c_macro", null),
            d = this._ensure_global("adroll_subnetwork", null),
            e = this._ensure_global("adroll_ad_payload", null),
            h = this._ensure_global("adroll_win_notif", null),
            f = this._ensure_global("adroll_rtb_dict", null),
            p = this._ensure_global("adroll_debug_string", null),
            m = this._ensure_global("adroll_ad_container_version", null),
            l = this._ensure_global("adroll_pixalate_click_url",
                null),
            k = {
                r: /^\$\{.*\}$/i,
                g: /^%%.*%%$/i,
                b: /^\[.*\]$/i,
                x: /^\$\{.*\}$/i,
                t: /INSERTCLICKTRACKER/
            }[this._global("adroll_ext_network")],
            k = this._is_defined(k) ? k : /CANNOT_MATCH_THIS/,
            n = {};
        a && !k.test(a) && (n.adroll_cpm_macro = a);
        p && !k.test(p) && (n.adroll_debug_string = p);
        m && !k.test(m) && (n.adroll_ad_container_version = m);
        b && !k.test(b) && (n.adroll_url_macro = b);
        c && !k.test(c) && (n.adroll_c_macro = c);
        d && !k.test(d) && (n.adroll_subnetwork = d);
        e && !k.test(e) && (n.adroll_ad_payload = e);
        h && !/^[|$]/.test(h) && (n.adroll_win_notif = h);
        l && !k.test(l) && (n.adroll_pixalate_click_url = l);
        if (f && ("string" !== typeof f || !/^[|$]/.test(f))) {
            if ("string" === typeof f) try {
                0 === f.indexOf("b64:") && (f = atob(f.substr(4))), f = this.jsonParse(f)
            } catch (r) {
                this.log("failed to parse: " + r), f = {}
            }
            "object" === typeof f && (n.adroll_rtb_dict = f)
        }
        return n
    };
    g.prototype.format_macros = function(a, b, c, d) {
        return this.macro_url_params(this.macro_values(), a, b, c, d)
    };
    g.prototype.macro_url_params = function(a, b, c, d, e) {
        e = this._is_defined(e) ? e : !1;
        var h = d ? window.escape : function(a) {
                return a
            },
            f = a.adroll_cpm_macro,
            p = a.adroll_url_macro,
            m = c ? a.adroll_c_macro : null,
            l = [],
            k = this.is_lenient_click(b);
        m && 0 === m.indexOf("http") ? (k = h, "g" === this._global("adroll_ext_network") && (k = d ? function(a) {
            return a
        } : window.unescape), l.push(["clickurl", k(m)])) : k && e && l.push(["clickurl", ""]);
        this._global("adroll_ad_destination_url") && !e && (l.push(["desturl", h(this._global("adroll_ad_destination_url"))]),
            this._global("adroll_ad_destination_url_signature") && l.push(["s", this._global("adroll_ad_destination_url_signature")]));
        this._global("adroll_ext_network") && l.push(["adroll_network", this._global("adroll_ext_network")]);
        f && l.push(["cpm", f]);
        a.adroll_subnetwork && l.push(["adroll_subnetwork", a.adroll_subnetwork]);
        a.adroll_ad_payload && l.push(["adroll_ad_payload", a.adroll_ad_payload]);
        a.adroll_debug_string && l.push(["debug_string", h(a.adroll_debug_string)]);
        a.adroll_ad_container_version && l.push(["adroll_ad_container_version",
            h(a.adroll_ad_container_version)
        ]);
        a.adroll_pixalate_click_url && l.push(["adroll_pixalate_click_url", h(a.adroll_pixalate_click_url)]);
        p && (a = this.parseUri(window.unescape(p)), l.push(["site_url", h("http://" + a.host)]), c && (l.push(["adroll_width", h(this._global("adroll_width"))]), l.push(["adroll_height", h(this._global("adroll_height"))])));
        this._global("adroll_insertion_id") && l.push(["adroll_insertion_id", this._global("adroll_insertion_id")]);
        this.log("Macros found " + this.serialize(l));
        return b ? this.buildurl(b,
            l) : this.serialize(l)
    };
    g.prototype.serialize = function(a) {
        if (a.length) {
            for (var b = [], c = a.length - 1; 0 <= c; c--) b.push(a[c].join("="));
            return b.join("&")
        }
        return ""
    };
    g.prototype.includes = function(a, b) {
        return -1 !== a.indexOf(b)
    };
    g.prototype.startswith = function(a, b) {
        return 0 === a.indexOf(b)
    };
    g.prototype.endswith = function(a, b) {
        return -1 !== a.indexOf(b, a.length - b.length)
    };
    g.prototype.buildurl = function(a, b) {
        var c = this.serialize(b),
            d = a.indexOf("?");
        return c ? d === a.length - 1 ? a + c : -1 !== d ? "&" === a[a.length - 1] ? a + c : a + "&" + c : a + "?" + c : a
    };
    g.prototype.md5 = function() {
        function a(a, b) {
            var c = (a & 65535) + (b & 65535);
            return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
        }

        function b(b, c, d, e, h, f) {
            c = a(a(c, b), a(e, f));
            return a(c << h | c >>> 32 - h, d)
        }

        function c(a, c, d, e, h, f, q) {
            return b(c & d | ~c & e, a, c, h, f, q)
        }

        function d(a, c, d, e, h, f, q) {
            return b(c & e | d & ~e, a, c, h, f, q)
        }

        function e(a, c, d, e, h, f, q) {
            return b(d ^ (c | ~e), a, c, h, f, q)
        }

        function h(h, m) {
            var l = h[0],
                k = h[1],
                n = h[2],
                f = h[3],
                l = c(l, k, n, f, m[0], 7, -680876936),
                f = c(f, l, k, n, m[1], 12, -389564586),
                n = c(n, f, l, k, m[2], 17, 606105819),
                k = c(k, n, f, l, m[3],
                    22, -1044525330),
                l = c(l, k, n, f, m[4], 7, -176418897),
                f = c(f, l, k, n, m[5], 12, 1200080426),
                n = c(n, f, l, k, m[6], 17, -1473231341),
                k = c(k, n, f, l, m[7], 22, -45705983),
                l = c(l, k, n, f, m[8], 7, 1770035416),
                f = c(f, l, k, n, m[9], 12, -1958414417),
                n = c(n, f, l, k, m[10], 17, -42063),
                k = c(k, n, f, l, m[11], 22, -1990404162),
                l = c(l, k, n, f, m[12], 7, 1804603682),
                f = c(f, l, k, n, m[13], 12, -40341101),
                n = c(n, f, l, k, m[14], 17, -1502002290),
                k = c(k, n, f, l, m[15], 22, 1236535329),
                l = d(l, k, n, f, m[1], 5, -165796510),
                f = d(f, l, k, n, m[6], 9, -1069501632),
                n = d(n, f, l, k, m[11], 14, 643717713),
                k = d(k,
                    n, f, l, m[0], 20, -373897302),
                l = d(l, k, n, f, m[5], 5, -701558691),
                f = d(f, l, k, n, m[10], 9, 38016083),
                n = d(n, f, l, k, m[15], 14, -660478335),
                k = d(k, n, f, l, m[4], 20, -405537848),
                l = d(l, k, n, f, m[9], 5, 568446438),
                f = d(f, l, k, n, m[14], 9, -1019803690),
                n = d(n, f, l, k, m[3], 14, -187363961),
                k = d(k, n, f, l, m[8], 20, 1163531501),
                l = d(l, k, n, f, m[13], 5, -1444681467),
                f = d(f, l, k, n, m[2], 9, -51403784),
                n = d(n, f, l, k, m[7], 14, 1735328473),
                k = d(k, n, f, l, m[12], 20, -1926607734),
                l = b(k ^ n ^ f, l, k, m[5], 4, -378558),
                f = b(l ^ k ^ n, f, l, m[8], 11, -2022574463),
                n = b(f ^ l ^ k, n, f, m[11], 16, 1839030562),
                k = b(n ^ f ^ l, k, n, m[14], 23, -35309556),
                l = b(k ^ n ^ f, l, k, m[1], 4, -1530992060),
                f = b(l ^ k ^ n, f, l, m[4], 11, 1272893353),
                n = b(f ^ l ^ k, n, f, m[7], 16, -155497632),
                k = b(n ^ f ^ l, k, n, m[10], 23, -1094730640),
                l = b(k ^ n ^ f, l, k, m[13], 4, 681279174),
                f = b(l ^ k ^ n, f, l, m[0], 11, -358537222),
                n = b(f ^ l ^ k, n, f, m[3], 16, -722521979),
                k = b(n ^ f ^ l, k, n, m[6], 23, 76029189),
                l = b(k ^ n ^ f, l, k, m[9], 4, -640364487),
                f = b(l ^ k ^ n, f, l, m[12], 11, -421815835),
                n = b(f ^ l ^ k, n, f, m[15], 16, 530742520),
                k = b(n ^ f ^ l, k, n, m[2], 23, -995338651),
                l = e(l, k, n, f, m[0], 6, -198630844),
                f = e(f, l, k, n, m[7], 10, 1126891415),
                n = e(n, f, l, k, m[14], 15, -1416354905),
                k = e(k, n, f, l, m[5], 21, -57434055),
                l = e(l, k, n, f, m[12], 6, 1700485571),
                f = e(f, l, k, n, m[3], 10, -1894986606),
                n = e(n, f, l, k, m[10], 15, -1051523),
                k = e(k, n, f, l, m[1], 21, -2054922799),
                l = e(l, k, n, f, m[8], 6, 1873313359),
                f = e(f, l, k, n, m[15], 10, -30611744),
                n = e(n, f, l, k, m[6], 15, -1560198380),
                k = e(k, n, f, l, m[13], 21, 1309151649),
                l = e(l, k, n, f, m[4], 6, -145523070),
                f = e(f, l, k, n, m[11], 10, -1120210379),
                n = e(n, f, l, k, m[2], 15, 718787259),
                k = e(k, n, f, l, m[9], 21, -343485551);
            h[0] = a(l, h[0]);
            h[1] = a(k, h[1]);
            h[2] = a(n, h[2]);
            h[3] =
                a(f, h[3])
        }
        var f = "0123456789abcdef".split("");
        return function(a) {
            var b = a;
            /[\x80-\xFF]/.test(b) && (b = unescape(encodeURI(b)));
            var c = b.length;
            a = [1732584193, -271733879, -1732584194, 271733878];
            var d;
            for (d = 64; d <= b.length; d += 64) {
                for (var e = b.substring(d - 64, d), r = [], q = void 0, q = 0; 64 > q; q += 4) r[q >> 2] = e.charCodeAt(q) + (e.charCodeAt(q + 1) << 8) + (e.charCodeAt(q + 2) << 16) + (e.charCodeAt(q + 3) << 24);
                h(a, r)
            }
            b = b.substring(d - 64);
            e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (d = 0; d < b.length; d++) e[d >> 2] |= b.charCodeAt(d) << (d % 4 << 3);
            e[d >> 2] |=
                128 << (d % 4 << 3);
            if (55 < d)
                for (h(a, e), d = 0; 16 > d; d++) e[d] = 0;
            e[14] = 8 * c;
            h(a, e);
            for (b = 0; b < a.length; b++) {
                c = a;
                d = b;
                e = a[b];
                r = "";
                for (q = 0; 4 > q; q++) r += f[e >> 8 * q + 4 & 15] + f[e >> 8 * q & 15];
                c[d] = r
            }
            return a.join("")
        }
    }();
    g.prototype._log_multiple_ids = function() {
        var a = this;
        this.if_under_experiment_js("multidexp", function() {
            a._log_pex_event("multid", "load", "", "", "")
        }, function() {})
    };
    g.prototype._init_floc_trial = function() {
        var a = window.document.createElement("meta");
        a.httpEquiv = "origin-trial";
        a.content = "A41wt2Lsq30A9Ox/WehogvJckPI4aY9RoSxhb8FMtVnqaUle1AtI6Yf7Wk+7+Wm0AfDDOkMX+Wn6wnDpBWYgWwYAAAB8eyJvcmlnaW4iOiJodHRwczovL2Fkcm9sbC5jb206NDQzIiwiZmVhdHVyZSI6IkludGVyZXN0Q29ob3J0QVBJIiwiZXhwaXJ5IjoxNjI2MjIwNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==";
        this._head().appendChild(a)
    };
    g.prototype._log_floc_cohort = function() {
        var a = this._global("adroll_seg_eid") || "";
        if ("function" === typeof window.document.interestCohort) {
            var b = this;
            window.document.interestCohort().then(function(c) {
                if (c) {
                    var d = c.id;
                    c = c.version;
                    d && c && b._log_pex_event("floc", d, c, {
                        seg: a
                    }, null)
                }
            })["catch"](function(a) {
                b.log("floc-error:" + a)
            })
        }
    };
    g.prototype._log_pex_event = function(a, b, c, d, e) {
        a = encodeURIComponent(a);
        b = encodeURIComponent(b);
        c = encodeURIComponent(c);
        var h = this._ensure_global("adroll_adv_id", ""),
            f = this._ensure_global("adroll_pix_id", "");
        e = e ? "&ex=" + encodeURIComponent(this.jsonStringify(e)) : "";
        var p = "";
        "object" === typeof d && (p = "&" + this.object_to_querystring(d));
        d = this._srv("/pex/" + h + "/" + f + "?ev=" + a + "&es=" + b + "&esv=" + c + "&pv=" + this.pv + p + e);
        "function" === typeof navigator.sendBeacon ? navigator.sendBeacon(d) : this.imgRequest(d)
    };
    g.prototype._pixel_timing = function(a, b, c) {
        function d() {
            p.session_time += (new Date).getTime() - (c || 0)
        }

        function e(a, b) {
            var d = b;
            18E5 < p.session_time && (d = "newsession", p.preconsent_sent = !1, p.prepixel_sent = !1);
            b = d;
            if (!("preconsent" === b && p.preconsent_sent || "prepixel" === b && p.prepixel_sent)) {
                d = b;
                p.preconsent_sent = p.preconsent_sent || "preconsent" === d;
                p.prepixel_sent = p.prepixel_sent || "prepixel" === d;
                "newsession" === b && (a = 0, c = m = (new Date).getTime(), p.pixelstart = m, p.session_time = 0);
                d = ["f=" + a];
                "undefined" !== typeof b &&
                    d.push("ft=" + b);
                var e = p._global("adct");
                e && "undefined" !== e && d.push("adct=" + window.escape(e));
                d = encodeURIComponent(d.join("&"));
                d = p._srv("/onp/" + p._global("adroll_adv_id") + "/" + p._global("adroll_pix_id") + "?ev=" + d);
                "function" === typeof navigator.sendBeacon ? navigator.sendBeacon(d) : p.imgRequest(d)
            }
        }

        function h(a, b) {
            window.setTimeout(function() {
                !b || !0 !== window.__adroll_consent && !0 !== (window.__adroll_consent || {}).a || (d(), e(p.session_time, "preconsent"), "object" === typeof window.performance && e(p.pixelstart - window.performance.timing.domInteractive,
                    "prepixel"))
            }, 500 * Math.random())
        }

        function f(a) {
            if ("visible" === window.document.visibilityState || a.type in l) p._pixel_timing(!1, !1, m);
            else if ("hidden" === window.document.visibilityState || a.type in k) !0 === window.__adroll_consent || !0 === (window.__adroll_consent || {}).a ? (d(), e(p.session_time)) : d()
        }
        var p = this,
            m = (new Date).getTime(),
            l = ["focus", "focusin", "pageshow"],
            k = ["blur", "focusout", "pagehide"];
        0 === p.pixelstart && (p.pixelstart = m);
        "function" === typeof window.__tcfapi && !0 === b && (b = !1, window.__tcfapi("addEventListener",
            2, h));
        !0 !== window.__adroll_consent && !0 !== (window.__adroll_consent || {}).a ? window.setTimeout(function() {
            p._pixel_timing(!0, b, m)
        }, 500) : !0 === a && ("hidden" in window.document ? window.document.addEventListener("visibilitychange", f) : "mozHidden" in window.document ? window.document.addEventListener("mozvisibilitychange", f) : "webkitHidden" in window.document ? window.document.addEventListener("webkitvisibilitychange", f) : "msHidden" in window.document ? window.document.addEventListener("msvisibilitychange", f) : "onfocusin" in
            window.document ? (window.document.addEventListener("focusin", f), window.document.addEventListener("focusout", f)) : (window.document.addEventListener("pageshow", f), window.document.addEventListener("pagehide", f), window.document.addEventListener("focus", f), window.document.addEventListener("blur", f)))
    };
    g.prototype._gurl = function() {
        var a = window.location;
        return this.normalize_url(a.pathname + a.search)
    };
    g.prototype.get_dummy_product_for_facebook = function(a) {
        return {
            product_id: "adroll_dummy_product",
            product_group: a,
            product_action: null,
            product_category: null
        }
    };
    g.prototype.facebook_dummy_product_enabled = function() {
        return !0
    };
    g.prototype.extract_pid = function(a, b, c) {
        function d(a) {
            return a ? (a = new RegExp(a, "gi"), !!a.exec(m)) : null
        }
        a || (a = {});
        var e = null,
            h = null,
            f = null,
            p = null,
            m = this._gurl(),
            l = this.get_external_data();
        l && (h = l.product_id, e = l.product_group, f = l.product_action, p = l.adroll_product_category_id);
        if (!h && a.regexp_group && !("string" === a.regexp_group && a.regexp_group instanceof String) && "html" === a.regexp_group.scheme) {
            if (d(a.blacklist_regexp) || !0 !== d(a.regexp)) return "";
            h = this.get_product_id_from_dom(a.regexp_group)
        } else if (!h) {
            if (d(a.blacklist_regexp)) return "";
            h = this.get_product_id_from_url(m, a.regexp, a.regexp_group)
        }
        e || !a.product_group_group || "string" === a.product_group_group && a.product_group_group instanceof String || "html" !== a.product_group_group.scheme ? e || a.product_group_regexp && (e = this.get_product_id_from_url(m, a.product_group_regexp, a.product_group_group)) : e = this.get_product_id_from_dom(a.product_group_group);
        if (h) a = {
            product_id: h,
            product_group: e,
            product_action: f,
            product_category: p
        };
        else if (this.facebook_dummy_product_enabled() && "facebook" === b) a = this.get_dummy_product_for_facebook(e);
        else return null;
        c && c(a);
        return a
    };
    g.prototype.get_pid = function(a) {
        this.extract_pid(a, "adroll", function(a) {
            if (a) {
                var c = a.product_id,
                    d = a.product_group,
                    e = a.product_action,
                    h = a.product_category;
                a = [];
                var f;
                if (c instanceof Array)
                    for (f = 0; f < c.length; f++) a.push(["adroll_product_id", this.normalize_var((c[f] + "").toLowerCase(), !0)]);
                else a.push(["adroll_product_id", this.normalize_var((c + "").toLowerCase(), !0)]);
                if (h instanceof Array)
                    for (f = 0; f < h.length; f++) a.push(["adroll_product_category_id", this.normalize_var((h[f] + "").toLowerCase(), !0)]);
                else h &&
                    a.push(["adroll_product_category_id", this.normalize_var((h + "").toLowerCase(), !0)]);
                d && a.push(["adroll_product_group", this.normalize_var((d + "").toLowerCase(), !0)]);
                e && a.push(["adroll_product_action", this.normalize_var((e + "").toLowerCase(), !0)]);
                (c = this.external_data_to_qs(!0)) && a.push([c]);
                c = this._srv(this.buildurl("/p/" + this._global("adroll_adv_id") + "/", a));
                d = window.document.createElement("img");
                d.src = c;
                d.height = d.width = 1;
                d.border = 0;
                d.setAttribute("alt", "");
                this._head().appendChild(d)
            }
        }.bind(this))
    };
    g.prototype.get_product_id_from_dom = function(a) {
        var b = null,
            c;
        a.path && (window.jQuery ? (c = window.jQuery(a.path), c.length && (c = c.eq(0), b = "text" === a.attribute ? c.text() : c.attr(a.attribute))) : window.Prototype && window.$$ ? (c = window.$$(a.path), c.length && (c = c[0], b = "text" === a.attribute ? c.innerText && !window.opera ? c.innerText : c.innerHTML.stripScripts().unescapeHTML().replace(/[\n\r\s]+/g, " ") : c.readAttribute(a.attribute))) : window.YUI ? (c = window.YUI().use("node"), c.one && (c = c.one(a.path), b = null, c && (b = "text" === a.attribute ?
            c.get("text") : c.getAttribute(a.attribute)))) : window.$$ && (c = window.$$(a.path), c.length && (c = c[0], b = "text" === a.attribute ? c.get("text") : c.getProperty(a.attribute))));
        if (b && (b = b.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), a.regular_expression && a.regular_expression_replace))
            if (c = new RegExp(a.regular_expression, "gi"), b = c.exec(b), null !== b) {
                a = a.regular_expression_replace;
                for (c = 0; c < b.length; c++) a = a.replace(new RegExp("\\\\" + c, "gi"), b[c] || "");
                b = a
            } else b = "";
        return b
    };
    g.prototype.get_product_id_from_url = function(a, b, c) {
        var d = null;
        try {
            d = parseInt(c)
        } catch (e) {}
        return null !== d && !isNaN(d) && b && (a = (new RegExp(b, "gi")).exec(a), null !== a && d in a) ? a[d] : null
    };
    g.prototype.store_adroll_loaded_record = function(a, b) {
        window.adroll_loaded = (window.adroll_loaded || []).concat({
            version: this.version,
            ts: (new Date).getTime(),
            adroll_adv_id: a,
            adroll_pix_id: b
        });
        if (this.__nrpa_event_handler) try {
            this.__nrpa_event_handler({
                adroll_loaded: window.adroll_loaded
            })
        } catch (c) {}
    };
    g.prototype.render_pixel_code = function(a, b) {
        var c = this;
        c._has_global("adroll_tpc") ? c.render_pixel_code_exec(a, b) : c.load_adroll_tpc(function() {
            c.render_pixel_code_exec(a, b)
        })
    };
    g.prototype.render_pixel_code_exec = function(a, b) {
        this.expire_old();
        var c = this.get_keywords();
        this.addLoadEvent(function(d) {
            return function() {
                var e = [];
                try {
                    200 >= window.document.referrer.length && e.push("adroll_s_ref=" + window.escape(window.document.referrer))
                } catch (k) {}
                try {
                    e.push("keyw=" + window.escape(c))
                } catch (k) {}
                try {
                    d._has_global("adroll_segments") && e.push("name=" + window.escape(d._global("adroll_segments").toLowerCase()))
                } catch (k) {}
                try {
                    d._has_global("adroll_p") && e.push("adroll_p=" + window.escape(d._global("adroll_p")))
                } catch (k) {}
                try {
                    d._has_global("adroll_u") &&
                        e.push("adroll_u=" + window.escape(d._global("adroll_u")))
                } catch (k) {}
                try {
                    d._has_global("adroll_m") && d._has_global("adroll_m_type") && (e.push("adroll_m=" + window.escape(d._global("adroll_m"))), e.push("adroll_m_type=" + window.escape(d._global("adroll_m_type"))))
                } catch (k) {}
                try {
                    var h = d.get_conversion_value();
                    h.conv_value && e.push("conv_value=" + h.conv_value);
                    h.currency && e.push("adroll_currency=" + h.currency)
                } catch (k) {}
                try {
                    if (d._has_user_identifier()) {
                        var f = d._global("adroll_user_identifier"),
                            f = f.replace(/^\s\s*/,
                                "").replace(/\s\s*$/, "");
                        e.push("user_identifier=" + window.encodeURIComponent(f))
                    }
                } catch (k) {}
                try {
                    var p = d._global("adct"),
                        m = d.extract_query_param("adct", window.location.search.substr(1));
                    m && "undefined" !== m && p !== m && (d._set_global("adct", m), e.push("adct=" + window.escape(m)))
                } catch (k) {}
                try {
                    d._has_global("adroll_shop_id") && (h = {}, d._has_global("adroll_custom_data") ? h = d._global("adroll_custom_data") : d._set_global("adroll_custom_data", h), "undefined" === typeof h.adroll_shop_id && (h.adroll_shop_id = d._global("adroll_shop_id")));
                    var l = d.external_data_to_qs(!0);
                    l && e.push(l)
                } catch (k) {}((window.performance || {}).timing || {}).domLoading && (l = d.pxlstart - window.performance.timing.domLoading, !isNaN(l) && 0 < l && e.push("p0=" + l));
                e = d.get_base_url("", a, b, null, "", e);
                d.add_script_element(d._srv("/pixel" + e), {
                    async: "true"
                });
                d.is_ipv6() && d.imgRequest(d._srv("/px4" + e, !0))
            }
        }(this));
        this.addLoadEvent(function(a) {
            return function() {
                var b = a._global("adroll");
                if (b && "object" === typeof b) {
                    b.identify = function() {
                        return a.identify.apply(a, arguments)
                    };
                    b.identify_email =
                        function() {
                            return a.identify_email.apply(a, arguments)
                        };
                    b.track = function() {
                        return a.track.apply(a, arguments)
                    };
                    for (var c, f, p = 0; p < b.length; p++) c = b[p][0], f = b[p][1], "identify" === c ? a.identify.apply(a, f) : "identify_email" === c ? a.identify_email.apply(a, f) : "track" === c && a.track.apply(a, f)
                }
            }
        }(this))
    };
    g.prototype.render_ad_code = function(a, b) {
        b = this._is_defined(b) ? b : null;
        if (!this._is_defined(this._r[a]) || b) {
            var c = ["width=" + this._global("adroll_width"), "height=" + this._global("adroll_height"), "x=0", "y=0"];
            if (b) {
                var d = this.macro_values(),
                    e = this.macro_url_params(d, !1, !1, !1, !1);
                c.push(e);
                this.render_win_notification(d);
                this.render_extra_script(d)
            }
            this.expire_old();
            c = this._srv("/impression?" + c.join("&"));
            window.document.write('<script src="' + c + '">\x3c/script>');
            this._nad += 1;
            this._r[a] = 1
        }
    };
    g.prototype.render_win_notification = function(a) {
        if (a.adroll_cpm_macro && a.adroll_win_notif) {
            var b = (this._secure() ? "https://" : "http://") + a.adroll_win_notif + a.adroll_cpm_macro;
            a.adroll_ad_payload && (a.adroll_rtb_dict && a.adroll_rtb_dict.waap || /waap=1&/.test(a.adroll_win_notif) && !this._is_defined(a.adroll_rtb_dict)) && (b += "&ad_payload=" + a.adroll_ad_payload);
            this.imgRequest(b)
        }
    };
    g.prototype.render_extra_script = function(a) {
        a.adroll_rtb_dict && a.adroll_rtb_dict.extra_script_src && this.add_script_element(a.adroll_rtb_dict.extra_script_src, {})
    };
    g.prototype.add_script_element = function(a, b) {
        var c = window.document.createElement("script"),
            d = this._secure() ? "https://" : "http://";
        a.match(/^(\w+:)*\/\//) && (d = "");
        for (var e in b) b.hasOwnProperty(e) && "src" !== e && c.setAttribute(e, b[e]);
        c.type = "text/javascript";
        c.src = d + a;
        this._head().appendChild(c);
        return c
    };
    g.prototype.get_base_url = function(a, b, c, d, e, h) {
        var f = a.split("?");
        a = f[0] + "/" + b + "/" + c + (d ? "/" + d : "") + (e ? "/" + e : "");
        var p = "?";
        f[1] && (a += "?" + f[1], p = "&");
        var f = p + "no-cookies=1",
            m = "";
        this.cookieEnabled(!1) ? (m = window.escape(this.get_eids()), a += p + "cookie=" + m) : a += f;
        h && (a += "&" + h.join("&"));
        a = this.add_tpc_to_url(a);
        if (a.length > this._url) {
            try {
                this.del(this.__adc)
            } catch (l) {}
            if (a.length - m.length > this._url) return a;
            this.log("Url was too big, shrinking it");
            return this.get_url(b, c, d, e, h)
        }
        this.log("Generated url: " +
            a);
        return a
    };
    g.prototype.get_url = function(a, b, c, d, e) {
        var h = c ? this._srv("/c") : this._srv("/r");
        return this.get_base_url(h, a, b, c, d, e)
    };
    g.prototype.get_eids = function() {
        if (this._global("adroll_ext_network") || this._global("adroll_optout")) return "";
        try {
            for (var a = this.get(this.__adc), b = a ? a.split("|") : "", a = [], c = b.length - 1; 0 <= c; c--)
                if (b[c]) {
                    var d = b[c].split(":");
                    a.push([d[0], d[2]].join(":"))
                }
            return a.join("|")
        } catch (e) {
            return this.del(this.__adc), ""
        }
    };
    g.prototype.sha256 = function(a) {
        function b(a, b) {
            return a >>> b | a << 32 - b
        }
        var c = window.unescape(window.encodeURIComponent(a)),
            d = Math.pow(2, 32),
            e, h = "",
            f = [],
            p = 8 * c.length,
            m = [],
            l = [];
        e = 0;
        for (var k = {}, n = 2; 64 > e; n++)
            if (!k[n]) {
                for (a = 0; 313 > a; a += n) k[a] = n;
                m[e] = Math.pow(n, .5) * d | 0;
                l[e++] = Math.pow(n, 1 / 3) * d | 0
            }
        for (c += "\u0080"; 0 !== c.length % 64 - 56;) c += "\x00";
        for (a = 0; a < c.length; a++) {
            e = c.charCodeAt(a);
            if (e >> 8) return null;
            f[a >> 2] |= e << (3 - a) % 4 * 8
        }
        f[f.length] = p / d | 0;
        f[f.length] = p;
        for (e = 0; e < f.length;) {
            c = f.slice(e, e += 16);
            d = m;
            m = m.slice(0,
                8);
            for (a = 0; 64 > a; a++) {
                var k = c[a - 15],
                    n = c[a - 2],
                    p = m[0],
                    r = m[4],
                    k = m[7] + (b(r, 6) ^ b(r, 11) ^ b(r, 25)) + (r & m[5] ^ ~r & m[6]) + l[a] + (c[a] = 16 > a ? c[a] : c[a - 16] + (b(k, 7) ^ b(k, 18) ^ k >>> 3) + c[a - 7] + (b(n, 17) ^ b(n, 19) ^ n >>> 10) | 0),
                    p = (b(p, 2) ^ b(p, 13) ^ b(p, 22)) + (p & m[1] ^ p & m[2] ^ m[1] & m[2]),
                    m = [k + p | 0].concat(m);
                m[4] = m[4] + k | 0
            }
            for (a = 0; 8 > a; a++) m[a] = m[a] + d[a] | 0
        }
        for (a = 0; 8 > a; a++)
            for (e = 3; e + 1; e--) f = m[a] >> 8 * e & 255, h += (16 > f ? 0 : "") + f.toString(16);
        return h
    };
    g.prototype._container_is_secure = function(a) {
        return this._is_defined(a) ? a : this._secure()
    };
    g.prototype.ad_servers_url = function(a, b) {
        return (this._container_is_secure(b) ? "https://" : "http://") + "d.adroll.com" + a
    };
    g.prototype.ad_request_url = function(a, b, c, d, e) {
        var h = this._global("adroll_a_id"),
            f = this._global("adroll_s_id"),
            p = this._global("adroll_insertion_id");
        a = this.ad_servers_url("/r/" + f + "/" + h + "/" + p + "." + a, e);
        return this.format_macros(a, b, c, d)
    };
    g.prototype.click_url = function(a, b) {
        var c = this.ad_servers_url(a ? "/click/lenient/" : "/click/", !1);
        return this.format_macros(c, !0, !0, b)
    };
    g.prototype.engage_url = function() {
        var a = this.ad_servers_url("/event/");
        return this.format_macros(a, !1, !0, !1)
    };
    g.prototype.cdn_url = function(a, b) {
        return (this._container_is_secure(b) ? "https://s.adroll.com" : "http://a.adroll.com") + a
    };
    g.prototype.ad_file_url = function(a, b) {
        var c = this._global("adroll_ad_filename");
        a = a ? c.split(".")[0] + a : c;
        c = "/a/" + c.substring(0, 3) + "/" + c.substring(3, 6) + "/" + a;
        return this.cdn_url(c, b)
    };
    g.prototype.roll_crawl_url = function() {
        return "https://d.adroll.com/p"
    };
    g.prototype.is_lenient_click = function(a) {
        return (a = a ? this.parseUri(a) : null) && this.includes(a.path, "lenient")
    };
    g.prototype.record_user = function(a) {
        var b = "adroll_conversion_value adroll_conversion_value_in_dollars adroll_segments adroll_email adroll_user_identifier adroll_currency".split(" "),
            c, d;
        a = a || {};
        var e = {
            adroll_user_identifier: !0
        };
        for (c = 0; c < b.length; c++) {
            try {
                this._unset_global(b[c])
            } catch (h) {}
            if (b[c] in a) {
                b[c] in e ? this._set_global(b[c], window.escape(a[b[c]])) : "adroll_email" !== b[c] && this._set_global(b[c], a[b[c]]);
                try {
                    delete a[b[c]]
                } catch (h) {}
            }
        }
        try {
            this._unset_global("adroll_custom_data")
        } catch (h) {}
        for (d in a)
            if (a.hasOwnProperty(d)) {
                this._set_global("adroll_custom_data",
                    a);
                break
            }
        this.render_pixel_code(this._global("adroll_adv_id"), this._global("adroll_pix_id"))
    };
    g.prototype.record_adroll_email = function(a) {
        this._record_adroll_email(a, "/id")
    };
    g.prototype.record_adroll_private_email = function(a) {
        this._record_adroll_email(a, "/idp")
    };
    g.prototype._record_adroll_email = function(a, b) {
        if (this._has_email()) {
            var c = this._global("_adroll_email"),
                c = c.replace(/^\s+|\s+$/g, ""),
                d, e, h = c.toLowerCase(),
                f = this.is_email_valid(c);
            this.is_already_hashed(h) ? d = h : f && (d = this.md5(h), e = this.sha256(h));
            c = b || "/id";
            d = {
                hashed_email: d,
                sha256_email: e
            };
            f && (h = h.split("@")[1], d.email_domain = h);
            a && (d.idsource = a);
            h = [
                [this._global("adroll_adv_id")]
            ];
            this._has_global("adroll_inc_ids") && (h = h.concat(this._global("adroll_inc_ids")));
            d = this._reg_lpq("?epq", d);
            for (e = 0; e <
                h.length; e++) this.imgRequest(this._srv(c + "/" + h[e][0] + "/" + d))
        }
    };
    g.prototype._send_plain_text_identifiers = function(a, b, c) {
        if ((a || b) && c) {
            c = {
                idsource: c
            };
            var d = (!1 === window.adroll_sendrolling_cross_device ? "/idp/" : "/id/") + this._global("adroll_adv_id") + "/";
            a && (a = a.replace(/^\s+|\s+$/g, "").toLowerCase(), c.email = a, c.hashed_email = this.md5(a), c.sha256_email = this.sha256(a), a = a.split("@")[1], c.email_domain = a);
            b && (c.user_identifier = b);
            d += this._reg_lpq("?epq", c);
            this.imgRequest(this._srv(d))
        }
    };
    g.prototype._has_email = function() {
        return this._has_global("_adroll_email")
    };
    g.prototype._has_user_identifier = function() {
        return this._has_global("adroll_user_identifier") && "example_user_id" !== this._global("adroll_user_identifier")
    };
    g.prototype.is_already_hashed = function(a) {
        return /^[a-f0-9]{32}$/.test(a)
    };
    g.prototype.is_email_valid = function(a) {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(a)
    };
    g.prototype.identify = function(a, b) {
        (a.email || a.userId) && this._send_plain_text_identifiers(a.email, a.userId, b || "adroll-identify");
        a.email && this._set_global("_adroll_email", a.email);
        var c = this.copyObj(a, ["email", "userId"]);
        c && (c = "/uat/" + this._global("adroll_adv_id") + "/" + this._global("adroll_pix_id") + "/?user_attributes=" + window.encodeURIComponent(this.jsonStringify(c)), b && (c += "&idsource=" + b), this.imgRequest(this._srv(c)));
        this._queueAndCallback("identify", [a, b])
    };
    g.prototype.identify_email = function(a) {
        var b = this;
        this.add_pixel_load_callback(function() {
            function c() {
                if (window.__adroll_idem0) window.__adroll_idem0(a, "adroll-identify-email");
                else if (0 < d) {
                    --d;
                    for (var e = window.document.querySelectorAll("script"), h = 0; h < e.length; h++)
                        if (e[h].src.match(/sendrolling/)) {
                            window.setTimeout(c, 500);
                            return
                        }
                    window._adroll_email = a;
                    b.record_adroll_private_email("adroll-identify-email")
                }
            }
            var d = 3;
            c()
        })
    };
    g.prototype.track = function(a, b) {
        this._track_pxl_assistant(a, b);
        if (a) {
            var c = "/uev/" + this._global("adroll_adv_id") + "/" + this._global("adroll_pix_id") + "/?event_name=" + window.encodeURIComponent(a),
                d = this.copyObj(b);
            d && (c += "&event_attributes=" + window.encodeURIComponent(this.jsonStringify(d)));
            this.imgRequest(this._srv(c));
            this._queueAndCallback("track", [a, b])
        }
    };
    g.prototype._registerCallback = function(a, b, c) {
        this.callbacks = this.callbacks || {};
        this.callbackNames = this.callbackNames || [];
        this.callbacks[a] = this.callbacks[a] || [];
        if (!("function" !== typeof b || -1 < this.callbackNames.indexOf(c)) && (this.callbackNames.push(c), this.callbacks[a].push(b), this.callbackQueues && this.callbackQueues[a] && this.callbackQueues[a].length))
            for (c = 0; c < this.callbackQueues[a].length; c++) b.apply(null, this.callbackQueues[a][c])
    };
    g.prototype._queueAndCallback = function(a, b) {
        this.callbackQueues = this.callbackQueues || {};
        this.callbackQueues[a] = this.callbackQueues[a] || [];
        this.callbackQueues[a].push(b);
        if (this.callbacks && this.callbacks[a] && this.callbacks[a].length)
            for (var c = 0; c < this.callbacks[a].length; c++) this.callbacks[a][c].apply(null, b)
    };
    g.prototype.registerIdentifyCallback = function(a, b) {
        this._registerCallback("identify", a, b)
    };
    g.prototype.registerTrackCallback = function(a, b) {
        this._registerCallback("track", a, b)
    };
    g.prototype._track_pxl_assistant = function(a, b) {
        this._has_global("__adroll_pxl_assistant_track") || this._set_global("__adroll_pxl_assistant_track", []);
        this._global("__adroll_pxl_assistant_track").push({
            eventName: a,
            eventAttrs: b
        });
        if (this.__nrpa_event_handler) try {
            this.__nrpa_event_handler({
                track: this._global("__adroll_pxl_assistant_track")
            })
        } catch (c) {}
    };
    g.prototype._is_defined = function(a) {
        return "undefined" !== typeof a
    };
    g.prototype.normalize_var = function(a, b) {
        if (!a) return "";
        a = a.toString().substr(0, this._kwl).replace(/,/gi, ".");
        b && (a = window.escape(a));
        return a
    };
    g.prototype.get_keywords = function() {
        try {
            var a = window.document.referrer || "";
            if (!a) return "";
            var b = this.parseUri(a);
            return -1 !== b.host.indexOf("www.google.") ? b.queryKey.q.substring(0, this._kwl) : -1 !== b.host.indexOf("bing.com") ? b.queryKey.q.substring(0, this._kwl) : ""
        } catch (c) {
            return ""
        }
    };
    g.prototype.parseUri = function(a) {
        a = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(a);
        for (var b = {
                queryKey: {}
            }, c = 14, d = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" "); c--;) b[d[c]] = a[c] || "";
        b[d[12]].replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(a, c, d) {
            c && (b.queryKey[c] = d)
        });
        return b
    };
    g.prototype._secure = function() {
        return !0
    };
    g.prototype._protocol = function() {
        return window.document.location.protocol
    };
    g.prototype._native = function() {
        try {
            return "http" !== this._protocol().slice(0, 4)
        } catch (a) {
            return !0
        }
    };
    g.prototype.has_param_in_url = function(a, b) {
        var c = a.split("?");
        return 1 < c.length && -1 !== ("&" + c[1]).indexOf("&" + b + "=")
    };
    g.prototype._srv = function(a, b) {
        a = this._is_defined(a) ? a : "";
        var c = "d.adroll.com";
        b && (c = "ipv4.d.adroll.com");
        c = this.add_tpc_to_url("https://" + c + a);
        if (!this.has_param_in_url(c, "arrfrr")) var d = this._get_arrfrr(),
            c = this.add_param_to_url(c, "arrfrr=" + encodeURIComponent(d));
        this.has_param_in_url(c, "pv") || (c = this.add_param_to_url(c, "pv=" + this.pv));
        return this.add_consent_to_url(this.add_fpc_to_url(c))
    };
    g.prototype._get_arrfrr = function(a) {
        a || (a = window.location.href);
        var b = a.split("#");
        a = b.shift();
        var b = b.length ? "#" + b.join("#") : null,
            c = a.split("?"),
            d = this;
        if (1 < c.length) {
            var e = c[1].replace(/([^&=]+)=([^&]+)/g, function(a, b, c) {
                return b.match(/cc_number|credit_card|card_number|cv[cv]_code/) || d.is_luhn(unescape(c)) ? b + "=NR_REDACT" : b + "=" + c
            });
            c[1] !== e && (a = c[0] + "?" + e)
        }
        b && (a += b);
        return a
    };
    g.prototype.is_luhn = function(a) {
        if ("string" !== typeof a) return !1;
        a = a.replace(/\D/g, "");
        if (13 > a.length || 19 < a.length) return !1;
        for (var b = 0, c = !1, d, e = a.length - 1; 0 <= e; e--) d = parseInt(a.charAt(e), 10), c && (d *= 2, 9 < d && (d -= 9)), b += d, c = !c;
        return 0 === b % 10
    };
    g.prototype._cdn = function(a) {
        a = this._is_defined(a) ? a : "";
        return "https://s.adroll.com" + a
    };
    g.prototype.log = function(a) {
        this._logs.push(a)
    };
    g.prototype.read_log = function(a) {
        return this._logs.join(a ? "\n" : "<br>\n")
    };
    g.prototype.normalize_url = function(a) {
        return a.toLowerCase()
    };
    g.prototype.imgRequest = function(a) {
        var b = new window.Image;
        b.src = this.add_tpc_to_url(a);
        b.setAttribute("width", "1");
        b.setAttribute("height", "1");
        b.setAttribute("border", "0");
        b.setAttribute("alt", "");
        return this._head().appendChild(b)
    };
    g.prototype.repeatstr = function(a, b) {
        if (a.repeat) return a.repeat(b);
        if (1 > b) return "";
        if (b % 2) return this.repeatstr(a, b - 1) + a;
        var c = this.repeatstr(a, b / 2);
        return c + c
    };
    g.prototype.inttobits = function(a, b) {
        var c = a.toString(2);
        return c.length > b ? c.substr(c.length - b, b) : this.repeatstr("0", b - c.length) + c
    };
    g.prototype.b64tobits = function(a) {
        var b = "",
            c;
        a = a.replace(/-/g, "+").replace(/_/g, "/");
        for (var d = 0; d < a.length; d++) c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[d]).toString(2), b = b + this.repeatstr("0", 6 - c.length) + c;
        return b
    };
    g.prototype.b64toint = function(a) {
        return parseInt(this.b64tobits(a), 2)
    };
    g.prototype.bitstob64 = function(a, b) {
        var c = "",
            d;
        a += "00000000".substr(0, 8 - a.length % 8);
        for (var e = 0; e < a.length; e += 6) d = a.substr(e, 6), 6 > d.length && (d = (d + "000000").substr(0, 6)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(parseInt(d, 2)), c += d;
        b && (c = c.replace(/\+/g, "-").replace(/\//g, "_"));
        return c
    };
    g.prototype.copyObj = function(a, b) {
        if (!a) return null;
        var c = {},
            d = 0,
            e;
        for (e in a) !a.hasOwnProperty(e) || b && -1 !== b.indexOf(e) || (d++, c[e] = a[e]);
        return d ? c : null
    };
    g.prototype.extendObj = function(a, b) {
        if (Object.assign) return Object.assign(a, b);
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    };
    g.prototype.object_keys = function(a) {
        if (window.Object && window.Object.keys) return Object.keys(a);
        if ("object" === typeof a) return [];
        var b = [],
            c;
        for (c in a) a.hasOwnProperty(c) && b.push(c);
        return b
    };
    g.prototype.wrapException = function(a) {
        return function(b) {
            try {
                return a(b)
            } catch (c) {}
        }
    };
    g.prototype.add_tpc_to_url = function(a) {
        var b = this._global("adroll_tpc");
        if (!a || !b) return a;
        var c = a.substr(a.indexOf("://") + 3).split("/")[0];
        return a.match(/[?&]adroll_tpc=/) && "d.adroll.com" !== c ? a : this.add_param_to_url(a, "adroll_tpc=" + encodeURIComponent(b))
    };
    g.prototype.add_fpc_to_url = function(a) {
        var b = this.get_first_party_cookie();
        if (!a || !b) return a;
        var c = this.parseUri(a);
        return c.queryKey.adroll_fpc || "d.adroll.com" !== c.host && "ipv4.d.adroll.com" !== c.host && "d.adroll.com" !== c.host + ":" + c.port && "ipv4.d.adroll.com" !== c.host + ":" + c.port ? a : this.add_param_to_url(a, "adroll_fpc=" + encodeURIComponent(b))
    };
    g.prototype.add_consent_to_url = function(a) {
        if (!a) return a;
        if (this.has_param_in_url(a, "_arc")) return a;
        var b = this.get_first_party_consent();
        if (!b || !b.arconsent) return a;
        var c = a.match(/^\w+:\/\/([^\/]+)/);
        return c && "d.adroll.com" !== c[1] && "ipv4.d.adroll.com" !== c[1] ? a : this.add_param_to_url(a, "_arc=" + encodeURIComponent(b.arconsent))
    };
    g.prototype.getSafariVersion = function() {
        var a = /^Mozilla\/5\.0 \([^)]+\) AppleWebKit\/[^ ]+ \(KHTML, like Gecko\) Version\/([^ ]+)( Mobile\/[^ ]+)? Safari\/[^ ]+$/i.exec(navigator.userAgent);
        return a ? a[1] : null
    };
    g.prototype.set_tpc = function(a, b) {
        a && b && this._set_global("adroll_tpc", encodeURIComponent(a) + "=" + encodeURIComponent(b))
    };
    g.prototype.tpc_callback = function(a) {
        var b = window.adroll_tpc_callback,
            c = this;
        if (!a) return window.adroll_tpc_callback = a, b;
        window.adroll_tpc_callback = function() {
            if (b) try {
                b.call(c)
            } catch (d) {
                c.log("tpc callback failed: " + d)
            }
            try {
                a.call(c)
            } catch (d) {
                c.log("tpc callback failed: " + d)
            }
        };
        return null
    };
    g.prototype.call_next_tpc = function() {
        var a = this.tpc_callback();
        window.adroll_lex33_called ? a && a.call(this) : (window.adroll_lex33_called = 1, this._call_33across(a))
    };
    g.prototype.extract_query_param = function(a, b) {
        for (var c = b.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].split("=");
            if (decodeURIComponent(e[0]) === a) return decodeURIComponent(e[1])
        }
        return null
    };
    g.prototype.get_adroll_sid = function() {
        var a = this.get_consent_params();
        return a && (a = this.extract_query_param("_s", a)) ? a : this._global("adroll_sid")
    };
    g.prototype.load_adroll_tpc = function(a) {
        this.tpc_callback(a);
        if (this._consent_checked) return this.set_consent();
        this._consent_checked = !0;
        this.call_consent_check()
    };
    g.prototype.get_tpc_decode_timeout = function() {
        return 1500
    };
    g.prototype.init_pixchk = function() {
        this.if_under_experiment_js("pixchk", function() {
            window.addEventListener("message", this.pixchk_handler, !1)
        }, function() {}, 1E3)
    };
    g.prototype.pixchk_handler = function(a) {
        if (a.origin.match(/^https?:\/\/[^\/:]*\.adroll\.com\b/)) try {
            var b = JSON.parse(a.data);
            "pixchk" === b.cmd && a.source.postMessage(JSON.stringify({
                cmd: "pixrpl",
                adv_id: window.adroll_adv_id,
                pix_id: window.adroll_pix_id,
                token: b.token
            }), "*")
        } catch (c) {}
    };
    g.prototype.load_pixel_assistant = function() {
        if (!window.document.getElementById("adroll_nrpa_sdk")) {
            var a = (window.location.hash || "").match("nrpa=([A-Z0-7]+)8([A-F0-9]+Z)"),
                b = Math.floor((new Date).getTime() / 1E3) - 3600;
            (window.sessionStorage.getItem("adroll_nrpa_sdk") || a && a[1] === window.adroll_adv_id && !(parseInt(a[2], 16) < b)) && this.add_script_element("https://s.adroll.com/j/nrpa.js", {
                id: "adroll_nrpa_sdk"
            })
        }
    };
    g.prototype.set_suspended = function() {
        this._set_global("__adroll_data_suspended", !0)
    };
    g.prototype.is_suspended = function() {
        return this._has_global("__adroll_data_suspended")
    };
    g.prototype.object_to_querystring = function(a) {
        var b = null;
        if ("object" === typeof a && ("function" === typeof window.URLSearchParams && (b = (new window.URLSearchParams(a)).toString(), "[object URLSearchParams]" === b && (b = null)), null === b)) {
            var b = "",
                c;
            for (c in a) a.hasOwnProperty(c) && (b = b + "&" + encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            b = b.substr(1)
        }
        return b
    };
    g.prototype._get_lex_timeout = function() {
        return 1E3
    };
    g.prototype.is_ipv6 = function() {
        return (this._global("__adroll_consent_data") || {}).isipv6
    };
    g.prototype._call_33across = function(a) {
        function b() {
            a && a.call(c)
        }
        var c = this;
        if (!0 === this._ensure_global("__adroll_consent_is_gdpr", null)) b();
        else {
            var d = (this._global("__adroll_consent_data") || {}).ipgeo || {},
                e = (d.country_code || "").toLowerCase(),
                d = (d.region_name || "").toLowerCase();
            if ("us" !== e || "california" === d) b();
            else if (e = navigator.userAgent.toLowerCase(), -1 === e.indexOf("safari/")) b();
            else {
                if (-1 !== e.indexOf(" edg/")) {
                    if ((e = e.match(/ edg\/([\d\.]+)/)) && 79 > parseFloat(e[1])) {
                        b();
                        return
                    }
                } else {
                    if (-1 !==
                        e.indexOf(" chrome/")) {
                        b();
                        return
                    }
                    if ((e = e.match(/ version\/([\d\.]+)/)) && 11 > parseFloat(e[1])) {
                        b();
                        return
                    }
                }
                this.if_under_experiment_js("block33a", function() {
                    b()
                }, function() {
                    var d = c._ensure_global("adroll_adv_id", ""),
                        e = c._ensure_global("adroll_pix_id", ""),
                        d = c._srv("/lex/" + d + "/" + e + "?id=${PUBTOK}&pv=" + c.pv),
                        d = "https://lex.33across.com/ps/v1/pubtoken/?pid=115&event=rtg&us_privacy=&rnd=<RANDOM>&ru=<URL>".replace("<RANDOM>", c.pv).replace("<URL>", encodeURIComponent(d));
                    window.adroll_lex_cb = a;
                    window.adroll_lex_to =
                        window.setTimeout(function() {
                            window.adroll_lex_to = null;
                            window.adroll_lex_cb = null;
                            b()
                        }, c._get_lex_timeout());
                    c.add_script_element(d)
                })
            }
        }
    };
    g.prototype.set_lex_id = function(a) {
        window.adroll_lex_to && (window.clearTimeout(window.adroll_lex_to), window.adroll_lex_to = null);
        this.set_tpc("lx3", a);
        a = window.adroll_lex_cb;
        window.adroll_lex_cb = null;
        a && a.call(this)
    };
    g.prototype._reg_lpq = function(a, b) {
        var c, d, e = [],
            h = {},
            f = btoa(this.object_to_querystring(b));
        if (!f) return "";
        for (c = 65; 91 > c; c++) e.push(String.fromCharCode(c));
        f = f.split("");
        e.push("-", "_", "\t");
        f = f.reverse();
        e.splice(13, 0, "+", "/", "=");
        for (c = 0; c < e.length - 3; c++) d = e.concat(e)[c + e.length / 2], h[e[c]] = d, h[e[c].toLowerCase()] = d.toLowerCase();
        return (e = f.map(function(a) {
            return h[a] || a
        }).join("").trim()) ? a + "=" + e : ""
    };
    var w = [],
        x = window.adroll_adv_id;
    x && 0 <= w.indexOf(x.substr(0, 1)) ? (window.__adroll_v1_to_v2_shim = !0, window.adroll_version = "2.0", function(a, b, c, d, e) {
        a.__adroll_loaded = !0;
        a.adroll = a.adroll || [];
        a.adroll.f = ["setProperties", "identify", "track"];
        var h = "https://s.adroll.com/j/" + x + "/roundtrip.js";
        for (e = 0; e < a.adroll.f.length; e++) a.adroll[a.adroll.f[e]] = a.adroll[a.adroll.f[e]] || function(b) {
            return function() {
                a.adroll.push([b, arguments])
            }
        }(a.adroll.f[e]);
        c = b.createElement("script");
        d = b.getElementsByTagName("script")[0];
        c.async = 1;
        c.src = h;
        d.parentNode.insertBefore(c,
            d)
    }(window, document), window.adroll.track("pageView")) : window.__adroll = window.__adroll || new g;
}());
(function(a) {
    a.adroll_optout = !1;
    !0 === a.__adroll_v1_to_v2_shim ? a.adroll_loaded = (a.adroll_loaded || []).concat({
        version: a.adroll_version,
        ts: (new Date).getTime(),
        adroll_adv_id: a.adroll_adv_id,
        adroll_pix_id: a.adroll_pix_id
    }) : (a.__adroll.store_adroll_loaded_record(a.adroll_adv_id, a.adroll_pix_id), "2.0" === a.adroll_version ? a.console && a.console.debug && a.console.debug("Both the NextRoll v1 and v2 pixel detected?") : (a.adroll_ext_network = null, a.adroll_callbacks = "undefined" === typeof a.adroll_callbacks ? [] : a.adroll_callbacks,
        a.__adroll.render_pixel_code(a.adroll_adv_id, a.adroll_pix_id)))
})(window);