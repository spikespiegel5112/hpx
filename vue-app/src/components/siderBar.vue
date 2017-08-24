<template>
	<div v-loading.fullscreen.lock="loading">
	<div v-if="menuList.length" class="menu-wrap">
		<el-menu :default-active="defaultActive" mode='vertical' style="min-height: 100%;" theme="dark" unique-opened router>
			<div style="height:50px;"></div>
			<el-menu-item :index="index">
				<i class="fa fa-home icon-style"></i>
				<span class="icon-indent">首页</span>
			</el-menu-item>
			<template v-for="(subMenu,i) in menuList">
				<template v-if="subMenu.vRolePermissionCustom.length">
					<el-submenu :index="subMenu.permissionsId+''">
						<template slot="title">
							<i :class="subMenu.icon"></i>{{subMenu.name}}</template>
						<el-menu-item v-for="(item,num) in subMenu.vRolePermissionCustom" :key="num" :index="item.link">
							{{item.name}}
						</el-menu-item>
					</el-submenu> 
				</template>
				<template v-else>
					<el-menu-item :index="subMenu.link">
						<i :class="subMenu.icon"></i>{{subMenu.name}}
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
	<div v-else style="min-height:100%;"></div>
	</div>
</template>
<script>
import {
	getMenuList,
	getProjectMenuList,
	signout
} from '../api/getData';
import {
	mapState,
	mapActions
} from 'vuex';
export default {
	data: () => ({
		menuList: [],
		loading: false,
	}),
	props: ['index'],
	created: function () {
		(async () => {
			this.loading = true;
			try {
				const path = this.$route.path.split('/')[1];
				let resp, res = [];
				if (path !== 'platform' && path !== 'manager') {
					const { pjId } = this.$route.params;
					this.getCurrentProjectId(pjId);
					if (pjId) {
						try {
							resp = await getProjectMenuList(this.loginInfo.enterpriseId, pjId);
							const tmp = await resp.json();
							this.changePath(tmp, pjId);
							res = [...tmp];
						} catch (e) {
							this.toHome(e);
						}
					} else {
						this.toHome('无项目信息');
					}
				} else {
					resp = await getMenuList(this.loginInfo.enterpriseId);
					res = await resp.json();
				}
				this.menuList = res;
				this.loading = false;
			} catch (e) {
				this.loading = false;
				this.$alert(`${e}将跳转至登录页面`, '提示', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push({path:'/'})
					}
				});		
			}
		})()
	},
	computed: {
		...mapState(['loginInfo', 'projectId']),
		defaultActive: function () {
			const path = this.$route.path.split('/')[1];
			const sliceNum = path === 'platform' || path === 'manager' ? 3 : 4;
			return this.$route.path.split('/').slice(0, sliceNum).join('/');
		},
	},
	methods: {
		...mapActions(['getCurrentProjectId']),
		changePath(data, pjId) {
			data.map(
				(v, i) => {
					if (v.vRolePermissionCustom.length) {
						this.changePath(v.vRolePermissionCustom, pjId)
					} else {
						let tmp = v.link.split('/')
						tmp.splice(2, 0, pjId);
						v.link = tmp.join('/');
					}
				}
			)
		},
		toHome(e) {
			const path = this.loginInfo.enterpriseId === '1' ? '/manager' : '/platform';
			this.$alert(`${e}`, '提示', {
				confirmButtonText: '确定',
				callback: action => {
					this.$router.push({
						path
					});
				}
			})
		}
	}
}
</script>
<style lang="less">
@import '../style/mixin';
.menu-wrap {
	height: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	width: 200px;
	overflow-y: scroll;
}
.icon-style{
	font-size: 16px!important;
}
.icon-indent{
	padding-left: 10px;
}
</style>

