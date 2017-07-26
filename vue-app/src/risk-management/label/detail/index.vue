<template>
    <div class="fillcontain">
        <head-top></head-top>
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query" :rules="queryRules" ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="标签名称" prop="scoreCardName">
                            <el-input v-model="query.scoreCardName" placeholder="标签名称"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" icon="plus" @click="addNew">添加</el-button>
                        <el-button type="primary" icon="check" @click="delSubmit">提交</el-button>
                    </el-col>
                </el-row>
			</el-form>
		</el-col>
        </section>
        <section class='main-table-container'>
            <el-table
                row-key="id"
                :empty-text="emptyText"
                :data="tableList"
                v-loading="listLoading"
                :row-style="{height:'60px'}"
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="50px">
                </el-table-column>
                <el-table-column
                    v-for="(value,i) in columns"
                    :key="i"
                    :label="value.label"
                    :prop="value.prop"
                    :sortable="value.sortable"
                    :width="value.width ? value.width : 'auto'"
                    :min-width="value.minWidth ? value.minWidth : 'auto'"
                    align="center"
                >
                    <template scope="scope">
                        <el-input v-if="scope.row.isEdite" v-model="tableList[scope.$index][value.prop]" size="small" style="max-width:120px;"></el-input>
                        <div v-if="!scope.row.isEdite" >{{tableList[scope.$index][value.prop]}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width='180'>
                    <template scope="scope">
                        <el-button v-if="scope.row.isEdite" type="text" size="small" @click="save(scope.$index, scope.row)" >保存</el-button>
                        <!-- <el-button v-if="scope.row.isEdite" type="text" size="small" @click="edite(scope.$index, scope.row)">撤销</el-button> -->
                        <el-button v-if="!scope.row.isEdite" type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="remove(scope.$index, scope.row)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import { labelAdd } from '@/api/riskApi'
import { mapState } from 'vuex'
export default {
    data(){
        this.columns = [
            {
                label : '评分类别',
                prop  : 'oneLevel',
            },{
                label : '评分项',
                prop  : 'twoLevel',
            },{
                label : '评分标准',
                prop  : 'threeLevel',
            },{
                label : '分值',
                prop  : 'score',
            },{
                label : '评分权重(%)',
                prop  : 'targetGradeWeight',
            },{
                label : '定价权重(%)',
                prop  : 'targetPricingWeight',
            },{
                label : '浮动',
                prop  : 'targetFloatParameter',
            }
        ];
        this.newData = {
            oneLevel:'',
            twoLevel:'',
            threeLevel:'',
            score:'',
            targetGradeWeight:'',
            targetPricingWeight:'',
            targetFloatParameter:'',
            isEdite:true
        };
        return {         
            query : {
                scoreCardName : ''
            },
            queryRules:{
                scoreCardName: [
                    { required : true, message:'请输入标签名称'}
                ],
            },
            tableList : [],
            listLoading : false,
            emptyText:''
        }
    },
    components : {
        headTop
    },
    computed : {
        ...mapState(['loginInfo']),
        getParams(){
            return {
                scoreCardName : this.query.scoreCardName,
                modelTargetInfos : [...this.tableList]
            }
        }
    },
    methods : {
        addNew(){
            this.tableList.push({...this.newData})
        },
        save(index,row){
            for ( let key of Object.keys(this.newData)){
                if(key !== 'isEdite' && !row[key]){
                    this.$message({
                        type:'warning',
                        message:'数据不能为空!'
                    });
                    return;
                }
            };
            this.tableList[index].isEdite = false;
        },
        edite(index,row){
            this.tableList[index].isEdite = true;
        },
        remove(index,row){
            this.tableList.splice(index,1);
        },
        delSubmit(){
            this.$refs['query'].validate(      
                async (valid) => {
                    if(valid){
                        if(!this.tableList.length){
                            this.$message({
                                message: '请先添加标签',
                                type: 'warning'
                            });
                            return;
                        };

                        for( let key of Object.keys(this.tableList)){
                            if(this.tableList[key].isEdite){
                                this.$message({
                                    message: '请先保存数据',
                                    type: 'warning'
                                });
                                return;
                            };
                        }
                        try{
                            const params = {
                                scoreCardName : this.query.scoreCardName,
                                modelTargetInfos : this.tableList
                            };
                            const resp = await labelAdd(this.loginInfo.enterpriseId,params);
                            if(resp.status === 200){
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                history.go(-1)
                                return true
                            }
                        }catch(e){
                            this.$message.error(e);
                            return false;
                        }
                    }else{
                        return false;
                    }
                }
            )
        }
    }
}
</script>

<style>
  
</style>
