const axios = require('axios');
const userService = require('../modules/userService');

module.exports = (app, winston) => {
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
        var item = req.body.campCnt;
        var args = {};
        var amt = 0;
        if(item.chodeung)       {args.chodeung = item.chodeung + ' 명'; amt+=item.chodeung};
        if(item.cheongsonyeon)  {args.cheongsonyeon = item.cheongsonyeon + ' 명'; amt+=item.cheongsonyeon};
        if(item.cheongnyeon)    {args.cheongnyeon = item.cheongnyeon + ' 명'; amt+=item.cheongnyeon};
        if(item.jangnyeon)      {args.jangnyeon = item.jangnyeon + ' 명'; amt+=item.jangnyeon};
        if(item.sayeogja)       {args.sayeogja = item.sayeogja + ' 명'; amt+=item.sayeogja};
        args.camp_amt = amt + '만원';
        console.log(args, uuid);

        const accessToken = req.session.accessToken;
        try {
            const response = await axios({
                method: "get",
                url: "https://kapi.kakao.comv1/api/talk/friends/message/send", // 서버
                headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
                params:{
                        receiver_uuids:[uuid],
                        template_id:77807,
                        template_args: args
                    }
            });
            console.log('response::',response.data);
            res.status(200).json(response.data);
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json(err);
        }
        
    })
}