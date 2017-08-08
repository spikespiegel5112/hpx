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
                        <el-select v-model="query.supplier" placeholder="需方">
                            <el-option
                                v-for="item in supplierOptions"
                                :key="item.enterpriseId"
                                :label="item.enterpriseName"
                                :value="item.enterpriseId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="order-search-item" prop="demander">
                        <el-select v-model="query.demander" placeholder="资方">
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
                        <el-button size="small" @click="approve(scope.$index,scope.row.id)">审批</el-button>
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
		<el-dialog title="审批" v-model="editeModalVisible" :close-on-click-modal="false">
			<ul>
                <li>

                </li>
            </ul>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editeModalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { ordersList , getDemanderList , getSupplierList , approInfo} from '@/api/orderApi'
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
                    formatter : (row,column) => row.orderStatus === '0' ? "待确定" : "已确定"
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
                activatedOptions : [
                    {
                        value : '激活',
                        activated : 'T'
                    },
                    {
                        value : '未激活',
                        activated : 'F'
                    }
                ],
                auditStateOptions : [
                    {
                        value : '已认证',
                        auditState : 'T'
                    },
                    {
                        value : '未认证',
                        auditState : 'F'
                    }
                ],

                // checkbox
                selection :[],

                //模态框
                editeModalVisible : false,
                editeData : {
                    id : '',
                    name : '',
                    activated : '',
                    address : '',
                    contactsNumber : '',
                    birth:''
                },
                editRules : {
                    name : [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
                }
            }
        },
    	components: {
            headTop,
            myPagination,
    	},
        created(){
            // this.initData();
            this.demanders();
            this.suppliers();
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
                const resp = await getSupplierList(this.projectId);
                const res = await resp.json();
                this.supplierOptions = JSON.parse(JSON.stringify(res));
            },
            async demanders(){
                const resp = await getDemanderList(this.projectId);
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
            async approve (index,id){
                try{
                    const resp = await approInfo(id,this.projectId);
                    const res = await resp.json(); 
                    this.editeModalVisible = true;
                }catch(e){

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

<style lang="less" scoped>
    .order-search-item{
        // width:120px;
    }
</style>
