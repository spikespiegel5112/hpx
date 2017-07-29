<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-collapse v-for="(tagItem, index) in treeData.labelInfos">
		<el-collapse-item :title="tagItem.scoreCardName" name="1">
			<el-form ref="form" :model="form" label-width="100%">
				<el-form-item v-for="(scoreItem, index2) in tagItem.targetInfos" :label="scoreItem.name" style="width: 40%;" :label-position="labelPosition">
					<el-select v-model="formData" placeholder="请选择" style="width: 100px;">
						<el-option v-for="item in scoreItem.modelTargetInfos" :label="item.threeLevel" :value="item.id"></el-option>
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
			formData: {}
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
					console.log(result);
					this.treeData = result;
					let index = 0;
					for (var firstItem in this.treeData) {
						for (var secondItem in this.treeData[firstItem]) {
							if (secondItem > firstItem) {
								continue;
							} else {
								this.selectModelTree[index].push(this.treeData[secondItem].modelTargetInfos.threeLevel)
							}
						}
					}
				})
			})
		}
	}
}
</script>
