<template>
  <v-card>
      <v-card elevation="0" width="300" class="mx-auto">
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      </v-card>
      <v-data-table fixed-header dense
            :headers="headers"
            :items="userList"
            item-key="id"
            :search="search"
        >
        <template v-slot:[`item.profile_image`]="{ item }">
            <v-avatar size="36px" >
                <img v-if="item.profile_image" alt="Avatar" :src="item.profile_image" >
            </v-avatar>
        </template>
        <template v-slot:[`item.uuid`]="{ item }">
          <v-btn v-if="item.uuid" @click="sendMsgFriend(item)">메세지 보내기</v-btn>
        </template>
    </v-data-table>
      <v-btn color="primary" elevation="2" @click="getUserList();" class="ma-10">
          친구목록
        </v-btn>
        <v-btn color="warning" elevation="2" @click="getFriendList();" class="ma-10">
          메세지전송 동의자 불러오기
        </v-btn>
  </v-card>
</template>
<script>

  export default {
    name:'userList',
    created(){
        //this.getUserList();
    },
    data () {
      return {
          search:'',
          userList:[],
          headers: [
            {text: '프로필이미지', value: 'profile_image'},
            {text: '아이디', value: 'id', align: 'center',sortable: false },
            {text: '닉네임', value: 'nickname'}, 
            {text: '이메일', value: 'email'},
            {text: '성별', value: 'gender'}, 
            {text: 'uuid', value: 'uuid'}, 
        ],
      }
    },
    methods:{
        getUserList(){
            this.axios.post('/app/users')
            .then((result)=>{
                console.log(result.data);
                var temp = result.data;
                for(var idx in temp){
                    console.log(temp[idx])
                    var a = temp[idx];
                    this.userList.push({
                        id: a.id,
                        nickname: a.properties['nickname'],
                        profile_image: a.properties['thumbnail_image'],
                        email: a.kakao_account['email'],
                        gender: a.kakao_account['gender'],
                    })
                }
            })
        },
        getFriendList(){
        if(this.userList.length == 0){
            this.$awn.info('친구목록을 먼저 가져와야 합니다.');
            return;
        }
        this.axios.post('/talk/friends')
        .then((result)=>{
            console.log(result.data);
            var allowList = result.data['elements'];
            for(var idx in this.userList){
                var user = this.userList[idx];
                
                for(var i in allowList){
                    console.log(allowList[i].id, user.id)
                    if(allowList[i].id == user.id){
                        user.uuid = allowList[i].uuid;
                        this.userList.splice(3,1,user);
                    }
                }
            }

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
