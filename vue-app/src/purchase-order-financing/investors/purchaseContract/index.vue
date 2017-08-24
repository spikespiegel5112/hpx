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
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="primary" :disabled="uploadBtn"  @click="signature">签章</el-button>
            <el-button type="primary" :disabled="uploadBtn" >预览</el-button>
            <el-button type="primary" :disabled="uploadBtn"  @click="receipt">确认收货</el-button>
            <el-upload
                :action="uploadContractUrl()"
                list-type="picture"
                accept="image/gif, image/jpeg, image/png, image/jpg"
                :on-change="(file,filesList)=>filesChange(selectContractList[0].index,file,filesList)"
                :on-remove="()=>removeFile(selectContractList[0].index)">
                <el-button :disabled="uploadBtn" type="primary">上传合同</el-button>
            </el-upload>
        </section>
        <!--合同列表-->
        <section class="main-table-container">
            <el-table  @selection-change="handleSelectionChange" row-key="id" max-height="250" border :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="合同名称"></el-table-column>
                <el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                </el-table-column>
                <el-table-column label="文件" align="center" prop="webPath" min-width="120px">
                    <template scope="scope">
                        <upload-pic
                            v-show="scope.row.thumbUrl"
                            :index="scope.$index" 
                            :thumbUrl="scope.row.thumbUrl" 
                            :name="scope.row.fileName"
                            :removeFile="removeFile"
                        >
                        </upload-pic>
                        <!--<el-button v-if="scope.row.fileId" type="text" @click="clickLoad(scope.row.fileId)">点击下载查看</el-button>-->
                    </template>
                </el-table-column> 
                <!--<el-table-column label="操作" align="center" class-name="acc-action-upload"> 
                    <template scope="scope">
                         <el-upload
                            v-if="allEdite"
                            :action="uploadContractUrl(scope.row.id)"
                            list-type="picture"
                            :auto-upload="false"
                            accept="image/gif, image/jpeg, image/png, image/jpg"
                            :on-change="(file,filesList)=>filesChange(scope.$index,file,filesList)"
                            :on-remove="()=>removeFile(scope.$index)"
                        >
                            <el-button icon="upload" type="primary" size="small">上传文件</el-button>
                         </el-upload>
                         <div v-else>
                             {{scope.row.id ? "已经上传" : "未上传"}}
                         </div>
                    </template>
                </el-table-column>-->
            </el-table>
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>
    </div>
</template>

<script>
import headTop from '../../../components/headTop'
import myPagination from '../../../components/myPagination'
import { getPurchaseContractList, roleList, uploadContract } from '@/api/orderApi'
import { filesTypes , uploadAction ,loadUrl} from '@/api/publicApi'
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
                    formatter: (row, column) => row.createtime != null ? moment(row.createtime).format('YYYY-MM-DD') :""
                }, {
                    label: '收货时间',
                    prop: 'receivingDate',
                    formatter: (row, column) => row.receivingDate != null ? moment(row.receivingDate).format('YYYY-MM-DD') :""
                }, 
                // {
                //     label: '文件',
                //     prop: 'fileId',
                // }
            ],
            //总页数
            total: 0,
            pagination: {},

            excelList: [],
            //table
            tableList: [],
            supplierList: [],
            selectContractList: [{
                id:'',
                index: ''
            }],
            listLoading: false,
            emptyText: "暂无数据",

            //search params
            query: {
                code: '',
                firstParty: '',
            },
            //搜索条件的个数
            criteriaNum: 3,
           uploadBtn : true,
        }
    },
    components: {
        headTop,
        myPagination,
    },
    activated() {
        this.initData();
    },
    computed: {
        ...mapState(["loginInfo","projectId"]),
        allEdite(){
            // return !this.accStatusInfo.authenticateStatus || this.accStatusInfo.authenticateStatus === 'F' ? true : false;
        }
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
                const params = Object.assign({}, this.query, this.pagination);
                const resp = await getPurchaseContractList(params);
                const res = await resp.json();
                for(let i = 0,len = res.length; i < len ; i++){
                    res[i].fileName = '';
                    res[i].fileLength = '';
                    res[i].thumbUrl = '';
                    res[i].index = i;
                    res[i].receivingStatus = res[i].receivingStatus === "0" ? '未收货' : '已收货'; 
                };
                const param = Object.assign({enterpriseRole:'PRO_ENT_TYPE_SUPPLIER',state:'T'});
                const result = await roleList(this.projectId,param);
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

        handleSelectionChange(val) {
            this.selectContractList = val;
            if(this.selectContractList.length != 1){
                this.uploadBtn = true;
            } else {
                this.uploadBtn = false;
                if(this.selectContractList[0].differenceStatus === '1') {
                    this.uploadBtn = true;
                }
            }
        },

        // 签章
        signature() {
            const id = this.selectContractList[0].id;
            this.$router.push({ path: this.$route.path + '/signature/' + id})
        },

        check(index, row) {
            this.$router.push({ path: this.$route.path + '/detail/' + row.id });
        },
        receipt() {
            const id = this.selectContractList[0].id;
            this.$router.push({ path: this.$route.path + '/receipt/' + id })
        },
       
        clickLoad(fileId){
            window.location.href = loadUrl(fileId);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
