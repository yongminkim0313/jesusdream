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
          <v-col cols="12" md="6" sm="12">
            <v-list dense>
              <v-subheader>REPORTS</v-subheader>
              <v-list-item-group v-model="selectedItem" color="primary" >
                <v-list-item v-for="(item, i) in items" :key="i" >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                    {{item.value}}
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-sparkline
              :labels="labels"
              :value="value"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              :fill="fill"
              :type="type"
              :auto-line-width="autoLineWidth"
              :label-size="6"
              auto-draw
            >
            </v-sparkline>
          </v-col>
        </v-row>
      </v-container>
  </v-card>
</template>
<script>
import DoughnutChart from '../../assets/Chart';
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  export default {
    components: {
      DoughnutChart
    },
    data () {
      return {
        campCnt: {labels:['초등', '청소년', '청년', '장년','사역자'],datasets:[{data:[0,0,0,0,0], backgroundColor:['red','green','sienna','salmon','blue']}]},
        colorList: ['red','green','blue','yellow','purple','orange','lime','pink', 'salmon', 'silver', 'tan', 'sienna'],
        resultData:{},
        selectedItem: 5,
        items: [ ],
        width: 20,
        radius: 2,
        padding: 8,
        lineCap: 'round',
        gradient: gradients[5],
        value: [],
        gradientDirection: 'top',
        gradients,
        fill: false,
        type: 'bar',
        autoLineWidth: false,
        labels:[]
      }
    },
    mounted () {
      this.makeChart();
      this.joinPath();
    },
    methods:{
      makeChart(){
        var _this = this;
        this.axios.get('/admin/aply/statistic')
        .then((result)=>{
          console.log(result);
          _this.resultData = result.data;
          _this.campCnt.datasets[0].data[0] = result.data.chodeung
          _this.campCnt.datasets[0].data[1] = result.data.cheongsonyeon
          _this.campCnt.datasets[0].data[2] = result.data.cheongnyeon
          _this.campCnt.datasets[0].data[3] = result.data.jangnyeon
          _this.campCnt.datasets[0].data[4] = result.data.sayeogja

          var total = 0;
          for(var key in result.data){
            total += result.data[key];
          }
          _this.items.push({text: '초등', icon: 'mdi-human-child', value: _this.resultData.chodeung});
          _this.items.push({text: '청소년', icon: 'mdi-human-greeting', value: _this.resultData.cheongsonyeon});
          _this.items.push({text: '청년', icon: 'mdi-human-male-female', value: _this.resultData.cheongnyeon});
          _this.items.push({text: '장년', icon: 'mdi-account', value: _this.resultData.jangnyeon});
          _this.items.push({text: '사역자', icon: 'mdi-church', value: _this.resultData.sayeogja});
          _this.items.push({text: '총계', icon: 'mdi-file', value: total});


          this.campCnt = Object.assign({}, this.campCnt);
        })
      },
      joinPath(){
        this.axios.get('/admin/aply/all')
        .then((result)=>{
        var aplyList = result.data;
        var joinPathObj = {};

        for(var idx in aplyList){
          for(var pathSe of aplyList[idx].joinPathSe){
            joinPathObj[pathSe] = joinPathObj[pathSe] ? joinPathObj[pathSe]+1 : 1;
          }
        }

        this.labels = Object.keys(joinPathObj);
        this.value = Object.values(joinPathObj);
      })

      }
    }
  }
</script>
