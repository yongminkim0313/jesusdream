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
              @click=login()
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <v-btn
              color="warning"
              fab
              dark
              @click=logout()
            >
              <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
            </v-btn>
            <!-- <a href="https://kauth.kakao.com/oauth/authorize?client_id=be0d818c768f8e2198c97470fc7577c5&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code&scope=profile_nickname, profile_image, account_email, gender">로그인</a>
            <a href="http://localhost:3000/auth/kakao/logout">로그아웃</a> -->
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