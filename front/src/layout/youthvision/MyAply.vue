<template>
 <v-card
    class="mx-auto my-5 pa-5"
    max-width="800"
  >
  <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
      <!-- src="https://modo-phinf.pstatic.net/20190417_140/15554692250648Rq2Y_JPEG/mosa4Ri4kd.jpeg" -->
  <v-card-title>나의 신청 내역</v-card-title>
  <form>
    <v-container>
       <v-row><!--신청자이름, 직분 -->
        <v-divider class="ma-5"></v-divider>
        <v-col cols="12" md="12" class="d-flex flex-row">
          <v-icon
            large
            color="green darken-2"
          >
            mdi-human
          </v-icon>
          <v-card-title>신청자 정보</v-card-title>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="aplyData.aplyName"
            ref="aplyName"
            :counter="10"
            label="신청자 이름"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="aplyData.jikbunSe"
            ref="jikbunSe"
            :items="items"
            label="직분"
          ></v-select>
        </v-col>
      </v-row>
      <v-row><!--교회명,교단,목사님성함 -->
        <v-divider class="ma-5"></v-divider>
        <v-col cols="12" md="12" class="d-flex flex-row">
          <v-icon
            large
            color="green darken-2"
          >
            mdi-church
          </v-icon>
          <v-card-title>교회정보</v-card-title>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="aplyData.church"
            ref="church"
            label="교회명 (ex:주님이꿈꾸신교회)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="aplyData.churchSe"
            ref="churchSe"
            label="교단"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="aplyData.churchAdtr"
            ref="churchAdtr"
            label="목사님 성함"
          ></v-text-field>

        </v-col>
      </v-row>
      <v-row><!--교회주소-->
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            v-model="aplyData.churchAddr"
            ref="churchAddr"
            label="교회주소"
          ></v-text-field>

        </v-col>

        <v-col cols="12" md="12">
          <v-text-field
            v-model="aplyData.churchDtlAddr"
            ref="churchDtlAddr"
            label="상세주소"
          ></v-text-field>

        </v-col>
      </v-row>
      <v-row><!--연락처,Email-->
        <v-col cols="12" md="12" class="d-flex flex-row">
          <v-icon
            large
            color="green darken-2"
          >
            mdi-email-box
          </v-icon>
          <v-card-title>연락처,E-MAIL 우편물주소</v-card-title>
        </v-col>
        <v-col cols="6" md="6">
          <v-text-field
            v-model="aplyData.phone"
            ref="phone"
            label="연락처 (신청자, 인솔자 핸드폰 번호)"
          ></v-text-field>

        </v-col>
        <v-col cols="6" md="6">
          <v-text-field
            v-model="aplyData.email"
            ref="email"
            label="E-mail"
          ></v-text-field>

        </v-col>
      </v-row>
      <v-row><!--우편물주소-->
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            v-model="aplyData.fullAddress"
            ref="fullAddress"
            label="우편물 주소"
          ></v-text-field>

        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="aplyData.detailAddress"
            label="우편물 상세주소"
          ></v-text-field>

        </v-col>
      </v-row>
      <v-row><!--기간(2박3일)-->
        <v-divider class="ma-5"></v-divider>
        <v-col cols="12" md="12" class="d-flex flex-row">
          <v-icon
            large
            color="green darken-2"
          >
            mdi-calendar
          </v-icon>
          <v-card-title>캠프참여기간</v-card-title>
        </v-col>
        <v-col cols="12" md="12">
          <v-radio-group
            v-model="aplyData.schdlSe"
            row
          >
            <v-radio
              label="2박3일"
              value="2박3일"
            ></v-radio>
            <v-radio
              label="1박2일"
              value="1박2일"
            ></v-radio>
            <v-radio
              label="무박2일"
              value="무박2일"
            ></v-radio>
          </v-radio-group>
          
        </v-col>
      </v-row>
      <v-row><!--유스비전 참석여부-->
        <v-divider class="ma-5"></v-divider>
        <v-col cols="12" md="12" class="d-flex flex-row">
          <v-icon
            large
            color="green darken-2"
          >
            mdi-home-group
          </v-icon>
          <v-card-title>유스비전캠프 참석여부</v-card-title>

        </v-col>
        <v-col cols="12" md="12">
          <v-chip-group
            v-model="aplyData.joinHisSe"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip value="처음참석">유스비전캠프에 처음참석합니다</v-chip>
            <v-chip value="참석한적있음">지난 캠프에 참석한적이 있습니다</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row><!--유스비전 알게된 경로-->
        <v-divider class="ma-5"></v-divider>
        <v-col cols="12" md="12" class="d-flex flex-row">
          <v-icon
            large
            color="green darken-2"
          >
            mdi-youtube-tv
          </v-icon>
          <v-card-title>유스비전캠프 알게된 경로</v-card-title>
        </v-col>
        <v-col cols="12" md="12">
          <v-chip-group
            v-model="aplyData.joinPathSe"
            column
            multiple
          >
            <v-chip
              filter
              outlined
              v-for="path in paths"
              :key="path.text"
              :value="path.text"
            >
            {{path.text}}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row><!--인원선택-->
        <v-divider class="ma-5"></v-divider>
        <v-col cols="12" md="12" class="d-flex flex-row">
          <v-icon
            large
            color="green darken-2"
          >
            mdi-counter
          </v-icon>
          <v-card-title>참여인원</v-card-title>

        </v-col>
        <v-col cols="4" md="4" sm="4">
          초등 {{aplyData.campCnt.chodeung}} 명
        </v-col>
        <v-col cols="4" md="4" sm="4">
          청소년 {{aplyData.campCnt.cheongsonyeon}} 명
        </v-col>
        <v-col cols="4" md="4" sm="4">
          청년 {{aplyData.campCnt.cheongnyeon}} 명
        </v-col>
        <v-col cols="4" md="4" sm="4">
          장년 {{aplyData.campCnt.jangnyeon}} 명
        </v-col>
        <v-col cols="4" md="4" sm="4">
          사역자 {{aplyData.campCnt.sayeogja}} 명
        </v-col>
      </v-row>
      <v-row><!--참석인원변경안내-->
        <v-col cols="12" md="12">
          <v-divider class="ma-4"></v-divider>
          <v-card-title>
            * 참석인원 변경
          </v-card-title>
          <v-card-text>
            * 캠프 일주일 전, 최종명단, 회비완납과 함께 알려주시면 됩니다.(최종명단양식은 캠프일주일 전 신위 메일로 별도 발송)
          </v-card-text>
        </v-col>
      </v-row>
      <v-row><!--자동취소 동의-->
        <v-col>
            <v-checkbox
            v-model="aplyData.checkbox"
            label="신청후 선입금 3일내 확인되지 않을 시 자동취소(동의 체크)"
            value="동의"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
  </form>
  </v-card>
