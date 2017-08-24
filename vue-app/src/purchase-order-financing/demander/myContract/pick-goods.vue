<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-form :inline="true" class="goods-form">
            <el-form-item label="提货单号：">
                <span>{{titleObj.code}}</span>
            </el-form-item><br/>
            <el-form-item label="是否分批提货">
                <el-select v-model="titleObj.batch" @change="handleBatch" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提货批次" >
                <el-input style="width:200px" v-model="titleObj.batchNumber"></el-input>
            </el-form-item>
            <!--<el-form-item>
                <el-checkbox style="font-weight: 700" @change="pickAll" v-model="isPickAll">一次性提完</el-checkbox>
            </el-form-item>-->
            
        </el-form>
        <el-table
            row-key="id"
            :empty-text="emptyText"
            :data="tableList"
            v-loading="listLoading"
            highlight-current-row
            style="width: 100%"
            @selection-change="handleSelectionChange"
            border>
            <!--<el-table-column type="selection"></el-table-column>-->
            <el-table-column
                v-for="(value,i) in columns"
                :key="i"
                :label="value.label"
                :prop="value.prop"
                :sortable="value.sortable"
                :width="value.width ? value.width : 'auto'"
                :formatter="value.formatter"
                :min-width="value.minWidth ? value.minWidth : 'auto'"
                align="center"
            >
            </el-table-column>
             <el-table-column prop="deliveryAmount" label="提货数量" align="center">
                <template scope="scope">
                    <el-input @blur="editAmount(scope.row)" v-model="tableList[scope.$index].deliveryAmount" size="small"></el-input>
                    <!--<div v-else>{{tableList[scope.$index].deliveryAmount}}</div>   v-if="scope.row.isEdit" -->
                </template>
            </el-table-column>
            <el-table-column prop="total" label="总价" align="center" >
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center" >
            </el-table-column>
            <!--<el-table-column label="操作" align="center">
                <template scope="scope">
                    <el-button v-if="scope.row.isEdit" type="text" size="small" @click="save(scope.$index, scope.row)">保存</el-button>
                    <el-button v-else type="text" :disabled="scope.row.isDisabled" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>-->
        </el-table>
        <!--<el-form label-width="100px" >
            <el-form-item label="固定金额：">
                <span>{{calcObj.fixationMoney}}</span>
            </el-form-item>
            <el-form-item label="浮动金额：">
                <span>{{calcObj.floatMoney}}</span>
            </el-form-item>
            <el-form-item label="资金成本：">
                <el-input v-model="calcObj.cost"></el-input>
            </el-form-item>
            <el-form-item label="罚息：">
                <el-input v-model="calcObj.lateCharge"></el-input>
            </el-form-item>
            <el-form-item label="仓储费：">
                <el-input v-model="calcObj.storageCharge"></el-input>
            </el-form-item>
            <el-form-item label="运输费：">
                <el-input @blur="floatChange" v-model="calcObj.transportCharge"></el-input>
            </el-form-item>
            <el-form-item label="保证金抵扣：">
                <span>{{calcObj.depositDeduction}}</span>
            </el-form-item>
            <el-form-item label="总金额：">
                <span>{{calcObj.totalMoney}}</span>
            </el-form-item>
        </el-form>-->
        <ul class="calc-money">
            <li><span>固定金额：</span> {{calcObj.fixationMoney}}</li>
            <li><span>浮动金额：</span> {{calcObj.floatMoney}}</li>
            <li><span>资金成本：</span><el-input size="small" class="calc-input" v-model="calcObj.cost"></el-input></li>
            <li><span>罚息：</span><el-input size="small" class="calc-input" v-model="calcObj.lateCharge"></el-input></li>
            <li><span>仓储费：</span><el-input size="small" class="calc-input" v-model="calcObj.storageCharge"></el-input></li>
            <li><span>运输费：</span><el-input size="small" class="calc-input"  @blur="floatChange" v-model="calcObj.transportCharge"></el-input></li>
            <li><span>保证金抵扣：</span> {{calcObj.depositDeduction}}</li>
            <li><span>总金额：</span> {{calcObj.totalMoney}}</li>
            <li>
                <el-button @click="subPickGoods" style="margin-top: 30px;" type="primary">确定提交</el-button>
                <el-button @click="goBack" style="margin-top: 30px;" type="text">返回上一页</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop'
    import { pickGoodsDetail, subPickGoods } from '@/api/orderApi'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                titleObj: {
                    code: '',
                    batch: '',
                    batchNumber:'',
                },
                tmpNum: '',
                isPickAll: '',
                count: 0,
                money: 0,
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
                        label: '单价',
                        prop: 'univalence',
                    }, {
                        label: '库存数量',
                        prop: 'inventoryAmount',
                    },
                ],
                //table
                tableList: [],
                needPickList: [],
                selectGoods: [],
                listLoading:false,
                emptyText:"暂无数据",
                calcObj:{
                    fixationMoney: 0,
                    floatMoney: 0,
                    cost: '',
                    lateCharge: '',
                    storageCharge: '',
                    transportCharge: '',
                    depositDeduction: 0,
                    totalMoney: 0,
                }
            }
        },
    	components: {
            headTop,
    	},
        activated(){
            this.initData();
        },
        computed : {
            ...mapState(["loginInfo",'test'])
        },
        methods: {
            async initData(){
                this.getList();
            },
            async getList(){
                this.listLoading = true;
                try{
                    const id = this.$route.params.id
                    const resp = await pickGoodsDetail(id);
                    const res = await resp.json();
                    res.deliveryNoteDetailList.map((v) => {
                        Object.assign(v,{isEdit: false});
                    })
                    this.tableList = [...res.deliveryNoteDetailList];
                    this.titleObj.code = res.code;
                    this.calcObj.depositDeduction = res.depositDeduction;
                    this.tmpNum = res.batchNumber;
                    this.listLoading = false;
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                }catch(e){
                    this.emptyText = "获取数据失败";
                    this.listLoading = false;
                }
            },
            handleBatch() {
                if(this.titleObj.batch === '1') {
                    this.titleObj.batchNumber = this.tmpNum;
                } else {
                    this.titleObj.batchNumber = null;
                }                
            },
            pickAll() {
                if(this.isPickAll === true) {
                    this.tableList.forEach((v) => {
                        v.deliveryAmount = v. inventoryAmount;
                    })
                } else {
                    this.tableList.forEach((v) => {
                        v.deliveryAmount = null;
                    })
                }
                console.log("提完22", this.tableList)
            },
            editAmount (row) {
                this.calcObj.fixationMoney = 0;
                if(row.deliveryAmount > row.inventoryAmount) {
                    row.deliveryAmount = row.inventoryAmount;
                    this.$message({
                        message: '提货数量不能大于库存数量',
                        type: 'warning'
                    })
                }
                row.total = row.deliveryAmount * row.univalence;
                this.tableList.forEach((v) => {
                     this.calcObj.fixationMoney += v.total;
                })
               
            },
            floatChange() {
                this.calcObj.floatMoney = (this.calcObj.cost - 0) + (this.calcObj.lateCharge - 0) + (this.calcObj.storageCharge - 0) + (this.calcObj.transportCharge - 0);
                this.calcObj.totalMoney = (this.calcObj.fixationMoney - 0) + (this.calcObj.floatMoney - 0) + (this.calcObj.depositDeduction - 0);
            },
            handleSelectionChange(val) {
                this.selectGoods = val;
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
            subApply() {
                history.back();
            },
            async subPickGoods() {
                if(this.calcObj.cost === '' || this.calcObj.lateCharge === '' || this.calcObj.storageCharge === '' || this.calcObj.transportCharge === '' ){
                    this.$message.error('请完善信息');   
                    return;                 
                };
                this.tableList.forEach((v) => {
                    if(v.deliveryAmount != null) {
                        this.needPickList.push(v);
                    }
                })
                if(this.needPickList.length === 0) {
                    this.$message.error('至少输入一种商品的提货数量');
                    return;
                }
                const params = Object.assign({}, this.titleObj, this.needPickList, this.calcObj);

                console.log("提交提货", params)
                try{
                    const resp = await subPickGoods(params);
                    console.log("提货状态", resp.status)
                    this.$message({
                        message: '提货成功',
                        type: 'success'
                    })
                    history.back();
                }catch(e){
                    this.$message.error(e);
                };                
            },
            goBack(){
                history.back();
            }
        },
    }
</script>

<style lang="less">
@import '../../../style/mixin';
.goods-number {
    margin: 30px 0 20px 0;
    font-size: 18px;

}

.goods-form .el-form-item__label {
    font-size: 16px;
    font-weight: 700;
    color: #000;
}
.goods-form span {
    font-size: 16px;
}
.calc-money {
    float: right;
    margin-top: 50px;
    margin-right: 50px;
    font-size: 16px;
    font-weight: 700;
}

.calc-money span {
    display: inline-block;
    width: 96px;
}

.calc-money li {
    line-height: 38px;
}

.calc-input {
    width: 100px !important;
}
</style>
