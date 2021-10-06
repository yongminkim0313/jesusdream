<template>  
<v-container fluid :class="updateMode?'green lighten-1':'grey lighten-5'">
    <v-row 
        no-gutters
    >
        <v-col
            sm=6
            md=4
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
            <v-card class="mt-2" height="300px">
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
            </v-card>
        </v-col>




        <v-col
            sm=6
            md=8
            lg=8
            xl=8
        >
            <v-container fluid>
                <v-fade-transition mode="out-in">
                <v-row dense>
                    <v-col
                        v-for="item in menuList"
                        :key="item.title"
                        lg=4
                        xl=4
                        md=4
                        sm=6
                    >
                        <v-card>
                            <v-card-title class="light-green lighten-5 text-center pa-1 ma-0"
                                @click="plusItemCnt(item)"
                            >
                                <strong :class="item.color+' text-truncate text-sm-overline text-md-h5'">{{item.title}}</strong>
                            </v-card-title>
                            <v-img
                                class="align-start rounded-lg"
                                :src="item.src"
                                aspect-ratio="1.7"
                                @click="plusItemCnt(item)"
                                elevation="2"
                            >
                                <v-card-text class="text-h4">
                                    <v-scroll-x-transition>
                                    <strong :class="item.color">{{item.amt | makeComma}}</strong>
                                    </v-scroll-x-transition>
                                </v-card-text>
                            </v-img>
                            <v-card class="d-flex justify-center"> 
                            <v-btn
                                class="ma-1"
                                color="black lighten-2"
                                icon
                                large
                                @click="plusItemCnt(item)"
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <strong class="ma-3">{{item.cnt}}</strong>
                            <v-btn
                                class="ma-1"
                                color="black lighten-2"
                                icon
                                large
                                @click="minusItemCnt(item)"
                            >
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            </v-card>
                        </v-card>
                    </v-col>
                </v-row>
                </v-fade-transition>
            </v-container>
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

export default {
  components: {
  },
  data: () => ({
        no: 1,
        orderList:[],
        selected:[],
        selectedItem:{},
        orderDateList:[],
        selectedDate: 1,
        dialog: false,
        historyOrderList: [],
        historyMain: {},
        menuList:[
            { title: '아메리카노'
                , src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', cnt: 0 
                , color:'teal--text text--darken-4'
                , chipColor: 'teal'
                , amt: 2000
            },
            { title: '초코라떼'
                , src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', cnt: 0 
                , color:'light-blue--text text--darken-4'
                , chipColor: 'blue'
                , amt: 3000
            },
            { title: '주꿈라떼'
                , src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', cnt: 0 
                , color:'red--text text--darken-4'
                , chipColor: 'red'
                , amt: 3000
            },
            { title: '선교비500'
                , src: 'http://image.kmib.co.kr/online_image/2018/0807/201808070000_23110923989914_1.jpg', cnt: 0 
                , color:'red--text text--darken-4'
                , chipColor: 'red'
                , amt: 500
            },
            { title: '선교비1000'
                , src: 'http://image.kmib.co.kr/online_image/2018/0807/201808070000_23110923989914_1.jpg', cnt: 0 
                , color:'red--text text--darken-4'
                , chipColor: 'red'
                , amt: 1000
            },
        ],
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
        color: ['red','green','blue','yellow','purple','orange']
    }),
  created() {
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
          return this.menuList.filter(menu => menu.cnt > 0);
      },
      updateMode(){
          return this.selectedItem.no != null;
      }
  },
  methods:{
    rowClick(data){
        var _this = this;
        _this.initMenu();
        for(var order of data.orderSummary){
            var menu = this.menuList.find(data =>{
                return data.title == order.title
            });
            menu.cnt = order.cnt;
            _this.selectedItem = data;
        }
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
            this.saveOrderList();
        }
    },
    initMenu(){
        for(var menu of this.menuList){
            menu.cnt = 0;
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
        });
    },
    calcurateAmt(itemList){
        var sumAmt = 0;
        for(var item of itemList){
            sumAmt += item.amt*item.cnt;
        }
        return sumAmt;
    }
  }
 };
</script>

