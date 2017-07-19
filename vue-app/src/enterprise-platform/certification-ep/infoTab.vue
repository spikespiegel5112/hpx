<template>
    <div class="cer-baseInfo-container">
        <el-card class="cer-base-card">
            <div slot="header" class="card-header">
                <span>基本信息</span>
                <a v-show="isEdite.base" href="javascript:void(0);" style="float:right;" @click="edite('base')">{{doneText.editeText}}</a>
                <a v-show="!isEdite.base" href="javascript:void(0);" style="float:right;" @click="editeDone('base')">{{doneText.sureText}}</a>
            </div>
            <div>
                <el-form :model="baseInfoForm" :rules="baseRules" ref="baseInfoForm" label-width="30%">
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

        <el-card class="cer-base-card">
            <div slot="header" class="card-header">
                <span>工商注册信息</span>
                <a v-show="isEdite.business" href="javascript:void(0);" style="float:right;" @click="edite('business')">{{doneText.editeText}}</a>
                <a v-show="!isEdite.business" href="javascript:void(0);" style="float:right;" @click="editeDone('business')">{{doneText.sureText}}</a>
            </div>
            <div>
                <el-form :model="businessInfoForm" :rules="businessRules" ref="businessInfoForm" label-width="30%">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="工商注册时间" prop="regDate">
                                <el-date-picker
                                    v-show="!isEdite.business"
                                    v-model="regDate"
                                    type="date"
                                    @change="regDateChange"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.regDate}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="工商注册机关" prop="regOffice">
                                <el-input v-show="!isEdite.business" v-model="businessInfoForm.regOffice" placeholder="请输入工商注册机关"></el-input>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.regOffice}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="工商注册币种" prop="regCurrency">
                                <el-select v-show="!isEdite.business" v-model="businessInfoForm.regCurrency">
                                    <el-option 
                                        v-for="item in regCurrencyOptions" 
                                        :value="item.value" 
                                        :key="item.value"
                                        :label="item.label"
                                    >
                                    </el-option>
                                </el-select>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.regCurrency === 'RMB' ? "RMB" : "￥￥"}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="注册资金" prop="regCapital">
                                <el-input v-show="!isEdite.business" v-model="businessInfoForm.regCapital"  placeholder="请输入注册资金"></el-input>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.regCapital}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="营业期限" prop="operationTerm">
                                <el-input v-show="!isEdite.business" v-model="businessInfoForm.operationTerm"  placeholder="请输入营业期限"></el-input>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.operationTerm}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="公司年检时间" prop="inspectionTime">
                                <el-date-picker
                                    v-show="!isEdite.business"
                                    v-model="inspectionTime"
                                    type="date"
                                    @change="inspectionTimeChange"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.inspectionTime}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="工商注册信息" prop="taxRegistrationInfo">
                                <el-input v-show="!isEdite.business" v-model="businessInfoForm.taxRegistrationInfo"  placeholder="请输入工商注册信息"></el-input>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.taxRegistrationInfo}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否正常年检" prop="normalInspection">
                                <el-select v-show="!isEdite.business" v-model="businessInfoForm.normalInspection">
                                    <el-option 
                                        v-for="item in isCode31Options" 
                                        :value="item.value" 
                                        :key="item.value"
                                        :label="item.label"
                                    >
                                    </el-option>
                                </el-select>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.normalInspection}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="企业邮箱" prop="contactsEmail">
                                <el-input v-show="!isEdite.business" v-model="businessInfoForm.contactsEmail"  placeholder="请输入企业邮箱"></el-input>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.contactsEmail}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="经营范围" prop="scopeOfBusiness">
                                <el-input v-show="!isEdite.business" v-model="businessInfoForm.scopeOfBusiness"  placeholder="请输入经营范围"></el-input>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.scopeOfBusiness}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="注册地址" prop="address">
                                <el-input v-show="!isEdite.business" v-model="businessInfoForm.address"  placeholder="请输入注册地址"></el-input>
                                <div class='cer-text-div' v-show="isEdite.business">{{businessInfoForm.address}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>

        <el-card class="cer-base-card">
            <div slot="header" class="card-header">
                <span>联系方式</span>
                <a v-show="isEdite.contacts" href="javascript:void(0);" style="float:right;" @click="edite('contacts')">{{doneText.editeText}}</a>
                <a v-show="!isEdite.contacts" href="javascript:void(0);" style="float:right;" @click="editeDone('contacts')">{{doneText.sureText}}</a>
            </div>
            <div>
                <el-form :model="contactsInfoForm" :rules="contactsRules" ref="contactsInfoForm" label-width="30%">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="授权人" prop="contacts">
                                <el-input v-show="!isEdite.contacts" v-model="contactsInfoForm.contacts" placeholder="请输入授权人"></el-input>
                                <div class='cer-text-div' v-show="isEdite.contacts">{{contactsInfoForm.contacts}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话" prop="contactsPhone">
                                <el-input v-show="!isEdite.contacts" v-model="contactsInfoForm.contactsPhone" placeholder="请输入联系电话"></el-input>
                                <div class='cer-text-div' v-show="isEdite.contacts">{{contactsInfoForm.contactsPhone}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="授权人邮箱" prop="contactsEmail">
                                <el-input v-show="!isEdite.contacts" v-model="contactsInfoForm.contactsEmail" placeholder="请输入授权人邮箱"></el-input>                                
                                <div class='cer-text-div' v-show="isEdite.contactsEmail">{{contactsInfoForm.contactsEmail}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="城市" prop="city">
                                <el-input v-show="!isEdite.contacts" v-model="contactsInfoForm.city"  placeholder="请输入城市"></el-input>
                                <div class='cer-text-div' v-show="isEdite.contacts">{{contactsInfoForm.city}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="详细地址" prop="address">
                                <el-input v-show="!isEdite.contacts" v-model="contactsInfoForm.address"  placeholder="请输入详细地址"></el-input>
                                <div class='cer-text-div' v-show="isEdite.contacts">{{contactsInfoForm.address}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="传真" prop="contactsPost">
                                <el-input v-show="!isEdite.contacts" v-model="contactsInfoForm.contactsPost"  placeholder="请输入传真"></el-input>
                                <div class='cer-text-div' v-show="isEdite.contacts">{{contactsInfoForm.contactsPost}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="法人代表" prop="legalPerson">
                                <el-input v-show="!isEdite.contacts" v-model="contactsInfoForm.legalPerson"  placeholder="请输入法人代表"></el-input>
                                <div class='cer-text-div' v-show="isEdite.contacts">{{contactsInfoForm.legalPerson}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="法人身份证" prop="legalCardNo">
                                <el-input v-show="!isEdite.contacts" v-model="contactsInfoForm.legalCardNo"  placeholder="请输入法人身份证"></el-input>
                                <div class='cer-text-div' v-show="isEdite.contacts">{{contactsInfoForm.legalCardNo}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>

        <el-card class="cer-base-card">
            <div slot="header" class="card-header">
                <span>税务信息</span>
                <a v-show="isEdite.taxRegistration" href="javascript:void(0);" style="float:right;" @click="edite('taxRegistration')">{{doneText.editeText}}</a>
                <a v-show="!isEdite.taxRegistration" href="javascript:void(0);" style="float:right;" @click="editeDone('taxRegistration')">{{doneText.sureText}}</a>
            </div>
            <div>
                <el-form :model="taxRegistrationInfoForm" :rules="taxRules" ref="taxRegistrationInfoForm" label-width="30%">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="纳税类型" prop="taxType">
                                <el-input v-show="!isEdite.taxRegistration" v-model="taxRegistrationInfoForm.taxType"  placeholder="请输入纳税类型"></el-input>
                                <div class='cer-text-div' v-show="isEdite.taxRegistration">{{contactsInfoForm.taxType}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="税号" prop="taxNumber">
                                <el-input v-show="!isEdite.taxRegistration" v-model="taxRegistrationInfoForm.taxNumber"  placeholder="请输入税号"></el-input>
                                <div class='cer-text-div' v-show="isEdite.taxRegistration">{{contactsInfoForm.taxNumber}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>

    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { getEnterpriseInfo , patchEnterpriseInfo } from '../../api/coreApi';
    import myJs from '../../config/mUtils'
    import moment from 'moment';
    export default {
        data() {
            const checkNumber = (rule, value, callback) => {        
                if (!myJs.checkType(value,'number')) {
                    callback(new Error('请输入数字值'));
                } else {
                        callback();
                }
            };
            const checkPhone = (rule, value, callback) => {        
                if (!myJs.checkType(value,'phone')) {
                    callback(new Error('手机格式不正确'));
                } else {
                        callback();
                }
            };
            const checkCardNo = (rule, value, callback) => {
                if(value){
                    if (!myJs.checkType(value,'cardNo')) {
                        callback(new Error('身份证号码不正确'));
                    } else {
                            callback();
                    }
                }
            };
            return {
                doneText : {
                    editeText : "编辑",
                    sureText : "保存",
                },
                // 编辑状态
                isEdite : {
                    base : true,
                    business : true,
                    contacts : true,
                    taxRegistration : true
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
                baseRules : {
                    name : [
                        { required: true, message: '请输入企业名称'},
                    ],
                    taxNumber : [
                        { required: true, message: '请输入税务登记证',trigger:'blur'},
                        { validator : checkNumber,trigger:'blur'}
                    ],
                    iscode31 : [
                        { required: true, message: '请选择是否三证合一'},
                    ],
                    licenceNo : [
                        { required: true, message: '请输入营业执照号',trigger:'blur'},
                        { validator : checkNumber,trigger:'blur'}
                    ],
                    codeOrg : [
                        { required: true, message: '请输入组织机构代码',trigger:'blur'},
                        { validator : checkNumber}
                    ],
                },
                isCode31Options : [
                    {
                        value : 'T',
                        label : '是'
                    },{
                        value : 'F',
                        label : '否'
                    }
                ],
                businessInfoForm : {
                    regDate : '',
                    regOffice : '',
                    regCurrency :'',
                    regCapital :'',
                    operationTerm :'',
                    inspectionTime :'',
                    personNum :'',
                    normalInspection :'',
                    contactsEmail :'',
                    taxRegistrationInfo :'',
                    scopeOfBusiness:'',
                    address :''
                },
                regDate:'',
                inspectionTime:'',
                normalInspection : [
                    {
                        value : 'T',
                        label : '是'
                    },{
                        value : 'F',
                        label : '否'
                    }
                ],
                businessRules : {
                    regDate : [
                        { required : true, message:'先选择日期',trigger:'blur'}
                    ],
                    contactsEmail : [
                        { type : 'email', message:'邮箱格式不正确',trigger:'blur'}
                    ]
                },
                regCurrencyOptions : [
                    {
                        value : '1',
                        label : 'RMB'
                    },{
                        value : '0',
                        label : '￥￥'
                    }
                ],
                contactsInfoForm : {
                    contacts :'',
                    contactsPhone :'',
                    contactsEmail :'',
                    city :'',
                    address :'',
                    contactsPost :'',
                    legalPerson :'',
                    legalCardNo :'',
                },
                contactsRules : {
                    contactsPhone : [
                        { required : true, message:'请输入手机号码',trigger:'blur'},
                        { validator : checkPhone,trigger:'blur'}
                    ],
                    contactsEmail : [
                        { required : true, message:'请输入邮箱'},
                        { type : 'email', message:'邮箱格式不正确'}
                    ],
                    city : [
                        { required : true, message:'请输入城市'},
                    ],
                    address : [
                        { required : true, message:'请输入地址'},
                    ],
                    legalPerson : [
                        { required : true, message:'请输入法人姓名',trigger:'blur'},
                    ],
                    legalCardNo : [
                        { validator : checkCardNo,trigger:'blur'}
                    ]
                },
                taxRegistrationInfoForm : {
                    taxType :'',
                    taxNumber :''
                },
                taxRules : {
                    taxNumber :[
                        { validator : checkNumber,trigger:'blur'}
                    ]
                }
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
                    Object.keys(this.baseInfoForm).forEach( (key) => {
                        this.baseInfoForm[key] = res[key];
                    } );
                    Object.keys(this.businessInfoForm).forEach( (key) => {
                        this.businessInfoForm[key] = res[key];
                    } );
                    // question businessInfoForm.regDate 无法默认赋值
                    this.regDate = res.regDate;
                    this.inspectionTime = res.inspectionTime;
                    Object.keys(this.contactsInfoForm).forEach( (key) => {
                        this.contactsInfoForm[key] = res[key];
                    } );
                    Object.keys(this.taxRegistrationInfoForm).forEach( (key) => {
                        this.taxRegistrationInfoForm[key] = res[key];
                    } );
                }catch(e){
                    
                }
            },
            async updateBaseInfo(type){
                console.log(type)
                this.$refs[`${type}InfoForm`].validate(
                    async (valid) => {
                        if(valid){
                            try{
                                let params;
                                switch(type){
                                    case 'base' :
                                    params = this.baseInfoForm
                                    break;
                                }
                                const resp = await patchEnterpriseInfo(this.loginInfo.enterpriseId,params);
                                if(resp.status === 200){
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
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
            edite(type){
                this.isEdite[type] = false;
            },
            editeDone(type){
                const isOk = this.updateBaseInfo(type);
                isOk.then( (data) => {
                    if(data){
                        this.isEdite[type] = true;
                    }
                })
            },
            regDateChange(e){
                this.businessInfoForm.regDate = e;
            },
            inspectionTimeChange(e){
                this.businessInfoForm.inspectionTime = e;
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
        padding-left:10px;
        height:34px; 
        line-height:34px;
        border-bottom : 1px solid #e9e9e9; 
        color : #999;
    }
    .cer-base-card{
        margin:20px 0;
    }
</style>
