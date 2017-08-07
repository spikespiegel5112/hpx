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
    import { payDetail} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '付款银行',
                    prop  : 'payerBank',
                    },{
                    label : '付款银行账号',
                    prop  : 'payerBankAccount',
                    minWidth : 130,
                    },{
                    label : '付款开户名',
                    prop  : 'payerAccountName',
                    },{
                    label : '付款方',
                    prop  : 'payer',
                    },{
                    label : '收款银行',
                    prop  : 'payeeBank',
                    },{
                    label : '收款银行账号',
                    prop  : 'payeeBankSccount',
                    minWidth : 130,
                    },{
                    label : '收款开户名',
                    prop  : 'payeeAccountName',
                    },{
                    label : '收款方',
                    prop  : 'payee',
                    },{
                    label : '支付金额',
                    prop  : 'paymentAmount',
                    },{
                    label : '支付日期',
                    prop  : 'paymentDate',
                    formatter : (row,column) => row.paymentDate == null ? "" :moment(row.paymentDate).format('YYYY-MM-DD')
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
            ...mapState(["loginInfo"]),
             paymentId(){
                return this.$route.params.paymentId
            }
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
                    const params = Object.assign({paymentId:this.paymentId},this.pagination);
                    const resp = await payDetail(params);
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
