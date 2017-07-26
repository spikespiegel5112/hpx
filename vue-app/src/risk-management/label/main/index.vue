<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="标签名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="labelState">
                            <el-select v-model="query.labelState" size="large" placeholder="标签状态">
                                <el-option
                                    v-for="item in status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item prop="dateRange">
                            <el-date-picker
                                size="large"
                                v-model="query.dateRange"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                range-separator="~"
                                :picker-options="{disabledDate}"
                                @change="datePick"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="6 * (3 - (criteriaNum % 4))" style="text-align:right;">
                        <el-button type="primary" icon="search" @click="search">查询</el-button>
                        <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        <router-link :to="`${$route.path}/detail/add`" style="margin-left:8px;">
                            <el-button icon="plus" type="primary">新增</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="24" style="text-align:right;margin-bottom:12px;">
                        <el-button type='info' icon="caret-top" @click="modalVisible = true">导入标签</el-button>
                        <el-button type='info' icon="caret-bottom" @click="loadModule">下载导入模板</el-button> 
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
                    :sortable="value.sortable"
                    :width="value.width ? value.width : 'auto'"
                    :formatter="value.formatter"
                    :min-width="value.minWidth ? value.minWidth : 'auto'"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="check(scope.$index, scope.row)" >查看</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="check(scope.$index, scope.row)" >禁用</el-button>
                        <el-button type="text" size="small" @click="remove(scope.row.id)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <section class="main-pagination">
                <my-Pagination :callback="getList" :total="total">
                </my-Pagination>
            </section>
        </section>
        <!--上传弹窗-->
		<el-dialog custom-class="up-modal" title="编辑" v-model="modalVisible" :close-on-click-modal="false">
			<el-form :model="upInfo" label-width="80px" :rules="editRules" ref="upInfo">
                <el-form-item label="标签名称" prop="id">
					<el-input v-model="upInfo.id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="导入说明" prop="name">
					<el-input v-model="upInfo.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="上传文件" prop="name">
					<el-upload
                        action=""
                    >
                        <el-button size="small" icon="upload2" type="primary">点击上传</el-button>
                    </el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="modalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { labelList ,labelDelete } from '@/api/riskApi'
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
            // 限制时间
            this.disabledDate = (time) => {
                return time.getTime() > Date.now();
            };
            return {
                //table columns
                columns : [{
                    label : '名称',
                    prop  : 'scoreCardName',
                    },{
                    label : '创建人ID',
                    prop  : 'addUserid',
                    sortable : true,
                    },{
                    label : '创建时间',
                    prop  : 'addTime',
                    sortable : true,
                    formatter : (row,column) => moment(row.addTime).format(this.format)
                    },{
                    label : '状态',
                    prop  : 'labelState',
                    sortable : true,
                    formatter : (row,column) => row.labelState === '0' ? '已禁用' : '已启用'
                    }
                ],
                //总页数
                total : 0,
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    name : '',
                    labelState : '',
                    dateRange : '',
                    startTime : '',
                    endTime:'',
                    uid:''
                },
                //搜索条件的个数
                criteriaNum : 3,

                //模态框
                modalVisible : false,
                upInfo : {
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
            this.initData();
        },
        computed : {
            ...mapState(["loginInfo"])
        },
        methods: {
            async initData(){
                this.getList();
            },
            async getList(pagination={page:1,size:10}){
                this.listLoading = true;
                try{
                    const params = Object.assign({},this.query,pagination);
                    const resp = await labelList(this.loginInfo.enterpriseId,params);
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
                this.$refs[formName].resetFields(

                );
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
                this.$router.push({path: this.$route.path + '/detail/' + row.id})
            },
            edite (index,row) {
                this.modalVisible = true;
                this.upInfo = Object.assign({},{...row})
            },
            loadModule(){

            },
            async remove(id){
                try{
                    const resp = await labelDelete(this.loginInfo.enterpriseId,id)
                    if(resp.status === 200){
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        });
                        this.getList()
                    }
                }catch(e){
                    this.$message.error(e)
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../style/mixin';

</style>
