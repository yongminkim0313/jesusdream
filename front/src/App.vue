<template>
  <v-app>
    <v-main>
      <router-view name="header"></router-view>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>
