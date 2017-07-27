<template>
    <div class="fillcontain">
        <head-top></head-top>
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query" :rules="queryRules" ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="标签名称 :" prop="scoreCardName">
                            <el-input v-if="showType" v-model="query.scoreCardName" placeholder="标签名称"></el-input>
                            <div v-else style="border-bottom:1px solid #e9e9e9;min-width:140px;">{{query.scoreCardName}}</div>
                        </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col v-if="showType" :span="6">
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
                        <el-input v-show="scope.row.isEdite" v-model="tableList[scope.$index][value.prop]" size="small" style="max-width:120px;"></el-input>
                        <div v-show="!scope.row.isEdite" >{{tableList[scope.$index][value.prop]}}</div>
                    </template>
                </el-table-column>
                <el-table-column v-if="showType" label="操作" align="center" width='180'>
                    <template scope="scope">
                        <el-button v-show="scope.row.isEdite" type="text" size="small" @click="save(scope.$index, scope.row)" >保存</el-button>
                        <!-- <el-button v-if="scope.row.isEdite" type="text" size="small" @click="edite(scope.$index, scope.row)">撤销</el-button> -->
                        <el-button v-show="!scope.row.isEdite" type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="remove(scope.$index, scope.row)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <el-button icon="d-arrow-left" type="info" @click="back">返回</el-button>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import { labelAdd , labelDetail , labelRevise } from '@/api/riskApi'
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
            labelId : '',
            pageType : '',     
            query : {
                scoreCardName : ''
            },
            queryRules:{
                scoreCardName: [
                    { required : true, message:'请输入标签名称',trigger:'blur'}
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
    activated(){
        this.tableList = [];
        this.query.scoreCardName = '';
        const paramsId = this.$route.params.id;
        this.judgePageType(paramsId);
        console.log(this.labelId);
        if(this.pageType === 'edite' || this.pageType === 'check'){
            this.getDetail();
        }
    },
    computed : {
        ...mapState(['loginInfo']),
        showType : function(){
            return this.pageType === 'add' || this.pageType === 'edite';
        }
    },
    methods : {
        judgePageType(paramsId){
            if(paramsId.match(/^add/)){
                this.pageType = 'add';
            }else if(paramsId.match(/^edite/)){
                this.pageType = 'edite';
                this.labelId = paramsId.split('_')[1]
            }else if(paramsId.match(/^check/)){
                this.pageType = 'check';
                this.labelId = paramsId.split('_')[1]
            }else{
                return;
            }
        },
        getDetail(){
            (async () => {
                try{
                    const resp = await labelDetail(this.loginInfo.enterpriseId,this.labelId)
                    const res = await resp.json();
                    this.query.scoreCardName = res.scoreCardName;
                    let listTmp = [...res.modelTargetInfos];
                    for( let i = 0 , len = listTmp.length; i < len; i++){
                        listTmp[i].isEdite = false;
                    };     
                    this.tableList = [...listTmp];
                }catch(e){
                    
                }
            })()
        },
        addNew(){
            this.tableList.push({...this.newData})
        },
        back(){
            window.history.go(-1)
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
            console.log(index,row)
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
                            const resp = this.pageType === 'add' ? await labelAdd(this.loginInfo.enterpriseId,params) 
                                        : await labelRevise(this.loginInfo.enterpriseId,this.labelId,params);
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
