const autoIncrement = require('mongoose-auto-increment');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

module.exports = (app, mongoose, winston) => {
    autoIncrement.initialize(mongoose);

    const msgSchema = new mongoose.Schema({
        type: String,
        fromId: Number,
        toId: Number,
        id: Number,
        data: Object,
        sendDt:String,
    });

    msgSchema.plugin(autoIncrement.plugin, {
        model: 'Msg',
        field: 'id',
        startAt: 1, //시작 
        increment: 1 // 증가 
    });
    
    const Msg = mongoose.model("Msg", msgSchema);

    app.post('/msg', async(req, res) => {
        const msg = new Msg(req.body);
        msg.sendDt = moment().format('YYYY-MM-DD HH:mm:ss');
        await msg.save()
            .then(() => {res.status(200).json({ result: 'success' })})
            .catch((err) => { 
                console.log(err);
                res.status(400).json({ msg: '메세지보내기 실패' })
            })
            .then(() => {});
    });

    app.get('/msg', async(req, res) => {
        console.log('get) msg select!');
        Msg.find().sort({id: 'asc'}).exec(function(err, msg) {
            if (err) res.status(400).json({ msg: '메세지가져오기 실패' });
            res.status(200).json(msg);
        })
    });

    app.put('/msg', (req, res) => {
        console.log('put) camp update!');
        res.json({ result: 'success' });
    });

    app.delete('/msg', (req, res) => {
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
    
}