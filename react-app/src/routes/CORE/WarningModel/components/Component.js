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
        key: 'gradeCardName',
        title: '名称',
        dataIndex: 'gradeCardName',
      },{
        key: 'industryid',
        title: '行业',
        dataIndex: 'industryid',
      },
      {
        key: 'addTime',
        title: '创建时间',
        dataIndex: 'addTime',
         render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      },{
        key: 'gradeCardState',
        title: '状态',
        dataIndex: 'gradeCardState',
        render: (text, record) => 
          <span>{
            [{"value":"0","name":"启用"},{"value":"1","name":"停用"}]
              .filter((v)=> v.value == text).map((v)=>v.name) || ''
          }</span>
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${this.getUrlQueryParams()}/check/${record.id}`}>
              查看
            </Link>
            <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/add/${record.id}`}>
              编辑
            </Link>
            <span className="ant-divider" />
             {record.gradeCardState == '0'?
                <Popconfirm title="确定禁用?" onConfirm={() => this.props.forbidden(record.id)}>
                  <a href="#">禁用</a>
                </Popconfirm>
            :
                <Popconfirm title="确定启用?" onConfirm={() => this.props.forbidden(record.id)}>
                  <a href="#">启用</a>
                </Popconfirm>
            }
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
               <a href="#">删除</a>
            </Popconfirm>
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
    this.props.fetchIndustry();
    this.props.fetchList();
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    const { deleteStatus, listStatus, fetchList, list, err, industryList } = nextProps;
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
        key: 'modelName',
        value: {
          value: queryParams.modelName ? queryParams.modelName.value : null
        }
      },{
        key: 'timeRange',
        value: {
          value: queryParams.timeRange && queryParams.timeRange.value
            ? queryParams.timeRange.value.length > 0
              ? [
                this.getMomentFormat(queryParams.timeRange.value[0]),
                this.getMomentFormat(queryParams.timeRange.value[1]),
              ].filter((v) => !!v)
              : null
            : null,
        }
      },{
        key: 'industryId',
        value: {
          value: queryParams.industryId ? queryParams.industryId.value : null
        }
      }
      ,{
        key: 'enabledState',
        value: {
          value: queryParams.enabledState ? queryParams.enabledState.value : null
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
    return '/hpx2/core/model/' + encodeURI(JSON.stringify(v || {}));
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { list, fetchList, listStatus, fetchIndustry, industryList  } = this.props;
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
          industryList={industryList}
          search={this.search.bind(this)}
          onChange={this.props.updateQueryParams.bind(this)}
          clear={this.props.clearQueryParams}
          loading={listStatus.loading}
          xxMenu={this.props.xxMenu}
        />
        <Link 
          to={`${this.getUrlQueryParams()}/add`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">新增</Button>
        </Link>
      </div>
      <Table
        rowKey="id"
        /*rowSelection={rowSelection}*/
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
