<template>
<div class="fillcontain">
<!--	<head-top></head-top>-->
	<commonDetailTitle title='企业准入报告' routerName='admittanceReportList'></commonDetailTitle>
	<section class="admittance_report_container">
		<h1 class='maintitle'>{{reportData.enterpriseName}}</h1>
		<div class="summarize block_wrapper">
			<div class="chart_wrapper">
				<div class="evaluatechart_wrapper" id='evaluatechart'></div>
				<div class="gradechart_wrapper">
					<label>评分：</label>
					<div>
						<span class='indicator' :style="{left:scoreIndicatorValue.left+'px'}"></span>
						<i :style="{left:scoreIndicatorValue.left-5+'px',textAlign:'center',width:'30px'}">{{reportData.score}}</i>
					</div>
				</div>
			</div>
			<div class="block_wrapper">
				<div class="title">综合评定</div>
				<ul>
					<li>得分：{{reportData.score}}</li>
					<li>风险定价（%）：{{reportData.riskPricing}}%</li>
					<li>评级：{{basicInfo.rate}}</li>
				</ul>
			</div>
		</div>
		<div class="block_wrapper">
			<div class="title">基本信息</div>
			<ul>
				<li>企业名称：{{reportData.enterpriseName}}</li>
				<li>行业：{{basicInfo.industry}}</li>
<!--				<li>项目名称：{{reportData.score}}</li>-->
                <li>项目名称：订单融资/恒昌一期</li>
			</ul>
		</div>
		<div class="block_wrapper" v-for="(item, evaluatingDataIndex) in evaluatingData" :key="item.key">
			<div class="title">{{item.scoreCardName}}</div>
			<ul>
				<li v-for="tpModelItem in tpModelData[evaluatingDataIndex]" :key="tpModelItem.key">
					{{tpModelItem.oneLevel}}-{{tpModelItem.twoLevel}}：{{tpModelItem.threeLevel}}
				</li>
			</ul>
		</div>

	</section>
</div>
</template>

<script>
import echarts from '../../assets/js/echarts.common.min'
// import echarts from 'echarts'
import headTop from '../../components/headTop'
import commonDetailTitle from '../../components/commonDetailTitle'
import {
	templateReportDetailRequest,
} from '@/api/templateApi'
import moment from 'moment'
// import echarts from 'echarts'
export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			reportData: {},
			evaluatingData: [],
			tpModelData: [],
			chartData: [],
			scoreIndicatorValue: {
				left: 0
			},
            basicInfo:{
                industry:'',
                rate:''
            }
		}
	},
	components: {
		headTop,
        commonDetailTitle
	},
	activated() {
		this.getReport();
	},
    deactivated(){
        this.evaluatingData=[];
        this.tpModelData=[];
        this.chartData=[];
    },
	methods: {
        getGrade(){
            let rate=this.reportData.costRates;
            this.basicInfo.rate='未定义'
            for(var index in this.scoreData){   
                if(rate>=this.scoreData[index].gradeMin&&rate<=this.scoreData[index].gradeMax){
                    this.basicInfo.rate= this.scoreData[index].gradeName;
                }
            }
        },
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
					this.scoreData = this.reportData.tpScoreGradeHistory;
					console.log(this.scoreData);
					this.evaluatingData = this.reportData.tpGradeModelInfoHistoryExtend.tpLabelInfoHistoryExtend;
                    
                    this.basicInfo.industry= this.reportData.tpGradeModelInfoHistoryExtend.industryName
					for (var item in this.evaluatingData) {
						this.tpModelData[item] = this.evaluatingData[item].tpModelTargetInfoHistory;
						this.chartData.push({
							name: this.evaluatingData[item].scoreCardName,
							value: this.evaluatingData[item].totalScore,
						})
					}
					this.chart();
                    this.getGrade();
					this.scoreIndicatorValue.left = 370 * result.score * 0.01;
					console.log(this.scoreIndicatorValue);
				})
			})
		},
		chart() {
			var evaluatechart = echarts.init(document.getElementById('evaluatechart'));
			evaluatechart.setOption({
				title: {
					text: '',
					left: 'center',
					top: 0,
					textStyle: {
						color: '#333'
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				visualMap: {
					show: false,
					min: 80,
					max: 600,
					inRange: {
						colorLightness: [0, 1]
					}
				},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: this.chartData,
					// roseType: 'radius',
					label: {
						normal: {
							textStyle: {
								color: '#333'
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
					itemStyle: {
//						normal: {
//							color: {
////                                type: 'radial',
////                                x: 0.5,
////                                y: 0.5,
////                                r: 0.5,
//                                
//                                globalCoord: false // 缺省为 false
//                            },
//							shadowBlur: 200,
//							shadowColor: 'rgba(255, 255, 255, 0.5)'
//						},
                        
						radius: ['100%']
					},
					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function(idx) {
						return Math.random() * 200;
					}
				}]
			})
		}
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
