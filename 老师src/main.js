/**
 * Created by zhu on 2016/10/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import router from './routers';
import storer from './store';
import * as filters from './filters'
import App from './App.vue';

Vue.use(VueRouter);//装载插件
Vue.use(VueResource);//装载插件
Vue.use(Vuex);//装载插件


Vue.config.silent = false;
Vue.config.devtools = true;

//注册全局的过滤器.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const route=new VueRouter({
    routes:router,
    base:__dirname,
    mode:"hash"
    //mode:'history'
});

const store = new Vuex.Store({
  	modules:storer
});

new Vue({
    router:route,
    store:store,//vuex，状态管理
    render:h=>h(App)
}).$mount('#app');



