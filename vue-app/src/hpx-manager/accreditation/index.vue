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
                  type="index">
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
                    :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column label="操作" min-width="100" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small">
                            <router-link :to="`/manager/etpde/${scope.row.id}`">查看</router-link>
                        </el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id,'T')" >通过</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id, 'E')">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>
        <!--编辑界面-->
		<el-dialog title="审核" v-model="editeModalVisible" size="small" :close-on-click-modal="false">
			<el-form :model="editeData" label-width="80px" :rules="editRules" ref="editeData">
                <div style="margin:20px 0;">
                    <el-tag type="primary">请确定企业资料审核通过,在下方填写审核说明</el-tag>
                </div>
                <el-form-item v-show="auditState === 'T'" label="输入金额" prop="amount">
					<el-input v-model="editeData.amount"></el-input>
				</el-form-item>
                <el-form-item label="审核说明" prop="nodes">
					<el-input type="textarea" v-model="editeData.nodes"></el-input>
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
                    },{
                    label : '企业名称',
                    prop  : 'name',
                    minWidth : 120,
                    },{
                    label : '企业状态',
                    prop  : 'activated',
                    sortable : true,
                    formatter : (row,column) => row.activated === 'T' ? "已激活" : "未激活"
                    },{
                    label : '地址',
                    prop  : 'address',
                    minWidth : 150
                    },{
                    label : '联系人',
                    prop  : 'contacts',
                    },{
                    label : '联系方式',
                    prop  : 'contactsNumber',
                    minWidth : 100
                    }
                ],
                //总页数
                total : 0,
                pagination:{},
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    name : '',
                    activated : '',
                    auditState : 'A',
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
                auditState : '',
                //模态框
                editeModalVisible : false,
                editeData : {
                    nodes : '',
                    amount : '',
                },
                rowId : '',
                rowType : 'T',
                editRules : {
                    nodes : [
						{ required: true, message: '请输入审核说明' }
                    ],
                    amount : [
						{ required: true, message: '请输入账户金额' }
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
                    };
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

            check (index,row){
                this.$router.push({path: this.$route.path + '/detail/' + row.id})
            },
            del (id,type) {
                this.editeData.amount = '';
                this.editeModalVisible = true;
                this.rowId = id;
                this.auditState = type
            },
            delSubmit (){
                if(this.auditState === 'E'){
                    this.editeData.amount = 0;
                };
                this.$refs['editeData'].validate( async (valid) => {
                        if(valid){
                            try{
                                console.log(this.rowId,this.auditState,this.editeData.nodes)
                                const resp = await auithcertification(this.rowId,this.auditState,this.editeData.nodes,this.editeData.amount);
                                if(resp.status === 200){
                                    const msg = decodeURIComponent(resp.headers.get('x-hpx-alert'))
                                    this.$message({
                                        type:'success',
                                        message:msg
                                    })
                                    this.editeModalVisible = false;
                                    this.getList();
                                }
                            }catch(e){
                                this.$message.error(e)
                            }
                        }
                    }
                )
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
