<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-tabs type="border-card">
		<el-tab-pane label="我的项目">
			<el-table row-key="id" :empty-text="emptyText" :data="myProjectList" v-loading="listLoading" highlight-current-row style="width: 100%">
				<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
                        <el-button type="text" size="small" @click='editProjet(scope)'>进入项目</el-button>
                        <el-button type="text" size="small" @click="inviteEnterprise(scope)">邀请</el-button>
                        <el-button type="text" size="small" @click="audit(scope)">邀请记录</el-button>
                    </template>
				</el-table-column>
			</el-table>
			<section class="main-pagination">
				<my-Pagination :callback="getList" :total="myProjectListTotal">
				</my-Pagination>
			</section>
		</el-tab-pane>
		<el-tab-pane label="受邀项目">
			<el-table row-key="id" :empty-text="emptyText" :data="invitedProjectList" v-loading="listLoading" highlight-current-row style="width: 100%">
				<!-- <el-table-column type="index" width="100"></el-table-column> -->

				<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="text" size="small" @click='editProjet(scope)'>
						进入项目</el-button>
						<el-button type="text" size="small" @click="acceptInvite(scope)">接受</el-button>
						<el-button type="text" size="small" @click="rejectInvite(scope)">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>
			<section class="main-pagination">
				<my-Pagination :callback="getList" :total="invitedProjectTotal">
				</my-Pagination>
			</section>
			<section class="main-pagination">
				<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
				</el-pagination>
			</section>
		</el-tab-pane>
	</el-tabs>
	<el-dialog title='选择企业及角色' :visible.sync='inviteEnterpriseFlag'>
		<el-form :model="inviteData" :rules="rules" ref='ruleForm' label-width="110px">
			<el-form-item label="企业名称" prop='eid'>
				<el-select v-model="inviteData.eid" placeholder="请选择">
					<el-option v-for="item in enterpriseList" :key='item.id' :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="企业类型" prop='pid'>
				<el-select v-model="inviteData.pid" placeholder="请选择">
					<el-option v-for="item in roleList" :key='item.name' :label="item.name" :value="item.id" @change='aaa'>
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="inviteEnterpriseFlag = false">取 消</el-button>
			<el-button type="primary" @click="submitInvite('ruleForm')">确 定</el-button>
		</div>
	</el-dialog>
</div>
</template>
<script>
import headTop from '../../components/headTop'
import moment from 'moment'
import myPagination from '@/components/myPagination'
import {
	enterpriseListRequest,
	enterpriseProjectListRequest,
	enterpriseRolesListRequest
} from '@/api/enterpriseApi'
import {
	modifyProjectRequest
} from '@/api/coreApi'
export default {
	components: {
		headTop,
		myPagination
	},
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			inviteData: {
				eid: null,
				pid: null
			},
			ruleForm: {
				eid: '',
				pid: ''
			},
			rules: {
				eid: [{
					required: true,
					message: '请选择企业名称',
					trigger: 'blur'
				}],
				pid: [{
					required: true,
					message: '请选择产品类型',
					trigger: 'blur'
				}]
			},
			//table
			myProjectList: [],
			myProjectListTotal: 0, //总数
			invitedProjectList: [],
			invitedProjectTotal: 0, //总数
			listLoading: false,
			enterpriseList: [],
			roleList: [],
			//分页信息
			pagination: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
			emptyText: "暂无数据",
			inviteEnterpriseFlag: false,
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
				label: '参与角色',
				prop: 'enterpriseRole',
				sortable: true,
			}, {
				label: '项目起始日',
				prop: 'startTime',
				sortable: true,
				minWidth: 60,
				formatter: (row, column) => moment(column.startTime).format(dateFormat)
			}, {
				label: '项目结束日',
				prop: 'endTime',
				sortable: true,
				minWidth: 60,
				formatter: (row, column) => moment(column.endTime).format(dateFormat)
			}],
		}
	},
	activated() {
		this.getList();
	},
	methods: {
		getList() {
			let that = this;
			let options = {
				params: {
					eid: this.$store.state.loginInfo.enterpriseId
				}
			}
			options.params = Object.assign(options.params, this.pagination.params)
			console.log(options);
			enterpriseProjectListRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.myProjectList = [];
					this.invitedProjectList = [];
					for (var item in result) {
						if (result[item].inviteStatus == 'T' && result[item].state == 'T') {
							that.myProjectList.push(result[item]);
						}
						this.pagination.total = result.length;
					}
					for (var item in result) {
						if (result[item].inviteStatus == 'I' && result[item].state == 'F') {
							that.invitedProjectList.push(result[item]);
						}
						this.pagination.total = result.length;
					}
				})
			})
		},
		inviteEnterprise(scope) {
			console.log(scope);

			this.inviteEnterpriseFlag = true;
			this.getEnterpriseList();
			this.getEnterpriseRolesList(scope.row.priductCode);
		},
		submitInvite(formRule) {
			console.log(this.inviteData);
			this.$refs[formRule].validate((valid) => {
				modifyProjectRequest(this.inviteData).then(response => {
					response.json().then(result => {
						console.log(result);
						this.getList();
					})
				})
			})

		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getEnterpriseList();
		},
		getEnterpriseList() {
			this.enterpriseList = [];
			enterpriseListRequest().then(response => {
				response.json().then(result => {
					console.log(result);
					this.enterpriseList = result;
					for (var item in result) {
					    this.$set(this.enterpriseList, item, result[item])
					}

					// this.enterpriseList=result;

				})
			})
		},
		getEnterpriseRolesList(priductCode) {
			alert(priductCode)
			this.roleList = [];
			let options={
				productCode:priductCode
			}
			enterpriseRolesListRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.roleList = result;
				})
			})
		},
		aaa() {
			alert(this.inviteData.pid)
		}
	}
}
</script>
