<template>
<div class='fillcontain'>
	<headTop></headTop>
	<h3 class='common_formtitle_item'>线上开户</h3>
	<el-row>
		<el-col :span="5">
			<img src="" alt="">
		</el-col>
		<el-col :span="12">
			<el-form :model="formData" :rules="rules" ref="formData" label-width="120px">
				<el-form-item label="账户类型" prop='platBankType'>
					<el-select v-model="formData.platBankType" placeholder="请选择">
						<el-option v-for='elem in bankTypeList' :key="elem.code" :label='elem.name' :value="elem.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="账户卡号" prop='citicAccNo'>
					<el-input v-model.number="formData.citicAccNo"></el-input>
				</el-form-item>
                <el-form-item label="账户名称" prop='citicAccName'>
					<el-input v-model="formData.citicAccName"></el-input>
				</el-form-item>
                <el-form-item label="客户号" prop='hostNo'>
					<el-input v-model.number="formData.hostNo"></el-input>
				</el-form-item>
<!--
				<el-form-item label="获取验证码" prop='direction'>
					<el-row>
						<el-col :span="5">
							<img style='width:100%;' :src="kaptchaImagePath" alt="">
						</el-col>
						<el-col :span="14">
							<el-input v-model="formData.title"></el-input>
						</el-col>
						<el-col :span="3">
							<el-button type="primary" @click='refresh'>看不清</el-button>
						</el-col>
					</el-row>
				</el-form-item>
-->
				<el-form-item label="短信验证码" prop='code'>
					<el-input v-model="formData.code"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="6">
			<div class=""></div>
		</el-col>
	</el-row>
    <el-row type="flex" justify="center">
<!--
        <el-col :span='5'>
            <img src="" alt=""/>
        </el-col>
-->
        <el-col :span='12'>
            <el-button type="primary" @click='openAccountSubmit'>提交</el-button>
        </el-col>
<!--
        <el-col :span='5'>
            <img src="" alt=""/>
        </el-col>
-->
    </el-row>
	<div class="common_editor_wrapper">

	</div>
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
	enterpriseAccountOpenRequest
} from '@/api/enterpriseApi'
import headTop from '@/components/headTop'

export default {
	components: {
		headTop,
	},
	data() {
		return {
			formData: {
                eid:this.$store.state.loginInfo.enterpriseId,
                code:'',
                platBankType:'',
                citicAccNo:'',
                citicAccName:'',
                hostNo:'',
                phone: this.$store.state.loginInfo.phone
			},
			rules: {
				platBankType: [{
					required: true,
					message: '请选择账户类型',
					trigger: 'change'
				}],
                citicAccNo: [{
                    type: 'number',
					message: '账户卡号必须为数字值'
				}, {
					required: true,
					message: '请输入账户卡号'
				}],
                citicAccName: [{
					required: true,
					message: '请输入账户名称'
				}],
                hostNo: [{
					type: 'number',
					message: '客户号必须为数字值'
				}],
                code: [{
					required: true,
					message: '请输入短信验证码'
				}]
			},
			bankTypeList: [],
			kaptchaImagePath: `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime(),
		}
	},
	mounted() {
        this.getBankList();
	},
	methods: {
        getBankList() {
			let options = {
				code: 'BANK_TYPE'
			}
			getDictionaryByCodeRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
					this.bankTypeList = result;
				})
			})
		},
        openAccountSubmit(){
            let options={
                eid: this.$store.state.loginInfo.enterpriseId,
                code:this.formData.code,
                body:{
                    platBankType:this.formData.platBankType,
                    citicAccNo:this.formData.citicAccNo,
                    citicAccName:this.formData.citicAccName,
                    hostNo:this.formData.hostNo,
                    phone: this.$store.state.loginInfo.phone
                }
            }
            this.$refs['formData'].validate(valid=>{
                if(valid){
                    enterpriseAccountOpenRequest(options).then(response=>{
                        response.json().then(result=>{
                            console.log(result)

                        })
                    })
                }
            })
        },
		refresh() {
			this.kaptchaImagePath = `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime()
		}

	}
}
</script>
