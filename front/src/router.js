 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import Header from "./layout/youthvision/Header.vue";
 import AdminHeader from "./layout/youthvision/AdminHeader.vue";
 import AdminPoster from "./layout/youthvision/AdminPoster.vue";
 import Footer from "./layout/youthvision/Footer.vue";
 import About from "./layout/youthvision/About.vue";
 import Admin from "./layout/youthvision/Admin.vue";
 import User from "./layout/youthvision/User.vue";
 import MyAply from "./layout/youthvision/MyAply.vue";
 import MyAplyList from "./layout/youthvision/MyAplyList.vue";
 import Main from "./layout/Main.vue";
 import CampLive from "./layout/youthvision/CampLive.vue";

 Vue.use(VueRouter);
 const route = [
     {
         path: "/",
         name: "Main",
         components: {
             header: Header,
             default: Main,
             footer: Footer
         },
         meta: { unauthorized: true }
     },
     {
         path: "/About",
         name: "About",
         components: {
             header: Header,
             default: About,
             footer: Footer
         },
         meta: { unauthorized: true }
     },
     {
         path: "/user",
         name: "User",
         components: {
             header: Header,
             default: User,
             footer: Footer
         },
     },
     {
         path: "/myAply",
         name: "MyAply",
         components: {
             header: Header,
             default: MyAply,
             footer: Footer
         },
     },
     {
         path: "/admin",
         name: 'Admin',
         components: {
             header: AdminHeader,
             default: Admin
         },
         meta:{auth:'admin'}
     },
     {
         path: "/myAplyList",
         name: 'MyAplyList',
         components: {
             header: Header,
             default: MyAplyList,
             footer: Footer
         },
         meta: { unauthorized: true }
     },
     {
         path: "/adminPoster",
         name: 'AdminPoster',
         components: {
             header: AdminHeader,
             default: AdminPoster,
         },
         meta:{auth:'admin'}
     },
     {
         path: "/campLive",
         name: 'CampLive',
         components: {
             header: Header,
             default: CampLive,
             footer: Footer
         },
         meta: { unauthorized: true }
     }
 ];
 const router = new VueRouter({ mode: 'history', routes: route });
 export default router;