<template>
    <v-card width="800" class="mx-auto" elevation="5">
        
        
        <v-card max-width="784" class="mx-auto" elevation="5" v-for="item in youtubeList" :key="item.src">
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>
            <iframe width="784" height="441" :src="item.src" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </v-card>

    </v-card>
</template>
<script>
export default {
    name:'CampLive',
    data:()=>{
        return{
            youtubeList:[
                {title:'2020겨울유스비전캠프', src:'https://www.youtube.com/embed/iPPLC9tBmtY', subtitle:'2020겨울 유스비전캠프 선포주일 15주년 특별영상 | 예수의 심정을 가지자'},
                {title:'2020겨울유스비전캠프', src:'https://www.youtube.com/embed/TA_1ZEBBU2o', subtitle:'예배 중심 캠프로 다음세대 세우자! - 35차 2020 겨울 유스비전캠프 (장현수) l CTS뉴스'},
                {title:'2019겨울유스비전캠프', src:'https://www.youtube.com/embed/4kGcfGzW-C8', subtitle:'2019겨울 유스비전캠프 하이라이트 풀영상'},
                {title:'2018겨울유스비전캠프', src:'https://www.youtube.com/embed/3PthIyEr5TU', subtitle:'2018겨울 유스비전캠프 하이라이트영상 "예수의 흔적을 가져라" (31차)'},
                {title:'2008여름유스비전캠프', src:'https://www.youtube.com/embed/DjVSHbEJsBo', subtitle:'2008여름 유스비전캠프 하이라이트 "성령이여 바람처럼 불처럼 임하소서"'},
            ]
        }
    }
}
</script>