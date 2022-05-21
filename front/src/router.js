 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import JesusdreamIndex from "./layout/JesusdreamIndex.vue";

 import manageIndex from "./layout/manage/manageIndex.vue";
 //import Order from "./layout/Order.vue";
 import OrderNew from "./layout/Order_new.vue";
 import menuListEdit from "./layout/MenuListEdit.vue";
 import Main from "./layout/Main.vue";
 import Header from "./layout/Header.vue";
 import Callback from "./layout/Callback.vue";
 import About from "./layout/About.vue";

 import Admin from "./layout/youthvision/Admin.vue";

 import User from "./layout/youthvision/User.vue";


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
     },
     {
         path: "/callback",
         components: {
             header: Header,
             default: Callback
         }
     },
     {
         path: "/About",
         components: {
             header: Header,
             default: About
         }
     },
     {
         path: "/user",
         components: {
             header: Header,
             default: User
         }
     },
     {
         path: "/admin",
         components: {
             header: Header,
             default: Admin
         },
         meta:{auth:'admin'}
     }
 ];
 const router = new VueRouter({ mode: 'history', routes: route });
 export default router;