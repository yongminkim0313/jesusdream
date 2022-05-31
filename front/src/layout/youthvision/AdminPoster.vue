<template>
  <v-card elevation="0">
    
    <v-card elevation="0" width="300" class="mx-auto">
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      </v-card>
        <v-data-table
            fixed-header
            dense
            :headers="headers"
            :items="posterList"
            item-key="seq"
            :search="search"
        >
        <template v-slot:[`item.aplyPrgrs`]="{ item }">
          <v-select
            v-model="item.aplyPrgrs"
            :items="aplyPrgrsList"
            dense
            solo
            class="pt-5"
            width="10"
            @change="savePoster(item)"
          ></v-select>
        </template>
        <template v-slot:[`item.aplyDt`]="{ item }">
          <v-row>{{item.aplyDt }}</v-row>
          <v-row>
            <v-badge dot
            :value="diffTime(item.aplyDt) > 3 ?  1 : 0 "
            >
            ({{diffTime(item.aplyDt)}}일 지남)
            </v-badge>
          </v-row>
        </template>
        </v-data-table>
        <v-btn
          color="primary"
          elevation="2"
          @click="getPosterAll();"
          class="ma-10"
        >
          조회
        </v-btn>
  </v-card>
</template>
<script>
export default {
  components: {
  },
  data(){
      return {
        search:'',
        posterList: [],
        items: [
          { title: '캠프등록현황', icon: 'mdi-home-city' },
          { title: '완료내역', icon: 'mdi-account-group-outline' },
        ],
         headers: [
          {text: '번호', value: 'seq', align: 'center',sortable: false },
          {text: '상태', value: 'aplyPrgrs'}, 
          {text: '신청일시', value: 'aplyDt'}, //신청일시
          {text: '신청자명', value: 'aplyName'},
          {text: '교회명', value: 'church'},
          {text: '우편물주소', value: 'addr'},
          {text: '상세주소', value: 'dtlAddr'},
          {text: '연락처', value: 'phone'},
          {text: '이메일', value: 'email'},
          {text: '카카오아이디', value: 'kakaoEmail'},
        ],
        aplyPrgrsList:['접수','발송완료','발송취소']
      }
    },
  created() {
      var _this = this;
      this.getPosterAll();
      this.$socket.on('poster', (data)=>{
        console.log(data);
        _this.$awn.success('신청이 등록 되었습니다.');
        _this.getPosterAll();
      });
  },
  computed:{
  },
  methods : {
    getPosterAll(){
      var _this = this;
      this.axios.get('/poster/all',{})
      .then((result)=>{
        console.log(result);
        _this.posterList = result.data;
       })
    },
    diffTime (time) { 
      const moment = require('moment') 
      const today = moment()
      const diffValue = moment.duration(today.diff(time));
      return diffValue.days(); 
    },
    savePoster(item){
      this.axios.put('/poster/one',item)
      .then((data)=>{
        console.log(data);
       })
    }
  }
 };
</script>

