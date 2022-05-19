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
Axios.defaults.timeout = 2000;
Axios.defaults.withCredentials = true;

Vue.use(VueAxios, Axios);
Vue.use(VueAWN, {});
Vue.use(VueMoment);
Vue.use(VueCookies);
Vue.prototype ? Vue.prototype.$cookies = this : Vue.config.globalProperties.$cookies = this;
Vue.cookie = this;

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;

Vue.filter("makeComma", val => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})
router.beforeEach(async(to, from, next) => {
    //console.log("to.path::::::::::::::::", to.path);
    if (VueCookies.get('access_token') === null && VueCookies.get('refresh_token') !== null) {
        await refreshToken();
    }

    if (to.matched.some(record => record.meta.unauthorized) || VueCookies.get('access_token')) {
        return next();
    }

    if (to.path.indexOf('callback') > -1) {
        return next();
    }
    alert('로그인 해주세요');
    return next('/');
});
const vue = new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');

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
    console.log('에러', error.response.data);
    vue.$awn.alert(error.response.data.msg)
    const errorAPI = error.config;
    if (error.response.data.status === 401 && errorAPI.retry === undefined) {
        errorAPI.retry = true;
        console.log('토큰이 이상한 오류일 경우');
        await refreshToken();
        return await Axios(errorAPI);
    }
    //return Promise.reject(error);
});

require("vue-awesome-notifications/dist/styles/style.css");