<template>
    <div v-if="menuList.length" class="menu-wrap">
        <el-menu :default-active="defaultActive" mode='vertical' style="min-height: 100%;" theme="dark" unique-opened router>
            <el-menu-item :index="index"><i class="el-icon-menu"></i>首页</el-menu-item>
            <template v-for="(subMenu,i) in menuList">
                <template v-if="subMenu.vRolePermissionCustom.length">
                    <el-submenu :index="subMenu.permissionsId+''">
                        <template slot="title"><i :class="subMenu.icon"></i>{{subMenu.name}}</template>
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
    <div v-else  style="height:100%;">
        <div></div>
    </div>
</template>
<script>
    import { getMenuList,getProjectMenuList } from '../api/getData';
	import { mapState , mapActions} from 'vuex';
    export default {
        data : () => ({
            menuList : [],
            laoding : false,
        }),
        props : ['index'],
        created () {
			(() => {
				const pjId = this.$route.query.pj_id;
				console.log(pjId)
				this.getCurrentProjectId(pjId);
			})()
        },
        mounted : function(){
            this.$nextTick(
                async () => {
                    this.loading = true;
                    try{
                        const path = this.$route.path.split('/')[1];
                        const pjId = this.$route.query.pj_id;
                        let resp;
                        if(path !== 'platform' && path !== 'manager'){
                            if(pjId){
                                resp = await getProjectMenuList(this.loginInfo.enterpriseId,pjId)
                            }else{
                                const path = this.loginInfo.enterpriseId === '1' ? '/manager' : '/platform';
                                this.$alert('没有选取项目或者没权限', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$router.push({path});
                                    }
                                })
                            }
                        }else{
                            resp = await getMenuList(this.loginInfo.enterpriseId);
                        }               

                        const res = await resp.json();
                        this.menuList = res;
                        this.loading = false;
                    }catch(e){
                        this.loading = false;
                    }
                }
            )
        },
        computed : {
            ...mapState(['loginInfo','projectId']),
            defaultActive: function(){
                return this.$route.path.split('/').slice(0,3).join('/');
            },
        },
        methods : {
            ...mapActions(['getCurrentProjectId']),
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    .menu-wrap{
        height: 100%;
        position: fixed;
        top: 50px;
        bottom: 0;
        left: 0;
        width: 200px;
        overflow-y: scroll
    }
</style>
