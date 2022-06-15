<template>
  <v-card>
      <v-card elevation="0" width="300" class="mx-auto">
        <v-card-title>{{userUpdateDt}}</v-card-title>
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
            :loading = "loading"
            loading-text="로딩중 기다려주세요~"
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
          {{$moment(item.connected_at).format('MM-DD HH시')}}
        </template>
        <template v-slot:[`item.auth`]="{ item }">
          <v-select
            v-model="item.auth"
            :items="authList"
            item-text="text"
            item-value="value"
            :rules="user_auth_rule"
            :background-color="item.auth=='admin'?'orange':''"
            dense
            solo
            class="pa-0 ma-0"
            width="10"
            @change="saveAuth(item)"
          ></v-select>
        </template>
    </v-data-table>
        <v-btn color="primary" elevation="2" @click="getUserList(false);" class="ma-10">
          저장된 친구목록 가져오기
        </v-btn>
        <v-btn color="warning" elevation="2" @click="getUserList(true);" class="ma-10">
          카카오 서버에서 친구목록 새로고침
        </v-btn>
        <v-btn color="success" elevation="2" @click="goTemplateMaker();" class="ma-10">
          카카오 메세지 템플릿 만들기
        </v-btn>
        <v-btn color="success" elevation="2" @click="unlinkUser();" class="ma-10">
          탈퇴테스트
        </v-btn>
        
  </v-card>
</template>
<script>

  export default {
    name:'userList',
    created(){
        this.getUserList();
    },
    data () {
      return {
          search:'',
          userList:[],
          userUpdateDt:'',
          headers: [
            {text: '프로필이미지', value: 'profile_image'},
            {text: '아이디', value: 'id', align: 'center',sortable: false },
            {text: '권한', value: 'auth', width: 200}, 
            {text: '닉네임', value: 'nickname'}, 
            {text: '가입일시', value: 'connected_at'}, 
            {text: '이메일', value: 'email'},
            {text: '성별', value: 'gender'}, 
            {text: '메세지', value: 'uuid'}, 
        ],
        authList:[{text:'사용자',value:'user'},{text:'관리자',value:'admin'}],
        user_auth_rule: [
          v => !!v || '권한은 필수 선택 사항입니다.'
        ],
        loading: true,
      }
    },
    methods:{
        saveAuth(item){
          var _this = this;
          this.axios.put('/admin/auth',item)
          .then((result)=>{
            console.log(result);
            _this.$awn.info(result.data.msg);
          })
        },
        getUserList(refresh){
          var _this = this;
            _this.loading = true;
            this.userList=[];
            this.axios.post('/admin/allUser',{refresh: refresh})
            .then((result)=>{
                var temp = result.data.userData;
                for(var idx in temp){
                    var a = temp[idx];
                    this.userList.push({
                        id: a.id,
                        nickname: a.properties['nickname'],
                        connected_at: a.connected_at,
                        profile_image: a.properties['thumbnail_image'],
                        email: a.kakao_account['email'],
                        gender: a.kakao_account['gender'],
                        uuid : a.uuid,
                        auth : a.auth
                    })
                }
                if(result.data.etcData.userUpdateDt){
                  _this.userUpdateDt = this.$moment(result.data.etcData.userUpdateDt).format('YYYY-MM-DD HH시mm분');
                }
            }).catch((err)=>{
              console.log(err);
            }).then(()=>{
              _this.loading=false;
            })
        },
      sendMsgFriend(item){
        this.axios.post('/admin/message/send',{uuid:item.uuid, templateId:77885, args:{}})
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
      },
      goTemplateMaker(){
        location.href='https://developers.kakao.com/tool/template-builder/app/745000/template/77557/component/thl/0';
      },
      unlinkUser(){
        this.axios.post('/admin/unlinkUser',{id:2245466046})
        .then((result)=>{
          console.log(result);
        })
      }
    }

  }
</script>
