<template v-loading="loading">
	<div class="router-container">
		<keep-alive>
			<router-view></router-view>
		</keep-alive> 
	</div>
</template>

<script>

    export default {
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
