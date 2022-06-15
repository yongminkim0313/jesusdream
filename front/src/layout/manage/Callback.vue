<template>
    <div>
      잠시만 기다려주세요
        <v-btn
        elevation="2"
        @click="btnClick()"
        >버튼</v-btn>

    </div>
</template>
<script>

export default {
  name: 'Callback',
  components: { },
  data(){return {
  }},
  created() {
      this.getAccessToken();
  },
  methods : {
    getAccessToken: function(){
      console.log("getAccessToken")
      this.axios.post('/auth/getAccessToken')
      .then(result => {
          this.$cookies.set("access_token", result.data.access_token);
          this.$cookies.set("user_info", result.data.user_info);
      })
      .catch(e=>{console.log(e)})
      .then(()=>{
          location.href='/user';
      });
    },
    btnClick: function(){
       console.log(this.$cookies.get("access_token"));
       console.log(this.$cookies.get("user_info"));
    }
  }

}
</script>