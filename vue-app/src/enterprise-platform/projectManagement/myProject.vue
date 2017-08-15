<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-tabs type="border-card">
		<el-tab-pane label="我的项目">
			<el-table row-key="id" :empty-text="emptyText" :data="myProjectList" v-loading="listLoading" highlight-current-row style="width: 100%">
				<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
				</el-table-column>
				<el-table-column label="操作" width='230'>
					<template scope="scope">
                        <el-button type="text" size="small" @click='editProjet(scope)'>授信</el-button>
                        <el-button v-if="scope.row.projectState='R'" type="text" size="small" @click='editProjet(scope)'>进入项目</el-button>
                        <el-button type="text" size="small" @click="inviteEnterprise(scope)">邀请</el-button>
                        <el-button type="text" size="small" @click="auditRecord(scope)">邀请记录</el-button>
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
				<el-table-column label="操作" width='200'>
					<template scope="scope">
						<el-button type="text" size="small" @click="dealWithInvite(scope, 'T')">接受</el-button>
						<el-button type="text" size="small" @click="dealWithInvite(scope, 'F')">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>

			<section class="main-pagination">
				<el-pagination @current-change="flipPage2" :current-page="pagination2.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination2.total">
				</el-pagination>
			</section>
		</el-tab-pane>
	</el-tabs>
	<el-dialog title='选择企业及角色' :visible.sync='inviteEnterpriseFlag'>
		<el-form :model="inviteData" :rules="rules" ref='inviteData' label-width="110px">
			<el-form-item label="企业名称" prop='eid'>
				<el-select v-model="inviteData.eid" placeholder="请选择">
					<el-option v-for="item in enterpriseList" :key='item.id' :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="企业类型" prop='enterpriseRole'>
				<el-select v-model="inviteData.enterpriseRole" placeholder="请选择" @change='aaa'>
					<el-option v-for="item in roleList" :key='item.code' :label="item.name" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="inviteEnterpriseFlag=false">取 消</el-button>
			<el-button type="primary" @click="submitInvite()">确 定</el-button>
		</div>
	</el-dialog>
</div>
</template>
<script>
import headTop from '@/components/headTop'
import moment from 'moment'
import {
	enterpriseListRequest,
	projectListRequest,
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
				enterpriseRole: ''
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
				enterpriseRole: [{
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
                minWidth: 50,
			}, {
				label: '项目名称',
				prop: 'projectName',
				sortable: true,
				minWidth: 70,
			}, {
				label: '参与角色',
				prop: 'enterpriseTypeName',
				sortable: true,
			}, {
				label: '项目起始日',
				prop: 'startTime',
				sortable: true,
				minWidth: 60,
				formatter: (row, column) => {
					return row.startTime != null ? moment(row.startTime).format(dateFormat) : ''
				}
			}, {
				label: '项目结束日',
				prop: 'endTime',
				sortable: true,
				minWidth: 60,
				formatter: (row, column) => {
					return row.endTime != null ? moment(row.endTime).format(dateFormat) : ''
				}
			}],
		}
	},
	activated() {
		this.initData();
	},
	methods: {
		 initData() {
			 
			 
             this.getList1();
             
             
		},
		getList1() {
			let that = this;
			let options = {
				params: {
					eid: this.$store.state.loginInfo.enterpriseId,
					inviteStatus: 'T',
					state: 'T'
				}
			}
			options.params = Object.assign(options.params, this.pagination1.params)
			console.log(options);
			projectListRequest(options).then(response => {
				this.pagination1.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result);
					this.myProjectList = [];
					this.invitedProjectList = [];
					for (var item in result) {
						that.myProjectList.push(result[item]);
					}
                    this.getList2();
				})
			})
		},
		getList2() {
			let that = this;
			let options = {
				params: {
					eid: this.$store.state.loginInfo.enterpriseId,
					inviteStatus: 'I',
					state: 'F'
				}
			}
			options.params = Object.assign(options.params, this.pagination2.params)
			projectListRequest(options).then(response => {
				this.pagination2.total = Number(response.headers.get('x-total-count'))
				console.log(response);
				response.json().then(result => {
					
					this.invitedProjectList = [];
					for (var item in result) {
						that.invitedProjectList.push(result[item]);
					}
                    console.log(that.invitedProjectList);
				})
			})
		},
		inviteEnterprise(scope) {
			this.inviteData.eid = '';
			this.inviteData.enterpriseRole = '';
			this.inviteData.pid = scope.row.pjId;
			this.inviteEnterpriseFlag = true;
			this.getEnterpriseList();
			this.getEnterpriseTypeNameList(scope);
		},
		submitInvite() {
			this.$refs['inviteData'].validate(async valid => {
				if (valid) {
					let options = {
						eid: this.inviteData.eid,
						pid: this.inviteData.pid,
						body: {
							enterpriseRole: this.inviteData.enterpriseRole,
							inviteStatus: 'I'
						}
					}
					console.log(options);
					addProjectRequest(options).then(response => {
						if (response.status == '200') {
							this.inviteEnterpriseFlag = false;
							this.$message({
								type: 'success',
								message: '项目邀请成功'
							});
							this.getList1();
						}
					}).catch(error => {
						console.log(error);
						this.$confirm(error).then(() => {
							this.inviteEnterpriseFlag = false;
						})
					})
				}
			})
		},
		flipPage1(pageIndex) {
			this.pagination1.params.page = pageIndex;
			this.getList1();
		},
		flipPage2(pageIndex) {
			this.pagination2.params.page = pageIndex;
			this.getList2();
		},
		getEnterpriseList() {
			this.enterpriseList = [];
			let options = {
				params: {
					name: '',
					activated: '',
					auditState: ''
				}
			}
			enterpriseListRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					for (var item in result) {
						if (result[item].id === this.$store.state.loginInfo.enterpriseId) {
							continue;
						} else {
							this.enterpriseList.push(result[item])
						}
					}
				})
			})
		},
		getEnterpriseTypeNameList(scope) {
			// alert(productCode)
			this.roleList = [];
			let options = {
				productCode: scope.row.productCode
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
			let confirmMessage;
			let options = {
				eid: scope.row.enterpriseId,
				pid: scope.row.pjId,
				inviteStatus: inviteStatus
			}
			switch (inviteStatus) {
				case 'T':
					confirmMessage = '确认接受此项目邀请?'
					break;
				case 'F':
					confirmMessage = '确认拒绝此项目邀请?'
			}
			this.$confirm(confirmMessage, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).then(() => {
				modifyProjectInvitStatusRequest(options).then(response => {
					response.json().then(result => {
						console.log(result);
						if (response.status === 200) {
							this.inviteEnterpriseFlag = false;
							this.$message({
								type: 'success',
								message: '邀请接受成功'
							});
							this.initData();
						}
					})
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消操作'
				});
			});
		},
		auditRecord(scope) {
			console.log(scope);
			this.$router.push({
				name: "inviteRecord",
				query: {
					eid: this.$store.state.loginInfo.enterpriseId,
					pid: scope.row.pjId
				}
			})
		},
		aaa(value) {
			// alert(value)
		}
	}
}
</script>
