const autoIncrement = require('mongoose-auto-increment');
const axios = require('axios');
const userService = require('../modules/userService');
const moment = require('moment');
const async = require('async');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

module.exports = (app, mongoose, winston) => {
    autoIncrement.initialize(mongoose);

    const etcSchema = new mongoose.Schema({
        userUpdateDt: String,
    })
    const userSchema = new mongoose.Schema({
        id: Number,
        connected_at: String,
        properties: Object,
        kakao_account: Object,
        uuid: String,
        auth: String,
    });

    const User = mongoose.model("user", userSchema);
    const Etc = mongoose.model("etc", etcSchema);
    
    app.get('/auth/kakao/callback', async(req, res) => {
        try {
            const response = await axios({
                method: "post",
                url: "https://kauth.kakao.com/oauth/token", // 서버
                headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }, // 요청 헤더 설정
                params: {
                    grant_type: 'authorization_code',
                    client_id: `${process.env.client_id}`,
                    redirect_uri: `${process.env.redirect_uri}`,
                    code: req.query.code
                },
            });
            const access_token = response.data.access_token;
            winston.info('token::' + access_token);
            const response2 = await axios({
                method: "post",
                url: "https://kapi.kakao.com/v2/user/me", // 서버
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': `Bearer ${access_token}`
                }, // 요청 헤더 설정
                params: {
                    secure_resource: true,
                    property_keys: `${process.env.property_keys}`
                },
            });
            
            var userSession = userService.kakaoUserInfo(req.session, response2.data, `${access_token}`);
            if(userSession.email=='kimyongmin1@kakao.com') userSession.auth = 'admin';
            var user = await User.findOne({id: response2.data.id});
            if(user) userSession.auth = user.auth;
            
            userSession.save(function() {
                res.redirect(`${process.env.MAIN_URL}`);
            });
            

        } catch (err) {
            winston.error("Error >>" + err);
        }
    });

    app.post('/talk/memo/send', async(req,res) => {
        var item = req.body.campCnt;
        var args = {};
        var amt = 0;
        if(item.chodeung)       {args.chodeung = item.chodeung + ' 명'; amt+=item.chodeung};
        if(item.cheongsonyeon)  {args.cheongsonyeon = item.cheongsonyeon + ' 명'; amt+=item.cheongsonyeon};
        if(item.cheongnyeon)    {args.cheongnyeon = item.cheongnyeon + ' 명'; amt+=item.cheongnyeon};
        if(item.jangnyeon)      {args.jangnyeon = item.jangnyeon + ' 명'; amt+=item.jangnyeon};
        if(item.sayeogja)       {args.sayeogja = item.sayeogja + ' 명'; amt+=item.sayeogja};
        args.camp_amt = amt + '만원';
        
        console.log(args);
        try{
            console.log('/talk/memo/send');
            const accessToken = req.session.accessToken;
            try {
                const response = await axios({
                    method: "post",
                    url: "https://kapi.kakao.com/v2/api/talk/memo/send", // 서버
                    headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                                ,'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
                    params:{
                        template_id:77807,
                        template_args: args
                    }
                });
                winston.info('/talk/memo/send result_code'+response.result_code);
                res.status(200).json({result_code: response.result_code});
            } catch (err) {
                winston.error("Error >>" + err);
                res.status(401).json({msg:err});
            }
        }catch(err){
            winston.error("Error >>" + err);
        }
    });

    app.post('/talk/friends', async(req,res) => {
        console.log('/talk/friends');
        const accessToken = req.session.accessToken;
        try {
            const response = await axios({
                method: "get",
                url: "https://kapi.kakao.com/v1/api/talk/friends", // 서버
                headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
            });

            console.log('response::',response.data);
            res.status(200).json(response.data);
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json(err);
        }
        
    })

    app.post('/friends/message/send', async(req,res) => {
        winston.info('/friends/message/send');
        var uuid = req.body.uuid;
        var args = req.body.args;
        var templateId = req.body.templateId;
        const accessToken = req.session.accessToken;
        try {
            const response = await axios({
                method: "post",
                url: "https://kapi.kakao.com/v1/api/talk/friends/message/send", // 서버
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': `Bearer ${accessToken}`
                },
                params:{
                        receiver_uuids: '["'+uuid+'"]',
                        template_id : templateId,
                        template_args : args
                    }
            });
            console.log('response::',response.data);
            res.status(200).json(response.data);
        } catch (err) {
            winston.error("Error >>" + err);
            console.log(err);
            res.status(401).json(err);
        }
        
    })


    app.post('/app/users', async(req,res) => {
        winston.info('/app/users');
        if(req.session.auth != 'admin') res.status(401).json({msg:'접근권한이 없습니다.'});
        const refresh = req.body.refresh;
        if(refresh){
            winston.info('카카오서버에서 친구목록 새로고침!')
            try {
                const response = await axios({
                    method: "post",
                    url: "https://kapi.kakao.com/v1/user/ids", // 서버
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'Authorization': `KakaoAK ${process.env.admin_key}`
                    }
                });
                const users = response.data['elements'];
                //console.log(response.data);
                
                const response2 = await axios({
                    method: "post",
                    url: "https://kapi.kakao.com/v2/app/users", // 서버
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'Authorization': `KakaoAK ${process.env.admin_key}`
                    },
                    params:{
                        target_ids : '['+users.join(',')+']',
                        target_id_type : 'user_id',
                        property_keys : '["kakao_account.","properties.","has_signed_up"]'
                    }
                });
            //console.log('response::',response2.data);
            
                const accessToken = req.session.accessToken;
                const response3 = await axios({
                    method: "get",
                    url: "https://kapi.kakao.com/v1/api/talk/friends", // 서버
                    headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
                });
            
                const allowUser = response3.data['elements'];
                const result = response2.data;
            
                allowUser.forEach(function(allow){
                    var user = result.find(function(element){ return element.id == allow.id});
                    user.uuid = allow.uuid;
                });
            
                result.forEach(function(resultUser){
                    User.findOne({id: resultUser.id}).exec(async function(err,user){
                        if (err) res.status(400).json({msg:'사용자 가져오기 에러!!'})
                        
                        if(user){
                            if(resultUser.uuid != user.uuid){
                                await User.updateOne({id: user.id}, {
                                    $set:{
                                        // connected_at    : resultUser.connected_at,
                                        // properties      : resultUser.properties,
                                        // kakao_account   : resultUser.kakao_account,
                                        uuid            : resultUser.uuid,
                                    }
                                })
                            }
                        }else{
                            var userSave = new User(resultUser);
                            userSave.auth='user';
                            await userSave.save()
                            .then(()=>{})
                            .catch((err)=>{console.log(err)})
                        }
                    });
                })
                new Etc({userUpdateDt: moment().format('LLL')}).save();
            } catch (err) {
                winston.error("Error >>" + err);
                console.log(err);
                res.status(401).json(err);
            }
        }

        try{
            var userData = function(cb){ 
                User.find({ }).sort({ connected_at: 'desc' }).exec(async function(err,user){
                    cb(null,user);
                })
            };
            var etcData = function(cb){
                Etc.findOne({ },{ },{sort:{'userUpdateDt':-1}}).exec(async function(err,etc){
                    cb(null,etc);
                })
            };
            
            async.parallel({
                userData:userData,
                etcData:etcData
            },
            function(err,result){
                if (err) res.status(400).json({msg:'페러럴 사용자 기타가져오기 에러!!'})
                res.status(200).json(result);
            })
        }catch(err){
            winston.error("Error >>" + err);
                console.log(err);
                res.status(401).json(err);
        }
    })

    app.put('/app/user/auth', async(req,res) => {
        winston.info('put) /app/user/auth update!');
        console.log(req.body);
        var reqUser = req.body;
        var userNickname='';
        try{
            User.findOne({id: reqUser.id}).exec(async function(err,user){
                if (err) res.json({ msg: '사용자 가져오기 실패!' })
                await User.updateOne({id: user.id}, {
                    $set:{
                        auth : reqUser.auth
                    }
                })
                userNickname = user.properties.nickname;
            })
            res.status(200).json({msg: userNickname+'권한설정이 변경되었습니다.'});
        }catch(err){
            winston.error("Error >>" + err);
            res.status(401).json(err);
        }
    });

    //동의항목 가져오기
    app.post('/auth/myKakaoMsgAgree', async(req,res) => {
        const accessToken = req.session.accessToken;
        if(accessToken){
            try {
                const response = await axios({
                    method: "get",
                    url: "https://kapi.kakao.com/v2/user/scopes", // 서버
                    headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
                });
                var resData = response.data;

                var talkMsg = resData.scopes.find(data=>{ return data.id =="talk_message";})

                console.log('response::',response.data);
                res.status(200).json(talkMsg.agreed);
            } catch (err) {
                winston.error("Error >>" + err);
                res.status(401).json(err);
            }
        }else{
            res.status(200).json(false);
        }

    });
    app.post('/admin/unlinkUser', async(req,res)=>{
        var user = req.body;
        try {
                const response = await axios({
                    method: "post",
                    url: "https://kapi.kakao.com/v1/user/unlink", // 서버
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Authorization': `KakaoAK ${process.env.admin_key}`
                    },
                    params:{
                        target_id_type: 'user_id',
                        target_id: user.id
                    }
                });
            } catch (err) {
                winston.error("Error >>" + err);
                res.status(400).json(err);
            }
    })
    
}