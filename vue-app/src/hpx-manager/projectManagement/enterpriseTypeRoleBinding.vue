<template>
<div class="fillcontain">
    <commonDetailTitle routerName='projectsMaintenance' title="产品类型角色绑定"></commonDetailTitle>
<!--	<head-top></head-top>-->

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
			
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="对应角色" prop="enterpriseStatus">
			  
               
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="configProject(scope)">配置</el-button>
				</template>
			</el-table-column>
		</el-table>

		<section class="main-pagination">
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
		
		<!--项目配置-->
        <el-dialog title="项目配置" :visible.sync='configProjectFlag' :close-on-click-modal="false">
            <el-form :model="configProjectData" label-width="120px" :rules="configProjectRules" ref="configProjectData">
                <el-form-item label="可绑定角色">
                    <el-select v-model="configProjectData.role" @change='chooseEnterpriseRoles'>
                        <el-option v-for="item in allRoleList" :value="item.code" :key="item.code" :label="item.name">
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
	getAllRolesListRequest,
	bindProjectRequest
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
			//table columns
			columns: [{
				label: '产品类型',
				prop: 'productName',
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
			
            routeParams:{
                pid:'',
                eid:''
            },
			//配置项目模态框
			configProjectFlag: false,
			projectRoleList: [],
            allRoleList: [],
			configProjectData: {
				eid: '',
				pid: '',
				role: '',
                id: ''
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
    deactivated(){
        this.configProjectData.code='';
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
        getParams(){
            this.routeParams.pid=this.$route.query.pid;
            this.routeParams.eid=this.$route.query.pid;
        },
        configProject(scope) {
            this.configProjectData.eid=scope.row.enterpriseId;
            
            getAllRolesListRequest().then(response=>{
                response.json().then(result=>{
                    console.log(result);
                    
                    this.allRoleList = result;
                })
            })
			this.configProjectFlag = true
		},
		getList() {
            this.configProjectData.pid=this.routeParams.eid;
            let options1 = {
				pid: this.configProjectData.pid,
				params: {}
			}
			options1.params = Object.assign(options1.params, this.pagination.params)
			getRolesByProjectRequest(options1).then(response => {
				response.json().then(result => {
					console.log(result);
					this.tableList = result;
				})
			})
		},
		
		configProjectSubmit() {
			this.$refs['configProjectData'].validate(async(valid) => {
				if (valid) {
					try {
						let options = {
							eid: this.configProjectData.eid,
							pid: Number(this.configProjectData.pid),
							body: {
								code: this.configProjectData.role,
                                id: this.configProjectData.id
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
		
        chooseEnterpriseRoles(value){
            for(var item in this.allRoleList){ if(this.allRoleList[item].code==value){
                alert(this.allRoleList[item].id)
                    this.configProjectData.id=this.allRoleList[item].id;
                }
            }
            console.log(this.configProjectData)
        },
		search() {
			this.getList();
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
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
