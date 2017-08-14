<template>
<div class="fillcontain">
	<head-top></head-top>
	<!-- <div class="header_container">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ name: 'manager' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="(item, index) in $route.meta.breadcrumb" key="index">{{item}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div> -->

	<!--  搜索条件  -->
	<!-- <section class='search-criteria-container'>
		<el-form :inline="true" :model="query" ref="query">
			<el-row>
				<el-col :span="6">
					<el-form-item prop="name">
						<el-input v-model="query.name" size="large" placeholder="产品名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item prop="code">
						<el-input v-model="query.code" size="large" placeholder="产品编码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6" :offset="6 * (3 - (criteriaNum % 4))" style="float: right">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button icon="plus" type="primary" @click="addNotice()" style="float: right; margin-bottom: 5px;">新增</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		</el-col>
	</section> -->

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
			<el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template scope='scope'>
<!--					<el-button type="text" size="small" @click='getEnterpriseReport(scope)'>企业填报信息</el-button>-->
					<el-button type="text" size="small" @click='evaluateEnterprise(scope)'>企业准入</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="请选择评估模型" :visible.sync="evaluateEnterpriseDialogFlag">
			<el-form :inline="true">
				<el-form-item label="请选择行业" inline>
					<el-select v-model="industryType" placeholder="请选择" @change='selectIndustry'>
						<el-option v-for="item in industryList" :key='item.id' :label="item.industryName" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="请选择模型" inline>
					<el-select v-model="modelType" placeholder="请选择">
						<el-option v-for="item in modelList" :key='item.key' :label="item.gradeCardName" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="evaluateEnterpriseDialogFlag = false">取 消</el-button>
				<el-button type="primary" @click="toEvaluate()">确 定</el-button>
			</div>
		</el-dialog>
		<section class="main-pagination">
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</section>
	</span>
	</el-dialog>
</div>
</template>

<script>
import headTop from '../../components/headTop'
import myPagination from '@/components/myPagination'
import {
	allIndustryListRequest,
	scoringmodelNameByIndustryRequest,
	templateReportListRequest,
} from '@/api/templateApi'
import {
	veyiterpriseAccessRequest,
} from '@/api/enterpriseApi'
import {
	mapState
} from 'vuex'
import moment from 'moment'
export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			eid: this.$store.state.loginInfo.enterpriseId,
			pid: '',
			//table columns
			columns: [{
				label: '企业名称',
				prop: 'enterpriseName',
				sortable: true,
			}, {
				label: '创建时间',
				prop: 'id',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '项目名称',
				prop: 'projectName',
				sortable: true,
			}, {
//				label: '企业类型',
//				prop: 'roleName',
//				sortable: true,
//			}, {
				label: '组织机构代码',
				prop: 'codeOrg',
				sortable: true,
			}, {
				label: '城市',
				prop: 'city',
				sortable: true,
			}, {
				label: '联系人',
				prop: 'contacts',
				sortable: true,
			}, {
				label: '电话',
				prop: 'contactsPhone',
				sortable: true,
			}, {
				label: '授信状态',
				prop: 'creditState',
				sortable: true,
                formatter:row=>{
                    switch (row.creditState) {
						case 'T':
							return '可用';
						case 'F':
							return '不可用';
					}
                }
			}],
			//分页信息
			pagination: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
			//table
			tableList: [],
			listLoading: false,
			emptyText: "暂无数据",
			//搜索条件的个数
			criteriaNum: 3,
			//选择模型模态框
			evaluateEnterpriseDialogFlag: false,
			industryList: [],
			industryType: '',
			modelList: [],
			modelType: ''

		}
	},
	components: {
		headTop,
		myPagination
	},
	activated() {
		this.initData();
	},
	deactivated() {
		this.tableList = [];
		//        this.industryList = [];
		//        this.modelList = [];
		this.industryType = '';
		this.modelType = '';
	},
	computed: {
		...mapState(["loginInfo"])
	},
	methods: {
		async initData() {
			this.listLoading = true;
			this.pagination.page = 1;
			this.getList();
			try {
				this.listLoading = false;
				if (!this.tableList.length) {
					this.emptyText = "暂无数据";
				}
			} catch (e) {
				this.emptyText = "获取数据失败";
				this.listLoading = false;
			}
		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
		},
		getList() {
			let params = {
				params: this.pagination.params
			}
			let options = Object.assign({
				id: this.eid
			}, params)
			console.log(params)
			veyiterpriseAccessRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result)
					this.tableList = result;
				})
			})
		},
		getEnterpriseReport(scope) {
//			modelId
			console.log(scope);
			let options = {
				eid: scope.row.employerId,
				// params:{}
			}
			console.log(options);
			templateReportListRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);

				})
			})
		},
		getIndustryList() {
			let options = {}
			allIndustryListRequest().then(response => {
				response.json().then(result => {
					console.log(result);
					this.industryList = result;
				})
			})
		},
		getModelList() {
			let options = {
				params: {
					eid: this.eid,
					hid: this.industryType
				}
			}
			scoringmodelNameByIndustryRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.modelList = result;
				})
			})
		},
		evaluateEnterprise(scope) {
			console.log(this.pid);
			this.pid = scope.row.projectId;
            this.employerId = scope.row.employerId;
			this.evaluateEnterpriseDialogFlag = true;
			this.getIndustryList();
		},
		selectIndustry() {
			this.getModelList();
		},
		toEvaluate() {
			console.log(this.industryType);
			this.evaluateEnterpriseDialogFlag = false;
			this.$router.push({
				name: 'admittanceEvaluating',
				params: {
					modelId: this.modelType,
					employerId: this.employerId
				}
			})
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
