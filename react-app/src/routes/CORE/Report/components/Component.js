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
    this.columns = [{
        key: 'name',
        title: '名称',
        dataIndex: 'name',
        render: (text, record) => <span>{record.enterpriseName}准入报告</span>
      },{
        key: 'enterpriseName',
        title: '企业名称',
        dataIndex: 'enterpriseName',
      },{
        key: 'industryName',
        title: '行业',
        dataIndex: 'industryName',
      },{
        key: 'creatTime',
        title: '创建时间',
        dataIndex: 'creatTime',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${this.getUrlQueryParams()}/admittance/?id=${record.id} `}>
              查看
            </Link>
            <span className="ant-divider" />
          </span>
        ),
      }];
  }
  componentWillMount() {
    if(this.props.children)return
    try {
      if (this.props.params.queryParams) {
        let queryParams = 
          JSON.parse(decodeURI(this.props.params.queryParams));
        this.props.updateQueryParams(queryParams);
      }
    } catch (e) {
      console.log(e);
    }
    alert(6)
    this.props.fetchList();
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {

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
    let arr = [{
        key: 'name',
        value: {
          value: queryParams.enterpriseName ? queryParams.enterpriseName.value : null
        }
      },{
        key: 'enterpriseName',
        value: {
          value: queryParams.enterpriseName ? queryParams.enterpriseName.value : null
        }
      },{
        key: 'creatTime',
        value: {
          value: queryParams.creatTime
            ? this.getMomentFormat(queryParams.creatTime.value) 
            : null
        }
      }];
    let obj = {};
    arr.forEach((v)=> {obj[v.key] = v.value});
    obj.pagination = this.props.list.queryParams.pagination,
    browserHistory.push(
      this.getUrlQueryParams(obj)
    );
  }
  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/hpx2/core/enterprise-reporting/' + encodeURI(JSON.stringify(v || {}));
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
