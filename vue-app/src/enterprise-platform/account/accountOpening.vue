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
                            <el-select v-model="formData.platBankType" placeholder="请选择">
                                <el-option v-for='elem in bankTypeList' :key="elem.code" :label='elem.name'
                                           :value="elem.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开户地址" prop='citicAccNo'>
                            <el-input v-model.number="formData.citicAccNo"></el-input>
                        </el-form-item>
                        <el-form-item label="账户名称" prop='citicAccName'>
                            <el-input v-model="formData.citicAccName"></el-input>
                        </el-form-item>
                        <el-form-item label="客户号" prop='hostNo'>
                            <el-input v-model.number="formData.hostNo"></el-input>
                        </el-form-item>


                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="开户地址" prop='st_bank_province'>
                                    <el-select v-model="formData.st_bank_province" placeholder="请选择" @change="selectProvince">
                                        <el-option v-for='elem in st_bank_provinceList' :key="elem.nodeNodecode" :label='elem.nodeNodename' :value="elem.nodeNodecode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="市" prop='st_bank_country'>
                                    <el-select v-model="formData.st_bank_city" placeholder="请选择" @change="selectCity">
                                        <el-option v-for='elem in st_bank_cityList' :key="elem.cityAreacode" :label='elem.cityAreaname' :value="elem.cityAreacode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="区县" prop='st_bank_city'>
                                    <el-select v-model="formData.st_bank_country" placeholder="请选择">
                                        <el-option v-for='elem in st_bank_countryList' :key="elem.cityAreacode" :label='elem.cityAreaname' :value="elem.cityAreacode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        <el-form-item label="开户银行" prop='platBankType'>
                            <el-select v-model="formData.platBankType" placeholder="请选择">
                                <el-option v-for='elem in bankTypeList' :key="elem.code" :label='elem.name'
                                           :value="elem.code"></el-option>
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
                st_bank_provinceList: [],
                st_bank_cityList: [],
                st_bank_countryList: [],
                formData: {
                    eid: this.$store.state.loginInfo.enterpriseId,
                    code: '',
                    platBankType: '',
                    citicAccNo: '',
                    citicAccName: '',
                    hostNo: null,
                    phone: this.$store.state.loginInfo.phone,
                    st_bank_province: '',
                    st_bank_city: '',
                    st_bank_country: '',
                    st_bank_country: ''

                },
                rules: {
                    platBankType: [{
                        required: true,
                        message: '请选择账户类型',
                        trigger: 'change'
                    }],
                    citicAccNo: [{
                        type: 'number',
                        message: '账户卡号必须为数字值'
                    }, {
                        required: true,
                        message: '请输入账户卡号'
                    }],
                    citicAccName: [{
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
                    st_bank_province: [{
                        required: true,
                        message: '请输入短信验证码',
                        'label-width': '50px'
                    }],
                    st_bank_city: [{
                        required: true,
                        message: '请输入短信验证码',
                        'label-width': '50px'
                    }],
                    st_bank_country: [{
                        required: true,
                        message: '请输入短信验证码',
                        'label-width': '50px'
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
                getDictionaryByCodeRequest(options).then(response => {
                    response.json().then(result => {
                        console.log(result);
                        this.bankTypeList = result;
                    })
                })
            },
            openAccountSubmit() {
                let options = {
                    eid: this.$store.state.loginInfo.enterpriseId,
                    code: this.formData.code,
                    body: {
                        platBankType: this.formData.platBankType,
                        citicAccNo: this.formData.citicAccNo,
                        citicAccName: this.formData.citicAccName,
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
                this.getCity();
            },
            selectCity(){
                this.getCountry();
            },
            getProvince() {
                provinces().then(response => {
                    response.json().then(result => {
                        console.log(result)
                        this.st_bank_provinceList = result;
                    })
                })
            },
            getCity() {
                let options={
                    code:this.formData.st_bank_province
                }
                cities(options.code).then(response => {
                    response.json().then(result => {
                        console.log(result)
                        this.st_bank_cityList = result;
                    })
                })
            },
            getCountry() {
                let options={
                    code:this.formData.st_bank_city
                }
                countries(options.code).then(response => {
                    response.json().then(result => {
                        console.log(result)
                        alert('dsdss')
                        this.st_bank_countryList = result;
                    })
                })
            },

        }
    }
</script>
<style lang="less">
    @import '../../style/common';
</style>
