<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-tabs type="border-card">
		<el-tab-pane label="我的账户">
			<div class="enterprise_accountoverview_container">
				<div class="enterprise_accountoverview_wrapper" v-loading="carouselLoadingFlag">
					<a class='el-icon-arrow-left arrow'></a>
					<div class="carousel">
						<ul class="swiper-wrapper">
							<li class="swiper-slide" v-for="(item, index) in accountList" :key="item.key" @click="selectCard(index)">
								<div class="title">
									<label for="">{{item.bankName}}</label>
									<span>尾号：{{item.custActNo}}</span>
									<!--<span>尾号：{{item.custActNo.substr(1,4)}}</span>-->
									<i>{{index+1}}</i>
								</div>
								<div class="detail">
									<div class="balance">
										<label for="">可用余额（元）：</label>
										<span>{{item.kyamt}}</span>
									</div>
									<div class="operation">
										<el-button type="primary" size="small">转入</el-button>
										<el-button type="success" size="small">转出</el-button>
										<el-button type="primary" @click="getAccountOpenInfoByCustNo(index)">更新实体卡号</el-button>
									</div>
								</div>
							</li>
						</ul>
						<div class="swiper-pagination"></div>
					</div>
					<a class='el-icon-arrow-right arrow'></a>

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
	</section>
	<!--项目配置-->
	<el-dialog :visible.sync='updateAccountFlag' title="dsdsad">
		<el-form :model="updateAccountFormData" :rules="rules" ref="updateAccountFormData" label-width="120px" v-loading="accountOpeningFlag">
			<el-form-item label="实体名称" prop='stAccountName'>
				<el-input v-model="updateAccountFormData.stAccountName" disabled></el-input>
			</el-form-item>
			<el-form-item label="账户类型" prop='platBankType'>
				<el-select v-model="updateAccountFormData.platBankType" placeholder="请选择" disabled>
					<el-option v-for='elem in accountTypeList' :key="elem.code" :label='elem.name' :value="elem.code"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="总行名称" prop='stBankCode'>
				<el-select v-model="updateAccountFormData.stBankCode" placeholder="请选择">
					<el-option v-for='elem in bankTypeList' :key="elem.bankcode" :label='elem.bankname' :value="elem.bankcode"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="实体账号" prop='stBankAccount'>
				<el-input v-model.number="updateAccountFormData.stBankAccount"></el-input>
			</el-form-item>
			<el-form-item label="是否他行" prop='stSameBank'>
				<el-select v-model="updateAccountFormData.stSameBank" placeholder="请选择">
					<el-option v-for='elem in stSameBankList' :key="elem.code" :label='elem.name' :value="elem.code"></el-option>
				</el-select>
			</el-form-item>
			<el-row>
				<el-col :span="8">
					<el-form-item label="开户地址" prop='stBankProvince'>
						<el-select v-model="updateAccountFormData.stBankProvince" placeholder="请选择" @change="selectProvince">
							<el-option v-for='elem in stBankProvinceList' :key="elem.nodeNodecode" :label='elem.nodeNodename' :value="elem.nodeNodecode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="市" prop='stBankCity'>
						<el-select v-model="updateAccountFormData.stBankCity" placeholder="请选择" @change="selectCity">
							<el-option v-for='elem in stBankCityList' :key="elem.cityAreacode" :label='elem.cityAreaname' :value="elem.cityAreacode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="区县" prop='stBankCountry'>
						<el-select v-model="updateAccountFormData.stBankCountry" placeholder="请选择" @change="selectCountry">
							<el-option v-for='elem in stBankCountryList' :key="elem.cityAreacode" :label='elem.cityAreaname' :value="elem.cityAreacode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="开户支行" prop='stBankName'>
				<el-select v-model="updateAccountFormData.stBankName" placeholder="请选择">
					<el-option v-for='elem in stBankList' :key="elem.bankno" :label='elem.bankname' :value="elem.bankname"></el-option>
				</el-select>
			</el-form-item>
			<el-row type="flex">
				<el-col :span="21">
					<el-form-item label="短信验证码" prop='code' :span="9">
						<el-input v-model="updateAccountFormData.code" :span="8"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2" class="row-bg" justify="end">
					<el-button type="primary" @click='sendSmsCode' :span="2">发送验证码</el-button>
				</el-col>
			</el-row>
		</el-form>
		<el-row type="flex" justify="center">
			<el-col :span='3'>
				<el-button @click='updateAccountFlag==false'>取消</el-button>
			</el-col>
			<el-col :span='3'>
				<el-button type="primary" @click='updateAccount'>提交</el-button>
			</el-col>
		</el-row>
	</el-dialog>


</div>
</template>

