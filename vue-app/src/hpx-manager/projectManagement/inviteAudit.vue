<template>
<div class="fillcontain">
	<head-top></head-top>

    <!--  搜索条件  -->
	<section class='search-criteria-container'>
		<el-form :inline="true" :model="query" ref="query">
			<el-row>
				<el-col :span="5">
					<el-form-item prop="name">
						<el-input v-model="query.name" size="large" placeholder="项目名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
			<el-table-column type="index" width='50'>
			</el-table-column>
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
				    <el-button type="text" size="small">
                        <router-link :to="`/manager/etpde/${scope.row.enterpriseId}`">查看</router-link>
                    </el-button>
					<el-button type="text" size="small" @click="auditProject(scope)">审核</el-button>
                </template>
			</el-table-column>
		</el-table>
		<section class="main-pagination">
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</section>
	<el-dialog
		title="提示"
		:visible.sync="auditDialogFlag"
		size="tiny">
		<span>请确认是否通过此邀请?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="auditDialogFlag=false">取 消</el-button>
			<el-button @click="commitAudit('F')">拒 绝</el-button>
			<el-button type="primary" @click="commitAudit('T')">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import headTop from '@/components/headTop'
import moment from 'moment'
import {
	projectListRequest
} from '@/api/enterpriseApi'
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
				minWidth: 100,
			}, {
				label: '受邀企业名称',
				prop: 'enterpriseName',
				sortable: true,
				minWidth: 100,
			}, {
				label: '参与角色',
				prop: 'enterpriseTypeName',
				sortable: true,
			}, {
				label: '项目起始日',
				prop: 'startTime',
				sortable: true,
				minWidth: 100,
				formatter: (row, column) => {
					return row.startTime != null ? moment(row.startTime).format(dateFormat) : ''
				}
			}, {
				label: '项目结束日',
				prop: 'endTime',
				sortable: true,
				formatter: (row, column) => {
					return row.endTime != null ? moment(row.endTime).format(dateFormat) : ''
				}
			}],

			//table
			tableList: [],
			listLoading: true,
			emptyText: "暂无数据",
			//分页信息
			pagination: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
            query:{},

			//审核弹框
			auditDialogFlag: false
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
				params: {
					inviteStatus: 'T',
					state: 'F'
				}
			}
			options.params = Object.assign(options.params, this.pagination.params);
			console.log(options);
			projectListRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'));
				response.json().then(result => {
					console.log(result);
					this.tableList = result;
					this.listLoading=false;
				})
			})
		},
		async search() {
            this.getList();
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		auditProject(scope) {
			this.auditDialogFlag = true;
			this.auditEid = scope.row.enterpriseId;
			this.auditPid = scope.row.pjId;
			// this.$confirm('请确认是否通过此邀请?', '提示', {
			// 	confirmButtonText: '确定',
			// 	cancelButtonText: '取消',
			// 	type: 'warning'
			// }).then(() => {
			// 	let options = {
			// 		eid: scope.row.enterpriseId,
			// 		pid: scope.row.pjId,
			// 		state: 'T'
			// 	}
			// 	console.log(options);
			// 	auditProjectRequest(options).then(response => {
			// 		this.getList();
			// 		this.$message({
			// 			type: 'success',
			// 			message: '审核通过'
			// 		});
			// 	})
			// }).catch(() => {
			// 	this.$message({
			// 		type: 'info',
			// 		message: '已取消审核'
			// 	});
			// })
		},
		commitAudit(code) {
			let options = {
				eid: this.auditEid,
				pid: this.auditPid,
				state: code
			}
			console.log(options);
			if (code == 'T') {
				auditProjectRequest(options).then(response => {
					this.getList();
					const msg = decodeURI(response.headers.get('x-hpx-alert'));
					this.$message({
						type: 'success',
						message: msg
					});
					this.auditDialogFlag = false;
				})
			}else if(code == 'F'){
				auditProjectRequest(options).then(response => {
					this.getList();
					this.$message({
						type: 'success',
						message: '审核通过'
					});
					this.auditDialogFlag = false;
				})
			}

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
