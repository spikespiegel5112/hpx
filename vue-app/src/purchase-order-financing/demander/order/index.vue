<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
            <el-form :inline="true" :model="query" ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="code">
                            <el-input v-model="query.code" size="large" placeholder="订单编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="订单名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="supplierId">
                            <el-select v-model="query.supplierId" size="large" placeholder="选择资方">
                                <el-option v-for="item in capitalList" :key="item.value" :label="item.value" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"  @click="addOrder">新增订单</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </section>

        <section class="main-table-container">
            <el-table  row-key="id" max-height="250" border :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
                <el-table-column 
                    v-for="(value,i) in columns" 
                    :key="i" 
                    :label="value.label" 
                    :prop="value.prop" 
                    :sortable="value.sortable" 
                    :width="value.width ? value.width : 'auto'" 
                    :formatter="value.formatter" 
                    :min-width="value.minWidth ? value.minWidth : 'auto'">
                </el-table-column>
                <el-table-column label="操作">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="orderDetail(scope.$index, scope.row)" >查看明细</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <!--
                    分页需改4
                    -->
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>
    </div>
</template>

<script>
import headTop from '../../../components/headTop'
import myPagination from '../../../components/myPagination'
import { ordersDemanderList, roleList} from '@/api/orderApi'
import { mapState } from 'vuex'
import moment from 'moment'
export default { 
    data() {
        return {
            //table columns
            columns: [{
                    label: '订单编号',
                    prop: 'code',
                }, {
                    label: '订单名称',
                    prop: 'name',
                }, {
                    label: '订单类型',
                    prop: 'orderType',
                    formatter : (row,column) => row.orderType === '0' ? "长单" :
                    row.orderType === '1' ?"短单" :""
                },{
                    label: '资方',
                    prop: 'supplier',
                }, {
                    label: '订单总金额',
                    prop: 'totalMoney',
                }, {
                    label: '订单状态',
                    prop: 'orderStatus',
                    formatter : (row,column) => row.orderStatus === '0' ? "待确认" :
                    row.orderStatus === '1' ?"已确认" :""
                },{
                    label: '创建时间',
                    prop: 'createTime',
                    formatter: (row, column) => moment(column.createTime).format('YYYY-MM-DD')
                }
            ],
            //总页数
            total: 0,
            //分页
            /*
            ** 分页需改1
            */
            pagination: {},

            excelList: [],
            //table
            tableList: [],
            capitalList: [],
            selectContractList: [],
            listLoading: false,
            emptyText: "暂无数据",

            //search params
            query: {
                code: '',
                name: '',
                supplierId: '',
            },
        }
    },
    components: {
        headTop,
        myPagination,
    },
    created() {
        // this.initData();
    },
    mounted() {

    },
    computed: {
        ...mapState(["loginInfo","projectId"]),
    },
    methods: {
        /*
        ** 分页需改2
        */
        pageChange(data) {
            this.pagination = data;
        },
        async getList() {
            /*
            ** 分页需改5
            */
            this.listLoading = true;
            try {
                const params = Object.assign({}, this.query, this.pagination);
                const resp = await ordersDemanderList(params);
                const res = await resp.json();
                
                const param = Object.assign({enterpriseRole:'PRO_ENT_TYPE_INVESTOR',state:'T'});
                const result = await roleList(this.projectId,param);
                const resu = await result.json();
                let temp = [];
                resu.forEach((v) =>{
                    temp.push({label: v.enterpriseName, value: v.enterpriseName });
                })
                this.capitalList = temp;

                const total = resp.headers.get('x-total-count')
                this.tableList = [...res];
                this.total = parseInt(total);
                this.listLoading = false;
                if (!this.tableList.length) {
                    this.emptyText = "暂无数据";
                }
            } catch (e) {
                this.emptyText = "获取数据失败";
                this.listLoading = false;
            }
        },

        //新增订单
        addOrder(){

        },

        //查看明细
        orderDetail(index,row){
             this.$router.push({ path: this.$route.path + '/xf_orderDetail/' + row.id})
        },

        async search () {
                this.getList();
        },

        resetForm(formName) {
             this.$refs[formName].resetFields();
        },
    },
    /*
    ** 分页需改3
    */
    watch: {
        pagination: {
            handler: function () {
                this.getList();
            },
            deep: true,
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../style/mixin';
.el-table .cell, .el-table th>div {
    padding: 0 10px;
}
</style>
