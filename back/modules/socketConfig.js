module.exports = (app, winston) => {
    const options = {
        maxHttpBufferSize: 1e8,
        path: '/msg/',
        cors: {
            origin: '*',
        },
        cookie: true
    }; //1e6: 1MB
    const server = require('http').createServer(app);
    const io = require('socket.io')(server, options);
    const cookie = require('cookie');
    server.listen(4000);

    var userList = [];
    io.on('connection', socket => {

        socket.on('disconnect', () => { winston.info("@ socket disconnect @@@@"); });
        socket.on('reconnecting', () => { winston.info("@ socket reconnecting @@@@"); });
        socket.on('reconnection', () => { winston.info("@ socket reconnection @@@@"); });

        socket.on('order', (data) => {
            console.log('order', data.order);

            var userInfo = new Object();
            userInfo['customerName'] = data.order.customerName;
            userInfo['id'] = socket.id;
            userList.push(userInfo);
            socket.broadcast.emit('order', 'refresh');
        });

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