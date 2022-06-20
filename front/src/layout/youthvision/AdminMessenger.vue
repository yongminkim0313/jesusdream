<template>
  <v-row justify="center">
    <div class="text-center">
    <v-menu offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon small outlined>
          <v-icon color="grey darken-1">mdi-human</v-icon>
        </v-btn>
      </template>

      <v-list subheader>
      <v-subheader>현재접속 명</v-subheader>
      <v-list-item
        v-for="chat in users"
        :key="chat.id"
      >
        <v-list-item-avatar>
          <v-img
            :alt="`${chat.userInfo.nick} profileImage`"
            :src="chat.userInfo.profileImage"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title v-text="chat.userInfo.nick"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon v-if="chat.id!=socketId">
          <v-icon color="deep-purple accent-4" @click="openDialog(chat)">
            mdi-message-outline
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    </v-menu>
  </div>
    
    <v-dialog
      v-model="dialog"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary" >
          <v-btn icon dark @click="dialog = false" >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{receiveUser}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false" >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
            <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown" >
                <v-timeline-item
                v-for="(item, i) in msgList"
                :key="i"
                :color="item.color"
                fill-dot
                >
                <template v-slot:icon>
                    <v-avatar>
                        <img :src="item.userInfo.profileImage">
                    </v-avatar>
                </template>
                <v-card :color="item.me?'green lighten-1':'indigo'" dark >
                    <v-card-title class="text-h6">
                    {{item.userInfo.nick}}
                    </v-card-title>
                    <v-card-text class="white text--primary">
                    <p>{{item.userInfo.msg}}</p>
                    </v-card-text>
                </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
        
        <v-divider></v-divider>
        
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-footer app>
            <v-container>
                <v-row>
                    <v-col cols="8">
                        <v-textarea solo label="문의" v-model="msg" @keypress.enter="sendMsg()"></v-textarea>
                    </v-col>
                    <v-col cols="4">
                        <v-btn @click="sendMsg()">
                            <span>Nearby</span>
                            <v-icon>mdi-map-marker</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        msg:'',
        msgList: [],
        receiveUser:{}
        ,users:{}
      }
    },
    created(){
        console.log(this.$socket)
        
        this.$socket.on('connect user info', (res)=>{
            console.log('connect user info',res);
            var idx = res.findIndex((el)=>{ return el.id == this.$socket.id});
            Object.assign(res[idx],{me:true});
            this.users = res;
        });

        this.$eventBus.$on('openDialog',(user)=>{
            console.log(user);
            this.receiveUser = user;
            this.dialog = user.dialog;
            if(user.userInfo.msg){
                this.addMsg(user.userInfo.msg);
            }
        })
    },
    methods:{
       getUsers: function(){
            this.$socket.emit('connect users',{},(res)=>{
                console.log('connect users::::',res);
                var idx = res.findIndex((el)=>{ return el.id == this.$socket.id});
                Object.assign(res[idx],{me:true});
                this.users = res;
            })
        },
       sendMsg: function(){
            this.user.userInfo.msg = this.msg;
            this.$socket.emit('sendMsg',{},(res)=>{
                console.log(res);
            });
            this.addMsg(this.msg);
            this.msg = '';
        },
        addMsg: function(message){
            this.msgList.push({
                userInfo: {
                    nick: '김용민',
                    profileImage: 'https://k.kakaocdn.net/dn/boAP5T/btrEYIsmbED/RCkGo3kEfIUuXkcwRZZGEk/img_640x640.jpg',
                    msg:message
                }
            })
        }
    }
  }
</script>