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
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="primary" :disabled="signatureBtn" @click="signature">签章</el-button>
            <el-button type="primary" :disabled="viewBtn" >预览</el-button>
            <!--<el-button type="primary" :disabled="uploadBtn" @click="uploadContract">上传文件</el-button>-->
            <el-button type="primary" :disabled="lookBtn" @click="receiving">查看收货清单</el-button>
            <el-upload
                :action="uploadContractUrl()"
                list-type="picture"
                accept="image/gif, image/jpeg, image/png, image/jpg"
                :on-change="(file,filesList)=>filesChange(selectContractList[0].index,file,filesList)"
                :on-remove="()=>removeFile(selectContractList[0].index)">
                <el-button :disabled="uploadBtn" type="primary">上传合同</el-button>
            </el-upload>
        </section>

        <section class="main-table-container">
            <el-table @selection-change="handleSelectionChange" row-key="id" max-height="250" border :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
                <el-table-column type="selection"></el-table-column>
                <el-table-column  prop="name" label="合同名称"></el-table-column>
                <el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                </el-table-column>
               
            </el-table>
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>
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
                     row.fSignatureStatus === '1' ?"已签章" : ""
                }, {
                    label: '收货状态',
                    prop: 'receivingStatus',
                    formatter : (row,column) => row.receivingStatus === '0' ? "待收货" :
                     row.receivingStatus === '1' ?"已收货" : ""
                },{
                    label: '创建时间',
                    prop: 'createtime',
                    formatter: (row, column) => row.createtime != null ? moment(row.createtime).format('YYYY-MM-DD') :""
                },{
                    label: '文件',
                    prop: 'fileId',
                }
            ],
            //总页数
            total: 0,
            pagination: {},

            excelList: [],
            //table
            tableList: [],
            capitalList: [],
            selectContractList: [{
                id:'',
                index: ''
            }],
            listLoading: false,
            emptyText: "暂无数据",

            //search params
            query: {
                code: '',
                secondPartyId: '',
            },
            uploadBtn: true,
            signatureBtn: true,
            viewBtn: true,
            lookBtn: true
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
    },
    methods: {
        pageChange(data) {
            this.pagination = data;
        },
        async initData(){
            this.getList();
        },
        async getList() {
            this.listLoading = true;
            try {
                const params = Object.assign({enterpriseRole:'PRO_ENT_TYPE_SUPPLIER'}, this.query, this.pagination);
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

        //签章
        signature() {
            const id = this.selectContractList[0].id;
            this.$router.push({ path: this.$route.path + '/signature/' + id})
        },
        clickLoad(fileId){
            window.location.href = loadUrl(fileId);
        },
        async search () {
             this.getList();
        },

        resetForm(formName) {
             this.$refs[formName].resetFields();
        },
        //查看收货清单
        receiving() {
            const id = this.selectContractList[0].id;
            this.$router.push({ path: this.$route.path + '/gf_myContractDetail/' + id})
        },
        handleSelectionChange(val) {
            this.selectContractList = [...val];
            if(this.selectContractList.length != 1){
                    this.uploadBtn = true;
                    this.signatureBtn = true;
                    this.viewBtn = true;
                    this.lookBtn = true;
                } else {
                    this.uploadBtn = false;
                    this.signatureBtn = false;
                    this.viewBtn = false;
                    this.lookBtn = false;
                    if(this.selectContractList[0].fSignatureStatus === '1') {
                        this.signatureBtn = true;
                    }
                }
        },
        uploadContractUrl () {
            const id = this.selectContractList[0].id;
            return `/order/contract/uploadingContract/${id}`;
        },

        filesChange(index,file,filesList){
            this.tableList[index].fileName = file.name;
            this.tableList[index].fileLength = file.size;
            this.tableList[index].thumbUrl = file.url; 
        },
        removeFile(index){
            this.tableList[index].fileName = '';
            this.tableList[index].fileLength = '';
            this.tableList[index].thumbUrl = ''; 
        },
    },
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
