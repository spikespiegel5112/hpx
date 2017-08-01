<template>
<div class="fillcontain">
	<head-top></head-top>
	<!-- <div class="header_container">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ name: 'manager' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="(item, index) in $route.meta.breadcrumb" key="index">{{item}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div> -->

	<!--  搜索条件  -->
	<section class='search-criteria-container'>
		<el-form :inline="true" :model="query" ref="query">
			<el-row>
				<el-col :span="6">
					<el-form-item prop="name">
						<el-input v-model="query.name" size="large" placeholder="产品名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item prop="code">
						<el-input v-model="query.code" size="large" placeholder="产品编码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6" :offset="6 * (3 - (criteriaNum % 4))" style="float: right">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button icon="plus" type="primary" @click="addNotice()" style="float: right; margin-bottom: 5px;">新增</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		</el-col>
	</section>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
			<el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column align="center" label="操作">
				<el-button type="text" size="small">企业ddd填报信息</el-button>
				<el-button type="text" size="small">企业准入</el-button>
			</el-table-column>
		</el-table>
		<section class="main-pagination">
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</section>
	</span>
	</el-dialog>
</div>
</template>

<script>
import headTop from '../../components/headTop'
import myPagination from '@/components/myPagination'
import {
	templateReportListRequest,
} from '@/api/templateApi'
import {
	mapState
} from 'vuex'
import moment from 'moment'
export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			eid: this.$store.state.loginInfo.enterpriseId,
			//table columns
			columns: [{
				label: '企业名称',
				prop: 'enterpriseName',
				sortable: true,
			}, {
				label: '企业ID',
				prop: 'id',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '项目名称',
				prop: 'creator',
				sortable: true,
			}, {
				label: '企业类型',
				prop: 'creator',
				sortable: true,
			}, {
				label: '组织机构代码',
				prop: 'creator',
				sortable: true,
			}, {
				label: '城市',
				prop: 'creator',
				sortable: true,
			}, {
				label: '联系人',
				prop: 'creator',
				sortable: true,
			}, {
				label: '电话',
				prop: 'creator',
				sortable: true,
			}, {
				label: '状态',
				prop: 'creator',
				sortable: true,
			}, {
				label: '操作',
				prop: 'creator',
				sortable: true,
			}],
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

			//search params
			query: {

			},
			//搜索条件的个数
			criteriaNum: 3,
			//模态框
			deleteNoticeFlag: false,
		}
	},
	components: {
		headTop,
		myPagination
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
			let params = Object.assign(this.pagination.params)
			console.log(params)
			templateReportListRequest(this.eid, params).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))

				response.json().then(result => {
					console.log(result)
					this.tableList = result;
				})
			})

		},
		async search() {
			try {
				this.getList();
			} catch (e) {

			}
		},



	}
}
</script>

<style lang="less">
@import '../../style/mixin';
.table_container {
	padding: 20px;
}
</style>
