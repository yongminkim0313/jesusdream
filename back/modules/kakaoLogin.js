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
            winston.info(userSession);
            console.log(userSession);
            userSession.save(function() {
                res.redirect(`${process.env.MAIN_URL}`);
            });

        } catch (err) {
            winston.error("Error >>" + err);
        }
    });

    app.post('/kakao/share/callback', async(req,res)=>{
        try{

        }catch(err){
            winston.error("Error >>" + err);
        }
    })
}