<template>
<div class="fillcontain">
	<head-top></head-top>

	<section class="admittance_report_container">
		<h1 class='maintitle'>{{reportData.enterpriseName}}</h1>
		<div class="summarize">
			<div class="chart_wrapper">

			</div>
			<div class="block_wrapper">
				<div class="title">综合评定</div>
				<ul>
					<li>得分：{{reportData.score}}</li>
					<li>风险定价（%）：{{reportData.riskPricing}}</li>
					<li>评级：{{reportData.costRates}}</li>
				</ul>
			</div>
		</div>
		<div class="block_wrapper">
			<div class="title">基本信息</div>
			<ul>
				<li>企业名称：{{reportData.enterpriseName}}</li>
				<li>行业：{{reportData.industryName}}</li>
				<li>项目名称：{{reportData.score}}</li>
			</ul>
		</div>
		<div class="block_wrapper" v-for="(item, gradeDataIndex) in gradeData" :key="item.key">
			<div class="title">{{item.scoreCardName}}</div>
			<ul>
				<li v-for="tpModelItem in tpModelData[gradeDataIndex]" :key="tpModelItem.key">
					{{tpModelItem.oneLevel}}-{{tpModelItem.twoLevel}}：{{tpModelItem.threeLevel}}
				</li>
			</ul>
		</div>
		<!-- <div class="block_wrapper">

			<ul>
				<li>债务风险状况---资产负债率民营企业负债率≤60%{{reportData.score}}</li>
			</ul>
		</div>
		<div class="block_wrapper">
			<div class="title">贸易背景</div>
			<ul>
				<li>贸易背景---供应链管理（采购执行）模式，核心企业销售模式现款现货{{reportData.score}}</li>
			</ul>
		</div> -->
	</section>
</div>
</template>

<script>
// import echarts from '../../assets/js/echarts'
import headTop from '../../components/headTop'
import {
	templateReportDetailRequest,
} from '@/api/templateApi'
import moment from 'moment'
export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			reportData: {},
			gradeData: [],
			tpModelData:[]
		}
	},
	components: {
		headTop
	},
	mounted() {
		this.getReport();
	},
	methods: {
		getReport() {
			let params = {
				eid: this.$store.state.loginInfo.enterpriseId,
				id: this.$route.params.reportId
			}
			console.log(params);
			templateReportDetailRequest(params).then(response => {
				response.json().then(result => {
					console.log(result);
					this.reportData = result;
					this.gradeData = this.reportData.tpGradeModelInfoHistoryExtend.tpLabelInfoHistoryExtend;
					for (var item in this.gradeData) {
						this.tpModelData[item] = this.gradeData[item].tpModelTargetInfoHistory;
					}
					console.log(this.tpModelData);
				})
			})
		},
	}
}
</script>

<style lang="less">
@import '../../style/mixin';
@import '../../style/admittance';
.table_container {
    padding: 20px;
}
</style>
