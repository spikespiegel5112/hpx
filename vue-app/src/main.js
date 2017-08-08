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

const authLogin = ['/','/register','/forgetPwd'];
const authAcc = ['platform','porderf']

router.beforeEach(async(to, from, next) => {
    const { isLogin } = store.state;
    let res = false;
    if (isLogin) {
        res = true;
    } else {
        res = await store.dispatch("getUserData");
    }
    // authLogin.indexOf(to.path) !== -1)

    if (!res && to.path !== '/' && to.path !== '/register' && to.path !== '/forgetPwd') {
        next({path: '/'})
    } else {
        const rootPath = to.path.split('/')[1];
        if(authAcc.indexOf(rootPath) !== -1){
            const { accStatusInfo } = store.state;
            if(!accStatusInfo){
                const statusResp = await store.dispatch('getAccStatusInfo');
            };
            const { authenticateStatus } = store.state.accStatusInfo;
            if(authenticateStatus === 'P'){
                next()
            }else{
                next({path:'/etpauth'})
            }                   
        }else{
            next()
        }

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
