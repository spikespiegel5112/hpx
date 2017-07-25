<template>
<div class="fillcontain">
	<head-top></head-top>

	<!--  搜索条件  -->
	<section class='search-criteria-container'>
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
						<el-button icon="plus" type="primary" @click="addNews" style="float: right; margin-bottom: 5px;">新增</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		</el-col>
	</section>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
			<el-table-column label="序号" type="index" prop="num" width="80" align="center">
			</el-table-column>
			<el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template scope="scope">
                        <el-button type="text" size="small" @click="abled(scope.row.id)">查询</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
			</el-table-column>
		</el-table>
		<section class="main-pagination">
			<my-Pagination :callback="getList" :total="total">
			</my-Pagination>
		</section>
	</section>

</div>
</template>

<script>
import headTop from '../../components/headTop'
import myPagination from '../../components/myPagination'
import {
	noticeRequest
} from '@/api/getData'
import {
	mapState
} from 'vuex'
import moment from 'moment'
export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			//table columns
			columns: [{
				label: '标题',
				prop: 'title',
				sortable: true,
			}, {
				label: '发布时间',
				prop: 'createTime',
				sortable: true,
				formatter: (row, column) => moment(column.createTime).format(dateFormat)
			}, {
				label: '发布者',
				prop: 'creator',
				sortable: true,
			}],
			//总页数
			total: 0,
			//table
			tableList: [],
			listLoading: false,
			emptyText: "暂无数据",

			//search params
			query: {

			},
			enabledOptions: [{
					value: '启用',
					available: 'T'
				},
				{
					value: '禁用',
					available: 'F'
				}
			],
			//搜索条件的个数
			criteriaNum: 2,

			//模态框
			modalTitle: '',
			editeModalVisible: false,
			productEnterpriseRoleList: [],
			editeData: {
				id: '',
				code: '',
				name: '',
				entryUrl: '',
				available: '',
				modifiedTime: '',
				productEnterpriseRole: [],
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
	activated(){
		this.initData();
	},
	computed: {
		...mapState(["loginInfo"])
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
			const params = Object.assign({}, this.query, pagination);
			const resp = await noticeRequest(params);
			const res = await resp.json();
			const total = resp.headers.get('x-total-count')
			this.tableList = [...res];
			this.total = parseInt(total);
		},
		async search() {
			try {
				this.getList();
			} catch (e) {

			}
		},

		addNews() {
			this.$router.push({
                name: 'newsPublish'
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
