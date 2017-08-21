<template>
<div class="fillcontain">
	<head-top></head-top>

	<!--  搜索条件  -->
	<section class='search-criteria-container'>
		<el-form :inline="true" :model="queryParams" ref="queryParams">
			<el-row>
				<el-col :span="4">
					<el-form-item prop="name">
						<el-select v-model="queryOption" placeholder="请选择">
							<el-option v-for="item in queryOptions" :key='item.value' :label="item.name" :value="item.name">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item prop="name">
						<el-input v-model="searchWord" placeholder="请输入"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item>
						<el-date-picker v-model="querySearchRange" type="daterange" placeholder="选择日期范围" @change='getDateRange'>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
					</el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="circle-close" @click="clearQuery">重置</el-button>
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
			queryOptions: [{
				name: '报告名称',
				value: 1,
			}, {
				name: '企业名称',
				value: 2
			}],
			queryOption: null,
			searchWord: '',
			querySearchRange: {},
			queryParams: {
				admittanceName: '',
				enterpriseName: '',
				startTime: '',
				endTime: ''
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
			listLoading: true,
			emptyText: "暂无数据",
			//报告model
			tableList: [],
			reportId: ''
		}
	},
	components: {
		headTop
	},
	activated() {
		this.initData();
	},
	methods: {
		async initData() {
			this.pagination.page = 1;
			try {
				this.getList();
				if (!this.tableList.length) {
					this.emptyText = "暂无数据";
				}
			} catch (e) {
				this.emptyText = "获取数据失败";
				this.listLoading = false;
			}
		},
		getList() {
            this.listLoading=true;
			let options = {
				eid: this.$store.state.loginInfo.enterpriseId,
				params: {}
			}
            options.params = Object.assign(this.queryParams, this.pagination.params)
			console.log(options);
			templateReportListRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result);
					this.tableList = result;
					this.listLoading=false;
				})
			})
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
		},
		clearQuery() {
			for (var key in this.queryParams) {
				this.queryParams[key] = '';
			}
			this.getList();
		},
		getDateRange(value) {
			this.queryParams.startTime = value.substr(0, 10);
			this.queryParams.endTime = value.substr(13, 10);
			//			alert(this.queryParams.endTime)
		},
		search() {
			switch (this.queryOption) {
				case '报告名称':
					this.queryParams.admittanceName = this.searchWord;
					break;
				case '企业名称':
					this.queryParams.enterpriseName = this.searchWord;
					break;
				default:
			}
			console.log(this.queryParams);
			this.getList();
		},
		reviewReport(scope) {
			console.log(scope.row);
			this.$router.push({
				name: 'reportDetail',
				params: {
					reportId: scope.row.id
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
