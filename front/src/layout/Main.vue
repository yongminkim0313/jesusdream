<template>
    <div>
        <v-btn
        elevation="2"
        @click="btnClick()"
        >버튼</v-btn>
        <router-link to="/About">
        <v-btn
        elevation="2"
        >About</v-btn>
        </router-link>
    </div>
</template>
<script>

export default {
  name: 'Main',
  components: { },
  data(){return {
  }},
  created() {
    var user = this.$cookies.get("user_info");
    if(user){
      var email = user.kakao_account.email;
      console.log('email::',email);
      if(email === ''){

      }
    }
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
  }

}
</script>
