<template>
<div class="fillcontain">
	<commonDetailTitle title='企业准入评估' routerName='admittanceManagement'></commonDetailTitle>
	<!--	<head-top></head-top>-->
	<el-row>
		<el-col :span="8">
			<el-form ref="form" :model="form" label-width="130px" :rules="badrateRule">
				<el-form-item label="预期不良率（%）">
					<el-input v-model="formData.badRate"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
	<el-collapse v-for="(tagItem, index) in treeData.labelInfos" :key='tagItem.key' v-loading="addmittanceEvaluatingFlag">
		<el-collapse-item :title="tagItem.scoreCardName" :name="index">
			<el-form label-position="left" :model='formData.labels[index]' ref="validData" label-width="60%">
				<el-form-item v-for="(scoreItem, index2) in tagItem.targetInfos" :key='scoreItem.key' :label="scoreItem.name" style="width: 70%;" :label-position="labelPosition" :rules="[{
					required: true,
					message: '请输入邮箱地址',
					trigger: 'change' }]">
					<el-select v-model='formData.labels[index].subitems[index2].subItem' placeholder="请选择" prop='evaluatingItem' style="width: 100px;">
						<el-option v-for="(item, index3) in scoreItem.modelTargetInfos" :key='item.key' :label="item.threeLevel" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-collapse-item>
	</el-collapse>
	<el-row type="flex" class="row-bg" justify="center">
		<el-col :span="6">
			<div class="grid-content bg-purple"></div>
		</el-col>
	</el-row>
	<el-row type="flex" class="row-bg common_block_wrapper" justify="center">
		<el-col :span="3">
			<el-button type="primary" @click='submitEvaluation'>提交评估</el-button>
		</el-col>
	</el-row>
</div>
</template>

<script>
import commonDetailTitle from '@/components/commonDetailTitle'
import headTop from '@/components/headTop'
import {
	allIndustryListRequest,
	scoringmodelByIndustryRequest,
	templateReportListRequest,
	submitTemplateReportListRequest
} from '@/api/templateApi'
import {
	veyiterpriseAccessRequest,
} from '@/api/enterpriseApi'
import {
	mapState
} from 'vuex'
import moment from 'moment'
export default {
	data() {
		return {
            addmittanceEvaluatingFlag:true,
			labelPosition: 'center',
			treeData: [],
			selectModelTree: [],
			activeNames: [],
			formData: {
				badRate: 0,
                eid: this.$route.params.enterpriseId2,
				labels: [],
				mid: this.$route.params.modelId, //模型ID
				pid: this.$route.params.projectId //项目ID
			},
			validData: {},
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			rules: {
				evaluatingItem: [{
					required: true,
					message: '请输入预期不良率',
					trigger: 'change'
				}, {
					required: true,
					message: '请选择活动区域',
					trigger: 'change'
				}]
			},
			badrateRule: {
				badrate: [{
					required: true,
					message: '请输入预期不良率',
					trigger: 'change'
				}]
			}
		}
	},
	components: {
		headTop,
		commonDetailTitle
	},
	activated() {
		this.getTree();
	},
	deactivated() {

	},
	methods: {
		getTree() {
		    this.addmittanceEvaluatingFlag=true;
			let that = this;
			let params = {
				id: this.$route.params.modelId,
				eid: this.$store.state.loginInfo.enterpriseId,
			}
            console.log(params)
			scoringmodelByIndustryRequest(params).then(response => {
				response.json().then(result => {
					let index = 0;
					var validDataStr = '';
					for (var labelIndex in result.labelInfos) {
						let subitems = [];
						this.activeNames.push(labelIndex);
						for (var targetInfosIndex in result.labelInfos[labelIndex].targetInfos) {
							this.selectModelTree.push(targetInfosIndex)
							subitems.push({
								subItem: ''
							});
							console.log(labelIndex)
							validDataStr += "'subItem':'',"
						}
						this.$set(that.formData.labels, labelIndex, {
							labelId: result.labelInfos[labelIndex].id,
							subitems: subitems
						})
						// that.formData.labels[labelIndex] = {
						// 	labelId: result.labelInfos[labelIndex].id,
						// 	subitems: subitems
						// }
					}
					validDataStr = validDataStr.substr('-1', '')
					validDataStr = "{" + validDataStr + "}"
					console.log(validDataStr)
					this.validData = JSON.parse(validDataStr)

					console.log(result);
					that.treeData = result;
					this.addmittanceEvaluatingFlag=false;
				})
			})
		},
		submitEvaluation() {
			let options = {
				params: this.formData,
				eid: this.$store.state.loginInfo.enterpriseId
			}
			console.log(this.formData);
			// this.$refs['formData.badrate'].validate(valid => {
			// 	if (valid) {
					submitTemplateReportListRequest(options).then(response => {
						console.log(response)
						response.json().then(result => {
							console.log(result);
							this.$message({
								message: '评估填报成功！',
								type: 'success'
							});
							this.$router.push({
								name: 'reportDetail',
								params: {
									reportId: result.id
								}
							})
						})
					}).catch(err => {
						console.log(err)
						this.$alert('请确认表单已全部填报完成', '提示', {
							confirmButtonText: '确定',
							type: 'error',
							callback: () => {}
						});
					})
			// 	}
			// })

		}
	}
}
</script>
