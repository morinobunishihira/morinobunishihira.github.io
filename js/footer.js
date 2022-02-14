/////////らじる★らじる 共通フッタ/////////

function _rrCallback3() {
    $.ajax({
        type: "GET",
        url: "/include/footer.html",
        dataType: "html",
        success: function(a) {
            $("#_rrfooter").append(a)
        },
        error: function() {}
    })
}
document.write('<div id="_rrfooter" class="_rr"></div>'),
"undefined" != typeof jQuery ? _rrCallback3() : (_rrJQueryScript = document.createElement("script"),
_rrJQueryScript.src = "/common/jquery/jquery-2.2.js",
_rrJQueryScript.addEventListener ? _rrJQueryScript.addEventListener("load", _rrCallback3, !1) : _rrJQueryScript.readyState && (_rrJQueryScript.onreadystatechange = _rrCallback3),
document.body.appendChild(_rrJQueryScript));
