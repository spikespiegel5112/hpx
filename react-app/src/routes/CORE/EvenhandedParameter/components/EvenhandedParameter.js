import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, InputNumber , Icon, Popconfirm, message } from 'antd'
import './EvenhandedParameter.css';

import moment from 'moment'

class Compo extends React.Component {
  constructor(props) {
    super(props);
  }

  //保存事件
  handleSave = () => {
    let isSave = false;
    if(this.props.selectList.rows != null){
        isSave = this.props.save(this.props.saveList,this.props.selectList.rows.id)
    }else{
        isSave = this.props.save(this.props.saveList)
    }
    if(isSave){
      message.success('保存成功！')
    }else{
      message.error('保存失败！')
    }
  }

  costingRate = (e) => {
    if(e==null){
      e = 0;
    }
    const value = e;
    this.props.saveList.costingRate = value;
  }

  tolerateCommercialDisputeRatio = (e) => {
    if(e==null){
      e = 0;
    }
    const value = e;
    this.props.saveList.tolerateCommercialDisputeRatio = value;
  }

  pricingRatio = (e) => {
    if(e==null){
      e = 0;
    }
    const value = e;
    this.props.saveList.pricingRatio = value;
  }

  tolerateBadDebtRatio = (e) => {
    if(e==null){
      e = 0;
    }
    const value = e;
    this.props.saveList.tolerateBadDebtRatio = value;
  }

  //页面加载
  componentWillMount() {
    this.props.fetchSelect();
  }

  render() {
    const { saveStatus,saveList,selectList,fetchSelectStatus} = this.props;
    console.log(1,selectList);

    let view = !selectList.rows ? null : <div className="div">
      <table>
        <tr>
          <td  className="span">成本利率（%）</td>
          <td> <InputNumber  name="costingRate" min={0} max={100}  onChange={this.costingRate} 
              defaultValue={selectList.rows.costingRate}/></td>
        </tr>
        <br/>
        <tr>
          <td className="span">可容忍商纠比例（%）</td>
          <td><InputNumber name="tolerateCommercialDisputeRatio" min={0} max={100}
              onChange={this.tolerateCommercialDisputeRatio}
               defaultValue={selectList.rows.tolerateCommercialDisputeRatio}/></td>
        </tr>
        <br/>
        <tr>
            <td className="span">风险定价验证比例（%）</td>
            <td><InputNumber name="pricingRatio" min={0} max={100} onChange={this.pricingRatio} 
              defaultValue={selectList.rows.pricingRatio}/></td>
        </tr>
        <br/>
        <tr>
            <td className="span">可容忍坏账比例（%）</td>
            <td><InputNumber name="tolerateBadDebtRatio" min={0} max={100} 
               onChange={this.tolerateBadDebtRatio}
              defaultValue={selectList.rows.tolerateBadDebtRatio}/></td>
        </tr>
        <br/>
      </table>
      <Button type="primary" onClick={this.handleSave} className="button">保存</Button>
    </div>;
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

export default withRouter(Compo)
