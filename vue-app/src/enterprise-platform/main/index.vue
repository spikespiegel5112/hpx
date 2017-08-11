<template>
	<div class="manage_page fillcontain">
		<div style="min-height: 100%;position:absolute;">
			<sider-bar index="/platform"></sider-bar>
		</div>
		<div class="router-container" style="height: 100%;overflow: auto;">
			<!-- <transition name="router-fade" mode="in-out"> -->
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			<!-- </transition> -->
		</div>
  	</div>
</template>

<script>
	import siderBar from '@/components/siderBar';
    export default {
		components : {
			siderBar,
		},
    }
</script>


<style lang="less" scoped>
	@import '../../style/mixin';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: all 0.5s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>

