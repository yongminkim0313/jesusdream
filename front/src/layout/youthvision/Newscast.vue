<template>
    <v-card width="800" class="mx-auto" elevation="5">
        
        
        <v-card max-width="784" class="mx-auto my-5" elevation="5" v-for="item in youtubeList" :key="item.src">
                <v-card-title>{{item.title}}</v-card-title>
            <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>
            <div id="area">
                <iframe id="video" width="100%" height="100%" :src="item.src" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </v-card>
        <v-divider class="pa-5"></v-divider>
        <v-card class="mx-auto pb-5">
            <v-btn block @click="youtube()" class="mx-auto ">유스비전 캠프 영상 더보기</v-btn>
        </v-card>
    </v-card>
</template>
<script>
export default {
    name:'CampLive',
    data:()=>{
        return{
            youtubeList:[
                {sn:1, title:'CGNTV뉴스', src:'https://www.youtube.com/embed/f-NQyG40adg', subtitle:'"작은 교회의 외침 차세대에 희망을" 유스비전캠프 소개'},
                {sn:2, title:'CGNTV이홍렬의톡쏘는남자들', src:'https://www.youtube.com/embed/Xpb6o8Ax0u4', subtitle:'이홍렬의 톡쏘는 남자들 / 장용성목사편'},
                {sn:3, title:'CTS뉴스', src:'https://www.youtube.com/embed/Q9ktEHBeW5k', subtitle:'2017유스비전캠프 보도'},
                {sn:4, title:'CGNTV뉴스', src:'https://www.youtube.com/embed/DHPKk14Vz4Q', subtitle:'2015유럽선교집회'},
                {sn:5, title:'Goodtv뉴스', src:'https://www.youtube.com/embed/at0x1BAOim4', subtitle:'주님이꿈꾸신교회'},
                {sn:6, title:'CBS미션2013', src:'https://www.youtube.com/embed/1C_qzZtmyu8', subtitle:'주여나를보내소서 - 주님이꿈꾸신교회 장용성목사편'},
                {sn:7, title:'Goodtv멘토특강희망드림', src:'https://www.youtube.com/embed/Y36_aGjmgmo', subtitle:'64회_장용성 목사 편 "다음 세대만이 희망입니다"'},
                {sn:8, title:'[온에어워십캠프] CTS', src:'https://www.youtube.com/embed/PrMWHnnaWB0', subtitle:'NEWS 기독교방송 보도영상 - 유스비전 온에어 워십캠프 1차 방송'},
                {sn:9, title:'CTS뉴스', src:'https://www.youtube.com/embed/yIWfcvJBZfs', subtitle:'"작은교회 온라인 사역 돕는 목회자" 200804 방송분 | 주님이꿈꾸신교회 | 유스비전선교회 작은교회살리기 | 주일학교살리기프로젝트'},
                {sn:10, title:'CTS뉴스', src:'https://www.youtube.com/embed/ARoOZzPcsQI', subtitle:'메타버스 사역, 보완점은?(장현수)'},
                {sn:11, title:'CTS뉴스', src:'https://www.youtube.com/embed/Kpq5aftlHA4', subtitle:'유스비전 미니스트리 장용성목사 대담'},
                {sn:12, title:'CTS뉴스', src:'https://www.youtube.com/embed/4gWt3Wxa88M', subtitle:'예배 중심 캠프로 다음세대 세우자! 35차 2020 겨울 유스비전캠프'},
            ]
        }
    },
    methods:{
        youtube: function(){
            location.href = 'https://www.youtube.com/watch?v=F4trhwdQzHM&list=PLCAD7DC0417B0E8BB'
        },
    }
}
</script>
<style>
#area {
  position: relative; /* absolute는 부모가 relative일 때 부모를 따라간다. */
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
}
#video {
  position: absolute;
  width: 100%; /* 부모에 맞게 꽉 채운다. */
  height: 100%;
}
</style>