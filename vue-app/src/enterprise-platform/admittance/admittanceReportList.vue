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
						<el-input v-model="query.name" size="large" placeholder="请输入报告名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item prop="name">
						<el-input v-model="query.name" size="large" placeholder="请输入企业名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item prop="name">
						<el-input v-model="query.name" size="large" placeholder="请输入创建时间"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="6" style="float: right">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>

	<section class="main-table-container">
		<el-table row-key="id" empty-text="暂无数据" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
			<el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template scope="scope">
                    <el-button type="text" size="small" @click="reviewReport(scope)">查看</el-button>
                </template>
			</el-table-column>
		</el-table>
		<section class="main-pagination">
			<section class="main-pagination">
				<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
				</el-pagination>
			</section>
		</section>
	</section>
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
			//table columns
			columns: [{
				label: '名称',
				prop: 'admittanceName',
				sortable: true,
			}, {
				label: '企业名称',
				prop: 'enterpriseName',
				sortable: true,
			}, {
				label: '行业',
				prop: 'industryName',
				sortable: true,
			}, {
				label: '创建时间',
				prop: 'addTime',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}],
			//搜索查询
			query: {
				name: '',
				code: ''
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
			//报告model
			tableList: [],
			reportId: ''
		}
	},
	components: {
		headTop,
		myPagination
	},
	mounted() {
		this.initData();
	},
	methods: {
		async initData() {
			this.listLoading = true;
			this.pagination.page = 1;
			try {
				this.getList();
				this.listLoading = false;
				if (!this.tableList.length) {
					this.emptyText = "暂无数据";
				}
			} catch (e) {
				this.emptyText = "获取数据失败";
				this.listLoading = false;
			}
		},
		getList() {
			let options = {
				eid: this.$store.state.loginInfo.enterpriseId,
				params: this.pagination.params
			}
			templateReportListRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result);
					this.tableList = result;
				})
			})
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
		},
		search() {},
		reviewReport(scope) {
			console.log(scope.row);
			this.$router.push({
				name:'reportDetail',
				params:{
					reportId:scope.row.id
				}
			})
		}
	}
}
</script>

<style lang="less">
@import '../../style/mixin';

.table_container {
    padding: 20px;
}
</style>
