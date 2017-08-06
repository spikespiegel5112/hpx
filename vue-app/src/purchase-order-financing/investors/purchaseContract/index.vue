<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
            <el-form :inline="true" :model="query" ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="code">
                            <el-input v-model="query.code" size="large" placeholder="合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="firstParty">
                            <el-select v-model="query.firstParty" size="large" placeholder="选择供应商">
                                <el-option v-for="item in supplierList" :key="item.value" :label="item.value" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="6 * (3 - (criteriaNum % 4))">
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            </el-col>
        </section>

        <section class="main-table-container">
            <el-table row-key="id" max-height="250" border :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
                <el-table-column fixed prop="name" label="合同名称"></el-table-column>
                <el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                </el-table-column>
                <el-table-column fixed="right" width="238" label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="signature(scope.$index, scope.row)" >签章</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">预览</el-button>
                        <el-button type="text" size="small" @click="receipt(scope.$index, scope.row)">确认收货</el-button>
                        <!--<el-button type="text" size="small" @click="uploadContract(scope.$index, scope.row)">上传合同</el-button>-->
                         <!--action="/order/contract/uploadingContract/"+{scope.row.id}-->
                        <el-upload
                            :action="`/order/contract/uploadingContract/${scope.row.id}`"
                            :file-list="excelList"
                            :on-change="excelChange"
                            :before-upload="excelBefore"
                            :on-success="excelSuccess"
                        >
                        <el-button size="small" type="text">上传合同</el-button>
                    </el-upload>
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
                <!--<el-form-item label='激活状态' prop="activated">
                    <el-select v-model="editeData.activated">
                        <el-option v-for="item in activatedOptions" :key="item.activated" :label="item.value" :value="item.activated">
                        </el-option>
                    </el-select>
                </el-form-item>-->
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
import headTop from '../../../components/headTop'
import myPagination from '../../../components/myPagination'
import { getPurchaseContractList, getSupplierList, uploadContract } from '@/api/orderApi'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            //table columns
            columns: [{
                    label: '合同编号',
                    prop: 'code',
                }, {
                    label: '订单编号',
                    prop: 'orderCode',
                }, {
                    label: '供应商',
                    prop: 'firstParty',
                }, {
                    label: '合同金额',
                    prop: 'money',
                }, {
                    label: '收货状态',
                    prop: 'receivingStatus',
                }, {
                    label: '创建时间',
                    prop: 'createTime',
                    formatter: (row, column) => moment(column.createTime).format('YYYY-MM-DD')
                }, {
                    label: '收货日期',
                    prop: 'receivingDate',
                    formatter: (row, column) => moment(column.receivingDate).format('YYYY-MM-DD')
                }, {
                    label: '文件',
                    prop: 'fileId',
                }
            ],
            //总页数
            total: 0,
            //分页
            /*
            ** 分页需改1
            */
            pagination: {},

            excelList: [],
            //table
            tableList: [],
            supplierList: [],
            listLoading: false,
            emptyText: "暂无数据",

            //search params
            query: {
                code: '',
                firstParty: '',
            },
            auditStateOptions: [
                {
                    value: '已认证',
                    auditState: 'T'
                },
                {
                    value: '未认证',
                    auditState: 'F'
                }
            ],
            //搜索条件的个数
            criteriaNum: 3,

            //模态框
            editeModalVisible: false,
            editeData: {
                id: '',
                name: '',
                activated: '',
                address: '',
                contactsNumber: '',
                birth: ''
            },
            editRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        headTop,
        myPagination,
    },
    created() {
        // this.initData();
    },
    mounted() {

    },
    computed: {
        ...mapState(["loginInfo"]),
        // excelAction(){
        //     return uploadContract();
        // }
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
        async getList() {
            /*
            ** 分页需改5
            */
            this.listLoading = true;
            try {
                const params = Object.assign({}, this.query, this.pagination);
                const resp = await getPurchaseContractList(params);
                const res = await resp.json();
                const result = await getSupplierList(2);
                const resu = await result.json();
                let temp = [];
                resu.forEach((v) =>{
                    temp.push({label: v.enterpriseName, value: v.enterpriseName });
                })
                this.supplierList = temp;
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

        // 上传合同
        excelChange(file,list){
                this.excelList = list;
            },
        excelBefore(){
                if(this.excelList.length > 1){
                    this.$message({
                        type:'info',
                        message:'每次只能上传一个 '
                    });
                    return false;
                }
            },
        excelSuccess(response){
                this.excelPath = response
                this.$message({
                    type : 'success',
                    message : '上传成功'
                })
            },

        handleSelectionChange(val) {
            // this.multipleSelection = val;
        },
        signature(index, row) {
            this.$router.push({ path: this.$route.path + '/signature/' + row.id})
        },

        check(index, row) {
            this.$router.push({ path: this.$route.path + '/detail/' + row.id })
        },
        edite(index, row) {
            this.editeModalVisible = true;
            this.editeData = Object.assign({}, { ...row })
        },
        receipt(index, row) {
             this.$router.push({ path: this.$route.path + '/receipt/' + row.id })
        }
    },
    /*
    ** 分页需改3
    */
    watch: {
        pagination: {
            handler: function () {
                this.getList();
            },
            deep: true,
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../style/mixin';
.el-table .cell, .el-table th>div {
    padding: 0 10px;
}
</style>
