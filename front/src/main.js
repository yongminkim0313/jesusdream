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
import { refreshToken } from './tokenServices';


//import VueMoment from "vue-moment";

Vue.config.productionTip = false

const socket = io(process.env.VUE_APP_SOCKET_URL);

Vue.prototype.$socket = socket;

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

Vue.filter("makeComma", val => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

router.beforeEach(async(to, from, next) => {
    //console.log("path::::::::::::::::", to.path);
    const vueCookies = Vue.prototype.$cookies;

    if (vueCookies.get('userInfo') === null ) {
        if(!vueCookies.get('userInfo')){
            const response = await Axios.post('/auth/userInfo');
            const userInfo = response.data.userInfo;
            if(userInfo){
                vueCookies.set('userInfo', userInfo);
            }
        }
    }

    console.log('path::::',to.path);

    if (to.matched.some(record => record.meta.auth === 'admin')){
        try{
            if(vueCookies.get('userInfo').auth =='admin'){
                // Vue.prototype.$awn.options.labels.warning = '관리자';
                // Vue.prototype.$awn.warning('관리자 페이지 입니다.!!');
                return next();
            }else{
                Vue.prototype.$awn.alert('권한이 없습니다.');
                return next('/');    
            }
        }catch(e){
            Vue.prototype.$awn.alert('오류 권한가져오기 실패');
            return next('/');
        }
    }
    if (to.matched.some(record => record.meta.unauthorized) || vueCookies.get('userInfo')) {
        return next();
    }else{
        Vue.prototype.$awn.alert('로그인이 필요합니다');
        return next('/');
    }

    
});

// Add a request interceptor
Axios.interceptors.request.use(async function(config) {
    // Do something before request is sent
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
    console.log('에러', error.response.data);
    Vue.prototype.$awn.alert(error.response.data.msg)
    const errorAPI = error.config;
    if (error.response.status === 402) { //세션만료시
        Vue.prototype.$cookies.keys().forEach(cookie => Vue.prototype.$cookies.remove(cookie));//쿠키삭제
        Vue.prototype.$eventBus.$emit('login',{isLogin:false, userInfo: []}); //로그아웃상태로 변경
        router.push({name:'Main'})
    }

    if (error.response.status === 401 && errorAPI.retry === undefined) {
        errorAPI.retry = true;
        console.log('토큰이 이상한 오류일 경우');
        await refreshToken();
        return await Axios(errorAPI);
    }
    //return Promise.reject(error);
});
new Vue({ router, vuetify, render: h => h(App) }).$mount('#app');

require("vue-awesome-notifications/dist/styles/style.css");