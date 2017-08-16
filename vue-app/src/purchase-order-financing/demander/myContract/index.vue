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
                        <el-form-item prop="secondPartyId">
                            <el-select v-model="query.secondPartyId" size="large" placeholder="选择资方">
                                <el-option v-for="item in capitalList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="primary" @click="signature">签章</el-button>
            <el-button type="primary" >预览</el-button>
            <el-button type="primary" @click="uploadContract">上传文件</el-button>
            <el-button type="primary" >提货</el-button>
            <el-button type="primary" @click="selectfinancingDetail">查看融资详情</el-button>
        </section>

        <section class="main-table-container">
            <el-table @selection-change="handleSelectionChange" row-key="id" max-height="250" border :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
                <el-table-column type="selection"></el-table-column>
                <el-table-column 
                v-for="(value,i) in columns" 
                :key="i" 
                :label="value.label" 
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
import { getMyContractList, uploadContract,roleList,getFinancingDetail} from '@/api/orderApi'
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
                    label: '合同名称',
                    prop: 'name',
                },{
                    label: '订单编号',
                    prop: 'orderCode',
                }, {
                    label: '资方',
                    prop: 'secondParty',
                }, {
                    label: '合同金额',
                    prop: 'money',
                }, {
                    label: '合同状态',
                    prop: 'fSignatureStatus',
                    formatter : (row,column) => row.fSignatureStatus === '0' ? "待签章" :
                    row.fSignatureStatus === '1' ?"已签章" :""
                }, {
                    label: '收货状态',
                    prop: 'receivingStatus',
                    formatter : (row,column) => row.receivingStatus === '0' ? "待收货" :
                    row.receivingStatus === '1' ?"已收货" :""
                },{
                    label: '创建时间',
                    prop: 'createtime',
                    formatter: (row, column) => row.createtime != null ? moment(row.createtime).format('YYYY-MM-DD') :""
                }, {
                    label: '提货期限',
                    prop: 'deliveryDeadline',
                }, {
                    label: '融资状态',
                    prop: 'financingStatus',
                     formatter : (row,column) => row.financingStatus === '0' ? "正常" :
                    row.financingStatus === '1' ?"逾期" :row.financingStatus === '2' ?"待处置" :
                    row.financingStatus === '3' ?"已处置" :""
                },{
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
            capitalList: [],
            selectContractList: [],
            listLoading: false,
            emptyText: "暂无数据",

            //search params
            query: {
                code: '',
                secondPartyId: '',
            },

            //模态框
            FinancingDetailVisible : false,
            financingDetail :{
                delivery_money: '',
                principal: '',
                not_principal: '',
                projected_cost: '',
                inventory_total_money: '',
                price_limit: '',
                current_value: ''
            },
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
                const params = Object.assign({enterpriseRole:'PRO_ENT_TYPE_DEALER'}, this.query, this.pagination);
                const resp = await getMyContractList(params);
                const res = await resp.json();
                
                const param = Object.assign({enterpriseRole:'PRO_ENT_TYPE_INVESTOR',state:'T'});
                const result = await roleList(this.projectId,param);
                const resu = await result.json();
                let temp = [];
                resu.forEach((v) =>{
                    temp.push({label: v.enterpriseName, value: v.enterpriseId });
                })
                this.capitalList = temp;

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

        // 上传合同
        uploadContract() {
            console.log("上传")
            if(this.selectContractList.length > 1) {
                this.$message.error("只能选择一个合同上传文件");
                return;
            }
            const id = this.selectContractList[0].id;
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

        edite(index, row) {
            this.editeModalVisible = true;
            this.editeData = Object.assign({}, { ...row })
        },
        filesChange(index,file,filesList){
            console.log(file,filesList,index)
            this.tableList[index].fileName = file.name;
            this.tableList[index].fileLength = file.size;
            this.tableList[index].thumbUrl = file.url; 
        },
        removeFile(index){
            this.tableList[index].fileName = '';
            this.tableList[index].fileLength = '';
            this.tableList[index].thumbUrl = ''; 
        },
        clickLoad(fileId){
            window.location.href = loadUrl(fileId);
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

        handleSelectionChange(val) {
        //    console.log("选取数据", val);
            this.selectContractList = val;
        },
        async search () {
                this.getList();
        },

        resetForm(formName) {
             this.$refs[formName].resetFields();
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
