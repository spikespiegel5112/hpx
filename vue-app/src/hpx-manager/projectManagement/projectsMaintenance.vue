<template>
<div class="fillcontain">
	<head-top></head-top>

	<!--  搜索条件  -->
	<section class='search-criteria-container'>
		<el-form :inline="true" :model="query" ref="query">
			<el-row>
				<el-col :span="5">
					<el-form-item prop="name">
						<el-input v-model="query.name" size="large" placeholder="企业名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item prop="activated">
						<el-select v-model="query.activated" size="large" placeholder="激活状态">
							<el-option v-for="item in activatedOptions" :key="item.activated" :label="item.value" :value="item.activated">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item prop="auditState">
						<el-select v-model="query.auditState" size="large" placeholder="认证状态">
							<el-option v-for="item in auditStateOptions" :key="item.auditState" :label="item.value" :value="item.auditState">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="7" :offset="6 * (3 - (criteriaNum % 4))">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
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
			<el-table-column type="index" width="100">
			</el-table-column>
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="check(scope.$index, scope.row)">修改</el-button>
					<el-button type="text" size="small" @click="deleteProject(scope.$index, scope.row)">删除</el-button>
					<el-button type="text" size="small" @click="audit(scope.$index, scope.row)">审核</el-button>
				</template>
			</el-table-column>
		</el-table>

		<section class="main-pagination">
			<!-- 特殊情况分页自己按注释的  -->
			<!-- <el-pagination
                    :current-page="page"
                    :page-size="size"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="pageSizes"
                    @current-change="currentChange"
                    @size-change="pageSizeChange"
                >
                </el-pagination> -->
			<!-- page租组件  -->
			<my-Pagination :callback="getList" :query="query" :total="total">
			</my-Pagination>
		</section>
	</section>
	<!--编辑界面-->
	<el-dialog title="编辑" v-model="editeModalVisible" :close-on-click-modal="false">
		<el-form :model="editeData" label-width="80px" :rules="editRules" ref="editeData">
			<el-form-item label="企业编号" prop="id" readonly>
				<el-input v-model="editeData.id" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="企业名称" prop="name">
				<el-input v-model="editeData.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label='激活状态' prop="activated">
				<el-select v-model="editeData.activated">
					<el-option v-for="item in activatedOptions" :key="item.activated" :label="item.value" :value="item.activated">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="editeData.contactsNumber"></el-input>
			</el-form-item>
			<el-form-item label="更新时间">
				<el-date-picker type="date" placeholder="选择日期" v-model="editeData.birth"></el-date-picker>
			</el-form-item>
			<el-form-item label="地址">
				<el-input type="textarea" v-model="editeData.address"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editeModalVisible = false">取消</el-button>
			<el-button type="primary" @click.native="editSubmit">提交</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
import headTop from '@/components/headTop'
import myPagination from '@/components/myPagination'
// import projectCreate from '@/components/projectCreate'
import moment from 'moment'
import {
	getProjectList
} from '@/api/getData'
import {
	mapState
} from 'vuex'


export default {
	components: {
		headTop,
		myPagination,
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
				label: '项目说明',
				prop: 'remark',
				sortable: true,
				minWidth: 200
			}, {
				label: '项目开始时间',
				prop: 'startTime',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '项目终止时间',
				prop: 'endTime',
				sortable: true,
				formatter: (row, column) => moment(column.endTime).format(dateFormat)
			}, {
				label: '建立人',
				prop: 'creator',
				sortable: true,
			}, {
				label: '项目状态',
				prop: 'state',
				sortable: true,
			}, {
				label: '记录时间',
				prop: 'createTime',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '更新人',
				prop: 'modifiedBy',
				sortable: true,
			}, {
				label: '最后更新',
				prop: 'modifiedTime',
				sortable: true,
				formatter: (row, column) => moment(column.modifiedTime).format(dateFormat)
			}],

			//table
			tableList: [],
			listLoading: false,
			emptyText: "暂无数据",

			//分页
			page: 1, //当前页
			size: 2, //每页个数
			total: 0, //总数
			pageSizes: [2, 4, 6],

			//search params
			query: {
				eid: this.$store.state.loginInfo.enterpriseId
			},
			activatedOptions: [{
				value: '激活',
				activated: 'T'
			}, {
				value: '未激活',
				activated: 'F'
			}],
			auditStateOptions: [{
				value: '已认证',
				auditState: 'T'
			}, {
				value: '未认证',
				auditState: 'F'
			}],
			rules: {

			},
			//搜索条件的个数
			criteriaNum: 3,

			//模态框
			editeModalVisible: false,
			editeData: {
				id: '',
				name: '',
				activated: '',
				address: '',
				contactsNumber: '',
				birth: ''
			},
			editRules: {
				name: [{
					required: true,
					message: '请输入姓名',
					trigger: 'blur'
				}]
			}
		}
	},

	created() {
		this.initData();
	},
	mounted() {

	},
	computed: {
		loginInfo() {
			return this.$store.state.loginInfo
		}
	},
	methods: {
		createProject() {
			this.$router.push({
				name: 'projectCreate'
			})
		},
		deleteProject() {
			this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {

				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		dialogVisible() {

		},
		convertDate(row, column) {
			alert('date')
			// var date = row[column.property];
			return 'aaa'
			// return this.$moment.unix(1498276589000)
		},
		async initData() {
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
		async getList(pagination = {
			page: 1,
			size: 10
		}) {
			const params = Object.assign({
				eid: this.$store.state.loginInfo.enterpriseId
			}, pagination);
			const response = await getProjectList();
			const res = await response.json();
			const total = response.headers.get('x-total-count')
			this.tableList = [...res];
			console.log(this.tableList)
			this.total = parseInt(total);
		},
		async search() {
			try {
				this.getList();
			} catch (e) {

			}
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		check(index, row) {
			console.log(this.$route.path)
			this.$router.push({
				path: this.$route.path + '/detail/' + row.id
			})
			console.log(index, row)
		},
		edit(index, row) {
			this.editeModalVisible = true;
			this.editeData = Object.assign({}, { ...row
			})
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
