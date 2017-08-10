<template>
    <div class="fillcontain">
        <head-top></head-top>
        <section class='search-criteria-container'>
            <el-col :span="6">
                <el-button type="primary"  @click="addAddress">添加地址</el-button>
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
                        <el-button type="text" size="small" @click="updateAddress(scope.$index, scope.row)" >修改</el-button>
                        <el-button type="text" size="small" @click="deleteAddress(scope.$index, scope.row)" >删除</el-button>
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
		<el-dialog :title="modalTitle" v-model="AddressModal" :close-on-click-modal="false">
			<el-form :model="address" label-width="20%" class="tmp" :rules="editRules" ref="address">
                <el-form-item label="收货人" prop="consignee">
					<el-input v-model="address.consignee" ></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="phone">
					<el-input v-model="address.phone" ></el-input>
				</el-form-item>
				<el-form-item label="所在地区" prop="location">
					<el-input v-model="address.location" ></el-input>
				</el-form-item>
				<el-form-item label="详细地址"  prop="address">
					<el-input v-model="address.address" ></el-input>
				</el-form-item>
				<el-form-item label="地址名称" prop="addressName">
					<el-input v-model="address.addressName" ></el-input>
				</el-form-item>
                <el-form-item  prop="isDefault">
					<el-checkbox size="small" style="color:#fff;"  v-model="address.isDefault"></el-checkbox>设为默认收货地址
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addressSubmit('address')">确定</el-button>
				<el-button @click.native="AddressModal = false">取消</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import myPagination from '@/components/myPagination'
    import { addressList,addAddress,updateAddress,deleteAddress} from '@/api/orderApi'
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '地址名称',
                    prop  : 'addressName',
                    minWidth : 130,
                    },{
                    label : '地址',
                    prop  : 'address',
                    minWidth : 130,
                    },{
                    label : '联系人',
                    prop  : 'consignee',
                    },{
                    label : '联系人电话',
                    prop  : 'phone',
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
                modalTitle: '' ,
                AddressModal : false,
                address : {
                        id : '',
                        consignee : '',
                        phone : '',
                        location : '',
                        address : '',
                        addressName : '',
                        isDefault:false
                },
                editRules : {
                    consignee : [
                        {required:true,message: '请输入收货人', trigger: 'blur'}
                    ],
                    phone : [
                        {required:true,message: '请输入联系方式', trigger: 'blur'}
                    ],
                    location : [
                        {required:true,message: '请输入所在地区', trigger: 'blur'}
                    ],
                    address : [
                        {required:true,message: '请输入详细地址', trigger: 'blur'}
                    ],
                    addressName : [
                        {required:true,message: '请输入地址名称', trigger: 'blur'}
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
                    const params = Object.assign({orgId:this.loginInfo.enterpriseId},this.pagination);
                    const resp = await addressList(params);
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

            //修改地址弹出框
            updateAddress(index,row){
                this.modalTitle = '修改地址',
                this.AddressModal = true;
                this.address = Object.assign(row, {isDefault: row.isDefault === '1' ? true : false});
            },

            //添加地址弹出框
            addAddress () {
                 this.address = {
                        consignee : '',
                        phone : '',
                        location : '',
                        address : '',
                        addressName : '',
                        isDefault:false
                };
                this.modalTitle = '添加地址',
                this.AddressModal = true;
            },

            //添加地址弹出框确定事件
            async addressSubmit(formName) {
                try{
                    if(this.address.isDefault){
                        this.address.isDefault = 1;
                    }else{
                        this.address.isDefault = 2;
                    }
                    if(this.address.id){
                        const repm = await updateAddress(this.address.id,this.address);
                        if(repm.status == 200){
                            this.AddressModal = false;
                            this.$message.success('修改成功')
                        }
                    }else{
                        const repm = await addAddress(this.address);
                         console.log('新增')
                         if(repm.status == 200){
                            this.AddressModal = false;
                            this.$message.success('添加成功')
                        }
                    }
                   this.getList();
                }catch(e){
                    this.AddressModal = false;
                    this.$message.error('操作失败')
                }
            },

            //删除地址事件
           async deleteAddress(index,row){
               try{
                    const resp = await deleteAddress(row.id);
                    this.$message.success('删除地址成功');
                    this.getList();
                }catch(e){
                    this.$message.error('删除地址失败')
                }
            }
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
