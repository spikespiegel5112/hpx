<template v-loading="loading">
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="3"  style="min-height: 100%; background-color: #324057;">
				<sider-bar index="manager"></sider-bar>
			</el-col>
			<el-col :span="21" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
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


<style lang="less" scoped>
	@import '../../style/mixin';
</style>