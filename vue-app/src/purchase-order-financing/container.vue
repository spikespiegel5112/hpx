<template v-loading="loading">
	<div class="router-container">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import store from '@/store';
import { mapState } from 'vuex';
import siderBar from '@/components/siderBar';
import { entPjInfo } from '@/api/coreApi';
export default {
	components: {
		siderBar
	},
	async beforeRouteEnter(to, from, next) {
		const toPath = to.path.replace(/\/$/, '');
		const toPathArr = toPath.split('/')
		const toPathLen = toPathArr.length;
		const { loginInfo } = store.state;	
		const pjId = toPath.split('/')[2];
		const resp = await entPjInfo(loginInfo.enterpriseId, pjId);
		const res = await resp.json();
		const projectRole = res.enterpriseRole;
		store.dispatch('getCurrentProjectRole');
		let index;
		console.log(projectRole)
		switch (projectRole) {
			case 'PRO_ENT_TYPE_INVESTOR':
				index = '/investor';
				break;
			case 'PRO_ENT_TYPE_SUPPLIER':
				index = '/gf_contract';
				break;
			case 'PRO_ENT_TYPE_DEALER':
				index = '/xf_orders';
				break;
		};
		if (toPathLen === 3) {
			next({ path: toPath + index })
		} else {
			next()
		}


	}
}
</script>


<style lang="less">
@import '../style/mixin';
</style>
