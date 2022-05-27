const axios = require('axios');
const userService = require('../modules/userService');

module.exports = (app, winston) => {
    app.get('/auth/naver/callback', async(req, res) => {
        try {
            const response = await axios({
                method: "get",
                url: "https://nid.naver.com/oauth2.0/token", // 서버
                headers: {'X-Naver-Client-Id':`${process.env.naver_client_id}`, 'X-Naver-Client-Secret': `${process.env.naver_client_secret}`}, // 요청 헤더 설정
                params: {
                    grant_type: 'authorization_code',
                    client_id: `${process.env.naver_client_id}`,
                    client_secret: `${process.env.naver_client_secret}`, 
                    redirect_uri: `${process.env.naver_redirect_uri}`,
                    code: req.query.code,
                    state: req.query.state
                },
            });
            console.log('response data:::::::::::::::',response.data);
            const access_token = response.data.access_token;
            winston.info('token::'+access_token);
            const response2 = await axios({
                method: 'post',
                url: 'https://openapi.naver.com/v1/nid/me',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': `Bearer ${access_token}`
                },
                params:{}
            });
            console.log('response2 data::::::::::::', response2.data);
            
            var userSession = userService.naverUserInfo(req.session, response2.data.response, `${access_token}`)
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

    
}