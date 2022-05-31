<template>
    <v-card width="800" class="mx-auto" elevation="5">

      <v-container class="pa-0 mt-2" >
        <v-card class="d-flex flex-center" elevation="0">
          <v-btn @click="clickReg()" class="mx-auto my-2">캠프등록 하러가기</v-btn>
    </v-card>
    <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      height="300"
      min-height="300"
      max-width="500"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide"
      ></v-carousel-item>
    </v-carousel>
    <v-img 
      :src="require('../assets/about.png')"
      class="black--text align-end"
      contain
    ></v-img>
  </v-container>
  </v-card>
</template>
<script>

export default {
  name: 'Main',
  components: { },
  data(){return {
    isLogin: false,
    slides: [
      require('../assets/jd5.jpeg'),
      require('../assets/jd6.jpeg'),
      require('../assets/jd9.jpeg'),
      require('../assets/jd10.jpeg'),
    ],
  }},
  created() {
    var userInfo = this.$cookies.get("userInfo");
    if(userInfo) this.isLogin = true;
  },
  methods : {
    clickList(item) {
      if(!item.phone || !item.seq) return;
      this.$router.push({
        name: "MyAply",
        query: { phone: item.phone, seq: item.seq },
      });
    },
    clickReg(){
      if(!this.isLogin){
        this.$awn.options.labels.warning = '로그인 요청';
        this.$awn.warning('카카오로그인이 필요합니다.');
        return;
      }
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
    }
  }

}
</script>
