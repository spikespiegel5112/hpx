<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                    <el-form-item class="order-search-item" prop="name">
                        <el-input v-model="query.name" placeholder="订单名称"></el-input>
                    </el-form-item>
                    <el-form-item class="order-search-item" prop="code">
                        <el-input v-model="query.code" placeholder="订单编号"></el-input>
                    </el-form-item>
                    <el-form-item class="order-search-item" prop="supplier">
                        <el-select v-model="query.supplier" placeholder="供应商">
                            <el-option
                                v-for="item in supplierOptions"
                                :key="item.enterpriseId"
                                :label="item.enterpriseName"
                                :value="item.enterpriseId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="order-search-item" prop="demander">
                        <el-select v-model="query.demander" placeholder="需方">
                            <el-option
                                v-for="item in demanderOptions"
                                :key="item.enterpriseId"
                                :label="item.enterpriseName"
                                :value="item.enterpriseId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button   type="primary" icon="search" @click="search">查询</el-button>
                        <el-button   type="primary" class="reset-b" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        <el-button   type="primary" :disabled="selection.length !== 1" @click="check">查看</el-button>
                        <el-button   type="primary" :disabled="selection.length !== 1" @click="createCp">生成采购合同</el-button>
                        <el-button   type="primary" :disabled="selection.length !== 1" @click="createSc">生成销售合同</el-button>
                        <!-- <el-button   type="primary" :disabled="selection.length !== 1" @click="approve">审批</el-button> -->
                    </el-form-item>
			</el-form>
        </section>

        <section class="main-table-container">
            <el-table
                row-key="id"
                :empty-text="emptyText"
                :data="tableList"
                @selection-change="selectList"
                v-loading="listLoading"
                style="width: 100%">
                <el-table-column
                  type="selection">
                </el-table-column>
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
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button size="small" v-show="scope.row.approvalStatus" @click="approve(scope.$index,scope.row)">审批</el-button>
                        <el-button size="small" v-show="!scope.row.approvalStatus" @click="approve(scope.$index,scope.row)">审批信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
           <!--
            分页需改4
            -->
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>
        <!--编辑界面-->
		<el-dialog title="审批" v-model="editeModalVisible" size="tiny" :close-on-click-modal="false">
			<table class="apply-container">
                <tr v-for="(value,key) in editeData" :key="key">
                    <td class="apply-title" v-if="key === 'name'">需方名称</td>
                    <td class="apply-title" v-if="key === 'account'">需方账号</td>
                    <td class="apply-title" v-if="key === 'annual'">年化利率</td>
                    <td class="apply-title" v-if="key === 'totalMoney'">订单金额</td>
                    <td class="apply-title" v-if="key === 'financRate'">融资比例</td>
                    <td class="apply-title" v-if="key === 'financMoney'">放款金额</td>
                    <td class="apply-title" v-if="key === 'deliveryDeadline'">提货期限</td>
                    <td class="apply-title" v-if="key === 'remainingCredit'">剩余额度</td>
                    <td>{{value}}</td>
                </tr>
            </table>
			<div slot="footer" class="dialog-footer">
				<el-button v-show="approveStatus" @click.native="editeModalVisible = false">取消</el-button>
                <el-button v-show="approveStatus" type="primary" @click.native="editSubmit('N')">拒绝</el-button>
				<el-button v-show="approveStatus" type="primary" @click.native="editSubmit('Y')">通过</el-button>
                <el-button v-show="!approveStatus" type="primary" @click.native="editeModalVisible = false">确定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { ordersList , roleList , approInfo , applyOrder} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '订单名称',
                    prop  : 'name',
                    },{
                    label : '订单编号',
                    prop  : 'code',
                    },{
                    label : '需方',
                    prop  : 'demander',
                    sortable : true,
                    },{
                    label : '供方',
                    prop  : 'supplier',
                    sortable : true,
                    },{
                    label : '订单金额',
                    prop  : 'totalMoney',
                    },{
                    label : '创建时间',
                    prop  : 'createtime',
                    sortable : true,
                    formatter : (row,column) => moment(row.createtime).format('YYYY-MM-DD')
                    },{
                    label : '订单状态',
                    prop  : 'orderStatus',
                    sortable : true,
                    formatter : (row,column) => row.orderStatus === '0' ?  "已确定" : "待确定" 
                    },{
                    label : '审批状态',
                    prop  : 'approvalStatus',
                    sortable : true,
                    formatter : (row,column) => !row.approvalStatus ? "已审批" : "未审批"
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
                    name : '',
                    code : '',
                    supplier : '',
                    demander : ''
                },
                supplierOptions : [],
                demanderOptions : [],
                // checkbox
                selection :[],

                //模态框
                editeModalVisible : false,
                editeData : {
                    account : '',
                    annual : '',
                    deliveryDeadline : '',
                    financMoney : '',
                    financRate : '',
                    name:'',
                    remainingCredit:'',
                    totalMoney:''
                },
                applyOrderId : null,
                approveStatus : true
            }
        },
    	components: {
            headTop,
            myPagination,
    	},
        created(){
            this.demanders();
            this.suppliers();
        },
        activated(){
            this.initData();
        },
        mounted(){

        },
        computed : {
            ...mapState(["loginInfo",'projectId']),
            slectedId(){
                return this.selection[0].id;
            },
            demanderId(){
                return this.selection[0].demanderid;
            }
        },
        methods: {
            pageChange(data){
                this.pagination = data;
            },
            async initData(){
                this.getList();
            },
            async suppliers(){
                const param = {enterpriseRole:'PRO_ENT_TYPE_SUPPLIER',state:'T'};
                const resp = await roleList(this.projectId,param);
                const res = await resp.json();
                this.supplierOptions = JSON.parse(JSON.stringify(res));
            },
            async demanders(){
                const param = {enterpriseRole:'PRO_ENT_TYPE_DEALER',state:'T'};
                const resp = await roleList(this.projectId,param);
                const res = await resp.json();
                this.demanderOptions = JSON.parse(JSON.stringify(res));
            },
            async getList(){
                /*
                ** 分页需改5
                */
                this.listLoading = true;
                try{
                    const params = Object.assign({},this.query,this.pagination);
                    const resp = await ordersList(params);
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
            async search () {
                this.getList();
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            selectList(selection){
                this.selection = selection
            },

            check (){
                this.$router.push({path:`${this.$route.path}/detail/${this.slectedId}/${this.demanderId}`})
            },
            createCp (){
                this.$router.push({path:`${this.$route.path}/createcp/${this.slectedId}/${this.demanderId}`})
            },
            createSc (){
                this.$router.push({path:`${this.$route.path}/createsc/${this.slectedId}/${this.demanderId}`})
            },
            async approve (index,row){
                Object.assign(this.$data.editeData, this.$options.data().editeData)
                try{
                    this.approveStatus = !!row.approveStatus;
                    this.applyOrderId = row.id;
                    const resp = await approInfo(row.id,this.projectId);
                    const res = await resp.json(); 
                    this.editeData = {...res}
                    this.editeModalVisible = true;
                }catch(e){
                    this.$message.error(e)
                }

            },
            async editSubmit(type){
                try{
                    const resp = await applyOrder(this.applyOrderId,type);
                    this.$message.success('操作成功')
                }catch(e){
                    this.$message.error(e)
                }
            }
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

<style lang="less" scoped>
    .order-search-item{
        // width:120px;
    }
    .apply-container{
        width:250px;
        margin:0 auto;
        color:#333333;
        border-width: 1px;
        border-color: #666666;
        border-collapse: collapse;
        td {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #ffffff;
        }
        .apply-title{
            text-align: right;
            width:100px;
        }
    }
</style>
