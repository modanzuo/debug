function init() {
    try {
     
        var debug = window.location.href.match(/[\?|&]debug\=([0-9a-zA-Z\-_@]+)/);
          debug=debug&&debug[1]?debug[1]:'';

        var socket = io.connect('http://192.168.1.145:3001');
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
                str['data'] = JSON.stringify(data);
                str['type'] = typeof obj;
            }
            userobj.str = str;
            socket.emit("log", userobj)

        }
        console.info = function(obj) {
            var str = { data: obj, type: typeof obj };
            if (typeof obj === "object") {
                str['data'] = JSON.stringify(obj);
                str['type'] = typeof obj;
            }
            userobj.str = str;
            socket.emit("info", userobj)

        }

        console.errer = function(obj) {
            var str = { data: obj, type: typeof obj };
            if (typeof obj === "object") {
                str['data'] = JSON.stringify(data);
                str['type'] = typeof obj;
            }
            userobj.str = str;
            socket.emit("errer", userobj);
        }
    } catch (e) {
    	 console.info(1111);
        setTimeout(init, 500);
    }


}

init();
