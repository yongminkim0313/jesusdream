<template>  
<v-container fluid :class="updateMode?'green lighten-1':'grey lighten-5'">
    <v-row>
        <router-link to="/"><v-btn small class="ml-6 mb-2">기존화면</v-btn></router-link>
    </v-row>
    <v-row 
        no-gutters
    >
        <v-col
            md=3
            lg=4
            xl=4
            class="pt-3 pl-2"
        >
            <v-card >
                <v-data-table
                    dense
                    light
                    v-model="selected"
                    :headers="headers"
                    :items="orderList"
                    :items-per-page="-1"
                    :sort-by="['no']"
                    :sort-desc="[true]"
                    class="elevation-1"
                    item-key="seq"
                    @click:row="rowClick"
                    hide-default-footer
                    height="300px"
                >
                    <template v-slot:[`item.orderSummary`]="{ item }">
                    <v-chip 
                    v-for="contents in item.orderSummary"
                    :key="contents.title"
                    :color="contents.chipColor"
                    class="ma-1"
                    outlined
                    small
                    >
                        {{contents.title +':'+contents.cnt}}
                    </v-chip>
                    </template>
                    <template v-slot:[`item.amt`]="{ item }">
                        {{item.amt | makeComma}}
                    </template>
                    <template v-slot:[`item.saved`]="{ item }">
                        <v-progress-circular
                        :value="item.saved?100:0"
                        color="light-green darken-2"
                        size="20"
                        ></v-progress-circular>
                    </template>
                </v-data-table>
                <v-spacer></v-spacer>
                    
                    <v-fade-transition>
                    <v-btn
                        v-if="!updateMode"
                        class='light-blue lighten-1 ma-2'
                        elevation="2"
                        @click="addCustom();"
                    >추가</v-btn>
                    </v-fade-transition>
                    <v-fade-transition>
                    <v-btn
                    v-if="updateMode"
                    @click="saveOrderList()"
                    class="lime lighten-1 ma-2"
                    >입력으로전환</v-btn>
                    </v-fade-transition>
                    <v-fade-transition>
                    <v-btn
                        v-if="updateMode"
                        class='red lighten-1 ma-2'
                        elevation="2"
                        @click="delCustom();"
                    >삭제</v-btn>
                    </v-fade-transition>
                
            </v-card>
            <v-card class="mt-2">
                    <v-list>
                        <v-subheader>지난내역</v-subheader>
                        <v-list-item-group
                            v-model="selectedDate"
                            color="primary"
                        >
                            <v-list-item
                            v-for="(item, index) in orderDateList"
                            :key="index"
                            @click="historyList(item)"
                            >
                                <v-list-item-content class="flex-nowrap">
                                    <v-list-item-title>{{ item._id }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.count }}개</v-list-item-subtitle>
                                    <v-list-item-subtitle> {{ item.totalAmt | makeComma }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                    <router-link to="/">기존화면</router-link>
            </v-card>
        </v-col>

        <v-col
            md=9
            lg=8
            xl=8
        >
            
                <v-card
                    class="ma-3"
                >
                <v-container fluid>
                <v-row dense>
                    <v-col
                        cols="5"
                        class="d-none d-sm-none d-md-block"
                    >
                        <v-card 
                            elevation="0"
                        >
                        <v-card-title
                            class="light-green--text text--darken-1 text-md-h2 text-sm-h5"
                        >
                            <p class="mx-auto">주꿈카페</p>
                        </v-card-title>
                        <v-card-subtitle class="d-flex flex-column align-end py-10 ma-auto light-green--text text--light-1 text-md-h4 text-sm-body-1">
                            <p class="mx-auto mt-2">주꿈카페의 </p>
                            <p class="mx-auto mt-2">모든 수익금은 </p>
                            <p class="mx-auto mt-2">추후에 후원으로 </p>
                            <p class="mx-auto mt-2">사용됩니다.</p>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-img
                                width="200"
                                 class="mx-auto"
                                src="@/assets/menu_footer.jpg"
                            ></v-img>
                        </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col
                        cols="8"
                    >
                        <template v-for="(items,menuName) in menuList">
                            <v-card elevation="0" width="100%" :key="menuName">
                                <v-card-title class="light-green--text text--darken-1 line pa-2 ma-0">
                                    <h3 class="mx-auto ">{{menuName}}</h3>
                                </v-card-title>
                                <v-card-text class="pa-0">
                                    <v-container class="py-1">
                                        <template v-for="item in items">
                                        <v-row :key="item.menu_no" class="d-flex" dense>
                                            <v-col sm=2 md=2>
                                                <v-btn icon  
                                                    fab
                                                    elevation="4"
                                                    v-if="item.cnt!=0"
                                                    @click="minusItemCnt(item);"
                                                    x-small
                                                >
                                                    <v-icon dark>
                                                        mdi-minus
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col sm=10 md=10 class="pa-0 ">
                                                <v-btn 
                                                    class="bg pa-0 d-flex"
                                                    depressed
                                                    block
                                                    @click="plusItemCnt(item);"
                                                >
                                                <v-badge
                                                    left
                                                    color="green"
                                                    :content="item.cnt"
                                                    v-if="item.cnt!=0"
                                                >
                                                </v-badge>
                                                <h3 class="hr-sect text-md-h6 text-sm-body-1 my-0">{{item.title}}</h3>
                                                <h3 class="text-md-h6 text-sm-body-1 my-0">{{item.amt | makeComma}}</h3>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        </template>
                                    </v-container>
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-col>
                </v-row>
                </v-container>
            </v-card>
            
        </v-col>
    </v-row>


    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{historyMain._id}}
        </v-card-title>

        <v-card-text class="mt-2">
        
            <v-data-table
                    dense
                    light
                    :headers="historyHeaders"
                    :items="historyOrderList"
                    :items-per-page="-1"
                    :sort-by="['no']"
                    :sort-desc="[true]"
                    class="elevation-1"
                    item-key="seq"
                    hide-default-footer
                >
                    <template v-slot:[`item.orderSummary`]="{ item }">
                    <v-chip 
                    v-for="contents in item.orderSummary"
                    :key="contents.title"
                    :color="contents.color"
                    class="ma-1"
                    outlined
                    small
                    >
                        {{contents.title +':'+contents.cnt}}
                    </v-chip>
                    </template>
                    <template v-slot:[`item.amt`]="{ item }">
                        {{item.amt | makeComma}}
                    </template>
                </v-data-table>

                <div class="small">
                    <doughnut-chart :chart-data="datacollection"></doughnut-chart>
                </div>
        </v-card-text>
        <v-card-subtitle class="d-flex justify-end">total:  {{historyMain.totalAmt | makeComma}}</v-card-subtitle>
        
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
</v-container>

