<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--搜索条件-->
        <section class='search-criteria-container'>
            <el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="4">
                        <el-form-item prop="modelName">
                            <el-input v-model="query.modelName" placeholder="模型名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="dateRange">
                            <el-date-picker
                                v-model="query.dateRange"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                range-separator="~"
                                @change="datePick"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="enabledState">
                            <el-select v-model="query.enabledState" placeholder="启用状态">
                                <el-option
                                    v-for="item in status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="industryId">
                            <el-select v-model="query.industryId" placeholder="行业">
                                <el-option
                                    v-for="item in industryList"
                                    :key="item.id"
                                    :label="item.industryName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     
                    <el-col :span="6" style="text-align:right;">
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="plus" type="primary" @click="add()">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
			</el-form>
        </section>

        <!--模型列表-->
        <section class="main-table-container">
            <el-table
                row-key="id"
                border
                :empty-text="emptyText"
                :data="tableList"
                v-loading="listLoading"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="100"
                  align="center">
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
                    align="center"
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="check(scope.$index, scope.row)" >查看</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="abled(scope.$index, scope.row)" >{{scope.row.gradeCardState==="1" ? "启用" : "禁用"}}</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <section class="main-pagination">
                <my-Pagination :callback="getList" :total="total">
                </my-Pagination>
            </section>
        </section>

    </div>
</template>

<script>
import headTop from '@/components/headTop'
import myPagination from '@/components/myPagination'
import { modelList, modelCheck, modelDel, modelAdd, modelEnabled, modelEdit, industryList } from '@/api/riskApi'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
    data(){
        this.format = 'YYYY-MM-DD';
        this.status = [
            {
                label:'已禁用',
                value:'0'
            },{
                label:'已启用',
                value:'1'
            }
        ];
        return {
            columns : [{
                    label : '名称',
                    prop  : 'gradeCardName',
                    },{
                    label : '行业',
                    prop  : 'industryid',
                    },{
                    label : '创建时间',
                    prop  : 'addTime',
                    formatter : (row,column) => moment(row.addTime).format(this.format)
                    },{
                    label : '状态',
                    prop  : 'gradeCardState',
                    formatter : (row,column) => row.gradeCardState === '0' ? '启用' : '禁用'
                    }],
            // 模型总数
            total : 0,
            // table
            tableList: [],
            listLoading:false,
            emptyText:"暂无数据",

            // search params
            industryList:[],
            query: {
                modelName: '',
                enabledState:'',
                industryId:'',
                dateRange: '',
                startTime : '',
                endTime:'',
            },
            // 搜索条件个数
            criteriaNum: 4,

            // 模态框
        }
    },
    components: {
        headTop,
        myPagination,
    },
    created() {
        this.initData();
        this.getIndustry();
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    methods: {
        async getIndustry () {
             const resp = await industryList();
             const res = await resp.json();
             this.industryList = [...res];
        },
        async initData () {
            this.getList();
        },
        async getList(pagination={page:1,size:10}){
            this.listLoading = true;
            try{
                const params = Object.assign({},pagination, this.query);
                const resp = await modelList(this.loginInfo.enterpriseId,params);
                const res = await resp.json();
                const total = resp.headers.get('x-total-count')
                this.tableList = [...res];
                this.total = parseInt(total);
                this.listLoading = false;
                if(!this.tableList.length){
                    this.emptyText = "暂无数据";
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
        datePick(value){
                if(value){
                    let dateArr = value.split('~');
                    this.query.startTime = dateArr[0];
                    this.query.endTime = dateArr[1];
                }else{
                    this.query.startTime = '';
                    this.query.endTime = '';
                }
            },
        check (index,row){
            this.$router.push({path: this.$route.path + '/check/' + row.id})
        },
        async del(row) {
            try{
                const resp = await modelDel(row.id, this.loginInfo.enterpriseId);
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
                this.getList();
            }catch(e) {
                this.$message.error('删除失败！')
            }
        },
        async abled(index, row) {
            try{
                const resp = await modelEnabled(row.id, this.loginInfo.enterpriseId);
                this.$message({
                    message: '修改状态成功！',
                    type: 'success'
                });
                this.getList();
            }catch(e) {
                this.$message.error('修改状态失败！')
            }
        },
        edite (index,row) {
            this.editeData = Object.assign({},{...row})
            this.$router.push({path: this.$route.path + '/detail/' + row.id})
        },
        add () {
            this.$router.push({path: this.$route.path + '/detail'})
        },
    }
}
</script>

<style>
 /*@import '../../style/mixin';
    .table_container{
        padding: 20px;
    }*/
</style>
