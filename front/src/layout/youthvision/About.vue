<template>
  <v-card width="800" class="mx-auto" elevation="5">
    
    <v-container fluid>
      <v-row class="pa-0">
        <v-col cols="12" class="d-flex justify-center">
          <v-card elevation="0">
            <v-tabs v-model="tab" color="deep-purple-accent-4" end>
              <v-tab value="0">개요</v-tab>
              <v-tab value="1">포스터 브로셔 신청</v-tab>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="pa-2">

           
          <v-container fluid>
            <v-row v-if="tab==0">
              
              <v-col cols="12" md="12" sm="12">
                <v-card>
                  <v-card-title>2022여름유스비전캠프 안내</v-card-title>
                      <!-- <v-img :src="require('../../assets/about.png')" class="white--text align-end"></v-img> -->
                    <v-carousel
                      cycle
                      hide-delimiter-background
                      show-arrows-on-hover
                      height="auto"
                    >
                      <v-carousel-item v-for="(slide, i) in slides" :key="i" eager>
                      <v-img contain :src="slide" eager></v-img>
                      </v-carousel-item>
                    </v-carousel>
                </v-card>
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <v-card-subtitle>
                  2022 여름 유스비전캠프 (since 2006)
                </v-card-subtitle>
                <v-card-text>
                  <strong>"회복을 넘어 부흥의 새역사를 쓰자!"</strong>
                  <br />
                  ●강사: 장용성목사(유스비전대표) 김선배총장(한국침례신학대학교) 
                  <br />강은도목사(더푸른교회) 박윤호목사(강화하늘중앙교회) 
                  <br />민호기목사(찬미워십) 손경민목사(은혜, 행복) 김정희사모 듀나미스워십 외
                  <br />
                  <br />
                  ●날짜: 8월 4일(목)~6일(토)
                  <br />
                  ●장소: 한국침례신학대학교 대강당 (대전)
                  <br />
                  ●대상: 초중고대청장년 선착순500명 조기마감
                  <br />
                  ●회비: 78,000원 선등록 할인
                  <br />
                  (5.31까지 73,000원 6.30까지 74,000원 7.30까지 75,000원 8월부터 78,000원)
                  <br />
                  ●1박 2일 참여시 60,000원 무박 2일 참여시 50,000원
                  <br />
                  <br />
        
                  ●등록: 1인 1만원 선입금시 정식등록  
                  <br />
                  070-7796-1009
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
            </v-row>


            <v-row v-if="tab==1">
              
              <v-col cols="12" md="6" sm="12">
                <v-card>
                  <v-card-title>브로셔</v-card-title>
                  <v-img contain :src="require('../../assets/brochure2.jpg')" class="white--text align-end"></v-img>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-card>
                  <v-card-title>포스터</v-card-title>
                  <v-img contain :src="require('../../assets/포스터.jpeg')" class="white--text align-end"></v-img>
                </v-card>
              </v-col>

              <v-row class="pa-2" dense>
                
                <v-col cols="6">
                  <v-card-text>
                    <v-select
                      v-model="brochureCnt"
                      :items="cnt50"
                      attach
                      label="브로셔"
                    ></v-select>
                  </v-card-text>
                  </v-col>
                  <v-col cols="6">
                    <v-card-text>
                      <v-select
                      v-model="posterCnt"
                      :items="cnt50"
                      attach
                      label="포스터"
                    ></v-select>
                  </v-card-text>
                  </v-col>
              </v-row>
              <v-row class="pa-2" dense>
                
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
                  <v-text-field
                    v-model="church"
                    ref="church"
                    :error-messages="churchErrors"
                    :counter="10"
                    label="교회 명"
                    required
                    @input="$v.church.$touch()"
                    @blur="$v.church.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="7" md="9" sm="6">
                  <v-text-field
                    v-model="addr"
                    ref="addr"
                    :error-messages="addrErrors"
                    label="받으실주소"
                    required
                    @input="$v.addr.$touch()"
                    @blur="$v.addr.$touch()"
                  ></v-text-field>

                </v-col>
                <v-col cols="5" md="3" sm="6">
                  <v-btn @click="openAddrPop();">주소검색</v-btn>
                </v-col>
                <v-col cols="12" md="12" class="pa-0">
                  <div id="addrDiv" ref="addrPop" style="display:none;border:1px solid;width:100%;height:300px;margin:5px 0;position:relative">
                    <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" @click="foldAddrPop('churchAddr')" alt="접기 버튼">
                  </div>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="dtlAddr"
                    ref="dtlAddr"
                    :error-messages="dtlAddrErrors"
                    label="상세주소"
                    required
                    @input="$v.dtlAddr.$touch()"
                    @blur="$v.dtlAddr.$touch()"
                  ></v-text-field>
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
              <v-col cols="12" md="12" class="d-flex flex-center">
                <v-checkbox label="카카오 메세지 수신 동의(선택)" @click="authorize()" v-model="msgAgree" readonly></v-checkbox>
              </v-col>
              <v-col cols="12" md="12" class="d-flex flex-center">
                    <v-card-actions>
                      <v-btn color="blue" elevation="5" @click="aplyPoster();" class="mx-auto" outlined><strong> 포스터 ( {{brochureCnt}} 장)  브로셔 ( {{posterCnt}} 장) 신청하기</strong></v-btn>
                    </v-card-actions>  
              </v-col>
            </v-row>
          </v-container>
      

      </v-row>
    </v-container>
  </v-card>  
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    brochureCnt: { required },
    posterCnt: { required },
    aplyName: { required },
    church: { required },
    addr: { required },
    dtlAddr: { required },
    phone: { required },
    email: { required, email },
  },
  name: 'About',
  components: { },
  computed: {
      aplyNameErrors () {
        const errors = []
        if (!this.$v.aplyName.$dirty) return errors
        !this.$v.aplyName.required && errors.push('신청자명이 필요합니다.')
        return errors
      },
      churchErrors () {
        const errors = []
        if (!this.$v.church.$dirty) return errors
        !this.$v.church.required && errors.push('교회명이 필요합니다.')
        return errors
      },
      addrErrors () {
        const errors = []
        if (!this.$v.addr.$dirty) return errors
        !this.$v.addr.required && errors.push('주소가 필요합니다.')
        return errors
      },
      dtlAddrErrors () {
        const errors = []
        if (!this.$v.dtlAddr.$dirty) return errors
        !this.$v.dtlAddr.required && errors.push('상세주소가 필요합니다.')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.required && errors.push('연락처가 필요합니다.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('올바른 이메일 주소를 입력해주세요')
        !this.$v.email.required && errors.push('E-mail을 입력해주세요')
        return errors
      },
  },
  data(){return {
    tab:null,
    cnt50:[],
    brochureCnt: 0,
    posterCnt: 0,
    aplyName: '',
    church: '',
    addr: '',
    dtlAddr: '',
    phone: '',
    email: '',
    slides: [
      require('../../assets/brochure/brochure01.jpeg'),
      require('../../assets/brochure/brochure02.jpeg'),
      require('../../assets/brochure/brochure03.jpeg'),
      require('../../assets/brochure/brochure04.jpeg'),
    ],
    msgAgree: false,
  }},
  created() {
    for(var i = 0 ; i < 50; i++){
      this.cnt50.push(i);
    }
    var userInfo = this.$cookies.get("userInfo");
    if(userInfo){
      this.getMyAply();
      this.myKakaoMsgAgree();
    }

    console.log('$route.query::',this.$route.query);
    if(this.$route.query){
      if(this.$route.query.tab == 'poster')this.tab = 1;
    }
  },
  methods : {
    btnClick: function(){
      this.$router.push('/');
    },
    getMyAply: function(){
        this.axios.get('/user/aply')
        .then((result)=>{

          if(result && result.data.length > 0 ){
            var item = result.data[0];
            this.aplyName = item.aplyName,
            this.church = item.church,
            this.addr = item.fullAddress,
            this.dtlAddr = item.detailAddress,
            this.phone = item.phone,
            this.email = item.email
          }

        }).catch((e)=>{console.log(e)})

    },
    aplyPoster: function(){
      var _this = this;
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
        
        var aplyContents = {
            brochureCnt: _this.brochureCnt,
            posterCnt: _this.posterCnt,
            aplyName: _this.aplyName,
            church: _this.church,
            addr: _this.addr,
            dtlAddr: _this.dtlAddr,
            phone: _this.phone,
            email: _this.email,
          }
          
        console.log(aplyContents);

        this.axios.post('/guest/poster',aplyContents)
        .then((result)=>{
          
          if(result.error_code){
            console.log(error_code);
            return;
          }

          this.$socket.emit('poster', aplyContents, (data)=>{console.log(data)});
          this.$awn.success('신청이 완료되었습니다.');
          var userInfo = this.$cookies.get("userInfo");
          if(userInfo) this.$router.push('/myAplyList');
        }).catch((err)=>{
          this.$awn.alert('등록신청에 오류가 발생하였습니다.'+err);
        })
      }
    },
    openAddrPop (){
        var _this = this;
        var element_wrap = document.getElementById('addrDiv');
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
                  _this.addr = '('+data.zonecode+') '+addr+' '+extraAddr
                  //_this.$refs.dtlAddr.focus();
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
      foldAddrPop(){
        var element_wrap = document.getElementById('addrDiv');
        element_wrap.style.display = 'none';
      },
      authorize(){
        console.log(this.msgAgree);
        if(this.msgAgree) return;
        var _this = this;
        Kakao.Auth.login({
            scope: 'talk_message',
            success: function(response) {
                console.log(response);
                _this.msgAgree = true;
            },
            fail: function(error) {
                console.log(error);
                _this.msgAgree = false;
            }
        });
      },
      myKakaoMsgAgree(){
        var _this = this;
        this.axios.post('/auth/myKakaoMsgAgree')
        .then(function(result){
          _this.msgAgree = result.data;
        })
      }
  }

}
</script>
