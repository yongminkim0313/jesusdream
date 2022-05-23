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
        console.log('post) aply insert!');
        try {
            console.log(req.body);
            const aply = new Aply(req.body);
            aply.kakaoEmail = req.session.userInfo.kakao_account.email;
            await aply.save()
            .then(() => {res.json({ result: 'success' })})
            .catch((err) => {console.log("Error : " + err)})
            .then(() => {});
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg: '캠프신청 실패'});
        }
    });

    app.get('/aply', (req, res) => {
        console.log('get) aply select!');
        res.json({ result: 'success' });
    });

    app.put('/aply', (req, res) => {
        console.log('put) aply update!');
        res.json({ result: 'success' });
    });

    app.delete('/aply', (req, res) => {
        console.log('delete) aply delete!');
        res.json({ result: 'success' });
    });



}