<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="approval">
                            <el-select v-model="query.approval" size="large" placeholder="审批状态">
                                <el-option
                                    v-for="item in approvalOptions"
                                    :key="item.approval"
                                    :label="item.value"
                                    :value="item.approval">
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
                style="width: 100%"
                border>
                <el-table-column
                  label="序号"
                  type="index"
                  width="100">
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
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="check(scope.$index, scope.row)">查看申请说明</el-button>
                        <el-button type="text" size="small" @click="load(scope.row.code)">下载授权书</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="申请说明"
                :visible.sync="dialogVisible"
                size="tiny"
                :before-close="handleClose">
                <span>{{applyContext.length > 0 ? applyContext : '无'}}</span>
            </el-dialog>
            <section class="main-pagination" >
                <my-Pagination :total="total" @pageChange="pageChange">
                </my-Pagination>
            </section>
        </section>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { applyRecordList , auithcertification ,servicesAidth} from '@/api/coreApi'
    import { loadUrl } from '@/api/publicApi'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '服务类型',
                    prop  : 'code',
                    formatter : (row,column) => this.serviceType(row.code,'code')
                    },{
                    label : '审批状态',
                    prop  : 'approval',
                    formatter : (row,column) => this.serviceType(row.approval,'approval')
                    }
                ],
                //总页数
                total : 0,
                pagination : {},
                //table
                dialogVisible: false,
                applyContext: '',
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    enterpriseName : '',
                    approval : '',
                },
                approvalOptions : [
                    {
                        value : '未审核',
                        approval : '0'
                    },{
                        value : '通过',
                        approval : 'P'
                    },{
                        value : '拒绝',
                        approval : 'R'
                    },
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
                },
                noticeHide : ''
            }
        },
    	components: {
            headTop,
            myPagination,
    	},
        created(){

        },
        activated(){
            setTimeout(this.open,1000)
        },
        computed: {
            ...mapState(["loginInfo"]),
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
                    this.listLoading = false;
                    const params = Object.assign({}, this.query, this.pagination);
                    const resp = await applyRecordList(params);
                    const res = await resp.json();
                    const total = resp.headers.get('x-total-count')
                    this.tableList = [...res];
                    this.total = parseInt(total);
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                }catch(e){
                    this.emptyText = "获取数据失败";
                    this.listLoading = false;
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            async search () {
                this.getList();
            },
            //提示信息
            open() {
                 this.noticeHide = this.$notify.info({
                    title: '消息',
                    message: '审核前请先下载授权书检验',
                    duration: 3000,
                    offset: 100
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            serviceType (code,type){
                let view = null;
                if(type === 'code'){
                switch (code){
                    case 'SIGNATUR_OPEN' :
                    view = '签章服务'
                    break;
                    case 'ACCOUNT_OPEN' :
                    view = '线上开户'
                    break;
                    default :
                    view = '未定义类型'
                }
                }else if(type === 'approval'){
                switch (code){
                    case '0' :
                    view = '未审核'
                    break;
                    case 'P' :
                    view = '通过'
                    break;
                    case 'R' :
                    view = '拒绝'
                    break;
                    default:
                    view = 'WTF'
                }
                }
                return view;
            },
            load(id){
                (async () => {
                    try{
                        window.location.href = loadUrl(id);
                        this.$message({
                            type:'success',
                            message : '下载成功'
                        })
                    }catch(e){
                        this.$message.error(e)
                    }
                })()
            },

            check (index,row){
                this.dialogVisible = true;
                this.applyContext = row.context;
            },
        },
        //n路由离开即提示消失
        beforeRouteLeave(to,from,next){
            this.noticeHide.close();
            next();
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
    .el-table__row {
        height: 10px;
    }
</style>
