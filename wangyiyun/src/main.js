import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store/index";

Vue.use(VueRouter);
Vue.use(ElementUI);



Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,

    store,
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线
    },
}).$mount('#app')