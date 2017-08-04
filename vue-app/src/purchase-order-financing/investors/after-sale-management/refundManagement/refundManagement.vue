<template>
    <div class="fillcontain">
        <head-top></head-top>

        <section class="main-table-container">
            <el-table
                row-key="id"
                :empty-text="emptyText"
                :data="tableList"
                v-loading="listLoading"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                    v-for="(value,i) in columns"
                    :key="i"
                    :label="value.label"
                    :prop="value.prop"
                    :width="value.width ? value.width : 'auto'"
                    :formatter="value.formatter"
                    :min-width="value.minWidth ? value.minWidth : 'auto'"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="check(scope.$index, scope.row)" >查看</el-button>
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
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { afterSaleList } from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '退款单号',
                    prop  : 'code',
                    minWidth : 130,
                    },{
                    label : '合同编号',
                    prop  : 'contractCode',
                    minWidth : 130,
                    },{
                    label : '供应商',
                    prop  : 'purchaser',
                    },{
                    label : '退款金额',
                    prop  : 'money',
                    },{
                    label : '申请日期',
                    prop  : 'applicationDate',
                    formatter : (row,column) => row.applicationDate == null ? "" : moment(row.applicationDate).format('YYYY-MM-DD')
                    },{
                    label : '审批状态',
                    prop  : 'approvalStatus',
                    formatter : (row,column) => row.approvalStatus === '0' ? "待审批" : row.approvalStatus === '1' ? "已通过" : "已拒绝"
                    },{
                    label : '退款状态',
                    prop  : 'paymentStatus',
                    formatter : (row,column) => row.paymentStatus === '0' ? "未退款" : "已退款"
                    }
                ],
                //总页数
                total : 0,
                //分页
                pagination : {},
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",
            }
        },
    	components: {
            headTop,
            myPagination,
    	},
        created(){
        },
        mounted(){

        },
        computed : {
            ...mapState(["loginInfo"])
        },
        methods: {
            /*
            ** 分页需改2
            */
            pageChange(data){
                this.pagination = data;
            },
            async getList(){
                /*
                ** 分页需改5
                */
                this.listLoading = true;
                try{
                    const params = Object.assign({receiptsType:'T'},this.pagination);
                    const resp = await afterSaleList(params);
                    const res = await resp.json();
                    const total = resp.headers.get('x-total-count')
                    this.tableList = [...res];
                    this.total = parseInt(total);
                    this.listLoading = false;
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                }catch(e){
                    this.emptyText = "获取数据失败";
                    this.listLoading = false;
                }
            },

            check (index,row){
                this.$router.push({path: this.$route.path + '/zf_refundManagementDetail/' + row.id})
            },
        },
        /*
        ** 分页需改3
        */
        watch : {
            pagination : {
                handler : function(){
                    this.getList();
                },
                deep:true,
            }
        }
    }
</script>

<style lang="less">
    // @import '../../style/mixin';

</style>
