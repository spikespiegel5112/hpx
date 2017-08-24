<template>
		<div class="router-container">
			  <keep-alive> 
						<router-view></router-view>
			  </keep-alive>  
		</div>
</template>

<script>
    export default {

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

