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
                        <el-form-item prop="demander">
                            <el-select v-model="query.demander" size="large" placeholder="选择需方">
                                <el-option v-for="item in demanderList" :key="item.value" :label="item.value" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="primary" @click="signature">签章</el-button>
            <el-button type="primary" @click="edite">预览</el-button>
            <el-button type="primary" @click="uploadContract">上传文件</el-button>
            <el-button type="primary" @click="selectfinancingDetail">查看融资详情</el-button>
            <el-button type="primary" >已处置</el-button>
        </section>

        <section class="main-table-container">
            <el-table @selection-change="handleSelectionChange" row-key="id"  border :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
                <el-table-column type="selection"></el-table-column>
                <el-table-column 
                v-for="(value,i) in columns" 
                :key="i" :label="value.label" 
                :prop="value.prop" 
                :sortable="value.sortable" 
                :width="value.width ? value.width : 'auto'" 
                :formatter="value.formatter" 
                :min-width="value.minWidth ? value.minWidth : 'auto'">
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

         <!--查看融资详情-->
        <el-dialog title="查看融资详情" v-model="FinancingDetailVisible" :close-on-click-modal="false">
            <el-form :model="financingDetail" label-width="100px" ref="financingDetail">
                <el-form-item label="库存总金额" prop="inventory_total_money">
                    <el-input v-model="financingDetail.inventory_total_money" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="当前货值" prop="current_value">
                    <el-input v-model="financingDetail.current_value" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="涨跌幅" prop="price_limit">
                    <el-input v-model="financingDetail.price_limit" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="已提货金额" prop="delivery_money">
                    <el-input  v-model="financingDetail.delivery_money" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="本金" prop="principal">
                    <el-input v-model="financingDetail.principal" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="未还本金" prop="not_principal">
                    <el-input v-model="financingDetail.not_principal" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="预计收益"  prop="projected_cost">
                    <el-input v-model="financingDetail.projected_cost" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="FinancingDetailVisible = false">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import headTop from '../../../components/headTop'
import myPagination from '../../../components/myPagination'
import { getSalesContractList, uploadContract,roleList,getFinancingDetail} from '@/api/orderApi'
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
                    formatter : (row,column) => row.receivingStatus === '0' ? "待收货" :
                    row.receivingStatus === '1' ?"已收货" :""
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
            demanderList: [],
            selectContractList: [],
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
            FinancingDetailVisible : false,
            editeData: {
                id: '',
                name: '',
                activated: '',
                address: '',
                contactsNumber: '',
                birth: ''
            },
            financingDetail :{
                delivery_money: '',
                principal: '',
                not_principal: '',
                projected_cost: '',
                inventory_total_money: '',
                price_limit: '',
                current_value: ''
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
        ...mapState(["loginInfo","projectId"]),
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
                const resp = await getSalesContractList(params);
                const res = await resp.json();
                

                const param = Object.assign({enterpriseRole:'PRO_ENT_TYPE_DEALER',state:'T'});
                const result = await roleList(this.projectId,param);
                const resu = await result.json();
                let temp = [];
                resu.forEach((v) =>{
                    temp.push({label: v.enterpriseName, value: v.enterpriseName });
                })
                this.demanderList = temp;

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
        uploadContract() {
            console.log("上传")
            if(this.selectContractList.length > 1) {
                this.$message.error("只能选择一个合同上传文件");
                return;
            }
            const id = this.selectContractList[0].id;
        },


         handleSelectionChange(val) {
            console.log("选取数据", val);
            this.selectContractList = val;
        },
        //签章
        signature() {
            if(this.selectContractList.length > 1) {
                this.$message.error("只能选择一个合同进行签章");
                return;
            }
            const id = this.selectContractList[0].id;
            //this.$router.push({ path: this.$route.path + '/signature/' + id})
        },

        //预览
        edite() {
            // this.editeModalVisible = true;
            // this.editeData = Object.assign({}, { ...row })
        },
        //查看融资详情
        async selectfinancingDetail() {
            if(this.selectContractList.length > 1) {
                this.$message.error("只能选择一个合同进行查看融资详情");
                return;
            }
            this.financingDetail = {};
            const id = this.selectContractList[0].id;
            this.FinancingDetailVisible = true;
            const resp = await getFinancingDetail(id);
            const res = await resp.json();
            this.financingDetail = res;
        },
        // uploadActionUrl (code) {
        //     return uploadContract(this.loginInfo.enterpriseId,code)
        // },
        // filesChange(index,file,filesList){
        //     console.log(file,filesList,index)
        //     this.tableList[index].fileName = file.name;
        //     this.tableList[index].fileLength = file.size;
        //     this.tableList[index].thumbUrl = file.url; 
        // },
        // removeFile(index){
        //     this.tableList[index].fileName = '';
        //     this.tableList[index].fileLength = '';
        //     this.tableList[index].thumbUrl = ''; 
        // },
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
