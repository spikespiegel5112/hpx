<template>
    <div>
        <head-top></head-top>
        <el-row class="paltform-home-container" :gutter="24">
            <el-col :span="8">
                <el-card>
                    <div slot="header" class="card-header">
                        <span>基本信息</span>
                        <el-button type="text" class="p-home-action">
                            <router-link to="/platform/certification">详细信息</router-link>
                        </el-button>
                    </div>
                    <dl>
                        <dd>公司名称 ：</dd>
                        <dt>上海广信诚保理有限公司已认证</dt>
                        <dd>参与项目 ：</dd>
                        <dt>6</dt>
                        <dd>账户余额 ：</dd>
                        <dt>100,000.00元</dt>
                    </dl>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header" class="card-header">
                        <span>基本信息</span>
                        <el-button type="text" class="p-home-action">
                            <router-link to="/platform/certification">详细信息</router-link>
                        </el-button>
                    </div>
                    <dl>
                        <dd>公司名称 ：</dd>
                        <dt>上海广信诚保理有限公司已认证</dt>
                        <dd>参与项目 ：</dd>
                        <dt>6</dt>
                        <dd>账户余额 ：</dd>
                        <dt>100,000.00元</dt>
                    </dl>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header" class="card-header">
                        <span>基本信息</span>
                        <el-button type="text" class="p-home-action">
                            <router-link to="/platform/certification">详细信息</router-link>
                        </el-button>
                    </div>
                    <dl>
                        <dd>公司名称 ：</dd>
                        <dt>上海广信诚保理有限公司已认证</dt>
                        <dd>参与项目 ：</dd>
                        <dt>6</dt>
                        <dd>账户余额 ：</dd>
                        <dt>100,000.00元</dt>
                    </dl>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <div slot="header" class="card-header">
                        <span>我的项目</span>
                        <el-button type="text" class="p-home-action">
                            <router-link to="/platform/certification">更多项目</router-link>
                        </el-button>
                    </div>
                    <dl>
                        <dd>公司名称 ：</dd>
                        <dt>上海广信诚保理有限公司已认证</dt>
                        <dd>参与项目 ：</dd>
                        <dt>6</dt>
                        <dd>账户余额 ：</dd>
                        <dt>100,000.00元</dt>
                    </dl>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headTop from '@/components/headTop';
import { getProjectList } from '@/api/getData';
export default {
    components : {
        headTop
    },
    data(){
        return {
            projectList : []
        }    
    },
    activated(){
        this.initProjectList()
    },
    methods:{
        initProjectList(){
            (async () => {
                try{
                    const resp = await getProjectList();
                }catch(e){

                }
            })()
        }
    }
}
</script>

<style scoped>
    .paltform-home-container>div{
        margin-top:40px;
        
    }
    .paltform-home-container .el-card{
        min-height:250px;
    }
    .p-home-action{
        float:right;
        margin-top:-5px;
    }
    .paltform-home-container .card-header{
        background : #fff;
    }
</style>
