 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import JesusdreamHeader from "./layout/JesusdreamHeader";
 import JesusdreamIndex from "./layout/JesusdreamIndex.vue";
 import JesusdreamFooter from "./layout/JesusdreamFooter.vue";

 import manageIndex from "./layout/manage/manageIndex.vue";
 import Order from "./layout/Order.vue";
 import OrderNew from "./layout/Order_new.vue";

 Vue.use(VueRouter);
 const route = [{
         path: "/test",
         components: {
             header: JesusdreamHeader,
             default: JesusdreamIndex,
             footer: JesusdreamFooter
         }
     },
     {
         path: "/manage",
         components: {
             header: null,
             default: manageIndex,
             footer: null
         }
     },
     {
         path: "/",
         components: {
             header: null,
             default: Order,
             footer: null
         }
     },
     {
         path: "/new",
         components: {
             header: null,
             default: OrderNew,
             footer: null
         }
     },
 ];
 const router = new VueRouter({ mode: 'history', routes: route });
 export default router;