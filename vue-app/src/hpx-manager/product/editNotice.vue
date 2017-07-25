<template>
<div class='fillcontain'>
	<el-form :model="formData" :rules="rules" ref="formData" label-width="80px">
		<el-form-item label="标题" prop='title'>
			<el-input v-model="formData.title"></el-input>
		</el-form-item>
		<el-form-item label="创建人" prop='creator'>
			<el-input v-model="formData.creator"></el-input>
		</el-form-item>
		<el-form-item label="新闻类型" prop='newsType'>
			<el-select v-model="formData.type" placeholder="请选择">
				<el-option v-for='elem in newsType' :label='elem.name' :value="elem.code"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="发布方向" prop='publishDirection'>
			<el-checkbox-group v-model="publishDirection" @change='mergePublishDirection()'>
				<el-checkbox v-for="elem in publishDirectionList" :label='elem.code' name='publishDirection'>{{elem.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="有效期" prop='endTime'>
			<el-date-picker type="date" placeholder="选择日期" format v-model="formData.endTime"></el-date-picker>
		</el-form-item>
		<el-form-item label="是否置顶" prop='istop'>
			<el-radio-group v-model="formData.istop">
				<el-radio label="0">是</el-radio>
				<el-radio label="1">否</el-radio>
			</el-radio-group>
		</el-form-item>
	</el-form>
	<div class="common_editor_wrapper">
		<VueEditor v-model='formData.content'></VueEditor>
	</div>
	<el-button type="primary" size="large" @click='publish'>发布</el-button>
</div>
</template>

<script type="text/javascript">
import {
	publishNoticeRequest
} from '@/api/noticeApi'
import {
	getDictionaryByCodeRequest
} from '@/api/dictionaryApi'
// import TinyMCE from 'assets/js/tinymce.min.js'
import headTop from '@/components/headTop'
import {
	VueEditor
} from 'vue2-editor'
// import TinyMCE from 'tinymce-vue-2'
export default {
	components: {
		headTop,
		// TinyMCE,
		VueEditor
	},
	data() {
		return {
			formData: {
				title: '',
				creator: null,
				type: '',
				direction: [],
				article_source: '',
				content: '',
				istop: '0',
				endTime: '',
				publishState: "",
			},
			rules: {
				title: [{
					required: true,
					message: '请输入标题',
					trigger: 'blur'
				}],
				creator: [{
					required: true,
					message: '请输入创建人',
					trigger: 'change'
				}],
				type: [{
					type: 'array',
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
				content: [{
					required: true,
					message: '请选择有效期',
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
					message: '请填写活动形式',
					trigger: 'blur'
				}]
			},
			publishDirection: [],
			publishDirectionList: [],
			newsType: [],
			description: '',
			notice: ''
		}
	},
	activated() {
		this.getPublishDirection();
		this.getNewsType();
	},
	methods: {
		publish() {
			let body = {
				articleSource: 'string',
				content: this.notice,
				createTime: '2017-07-25',
				creator: 0,
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
			this.$refs['formData'].validate((valid) => {
				if (valid) {
					alert('submit!');
					publishNoticeRequest(this.formData)
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		mergePublishDirection(scope) {
			console.log(scope);
			this.formData.direction = this.publishDirection.sort().join(',');
			console.log(this.formData.direction);
		},
		getNewsType() {
			getDictionaryByCodeRequest('PUB_TYPE').then(response => {
				response.json().then(result => {
					console.log(result);
					this.newsType = result;
				})
			})
		},
		getPublishDirection() {
			getDictionaryByCodeRequest('PUB_WAY').then(response => {
				response.json().then(result => {
					this.publishDirectionList = result
				})
			})
		}
	}
}
</script>
