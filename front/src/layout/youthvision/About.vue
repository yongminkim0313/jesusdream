<template>
  <v-card
    :loading="loading"
    class="mx-auto my-5 pa-5"
    max-width="800"
  >
    <v-container fluid>
      <v-row class="pa-5">
        <v-col cols="12" md="6" sm="12">
            <v-card>
            <v-card-title>2022여름유스비전캠프 안내</v-card-title>
            <v-img 
                :src="require('../../assets/about.png')"
                class="white--text align-end"
            >
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-card-subtitle>
            2022 여름 유스비전캠프 (since 2006)
          </v-card-subtitle>
          <v-card-text>
            <strong>"회복을 넘어 부흥의 새역사를 쓰자!"</strong>
            <br />
            ●강사: 장용성목사(유스비전대표) 김선배총장(한국침례신학대학교) 강은도목사(더푸른교회) 박윤호목사(강화하늘중앙교회) 민호기목사(찬미워십) 손경민목사(은혜, 행복) 김정희사모 듀나미스워십 외
            <br />
            <br />
            ●날짜: 8월 4일(목)~6일(토)
            <br />
            ●장소: 한국침례신학대학교 대강당 (대전)
            <br />
            ●대상: 초중고대청장년 선착순500명 조기마감
            <br />
            <br />
  
            ●회비: 78,000원 선등록 할인
            <br />
            (5.31까지 73,000원 6.30까지 74,000원 7.30까지 75,000원 8월부터 78,000원)
            <br />
            ●1박 2일 참여시 60,000원 무박 2일 참여시 50,000원
            <br />
            <br />
  
            ●등록: 1인 1만원 선입금시 정식등록  070-7796-1009
            <br />
            youthvision.co.kr 
            <br />
            ●계좌 : 국민 172601-04-185856 (유스비전)
            <br />
            <br />
  
            ●주최: 유스비전미니스트리
            <br />
  
            ※유스비전캠프는 노는 캠프가 아닙니다. 살아계신 하나님을 만나는 캠프입니다.
          </v-card-text>
        </v-col>
        <v-col cols="12" md="12" sm="12" class="d-flex flex-center">
          <v-btn @click="btnClick()">메인으로</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>  
</template>
<script>

export default {
  name: 'About',
  components: { },
  data(){return {
  }},
  created() {
  },
  methods : {
    btnClick: function(){
      this.$router.push('/');
    }
  }

}
</script>
