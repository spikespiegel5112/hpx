<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="账户所属银行" prop="platBanktype">
                <el-input v-model="form.platBanktype"></el-input>
            </el-form-item>
            <el-form-item label="账户卡号" prop="citicAccNo">
                <el-input v-model="form.citicAccNo"></el-input>
            </el-form-item>
            <el-form-item label="账户名称" prop="citicAccName">
                <el-input v-model="form.citicAccName"></el-input>
            </el-form-item>
            <el-form-item label="利息标识" prop="citicAutoAssignInterestFlag">
                <el-input v-model="form.citicAutoAssignInterestFlag"></el-input>
            </el-form-item>
            <el-form-item label="利息利率" prop="citicAutoAssignTranFeeFlag">
                <el-input v-model="form.citicAutoAssignTranFeeFlag"></el-input>
            </el-form-item>
            <el-form-item label="利息利率" prop="citicAutoAssignTranFeeFlag">
                <el-input v-model="form.citicAutoAssignTranFeeFlag"></el-input>
            </el-form-item>
            <el-form-item label="是否可透支" prop="citicCalInterestFlag">
                <el-input v-model="form.citicCalInterestFlag"></el-input>
            </el-form-item>
            <el-form-item label="手续费收取方式" prop="citicFeeType">
                <el-input v-model="form.citicFeeType"></el-input>
            </el-form-item>
            <el-form-item label="是否可透支" prop="citicCalInterestFlag">
                <el-input v-model="form.citicCalInterestFlag"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { accountsList } from '@/api/account-open'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                form : {
                    "citicAccName": "",
                    "citicAccNo": "",
                    "citicAutoAssignInterestFlag": "",
                    "citicAutoAssignTranFeeFlag": "",
                    "citicCalInterestFlag": "",
                    "citicFeeType": "",
                    "citicInterestRate": 0,
                    "citicOverAmt": 0,
                    "citicOverFlag": "",
                    "citicOverRate": 0,
                    "citicRealNameParm": "",
                    "citicSubAccPrintParm": "",
                    "paSbankCode": "",
                    "platBankType": "",
                    "remark": "",
                    "stAccountName": "",
                    "stBankAccount": "",
                    "stBankCity": "",
                    "stBankCode": "",
                    "stBankCountry": "",
                    "stBankName": "",
                    "stBankProvince": "",
                    "stSameBank": "",
                    "vtlAccountName": ""
                }
            }
        },
    	components: {
            headTop,
    	},
        created(){
            // this.initData();
        },
        mounted(){

        },
        computed : {
            ...mapState(["loginInfo"])
        },

    }
</script>

<style lang="less">
    @import '../../style/mixin';

</style>

