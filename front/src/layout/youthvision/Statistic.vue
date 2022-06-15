<template>
  <v-card max-width="800" class="mx-auto">
      <v-card-title>등록신청통계</v-card-title>
      <v-card-subtitle>
        {{`초등: ${resultData.chodeung} 청소년: ${resultData.cheongsonyeon} 청년: ${resultData.cheongnyeon} 장년: ${resultData.jangnyeon}  사역자: ${resultData.sayeogja}`}}
      </v-card-subtitle>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <doughnut-chart :chart-data="campCnt"></doughnut-chart>
          </v-col>
        </v-row>
      </v-container>
  </v-card>
</template>
<script>
import DoughnutChart from '../../assets/Chart';
  export default {
    components: {
      DoughnutChart
    },
    data () {
      return {
        campCnt: {labels:['초등', '청소년', '청년', '장년','사역자'],datasets:[{data:[0,0,0,0,0], backgroundColor:['red','green','sienna','salmon','blue']}]},
        colorList: ['red','green','blue','yellow','purple','orange','lime','pink', 'salmon', 'silver', 'tan', 'sienna'],
        resultData:{}
      }
    },
    mounted () {
      this.makeChart();
    },
    methods:{
      makeChart(){
        this.axios.get('/admin/aply/statistic')
        .then((result)=>{
          console.log(result);
          this.resultData = result.data;
          this.campCnt.datasets[0].data[0] = result.data.chodeung
          this.campCnt.datasets[0].data[1] = result.data.cheongsonyeon
          this.campCnt.datasets[0].data[2] = result.data.cheongnyeon
          this.campCnt.datasets[0].data[3] = result.data.jangnyeon
          this.campCnt.datasets[0].data[4] = result.data.sayeogja
          this.campCnt = Object.assign({}, this.campCnt);
        })
      },
    }
  }
</script>
