<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
            <el-form :inline="true" :model="query" ref="query">
                <el-form-item label="选择企业" prop="eid">
                    <el-select v-model="query.eid" filterable>
                        <el-option v-for="item in entOptions" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='审批状态' prop="apprStatus">
                    <el-select v-model="query.apprStatus">
                        <el-option v-for="item in apprStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='激活状态' prop="applState">
                    <el-select v-model="query.applState">
                        <el-option v-for="item in applStateOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="search">查询</el-button>
                    <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                </el-form-item>
            </el-form>
            </el-col>
        </section>

        <section class="main-table-container">
            <el-table row-key="id" border :empty-text="emptyText" :data="tableList" v-loading="listLoading" show-overflow-tooltip>
                <el-table-column type="index">
                </el-table-column>
                <el-table-column show-overflow-tooltip v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                </el-table-column>
                <el-table-column label="审批状态" prop="apprStatus" align="center">
                    <template scope="scope">
                        <el-tag v-show="scope.row.apprStatus === '0'" type="primary">待审批</el-tag>
                        <el-tag v-show="scope.row.apprStatus === '1'" type="success">已审批</el-tag>
                        <el-tag v-show="scope.row.apprStatus === '2'" type="danger">已拒绝</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="激活状态" prop="applState" align="center"> 
                    <template scope="scope">
                        <el-tag v-show="scope.row.apprStatus !== '2' && scope.row.applState === '1'" type="primary">申请中</el-tag>
                        <el-tag v-show="scope.row.apprStatus === '1' && scope.row.applState === '2'" type="success">已开通</el-tag>
                        <el-tag v-show="scope.row.apprStatus === '1' && scope.row.applState === '3'" type="success">已完成</el-tag>
                        <el-tag v-show="scope.row.apprStatus == '2'">拒绝</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template scope="scope">
                        <el-button type="default" v-if="scope.row.apprStatus === '0'" size="small" @click="approval(scope.$index,scope.row,'1')">审批</el-button>
                        <el-button type="default" v-if="scope.row.apprStatus === '0'" size="small" @click="approval(scope.$index,scope.row,'2')">拒绝</el-button>
                        <el-button type="info" v-if="scope.row.applState === '1' && scope.row.apprStatus === '1'" size="small" @click="lineOpen(scope.row.id,scope.row.enterpriseId)">开通</el-button>
                        <el-button type="info" v-if="scope.row.applState === '2'" size="small" @click="toBind(scope.row.id,scope.row.enterpriseId)">绑定</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import myPagination from '@/components/myPagination'
import { getEnterprisesList } from '@/api/coreApi'
import { applyedAccountsList, approvalAccount } from '@/api/account-open'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            //table columns
            columns: [{
                label: '企业',
                prop: 'enterpriseId',
                formatter: (row, column) => {
                    const ent = this.entOptions.find((value, key) => row.enterpriseId == value.id);
                    return ent ? ent.name : 'WTF'
                }
            }, {
                label: '实体账号名称',
                prop: 'stAccountName',
            }, {
                label: '实体账号',
                prop: 'stBankAccount',
                minWidth : 150,
            }, {
                label: '账户体系',
                prop: 'platBankType',
                formatter: (row, column) => row.platBankType === 'ZX' ? '中信银行' : row.platBankType === 'PA' ? '平安银行' : '没有选取'
            }
            ],
            //总页数
            total: 0,
            //分页
            /*
            ** 分页需改1
            */
            pagination: {
                page : 1,
                size : 10
            },
            //table
            tableList: [],
            listLoading: false,
            emptyText: "暂无数据",

            //search params
            query: {
                eid: '',
                apprStatus: '',
            },
            entOptions: [],
            apprStatusOptions: [
                {
                    label: '已审核',
                    value: '1'
                },
                {
                    label: '待审核',
                    value: '0'
                }
            ],
            applStateOptions: [
                {
                    label: '已开通',
                    value: '0'
                },
                {
                    label: '申请中',
                    value: '1'
                },
                {
                    label: '删除',
                    value: 'd'
                }
            ],


        }
    },
    components: {
        headTop,
        myPagination,
    },
    created() {
        this.getEntList();
    },
    activated(){
        this.getList();
    },
    mounted() {

    },
    computed: {
        ...mapState(["loginInfo"])
    },
    methods: {
        /*
        ** 分页需改2
        */
        pageChange(data) {
            this.pagination = data;
        },
        // async initData(){
        //     this.getList();
        // },
        // 获取 企业
        async getEntList() {
            const params = {
                size: 100000,
                page: 1
            }
            const resp = await getEnterprisesList(params);
            const res = await resp.json();
            this.entOptions = res;

        },

        async getList() {
            /*
            ** 分页需改5
            */
            this.listLoading = true;
            try {
                const params = Object.assign({}, this.query, this.pagination);
                const resp = await applyedAccountsList(params);
                const res = await resp.json();
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

        approval(index,row,type) {
            const title = type === '1' ? '通过' : '拒绝'
            this.$prompt('请输入审批意见', '审批', {
                confirmButtonText: title,
                cancelButtonText: '取消',
                inputValidator:function(value){
                    if(!value){
                        return false
                    }else{
                        return true;
                    }
                },
                inputErrorMessage: '请输入审批意见'
            }).then( async ({ value }) => {
                try{
                    const resp = await approvalAccount(row.enterpriseId,row.id,{apprMemo : value,apprStatus : type});
                    if(resp.status === 200){
                        this.tableList[index].apprStatus = type;
                        this.$message.success('操作成功')
                    }
                }catch(e){
                    this.$message.error(e);
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },

        lineOpen(accountId,eid) {
            this.$router.push({ path: `${this.$route.path}/apply/${accountId}/${eid}` })
        },
        toBind(accountId,eid) {
            this.$router.push({ path: `${this.$route.path}/apply/${accountId}/${eid}/bind` })
        },
    },
    /*
    ** 分页需改3
    */
    watch: {
        pagination: {
            handler: function () {
                this.getList();
            },
        }
    }
}
</script>

<style lang="less">
@import '../../style/mixin';
</style>
