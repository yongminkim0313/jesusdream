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
      <v-subheader>{{`현재접속 ${users.length}명`}}</v-subheader>
      <v-list-item
        v-for="chat in users"
        :key="chat.id"
      >
        <v-list-item-avatar>
          <v-img
            :alt="`${chat.name} profileImage`"
            :src="chat.profileImage"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title v-text="chat.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn icon small outlined @click="messengerSetting(chat)" v-show="!chat.me">
            <v-icon color="deep-purple accent-4">
              mdi-message-outline
            </v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    </v-menu>
  </div>
    <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" >
            <v-card>
              <v-toolbar dark color="primary" >
                <v-btn icon dark @click="dialog = false" >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                  <v-toolbar-title>
                   {{myInfo.name}}
                  </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-chip v-for="(item,index) in msgList" :key="index">{{item.msg}}</v-chip>
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
        users:[],
        sendMsgObj:{t:'', s:'', msg: ''},
      }
    },
    created(){
      this.initMessenger();
    },
    computed:{
      myInfo: function(){
        var info = this.users.find((el)=>{return el.id == this.$socket.id})
        return info||{};
      },
      otherInfo: function(){
        var info = this.users.find((el)=>{return el.id == this.sendMsgObj.t});
        return info||{};
      }
    },
    methods:{
       initMessenger: function(){
            var _this = this;
            this.$socket.emit('connect users',{},(res)=>{
                _this.users = _this.usersMark(res);
            })
            this.$socket.on('message', function (chat) {
                console.log(chat);
                _this.msgList.push(chat);
            });
            this.$socket.on('after connect users', (res)=>{
                _this.users = _this.usersMark(res);
            });
        },
       sendMsg: function(){
            Object.assign(this.sendMsgObj,{msg:this.msg});
            this.$socket.emit('sendMsg',this.sendMsgObj,(res)=>{
                console.log(res);
            });
            this.msg = '';
        },
        addMsg: function(chat){
            console.log(chat);
            this.msgList.push(chat);
        },
        messengerSetting: function(chat){
          this.sendMsgObj = {
            t : chat.id,
            s : this.$socket.id
          }
          this.dialog = true;
        },
        usersMark: function(users){
          users.forEach(el => {
            if(el.id == this.$socket.id){
              el.me = true;
            }else{
              el.me = false;
            }
          });
          return users;
        }
    }
  }
</script>