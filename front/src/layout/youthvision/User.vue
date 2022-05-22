<template>
 <v-card
    :loading="loading"
    class="mx-auto my-5 pa-10"
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
      :src="require('../../assets/jd1.jpeg')"
    ></v-img>
  <v-card-title>YOUTH VISION CAMP</v-card-title>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="신청자 이름"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="직분"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>
    <v-text-field
      v-model="church"
      :error-messages="churchErrors"
      label="교회이름"
      required
      @input="$v.church.$touch()"
      @blur="$v.church.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      :error-messages="phoneErrors"
      label="연락처 (신청자, 인솔자 핸드폰 번호)"
      required
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="fullAddress"
      :error-messages="addressErrors"
      label="주소"
      required
      @input="$v.fullAddress.$touch()"
      @blur="$v.fullAddress.$touch()"
    ></v-text-field>
    <v-btn @click="openAddress();">주소검색</v-btn>
    
    <v-text-field
      v-model="detailAddress"
      :error-messages="detailAddressErrors"
      label="상세주소"
      required
      @input="$v.detailAddress.$touch()"
      @blur="$v.detailAddress.$touch()"
    ></v-text-field>

 <v-divider class="mx-4"></v-divider>
<v-card-title>유스비전캠프 참석여부</v-card-title>
    
    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>유스비전캠프에 처음참석합니다</v-chip>
        <v-chip>지난 캠프에 참석한적이 있습니다</v-chip>
      </v-chip-group>
    </v-card-text>
 
 
 <v-divider class="mx-4"></v-divider>
<v-card-title>유스비전캠프 알게된 경로</v-card-title>
    <v-container class="py-0">
      <v-row
        align="center"
        justify="start"
      >
        <v-col
          v-for="(selection, i) in selections"
          :key="selection.text"
          class="shrink"
        >
          <v-chip
            :disabled="loading"
            close
            @click:close="selected.splice(i, 1)"
          >
            <v-icon
              left
              v-text="selection.icon"
            ></v-icon>
            {{ selection.text }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>

    <v-list>
      <template v-for="item in paths">
        <v-list-item
          v-if="!selected.includes(item)"
          :key="item.text"
          :disabled="loading"
          @click="selected.push(item)"
        >
          <v-list-item-avatar>
            <v-icon
              :disabled="loading"
              v-text="item.icon"
            ></v-icon>
          </v-list-item-avatar>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

    
    <v-divider class="mx-4"></v-divider>
    <v-card-title>
      * 참석인원 변경
    </v-card-title>
<v-card-text>
  * 캠프 일주일 전, 최종명단, 회비완납과 함께 알려주시면 됩니다.(최종명단양식은 캠프일주일 전 신위 메일로 별도 발송)
</v-card-text>


    <v-btn
      class="mr-4"
      @click="submit"
    >
      신청하기
    </v-btn>
    <!-- <v-btn @click="clear">
      clear
    </v-btn> -->
    <v-container fluid>
      <v-row dense>
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
              height="200px"
            >
              <!-- <v-card-title v-text="card.title"></v-card-title> -->
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
      name: { required, maxLength: maxLength(10) },
      select: { required },
      phone: {required, maxLength: maxLength(11) },
      church: { required, maxLength: maxLength(50) },
      email: { required, email },
      fullAddress: {required },
      detailAddress: {required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      loading: false,
      name: '',
      select: null,
      church:'',
      phone: '',
      email: '',
      items: [
        '학생',
        '교사',
        '목사',
        '성도',
        '기타',
      ],
      checkbox: false,
      fullAddress: '',
      detailAddress:'',
      address:{
        postcode:'',
        roadAddress:'',
        jibunAddress:'',
        extraAddress:'',
      },
      selection: 1,
      cards: [
        { title: '1', src: require('../../assets/jd2.jpeg'), flex: 12 },
        { title: '2', src: require('../../assets/jd3.jpeg'), flex: 6 },
        { title: '3', src: require('../../assets/jd4.jpeg'), flex: 6 },
      ],
      selected: [],
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
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('동의')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('직분을 입력해주세요')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('이름을 10자 내로 입력해주세요')
        !this.$v.name.required && errors.push('이름을 입력해주세요')
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
      churchErrors () {
        const errors = []
        if (!this.$v.church.$dirty) return errors
        !this.$v.church.maxLength && errors.push('교회이름이 20자를 넘을수 없습니다')
        !this.$v.church.required && errors.push('교회이름을 입력해주세요. 없으면 "없음" 을 입력해주세요')
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
        for (const selection of this.selected) {
          selections.push(selection)
        }
        return selections
      },
    },
    created: function(){
      var user = this.$cookies.get('user_info');
      if(user){
        console.log(user);
        this.name = user.kakao_account.profile.nickname
        this.email = user.kakao_account.email
      }
      
    },
    methods: {
      submit () {
        console.log(this.$v.$touch());
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
      openAddress(){ //@click을 사용할 때 함수는 이렇게 작성해야 한다.
            var _this = this;
            new window.daum.Postcode({
            oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                _this.address.postcode = data.zonecode;
                _this.address.roadAddress = roadAddr;
                _this.address.jibunAddress = data.jibunAddress;
                
                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                if(roadAddr !== ''){
                    _this.address.extraAddress = extraRoadAddr;
                } else {
                    _this.address.extraAddress = '';
                }
                _this.fullAddress = '('+this.address.postcode+') '+this.address.roadAddress+' '+this.address.extraAddress
                
            }
        }).open();
        }
    },
  }
</script>

