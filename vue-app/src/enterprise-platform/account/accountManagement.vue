<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-tabs type="border-card">
		<el-tab-pane label="我的账户">
			<div class="enterprise_accountoverview_container">
				<el-row>
					<el-col :span="24">
						<el-button type="primary" @click="openAccountFlag=true">线上开户</el-button>
					</el-col>
				</el-row>
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
		</el-table>
		<section class="main-pagination">
			<!-- 特殊情况分页自己按注释的  -->
			<el-pagination @current-change="flipPage" :current-page="pagination.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</section>
		<!-- <section class="main-pagination">
			<my-Pagination :callback="getList" :query="query" :total="pagination.total">
			</my-Pagination>
		</section> -->
	</section>
	<!--项目配置-->
	<el-dialog title="线上开户" :visible.sync='openAccountFlag' :close-on-click-modal="true">
		<el-form :model="openAccountFormData" label-width="120px" :rules="openAccountRules" ref="openAccountFormData">
			<el-form-item label="账户类型" prop='platBankType'>
				<el-select v-model="openAccountFormData.platBankType">
					<el-option v-for="item in accountTypeList" :value="item.code" :key="item.name" :label="item.name">
					</el-option>
				</el-select>
			</el-form-item>
            
			<el-form-item label="短信验证码" prop='code'>
				<el-row>
					<el-col :span="19">
						<el-input v-model="openAccountFormData.code"></el-input>
					</el-col>
					<el-col :span="3">
						<el-button type="primary" @click='getSmsCode'>发送验证码</el-button>
					</el-col>
				</el-row>

			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="openAccountFlag = false">取消</el-button>
			<el-button type="primary" @click.native="submitOpenAccount">提交</el-button>
		</div>
	</el-dialog>


</div>
</template>

<script>
import swiper from '@/assets/js/swiper'
import headTop from '@/components/headTop'
import {
	reSmgCode,
	openAccSendSmsRequest
} from '@/api/getData';
import {
	getDictionaryByCodeRequest
} from '@/api/dictionaryApi'
import {
	accountInfosListRequest,
	accountStatementListRequest,
	enterpriseAccountOpenRequest
} from '@/api/enterpriseApi'
import {
	getKaptchaImageRequest
} from '@/api/publicApi'
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
            columns: [{
				label: '银行流水号',
				prop: 'accountNo',
//				sortable: true,
                width:110
			}, {
				label: '交易时间',
				prop: 'tranDate',
//				sortable: true,
				minWidth: 100,
			}, {
				label: '借方发生额(元)',
				prop: 'tranAmt',
//				sortable: true,
                minWidth: 80,
			}, {
				label: '贷方发生额(元)',
				prop: 'accBalAmt',
				sortable: true,
			}, {
				label: '金额(元)',
				prop: 'accBalAmt',
				sortable: true,
			}, {
//				label: '对方账号',
//				prop: 'modifiedTime',
//				sortable: true,
//			}, {
//				label: '对方户名',
//				prop: 'modifiedTime',
//				sortable: true,
//			}, {
				label: '凭证号',
				prop: 'verifyCode',
				sortable: true,
			}],
			expand: [{
				label: '建立人',
				prop: 'creator',
				sortable: true,
			}, {
				label: '项目说明',
				prop: 'remark',
				sortable: true,
				minWidth: 200
			}, {
				label: '更新人',
				prop: 'modifiedBy',
				sortable: true,
			}],
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
            //分页信息
			pagination: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
			//搜索条件的个数
			criteriaNum: 3,
			//模态框
			deleteNoticeFlag: false,
			//线上开户
			openAccountFlag: false,
			kaptchaImagePath: '',
			accountTypeList: [],
			bankList: [],
			openAccountFormData: {
				platBankType: '',
				hostNo:'',
				code:''
			},
			openAccountRules: {
				platBankType: [{
					required: true,
					message: '请选择项目账户类型',
					trigger: 'change'
				}],
				costActNo: [{
					required: true,
					message: '请输入项目虚拟卡号',
					trigger: 'change'
				}],
				hostNo: [{
					required: true,
					message: '请输入项目客户号',
					trigger: 'change'
				}],
				code: [{
					required: true,
					message: '请输入短信验证码',
					trigger: 'change'
				}]
			}
		}
	},
	components: {
		headTop
	},
	mounted() {
		this.initData();
		this.getBankList();
		this.getKptchaImage();
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
			let options = {
				params: {}
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
				accoundId: this.$store.state.loginInfo.enterpriseId
			}
            console.log(options)
			 accountStatementListRequest(options).then(result => {
			 	result.json().then(response => {
			 		console.log(response);
			 		this.tableList = response;
			 	})
			 })
		},
		getBankList() {
			let options = {
				code: 'BANK_TYPE'
			}
			getDictionaryByCodeRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.accountTypeList = result;
				})
			})
		},
		submitOpenAccount() {
			this.$refs['openAccountFormData'].validate(valid => {
				if (valid) {
					let options = {
						body: {
//                            hostNo:this.openAccountFormData.hostNo,
                            platBankType:this.openAccountFormData.platBankType
                        },
						code: this.openAccountFormData.code,
						eid: this.$store.state.loginInfo.enterpriseId
					}
					console.log(options)
					enterpriseAccountOpenRequest(options).then(response => {
						response.json().then(result => {
							console.log(result);
						})
					})
				}
			})


		},
		async search() {
			try {
				this.getAccountList();
			} catch (e) {

			}
		},
		getKptchaImage() {
			this.kaptchaImagePath = `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime()
		},
		getSmsCode() {
			this.code = '';
			// let options = {
			// 	phone: this.$store.state.loginInfo.phone,
			// 	strCode: this.openAccountFormData.strCode
			// }
			// console.log(options);
			openAccSendSmsRequest().then(response => {
				console.log(response);
				response.json().then(result => {
					console.log(result);
				})
			}).catch(e => {
				console.log(e);
				this.$message({
					showClose: true,
					message: e,
					type: 'error'
				});
			})
		}
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
