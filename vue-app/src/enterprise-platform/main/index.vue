<template v-loading="loading">
	<div class="manage_page fillcontain">
		<div style="min-height: 100%;position:absolute;">
			<sider-bar index="/platform"></sider-bar>
		</div>
		<div class="router-container" style="height: 100%;overflow: auto;">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
  	</div>
</template>

<script>
	import siderBar from '../../components/siderBar';
    export default {
		components : {
			siderBar
		}
    }
</script>


<style lang="less" scoped>
	@import '../../style/mixin';
</style>

