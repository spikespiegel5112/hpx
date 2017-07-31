<template>
    <div class="fillcontain">
        <head-top></head-top>

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" placeholder="标签名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="labelState">
                            <el-select v-model="query.labelState" placeholder="标签状态">
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
                        <el-button type='info' icon="caret-top" @click="modalShow">导入标签</el-button>
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
                        <el-button type="text" size="small" @click="check(scope.row.id)">查看</el-button>
                        <el-button type="text" size="small" @click="edite(scope.row.id)">编辑</el-button>
                        <el-button type="text" size="small" @click="deal(scope.$index,scope.row.id,scope.row.labelState)">{{scope.row.labelState === '0'? '启用' : '禁用'}}</el-button>
                        <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <section class="main-pagination">
                <my-Pagination :total="total" @pageChange="pageChange">
                </my-Pagination>
            </section>
        </section>
        <!--上传弹窗-->
		<el-dialog custom-class="label-import-modal" title="编辑" v-model="modalVisible" :close-on-click-modal="false">
			<el-form :model="upInfo" label-width="80px" :rules="editRules" ref="upInfo">
                <el-form-item label="标签名称" prop="name">
					<el-input v-model="upInfo.name" auto-complete="on"></el-input>
				</el-form-item>
				<el-form-item label="导入说明" prop="describe">
					<el-input v-model="upInfo.describe" auto-complete="on"></el-input>
				</el-form-item>
                <el-form-item label="上传文件" prop="excelPath">
					<el-upload
                        :action="excelAction"
                        :file-list="excelList"
                        :on-change="excelChange"
                        :before-upload="excelBefore"
                        :on-success="excelSuccess"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    >
                        <el-button size="small" icon="upload2" type="primary">点击上传</el-button>
                    </el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="modalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="importLabel">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { labelList ,labelDelete , labelImport , labelImportSubmit , labelStatusAction } from '@/api/riskApi'
    import { loadUrl } from '@/api/publicApi'
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
                //分页 设置接收
                pagination : {
                    // page: 1, //当前页
                    // size: 1,//每页个数
                },
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
                    name : '',
                    describe:'',
                    excelPath:'',
                },
                excelList : [],
                editRules : {
                    name : [
						{ required: true, message: '请输入标签名称'}
                    ],
                    excelPath :[
                        { required: true, message: '未上传EXCEL文件'}
                    ]
                }
            }
        },
    	components: {
            headTop,
            myPagination,
    	},
        activated(){
            this.initData();
        },
        computed : {
            ...mapState(["loginInfo"]),
            excelData(){
                return {
                    // id:this.labelId,
                    eid:this.loginInfo.enterpriseId
                }
            },
            excelAction(){
                return labelImport();
            }
        },
        methods: {
            pageChange(data){
                this.pagination = data;
            },
            async initData(){
                this.getList();
            },
            async getList(){
                this.listLoading = true;
                try{
                    const params = Object.assign({},this.query,this.pagination);
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
            modalShow(){
                this.upInfo = {
                    name : '',
                    describe:'',
                    excelPath:''
                };
                this.modalVisible = true;
            },
            check (id){
                this.$router.push({path: this.$route.path + '/detail/check_' + id})
            },
            edite (id) {
                this.$router.push({path: this.$route.path + '/detail/edite_' + id})
            },
            async deal(index,id,type){
                try{
                    const resp = await labelStatusAction(this.loginInfo.enterpriseId,id);
                    if(resp.status === 200){
                        this.$message({
                            type : 'success',
                            message:'操作成功'
                        });
                        if(type === '0'){
                            this.tableList[index].labelState = '1'
                        }else{
                            this.tableList[index].labelState = '0'
                        }
                        
                    }
                }catch(e){
                    this.$message.error(e)
                }
            },  
            loadModule(){
                window.location.href = loadUrl('labelExcelId')
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
            },
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
                console.log(response)
                this.excelPath = response
                this.$message({
                    type : 'success',
                    message : '上传成功'
                })
            },
            importLabel(){
                this.$refs['upInfo'].validate(
                    async (valid) => {
                        if(valid){
                            try{
                                const resp = await labelImportSubmit(this.loginInfo.enterpriseId,this.upInfo)
                            }catch(e){
                                this.$message.error(e)
                            }
                        }
                    }
                )
            }
        },
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

<style lang="less" scoped>
    @import '../../../style/mixin';

</style>
