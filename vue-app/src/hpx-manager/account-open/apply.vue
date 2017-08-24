<template>
    <div class="fillcontain" v-loading.fullscreen.lock="loading" element-loading-text="正在开通中。。。">
        <head-top></head-top>
        <el-form :model="form" :rules="rules" ref="form" label-width="30%" >
            <el-row>
                <el-card class="cer-base-card">
                    <div slot="header" class="card-header">
                        <span>账户基本信息</span>
                    </div>
                    <div>
                        <el-col :span="12">
                             <el-form-item label="银行类型" prop="platBankType">
                                <el-select v-model="form.platBankType" disabled>
                                    <el-option v-for="item in accountBanks" :key="item.id" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="开户名称" prop="vtlAccountName">
                                <el-input v-model="form.vtlAccountName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件类型" prop="certType">
                                <el-select v-model="form.certType" disabled>
                                    <el-option v-for="item in certTypes" :key="item.code" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件号码" prop="certNo">
                                <el-input v-model="form.certNo" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="法人名称" prop="legalpersonnm">
                                <el-input v-model="form.legalpersonnm" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="通讯地址" prop="commaddress" label-width="15%">
                                <el-input disabled type='textarea' v-model="form.commaddress"></el-input>
                            </el-form-item>
                        </el-col> 
                    </div>
                </el-card>
                <el-card class="cer-base-card">
                    <div slot="header" class="card-header">
                        <span>账户参数信息</span>
                    </div>
                    <div>
                        <el-col :span="12">
                            <el-form-item label="利息标识" prop="citicCalInterestFlag">
                                <el-select v-model="form.citicCalInterestFlag" disabled>
                                    <el-option v-for="item in iFlagOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="默认利率" prop="citicInterestRate" >
                                <el-input-number :disabled="form.citicCalInterestFlag === '0'" v-model="form.citicInterestRate" :max="100" :controls="false" style="width:100%;"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="透支标识" prop="citicOverFlag">
                                <el-select v-model="form.citicOverFlag" disabled>
                                    <el-option v-for="item in oFlagOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="透支额度" prop="citicOverAmt">
                                <el-input :disabled="form.citicOverFlag === '0'" v-model="form.citicOverAmt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="自动分配利息标识" prop="citicAutoAssignInterestFlag">
                                <el-select v-model="form.citicAutoAssignInterestFlag">
                                    <el-option v-for="item in aIFlagOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="透支利率" prop="citicOverRate">
                                <el-input :disabled="form.citicOverFlag === '0'" v-model="form.citicOverRate"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="自动分配转账手续费" prop="citicAutoAssignTranFeeFlag">
                                <el-select v-model="form.citicAutoAssignTranFeeFlag">
                                    <el-option v-for="item in atfOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手续费收取方式" prop="citicFeeType">
                                <el-select v-model="form.citicFeeType">
                                    <el-option v-for="item in fTOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实名制更换" prop="citicRealNameParm">
                                <el-select v-model="form.citicRealNameParm">
                                    <el-option v-for="item in rnpOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="凭证打印更换" prop="citicSubAccPrintParm">
                                <el-select v-model="form.citicSubAccPrintParm">
                                    <el-option v-for="item in sapOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-card>
                <el-card class="cer-base-card">
                    <div slot="header" class="card-header">
                        <span>开户类型</span>
                    </div>
                    <div>
                        <el-form-item label="开户方式" prop="openType" label-width="15%">
                            <el-radio-group v-model="form.openType">
                                <el-radio disabled :label="0">在线开户</el-radio>
                                <el-radio :label="1">后台开户</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-show="form.openType === 1" label="电子账户卡号" prop="citicAccNo" label-width="15%">
                            <el-input v-model="form.citicAccNo" style="width:60%;"></el-input>
                        </el-form-item>
                        <el-form-item v-show="form.openType === 1" label="银行客户号" prop="hostNo" label-width="15%">
                            <el-input v-model="form.hostNo" style="width:60%;"></el-input>
                        </el-form-item>
                        <el-form-item label="开户备注" prop="remark" label-width="15%">
                            <el-input type="textarea" v-model="form.remark"></el-input>
                        </el-form-item>
                    </div>
                </el-card>
                <el-col :span="24" style="text-align:center;margin:30px 0;">
                    <el-button size="large" type="primary" @click="approvalAccount">提交开户</el-button>
                    <el-button size="large" @click="history.go(-1)">取消</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import { getDictionaryByCodeRequest } from '@/api/dictionaryApi'
