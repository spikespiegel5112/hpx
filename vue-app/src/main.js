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

Vue.use(ElementUI);
Vue.use(echarts);

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
            let statusResp = true;
            const { accStatusInfo } = store.state;
            if(!accStatusInfo){
                statusResp = await store.dispatch('getAccStatusInfo');
            };
            if(!statusResp){
                ElementUI.Message({
                    type:'error',
                    message:'请检测网络或联系管理员'
                })
                return;
            }
            const { authenticateStatus } = store.state.accStatusInfo;
            if(authenticateStatus === 'P'){
                next()
            }else{
                next({path:'/etpauth'})
            }                   
        }else{
            next()
        }
        next()
    }
})
export const app = new Vue({
    el: '#app',
    router,
    store,
    // template: '<App/>',
    // components: { App }
});
