<template>
    <div>
        <v-app-bar app elevation="4" flat :src="require('../../assets/header.jpeg')" class="d-flex flex-column" >
            <router-link to="/" class="mr-auto">
                <v-avatar>
                <img :src="require('../../assets/jesusdream.png')" alt="주님이꿈꾸신교회" >
                </v-avatar>
                </router-link>
            <v-spacer></v-spacer>

            <!-- 카카오로그인 -->
            <v-btn @click="kakaoLogin();" v-if="!this.USERINFO.isLogin" class="mr-10 kakaoLogin kakaoText--text" small :loading="loading" :disabled="loading">
                <strong>카카오로그인</strong>
                <!-- <v-img  max-height="30" max-width="122" contain :src="require('/src/assets/kakaoLogin.png')"></v-img> -->
                <template v-slot:loader>
                        <v-card class="mr-10 pa-2 kakaoLogin kakaoText--text">로그인</v-card>
                </template>
            </v-btn>
            <!-- <v-img @click="naverLogin();" v-if="!isLogin" max-height="40" max-width="100" contain src="http://static.nid.naver.com/oauth/small_g_in.PNG"></v-img> -->
            
            <v-chip color="purple" label link v-if="this.USERINFO.isLogin && this.USERINFO.auth == 'admin'" class="white--text mr-5" >
                <v-icon large color="white" @click="goAdminPage()">
                    mdi-account-supervisor
                </v-icon>
            </v-chip>
            
            <v-chip color="purple" label link v-if="this.USERINFO.isLogin" class="white--text mr-5" @click="goMyAplyList()" >
            {{this.USERINFO.name}} 님
            </v-chip>

            <v-btn fab small @click="logout();" v-if="this.USERINFO.isLogin" >
                <v-icon small color="pink">
                    mdi-logout
                </v-icon>
            </v-btn>
        </v-app-bar>
        <v-card class="d-flex justify-center" elevation="0">
            <v-breadcrumbs :items="items" class="pa-2">
            <template v-slot:divider></template>
            </v-breadcrumbs>
        </v-card>
        
        <v-layout>
            <v-navigation-drawer v-model="drawer" temporary app>
                <v-avatar class="ma-2">
                    <img src="../../assets/jesusdream.png" alt="주님이꿈꾸신교회" >
                </v-avatar>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <router-link to="/" class="mr-auto">
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home">홈으로</v-list-item>
                </router-link>
                <router-link to="/user" class="mr-auto">
                    <v-list-item prepend-icon="mdi-forum" title="About" value="about">등록하러가기</v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>
        </v-layout>
    </div>
</template>
<script>
export default {
    name:'Header',
    data(){
        return {
            loading: false
            ,userInfo:{auth:'user',name:''}
            ,isLogin: false
            ,drawer: null
            ,items: [
                        { text: '캠프소개', disabled: false, to: 'about', },
                        { text: '캠프등록', disabled: false, to: 'user', },
                        { text: '홈', disabled: false, to: '/', },
                        { text: '캠프실황', disabled: false, to: 'campLive', },
                        { text: '언론보도', disabled: false, to: 'newscast', },
                    ],
        };
    },
    created() {
        this.$eventBus.$on('login',(data)=>{
            this.isLogin = data.isLogin;
            this.userInfo = data.userInfo;
        })
        
    },
    methods: {
        kakaoLogin: function() {
            location.href = 'https://kauth.kakao.com/oauth/authorize?'
                +'client_id=be0d818c768f8e2198c97470fc7577c5&'
                +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
                +'response_type=code&'
                +'scope=profile_nickname, profile_image, account_email, gender, friends';
            this.loading = !this.loading;
            setTimeout(() => (this.loading = false), 3000);
        },
        logout: function (){
            location.href=this.APP_URL+"/auth/logout";
        },
        goAdminPage: function(){
            this.$router.push('/admin').catch(()=>{})
        },
        goAplyPage: function(){
            this.$router.push('/user').catch(()=>{})
        },
        loginGuest: function(){
            this.axios.post('/login/guest')
            .then(()=>{

            })
        },
        goMyAplyList: function(){
            this.$router.push('/myAplyList').catch(()=>{})
        },

    },

}
</script>