</template>
<script>

  export default {
    data: () => ({
        aplyData: {
            aplyName: '',
            jikbunSe: null,
            church:'',
            churchSe:'',
            churchAdtr:'',
            churchAddr:'',
            churchDtlAddr:'',
            churchAddrPop:false,
            schdlSe:'2박3일',
            phone: '',
            email: '',
            checkbox: '',
            fullAddress: '',
            detailAddress:'',
            joinHisSe: '처음참석',
            joinPathSe: [],
            campCnt:{
                chodeung: 0,
                cheongsonyeon: 0,
                cheongnyeon: 0,
                jangnyeon: 0,
                sayeogja: 0,
            },
        },
        paths: [
            {
            text: '인터넷 홍보(youtube, instar, facebook)',
            icon: 'mdi-nature',
            },
            {
            text: '포스터, 브로셔',
            icon: 'mdi-glass-wine',
            },
            {
            text: '지인소개 및 소문',
            icon: 'mdi-calendar-range',
            },
            {
            text: '지난 캠프 참석',
            icon: 'mdi-map-marker',
            },
            {
            text: '기타',
            icon: 'mdi-bike',
            },
        ],
        items: [
            '학생',
            '교사',
            '목사',
            '성도',
            '기타',
        ],
    }),

    computed: {},
    created: function(){
       var _this = this;
       this.axios.get('/aply')
        .then((result)=>{
          _this.aplyData = result.data[0]
          console.log('aplyData:::',_this.aplyData )
        })
    },
    methods: {}
  }
</script>


