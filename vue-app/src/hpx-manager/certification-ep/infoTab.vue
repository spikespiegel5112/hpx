<template>
    <div class="cer-baseInfo-container">
    <el-card>
        <div slot="header" class="card-header">
            <span>基本信息</span>
            <a v-show="isEdite.base" href="javascript:void(0);" style="float:right;" @click="edite('base')">{{doneText.editeText}}</a>
            <a v-show="!isEdite.base" href="javascript:void(0);" style="float:right;" @click="editeDone('base')">{{doneText.sureText}}</a>
        </div>
        <div>
            <el-form :model="baseInfoForm" label-width="30%">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业名称" prop="name">
                            <el-input v-show="!isEdite.base" v-model="baseInfoForm.name" placeholder="请输入企业名称"></el-input>
                            <div class='cer-text-div' v-show="isEdite.base">{{baseInfoForm.name}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="税务登记证" prop="taxNumber">
                            <el-input v-show="!isEdite.base" v-model="baseInfoForm.taxNumber" placeholder="请输入税务登记证"></el-input>
                            <div class='cer-text-div' v-show="isEdite.base">{{baseInfoForm.taxNumber}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否三证合一" prop="iscode31">
                            <el-select v-show="!isEdite.base" v-model="baseInfoForm.iscode31">
                                <el-option 
                                    v-for="item in isCode31Options" 
                                    :value="item.value" 
                                    :key="item.value"
                                    :label="item.label"
                                >
                                </el-option>
                            </el-select>
                            <div class='cer-text-div' v-show="isEdite.base">{{baseInfoForm.iscode31 === 'T' ? "是" : "否"}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业类型" prop="enterpriseType">
                            <el-input v-show="!isEdite.base" v-model="baseInfoForm.enterpriseType"  placeholder="请输入企业类型"></el-input>
                            <div class='cer-text-div' v-show="isEdite.base">{{baseInfoForm.enterpriseType}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="营业执照号" prop="licenceNo">
                            <el-input v-show="!isEdite.base" v-model="baseInfoForm.licenceNo"  placeholder="请输入营业执照号"></el-input>
                            <div class='cer-text-div' v-show="isEdite.base">{{baseInfoForm.licenceNo}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行业类型" prop="industry">
                            <el-input v-show="!isEdite.base" v-model="baseInfoForm.industry"  placeholder="请输入行业类型"></el-input>
                            <div class='cer-text-div' v-show="isEdite.base">{{baseInfoForm.industry}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组织机构代码" prop="codeOrg">
                            <el-input v-show="!isEdite.base" v-model="baseInfoForm.codeOrg"  placeholder="请输入组织机构代码"></el-input>
                            <div class='cer-text-div' v-show="isEdite.base">{{baseInfoForm.codeOrg}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区域" prop="area">
                            <el-input v-show="!isEdite.base" v-model="baseInfoForm.area"  placeholder="请输入区域"></el-input>
                            <div class='cer-text-div' v-show="isEdite.base">{{baseInfoForm.area}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </el-card>

    </div>
</template>
<script>
    import { getEnterpriseInfo , patchEnterpriseInfo } from '../../api/coreApi';
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                doneText : {
                    editeText : "编辑",
                    sureText : "保存",
                },
                isEdite : {
                    base : true,
                },
                baseInfoForm : {
                    name : '',
                    taxNumber : '',
                    iscode31 : '',
                    enterpriseType : '',                   
                    licenceNo : '',
                    industry : '',
                    codeOrg : '',
                    area : '',
                },
                isCode31Options : [
                    {
                        value : 'T',
                        label : '是'
                    },{
                        value : 'F',
                        label : '否'
                    }
                ]
            }
        },
        created(){
            this.getBaseData();
        },
        computed : {
            ...mapState(["loginInfo"])
        },
        methods : {
            async getBaseData(){
                try{
                    const resp = await getEnterpriseInfo(this.loginInfo.enterpriseId);
                    const res = await resp.json();
                    const { name ,taxNumber ,iscode31 ,enterpriseType ,licenceNo ,industry ,codeOrg ,area } = res;
                    this.baseInfoForm = {
                        name,
                        taxNumber,
                        iscode31 ,
                        enterpriseType ,
                        licenceNo ,
                        industry ,
                        codeOrg ,
                        area
                    };
                    console.log(this.baseInfoForm , 88888)
                }catch(e){
                    
                }
            },
            async updateBaseInfo(type){
                try{
                    let params;
                    switch(type){
                        case 'base' :
                        params = this.baseInfoForm
                        break;
                    }
                    const resp = await patchEnterpriseInfo(this.loginInfo.enterpriseId,params);
                    if(resp.status === 200){
                        return true
                    }
                }catch(e){
                    return false;
                }
            },
            edite(type){
                const isOk = this.updateBaseInfo(type);
                isOk.then( (data) => {
                    
                })
                this.isEdite[type] = false;
            },
            editeDone(type){
                this.isEdite[type] = true;
            }
        }
    }
</script>
<style scope>
    .cer-baseInfo-container .el-form-item__content{
        width:60%;
        padding-left:10px;
    }
    .cer-text-div{
         height:34px; 
         line-height:34px;
         border-bottom : 1px solid #e9e9e9; 
         color : #999;
    }
</style>