import { getEnterpriseInfo } from '@/api/coreApi'
import { putAccount , specifyAccount} from '@/api/account-open'
import { mapState } from 'vuex'
export default {
    components: {
        headTop,
    },
    data() {
        return {
            loading : false,
            form: {
                //base
                platBankType: 'ZX',
                vtlAccountName:'',
                citicAccName:'',
                certType:'5',
                certNo:'',
                legalpersonnm:'',
                commaddress:'',

                //账户参数
                citicCalInterestFlag : '0',
                citicInterestRate : '',
                citicOverFlag :'0',
                citicOverAmt:'',
                citicAutoAssignInterestFlag :'0',
                citicOverRate:'',
                citicAutoAssignTranFeeFlag:'0',
                citicFeeType:'0',
                citicRealNameParm:'0',
                citicSubAccPrintParm:'0',

                openType : 1,
                citicAccNo : '',
                hostNo : '',
                remark : ''
            },
            rules : {
                // citicCalInterestFlag : [
                //     { required: true, message: '请选择利息标识', trigger: 'blur' },
                // ],
                // citicOverFlag : [
                //     { required: true, message: '请选择透支标识', trigger: 'blur' },
                // ],
                // citicAutoAssignInterestFlag : [
                //     { required: true, message: '请选择透支标识', trigger: 'blur' },
                // ],
                // citicOverFlag : [
                //     { required: true, message: '请选择透支标识', trigger: 'blur' },
                // ]
                citicAccNo : [
                    { required: true, message: '请输入电子账户卡号', trigger: 'blur' },
                ],
                hostNo : [
                    { required: true, message: '请输入银行客户号', trigger: 'blur' },
                ]
            },
            accountBanks : [
                {
                    id : 1,
                    code :'ZX',
                    name : '中信银行'
                },
                {
                    id:2,
                    code :'PA',
                    name : '平安银行'
                }
            ],
            iFlagOptions:[
                {
                    value :'0',
                    label : '不计息'
                },
                {
                    value :'1',
                    label : '不分段计息'
                },
                {
                    value :'2',
                    label : '分段计息'
                }
            ],
            oFlagOptions:[
                {
                    value :'0',
                    label : '不允许'
                },
                {
                    value :'1',
                    label : '限额透支'
                },
                {
                    value :'2',
                    label : '全额透支'
                }
            ],
            aIFlagOptions:[
                {
                    value :'0',
                    label : '否'
                },
                {
                    value :'1',
                    label : '是'
                },
            ],
            atfOptions:[
                {
                    value :'0',
                    label : '否'
                },
                {
                    value :'1',
                    label : '是'
                }
            ],
            fTOptions:[
                {
                    value :'0',
                    label : '不收取'
                },
                {
                    value :'1',
                    label : '实时收取'
                },{
                    value :'2',
                    label : '月末累计'
                },
            ],
            rnpOptions:[
                {
                    value :'0',
                    label : '账户名与账号全不换'
                },
                {
                    value :'1',
                    label : '账户名与账号全换'
                },{
                    value :'2',
                    label : '换账户名'
                },{
                    value :'3',
                    label : '换账号'
                },
            ],
            sapOptions:[
                {
                    value :'0',
                    label : '全部显示'
                },
                {
                    value :'1',
                    label : '显示附属账户名和账号'
                },
                {
                    value :'2',
                    label : '显示实体账户名和账号'
                },{
                    value :'3',
                    label : '显示附属账户名和实体账号'
                },{
                    value :'4',
                    label : '显示实体账户名和附属账号'
                },
            ],
            certTypes : [],
        }
    },
    computed: {
        ...mapState(["loginInfo"]),
        accountId(){
            return this.$route.params.accountId;
        },
        eid(){
            return this.$route.params.eid;
        },
        citicCalInterestFlag(){
            return this.form.citicCalInterestFlag === '0' ? false : true;
        },
        citicOverFlag(){
            return this.form.citicOverFlag === '0' ? false : true;
        }
    },
    methods: {
        async entInfo(){
            try{
                const resp = await getEnterpriseInfo(this.eid);
                const res = await resp.json();
                this.form.vtlAccountName = res.name;
                this.form.citicAccName = res.name;
                this.form.certNo = res.code31;
                this.form.legalpersonnm = res.legalPerson;
                this.form.commaddress = res.address;
            }catch(e){

            }
        },
        async cardType(){
            const resp = await getDictionaryByCodeRequest({code:'CERT_TYPE'});
            const res = await resp.json();
            this.certTypes = res;
        },
        approvalAccount() {
            this.$refs['form'].validate((valid) => {
                    if (valid) {
                        (async () => {
                            this.loading = true;
                            try{
                                const resp = await putAccount(this.eid,this.accountId,this.form);
                                const msg = decodeURI(resp.headers.get('x-hpx-alert'));
                                this.loading = false;
                                this.$message.success(msg)
                                this.$router.push({name:'bindAccount'})          
                            }catch(e){
                                this.loading = false;
                                this.$message.error(e);
                            }
                        })()
                    }
            })
        }
    },
    activated() {
        Object.assign(this.$data, this.$options.data());
        this.entInfo()
        this.cardType();
    },
    mounted() {

    },
    watch : {
        citicCalInterestFlag : function(o,n){
            if(n){
                this.form.citicInterestRate = '';
            }
        },
        citicOverFlag : function(o,n){
            if(n){
                this.form.citicOverAmt = '';
                this.form.citicOverRate = '';
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';
.cer-base-card{
    margin-top:30px;
}
</style>

