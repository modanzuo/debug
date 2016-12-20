var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io').listen(server);
server.listen(3001, function() {
    console.log("3001");
});

//在线用户
var onlineUsers = {};
//在线用户服务对象
var onlineUsersSever = {};

app.get('/*', function(req, res) {
    res.sendfile(__dirname + req.originalUrl);
});

io.sockets.on('connection', function(socket) {

    socket.on("adminLogin", function(obj) {
        socket.name = obj.userid;
        if (!onlineUsers.hasOwnProperty(socket.debug)) {
            onlineUsers[obj.debug] = [];
        }
        if (!onlineUsers[obj.debug][obj.userid]) {
            onlineUsers[obj.debug].push(obj.userid);
            onlineUsersSever[obj.userid] = socket;
        }
    })

    socket.on("login", function(obj) {
        socket.name = obj.userid;
        if (obj.debug && onlineUsers[obj.debug]) {
            var data = onlineUsers[obj.debug];
            for (var i = data.length - 1; i >= 0; i--) {
                var id = data[i];
                console.log("login")
                onlineUsersSever[id].emit("login", obj);
            };
        }
    });

    socket.on("log", function(obj) {
         if (obj.debug && onlineUsers[obj.debug]) {
            var data = onlineUsers[obj.debug];
            for (var i = data.length - 1; i >= 0; i--) {
                var id = data[i];
                onlineUsersSever[id].emit("log", obj);
            };
        }

    })
    socket.on("info", function(obj) {
         if (obj.debug && onlineUsers[obj.debug]) {
            var data = onlineUsers[obj.debug];
            for (var i = data.length - 1; i >= 0; i--) {
                var id = data[i];
                onlineUsersSever[id].emit("info", obj);
            };
        }
    })
    socket.on("errer", function(obj) {
        if (obj.debug && onlineUsers[obj.debug]) {
            var data = onlineUsers[obj.debug];
            for (var i = data.length - 1; i >= 0; i--) {
                var id = data[i];
                onlineUsersSever[id].emit("errer", obj);
            };
        }
    })
});
