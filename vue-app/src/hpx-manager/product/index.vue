<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="5">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="code">
                            <el-input v-model="query.code" size="large" placeholder="产品编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="availableStatus">
                            <el-select v-model="query.availableStatus" size="large" placeholder="状态">
                                <el-option
                                    v-for="item in availableStatus"
                                    :key="item.available"
                                    :label="item.value"
                                    :value="item.available">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="float: right"> 
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
                    :formatter="value.formatter"
                >             
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="abled(scope.row,scope.row.id)">{{scope.row.available === 'F' ? '启用' : '禁用'}}</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="scope.row.confirmVisible=true">删除</el-button>
                        <el-popover v-model="scope.row.confirmVisible">
                            <p>
                                <i style="color:#ffbf00" class="el-icon-information"></i> 确定删除？</p>
                            <div style="margin-top:15px;">
                                <el-button size="mini" @click="scope.row.confirmVisible= false">取消</el-button>
                                <el-button type="primary" size="mini" @click="del(scope.row.id)">确定</el-button>
                            </div>
                        </el-popover>                       
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
                label="产品编码" 
                prop="code" 
                readonly
                :rules="[
                { required: true, message: '请输入产品编码',trigger:'blur'},
                ]">
					<el-input v-model="editeData.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item 
                label="产品名称" 
                prop="name"
                :rules="[
                { required: true, message: '请输入产品名称',trigger:'blur'},
                ]">
					<el-input v-model="editeData.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item 
                label="产品企业类型"
                :rules="[
                    { type : 'array', required: true, message: '请选择产品企业类型',trigger:'blur'}
                ]"
                prop="productEnterpriseRole">
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
    import moment from 'moment' 
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
                    label : '最后更新时间',
                    prop  : 'modifiedTime',
                    formatter : (row, column) => moment(column.modifiedTime).format('YYYY-MM-DD')
                    },{
                    label : '状态',
                    prop  : 'abled',
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
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    name : '',
                    code : '',
                    availableStatus: '',
                },
                availableStatus : [
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
                    productEnterpriseRole: [],
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
        mounted(){

        },
        computed : {
            ...mapState(["loginInfo"])
        },
        methods: {
            pageChange(data){
                this.pagination = data;
            },
            async initData(){
                    this.getList();
            },
            async getList(){
                this.listLoading = true;
                try{
                     const params = Object.assign({},this.query, this.pagination);
                    const resp = await getProductList(params);
                    const res = await resp.json();
                    res.map((v) => {
                        Object.assign(v, {abled: v.available === 'F' ? '禁用' : '启用'},{confirmVisible: false})
                    })
                    const total = resp.headers.get('x-total-count');
                    this.tableList = [...res];
                    this.total = parseInt(total);
                    this.listLoading = false;
                }catch(e) {
                    this.listLoading = false;
                }
               
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
            async abled (row,id){
                try{
                    const resp = await abledProduct(id);
                    this.$message({
                        message: '修改状态成功！',
                        type: 'success'
                    });
                    this.getList();
                } catch(e) {
                    this.$message.error('修改状态失败！');
                };
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
               })
            },
           add () {
               this.productEnterpriseRoleList = [];
               Object.assign(this.$data.editeData, this.$options.data().editeData)
               this.modalTitle = '新增',
               this.editeModalVisible = true; 
               this.getPERList();
            },
           edite (index,row) {
                this.productEnterpriseRoleList = [];
                Object.assign(this.$data.editeData, this.$options.data().editeData)
                this.tmp = [];
                this.modalTitle = '编辑',
                this.editeModalVisible = true;
                this.getPERList();
                const enabled = row.available === "T" ? "禁用" : "启用";
                const list = row.productEnterpriseRole
                for(let i = 0; i < list.length; i++) {
                    this.tmp.push(list[i].code);
                }
                this.editeData = {id: row.id, code: row.code, name: row.name, productEnterpriseRole: this.tmp};
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
        watch : {
            pagination : {
                handler : function() {
                    this.getList();
                },
                deep : true
            }
        }
    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
