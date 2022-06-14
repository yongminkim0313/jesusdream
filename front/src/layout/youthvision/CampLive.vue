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
                {sn:1, title:'2022 여름유스비전캠프 홍보영상', src:'https://www.youtube.com/embed/9Ypr3VFt4is', subtitle:'"회복을 넘어 부흥의 새역사를 쓰자!" | 강사:장용성 강은도 민호기 김선배 손경민 박윤호 듀나미스워십 | 어린이청소년청년캠프'},
                {sn:2, title:'2022 여름유스비전캠프 선포주일', src:'https://www.youtube.com/embed/JuWq510zfco', subtitle:'2022 여름 유스비전캠프 (since 2006) "회복을 넘어 부흥의 새역사를 쓰자!"'},
                {sn:3, title:'2020겨울 유스비전캠프 하이라이트영상', src:'https://www.youtube.com/embed/VoRzUiTiDMg', subtitle:'"예수의 심정을 가지자"'},
                {sn:4, title:'2020겨울유스비전캠프', src:'https://www.youtube.com/embed/2mXBoH0EqW8', subtitle:'둘째날저녁실황 Full ver "예수의 심정을 가진 사명자" | 듀나미스워십 / Why should I be afraid/Wake/Turn it up'},
                {sn:5, title:'2020겨울유스비전캠프', src:'https://www.youtube.com/embed/iPPLC9tBmtY', subtitle:'2020겨울 유스비전캠프 선포주일 15주년 특별영상 | 예수의 심정을 가지자'},
                {sn:6, title:'2020겨울유스비전캠프', src:'https://www.youtube.com/embed/TA_1ZEBBU2o', subtitle:'예배 중심 캠프로 다음세대 세우자! - 35차 2020 겨울 유스비전캠프 (장현수) l CTS뉴스'},
                {sn:7, title:'2019겨울유스비전캠프', src:'https://www.youtube.com/embed/4kGcfGzW-C8', subtitle:'2019겨울 유스비전캠프 하이라이트 풀영상'},
                {sn:8, title:'2018겨울유스비전캠프', src:'https://www.youtube.com/embed/3PthIyEr5TU', subtitle:'2018겨울 유스비전캠프 하이라이트영상 "예수의 흔적을 가져라" (31차)'},
                {sn:9, title:'2008여름유스비전캠프', src:'https://www.youtube.com/embed/DjVSHbEJsBo', subtitle:'2008여름 유스비전캠프 하이라이트 "성령이여 바람처럼 불처럼 임하소서"'},
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