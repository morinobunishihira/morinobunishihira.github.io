var NHKSNS = function () {
    "use strict";

    function e(e) {
        e = e || {};
        var i,
            r,
            s,
            c,
            p,
            d = {},
            g = !1;
        i = t(),
        w
            .SNS
            .resources
            .facebook
            .redirects = e["facebook-redirects"] || w
            .SNS
            .resources
            .facebook
            .redirects;
        var m = document.createElement("style");
        try {
            m.innerHTML = k
        } catch (e) {
            m.setAttribute("type", "text/css"),
            m.styleSheet.cssText = k
        }
        for (document.getElementsByTagName("head")[0].appendChild(m), document.documentMode && document.documentMode <= 10 && (!window.external || void 0 === window.external.msActiveXFilteringEnabled && "unknown" != typeof window.external.msActiveXFilteringEnabled || !1 === window.external.msActiveXFilteringEnabled() && (g =! 0)), r = 0; r < i.length; r++) 
            if (! g) {
                for (var h in w.separatableOptions) {
                    var f = i[r].getAttribute("data-nhksns-" + h);
                    switch (h) {
                        case "url": f = f || e.url || l("og:url") || l("shorturl") || u();
                            break;
                        case "title": f = f || e.title || l("og:title") || l("title") || document.title || "";
                            break;
                        case "description": f = f || e.description || l("og:description") || l("description") || "";
                            break;
                        case "image": f = f || e.image || l("og:image") || "";
                            break;
                        default: f = f || e[h]
                    }
                    f && o(h, f)
                        ? d[h] = f
                        : d[h] = w.defaultOptions[h] || ""
                }
                if (g) 
                    return;
                
                s = new RegExp(/^(https?:)?\/\/([^\/.]+\.)*nhk1s\.jp\/.*/),
                c = new RegExp(/^(https?:)?\/\/([^\/.]+\.)*nhk-ondemand\.jp\/.*/),
                p = new RegExp(/^(https?:)?\/\/([^\/.]+\.)*nhk(\.or)?\.jp\/.*/),
                d.url.match(s) || d.url.match(c) || d.url.match(p) || (d.url = w.defaultUrl, d.title = w.defaultTitle, d.description = w.defaultDesciption),
                d.title = encodeURIComponent(d.title),
                d.description = encodeURIComponent(d.description),
                d.url = a(d.url),
                i[r].innerHTML = n(i[r], d)
            }
        
    }
    function t() {
        var e,
            t,
            n;
        if (document.getElementsByClassName) 
            return document.getElementsByClassName(w.needleClassName);
        
        for (e = document.getElementsByTagName("div"), t =[], n = 0; n < e.length; n++) 
            e[n].hasAttribute(w.needleClassName) && t.push(e[n]);
        
        return t
    }
    function n(e, t) {
        var n,
            s,
            l,
            a = "";
        for (n = t.lang, p(t) && (a += '<p class="nhksns-guide" style="display: block;">' + w.guides[n] + i("help", t) + "</p>"), d(t) && (a += '<p class="nhksns-guide" style="display: inline-block; margin-right: 12px;">' + w.guides[n] + i("help", t) + "</p>"), e
            .attributes
            .class
            .value += " nhksns-icon-" + t.iconsize, a += '<ul class="nhksns">', s = 0; s < w
            .SNS
            .defaults
            .length; s++) 
            "line" == (l = w.SNS.defaults[s]) && r() || t.disable.match(new RegExp(l)) && o("disable", l) || (a += i(l, t));
        
        return a += "</ul>",
        g(t) && (a += '<p class="nhksns-guide">' + w.guides[n] + i("help", t) + "</p>"),
        m(t) && (a += '<p class="nhksns-guide" style="display:inline-block; margin-left: 12px;">' + w.guides[n] + i("help", t) + "</p>"),
        a
    }
    function i(e, t) {
        var n = '<li class="nhksns-{name}"><a href="{href}" {sendMetrics} target="_blank"><img  src="{img}" alt="{name}"></img></a>',
            i = w.SNS.resources[e];

        switch (e) {
            case "twitter":
                return h(n, {
                    href: h(i.link, {
                        url: t.url,
                        text: t.title,
                        description: t.description
                    }),
                    name: e,
                    img: i.image,
                    sendMetrics: s(e)
                });
            case "facebook":
                return h(n, {
                    href: h(i.link, {
                        app_id: i.appId,
                        url: t.url,
                        description: t.description,
                        text: t.title,
                        image: t.image,
                        redirects: i.redirects
                    }),
                    name: e,
                    img: i.image,
                    sendMetrics: s(e)
                });
            case "line":
                return h(n, {
                    href: h(i.link, {
                        url: t.url,
                        text: t.title
                    }),
                    name: e,
                    img: i.image,
                    sendMetrics: s(e)
                });
            case "help":;
                return h('<a class="nhksns-help" href="{href}" target="_blank"><img src="{img}" alt="help"></img></a>', {
                    href: i.link[t.lang],
                    img: i.image
                })
        }
        return ""
    }
    function r() {
        return "function" != typeof b || "iphone" !== b()[1] && "androidmobile" !== b()[1]
    }
    function o(e, t) {
        var n,
            i = w.separatableOptions[e];
        if (void 0 === i) 
            return !1;
        
        if (null === i) 
            return !0;
        
        if ("function" == typeof Array.prototype.indexOf) 
            return -1 != i.indexOf(t);
        
        for (n = 0; n < i.length; n++) 
            if (i[n] === t) 
                return !0;
            
        
        return !1
    }
    function s(e) {
        return h("onClick=\"if ('function' == typeof _tc_onClick) {_tc_onClick(s_omni,{},'SNS_Button_{service}')} \"", {service: e})
    }
    function l(e) {
        for (var t = document.getElementsByTagName("meta"), n = 0; n < t.length; n++) {
            if (t[n].hasAttribute("property") && t[n]
                    .attributes
                    .property
                    .value == e) 
                return t[n].content;
            
            if (t[n].hasAttribute("name") && t[n]
                    .attributes
                    .name
                    .value == e) 
                return t[n].content
            
        }
    }
    function a(e) {
        if (e.match(/\?/)) {
            var t = e.split("?"),
                n = t.filter(function (e, t) {
                    return t > 0
                }).join("?"),
                i = n.split("&"),
                r = i.map(function (e) {
                    var t = e.split("="),
                        n = t.filter(function (e, t) {
                            return t > 0
                        }).join("=");
                    return c(t[0]) + "=" + encodeURIComponent(n)
                }).join("&"),
                o = c(t[0]);
            return r && (o += "?" + r),
            o
        }
        return c(e)
    }
    function c(e) {
        return encodeURI(e)
    }
    function u() {
        var e = new RegExp("[\\\\|\"|'|>|<]", "g"),
            t = [],
            n = [],
            i = "",
            r = [],
            o = [],
            s = location.protocol,

            l = location.host.replace(e, ""),
            a = location.pathname.replace(e, ""),
            c = decodeURIComponent(location.search),
            u = decodeURIComponent(location.hash),
            p = s + "//" + l + a;

        if (!(s && l && a)) 
            return w.defaultUrl;
        
        if (p && p.length > 255 || c && c.length > 255 || u && u.length > 255) 
            return w.defaultUrl;
        
        if (c) {
            c = c.replace(/^\?/, ""),
            t = c.split("&");
            for (var d = 0; d < t.length; d++) 
                if (r = t[d].split("="), o =[], r.length > 0) {
                    i = r[0].replace(e, "") + "=";
                    for (var g = 1; g < r.length; g++) 
                        r[g] && o.push(encodeURIComponent(r[g]));
                    
                    n.push(i + o.join("="))
                }
            
            c = "?" + n.join("&")
        } else 
            c = "";
        
        return u = u
            ? "#" + encodeURIComponent(u.replace(/^#/, ""))
            : "",
        p + c + u
    }
    function p(e) {
        return "nothing" !== e.guidepos && !(! e.guidepos || "top" != e.guidepos)
    }
    function d(e) {
        return "nothing" !== e.guidepos && !((! e.guidepos || "left" != e.guidepos) && o("guidepos", e.guidepos))
    }
    function g(e) {
        return "nothing" !== e.guidepos && !(! e.guidepos || "bottom" != e.guidepos)
    }
    function m(e) {
        return "nothing" !== e.guidepos && !(! e.guidepos || "right" != e.guidepos)
    }
    function h(e, t) {
        for (var n in t) {
            if ("object" == typeof t[n]) 
                throw new TypeError("param is not to be Object");
            
            var i = new RegExp("{" + n + "}", "g");
            e = e.replace(i, t[n])
        }
        return e
    }
    function f(t) {
        window.addEventListener("DOMContentLoaded", function () {
            e(t)
        })
    }

    var b,
        k = ".nhk-snsbtn { margin-bottom: 15px; } ul.nhksns { list-style:none; display: inline; padding-left: 0; } ul.nhksns > li { display: inline-block; vertical-align: middle; margin: 0.2em; } .nhksns-icon-s img { width:24px; } .nhksns-icon-m img { width: 32px; } .nhksns-icon-l img { width:40px; } .nhksns-help img { margin-left:6px; width: 18px; border: 1px solid #999; vertical-align: middle; }  img { border: none; } .nhksns-guide { vertical-align:middle; margin: 0 0 6px 0; font-weight: bold; } .nhksns img { border: none; }",
        w = {};
    return window.addEventListener("DOMContentLoaded", function () {
        b = window.nol_getDeviceType || null
    }, !0),
    w.baseDir = h("{protocol}//morinobunishihira.github.io/common/sns/", {protocol: location.protocol}),
    w.needleClassName = "nhk-snsbtn",
    w.baseClaasName = "nhk-snsbtn",
    w.SNS = {},
    w.SNS.resources = {
        twitter: {
            link: "https://twitter.com/intent/tweet?text={text}%20{description}&url={url}",
            image: w.baseDir + "img/twitter.png"
            
        },
        facebook: {
            link: "https://www.facebook.com/dialog/share?app_id={app_id}&display=popup&href={url}&redirect_uri={redirects}",
            image: w.baseDir + "img/facebook.png",
            appId: "1480146385671692",
            redirects: "https://www.facebook.com"
        },
        line: {
            link: "line://msg/text/{text}%20{url}",
            image: w.baseDir + "img/line.png"
        },
        help: {
            link: {
                ja: w.baseDir + "help.html",
                en: w.baseDir + "help_en.html"
            },
            image: w.baseDir + "img/help.png"
        }
    },
    w.SNS.defaults = [
        "twitter", "facebook", "line"
    ],
    w.guides = {
        ja: "繧ｷ繧ｧ繧｢縺吶ｋ",
        en: "Share"
    },
    w.separatableOptions = {
        disable: ["line"],
        lang: [
            "ja", "en"
        ],
        guidepos: [
            "left",
            "bottom",
            "right",
            "top",
            "nothing"
        ],
        iconsize: [
            "s", "m", "l"
        ],
        description: null,
        title: null,
        url: null
    },
    w.defaultOptions = {
        lang: "ja",
        iconsize: "m"
    },
    w.satisfiedOptions = {},
    w.defaultUrl = "http://www.nhk.or.jp/",
    w.defaultTitle = "NHK繧ｪ繝ｳ繝ｩ繧､繝ｳ",
    w.defaultDesciption = "", {
        initSNSOnLoad: f,
        initSNS: e
    }
}();