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
                        <el-form-item prop="enterpriseStatus">
                            <el-select v-model="query.enterpriseStatus" size="large" placeholder="状态">
                                <el-option
                                    v-for="item in activatedOptions"
                                    :key="item.activated"
                                    :label="item.value"
                                    :value="item.activated">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="6 * (3 - (criteriaNum % 4))" style='text-align:right;'>
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
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
                style="width: 100%">
                <el-table-column
                  type="index">
                </el-table-column>
                <el-table-column
                    v-for="(value,i) in columns"
                    :key="i"
                    :label="value.label"
                    :prop="value.prop"
                    :width="value.width ? value.width : 'auto'"
                    :formatter="value.formatter"
                    :min-width="value.minWidth ? value.minWidth : 'auto'"
                >
                </el-table-column>
                <el-table-column label="状态" prop="enterpriseStatus" sortable="true">
                    <template scope="scope">
                        <el-tag :type="scope.row.enterpriseStatus === 'T'?'success':'danger'">{{scope.row.enterpriseStatus === 'T' ? '启用' : '停用' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" :min-width="100">
                    <template scope="scope">
                        <el-button type="text" size="small">
                            <router-link :to="`/manager/etpde/${scope.row.id}`">查看</router-link>
                        </el-button>                        
                        <el-button v-if="scope.row.enterpriseStatus === 'F'" type="text" size="small" @click="del(scope.$index, scope.row,'T')">启用</el-button>
                        <el-button v-if="scope.row.enterpriseStatus === 'T'" type="text" size="small" @click="del(scope.$index, scope.row,'F')">停用</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    import { getEnterprisesList ,eidStatus } from '@/api/coreApi'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '企业编号',
                    prop  : 'id',
                    },{
                    label : '企业名称',
                    prop  : 'name',
                    minWidth : 120,
                    },{
                    label : '行业',
                    prop  : 'industry',
                    },{
                    label : '地址',
                    prop  : 'address',
                    minWidth : 200
                    },{
                    label : '联系方式',
                    prop  : 'contactsNumber',
                    minWidth:100
                    }
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
                    enterpriseStatus : '',
                    auditState : 'T',
                },
                activatedOptions : [
                    {
                        value : '启用',
                        activated : 'T'
                    },
                    {
                        value : '禁用',
                        activated : 'F'
                    }
                ],
                //搜索条件的个数
                criteriaNum : 2,

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
            pageChange(data){
                this.pagination = data;
            },
            async initData(){
                this.getList();
            },
            async getList(){
                this.listLoading = true;
                try{
                    const params = Object.assign({},this.query,this.pagination);
                    const resp = await getEnterprisesList(params);
                    const res = await resp.json();
                    const total = resp.headers.get('x-total-count')
                    this.tableList = [...res];
                    this.total = parseInt(total);
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                    this.listLoading = false;
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
            async del (index,row,type) {
                try{
                    const resp = await eidStatus(this.loginInfo.enterpriseId)
                    if(resp.status === 200){
                        this.$message({
                            type:'success',
                            message:'操作成功'
                        })
                        this.tableList[index].enterpriseStatus = type;
                    }
                }catch(e){

                }
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
    .table_container{
        padding: 20px;
    }
</style>
