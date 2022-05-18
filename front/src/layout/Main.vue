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
    this.$awn.alert('로그인 해주세요');

  },
  methods : {
    btnClick: function(){
      this.axios.post('/findOrderList');
    }
  }

}
</script>
