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
        dataType: "xml",
    })
    .then(
        data => {
            var $config;
            $config.info = $(data)
                .find("info")
                .eq(0)
                .text(),
                console.log($config.info);
        },
        error => {
            alert("err");
        }
      );       


})     