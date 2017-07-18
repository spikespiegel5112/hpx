import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'


// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';

// import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../core/fetch';

export default class StackedBarChart extends React.Component {
    constructor(props){ //es6 class类
        super(props);
        this.setBarOption = this.setBarOption.bind(this)
        this.initBar = this.initBar.bind(this)
    }

    componentDidMount() {
        this.initBar(null)
    }
    
    componentWillReceiveProps(nextProps) {
        this.initBar(nextProps)
    }

    initBar(nextProps) {
        //const { data } = this.props  //外部传入的data数据
        const data  = !nextProps ? this.props :nextProps.data;
        console.log("bardata",data);
        const seriesInfos = !data.series ? null : data.series.map(function(info,index){
                    return (
                           {
                               name:info.name,
                               type:'bar',
                               stack: '客户',
                               barGap:'-100%',
                               barCategoryGap:'20%',
                               //barWidth:20,
                               data:info.data,
                           }
                    );
        });

        //console.log("1111",seriesInfos);
        let myChart = echarts.init(this.refs.StackedBarReact) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        let options = this.setBarOption(data,seriesInfos)
        //设置options
        myChart.setOption(options)
    }

    //一个基本的echarts堆叠柱状图表配置函数
    setBarOption(data,seriesInfos) {
        return {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                x: 'right', 
                y: 'center', 
                orient:'vertical',
                itemGap : 30,
                itemWidth : 30,
                itemHeight : 20,
                textStyle: {fontSize: '16',fontWeight:'bold'},
                //data:['邮件营销','联盟广告','视频广告']
                data:data.legend
            },
            grid: {
                left: '1%',
                right: '15%',
                bottom: '5%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    // data : ['周一','周二','周三','周四','周五','周六','周日']
                     data:data.xAxis,
                    //  axisLabel: {
                    //     inside: true,
                    //     textStyle: {
                    //         color: '#fff'
                    //     }
                    //  },
                    //  axisTick: {
                    //     show: false
                    //  },  
                    //  axisLine: {
                    //     show: false
                    //  },
                    //  z: 10
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series : seriesInfos
            // series : [
            //     {
            //         name:'邮件营销',
            //         type:'bar',
            //         stack: '广告',
            //         barWidth:30,
            //         data:[120, 132, 101, 134, 90, 230, 210]
            //     },
            //     {
            //         name:'联盟广告',
            //         type:'bar',
            //         stack: '广告',
            //         barWidth:30,
            //         data:[220, 182, 191, 234, 290, 330, 310]
            //     },
            //     {
            //         name:'视频广告',
            //         type:'bar',
            //         stack: '广告',
            //         barWidth:30,
            //         data:[150, 232, 201, 154, 190, 330, 410]
            //     }
            // ]
        }
    }

    render() {
        return (
            <div className="StackedBar-react">
                <div ref="StackedBarReact" style={{width: "80%", height: "400px"}}></div>
            </div>
        );  
    }
}