<template>
<div class="fillcontain">
	<head-top></head-top>
	<!--  搜索条件  -->
	<section class='search-criteria-container'>
		<el-form :inline="true" :model="query" ref="query">
			<el-form-item class="order-search-item" prop="name">
				<el-input v-model="query.name" placeholder="订单名称"></el-input>
			</el-form-item>
			<el-form-item class="order-search-item" prop="supplier">
				<!-- <el-select v-model="query.supplier" placeholder="需方">
					<el-option v-for="item in supplierOptions" :key="item.enterpriseId" :label="item.enterpriseName" :value="item.enterpriseId">
					</el-option>
				</el-select> -->
			</el-form-item>

			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
				<el-button type="primary" class="reset-b" icon="circle-close" @click="resetForm('query')">重置</el-button>
				<!-- <el-button type="primary">签章</el-button>
				<el-button type="primary">预览</el-button>
				<el-button type="primary">上传合同</el-button>
				<el-button type="primary">查看融资详情</el-button>
				<el-button type="primary">已处置</el-button> -->
			</el-form-item>
		</el-form>
	</section>
	<section class="main-table-container">
		<el-table highlight-current-row row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
			<el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column align="center" label="操作" width='150'>
				<template scope="scope">
					<el-button type="text" size="small" icon="search" @click="search">查询</el-button>
					<el-button type="text" size="small" class="reset-b" icon="circle-close" @click="resetForm('query')">重置</el-button>
					<el-button type="text" size="small" @click="signature">签章</el-button>
					<el-button type="text" size="small" @click="review">预览</el-button>
					<el-button type="text" size="small" @click="uploadContract">上传合同</el-button>
					<el-button type="text" size="small" @click="reviewFinancing">查看融资详情</el-button>
					<el-button type="text" size="small" @click="uploadContract">已处置</el-button>
				</template>
			</el-table-column>
		</el-table>

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
	listMyRequest,
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
				label: '合同名称',
				prop: 'name',
				sortable: true,
			}, {
				label: '合同编号',
				prop: 'code',
				sortable: true,

			}, {
				label: '订单编号',
				prop: 'orderCode',
				sortable: true,
			}, {
				label: '需方',
				prop: 'secondParty',
				sortable: true,
			}, {
				label: '合同金额',
				prop: 'money',
				sortable: true,
			}, {
				label: '合同状态',
				prop: 'contractType',
				sortable: true,
			}, {
				label: '收货状态',
				prop: 'receivingStatus',
				sortable: true,
			}, {
				label: '创建时间',
				prop: 'createtime',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '提货期限',
				prop: 'deliveryDeadline',
				sortable: true,
			}, {
				label: '融资状态',
				prop: 'financingStatus',
				sortable: true,
			}, {
				label: '文件',
				prop: 'fileId',
				sortable: true,
			}],
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
			listMyRequest(options).then(response => {
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
		selectIndustry() {},
		signature(){},
		review(){},
		uploadContract(){},
		reviewFinancing(){}



	}
}
</script>

<style lang="less">
@import '../../../style/mixin';
.table_container {
    padding: 20px;
}
</style>
