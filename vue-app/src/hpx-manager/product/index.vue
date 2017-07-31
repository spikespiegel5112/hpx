<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="code">
                            <el-input v-model="query.code" size="large" placeholder="产品编码"></el-input>
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
                        <el-button type="text" size="small" @click="abled(scope.row.id)">{{scope.row.available === 'T' ? '禁用' : '启用'}}</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>                        
                    </template>
                </el-table-column>
            </el-table>
            <section class="main-pagination">
                <my-Pagination :callback="getList" :total="total">
                </my-Pagination>
            </section>
        </section>
        <!--编辑界面-->
		<el-dialog :title="modalTitle" v-model="editeModalVisible" :close-on-click-modal="false">
			<el-form :model="editeData" label-width="110px" :rules="editRules" ref="editeData">
                <el-form-item 
                label="产品编码" 
                prop="code" 
                readonly
                :rules="[
                { required: true, message: '请输入产品编码'},
                ]">
					<el-input v-model="editeData.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item 
                label="产品名称" 
                prop="name"
                :rules="[
                { required: true, message: '请输入产品名称'},
                ]">
					<el-input v-model="editeData.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item 
                label="产品企业类型"
                :rules="[
                { required: true, message: '请选择产品企业类型'},
                ]">
                    <el-select
                        v-model="editeData.productEnterpriseRole"
                        multiple
                        filterable
                        allow-create
                        placeholder="请选择产品企业类型">
                        <el-option
                        v-for="item in productEnterpriseRoleList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item 
                label='启用状态' 
                prop="available"
                :rules="[
                { required: true, message: '请选择启用状态'},
                ]">
                    <el-select v-model="editeData.available">
                        <el-option
                            v-for="item in enabledOptions"
                            :key="item.available"
                            :label="item.value"
                            :value="item.available">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item 
                label="产品入口地址" 
                prop="entryUrl"
                :rules="[
                { required: true, message: '请输入产品入口地址'},
                ]">
					<el-input v-model="editeData.entryUrl"><template slot="prepend">Http://</template></el-input>
				</el-form-item>
				<el-form-item 
                label="最后更新时间" 
                prop="modifiedTime"
                :rules="[
                { required: true, message: '请选择最后更新时间'},
                ]">
					<el-date-picker type="date" placeholder="选择日期" v-model="editeData.modifiedTime"></el-date-picker>
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
    import { getProductList, abledProduct, delProduct, getProductEpRoleList, addProduct, editProduct } from '@/api/coreApi'
    import { mapState } from 'vuex'
    import { moment } from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '产品编码',
                    prop  : 'code',
                    },{
                    label : '产品名称',
                    prop  : 'name',
                    },{
                    label : '产品的入口地址',
                    prop  : 'entryUrl',
                    },{
                    label : '最后更新时间',
                    prop  : 'modifiedTime',
                    // formatter : (row, column) => moment(column.modifiedTime).format('YYYY-MM-DD')
                    }
                ],
                //总页数
                total : 0,
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    name : '',
                    code : ''
                },
                enabledOptions : [
                    {
                        value : '启用',
                        available : 'T'
                    },
                    {
                        value : '禁用',
                        available : 'F'
                    }
                ],
                //搜索条件的个数
                criteriaNum : 2,

                //模态框
                modalTitle: '' ,
                editeModalVisible : false,
                productEnterpriseRoleList: [],
                tmp : [],
                editeData : {
                    id: '',
                    code : '',
                    name : '',
                    entryUrl : '',
                    available: '',
                    modifiedTime : '',
                    productEnterpriseRole: [],
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
            this.initData();
        },
        mounted(){

        },
        computed : {
            ...mapState(["loginInfo"])
        },
        methods: {
            async initData(){
                this.listLoading = true;
                try{
                    this.getList();
                    this.listLoading = false;
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                }catch(e){
                    this.emptyText = "获取数据失败";
                    this.listLoading = false;
                }
            },
            async getList(pagination={page:1,size:10}){
                const params = Object.assign({},this.query,pagination);
                const resp = await getProductList(params);
                const res = await resp.json();
                const total = resp.headers.get('x-total-count')
                this.tableList = [...res];
                this.total = parseInt(total);
            },
            async search () {
                try{
                    this.getList();
                }catch(e){
                    
                }
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async abled (id){
                const resp = await abledProduct(id);
                if(resp.status === 200) {
                    this.$message({
                        message: '修改状态成功！',
                        type: 'success'
                    });
                    this.getList();
                } else {
                    this.$message.error('修改状态失败！');
                }
            },
            // 获取产品企业类型
            async getPERList() {
                const resp = await getProductEpRoleList('PRO_ENT_TYPE');
               if(resp.status !== 200) {
                 this.$message.error('获取产品企业类型失败！');
               }
               const res = await resp.json();
               res.map((v) => {
                   this.productEnterpriseRoleList.push(v);
                   this.tmp.push(v.code)
               })
            },
           add () {
               this.modalTitle = '新增',
               this.editeModalVisible = true; 
               this.getPERList();
            },
           edite (index,row) {
                this.modalTitle = '编辑',
                this.editeModalVisible = true;
                this.getPERList();
                const enabled = row.available === "T" ? "启用" : "禁用";
                this.editeData = Object.assign({},row, {available: enabled},{productEnterpriseRole:this.tmp});
            },
            async editSubmit (formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) return false;

                    const id = this.editeData.id;
                    const proRole =  this.editeData.productEnterpriseRole;
                    let newProRole = [];
                    proRole.map((v) => {
                        newProRole.push({code: v});
                    })
                    this.editeData.available === "禁用" ? this.editeData.available = 'F' : this.editeData.available = 'T';
                    const editePostData = Object.assign({},{...this.editeData}, {productEnterpriseRole: newProRole});
                    try{
                        const resp = id
                        ? await editProduct(id, editePostData)
                        : await addProduct(editePostData);
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        });
                         this.editeModalVisible = false;
                         this.getList();
                    } catch(e) {
                        this.$message.error(e);
                    }
                });
            },
            async del (id) {
                const resp = await delProduct(id);
                if(resp.status === 200) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.getList();
                } else {
                    this.$message.error('删除失败！');
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
