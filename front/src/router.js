 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import JesusdreamIndex from "./layout/JesusdreamIndex.vue";

 import manageIndex from "./layout/manage/manageIndex.vue";
 //import Order from "./layout/Order.vue";
 import OrderNew from "./layout/Order_new.vue";
 import menuListEdit from "./layout/MenuListEdit.vue";
 import Main from "./layout/Main.vue";
 import Header from "./layout/Header.vue";

 Vue.use(VueRouter);
 const route = [{
         path: "/test",
         components: {
             header: Header,
             default: JesusdreamIndex,
         }
     },
     {
         path: "/manage",
         components: {
             header: Header,
             default: manageIndex,
         }
     },
     {
         path: "/",
         components: {
             header: Header,
             default: Main,
         },
         meta: { unauthorized: true }
     },
     {
         path: "/new",
         components: {
             header: Header,
             default: OrderNew,
         }
     },
     {
         path: "/menuListEdit",
         components: {
             header: Header,
             default: menuListEdit
         }
     }
 ];
 const router = new VueRouter({ mode: 'history', routes: route });
 router.beforeEach(async(to, from, next) => {
     //  window.confirm('할렐루야 ');
     //  Vue.axios.get('/findOrderList', {})
     //  console.log(to.matched);
     return next();
 });
 export default router;