<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-tabs type="border-card">
		<el-tab-pane label="我的账户">
			<div class="enterprise_accountoverview_container">
				<div class="enterprise_accountoverview_wrapper">
					<div class="carousel">
						<a class='arrowleft iconfont icon-backward2'></a>
						<ul class="swiper-wrapper">
							<li class="swiper-slide" v-for="(item, index) in accountList" :key="item.key">
								<div class="title">
									<label for="">{{item.bankName}}</label>
									<span>尾号：{{item.bankNo.substr(1,4)}}</span>
									<i>{{index+1}}</i>
								</div>
								<div class="detail">
									<div class="balance">
										<label for="">可用余额（元）：</label>
										<span>{{item.bankAmt}}</span>
									</div>
									<div class="operation">
										<el-button type="primary" size="small">转入</el-button>
										<el-button type="success" size="small">转出</el-button>
									</div>
								</div>
							</li>
						</ul>
						<a class='arrowright iconfont icon-forward2'></a>
					</div>
					<div class="swiper-pagination"></div>
				</div>
				<div class="accountdetail">
					<ul>
						<li>
							<label for="">账户名：</label>
							<span>{{enterpriseName}}</span>
						</li>
					</ul>
				</div>
			</div>
		</el-tab-pane>
	</el-tabs>
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
		<!-- <section class="main-pagination">
			<my-Pagination :callback="getList" :query="query" :total="pagination.total">
			</my-Pagination>
		</section> -->
	</section>





</div>
</template>

<script>
import swiper from '@/assets/js/swiper'
import headTop from '@/components/headTop'
import {
	accountInfosListRequest,
	accountStatementListRequest
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
			enterpriseName: this.$store.state.loginInfo.enterpriseName,
			//table columns
			columns: [],
			//分页信息
			pagination: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
			//账户列表
			accountList: [],
			//流水列表
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
		headTop
	},
	mounted() {
		this.initData();

	},
	computed: {
		last4Digits(value) {
			console.log(value)
			// return value.substr(1,4)
		},
		mapState() {
			return mapState(["loginInfo"])
		}
	},
	methods: {
		initData() {
			this.listLoading = true;
			this.pagination.page = 1;
			this.getAccountList();
			try {
				this.getTurnoverList();
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
			this.getAccountList();
		},
		getAccountList() {
			let params = Object.assign(this.pagination.params)
			console.log(params)
			let options={
				params:{}
			}
			accountInfosListRequest().then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result)
					this.accountList = result;
					setTimeout(() => {
						this.carousel();
					}, 200)
				})
			})
		},
		carousel() {
			let swiper = new Swiper('.enterprise_accountoverview_wrapper .carousel', {
				slidesPerView: 2,
				pagination: '.swiper-pagination',
				paginationClickable: true,
				spaceBetween: 30
			})
		},
		getTurnoverList() {
			let options = {
				accoundId: this.$store.state.loginInfo.id
			}
			accountStatementListRequest(options).then(result => {
				result.json().then(response => {
					console.log(response);
					this.tableList = response;
				})
			})
		},
		async search() {
			try {
				this.getAccountList();
			} catch (e) {

			}
		},



	}
}
</script>

<style lang="less">
@import '../../style/mixin';
@import "../../style/enterprise";
@import "../../assets/css/swiper.css";
.table_container {
    padding: 20px;
}
</style>
