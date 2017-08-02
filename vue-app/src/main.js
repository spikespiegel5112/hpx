import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import baobao from './config/mUtils'

Vue.config.productionTip = false;

router.beforeEach(async(to, from, next) => {
    const { isLogin } = store.state;
    let res = false;
    if (isLogin) {
        res = true;
    } else {
        res = await store.dispatch("getUserData");
    }
    if (!res && to.path != '/login') {
        next({path: '/login'})
    } else {
        next()
    }
})

Vue.use(ElementUI);


new Vue({
    el: '#app',
    router,
    store,
    // template: '<App/>',
    // components: { App }
})
