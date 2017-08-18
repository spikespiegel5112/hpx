<template>
    <el-card class="cer-base-card">
        <div slot="header" class="card-header">
            <span>企业银行账户信息</span>
        </div>
        <div>
            <el-row>
                <el-col v-for="(value,keys) in bankInfoForm" :key="keys + ''" :span="12">
                    <span v-if="keys === 'bankProvince'" class="check-info-label">省份</span>
                    <span v-if="keys === 'bankCity'" class="check-info-label">城市</span>
                    <!-- <span v-if="keys === 'bankCountry'" class="check-info-label">县区</span> -->
                    <!-- <span v-if="keys === 'bankCode'" class="check-info-label">银行</span> -->
                    <span v-if="keys === 'bankName'" class="check-info-label">支行</span>
                    <span v-if="keys === 'accountName'" class="check-info-label">银行账户名</span>
                    <span v-if="keys === 'bankAccount'" class="check-info-label">银行账户号</span>
                    <span v-if="keys === 'remark'" class="check-info-label">备注</span>
                    <div class="cer-text-div">{{value}}</div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script>

import { showAccCountInfo } from '@/api/coreApi'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            bankInfoForm: {
                bankProvince: '',
                bankCity: '',
                // bankCountry: '',
                // bankCode: '',
                bankName: '',
                accountName: '',
                bankAccount: '',
                remark: ''
            },
        }
    },
    activated() {
        this.getAccount();
    },
    computed: {
        eid(){
            return this.$route.params.eid;
        }
    },
    methods: {
        async getAccount() {
            try {
                const resp = await showAccCountInfo(this.eid);
                const res = await resp.json();
                Object.keys(this.bankInfoForm).forEach((key) => {
                    this.bankInfoForm[key] = res[key]
                })
            } catch (e) {
                this.$message.error(e)
            }
        },
    }
}
</script>
<style scoped>

.cer-text-div {
    display: inline-block;
    padding-left: 10px;
    height: 34px;
    line-height: 34px;
    border-bottom: 1px solid #e9e9e9;
    color: #999;
    width:65%;
}
.check-info-label{
    display: inline-block;
    width: 30%;
    text-align: right;
    height: 34px;
    line-height: 34px;
}
</style>