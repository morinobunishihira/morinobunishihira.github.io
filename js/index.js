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
        // cache: !0,
        cache: false,
        dataType: "xml"
    })
    .then (
        function(data) {
            console.log("config_web=success");
            $config.info = data.find("info").eq(0).text(),
            data.find("stream_url data").each(function() {
                $config.stream_url.push ({
                    areajp: $this.find("areajp").text(),
                    area: $this.find("area").text(),
                })
            })
            console.log($config.info);
        },
        function() {
            alert("err");
        }

    )      
    
});     
var $config = {
    info: "",
}