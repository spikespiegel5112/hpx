import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Popconfirm, message } from 'antd'
import { getMoment, precisionFormat } from '../../../../core/util'
import './Component.css';

import moment from 'moment'
import Search from './Search';
const dateFormat = 'YYYY/MM/DD';

class Compo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
    };
    console.log(this.props)
    const receiptsType = this.props.params.queryParams;
    //退款管理
    if (receiptsType == "T") {
      this.columns = [{
        key: 'code',
        title: '退款单号',
        dataIndex: 'code',
      }, {
        key: 'contractCode',
        title: '合同编号',
        dataIndex: 'contractCode',
      }, {
        key: 'purchaser',
        title: '供应商',
        dataIndex: 'purchaser',
      }, {
        key: 'money',
        title: '退款金额',
        dataIndex: 'money',
        render: (text) => <span>{precisionFormat(2, text)}</span>
      }, {
        key: 'applicationDate',
        title: '申请日期',
        dataIndex: 'applicationDate',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      }, {
        key: 'approvalStatus',
        title: '审批状态',
        dataIndex: 'approvalStatus',
        render: (text, record) =>
          <span>{
            [{ "value": "待审批", "name": "0" }, { "value": "已通过", "name": "1" }, { "value": "已拒绝", "name": "2" }]
              .filter((v) => v.value == text).map((v) => v.name) || ''
          }</span>
      }, {
        key: 'paymentStatus',
        title: '退款状态',
        dataIndex: 'paymentStatus',
        render: (text, record) =>
          <span>{
            [{ "value": "待退款", "name": "0" }, { "value": "已完成", "name": "1" }]
              .filter((v) => v.value == text).map((v) => v.name) || ''
          }</span>
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              查看退款路径
            </Link>
            <span className="ant-divider" />
             <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              查看明细
            </Link>
          </span>
        ),
      }];
    }

     //补发管理
    if (receiptsType == "F") {
      this.columns = [{
        key: 'code',
        title: '编号',
        dataIndex: 'code',
      }, {
        key: 'contractCode',
        title: '合同编号',
        dataIndex: 'contractCode',
      }, {
        key: 'purchaser',
        title: '供应商',
        dataIndex: 'purchaser',
      },  {
        key: 'applicationDate',
        title: '申请日期',
        dataIndex: 'applicationDate',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      }, {
        key: 'approvalStatus',
        title: '审批状态',
        dataIndex: 'approvalStatus',
        render: (text, record) =>
          <span>{
            [{ "value": "待审批", "name": "0" }, { "value": "已通过", "name": "1" }, { "value": "已拒绝", "name": "2" }]
              .filter((v) => v.value == text).map((v) => v.name) || ''
          }</span>
      }, {
        key: 'shipmentsStatus',
        title: '发货状态',
        dataIndex: 'shipmentsStatus',
        render: (text, record) =>
          <span>{
            [{ "value": "待收货", "name": "0" }, { "value": "已收货", "name": "1" }]
              .filter((v) => v.value == text).map((v) => v.name) || ''
          }</span>
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          record.shipmentsStatus == "0" ?
          <span>
            <Popconfirm title="确认收货?" onConfirm={()=>this.props.confirm(record.id)}>
              <a href="#">待收货</a>
            </Popconfirm>
            <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              查看明细
            </Link>
          </span>
          :
          <span>
            <Popconfirm title="确认收货?" onConfirm={() => this.props.comfirm(record.id,receiptsType)}>
              <a disabled="true" href="#">已收货</a>
            </Popconfirm>
            <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              查看明细
            </Link>
          </span>
        ),
      }];
    }

     //补购管理
    if (receiptsType == "G") {
      this.columns = [{
        key: 'code',
        title: '申请单号',
        dataIndex: 'code',
      }, {
        key: 'contractCode',
        title: '合同编号',
        dataIndex: 'contractCode',
      }, {
        key: 'code',
        title: '供应商',
        dataIndex: 'code',
      }, {
        key: 'money',
        title: '补购金额',
        dataIndex: 'money',
        render: (text) => <span>{precisionFormat(2, text)}</span>
      }, {
        key: 'applicationDate',
        title: '补购日期',
        dataIndex: 'applicationDate',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      }, {
        key: 'approvalStatus',
        title: '审批状态',
        dataIndex: 'approvalStatus',
        render: (text, record) =>
          <span>{
            [{ "value": "待审批", "name": "0" }, { "value": "已通过", "name": "1" }, { "value": "已拒绝", "name": "2" }]
              .filter((v) => v.value == text).map((v) => v.name) || ''
          }</span>
      }, {
        key: 'paymentStatus',
        title: '支付状态',
        dataIndex: 'paymentStatus',
        render: (text, record) =>
          <span>{
            [{ "value": "待支付", "name": "0" }, { "value": "已支付", "name": "1" }]
              .filter((v) => v.value == text).map((v) => v.name) || ''
          }</span>
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              查看明细
            </Link>
          </span>
        ),
      }];
    }
  }
  componentWillMount() {
    // try {
    //   if (this.props.params.queryParams) {
    //     let queryParams = 
    //       JSON.parse(decodeURI(this.props.params.queryParams));
    //     this.props.updateQueryParams(queryParams);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    const receiptsType = this.props.params.queryParams;
    this.props.fetchList(receiptsType);
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    const { deleteStatus, listStatus, fetchList, list, err } = nextProps;
    if (
      this.props.listStatus.type != listStatus.type
      && listStatus.type.match('SUCCESS')
      && list.rows.length == 0 && list.queryParams.pagination.total > 0
    ) {//删除成功重新拉取列表数据
      fetchList(this.props.params.queryParams);
    }
    if (
      this.props.deleteStatus.type != deleteStatus.type
      && deleteStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      console.log(5555)
      fetchList(this.props.params.queryParams);
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  //分页、排序、筛选变化时触发
  handleTableChange(pagination, filters, sorter) {
    browserHistory.push(`${this.getUrlQueryParams(
      {
        ...this.props.list.queryParams,
        pagination,
      }
    )}`);
  }
  getMomentFormat(v) {
    if (!v) return null;
    return moment(v).format('YYYY-MM-DD');
  }
  search() {
    let queryParams = this.props.list.queryParams;
    let arr = [];
    let obj = {};
    arr.forEach((v)=> {obj[v.key] = v.value});
    obj.pagination = this.props.list.queryParams.pagination,
    browserHistory.push(
      this.getUrlQueryParams(obj)
    );
  }
  getUrlQueryParams(v) {
    console.log(this.props.params)
    
    return '/AfterSale/'+this.props.params.queryParams;
  }
  render() {
    const { selectedRowKeys } = this.state;
    const { list, fetchList, listStatus } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
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
    const hasSelected = selectedRowKeys.length > 0;

    let view = <div>
      {/*<div style={{ marginBottom: 16 }}>*/}
        {/*<Search
          {...list.queryParams}
          search={this.search.bind(this)}
          onChange={this.props.updateQueryParams.bind(this)}
          clear={this.props.clearQueryParams}
          loading={listStatus.loading}
        />
        <Link 
          to={`${this.getUrlQueryParams()}/detail`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">新增</Button>
        </Link>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `选择了 ${selectedRowKeys.length} 项` : ''}
        </span>
      </div>*/}
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={this.columns}
        dataSource={list.rows}
        pagination={list.queryParams.pagination}
        loading={listStatus.loading}
        onChange={this.handleTableChange.bind(this)}
      />
    </div>;
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

Compo.propTypes = {
}

export default withRouter(Compo)
