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
	</section>

	<section class="main-table-container">
		<el-table row-key="id" :empty-text="emptyText" :data="tableList" v-loading="listLoading" highlight-current-row border style="width: 100%">
			<el-table-column label="序号" type="index" prop="num" width="80" align="center">
			</el-table-column>
			<el-table-column align="center" v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template scope="scope">
                    <el-button type="text" size="small" @click="reviewNotice(scope)">查询</el-button>
                    <el-button type="text" size="small" @click="modifyNotice(scope)">修改</el-button>
					<el-button type="text" size="small" @click="deleteNotice(scope)">删除</el-button>
                </template>
			</el-table-column>
		</el-table>
		<section class="main-pagination">
			<my-Pagination :callback="getList" :query="query" :total="pagination.total">
			</my-Pagination>
            <el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
		</section>
	</section>
</div>
</template>

<script>
import headTop from '../../components/headTop'
import myPagination from '@/components/myPagination'
import {
	noticeListRequest,
	publishnoticeListRequest,
	deletenoticeListRequest
} from '@/api/noticeApi'
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
			pagination: {
			    params:{
                    page: 1,
                    size: 10,
                }
				total: 0,
			},
			//table
			tableList: [],
			listLoading: false,
			emptyText: "暂无数据",

			//search params
			query: {
                name:'',
                code:''
			},
			//搜索条件的个数
			criteriaNum: 3,
			//模态框
			deleteNoticeFlag: false,
		}
	},
	components: {
		headTop,
		myPagination
	},
	mounted() {
		this.initData();
	},
	computed: {
		...mapState(["loginInfo"])
	},
	methods: {
		async initData() {

			this.pagination.page = 1;
			try {
				this.getList();
				if (!this.tableList.length) {
					this.emptyText = "暂无数据";
				}
			} catch (e) {
				this.emptyText = "获取数据失败";
				this.listLoading = false;
			}
		},
		getList() {
            this.listLoading = true;
		    let options={
                params:{}
            }
			console.log(pagination);
            options.params = Object.assign(this.query, this.pagination.params);
			console.log(params)
            noticeListRequest(options).then(response=>{
                this.pagination.total=Number(response.headers.get('x-total-count'))
                response.then(result=>{
                    this.tableList=result
                    this.listLoading = false;
                })
            })
		},
		async search() {
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
					noticeId: 'modify&' +scope.row.id
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
