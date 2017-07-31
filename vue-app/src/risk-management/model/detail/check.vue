<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--模型测试部分-->
        <section :model="modelData">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="line-height:  56px; font-seize: 18px; margin-left: 20px">基础信息</span>
                </div>
                <div style="margin:20px 0; font-size:14px">
                    <span>模型名称：</span><span>{{modelData.gradeCardName}}</span><br/><br/>
                    <span>所在行业：</span><span>{{modelData.industryName}}</span><br/><br/>
                    <span>模型描述：</span><span>{{modelData.gradeCardDescribe}}</span>
                </div>
            </el-card>
        </section>
        
        <!--模型分数部分-->
        <section :model="modelData" class="model-table">
            <p style="margin-top: 30px; text-align: center;width: 70px; padding-bottom: 10px; margin: 40px 0 10px 0">模型分数</p>
            <el-table
                row-key="id"
                :data="modelData.labelInfos"
                v-loading="listLoading"
                :row-style="{height:'60px'}"
                style="width: 100%"
                border>
                <el-table-column
                  label="序号"
                  type="index"
                  width="80px"
                  align="center">
                </el-table-column>
                <el-table-column
                    v-for="(value,i) in scoreColumns"
                    :key="i"
                    :label="value.label"
                    :prop="value.prop"
                    align="center"
                >
                </el-table-column>
            </el-table>
        </section>

        <!--评分等级部分-->
        <section :model="modelData" class="model-table">
           <p style="margin-top: 30px; text-align: center;width: 70px; padding-bottom: 10px; margin: 40px 0 10px 0">评分等级</p>
            <el-table
                row-key="id"
                :data="modelData.scoreGrades"
                v-loading="listLoading"
                :row-style="{height:'60px'}"
                style="width: 100%"
                border>
                <el-table-column
                  label="序号"
                  type="index"
                  width="80px"
                  align="center">
                </el-table-column>
                <el-table-column
                    v-for="(value,i) in gradeColumns"
                    :key="i"
                    :label="value.label"
                    :prop="value.prop"
                    align="center"
                >
                </el-table-column>
            </el-table>
        </section>

        <!--模型详情部分-->
        <section :model="modelData" class="model-table">
            <p style="margin-top: 30px; text-align: center;width: 70px;padding-bottom: 10px; margin: 40px 0 10px 0">模型详情</p>
            <el-card 
             v-for="(value,index) in modelData.labelInfos" 
             :key="index"
             class="box-card" 
             style="margin-bottom: 50px;width: 100%;">
                <div slot="header" class="clearfix">
                    <span style="line-height:  56px; font-seize: 18px; margin-left: 20px">{{value.scoreCardName}}</span>
                </div>
                <div v-for="(val, ind) in value.targetInfos" :key="ind" class="text item">
                    <div>
                        {{val.name}}
                    </div>
                    <div v-for="(v, i) in val.modelTargetInfos" :key="i" >
                        {{v.threeLevel}}({{v.score}})分
                    </div>
                </div>
            </el-card>
                
        </section>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import { modelCheck } from '@/api/riskApi'
import { mapState } from 'vuex'
export default {
    data(){
        this.scoreColumns = [
            {
                label : '打分卡名称',
                prop  : 'scoreCardName',
            },{
                label : '分数',
                prop  : 'total',
            }
        ];
        this.gradeColumns = [
            {
                label : '等级',
                prop  : 'gradeName',
            },{
                label : '最低分',
                prop  : 'gradeMin',
            },{
                label : '最高分',
                prop  : 'gradeMax',
            }
        ];
        return {  
            listLoading:false,
            modelData:{ } ,    
            query : {
                name : ''
            },
            queryRules:{
                name: [
                    { required : true, message:'请输入标签名称'}
                ],
            },
            tableList : []
        }
    },
    components : {
        headTop
    },
    created() {
        this.initData();
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    methods : {
        async initData(){
            const eid = this.loginInfo.enterpriseId;
            const id =  this.$route.path.split('/')[this.$route.path.split('/').length - 1];
            try{
                const resp = await modelCheck(id, eid) ;
                const res = await resp.json();
                console.log("数据", res);
                this.modelData = {...res};
            }catch(e) {

            }
        },
    }
}
</script>

<style>
.box-card {
    margin-top: 20px;
    box-shadow: none;
    transition: box-shadow .5s;
    width: 90%;
}

.box-card:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: box-shadow .5s;
}

.model-table {
    width: 90%;
}
</style>
