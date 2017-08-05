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
				<el-form-item label="账户类型" prop='title'>
					<el-select v-model="formData.type" placeholder="请选择">
						<el-option v-for='elem in bankType' :key="elem.bankcode" :label='elem.bankname' :value="elem.bankcode"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号" prop='type' placeholder="请输入授权人手机号">
					<el-input v-model="formData.title"></el-input>
				</el-form-item>
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
				<el-form-item label="短信验证码" prop='endTime'>
					<el-input v-model="formData.title"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="6">
			<div class=""></div>
		</el-col>
	</el-row>

	<div class="common_editor_wrapper">

	</div>
	<el-button v-if="operationType=='add'" type="primary" size="large" @click='publishNotice'>发布</el-button>
	<el-button v-else-if="operationType=='modify'" type="primary" size="large" @click='modifyNotice'>修改</el-button>
</div>
</template>

<script type="text/javascript">
import {
	getDictionaryByCodeRequest
} from '@/api/dictionaryApi'
import {
	bankTypeRequest,
	getKaptchaImageRequest
} from '@/api/publicApi'
import headTop from '@/components/headTop'

export default {
	components: {
		headTop,
	},
	data() {
		return {
			formData: {

			},
			rules: {
				title: [{
					required: true,
					message: '请输入标题',
					trigger: 'blur'
				}],
				type: [{
					// type: 'array',
					required: true,
					message: '请选择新闻类型',
					trigger: 'change'
				}],
				direction: [{
					type: 'array',
					required: true,
					message: '请选择发布方向',
					trigger: 'change'
				}],
				istop: [{
					required: true,
					message: '请选择是否置顶',
					trigger: 'change'
				}],
				endTime: [{
					type: 'date',
					required: true,
					message: '请选择有效期',
					trigger: 'blur'
				}]
			},
			bankType: [],
			kaptchaImagePath: `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime(),
			pictureVerificationCode: ''
		}
	},
	computed: {
		noticeId() {

		},
		operationType() {

		}
	},
	mounted() {
		this.getBankType();
		this.getKaptchaImage();
	},
	methods: {
		publishNotice() {
			//测试数据
			let body = {
				articleSource: 'string',
				content: this.notice,
				createTime: '2017-07-25',
				creator: null,
				direction: 'string',
				endTime: '2017-07-25',
				enterpriseId: 0,
				id: 0,
				istop: '',
				modifiedBy: 0,
				modifiedTime: '2017-07-25',
				picPath: '',
				publishState: '',
				startTime: '2017-07-25',
				title: '',
				type: '',
				url: '',
			}
			console.log(this.formData);
			this.$refs['formData'].validate((valid) => {
				if (valid) {
					// alert('submit!');

					this.mergePublishDirection();
					this.convertDateObjToDateString();
					publishNoticeRequest(this.formData);
					this.$router.push({
						name: 'noticeList'
					})
					console.log(this.formData);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		getBankType() {
			bankTypeRequest().then(response => {
				response.json().then(result => {
					console.log(result);
					this.bankType = result;
				})
			})
		},
		refresh() {
			this.kaptchaImagePath = `/core/core/api/v1/getKaptchaImage?v=` + new Date().getTime()
		}

	}
}
</script>
