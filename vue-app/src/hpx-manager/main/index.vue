<template v-loading="loading">
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="3"  style="min-height: 100%;position:absolute;">
				<sider-bar index="/manager"></sider-bar>
			</el-col>
			<el-col :span="21" class="router-container" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
				<!-- <router-view> v-if='$route.meta.useKeepAlive'</router-view> -->
			</el-col>
		</el-row>
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


<style lang="less">
	@import '../../style/mixin';
</style>
