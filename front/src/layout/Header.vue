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
        class="d-flex justify-end"
        >
            <v-btn
              color="warning"
              fab
              dark
              small
              @click="login()"
            >
            <v-avatar size="50">
            <v-img :src="userInfo.thumb"></v-img>
            </v-avatar>
              <!-- <v-icon>mdi-account-circle</v-icon> -->
            </v-btn>
            <v-btn
              color="warning"
              fab
              dark
              @click="logout()"
            >
              <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
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
        };
    },
    created() {
       //console.log('access_token',this.$cookies.get("access_token"));
       //console.log('user_info',this.$cookies.get("user_info"));
       var user = this.$cookies.get("user_info");
       //console.log(user.kakao_account.profile);
       this.userInfo.nick = user.kakao_account.profile.nickname;
       this.userInfo.thumb = user.kakao_account.profile.thumbnail_image_url;
       this.userInfo.img = user.kakao_account.profile.profile_image_url;
    },
    methods: {
        login: ()=>{
            location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=be0d818c768f8e2198c97470fc7577c5&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code&scope=profile_nickname, profile_image, account_email, gender';
        },
        logout: ()=>{
             location.href ='http://localhost:3000/auth/kakao/logout';
        }
    },

}
</script>