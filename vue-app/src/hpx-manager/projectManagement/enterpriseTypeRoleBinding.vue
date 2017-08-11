<template>
<div class="fillcontain">
    <commonDetailTitle routerName='admittanceManagement' title="企业类型角色绑定"></commonDetailTitle>
<!--	<head-top></head-top>-->

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
			
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="对应角色" prop="enterpriseStatus">
				<el-form :model="configProjectData" label-width="120px" :rules="configProjectRules" ref="configProjectData">
                    <el-form-item v-for="elem in projectRoleList" :key="elem.key" :label="elem.enterpriseName" prop="role">
                        <el-select v-model="configProjectData.role">
                            <el-option v-for="item in allRoleList" :value="item.code" :key="item.code" :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click='editProjet(scope)'>修改</el-button>
					<el-button type="text" size="small" @click="configProject(scope)">配置</el-button>
				</template>
			</el-table-column>
		</el-table>

		<section class="main-pagination">
			<!-- 特殊情况分页自己按注释的  -->
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</section>
	
</div>
</template>

<script>
import commonDetailTitle from '@/components/commonDetailTitle'
import headTop from '@/components/headTop'
import {
	getProjectList
} from '@/api/getData'

import {
    getRolesByProjectRequest,
	getAllRolesListRequest,
	bindProjectRequest
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
		headTop,
        commonDetailTitle
	},
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			//table columns
			columns: [{
				label: '企业类型',
				prop: 'productCode',
				sortable: true,
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
			//编辑项目模态框
			editProjectDialogFlag: false,
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
					required: true,
					message: '请输入项目创建时间',
					trigger: 'blur'
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
			},

			//配置项目模态框
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
					message: '请选择企业项目类型'
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
				params: {}
			}
			options.params = Object.assign(this.pagination.params, this.query);
			console.log(options);
			getProjectList(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result);
					this.tableList = result
				})
			})
		},
		editProjet(scope) {
			this.editProjetEid = scope.row.id;
			this.editProjectDialogFlag = true;
			this.editData.productCode = scope.row.productCode;
			this.editData = {
				productCode: scope.row.productCode,
				name: scope.row.name,
				remark: scope.row.remark,
				startTime: scope.row.startTime,
				endTime: scope.row.endTime
			}
		},
		async editProjetSubmit() {
			this.$refs['editData'].validate(async(valid) => {
				if (valid) {
					try {
						const response = await modifyProjectInfo(this.editProjetEid, this.editData);
						this.editProjectDialogFlag = false;
						this.initData();
					} catch (e) {
						this.$message.error(e)
					}
				}
			})
		},
		createProject() {
			this.$router.push({
				name: 'projectCreate'
			})
		},
		configProject(scope) {
			this.configProjectData.eid=scope.row.ownerEnterpriseId
			this.configProjectData.pid=scope.row.id

			let options1 = {
				pid: scope.row.id,
				params: {}
			}
			options1.params = Object.assign(options1.params, this.pagination.params)
			getRolesByProjectRequest(options1).then(response => {
				response.json().then(result => {
					console.log(result);
					this.projectRoleList = result;
				})
			})
            
            
            let options2 = {
				eid: this.$store.state.loginInfo.enterpriseId,
			}
            getAllRolesListRequest(options2).then(response=>{
                response.json().then(result=>{
                    console.log(result);
                    this.allRoleList = result;
                })
            })
			this.configProjectFlag = true
		},
		configProjectSubmit() {
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
		deleteProjectFunction(scope) {
			this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deleteProject(scope.row.id).then(() => {
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
		projectStateColor(scope) {
			let stateColor;
			switch (scope.row.state) {
				case 'B':
					stateColor = 'blue';
					break;
				case 'R':
					stateColor = 'Success';
					break;
				case 'E':
					stateColor = 'Black';
					break;
				case 'P':
					stateColor = 'Warning';
					break;
				case 'F':
					stateColor = 'danger';
					break;
			}
			return stateColor;
		},
		projectState(scope) {
			let state;
			switch (scope.row.state) {
				case 'B':
					state = '准备中';
					break;
				case 'R':
					state = '进行中';
					break;
				case 'E':
					state = '正常结束';
					break;
				case 'P':
					state = '暂停';
					break;
				case 'F':
					state = '异常结束';
					break;
			}
			return state;
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
