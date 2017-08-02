<template>
	<div>
		<header-top></header-top>
		<router-view></router-view>
	</div>
</template>

<script>
import headerTop from '@/components/headerTop'
export default {
	components : {
		headerTop
	},
}
</script>

<style lang="less">
@import './style/common';
</style>
