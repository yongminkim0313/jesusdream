<template>
 <v-card
    :loading="loading"
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

    <v-img
      height="250"
      src="https://modo-phinf.pstatic.net/20190417_275/1555469222917i4LfY_JPEG/mosacMoDVY.jpeg"
    ></v-img>
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
            v-model="aplyName"
            ref="aplyName"
            :error-messages="aplyNameErrors"
            :counter="10"
            label="신청자 이름"
            required
            @input="$v.aplyName.$touch()"
            @blur="$v.aplyName.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="jikbunSe"
            ref="jikbunSe"
            :items="items"
            :error-messages="jikbunSeErrors"
            label="직분"
            required
            @change="$v.jikbunSe.$touch()"
            @blur="$v.jikbunSe.$touch()"
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
            v-model="church"
            ref="church"
            :error-messages="churchErrors"
            label="교회명 (ex:주님이꿈꾸신교회)"
            required
            @input="$v.church.$touch()"
            @blur="$v.church.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="churchSe"
            ref="churchSe"
            :error-messages="churchSeErrors"
            label="교단 (ex:기독교한국침례회)"
            required
            @input="$v.churchSe.$touch()"
            @blur="$v.churchSe.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="churchAdtr"
            ref="churchAdtr"
            :error-messages="churchAdtrErrors"
            label="목사님 성함"
            required
            @input="$v.churchAdtr.$touch()"
            @blur="$v.churchAdtr.$touch()"
          ></v-text-field>

        </v-col>
      </v-row>
      <v-row><!--교회주소-->
        <v-col cols="7" md="9" sm="6">
          <v-text-field
            v-model="churchAddr"
            ref="churchAddr"
            :error-messages="churchAddrErrors"
            label="교회주소"
            required
            @input="$v.churchAddr.$touch()"
            @blur="$v.churchAddr.$touch()"
          ></v-text-field>

        </v-col>
        <v-col cols="5" md="3" sm="6">
          <v-btn @click="openAddrPop('churchAddr');">교회주소검색</v-btn>
          

        </v-col>
        <v-col cols="12" md="12" class="pa-0">
          <div id="churchAddrDiv" ref="churchAddrPop" style="display:none;border:1px solid;width:100%;height:300px;margin:5px 0;position:relative">
          <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" @click="foldAddrPop('churchAddr')" alt="접기 버튼">
          </div>

        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="churchDtlAddr"
            ref="churchDtlAddr"
            :error-messages="churchDtlAddrErrors"
            label="상세주소"
            required
            @input="$v.churchDtlAddr.$touch()"
            @blur="$v.churchDtlAddr.$touch()"
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
            v-model="phone"
            ref="phone"
            :error-messages="phoneErrors"
            label="연락처 (신청자, 인솔자 핸드폰 번호)"
            required
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
          ></v-text-field>

        </v-col>
        <v-col cols="6" md="6">
          <v-text-field
            v-model="email"
            ref="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>

        </v-col>
      </v-row>
      <v-row><!--우편물주소-->
        <v-col cols="7" md="9" sm="6">
          <v-text-field
            v-model="fullAddress"
            ref="fullAddress"
            :error-messages="addressErrors"
            label="우편물 주소"
            required
            @input="$v.fullAddress.$touch()"
            @blur="$v.fullAddress.$touch()"
          ></v-text-field>

        </v-col>
        <v-col cols="5" md="3" sm="6">
          <v-btn @click="openAddrPop();">우편물 주소검색</v-btn>

        </v-col>
        <v-col cols="12" md="12" class="pa-0">
          <div id="addrDiv" ref="addrPop" style="display:none;border:1px solid;width:100%;height:300px;margin:5px 0;position:relative">
          <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" @click="foldAddrPop()" alt="접기 버튼">
          </div>

        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="detailAddress"
            ref="detailAddress"
            :error-messages="detailAddressErrors"
            label="우편물 상세주소"
            required
            @input="$v.detailAddress.$touch()"
            @blur="$v.detailAddress.$touch()"
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
            v-model="schdlSe"
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
            v-model="joinHisSe"
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
            v-model="joinPathSe"
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
        <v-col cols="3" md="3" sm="4">
          <v-select
            v-model="campCnt.chodeung"
            :items="cnt50"
            attach
            label="초등"
          ></v-select>
        </v-col>
        <v-col cols="3" md="3" sm="4">
          <v-select
            v-model="campCnt.cheongsonyeon"
            :items="cnt50"
            attach
            label="청소년"
          ></v-select>
        </v-col>
        <v-col cols="3" md="3" sm="4">
          <v-select
            v-model="campCnt.cheongnyeon"
            :items="cnt50"
            attach
            label="청년"
          ></v-select>
        </v-col>
        <v-col cols="3" md="3" sm="4">
          <v-select
            v-model="campCnt.jangnyeon"
            :items="cnt50"
            attach
            label="장년"
          ></v-select>
        </v-col>
        <v-col cols="3" md="3" sm="4">
          <v-select
            v-model="campCnt.sayeogja"
            :items="cnt50"
            attach
            label="사역자"
          ></v-select>
        </v-col>
      </v-row>
      <v-row><!--참석인원변경안내-->
        <v-col cols="12" md="12">
          <v-divider class="ma-4"></v-divider>
          <v-card-title>
            * 참석인원 변경
          </v-card-title>
          <v-card-text>
            * 캠프 일주일 전, 최종명단, 회비완납과 함께 알려주시면 됩니다.
            <strong>(최종 참석자 명단은 캠프 1주일 전까지 메일로 보내주세요)</strong>
          </v-card-text>

        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-select
            v-model="bankNm"
            :items="dpstList"
            attach
            label="입금은행"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            v-model="pyrNm"
            ref="pyrNm"
            :error-messages="pyrNmErrors"
            label="입금자명"
            required
            @input="$v.pyrNm.$touch()"
            @blur="$v.pyrNm.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row><!--자동취소 동의-->
        <v-col>
            <v-checkbox
            v-model="checkbox"
            label="신청후 선입금 3일내 확인되지 않을 시 자동취소(동의 체크)"
            value="동의"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row><!--숙소(동의선택) 동의-->
        <v-col>
            <v-checkbox
            v-model="checkboxUseRoom"
            label="4인1실, 인원이 맞지 않을시 다른교회와 같이 쓰실 수 있습니다."
            value="동의"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="기타의견 및 메모사항" no-resize rows="2" v-model="memo" ></v-textarea>
        </v-col>
      </v-row>
      <v-row><!--신청하기버튼-->
        <v-col cols="12" md="12">
          <v-btn
            class="mr-4"
            @click="submit"
            color="primary"
            elevation="14"
          >
            수정하기
          </v-btn>

        </v-col>
      </v-row>
      <v-row><!--사진-->
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
            >
              </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </form>
  </v-card>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      aplyName: { required, maxLength: maxLength(10) },
      jikbunSe: { required },
      phone: {required, maxLength: maxLength(11) },
      church: { required, maxLength: maxLength(50) },
      churchSe: { required, maxLength: maxLength(50) },
      churchAdtr: { required, maxLength: maxLength(10) },
      churchAddr: { required },
      churchDtlAddr: { required },
      schdlSe:{ required },
      email: { required, email },
      fullAddress: {required },
      detailAddress: {required },
      pyrNm: {required},
      checkbox: {
        checked (val) {
          return val
        },
      },
      checkboxUseRoom: { required },
      bankNm: { required }
    },

    data: () => ({
      seq:0,
      loading: false,
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
      items: [ '학생', '교사', '목사', '성도', '전(강)도사', '기타', ],
      checkbox: '',
      fullAddress: '',
      detailAddress:'',
      joinHisSe: '처음참석',
      cards: [
        { title: '1', src: "https://modo-phinf.pstatic.net/20190419_50/15556444931447dN5T_JPEG/mosazECj1j.jpeg?type=a1100", flex: 12 },
        { title: '2', src: require('../../assets/jd3.jpeg'), flex: 12 },
        { title: '3', src: require('../../assets/jd4.jpeg'), flex: 12 },
      ],
      joinPathSe: [],
      paths: [
        { text: '인터넷 홍보(youtube, instar, facebook)', icon: 'mdi-nature', },
        { text: '포스터, 브로셔', icon: 'mdi-glass-wine', },
        { text: '지인소개 및 소문', icon: 'mdi-calendar-range', },
        { text: '지난 캠프 참석', icon: 'mdi-map-marker', },
        { text: '기타', icon: 'mdi-bike', },
      ],
      campCnt:{
        chodeung: 0,
        cheongsonyeon: 0,
        cheongnyeon: 0,
        jangnyeon: 0,
        sayeogja: 0,
      },
      cnt50:[],
      pyrNm: '',
      checkboxUseRoom: '',
      bankNm: '',
      dpstList:[
        '농협 351-0823-9838-33'
        ,'신한 140-011-071790' 
        ,'국민 172601-04-185856'
        ,'우리 1005-502-838415'
        ,'새마을 9002-1937-0057-1'
        ,'우체국 104570-01-002038'
      ],
      memo:''
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('동의가 필요합니다.')
        return errors
      },
      jikbunSeErrors () {
        const errors = []
        if (!this.$v.jikbunSe.$dirty) return errors
        !this.$v.jikbunSe.required && errors.push('직분을 입력해주세요')
        return errors
      },
      aplyNameErrors () {
        const errors = []
        if (!this.$v.aplyName.$dirty) return errors
        !this.$v.aplyName.maxLength && errors.push('이름을 10자 내로 입력해주세요')
        !this.$v.aplyName.required && errors.push('이름을 입력해주세요')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.maxLength && errors.push('연락처를 11자 내로 입력해주세요')
        !this.$v.phone.required && errors.push('연락처를 입력해주세요')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('올바른 이메일 주소를 입력해주세요')
        !this.$v.email.required && errors.push('E-mail을 입력해주세요')
        return errors
      },
      churchSeErrors () {
        const errors = []
        if (!this.$v.churchSe.$dirty) return errors
        !this.$v.churchSe.maxLength && errors.push('교단이 50자를 넘을수 없습니다')
        !this.$v.churchSe.required && errors.push('교단을 입력해주세요. 없으면 "없음" 을 입력해주세요')
        return errors
      },
      churchErrors () {
        const errors = []
        if (!this.$v.church.$dirty) return errors
        !this.$v.church.maxLength && errors.push('교회이름이 50자를 넘을수 없습니다')
        !this.$v.church.required && errors.push('교회이름을 입력해주세요. 없으면 "없음" 을 입력해주세요')
        return errors
      },
      churchAdtrErrors () {
        const errors = []
        if (!this.$v.churchAdtr.$dirty) return errors
        !this.$v.churchAdtr.maxLength && errors.push('목사님 성함이 10자를 넘을수 없습니다')
        !this.$v.churchAdtr.required && errors.push('목사님 성함을 입력해주세요. 없으면 "없음" 을 입력해주세요')
        return errors
      },
      churchAddrErrors () {
        const errors = []
        if (!this.$v.churchAddr.$dirty) return errors
        !this.$v.churchAddr.required && errors.push('주소를 입력해 주세요. 없으면 "없음" 을 입력해주세요')
        return errors
      },
      churchDtlAddrErrors () {
        const errors = []
        if (!this.$v.churchDtlAddr.$dirty) return errors
        !this.$v.churchDtlAddr.required && errors.push('상세주소를 입력해 주세요. 없으면 "없음" 을 입력해주세요')
        return errors
      },
      schdlSeErrors (){
        const errors = []
        if (!this.$v.schdlSe.$dirty) return errors
        !this.$v.schdlSe.required && errors.push('일정을 입력해주세요')
        return errors
      },
      addressErrors () {
        const errors = []
        if (!this.$v.fullAddress.$dirty) return errors
        !this.$v.fullAddress.required && errors.push('주소를 입력해 주세요')
        return errors
      },
      detailAddressErrors () {
        const errors = []
        if (!this.$v.detailAddress.$dirty) return errors
        !this.$v.detailAddress.required && errors.push('주소를 입력해 주세요')
        return errors
      },
      selections () {
        const selections = []
        for (const selection of this.joinPathSe) {
          selections.push(selection)
        }
        return selections
      },
      pyrNmErrors () {
        const errors = []
        if (!this.$v.pyrNm.$dirty) return errors
        !this.$v.pyrNm.required && errors.push('입금자명을 입력해 주세요')
        return errors
      },
      checkboxUseRoomErrors(){
        const errors = []
        if (!this.$v.checkboxUseRoom.$dirty) return errors
        !this.$v.checkboxUseRoom.required && errors.push('숙소 동의를 선택해주세요')
        return errors
      },
      bankNmErrors(){
        const errors = []
        if (!this.$v.bankNm.$dirty) return errors
        !this.$v.bankNm.required && errors.push('입금계좌를 선택해주세요')
        return errors
      }
    },
    created: function(){
      this.load();
        for(var i = 0 ; i < 50; i++){
          this.cnt50.push(i);
        }
    },
    methods: {
      submit () {
        this.$v.$touch();

        if (this.$v.$invalid) {
          // 1. Loop the keys
        for (let key in Object.keys(this.$v)) {
          // 2. Extract the input
          const input = Object.keys(this.$v)[key];
          // 3. Remove special properties
          if (input.includes("$")) return false;

          // 4. Check for errors
          if (this.$v[input].$error) {
            // 5. Focus the input with the error
            this.$refs[input].focus();

            // 6. Break out of the loop
            break;
          }
        }
      } else {
        // Submit the form here
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
        

        var aplyContents = {
          seq: this.seq,
          aplyName: this.aplyName,
          jikbunSe: this.jikbunSe,
          church: this.church,
          churchSe: this.churchSe,
          churchAdtr: this.churchAdtr,
          churchAddr: this.churchAddr,
          churchDtlAddr: this.churchDtlAddr,
          schdlSe: this.schdlSe,
          phone: this.phone,
          email: this.email,
          checkbox: this.checkbox,
          fullAddress: this.fullAddress,
          detailAddress: this.detailAddress,
          joinHisSe: this.joinHisSe,
          joinPathSe: this.joinPathSe,
          campCnt: this.campCnt,
          pyrNm: this.pyrNm,
          checkboxUseRoom: this.checkboxUseRoom,
          bankNm: this.bankNm,
          memo: this.memo
        }
        
        console.log(aplyContents);
        this.axios.put('/user/aply',aplyContents)
        .then((result)=>{
          console.log(result);
          
          this.$socket.emit('aply', aplyContents, (data)=>{console.log(data)});
          this.$awn.success('신청이 완료되었습니다.');

          this.$router.push({
            name: "MyAplyList",
            query: { phone: aplyContents.phone, seq: aplyContents.seq },
          });
        })
      }

      },
      openAddrPop (addrSe){
        var _this = this;
        var element_wrap = document.getElementById('addrDiv');
        if(addrSe) element_wrap = document.getElementById('churchAddrDiv');
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    // 우편번호와 주소 정보를 해당 필드에 
                } 
                if(addrSe){
                  _this.churchAddr = '('+data.zonecode+') '+addr+' '+extraAddr
                  _this.$refs.churchDtlAddr.focus();
                }else{
                  _this.fullAddress = '('+data.zonecode+') '+addr+' '+extraAddr
                  _this.$refs.detailAddress.focus();
                }
                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_wrap.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll;
            },
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            onresize : function(size) {
                element_wrap.style.height = size.height+'px';
            },
            width : '100%',
            height : '100%'
        }).embed(element_wrap);
        // iframe을 넣은 element를 보이게 한다.
        element_wrap.style.display = 'block';
      },
      foldAddrPop(addrSe){
        var element_wrap = document.getElementById('addrDiv');
        if(addrSe) element_wrap = document.getElementById('churchAddrDiv');
        element_wrap.style.display = 'none';
      },
      load(){
        var _this = this;
        var query = this.$route.query
        this.axios.get('/user/aply/one',{params:{seq : query.seq}})
        .then((result)=>{
          
          var aplyData = result.data
          console.log('aplyData:::',aplyData );
          _this.seq = aplyData.seq
          _this.aplyName = aplyData.aplyName;
          _this.jikbunSe=aplyData.jikbunSe;
          _this.church=aplyData.church;
          _this.churchSe=aplyData.churchSe;
          _this.churchAdtr=aplyData.churchAdtr;
          _this.churchAddr=aplyData.churchAddr;
          _this.churchDtlAddr=aplyData.churchDtlAddr;
          _this.schdlSe=aplyData.schdlSe;
          _this.phone=aplyData.phone;
          _this.email=aplyData.email;
          _this.checkbox=aplyData.checkbox;
          _this.fullAddress=aplyData.fullAddress;
          _this.detailAddress=aplyData.detailAddress;
          _this.joinHisSe=aplyData.joinHisSe;
          _this.joinPathSe=aplyData.joinPathSe;
          _this.campCnt=aplyData.campCnt;
          _this.pyrNm = aplyData.pyrNm;
          _this.checkboxUseRoom = aplyData.checkboxUseRoom;
          _this.bankNm = aplyData.bankNm;
          _this.memo = aplyData.memo;
        })
        .catch(()=>{})
      }
    }
  }
</script>


