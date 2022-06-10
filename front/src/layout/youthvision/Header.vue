<template>
    <div>
        <v-app-bar app elevation="4" flat src="https://modo-phinf.pstatic.net/20190417_140/15554692250648Rq2Y_JPEG/mosa4Ri4kd.jpeg" class="d-flex flex-column" >
            <router-link to="/" class="mr-auto">
                <v-avatar>
                <img src="../../assets/jesusdream.png" alt="주님이꿈꾸신교회" >
                </v-avatar>
                </router-link>
            <v-spacer></v-spacer>

            <!-- 카카오로그인 -->
            <v-btn @click="kakaoLogin();" v-if="!isLogin" icon class="mr-10" :loading="loading" :disabled="loading">
                <v-img  max-height="30" max-width="122" contain :src="require('/src/assets/kakaoLogin.png')"></v-img>
                <template v-slot:loader>
                    <v-chip color="white"> 로그인중...</v-chip>
                </template>
            </v-btn>
            <!-- <v-img @click="naverLogin();" v-if="!isLogin" max-height="40" max-width="100" contain src="http://static.nid.naver.com/oauth/small_g_in.PNG"></v-img> -->
            
            <v-chip
                color="purple"
                label
                link
                v-if="userInfo.auth == 'admin'"
                class="white--text mr-5"
            >
                <v-icon large color="white" @click="goAdminPage()">
                    mdi-account-supervisor
                </v-icon>
            </v-chip>
            
            <v-chip
                color="purple"
                label
                link
                v-if="isLogin"
                class="white--text mr-5"
                @click="goMyAplyList()"
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
            ,userInfo:{}
            ,isLogin: false
            ,drawer: null
            ,items: [
                        {
                        text: '캠프소개',
                        disabled: false,
                        to: 'About',
                        },
                        {
                        text: '캠프등록',
                        disabled: false,
                        to: 'User',
                        },
                        {
                        text: '캠프실황',
                        disabled: false,
                        to: 'CampLive',
                        },
                    ],
        };
    },
    created() {
       console.log('router',this.$router);
       
        this.cookiesCtr();
        this.$socket.on('aply', (data)=>{
            console.log(data);
            _this.$awn.success('신청이 등록 되었습니다.');
        });

        this.$eventBus.$on('login',(data)=>{
            this.isLogin = data.isLogin;
            this.userInfo = data.userInfo;
        })
    },
    methods: {
        cookiesCtr: function(){
            var userInfo = this.$cookies.get("userInfo");
            if(userInfo){
              this.userInfo.nick = userInfo.name
              this.userInfo.profileImage = userInfo.profileImage
              this.userInfo.auth = userInfo.auth;
              this.isLogin = true;
            }else{
                this.logout();
            }
        }
        ,kakaoLogin: function() {
            location.href = 'https://kauth.kakao.com/oauth/authorize?'
                +'client_id=be0d818c768f8e2198c97470fc7577c5&'
                +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
                +'response_type=code&'
                +'scope=profile_nickname, profile_image, account_email, gender, friends';
            this.loading = !this.loading;
            setTimeout(() => (this.loading = false), 3000);
        },
        logout: function (){
             this.axios.post('/auth/logout')
             .then(()=>{
                this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
                this.isLogin = false; 
                this.userInfo = {};
            })
             .catch((e)=>{console.log(e);})
             .then(()=>{
                this.$router.push('/').catch(()=>{});
             });
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