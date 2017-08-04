import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-default/index.css'

import baobao from './config/mUtils'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;

router.beforeEach(async(to, from, next) => {
    const { isLogin } = store.state;
    let res = false;
    if (isLogin) {
        res = true;
    } else {
        res = await store.dispatch("getUserData");
    }
    if (!res && to.path != '/' && to.path != '/register') {
        next({path: '/'})
    } else {
        next()
    }
})

Vue.use(ElementUI);
Vue.use(echarts);

new Vue({
    el: '#app',
    router,
    store,
    // template: '<App/>',
    // components: { App }
})
