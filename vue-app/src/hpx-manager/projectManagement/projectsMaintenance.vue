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
				<el-col :span="7" :offset="6 * (3 - (criteriaNum % 4))">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="resetTable" @click="resetTable">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button icon="plus" type="primary" @click='createProject'>新增</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
			<el-table-column type="expand">
				<template scope="props">
					<el-form label-position="left" class="demo-table-expand">
						<el-form-item v-for="(value,i) in expand" :key="i" :label="value.label" :prop="value.prop" :formatter="value.formatter">
							<span>{{ props.row[value.prop] }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="状态" prop="enterpriseStatus">
				<template scope="scope">
					<el-tag :type="projectStateColor(scope)">{{projectState(scope)}}</el-tag>
				</template>
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
	<!--编辑界面-->
	<el-dialog title="修改项目" :visible.sync='editProjectDialogFlag' :close-on-click-modal="false">
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
			<el-button @click.native="editProjectDialogFlag = false">取消</el-button>
			<el-button type="primary" @click.native="editProjetSubmit">提交</el-button>
		</div>
	</el-dialog>
	<!--项目配置-->
	<el-dialog title="项目配置" :visible.sync='configProjectFlag' :close-on-click-modal="false">
		<el-form :model="configProjectData" label-width="120px" :rules="configProjectRules" ref="configProjectData">
			<el-form-item v-for="(item,index) in projectRoleList" :key="item.key" :label="item.enterpriseName" prop="enterpriseName">
				<!-- <el-select v-model="configProjectData[index].role" @change='chooseRole(value)'>
					<el-option v-for="item in projectRoleList" :value="item.enterpriseRole" :key="item.enterpriseRole" :label="item.enterpriseTypeName">
					</el-option>
				</el-select> -->
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="configProjectFlag = false">取消</el-button>
			<el-button type="primary" @click.native="configProjectSubmit">提交</el-button>
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
	getRolesByEnterpriseRequest,
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
		headTop
	},
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			//table columns
			columns: [{
				label: '产品编码',
				prop: 'productCode',
				sortable: true,
			}, {
				label: '项目编号',
				prop: 'code',
				sortable: true,
				minWidth: 120,
			}, {
				label: '项目名称',
				prop: 'name',
				sortable: true,
			}, {
				label: '项目开始时间',
				prop: 'startTime',
				sortable: true,
				formatter: (row, column) => {
					return row.startTime != null ? moment(row.startTime).format(dateFormat) : ''
				}
			}, {
				label: '项目终止时间',
				prop: 'endTime',
				sortable: true,
				formatter: (row, column) => {
					return row.endTime != null ? moment(row.endTime).format(dateFormat) : ''
				}
			}, {
				label: '最后更新',
				prop: 'modifiedTime',
				sortable: true,
				formatter: (row, column) => {
					return row.endTime != null ? moment(row.endTime).format(dateFormat) : ''
				}
			}],
			expand: [{
				label: '建立人',
				prop: 'creator',
				sortable: true,
			}, {
				label: '项目说明',
				prop: 'remark',
				sortable: true,
				minWidth: 200
			}, {
				label: '更新人',
				prop: 'modifiedBy',
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
			configProjectData: {
				eid: '',
				epid: '',
				code: [],
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

			let options = {
				pid: scope.row.id,
				params: {}
			}
			options.params = Object.assign(options.params, this.pagination.params)
			getRolesByEnterpriseRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.projectRoleList = result;
					for (var variable in this.projectRoleList) {
						this.configProjectData.push({
							role:''
						})
					}
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
		chooseRole(value, index){
			this.projectRoleList[index]=value;
			if (value==this.configProjectData[index].role) {

			}
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
