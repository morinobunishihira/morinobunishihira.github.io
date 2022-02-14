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
;    
