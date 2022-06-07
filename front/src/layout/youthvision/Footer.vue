<template>
    <v-footer
    padless
    dark
  >

        <v-card-text class="d-flex justify-center">
          <v-btn class="mx-4 white--text" icon @click="facebook()">
            <v-icon size="24px"> mdi-facebook </v-icon>
          </v-btn>

          <v-btn class="mx-4 white--text" icon @click="youtube()">
            <v-icon size="24px"> mdi-youtube </v-icon>
          </v-btn>
          
          <v-btn class="mx-4 white--text" icon @click="instagram()">
            <v-icon size="24px"> mdi-instagram </v-icon>
          </v-btn>
          
          <v-btn class="mx-4 white" icon>
              <v-img width="24px" height="24px" contain :src="require('../../assets/kakao.png')" @click="kakaoshare()"></v-img>
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
    }),
    created(){
       
    },
    methods: {
      facebook: function(){
        location.href = 'https://www.facebook.com/groups/419662904835077/media/';
      },
      youtube: function(){
        location.href = 'https://www.youtube.com/channel/UCKpUmAMNQxzzqcTdpJHHMgA'
      },
      instagram: function(){
        location.href = 'https://www.instagram.com/youthvision_ministry/';
      },
      kakaoshare: function(){
        Kakao.Link.sendScrap({
          requestUrl: 'http://jesusdream.kr',
          templateId: 77557
        });
      }
    }

  }
</script>