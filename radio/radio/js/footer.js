// ///////繧峨§繧銀�繧峨§繧� 蜈ｱ騾壹ヵ繝�ち/////////
function _rrCallback3() {
    $.ajax({
        type: "GET",
        url: "https://www.nhk.or.jp/radio/include/footer.html",
        dataType: "html",
        success: function (a) {
            console.log("j")
            $("#_rrfooter").append(a)
        },
        error: function () {
            console.log("err");
        }
    })
}
document.write('<div id="_rrfooter" class="_rr"></div>'),
"undefined" != typeof jQuery
    ? _rrCallback3()
    : (
        _rrJQueryScript = document.createElement("script"),
        _rrJQueryScript.src = "/common/jquery/jquery-2.2.js",
        _rrJQueryScript.addEventListener
            ? _rrJQueryScript.addEventListener("load", _rrCallback3, !1)
            : _rrJQueryScript.readyState && (_rrJQueryScript.onreadystatechange = _rrCallback3),
        document.body.appendChild(_rrJQueryScript)
    );