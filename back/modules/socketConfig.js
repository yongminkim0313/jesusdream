module.exports = (app, winston) => {
    const options = {
        maxHttpBufferSize: 1e8,
        cors: {
            origin: '*',
        },
        cookie: true
    }; //1e6: 1MB
    const server = require('http').createServer(app);
    const io = require('socket.io')(server, options);
    server.listen(4000);

    var userList = [];
    io.on('connection', socket => {
        
        //사용자가 호출 
        socket.on('set userInfo',(userInfo, callback)=>{
            userList.push({id : socket.id, userInfo : userInfo});
            socket.broadcast.emit('connect user info', userList);
            callback('success send user info !!');
        });

        socket.on('connect users',(args,callback)=>{
            var ns = io.of("/");
            var temp = []
            if (ns) {
                ns.sockets.forEach((value, key, map) => {
                    var a = userList.find((el)=>{return el.id == key})
                    temp.push(a);
                });
            }
            userList = temp;
            callback(userList);
        });
        
        socket.on('disconnect', () => { 
            winston.info("@ socket disconnect @@@@"); 
            const idx = userList.findIndex(function(el){return el.id==socket.id});
            if(idx > -1) userList.splice(idx,1);
            socket.broadcast.emit('connect user info', userList);
        });
        socket.on('reconnecting', () => { winston.info("@ socket reconnecting @@@@"); });
        socket.on('reconnection', () => { winston.info("@ socket reconnection @@@@"); });
        socket.on('aply', (data) => {
            console.log('aply', data);
            socket.broadcast.emit('aply', data);
        });
        socket.on('sendMsg',(user)=>{
            console.log(user);
            io.to(user.id).send({msg : user.msg, userInfo: user.userInfo});
        })
        socket.on('sendMsgUser', (data) => {
            data.socketId = socket.id;
            for (var i = 0; i < userList.length; i++) {
                var user = userList[i];
                console.log('user.customerName:  ', user.customerName);
                if (user.customerName == data.customerName) {
                    io.to(user.id).send(data);
                    break;
                }
            }
        });
        winston.info(`socket.io connected`);
    });
    return io;
}