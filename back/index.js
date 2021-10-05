require("dotenv").config();
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const winston = require('./modules/winstonConfig');
const moment = require('moment');
const morgan = require('morgan');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const app = express();

app.use(morgan('combined', { stream: winston.stream }));
app.use(require('cors')({ origin: true, credentials: true }));
app.use(express.json());
app.listen(process.env.SERVER_PORT, () => {
    winston.info(`start http://localhost:${process.env.SERVER_PORT}`);
})
console.log();

const io = require('./modules/socketConfig')(app, winston);
const db = require('./modules/dbConnect');

mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true
    }).then(() => {
        winston.info('mongoose connected!')
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        }
    });

app.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/testdb',
        dbName: "testdb",
        stringify: false,
    }),
    cookie: {
        maxAge: 1000 * 60 * 1,
        httpOnly: false,
    }
}));

autoIncrement.initialize(mongoose);
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

const orderSchema = new mongoose.Schema({
    seq: Number,
    no: Number,
    orderSummary: Array,
    amt: Number,
    progress: String,
    socketId: String,
    orderDate: String,
    saved: {
        type: Boolean,
        default: true
    }
});

orderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'seq',
    startAt: 1, //시작 
    increment: 1 // 증가 
});

const Order = mongoose.model("Order", orderSchema);

app.post('/saveOrderList', (req, res) => {
    console.log(req.body);
    for (var item of req.body) {
        if (!item.seq) item.seq = 0;

        item.orderDate = moment().format('YYYY-MM-DD');
        item.socketId = 0;

        db.getData('test', 'countOrder', item)
            .then(data => {
                console.log('saveOrderList cnt', data);
                if (data.cnt) {
                    db.setData('test', 'updateOrderList', item)
                } else {
                    db.setData('test', 'insertOrderList', item)
                }
            })
            .catch()
            .then(() => {
                res.json({ result: 'success' });
            })
            //     var order = new Order({
            //         no: item.no,
            //         orderSummary: item.orderSummary,
            //         orderDate: moment().format('YYYY-MM-DD'),
            //         amt: item.amt
            //     });
            //     Order.findOne({ orderDate: item.orderDate, seq: item.seq, no: item.no }).exec(function(err, orderOne) {
            //         if (orderOne) {
            //             Order.updateOne({ orderDate: item.orderDate, seq: item.seq, no: item.no }, {
            //                     $set: {
            //                         orderSummary: item.orderSummary,
            //                         amt: item.amt
            //                     }
            //                 })
            //                 .then(() => {
            //                     console.log(item);
            //                 })
            //                 .catch((err) => {
            //                     console.log("Error : " + err);
            //                 })
            //                 .then(() => {
            //                     res.json({ result: 'success' });
            //                 });
            //         } else {
            //             order.save()
            //                 .then(() => {
            //                     console.log(order);
            //                 })
            //                 .catch((err) => {
            //                     console.log("Error : " + err);
            //                 })
            //                 .then(() => {
            //                     res.json({ result: 'success' });
            //                 });
            //         }
            //     })
    }
});
app.post('/loadOrderList', (req, res) => {
    console.log('loadOrderList');
    db.getList('test', 'loadOrderList', { orderDate: moment().format('YYYY-MM-DD') })
        .then(data => {
            for (var item of data) {
                item.orderSummary = JSON.parse(item.orderSummary);
            }
            res.json(data);
        })
        .catch(err => {
            res.json({ result: -1 })
        })
        // Order.find({ orderDate: moment().format('YYYY-MM-DD') }).sort({ seq: 'desc' }).exec(function(err, orderList) {
        //     if (err) res.json({ result: -1 })
        //     res.json(orderList);
        // })
});

app.post('/historyList', (req, res) => {
    console.log('historyList')
    var item = req.body;
    var searchDate = moment().format('YYYY-MM-DD')
    if (item._id) {
        searchDate = item._id;
        console.log(item);
    }

    db.getList('test', 'historyList', { orderDate: searchDate })
        .then(data => {
            console.log('orderSummary', data);
            for (var item of data) {
                item.orderSummary = JSON.parse(item.orderSummary);
            }
            res.json(data);
        })
        .catch(err => {
            res.json({ result: -1 })
        })
        // Order.find({ orderDate: searchDate }).sort({ seq: 'desc' }).exec(function(err, orderList) {
        //     if (err) res.json({ result: -1 })
        //     res.json(orderList);
        // })
});

app.post('/delOrderList', (req, res) => {
    console.log('delOrderList')
    var order = req.body
    db.delData('test', 'delOrderList', order)
        .then(data => {
            console.log(data);
        })
        // Order.remove(order)
        //     .then(() => {
        //         res.json.sendStatus(200);
        //     })
});

app.post('/getUserInfo', (req, res) => {
    console.log(req.session);
    res.json(req.session);
});

app.post('/order', (req, res) => {
    const order = new Order(req.body.order);
    order.orderDate = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(req.body.order);

    req.session.customerName = order.customerName;
    req.session.save(function() {
        order.save()
            .then(() => {
                console.log(order);
            })
            .catch((err) => {
                console.log("Error : " + err);
            })
            .then(() => {
                res.sendStatus(200);
            });
    });
});
app.get('/findOrderList', (req, res) => {
    console.log('findOrderList')
    Order.find({ progress: '접수' }).sort({ seq: 1 }).exec(function(err, orderList) {

        if (err) res.json({ result: -1 })

        res.json(orderList);
    })
});

app.post('/cancleOrder', (req, res) => {
    console.log('cancleOrder', req.body);
    Order.deleteOne({ seq: req.body.seq }).exec(function(err) {

        if (err) res.json({ result: -1 })

        res.json({ result: 1 });
    })
});

app.post('/getOrderDate', (req, res) => {
    db.getList('test', 'getOrderDate', {})
        .then(data => {
            res.json(data);
        })

    // result = Order.aggregate([{
    //         '$group': {
    //             '_id': '$orderDate',
    //             'count': { '$sum': 1 },
    //             'totalAmt': { '$sum': '$amt' }
    //         },
    //     }, {
    //         '$sort': {
    //             '_id': -1
    //         }
    //     }],
    //     (error, result) => {
    //         if (result) res.json(result);
    //     }
    // );
});