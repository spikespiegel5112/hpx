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
                  type="index">
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
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <!--编辑界面-->
		<el-dialog title="编辑" v-model="editeModalVisible" :close-on-click-modal="false">
			<el-form :model="editeData" label-width="80px" :rules="editRules" ref="editeData">
                <el-form-item label="企业编号" prop="id" readonly>
					<el-input v-model="editeData.id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="企业名称" prop="name">
					<el-input v-model="editeData.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-input v-model="editeData.contactsNumber"></el-input>
				</el-form-item>
				<el-form-item label="更新时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="editeData.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editeData.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editeModalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import { ordersDetail } from '@/api/orderApi'
    import { mapState } from 'vuex'
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
                    label : '单位',
                    prop  : 'unit',
                    },{
                    label : '数量',
                    prop  : 'amount',
                    },{
                    label : '单价',
                    prop  : 'univalence',
                    },{
                    label : '总价',
                    prop  : 'total',
                    },{
                    label : '备注',
                    prop  : 'remark',
                    }
                ],
                //总页数
                total : 0,
  
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //模态框
                editeModalVisible : false,
                editeData : {
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
    	},
        created(){
            this.getList();
        },
        computed : {
            ...mapState(["loginInfo"]),
            orderId(){
                return this.$route.params.orderId
            }
        },
        methods: {
            async getList(){
                this.listLoading = true;
                try{
                    const resp = await ordersDetail(this.orderId);
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

            check (index,row){
                this.$router.push({path: this.$route.path + '/detail/' + row.id})
            },
            edite (index,row) {
                this.editeModalVisible = true;
                this.editeData = Object.assign({},{...row})
            }
        },
    }
</script>

<style lang="less">


</style>
