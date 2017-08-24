<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="goods-list">收货清单</div>

        <section class="main-table-container">
            <el-table
                row-key="id"
                :empty-text="emptyText"
                :data="tableList"
                v-loading="listLoading"
                highlight-current-row
                style="width: 100%"
                border>
                <el-table-column
                  type="index"
                  width="60"
                  label="序号">
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
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
            <el-button style="float: right; margin-top:30px;" type="primary" @click="goBack">返回</el-button>
        </section>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { getMyContractDetail} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '品名',
                    prop  : 'description',
                    },{
                    label : '规格',
                    prop  : 'specification',
                    },{
                    label : '型号',
                    prop  : 'model',
                    },{
                    label : '单价',
                    prop  : 'univalence',
                    width : '60'
                    },{
                    label : '计量单位',
                    prop  : 'unit',
                    },{
                    label : '数量',
                    prop  : 'amount',
                    width : '60'
                    },{
                    label : '总价',
                    prop  : 'total',
                    },{
                    label : '实收数量',
                    prop  : 'receivedAmount',
                    },{
                    label : '差异数量',
                    prop  : 'differenceAmount',
                    },{
                    label : '差异金额',
                    prop  : 'differenceMoney',
                    },{
                    label : '差异类型',
                    prop  : 'differenceType',
                    formatter : (row,column) => row.differenceType === '0' ? "正常" :
                     row.differenceType === '1' ?"少发" : row.differenceType === '2' ?"多发" :""
                    },{
                    label : '差异状态',
                    prop  : 'differenceStatus',
                    formatter : (row,column) => row.differenceStatus === '0' ? "未处理" :
                    row.differenceType === '1' ?"已处理" :""
                    },{
                    label : '备注',
                    prop  : 'remark',
                    }
                ],
                //总页数
                total : 0,
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
        activated(){
            this.tableList = [];
            this.getList();
        },
        computed : {
            ...mapState(["loginInfo"]),
             tContractId(){
                return this.$route.params.tContractId
            }
        },
        methods: {
            pageChange(data){
                this.pagination = data;
            },
            async getList(){
                this.listLoading = true;
                try{
                    const params = Object.assign({tContractId:this.tContractId},this.pagination);
                    const resp = await getMyContractDetail(params);
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
            goBack() {
                history.back();
            },
        },
        watch : {
            pagination : {
                handler : function(){
                    this.getList();
                },
                deep:true,
            },
        }
    }
</script>

<style lang="less">
    // @import '../../style/mixin';
    .goods-list {
        margin: 30px 0 20px 0;
        font-size: 18px;
    }
</style>
