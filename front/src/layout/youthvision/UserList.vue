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
            hide-default-footer
            :disable-items-per-page="true"
            :footer-props="{ 'items-per-page-options': [50, -1] }"
        >
        <template v-slot:[`item.profile_image`]="{ item }">
            <v-avatar size="36px" >
                <img v-if="item.profile_image" alt="Avatar" :src="item.profile_image" >
            </v-avatar>
        </template>
        <template v-slot:[`item.uuid`]="{ item }">
          <v-btn v-if="item.uuid" small @click="sendMsgFriend(item)">메세지 보내기</v-btn>
        </template>
        <template v-slot:[`item.gender`]="{ item }">
          <v-icon color="pink" v-if="item.gender=='female'">mdi-human-female</v-icon>
          <v-icon color="blue" v-if="item.gender=='male'">mdi-human-male</v-icon>
        </template>

        <template v-slot:[`item.connected_at`]="{ item }">
          {{$moment(item.connected_at).format('MM-DD hh시')}}
        </template>
    </v-data-table>
        <v-btn color="primary" elevation="2" @click="getUserList(false);" class="ma-10">
          저장된 친구목록 가져오기
        </v-btn>
        <v-btn color="warning" elevation="2" @click="getUserList(true);" class="ma-10">
          카카오 서버에서 친구목록 새로고침
        </v-btn>
  </v-card>
</template>
<script>

  export default {
    name:'userList',
    created(){
        this.getUserList();
        console.log(this.$moment);
    },
    data () {
      return {
          search:'',
          userList:[],
          headers: [
            {text: '프로필이미지', value: 'profile_image'},
            {text: '아이디', value: 'id', align: 'center',sortable: false },
            {text: '닉네임', value: 'nickname'}, 
            {text: '가입일시', value: 'connected_at'}, 
            {text: '이메일', value: 'email'},
            {text: '성별', value: 'gender'}, 
            {text: '메세지', value: 'uuid'}, 
        ],
      }
    },
    methods:{
        getUserList(refresh){
            this.userList=[];
            this.axios.post('/app/users',{refresh: refresh})
            .then((result)=>{
                var temp = result.data;
                for(var idx in temp){
                    var a = temp[idx];
                    this.userList.push({
                        id: a.id,
                        nickname: a.properties['nickname'],
                        connected_at: a.connected_at,
                        profile_image: a.properties['thumbnail_image'],
                        email: a.kakao_account['email'],
                        gender: a.kakao_account['gender'],
                        uuid : a.uuid
                    })
                }
            })
        },
    sendMsgFriend(item){
      this.axios.post('/friends/message/send',{uuid:item.uuid, args:{}})
      .then((result)=>{
        console.log(result.data);
        if(result.data && result.data['successful_receiver_uuids']){
          if(item.uuid == result.data['successful_receiver_uuids'][0]){
            this.$awn.success('메세지 전송 성공');
          }else{
            this.$awn.warning('알수없는 오류 관리자에게 문의 요망!');
          }
        }else{
          this.$awn.warning('메세지 전송 실패')
        }
       })
    }
    }
  }
</script>