<script>
import swiper from '@/assets/js/swiper'
import headTop from '@/components/headTop'
import {
	reSmgCode,
} from '@/api/getData';
import {
	getDictionaryByCodeRequest
} from '@/api/dictionaryApi'
import {
	accountInfosListRequest,
	accountStatementListRequest,
	enterpriseAccountOpenRequest,
	updateAccountRequest,
	openAccSendSmsRequest,
	getAccountOpenInfoByCustNoRequest
} from '@/api/enterpriseApi'
import {
	getKaptchaImageRequest,
	provinces,
	bankTypes,
	cities,
	countries,
	bankdes,
} from '@/api/publicApi'
import {
	mapState
} from 'vuex'
import moment from 'moment'
export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			accountOpeningFlag: false,
			eid: this.$store.state.loginInfo.enterpriseId,
			enterpriseName: this.$store.state.loginInfo.enterpriseName,
			accountTypeList: [],
			bankTypeList: [],
			stBankProvinceList: [],
			stBankCityList: [],
			stBankCountryList: [],
			stBankList: [],
			stSameBankList: [],
			//table columns
			columns: [{
				label: '银行流水号',
				prop: 'accountNo',
				//				sortable: true,
				width: 110
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
			carouselLoadingFlag: true,
			//模态框
			selectedCardIndex: 0,
			//更新实体卡号
			updateAccountFlag: false,
			updateAccountCustNo: '',

			kaptchaImagePath: '',
			accountTypeList: [],
			bankList: [],
			updateAccountFormData: {
				eid: this.$store.state.loginInfo.enterpriseId,
				code: '',
				platBankType: 'ZX',
				stBankAccount: '',
				stAccountName: this.$store.state.loginInfo.enterpriseName,
				phone: this.$store.state.loginInfo.phone,
				stBankProvince: '',
				stBankCity: '',
				stBankCountry: '',
				stBankCode: '', //开户行code
				stBankName: '', //开户行名称
				paSbankCode: '', //总行code
				stSameBank: '' //本行他行code
			},
			rules: {
				stAccountName: [{
					required: true,
					message: '请输入实体名称'
				}],
				paSbankCode: [{
					required: true,
					message: '请选择账户类型',
					trigger: 'change'
				}],
				platBankType: [{
					required: true,
					message: '请选择账户类型',
					trigger: 'change'
				}],
				stBankCode: [{
					required: true,
					message: '请选择总行名称'
				}],
				stBankAccount: [{
					type: 'number',
					message: '账户卡号必须为数字值'
				}, {
					required: true,
					message: '请输入账户卡号'
				}],
				stSameBank: [{
					required: true,
					message: '请选择总行名称'
				}],
				stBankProvince: [{
					required: true,
					message: '请选择开户行省份',
					'label-width': '50px'
				}],
				stBankCity: [{
					required: true,
					message: '请选择开户行城市',
					'label-width': '50px'
				}],
				stBankCountry: [{
					required: true,
					message: '请选择开户行区县',
					'label-width': '50px'
				}],
				stBankName: [{
					required: true,
					message: '请选择开户行'
				}],
				code: [{
					required: true,
					message: '请输入短信验证码'
				}],
			}
		}
	},
	components: {
		headTop
	},
	activated() {
		this.initData();
		this.getBankList();
		this.getKptchaImage();


		this.getAccountTypeList();
		this.getBankTypeList();
		this.getProvince();
		this.getSameBankList();
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

			try {
				this.getAccountList();
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
		},
		getAccountList() {
			this.carouselLoadingFlag = true;
			let params = Object.assign(this.pagination.params)
			console.log(params)
			let options = {
				eid: this.$store.state.loginInfo.enterpriseId
			}
			accountStatementListRequest(options).then(response => {
				this.pagination.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result)
					this.accountList = result.responseValue.data.content;
					setTimeout(() => {
						this.carousel();
						this.carouselLoadingFlag = false;
					}, 200)
				})
			})
		},
		carousel() {
			let swiper = new Swiper('.enterprise_accountoverview_wrapper .carousel', {
				slidesPerView: 2,
				pagination: '.swiper-pagination',
				paginationClickable: true,
				prevButton: '.el-icon-arrow-left',
				nextButton: '.el-icon-arrow-right',
				spaceBetween: 20
			})
		},
		getTurnoverList() {
			let options = {
				accoundId: this.$store.state.loginInfo.enterpriseId
			}
			console.log(options)
			//			 accountStatementListRequest(options).then(result => {
			//			 	result.json().then(response => {
			//			 		console.log(response);
			//			 		this.tableList = response;
			//			 	})
			//			 })
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
		getKptchaImage() {
			this.kaptchaImagePath = `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime()
		},
		getSmsCode() {
			this.code = '';
			// let options = {
			// 	phone: this.$store.state.loginInfo.phone,
			// 	strCode: this.updateAccountFormData.strCode
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
		},
		getAccountOpenInfoByCustNo(index) {
			this.updateAccountFlag = true;
			console.log(this.accountList[index])
			this.updateAccountCustNo = this.accountList[index].custNo;

			let options = {
				eid: this.$store.state.loginInfo.enterpriseId,
				params: {
					custNo: this.accountList[index].custNo
				}
			}
			getAccountOpenInfoByCustNoRequest(options).then(response => {
                console.log('dsdsdsds')
                console.log(response)
				response.json().then(result => {

					console.log(result)
					this.updateAccountFormData = result;
				})
			})
		},
		updateAccount() {
			let options = {
				eid: this.$store.state.loginInfo.enterpriseId,
				code: this.updateAccountFormData.code,
				body: {
					platBankType: this.updateAccountFormData.platBankType,
					stBankAccount: this.updateAccountFormData.stBankAccount,
					stAccountName: this.updateAccountFormData.stAccountName,
					//                        stAccountCode: this.updateAccountFormData.stAccountCode,
					stBankProvince: this.updateAccountFormData.stBankProvince,
					stBankCity: this.updateAccountFormData.stBankCity,
					stBankCountry: this.updateAccountFormData.stBankCountry,
					stBankName: this.updateAccountFormData.stBankName,
					stBankCode: this.updateAccountFormData.stBankCode,
					paSbankCode: this.updateAccountFormData.paSbankCode,
					stSameBank: this.updateAccountFormData.stSameBank
				}
			}
			console.log(options)
			this.$refs['updateAccountFormData'].validate(valid => {
				if (valid) {
					enterpriseAccountOpenRequest(options).then(response => {
						if (response.status == 200) {
							this.$message({
								type: 'success',
								message: '开户提交成功'
							})
						}
					}).catch(error => {
						this.$message.error(error);
					})
				}
			})
		},
		updateAccountSubmit() {
			let options = {
				eid: this.$store.state.loginInfo.enterpriseId,
				id: '',
				body: {}
			}
			options.body = this.updateAccountFormData;
			updateAccountRequest(options).then(response => {
				response.json().then(result => {
					console.log(result)
				})
			})
		},
		getProvince() {
			provinces().then(response => {
				response.json().then(result => {
					console.log(result)
					this.stBankProvinceList = result;
				})
			})
		},
		selectProvince() {
			this.updateAccountFormData.stBankCity = '';
			this.getCity();
		},
		getCity() {
			let options = {
				code: this.updateAccountFormData.stBankProvince
			}
			cities(options.code).then(response => {
				response.json().then(result => {
					console.log(result)
					this.stBankCityList = result;
				})
			})
		},
        selectCity() {
            this.updateAccountFormData.stBankCountry = '';
            this.getCountry();
        },
		getCountry() {
			let options = {
				code: this.updateAccountFormData.stBankCity
			}
			countries(options.code).then(response => {
				response.json().then(result => {
					console.log(result)
					this.stBankCountryList = result;
				})
			})
		},
		selectCountry() {
			this.getBank();
		},
		getBank() {
			this.stBankList = [];
			this.updateAccountFormData.stBankName = '';
			let options = {
				code: this.updateAccountFormData.stBankCity.substring(0, 4),
				bankclscode: this.updateAccountFormData.stBankCode.substring(0, 3)
			}
			console.log(options)
			//                const bankclscode = this.bankInfoForm.bankCode.substring(0,3),citycode = this.bankInfoForm.bankCity.substring(0,4)


			bankdes(options.bankclscode, options.code).then(response => {
				response.json().then(result => {
					console.log(result)
					this.stBankList = result;
				})
			})
		},
		sendSmsCode() {
			openAccSendSmsRequest().then(response => {
				console.log(response)
			})
		},
		getBankTypeList() {
			this.accountOpeningFlag = true;
			bankTypes().then(response => {
				response.json().then(result => {
					console.log(result);
					this.bankTypeList = result;
					this.accountOpeningFlag = false;
				})
			})
		},
		getAccountTypeList() {
			this.accountOpeningFlag = true;
			let options = {
				code: 'BANK_TYPE'
			}
			getDictionaryByCodeRequest(options).then(response => {
				response.json().then(result => {
					console.log(result)
					this.accountTypeList = result;
					this.accountOpeningFlag = false;
				})
			})
		},
		getSameBankList() {
			this.accountOpeningFlag = true;
			let options = {
				code: 'SAME_BANK'
			}
			getDictionaryByCodeRequest(options).then(response => {
				response.json().then(result => {
					console.log(result)
					this.stSameBankList = result;
					this.accountOpeningFlag = false;
				})
			})
		},
		selectCard(index) {
			this.selectedCardIndex = index;
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
