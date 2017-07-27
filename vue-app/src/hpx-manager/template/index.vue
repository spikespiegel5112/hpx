<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="企业名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="activated">
                            <el-select v-model="query.activated" size="large" placeholder="激活状态">
                                <el-option
                                    v-for="item in activatedOptions"
                                    :key="item.activated"
                                    :label="item.value"
                                    :value="item.activated">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item prop="auditState">
                            <el-select v-model="query.auditState" size="large" placeholder="认证状态">
                                <el-option
                                    v-for="item in auditStateOptions"
                                    :key="item.auditState"
                                    :label="item.value"
                                    :value="item.auditState">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="6 * (3 - (criteriaNum % 4))">
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="plus" type="primary">新增</el-button>
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
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
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
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="check(scope.$index, scope.row)" >查看</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
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
		<el-dialog title="编辑" v-model="editeModalVisible" :close-on-click-modal="false">
			<el-form :model="editeData" label-width="80px" :rules="editRules" ref="editeData">
                <el-form-item label="企业编号" prop="id" readonly>
					<el-input v-model="editeData.id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="企业名称" prop="name">
					<el-input v-model="editeData.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label='激活状态' prop="activated">
                    <el-select v-model="editeData.activated">
                        <el-option
                            v-for="item in activatedOptions"
                            :key="item.activated"
                            :label="item.value"
                            :value="item.activated">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="联系方式">
					<el-input v-model="editeData.contactsNumber"></el-input>
				</el-form-item>
				<el-form-item label="更新时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="editeData.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editeData.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editeModalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import myPagination from '../../components/myPagination'
    import { getEnterprisesList } from '@/api/coreApi'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '企业编号',
                    prop  : 'id',
                    sortable : true,
                    },{
                    label : '企业名称',
                    prop  : 'name',
                    sortable : true,
                    minWidth : 120,
                    },{
                    label : '企业状态',
                    prop  : 'activated',
                    sortable : true,
                    formatter : (row,column) => row.activated === 'T' ? "状态1" : "状态2"
                    },{
                    label : '地址',
                    prop  : 'address',
                    sortable : true,
                    minWidth : 200
                    },{
                    label : '联系方式',
                    prop  : 'contactsNumber',
                    sortable : true,
                    }
                ],
                //总页数
                total : 0,
                //分页
                /*
                ** 分页需改1
                */
                pagination : {},
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    name : '',
                    activated : '',
                    auditState : '',
                },
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
                //搜索条件的个数
                criteriaNum : 3,

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
            this.initData();
        },
        mounted(){

        },
        computed : {
            ...mapState(["loginInfo"])
        },
        methods: {
            /*
            ** 分页需改2
            */
            pageChange(data){
                this.pagination = data;
            },
            async initData(){
                this.getList();
            },
            async getList(){
                /*
                ** 分页需改5
                */
                this.listLoading = true;
                try{
                    const params = Object.assign({},this.query,this.pagination);
                    const resp = await getEnterprisesList(params);
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

            check (index,row){
                this.$router.push({path: this.$route.path + '/detail/' + row.id})
            },
            edite (index,row) {
                this.editeModalVisible = true;
                this.editeData = Object.assign({},{...row})
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

<style lang="less">
    @import '../../style/mixin';

</style>
