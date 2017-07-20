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
                        <el-button type="text" size="small" @click="del(scope.row.id,'T')" >通过</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id, 'F')">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <section class="main-pagination">
                <my-Pagination :callback="getList" :total="total">
                </my-Pagination>
            </section>
        </section>
        <!--编辑界面-->
		<el-dialog title="审核" v-model="editeModalVisible" size="tiny" :close-on-click-modal="false">
			<el-form :model="editeData" label-width="80px" :rules="editRules" ref="editeData">
                <div style="margin:20px 0;">
                    <el-tag type="primary">请确定企业资料审核通过,在下方填写审核说明</el-tag>
                </div>
                <el-form-item label="审核说明" prop="nodes" label-width="30%" style="padding:0 30px;">
					<el-input type="textarea" v-model="editeData.nodes" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editeModalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="delSubmit">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import myPagination from '../../components/myPagination'
    import { getEnterprisesList , auithcertification} from '@/api/coreApi'
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
                    formatter : (row,column) => row.activated === 'T' ? "已激活" : "未激活"
                    },{
                    label : '地址',
                    prop  : 'address',
                    sortable : true,
                    minWidth : 200
                    },{
                    label : '联系人',
                    prop  : 'contacts',
                    sortable : true,
                    },{
                    label : '联系方式',
                    prop  : 'contactsNumber',
                    sortable : true,
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
                    activated : '',
                    auditState : 'B',
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
                //搜索条件的个数
                criteriaNum : 2,

                //模态框
                editeModalVisible : false,
                editeData : {
                    nodes : '',
                },
                rowId : '',
                rowType : 'T',
                editRules : {
                    nodes : [
						{ required: true, message: '请输入审核说明' }
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
                const resp = await getEnterprisesList(params);
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

            check (index,row){
                this.$router.push({path: this.$route.path + '/detail/' + row.id})
            },
            del (id,type) {
                this.editeModalVisible = true;
                this.rowId = id;
                this.auditState = type
            },
            delSubmit (){
                this.$refs['editeData'].validate( async (valid) => {
                        if(valid){
                            try{
                                console.log(this.rowId,this.auditState,this.editeData.nodes)
                                const resp = await auithcertification(this.rowId,this.auditState,this.editeData.nodes);
                                if(resp.status === 200){
                                    const msg = decodeURIComponent(resp.headers.get('x-hpx-alert'))
                                    this.$message({
                                        type:'success',
                                        message:msg
                                    })
                                    this.editeModalVisible = false;
                                }
                            }catch(e){
                                this.$message.error(e)
                            }
                        }
                    }
                )
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
