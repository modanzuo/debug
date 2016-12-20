<?
function GetIP(){
if(!empty($_SERVER["HTTP_CLIENT_IP"])){
  $cip = $_SERVER["HTTP_CLIENT_IP"];
}
elseif(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
  $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
}
elseif(!empty($_SERVER["REMOTE_ADDR"])){
  $cip = $_SERVER["REMOTE_ADDR"];
}
else{
  $cip = "无法获取！";
}
return $cip;
}
$ip=GetIP();
$ip="192.168.1.145";

  $debug=empty($_GET['debug'])?'123':$_GET['debug'];
echo 'function init() {
    try {     
        var debug ="'.$debug.'";
        var socket = io.connect("'.$ip.':3001");
        var userid = new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
        var userobj = {
            userid: userid,
            debug:debug,
            userAgent:window.navigator.userAgent
        }
        socket.emit("login", userobj)
        console.log = function(obj) {
            var str = { data: obj, type: typeof obj };
            if (typeof obj === "object") {
                str["data"] = JSON.stringify(obj);
                str["type"] = typeof obj;
            }
            userobj.str = str;
            socket.emit("log", userobj)

        }
        console.info = function(obj) {
            var str = { data: obj, type: typeof obj };
            if (typeof obj === "object") {
                 str["data"] = JSON.stringify(obj);
                str["type"] = typeof obj;
            }
            userobj.str = str;
            socket.emit("info", userobj)

        }

        console.errer = function(obj) {
            var str = { data: obj, type: typeof obj };
            if (typeof obj === "object") {
                str["data"] = JSON.stringify(obj);
                str["type"] = typeof obj;
            }
            userobj.str = str;
            socket.emit("errer", userobj);
        }
    } catch (e) {
    	 console.info(1111);
        setTimeout(init, 500);
    }


}
init();';
