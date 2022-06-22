import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import io from "socket.io-client";
import Axios from "axios";
import VueAxios from "vue-axios";
import VueAWN from "vue-awesome-notifications";
import VueMoment from "vue-moment";
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false

Axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Axios.defaults.timeout = 15000;
Axios.defaults.withCredentials = true;

Vue.use(VueAxios, Axios);
Vue.use(VueAWN, {});
Vue.use(VueMoment);
Vue.use(VueCookies);

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;
Vue.prototype.APP_URL = process.env.VUE_APP_API_URL;
Vue.prototype.CLIENT_ID = process.env.client_id;
Vue.prototype.REDIRECT_URI = process.env.redirect_uri;
Vue.prototype.ADMIN_KEY = process.env.admin_key;
const vueCookies = Vue.prototype.$cookies;

Vue.filter("makeComma", val => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

router.beforeEach(async(to, from, next) => {
    console.log('path::::',to.path);

    var cUserInfo = vueCookies.get('userInfo');
    Vue.prototype.USERINFO = Object.assign({isLogin:cUserInfo?true:false,auth:'guest'},cUserInfo);
    if(!Vue.prototype.$socket && Vue.prototype.USERINFO.isLogin){
        Vue.prototype.$socket = io(process.env.VUE_APP_SOCKET_URL,{
            autoConnect: true,
            query: {
                kakaoId         : Vue.prototype.USERINFO.kakaoId,
                name            : Vue.prototype.USERINFO.name ,
                profileImage    :Vue.prototype.USERINFO.profileImage,
            },
        });
    }
    if(to.path ==='/callback'){
        vueCookies.set('access_token',to.query.access_token,60*60*6);
        vueCookies.set('refresh_token',to.query.refresh_token,60*60*24);
        const response = await Axios.post('/auth/userInfo');
        vueCookies.set('userInfo',response.data.userInfo,60*60*6);
        
        return next('/');
    }

    if(to.path ==='/logout'){
        vueCookies.keys().forEach(cookie => vueCookies.remove(cookie));
        return next('/');
    }

    //쿠키에 token값이 없을 경우 + Refresh Token 값이 있을 경우 -> 토큰 재발급 함수 실행
    if(VueCookies.get('access_token') === null && VueCookies.get('refresh_token') !== null){
        const response = await Axios.post('/auth/token',{refresh_token:VueCookies.get('refresh_token')});
        vueCookies.set('access_token',response.data.access_token,60*60*6);
        const response2 = await Axios.post('/auth/userInfo');
        vueCookies.set('userInfo',response2.data.userInfo,60*60*6);
        Vue.prototype.USERINFO = Object.assign({isLogin:true},response2.data.userInfo);
    }
    
    //쿠키에 token값이 있거나 ~ unauthorized 가 참일 경우 -> 다음 페이지로 이동
    if (to.matched.some(record => record.meta.unauthorized) || VueCookies.get('access_token')) {
        return next();
    }

    if (to.matched.some(record => record.meta.auth === 'admin')){
        if(Vue.prototype.USERINFO.auth =='admin'){
            return next(); 
        }else{
            Vue.prototype.$awn.alert('권한이 없습니다.');
            return next('/');    
        }
    }

    //아무것도 아닐 경우 (token값도 없고 Refresh Token도 없고) -> 로그인 페이지로 이동
    Vue.prototype.$awn.alert('로그인이 필요합니다');
    return next('/');

});

// Add a request interceptor
Axios.interceptors.request.use(async function(config) {
    // Do something before request is sent
    config.headers.access_token = VueCookies.get('access_token');
    config.headers.refresh_token = VueCookies.get('refresh_token');
  
    console.log(config);
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const errorAPI = error.config;
    console.log('에러', errorAPI);
    Vue.prototype.$awn.alert(error.response.data.msg)
    if (error.response.status === 401 && errorAPI.retry === undefined) {
        errorAPI.retry = true;
        const response = await Axios.post('/auth/token');
        vueCookies.set('access_token',response.data.access_token,60*60*6);
        vueCookies.set('refresh_token',response.data.refresh_token,60*60*24);
        const response2 = await Axios.post('/auth/userInfo');
        vueCookies.set('userInfo',response2.data.userInfo,60*60*6);
        return await Axios(errorAPI);
    }

    if(errorAPI.retry){
        Vue.prototype.$cookies.keys().forEach(cookie => Vue.prototype.$cookies.remove(cookie));//쿠키삭제
        Vue.prototype.USERINFO = null;
        router.push({name:'Main'})
    }

    return Promise.reject(error);
});

vuetify.framework.theme.themes.light.kakaoLogin = '#f8e503';
vuetify.framework.theme.themes.light.kakaoText = '#391d1d';

vuetify.framework.lang.locales.en.noDataText ='신청내역이 없습니다.';
new Vue({ router, vuetify, render: h => h(App) }).$mount('#app');

require("vue-awesome-notifications/dist/styles/style.css");