</template>
<script>

import DoughnutChart from '../assets/Chart';

import {
    mdiCog,
  } from '@mdi/js'

export default {
  components: {DoughnutChart  },
  data: () => ({
        datacollection: null,
        drawer: false,
        icon:{mdiCog:mdiCog},
        no: 1,
        orderList:[],
        selected:[],
        selectedItem:{},
        orderDateList:[],
        selectedDate: 1,
        dialog: false,
        historyOrderList: [],
        historyMain: {},
        menuList:{},
        headers: [
          {
            text: 'no',
            align: 'center',
            sortable: true,
            value: 'no',
            width: 5,
            class:'ma-1 pa-1',
            cellClass: 'ma-2 pa-2'
          },
          { text: '주문요약', value: 'orderSummary', width: 210, sortable: false, class:'pl-4',cellClass: 'ma-0 pa-0' },
          { text: '금액', value: 'amt', width: 40, sortable: false, class:'ma-0 pa-0',cellClass: 'ma-0 pa-0', align: 'right'},
          { text: '저장', value: 'saved' , width: 40, sortable: false, class:'ma-0 pa-0',cellClass: 'ma-0 pa-0', align: 'center'},
        ],
        historyHeaders: [
          {
            text: 'no',
            align: 'center',
            sortable: true,
            value: 'no',
          },
          { text: '주문내역', value: 'orderSummary' },
          { text: '금액', value: 'amt' , align: 'right'},
        ],   
        colorList: ['red','green','blue','yellow','purple','orange','lime','pink', 'salmon', 'silver', 'tan', 'sienna'],
        
    }),
    mounted () {
      this.fillData()
    },
  created() {
      this.loadMenuList();
      this.loadOrderList();
      this.getOrderDate();
      this.$socket.on('receiveInit',(data)=>{
          console.log(data)
          this.loadOrderList();
            this.getOrderDate();
      });
  },
  computed:{
      summaryMenu(){
          var summaryList=[];
          
          for(var menuName in this.menuList){
              for(var menu of this.menuList[menuName]){
                  if(menu.cnt > 0 ) summaryList.push(menu);
              }
          }
          
          return summaryList;
      },
      updateMode(){
          return this.selectedItem.no != null;
      }
  },
  methods:{
    fillData () {
        this.datacollection = this.makeChartData()
    },
    rowClick(data){
        var _this = this;
        _this.initMenu();
        
        for(var order of data.orderSummary){
            for(var menuName in this.menuList){
                for(var menu of this.menuList[menuName]){
                    if(menu.title == order.title ){
                        menu.cnt = order.cnt;
                    }
                }
            }
        }
        _this.selectedItem = data;
    },
    addCustom(){
        if(this.summaryMenu.length > 0){
            var summary = this.deepCopy(this.summaryMenu);
            this.orderList.push({
                no:this.no,
                orderSummary: summary,
                saved: false,
                amt:this.calcurateAmt(summary)
            });
            this.no++;
            console.log(this.orderList);
            this.saveOrderList();
        }
    },
    initMenu(){
        for(var menuName in this.menuList){
            for(var menu of this.menuList[menuName]){
                menu.cnt = 0;
            }
        }
        this.selectedItem={};
        this.getOrderDate();
        this.$socket.emit('tossInit',{});
    },
    plusItemCnt(item){
        item.cnt++;
        this.syncItem();
    },
    minusItemCnt(item){
        if(item.cnt) item.cnt--;
        this.syncItem();
    },
    syncItem(){
        var _this = this;
        console.log(_this.selectedItem);
        if(_this.selectedItem.no){
            var order =_this.orderList.find(data=>{
                return data.no == _this.selectedItem.no;
            })
            order.orderSummary=_this.deepCopy(_this.summaryMenu);
            order.amt = _this.calcurateAmt(order.orderSummary);
            order.saved = false;
        }
    },
    deepCopy(menuArr) { 
        return JSON.parse(JSON.stringify(menuArr)); 
    },
    delCustom(){
        var _this = this;
        
        // for(var i = 0 ; i < _this.selected.length; i ++ ){
        //     var idx = _this.orderList.findIndex(data=>{
        //         return data.no == _this.selected[i].no
        //     });
        //     var order = _this.orderList.splice(idx,1);
        //     _this.delOrderList(order[0]);
        // }
        
        _this.delOrderList(_this.selectedItem);
        
    },
    saveOrderList(){
        var saveList = this.orderList.filter(item=>{return !item.saved})
        if(saveList.length > 0 ){
            this.axios.post('/saveOrderList',saveList)
            .then((data)=>{
                console.log(data);
                for(var item of saveList){
                    item.saved = true;
                }
            })
            .catch(()=>{})
            .then(() =>{
                this.initMenu();
                this.loadOrderList();
            });
        }else{
            this.initMenu();
        }
    },
    delOrderList(order){
        this.axios.post('/delOrderList',order)
        .then((data)=>{
            console.log(data);
        })
        .catch(()=>{})
        .then(() =>{
            this.initMenu();
            this.loadOrderList();
        });
    },
    loadOrderList(){
        this.axios.post('/loadOrderList',{})
        .then((data)=>{
            this.orderList = data.data;


            /*no 정하기 start*/
            var tempNo=0;
            for(var order of this.orderList){
                if(order.no > tempNo) tempNo = order.no+1;
            }
            if(tempNo){
                this.no = tempNo;
            }else{
                this.no = 1;
            }
            /*no 정하기 end*/
        })
        .catch(()=>{})
        .then(() =>{});
    },
    getOrderDate(){
        this.axios.post('/getOrderDate',{})
        .then((data)=>{
            this.orderDateList = data.data
        })
        .catch(()=>{})
        .then(() =>{});
    },
    historyList(item){
        this.historyMain = item;
        this.axios.post('/historyList',item)
        .then((data)=>{
            this.historyOrderList = data.data;
        })
        .catch(()=>{})
        .then(() =>{
            this.dialog = true;
            this.fillData();
        });
    },
    calcurateAmt(itemList){
        var sumAmt = 0;
        for(var item of itemList){
            sumAmt += item.amt*item.cnt;
        }
        return sumAmt;
    },
    loadMenuList(){
        this.axios.post('/loadMenuListType',{})
        .then( result =>{
            this.menuList = result.data;
        })
    },
    openDrawer(){
        this.drawer= true;
    },
    saveMenuList(){
        var _this = this;
        this.axios.post('/saveMenuList',this.menuList)
        .then(data=>{
            console.log(data)
            if(data.data.result=='success')_this.$awn.info('저장되었습니다.');

            _this.drawer= false;
        })
    },
    makeChartData(){
        var result = {};
        var tempData = {labels:[],datasets:[{data:[], backgroundColor:[]}]};
        for(var list of this.historyOrderList){
            for(var order of list.orderSummary){
            var obj = result[order.title]
            if(!obj) {result[order.title] = {cnt: order.cnt, color : order.chip_color}}
            else{result[order.title].cnt += order.cnt }
            }
        }

        var sortable = [];
        for (var t in result) {
            result[t].title = t;
            sortable.push(result[t]);
        }
        sortable.sort(function(a, b) {
        return b['cnt'] - a['cnt'];
        });

        var su = 0;
        for(var menuObj of sortable){
            tempData['labels'].push(menuObj.title);
            tempData['datasets'][0]['backgroundColor'].push(this.colorList[su]);
            tempData['datasets'][0]['data'].push(menuObj.cnt);
            su++;
        }
        return tempData;
    },
  }
 };
</script>

