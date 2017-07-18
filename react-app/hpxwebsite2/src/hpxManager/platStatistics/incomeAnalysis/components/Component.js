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
            factorData : [],
            tradeData : [],
            voucherData : [],
            product: 'FRCTOR_INCOME',//产品默认为海供应惠
            timeDimension : 'WEEK' //默认时间维度为周
        }
    }

    componentDidMount() {
        this.fetch(this.state.product,this.state.timeDimension)()
    }


    changeTabs(key) {
        this.setState({
            product :  key
        })
        this.fetch(key,this.state.timeDimension)()
    }

    changeTimeDimension(timeDimension) {
        console.log("timeDimension",timeDimension)
        this.setState({
            timeDimension :  timeDimension
        })
        this.fetch(this.state.product,timeDimension)()
    }

    fetch(key,timeDimension){
        return async()=>{
            const resp =await getReq(`/statistics/api/plat/statistics/${key}/statisticsData/${timeDimension}`);
            const res = await resp.json();
            //if(this.state.product=='FRCTOR_INCOME'){
            this.setState({
                factorData :  res
            })
            // }else if(this.state.product=='TRADE_TRANSACTIONFLOW'){
            //     this.setState({
            //         tradeData :  res
            //     })
            // }else{
            //      this.setState({
            //         voucherData :  res
            //     })
            // }
            
        }
    }
    

    render(){
        const TabPane = Tabs.TabPane;
        return (          
            /*<div>
               <StackedBarChart 
                   data={this.state.data}
               />
            </div>*/
            <Tabs defaultActiveKey="FRCTOR_INCOME" onChange={(key)=>this.changeTabs(key)}>
                <TabPane tab="海供惠" key="FRCTOR_INCOME">
                    <div>
                        <div style={{width: "16%",float:"left"}}>
                            <LeftPanel data={this.state.factorData}/>
                        </div>
                        <div style={{width: "84%",float:"left"}}>
                            <StackedBarChart 
                                data={this.state.factorData}
                            />
                            <Button type="danger" style={{marginLeft:80,width:60}} onClick={(key)=>this.changeTimeDimension("YEAR")}>年</Button>
                            <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("SEASON")}>季</Button>
                            <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("MONTH")}>月</Button>
                            <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("WEEK")}>周</Button>
                        </div>
                    </div>
                </TabPane>
                {/*<TabPane tab="海销惠" key="TRADE_TRANSACTIONFLOW">
                    <div style={{width: "16%",float:"left"}}>
                        <LeftPanel data={this.state.tradeData}/>
                    </div>
                    <div style={{width: "84%",float:"left"}}>
                        <StackedBarChart 
                            data={this.state.tradeData}
                        />
                        <Button type="danger" style={{marginLeft:80,width:60}} onClick={(key)=>this.changeTimeDimension("MONTH")}>月</Button>
                        <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("WEEK")}>周</Button>
                    </div>
                </TabPane>
                <TabPane tab="海票汇" key="VOUCHER_TRANSACTIONFLOW">
                    <div style={{width: "16%",float:"left"}}>
                        <LeftPanel data={this.state.voucherData}/>
                    </div>

                    <div style={{width: "84%",float:"left"}}>
                        <StackedBarChart 
                            data={this.state.voucherData}
                        />
                        <Button type="danger" style={{marginLeft:80,width:60}} onClick={(key)=>this.changeTimeDimension("MONTH")}>月</Button>
                        <Button type="danger" style={{marginLeft:20,width:60}} onClick={(key)=>this.changeTimeDimension("WEEK")}>周</Button>
                    </div>
                </TabPane>*/}
            </Tabs>
        );
        
    }

}

Compo.propTypes = {
}

export default withRouter(Compo)
