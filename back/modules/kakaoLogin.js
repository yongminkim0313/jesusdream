const axios = require('axios');

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
            req.session.userInfo = response2.data;
            req.session.access_token = `${access_token}`;
            if('kimyongmin1@kakao.com' == req.session.userInfo.kakao_account.email){
                req.session.userInfo.auth = 'admin';
            }else{
                req.session.userInfo.auth = 'user';
            }
            console.log('req.session', req.session);
            req.session.save(function() {
                res.redirect(`${process.env.MAIN_URL}`);
            });

        } catch (err) {
            winston.error("Error >>" + err);
        }
    });

    app.post('/auth/kakao/logout', async(req, res) => {
        const access_token = req.session.access_token;
        try {
            const response2 = await axios({
                method: "post",
                url: "https://kapi.kakao.com/v1/user/logout", // 서버
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }, // 요청 헤더 설정
                params: {},
            });

            req.session.destroy(function(err) {
                if (err) throw err;
                console.log('세션 삭제');
                res.status(200).json({msg:'success'});
            });
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg:err});
        }
    });
}