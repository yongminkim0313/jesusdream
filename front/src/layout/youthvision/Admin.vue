<template>
  <v-card elevation="0">
    
    <v-card elevation="0" class="mx-auto">
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field>
            <v-btn color="warning" elevation="2" @click="excelDown();">
              엑셀다운로드
            </v-btn>
        </v-card-title>
      </v-card>
        <v-data-table
            fixed-header
            dense
            :headers="headers"
            :items="aplyList"
            item-key="seq"
            :search="search"
            hide-default-footer
            :disable-items-per-page="true"
            :footer-props="{ 'items-per-page-options': [50, -1] }"
            :loading = "loading"
            loading-text="로딩중 기다려주세요~"
            disable-sort
        >
        <template v-slot:[`item.aplyPrgrs`]="{ item }">
          <v-select
            v-model="item.aplyPrgrs"
            :items="aplyPrgrsList"
            dense
            solo
            class="pt-5"
            @change="saveAply(item)"
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
        <template v-slot:[`item.aplyTotAmt`]="{ item }">
        <v-btn
          elevation="0"
        >
          {{item.aplyTotAmt | makeComma }}
        </v-btn>
        </template>
        <!-- <template v-slot:[`item.aplyPrgrs`]="{ item }">
        <v-btn
          elevation="2"
          @click="sendMsgUser(item);"
        >
          메세지
        </v-btn>
        </template> -->
        <template v-slot:[`item.campCnt`]="{ item }">
        <v-chip small v-if="item.campCnt.chodeung != 0">
            {{ '초등:'+item.campCnt.chodeung}}
        </v-chip>
        <v-chip small v-if="item.campCnt.cheongsonyeon != 0">
            {{ '청소년:'+item.campCnt.cheongsonyeon}}
        </v-chip>
        <v-chip small v-if="item.campCnt.cheongnyeon != 0">
            {{ '청년:'+item.campCnt.cheongnyeon}}
        </v-chip>
        <v-chip small v-if="item.campCnt.jangnyeon != 0">
            {{ '장년:'+item.campCnt.jangnyeon}}
        </v-chip>
        <v-chip small v-if="item.campCnt.sayeogja != 0">
            {{ '사역자:'+item.campCnt.sayeogja}}
        </v-chip>
        </template>
        </v-data-table>
  </v-card>
</template>
<script>
export default {
  components: {
  },
  data(){
      return {
        search:'',
        aplyList: [],
        items: [
          { title: '캠프등록현황', icon: 'mdi-home-city' },
          { title: '완료내역', icon: 'mdi-account-group-outline' },
        ],
         headers: [
          {text: '번호', value: 'seq', align: 'center',sortable: false },
          {text: '상태', value: 'aplyPrgrs', width: 50}, //신청진행상황(접수, 접수완료, 신청취소)
          {text: '신청일', value: 'aplyDt'}, //신청일시
          {text: '은행', value: 'bankNm'},
          {text: '신청자명', value: 'aplyName'},
          {text: '신청자직분', value: 'jikbunSe'},
          {text: '교회명', value: 'church'},
          {text: '교단', value: 'churchSe'},
          {text: '목사님', value: 'churchAdtr'},
          {text: '교회주소', value: 'churchAddr'},
          {text: '교회상세주소', value: 'churchDtlAddr'},
          {text: '일정', value: 'schdlSe'},
          {text: '연락처', value: 'phone'},
          {text: '이메일', value: 'email'},
          //{text: '동의', value: 'checkbox'},
          {text: '우편물주소', value: 'fullAddress'},
          {text: '우편물상세주소', value: 'detailAddress'},
          //{text: '참석여부', value: 'joinHisSe'},
          //{text: '참여경로', value: 'joinPathSe'},
          {text: '캠프인원', value: 'campCnt'},
          //{text: '등록자', value: 'rgtrNm'},
          //{text: '등록일시', value: 'rgtrDt'},
          //{text: '수정자', value: 'updtNm'},
          //{text: '수정일시', value: 'updtDt'},
          //{text: '카카오아이디', value: 'kakaoEmail'},
          //{text: '총금액', value: 'aplyTotAmt'}, //신청총금액
        ],
        aplyPrgrsList:['접수','가등록','등록완료','등록취소'],
        loading: true,
      }
    },
  created() {
      // this.findaplyList();
      var _this = this;
      this.getAplyAll();
      this.$socket.on('aply', (data)=>{
        console.log(data);
        _this.$awn.success('신청이 등록 되었습니다.');
        _this.getAplyAll();
      });
  },
  computed:{
  },
  methods : {
    getAplyAll(){
      var _this = this;
      this.axios.get('/user/aply/all',{})
      .then((result)=>{
        console.log(result);
        _this.aplyList = result.data;
        _this.loading = false;
       })
    },
    deleteAply(item){
      console.log(item);
      var _this = this;
      this.axios.delete('/user/aply',item)
      .then((data)=>{
        console.log(data);
        var idx = _this.aplyList.findIndex((data)=>{
          return data.seq === item.seq;
        });
        if(idx > -1)_this.aplyList.splice(idx,1);
       })
    },
    diffTime (time) { 
      const moment = require('moment') 
      const today = moment()
      const diffValue = moment.duration(today.diff(time));
      return diffValue.days(); 
    },
    parseContents(contents){
      return eval(contents);
    },
    sendMsgUser(order){
      console.log(order);
      this.$socket.emit('sendMsgUser', { customerName: order.customerName, msg:'주문접수되었습니다.'})
    },
    saveAply(item){
      this.axios.put('/admin/aply/one',item)
      .then((data)=>{
        console.log(data);
       })
    },
    excelDown(){
      this.axios.post('/admin/aply/excel',{})
      .then((result)=>{
        var resp = result.data;
          if(!resp.result) {
            alert('엑셀 다운로드 중 문제가 발생했습니다.');
            return false;
          }
          let excelUri = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
          let excelUrl = excelUri + resp.content; // resp.content는 엑셀 데이터입니다. 
          let filename = '유스비전 등록신청_'+this.$moment().format('YYYY-MM-DD') // 다운받는 파일의 이름 지정 
          setTimeout(function () {
            var a = document.createElement("a");
            a.href = excelUrl;
            a.download = filename;
            a.click();
          }, 100);
          this.$awn.success('엑셀 다운로드를 완료하였습니다.');
      })
    },
    
  }
 };
</script>

