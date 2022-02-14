// ///////繧峨§繧銀�繧峨§繧� 繝医ャ繝励�繝ｼ繧ｸ/////////
var $d = document.domain.indexOf("stg-") > -1 || document.domain.indexOf("dev-") > -1
        ? document.domain
        : "morinobunishihira.github.io",
    domain = "https://" + $d,
    nowDate = new Date;
    console.log(domain);    
    console.log(nowDate);   
$(function() {
    $.ajax({
        url: "https://morinobunishihira.github.io/config/config_web.xml",
        cache: !0,
        dataType: "xml"
    })
    .then (
        function(data) {
            console.log("success");

            $config.info = $(data).find("info").eq(0).text(),
            $(data).find("stream_url data").each(function() {
                $config.stream_url.push ({
                    areajp: $(this).find("areajp").text(),
                    area: $(this).find("area").text(),
                    apikey: $(this).find("apikey").text(),
                    areakey: $(this).find("areakey").text(),
                    r1hls: $(this).find("r1hls").text(),
                    r2hls: $(this).find("r2hls").text(),
                    fmhls: $(this).find("fmhls").text()
                })
            }),
            $config.url_program_noa = $(data)
                .find("url_program_noa")
                .eq(0)
                .text(),
            $config.url_program_day = $(data)
                .find("url_program_day")
                .eq(0)
                .text(),
            $config.url_program_detail = $(data)
                .find("url_program_detail")
                .eq(0)
                .text(),
            $config.radiru_twitter_timeline = $(data)
                .find("radiru_twitter_timeline")
                .eq(0)
                .text(),
            console.log($config);    
            // callback();
        },
        function() {
            alert("err");
        }

    )      
    
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
            $(this)[0].area === $area && (data =! 0)
        }),
        setCookie(
            "_rr_Area",
            $area = data
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
            $json = data.contents,
            makeList()
        }),
        $.getJSON(upper_banner_json, function (e) {
            $json2 = data.top,
            upperBanner()
        }),
        $.getJSON(top_banner_json, function (e) {
            $json3 = data.top,
            topBanner()
        }),
        $.get(info1path, function (data) {
            $xml = data,
            info1()
        }),
        $.ajax({
            url: info2path,
            cache: !0,
            dataType: "html",
            success: function (data) {
                console.log(info2path)
                $info2 = data,
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
;    
