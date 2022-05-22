<template>
    <header class="header-global">
        <v-card class="overflow-hidden">
    <v-app-bar
      app
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      :src="require('../assets/jang.png')"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
     
      <v-app-bar-title>
       <v-avatar
      size="30px"
      >
      <v-img
        :src="require('../assets/jesusdream.png')"
        aspect-ratio="1"
        class="grey lighten-2"
      >
      </v-img>
      </v-avatar>
      <strong >주꿈카페</strong>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs 
          align-with-title
          v-model="tabs"
        >
          <v-tab @click="changeTab(0)">메뉴</v-tab>
          <!-- <v-tab @click="changeTab(1)">
            <v-badge
              v-if="orderCount"
              color="green"
              :content="orderCount"
            >
            장바구니
            </v-badge>
            <template
              v-if="!orderCount"
              >장바구니</template>
          </v-tab> -->
          <v-tab @click="changeTab(1)">주문상태</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    </v-card>
    </header>
</template>
<script>
// <v-text-field
//             label="닉네임"
//             placeholder="이름을 입력하세요"
//           ></v-text-field>
export default {
  data () {
    return {
      tabs: null,
      orderCount:0
    }
  },
  created(){
    var _this = this;
    this.$eventBus.$on('orderCount', (data)=>{
      _this.orderCount = data.orderCount;
    });
  },
  methods: {
    changeTab(tabIndex){
      this.$eventBus.$emit('changeTab',{tabIndex:tabIndex});
    }
  }

};
</script>
<style>
</style>
