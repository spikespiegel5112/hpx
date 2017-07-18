import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Popconfirm,
   DatePicker, Upload, message, Modal,Table } from 'antd'
import { getMoment, precisionFormat } from '../../../../core/util'
import './Redact.css';

import { precisionValidator } from '../../../../core/antdFormUtil.js'

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;

class Redact extends React.Component {
  constructor(props) {
    super(props);
    
    this.columns = [{
        key: 'scoreCardName',
        title: '名称',
        dataIndex: 'scoreCardName',
        render: (text, record, index) => (
          <Select name="scoreCardName" placeholder="请选择"  onChange={this.onCellChange(record)}
          style={{ width: "100%"}} value={text}>
               {this.props.lablelist.rows.map(label => <Option key={label.id}>{label.scoreCardName}</Option>)}
          </Select>
        ),
      },{
        key: 'weight',
        title: '权重（%）',
        dataIndex: 'weight',
         render: (text, record, index) => (
           <Input name="weight" style={{ width: "100%"}} value={text}/>
        ),
      },{
        key: 'addUserid',
        title: '创建人',
        dataIndex: 'addUserid',
        render: (text, record, index) => (
          <Input name="addUserid" style={{ width: "100%"}} value={text}/>
        ),
      },{
        key: 'addTime',
        title: '创建时间',
        dataIndex: 'addTime',
         render: (text, record, index) => (
          <Input name="addTime" style={{ width: "100%"}} value={text}/>
        ),
      },{
        key: 'actionone',
        title: '操作',
        render: (text, record) => (
          <span>
            <Popconfirm title="确定删除?" onConfirm={() => this.delDetailList(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }];


    this.columns2 = [{
        key: 'scoreCardName',
        title: '标签',
        dataIndex: 'scoreCardName',
        render: (text, record, index) => (
          <Input name="scoreCardName" style={{ width: "100%"}} value={text}/>
        ),
      },{
        key: 'total',
        title: '分数',
        dataIndex: 'total',
         render: (text, record, index) => (
          <Input name="total" style={{ width: "100%"}} value={text}/>
        ),
      }]; 
  
    this.columns3 = [{
        key: 'gradeName',
        title: '等级',
        dataIndex: 'gradeName',
        render: (text, record, index) => (
          <Input name="gradeName" style={{ width: "100%"}} value={text}/>
        ),
      },{
        key: 'gradeMin',
        title: '最小值',
        dataIndex: 'gradeMin',
         render: (text, record, index) => (
          <Input name="gradeMin" style={{ width: "100%"}} value={text}/>
        ),
      },{
        key: 'gradeMax',
        title: '最大值',
        dataIndex: 'gradeMax',
         render: (text, record, index) => (
          <Input name="gradeMax" style={{ width: "100%"}} value={text}/>
        ),
      },{
        title: '操作',
        key: 'actiontwo',
        render: (text, record) => (
          <span>
            <Popconfirm title="确定删除?" onConfirm={() => this.delGradeList(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }]; 
   }

  
  //页面加载
   componentWillMount() {
    this.props.fetchLabel();
    this.props.fetchIndustry();
    this.props.fetchSelect(this.props.params.id);
  }

  //标签列表名称下拉框选定事件
  onCellChange = (record) => {
    return (value) => {
      this.props.fetchGetLabel(record,value);
    };
  }

  //标签列表删除方法
  delDetailList = ( id ) => {
    console.log(98, id);
      const dataSource = [...this.props.detailList.rows];
      dataSource.map((v,i) => {
        if(v.id == id) {
           return dataSource.splice(i, 1)
        }
      })
      this.props.delDetailList(dataSource)
  }

  //评分等级删除方法
  delGradeList = ( id ) => {
    console.log(99,id);
      const dataSourcetwo = [...this.props.gradeList.rows];
      dataSourcetwo.map((v,i) => {
        if(v.id == id) {
          return dataSourcetwo.splice(i, 1)
        }
      })
      this.props.delGradeList(dataSourcetwo)
  }

  //标签列表新增
  handleAdd = () => {
    const newDataone = {
      id: new Date(),
      gradeCardName: "",
      weight: "",
      addUserid: "",
      addTime:"",
    };
    this.props.fetchLabel();
    this.props.add(newDataone);
  }

  //评分等级新增
  handleAddtwo = () => {
    const newDatatwo = {
      id: new Date(),
      gradeName: "",
      gradeMin: "",
      gradeMax: "",
    };
    this.props.addtwo(newDatatwo);
  }
  //模型保存
  handleSave = () => {
    const id = this.props.params.id
    //savelist.gradeCardDescribe = this.gradeCardDescribe.value;
    //console.log(3,this.gradeCardDescribe.value);
    // this.props.save(value, id)
    // history.back()
  }

  gradeCardName = (e) => {
    const value = e.target.value;
    this.props.savelist.gradeCardName = value;
  }

  industryid = (value) => {
    this.props.savelist.industryid = value;
  }

  gradeCardDescribe = (e) => {
    const value = e.target.value;
    this.props.savelist.gradeCardDescribe = value;
  }

  render() {
    const { inputs, fetchList, list, listStatus,fetchIndustry,selectlist,
      industrylist, lablelist, updateInputs ,detailList ,gradeList ,savelist} = this.props;
      console.log(55,selectlist.rows);
    let view = !selectlist.rows ? null : <div>
      <div className="addable-cell">
        <span className="span">模型名称：</span>
          <Input name="gradeCardName" placeholder="" value={selectlist.rows.gradeCardName} 
            onChange={this.gradeCardName} style={{ width: "20%", margin: "20px 0" }}/>
        <br/>
        <span className="span">行<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>业：</span>
          <Select name="industryid" placeholder="请选择"  onChange={this.industryid}
              style={{ width: "20%", margin: "20px 0" }} value={selectlist.rows.industryid}>
               {industrylist.rows.map(province => <Option key={province.id}>{province.industryName}</Option>)}
          </Select>
        <br/>
        <span className="span-describe">描<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>述：</span>
          <Input name="gradeCardDescribe" placeholder="" value={selectlist.rows.gradeCardDescribe}
          onChange={this.gradeCardDescribe} style={{ width: "50%", margin: "20px 0" }} type="textarea" rows={6}/>
         </div> 
      <br/>

      <div className="addable-cell">
      <span className="tags">标签列表</span>  
      <div className="hr"></div>
      <hr style={{width:1000}}/>         
      <Table
        rowKey="idone"
        columns={this.columns}
        bordered={true}
        pagination={false}
        dataSource={selectlist.rows.labelInfos}
      />
      <Button className="insertBut" type="primary" onClick={this.handleAdd}>新增</Button>
      <br/>
      <br/>

      <span className="tags">模型分数</span>
      <div className="hr"></div>
      <Table
        rowKey="idtwo"
        columns={this.columns2}
        style={{width:"30%",margin:"0px left"}}
        bordered={true}
        pagination={false}
        dataSource={selectlist.rows.labelInfos}
      />
      <br/>
      <br/>

      <span className="tags">评分等级</span>
      <div className="hr"></div>
      <hr style={{width:1000}}/> 
      <Table
        rowKey="idthree"
        columns={this.columns3}
        style={{width:"60%",margin:"0px left"}}
        bordered={true}
        pagination={false}
        dataSource={selectlist.rows.scoreGrades}
      />
      <Button className="insertBut2" type="primary" onClick={this.handleAddtwo}>新增</Button>
      <br/>
      <br/>

      <Button className="saveBut" type="primary" onClick={this.handleSave}>保存</Button>
       </div>
    </div>;
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

export default withRouter(Redact)
