<template>
<div class="fillcontain">
	<commonDetailTitle routerName='projectsMaintenance' title="企业类型角色绑定"></commonDetailTitle>
	<!--	<head-top></head-top>-->

	<section class="main-table-container">
		<el-tabs type="border-card">
			<el-tab-pane label="未绑定">
				<el-table row-key="id" :empty-text="emptyText" :data="unbindedTableList" v-loading="listLoading" highlight-current-row style="width: 100%">
					<el-table-column v-for="(item,index) in columns1" key="index" :label="item.label" :prop="item.prop" :sortable="item.sortable" :width="item.width ? item.width : 'auto'" :formatter="item.formatter" :min-width="item.minWidth ? item.minWidth : 'auto'">
					</el-table-column>
					<!--
					<el-table-column label="选择角色">
						<template scope='scope'>
                            <el-select v-model="configProjectData.entRole" @change='chooseEnterpriseRoles'>
                                <el-option v-for="item in unbindedRolesList" :value="item.code" :key="item.code" :label="item.name"></el-option>
                            </el-select>
                        </template>
					</el-table-column>
-->
					<el-table-column label="操作">
						<template scope="scope">
                            <el-button type="text" size="small" @click="configProject(scope)">绑定</el-button>
                            <el-button type="text" size="small" @click="debindRole(scope)">解绑</el-button>
                        </template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			<el-tab-pane label="已绑定">
				<el-table row-key="id" :empty-text="emptyText" :data="bindedTableList" v-loading="listLoading" highlight-current-row style="width: 100%">
					<el-table-column v-for="(item,index) in columns2" key="index" :label="item.label" :prop="item.prop" :sortable="item.sortable" :width="item.width ? item.width : 'auto'" :formatter="item.formatter" :min-width="item.minWidth ? item.minWidth : 'auto'">
					</el-table-column>
					<el-table-column label="选择角色" prop="enterpriseStatus">
						<template scope='scope'>
               </template>
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
					<el-button type="text" size="small" @click="configProject(scope)">绑定</el-button>
					<el-button type="text" size="small" @click="configProject(scope)">解绑</el-button>
				</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

		</el-tabs>






		<section class="main-pagination">
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>

		<!--项目配置-->
		<el-dialog title="项目配置" :visible.sync='configProjectFlag' :close-on-click-modal="false">
			<el-form :model="configProjectData" label-width="120px" :rules="configProjectRules" ref="configProjectData">
				<el-form-item label="可绑定角色">
					<el-select v-model="configProjectData.role" @change='chooseEnterpriseRoles'>
						<el-option v-for="item in unbindedRolesList" :value="item.productCode" :key="item.name" :label="item.name">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="configProjectFlag = false">取消</el-button>
				<el-button type="primary" @click.native="configProjectSubmit">提交</el-button>
			</div>
		</el-dialog>

	</section>

</div>
</template>

<script>
import commonDetailTitle from '@/components/commonDetailTitle'
import headTop from '@/components/headTop'
import {
	getRolesByProjectRequest,
	getUnbindedRolesListRequest,
	bindProjectRequest,
	debindProjectRequest,


	getUnbindedEnterpriseTypesRequest,
	getBindedEnterpriseTypesRequest
} from '@/api/enterpriseApi'
import {
	mapState
} from 'vuex'


