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
						<el-button icon="plus" type="primary">新增</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		</el-col>
	</section>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row style="width: 100%">
			<el-table-column type="index" width="100">
			</el-table-column>
			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="check(scope.$index, scope.row)" >查看</el-button>
					<el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
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
import moment from 'moment'
import {
	projectsAuditList
} from '@/api/getData'
import {
	mapState
} from 'vuex'

export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			//table columns
			columns: [{
				label: '产品',
				prop: 'productName',
				sortable: true,
			}, {
				label: '项目名称',
				prop: 'projectName',
				sortable: true,
				minWidth: 120,
			}, {
				label: '参与角色',
				prop: 'enterpriseRole',
				sortable: true,
			}, {
				label: '项目起始日',
				prop: 'startTime',
				sortable: true,
				minWidth: 200,
				formatter : (row,column) => moment(column.startTime).format(dateFormat)
			}, {
				label: '项目结束日',
				prop: 'endTime',
				sortable: true,
				formatter : (row,column) => moment(column.endTime).format(dateFormat)
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
				eid: this.$store.state.loginInfo.enterpriseId,
				pid: '',
				inviteStatus: '',
				state: ''
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
	components: {
		headTop,
		myPagination,
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
            console.log(this.query)
			const params = Object.assign(this.query, pagination);

			const response = await projectsAuditList(params);

			console.log(response)
			const res = await response.json();
			const total = response.headers.get('x-total-count')
			this.tableList = [...res];
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
		edite(index, row) {
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
