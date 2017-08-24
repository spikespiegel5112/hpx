<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                    <el-form-item prop="custNo">
                        <el-input v-model="query.custNo" placeholder="会员号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="search" @click="search">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                    </el-form-item>
			</el-form>
		</el-col>
        </section>

        <section class="main-table-container">
            <el-table
                border
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
                    :sortable="value.sortable"
                    :width="value.width ? value.width : 'auto'"
                    :formatter="value.formatter"
                    :min-width="value.minWidth ? value.minWidth : 'auto'"
                >
                </el-table-column>
                <el-table-column label="账户状态" prop="status" :width="100">
                    <template scope="scope">
                        <el-tag v-show="scope.row.status === '0'" type="">未开通</el-tag>
                        <el-tag v-show="scope.row.status === '1'" type="success">已开通</el-tag>
                        <el-tag v-show="scope.row.status === '2'" type="warning">冻结</el-tag>
                        <el-tag v-show="scope.row.status === '3'" type="gray">待确认</el-tag>
                        <el-tag v-show="scope.row.status === '4'" type="danger">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="账户状态" prop="isLock" :width="100">
                    <template scope="scope">
                        <el-tag v-show="scope.row.isLock === '0'" type="success">正常</el-tag>
                        <el-tag v-show="scope.row.isLock === '1'" type="warning">锁定</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button :type="scope.row.isLock === '0' ? 'danger' : 'default'" size="small" @click="check(scope.$index, scope.row)" >{{scope.row.isLock === '0' ? '锁定' : '解锁'}}</el-button>
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
    import { zxAccountSysList } from '@/api/account-open'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '会员账号',
                    prop  : 'custNo',
                    minWidth : 120
                    },{
                    label : '会员名称',
                    prop  : 'custName',
                    minWidth : 150
                    },{
                    label : '可用金额',
                    prop  : 'kyamt',
                    },{
                    label : '银行类别',
                    prop  : 'bankType',
                    width : 100,
                    formatter: (row, column) => row.bankType === 'ZX' ? '中信银行' : '平安银行'                   
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
                    custNo : '',
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
            // this.initData();
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
            // async initData(){
            //     this.getList();
            // },
            async getList(){
                /*
                ** 分页需改5
                */
                this.listLoading = true;
                try{
                    const params = Object.assign({},this.query,this.pagination);
                    const resp = await zxAccountSysList(params);
                    const res = await resp.json(); 
                    const status = res.responseStatus.code;
                    if(status === '000000'){
                        const total = res.responseValue.data.totalElements;
                        const { content } = res.responseValue.data;
                        this.tableList = [...content];
                        this.total = parseInt(total);
                        this.listLoading = false;
                        if(!this.tableList.length){
                            this.emptyText = "暂无数据";
                        }         
                    }else{
                        this.emptyText = "获取数据失败";
                        this.listLoading = false;
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
