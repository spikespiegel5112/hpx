<template>
<div class="fillcontain">
	<head-top></head-top>
	<!--  搜索条件  -->
	<section class='search-criteria-container'>
		<el-form :inline="true" :model="query" ref="query">
			<el-form-item class="order-search-item" prop="name">
				<el-input v-model="query.name" placeholder="订单名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
				<el-button type="primary" class="reset-b" icon="circle-close" @click="resetForm('query')">重置</el-button>
				<el-button type="primary" @click='addGoods'>新增货品</el-button>
			</el-form-item>
		</el-form>
	</section>
	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
			<el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click='editUnivalence(scope)'>编辑报价</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--新增货品对话框-->
		<el-dialog title="新增货品" v-model="addGoodsDialogFlag" :close-on-click-modal="false">
			<el-form :model="addGoodsFormData" label-width="120px" :rules="addGoodsRules" ref="addGoodsFormData">
				<el-form-item label="品名" prop="description">
					<el-input v-model="addGoodsFormData.description" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="规格" prop="specification">
					<el-input v-model="addGoodsFormData.specification" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="型号" prop="model">
					<el-input v-model="addGoodsFormData.model"></el-input>
				</el-form-item>
				<el-form-item label="计量单位" prop="unit">
					<el-input v-model="addGoodsFormData.unit"></el-input>
				</el-form-item>
				<el-form-item label="单价" prop="univalence">
					<el-input v-model.number="addGoodsFormData.univalence"></el-input>
				</el-form-item>
				<el-form-item label="报价日期" prop="offerDate">
					<el-date-picker type="date" placeholder="选择日期" v-model="addGoodsFormData.offerDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="addGoodsFormData.remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addGoodsDialogFlag = false">取消</el-button>
				<el-button type="primary" @click.native="createGoodsInfo">提交</el-button>
			</div>
		</el-dialog>
		<!--编辑报价对话框-->
		<el-dialog title="编辑报价" v-model="editUnivalenceDialogFlag" :close-on-click-modal="false">
			<el-form :model="editUnivalenceFormData" label-width="120px" :rules="editUnivalenceRules" ref="editUnivalenceFormData">
				<el-form-item label="单价" prop="productCode">
					<el-input v-model="editUnivalenceFormData.univalence" auto-complete="off" readonly></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editUnivalenceDialogFlag = false">取消</el-button>
				<el-button type="primary" @click.native="updateGoodsInfo(scope)">确定</el-button>
			</div>
		</el-dialog>
		<section class="main-pagination">
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</section>
</div>
</template>

<script>
import headTop from '@/components/headTop'
import {
	addGoodRequest,
	getGoodsMaintenanceListRequest,
	updateGoodsMaintenanceListRequest
} from '@/api/orderApi'

import {
	mapState
} from 'vuex'
import moment from 'moment'
export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			eid: this.$store.state.loginInfo.enterpriseId,
			pid: '',
			//table columns
			columns: [{
				label: '品名',
				prop: 'description',
				sortable: true,
			}, {
				label: '规格',
				prop: 'specification',
				sortable: true,
			}, {
				label: '型号',
				prop: 'model',
				sortable: true,
			}, {
				label: '计量单位',
				prop: 'unit',
				sortable: true,
			}, {
				label: '数量',
				prop: 'money',
				sortable: true,
			}, {
				label: '单价',
				prop: 'univalence',
				sortable: true,
			}, {
				label: '报价日期',
				prop: 'offerDate',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '备注',
				prop: 'remark',
				sortable: true,
			}],
			editUnivalenceRules: {
				productCode: [{
					required: true
				}],
			},

			//添加货品表单
			addGoodsFormData: {
				description: '',
				model: '',
				offerDate: '',
				remark: '',
				specification: '',
				unit: '',
				univalence: null,
			},
			addGoodsRules: {
				creater: [{
					required: true
				}],
				createTime: [{
					required: true,
					message: '请输入项目创建时间',
				}],
				description: [{
					required: true,
					message: '请输入货品名称',
				}],
				id: [{
					required: true,
					message: '请输入货品名称',
				}],
				model: [{
					required: true,
					message: '请输入货品型号',
				}],
				offerDate: [{
					type: 'date',
					required: true,
					message: '请选择报价日期',
				}],
				specification: [{
					required: true,
					message: '请输入货品规格',
				}],
				status: [{
					required: true,
					message: '请输入货品状态',
				}],
				unit: [{
					required: true,
					message: '请输入货品计量单位',
				}],
				univalence: [{
					type: 'number',
					message: '单价必须为数字值',
				}, {
					required: true,
					message: '请输入货品单价',
				}]
			},
			editUnivalenceFormData: {
				univalence: null
			},
			//search params
			query: {
				name: '',
				code: '',
				supplier: '',
				demander: ''
			},
			//分页信息
			pagination: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
			//table
			tableList: [],
			listLoading: false,
			emptyText: "暂无数据",
			//搜索条件的个数
			criteriaNum: 3,
			//选择模型模态框
			addGoodsDialogFlag: false,
			editUnivalenceDialogFlag: false,
			industryList: [],
			industryType: '',
			modelList: [],
			modelType: ''
		}
	},
	components: {
		headTop
	},
	mounted() {
		this.initData();
	},
	computed: {
		...mapState(["loginInfo"])
	},
	methods: {
		async initData() {
			this.listLoading = true;
			this.pagination.page = 1;
			this.getList();
			try {
				this.listLoading = false;
				if (!this.tableList.length) {
					this.emptyText = "暂无数据";
				}
			} catch (e) {
				this.emptyText = "获取数据失败";
				this.listLoading = false;
			}
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
		},
		getList() {
			let options = {
				params: this.pagination.params
			}
			console.log(options)
			getGoodsMaintenanceListRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				console.log(response);
				response.json().then(result => {
					console.log(result)
					this.tableList = result;
				})
			})
		},
		search() {},
		resetForm() {},
		addGoods() {
			this.addGoodsDialogFlag = true;
			this.$nextTick(()=>{
				this.$refs['addGoodsFormData'].resetFields();
			})
		},
		createGoodsInfo() {
			let options = {
				body: this.addGoodsFormData
			}
			this.$refs['addGoodsFormData'].validate(async(valid) => {
				addGoodRequest(options).then(response => {
					if (response.status === 200) {
						this.addGoodsDialogFlag = false;
						this.getList();
					}
				})
			})
		},
		editUnivalence() {
			this.editUnivalenceDialogFlag = true;
		},
		updateGoodsInfo(scope) {
			alert(scope.row.id)
			let options = {
				body: {},
				id: scope.row.id
			}
			updateGoodsMaintenanceListRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.getList();
				})
			})
		}
	}
}
</script>

<style lang="less">
.table_container {
    padding: 20px;
}
</style>
