<template>
    <div class="fillcontain">
        <head-top></head-top>

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
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">设置利率</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
           <!-- 
            分页需改4
            -->
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>
        <!--设置利率页面弹出框-->
		<el-dialog title="设置利率" v-model="editeModalVisible" :close-on-click-modal="false">
			<el-form :model="editeData" label-width="20%" class="tmp" :rules="editRules" ref="editeData">
                <el-form-item label="年化利率" prop="annual">
					<el-input v-model.number="editeData.annual" ></el-input>%
				</el-form-item>
				<el-form-item label="罚息利率" prop="defaultInterest">
					<el-input v-model.number="editeData.defaultInterest" ></el-input>%
				</el-form-item>
				<el-form-item label="逾期宽限期" prop="moratorium">
					<el-input v-model.number="editeData.moratorium" ></el-input>天
				</el-form-item>
				<el-form-item label="授信额度"  prop="lineOfCredit">
					<el-input v-model.number="editeData.lineOfCredit" ></el-input>万
				</el-form-item>
                <el-form-item label="授信期限" prop="creditPeriod">
                    <el-date-picker v-model="editeData.creditPeriod" type="daterange" @change="test" placeholder="选择日期范围"
                    format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
				<el-form-item label="保证金比例" prop="marginRatio">
					<el-input v-model.number="editeData.marginRatio" ></el-input>万
				</el-form-item>
				<el-form-item label="止损线"  prop="stopLossLine">
					<el-input v-model.number="editeData.stopLossLine" ></el-input>%
				</el-form-item>
				<el-form-item label="追加保证金天数"  prop="marginCalls">
					<el-input v-model.number="editeData.marginCalls" ></el-input>天
				</el-form-item>
                <el-form-item label="提货期限"  prop="deliveryDeadline">
					<el-input v-model.number="editeData.deliveryDeadline" ></el-input>天
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editeModalVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit('editeData')">启用</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { getDemanderList ,interestRate ,getInterest ,updateInterest} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '公司名称',
                    prop  : 'enterpriseName',
                    },{
                    label : '地址',
                    prop  : 'address',
                    minWidth : 150,
                    },{
                    label : '联系人',
                    prop  : 'contacts',
                    },{
                    label : '联系电话',
                    prop  : 'contactsPhone',
                    }
                ],
                //总页数
                total : 0,
                //分页
                pagination : {},
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                 //模态框
                editeModalVisible : false,
                editeData : {
                        annual : '',
                        defaultInterest : '',
                        moratorium : '',
                        lineOfCredit : '',
                        creditPeriod : [],
                        creditPeriodBegin : '',
                        creditPeriodOver : '',
                        marginRatio : '',
                        stopLossLine : '',
                        marginCalls : '',
                        deliveryDeadline : '',
                        enterpriseId : '',
                        projectId : ''
                },
                editRules : {
                    annual : [
                        {required:true,message: '请输入年化利率'},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ],
                    defaultInterest : [
                        {required:true,message: '请输入罚息利率'},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ],
                    moratorium : [
                        {required:true,message: '请输入逾期宽限期'},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ],
                    lineOfCredit : [
                        {required:true,message: '请输入授信额度'},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ],
                    marginRatio : [
                        {required:true,message: '请输入保证金比例'},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ],
                    stopLossLine : [
                        {required:true,message: '请输入止损线'},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ],
                    marginCalls : [
                        {required:true,message: '请输入追加保证金天数'},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ],
                    deliveryDeadline : [
                        {required:true,message: '请输入提货期限'},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ],
                }
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
            ...mapState(["loginInfo","projectId"])
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
                    const params = Object.assign({},this.pagination);
                    const resp = await getDemanderList(this.projectId,params);
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

            async edite (index,row) {
                this.editeModalVisible = true;
                this.editeData = row;
                //判断是否存在客户利率信息
                try{
                    const resp = await getInterest(row.enterpriseId,row.pjId);
                    const Interest = await resp.json();
                    const creditPeriod = [moment(Interest.creditPeriodBegin),moment(Interest.creditPeriodOver)]
                    this.editeData = Object.assign({},{...row},{...Interest},{creditPeriod});
                    console.log(this.editeData);
                    return;
                }catch(e){
                    this.editeData = Object.assign({},{...row},{creditPeriod:['','']})
                }
                    
                
            },
            test(a){
                console.log(a,this.editeData.creditPeriod)
            },

            editSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editeData.projectId = this.projectId;
                        this.editeData.creditPeriodBegin = this.editeData.creditPeriod[0] != '' ? moment(this.editeData.creditPeriod[0]).format(this.dateFormat) : '';
                        this.editeData.creditPeriodOver = this.editeData.creditPeriod[1] != '' ? moment(this.editeData.creditPeriod[1]).format(this.dateFormat) : '';
                        console.log(this.editeData.creditPeriodBegin)
                        console.log(this.editeData.creditPeriodOver)
                        //id存在为修改，不存在为新增
                        if(this.editeData.id){
                            updateInterest(this.editeData.id,this.editeData).then((response) => {
                                console.log(response.status)
                                if (response.status == 200) {
                                    this.editeModalVisible = false;
                                    this.$message.success('更新利率成功')
                                }
                            })
                        }else{
                            interestRate(this.editeData).then((response) => {
                                console.log(response.status)
                                if (response.status == 200) {
                                    this.editeModalVisible = false;
                                    this.$message.success('新增利率成功')
                                }

                            })
                        }
                        

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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

<style lang="less" scoped>
    // @import '../../style/mixin';
    .tmp .el-input{
        width:80%;
    };
</style>
