<template>
<div class='fillcontain'>
	<commonDetailTitle routerName='noticeList' :title="title"></commonDetailTitle>
	<el-form :model="formData" :rules="rules" ref="formData" label-width="80px" v-loading="noticeFlag">
		<el-form-item label="标题" prop='title'>
			<el-input v-model="formData.title"></el-input>
		</el-form-item>
		<el-form-item label="新闻类型" prop='type'>
			<el-select v-model="formData.type" placeholder="请选择">
				<el-option v-for='elem in newsType' :key="elem.code" :label='elem.name' :value="elem.code"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="发布方向" prop='direction'>
			<el-checkbox-group v-model="formData.direction">
				<el-checkbox v-for="elem in publishDirectionList" :key="elem.code" :label='elem.code' name='publishDirection'>{{elem.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="有效期" prop='endTime'>
			<el-date-picker type="date" placeholder="选择日期" v-model="formData.endTime" @change='getDateString'></el-date-picker>
		</el-form-item>
		<el-form-item label="是否置顶" prop='istop'>
			<el-radio-group v-model="formData.istop">
				<el-radio label="0">是</el-radio>
				<el-radio label="1">否</el-radio>
			</el-radio-group>
		</el-form-item>
	</el-form>
	<div class="common_editor_wrapper" v-loading="noticeFlag">
		<VueEditor v-model='formData.content'></VueEditor>
	</div>
	<el-button v-if="operationType=='add'" type="primary" size="large" @click='publishNotice'>发布</el-button>
	<el-button v-else-if="operationType=='modify'" type="primary" size="large" @click='modifyNotice'>修改</el-button>
</div>
</template>

<script type="text/javascript">
import {
	publishnoticeListRequest,
	reviewnoticeListRequest,
	modifynoticeListRequest
} from '@/api/noticeApi'
import {
	getDictionaryByCodeRequest
} from '@/api/dictionaryApi'
// import TinyMCE from 'assets/js/tinymce.min.js'
import headTop from '@/components/headTop'
import commonDetailTitle from '@/components/commonDetailTitle'
import {
	VueEditor
} from 'vue2-editor'
// import TinyMCE from 'tinymce-vue-2'
export default {
	components: {
		headTop,
		commonDetailTitle,
		// TinyMCE,
		VueEditor
	},
	data() {
		return {
			formData: {
				title: '',
				creator: this.$store.state.loginInfo.id,
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
            noticeFlag:false,
			noticeId: null,
			operationType: '',
			publishDirection: [],
			publishDirectionList: [],
			newsType: [],
			description: '',
			notice: '',
			endTimeString: '``',
			title: ''
		}
	},
	activated() {
		this.getRouteParams();
		this.getPublishDirection();
		this.getNewsType();
		this.getNoticeContent();
		this.getTitle();
	},
	deactivated() {
		this.noticeId = '';
		this.operationType = '';
		this.$refs['formData'].resetFields();
		this.formData.content = '';
	},
	methods: {
		getRouteParams() {
			this.formData.creator = this.$store.state.loginInfo.name;
			this.noticeId = this.$route.params.noticeId.split('&')[1];
			this.operationType = this.$route.params.noticeId.split('&')[0];
		},
        getNoticeContent() {
            this.noticeFlag=true;
            if (this.noticeId != 0) {
                reviewnoticeListRequest({
                    id: this.noticeId
                }).then(response => {
                    response.json().then(result => {
                        this.formData = Object.assign(this.formData, result)
                        console.log(this.formData);
                        this.publishDirection = result.direction.split(',');
                        this.formData.direction = this.publishDirection;
                        this.noticeFlag=false;
                    })
                })
            }
        },
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
			this.$refs['formData'].validate(valid => {
				if (valid) {
					this.mergePublishDirection();
					this.convertDateObjToDateString();
					publishnoticeListRequest(this.formData).then(response => {
						alert(response.status)
						if (response.status == '200') {
							this.$message({
								message: '消息发布成功',
								type: 'success'
							});
							this.$router.push({
								name: 'noticeList'
							})
							console.log(this.formData);
						}
					}).catch(err => {
                        this.$message({
                            message: '消息发布失败',
                            type: 'error'
                        });
					})
				}
			});
		},
		modifyNotice() {
			this.convertDateStringToDateObj();
			console.log(this.formData);
			this.$refs['formData'].validate((valid) => {
				console.log(valid);
				if (valid) {
				    let options={
                        id: this.noticeId,
                        body: this.formData
                    }
					this.mergePublishDirection();
					this.convertDateObjToDateString();
					modifynoticeListRequest(options).then(response=>{
					    if(response.status==200){
                            this.$message.success('新闻公告修改成功')
                            this.$router.push({
                                name: 'noticeList'
                            })
                        }
                    }).catch(error=>{
                        this.$message.error('新闻公告修改失败')
                    })
				}
			}).catch(error=>{
			    this.$message.error(error)
            })
		},

		mergePublishDirection() {
			this.formData.direction = this.formData.direction.sort().join(',');
			console.log(this.formData.direction);
		},
		convertDateStringToDateObj() {
			let dateObj = new Date(Date.parse(this.endTimeString.replace(/-/g, "/")));
			this.formData.endTime = dateObj;
			console.log(this.formData);
		},
		convertDateObjToDateString() {
			this.formData.endTime = this.endTimeString;
			console.log(this.formData.endTime)
		},
		getDateString(value) {
			this.endTimeString = value;
		},
		getNewsType() {
			getDictionaryByCodeRequest({
				code: 'PUB_TYPE'
			}).then(response => {
				response.json().then(result => {
					// console.log(result);
					this.newsType = result;
				})
			})
		},
		getPublishDirection() {
			getDictionaryByCodeRequest({
				code: 'PUB_WAY'
			}).then(response => {
				response.json().then(result => {
					this.publishDirectionList = result
				})
			})
		},
		getTitle() {
			if (this.operationType == 'review') {
				this.title = '查看新闻公告';
			} else if (this.operationType == 'modify') {
				this.title = '编辑新闻公告';
			}
		}
	}
}
</script>
