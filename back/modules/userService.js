module.exports = (app, winston) => {
    app.get('/auth', async(req, res) => {
        try {
            if('kimyongmin1@kakao.com' == req.session.userInfo.kakao_account.email){
                req.session.auth = 'admin';
            }else{
                req.session.auth = 'user';
            }
            res.status(200).json({auth:req.session.auth});
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg:'권한 가져오기 실패'});
        }
    });

    app.post('/auth', async(req, res) => {
        try {
            req.session.auth = 'admin';
            res.status(200).json({});
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg: '권한 설정 실패'});
        }
    });
}