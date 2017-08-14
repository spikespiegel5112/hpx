<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="code">
                            <el-input v-model="query.code" size="large" placeholder="提货单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="approvalStatus">
                            <el-select v-model="query.approvalStatus" size="large" placeholder="状态">
                                <el-option
                                    v-for="item in approvalStatusOptions"
                                    :key="item.approvalStatus"
                                    :label="item.value"
                                    :value="item.approvalStatus">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
			</el-form>
		</el-col>
        </section>


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
                        <el-button type="text" size="small" @click="check(scope.$index, scope.row)" >查看明细</el-button>
                        <br/>
                        <el-button v-show="scope.row.approvalStatus === '1'" type="text" size="small" @click="shipments(scope.$index, scope.row)" >允许发货</el-button>
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
    import { deliveryNoteList,updateDeliveryNote} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '提货单号',
                    prop  : 'code',
                    minWidth : 130,
                    },{
                    label : '订单编号',
                    prop  : 'orderCode',
                    minWidth : 130,
                    },{
                    label : '需方',
                    prop  : 'purchaser',
                    },{
                    label : '提货金额',
                    prop  : 'totalMoney',
                    },{
                    label : '申请提货日期',
                    prop  : 'deliveryDate',
                    formatter : (row,column) => row.deliveryDate == null ? "" :moment(row.deliveryDate).format('YYYY-MM-DD')
                    },{
                    label : '付款日期',
                    prop  : 'paymentDate',
                    formatter : (row,column) => row.paymentDate == null ? "" :moment(row.paymentDate).format('YYYY-MM-DD')
                    },{
                    label : '状态',
                    prop  : 'approvalStatus',
                    formatter : (row,column) => row.approvalStatus === '0' ? "待付款" :
                     row.approvalStatus === '1' ?"待审批" : row.approvalStatus === '2' ?"待发货" : 
                     row.approvalStatus === '3' ?"已发货" : ""
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

                 //search params
                query : {
                    code : '',
                    approvalStatus : ''
                },
                approvalStatusOptions : [
                    {
                        value : '待付款',
                        approvalStatus : '0'
                    },
                    {
                        value : '待审批',
                        approvalStatus : '1'
                    },
                    {
                        value : '待发货',
                        approvalStatus : '2'
                    },
                    {
                        value : '已发货',
                        approvalStatus : '3'
                    }
                ],
               
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
                    const params = Object.assign(this.query,this.pagination);
                    const resp = await deliveryNoteList(params);
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

            //查看明细
            check (index,row){
                 this.$router.push({path: this.$route.path + '/zf_deliveryNoteDetail/' + row.id})
            },

            //允许发货
            async shipments (index,row){
                 try{
                    const resp = await updateDeliveryNote(row.id);
                    if(resp.status==200){
                        this.$message.success('操作成功')
                    }
                   this.getList();
                }catch(e){
                    this.$message.error('操作失败')
                }
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
