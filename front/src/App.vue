<template>
  <v-app>
    <v-main>
      <router-link to="/">기존화면</router-link>
      <br/>
      <router-link to="/new">새로운화면</router-link>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<style>
/* @import '~vue-awesome-notifications/dist/styles/style.css' */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>