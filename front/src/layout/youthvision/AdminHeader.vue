<template>
    <div>
        <v-app-bar app elevation="4" flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-card class="d-flex justify-space-between mx-auto" flat tile color="#f5f5f5">
                    {{menu[selectedMenu].menuTitle}}
            </v-card>
                <messenger></messenger>
                <v-chip label link v-if="this.USERINFO.isLogin">
                    관리자 {{this.USERINFO.name}} 님
                </v-chip>
                
                <v-btn fab small @click="logout();" v-if="this.USERINFO.isLogin" >
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
import Messenger from "./AdminMessenger.vue";

export default {
    name:'Header',
    components:{ Messenger },
    data(){
        return {
            drawer: null
            ,selectedMenu:0
            ,menu:[
                {menuTitle:'신청등록내역', router:'/admin'},
                {menuTitle:'포스터신청내역', router:'/adminPoster'},
                {menuTitle:'캠프실황, 언론보도', router:'/campLiveEdit'},
                {menuTitle:'달력', router:'/calendar'},
                {menuTitle:'통계', router:'/statistic'},
                {menuTitle:'사용자목록', router:'/userList'},
            ],
            socketId:{}
        };
    },
    created() {
    },
    methods: {
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
        goAdminMenu(item){
            this.$router.push(item.router).catch(()=>{})
        },
        goUserPage(){
            this.$router.push('/').catch(()=>{});
        }
    },

}
</script>