import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {
  Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Popconfirm,
  DatePicker, Upload, message, Modal, Table 
} from 'antd'
import { getMoment, precisionFormat } from '../../../../../core/util'
import './Add.css';

import { precisionValidator } from '../../../../../core/antdFormUtil.js'
import  TextEditTable  from '../../../../../components/EditTable/TextEditTable'

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      isDisabled:false,
      midRow : [],
      scoreList : [],
      midScore : [],
      gradeList : [],
      industryid: null,
      gradeCardDescribe: null,
      gradeCardName: null
    };
    this.scoreColumns = [{
        key: 'scoreCardName',
        title: '标签',
        dataIndex: 'scoreCardName',
      }, {
        key: 'maxScore',
        title: '分数',
        dataIndex: 'maxScore',
      }];
    this.gradeColumns = [{
      key: 'gradeName',
      title: '等级',
      dataIndex: 'gradeName',
      render: (text, record, index) => (
        <Input 
          id={'gradeName/'+index} 
          onChange={this.editGrade}
          style={{ width: 100 }}
        />
      ),
      }, {
        key: 'gradeMin',
        title: '最小值',
        dataIndex: 'gradeMin',
        render: (text, record, index) => (
          <Input 
            id={'gradeMin/'+index} 
            onChange={this.editGrade}
            style={{ width: 100 }}
          />
        ),
      }, {
        key: 'gradeMax',
        title: '最大值',
        dataIndex: 'gradeMax',
        render: (text, record, index) => (
          <Input 
            type='number' 
            id={'gradeMax/'+index} 
            onChange={this.editGrade}
            style={{ width: 100 }}
          />
        ),
      }];
    this.lableColumns = [{
        key: 'scoreCardName',
        title: '已选标签名称',
        dataIndex: 'scoreCardName',
        width: '40%',
      }, {
        key: 'weight',
        title: '权重（%）',
        dataIndex: 'weight',
        width: '40%',
        render: (text, record, index) => (
          <Input
            id={'weight/'+index} 
            style={{width: '90%'}}
            placeholder="请输入权重"
            onChange={this.onweightChange}
            value={text}
          />
        ),
      },
      {
        key: 'actionone',
        title: '操作',
        width: '20%',
        render: (text, record,index) => (
          <span>
            <Popconfirm title="确定删除?" onConfirm={() => this.delLabelList(index,record)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }];

    this.columns = [{
        key: 'scoreCardName',
        title: '标签名称',
        dataIndex: 'scoreCardName',
        width:300,
      }
    ];
    this.dataSource = [
      {scoreCardName:"第一个", id:'1'},
      {scoreCardName:"第二个", id:'2'},
      {scoreCardName:"第三个", id:'3'}
    ];
  }

  //页面加载
  componentWillMount() {
    const id = this.props.params.id
    this.props.fetchLabel();
    this.props.fetchIndustry();
    if(id) {
      this.props.fetchSelect(id);
    }    
  }

  onweightChange = (e) => {
    const value = e.target.value;
    const id = e.target.id.split('/');
    const index = id[1];
    const key = id[0];
    selectedRowKeys[index].weight = value
    this.setState({
      selectedRowKeys,
    })
  }

  //标签列表删除方法
  delLabelList = (index,record) => {
    const data = this.state.selectedRowKeys;
    data.splice(index, 1)
    this.setState({
      selectedRowKeys: data
    })
  }

  // 编辑评分等级
  editGrade = (e) => {
    const totalScore = this.props.saveModalList.totalScore;
    const gradeList = this.state.gradeList;
    const keyIndex = e.target.id.split('/');
    const value = e.target.value;
    const key = keyIndex[0];
    const index = keyIndex[1];
    if(gradeList[index].gradeMax > totalScore) {
      message.error("最大值不能大于总分数!");
      // return;
      gradeList[index].gradeMax = '';
    }
    gradeList[index][key] = value;


    this.setState({
      gradeList
    })    
  }

  //模型保存
  saveModal = () => {
    const id = this.props.params.id;
    if(this.props.saveModalList.totalScore == '' ||
    !this.props.saveModalList.labelInfos.length ||
    this.props.saveModalList.gradeCardDescribe == '' ||
    !this.props.saveModalList.scoreList.length ||
    this.props.saveModalList.gradeCardName == '' ||
    !this.props.saveModalList.scoreGrades.length 
    ){
      message.error("信息输入不完整!")
      return false;
    }
    if(!this.props.saveModalList.scoreGrades.length) {
      message.error("请确定新增评分等级!")
      return false;
    }
    for(let value of Object.values(this.props.saveModalList.scoreGrades)) {
      const re = /^[1-9]+[0-9]*]*$/ ;
      if(!re.test(value.gradeMax) || !re.test(value.gradeMin)) {
        message.error("最大值、最小值需为正整数!");
        return;
      }
      if(value.gradeMin > value.gradeMax) {
        message.error("最小值不能大于最大值!");
        return;
      }
      if(value.gradeMax > this.props.saveModalList.totalScore) {
        message.error("最大值不能大于总分数!");
        return;
      }
    }
    this.props.saveModal(this.props.saveModalList, id)
  }

  componentWillReceiveProps(nextProps) {
    const { saveModalStatus, err , fetchSelectStatus ,saveModalList} = nextProps;
    if (this.props.saveModalStatus.type != saveModalStatus.type && saveModalStatus.type.match('SUCCESS')) {
      message.success("保存成功");
      browserHistory.go(-1);
    }
    if (err) {
      message.error(err);
      this.props.clearErr();
    };
    if(this.props.fetchSelectStatus.type != fetchSelectStatus.type && fetchSelectStatus.type.match('SUCCESS')) {
      const label = saveModalList.labelInfos;
      let scoreList = [];
      let total = null;
      for (let i = 0; i < label.length; i++) {
        label[i].maxScore = ((label[i].maxScore * label[i].weight).toFixed(2)) - 0;
        total += label[i].maxScore;
      };
      total.toFixed(2);
      this.setState({
        selectedRowKeys : saveModalList.labelInfos,
        scoreList : [...label, {scoreCardName:'总分',maxScore: total}],
        gradeList : saveModalList.scoreGrades,
        industryid: saveModalList.industryid,
        gradeCardDescribe: saveModalList.gradeCardDescribe,
        gradeCardName: saveModalList.gradeCardName
      })
    }
  }

  // 模型名字改变
  gradeCardNameChange = (e) => {
    const value = e.target.value;
    this.setState({
      gradeCardName : value
    })
    this.props.saveModalList.gradeCardName = value;
  }

  // 行业选中改变
  industryChange = (id) => {
    this.props.saveModalList.industryid = id;
    this.setState({
      industryid : id
    })
  }

  // 模型描述改变
  describeChange = (e) => {
    const value = e.target.value;
    this.setState({
      gradeCardDescribe : value
    })
    this.props.saveModalList.gradeCardDescribe = value;
  }

  selectLabel = ()=>{
    const { selectedRowKeys , midRow } = this.state;
    if(!midRow.length)return;
    let tmp = [];
    let hash = {};
    let selectedLabel = [...selectedRowKeys,...midRow];
    for(let i= 0 ; i < selectedLabel.length; i++ ){
      if(!hash[selectedLabel[i].id]){
        tmp.push(selectedLabel[i]);
        hash[selectedLabel[i].id] = true;
      };
    }
    this.setState({
      selectedRowKeys : tmp
    })
  }
  
  confirmAdd= ()=>{
    const label = this.state.selectedRowKeys;
    var total = null;
    for(let value of Object.values(label)){
      const re = /^[1-9]+[0-9]*]*$/ ;
      if(!re.test(value.weight) || value.weight < 0 || value.weight > 100) {
        message.error("权重需为1-100之间的正整数");
        return;
      }
      if(!value.weight){
        message.error('权重不能为空!');
        return;
      }
    };
    this.props.saveModalList.labelInfos = [...label]
    for (let i = 0; i < label.length; i++) {
      label[i].maxScore = ((label[i].maxScore * label[i].weight).toFixed(2)) - 0;
      total += label[i].maxScore;
    };
    total.toFixed(2);
    this.setState({
      scoreList : [...label, {scoreCardName:'总分',maxScore: total}]
    })
    this.props.saveModalList.totalScore = total
    this.props.saveModalList.scoreList = [...label, {scoreCardName:'总分',maxScore: total}]
  }

  gradeSave = (value) => {
    this.props.saveModalList.scoreGrades = [...value];
  }

  render() {
    const {list, fetchIndustry, lableList, weight, name, gradeList, saveModalList, industryList} = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      onSelect: (record, selected, selectedRows)=>{
        const isSelected = this.state.midRow.findIndex((v)=>{return v.id === record.id})
        let isLabel = [...this.state.midRow];

        if(selected && isSelected === -1){
          isLabel.push(record)
        };
        if(!selected && isSelected !== -1){
          isLabel.splice(isSelected,1)
        }
        this.setState({
          midRow : isLabel
        })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.setState({
          midRow : selectedRows
        })
      }
    };
    const { gradeCardName, gradeCardDescribe, industryid } = this.state
    let view =  <div>
      <div className="addable-cell">
        <div>
          <span className="span">模型名称：</span>
          <Input name="gradeCardName" value = {gradeCardName} onChange={this.gradeCardNameChange}
            style={{ width: "20%", margin: "20px 0" }} />
        </div>
        <div>
          <span className="span">行<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>业：</span>
          <Select name="industryid" placeholder="请选择" onChange={this.industryChange}
            value = {industryid}
            style={{ width: "20%", margin: "20px 0" }}>
            {industryList.map(province => <Option key={province.id}>{province.industryName}</Option>)}
          </Select>
        </div>
        <div style={{marginTop:'10px'}}>
          <span className="span">描<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>述：</span>
          <Input name="gradeCardDescribe" placeholder="" onChange={this.describeChange}
            value = {gradeCardDescribe}
            style={{ width: "50%",verticalAlign:'middle' }} type="textarea"  />
        </div>
      </div>
      <div className="addable-cell">
        <span className="tags">标签列表</span>
        <Row>
          <Col span={11}>
            <Table
              rowKey={new Date().getTime()}
              rowSelection={rowSelection}
              columns={this.columns}
              bordered={true}
              pagination={false}
              dataSource={lableList.rows}
              scroll={{ y: 392 }}
            />
          </Col>
          <Col span={2}>
            <button onClick={this.selectLabel} style={{margin:'20px 0 0 5px'}}>选取<Icon type="arrow-right" /></button>
          </Col>
          <Col span={11}>
            <Table
              rowKey='id'
              columns={this.lableColumns}
              bordered={true}
              pagination={false}
              dataSource={this.state.selectedRowKeys}
              scroll={{ y: 392 }}
            />
          </Col>
         <Button className="insertBut" type="primary" disabled={this.state.isDisabled} onClick={this.confirmAdd}>确定</Button>
        </Row>
        <span className="tags">模型分数</span>
        <Table
          rowKey={new Date().getTime()}
          columns={this.scoreColumns}
          bordered={true}
          pagination={false}
          dataSource={this.state.scoreList}
          className="lableTabel"
        />
        <span className="tags">评分等级</span>
        <TextEditTable
            rowKey='addGrade'
            columns={this.gradeColumns}
            dataSource={this.state.gradeList}
            actions={{
              add : true,
              delete : true,
            }}  
            getData = {(value)=>this.gradeSave(value)}
            className="lableTabel"
        />
        <div style={{margin:'100px 0 50px 0', textAlign:'center'}}>
            <Button type="primary" onClick={this.saveModal} style={{marginRight:'10px'}}>保存</Button>
            <Button type="primary" onClick={() => {history.back()}} >取消</Button>
        </div>
      </div>
    </div>;
    return view;
  }
}

export default withRouter(Add)
