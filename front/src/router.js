 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import Header from "./layout/youthvision/Header.vue";
 import Footer from "./layout/youthvision/Footer.vue";
 import About from "./layout/youthvision/About.vue";
 import Admin from "./layout/youthvision/Admin.vue";
 import User from "./layout/youthvision/User.vue";
 import MyAply from "./layout/youthvision/MyAply.vue";
 import Main from "./layout/Main.vue";



 Vue.use(VueRouter);
 const route = [
     {
         path: "/",
         components: {
             header: Header,
             default: Main,
             footer: Footer
         },
         meta: { unauthorized: true }
     },
     {
         path: "/About",
         components: {
             header: Header,
             default: About,
             footer: Footer
         }
     },
     {
         path: "/user",
         components: {
             header: Header,
             default: User,
             footer: Footer
         },
         meta: { unauthorized: true }
     },
     {
         path: "/myAply",
         name: "MyAply",
         components: {
             header: Header,
             default: MyAply,
             footer: Footer
         },
         meta: { unauthorized: true }
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