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

      </v-list-item>
    </v-list>
    </v-menu>
  </div>
  </v-row>
</template>
<script>

  export default {
    components:{ },
    data () {
      return {
        users:[],
      }
    },
    created(){
      this.initMessenger();
    },
    computed:{
      
    },
    methods:{
       initMessenger: function(){
            var _this = this;
            this.$socket.emit('connect users',{},(res)=>{
                _this.users = _this.usersMark(res);
            })
        },
       sendMsg: function(){
            Object.assign(this.sendMsgObj,{msg:this.msg});
            this.$socket.emit('sendMsg',this.sendMsgObj,(res)=>{
                console.log(res);
            });
            this.msg = '';
        },
        messengerSetting: function(chat){
          this.sendMsgObj = {
            toId : chat,
            fromId : this.userMe()
          }
          this.$eventBus.$emit('messenger open',this.sendMsgObj);
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
        },
        userMe: function(){
          var _this = this;
          return this.users.find((el)=>{ return el.id === _this.$socket.id});
        }
    }
  }
</script>
