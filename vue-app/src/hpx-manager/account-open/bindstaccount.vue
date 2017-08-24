<template>
    <div>
        <head-top></head-top>
        <div class="m-account-bind">
            <h3>开户成功</h3>
            <div class="clear">
                <dl>
                    <dd>客户编号:</dd>
                    <dt>{{form.custno}}</dt>
                </dl>
                <dl>
                    <dd>账户名称:</dd>
                    <dt>{{form.vtlAccountName}}</dt>
                </dl>
                <dl>
                    <dd>电子账户:</dd>
                    <dt>{{form.citicAccNo}}</dt>
                </dl>
                <dl>
                    <dd>银行客户号:</dd>
                    <dt>{{form.hostNo}}</dt>
                </dl>
            </div>
            <el-card class="cer-base-card">
                <div slot="header" class="card-header">
                    <span>实体账号信息</span>
                </div>
                <el-form :model="form" ref="form" label-width="30%">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="银行名称" prop="stBankCode">
                                <el-select v-model="form.paSbankCode" disabled>
                                    <el-option v-for="item in bank" 
                                        :value="item.sbankcode" 
                                        :key="item.sbankcode"
                                        :label="item.bankname">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实体名称" prop="stAccountName">
                                <el-input v-model="form.stAccountName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否他行">
                                <el-select v-model="form.stSameBank" disabled>
                                    <el-option v-for="item in sameBankOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实体账号" prop="stBankAccount">
                                <el-input v-model="form.stBankAccount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-row>
                                <el-col :span="8" :offset="1" style="padding-left:1%;">
                                    <el-form-item label="省/直辖市">
                                        <el-select v-model="form.stBankProvince" disabled>
                                            <el-option v-for="item in province" 
                                                :value="item.nodeNodecode" 
                                                :key="item.nodeNodecode"
                                                :label="item.nodeNodename">
                                        </el-option>
                                </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <el-form-item label="市/地区">
                                        <el-select v-model="form.stBankCity" disabled>
                                            <el-option v-for="item in city" 
                                                :value="item.cityAreacode" 
                                                :key="item.cityAreacode"
                                                :label="item.cityAreaname">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <el-form-item label="县/区">
                                        <el-select v-model="form.stBankCountry" disabled>
                                            <el-option v-for="item in country" 
                                                :value="item.cityAreacode" 
                                                :key="item.cityAreacode"
                                                :label="item.cityAreaname">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开户银行" prop="stBankName">
                                <el-input v-model="form.stBankName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <div style="text-align:center;margin:30px 0;">
                <el-button type="primary" @click="bindAccount">绑定实体卡号</el-button>
                <el-button>取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from '@/components/headTop'
import { specifyAccount , bindStAccount } from '@/api/account-open'
import { provinces,bankTypes,cities,countries } from '@/api/publicApi'
export default {
    components: {
        headTop
    },
    data() {
        return {
            form: {
                custno:'',
                vtlAccountName : '',
                citicAccNo:'',
                hostNo:'',

                paSbankCode:'',//总行code
                stBankCode:'', //支行code
                stAccountName: '',
                stSameBank: '',
                stBankAccount: '',
                stBankProvince:'',
                stBankCity: '',
                stBankCountry:'',
                stBankName: '', //支行名称
            },
            sameBankOptions: [
                {
                    label:'他行',
                    value:'1'
                },{
                    label:'本行',
                    value:'2'
                }
            ],
            province: [],
            bank: [],
            city: [],
            country: []
        }
    },
    computed : {
        accountId(){
            return this.$route.params.accountId;
        },
        eid(){
            return this.$route.params.eid;
        },
    },
    methods : {
        async accountInfo(){
            try{
                const resp = await specifyAccount(this.eid,this.accountId);
                const res = await resp.json();
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = res[key];
                });
                this.getCity(res.stBankProvince);
                this.getCountry(res.stBankCountry);
            }catch(e){

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
        async getCity(pvCode){
            try{
                const resp = await cities(pvCode)
                const res = await resp.json();
                this.city = res;
            }catch(e){

            }
        },
        async getCountry(cityCode){
            try{
                const resp = await countries(cityCode)
                const res = await resp.json();
                this.country = res;
            }catch(e){

            }
        },
        async bindAccount(){
            try{
                const resp = await bindStAccount(this.eid,this.accountId);
                const msg = decodeURI(resp.headers.get('x-hpx-alert'));
                this.$message.success(msg);
                this.$router.push('/manager/account-open')
            }catch(e){
                this.$message.error(e);
            }
        }
    },
    created(){
        this.getBank();
        this.getProv();
        this.accountInfo();
    }
}
</script>
<style lang="less" scoped>
.m-account-bind {
    width: 75%;
    margin: 0 auto;
    h3 {
        text-align: center;
        margin-top: 20px;
    }
    .clear {
        margin: 30px 0;
        padding: 0 50px;
        dl {
            float: left;
            width: 50%;
            margin: 10px 0;
            dd {
                float: left;
                width: 100px;
                text-align: right;
            }
            dt {
                padding-left: 120px;
            }
        }
    }
}
</style>
