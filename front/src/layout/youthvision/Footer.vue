<template>
    <v-footer
    padless
    dark
  >

      <v-card-text class="d-flex justify-center">
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
            </v-btn>
        </v-card-text>

        <v-card-text class="white--text text-center px-auto">
          장용성 선교사/목사  경기도 군포시 산본천로 211번길 13, 3층  <br />
            전화번호 : 070-7796-1009  <br />
            이메일 : youthvision1009@naver.com
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          <strong>유스비전 미니스트리 YOUTHVISION MINISTRY</strong>
        </v-card-text>
        
    
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