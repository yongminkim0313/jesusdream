const autoIncrement = require('mongoose-auto-increment');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

module.exports = (app, mongoose, winston) => {
    autoIncrement.initialize(mongoose);

    const aplySchema = new mongoose.Schema({
        seq: Number,
        aplyTotAmt: Number, //신청총금액
        aplyPrgrs: String, //신청진행상황(접수, 접수완료, 신청취소)
        aplyDt: String, //신청일시
        aplyName: String,
        jikbunSe: String,
        church: String,
        churchSe: String,
        churchAdtr: String,
        churchAddr: String,
        churchDtlAddr: String,
        schdlSe: String,
        phone: String,
        email: String,
        checkbox: String,
        fullAddress: String,
        detailAddress: String,
        joinHisSe: String,
        joinPathSe: Array,
        campCnt: Object,
        rgtrNm: String,
        rgtrDt: String,
        updtNm: String,
        updtDt: String,
        kakaoEmail: String,
      });

    aplySchema.plugin(autoIncrement.plugin, {
        model: 'aply',
        field: 'seq',
        startAt: 1, //시작 
        increment: 1 // 증가 
    });

    const Aply = mongoose.model("aply", aplySchema);

    app.post('/aply', async(req, res) => {
        winston.info('post) aply insert!');
        try {
            const today = moment();

            winston.info(req.body);
            const aply = new Aply(req.body);
            aply.kakaoEmail = req.session.userInfo.kakao_account.email;
            aply.aplyTotAmt = 10000 //신청총금액
            aply.aplyPrgrs = '접수' //신청진행상황(접수, 접수완료, 신청취소)
            aply.aplyDt = today.format('YYYY-MM-DD') //신청일시
            await aply.save()
            .then(() => {res.json({ result: 'success' })})
            .catch((err) => {winston.error("Error : " + err)})
            .then(() => {});
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg: '캠프신청 실패'});
        }
    });

    app.get('/aply', (req, res) => {
        winston.info('get) aply select!');
        console.log(req.session);
        try{
            Aply.find({ kakaoEmail: req.session.userInfo.kakao_account.email }).sort({ seq: 'desc' }).exec(function(err, orderList) {
                if (err) res.json({ result: -1 })
                res.json(orderList);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg: '캠프신청 불러오기 실패'});
        }
    });

    app.get('/aply/all', (req, res) => {
        winston.info('get) aply select!');
        console.log(req.session);
        try{
            Aply.find({ }).sort({ seq: 'desc' }).exec(function(err, orderList) {
                if (err) res.json({ result: -1 })
                res.json(orderList);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg: '캠프신청 불러오기 실패'});
        }
    });

    app.put('/aply', (req, res) => {
        winston.info('put) aply update!');
        res.json({ result: 'success' });
    });

    app.delete('/aply', (req, res) => {
        winston.info('delete) aply delete!');
        res.json({ result: 'success' });
    });



}