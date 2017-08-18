<template>
<div class="fillcontain">
	<head-top></head-top>

	<!--  搜索条件  -->
	<section class='search-criteria-container'>
		<el-form :inline="true" :model="query" ref="query">
			<el-row>
				<el-col :span="5">
					<el-form-item prop="name">
						<el-input v-model="query.name" size="large" placeholder="角色名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7" :offset="6 * (3 - (criteriaNum % 4))">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="resetTable" @click="resetTable">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button icon="plus" type="primary" @click='newRoleDialogFlag = true;'>新增</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
                        <el-button type="text" size="small" @click='editRole(scope)'>修改</el-button>
                        <el-button type="text" size="small" @click='deleteRole(scope)'>删除</el-button>
                    </template>
			</el-table-column>
		</el-table>

		<section class="main-pagination">
			<!-- 特殊情况分页自己按注释的  -->
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</section>
	<!--新建角色-->
	<el-dialog title="新建角色" :visible.sync='newRoleDialogFlag' :close-on-click-modal="true">
		<el-form :model="roleData" label-width="130px" :rules="createRoleRules" ref="roleData">
			<el-form-item label="角色名称" prop="name">
				<el-input v-model="roleData.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色Code" prop="code">
				<el-input v-model="roleData.code" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色描述" prop="description">
				<el-input v-model="roleData.description"></el-input>
			</el-form-item>
			<el-form-item label="是否可用">
				<el-radio-group v-model="roleData.available" @change='aaa'>
					<el-radio label="T">是</el-radio>
					<el-radio label="F">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="是否允许再次授权">
				<el-radio-group v-model="roleData.reGrant" @change='aaa'>
					<el-radio label="T">是</el-radio>
					<el-radio label="F">否</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="newRoleDialogFlag = false">取消</el-button>
			<el-button type="primary" @click.native="createRoleSubmit">提交</el-button>
		</div>
	</el-dialog>
	<!--编辑界面-->
	<el-dialog title="修改角色" :visible.sync='editProjectDialogFlag' :close-on-click-modal="true">
		<el-form :model="roleData" label-width="120px" :rules="editRoleRules" ref="editData">
			<el-form-item label="产品类型" prop="productCode">
				<el-input v-model="editData.productCode" auto-complete="off" readonly></el-input>
			</el-form-item>
			<el-form-item label="角色名称" prop="name">
				<el-input v-model="editData.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色说明">
				<el-input v-model="editData.remark"></el-input>
			</el-form-item>
			<el-form-item label="角色开始时间">
				<el-date-picker type="date" placeholder="选择日期" v-model="editData.startTime"></el-date-picker>
			</el-form-item>
			<el-form-item label="角色终止时间">
				<el-date-picker type="date" placeholder="选择日期" v-model="editData.endTime"></el-date-picker>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editProjectDialogFlag = false">取消</el-button>
			<el-button type="primary" @click.native="editRoleSubmit">提交</el-button>
		</div>
	</el-dialog>
	<!--角色配置-->
	<el-dialog title="角色配置" :visible.sync='configProjectFlag' :close-on-click-modal="false">
		<el-form :model="configProjectData" label-width="120px" :rules="configProjectRules" ref="configProjectData">
			<el-form-item v-for="elem in projectRoleList" :key="elem.key" :label="elem.enterpriseName" prop="role">
				<el-select v-model="configProjectData.role">
					<el-option v-for="item in allRoleList" :value="item.code" :key="item.code" :label="item.name">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="configProjectFlag = false">取消</el-button>
			<el-button type="primary" @click.native="editRoleSubmit">提交</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
import headTop from '@/components/headTop'
import moment from 'moment'

import {
	getProjectList
} from '@/api/getData'

