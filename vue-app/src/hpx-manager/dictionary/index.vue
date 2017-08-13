<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="字典名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="parentCode">
                            <el-select v-model="query.parentCode" size="large" placeholder="父字典">
                                <el-option
                                    v-for="item in parentDictionaryList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
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
                <el-table-column align="center" label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="scope.row.confirmVisible=true">删除</el-button>
                        <el-popover v-model="scope.row.confirmVisible">
                            <p>
                                <i style="color:#ffbf00" class="el-icon-information"></i> 确定删除？</p>
                            <div style="margin-top:15px;">
                                <el-button size="mini" @click="scope.row.confirmVisible= false">取消</el-button>
                                <el-button type="primary" size="mini" @click="del(scope.row.code)">确定</el-button>
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
			<el-form :model="editeData" label-width="110px" :rules="sortNum" ref="editeData">
                 <el-form-item 
                label="父字典" 
                prop="parentCode"
                >
                    <el-select v-model="editeData.parentCode">
                        <el-option
                            v-for="item in parentDictionaryList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item 
                label="字典编码" 
                prop="code" 
                 :rules="[
                { required: true, message: '请输入字典编码', trigger: 'blur'},
                ]"
                >
					<el-input v-model="editeData.code"></el-input>
				</el-form-item>
                <el-form-item 
                label="字典名称" 
                prop="name"
                 :rules="[
                { required: true, message: '请输入字典名称', trigger: 'blur'},
                ]"
                >
					<el-input v-model="editeData.name"></el-input>
				</el-form-item>
                <el-form-item 
                label="排序号"
                prop="sortNum">
                    <el-input :maxlength="3" v-model="editeData.sortNum"></el-input>
				</el-form-item>
				<!--<el-form-item 
                label='描述' 
                prop="description"
                :rules="[
                { required: true, message: '请输入字典描述', trigger: 'blur'},
                ]">
                   <el-input type="textarea" placeholder="最多可输入50个字" :maxlength="50" v-model="editeData.description" ></el-input>
                </el-form-item>-->
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
    import { getDictionaryList, getParentDictionaryList, delDictionary, addDictionary, editDictionary } from '@/api/coreApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    import myJS from '../../config/mUtils'
    export default {
        data(){
            var checkNum = (rule, value, callback) => {
                const tmp = myJS.checkType(value, 'number');
                if(!value) {
                    callback(new Error('请输入排序号'));
                } else if (!tmp) {
                    callback(new Error('只能输入数字'));
                } else {
                    callback();
                } 
            }
            return {
                //table columns
                columns : [{
                    label : '父字典',
                    prop  : 'parentName',
                    },{
                    label : '字典编码',
                    prop  : 'code',
                    },{
                    label : '字典名称',
                    prop  : 'name',
                    },{
                    label : '排序号',
                    prop  : 'sortNum',
                    width : '80'
                    },{
                    label : '最后更新时间',
                    prop  : 'modifiedTime',
                    formatter : (row, column) => moment(row.modifiedTime).format('YYYY-MM-DD')                    
                    },
                    //  {
                    // label : '描述',
                    // prop  : 'description',
                    // minWidth : '150'
                    // },
                ],
                //总页数
                total : 0,
                pagination : {
                    page : 1,
                    size : 10
                },
                //table
                tableList: [],
                parentDictionaryList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    name : '',
                    parentCode : '',
                },
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
                sortNum: {
                   sortNum: [{required: true, validator: checkNum, trigger: 'blur'}]
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
            pageChange(data) {
                this.pagination = data;
            },
            async initData(){
                this.getList();
            },
            async getList(){
                this.listLoading = true;
                try{
                    const params = Object.assign({},this.query,this.pagination);
                    const resp = await getDictionaryList(params);
                    const res = await resp.json();
                    const result = await getParentDictionaryList();
                    const resu = await result.json();
                    this.parentDictionaryList = resu;
                    res.map((v) => {
                        Object.assign(v, {confirmVisible: false})
                    })
                    const total = resp.headers.get('x-total-count')
                    this.tableList = [...res];
                    this.total = parseInt(total);
                    this.listLoading = false;
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                } catch(e){
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
               this.modalTitle = '新增';
               this.editeModalVisible = true; 
               this.editeData = {
                    id: '',
                    code : '',
                    name : '',
                    parentCode :'',
                    sortNum : '',
                    description: '',
                }
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
