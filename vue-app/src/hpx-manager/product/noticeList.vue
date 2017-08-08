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
	<section class='search-criteria-container'>
		<el-form :inline="true" :model="queryParams" ref="queryParams">
			<el-row>
				<el-col :span="4">
					<el-form-item prop="name">
						<el-select v-model="queryParams.type" placeholder="请选择">
							<el-option v-for="item in noticeTypeList" :key='item.code' :label="item.name" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="18">
					<el-form-item>
						<el-button type="primary" icon="search" @click="search">查询</el-button>
						<el-button type="primary" @click="clearQuery">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button icon="plus" type="primary" @click="addNotice()" style="float: right; margin-bottom: 5px;">新增</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</section>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
			<el-table-column label="序号" type="index" prop="num" width="80" align="center">
			</el-table-column>
			<el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template scope="scope">
                    <el-button type="text" size="small" @click="reviewNotice(scope)">查看</el-button>
                    <el-button type="text" size="small" @click="modifyNotice(scope)">修改</el-button>
					<el-button v-if="scope.row.istop=='1'"  type="text" size="small" @click="setTop(scope)">置顶</el-button>
					<el-button v-else-if="scope.row.istop=='0'"  type="text" size="small" @click="setTop(scope)">取消置顶</el-button>
					<el-button type="text" size="small" @click="deleteNotice(scope)">删除</el-button>
                </template>
			</el-table-column>
		</el-table>
		<section class="main-pagination">
			<el-pagination @current-change="flipPage" :current-page="pagination.params.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</section>
</div>
</template>

<script>
import headTop from '@/components/headTop'
import {
	noticeListRequest,
	publishnoticeListRequest,
	modifynoticeListRequest,
	deletenoticeListRequest
} from '@/api/noticeApi'
import {
	getDictionaryByCodeRequest
} from '@/api/dictionaryApi'
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
			//文章类型列表
			noticeTypeList:[],
			queryParams: {
				type:'',
			},

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
			//模态框
			deleteNoticeFlag: false,
		}
	},
	components: {
		headTop
	},
	mounted() {
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
				this.getNoticeType();
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
			options.params = Object.assign(options.params, this.pagination.params, this.queryParams);
			console.log(options);
			noticeListRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result);
					this.tableList = result
				})
			})
		},
		getNoticeType(){
			getDictionaryByCodeRequest({
				code: 'PUB_TYPE'
			}).then(response => {
				response.json().then(result => {
					console.log(result);
					this.noticeTypeList = result;
				})
			})
		},
		search() {
			try {
				this.getList();
			} catch (e) {

			}
		},
		addNotice() {
			this.$router.push({
				name: 'noticeEdit',
				params: {
					noticeId: 'add&'
				}
			})
		},
		modifyNotice(scope) {
			this.$router.push({
				name: 'noticeEdit',
				params: {
					noticeId: 'modify&' + scope.row.id
				}
			})
		},
		reviewNotice(scope) {
			this.$router.push({
				name: 'noticeEdit',
				params: {
					noticeId: 'review&' + scope.row.id
				}
			})
		},
		deleteNotice(scope) {
			this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deletenoticeListRequest(scope.row.id).then(() => {
					this.tableList = [];
					this.getList();
					this.deleteNoticeFlag = false;
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		setTop(scope) {
			this.$confirm('确认将此条信息置顶?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let istopStatus;
				if (scope.row.istop == '0') {
					istopStatus = '1';
				} else if (scope.row.istop == '1') {
					istopStatus = '0';
				}
				let options = {
					id: scope.row.id,
					body: {
						istop: istopStatus
					}
				}
				console.log(options);
				modifynoticeListRequest(options).then(response => {
					console.log(response);
					response.json().then(result => {
						console.log(result);
						this.getList();
					})
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消置顶'
				});
			});

		},
		flipPage(pageIndex) {
			this.pagination.params.page = pageIndex;
			this.getList();
		},
		clearQuery(value){
			this.queryParams.type='';
			this.getList();
		},
	}
}
</script>

<style lang="less">
@import '../../style/mixin';
.table_container {
    padding: 20px;
}
</style>
