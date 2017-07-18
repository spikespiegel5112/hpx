import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {
  Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Popconfirm,
  DatePicker, Upload, message, Modal, Table 
} from 'antd'
import { getMoment, precisionFormat } from '../../../../../core/util'
import './Redact.css';

import { precisionValidator } from '../../../../../core/antdFormUtil.js'

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;

class Redact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      isDisabled:false
    };
    this.columns = [{
        key: 'scoreCardName',
        title: '名称',
        width: 100,
        dataIndex: 'scoreCardName',
        render: (text, record, index) => (
          <span name='scoreCardName'>{text}</span>
        ),
      }, {
        key: 'weight',
        title: '权重（%）',
        dataIndex: 'weight',
        render: (text, record, index) => (
          <Input type='number'
            disabled={this.state.isDisabled}
            onChange={this.onCellChange}
            defaultValue={text}
          />
        ),
      }, {
        key: 'actionone',
        title: '操作',
        render: (index) => (
          <span>
            <Popconfirm title="确定删除?" onConfirm={() => this.delLabelList(index)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }];

    this.lableColumns = [{
        key: 'scoreCardName',
        title: '标签名称',
        dataIndex: 'scoreCardName',
      }
    ];
    this.scoreColumns = [{
        key: 'scoreCardName',
        title: '标签',
        dataIndex: 'scoreCardName',
        render: (text, record, index) => (
          <span name="scoreCardName">{text}</span>
        ),
      }, {
        key: 'maxScore',
        title: '分数',
        dataIndex: 'maxScore',
        render: (text, record, index) => (
          <span name="maxScore">{text}</span>
        ),
      }];
    this.gradeColumns = [{
      key: 'gradeName',
      title: '等级',
      dataIndex: 'gradeName',
      render: (text, record, index) => (
        <Input id={'gradeName/'+index} onChange={this.editGrade} defaultValue={text}/>
      ),
      }, {
        key: 'gradeMin',
        title: '最小值',
        dataIndex: 'gradeMin',
        render: (text, record, index) => (
          <Input id={'gradeMin/'+index} onChange={this.editGrade}  min="10" max="20" defaultValue={text}/>
        ),
      }, {
        key: 'gradeMax',
        title: '最大值',
        dataIndex: 'gradeMax',
        render: (text, record, index) => (
          <Input type='number' id={'gradeMax/'+index} onChange={this.editGrade} max='90' defaultValue={text}/>
        ),
      }, {
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
    this.props.fetchIndustry();
    this.props.fetchSelect(this.props.params.id);
  }

  // 编辑权重
  onCellChange = (e) => {
    const value = e.target.value
    const labelInfos = this.props.saveModalList.labelInfos
    labelInfos.map((v, i) => {
      v.weight = value
    })
  }

  // 选择标签
  selectChange = (value) => {
    const lableName = this.props.name.rows
    lableName.push(value)
    this.props.editNameCell(lableName);
  }

  //添加标签后确定操作 
  confirmAddLable = () => {
    const selectLablelist = this.props.selectLablelist
    var data = [];
    var total = null;
    for (let i = 0; i < selectLablelist.length; i++) {
      selectLablelist[i].maxScore = selectLablelist[i].maxScore * selectLablelist[i].weight
      total += selectLablelist[i].maxScore
      data.push(selectLablelist[i])
    }
    data.push({
      scoreCardName:"总分",
      maxScore:total
    })
    this.props.getScoreList(data)
    this.props.getScoreTotal(total)
    this.setState({
      isDisabled:true
    })
  }

  //标签列表删除方法
  delLabelList = (index) => {
    const data = [...this.props.saveModalList.labelInfos];
    const score = [...this.props.saveModalList.scoreList]
    data.splice(index, 1)
    score.splice(index, 1)
    this.props.delLabelList(data)
    this.props.delScoreList(score)
  }

  //评分等级删除方法
  delGradeList = (id) => {
    const dataSourcetwo = [...this.props.gradeList.rows];
    dataSourcetwo.map((v, i) => {
      if (v.id == id) {
        return dataSourcetwo.splice(i, 1)
      }
    })
    this.props.delGradeList(dataSourcetwo)
  }

  // 增加标签
  addLable = () => {
    this.props.fetchLabel();
    this.props.showLableModal()
  }

  onSelectChange(selectedRowKeys,selectedRows) {
    this.setState({ selectedRowKeys });
  }

  // 选中标签信息
  selectLableName(record, selected, selectedRows) {
    const selectLablelist = this.props.selectLablelist
    if (selected) {
      selectLablelist.push(record);
    }
    if(!selected) {
      const i = selectLablelist.findIndex((v) => {
        return v = record
      })
      selectLablelist.splice(i,1)
    }
  }

  // 编辑评分等级
  editGrade = (e) => {
    const scoreGrades = [...this.props.saveModalList.scoreGrades];
    const totalScore = this.props.saveModalList.totalScore;
    const keyIndex = e.target.id.split('/');
    const value = e.target.value;
    const key = keyIndex[0];
    const index = keyIndex[1];
    if(value > 0 && value < totalScore) {
      scoreGrades[index][key] = value;
    }else {
      message.error('最大值不能大于' + totalScore)
      scoreGrades[index][key] = null;
      return false
    }
    
  }

  //评分等级新增
  addScoreGrade = () => {
    const newData = {
      id: new Date(),
      gradeName: "",
      gradeMin: "",
      gradeMax: "",
    };
    this.props.addScoreGrade(newData);
  }

  //模型保存
  saveModal = () => {
    console.log("保存啦",this.props.saveModalList)
    this.props.saveModal(this.props.saveModalList)
  }

  // componentWillReceiveProps(nextProps) {
  //   const { saveModalStatus, err } = nextProps;
  //   if (this.props.saveModalStatus.type != saveModalStatus.type && saveModalStatus.type.match('SUCCESS')) {
  //     message.success("保存成功");
  //     // browserHistory.go(-1);
  //   }
  //   if (err) {
  //     message.error(err);
  //     this.props.clearErr();
  //   }
  // }

  // 模型名字改变
  gradeCardNameChange = (e) => {
    const value = e.target.value;
    this.props.saveModalList.gradeCardName = value;
  }

  // 行业选中改变
  industryChange = (id) => {
    this.props.saveModalList.industryid = id;
  }

  // 模型描述改变
  describeChange = (e) => {
    const value = e.target.value;
    this.props.saveModalList.gradeCardDescribe = value;
  }

  // 关闭模态框
  modalCancel = () => {
    this.props.hiddenLableModal()
  }

  // 选中标签
  handleOk = () => {
    const selectLablelist = this.props.selectLablelist
    this.props.selectLableOk(selectLablelist)
  }

  render() {
    const {list, fetchIndustry, scoreList, selectLablelist, lableList,selectModalList,
      weight, name, gradeList, saveModalList, industryList } = this.props;
      console.log('selectModalList',selectModalList);
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      onSelect: this.selectLableName.bind(this),
      selections: [
        selectedRowKeys.length == 1
          ? {
            key: 'operate1',
            text: '操作1',
            onSelect: () => {
              message.info('操作1')
            },
          } : null
      ].filter((v) => v || false),
    };
    let view = !selectModalList.rows ? null : <div>
      <div className="addable-cell">
        <div>
          <span className="span">模型名称：</span>
          <Input name="gradeCardName" placeholder="" onChange={this.gradeCardNameChange}
            style={{ width: "20%", margin: "10px 0" }}  defaultValue={selectModalList.rows.gradeCardName}/>
        </div>
        <div>
          <span className="span">行<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>业：</span>
          <Select name="industryid" placeholder="请选择" onChange={this.industryChange}
            style={{ width: "20%", margin: "10px 0" }} defaultValue={selectModalList.rows.industryid}>
            {industryList.map(province => <Option key={province.id}>{province.industryName}</Option>)}
          </Select>
        </div>
        <div style={{marginTop:'10px'}}>
          <span className="span-describe">描<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>述：</span>
          <Input name="gradeCardDescribe" placeholder="" onChange={this.describeChange}
            style={{ width: "50%",verticalAlign:'middle' }} type="textarea"  defaultValue={selectModalList.rows.gradeCardDescribe}/>
        </div>
      </div>
      <div className="addable-cell">
        <span className="tags">标签列表</span>
        <Table
          rowKey={new Date().getTime()}
          columns={this.columns}
          bordered={true}
          pagination={false}
          dataSource={selectModalList.rows.labelInfos}
        />
        <Button className="insertBut" type="primary" disabled={this.state.isDisabled} onClick={this.confirmAddLable}>确定</Button>
        <Button className="insertBut" type="primary" onClick={this.addLable}>新增</Button>
        <Modal
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.modalCancel}
          title='标签列表'
        >
          <Table
            rowKey={new Date().getTime()}
            rowSelection={rowSelection}
            columns={this.lableColumns}
            showHeader={false}
            bordered={true}
            pagination={false}
            dataSource={lableList.rows}
            className="lableTabel"
          />
        </Modal>
        <span className="tags">模型分数</span>
        <Table
          rowKey={new Date().getTime()}
          columns={this.scoreColumns}
          bordered={true}
          pagination={false}
          dataSource={selectModalList.rows.labelInfos}
        />
        <br/>
       <span className="tags">评分等级</span>
        <Table
          rowKey={new Date().getTime()}
          columns={this.gradeColumns}
          bordered={true}
          pagination={false}
          dataSource={selectModalList.rows.scoreGrades}
        />
        <Button className="insertBut" type="primary" onClick={this.addScoreGrade}>新增</Button>
        <Button className="saveBut" type="primary" onClick={this.saveModal}>保存</Button>
      </div>
    </div>;
    return view;
  }
}

export default withRouter(Redact)
