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
            key: 'productName',
            title: '产品',
            dataIndex: 'productName',
            width: 160,
            className: 'column-product',
            render: text => text && typeof(text) == 'string' ? <span className="ball">{ text.substring(0,1)}</span> : text,
        },{
            key: 'projectName',
            title: '项目名称',
            dataIndex: 'projectName',
        },{
            key: 'entPjRole',
            title: '参与角色',
            dataIndex: 'entPjRole',
        },{
            key: 'startTime',
            title: '项目起始日',
            dataIndex: 'startTime',
            render: (text) => <span>{text == null ? '' : moment(text).format('YYYY-MM-DD')}</span>
        },{
            key: 'endTime',
            title: '项目结束日',
            dataIndex: 'endTime',
            render: (text) => <span>{text == null ? '' : moment(text).format('YYYY-MM-DD')}</span>
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
            <span>
            <Button type="primary" size='small' style={{marginRight:15}} onClick={()=>this.accept(record)}>通过</Button>
            <Button type="primary" size='small' style={{marginRight:15}} onClick={()=>this.refuse(record)}>拒绝</Button>
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

    //接受
    accept = (record)=>{
        console.log('接受',record.pjId);
        const state = 'T';
        this.props.accept(record.enterpriseId,record.pjId,state);
    }

    //拒绝
    refuse = (record)=>{
        console.log('拒绝',record.pjId);
        const state = 'F';
        this.props.accept(record.enterpriseId,record.pjId,state);
    }


    componentWillReceiveProps(nextProps) {
        const { err,acceptStatus,fetchList } = nextProps;        
        if (
            this.props.acceptStatus.type != acceptStatus.type
            && acceptStatus.type.match('SUCCESS')
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
        let arr = [];
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
        return '/hpx2/hpxmng/projectsAudit/' + encodeURI(JSON.stringify(v || {}));
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
                to={`${this.getUrlQueryParams()}/add`}
                style={{ marginRight: '16px' }}
            >
              <Button type="primary">新增</Button>
            </Link>
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
