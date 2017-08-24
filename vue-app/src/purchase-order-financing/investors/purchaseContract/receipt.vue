<template>
    <div class="fillcontain">
        <head-top></head-top>
    
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
            <el-button type="primary" :disabled="fDisabled" @click="apply('F')">补发申请</el-button>
            <el-button type="primary" :disabled="fDisabled" @click="apply('T')">退款申请</el-button>
            <el-button type="primary" :disabled="zDisabled" @click="apply('G')">补购申请</el-button>
            <el-button type="primary" :disabled="nDisabled" @click="disHandled">暂不处理</el-button>
            </el-col>
        </section>
    
        <section class="main-table-container">
            <el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                </el-table-column>
                <el-table-column prop="receivedAmount" label="实收数量" align="center">
                    <template scope="scope">
                        <el-input v-if="scope.row.isEdit" v-model="tableList[scope.$index].receivedAmount" size="small"></el-input>
                        <div v-else>{{tableList[scope.$index].receivedAmount}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="differenceAmount" label="差异数量" align="center" >
                </el-table-column>
                <el-table-column prop="differenceMoney" label="差异金额" align="center" >
                </el-table-column>
                <el-table-column prop="differenceType" label="差异类型" align="center" >
                </el-table-column>
                <el-table-column prop="processStatus" label="处理状态" align="center" >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button v-if="scope.row.isEdit" type="text" size="small" @click="save(scope.$index, scope.row)">保存</el-button>
                        <el-button v-else type="text" :disabled="scope.row.isDisabled" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </section>
        <section>
            <div class="receipt-total">
                <div style="float: left;padding-top: 10px; margin-right:20px">实收共计:</div>
                <div style="float: right;text-align: right">
                    <p>{{count}}件</p>
                    <p>&yen; {{money}}</p>
                </div>
                <div class="button">
                    <el-button type="primary" @click="confirmReceipt">确认收货</el-button>
                    <p style="font-size: 12px;font-weight: 400;margin-top:20px;color:red;">只有当少发和多发都处理了才能确认收货</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import headTop from '../../../components/headTop'
import { getReceiptList, saleManager, changeReceivedAmount, noTreatment, confirmReceipt, treatment } from '@/api/orderApi'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            fDisabled: true,
            zDisabled: true,
            nDisabled: true,
            //table columns
            columns: [{
                    label: '品名',
                    prop: 'description',
                }, {
                    label: '规格',
                    prop: 'specification',
                }, {
                    label: '型号',
                    prop: 'model',
                }, {
                    label: '计量单位',
                    prop: 'unit',
                }, {
                    label: '数量',
                    prop: 'amount',
                }, {
                    label: '单价',
                    prop: 'univalence',
                }, {
                    label: '总价',
                    prop: 'total',
                }, 
            ],
            //实收共计
            count: 0,
            money: 0,
            //table
            tableList: [],
            selectProduct: [],
            listLoading: false,
            emptyText: "暂无数据",
        }
    },
    components: {
        headTop,
    },
    activated() {
        this.initData();
    },
    mounted() {

    },
    computed: {
        ...mapState(["loginInfo"])
    },
    methods: {
        async initData() {
            this.getList();
        },
        async getList() {
            this.listLoading = true;
            try {
                const tContractId = this.$route.params.id;
                const resp = await getReceiptList(tContractId);
                const res = await resp.json();
                res.map((v) => {
                    Object.assign(v,{isEdit: false}, {processStatus: v.processStatus === '0' ? '未处理' : v.processStatus === '1' ? '已处理' : '暂不处理'}, {differenceType: v.differenceType === '0' ? '正常' : v.differenceType === '1' ? '少发' : '多发' },{isDisabled: false})
                })
                this.tableList = [...res];
                this.listLoading = false;
                if (!this.tableList.length) {
                    this.emptyText = "暂无数据";
                }
                this.tableList.map((v) => {
                    if(v.differenceStatus === "1") {
                        v.isDisabled = true;
                    } else {
                        v.isDisabled = false;
                    }
                })
            } catch (e) {
                this.emptyText = "获取数据失败";
                this.listLoading = false;
            }
        },

        async save(index, row) {
            this.money = 0;
            this.count = 0;
            if (row.receivedAmount === '') {
                this.$message.error('数据不能为空');
            }
            this.tableList[index].isEdit = false;
            this.tableList[index].differenceAmount = this.tableList[index].receivedAmount - this.tableList[index].amount;
            this.tableList[index].differenceMoney = this.tableList[index].differenceAmount * this.tableList[index].univalence;
            this.tableList[index].differenceType = this.tableList[index].differenceAmount === 0 ? '正常' : this.tableList[index].differenceAmount > 0 ? '多发' : '少发';
            this.money = this.tableList[index].receivedAmount * this.tableList[index].univalence;
            this.count = this.tableList[index].receivedAmount;
            try {
                let params = {receivedAmount: (this.tableList[index].receivedAmount - 0), differenceAmount: this.tableList[index].differenceAmount, differenceMoney: this.tableList[index].differenceMoney, differenceType: this.tableList[index].differenceType === "少发" ? '1' : this.tableList[index].differenceType === "多发" ? '2' : '0' }
                const resp = await changeReceivedAmount(row.id, params);
                const res = await resp.json();
                if(row.differenceAmount < 0) {
                        this.fDisabled = false;
                    } else if (row.differenceAmount > 0) {
                        this.zDisabled = false;
                    } else {
                        this.fDisabled = true;
                        this.zDisabled = true;
                    }
            }catch(e) {

            }
        },
        edit(index, row) {
             this.tableList[index].isEdit = true;
        },
        async search() {
            this.getList();
        },
        // 补发 退款  补购
        async apply(type) {
            var flag = true;
            this.selectProduct.map((v) => {
                if(v.isEdit) {
                    this.$message.error("请编辑实收数量");
                    flag = false;
                }
            })
            if(!flag) {
                return false;
            }
            try{
                const tContractId = this.$route.params.id;
                this.selectProduct.map((v) => {
                    v.differenceType = v.differenceType === '正常' ? '0' : v.differenceType === '少发' ? '1' : '2';
                })
                const res = await saleManager(type, this.selectProduct);
                const resp = await res.json();
                let selectId = [];
                this.selectProduct.forEach((v) => {
                    selectId.push({id: v.id});
                });
                const result = await treatment(selectId);                
                const id = resp.id;
                this.$router.push({ path: this.$route.path + '/apply/' + id + '/' + type});
                // 申请后数据不可编辑
            }catch(e){
                this.$message.error(e);
            }
        },
        handleSelectionChange(val) {
            this.selectProduct = [...val];
            if(this.selectProduct.length > 0) {
                this.nDisabled = false;
                this.selectProduct.map((v) =>{
                    if(v.differenceAmount < 0) {
                        this.fDisabled = false;
                    } else if (v.differenceAmount > 0) {
                        this.zDisabled = false;
                    } else {
                        this.fDisabled = true;
                        this.zDisabled = true;
                    }
                })
            } else {
                this.fDisabled = true;
                this.zDisabled = true;
                this.nDisabled = true;
            }
            this.selectProduct.map((v) => {
                if(v.differenceStatus === '1') {
                    this.fDisabled = true;
                    this.zDisabled = true;
                    this.nDisabled = true;
                }
            })
        },
        async disHandled() {
            try{
                let idList = [];
                this.selectProduct.map((v) => {
                    idList.push({id: v.id});
                })
                 const resp = await noTreatment(idList);
            } catch(e) {
                this.$message.error(e);
            }
            
        },
        async confirmReceipt() {
            try{
                const id = this.$route.params.id;
                this.tableList.map((v) =>{
                    if(v.differenceStatus === "0") {
                        this.$message.error('只有当少发和多发都处理了或者暂不处理才能确认收货');
                        return;
                    }
                })
                const resp = await confirmReceipt(id);
                 this.$message({
                    message: '确认收货成功',
                    type: 'success'
                });
                this.$router.push('/purchaseContract')
            }catch(e){
                this.$message.error(e);
            }
           
        },
    },
}
</script>

<style lang="less">
@import '../../../style/mixin';
.receipt-total {
    margin-right: 30px;
    margin-top: 50px;
    float: right;
    font-size: 20px;
    font-weight: 700;
    height: 200px;
    position: relative;
}

.button {
    position: absolute;
    bottom: 0px;
    right: 20px;
}
</style>
