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
      pageType:""
    };

    this.pageType = this.props.params.queryParams;
    this.pageTypeInit = this.props.location.query;
    //let this.pageTypeTmp = JSON.parse(this.pageType);
    console.log(10,this.pageTypeInit);
    console.log(12,this.pageTypeInit.pagination);

    console.log(1,this.pageType);
   // console.log(111,this.pageType.length);
    this.columns = [{
          key: 'code',
          title: '支付流水号',
          dataIndex: 'code',
      }/*,{
          key: 'busCode',
          title: '业务代码',
          dataIndex: 'busCode',
        }*/
        ,{
          key: 'orderCode',
          title: '订单编号',
          dataIndex: 'orderCode',
        },{
          key: 'orderName',
          title: '订单名称',
          dataIndex: 'orderName',
        },{
          key: 'payer',
          title: '付款方',
          dataIndex: 'payer',
        },{
          key: 'payee',
          title: '收款方',
          dataIndex: 'payee',
        }/*,{
          key: 'totalMoney',
          title: '总金额',
          dataIndex: 'totalMoney',
          render: (text) => <span>{precisionFormat(2,text)}</span>
        },{
          key: 'paymentAmount',
          title: '支付金额',
          dataIndex: 'paymentAmount',
          render: (text) => <span>{precisionFormat(2,text)}</span>
        }*/,{
          key: 'noPaymentAmount',
          title: '金额',
          dataIndex: 'noPaymentAmount',
          render: (text) => <span>{precisionFormat(2,text)}</span>
        }/*,{
          key: 'property',
          title: '属性',
          dataIndex: 'property',
        }*/,{
          key: 'orderType',
          title: '订单类型',
          dataIndex: 'orderType',
          render: (text, record) => 
            <span>{
              [{"value":"0","name":"订单"},{"value":"1","name":"退款"},{"value":"2","name":"补货"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },{
          key: 'paymentType',
          title: '付款类型',
          dataIndex: 'paymentType',
          render: (text, record) => 
            <span>{
              [{"value":"0","name":"货款"},{"value":"1","name":"保证金"},{"value":"2","name":"罚息"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        }];


    if(this.pageType == "no-pay" || this.pageType == "historyPay" ){
       this.columns.push(
         {
          key: 'paystatus',
          title: '付款状态',
          dataIndex: 'paystatus',
          render: (text, record) => 
            <span>{
              [{"value":"0","name":"待付款"},{"value":"1","name":"已付款"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        });
    }
    if (this.pageType == "no-pay" ) {
      this.columns.push(
         {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Link to={`${this.getUrlQueryParams()}/Pay/${record.id}`}>
                支付
              </Link>
              <span className="ant-divider" />
              <Link to={`${this.getUrlQueryParams()}/PayDetail/${record.id}`}>
                支付明细
              </Link>
              <span className="ant-divider" />
              <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
                详情
              </Link>
              <span className="ant-divider" />
              <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
                <a href="#">删除</a>
              </Popconfirm>
            </span>
          )
        }
      );
    }
    
    if(this.pageType == "receive" || this.pageType == "historyReceive" ){
      
       this.columns.push({
          key: 'paystatus',
          title: '收款状态',
          dataIndex: 'paystatus',
          render: (text, record) => 
            <span>{
              [{"value":"0","name":"待收款"},{"value":"1","name":"已收款"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        })
    }

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
      fetchList();
    }
    if (
      this.props.deleteStatus.type != deleteStatus.type
      && deleteStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      fetchList();
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
    this.props.fetchList(this.pageType);
  }
  getUrlQueryParams(v) {
    v = v || this.props.params.queryParams;

    return '/payment/' + v;
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
      <div style={{ marginBottom: 16 }}>
        <Search
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
        {/* <Button type="primary">新增</Button>*/}
        </Link>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `选择了 ${selectedRowKeys.length} 项` : ''}
        </span>
      </div>
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
