<template>
    <div>
        <v-app-bar app elevation="4" flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-card class="d-flex justify-space-between mx-auto" flat tile color="#f5f5f5">
                    {{menu[selectedMenu].menuTitle}}
            </v-card>
                <v-chip
                    label
                    link
                    v-if="userInfo.auth == 'admin'"
                >
                    <v-icon @click="goAdminPage()">
                        mdi-account-supervisor
                    </v-icon>
                </v-chip>
                
                <v-chip label link v-if="isLogin" @click="goMyAplyList()">
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
        goAdminMenu(item){
            this.$router.push(item.router).catch(()=>{})
        },
        goUserPage(){
            this.$router.push('/').catch(()=>{});
        }
    },

}
</script>