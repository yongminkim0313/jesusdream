<template>
  <v-card>
      <v-btn color="primary" elevation="2" @click="getFriendList();" class="ma-10">
          친구목록
        </v-btn>
        <v-chip v-for="item in friendList" :key="item.id" @click="sendMsgFriend(item)"> {{item}}</v-chip>
  </v-card>
</template>
<script>

  export default {
    components: {
    },
    data () {
      return {
          friendList:[],
      }
    },
    methods:{
        getFriendList(){
      this.axios.post('/talk/friends',{})
      .then((result)=>{
        console.log(result.data);
        this.friendList = result.data.elements;
       })
    },
    sendMsgFriend(item){
      this.axios.post('/friends/message/send',{uuid:item.uuid, campCnt:{}})
      .then((data)=>{
        console.log(data);
       })
    }
    }
  }
</script>
