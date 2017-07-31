<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-collapse v-for="(tagItem, index) in treeData.labelInfos" :key='tagItem.key'>
		<el-collapse-item :title="tagItem.scoreCardName" name="1">
			<el-form ref="form" label-width="60%">
				<!-- <el-form-item v-model='tempData' v-for="(scoreItem, index2) in tagItem.targetInfos" :key='scoreItem.key' :label="scoreItem.name" style="width: 70%;" :label-position="labelPosition">
					<el-select v-model='tempData[index2]' placeholder="请选择" @change='selectScore()' style="width: 100px;">
						<el-option v-for="(item, key) in scoreItem.modelTargetInfos" :key='item.key' :label="item.threeLevel" :value="item.id"></el-option>
					</el-select>
				</el-form-item> -->
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
			formData: [],
			tempData:[]
		}
	},
	computed: {
		industryType() {
			return this.$route.params.modelId.split('&')[0]
		},
		modelId() {
			return
		},
	},
	components: {
		headTop
	},
	mounted() {
		//do something after mounting vue instance
		this.getTree();
	},
	methods: {
		handleNodeClick() {

		},
		getTree() {
			let params = {
				id: this.$route.params.modelId,
				eid: this.$store.state.loginInfo.enterpriseId,
			}
			scoringmodelByIndustryRequest(params).then(response => {
				response.json().then(result => {

					this.treeData = result;
					console.log(this.treeData);
					let index = 0;
					for (var labelItem in this.treeData.labelInfos) {
						for (var modelTargetItem in this.treeData.labelInfos[labelItem].modelTargetInfos) {
							if (modelTargetItem > labelItem) {
								continue;
							} else {
								this.selectModelTree.push(this.treeData[modelTargetItem].modelTargetInfos.threeLevel)
							}
						}
					}
				})
			})
		},
		selectScore(element){
			// alert('dsds')
			console.log(element.target.value);

		}
	}
}
</script>
