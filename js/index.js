// ///////繧峨§繧銀�繧峨§繧� 繝医ャ繝励�繝ｼ繧ｸ/////////
console.log(document);
var $d = document.domain.indexOf("stg-") > -1 || document.domain.indexOf("dev-") > -1
        ? document.domain
        : "morinobunishihira.github.io",
    domain = "https://" + $d,
    jsonpath = domain + "/include/recommend.json",
    upper_banner_json = domain + "/banners/upper_banners.json",
    top_banner_json = domain + "/banners/banners.json",
    info1path = domain + "/include/oshirase.xml",
    info2path = domain + "/include/oshirase2.html",
    nowDate = new Date;
    console.log(domain);
    console.log(info1path);
    console.log(info2path);
$(function () {
    $.ajax({

        url: "config/config_web.xml",
        cache: !0,
        dataType: "xml",
        success: function (e) {
            console.log("success");
            $config.info = $(e)
                .find("info")
                .eq(0)
                .text(),
            $(e).find("stream_url data").each(function () {
                $config.stream_url.push({
                    areajp: $(this).find("areajp").text(),
                    area: $(this).find("area").text(),
                    apikey: $(this).find("apikey").text(),
                    areakey: $(this).find("areakey").text(),
                    r1hls: $(this).find("r1hls").text(),
                    r2hls: $(this).find("r2hls").text(),
                    fmhls: $(this).find("fmhls").text()
                })
            }),
            $config.url_program_noa = $(e)
                .find("url_program_noa")
                .eq(0)
                .text(),
            $config.url_program_day = $(e)
                .find("url_program_day")
                .eq(0)
                .text(),
            $config.url_program_detail = $(e)
                .find("url_program_detail")
                .eq(0)
                .text(),
            $config.radiru_twitter_timeline = $(e)
                .find("radiru_twitter_timeline")
                .eq(0)
                .text(),
            callback()
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);

        }
    }),
    $("#ui2019 .off1,#ui2019 .off2 a").on("click", function () {
        $("#ui2019").fadeOut(200),
        setCookie("_rr_beta", "true", "/radio/", 6048e5)
    }),
    0 == getCookie("_rr_beta") && $("body").addClass("announceBeta")
});
var $area,
    $json,
    $config = {
        info: "",
        stream_url: [],
        url_program_noa: "",
        url_program_day: "",
        url_program_detail: "",
        radiru_twitter_timeline: ""
    },
    callback = function () {
        getCookie("_rr_Area") && "false" != getCookie("_rr_Area") && ($area = getCookie("_rr_Area")),
        getQuery("area") && ($area = getQuery("area"));
        var e = !1;
        $.each($config.stream_url, function () {
            $(this)[0].area === $area && (e =! 0)
        }),
        setCookie(
            "_rr_Area",
            $area = e
                ? $area
                : "tokyo",
            "/radio/",
            31536e6
        ),
        $("#areaOpen").on("click", function () {
            clearTimeout(t),
            $("#selectArea ul").slideToggle("fast")
        }).html(findAreaJP($area)),
        $("#selectArea ul ." + $area).addClass("this");
        var t = "";
        $("#selectArea ul,#areaOpen").mouseover(function () {
            clearTimeout(t)
        }),
        $("#selectArea ul,#areaOpen").mouseout(function () {
            clearTimeout(t),
            t = setTimeout(function () {
                $("#selectArea ul").hide()
            }, 250)
        }),
        $("#selectArea ul a").on("click", function () {
            $("#selectArea ul li").removeClass("this"),
            $area = $(this).parent("li").attr("class"),
            $(this).parent("li").addClass("this"),
            setCookie("_rr_Area", $area, "/radio/", 31536e6),
            $("#selectArea ul").slideUp("fast"),
            $("#areaOpen").html(findAreaJP($area)),
            getAPI()
        }),
        $("#selectRadio .r1 a").on("click", function () {
            openPlayer("r1")
        }),
        $("#selectRadio .r2 a").on("click", function () {
            openPlayer("r2")
        }),
        $("#selectRadio .fm a").on("click", function () {
            openPlayer("fm")
        }),
        getAPI(),
        $.getJSON(jsonpath, function (e) {
            $json = e.contents,
            makeList()
        }),
        $.getJSON(upper_banner_json, function (e) {
            $json2 = e.top,
            upperBanner()
        }),
        $.getJSON(top_banner_json, function (e) {
            $json3 = e.top,
            topBanner()
        }),
        $.get(info1path, function (e) {
            $xml = e,
            info1()
        }),
        $.ajax({
            url: info2path,
            cache: !0,
            dataType: "html",
            success: function (e) {
                console.log(info2path)
                $info2 = e,
                info2()
            
            },
            error: function () {
                console.log("err");
            }
            
        }),
        
        setTimeout(function () {
            $(".loader").fadeOut("fast")
        }, 3e3)
    },
    reload_timeout = "",
    $NOAjson = [],
    $images = {
        r1: "",
        r2: "",
        fm: ""
    };
