import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, InputNumber, Popconfirm,
   DatePicker, Upload, message,Card, Modal,Table } from 'antd'
import { getMoment, precisionFormat } from '../../../../core/util'
import './Check.css';

import { precisionValidator } from '../../../../core/antdFormUtil.js'

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.columns1 = [{
        key: 'scoreCardName',
        title: '标签',
        dataIndex: 'scoreCardName',
        render: (text, record, index) => (
          <span>{text}</span>
        ),
      },{
        key: 'total',
        title: '分数',
        dataIndex: 'total',
         render: (text, record, index) => (
         <span>{text}</span>
        ),
      }]; 
  
    this.columns2 = [{
        key: 'gradeName',
        title: '等级',
        dataIndex: 'gradeName',
        render: (text, record, index) => (
          <span>{text}</span>
        ),
      },{
        key: 'gradeMin',
        title: '最低分',
        dataIndex: 'gradeMin',
         render: (text, record, index) => (
          <span>{text}</span>
        ),
      },{
        key: 'gradeMax',
        title: '最高分',
        dataIndex: 'gradeMax',
         render: (text, record, index) => (
          <span>{text}</span>
        ),
      }]; 
   }

  
  //页面加载
   componentWillMount() {
    this.props.fetchSelect(this.props.params.id);
  }

  render() {
    const { inputs, fetchList, list, listStatus,fetchIndustry, detailList, selectlist} = this.props;
    console.log(333,selectlist);
    let view = !selectlist.rows ? null : <div>
      <div className="addable-cell">
          <span name="gradeCardName" className="gradeCardName">{selectlist.rows.gradeCardName}</span>
        <div className="hr"></div>
        <br/>
        <span className="span">行业：</span>
        <br/>
          <span name="industryid">{selectlist.rows.industryid}</span>
        <br/>
        <br/>
        <span className="span">描述：</span>
        <br/>
          <span name="gradeCardDescribe">{selectlist.rows.gradeCardDescribe}</span>
         </div> 
      <br/>

      <div className="addable-cell">
      <span className="tags">模型分数</span>
      <div className="hr"></div>
      <Table
        rowKey="idtwo"
        columns={this.columns1}
        style={{width:"30%",margin:"0px left"}}
        bordered={true}
        pagination={false}
        dataSource={selectlist.rows.labelInfos}
      />
      <br/>
      <br/>
      <span className="tags">评分等级</span>
      <div className="hr"></div>
      <Table
        rowKey="idthree"
        columns={this.columns2}
        style={{width:"50%",margin:"0px left"}}
        bordered={true}
        pagination={false}
        dataSource={selectlist.rows.scoreGrades}
      />
      <br/>
      <br/>
      
      <span className="tags">模型详情</span>
      <div className="hr"></div>
        {/*{selectlist.rows.labelInfos.map(value => 
              <TabPane tab={value.scoreCardName} key={value.id}>Content of Tab Pane 1</TabPane>
          )}*/}

        {
          selectlist.rows.labelInfos.map(value => {
              return <Card key={value.id} title={value.scoreCardName} className="scoreCardName">
                {
                  value.targetInfos.map(i => {
                    return <div className='test' key={i.id}>
                              <div className="name">{i.name}</div>
                              {
                                i.modelTargetInfos.map(j => {
                                  return <div key={j.id} className="threeLevel">{j.threeLevel}  ({j.score}分)</div>
                                }                          
                              )}
                       </div> 
                  }
                  
                )}
              </Card>
            }
          )}
     
       </div>
    </div>;
    return view;
  }
}

export default withRouter(Check)
