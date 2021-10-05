<template>
  <v-app>
    <v-main>
      <router-view name="header"></router-view>
      <router-view/>
      <!-- <router-view name="footer"></router-view> -->
    </v-main>
  </v-app>
</template>
<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
      orderCnt:0
  }),
  created(){}
};
</script>
<style>
@import '~vue-awesome-notifications/dist/styles/style.css'
</style>