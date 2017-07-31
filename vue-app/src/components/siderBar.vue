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
    import { getMenuList } from '../api/getData';
	import { mapState } from 'vuex';
    export default {
        data : () => ({
            menuList : [],
            laoding : false,
        }),
        props : ['index'],
        mounted : function(){
            this.$nextTick(
                async () => {
                    this.loading = true;
                    try{
                        const resp = await getMenuList(this.loginInfo.enterpriseId);
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
            ...mapState(['loginInfo']),
            defaultActive: function(){
                return this.$route.path.split('/').slice(0,3).join('/');
            },
        },
    }
</script>
<style lang="less">
    @import '../style/mixin';
    .menu-wrap{
        height: 100%;
        position: relative;
        bottom: 0;
        top: 0;
        left: 0;
        // width: 200px;
        overflow-y: scroll
    }
</style>
