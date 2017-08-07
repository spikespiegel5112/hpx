<template>
<div class="fillcontain">
	<head-top></head-top>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
			<el-table-column type="index" width="100"></el-table-column>
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
		</el-table>

		<section class="main-pagination">
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</section>
	<!--编辑界面-->
	<el-dialog title="修改项目" v-model="dialogFormVisible" :close-on-click-modal="false">
		<el-form :model="editData" label-width="120px" :rules="editRules" ref="editData">
			<el-form-item label="产品类型" prop="productCode">
				<el-input v-model="editData.productCode" auto-complete="off" readonly></el-input>
			</el-form-item>
			<el-form-item label="项目名称" prop="name">
				<el-input v-model="editData.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="项目说明">
				<el-input v-model="editData.remark"></el-input>
			</el-form-item>
			<el-form-item label="项目开始时间">
				<el-date-picker type="date" placeholder="选择日期" v-model="editData.startTime"></el-date-picker>
			</el-form-item>
			<el-form-item label="项目终止时间">
				<el-date-picker type="date" placeholder="选择日期" v-model="editData.endTime"></el-date-picker>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="dialogFormVisible = false">取消</el-button>
			<el-button type="primary" @click.native="editProjetSubmit">提交</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
import headTop from '@/components/headTop'
import moment from 'moment'
import {
	getInviteRecordsList
} from '@/api/getData'
import {
	mapState
} from 'vuex'


export default {
	components: {
		headTop
	},
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			//table columns
			columns: [{
				label: '联系电话',
				prop: 'contactsPhone',
				sortable: true,
			}, {
				label: '创建时间',
				prop: 'createTime',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '受邀企业名称',
				prop: 'enterpriseName',
				sortable: true,
			}, {
				label: '邀请状态',
				prop: 'inviteStatus',
				sortable: true
			}, {
				label: '企业角色类型',
				prop: 'productName',
				sortable: true
			}, {
				label: '项目开始时间',
				prop: 'startTime',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '审核状态',
				prop: 'state',
				sortable: true
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
			//登录信息
			userId: this.$store.state.loginInfo.id,
			enterpriseId: this.enterpriseId,
			//search params
			query: {
				eid: this.$store.state.loginInfo.enterpriseId
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
			//搜索条件的个数
			criteriaNum: 3,
			//模态框
			dialogFormVisible: false,
			editProjetEid: 0,
			editData: {
				productCode: '',
				name: '',
				remark: '',
				startTime: '',
				endTime: ''
			},
			editRules: {
				productCode: [{
					required: true
				}],
				createTime: [{
					required: true,
					message: '请输入项目创建时间',
					trigger: 'blur'
				}],
				name: [{
					required: true,
					message: '请输入项目名称',
					trigger: 'blur'
				}]
			}
		}
	},
	activated() {
		this.initData();
	},
	computed: {
		loginInfo() {
			return this.$store.state.loginInfo
		}
	},
	methods: {
		initData() {
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
				params: {
					eid: this.$route.query.eid,
					pid: this.$route.query.pid
				}
			}

			options.params = Object.assign(options.params, this.pagination.params)
			console.log(options);
			getInviteRecordsList(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result);
					this.tableList = result
				})
			})
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
		},
	},
}
</script>

<style lang="less">
@import '../../style/mixin';
.table_container {
    padding: 20px;
}
</style>
