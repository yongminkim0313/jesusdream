<template>
    <v-card width="800" class="mx-auto" elevation="5">
    <div id="area">
        <iframe id="video" width="100%" height="100%" src="https://www.youtube.com/embed/oOWd6gms5nc?version-2&autoplay=1" title="유스비전홍보1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
      <v-container class="pa-0 mt-2" >
        <!-- <v-card class="d-flex flex-center" elevation="0">
          <v-btn @click="clickReg()" class="mx-auto my-2">캠프등록 하러가기</v-btn>
        </v-card> -->
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
      :src="require('../assets/brochure/poster.png')"
      max-height="1200"
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
    slides: [
      require('../assets/jd5.jpeg'),
      require('../assets/jd6.jpeg'),
      require('../assets/jd9.jpeg'),
      require('../assets/jd10.jpeg'),
    ],
  }},
  created() {
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
<style>
#area {
  position: relative; /* absolute는 부모가 relative일 때 부모를 따라간다. */
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
}
#video {
  position: absolute;
  width: 100%; /* 부모에 맞게 꽉 채운다. */
  height: 100%;
}
</style>