<template>
    <div class="fillcontain">
        <head-top></head-top>
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query" :rules="queryRules" ref="query">
                <el-row>
                    <el-col :span="8">
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
                        <el-button v-show="scope.row.isEdite" type="text" size="small" @click="editeDone(scope.$index, scope.row,'save')" >保存</el-button>
                         <!-- <pop-confirm v-show="scope.row.isEdite" :onconfirm="() => editeDone(scope.$index, scope.row,'cancel')"> 
                             <el-button type="text" size="small">撤销</el-button> 
                         </pop-confirm>  -->
                        <el-button v-show="scope.row.isEdite" type="text" size="small" @click="scope.row.confirmVisible = true">撤销</el-button> 
                        <el-button v-show="!scope.row.isEdite" type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="remove(scope.$index, scope.row)" >删除</el-button>
                        <el-popover
                            v-model="scope.row.confirmVisible">
                        <p><i style="color:#ffbf00" class="el-icon-information"></i> 确定撤销？</p>
                        <div style="margin-top:15px;">
                            <el-button size="mini" @click="scope.row.confirmVisible= false">取消</el-button>
                            <el-button type="primary" size="mini" @click="editeDone(scope.$index, scope.row,'cancel')">确定</el-button>
                        </div>
                        </el-popover> 
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <el-button icon="d-arrow-left" type="info" @click="back">返回</el-button>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
// import popConfirm from '@/components/popConfirm'
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
        this.addCount = 0;
        this.newData = {
            oneLevel:'',
            twoLevel:'',
            threeLevel:'',
            score:'',
            targetGradeWeight:'',
            targetPricingWeight:'',
            targetFloatParameter:'',
            isEdite:true,
            confirmVisible:false
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
            beforeList : [],
            tmp : [],
            listLoading : false,
            emptyText:''
        }
    },
    components : {
        headTop,
        // popConfirm
    },
    activated(){
        this.tableList = [];
        this.query.scoreCardName = '';
        const paramsId = this.$route.params.id;
        this.judgePageType(paramsId);
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
                        listTmp[i].confirmVisible = false;
                        listTmp[i].ref = `label${i}`;
                    };     
                    this.tableList = [...listTmp];
                }catch(e){
                    
                }
            })()
        },
        addNew(){
            this.tableList.push({...this.newData});
            this.beforeList.push({...this.newData})
            this.addCount++;
        },
        back(){
            window.history.go(-1)
        },
        editeDone(index,row,type){
            console.log(row)
            let tmp = row;
            if(type === 'cancel'){
                tmp = this.beforeList[index]
            };
            for ( let key of Object.keys(this.newData)){
                if(key !== 'isEdite' && key !== 'confirmVisible' && !tmp[key]){
                    this.$message({
                        type:'warning',
                        message:'数据不能为空!'
                    });
                    return;
                }
            };
            
            if(type === 'cancel'){
                this.tableList = JSON.parse(JSON.stringify(this.beforeList));
                this.tableList[index].confirmVisible = false;
            };
            this.tableList[index].isEdite = false;
        },
        edite(index,row){
            this.beforeList = JSON.parse(JSON.stringify(this.tableList)); 
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
        },
    },
}
</script>

<style>
  
</style>
