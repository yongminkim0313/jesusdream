<template>
    <v-card width="800" class="mx-auto" elevation="0">

      <v-container class="pa-0 mt-4" >
        <v-card class="d-flex flex-center" elevation="0">
          <v-btn @click="clickReg()" class="mx-auto my-1">캠프등록 하러가기</v-btn>
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
      >
        <v-sheet
          color="white"
          
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-card class="text-h2" max-width="500" elevation="0">
              <v-img 
                :src="slide"
                class="black--text align-end"
                contain
                height="400"
              ></v-img>
            </v-card>
          </v-row>
        </v-sheet>
      </v-carousel-item>
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
    var user = this.$cookies.get("user_info");
    if(user) this.isLogin = true;
    this.getUserAply();
  },
  methods : {
    getUserAply(){
      if(this.isLogin){
        this.axios.get('/aply')
        .then((result)=>{
          this.myAplyList = result.data;
        })
      }
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
    }
  }

}
</script>
