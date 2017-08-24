<template>
	<div>
		<header-top></header-top>
		<sider-bar :index="index"></sider-bar>
		<router-view></router-view>
	</div>
</template>

<script>
import "font-awesome/css/font-awesome.css";
import headerTop from '@/components/headerTop'
import siderBar from '@/components/siderBar';
export default {
	components : {
		headerTop,
		siderBar,
	},
	computed : {
		index(){
			return this.$route.path;
		},
	},
	created(){
		console.log(this.$route)
	}
}
</script>

<style lang="less">
@import './style/common';
</style>
