<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-collapse v-for="(tagItem, index) in treeData.labelInfos" :key='tagItem.key'>
		<el-collapse-item :title="tagItem.scoreCardName" name="1">
			<el-form ref="form" label-width="60%">
				<el-form-item v-for="(scoreItem, index2) in tagItem.targetInfos" :key='scoreItem.key' :label="scoreItem.name" style="width: 70%;" :label-position="labelPosition">
					<el-select v-model='formData.labels[index].subitems[index2]' placeholder="请选择" @change='selectScore()' style="width: 100px;">
						<el-option v-for="(item, index) in scoreItem.modelTargetInfos" :key='item.key' :label="item.threeLevel" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-collapse-item>
	</el-collapse>
</div>
</template>

<script>
import headTop from '../../components/headTop'
import {
	allIndustryListRequest,
	scoringmodelByIndustryRequest,
	templateReportRequest,
	commitTemplateReportRequest
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
					for (var labelItem in result.labelInfos) {
						let subitems = [];
						for (var modelTargetItem in result.labelInfos[labelItem].modelTargetInfos) {
							this.selectModelTree.push(modelTargetItem)
							subitems.push('');
							console.log(labelItem)
						}
						this.$set(that.formData.labels, labelItem, {
							labelId: result.labelInfos[labelItem].id,
							subitems: subitems
						})
						// that.formData.labels[labelItem] = {
						// 	labelId: result.labelInfos[labelItem].id,
						// 	subitems: subitems
						// }
					}
					console.log(that.formData);
					that.treeData = result;
				})
			})
		},
		selectScore(element) {
			console.log(this.formData.labels);
			// console.log(element.target.value);
		}
	}
}
</script>
