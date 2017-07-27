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

    this.columns = [{
        key: 'name',
        title: '企业名称',
        dataIndex: 'name',
      },{
        key: 'address',
        title: '详细地址',
        dataIndex: 'address',
      },{
        key: 'contacts',
        title: '联系人',
        dataIndex: 'contacts',
      },{
        key: 'contactsNumber',
        title: '联系人电话',
        dataIndex: 'contactsNumber',
      },{
        key: 'industry',
        title: '行业',
        dataIndex: 'industry',
      },{
        key: 'activated',
        title: '激活状态',
        dataIndex: 'activated',
        render: (text, record) => 
                <span>{
                [{"value":"T","name":"已注册"},{"value":"F","name":"未注册"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
                }</span>
        },{
        key: 'enterpriseStatus',
        title: '启用状态',
        dataIndex: 'enterpriseStatus',
        render: (text, record) => 
                <span>{
                [{"value":"T","name":"启用"},{"value":"F","name":"停用"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
                }</span>
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              查看
            </Link>
            <span className="ant-divider" />
            {record.enterpriseStatus == 'T'?
                <Popconfirm title="确定禁用?" onConfirm={() => this.props.forbidden(record.id)}>
                  <a href="#">禁用</a>
                </Popconfirm>
            :
                <Popconfirm title="确定启用?" onConfirm={() => this.props.forbidden(record.id)}>
                  <a href="#">启用</a>
                </Popconfirm>
            }
          </span>
        ),
      }];
  }

  //页面加载
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
    this.props.fetchList();
  }

  getUrlQueryParams(v) {
    v = v || this.props.params.queryParams;
    return '/hpx2/hpxmng/maintain/' + encodeURI(JSON.stringify(v || {}));
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

  search() {
    let queryParams = this.props.list.queryParams;
    let arr = [{
        key: 'name',
        value: {
          value: queryParams.name ? queryParams.name.value : null
        }
      },{
        key: 'activated',
        value: {
          value: queryParams.activated ? queryParams.activated.value : null
        }
      }];
    let obj = {};
    arr.forEach((v)=> {obj[v.key] = v.value});
    obj.pagination = this.props.list.queryParams.pagination,
    browserHistory.push(
      this.getUrlQueryParams(obj)
    );
  }


  render() {
    const { list, fetchList, listStatus } = this.props;
    let view = <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          {...list.queryParams}
          search={this.search.bind(this)}
          onChange={this.props.updateQueryParams.bind(this)}
          clear={this.props.clearQueryParams}
          loading={listStatus.loading}
        />
      </div>
      <Table
        rowKey="id"
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
