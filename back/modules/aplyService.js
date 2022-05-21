const autoIncrement = require('mongoose-auto-increment');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

module.exports = (app, mongoose, winston) => {
    autoIncrement.initialize(mongoose);
    const aplySchema = new mongoose.Schema({
        seq: Number,
        campNo: Number,
        aplySummary: Array,
        aplyNope: Number, //신청인원
        aplyTotAmt: Number, //신청총금액
        aplyPrgrs: String, //신청진행상황(접수, 접수완료, 신청취소)
        aplyDt: String, //신청일시
        rgtrNm: String,
        rgtrDt: String,
        updtNm: String,
        updtDt: String,
        etc: String,
        saved: {
            type: Boolean,
            default: true
        }
    });

    const campInfoSchema = new mongoose.Schema({
        campNo: Number,//캠프번호
        campTtlNm: String,//캠프명
        campPhotoFileList: Array,//캠프사진리스트
        campAmtList: Array,//캠프금액리스트
        actno: String, //계좌번호
        amt: Number,
        list_order: Number,
        menu_type: String,
        saved: {
            type: Boolean,
            default: true
        }
    });

    orderSchema.plugin(autoIncrement.plugin, {
        model: 'order',
        field: 'seq',
        startAt: 1, //시작 
        increment: 1 // 증가 
    });

    menuSchema.plugin(autoIncrement.plugin, {
        model: 'Menu',
        field: 'menu_no',
        startAt: 1, //시작 
        increment: 1 // 증가 
    });

    const Order = mongoose.model("Order", orderSchema);
    const Menu = mongoose.model("Menu", menuSchema);

    app.post('/menu', (req, res) => {
        console.log('post) menu insert!');
        res.json({ result: 'success' });
    });

    app.get('/menu', (req, res) => {
        console.log('get) menu select!');
        res.json({ result: 'success' });
    });

    app.put('/menu', (req, res) => {
        console.log('put) menu update!');
        res.json({ result: 'success' });
    });

    app.delete('/menu', (req, res) => {
        console.log('delete) menu delete!');
        res.json({ result: 'success' });
    });

    app.post('/orders', (req, res) => {
        console.log(req.body);
        for (var item of req.body) {
            if (!item.seq) item.seq = 0;

            item.orderDate = moment().format('YYYY-MM-DD');
            item.socketId = 0;

            var order = new Order({
                no: item.no,
                orderSummary: item.orderSummary,
                orderDate: moment().format('YYYY-MM-DD'),
                amt: item.amt
            });
            Order.findOne({ orderDate: item.orderDate, seq: item.seq, no: item.no }).exec(function(err, orderOne) {
                if (orderOne) {
                    Order.updateOne({ orderDate: item.orderDate, seq: item.seq, no: item.no }, {
                            $set: {
                                orderSummary: item.orderSummary,
                                amt: item.amt
                            }
                        })
                        .then(() => {
                            console.log(item);
                        })
                        .catch((err) => {
                            console.log("Error : " + err);
                        })
                        .then(() => {
                            res.json({ result: 'success' });
                        });
                } else {
                    order.save()
                        .then(() => {
                            console.log(order);
                        })
                        .catch((err) => {
                            console.log("Error : " + err);
                        })
                        .then(() => {
                            res.json({ result: 'success' });
                        });
                }
            })
        }
    });


    app.post('/loadOrderList', (req, res) => {
        console.log('loadOrderList');
        Order.find({ orderDate: moment().format('YYYY-MM-DD') }).sort({ seq: 'desc' }).exec(function(err, orderList) {
            if (err) res.json({ result: -1 })
            res.json(orderList);
        })
    });

    app.post('/historyList', (req, res) => {
        console.log('historyList')
        var item = req.body;
        var searchDate = moment().format('YYYY-MM-DD')
        if (item._id) {
            searchDate = item._id;
            console.log(item);
        }
        Order.find({ orderDate: searchDate }).sort({ seq: 'desc' }).exec(function(err, orderList) {
            if (err) res.json({ result: -1 })
            res.json(orderList);
        })
    });

    app.post('/delOrderList', (req, res) => {
        console.log('delOrderList', req.body);
        var order = req.body
        if (!order.seq) order.seq = 0;
        console.log('order.seq', order.seq);
        Order.remove(order)
            .then(() => {
                res.json.sendStatus(200);
            })
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
    app.post('/findOrderList', (req, res) => {
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
        result = Order.aggregate([{
                '$group': {
                    '_id': '$orderDate',
                    'count': { '$sum': 1 },
                    'totalAmt': { '$sum': '$amt' }
                },
            }, {
                '$sort': {
                    '_id': -1
                }
            }],
            (error, result) => {
                if (result) res.json(result);
            }
        );
    });

    app.post('/loadMenuList', (req, res) => {
        Menu.find().sort({ menu_no: 'desc' }).exec(function(err, menuList) {
            if (err) res.json({ result: -1 })
            res.json(menuList);
        });
    })

    app.post('/loadMenuListType', (req, res) => {
        Menu.find().sort({ menu_no: 'desc' }).exec(function(err, menuList) {
            if (err) res.json({ result: -1 })
            res.json(menuList);
        });

        // db.getList('test', 'loadMenuList', {})
        //     .then(data => {
        //         var type = {};
        //         for (var item of data) {
        //             if (type[item.menu_type]) {
        //                 type[item.menu_type].push(item);
        //             } else {
        //                 type[item.menu_type] = [item];
        //             }
        //             item.cnt = 0;
        //         }
        //         res.json(type);
        //     })
    })

    app.post('/saveMenuList', (req, res) => {
        var reqMenuList = req.body;
        // db.getList('test', 'loadMenuList', {})
        //     .then(data => {
        //         for (var item of data) {
        //             var s = reqMenuList.find(data => {
        //                 return data.menu_no == item.menu_no
        //             });
        //             if (s.src != item.src || s.amt != item.amt || s.title != item.title) {
        //                 console.log('deferent::::', s, item);
        //                 db.setData('test', 'saveMenuList', s)
        //                     .then(data => {
        //                         console.log(data);
        //                     })
        //             }
        //         }
        //     })
        //     .catch()
        //     .then(() => {
        //         res.json({ result: 'success' })
        //     })

    });
}