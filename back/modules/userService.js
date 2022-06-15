module.exports = {
    kakaoUserInfo: (session, userInfo, accessToken)=>{
        session.kakaoId = userInfo.id
        session.name = userInfo.kakao_account.profile.nickname
        session.email = userInfo.kakao_account.email?userInfo.kakao_account.email:userInfo.id
        session.profileImage = userInfo.kakao_account.profile.profile_image_url
        session.nickname = userInfo.kakao_account.profile.nickname
        session.accessToken = accessToken;
        session.type='kakao';
        session.auth='user';
        return session;
    },
    authInfo: async(session)=>{
        console.log('session authInfo::::::', session.name, session.id, session.email);
        if(session.email=='kimyongmin1@kakao.com') session.auth = 'admin';
        if(session.email=='yjcm00@hanmail.net') session.auth = 'admin';//목사님
        if(session.email=='cnalgus1004@naver.com')session.auth = 'admin';//추미현간사
        if(session.email=='cafe10042@naver.com')session.auth = 'admin';
        if(session.email == 'lovely_s2_@nate.com') session.auth = 'admin';
        if(session.name == 'YOUTHVISION') session.auth = 'admin';

        if(!session.auth) session.auth = 'user';
    }

}