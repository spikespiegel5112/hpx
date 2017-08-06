<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="code">
                            <el-input v-model="query.code" size="large" placeholder="字典编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="parentCode">
                            <el-input v-model="query.parentCode" size="large" placeholder="父字典编码"></el-input>
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
                <my-Pagination :callback="getList" :total="total">
                </my-Pagination>
            </section>
        </section>
        <!--编辑界面-->
		<el-dialog :title="modalTitle" v-model="editeModalVisible" :close-on-click-modal="false">
			<el-form :model="editeData" label-width="110px" :rules="editRules" ref="editeData">
                <el-form-item 
                label="字典编码" 
                prop="code" 
                 :rules="[
                { required: true, message: '请输入字典编码'},
                ]"
                >
					<el-input v-model="editeData.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item 
                label="父字典编码" 
                prop="parentCode"
                 :rules="[
                { required: true, message: '请输入父字典编码'},
                ]"
                >
					<el-input v-model="editeData.parentCode" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item 
                label="字典名称" 
                prop="name"
                 :rules="[
                { required: true, message: '请输入字典名称'},
                ]"
                >
					<el-input v-model="editeData.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item 
                label="排序号"
                prop="sortNum"
                :rules="[
                { required: true, message: '请输入排序号'},
                ]">
                    <el-input v-model="editeData.sortNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item 
                label='描述' 
                prop="description"
                :rules="[
                { required: true, message: '请输入字典描述'},
                ]">
                   <el-input v-model="editeData.description" auto-complete="off"></el-input>
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
    import { getDictionaryList, delDictionary, addDictionary, editDictionary } from '@/api/coreApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    import { checkEmail, checkPhone } from '../../config/mUtils'
    export default {
        data(){
            var validateEmail = (rule, value, callback) => {
                if(!checkEmail(value)) {
                    callback(new Error('邮箱格式不对'))
                } else {
                    callback();
                }
            }
            var validatePhone = (rule, value, callback) => {
                if(!checkPhone(value)) {
                    callback(new Error('手机号码格式不对'))
                } else {
                    callback();
                } 
            }
            return {
                //table columns
                columns : [{
                    label : '字典编码',
                    prop  : 'code',
                    },{
                    label : '字典名称',
                    prop  : 'name',
                    },{
                    label : '父字典编码',
                    prop  : 'parentCode',
                    },{
                    label : '排序号',
                    prop  : 'sortNum',
                    },{
                    label : '描述',
                    prop  : 'description',
                    },{
                    label : '记录时间',
                    prop  : 'createTime',
                    formatter : (row, column) => moment(column.createTime).format('YYYY-MM-DD')                    
                    },{
                    label : '最后更新时间',
                    prop  : 'modifiedTime',
                    formatter : (row, column) => moment(column.modifiedTime).format('YYYY-MM-DD')                    
                    },
                ],
                //总页数
                total : 0,
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    code : '',
                    parentCode : '',
                },
                enabledOptions : [
                    {
                        value : '启用',
                        enabled : 'T'
                    },
                    {
                        value : '禁用',
                        enabled : 'F'
                    }
                ],
                genderOptions : [
                    {
                        value : '女',
                        gender : 'F'
                    },
                    {
                        value : '男',
                        gender : 'M'
                    }
                ],
                lockedOptions : [
                    {
                        value : '是',
                        locked : 'T'
                    },
                    {
                        value : '否',
                        locked : 'F'
                    }
                ],
                //搜索条件的个数
                criteriaNum : 2,

                //模态框
                modalTitle: '' ,
                editeModalVisible : false,
                editeData : {
                    id: '',
                    code : '',
                    name : '',
                    parentCode :'',
                    sortNum : '',
                    description: '',
                },
                editRules : {
                    name : [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
                    phone : [
                        { validator: validatePhone, required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    email : [
                        { validator: validateEmail, required: true, message: '请输入邮箱', trigger: 'blur' }
                    ],
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
                const resp = await getDictionaryList(params);
                const res = await resp.json();
                 res.map((v) => {
                    Object.assign(v, {confirmVisible: false})
                })
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

           add () {
               this.modalTitle = '新增',
               this.editeModalVisible = true; 
            },
           edite (index,row) {
                this.modalTitle = '编辑',
                this.editeModalVisible = true;
                this.editeData = {...row};
            },
            async editSubmit (formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) return false;
                    
                    const eid = this.loginInfo.enterpriseId;
                    const id = this.editeData.id;
                    try{
                        const resp = id
                        ? await editDictionary(id, this.editeData)
                        : await addDictionary(this.editeData);
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
            async del (code) {
                try{const resp = await delDictionary(code);
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
