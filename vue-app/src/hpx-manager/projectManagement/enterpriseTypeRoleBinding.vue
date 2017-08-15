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
					<el-table-column label="操作">
						<template scope="scope">
                            <el-button type="text" size="small" @click="bindEnterpriseType(scope)">绑定</el-button>
                        </template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			<el-tab-pane label="已绑定">
				<el-table row-key="id" :empty-text="emptyText" :data="bindedTableList" v-loading="listLoading" highlight-current-row style="width: 100%">
					<el-table-column v-for="(item,index) in columns2" key="index" :label="item.label" :prop="item.prop" :sortable="item.sortable" :width="item.width ? item.width : 'auto'" :formatter="item.formatter" :min-width="item.minWidth ? item.minWidth : 'auto'">
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
                            <el-button type="text" size="small" @click="debindRole(scope)">解绑</el-button>
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
		<el-dialog title="角色配置" :visible.sync='bindEnterpriseTypeFlag' :close-on-click-modal="true">
			<el-form :model="bindRoleData" label-width="120px" :rules="bindEnterpriseTypeRules" ref="bindRoleData">
				<el-form-item label="可绑定角色" prop='role'>
					<el-select v-model="bindRoleData.role" @change='chooseEnterpriseRoles'>
						<el-option v-for="item in unbindedRolesList" :value="item.id" :key="item.name" :label="item.name">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="bindEnterpriseTypeFlag = false">取消</el-button>
				<el-button type="primary" @click.native="bindEnterpriseTypeSubmit">提交</el-button>
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
			bindEnterpriseTypeFlag: false,
			enterpriseList: [],
			unbindedRolesList: [],
			bindRoleData: {
				entRole: '',
				pid: '',
                productCode:'',
				role: ''
			},
			bindEnterpriseTypeRules: {
				role: [{
					required: true,
					message: '请选择需绑定的角色',
                    trigger: 'blur'
				}]
			}
		}
	},
	activated() {
//		this.getParams();
		this.initData();
	},
	deactivated() {
		this.bindRoleData = {};
	},
	methods: {
		initData() {
			this.listLoading = true;
			try {
				this.getBindedEnterpriseTypes();
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
			this.routeParams.eid = this.$route.query.eid;
			this.routeParams.productCode = this.$route.query.productCode;
		},
        bindEnterpriseType(scope) {
			this.bindRoleData.pid = Number(this.$route.query.pid);
			this.bindRoleData.entRole = scope.row.code;
			this.getUnbindedRolesList();
			this.bindEnterpriseTypeFlag = true;
		},
        
        bindEnterpriseTypeSubmit() {
            this.$refs['bindRoleData'].validate((valid) => {
//                if(valid){
//                    alert('dsds')
//                }
                let options = {
                    entRole: this.bindRoleData.entRole,
                    pid: this.bindRoleData.pid,
                    productCode: this.$route.query.productCode,
                    body: {
                        id: this.bindRoleData.role,
                    }
                }
                console.log(options);
//                bindProjectRequest(options).then(response => {
//                    if (response.status == '200') {
//                        this.bindEnterpriseTypeFlag = false;
//                        this.initData();
//                    }
//                })
            })
		},
		chooseEnterpriseRoles(value) {
			for (var item in this.unbindedRolesList) {
				if (this.unbindedRolesList[item].code == value) {
					this.bindRoleData.id = this.unbindedRolesList[item].id;
				}
			}
			console.log(this.bindRoleData)
		},
        getUnbindedEnterpriseTypes() {
			let options1 = {
				pid: this.$route.query.pid,
				code: this.$route.query.productCode
			}
			console.log(options1)
			getUnbindedEnterpriseTypesRequest(options1).then(response => {
				response.json().then(result => {
//					console.log(result);
					this.unbindedTableList = result;
				})
			}).catch(err => {
				console.log(err)
			})
		},
		getUnbindedRolesList() {
            this.bindRoleData.role='';
			let options = {
				pid: this.routeParams.pid,
				code: this.routeParams.productCode
			}
			console.log(options)
			getUnbindedRolesListRequest().then(response => {
				response.json().then(result => {
					console.log(result)
					this.unbindedRolesList = result;
				})
			})
		},
		
		getBindedEnterpriseTypes() {
			let options1 = {
				pid: this.$route.query.pid,
				code: this.$route.query.productCode
			}
			console.log(options1)
			getBindedEnterpriseTypesRequest(options1).then(response => {
				response.json().then(result => {
					console.log(result);
					this.bindedTableList = result;
					this.getUnbindedEnterpriseTypes();
				})
			}).catch(err => {
				console.log(err)
			})
		},
		
		debindRole(scope) {
			let options = {
				entRole: scope.row.code,
				pid: this.routeParams.pid,
				body: {
					id: scope.row.roleId
				}
			}
			console.log(options)
			debindProjectRequest(options).then(response => {
				if (response.status == '200') {
                    this.getBindedEnterpriseTypes();
				}
			})
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
