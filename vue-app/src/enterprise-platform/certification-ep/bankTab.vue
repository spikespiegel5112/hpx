<template>
    <el-card class="cer-base-card">
            <div slot="header" class="card-header">
                <span>银行信息</span>
                <template v-if="allEdite">
                    <a v-show="isEdite" href="javascript:void(0);" style="float:right;" @click="edite">{{doneText.editeText}}</a>
                    <a v-show="!isEdite" href="javascript:void(0);" style="float:right;" @click="editeDone('bankInfoForm')">{{doneText.sureText}}</a>               
                </template>
            </div>
            <div>
                <el-form :model="bankInfoForm" :rules="bankRules" ref="bankInfoForm" label-width="20%">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="省份" prop="bankProvince">
                                <el-select     
                                    v-model="bankInfoForm.bankProvince"
                                    @change="getCity"
                                    :disabled="isEdite"
                                >
                                    <el-option 
                                        v-for="item in province" 
                                        :value="item.nodeNodecode" 
                                        :key="item.nodeNodecode"
                                        :label="item.nodeNodename"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="开户行" prop="bankName">
                                <el-select 
                                    :disabled="isEdite"
                                    v-model="bankInfoForm.bankName"
                                    filterable
                                >
                                    <el-option 
                                        v-for="item in bankde" 
                                        :value="item.bankname" 
                                        :key="item.bankno"
                                        :label="item.bankname"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="城市" prop="bankCity">
                                <el-select 
                                    :disabled="isEdite" 
                                    v-model="bankInfoForm.bankCity"
                                    @change="getCountry"
                                >
                                    <el-option 
                                        v-for="item in city" 
                                        :value="item.cityAreacode" 
                                        :key="item.cityAreacode"
                                        :label="item.cityAreaname"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="开户名" prop="accountName">
                                <el-input :disabled="isEdite"  v-model="bankInfoForm.accountName"  placeholder="请输入开户名"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="县区" prop="bankCountry">
                                <el-select 
                                    :disabled="isEdite" 
                                    v-model="bankInfoForm.bankCountry"
                                    @change="getBankde"
                                >
                                    <el-option 
                                        v-for="item in country" 
                                        :value="item.cityAreacode" 
                                        :key="item.cityAreacode"
                                        :label="item.cityAreaname"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="开户账号" prop="bankAccount">
                                <el-input :disabled="isEdite"  v-model="bankInfoForm.bankAccount"  placeholder="请输入开户账号"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="银行" prop="bankCode">
                                <el-select 
                                    :disabled="isEdite" 
                                    v-model="bankInfoForm.bankCode"
                                    @change="getBankde"
                                >
                                    <el-option 
                                        v-for="item in bank" 
                                        :value="item.sbankcode" 
                                        :key="item.sbankcode"
                                        :label="item.bankname"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="备注" prop="remark">
                                <el-input :disabled="isEdite"  v-model="bankInfoForm.remark"  placeholder="请输入备注"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
</template>
<script>
import {
    provinces ,
    bankTypes ,
    cities ,
    countries,
    bankdes,
} from '@/api/publicApi';
import { accountFill , eidAccCountInfo} from '@/api/coreApi'
import { mapState } from 'vuex';
export default {
    data(){
        return {
            doneText : {
                editeText : "编辑",
                sureText : "保存",
            },
            isEdite : true,
            bankInfoForm : {
                bankProvince : '',
                bankCity : '',
                bankCountry : '',
                bankCode : '',
                bankName : '',
                accountName : '',
                bankAccount : '',
                remark : ''
            },
            province : [], 
            city : [],
            country : [],
            bank : [],
            bankde : [],
            bankRules  : {
                bankProvince : [
                    { required: true, message: '请选择省份' ,trigger: 'blur' },
                ],
                bankCity : [
                    { required: true, message: '请选择城市' ,trigger: 'blur' },
                ],
                bankCountry : [
                    { required: true, message: '请选择县区' ,trigger: 'blur' },
                ],
                bankCode : [
                    { required: true, message: '请选择银行' ,trigger: 'blur' },
                ],
                bankName : [
                    { required: true, message: '请选择支行' ,trigger: 'blur' },
                ],
                accountName : [
                    { required: true, message: '请输入账户名称' ,trigger: 'blur' },
                ],
                bankAccount : [
                    { required: true, message: '请输入账户号' ,trigger: 'blur' },
                ]
            }
        }
    },
    created(){
        this.getAccount();
        this.getProv();
        this.getBank();
    },
    computed:{
        ...mapState(['loginInfo','accStatusInfo']),
        allEdite(){
            return !this.accStatusInfo.authenticateStatus || this.accStatusInfo.authenticateStatus === 'F' ? true : false;
        }
    },
    methods : {
        async getAccount(){
            try{
                const resp = await eidAccCountInfo(this.loginInfo.enterpriseId);
                const res = await resp.json();
                Object.keys(this.bankInfoForm).forEach( (key) => {
                    this.bankInfoForm[key] = res[key]
                } )
            }catch(e){
                // this.$message.error(e)
            }
        },
        async getProv(){
            try{
                const resp = await provinces();
                const res = await resp.json();
                this.province = res;
            }catch(e){
                
            }
        },
        async getBank(){
            try{
                const resp = await bankTypes();
                const res = await resp.json();
                this.bank = res;
            }catch(e){
                
            }
        },
        async getCity(e){
            try{
                const resp = await cities(this.bankInfoForm.bankProvince)
                const res = await resp.json();
                this.bankInfoForm.bankCity = res[0].cityAreacode;
                this.city = res;
            }catch(e){

            }
        },
        async getCountry(){
            try{
                const resp = await countries(this.bankInfoForm.bankCity)
                const res = await resp.json();
                this.bankInfoForm.bankCountry = res[0].cityAreacode;
                this.country = res;
            }catch(e){

            }
        },
        async getBankde(){
            if(!this.bankInfoForm.bankCity || !this.bankInfoForm.bankCode)return;
            try{
                const bankclscode = this.bankInfoForm.bankCode.substring(0,3),citycode = this.bankInfoForm.bankCity.substring(0,4)
                const resp = await bankdes(bankclscode,citycode)
                const res = await resp.json();     
                this.bankInfoForm.bankName = res[0].bankname;
                this.bankde = res;
            }catch(e){

            }
        },
        submitInfo(){
            return async () => {
                try{
                    const resp = await accountFill(this.loginInfo.enterpriseId,this.bankInfoForm);
                    if(resp.status === 200){
                        this.isEdite = true;
                        this.$message({
                            type : 'success',
                            message : '提交成功'
                        })
                    }
                }catch(e){
                    this.$message.error(e)
                }
            }
        },
        edite(){
            this.isEdite = false;
        },
        editeDone(formName){
            this.$refs[formName].validate(
                async (valid) => {
                    if(valid){
                        this.submitInfo()();
                    }
                }
            )
        }
    }
}
</script>
<style scoped>
    .el-select{
        width:60%;
    }
</style>