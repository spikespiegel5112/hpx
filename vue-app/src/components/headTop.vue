<template>
<div class="header_container">

	<el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{ path: index }">首页</el-breadcrumb-item>
		<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
	</el-breadcrumb>
	<el-dropdown @command="handleCommand" menu-align='start'>
		<img src="/static/img/default.jpg" class="avator">
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item command="home">首页</el-dropdown-item>
			<el-dropdown-item command="singout">退出</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</div>
</template>

<script>
import {signout} from '@/api/getData'
import {baseImgPath} from '@/config/env'
import {mapActions,mapState} from 'vuex'

export default {
	data() {
		return {
			baseImgPath,
		}
	},
	computed: {
		index(){
			return `/${this.$route.path.split('/')[1]}`;
		}
	},
	methods: {
		...mapActions(['loginNot']),
		async handleCommand(command) {
			if (command == 'home') {
				this.$router.push('/manage');
			} else if (command == 'singout') {
				const res = await signout()
				if (res.ok) {
					this.loginNot();
					this.$message({
						type: 'success',
						message: '退出成功'
					});
					this.$router.push('/');
				} else {
					this.$message({
						type: 'error',
						message: res.message
					});
				}
			}
		}
	},
}
</script>

<style lang="less">
@import '../style/mixin';
.header_container {
	// margin: 0 0 30px 0;
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
	// border: 1px solid #d1dbe5;
}
.avator {
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
