import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('AccessToken');
axios.defaults.headers.common['Accept'] = 'application/json';

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
