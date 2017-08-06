<template>
<div class="fillcontain">
	<head-top></head-top>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
			<el-table-column type="index" width="100">
			</el-table-column>
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="auditProject(scope)">审核</el-button>
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
import moment from 'moment'
import {
	projectsAuditListRequest
} from '@/api/getData'
import {
	auditProjectRequest
} from '@/api/coreApi'
import {
	mapState
} from 'vuex'

export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			//table columns
			columns: [{
				label: '产品',
				prop: 'productName',
				sortable: true,
			}, {
				label: '项目名称',
				prop: 'projectName',
				sortable: true,
				minWidth: 120,
			}, {
				label: '参与角色',
				prop: 'enterpriseRole',
				sortable: true,
			}, {
				label: '项目起始日',
				prop: 'startTime',
				sortable: true,
				minWidth: 100,
				formatter: (row, column) => moment(column.startTime).format(dateFormat)
			}, {
				label: '项目结束日',
				prop: 'endTime',
				sortable: true,
				formatter: (row, column) => moment(column.endTime).format(dateFormat)
			}],

			//table
			tableList: [],
			listLoading: false,
			emptyText: "暂无数据",
			//分页信息
			pagination: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			}
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
			this.listLoading = true;
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
				inviteStatus: 'I',
				state: 'F'
			}
			options = Object.assign(options, this.pagination.params);
			console.log(options);
			projectsAuditListRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'));
				response.json().then(result => {
					console.log(result);
					this.tableList = result
				})
			})
		},
		async search() {
			try {
				this.getList();
			} catch (e) {

			}
		},

		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		auditProject(scope) {
			this.$confirm('请确认是否通过此邀请?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let options = {
					eid: scope.row.epId,
					pid: scope.row.pjId,
					state: 'T'
				}
				console.log(options);
				auditProjectRequest(options).then(response => {
					this.getList();
					this.$message({
						type: 'success',
						message: '审核通过'
					});
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消审核'
				});
			})
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
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
