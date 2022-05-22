<template>
    <v-card flat tile>
  <v-tabs-items v-model="tabIndex">
    <v-tab-item reverse-transition>

    <v-container
      class="grey lighten-4"
      fluid
    >
      <!-- <v-subheader>커피</v-subheader> -->

      <v-row>
        <v-spacer></v-spacer>
        
        <v-col
          v-for="coffee in coffeeList"
          :key="coffee.name"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card>
            <v-img
              :src="require('../assets/'+coffee.name+'.jpg')"
              height="300px"
            >
              <span
                class="text-h5 white--text pl-4 pt-4 d-inline-block"
                v-text="coffee.name"
              ></span>
              <span
                class="text-h3 white--text pl-8 pt-8 d-inline-block"
                v-text="coffee.price"
              ></span>
            </v-img>

            <v-card-actions class="white justify-center">
              <v-btn
                class="pr-4 pl-2"
                color="black lighten-2"
                icon
                small
                @click="plus(coffee);"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              {{coffee.cnt}}
              <v-btn
              class="pr-4 pl-2"
                color="black lighten-2"
                icon
                small
                @click="minus(coffee)"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      <v-col
          cols="12"
          sm="6"
          md="4"
        >
        </v-col>
      </v-row>
    </v-container>
    </v-tab-item>
    <v-tab-item reverse-transition>
      <v-row>
        <v-col>
        <v-card>
              {{getOrderContents}}
          </v-card>
        </v-col>
      </v-row>
    </v-tab-item>
    <v-tab-item reverse-transition>
    </v-tab-item>

  </v-tabs-items>
  <v-bottom-navigation
      fixed
      :input-value="getToggle"
      color="indigo"
    >
     <v-btn>
          
        <span><h1>{{userInfo}}<strong>{{getTotalPrice | makeComma}}원</strong></h1></span>
      </v-btn>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
          <span>주문하기</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          주문서
          <v-text-field
          label="닉네임을 입력하세요"
          :rules="rules"
          hide-details="auto"
          v-model="customerName"
        ></v-text-field>
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    주문
                  </th>
                  <th class="text-left">
                    수량
                  </th>
                  <th class="text-left">
                    가격
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in getOrderContents"
                  :key="index"
                >
                  <td>{{ item.cntc }}</td>
                  <td>{{ item.cnt }}</td>
                  <td>{{ item.price | makeComma }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn>합계금액: {{getTotalPrice | makeComma}}</v-btn>
          <v-btn
            color="primary"
            text
            @click="order();"
          >
            주문
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-bottom-navigation>  
  </v-card>

</template>
<script>

export default {
  components: {
  },
  data: () => ({
      coffeeList: [
                    {name:'맥심', cnt: 0 ,price:3000}
                  , {name:'카페라떼', cnt: 0,price:2000 }
                  , {name:'원두', cnt: 0,price:2500 }
                  ],
      tabIndex:0,
      totalPrice:0,
      dialog: false,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      customerName: '',
      userInfo:{result:'asdfasdf'}
    }),
  created() {
    var _this = this;
    this.$eventBus.$on('changeTab',(data)=>{_this.tabIndex = data.tabIndex});
    this.$socket.on('message',(data) =>{
      console.log('message: ', data);
      alert(data.msg)
    })
    this.getSessionUser();
  },
  computed:{
    getTotalPrice(){
      var _this = this;
      var tempPrice=0;
      for(var coffee of _this.coffeeList){
        tempPrice += (coffee.cnt*coffee.price);
      }
      
      return tempPrice;
    },
    getOrderContents(){
      var _this = this;
      var orderContents = [];
      for(var coffee of _this.orderList){
        orderContents.push( {cntc : coffee.name  ,cnt: coffee.cnt, price: coffee.price * coffee.cnt});
      }
      return orderContents;
    },
    getToggle(){
      var _this = this;
      return _this.tabIndex == 0;
    },
    orderList(){
      var _this = this;
      var orderContents = [];
      for(var coffee of _this.coffeeList){
        if(coffee.cnt > 0 ){
          orderContents.push( coffee);
        }
      }
      return orderContents;
    }
  },
  methods : {
    login(){
      this.axios.post('/login',{user:'kim'})
      .then((data)=>{
        console.log(data);
       })
      .catch(()=>{
      })
      .then(() =>{
      });
    },
    status(){
      this.axios.post('/getUser').post('/status',{})
      .then((data)=>{
        console.log(data);
       })
      .catch(()=>{
      })
      .then(() =>{
      });
    },
    plus(coffee){
      coffee.cnt++;
    },
    minus(coffee){
      if(coffee.cnt) coffee.cnt--;
    },
    order(){
      var _this = this;
      var orderInfo = {order:{
        customerName: _this.customerName,
        orderContents: JSON.stringify(_this.getOrderContents),
        totalPrice: _this.getTotalPrice,
        progress: '접수',
        managerName: '용민',
        socketId: _this.$socket.id
      }}
      this.axios.post('/order',orderInfo)
      .then((data)=>{
        console.log(data);
       })
      .catch(()=>{
      })
      .then(() =>{
        _this.dialog = false;
        _this.customerName='';
        for(var i = 0 ; i < _this.coffeeList.length ; i++){
          _this.coffeeList[i].cnt = 0;
        }
        _this.$socket.emit('order', orderInfo, (data)=>{
          console.log(data);
        });
      });
    },
    getSessionUser(){
      var _this = this;
      this.axios.post('/getUserInfo', {})
      .then((data)=>{
        console.log(data.data);
        _this.userInfo = data.data;
      })
    }
  }
 };
</script>

