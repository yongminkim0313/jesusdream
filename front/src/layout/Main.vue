<template>
    <v-card
    class="mx-auto my-5 pa-5"
    max-width="800"
  >
    <v-container fluid class="pa-5">
      <v-row v-if="!isLogin">
      <v-col cols="12" md="6" sm="12">
        <v-card>
          <v-img 
            src="https://modo-phinf.pstatic.net/20190419_277/1555644483981oEXf1_JPEG/mosanZXmAK.jpeg?type=a1100"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd3.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
            </v-img>
          </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd4.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title></v-card-title>
            </v-img>
          </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd5.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title></v-card-title>
            </v-img>
          </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd6.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title></v-card-title>
            </v-img>
          </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd7.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title></v-card-title>
            </v-img>
          </v-card>
      </v-col>
    </v-row>
    <v-row v-if="isLogin">
      <v-col cols="12" md="6" sm="12">
        <router-link to="/user">
        <v-card>
          <v-img 
            src="https://modo-phinf.pstatic.net/20190419_277/1555644483981oEXf1_JPEG/mosanZXmAK.jpeg?type=a1100"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>신청하러가기</v-card-title>
          </v-img>
        </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <router-link to="/myAply">
          <v-card>
            <v-img
              :src="require('../assets/jd3.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title>나의신청내역</v-card-title>
            </v-img>
          </v-card>
          </router-link>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd4.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title></v-card-title>
            </v-img>
          </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd5.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title></v-card-title>
            </v-img>
          </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd6.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title></v-card-title>
            </v-img>
          </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
          <v-card>
            <v-img
              :src="require('../assets/jd7.jpeg')"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title></v-card-title>
            </v-img>
          </v-card>
      </v-col>
    </v-row>

    </v-container>
    </v-card>
</template>
<script>

export default {
  name: 'Main',
  components: { },
  data(){return {
    isLogin: false,
  }},
  created() {
    var user = this.$cookies.get("user_info");
    if(user) this.isLogin = true;
    this.getUserAply();
  },
  methods : {
    btnClick: function(){
      this.axios({
        method:'post',
        url:'/auth'
      })
      this.axios.get('/auth')
      .then((result)=>{
        console.log(result.data);
      });
    },
    getUserAply: function(){
      if(this.isLogin){
        this.axios.get('/aply')
        .then((result)=>{
          console.log(result.data);
        })
      }
    }
  }

}
</script>
