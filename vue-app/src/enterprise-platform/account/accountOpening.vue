<template>
<div class='fillcontain'>
	<headTop></headTop>
	<el-row type="flex" justify="center">
		<el-col :span="12" class="common_elcard_header">
			<el-card>
				<div slot="header">
					<span style="padding:0 20px;line-height: 36px;">线上开户</span>
				</div>
				<el-form :model="formData" :rules="rules" ref="formData" label-width="120px" v-loading="accountOpeningFlag">
					<el-form-item label="实体名称" prop='stAccountName'>
						<el-input v-model="formData.stAccountName" disabled></el-input>
					</el-form-item>
					<el-form-item label="账户类型" prop='platBankType'>
						<el-select v-model="formData.platBankType" placeholder="请选择" disabled>
							<el-option v-for='elem in accountTypeList' :key="elem.code" :label='elem.name' :value="elem.code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="总行名称" prop='paSbankCode'>
						<el-select v-model="formData.paSbankCode" placeholder="请选择">
							<el-option v-for='elem in bankTypeList' :key="elem.sbankcode" :label='elem.bankname' :value="elem.sbankcode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="实体账号" prop='stBankAccount'>
						<el-input v-model.number="formData.stBankAccount"></el-input>
					</el-form-item>

					<el-form-item label="是否他行" prop='stSameBank'>
						<el-select v-model="formData.stSameBank" placeholder="请选择">
							<el-option v-for='elem in stSameBankList' :key="elem.code" :label='elem.name' :value="elem.code"></el-option>
						</el-select>
					</el-form-item>


					<el-row>
						<el-col :span="8">
							<el-form-item label="开户地址" prop='stBankProvince'>
								<el-select v-model="formData.stBankProvince" placeholder="请选择" @change="selectProvince">
									<el-option v-for='elem in stBankProvinceList' :key="elem.nodeNodecode" :label='elem.nodeNodename' :value="elem.nodeNodecode"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="市" prop='stBankCity'>
								<el-select v-model="formData.stBankCity" placeholder="请选择" @change="selectCity">
									<el-option v-for='elem in stBankCityList' :key="elem.cityAreacode" :label='elem.cityAreaname' :value="elem.cityAreacode"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="区县" prop='stBankCountry'>
								<el-select v-model="formData.stBankCountry" placeholder="请选择" @change="selectCountry">
									<el-option v-for='elem in stBankCountryList' :key="elem.cityAreacode" :label='elem.cityAreaname' :value="elem.cityAreacode"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="开户支行" prop='stBankCode'>
						<el-select v-model="formData.stBankCode" placeholder="请选择" @change="selectBranch">
							<el-option v-for='elem in stBankList' :key="elem.bankno" :label='elem.bankname' :value="elem.bankno"></el-option>
						</el-select>
					</el-form-item>

					<el-row type="flex">
						<el-col :span="21">
							<el-form-item label="短信验证码" prop='code' :span="10">
								<el-input v-model="formData.code" :span="8"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2" class="row-bg" justify="end">
							<el-button type="primary" @click='sendSmsCode' :span="2">发送验证码</el-button>
						</el-col>
					</el-row>
				</el-form>
				<el-row type="flex" justify="center">
					<el-col :span='1'>
						<el-button type="primary" @click='openAccountSubmit'>提交</el-button>
					</el-col>
				</el-row>
			</el-card>
		</el-col>

	</el-row>
</div>
</template>

<script type="text/javascript">
import {
	getDictionaryByCodeRequest
} from '@/api/dictionaryApi'
import {
	bankTypeListRequest,
	getKaptchaImageRequest
} from '@/api/publicApi'
import {
	accountInfosListRequest,
	accountStatementListRequest,
	enterpriseAccountOpenRequest,
	openAccSendSmsRequest
} from '@/api/enterpriseApi'
import {
	provinces,
	bankTypes,
	cities,
	countries,
	bankdes,
} from '@/api/publicApi';
import headTop from '@/components/headTop'

export default {
	components: {
		headTop,
	},
	data() {
		return {
			accountOpeningFlag: true,
			stBankProvinceList: [],
			stBankCityList: [],
			stBankCountryList: [],
			stBankList: [],
			stSameBankList: [],
			formData: {
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
					message: '请选择总行名称',
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
			},
			accountTypeList: [],
			bankTypeList: [],
			kaptchaImagePath: `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime(),
		}
	},
	mounted() {
		this.getAccountTypeList();
		this.getBankTypeList();
		this.getProvince();
		this.getSameBankList();
	},
	methods: {
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
		openAccountSubmit() {
			let options = {
				eid: this.$store.state.loginInfo.enterpriseId,
				code: this.formData.code,
				body: {
					platBankType: this.formData.platBankType,
					stBankAccount: this.formData.stBankAccount,
					stAccountName: this.formData.stAccountName,
					//                        stAccountCode: this.formData.stAccountCode,
					stBankProvince: this.formData.stBankProvince,
					stBankCity: this.formData.stBankCity,
					stBankCountry: this.formData.stBankCountry,
					stBankName: this.formData.stBankName,
					stBankCode: this.formData.stBankCode,
					paSbankCode: this.formData.paSbankCode,
					stSameBank: this.formData.stSameBank
				}
			}
			console.log(options)
			this.$refs['formData'].validate(valid => {
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
		sendSmsCode() {
			openAccSendSmsRequest().then(response => {
				console.log(response)
			})
		},
		refresh() {
			this.kaptchaImagePath = `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime()
		},
		selectProvince() {
			this.formData.stBankCity = '';
			this.getCity();
		},
		selectCity() {
			this.formData.stBankCountry = '';
			this.getCountry();
		},

		getProvince() {
			provinces().then(response => {
				response.json().then(result => {
					console.log(result)
					this.stBankProvinceList = result;
				})
			})
		},
		getCity() {
			let options = {
				code: this.formData.stBankProvince
			}
			cities(options.code).then(response => {
				response.json().then(result => {
					console.log(result)
					this.stBankCityList = result;
				})
			})
		},
		getCountry() {
			let options = {
				code: this.formData.stBankCity
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
			this.formData.stBankName = '';
			if (this.formData.paSbankCode == '') {
				this.$message.warning('请选择总行名称')
				this.formData.stBankCountry = '';
			} else {
				let options = {
					code: this.formData.stBankCity.substring(0, 4),
					bankclscode: this.formData.paSbankCode.substring(0, 3)
				}
				console.log(options)
				//                const bankclscode = this.bankInfoForm.bankCode.substring(0,3),citycode = this.bankInfoForm.bankCity.substring(0,4)


				bankdes(options.bankclscode, options.code).then(response => {
					response.json().then(result => {
						console.log(result)
						this.stBankList = result;
					})
				})
			}

		},
		selectBranch(value) {
			for (var index in this.stBankList) {
				if (value == this.stBankList[index].bankno) {
					this.formData.stBankName = this.stBankList[index].bankname;
					alert(this.formData.stBankName)
				}
			}
		},
		aaa(value) {
			alert(value)
		}
	}
}
</script>
<style lang="less">
@import '../../style/common';
</style>
