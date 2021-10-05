<template>
  <v-card>
      <v-row no-gutters>
          <v-col>
        <v-card>
            <v-navigation-drawer
            permanent
            fixed
            expand-on-hover
            >
            <v-list-item class="px-2">
                <v-list-item-avatar>
                <v-img :src="require('../../assets/jesusdream.png')"></v-img>
                </v-list-item-avatar>
                <v-list-item-title>주꿈</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
            </v-navigation-drawer>
        </v-card>
        <v-data-table
            fixed-header
            dense
            :headers="headers"
            :items="orderList"
            item-key="name"
            class="elevation-7 pa-2"
        >
        <template v-slot:item.seq="{ item }">
        <v-btn
          elevation="2"
          @click="cancleOrder(item);"
        >
          삭제
        </v-btn>
        </template>
        <template v-slot:item.orderDate="{ item }">
        <v-btn
          elevation="2"
        >
          {{diffTime(item.orderDate)}}
        </v-btn>
        </template>
        <template v-slot:item.totalPrice="{ item }">
        <v-btn
          elevation="2"
        >
          {{item.totalPrice | makeComma }}
        </v-btn>
        </template>
        <template v-slot:item.progress="{ item }">
        <v-btn
          elevation="2"
          @click="sendMsgUser(item);"
        >
          메세지
        </v-btn>
        </template>
        <template v-slot:item.orderContents="{ item }">
        <v-chip 
          v-for="contents in parseContents(item.orderContents)"
          :key="contents.cntc"
        >
            {{contents.cntc +':'+contents.cnt}}
        </v-chip>
        </template>
        </v-data-table>
        </v-col>
      </v-row>
  </v-card>
</template>
<script>
export default {
  components: {
  },
  data(){
      return {
        orderList: [],
        items: [
          { title: '주문접수내역', icon: 'mdi-home-city' },
          { title: '완료내역', icon: 'mdi-account-group-outline' },
        ],
         headers: [
           { text: '주문입니다.', value: null },
           { text: 'No', value: 'seq' },
           {
             text: '주문시간',
          align: 'center',
          sortable: false,
          value: 'orderDate',
        },
        { text: '주문자', value: 'customerName' },
        { text: '주문내용', value: 'orderContents' },
        { text: '총금액', value: 'totalPrice' },
        { text: '진행상황', value: 'progress' },
        { text: '매니져', value: 'managerName' },
        { text: 'socketId', value: 'socketId' },
      ],
      desserts:[]
      }
    },
  created() {
      this.findOrderList();
      var _this = this;
      this.$socket.on('order', (data)=>{
        console.log(data);
        _this.findOrderList();
      });
  },
  computed:{
  },
  methods : {
    findOrderList(){
      var _this = this;
      this.axios.get('/findOrderList',{})
      .then((data)=>{
        _this.orderList = data.data;
       })
      .catch(()=>{
      })
      .then(() =>{
      });
    },
    cancleOrder(item){
      console.log(item);
      var _this = this;
      this.axios.post('/cancleOrder',item)
      .then((data)=>{
        console.log(data);
        var idx = _this.orderList.findIndex((data)=>{
          return data.seq === item.seq;
        });
        if(idx > -1)_this.orderList.splice(idx,1);
       })
      .catch(()=>{
      })
      .then(() =>{
      });
    },
    diffTime (time) { 
      console.log(time);
      const moment = require('moment') 
      const today = moment()
      return moment.duration(today.diff(time)).minutes()+'분'+moment.duration(today.diff(time)).seconds()+'초 전'; 
    },
    parseContents(contents){
      return eval(contents);
    },
    sendMsgUser(order){
      console.log(order);
      this.$socket.emit('sendMsgUser', { customerName: order.customerName, msg:'주문접수되었습니다.'})
    }
  }
 };
</script>

