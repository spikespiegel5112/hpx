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
                            <el-form-item label="省份" prop="bankProvince">
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
                            <el-form-item label="开户行" prop="bankName">
                                <el-select 
                                    v-show="!isEdite" 
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
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankName}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="城市" prop="bankCity">
                                <el-select 
                                    v-show="!isEdite" 
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
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankCity}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="开户名" prop="accountName">
                                <el-input v-show="!isEdite" v-model="bankInfoForm.accountName"  placeholder="请输入纳税类型"></el-input>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.accountName}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="县区" prop="bankCountry">
                                <el-select 
                                    v-show="!isEdite" 
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
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankCity}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="开户账号" prop="bankAccount">
                                <el-input v-show="!isEdite" v-model="bankInfoForm.bankAccount"  placeholder="请输入开户账号"></el-input>
                                <div class='cer-text-div' v-show="isEdite">{{bankInfoForm.bankAccount}}</div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="银行" prop="bankCode">
                                <el-select 
                                    v-show="!isEdite" 
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
    import {provinces ,bankTypeRequest ,cities ,countries,bankdes} from '../../api/publicApi'
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
                    const resp = await bankTypeRequest();
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
            edite(){
                this.isEdite = false;
            },
            editeDone(){
                this.isEdite = true;
            }
        }
    }
</script>
<style>
</style>