export default {
	components: {
		headTop,
		commonDetailTitle
	},
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			form: {},
			formInline: {
				region: ''
			},
			//table columns1
			columns1: [{
				label: '企业类型',
				prop: 'name',
			}],
			//table columns2
			columns2: [{
				label: '企业类型',
				prop: 'name',
			}, {
				label: '对应角色',
				prop: 'name',
			}],
			//table
			unbindedTableList: [],
			listLoading: false,
			emptyText: "暂无数据",
			//table
			bindedTableList: [],
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
			//搜索
			query: {
				name: ''
			},
			// activatedOptions: [{
			// 	value: '激活',
			// 	activated: 'T'
			// }, {
			// 	value: '未激活',
			// 	activated: 'F'
			// }],
			// auditStateOptions: [{
			// 	value: '已认证',
			// 	auditState: 'T'
			// }, {
			// 	value: '未认证',
			// 	auditState: 'F'
			// }],
			//搜索条件的个数
			criteriaNum: 3,

			routeParams: {
				pid: '',
				eid: ''
			},
			//配置项目模态框
			configProjectFlag: false,
			enterpriseList: [],
			unbindedRolesList: [],
			configProjectData: {
				entRole: '',
				pid: '',
				role: ''
			},
			configProjectRules: {
				role: [{
					required: true,
					message: '请选择企业项目类型'
				}]
			}
		}
	},
	activated() {
		this.getParams();
		this.initData();
	},
	deactivated() {
		this.configProjectData = {};
	},
	methods: {
		initData() {
			this.listLoading = true;
			try {
				this.getUnbindedEnterpriseTypes();
				this.getUnbindedRolesList();
				this.listLoading = false;
				if (!this.bindedTableList.length) {
					this.emptyText = "暂无数据";
				}
			} catch (e) {
				this.emptyText = "获取数据失败";
				this.listLoading = false;
			}
		},
		getParams() {
			this.routeParams.pid = this.$route.query.pid;
			this.routeParams.eid = this.$route.query.pid;
			this.routeParams.productCode = this.$route.query.productCode;
		},
		getBindedEnterpriseTypes() {
			let options1 = {
				pid: this.routeParams.pid,
				code: this.routeParams.productCode
			}
			console.log(options1)
			getBindedEnterpriseTypesRequest(options1).then(response => {
				response.json().then(result => {
					console.log(result);
					this.bindedTableList = result;
					console.log(this.configProjectData)
				})
			}).catch(err => {
				console.log(err)
			})
		},
		getUnbindedEnterpriseTypes() {
			let options1 = {
				pid: this.routeParams.pid,
				code: this.routeParams.productCode
			}
			console.log(options1)
			getUnbindedEnterpriseTypesRequest(options1).then(response => {
				response.json().then(result => {
					console.log(result);
					this.bindedTableList = result;
					this.getBindedEnterpriseTypes();
					console.log(this.configProjectData)
				})
			}).catch(err => {
				console.log(err)
			})
		},
		getUnbindedRolesList() {
			let options = {
				pid: this.routeParams.pid,
				code: this.routeParams.productCode
			}

			getUnbindedRolesListRequest().then(response => {
				response.json().then(result => {
					console.log(result)
					this.unbindedTableList = result;
				})
			})
		},
		configProject(scope) {
			this.configProjectData.entRole = scope.row.eid;
			this.getUnbindedRolesList();
			this.configProjectFlag = true;
			getUnbindedRolesListRequest().then(response => {
				response.json().then(result => {
					console.log(result);
					this.unbindedRolesList = result;
				})
			})
		},
		debindRole(scope) {
			let options = {
				entRole: scope.row.code,
				pid: this.routeParams.pid,
				body: {
					role: scope.row.code
				}
			}
			debindProjectRequest(options).then(response => {
				if (response.status == '200') {

				}
			})
		},

		configProjectSubmit() {
			let options = {
				entRole: this.configProjectData.eid,
				pid: this.configProjectData.pid,
				body: {
					role: this.configProjectData.role,
				}
			}
			console.log(options);
			bindProjectRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.configProjectFlag = false;
				})
			})
			this.initData();
			//			this.$refs['configProjectData'].validate(async(valid) => {
			//				if (valid) {
			//					try {
			//
			//					} catch (e) {
			//						this.$message.error(e)
			//					}
			//				}
			//			})
		},

		chooseEnterpriseRoles(value) {
			//			for (var item in this.unbindedRolesList) {
			//				if (this.unbindedRolesList[item].code == value) {
			//					this.configProjectData.id = this.unbindedRolesList[item].id;
			//				}
			//			}
			console.log(this.configProjectData)
		},
		search() {
			this.getEnterpriseTypesList();
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getEnterpriseTypesList();
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
