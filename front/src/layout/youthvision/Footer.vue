<template>
    <v-footer
    padless
    dark
  >
    <v-row justify="center">
        <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center"
        width="100%"
        >
        <v-card-text>
            <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-7 white--text"
            icon
            >
            <v-icon size="24px">
                {{ icon }}
            </v-icon>
            </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
            장용성 선교사/목사  경기도 군포시 산본천로 211번길 13, 3층  전화번호 : 070-7796-1009  이메일 : youthvision1009@naver.com
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>유스비전 미니스트리 YOUTHVISION MINISTRY</strong>
        </v-card-text>
        </v-card>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>