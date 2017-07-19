import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import {mapActions, mapState} from 'vuex'

Vue.config.productionTip = false;

router.beforeEach ( async (to, from, next) => {
	const { isLogin } = store.state;
	let res = false;
	if(isLogin){
		res = true;
	}else{
		console.log(store.state)
		res = await store.dispatch("getUserData");
	}

	if(!res && to.path != '/'){
		next({path : "/"})
	}else{
		next()
	}

} )

Vue.use(ElementUI);


new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
