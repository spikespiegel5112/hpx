<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="contractCode">
                            <el-input v-model="query.contractCode" size="large" placeholder="合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="contractName">
                            <el-input v-model="query.contractName" size="large" placeholder="合同名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="demander">
                            <el-select v-model="query.demander" size="large" placeholder="选择需方">
                                <el-option v-for="item in demanderList" :key="item.value" :label="item.value" :value="item.value">
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
                        <el-form-item>
                            <el-button type="primary"  @click="addWarning">添加风控预警</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
			</el-form>
		</el-col>
        </section>

        <section class="main-table-container">
            <el-tabs v-model="activeName">
                <el-tab-pane label="当前风险" name="present">
                    <el-table
                            row-key="id"
                            :empty-text="emptyText"
                            :data="tableList"
                            v-loading="listLoading"
                            highlight-current-row
                            style="width: 100%">
                    <el-table-column type="index" width="100">
                    </el-table-column>
                    <el-table-column
                        v-for="(value,i) in columns"
                        :key="i"
                        :label="value.label"
                        :prop="value.prop"
                        :width="value.width ? value.width : 'auto'"
                        :formatter="value.formatter"
                        :min-width="value.minWidth ? value.minWidth : 'auto'">
                    </el-table-column>
                </el-table>

                 <my-Pagination @pageChange="pageChange" :total="total">
                 </my-Pagination>
                </el-tab-pane>

                <el-tab-pane label="已处理风险" name="processed">
                    <el-table
                            row-key="id"
                            :empty-text="emptyTextTwo"
                            :data="tableListTwo"
                            v-loading="listLoadingTwo"
                            highlight-current-row
                            style="width: 100%">
                    <el-table-column type="index" width="100">
                    </el-table-column>
                    <el-table-column
                        v-for="(value,i) in columnsTwo"
                        :key="i"
                        :label="value.label"
                        :prop="value.prop"
                        :width="value.width ? value.width : 'auto'"
                        :formatter="value.formatter"
                        :min-width="value.minWidth ? value.minWidth : 'auto'">
                    </el-table-column>
                </el-table>
                <my-Pagination @pageChangeTwo="pageChangeTwo" :total="totalTwo">
                 </my-Pagination>
                </el-tab-pane>
            </el-tabs>
           
        </section>

        <!--页面弹出框-->
		<el-dialog title="添加风控预警" v-model="MarginModal" :close-on-click-modal="false">
			<el-form :model="margin" label-width="20%" class="tmp" :rules="editRules" ref="margin">
                <el-form-item label="合同编号" prop="contractCode">
					<el-input v-model="margin.contractCode" ></el-input>
				</el-form-item>
                <el-form-item label="合同名称" prop="contractName">
					<el-input v-model="margin.contractName" ></el-input>
				</el-form-item>
                <el-form-item label="需方" prop="demander">
                            <el-select v-model="margin.demander" size="large" placeholder="选择需方">
                                <el-option v-for="item in demanderListTwo" :key="item.value" :label="item.value" :value="item.value">
                                </el-option>
                            </el-select>
                </el-form-item>
                <el-form-item label="库存总金额" prop="inventoryTotalMoney">
					<el-input v-model="margin.inventoryTotalMoney" ></el-input>
				</el-form-item>
				<el-form-item label="当前货值" prop="currentValue">
					<el-input v-model="margin.currentValue" ></el-input>
				</el-form-item>
				<el-form-item label="涨跌幅" prop="priceLimit">
					<el-input v-model="margin.priceLimit" ></el-input>
				</el-form-item>
				<el-form-item label="待补充保证金"  prop="awaitDeposit">
					<el-input v-model="margin.awaitDeposit" ></el-input>
				</el-form-item>
                <el-form-item label="处理截止日期" prop="abortDate">
                    <el-date-picker v-model="margin.abortDate" type="date"  placeholder="选择截止日期"
                        format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="marginSubmit('margin')">确认</el-button>
				<el-button @click.native="MarginModal = false">取消</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import {roleList,warningList,addWarning} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '合同编号',
                    prop  : 'contractCode',
                    },{
                    label : '合同名称',
                    prop  : 'contractName',
                    },{
                    label : '需方',
                    prop  : 'demander',
                    },{
                    label : '库存总金额',
                    prop  : 'inventoryTotalMoney',
                    },{
                    label : '当前货值',
                    prop  : 'currentValue',
                    },{
                    label : '涨跌幅',
                    prop  : 'priceLimit',
                    },{
                    label : '待补充保证金',
                    prop  : 'awaitDeposit',
                    },{
                    label : '处理截止日期',
                    prop  : 'abortDate',
                    formatter : (row,column) => row.abortDate == null ? "" :moment(row.abortDate).format('YYYY-MM-DD')
                    }
                ],
                columnsTwo : [{
                    label : '合同编号',
                    prop  : 'contractCode',
                    },{
                    label : '合同名称',
                    prop  : 'contractName',
                    },{
                    label : '需方',
                    prop  : 'demander',
                    },{
                    label : '库存总金额',
                    prop  : 'inventoryTotalMoney',
                    },{
                    label : '当前货值',
                    prop  : 'currentValue',
                    },{
                    label : '涨跌幅',
                    prop  : 'priceLimit',
                    },{
                    label : '补充保证金金额',
                    prop  : 'supplementDeposit',
                    },{
                    label : '处理日期',
                    prop  : 'disposeDate',
                    formatter : (row,column) => row.disposeDate == null ? "" :moment(row.disposeDate).format('YYYY-MM-DD')
                    }
                ],
                //总页数
                total : 0,
                totalTwo : 0,
                //分页
                pagination : {},
                paginationTwo : {},
                //table
                tableList: [],
                demanderList : [],
                demanderListTwo : [],
                listLoading:false,
                emptyText:"暂无数据",
                tableListTwo: [],
                listLoadingTwo:false,
                emptyTextTwo:"暂无数据",
                activeName: 'present',

                //模态框
                MarginModal : false,
                margin : {
                        id : '',
                        contractCode : '',
                        contractName : '',
                        demander : '',
                        inventoryTotalMoney : '',
                        currentValue : '',
                        priceLimit : '',
                        awaitDeposit : '',
                        abortDate : ''
                },

                //search params
                query : {
                    contractCode : '',
                    contractName : '',
                    demander : ''
                },
               
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
            pageChangeTwo(data){
                this.paginationTwo = data;
            },
            async getList(){
                /*
                ** 分页需改5
                */
                this.listLoading = true;
                this.listLoadingTwo = true;
                try{

                    const param = Object.assign({enterpriseRole:'PRO_ENT_TYPE_PLATFORM',state:'T'});
                    const result = await roleList(this.projectId,param);
                    const resu = await result.json();
                    console.log("需方", resu)
                    let temp = [];
                    resu.forEach((v) =>{
                        temp.push({label: v.enterpriseName, value: v.enterpriseName });
                    })
                    this.demanderList = temp;

                    //当前风险
                    const params = Object.assign({capital:this.loginInfo.enterpriseId,status:'1'},this.query,this.pagination);
                    const resp = await warningList(params);
                    const res = await resp.json();
                    const total = resp.headers.get('x-total-count')
                    this.tableList = [...res];
                    this.total = parseInt(total);
                    this.listLoading = false;
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }

                    //已处理风险
                    const paramsTwo = Object.assign({capital:this.loginInfo.enterpriseId,status:'0'},this.query,this.pagination);
                    const respTwo = await warningList(paramsTwo);
                    const resTwo = await respTwo.json();
                    const totalTwo = respTwo.headers.get('x-total-count')
                    this.tableListTwo = [...resTwo];
                    this.totalTwo = parseInt(totalTwo);
                    this.listLoadingTwo = false;
                    if(!this.tableListTwo.length){
                        this.emptyTextTwo = "暂无数据";
                    }
                }catch(e){
                    this.emptyText = "获取数据失败";
                    this.listLoading = false;
                    this.emptyTextTwo = "获取数据失败";
                    this.listLoadingTwo = false;
                }
            },

            //添加风控预警弹出框
           async addWarning(){

                    const param = Object.assign({enterpriseRole:'PRO_ENT_TYPE_PLATFORM',state:'T'});
                    const result = await roleList(this.projectId,param);
                    const resu = await result.json();
                    console.log("需方", resu)
                    let temp = [];
                    resu.forEach((v) =>{
                        temp.push({label: v.enterpriseName, value: v.enterpriseName });
                    })
                    this.demanderListTwo = temp;
                 this.MarginModal = true;
            },

            //添加风控预警弹出框确定事件
            async marginSubmit(formName) {
                try{
                    const add = await addWarning(this.margin);
                    if(add.status == 200){
                         this.MarginModal = false;
                        this.$message.success('添加成功')
                    }
                   this.getList();
                }catch(e){
                    this.MarginModal = false;
                    this.$message.err('操作失败')
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
            },
            paginationTwo : {
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
