import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Modal, Button, Table, Icon, Popconfirm, message, Radio } from 'antd'
import { getMoment, precisionFormat } from '../../../../core/util'
import './Component.css';

const RadioGroup = Radio.Group;
import moment from 'moment'
import Search from './Search';
const dateFormat = 'YYYY/MM/DD';

class Compo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],  // Check here to configure the default column
            visible: false,
            enterpriseId:'',
            pjId:''
        };
        this.columns = [{
            key: 'productCode',
            title: '产品编码',
            dataIndex: 'productCode',
        },{
            key: 'code',
            title: '项目编号',
            dataIndex: 'code',
        },{
            key: 'name',
            title: '项目名称',
            dataIndex: 'name',
        },{
            key: 'remark',
            title: '项目说明',
            dataIndex: 'remark',
        },{
            key: 'startTime',
            title: '项目开始时间',
            dataIndex: 'startTime',
            render: (text) => <span>{text == null ? '' : moment(text).format('YYYY-MM-DD')}</span>
        },{
            key: 'endTime',
            title: '项目终止时间',
            dataIndex: 'endTime',
            render: (text) => <span>{text == null ? '' : moment(text).format('YYYY-MM-DD')}</span>
        },{
            key: 'creator',
            title: '建立人',
            dataIndex: 'creator',
        },{
            key: 'state',
            title: '项目状态',
            dataIndex: 'state',
            render: (text, record) =>
                <span>{
                    [{"value":"B","name":"准备中"},{"value":"R","name":"进行中"},{"value":"E","name":"正常结束"},{"value":"P","name":"暂停"},{"value":"F","name":"异常结束"}]
                        .filter((v)=> v.value == text).map((v)=>v.name) || ''
                }</span>
        },{
            key: 'createTime',
            title: '记录时间',
            dataIndex: 'createTime',
            render: (text) => <span>{text == null ? '' : moment(text).format('YYYY-MM-DD')}</span>
        },{
            key: 'modifiedBy',
            title: '更新人',
            dataIndex: 'modifiedBy',
        },{
            key: 'modifiedTime',
            title: '最后更新',
            dataIndex: 'modifiedTime',
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
            <span>
            <Link to={`${this.getUrlQueryParams()}/update/${record.id}`}>
              修改
            </Link>
            <span className="ant-divider" />

            {/*{record.state == 'P'?
                    <Popconfirm title="确定启用?" onConfirm={() => this.props.forbidden(record.id)}>
                    <a href="#">启用</a>
                    </Popconfirm>
                :
                    <Popconfirm title="确定禁用?" onConfirm={() => this.props.forbidden(record.id)}>
                    <a href="#">禁用</a>
                    </Popconfirm>
                } */}

            <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
                <span className="ant-divider" />
                <a href="#" onClick={this.showModal.bind(this, record.id)}>审核</a>

          </span>
            ),
        }];
    }

    credit = () =>{
        this.setState({visible: true})
    }

    onChange = (e) => {
        console.log('点击', e.target.value);
        const value = e.target.value;
        this.setState({enterpriseId: value.enterpriseId, pjId: value.pjId});
    }

    showModal(id) {
        this.props.enterpriseCredit(id);
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        const {enterpriseId, pjId} = this.state;
        this.props.saveCredit(enterpriseId, pjId);
    }

    hideModals = () => {
        this.setState({
            visible: false,
        });
    }

    componentWillMount() {
        this.props.fetchList();
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        const { deleteStatus, listStatus, fetchList, list, saveCreditStatus, err } = nextProps;
        if (
            this.props.listStatus.type != listStatus.type
            && listStatus.type.match('SUCCESS')
            && list.rows.length == 0 && list.queryParams.pagination.total > 0
        ) {//删除成功重新拉取列表数据
            fetchList();
        }
        if (
            this.props.saveCreditStatus.type != saveCreditStatus.type
            && listStatus.type.match('SUCCESS')
        ) {//删除成功重新拉取列表数据
            this.setState({visible:false})
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
        return '/hpx2/hpxmng/item/' + encodeURI(JSON.stringify(v || {}));
    }
    render() {

        const { selectedRowKeys,visible } = this.state;
        const { list, fetchList, listStatus } = this.props;
        const data = this.props.enterpriseCreditList
        console.log('公司列表',data);
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
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const hasSelected = selectedRowKeys.length > 0;

        let companyList = data.map(v => <Radio style={radioStyle} value={v}>{ v.enterpriseName }</Radio> )
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
              rowSelection={rowSelection}
              columns={this.columns}
              dataSource={list.rows}
              pagination={list.queryParams.pagination}
              loading={listStatus.loading}
              onChange={this.handleTableChange.bind(this)}
          />
            <Modal
                title="审核"
                visible= {visible}
                width="50%"
                okText="确认"
                cancelText="取消"
                onOk={this.handleOk}
                onCancel={this.hideModals}
            >
                <RadioGroup onChange={this.onChange}>
                    {companyList}
                </RadioGroup>
            </Modal>
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
