<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="code">
                            <el-input v-model="query.code" size="large" placeholder="补购单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="contractCode">
                            <el-input v-model="query.contractCode" size="large" placeholder="合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="capital">
                            <el-select v-model="query.capital" size="large" placeholder="选择资方">
                                <el-option v-for="item in capitalList" :key="item.value" :label="item.value" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="approvalStatus">
                            <el-select v-model="query.approvalStatus" size="large" placeholder="审批状态">
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
                        <el-button type="text" size="small" @click="check(scope.$index, scope.row)" >查看</el-button>
                        <br/>
                        <el-button v-show="scope.row.approvalStatus === '0'" type="text" size="small" @click="pass(scope.$index, scope.row)" >通过</el-button>
                        <el-button v-show="scope.row.approvalStatus === '0'" type="text" size="small" @click="refuse(scope.$index, scope.row)" >拒绝</el-button>
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
    import { afterSaleList ,afterSaleDetail,roleList ,refundApproval,saveAfterSalePendingPayment} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '补购单号',
                    prop  : 'code',
                    minWidth : 130,
                    },{
                    label : '合同编号',
                    prop  : 'contractCode',
                    minWidth : 130,
                    },{
                    label : '资方',
                    prop  : 'capital',
                    },{
                    label : '审批状态',
                    prop  : 'approvalStatus',
                    formatter : (row,column) => row.approvalStatus === '0' ? "待审批" : 
                    row.approvalStatus === '1' ? "已通过" : row.approvalStatus === '2' ?"已拒绝" : ""
                    },{
                    label : '补购日期',
                    prop  : 'applicationDate',
                    formatter : (row,column) => row.applicationDate == null ? "" :moment(row.applicationDate).format('YYYY-MM-DD')
                    },{
                    label : '补购金额',
                    prop  : 'money',
                    },{
                    label : '退款状态',
                    prop  : 'paymentStatus',
                    formatter : (row,column) => row.paymentStatus === '0' ? "待支付" :
                     row.paymentStatus === '1' ?"已支付" : ""
                    }
                ],
                //总页数
                total : 0,
                //分页
                pagination : {},
                //table
                tableList: [],
                capitalList: [],
                listLoading:false,
                emptyText:"暂无数据",

                 //search params
                query : {
                    code : '',
                    contractCode : '',
                    capital : '',
                    approvalStatus : '0',
                },
                approvalStatusOptions : [
                    {
                        value : '待审批',
                        approvalStatus : '0'
                    },
                    {
                        value : '已通过',
                        approvalStatus : '1'
                    },
                    {
                        value : '已拒绝',
                        approvalStatus : '2'
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
            ...mapState(["loginInfo","projectId"])
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
                    const params = Object.assign({receiptsType:'G'},this.query,this.pagination);
                    const resp = await afterSaleList(params);
                    const res = await resp.json();

                    const param = Object.assign({enterpriseRole:'PRO_ENT_TYPE_INVESTOR',state:'T'});
                    const result = await roleList(this.projectId,param);
                    const resu = await result.json();
                    console.log("资方", resu)
                    let temp = [];
                    resu.forEach((v) =>{
                        temp.push({label: v.enterpriseName, value: v.enterpriseName });
                    })
                    this.capitalList = temp;

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

            //查看
            check (index,row){
                this.$router.push({path: this.$route.path + '/detail/' + row.id})
            },

            //通过
            async pass(index,row){
                try{
                    const resp = await refundApproval(row.id,'Y');
                        //查看售后明细
                    const detail = Object.assign({tAfterSaleId:row.id});
                    const details = await afterSaleDetail(detail);
                    const res = await details.json();
                    const dl = [...res];
                    const params = Object.assign({},row,{afterSaleDetaillist:dl});
                    //调用生成待收款接口
                    const temp = await saveAfterSalePendingPayment('2',params);
                    
                    this.getList();
                    this.$message.success('操作成功');
                }catch(e){
                    this.$message.error('操作失败')
                }
            },
            //拒绝
            async refuse(index,row){
                try{
                    const resp = await refundApproval(row.id,'N');
                    this.getList();
                    this.$message.success('操作成功')
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
