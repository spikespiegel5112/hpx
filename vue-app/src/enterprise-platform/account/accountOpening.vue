<template>
    <div class='fillcontain'>
        <headTop></headTop>
        <el-row type="flex" justify="center">
            <el-col :span="12" class="common_elcard_header">
                <el-card>
                    <div slot="header">
                        <span style="padding:0 20px;line-height: 36px;">线上开户</span>
                    </div>
                    <el-form :model="formData" :rules="rules" ref="formData" label-width="120px">
                        <el-form-item label="账户类型" prop='platBankType'>
                            <el-select v-model="formData.platBankType" placeholder="请选择" disabled>
                                <el-option v-for='elem in bankTypeList' :key="elem.bankcode" :label='elem.bankname' :value="elem.bankcode"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="银行卡号" prop='stBankAccount'>
                            <el-input v-model.number="formData.stBankAccount"></el-input>
                        </el-form-item>
                        <el-form-item label="账户名称" prop='stBankName'>
                            <el-input v-model="formData.stBankName"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="客户号" prop='hostNo'>-->
                            <!--<el-input v-model.number="formData.hostNo"></el-input>-->
                        <!--</el-form-item>-->


                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="开户地址" prop='stBankProvince'>
                                    <el-select v-model="formData.stBankProvince" placeholder="请选择" @change="selectProvince">
                                        <el-option v-for='elem in stBankProvinceList' :key="elem.nodeNodecode" :label='elem.nodeNodename' :value="elem.nodeNodecode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="市" prop='stBankCity'>
                                    <el-select v-model="formData.stBankCity" placeholder="请选择" @change="selectCity">
                                        <el-option v-for='elem in stBankCityList' :key="elem.cityAreacode" :label='elem.cityAreaname' :value="elem.cityAreacode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="区县" prop='stBankCountry'>
                                    <el-select v-model="formData.stBankCountry" placeholder="请选择" @change="selectCountry">
                                        <el-option v-for='elem in stBankCountryList' :key="elem.cityAreacode" :label='elem.cityAreaname' :value="elem.cityAreacode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="开户银行" prop='stBankName'>
                            <el-select v-model="formData.stBankName" placeholder="请选择">
                                <el-option v-for='elem in stBankList' :key="elem.code" :label='elem.bankname' :value="elem.bankclscode"></el-option>
                            </el-select>
                        </el-form-item>


                        <el-row type="flex">
                            <el-col :span="21">
                                <el-form-item label="短信验证码" prop='code' :span="10">
                                    <el-input v-model="formData.code" :span="8"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" class="row-bg" justify="end">
                                <el-button type="primary" @click='sendSmsCode' :span="2">发送验证码</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row type="flex" justify="center">
                        <el-col :span='1'>
                            <el-button type="primary" @click='openAccountSubmit'>提交</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script type="text/javascript">
    import {
        getDictionaryByCodeRequest
    } from '@/api/dictionaryApi'
    import {
        bankTypeListRequest,
        getKaptchaImageRequest
    } from '@/api/publicApi'
    import {
        accountInfosListRequest,
        accountStatementListRequest,
        enterpriseAccountOpenRequest,
        openAccSendSmsRequest
    } from '@/api/enterpriseApi'
    import {
        provinces,
        bankTypes,
        cities,
        countries,
        bankdes,
    } from '@/api/publicApi';
    import headTop from '@/components/headTop'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                stBankProvinceList: [],
                stBankCityList: [],
                stBankCountryList: [],
                stBankList: [],
                formData: {
                    eid: this.$store.state.loginInfo.enterpriseId,
                    code: '',
                    platBankType: '',
                    stBankAccount: '',
                    stBankName: '',
                    phone: this.$store.state.loginInfo.phone,
                    stBankProvince: '',
                    stBankCity: '',
                    stBankCountry: '',
                },
                rules: {
                    platBankType: [{
                        required: true,
                        message: '请选择账户类型',
                        trigger: 'change'
                    }],
                    stBankAccount: [{
                        type: 'number',
                        message: '账户卡号必须为数字值'
                    }, {
                        required: true,
                        message: '请输入账户卡号'
                    }],
                    stBankName: [{
                        required: true,
                        message: '请输入账户名称'
                    }],
                    hostNo: [{
                        type: 'number',
                        message: '客户号必须为数字值'
                    }],
                    code: [{
                        required: true,
                        message: '请输入短信验证码'
                    }],
                    stBankProvince: [{
                        required: true,
                        message: '请选择开户行省份',
                        'label-width': '50px'
                    }],
                    stBankCity: [{
                        required: true,
                        message: '请选择开户行城市',
                        'label-width': '50px'
                    }],
                    stBankCountry: [{
                        required: true,
                        message: '请选择开户行区县',
                        'label-width': '50px'
                    }],
                    stBankName: [{
                        required: true,
                        message: '请选择开户行'
                    }],
                },
                bankTypeList: [],
                kaptchaImagePath: `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime(),
            }
        },
        mounted() {
            this.getBankList();
            this.getProvince();
        },
        methods: {
            getBankList() {
                let options = {
                    code: 'BANK_TYPE'
                }
                bankTypes().then(response=>{
                    response.json().then(result=>{
                        console.log(result);
                        this.bankTypeList = result;
                        this.formData.platBankType='302'
                    })
                })
            },
            openAccountSubmit() {
                let options = {
                    eid: this.$store.state.loginInfo.enterpriseId,
                    code: this.formData.code,
                    body: {
                        platBankType: this.formData.platBankType,
                        stBankAccount: this.formData.stBankAccount,
                        stBankName: this.formData.stBankName,
                        hostNo: this.formData.hostNo,
                        phone: this.$store.state.loginInfo.phone
                    }
                }
                this.$refs['formData'].validate(valid => {
                    if (valid) {
                        enterpriseAccountOpenRequest(options).then(response => {
                            response.json().then(result => {
                                console.log(result)

                            })
                        })
                    }
                })
            },
            sendSmsCode() {
                openAccSendSmsRequest().then(response => {
                    console.log(response)
                })
            },
            refresh() {
                this.kaptchaImagePath = `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime()
            },
            selectProvince(){
                this.formData.stBankCity='';
                this.getCity();
            },
            selectCity(){
                this.formData.stBankCountry='';
                this.getCountry();
            },
            selectCountry(){
                this.formData.stBankName='';
                this.getBank();
            },
            getProvince() {
                provinces().then(response => {
                    response.json().then(result => {
                        console.log(result)
                        this.stBankProvinceList = result;
                    })
                })
            },
            getCity() {
                let options={
                    code:this.formData.stBankProvince
                }
                cities(options.code).then(response => {
                    response.json().then(result => {
                        console.log(result)
                        this.stBankCityList = result;
                    })
                })
            },
            getCountry() {
                let options={
                    code:this.formData.stBankCity
                }
                countries(options.code).then(response => {
                    response.json().then(result => {
                        console.log(result)
                        this.stBankCountryList = result;
                    })
                })
            },
            getBank(){
                let options={
                    code:this.formData.stBankCity.substring(0,4),
                    bankclscode:this.formData.platBankType.substring(0,3)
                }
                console.log(options)
//                const bankclscode = this.bankInfoForm.bankCode.substring(0,3),citycode = this.bankInfoForm.bankCity.substring(0,4)


                bankdes(options.bankclscode, options.code).then(response => {
                    response.json().then(result => {
                        console.log(result)
                        this.stBankList = result;
                    })
                })
            },
            aaa(value){
                alert(value)
            }
        }
    }
</script>
<style lang="less">
    @import '../../style/common';
</style>
