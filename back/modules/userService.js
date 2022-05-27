module.exports = {
    kakaoUserInfo: (session, userInfo, accessToken)=>{
        session.id = userInfo.id
        session.name = userInfo.kakao_account.profile.nickname
        session.email = userInfo.kakao_account.email
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
        if(session.name=='김용민') session.auth = 'admin';
        if(session.name=='선영') session.auth = 'admin';

        if(!session.auth) session.auth = 'user';
    }

}