    var login = {
        $root:"",
        init: function() {
            $root=$(".console-cont");
            var me = this;
            var debug = window.location.href.match(/[\?|&]debug\=([0-9a-zA-Z\-_@]+)/);
            var userid = new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
            debug=debug&&debug[1]?debug[1]:'';
            var socket = io.connect('http://nophp.com:3001');
            var userobj = {
                userid: userid,
                debug:debug
            }
            socket.emit('adminLogin', userobj);
            //接收登录
            socket.on("login", function(obj) {
                console.info(obj);
                $root.prepend("<p>有新用户链接成功:"+obj.userAgent+"</p>")
            });

            socket.on("log", function(obj) {
                 var data=obj['str']
                 $root.prepend("<p class='log'>"+data['data']+"</p>")
            })
            socket.on("info", function(obj) {
                 var data=obj['str']
                $root.prepend("<p class='info'>"+data['data']+"</p>")
            })
            socket.on("errer", function(obj) {
                   var data=obj['str']
               $root.prepend("<p class='errer'>"+data['data']+"</p>")
            })
        }
    }
    try {
        if (!io) {
            login.init();
        }
    } catch (e) {
        setTimeout(login.init, 500);
    }
