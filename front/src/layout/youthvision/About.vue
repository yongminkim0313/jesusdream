<template>
    <v-card>
        About 페이지 입니다!!!!!
        <v-btn
        @click="btnClick();"
        >
        뒤로가기
        </v-btn>
    </v-card>
</template>
<script>

export default {
  name: 'About',
  components: { },
  data(){return {
  }},
  created() {
  },
  methods : {
    btnClick: function(){
      history.back();
    }
  }

}
</script>
