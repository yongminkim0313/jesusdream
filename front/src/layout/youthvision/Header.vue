<template>
    <div>
        <v-app-bar app elevation="4" flat src="https://modo-phinf.pstatic.net/20190417_140/15554692250648Rq2Y_JPEG/mosa4Ri4kd.jpeg" class="d-flex flex-column" >
            <router-link to="/" class="mr-auto">
                <v-avatar>
                <img src="../../assets/jesusdream.png" alt="주님이꿈꾸신교회" >
                </v-avatar>
            </router-link>
            <v-spacer></v-spacer>
            <v-card>
                <v-text-field v-model="email" label="EMIAIL로 확인" hide-details rounded v-if="!isLogin" @keydown.enter="loginGuest();" ></v-text-field>
            </v-card>

            <!-- 카카오로그인 -->
            <v-img @click="kakaoLogin();" v-if="!isLogin" max-height="40" max-width="100" contain :src="require('/src/assets/kakaoLogin.png')"></v-img>
            <v-img @click="naverLogin();" v-if="!isLogin" max-height="40" max-width="100" contain src="http://static.nid.naver.com/oauth/small_g_in.PNG"></v-img>
            
            <v-chip
                color="purple"
                label
                link
                v-if="isLogin"
                class="white--text mr-5"
            >
            <v-icon large color="white" v-if="userInfo.auth == 'admin'" @click="goAdminPage()">
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
    </div>
</template>
<script>
export default {
    name:'Header',
    data(){
        return {
            userInfo:{}
            ,isLogin: false
            ,email:''
        };
    },
    created() {
       //console.log('access_token',this.$cookies.get("access_token"));
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
                +'client_id=5cqmO5It7BQBoMXaKyAN&'
                +'redirect_uri='+this.APP_URL+'/auth/naver/callback&'
                +'response_type=code&'
                +'&state=random_state';
        },
        logout: function (){
             this.axios.post('/auth/kakao/logout')
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