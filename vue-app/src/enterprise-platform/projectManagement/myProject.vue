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
				<el-pagination @current-change="flipPage1" :current-page="pagination1.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination1.total">
				</el-pagination>
			</section>
		</el-tab-pane>
		<el-tab-pane label="受邀项目">
			<el-table row-key="id" :empty-text="emptyText" :data="invitedProjectList" v-loading="listLoading" highlight-current-row style="width: 100%">
				<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="text" size="small" @click='editProjet(scope)'>
						进入项目</el-button>
						<el-button type="text" size="small" @click="dealWithInvite(scope, 'T')">接受</el-button>
						<el-button type="text" size="small" @click="dealWithInvite(scope, 'F')">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- <section class="main-pagination">
				<my-Pagination :callback="getList" :total="invitedProjectTotal">
				</my-Pagination>
			</section> -->
			<section class="main-pagination">
				<el-pagination @current-change="flipPage2" :current-page="pagination2.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination2.total">
				</el-pagination>
			</section>
		</el-tab-pane>
	</el-tabs>
	<el-dialog title='选择企业及角色' :visible.sync='inviteEnterpriseFlag'>
		<el-form :model="inviteData" :rules="rules" ref='inviteData' label-width="110px">
			<el-form-item label="企业名称" prop='eid'>
				<el-select v-model="inviteData.eid" placeholder="请选择" @change='aaa'>
					<el-option v-for="item in enterpriseList" :key='item.id' :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="企业类型" prop='projectRole'>
				<el-select v-model="inviteData.projectRole" placeholder="请选择" @change='aaa'>
					<el-option v-for="item in roleList" :key='item.name' :label="item.name" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="inviteEnterpriseFlag = false">取 消</el-button>
			<el-button type="primary" @click="submitInvite()">确 定</el-button>
		</div>
	</el-dialog>
</div>
</template>
<script>
import headTop from '../../components/headTop'
import moment from 'moment'
import {
	enterpriseListRequest,
	enterpriseProjectListRequest,
	enterpriseRolesListRequest,
	modifyProjectInvitStatusRequest
} from '@/api/enterpriseApi'
import {
	addProjectRequest
} from '@/api/coreApi'
export default {
	components: {
		headTop
	},
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			inviteData: {
				eid: '',
				pid: '',
				projectRole: ''
			},
			dealWithInviteData: {
				eid: '',
				pid: '',
				inviteStatus: ''
			},
			rules: {
				eid: [{
					required: true,
					message: '请选择企业名称'
				}],
				projectRole: [{
					required: true,
					message: '请选择企业角色'
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
			pagination1: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
			pagination2: {
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
				label: 'priductCode',
				prop: 'priductCode',
				sortable: true,
				minWidth: 60,
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
		console.log(decodeURIComponent('%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%94%B9%E5%A4%B1%E8%B4%A5'));
	},
	methods: {
		getList() {
			let that = this;
			let options = {
				params: {
					eid: this.$store.state.loginInfo.enterpriseId
				}
			}
			options.params = Object.assign(options.params, this.pagination1.params)
			console.log(options);
			enterpriseProjectListRequest(options).then(response => {
				console.log(response);
				response.json().then(result => {
					console.log(result);
					this.myProjectList = [];
					this.invitedProjectList = [];
					for (var item in result) {
						if (result[item].inviteStatus == 'T' && result[item].state == 'T') {
							that.myProjectList.push(result[item]);
						}
						this.pagination1.total = that.myProjectList.length;
					}
					for (var item in result) {
						if (result[item].inviteStatus == 'I' && result[item].state == 'F') {
							that.invitedProjectList.push(result[item]);
						}
						this.pagination2.total = that.invitedProjectList.length;
					}
				})
			})
		},
		inviteEnterprise(scope) {
			console.log(scope);
			this.inviteData.pid = null;
			this.inviteData.projectRole = '';
			this.inviteData.pid = scope.row.pjId;
			this.inviteEnterpriseFlag = true;
			this.getEnterpriseList();
			this.getEnterpriseRolesList(scope.row.priductCode);
		},
		submitInvite() {
			this.$refs['inviteData'].validate(async valid => {
				if (valid) {
					let options = {
						eid: this.inviteData.eid,
						pid: this.inviteData.pid,
						body: {
							enterpriseRole: this.inviteData.projectRole,
						}
					}
					console.log(options);
					addProjectRequest(options).then(response => {
						if (response.status === '200') {

						}
					})
				}
			})
		},
		flipPage1(pageIndex) {
			this.pagination1.params.page = pageIndex;
			this.getEnterpriseList();
		},
		flipPage2(pageIndex) {
			this.pagination2.params.page = pageIndex;
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
				})
			})
		},
		getEnterpriseRolesList(priductCode) {
			alert(priductCode)
			this.roleList = [];
			let options = {
				productCode: priductCode
			}
			enterpriseRolesListRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.roleList = result;
				})
			})
		},
		dealWithInvite(scope, inviteStatus) {
			console.log(scope);
			let options = {
				eid: scope.row.enterpriseId,
				pid: scope.row.pjId,
				inviteStatus: inviteStatus
			}
			modifyProjectInvitStatusRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
				})
			})
		},
		aaa(event) {
			switch (event.index) {
				case 0:
				this.getEnterpriseList();
					break;
				case 1:
				this.getEnterpriseRolesList();
					break;
				default:
			}
			alert(event.index)
		}
	}
}
</script>
