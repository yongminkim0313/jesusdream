<template>
    <v-card max-width="800" class="mx-auto my-5 pa-5">
        <v-card-title>나의 캠프등록 신청내역</v-card-title>
        <v-data-table fixed-header dense :headers="headers" :items="myAplyList" item-key="seq" class="elevation-7" @click:row="clickList"
            disable-sort
            hide-default-footer
        >
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
        <v-divider class="pa-2"></v-divider>
        <v-card-title>나의 포스터 신청내역
          <v-btn dense color="blue" small elevation="5" @click="aplyPoster();" class="mx-auto" outlined>포스터 신청하러가기</v-btn>
        </v-card-title>
        <v-data-table fixed-header dense :headers="posterHeaders" :items="myPosterList" item-key="seq" class="elevation-7"
            disable-sort
            hide-default-footer
        >
        </v-data-table>
    </v-card>
    
</template>

<script>

export default {
  name: 'MyAplyList',
  components: { },
  data(){return {
    myAplyList: [],
    headers: [
          //{text: '번호', value: 'seq', align: 'center',sortable: false },
          {text: '상태', value: 'aplyPrgrs'}, //신청진행상황(접수, 접수완료, 신청취소)
          {text: '신청일', value: 'aplyDt'}, //신청일시
          {text: '신청자명', value: 'aplyName'},
          {text: '신청자직분', value: 'jikbunSe'},
          {text: '교회명', value: 'church'},
          {text: '교단', value: 'churchSe'},
          //{text: '목사님', value: 'churchAdtr'},
          //{text: '교회주소', value: 'churchAddr'},
          //{text: '교회상세주소', value: 'churchDtlAddr'},
          {text: '일정', value: 'schdlSe'},
          //{text: '연락처', value: 'phone'},
          //{text: '이메일', value: 'email'},
          //{text: '동의', value: 'checkbox'},
          //{text: '우편물주소', value: 'fullAddress'},
          //{text: '우편물상세주소', value: 'detailAddress'},
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
    myPosterList: [],
    posterHeaders: [
      {text: '상태', value: 'aplyPrgrs'}, //신청진행상황(접수, 접수완료, 신청취소)
      {text: '신청일', value: 'aplyDt'}, //신청일시
      {text: '신청자명', value: 'aplyName'},
      {text: '교회명', value: 'church'},
      {text: '브로셔', value: 'brochureCnt'},
      {text: '포스터', value: 'posterCnt'},
      {text: '우편물주소', value: 'addr'},
      {text: '우편물상세주소', value: 'dtlAddr'},
      //{text: '카카오아이디', value: 'kakaoEmail'},
    ],
  }},
  created() {
    this.getUserAply();
    this.getPosterAply();
  },
  methods : {
    getUserAply(){
      this.axios.get('/aply')
      .then((result)=>{
        this.myAplyList = result.data;
      })
    },
    getPosterAply(){
      this.axios.get('/poster')
      .then((result)=>{
        this.myPosterList = result.data;
      })
    },
    clickList(item) {
      if(!item.phone || !item.seq) return;
      this.$router.push({
        name: "MyAply",
        query: { phone: item.phone, seq: item.seq },
      });
    },
    clickReg(){
      this.$router.push({
        name: "User",
        query: {},
      })
    },
    clickAbout(){
      this.$router.push({
        name: "About",
        query: {},
      }); 
    },
    aplyPoster(){
        this.$router.push({
          name: "About",
          query: {tab:'poster'}
        })
    }
  }

}
</script>