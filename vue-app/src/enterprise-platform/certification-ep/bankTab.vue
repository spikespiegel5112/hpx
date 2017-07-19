<template>
    <el-card class="cer-base-card">
            <div slot="header" class="card-header">
                <span>银行信息</span>
                <a v-show="isEdite" href="javascript:void(0);" style="float:right;" @click="edite">{{doneText.editeText}}</a>
                <a v-show="!isEdite" href="javascript:void(0);" style="float:right;" @click="editeDone">{{doneText.sureText}}</a>
            </div>
            <div>
                <el-form :model="bankInfoForm" :rules="bankRules" ref="bankInfoForm" label-width="30%">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="省份" prop="bankProvince" required>
                                <el-select 
                                    v-show="!isEdite" 
                                    v-model="bankInfoForm.bankProvince"
                                    @change="getCity"
                                >
                                    <el-option 
                                        v-for="item in province" 
                                        :value="item.nodeNodecode" 
                                        :key="item.nodeNodecode"
                                        :label="item.nodeNodename"
                                    >
                                    </el-option>
                                </el-select>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankProvince}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="开户行" prop="bankName" required>
                                <el-select v-show="!isEdite" v-model="bankInfoForm.bankName">
                                    <el-option 
                                        v-for="item in city" 
                                        :value="item.value" 
                                        :key="item.value"
                                        :label="item.label"
                                    >
                                    </el-option>
                                </el-select>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankName}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="城市" prop="bankCity" required>
                                <el-select v-show="!isEdite" v-model="bankInfoForm.bankCity">
                                    <el-option 
                                        v-for="item in city" 
                                        :value="item.cityAreacode" 
                                        :key="item.cityAreacode"
                                        :label="item.cityAreaname"
                                    >
                                    </el-option>
                                </el-select>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankCity}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="开户名" prop="accountName" required>
                                <el-input v-show="!isEdite" v-model="bankInfoForm.accountName"  placeholder="请输入纳税类型"></el-input>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.accountName}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="县区" prop="bankCountry" required>
                                <el-select v-show="!isEdite" v-model="bankInfoForm.bankCountry">
                                    <el-option 
                                        v-for="item in country" 
                                        :value="item.value" 
                                        :key="item.value"
                                        :label="item.label"
                                    >
                                    </el-option>
                                </el-select>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankCity}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="开户账号" prop="bankAccount" required>
                                <el-input v-show="!isEdite" v-model="bankInfoForm.bankAccount"  placeholder="请输入开户账号"></el-input>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankAccount}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="银行" prop="bankCode" required>
                                <el-select v-show="!isEdite" v-model="bankInfoForm.bankCode">
                                    <el-option 
                                        v-for="item in bank" 
                                        :value="item.sbankcode" 
                                        :key="item.sbankcode"
                                        :label="item.bankname"
                                    >
                                    </el-option>
                                </el-select>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankCode}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="备注" prop="remark">
                                <el-input v-show="!isEdite" v-model="bankInfoForm.remark"  placeholder="请输入备注"></el-input>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.remark}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
</template>
<script>
    import {provinces ,bankTypes ,cities ,countries} from '../../api/publicApi'
    export default {
        data() {
            return {
                doneText : {
                    editeText : "编辑",
                    sureText : "保存",
                },
                isEdite : false,
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

                }
            }
        },
        created(){
            this.getProv();
            this.getBank();
        },
        methods : {
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
                    this.country = res;
                }catch(e){

                }
            },
            async getCountry(){
                try{
                    const resp = await countries(this.bankInfoForm.bankCity)
                    const res = await resp.json();
                    this.bankInfoForm.bankCountry = res[0].cityAreacode;
                    this.city = res;
                }catch(e){

                }
            },
            edite(){
                console.log(7)
                this.isEdite = false;
            },
            editeDone(){
                console.log(6)
                this.isEdite = true;
            }
        }
    }
</script>
<style>
</style>