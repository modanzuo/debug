(function() {
var debug = window.location.href.match(/[\?|&]debug\=([0-9a-zA-Z\-_@]+)/);

var _ioUrl = document.createElement("script");
_ioUrl.src = "http://nophp.com/danconsole/js/socket.io/socket.io.js";

var _debugUrl = document.createElement("script");
_debugUrl.src = "http://nophp.com/danconsole/js/debug.js?debug="+debug;

var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(_ioUrl, s);
s.parentNode.insertBefore(_debugUrl, s);
})();