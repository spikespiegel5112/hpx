import React from 'react'
import { Menu, Breadcrumb, Icon ,Card } from 'antd';
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import CardTitle from '../../../../../components/CardTitle'
import fetch from '../../../../../core/fetch'
import './BaseMsg.css'


class MoreBase extends React.Component{
  render(){
    return (
      <Link to='/hpx2/core/company-information'>详细信息</Link>
    )
  }
}

class BaseMsg extends React.Component{
  constructor(props){
    super(props);
    this.state={
      baseMsg:{}    
    }
  }

  componentDidMount(){
    this.loadData();
  }

  loadData=()=>{
    const self = this;
    fetch('/data/baseMsg.json')
      .then(response=>response.json()).then(
        (json)=>{
        self.setState({baseMsg: json});
      } 
      ).catch((e)=>{
        console.log('parsing failed', e)
      })
  }
  
  render(){
    return(
      <Card title={<CardTitle title='基本信息' />} extra={<MoreBase />} >
          <div className="companyName">
            <span>公司名:</span>
            <span>{this.state.baseMsg.companyName}</span>
            <span>已认证</span>
          </div>
          <div className="objectNum">
            <span>参与项目:</span>
            <span>{this.state.baseMsg.objectNum}</span>
          </div>
          <div className="balance">
            <span>账户余额:</span>
            <span>{this.state.baseMsg.balance}元</span>
            <Link to="">明细</Link>
          </div>
      </Card>
    )
  }
}

export default BaseMsg

