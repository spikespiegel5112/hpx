import React from 'react'

import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Popconfirm, message, Tabs  } from 'antd'
import StackedBarChart from './StackedBarChart';
import LeftPanel from './LeftPanel';
import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

class Compo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            transactionFlowData : [],
            custmoerData : [],
            inComeData : [],
            statisticsType: 'TRANSACTIONFLOW',//默认为交易额
            timeDimension : 'WEEK' //默认时间维度为周
        }
    }

    componentDidMount() {
        this.fetch(this.state.statisticsType,this.state.timeDimension)()
    }


    changeTabs(key) {
        this.setState({
            statisticsType :  key
        })
        this.fetch(key,this.state.timeDimension)()
    }

    changeTimeDimension(timeDimension) {
        this.setState({
            timeDimension :  timeDimension
        })
        this.fetch(this.state.statisticsType,timeDimension)()
    }

    fetch(statisticsType,timeDimension){
        return async()=>{
            const resp =await getReq(`/statistics/api/plat/statistics/${statisticsType}/statisticsIndexData/${timeDimension}`);
            const res = await resp.json();
            if(this.state.statisticsType=='TRANSACTIONFLOW'){
                this.setState({
                    transactionFlowData :  res
                })
            }else if(this.state.statisticsType=='CUSTMOER'){
                this.setState({
                    custmoerData :  res
                })
            }else{
                 this.setState({
                    inComeData :  res
                })
            }
            
        }
    }
    

    render(){
        const TabPane = Tabs.TabPane;
        return (
            <div>
                <div style={{width: "16%",float:"left"}}>
                    <LeftPanel data={this.state.transactionFlowData}/>
                </div>
                <div style={{width: "84%",float:"left"}}>
                    <Tabs defaultActiveKey="TRANSACTIONFLOW" onChange={(key)=>this.changeTabs(key)}>
                        <TabPane tab="交易额" key="TRANSACTIONFLOW">
                            <div>
                                <StackedBarChart 
                                    data={this.state.transactionFlowData}
                                />
                                <Button type="danger" style={{marginLeft:80,width:60}} onClick={(key)=>this.changeTimeDimension("YEAR")}>年</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("SEASON")}>季</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("MONTH")}>月</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("WEEK")}>周</Button>
                            </div>
                        </TabPane>
                        <TabPane tab="入驻企业" key="CUSTMOER">
                            <div>
                                <StackedBarChart 
                                    data={this.state.custmoerData}
                                />
                                <Button type="danger" style={{marginLeft:30,width:60}} onClick={(key)=>this.changeTimeDimension("YEAR")}>年</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("SEASON")}>季</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("MONTH")}>月</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("WEEK")}>周</Button>
                            </div>
                        </TabPane>
                        <TabPane tab="收入" key="INCOME">
                            <div>
                                <StackedBarChart 
                                    data={this.state.inComeData}
                                />
                                <Button type="danger" style={{marginLeft:30,width:60}} onClick={(key)=>this.changeTimeDimension("YEAR")}>年</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("SEASON")}>季</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("MONTH")}>月</Button>
                                <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("WEEK")}>周</Button>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>          
        );
        
    }

}

Compo.propTypes = {
}

export default withRouter(Compo)
