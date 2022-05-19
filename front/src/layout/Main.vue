<template>
    <div>
        <v-btn
        elevation="2"
        @click="btnClick()"
        >버튼</v-btn>
    </div>
</template>
<script>

export default {
  name: 'Main',
  components: { },
  data(){return {
  }},
  created() {
    this.$cookies.remove("user_info");
             this.$cookies.remove("access_token");
  },
  methods : {
    btnClick: function(){
      this.axios.post('/findOrderList');
    }
  }

}
</script>
