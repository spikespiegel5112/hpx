<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="description">
                            <el-input v-model="query.description" size="large" placeholder="品名"></el-input>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="6">
                        <el-form-item prop="offerDate">
                            <el-date-picker v-model="query.offerDate" type="daterange" placeholder="报价日期范围"></el-date-picker>
                        </el-form-item>
                    </el-col>-->
                    <el-col :span="6">
                        <el-form-item prop="orgId">
                            <el-select v-model="query.orgId" size="large" placeholder="选择资方">
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
            </el-table>
           <!-- 
            分页需改4
            -->
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>

    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import {productList,addProduct,deleteProduct,roleList} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '品名',
                    prop  : 'description',
                    },{
                    label : '规格',
                    prop  : 'specification',
                    },{
                    label : '型号',
                    prop  : 'model',
                    },{
                    label : '计量单位',
                    prop  : 'unit',
                    },{
                    label : '单价',
                    prop  : 'univalence',
                    },{
                    label : '报价日期',
                    prop  : 'offerDate',
                    formatter : (row,column) => row.offerDate == null ? "" :moment(row.offerDate).format('YYYY-MM-DD')
                    },{
                    label : '备注',
                    prop  : 'remark',
                    }
                ],
                //总页数
                total : 0,
                //分页
                pagination : {},
                //table
                tableList: [],
                capitalList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    description : '',
                    orgId : '',
                    // offerDate : [],
                    // startTime : '',
                    // endTime : ''
                },
            }
        },
    	components: {
            headTop,
            myPagination,
    	},
        created(){
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
            async getList(){
                /*
                ** 分页需改5
                */
                this.listLoading = true;
                try{
                    console.log(this.query)
                    const params = Object.assign({},this.query,this.pagination);
                    const resp = await productList(params);
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
    // @import '../../style/mixin';

</style>
