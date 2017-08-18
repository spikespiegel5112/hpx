import Vue from 'vue'
import Router from 'vue-router'
import hpxRouter from '../hpx-manager'
import enterprisePlatformRouter from '../enterprise-platform'

import orderRouter from '../purchase-order-financing'

Vue.use(Router)

const App = r => require.ensure([], () => r(require('@/App')), 'appContainer');
const enerpriseCertification = r => require.ensure([], () => r(require('@/enterprise-platform/certification-ep')), 'enerpriseCertification');
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const forgetPwd = r => require.ensure([], () => r(require('@/page/forgetPwd')), 'forgetPwd');

/**
 * 权限 测试
 */
const menu = r => require.ensure([], () => r(require('@/view/menu')), 'menu');
const resource = r => require.ensure([], () => r(require('@/view/resource')), 'resource');
const role = r => require.ensure([], () => r(require('@/view/role')), 'role');
const user = r => require.ensure([], () => r(require('@/view/user')), 'user');
const NotFoundView = r => require.ensure([], () => r(require('@/page/404')), 'NotFoundView');
const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/register',
		component: register
	},{
		path: '/forgetPwd',
		component: forgetPwd
	},
	{
		path: '/etpauth',
		component:enerpriseCertification
	},
	{
		path : '',
		component : App,
		children : [
			// hpx manager
			hpxRouter,

			// enterprise manager
			enterprisePlatformRouter,

			//order
			orderRouter,

			// {
			// 	path: '*', 
			// 	component: NotFoundView
			// }	
		]
	},
	{
		path : '/menu',
		component:menu
	},
	{
		path : '/resource',
		component:resource
	},
	{
		path : '/role',
		component:role
	},
	{
		path : '/usert',
		component:user
	},
	{
		path: '*', 
		component: NotFoundView
	}
	
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
	// mode:'history'
})
