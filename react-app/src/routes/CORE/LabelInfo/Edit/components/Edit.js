import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Form, InputNumber, DatePicker, Modal, Input, Icon, Select, Popconfirm, message, Tooltip, Row, Col } from 'antd'
import { getMoment, precisionFormat } from '../../../../../core/util'
import './Edit.css';
import  TextEditable  from '../../../../../components/EditTable/TextEditTable'
import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const Option = Select.Option;

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idDisabled: false,
    };
    this.columns = [{
      key: 'oneLevel',
      title: '评分类别',
      dataIndex: 'oneLevel',
      /*render: (text, record, index) => (
        <Input
          defaultValue={text}
          style = {{ width: '100%'}}
          id={'oneLevel/'+index}
          onChange={this.onCellChange}
        />
      ),*/
     }, {
      key: 'twoLevel',
      title: '评分项',
      dataIndex: 'twoLevel',
      /*render: (text, record, index) => (
         <Input
          defaultValue={text}
          style = {{ width: '100%'}}
          id={'twoLevel/'+index}
          onChange={this.onCellChange}
        />
      ),*/
     }, {
      key: 'threeLevel',
      title: '评分标准',
      dataIndex: 'threeLevel',
      /*render: (text, record, index) => (
         <Input
          defaultValue={text}
          style = {{ width: '100%'}}
          id={'threeLevel/'+index}
          onChange={this.onCellChange}
        />
      ),*/
     }, {
      key: 'score',
      title: '分值',
      dataIndex: 'score',
      /*render: (text, record, index) => (
         <Input
          defaultValue={text}
          style = {{ width: '100%'}}
          id={'score/'+index}
          onChange={this.onCellChange}
        />
      ),*/
      }, {
      key: 'targetGradeWeight',
      title: '评分权重(%)',
      dataIndex: 'targetGradeWeight',
      /*render: (text, record, index) => (
         <Input
          defaultValue={text}
          style = {{ width: '100%'}}
          id={'targetGradeWeight/'+index}
          onChange={this.onCellChange}
        />
      ),*/
     }, {
      key: 'targetPricingWeight',
      title: '定价权重(%)',
      dataIndex: 'targetPricingWeight',
      /*render: (text, record, index) => (
         <Input
          defaultValue={text}
          style = {{ width: '100%'}}
          id={'targetPricingWeight/'+index}
          onChange={this.onCellChange}
        />
      ),*/
      }, {
      key: 'targetFloatParameter',
      title: '浮动',
      dataIndex: 'targetFloatParameter',
      /*render: (text, record, index) => (
         <Input
          defaultValue={text}
          style = {{ width: '100%'}}
          id={'targetFloatParameter/'+index}
          onChange={this.onCellChange}
        />
      ),*/
    },
     /*{
      title: '操作',
      key: 'action',
      width: "10%",
      render: (text, record, index) => (
        <span>
          <Popconfirm title="确定删除?" onConfirm={() => this.deleteEdit(record.id)}>
            <a href="#">删除</a>
          </Popconfirm>
        </span>
      ),
    }*/
    ];
  }

  onCellChange = (e) => {
    const data = [...this.props.detailList.modelTargetInfos];
    const id = e.target.id.split('/');
    const key = id[0];
    const index = id[1];
    const value = e.target.value;
    data[index][key] = value;
  }

  deleteEdit = (id) => {
    const dataSource = [...this.props.detailList.modelTargetInfos].filter( item => {return item.id != id});
    this.props.delEdit(dataSource)
  }

  componentWillMount() {
    try {
      if (this.props.params.queryParams) {
        let queryParams =
          JSON.parse(decodeURI(this.props.params.queryParams));
        this.props.updateQueryParams(queryParams);
      }
    } catch (e) {
      console.log(e);
    }
    const id = this.props.params.id;
    if(!id){
      return
    } else {
      this.props.fetchDetail(this.props.params.id);
    }
  }

  getMomentFormat(v) {
    if (!v) return null;
    return moment(v).format('YYYY-MM-DD');
  }
  
  handleAdd = () => {
    const id = this.props.params.id;
    const newData = {
      id: new Date().getTime(),
      oneLevel: "",
      twoLevel: "",
      threeLevel: "",
      score: "",
      targetGradeWeight: "",
      targetPricingWeight: "",
      targetFloatParameter: "",
    };
    const data = this.props.detailList.modelTargetInfos
    this.props.add(newData)
    // data.map((v) => {
    //   if (
    //     v.oneLevel == '' ||
    //     v.twoLevel == '' ||
    //     v.threeLevel == '' ||
    //     v.score == '' ||
    //     v.targetGradeWeight == '' ||
    //     v.targetPricingWeight == '' ||
    //     v.targetFloatParameter == '') {
    //     this.setState ({idDisabled:true})
    //   } else {
    //     console.log('123',newData)       
    //     this.props.add(newData)
    //   }
    // })

  }

  componentWillReceiveProps(nextProps) {
    const { saveStatus, err, fetchList } = nextProps;
    if (
      this.props.saveStatus.type != saveStatus.type
      && saveStatus.type.match('SUCCESS')
    ) {
      fetchList();
      browserHistory.go(-1);
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }
  
  handleSave = (value) => {
    const id = this.props.params.id
    let detailList = this.props.detailList;
    detailList.modelTargetInfos = [...value]

    console.log("保存数据",detailList)
    this.props.save(detailList, id)
  }

  nameChange = (e) => {
    const value = e.target.value
    this.props.nameChange(value)
  }

  render() {
    const { inputs, detailList, listStatus } = this.props;
    const tmp = detailList.modelTargetInfos
    console.log("编辑前" , detailList)
    let view = <div>
      <div className="editLabelName">
        <Input value={detailList.scoreCardName} onChange={this.nameChange} style={{ width: 120 }} />
      </div>
      {/*<Table
        rowKey={new Date().getTime()}
        columns={this.columns}
        dataSource={detailList.modelTargetInfos}
        bordered={true}
        pagination={false}
        onChange={this.handleTableChange.bind(this)}
        style={{marginBottom:'20px'}}
      />*/}
      {/*{
      tmp && tmp.length ?*/}
      <TextEditable
        rowKey='id'
        columns={this.columns}
        dataSource={tmp}
        actions={{
          add : true,
          delete : true,
        }}  
        getData = {(value)=>this.handleSave(value)}
      /> 
      {/*: 
      <TextEditable
        rowKey='id'
        columns={this.columns}
        dataSource={tmp}
        actions={{
          add : true,
          delete : true,
        }}  
        getData = {(value)=>this.handleSave(value)}
      />
      }*/}
      {/*<Button type="primary" onClick={() => {history.back()}}>取消</Button>
      <Button type="primary" disabled={this.state.idDisabled ? true : false} onClick={this.handleAdd} style={{ margin: "0 20px" }}>新增</Button>
      <Button type="primary" onClick={this.handleSave}>保存</Button><br/><br/>*/}
    </div>;
    return view;
  }
}

export default withRouter(Edit)
