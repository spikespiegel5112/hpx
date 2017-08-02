import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo,getLoginInfo} from '@/api/getData'


Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
	loginInfo : null,
	isLogin : false,
	projectId:null,
	projectInfo :null
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
	saveUserInfo(state,loginInfo){
		state.loginInfo = loginInfo;
		state.isLogin = true;
	},
	signOut(state){
		state.isLogin = false;
		// state.loginInfo = null;
	},
	saveProjectId(state,pjId){
		state.projectId = pjId;
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	async getUserData({commit},object){
		try{
			const resp = await getLoginInfo()
			if(resp.status === 200){
				const res = await resp.json();
				commit('saveUserInfo', res);
				return true
			}else{
				return false;
			}
		}catch(err){
			console.log('您尚未登陆或者session失效');
			return false;
		}
	},
	loginNot({commit}){
		commit('signOut');
	},
	async getCurrentProjectId({commit},pjId){
		try{
			commit('saveProjectId', pjId);
			return true
		}catch(err){
			this.$message.error(err);
			return false;
		}
	},
	revisePsw(store){
		const test = store.commit('changeLoginState');
		console.log(test)
	}

}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
