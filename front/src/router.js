 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import JesusdreamIndex from "./layout/JesusdreamIndex.vue";

 import manageIndex from "./layout/manage/manageIndex.vue";
 import Order from "./layout/Order.vue";
 import OrderNew from "./layout/Order_new.vue";
 import menuListEdit from "./layout/MenuListEdit.vue";

 Vue.use(VueRouter);
 const route = [{
         path: "/test",
         components: {
             default: JesusdreamIndex,
         }
     },
     {
         path: "/manage",
         components: {
             default: manageIndex,
         }
     },
     {
         path: "/",
         components: {
             default: Order,
         }
     },
     {
         path: "/new",
         components: {
             default: OrderNew,
         }
     },
     {
         path: "/menuListEdit",
         components: {
             default: menuListEdit
         }
     }
 ];
 const router = new VueRouter({ mode: 'history', routes: route });
 export default router;