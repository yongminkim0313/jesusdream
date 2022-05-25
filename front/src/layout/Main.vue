<template>
    <v-card class="mx-auto my-5 pa-5" max-width="800">
    <v-container fluid >
      <v-row dense>
      <v-col cols="12" md="6" sm="12">
        <v-card @click="clickReg()">
          <v-img 
            :src="require('../assets/jang.png')"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
          <v-card-title>등록신청</v-card-title>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-card @click="clickAbout()">
          <v-img 
            :src="require('../assets/jd4.jpeg')"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
          <v-card-title>About</v-card-title>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12" v-for="( item, index) in myAplyList" :key="item.seq">
          <v-card @click="clickList(item)">
            <v-img
              :src="require(`../assets/jd${index+1}.jpeg`)"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-row dense v-if="item.aplyName">
                  <v-card-title>나의신청내역 </v-card-title>
                  <v-card-subtitle>{{item.church}} {{item.aplyDt}}</v-card-subtitle>
                  <v-card-text>
                    <v-row>
                      <v-col>
                        {{item.schdlSe}}
                      </v-col>
                    </v-row>
                    <v-row>
                      
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
                      </v-row>
                  </v-card-text>
                </v-row>
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
    myAplyList: [{seq:1},{seq:2}]
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
      this.cardMaker();
    },clickList(item) {
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
    cardMaker(){
      if(this.myAplyList.length == 0){
        this.myAplyList.push({seq:1});
        this.myAplyList.push({seq:2});
      }

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
