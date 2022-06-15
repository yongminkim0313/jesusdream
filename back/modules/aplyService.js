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
        pyrNm: String,
        checkboxUseRoom: String,
        bankNm: String,
        kakaoId: String,
      });

      const posterSchema = new mongoose.Schema({
        seq: Number,
        aplyPrgrs: String,
        brochureCnt: Number,
        posterCnt: Number,
        aplyDt: String, //신청일시
        aplyName: String,
        church: String,
        addr: String,
        dtlAddr: String,
        phone: String,
        email: String,
        kakaoEmail: String,
        rgtrNm: String,
        rgtrDt: String,
        updtNm: String,
        updtDt: String,
        kakaoId: String,
      });

    aplySchema.plugin(autoIncrement.plugin, {
        model: 'aply',
        field: 'seq',
        startAt: 1, //시작 
        increment: 1 // 증가 
    });

    posterSchema.plugin(autoIncrement.plugin, {
        model: 'poster',
        field: 'seq',
        startAt: 1, //시작 
        increment: 1 // 증가 
    });

    const Aply = mongoose.model("aply", aplySchema);
    
    const Poster = mongoose.model("poster", posterSchema);
    
    app.post('/user/aply', async(req, res) => {
        winston.info('post) aply insert!');
        try {
            const today = moment();
            const aply = new Aply(req.body);
            var cm = aply.campCnt
            var cnt = cm.chodeung+cm.cheongsonyeon+cm.cheongnyeon+cm.jangnyeon+cm.sayeogja; //총인원
            aply.kakaoEmail = req.session.email;
            aply.kakaoId = req.session.kakaoId;
            aply.aplyTotAmt = cnt*10000 //신청총금액
            aply.aplyPrgrs = '접수' //신청진행상황(접수, 접수완료, 신청취소)
            aply.aplyDt = today.format('YYYY-MM-DD') //신청일시
            aply.rgtrNm = req.session.email
            aply.rgtrDt = today.format('LLL')
            await aply.save()
            .then(() => {res.json({ result: 'success' })})
            .catch((err) => {winston.error("Error : " + err)})
            .then(() => {});
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(400).json({msg: '캠프신청 실패'});
        }
    });

    app.get('/user/aply/one', (req, res) => {
        try{
            Aply.findOne({seq : req.query.seq }).exec(function(err, aply) {
                if (err) res.json({ result: -1 })
                if(!aply) {
                    res.status(404).json({msg:'값이 존재하지 않습니다.'})
                    return;
                }
                res.status(200).json(aply);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(400).json({msg: '캠프신청 불러오기 실패'});
        }
    });

    app.get('/user/aply', (req, res) => {
        console.log(req.session);
        try{
            Aply.find({ kakaoEmail: req.session.email }).sort({ seq: 'desc' }).exec(function(err, orderList) {
                if (err) res.json({ result: -1 })
                res.status(200).json(orderList);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(400).json({msg: '캠프신청 불러오기 실패'});
        }
    });

    app.get('/user/aply/all', (req, res) => {
        try{
            Aply.find({ }).sort({ seq: 'desc' }).exec(function(err, orderList) {
                if (err) res.json({ result: -1 })
                res.json(orderList);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(400).json({msg: '캠프신청 불러오기 실패'});
        }
    });

    app.put('/user/aply', async(req, res) => {
        winston.info('put) aply update!');
        console.log(req.body);
        var item = req.body;
        if(item.aplyPrgrs != '접수'){
            res.status(403).json({msg:'접수상태에서 수정이 가능합니다. 관리자에게 문의 바랍니다.'});
        }
        try{
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
                    aplyTotAmt: 0,
                    checkboxUseRoom:item.checkboxUseRoom,
                    bankNm: item.bankNm
                },
            })
            res.json({ result: 'success' });
        }catch(err){
            winston.error(err);
            res.status(400).json({msg:'업데이트에 실패'})
        } 
    });

    app.delete('/user/aply', (req, res) => {
        res.json({ result: 'success' });
    });

    app.put('/user/aply/one', async(req, res) => {
        var item = req.body;
        try{
            var result = await Aply.updateOne({ seq: item.seq }, {
            $set: {
                aplyPrgrs: item.aplyPrgrs,
            },
            })
            res.json({ result: 'success' });
        }catch(err){
            winston.error(err);
            res.status(400).json({msg:'업데이트에 실패'})
        } 
    });

    app.post('/user/poster',async(req,res)=>{
        winston.info('post) poster insert!');
        try {
            const today = moment();
            const poster = new Poster(req.body);

            poster.aplyPrgrs = '접수'
            if(req.session && req.session.kakaoId){
                poster.kakaoId = req.session.kakaoId;
                poster.kakaoEmail = req.session.email;
            }
            poster.aplyDt = today.format('YYYY-MM-DD') //신청일시
            await poster.save();
            res.status(200).json({ result: 'success' });
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(400).json({msg: '포스터신청 오류'});
        }
    })

    app.get('/user/poster', (req, res) => {
        try{
            Poster.find({ kakaoEmail: req.session.email }).sort({ seq: 'desc' }).exec(function(err, posterList) {
                if (err) res.json({ result: -1 })
                res.status(200).json(posterList);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg: '포스터신청 불러오기 오류'});
        }
    });

    app.get('/user/poster/all', (req, res) => {
        try{
            Poster.find({ }).sort({ seq: 'desc' }).exec(function(err, posterList) {
                if (err) res.json({ result: -1 })
                res.json(posterList);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(400).json({msg: '포스터 브로셔 불러오기 오류'});
        }
    });

    app.put('/user/poster/one', async(req, res) => {
        var item = req.body;
        try{
            await Poster.updateOne({ seq: item.seq }, {
            $set: {
                aplyPrgrs: item.aplyPrgrs,
            },
            })
            res.json({ result: 'success' });
        }catch(err){
            winston.error(err);
            res.status(400).json({msg:'포스터 업데이트 실패'})
        } 
    });

    app.post('/admin/aply/excel', async(req, res) => {
        const excelService = require('../modules/excelService');
        try{
            Aply.find({ }).sort({ seq: 'desc' }).exec(async function(err, aplyList) {
                if (err) res.json({ result: -1 })
                const report = await excelService.makeExcelFile(aplyList);
                res.status(200).json({content: report.toString('base64'), filename: 'testFile', result:true});
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(400).json({msg: '캠프신청 불러오기 실패'});
        }
        
    });
    app.get('/admin/aply/statistic', (req, res) => {
        try{
            Aply.find({ }).exec(function(err, aplyList) {
                if (err) res.json({ result: -1 })
                
                var statistic = {"chodeung":0,"jangnyeon":0,"cheongnyeon":0,"cheongsonyeon":0,"sayeogja":0};
                for(var idx in aplyList){
                    var aply = aplyList[idx];
                    for(var key in aply.campCnt){
                        if(aply.campCnt[key]) statistic[key] += aply.campCnt[key];
                    }
                }
                res.json(statistic);
            })
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(400).json({msg: '통계 실패'});
        }
    });
}