const autoIncrement = require('mongoose-auto-increment');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

module.exports = (app, mongoose, winston) => {
    autoIncrement.initialize(mongoose);

    const campSchema = new mongoose.Schema({
        campNo: Number,//캠프번호
        campTtlNm: String,//캠프명
        campPhotoFileList: Array,//캠프사진리스트
        campAmtList: Array,//캠프금액리스트
        actno: String, //계좌번호
        amt: Number,
        list_order: Number,
        camp_type: String,
        saved: {
            type: Boolean,
            default: true
        }
    });

    const youtubeSchema = new mongoose.Schema({
        seq : Number,
        sn : Number,
        type : String,
        title : String,
        subtitle : String,
        src : String,
    })

    campSchema.plugin(autoIncrement.plugin, {
        model: 'Camp',
        field: 'campNo',
        startAt: 1, //시작 
        increment: 1 // 증가 
    });
    
    youtubeSchema.plugin(autoIncrement.plugin, {
        model: 'youtube',
        field: 'seq',
        startAt: 1, //시작 
        increment: 1 // 증가 
    });

    const Camp = mongoose.model("Camp", campSchema);

    const Youtube = mongoose.model('Youtube', youtubeSchema);

    app.post('/camp', (req, res) => {
        youtubeSchema
    });

    app.get('/camp', (req, res) => {
        console.log('get) camp select!');
        res.json({ result: 'success' });
    });

    app.put('/camp', (req, res) => {
        console.log('put) camp update!');
        res.json({ result: 'success' });
    });

    app.delete('/camp', (req, res) => {
        console.log('delete) camp delete!');
        res.json({ result: 'success' });
    });
/////////////////////////////////////////////////
    app.post('/admin/youtube', async(req, res) => {
        console.log('post) youtube insert!');
        try {
            if(req.session.auth!='admin'){
                res.status(401).json({msg:"관리자 로그인해주세요"});
            }
            const youtube = new Youtube(req.body);
            const one = await Youtube.findOne({src:youtube.src});
            if(one){
                res.status(400).json({ msg: '존재하는 주소입니다.' });
                return;
            }

            await youtube.save()
            .then(() => {res.status(200).json({ result: 'success' })})
            .catch((err) => {winston.error("Error : " + err)})
            .then(() => {});
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg: '유튜브 등록 실패'});
        }
    });

    app.get('/guest/youtube', (req, res) => {
        const query = req.query;
        Youtube.find(query).sort({type: 'desc', sn: 'asc' }).exec(function(err, youtube) {
            if (err) res.json({ result: -1 });
            res.status(200).json(youtube);
        })
    });

    app.put('/admin/youtube', async(req, res) => {
        console.log('put) youtube update!');
        var item = req.body;
        try{
            await Youtube.updateOne({ seq: item.seq }, {
                    sn : item.sn,
                    titile : item.title,
                    subtitle : item.subtitle,
                    src : item.src,
                    type : item.type,
            })
            res.json({ result: 'success' });
        }catch(err){
            winston.error(err);
            res.status(400).json({msg:'업데이트에 실패'});
        } 
    });

    app.delete('/admin/youtube', async(req, res) => {
        console.log('delete) youtube delete!');
        var item = req.body;
        try{
            var result = await Youtube.deleteOne({ seq: item.seq })
            res.json({ result: 'success' });
        }catch(err){
            winston.error(err);
            res.status(400).json({msg:'삭제 실패'});
        } 
    });
    


/*
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

    app.post('/loadcampList', (req, res) => {
        camp.find().sort({ camp_no: 'desc' }).exec(function(err, campList) {
            if (err) res.json({ result: -1 })
            res.json(campList);
        });
    })

    app.post('/loadcampListType', (req, res) => {
        camp.find().sort({ camp_no: 'desc' }).exec(function(err, campList) {
            if (err) res.json({ result: -1 })
            res.json(campList);
        });

        // db.getList('test', 'loadcampList', {})
        //     .then(data => {
        //         var type = {};
        //         for (var item of data) {
        //             if (type[item.camp_type]) {
        //                 type[item.camp_type].push(item);
        //             } else {
        //                 type[item.camp_type] = [item];
        //             }
        //             item.cnt = 0;
        //         }
        //         res.json(type);
        //     })
    })

    app.post('/savecampList', (req, res) => {
        var reqcampList = req.body;
        // db.getList('test', 'loadcampList', {})
        //     .then(data => {
        //         for (var item of data) {
        //             var s = reqcampList.find(data => {
        //                 return data.camp_no == item.camp_no
        //             });
        //             if (s.src != item.src || s.amt != item.amt || s.title != item.title) {
        //                 console.log('deferent::::', s, item);
        //                 db.setData('test', 'savecampList', s)
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
    */
}