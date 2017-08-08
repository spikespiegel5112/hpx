import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo,getLoginInfo} from '@/api/getData'
import { eidAccStatus } from '@/api/coreApi'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
	loginInfo : null,
	isLogin : false,
	projectId:null,
	projectInfo :null,
	accStatusInfo : null,
	statusStep : 1,
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
	},
	saveAccStatusInfo(state,info){
		state.accStatusInfo = info;
	},
	saveAccStep(state,step){
		state.statusStep = step;
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
			return false;
		}
	},
	async getAccStatusInfo(store){
		try{
			const resp = await eidAccStatus(store.state.loginInfo.enterpriseId);
			if(resp.status === 200){
				const res = await resp.json();
				let step = 1;
				switch(res.authenticateStatus){
					case 'P':
					step = 4 ;
					break;
					case 'T':
					step = 3 ;
					break;
					case 'F':
					step = 3 ;
					break;
					case 'A':
					step = 2 ; 
					break;
					default :
					step = 1;
					break;
				}
				store.commit('saveAccStatusInfo',res);
				store.commit('saveAccStep',step)				
			}else{
				store.commit('saveAccStatusInfo',{});
				store.commit('saveAccStep',1)
			}
			return true;	
		}catch(e){
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
