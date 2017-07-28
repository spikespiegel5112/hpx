<template>
<div class="fillcontain">
	<head-top></head-top>
	<div class="enterprise_accountoverview_container">
		<div class="enterprise_accountoverview_wrapper">
			<ul>
				<li>

				</li>
			</ul>
		</div>
	</div>




</div>
</template>

<script>
import headTop from '../../components/headTop'
import myPagination from '@/components/myPagination'
import {
	accountInfosListRequest,
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
			//table columns
			columns: [],
			//总页数
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

			//search params
			query: {

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
			let params = Object.assign(this.pagination.params)
			console.log(params)
			accountInfosListRequest().then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))

				response.json().then(result => {
					console.log(result)
					this.tableList = result;
				})
			})

		},
		async search() {
			try {
				this.getList();
			} catch (e) {

			}
		},



	}
}
</script>

<style lang="less">
@import '../../style/mixin';
@import "../../style/enterprise";
.table_container {
	padding: 20px;
}
</style>
<style lang='less'>

</style>
