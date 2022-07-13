<template>
  <v-app>
    <v-main>
      <router-view name="header"></router-view>
      <router-view name="default"></router-view>
      <router-view name="footer"></router-view>
      <router-view name="messenger"></router-view>
    </v-main>
  </v-app>
</template>