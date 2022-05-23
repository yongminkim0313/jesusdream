<template>
    <div>
        <v-app-bar
        app
        elevation="4"
        flat
        src="https://modo-phinf.pstatic.net/20190417_140/15554692250648Rq2Y_JPEG/mosa4Ri4kd.jpeg"
        class="d-flex flex-column"
        >
                <router-link to="/" class="mr-auto">
                    <v-avatar>
                    <img
                        src="../../assets/jesusdream.png"
                        alt="주님이꿈꾸신교회"
                    >
                    </v-avatar>
                </router-link>
                
                <router-link to="/user" v-if="isLogin">
                    <v-btn>
                        신청하러가기
                    </v-btn>
                </router-link>
                <v-chip
                    color="purple"
                    label
                    link
                    v-if="isLogin"
                    class="white--text"
                    @click="goAplyPage()"
                    >
                    신청하러가기
                </v-chip>
                
                <v-icon large color="green" v-if="userInfo.auth == 'admin'" @click="goAdminPage()">
                    mdi-account-supervisor
                </v-icon>
                    <v-img @click="login();" v-if="!isLogin" contain height="40" :src="require('/src/assets/kakaoLogin.png')"></v-img>
                    <v-chip
                    color="purple"
                    label
                    link
                    v-if="isLogin"
                    class="white--text"
                    >
                    {{userInfo.nick}} 님
                    </v-chip>
                    
                    <v-btn
                    fab
                    small
                    @click="logout();"
                    v-if="isLogin"
                    >
                    <v-icon small color="pink">
                        mdi-logout
                    </v-icon>
                    </v-btn>
        </v-app-bar>
    </div>
</template>
<script>
export default {
    name:'Header',
    data(){
        return {
            userInfo:{}
            ,isLogin: false
        };
    },
    created() {
       //console.log('access_token',this.$cookies.get("access_token"));
       //console.log('user_info',this.$cookies.get("user_info"));
       
       var user = this.$cookies.get("user_info");
       if(user){
         this.userInfo.nick = user.kakao_account.profile.nickname;
         this.userInfo.thumb = user.kakao_account.profile.thumbnail_image_url;
         this.userInfo.img = user.kakao_account.profile.profile_image_url;
         this.userInfo.auth = user.auth;
         this.isLogin = true;
       }
    },
    methods: {
        login: function() {
            location.href = 'https://kauth.kakao.com/oauth/authorize?'
                +'client_id=be0d818c768f8e2198c97470fc7577c5&'
                +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
                +'response_type=code&'
                +'scope=profile_nickname, profile_image, account_email, gender';
        },
        logout: function (){
             this.axios.post('/auth/kakao/logout')
             .then(()=>{
                this.$cookies.remove("user_info");
                this.$cookies.remove("access_token");
                this.isLogin = false; 
                this.userInfo = {};
            })
             .catch((e)=>{console.log(e);})
             .then(()=>{
                this.$router.push('/');
             });
        },
        goAdminPage: function(){
            this.$router.push('/admin').catch(()=>{})
        },
        goAplyPage: function(){
            this.$router.push('/user').catch(()=>{})
        }
    },

}
</script>