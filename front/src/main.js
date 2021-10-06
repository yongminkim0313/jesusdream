import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import io from "socket.io-client";
import Axios from "axios";
import VueAxios from "vue-axios";
import VueAWN from "vue-awesome-notifications";
import VueMoment from "vue-moment";

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

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;

Vue.filter("makeComma", val => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')