<template>
    <div>
        <v-app-bar app elevation="4" flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-card class="d-flex justify-space-between mx-auto" flat tile color="#f5f5f5">
                    {{menu[selectedMenu].menuTitle}}
            </v-card>
                <v-chip label link>
                    관리자 {{userInfo.nick}} 님
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
                    <img src="../../assets/jesusdream.png" alt="주님이꿈꾸신교회" @click="goUserPage()">
                </v-avatar>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item-group v-model="selectedMenu" mandatory>
                        <v-list-item v-for="item in menu" :key="item.menuTitle"
                            prepend-icon="mdi-view-dashboard" @click="goAdminMenu(item)">{{item.menuTitle}}</v-list-item>
                </v-list-item-group>
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
            ,selectedMenu:0
            ,menu:[
                {menuTitle:'신청등록내역', router:'/admin'},
                {menuTitle:'포스터신청내역', router:'/adminPoster'},
                {menuTitle:'캠프실황, 언론보도', router:'/campLiveEdit'},
                {menuTitle:'달력', router:'/calendar'},
                {menuTitle:'통계', router:'/statistic'},
                {menuTitle:'사용자목록', router:'/userList'},
            ]
        };
    },
    created() {
        this.cookiesCtr();
        this.$socket.on('connect user info', (data)=>{
            this.$awn.success('userList::'+ JSON.stringify(data));
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
        },
        logout: function (){
             this.axios.post('/auth/logout')
             .then(()=>{})
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
        goAdminMenu(item){
            this.$router.push(item.router).catch(()=>{})
        },
        goUserPage(){
            this.$router.push('/').catch(()=>{});
        }
    },

}
</script>