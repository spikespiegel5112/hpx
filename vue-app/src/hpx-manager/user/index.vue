<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
            <el-form :inline="true" :model="query" ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="enterpriseName">
                             <el-select v-model="query.enterpriseName" size="large" placeholder="企业名称">
                                <el-option
                                    v-for="item in enterpriseList"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="用户名"></el-input>
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
            <el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
                <el-table-column label="序号" type="index" prop="num" width="80" align="center">
                </el-table-column>
                <el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                </el-table-column>
                <el-table-column label="状态" prop="enabled" align="center" width="100px">
                    <template scope="scope">
                        <el-tag :type="scope.row.enabled === 'T'?'danger':'success'">{{scope.row.enabled === 'F' ? '启用' : '禁用' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="120px">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="abled(scope.row.id, scope.row.eid)">{{scope.row.enabled === 'F' ? '禁用' : '启用'}}</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="configure(scope.$index, scope.row)">配置角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <section class="main-pagination">
                <my-Pagination  @pageChange="pageChange" :total="total">
                </my-Pagination>
            </section>
        </section>
        <!--编辑界面-->
        <el-dialog :title="modalTitle" v-model="editeModalVisible" :close-on-click-modal="false">
            <el-form :model="editeData" label-width="110px" :rules="editRules" ref="editeData">
                <el-form-item label="企业名称" prop="eid" v-show="this.modalTitle === '新增'">
                     <el-select v-model="editeData.eid" placeholder="企业名称">
                        <el-option
                            v-for="item in enterpriseList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id+''">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="editeData.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="editeData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editeData.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="encryptPassword">
                    <el-input type="password" v-model="editeData.encryptPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordOk">
                    <el-input type="password" v-model="editeData.passwordOk"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender" :rules="[
                        { required: true, message: '请选择性别'},
                    ]">
                    <el-select v-model="editeData.gender">
                        <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editeModalVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit('editeData')">提交</el-button>
            </div>
        </el-dialog>
        <!--配置角色页面-->
        <el-dialog title="配置角色" v-model="configureVisible" :close-on-click-modal="false">
             <!--<el-checkbox-group-->
                <!--v-model="checkedCities1"-->
                <!--:min="1"-->
                <!--:max="2">-->
                <!--<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>-->
            <!--</el-checkbox-group>-->

            <template>
                <el-table
                    :data="roleListTransferData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址">
                    </el-table-column>
                </el-table>
            </template>

            <template>
                <el-transfer
                    width="300"
                    v-model="configProjectData.role"
                    :data="roleListTransferData">
                </el-transfer>
            </template>


            <!--<el-form :model="configProjectData" label-width="120px" :rules="configProjectRules" ref="configProjectData">-->
                <!--<el-form-item prop="role">-->
                    <!--<el-select v-model="configProjectData.role">-->
                        <!--<el-option v-for="item in roleList" :value="item.code" :key="item.code" :label="item.name">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="configureVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit('editeData')">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
import headTop from '../../components/headTop'
import myPagination from '../../components/myPagination'
import {
    getRolesListRequest,
} from '@/api/enterpriseApi'
import { getEUserList, getEnterpriseList, abledUser, addUser, editUser, getroleList } from '@/api/coreApi'
import { mapState } from 'vuex'
import moment from 'moment'
import { checkEmail, checkPhone, checkPassword } from '../../config/mUtils'
export default {
    data() {
        var validateEmail = (rule, value, callback) => {
            if (!checkEmail(value)) {
                callback(new Error('邮箱格式不对'))
            } else {
                callback();
            }
        }
        var validatePhone = (rule, value, callback) => {
            if (!checkPhone(value)) {
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
            checkedCities1: ['上海', '北京'],
            cities: cityOptions,
            //table columns
            columns: [{
                label: '企业名称',
                prop: 'enterpriseName',
                }, {
                    label: '用户名',
                    prop: 'name',
                }, {
                    label: '手机号码',
                    prop: 'phone',
                },
                // {
                //     label: '邮箱',
                //     prop: 'email',
                // },
                // {
                //     label: '性别',
                //     prop: 'gender',
                // },
                {
                    label: '注册时间',
                    prop: 'registerTime',
                    formatter: (row, column) => moment(row.registerTime).format('YYYY-MM-DD')
                },
            ],
            //总页数
            total: 0,
            pagination : {
                page: 1,
                size: 10
            },
            //table
            tableList: [],
            enterpriseList: [],
            listLoading: false,
            emptyText: "暂无数据",

            //search params
            query: {
                enterpriseName: '',
                name: '',
            },
            genderOptions: [
                {
                    value: '女',
                    gender: 'F'
                },
                {
                    value: '男',
                    gender: 'M'
                }
            ],
            //搜索条件的个数
            criteriaNum: 3,

            //模态框
            modalTitle: '',
            editeModalVisible: false,
            editeData: {
                eid: '',
                id: '',
                phone: '',
                name: '',
                email: '',
                gender: '',
                encryptPassword: '',
                passwordOk: '',
            },
            editRules: {
                eid: [
                    { required: true, message: '请选择企业', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, required: true, message: '请输入手机号码', trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                encryptPassword: [
                    { required: true, validator: checkPass, trigger: 'blur' }
                ],
                passwordOk: [
                    { required: true, validator: checkPassOk, trigger: 'blur' }
                ],
            },
            // 配置角色
            configureVisible: false,
            roleList: [],
            configProjectData:{
                role:''
            },
            configProjectRules:[{
                required: true, message: '请选择企业', trigger: 'change'
            }],
            roleListTransferData:[]
        }
    },
    components: {
        headTop,
        myPagination,
    },
    created() {
        this.initData();
    },

    computed: {
        ...mapState(["loginInfo"])
    },
    methods: {
        pageChange(data){
            this.pagination = data;
        },
        async initData() {
            this.getList();
            this.getRolesList();
        },
        async getList() {
            this.listLoading = true;
            try {
                const params = Object.assign({}, this.query, this.pagination);
                const resp = await getEUserList(params);
                const res = await resp.json();
                const result = await getEnterpriseList();
                const resu = await result.json();
                this.enterpriseList = resu;
                res.map((v) => {
                    v.gender = v.gender === 'F' ? '女' : '男';
                    v.abled = v.enabled === 'F' ? '启用' : '禁用';
                })
                const total = resp.headers.get('x-total-count')
                this.tableList = [...res];
                this.total = parseInt(total);
                this.listLoading = false;
                if (!this.tableList.length) {
                    this.emptyText = "暂无数据";
                }
            } catch (e) {
                this.emptyText = "获取数据失败";
                this.listLoading = false;
            }

        },

        async search() {
            this.getList();
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        async abled(id, eid) {
            try {
                const resp = await abledUser(id, eid);
                this.$message({
                    message: '修改状态成功！',
                    type: 'success'
                });
                this.getList();
            } catch (e) {
                this.$message.error(e);
            }
        },
        add() {
            this.editeData = {
                id: '',
                phone: '',
                name: '',
                email: '',
                gender: '',
                encryptPassword: '',
                passwordOk: '',
                eid:'',
            };
            this.modalTitle = '新增',
            this.editeModalVisible = true;
        },
        edite(index, row) {
            this.editeData = { ...row };
            this.modalTitle = '编辑',
            this.editeModalVisible = true;
        },
        configure(index, row) {
            this.editeData = { ...row };
            this.configureVisible = true;
        },

        async editSubmit(formName) {
            this.editeData.eid = this.editeData.eid.toString();
            this.editeData.gender = this.editeData.gender === '女' ? 'F' : 'T';
            this.$refs[formName].validate(async (valid) => {
                if (!valid) return false;

                const eid = this.editeData.eid;
                const id = this.editeData.id;
                try {
                    const resp = id
                        ? await editUser(id, eid, this.editeData)
                        : await addUser(eid, this.editeData);
                    this.$message({
                        message: '提交成功！',
                        type: 'success'
                    });
                    this.editeModalVisible = false;
                    this.getList();
                } catch (e) {
                    this.$message.error(e);
                }
            });
        },
        getRolesList(){
            let options={
                eid:this.$store.state.loginInfo.enterpriseId
            }
            getRolesListRequest(options).then(response=>{
                response.json().then(result=>{
                    console.log(result)
                    this.roleList=result
                    for(var index in this.roleList){
                        this.roleListTransferData.push({
                            label:this.roleList[index].name,
                            key: this.roleList[index].code
                        })
                    }

                })
            })
        }
    },
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
@import '../../style/mixin';
.table_container {
    padding: 20px;
}
</style>