import {
	getRolesListRequest,
	getRolesByProjectRequest,
	getUnbindedRolesListRequest,
	bindProjectRequest,
	AuditingProjectRequest,


	createRoleRequest,
	deleteRoleRequest
} from '@/api/enterpriseApi'
import {
	modifyProjectInfo,
	deleteProject
} from '@/api/coreApi'
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
				label: '角色名称',
				prop: 'name',
				//				sortable: true,
				minWidth: 80,
			}, {
				label: '角色描述',
				prop: 'description',
				//				sortable: true,
				width: 150
			}, {
				label: '角色编码',
				prop: 'code',
				//				sortable: true,
				minWidth: 100,
			}, {
				label: '创建时间',
				prop: 'createTime',
				sortable: true,
				formatter: (row, column) => {
					return row.createTime != null ? moment(row.createTime).format(dateFormat) : ''
				}
			}, {
				label: '最后更新',
				prop: 'modifiedTime',
				sortable: true,
				formatter: (row, column) => {
					return row.modifiedTime != null ? moment(row.modifiedTime).format(dateFormat) : ''
				},
			}, {
				label: '已绑定企业类型编码',
				prop: 'productEnterpriseRoleCode',
				sortable: true,
			}, {
				label: 'reGrant',
				prop: 'reGrant',
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
			//搜索
			query: {
				name: ''
			},
			//创建角色模态框
			newRoleDialogFlag: false,
			roleData: {
				name: '',
				code: '',
				description: '',
				available: 'T',
				reGrant: 'T'
			},
			createRoleRules: {
				name: [{
					required: true,
					message: '请输入角色名称',
					trigger: 'blur'
				}],
				code: [{
					required: true,
					message: '请输入角色Code',
					trigger: 'blur'
				}],
				description: [{
					required: true,
					message: '请输入角色描述',
					trigger: 'blur'
				}],
			},
			//搜索条件的个数
			criteriaNum: 3,
			//编辑角色模态框
			editProjectDialogFlag: false,
			editRoleEid: 0,
			editData: {
				productCode: '',
				name: '',
				remark: '',
				startTime: '',
				endTime: ''
			},
			editRoleRules: {
				name: [{
					required: true,
					message: '请输入角色名称',
					trigger: 'blur'
				}],
				code: [{
					required: true,
					message: '请输入角色Code',
					trigger: 'blur'
				}],
				description: [{
					required: true,
					message: '请输入角色描述',
					trigger: 'blur'
				}],
			},
			//编辑角色模态框
			editProjectDialogFlag: false,
			editRoleEid: 0,
			editData: {
				productCode: '',
				name: '',
				remark: '',
				startTime: '',
				endTime: ''
			},
			editRules: {
				productCode: [{
					required: true,
					message: '请输入角色创建时间',
					trigger: 'blur'
				}],
				createTime: [{
					required: true,
					message: '请输入角色创建时间',
					trigger: 'blur'
				}],
				name: [{
					required: true,
					message: '请输入角色名称',
					trigger: 'blur'
				}]
			},

			//配置角色模态框
			configProjectFlag: false,
			projectRoleList: [],
			allRoleList: [],
			configProjectData: {
				eid: '',
				epid: '',
				role: '',
			},
			configProjectRules: {
				role: [{
					required: true,
					message: '请选择企业角色类型'
				}]
			}
		}
	},
	activated() {
		this.initData();
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
				params: {},
				eid: this.$store.state.loginInfo.enterpriseId
			};

			options.params = Object.assign(this.pagination.params, this.query)
			console.log(options);
			getRolesListRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result);
					this.tableList = result;
				})
			})
		},
		createRoleSubmit() {
			this.$refs['roleData'].validate(valid => {
				if (valid) {
					try {
						let options = {
							params: {
								name: this.roleData.name,
								code: this.roleData.code,
								description: this.roleData.description,
								available: this.roleData.available,
								reGrant: this.roleData.reGrant
							},
							eid: this.$store.state.loginInfo.enterpriseId
						}
						console.log(options)
						createRoleRequest(options).then(response => {
							if (response.status == 200) {
								this.$message({
									message: '角色创建成功',
									type: 'success'
								})
								this.newRoleDialogFlag = false;
								this.initData();
								this.$refs['roleData'].resetFields();
							}
						})
					} catch (e) {
						this.$message.error(e)
					}
				}
			})
		},
		editRole(scope) {
			this.editRoleEid = scope.row.id;
			this.editProjectDialogFlag = true;
			this.editData.productCode = scope.row.productCode;
			this.editData = {
				name: scope.row.name,
				code: scope.row.code,
				description: scope.row.description,
				available: scope.row.available,
				reGrant: scope.row.reGrant
			}
		},

		editRoleSubmit() {
			this.$refs['configProjectData'].validate(async(valid) => {
				if (valid) {
					try {
						let options = {
							eid: this.configProjectData.eid,
							pid: this.configProjectData.pid,
							body: {
								code: this.configProjectData.role
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
					} catch (e) {
						this.$message.error(e)
					}
				}
			})
		},
		goToConfigProject(scope) {
			this.$router.push({
				name: 'enterpriseTypeRoleBinding',
				query: {
					pid: scope.row.id,
					eid: scope.row.ownerEnterpriseId,
					productCode: scope.row.productCode
				}
			})
		},
		deleteRole(scope) {

			this.$confirm('确认删除该角色?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let options = {
					procode: scope.row.code,
					ercode: scope.row.productEnterpriseRoleCode,
					id: scope.row.id
				}
				console.log(options)
				deleteRoleRequest(options).then(() => {
					this.getList();
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		search() {
			this.getList();
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
		},
		resetTable() {
			this.query.name = '';
			this.getList();
		},


		getProductEnterpriseType(productCode) {
			let options = {
				productCode: productCode
			}
			for (var item in this.productList) {
				if (this.productList[item].code == productCode) {
					options.id = this.productList[item].id;
				}
			}
			console.log(options);
			enterpriseRolesListRequest(options).then(response => {
				response.json().then(result => {
					this.productEnterpriseTypeList = result;
				})
			})
		},
		chooseProductType() {
			this.productCode = this.formData.productCode;
			this.getProductEnterpriseType(this.productCode);
			this.formData.type = '';
		},
		activate(scope) {
			console.log(scope)
			let options = {
				body: {},
				id: scope.row.id,
				state: ''
			}
			if (scope.row.state == 'R') {
				options.state = 'P';
				this.$message({
					message: '已暂停此角色',
					type: 'success'
				});
			} else {
				options.state = 'R';
				this.$message({
					message: '已激活此角色',
					type: 'success'
				});
			}
			AuditingProjectRequest(options).then(response => {
				console.log(response);
				if (response.status == 200) {
					this.getList();
				}
			})
		},

		aaa(value) {
			alert(value)
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
