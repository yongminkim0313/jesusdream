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
            hide-default-footer
            :disable-items-per-page="true"
            :footer-props="{ 'items-per-page-options': [50, -1] }"
        >
        <template v-slot:[`item.aplyPrgrs`]="{ item }">
          <v-row class="pa-0">
            <v-col cols="10" class="pa-0">
              <v-select
              v-model="item.aplyPrgrs"
              :items="aplyPrgrsList"
              dense
              solo
              hide-details
              @change="savePoster(item)"
            ></v-select>
          </v-col>
          <v-col cols="2" class="pa-0" v-if="item.aplyPrgrs == '발송취소'">
            <v-icon small @click="deletePoster(item)">
                mdi-delete
            </v-icon>
          </v-col>
          </v-row>
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
        <template v-slot:[`item.brochureCnt`]="{ item }">
            <v-select
              v-model="item.brochureCnt"
              :items="cnt50"
              attach
              label="브로셔"
              @change="savePoster(item)"
            ></v-select>
        </template>
        <template v-slot:[`item.posterCnt`]="{ item }">
            <v-select
              v-model="item.posterCnt"
              :items="cnt50"
              attach
              label="포스터"
              @change="savePoster(item)"
            ></v-select>
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
        cnt50:[],
        items: [
          { title: '캠프등록현황', icon: 'mdi-home-city' },
          { title: '완료내역', icon: 'mdi-account-group-outline' },
        ],
         headers: [
          {text: '번호', value: 'seq', align: 'center',sortable: false , width:30},
          {text: '상태', value: 'aplyPrgrs', width:120}, 
          {text: '브로셔', value: 'brochureCnt', width:50},
          {text: '포스터', value: 'posterCnt', width:50},
          {text: '신청일', value: 'aplyDt', width:80}, //신청일시
          {text: '신청자명', value: 'aplyName', width:60},
          {text: '교회명', value: 'church', width:120},
          {text: '우편물주소', value: 'addr', width:300},
          {text: '상세주소', value: 'dtlAddr', width:150},
          {text: '연락처', value: 'phone', width:70},
          {text: '이메일', value: 'email', width:100},
        ],
        aplyPrgrsList:['접수','발송완료','발송취소']
      }
    },
  created() {
    for(var i = 0 ; i < 50; i++){
      this.cnt50.push(i);
    }
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
      this.axios.get('/admin/poster/all',{})
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
      this.axios.put('/user/poster/one',item)
      .then((data)=>{
        console.log(data);
       })
    },
    deletePoster(item){
      console.log(item);
      var _this = this;
      this.axios.delete('/user/poster/one',{data: item})
      .then((data)=>{
        console.log(data);
        _this.getPosterAll();
       })
    }
  }
 };
</script>