function getAPI() {
    $.ajax({
        url: $config.url_program_noa.replace(/{area}/, findAreakey($area)),
        cache: !0,
        dataType: "json",
        success: function (e) {
            ($NOAjson =
                    { r1: !1,
                    r2: !1,
                    fm: !1
                }).r1 = e
                    .nowonair_list
                    .n1
                    .present,
            $NOAjson.r2 = e
                    .nowonair_list
                    .n2
                    .present,
            $NOAjson.fm = e
                    .nowonair_list
                    .n3
                    .present,
            $NOAjson.r1.title || ($NOAjson.r1 =
                    {
                    act: "",
                    ch: "",
                    content: "",
                    start_time: !1,
                    end_time: !1,
                    free: "",
                    hashtag: "",
                    index: 0,
                    link: "",
                    music: "",
                    programid: "",
                    rebroad: "",
                    sozaitani: "",
                    station: "",
                    subtitle: "",
                    title: "�医◆縺�縺�∪謾ｾ騾√�縺ゅｊ縺ｾ縺帙ｓ��",
                    url_goods: ""
                }),
            $NOAjson.r2.title || ($NOAjson.r2 =
                    {
                    act: "",
                    ch: "",
                    content: "",
                    start_time: !1,
                    end_time: !1,
                    free: "",
                    hashtag: "",
                    index: 0,
                    link: "",
                    music: "",
                    programid: "",
                    rebroad: "",
                    sozaitani: "",
                    station: "",
                    subtitle: "",
                    title: "�医◆縺�縺�∪謾ｾ騾√�縺ゅｊ縺ｾ縺帙ｓ��",
                    url_goods: ""
                }),
            $NOAjson.fm.title || ($NOAjson.fm =
                    {
                    act: "",
                    ch: "",
                    content: "",
                    start_time: !1,
                    end_time: !1,
                    free: "",
                    hashtag: "",
                    index: 0,
                    link: "",
                    music: "",
                    programid: "",
                    rebroad: "",
                    sozaitani: "",
                    station: "",
                    subtitle: "",
                    title: "�医◆縺�縺�∪謾ｾ騾√�縺ゅｊ縺ｾ縺帙ｓ��",
                    url_goods: ""
                });
                var t = 1e17,
            a = {
                        r1: !1,
                        r2: !1,
                        fm: !1
                    };
                if ($NOAjson.r1.start_time) 
                    try {
                        a.r1 = new Date($NOAjson
                            .r1
                            .end_time
                            .split("+")[0]
                            .split("-")
                            .join("/")
                            .replace(/T/, " ")).getTime() - (new Date).getTime()
                    }
                 catch (e) {
                    a.r1 = !1
                }
                if ($NOAjson.r2.start_time) 
                    try {
                        a.r2 = new Date($NOAjson
                            .r2
                            .end_time
                            .split("+")[0]
                            .split("-")
                            .join("/")
                            .replace(/T/, " ")).getTime() - (new Date).getTime()
                    }
                 catch (e) {
                    a.r2 = !1
                }
                if ($NOAjson.fm.start_time) 
                    try {
                        a.fm = new Date($NOAjson
                            .fm
                            .end_time
                            .split("+")[0]
                            .split("-")
                            .join("/")
                            .replace(/T/, " ")).getTime() - (new Date).getTime()
                    }
                 catch (e) {
                    a.fm = !1
                }
                if (
                    $NOAjson.r1.end_time, $NOAjson.r2.end_time, $NOAjson.fm.end_time, a.r1 && a.r1<t&&(t=a.r1), a.r2&&a.r2<t&&(t=a.r2), a.fm&&a.fm<t&&(t=a.fm), 1e17==t||((t+=1e3*(Math.floor(60*Math.random())+1))<=0&&(t=1e4), window.clearTimeout(reload_timeout), reload_timeout=window.setTimeout(getAPI, t)), $NOAjson.r1)try{$images.r1=$NOAjson.r1.images.thumbnail_m.url}catch(e){$images.r1="/radio/img/alt_images/r1.png"}if($NOAjson.r2)try{$images.r2=$NOAjson.r2.images.thumbnail_m.url}catch(e){$images.r2="/radio/img/alt_images/r2.png"}if($NOAjson.fm)try{$images.fm=$NOAjson.fm.images.thumbnail_m.url}catch(e){$images.fm="/radio/img/alt_images/fm.png"}dispMeta()}, error:function(){}})}function dispMeta(){if($("#selectRadio .r1 .title p").text(txt($NOAjson.r1.title)), $("#selectRadio .r1 .time").html(""), $NOAjson.r1.start_time){var e=new Date($NOAjson.r1.start_time.split("+")[0].split("-").join("/").replace(/T/, " ")).getTime(), t=new Date($NOAjson.r1.end_time.split("+")[0].split("-").join("/").replace(/T/, " ")).getTime();$("#selectRadio .r1 .c-time").html("<span>"+getTimeStr(12, e, "AMPM")+"</span>"+getTimeStr(12, e, "H:II")+"<span>-</span>"+getTimeStr(12, t, "H:II"))}if($("#selectRadio .r1 .picinner").css({"background-image":"url("+$images.r1.replace(/http:\/\//, "//").replace(/https:\/\//, "//")+")"}), $("#selectRadio .r2 .title p").text(txt($NOAjson.r2.title)), $("#selectRadio .r2 .time").html(""), $NOAjson.r2.start_time){e=new Date($NOAjson.r2.start_time.split("+")[0].split("-").join("/").replace(/T/, " ")).getTime(), t=new Date($NOAjson.r2.end_time.split("+")[0].split("-").join("/").replace(/T/, " ")).getTime();$("#selectRadio .r2 .c-time").html("<span>"+getTimeStr(12, e, "AMPM")+"</span>"+getTimeStr(12, e, "H:II")+"<span>-</span>"+getTimeStr(12, t, "H:II"))}if($("#selectRadio .r2 .picinner").css({"background-image":"url("+$images.r2.replace(/http:\/\//, "//").replace(/https:\/\//, "//")+")"}), $("#selectRadio .fm .title p").text(txt($NOAjson.fm.title)), $("#selectRadio .fm .time").html(""), $NOAjson.fm.start_time){e=new Date($NOAjson.fm.start_time.split("+")[0].split("-").join("/").replace(/T/, " ")).getTime(), t=new Date($NOAjson.fm.end_time.split("+")[0].split("-").join("/").replace(/T/, " ")).getTime();$("#selectRadio .fm .c-time").html("<span>"+getTimeStr(12, e, "AMPM")+"</span>"+getTimeStr(12, e, "H:II")+"<span>-</span>"+getTimeStr(12, t, "H:II"))}$("#selectRadio .fm .picinner").css({"background-image":"url("+$images.fm.replace(/http:\/\//, "//").replace(/https:\/\//, "//")+")"}), $("#nowOnair .loader").delay(700).fadeOut(200)}var $json2, $json3, $xml, $html1="", $html2="", $rcm1={}, $rcm2={};function makeList(){$i1=0, $i2=0, $.each($json, function(e){if(e<3)return!0;($(this)[0].url.indexOf("/radio/player/")>-1||$(this)[0].url.indexOf("/radio/ondemand/")>-1)&&($rcm1[$i1++]={media_code:$(this)[0].media_code, category:$(this)[0].category, program_name:$(this)[0].program_name.replace(/縲占�縺埼�＠驟堺ｿ｡縲�/, ""), headline:$(this)[0].headline, onair:$(this)[0].onair, url:$(this)[0].url, thumbnail:$(this)[0].thumbnail}), ($(this)[0].url.indexOf("/radio/magazine/")>-1||$(this)[0].url.indexOf("/radio/kodomoqmagazine/")>-1)&&($rcm2[$i2++]={media_code:$(this)[0].media_code, category:$(this)[0].category, program_name:$(this)[0].program_name.replace(/縲占ｪｭ繧繧峨§繧九ゅ�/, ""), headline:$(this)[0].headline, onair:$(this)[0].onair, url:$(this)[0].url, thumbnail:$(this)[0].thumbnail})}), $.each($rcm1, function(e){$html_ch=$rcm1[e].media_code.indexOf("R1")> -1
                    ? '<span class="flag r1">R1</span>'
                    : "",
                $rcm1[e].media_code.indexOf("R2") > -1 && ($html_ch += '<span class="flag r2">R2</span>'),
                $rcm1[e].media_code.indexOf("FM") > -1 && ($html_ch += '<span class="flag fm">FM</span>'),
                $html_url = $rcm1[e].url.indexOf("/radio/player/") > -1
                    ? "javascript:wopen('" + $rcm1[e].url + "')"
                    : $rcm1[e].url,
                $html_play = $rcm1[e].url.indexOf("/radio/player/") > -1
                    ? '<span class="icon-play"></span>'
                    : "",
                $html1 += '<li><a href="' + $html_url + '"><div class="pic"><div class="picinner" style="background-image:url(//' + $d + $rcm1[e].thumbnail + ')"></div>' + $html_play + '</div><div class="title"><h3><span class="sub">' + $rcm1[e].program_name + '</span><span class="main">' + $rcm1[e].headline + "</span></h3><p>" + $html_ch + "</p></div></a></li>"
            }
        ),
        $(".top-section.ondemand .top-list ul").html($html1),
        $.each($rcm2, function (e) {
            $html_cat = "",
            $cat_list = $rcm2[e].category.split(","),
            $.each($cat_list, function (e) {
                $cat_list[e].indexOf("髻ｳ讌ｽ") > -1
                    ? $html_cat += '<span class="cat1">' + $cat_list[e] + "</span>"
                    : $cat_list[e].indexOf("繧ｨ繝ｳ繧ｿ繝｡") > -1
                        ? $html_cat += '<span class="cat2">' + $cat_list[e] + "</span>"
                        : $cat_list[e].indexOf("譁�ｭｦ") > -1
                            ? $html_cat += '<span class="cat3">' + $cat_list[e] + "</span>"
                            : $cat_list[e].indexOf("豁ｴ蜿ｲ") > -1
                                ? $html_cat += '<span class="cat4">' + $cat_list[e] + "</span>"
                                : $cat_list[e].indexOf("雜｣蜻ｳ") > -1
                                    ? $html_cat += '<span class="cat5">' + $cat_list[e] + "</span>"
                                    : $cat_list[e].indexOf("繧ｫ繝ｫ繝√Ε繝ｼ") > -1
                                        ? $html_cat += '<span class="cat5">' + $cat_list[e] + "</span>"
                                        : $cat_list[e].indexOf("繧｢繝九Γ") > -1
                                            ? $html_cat += '<span class="cat6">' + $cat_list[e] + "</span>"
                                            : $cat_list[e].indexOf("繝槭Φ繧ｬ") > -1
                                                ? $html_cat += '<span class="cat6">' + $cat_list[e] + "</span>"
                                                : $cat_list[e].indexOf("縺上ｉ縺�") > -1
                                                    ? $html_cat += '<span class="cat7">' + $cat_list[e] + "</span>"
                                                    : $cat_list[e].indexOf("蛛･蠎ｷ") > -1
                                                        ? $html_cat += '<span class="cat7">' + $cat_list[e] + "</span>"
                                                        : $cat_list[e].indexOf("諠��ｱ") > -1
                                                            ? $html_cat += '<span class="cat8">' + $cat_list[e] + "</span>"
                                                            : $cat_list[e].indexOf("繧ｹ繝昴�繝�") > -1
                                                                ? $html_cat += '<span class="cat9">' + $cat_list[e] + "</span>"
                                                                : $cat_list[e].indexOf("螳牙ｿ�") > -1
                                                                    ? $html_cat += '<span class="cat10">' + $cat_list[e] + "</span>"
                                                                    : $cat_list[e].indexOf("螳牙�") > -1
                                                                        ? $html_cat += '<span class="cat10">' + $cat_list[e] + "</span>"
                                                                        : $cat_list[e].indexOf("蟄舌←繧らｧ大ｭｦ髮ｻ隧ｱ逶ｸ隲�") > -1
                                                                            ? $html_cat += '<span class="cat11">' + $cat_list[e] + "</span>"
                                                                            : "" != $cat_list[e]
                                                                                ? $html_cat += '<span class="brown">' + $cat_list[e] + "</span>"
                                                                                : $html_cat += "<span></span>"
            }),
            $html2 += '<li><a href="' + $rcm2[e].url + '" target="_blank"><div class="pic"><div class="picinner" style="background-image:url(//' + $d + $rcm2[e].thumbnail + ');"></div></div><div class="title"><h3><span class="sub">' + $rcm2[e].program_name + '</span><span class="main">' + $rcm2[e].headline + '</span></h3><div class="category">' + $html_cat + "</div></div></a></li>"
        }),
        $(".top-section.magazine .top-list ul").html($html2),
        $(".top-section .loader").delay(500).fadeOut(200)
    }
    function upperBanner() {
        if (0 != $json2.banner_list.length) {
            for (var e = $json2.banner_list.length, t = $(".information div.banner-carousel"), a = 0; a < e; a++) 
                "" == $json2.banner_list[a].url_click
                    ? t.append('<div class="banner-item"><a style="cursor:default;"><img src="' + $json2.banner_list[a].url_image + '" alt="' + $json2.banner_list[a].alt + '"></a></div>')
                    : t.append('<div class="banner-item"><a href="' + $json2.banner_list[a].url_click + '" target="_blank" rel="noopener noreferrer"><img src="' + $json2.banner_list[a].url_image + '" alt="' + $json2.banner_list[a].alt + '"></a></div>');
            
            $json2.banner_list.length < 4 && $(window).width() >= 768
                ? $(".banner-list").addClass("center")
                : $(".banner-list").size() && $(".banner-carousel").slick({
                    infinite: !0,
                    variableWidth: !0,
                    slidesToShow: 4,
                    speed: 500,
                    autoplay: !0,
                    autoplaySpeed: $json2.rotate_interval,
                    arrows: !1,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                centerMode: !0,
                                slidesToShow: 1
                            }
                        }
                    ]
                })
        } else 
            $(".banner-list").remove()
        
    }
    function topBanner() {
        for (var e = $json3.banner_list.length, t = $("#info2 div.bn-slider"), a = 0; a < e; a++) 
            "" == $json3.banner_list[a].url_click
                ? t.append('<div><a style="cursor:default;"><img src="' + $json3.banner_list[a].url_image + '" alt="' + $json3.banner_list[a].alt + '"></a></div>')
                : t.append('<div><a href="' + $json3.banner_list[a].url_click + '" target="_blank" rel="noopener noreferrer"><img src="' + $json3.banner_list[a].url_image + '" alt="' + $json3.banner_list[a].alt + '"></a></div>');
        
        1 == $json3.random_start && t.find("> li").each(function () {
            t
                .find("> li")
                .eq(Math.floor(Math.random() * e))
                .prependTo(t)
        }),
        e > 1
            ? slider1 = t.bxSlider({
                auto: !0,
                pause: $json3.rotate_interval,
                speed: 600,
                nextSelector: "#bn-slider-next",
                prevSelector: "#bn-slider-prev",
                onSlideAfter: function () {
                    slider1.startAuto()
                }
            })
            : t.addClass("noslide")
    }
    var $info2, boolR1, boolR2, boolFM, $info1 = {};
    function info1() {
        $($xml).find("Oshirase").each(function (e) {
            $info1[e] = {
                title: $(this).find("Title").text(),
                text: $(this).find("Text").text(),
                start: $(this).find("StartDate").text(),
                end: $(this).find("EndDate").text()
            }
        }),
        infohtml = "",
        $.each($info1, function (e) {
            returnDateObj($info1[e].start).getTime() - nowDate.getTime() < 0 && returnDateObj($info1[e].end).getTime() - nowDate.getTime() > 0 && (_s = txt($info1[e].title), _s.indexOf("[") > -1 && (_s1 = _s.substr(0, _s.lastIndexOf("[") - 1), _s2 = _s.substr(_s.lastIndexOf("["), _s.length), _s2.indexOf("]") > -1 && (_s = _s1 + "<span>" + _s2.replace(/\[/, "�ｻ").replace(/]/, "�ｽ") + "</span>")), _t = $info1[e]
                .text
                .replace(/<br><br>/g, "\n")
                .replace(/<br>/g, "\n"), infohtml += "<li><a>" + _s + "</a><p>" + htmltxt(_t) + "</p></li>")
        }),
        "" != infohtml
            ? ($("#info1 ul").html(infohtml), $("#info1").removeClass("hide"), $("#info1 ul a").on("click", function () {
                $(this).next("p").slideToggle("fast"),
                $("#info1 ul a")
                    .not($(this))
                    .next("p")
                    .slideUp("fast")
            }), $("#info1").css({opacity: 1}))
            : $("#info1").remove()
    }
    function info2() {
        var e = 0;
        info2html = "",
        _threshold = 2,
        $.each($($info2).find("li"), function () {
            _liclass = e < _threshold
                ? ""
                : ' class="hide"',
            info2html += "<li" + _liclass + ">" + $(this)
                .html()
                .replace(/�｡-�ｺ��-�夲ｼ�-�兢/g, function (e) {
                    return String.fromCharCode(e.charCodeAt(0) - 65248)
                })
                .replace(/縲/g, " ") + "</li>",
            e ++
        }),
        $("#info2 .text ul").html(info2html),
        e < _threshold + 1 || (_info2btn = 0, $("#info2 .btn").show().on("click", function () {
            0 == _info2btn
                ? ($("#info2 .text ul li.hide").addClass("disp"), $("#info2 .text ul li.hide").removeClass("hide"), _info2btn = 1, $("#info2 .btn a").addClass("close"), $("#info2 .btn a span").html("髢峨§繧�"))
                : ($("#info2 .text ul li.disp").addClass("hide"), $("#info2 .text ul li.disp").removeClass("disp"), _info2btn = 0, $("#info2 .btn a").removeClass("close"), $("#info2 .btn a span").html("縺顔衍繧峨○繧偵ｂ縺｣縺ｨ隕九ｋ"))
        }))
    }
    function returnDateObj(e) {
        return new Date(parseInt(e.substr(0, 4), 10), parseInt(e.substr(4, 2), 10) - 1, parseInt(e.substr(6, 2), 10), parseInt(e.substr(8, 2), 10), parseInt(e.substr(10, 2), 10))
    }
    function henkanMediaClass(e) {
        var t = "";
        return e.indexOf("05") > -1 && (t += "r1", boolR1 =! 0),
        e.indexOf("06") > -1 && (
            t += "" == t
                ? "r2"
                : " r2",
            boolR2 =! 0
        ),
        e.indexOf("07") > -1 && (
            t += "" == t
                ? "fm"
                : " fm",
            boolFM =! 0
        ),
        t
    }
    function henkanMediaName(e) {
        var t = "";
        return e.indexOf("05") > -1 && (t += '<span class="flag r1">R1</span>'),
        e.indexOf("06") > -1 && (t += '<span class="flag r2">R2</span>'),
        e.indexOf("07") > -1 && (t += '<span class="flag fm">FM</span>'),
        t
    }
    function getQuery(e) {
        var t = String(window.location.search).replace(/(.)(.+?)/, "$2");
        if ("" === e) 
            return t;
        
        _A = t.split("&");
        for (var a = 0, n = _A.length; n > a; a++) {
            var i = _A[a].split("=");
            if (2 === i.length && i[0] === e) 
                return i[1]
            
        }
        return !1
    }
    function getCookie(e) {
        if (!1 === navigator.cookieEnabled) 
            return !1;
        
        for (var t = String(document.cookie).replace(/\s+/g, "").split(";"), a = 0, n = t.length; n > a; a++) {
            var i = t[a].split("=");
            if (decodeURIComponent(i[0]) == e) 
                return decodeURIComponent(i[1])
            
        }
        return !1
    }
    function setCookie(e, t, a, n) {
        if (!1 === navigator.cookieEnabled) 
            return !1;
        
        var i = new Date;
        return i.setTime(i.getTime() + n),
        document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + "; path=" + a + "; expires=" + i.toUTCString(),
        !0
    }
    function getTimeStr(e, t, a) {
        var n = new Date(t);
        a = (a = a.split("YYYY").join(n.getFullYear())).split("YOBI").join([
            "譌･",
            "譛�",
            "轣ｫ",
            "豌ｴ",
            "譛ｨ",
            "驥�",
            "蝨�"
        ][n.getDay()]);
        var i = n.getMonth() + 1,
            r = n.getDate(),
            s = n.getHours(),
            l = n.getMinutes(),
            o = n.getSeconds();
        12 == e
            ? s >= 12
                ? (a = a.split("AMPM").join("蜊亥ｾ�"), s -= 12)
                : a = a.split("AMPM").join("蜊亥燕")
            : a = a.split("AMPM").join("");
        var c = i,
            m = r,
            p = s,
            $ = l,
            d = o;
        return 10 > c && (c = "0" + c),
        10 > m && (m = "0" + m),
        10 > p && (p = "0" + p),
        10 > $ && ($ = "0" + $),
        10 > d && (d = "0" + d),
        (a =( a =( a =( a =( a =( a =( a =( a =( a = a.split("MM").join(c)).split("DD").join(m)).split("HH").join(p)).split("II").join($)).split("SS").join(d)).split("M").join(i)).split("D").join(r)).split("H").join(s)).split("I").join(l)).split("S").join(o)
    }
    var exchgCh = {
            r1: "n1",
            r2: "n2",
            fm: "n3"
        }, exchgCh2 = {
            r1: "繝ｩ繧ｸ繧ｪ隨ｬ1",
            r2: "繝ｩ繧ｸ繧ｪ隨ｬ2",
            fm: "NHK-FM"
        };
    function removehtmltag(e) {
        return e.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
    }
    function txt(e) {
        return null == e
            ? ""
            : (e = e.replace(/�｡-�ｺ��-�夲ｼ�-�兢/g, function (e) {
                return String.fromCharCode(e.charCodeAt(0) - 65248)
            }))
                .replace(/縲/g, " ")
                .replace(/��/g, ":")
                .replace(/��/g, "/")
                .replace(/��/g, ".")
                .replace(/��/g, "-")
                .replace(/ +/g, " ")
                .replace(/^ +/g, "")
                .replace(/ +$/g, "")
                .replace(/</g, "��")
                .replace(/>/g, "��")
                .replace(/��/g, ", ")
                .replace(/�､/g, "縲�")
                .replace(/�｢/g, "縲�")
                .replace(/�｣/g, "縲�")
                .replace(/�･/g, "繝ｻ")
                .replace(/  /g, " ")
                .replace(/\n/g, "<br>")
    }
    function htmltxt(e) {
        return null == e
            ? ""
            : (e = e.replace(/�｡-�ｺ��-�夲ｼ�-�兢/g, function (e) {
                return String.fromCharCode(e.charCodeAt(0) - 65248)
            }))
                .replace(/縲/g, " ")
                .replace(/��/g, ":")
                .replace(/��/g, "/")
                .replace(/��/g, ".")
                .replace(/��/g, "-")
                .replace(/ +/g, " ")
                .replace(/^ +/g, "")
                .replace(/ +$/g, "")
                .replace(/��/g, ", ")
                .replace(/�､/g, "縲�")
                .replace(/�｢/g, "縲�")
                .replace(/�｣/g, "縲�")
                .replace(/�･/g, "繝ｻ")
                .replace(/  /g, " ")
                .replace(/\n/g, "<br>")
    }
    function findAreakey(e) {
        var t;
        return $.each($config.stream_url, function (a) {
            $(this)[0].area == e && (t = $(this)[0].areakey)
        }),
        t
    }
    function findAreaJP(e) {
        var t;
        return $.each($config.stream_url, function (a) {
            $(this)[0].area == e && (t = $(this)[0].areajp)
        }),
        t
    }
    function openPlayer(e) {
        ua.isiOS || ua.isAndroid
            ? location.href = "./player/?ch=" + e
            : wopen("./player/?ch=" + e)
    }
    function wopen(e) {
        window.open(e, "rr", "width=360,height=810,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no").focus()
    }
    void 0 === window.console && (window.console = {
        log: function () {}
    });
    var _splash = {
        Active: !1,
        setup: function () {
            if (getCookie("RRsplash_lock3") && "on" == getCookie("RRsplash_lock3")) 
                return !1;
            
            if (-1 != String(document.referrer).indexOf("/radio/")) 
                return !1;
            
            var e = {
                enq: {
                    count: 0,
                    utime: 0
                }
            };
            getCookie("RRsplash_count3") && (e.enq.count = Number(getCookie("RRsplash_count3"))),
            getCookie("RRsplash_utime3") && (e.enq.utime = Number(getCookie("RRsplash_utime3"))),
            (new Date).getDate() != new Date(e.enq.utime).getDate() && (e.enq.count = 0, e.enq.utime = 0),
            e.enq.count ++,
            e.enq.utime = (new Date).getTime(),
            setCookie("RRsplash_count3", e.enq.count, "/radio/", 31536e6),
            setCookie("RRsplash_utime3", e.enq.utime, "/radio/", 31536e6),
            e.enq.count,
            _splash.Active = !0,
            $("#splash_box").slideDown(500),
            $("#splash_cont,#splash_bgb,#splash_close,#splash_delete").click(function () {
                "splash_delete" == $(this).attr("id") && setCookie("RRsplash_lock3", "on", "/radio/", 31536e6),
                $("#splash_box").slideUp(500, function () {
                    _splash.done()
                })
            })
        },
        done: function () {
            $("#splash_cont,#splash_bgb,#splash_img").remove(),
            _splash.Active = !1
        }
    };
;