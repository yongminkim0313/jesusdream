<template>
    <div>
        <v-app-bar
        app
        color="purple"
        dense
        elevation="4"
        flat
        outlined
        fade-img-on-scroll
        class="d-flex justify-end mb-6"
        >
        <v-card></v-card>
        <router-link to="/user" v-if="isLogin">신청</router-link>
        <router-link to="/admin" v-if="userInfo.auth == 'admin'">관리자</router-link>
        <v-spacer></v-spacer>
            <v-img @click="login();" v-if="!isLogin" contain height="40" :src="require('/src/assets/kakaoLogin.png')">
            </v-img>
            <v-avatar size="40" v-if="isLogin">
            <v-img :src="userInfo.thumb"></v-img>
            </v-avatar>
            <v-btn
              color="warning"
              fab
              dark
              small
              @click="logout();"
              v-if="isLogin"
            >
              로그아웃
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
            location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=be0d818c768f8e2198c97470fc7577c5&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code&scope=profile_nickname, profile_image, account_email, gender';
        },
        logout: function (){
             this.axios.post('/auth/kakao/logout')
             .then(()=>{
                this.$cookies.remove("user_info");
                this.$cookies.remove("access_token");
                this.isLogin = false; 
                this.userInfo = {};
                //console.log('user_info',this.$cookies.get("access_token"));
                //console.log('https://kauth.kakao.com/oauth/logout?client_id=be0d818c768f8e2198c97470fc7577c5&logout_redirect_uri=https://localhost:8000/logout');
             })
             .catch((e)=>{console.log(e);})
             .then(()=>{
                this.$router.push('/');
             });
        }
    },

}
</script>