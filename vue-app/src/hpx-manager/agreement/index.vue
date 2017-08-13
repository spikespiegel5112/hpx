<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="协议名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="6 * (3 - (criteriaNum % 4))" style="float: right"> 
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="plus" type="primary" @click="add" style="float: right; margin-bottom: 5px;">新增</el-button>
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
                border
                style="width: 100%">
                <el-table-column 
                    label="序号"
                    type="index"
                    prop="num"
                    width="80"
                    align="center"
                >             
                </el-table-column>
                <el-table-column 
                    align="center"
                    v-for="(value,i) in columns" 
                    :key="i"
                    :label="value.label"
                    :prop="value.prop"
                    :sortable="value.sortable"
                    :width="value.width ? value.width : 'auto'"
                    :formatter="value.formatter"
                    :min-width="value.minWidth ? value.minWidth : 'auto'"
                >             
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <section class="main-pagination">
                <my-Pagination @pageChange="pageChange" :total="total">
                </my-Pagination>
            </section>
        </section>
        <!--编辑界面-->
		<el-dialog :title="modalTitle" v-model="editeModalVisible" :close-on-click-modal="false">
			<el-form :model="editeData" label-width="110px" ref="editeData">
                <el-form-item 
                label="协议名称" 
                prop="name"
                :rules="[
                    { required: true, message: '协议名称不能为空', trigger: 'blur'},
                    ]"
                >
					<el-input v-model="editeData.name"  ></el-input>
				</el-form-item>
                <el-form-item 
                    label="协议编码" 
                    prop="code" 
                    :rules="[
                    { required: true, message: '协议编码不能为空', trigger: 'blur'},
                    ]"
                >
					<el-input v-model="editeData.code"  ></el-input>
				</el-form-item>
                
				<el-form-item 
                label="关联产品" 
                prop="productCode"
                :rules="[
                    { required: true, message: '关联产品不能为空', trigger: 'blur'},
                    ]"
                >
                    <el-select v-model="editeData.productCode" placeholder="关联产品">
                        <el-option
                            v-for="item in productList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id+''">
                        </el-option>
                    </el-select>
					<!--<el-input v-model="editeData.productCode"  ></el-input>-->
				</el-form-item>
                <el-form-item 
                label="协议内容"
                prop="context"
                :rules="[
                    { required: true, message: '协议内容不能为空', trigger: 'blur'},
                    ]"
                >
                    <el-input v-model="editeData.context"  ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editeModalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit('editeData')">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import myPagination from '../../components/myPagination'
    import { getAgreementList, getProductList, delAgreement, addAgreement, editAgreement } from '@/api/coreApi'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '协议名称',
                    prop  : 'name',
                    },{
                    label : '协议编码',
                    prop  : 'code',
                    },{
                    label : '关联产品',
                    prop  : 'productCode',
                    },{
                    label : '协议内容',
                    prop  : 'context',
                    },{
                    label : '创建时间',
                    prop  : 'createTime',
                    formatter : (row, column) => moment(row.createTime).format('YYYY-MM-DD') 
                    },{
                    label : '最后更新时间',
                    prop  : 'modifiedTime',
                    formatter : (row, column) => moment(row.modifiedTime).format('YYYY-MM-DD')                    
                    },
                ],
                //总页数
                total : 0,
                pagination : {
                    page : 1,
                    size : 10
                },
                //table
                tableList: [],
                productList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    name : '',
                },
                //搜索条件的个数
                criteriaNum : 1,

                //模态框
                modalTitle: '' ,
                editeModalVisible : false,
                editeData : {
                    id: '',
                    code: '',
                    name : '',
                    productCode: '',
                    context :'',
                    createTime : '',
                    modifiedTime: '',
                },
            }
        },
    	components: {
            headTop,
            myPagination,
    	},
        created(){
            this.initData();
        },
        methods: {
            pageChange(data) {
                this.pagination = data;
            },
            async initData(){
                this.getList();
            },
            async getList(pagination={page:1,size:10}){
                this.listLoading = true;
                try{
                    const params = Object.assign({},this.query,pagination);
                    const resp = await getAgreementList(params);
                    const res = await resp.json();
                    const result = await getProductList();
                    const resu = await result.json();
                    this.productList = resu;
                    console.log("产品列表",  this.productList);
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
            add () {
               this.modalTitle = '新增',
               this.editeModalVisible = true; 
            },
            edite (index,row) {
                this.modalTitle = '编辑',
                this.editeModalVisible = true;
                Object.keys(this.editeData).forEach(
                    (key)=>{
                         this.editeData[key] = row[key].toString();
                    }
                )
            },
            async editSubmit (formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) return false;
                    const id = this.editeData.id;
                    try{
                        const resp = id
                        ? await editAgreement(id, this.editeData)
                        : await addAgreement(this.editeData);
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        });
                        this.editeModalVisible = false;
                        this.getList();
                    }catch(e) {
                        this.$message.error(e);
                    }
                });
            },
            async del (id) {
                try{const resp = await delAgreement(id);
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.getList();}
                 catch(e) {
                    this.$message.error(e);
                }
            }
        },
    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
