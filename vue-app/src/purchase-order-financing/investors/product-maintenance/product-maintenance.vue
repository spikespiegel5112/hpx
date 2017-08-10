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
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                         <el-form-item>
                            <el-button type="primary"  @click="addProduct">添加货品</el-button>
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
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="updateProduct(scope.$index, scope.row)" >修改</el-button>
                        <el-button type="text" size="small" @click="deleteProduct(scope.$index, scope.row)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
           <!-- 
            分页需改4
            -->
            <my-Pagination @pageChange="pageChange" :total="total">
            </my-Pagination>
        </section>

        <!--页面弹出框-->
		<el-dialog :title="modalTitle" v-model="ProductModal" :close-on-click-modal="false">
			<el-form :model="product" label-width="20%" class="tmp" :rules="editRules" ref="product">
                <el-form-item label="品名" prop="description">
					<el-input v-model="product.description" ></el-input>
				</el-form-item>
				<el-form-item label="规格" prop="specification">
					<el-input v-model="product.specification" ></el-input>
				</el-form-item>
				<el-form-item label="型号" prop="model">
					<el-input v-model="product.model" ></el-input>
				</el-form-item>
				<el-form-item label="计量单位"  prop="unit">
					<el-input v-model="product.unit" ></el-input>
				</el-form-item>
				<el-form-item label="单价" prop="univalence">
					<el-input v-model.number="product.univalence" ></el-input>
				</el-form-item>
                <el-form-item label="报价日期" prop="offerDate">
                    <el-date-picker v-model="product.offerDate" type="date"  placeholder="选择报价日期"
                        format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :rows="2" v-model="product.remark"></el-input>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="productSubmit('product')">确定</el-button>
				<el-button @click.native="ProductModal = false">取消</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import {productList,addProduct,updateProduct,deleteProduct} from '@/api/orderApi'
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
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                query : {
                    description : '',
                    // offerDate : [],
                    // startTime : '',
                    // endTime : ''
                },


                //模态框
                modalTitle: '' ,
                ProductModal : false,
                product : {
                        id : '',
                        description : '',
                        specification : '',
                        model : '',
                        unit : '',
                        univalence : '',
                        offerDate : '',
                        remark :''
                },
                editRules : {
                    description : [
                        {required:true,message: '请输入品名', trigger: 'blur'}
                    ],
                    univalence : [
                        {required:true,message: '请输入单价',},
                        {type:'number',message: '必须为数字',trigger:'blur'}
                    ]
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
                    const params = Object.assign({orgId:this.loginInfo.enterpriseId},this.query,this.pagination);
                    const resp = await productList(params);
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

            //修改货品弹出框
            updateProduct(index,row){
                this.modalTitle = '修改货品',
                this.ProductModal = true;
                this.product = Object.assign(row, {offerDate: moment(row.offerDate)});
            },


            //添加货品弹出框
            addProduct () {
                 this.product = {
                        description : '',
                        specification : '',
                        model : '',
                        unit : '',
                        univalence : '',
                        offerDate : '',
                        remark :''
                };
                this.modalTitle = '添加货品',
                this.ProductModal = true;
            },

            //添加货品弹出框确定事件
            async productSubmit(formName) {
                try{
                    if(this.product.id){
                        const update = await updateProduct(this.product.id,this.product);
                        if(update.status == 200){
                            this.ProductModal = false;
                            this.$message.success('修改成功')
                        }
                    }else{
                        const add = await addProduct(this.product);
                        if(add.status == 200){
                            this.ProductModal = false;
                            this.$message.success('添加成功')
                        }
                    }
                   this.getList();
                }catch(e){
                    this.ProductModal = false;
                    this.$message.err('操作失败')
                }
            },

            //删除货品事件
           async deleteProduct(index,row){
               try{
                    const resp = await deleteProduct(row.id);
                    this.$message.success('删除货品成功');
                    this.getList();
                }catch(e){
                    this.$message.err('删除货品失败')
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
