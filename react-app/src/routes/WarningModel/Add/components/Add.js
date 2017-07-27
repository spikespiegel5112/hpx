import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Popconfirm,
   DatePicker, Upload, message, Modal,Table } from 'antd'
import { getMoment, precisionFormat } from '../../../../core/util'
import './Add.css';

import { precisionValidator } from '../../../../core/antdFormUtil.js'

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper ">
              {value || ' '}
              <Icon
                className="pencil"
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
      selectLablelist: [],
      scoreList: [],
    };

    this.columns = [{
        key: 'scoreCardName',
        title: '名称',
        width: 100,
        dataIndex: 'scoreCardName',
      },{
        key: 'opneWeight',
        title: '权重（%）',
        dataIndex: 'opneWeight',
         render: (text, record, index) => (
           <EditableCell
              value={text}
              onChange={this.onCellChange(record, index)}
            />
        ),
      },{
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
      }]; 
    this.scoreColumns = [{
        key: 'scoreCardName',
        title: '标签',
        dataIndex: 'scoreCardName',
      },{
        key: 'score',
        title: '分数',
        dataIndex: 'score',
      }]; 
  
    this.columns3 = [{
        key: 'gradeName',
        title: '等级',
        dataIndex: 'gradeName',
        render: (text, record, index) => (
          <Input name="gradeName" style={{ width: "100%"}}/>
        ),
      },{
        key: 'gradeMin',
        title: '最小值',
        dataIndex: 'gradeMin',
         render: (text, record, index) => (
          <Input name="gradeMin" style={{ width: "100%"}}/>
        ),
      },{
        key: 'gradeMax',
        title: '最大值',
        dataIndex: 'gradeMax',
         render: (text, record, index) => (
          <Input name="gradeMax" style={{ width: "100%"}}/>
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
    this.props.fetchIndustry();
  }

  onCellChange = (record, index) => {
    return (value) => {
      record.opneWeight = value;
    };
  }

  selectChange = (value) => {
    const lableName = this.props.name.rows
    lableName.push(value)
    this.props.editNameCell(lableName);
  }

  //添加标签后确定操作 
  confirmAddLable = () => {
    const selectLablelist = this.props.selectLablelist.rows
    console.log("确定啦",selectLablelist) 
    selectLablelist.map((v,i) => {
      score = v.score
    })

  }

  //标签列表删除方法
  delLabelList = ( index ) => {
    const dataSource = [...this.props.weight.rows];
    dataSource.splice(index,1)
    this.props.delLabelList(dataSource)
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
      id: new Date().getTime(),
      weight:''
    };
    this.props.fetchLabel();
    this.props.add(newDataone);
  }

  addLable = () => {
    this.props.fetchLabel();
    this.props.showLableModal()
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  selectData(record, selected, selectedRows) {
    const selectLablelist =  this.state.selectLablelist;
    selectLablelist.push(record);
    this.setState({
      selectLablelist: selectLablelist
    })
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

  modalCancel = () => {
    this.props.hiddenLableModal()
  }

  handleOk = () => {
    const selectLablelist = this.state.selectLablelist
    this.props.selectLableOk(selectLablelist)
  }

  render() {
    const { inputs, fetchList, list, listStatus,fetchIndustry, selectLablelist,
      industrylist, lableList, updateInputs ,detailList, weight, name, gradeList ,savelist} = this.props;    
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      onSelect:this.selectData.bind(this),
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
    let view = <div>
      <div className="addable-cell">
        <span className="span">模型名称：</span>
            <Input name="gradeCardName" placeholder=""  onChange={this.gradeCardName}
              style={{ width: "20%", margin: "20px 0" }}/>
          <br/>
          <span className="span">行<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>业：</span>
            <Select name="industryid" placeholder="请选择"  onChange={this.industryid}
                style={{ width: "20%", margin: "20px 0" }}>
                {industrylist.rows.map(province => <Option key={province.id}>{province.industryName}</Option>)}
            </Select>
          <br/>
          <span className="span-describe">描<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>述：</span>
            <Input name="gradeCardDescribe" placeholder="" onChange={this.gradeCardDescribe}
            style={{ width: "50%", margin: "20px 0" }} type="textarea" rows={6}/>
          </div> 
        <br/>
        <div className="addable-cell">
          <span className="tags">标签列表</span> />         
          <Table
            rowKey="idone"
            columns={this.columns}
            bordered={true}
            pagination={false}
            dataSource={selectLablelist.rows}
          />
          <Button className="insertBut" type="primary" onClick={this.confirmAddLable}>确定</Button>
          <Button className="insertBut" type="primary" onClick={this.addLable}>新增</Button>
          <Modal
              title="标签列表"
              visible={this.props.visible}
              onOk={this.handleOk}
              onCancel={this.modalCancel}
            >
            <Table
              rowKey={new Date().getTime()}
              rowSelection={rowSelection}
              columns={this.lableColumns}
              bordered={true}
              pagination={false}
              dataSource={lableList.rows}
            />
          </Modal>
        <br/>
        <br/>
        <span className="tags">模型分数</span>
          <Table
            rowKey={new Date().getTime()}
            columns={this.scoreColumns}
            bordered={true}
            pagination={false}
            dataSource={this.state.scoreList}
          />

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

export default withRouter(Add)
