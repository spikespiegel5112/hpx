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
        key: 'title',
        title: '标题',
        dataIndex: 'title',
      },{
        key: 'endTime',
        title: '有效期',
        dataIndex: 'endTime',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      },{
        key: 'createTime',
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      },{
        key: 'modifiedTime',
        title: '修改时间',
        dataIndex: 'modifiedTime',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      }/*,{
        key: 'creator',
        title: '创建人',
        dataIndex: 'creator',
      },{
        key: 'modifiedBy',
        title: '修改人',
        dataIndex: 'modifiedBy',
      },{
        key: 'url',
        title: '路径',
        dataIndex: 'url',
      },{
        key: 'picPath',
        title: '图片路径',
        dataIndex: 'picPath',
      },{
        key: 'enterpriseId',
        title: '企业id',
        dataIndex: 'enterpriseId',
      }*/,
      {
        key: 'istop',
        title: '是否置顶',
        dataIndex: 'istop',
        render: (text, record) => 
          <span>{
            [{"value":"0","name":"否"},{"value":"1","name":"是"}]
              .filter((v)=> v.value == text).map((v)=>v.name) || ''
          }</span>
      },
      {
        key: 'publishState',
        title: '发布状态',
        dataIndex: 'publishState',
        render: (text, record) => 
          <span>{
            [{"value":"T","name":"已发布"},{"value":"F","name":"未发布"}]
              .filter((v)=> v.value == text).map((v)=>v.name) || ''
          }</span>
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              查看
            </Link>
            <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/edit/${record.id}`}>
              修改
            </Link>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
              <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              置顶
            </Link>
            <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              发布
            </Link>
          </span>
        ),
      }];
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
    this.props.fetchList();
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
    let queryParams = this.props.list.queryParams;
    let arr = [{
        key: 'title',
        value: {
          value: queryParams.title ? queryParams.title.value : null
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
    return '/hpx2/hpxmng/news-notice/' + encodeURI(JSON.stringify(v || {}));
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
          to={`${this.getUrlQueryParams()}/edit`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">新增</Button>
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
