(function() {
    var scheme = (("https:" == document.location.protocol) ? "https" : "http");
    var adnxs_domain = 'secure.adnxs.com';
    var aol_domain = 'secure.leadback.advertising.com';
    window.adroll_seg_eid = "5J34FJYSVFBTNCJVRHQ6V6";
    window.adroll_sendrolling_cross_device = false;
    window.adroll_form_fields = {};
    window.adroll_third_party_forms = {};
    if (typeof __adroll._form_attach != 'undefined') {
        __adroll._form_attach();
    }
    if (typeof __adroll._form_tp_attach != 'undefined') {
        __adroll._form_tp_attach();
    }
    window.adroll_rule_type = "p";
    var rule = ["*", "*"];
    if (scheme == 'http') {
        adnxs_domain = 'ib.adnxs.com';
        aol_domain = 'leadback.advertising.com';
    }
    var el = document.createElement("div");
    el.style["width"] = "1px";
    el.style["height"] = "1px";
    el.style["display"] = "inline";
    el.style["position"] = "absolute";
    var content = '';

    if (__adroll.consent_allowed(__adroll.consent_networks.facebook)) {
        ! function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window,
            document, 'script', '//connect.facebook.net/en_US/fbevents.js');
    }

    try {
        try {
            if (__adroll.consent_allowed(__adroll.consent_networks.facebook)) {
                var fbLimitedDataUse = true;
                if (typeof __adroll.fb === 'undefined') {
                    if (fbLimitedDataUse) {
                        fbq('dataProcessingOptions', ['LDU'], 0, 0);
                    }
                    fbq('init', '248142588854404');
                    fbq('set', 'autoConfig', 'false', '248142588854404');
                    __adroll.fb = true;

                    var __fbcd = {
                        segment_eid: "5J34FJYSVFBTNCJVRHQ6V6"
                    };
                    for (var prop in __adroll.get_external_data()) {
                        __fbcd['ar_' + prop] = __adroll.get_external_data()[prop];
                    }

                    fbq('track', "PageView", __fbcd);
                } else {
                    var __fbcd = {
                        event: "EventSegment",
                        segment_eid: "5J34FJYSVFBTNCJVRHQ6V6"
                    };
                    for (var prop in __adroll.get_external_data()) {
                        __fbcd['ar_' + prop] = __adroll.get_external_data()[prop];
                    }

                    fbq('track', "CustomEvent", __fbcd);
                }
            }

        } catch (e) {}
    } catch (e) {}

    var r = Math.random() * 10000000000000000;
    content = content.replace(/\[ord\]/gi, r);
    content = content.replace(/\[protocol\]/gi, scheme);
    content = content.replace(/\[adnxs_domain\]/gi, adnxs_domain);
    content = content.replace(/\[aol_domain\]/gi, aol_domain);
    var adroll_tpc = __adroll._global('adroll_tpc');
    if (adroll_tpc) {
        var srv_parts = __adroll._srv().split('?');
        var srv_host = srv_parts[0].substr(srv_parts[0].indexOf(':') + 1);
        var srv_re = new RegExp(srv_host + '([^\?\"\'\>\#\S]+)\\?*', 'gi');
        content = content.replace(srv_re, srv_host + '$1?' + srv_parts[1] + '&');
    }
    content = __adroll.replace_external_data(content);
    el.innerHTML = content;
    __adroll._head().appendChild(el);
    if (typeof __adroll.set_pixel_cookie != 'undefined') {
        __adroll.set_pixel_cookie(adroll_adv_id, adroll_pix_id, "5J34FJYSVFBTNCJVRHQ6V6");
    }
}());