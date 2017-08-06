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
					<el-button type="text" size="small" @click="auditProject(scope)" >审核</el-button>
				</template>
			</el-table-column>
		</el-table>
		<section class="main-pagination">
			<!-- 特殊情况分页自己按注释的  -->
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>

		</section>
	</section>
	<!--审核对话框-->
	<el-dialog title="提示" :visible.sync="auditModalVisible" size="tiny">
		<span>请确认审核是否通过?</span>
		<span slot="footer" class="dialog-footer">
    		<el-button @click="auditModalVisible = false">取 消</el-button>
    		<el-button type="primary" @click="commitAudit">通过</el-button>
  		</span>
	</el-dialog>
</div>
</template>

<script>
import headTop from '@/components/headTop'
import myPagination from '@/components/myPagination'
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
				minWidth: 200,
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
			},
			//search params
			query: {
				eid: this.$store.state.loginInfo.enterpriseId,
				pid: '',
				inviteStatus: 'T',
				state: 'S'
			},
			activatedOptions: [{
				value: '激活',
				activated: 'T'
			}, {
				value: '未激活',
				activated: 'F'
			}],
			auditStateOptions: [{
				value: '已认证',
				auditState: 'T'
			}, {
				value: '未认证',
				auditState: 'F'
			}],
			rules: {

			},
			//搜索条件的个数
			criteriaNum: 3,

			//审核模态框
			auditModalVisible: false,
			auditEid:null,
			auditPid: null,
			AuditState:''
		}
	},
	components: {
		headTop,
		myPagination,
	},
	created() {
		this.initData();
	},
	mounted() {

	},
	computed: {
		loginInfo() {
			return this.$store.state.loginInfo
		}
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
		async getList() {
			let options={
				inviteStatus:'I',
				state:'F'
			}
			options=Object.assign(options, this.pagination.params);
			projectsAuditListRequest(options).then(response=>{
				this.pagination.total=response.headers.get('x-total-count');
				response.json().then(result=>{
					console.log(result);
					this.tableList=result
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
			this.auditModalVisible = true;
			this.auditEid=scope.row.epId;
			this.auditPid=scope.row.epId;
			this.auditState=scope.row.state;
		},
		commitAudit(scope) {
			console.log(this.auditEid)
			auditProjectRequest(this.auditEid, this.auditPid, this.auditState).then(response=>{
				// alert('dsds')
				this.auditModalVisible=false;
			})
		},
		flipPage(){

		}
	},
}
</script>

<style lang="less">
@import '../../style/mixin';
.table_container {
    padding: 20px;
}
</style>
