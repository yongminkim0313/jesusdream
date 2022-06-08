const autoIncrement = require('mongoose-auto-increment');
const axios = require('axios');
const userService = require('../modules/userService');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

module.exports = (app, mongoose, winston) => {
    autoIncrement.initialize(mongoose);

    const userSchema = new mongoose.Schema({
        id: Number,
        connected_at: String,
        properties: Object,
        kakao_account: Object,
        uuid: String
    });

    const User = mongoose.model("user", userSchema);
    
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
            console.log('response2 data::::::::::::', response2.data);

            var userSession = userService.kakaoUserInfo(req.session, response2.data, `${access_token}`);
            userService.authInfo(userSession);
            console.log(userSession);

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
                        template_id:77885,
                        template_args: args
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
                            User.updateOne({id: user.id}, {
                                $set:{
                                    connected_at    : user.connected_at,
                                    properties      : user.properties,
                                    kakao_account   : user.kakao_account,
                                    uuid            : user.uuid,
                                }
                            })
                        }else{
                            var userSave = new User(resultUser);
                            await userSave.save()
                            .then(()=>{})
                            .catch((err)=>{console.log(err)})
                        }
                    });
                })
            
                res.status(200).json(result);
            } catch (err) {
                winston.error("Error >>" + err);
                console.log(err);
                res.status(401).json(err);
            }
        }else{
            winston.info('저장된 사용자 가져오기!!')
            User.find({ }).sort({ connected_at: 'desc' }).exec(function(err, userList) {
                if (err) res.json({ msg: '사용자 가져오기 실패!' })
                res.json(userList);
            })
        }
        
    })
}