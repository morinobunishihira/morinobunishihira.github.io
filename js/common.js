/////////らじる★らじる/////////
function setBodyClass() {
    $(window).width() >= 768 ? ($("body").addClass("pc"),
    $("body").removeClass("sp")) : ($("body").addClass("sp"),
    $("body").removeClass("pc")),
    ua.isiPad && $("body").addClass("iPad"),
    ua.isiOS && $("body").addClass("iOS"),
    ua.isAndroid && $("body").addClass("Android"),
    -1 != navigator.platform.indexOf("Win") && $("body").addClass("Windows")
}
function setPT() {
    $(this).scrollTop() > 200 ? ($("#ptop").css({
        visibility: "visible",
        opacity: "1"
    }),
    scrollHeight = $(document).height(),
    scrollPosition = window.innerHeight + $(window).scrollTop(),
    footHeight = $("footer").innerHeight(),
    scrollHeight - scrollPosition <= footHeight ? ($("#ptop").addClass("end"),
    $(".sp .snsbtn.btm").addClass("end")) : ($("#ptop").removeClass("end"),
    $(".sp .snsbtn.btm").removeClass("end"))) : $("#ptop").css({
        visibility: "hidden",
        opacity: "0"
    })
}
$(function() {
    setBodyClass(),
    $('a[href^="#"]').click(function() {
        var e = $(this).attr("href")
          , i = $("#" == e || "" == e ? "html" : e).offset().top;
        return $("body,html").animate({
            scrollTop: i
        }, 400, "swing"),
        !1
    }),
    $(this).scrollTop() > 200 && setPT(),
    $(window).scroll(function() {
        setPT()
    }),
    $("#ptop").click(function() {
        return $("body, html").animate({
            scrollTop: 0
        }, 400),
        !1
    }),
    $(".mOpen").on("click", function() {
        $(this).next(".mCover").hasClass("this") ? $(".mCover.this").fadeOut("fast").removeClass("this") : ($(".mCover").fadeOut("fast").removeClass("this"),
        $(this).next(".mCover").fadeIn("fast").addClass("this"))
    }),
    $(".mCover li a").on("click", function() {
        $(".mCover.this").fadeOut("fast").removeClass("this")
    }),
    snsiconsize = $("body.idx").size() ? "l" : "m";
    try {
        $("body.ondemand.detail").size() || setTimeout(function() {
            NHKSNS.initSNS({
                iconsize: snsiconsize,
                disable: "line",
                guidepos: "nothing"
            })
        }, 700)
    } catch (e) {}
    $(window).on("load scroll", function() {
        window.innerHeight ? window.innerHeight : $(window).height();
        $(window).scrollTop() > 200 ? $("#contentsHead").addClass("fixed") : $("#contentsHead").removeClass("fixed")
    })
}),
$(window).on("orientationchange resize", function() {
    setBodyClass()
});
var ieVer, ua = {};
console.log(window.navigator);
console.log(window.navigator.userAgent);
ua.name = window.navigator.userAgent.toLowerCase(),
ua.isOldEdge = ua.name.indexOf("applewebkit") >= 0 && ua.name.indexOf("edge/") >= 0,
ua.isNewEdge = ua.name.indexOf("applewebkit") >= 0 && ua.name.indexOf("edg/") >= 0,
ua.isEdge = ua.isOldEdge || ua.isNewEdge,
ua.isIE = ua.name.indexOf("msie") >= 0 || ua.name.indexOf("trident") >= 0,
ua.isiPhone = ua.name.indexOf("iphone") >= 0,
ua.isiPod = ua.name.indexOf("ipod") >= 0,
ua.isiPad = ua.name.indexOf("ipad") > -1 || ua.name.indexOf("macintosh") > -1 && "ontouchend"in document,
ua.isiOS = ua.isiPhone || ua.isiPod || ua.isiPad,
ua.isAndroid = ua.name.indexOf("android") >= 0,
ua.isTablet = ua.isiPad || ua.isAndroid && ua.name.indexOf("mobile") < 0,
ua.isIE && (ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name),
ua.verArray && (ua.ver = parseInt(ua.verArray[2], 10))),
ua.isiOS && (ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name),
ua.verArray && (ua.ver = parseInt(ua.verArray[2], 10))),
ua.isAndroid && (ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name),
ua.verArray && (ua.ver = parseInt(ua.verArray[2], 10))),
ua.isMacSafari = !ua.isiOS && !ua.isAndroid && -1 !== ua.name.indexOf("safari") && -1 === ua.name.indexOf("chrome"),
ua.isIE && (ieVer = parseInt(ua.name.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3], 10)),
function(e) {
    window.XDomainRequest && e.ajaxTransport(function(i) {
        var n;
        if (i.crossDomain && i.async)
            return i.timeout && (i.xdrTimeout = i.timeout,
            delete i.timeout),
            {
                send: function(a, o) {
                    function s(i, a, s, t) {
                        n.onload = n.onerror = n.ontimeout = n.onprogress = e.noop,
                        n = void 0,
                        o(i, a, s, t)
                    }
                    (n = new XDomainRequest).open(i.type, i.url),
                    n.onload = function() {
                        s(200, "OK", {
                            text: n.responseText
                        }, "Content-Type: " + n.contentType)
                    }
                    ,
                    n.onerror = function() {
                        s(404, "Not Found")
                    }
                    ,
                    n.onprogress = function() {}
                    ,
                    i.xdrTimeout && (n.ontimeout = function() {
                        s(0, "timeout")
                    }
                    ,
                    n.timeout = i.xdrTimeout),
                    n.send(i.hasContent && i.data || null)
                },
                abort: function() {
                    n && (n.onerror = e.noop(),
                    n.abort())
                }
            }
    })
}(jQuery);
