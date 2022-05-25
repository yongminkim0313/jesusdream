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
        pyrNm: String
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
            
            if(!req.session.userInfo){
                res.status(401).json({error_code:'kakao acount is null' , msg:"세션에 사용자가 없습니다."});
            }
            var cm = aply.campCnt
            var cnt = cm.chodeung+cm.cheongsonyeon+cm.cheongnyeon+cm.jangnyeon+cm.sayeogja; //총인원
            aply.kakaoEmail = req.session.userInfo.kakao_account.email;
            aply.aplyTotAmt = cnt*10000 //신청총금액
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

    app.get('/aply/one', (req, res) => {
        winston.info('get) aply select!');
        console.log(req.query)
        if(!req.query.phone|| !req.query.seq){
            res.status(402).json({msg: '올바른 접근이 아닙니다.'})
            return; 
        }
        try{
            Aply.findOne({ phone : req.query.phone, seq : req.query.seq }).sort({ seq: 'desc' }).exec(function(err, aply) {
                if (err) res.json({ result: -1 })
                console.log(aply);
                if(!aply) {
                    res.status(402).json({msg:'값이 존재하지 않습니다.'})
                    return;
                }
                res.status(200).json(aply);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg: '캠프신청 불러오기 실패'});
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

    app.put('/aply', async(req, res) => {
        winston.info('put) aply update!');
        //console.log(req.body);
        var item = req.body;
        try{
            //item.markModified('campCnt');
            var cnt = item.chodeung+item.cheongsonyeon+item.cheongnyeon+item.jangnyeon+item.sayeogja; //총인원
            var result = await Aply.updateOne({ seq: item.seq }, {
            $set: {
                aplyPrgrs: item.aplyPrgrs,
                aplyName: item.aplyName,
                jikbunSe: item.jikbunSe,
                church: item.church,
                churchSe: item.churchSe,
                churchAdtr: item.churchAdtr,
                churchAddr: item.churchAddr,
                churchDtlAddr: item.churchDtlAddr,
                schdlSe: item.schdlSe,
                phone: item.phone,
                email: item.email,
                checkbox: item.checkbox,
                fullAddress: item.fullAddress,
                detailAddress:item.detailAddress,
                joinHisSe: item.joinHisSe,
                joinPathSe: item.joinPathSe,
                campCnt: item.campCnt,
                pyrNm: item.pyrNm,
                aplyTotAmt: cnt*10000
            },
            })
            console.log('result:::::::',result);
        }catch(err){
            winston.error(err);
        } 
        res.json({ result: 'success' });
    });

    app.delete('/aply', (req, res) => {
        winston.info('delete) aply delete!');
        res.json({ result: 'success' });
    });



}