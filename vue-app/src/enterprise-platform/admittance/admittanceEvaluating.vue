<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-collapse v-for="(tagItem, index) in treeData.labelInfos" :key='tagItem.key'>
		<el-collapse-item :title="tagItem.scoreCardName" name="1">
			<el-form ref="form" label-width="60%">
				{{tagItem.targetInfos.length}}
				<el-form-item v-for="(scoreItem, index2) in tagItem.targetInfos" :key='scoreItem.key' :label="scoreItem.name" style="width: 70%;" :label-position="labelPosition">
					<el-select v-model='formData.labels[index].subitems[index2].subItem' placeholder="请选择" @change='selectScore()' style="width: 100px;">
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
	<el-row type="flex" class="row-bg" justify="center">
		<el-col :span="3">
			<el-button type="primary" @click='submitEvaluation'>提交评估</el-button>
		</el-col>
	</el-row>
</div>
</template>

<script>
import headTop from '../../components/headTop'
import {
	allIndustryListRequest,
	scoringmodelByIndustryRequest,
	templateReportRequest,
	submitTemplateReportRequest
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
			labelPosition: 'center',
			treeData: [],
			selectModelTree: [],
			formData: {
				badRate: 0,
				labels: [],
				mid: this.$route.params.modelId, //模型ID
				pid: this.$route.params.projectId //项目ID
			},
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
		}
	},
	components: {
		headTop
	},
	mounted() {
		this.getTree();
	},
	methods: {
		getTree() {
			let that = this;
			let params = {
				id: this.$route.params.modelId,
				eid: this.$store.state.loginInfo.enterpriseId,
			}
			scoringmodelByIndustryRequest(params).then(response => {
				response.json().then(result => {
					let index = 0;
					for (var labelIndex in result.labelInfos) {
						let subitems = [];
						for (var targetInfosIndex in result.labelInfos[labelIndex].targetInfos) {
							this.selectModelTree.push(targetInfosIndex)
							subitems.push({
								subItem:''
							});
							console.log(labelIndex)
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
					console.log(result);
					that.treeData = result;
				})
			})
		},
		selectScore(element) {
			// console.log(this.formData);
			// console.log(element.target.value);
		},
		submitEvaluation() {
			let options = {
				params: this.formData,
				eid: this.$store.state.loginInfo.enterpriseId
			}
			console.log(this.formData);
			submitTemplateReportRequest(options).then(response => {
				response.json().then(result => {
					console.log(result);
				})
			})
		}
	}
}
</script>
