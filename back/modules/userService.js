module.exports = {
    kakaoUserInfo: (session, userInfo, accessToken)=>{
        winston.info('session.name::'+userInfo.id+':userInfo.kakao_account.email:'+userInfo.kakao_account.email+':userInfo.kakao_account.profile.nickname:'+userInfo.kakao_account.profile.nickname);
        session.id = userInfo.id
        session.name = userInfo.kakao_account.profile.nickname
        session.email = userInfo.kakao_account.email?userInfo.kakao_account.email:userInfo.id
        session.profileImage = userInfo.kakao_account.profile.profile_image_url
        session.nickname = userInfo.kakao_account.profile.nickname
        session.accessToken = accessToken;
        session.type='kakao';
        return session;
    },
    naverUserInfo: (session, userInfo, accessToken)=>{
        session.id = userInfo.id
        session.name = userInfo.name
        session.email = userInfo.email
        session.profile_image = userInfo.profile_image
        session.nickname = userInfo.nickname
        session.accessToken = accessToken;
        session.type='naver';
        return session;
    },
    authInfo: async(session)=>{
        winston.info('session.name::'+session.name+':session.id:'+session.id+':session.email:'+session.email);
        if(session.email=='kimyongmin1@kakao.com') session.auth = 'admin';
        if(session.email=='yjcm00@hanmail.net') session.auth = 'admin';//목사님
        if(session.email=='cnalgus1004@naver.com')session.auth = 'admin';//추미현간사
        if(session.email=='cafe10042@naver.com')session.auth = 'admin';
        if(session.name == 'YOUTHVISION') session.auth = 'admin';

        if(!session.auth) session.auth = 'user';
    }

}