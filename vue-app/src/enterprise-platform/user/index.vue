<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
               <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="用户名"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item prop="phone">
                            <el-input v-model="query.phone" size="large" placeholder="手机号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="enabled">
                            <el-select v-model="query.enabled" size="large" placeholder="状态">
                                <el-option
                                    v-for="item in enabledOptions"
                                    :key="item.enabled"
                                    :label="item.value"
                                    :value="item.enabled">
                                </el-option>
                            </el-select>
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
                <el-table-column label="状态" prop="enabled" align="center" width="100px" >
                    <template scope="scope">
                        <el-tag :type="scope.row.enabled === 'T'?'success':'danger'">{{scope.row.enabled === 'T' ? '启用' : '禁用' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="120px">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="abled(scope.row.id)">{{scope.row.enabled === 'T' ? '禁用' : '启用'}}</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
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
			<el-form :model="editeData" label-width="110px" :rules="editRules" ref="editeData">
                <el-form-item
                label="用户名"
                prop="name"
                >
					<el-input v-model="editeData.name" ></el-input>
				</el-form-item>
				<el-form-item
                label="手机号码"
                prop="phone"
                >
					<el-input v-model="editeData.phone" ></el-input>
				</el-form-item>
                <el-form-item
                label="邮箱"
                prop="email"
                >
					<el-input v-model="editeData.email" ></el-input>
				</el-form-item>
                 <el-form-item
                label="密码"
                prop="encryptPassword"
                >
					<el-input type="password" v-model="editeData.encryptPassword" ></el-input>
				</el-form-item>
                <el-form-item
                label="确认密码"
                prop="passwordOk"
                >
					<el-input type="password" v-model="editeData.passwordOk" ></el-input>
				</el-form-item>
                <el-form-item
                label="性别"
                prop="gender"
                :rules="[
                    { required: true, message: '请选择性别'},
                ]">
                    <el-select v-model="editeData.gender">
                        <el-option
                        v-for="item in genderOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
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
    import { getUserList, abledUser, addUser, editUser } from '@/api/coreApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    import { checkEmail, checkPhone, checkPassword} from '../../config/mUtils'
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
            var checkPass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入密码'));
                } else if (!checkPassword(value)) {
                    callback(new Error('密码需6到16位，需包含数字，字母，符号中两种'))
                } else {
                    callback();
                }
            };
            var checkPassOk = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editeData.encryptPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                //table columns
                columns : [{
                    label : '用户名',
                    prop  : 'name',
                    },{
                    label : '手机号码',
                    prop  : 'phone',
                    },{
                    label : '邮箱',
                    prop  : 'email',
                    },{
                    label : '性别',
                    prop  : 'gender',
                    width: '80',
                    },{
                    label : '注册时间',
                    prop  : 'registerTime',
                    formatter : (row, column) => moment(row.registerTime).format('YYYY-MM-DD')
                    },
                ],
                //总页数
                total : 0,
                 pagination : {
                    page: 1,
                    size: 10
                },
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    name : '',
                    phone : '',
                    enabled : '',
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
                //搜索条件的个数
                criteriaNum : 3,

                //模态框
                modalTitle: '' ,
                editeModalVisible : false,
                editeData : {
                    id: '',
                    phone : '',
                    name : '',
                    email :'',
                    gender: '',
                    encryptPassword: '',
                    passwordOk: '',
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
                    encryptPassword: [
                        { required: true, validator: checkPass, trigger: 'blur' }
                    ],
                    passwordOk: [
                        { required: true, validator: checkPassOk, trigger: 'blur' }
                    ],
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
                this.listLoading = false;
                try{
                    const params = Object.assign({},this.query, this.pagination);
                    const eid = this.loginInfo.enterpriseId;
                    const resp = await getUserList(eid, params);
                    const res = await resp.json();
                    res.map((v) => {
                        v.gender = v.gender === 'F' ? '女' : '男';
                        v.abled = v.enabled === 'T' ? '启用' : '禁用';
                    })
                    const total = resp.headers.get('x-total-count')
                    this.tableList = [...res];
                    this.total = parseInt(total);
                    this.listLoading = false;
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                }catch(e) {
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

            async abled (id){
                const eid = this.loginInfo.enterpriseId;
                try{
                    const resp = await abledUser(id, eid);
                    this.$message({
                        message: '修改状态成功！',
                        type: 'success'
                    });
                    this.getList();
                }catch(e) {
                    this.$message.error(e);
                }
            },
           add () {
               this.editeData = {
                    id: '',
                    phone : '',
                    name : '',
                    email :'',
                    gender: '',
                    encryptPassword: '',
                    passwordOk: '',};
               this.modalTitle = '新增',
               this.editeModalVisible = true;
            },
           edite (index,row) {
                this.editeData = {...row};
                this.modalTitle = '编辑',
                this.editeModalVisible = true;
            },
            async editSubmit (formName) {
                this.editeData.gender = this.editeData.gender === '女' ? 'F' : 'T';
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) return false;

                    const eid = this.loginInfo.enterpriseId;
                    const id = this.editeData.id;
                    try{
                        const resp = id
                        ? await editUser(id, eid, this.editeData)
                        : await addUser(eid, this.editeData);
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
        },
        watch : {
            pagination : {
                handler : function() {
                    this.getList();
                },
                deep: true,
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
