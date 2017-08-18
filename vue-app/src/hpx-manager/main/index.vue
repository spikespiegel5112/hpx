<template v-loading="loading">
	<div class="manage_page fillcontain">
		<div style="min-height: 100%;position:absolute;">
			<sider-bar index="/manager"></sider-bar>
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
		},
		data(){
			return{
				excludeComponents:['noticeEdit']
			}
		}
    }
</script>


<style lang="less">
	@import '../../style/mixin';
</style>
