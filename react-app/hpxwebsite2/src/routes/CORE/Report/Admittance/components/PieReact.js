import React, { Component } from 'react';
import {ScoringGrades} from './ScoringGrades'

//导入echarts
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件
import { Progress } from 'antd';

import './PieReact.css'

export class PieReact extends React.Component {

    constructor(props) {
        super(props)
        this.setPieOption = this.setPieOption.bind(this)
        this.initPie = this.initPie.bind(this)
    }

    initPie() {
        let data = [];
        this.props.reportlist.rows.tpGradeModelInfoHistoryExtend.tpLabelInfoHistoryExtend.map((v) => {
            var name =v.scoreCardName+v.totalScore+"分";
            data.push({'value':v.totalScore,'name':name} )
        });//外部传入的data数据

        console.log(6666666,data);

        let myChart = echarts.init(this.refs.pieReact) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        let options = this.setPieOption(data)
        //设置options
        myChart.setOption(options)
    }

    componentDidUpdate() {
        this.initPie()
    }

    setPieOption(data) {
        return {
            series: [
                {
                    name: '占比',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    render() {
        const reportlist = this.props.reportlist.rows
        var score = reportlist ? reportlist.score : null
        let divStr = !reportlist ? null: reportlist.tpGradeModelInfoHistoryExtend.tpLabelInfoHistoryExtend.map((v, i) => {
                return <div className="basicInformation" key={i}>
                    <span>{v.scoreCardName}</span>
                    <div className="hr"></div>
                    {v.tpModelTargetInfoHistory.map((vd, key) => {
                        return <span>{vd.oneLevel}{vd.twoLevel}----{vd.threeLevel}</span>
                    })}
                </div>
            });


        let tge = reportlist ? reportlist.tpGradeModelInfoHistoryExtend : null;
        return (
            reportlist?
            <div>
                <p className="title">{reportlist.enterpriseName}准入报告</p>
                <div className="pie-react" style={{height: "200px"}}>
                    <div ref="pieReact" style={{
                        width: "50%",
                        height: "200px",
                        float: "left",
                        border: "2px",
                        margin: "-50px 0px 0px 0px"
                    }}>
                    </div>
                    <div className="score">
                        <span>综合评分</span>
                        <span>得分：{reportlist.score}</span>
                        <span>风险定价：{reportlist.riskPricing}</span>
                    </div>
                </div>
                <div><span>评级：</span><ScoringGrades score={score}/></div>
                <div className="basicInformation">
                    <span style={{margin: "0px 0px 0px 10px"}}>基本信息</span>
                    <div className="hr"></div>
                    <span>企业名称：{reportlist.enterpriseName}</span>
                    <span>行业：{tge.industryName}</span>
                    <span>项目名称：{reportlist.projectid}</span>
                </div>
                <div>
                    {divStr}
                </div>
            </div>
            :
            null
        )
    }
}