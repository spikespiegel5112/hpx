<template>
    <div class="zf-create-sc">
        <head-top></head-top>
        <el-form :inline="true" :model="query" label-suffix=" : " ref="query" label-width="80px" class="createsc-form" :submit="test">
            <h4>合同信息</h4>
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="name" label="合同名称">
                        <el-input v-model="query.name" placeholder="合同名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="name" label="需方">
                        <el-select v-model="query.firstParty" placeholder="需方" @change="addressies">
                            <el-option v-for="item in firstPartyOptions" :key="item.enterpriseId" :label="item.enterpriseName" :value="item.enterpriseId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="contractDate" label="签订日期">
                        <el-date-picker v-model="query.contractDate" placeholder="签订日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="fUser" label="联系人">
                        <el-input v-model="query.fUser" placeholder="联系人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="deliveryAddress" label="送货地址">
                        <el-input v-model="query.deliveryAddress" placeholder="送货地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="deliveryDate" label="送货日期">
                        <el-date-picker v-model="query.deliveryDate" placeholder="送货日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="fPhone" label="联系手机">
                        <el-input v-model="query.fPhone" placeholder="联系手机"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="acceptanceLevel" label="验收标注">
                        <el-input v-model="query.acceptanceLevel" placeholder="验收标注"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div>
                <h4>订单详情</h4>
                <order-list :orderId="orderId"></order-list>
            </div>
            <el-button type="primary" native-type="submit" @click="dealSubmit">生成采购合同</el-button>
        </el-form>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import orderList from './orderList';
import { roleList, eidAddress , AddContract} from '@/api/orderApi'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isEdite: false,

            query: {
                name: '',
                firstParty: '',
                contractDate: '',
                deliveryDate: '',
                deliveryAddress: '',
                acceptanceLevel: '',
                fUser: '',
                fPhone: ''
            },
            firstPartyOptions: [],
            addressOptions:[]
        }
    },
    components: {
        headTop,
        orderList
    },
    created() {
        this.suppliers();
    },
    computed: {
        ...mapState(['projectId']),
        orderId() {
            return this.$route.params.orderId;
        },
    },
    methods: {
        test() {
            this.isEdite = !this.isEdite;
        },
        async suppliers(){
            const param = {enterpriseRole:'PRO_ENT_TYPE_DEALER',state:'T'};
            const resp = await roleList(this.projectId,param);
            const res = await resp.json();
            this.firstPartyOptions = JSON.parse(JSON.stringify(res));
        },
        async addressies(e) {
            const params = { orgId: e };
            const resp = await eidAddress(params);
            const res = await resp.json();
            this.addressOptions = JSON.parse(JSON.stringify(res));
        },
        dealSubmit(){
            this.$refs['query'].validate(async (valid) => {
                if(valid){
                    (async () => {
                        try{
                            let query = JSON.parse(JSON.stringify(this.query));
                            query.contractDate = query.contractDate ? moment(query.contractDate).format('YYYY-MM-DD') : '';
                            query.contractDate = query.deliveryDate ? moment(query.deliveryDate).format('YYYY-MM-DD') : '';
                            const params = Object.assign({},query,{contractType:'S'},{contractDetail : this.detail})
                            
                            const resp = await AddContract(this.orderId,params);
                        }catch(e){

                        }
                    })()
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.zf-create-sc {
    h4 {
        margin: 20px 0;
    }
}

.createsc-form {
    margin: 20px 0;
}
</style>
