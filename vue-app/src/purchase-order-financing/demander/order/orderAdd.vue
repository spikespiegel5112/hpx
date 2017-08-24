<template>
    <div class="zf-create-sc">
        <head-top></head-top>
        <el-form :inline="true" :model="query" :rules="addRules" label-suffix=" : " ref="query" label-width="80px" class="createsc-form">
            <el-form-item prop="name" label="订单名称">
                <el-input v-model="query.name" placeholder="订单名称"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="供应商">
                <el-select v-model="query.supplier" placeholder="供应商">
                    <el-option v-for="item in firstPartyOptions" :key="item.enterpriseId" :label="item.enterpriseName" :value="item.enterpriseId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click="showGoodsModal">选取货品</el-button>
            <div>
                <el-table row-key="id" :data="selectedTableList" style="width: 100%">
                    <el-table-column type="index">
                    </el-table-column>
                    <el-table-column v-for="(value,i) in selectedColumns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                        <template scope="scope">
                            <div v-if="value.prop === 'amount'">
                                <el-input-number v-model="selectedTableList[scope.$index].amount" size="small" :controls="false" style="width:100%;"></el-input-number>
                            </div>
                            <div v-else-if="value.prop === 'total'">{{scope.row.amount * scope.row.univalence}}</div>
                            <div v-else-if="value.prop === 'remark'">
                                <el-input type="textarea" v-model="selectedTableList[scope.$index].remark"></el-input>
                            </div>
                            <div v-else>{{scope.row[value.prop]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="remove(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="order-total">
                    <p>
                        <span>共计数量:</span>
                        <span>{{this.total.totalNum}}件</span>
                    </p>
                    <p>
                        <span>共计金额:</span>
                        <span>￥{{this.total.totalAmount}}</span>
                    </p>
                </div>
                <div class="order-action-down">
                    <el-button type="primary" @click="save">下单</el-button>
                </div>
            </div>
        </el-form>
        <el-dialog title="选取货品" v-model="goodsSelect" :close-on-click-modal="false">
            <div>
                <el-table :empty-text="emptyText" :data="tableList" v-loading="listLoading" @selection-change="selelectGoods">
                    <el-table-column type="selection" width="50">
                    </el-table-column>
                    <el-table-column v-for="(value,i) in columns" :key="value.id" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="goodsSelect = false">取消</el-button>
                <el-button type="primary" :disabled="!selectedGoods.length" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import { roleList, eidAddress, AddContract, productList, addOrder } from '@/api/orderApi'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isEdite: false,

            query: {
                name: '',
                supplier: '',
            },
            firstPartyOptions: [],
            addRules: {
                name: [
                    { required: true, message: '请输入订单名称', trigger: 'blur' },
                ],
                supplier: [
                    { required: true, message: '请选择供应商', trigger: 'change' },
                ]
            },


            // 已选货品列表
            selectedColumns: [{
                label: '品名',
                prop: 'description',
            }, {
                label: '规格',
                prop: 'specification',
            }, {
                label: '型号',
                prop: 'model',
            }, {
                label: '单位',
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
            }, {
                label: '备注',
                prop: 'remark',
                minWidth: 200
            }
            ],
            selectedTableList: [],

            // 获取货品列表
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
                label: '单位',
                prop: 'unit',
            }, {
                label: '单价',
                prop: 'univalence',
            }, {
                label: '备注',
                prop: 'remark',
            }
            ],
            tableList: [],
            listLoading: false,
            emptyText: "暂无数据",
            selectedGoods: [],
            // modal
            goodsSelect: false,
        }
    },
    components: {
        headTop,
    },
    created() {
        this.investors();
    },
    computed: {
        ...mapState(['projectId']),
        orderId() {
            return this.$route.params.orderId;
        },
        total() {
            let totalNum = 0, totalAmount = 0;
            this.selectedTableList.forEach(
                (value) => {
                    totalNum += value.amount;
                    totalAmount += value.amount * value.univalence;
                }
            );
            return {
                totalNum,
                totalAmount
            }
        },
    },
    methods: {
        async investors() {
            const param = { enterpriseRole: 'PRO_ENT_TYPE_INVESTOR', state: 'T' };
            const resp = await roleList(this.projectId, param);
            const res = await resp.json();
            this.firstPartyOptions = JSON.parse(JSON.stringify(res));
        },
        remove(index) {
            this.selectedTableList.splice(index, 1);
        },
        save() {
            this.$refs['query'].validate(async (valid) => {
                if (valid) {
                    (async () => {
                        let isHasZero = false;
                        this.selectedTableList.forEach(
                            (value) => {
                                if (value.amount === 0) {
                                    isHasZero = true;
                                }
                            }
                        );
                        if (isHasZero) {
                            this.$message.warning('货品数量不能为0');
                            return;
                        };
                        try {
                            const params = Object.assign({},this.query,{salesOrderDetailList : this.selectedTableList})
                            const resp = await addOrder(params);
                            const res = await resp.json();
                            this.$message.success('新增成功')
                        } catch (e) {

                        }
                    })()
                }
            })
        },
        selelectGoods(selection) {
            this.selectedGoods = selection;
        },
        async showGoodsModal() {
            if (!this.query.supplier) {
                this.$confirm('请先选取供应商,尊敬的客户', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then().catch();
                return;
            };
            this.goodsSelect = true;
            try {
                const params = {
                    orgId: this.query.supplier,
                    page: 1,
                    size: 10000
                }
                const resp = await productList(params);
                const res = await resp.json();
                this.tableList = res;
                this.listLoading = false;
            } catch (e) {
                this.emptyText = '获取数据失败'
            }
        },
        editSubmit() {
            this.selectedGoods.forEach(
                (value, key) => {
                    this.selectedTableList.push({ ...value, amount: 0, total: 0 })
                }
            )
            this.goodsSelect = false;
        }
    },
    watch: {
        goodsSelect: async function (oldV, newV) {
            if (!newV) {
                this.tableList = [];
            }
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

.order-total {
    text-align: right;
    margin: 10px 0;
    p {
        display: inline-block;
        margin: 10px 0;
        padding: 0 20px;
        span {
            color: #666666; // display: inline-block;
        }
    }
}

.order-action-down {
    text-align: right;
}
</style>
