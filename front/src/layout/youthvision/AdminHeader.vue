<template>
    <div>
        <v-app-bar app elevation="4" flat class="d-flex flex-column" >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>

            <!-- 카카오로그인 -->
            <v-img @click="kakaoLogin();" v-if="!isLogin" max-height="40" max-width="100" contain :src="require('/src/assets/kakaoLogin.png')"></v-img>
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
        
        
        <v-layout>
            <v-navigation-drawer v-model="drawer" temporary app>
                <v-avatar class="ma-2">
                    <img src="../../assets/jesusdream.png" alt="주님이꿈꾸신교회" >
                </v-avatar>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <router-link :to="item.router" class="mr-auto" v-for="item in menu" :key="item.router">
                    <v-list-item prepend-icon="mdi-view-dashboard">{{item.menuTitle}}</v-list-item>
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
            userInfo:{}
            ,isLogin: false
            ,drawer: null
            ,menu:[
                {menuTitle:'사용자홈', router:'/'},
                {menuTitle:'신청등록내역', router:'/admin'},
                {menuTitle:'포스터신청내역', router:'/adminPoster'},
                {menuTitle:'신청등록', router:'/user'},
            ]
        };
    },
    created() {
       console.log('router',this.$router);
       //console.log('user_info',this.$cookies.get("user_info"));
       
        this.cookiesCtr();
       this.$socket.on('aply', (data)=>{
           console.log(data);
        _this.$awn.success('신청이 등록 되었습니다.');
      });
    },
    methods: {
        cookiesCtr: function(){
            var userInfo = this.$cookies.get("userInfo");
            if(userInfo){
              this.userInfo.nick = userInfo.name
              this.userInfo.profileImage = userInfo.profileImage
              this.userInfo.auth = userInfo.auth;
              this.isLogin = true;
            }
        }
        ,kakaoLogin: function() {
            location.href = 'https://kauth.kakao.com/oauth/authorize?'
                +'client_id=be0d818c768f8e2198c97470fc7577c5&'
                +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
                +'response_type=code&'
                +'scope=profile_nickname, profile_image, account_email, gender';
        },
        naverLogin: function(){
            location.href = 'https://nid.naver.com/oauth2.0/authorize?'
                +'client_id=bPxYuX29XnXff1HhWpHP&'
                +'redirect_uri='+this.APP_URL+'/auth/naver/callback&'
                +'response_type=code&'
                +'&state=random_state';
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