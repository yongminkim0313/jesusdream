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

    io.on('connection', socket => {
        
        var currentUserList = function(cb){
            var userList = [];
            var ns = io.of("/");
            if (ns) {
                ns.sockets.forEach((value, key, map) => {
                    userList.push({
                        id      :   key,
                        name    :   value.handshake.query.name,
                        profileImage : value.handshake.query.profileImage,
                    })
                });
            }
            cb(userList);
        }
        
        socket.on('connect users',(args,callback)=>{
            console.log('connect users');
            currentUserList((userList)=>{
                console.log('connect users',userList);
                socket.broadcast.emit('after connect users',userList);
                callback(userList);
            });
        });
        
        socket.on('disconnect', () => { 
            winston.info("@ socket disconnect @@@@"); 
            
            currentUserList((userList)=>{
                console.log('userList::::', userList);
                socket.broadcast.emit('after connect users', userList);
            })
        });
        socket.on('reconnecting', () => { winston.info("@ socket reconnecting @@@@"); });
        socket.on('reconnection', () => { winston.info("@ socket reconnection @@@@"); });
        socket.on('aply', (data) => {
            console.log('aply', data);
            socket.broadcast.emit('aply', data);
        });
        socket.on('sendMsg',(chat,callback)=>{
            console.log(chat);
            io.to(chat.t).send(chat);// on('message') 로 받는다.
            callback(chat)
        })
        winston.info(`socket.io connected`);
    });
    return io;
}