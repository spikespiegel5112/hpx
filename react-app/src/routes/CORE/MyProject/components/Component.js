import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Modal,Button,Select,Table,Tabs , Icon, Popconfirm, message, Card } from 'antd'
import './Component.css';

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class TitleCard1 extends React.Component{
  render(){
    return (
      <span className='project-title'>我的项目</span>
    )
  }
}

class TitleCard2 extends React.Component{
  render(){
    return (
      <span className='project-title'>受邀项目</span>
    )
  }
}

class Compo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
      visible: false,
      visibletwo: false,
      enterpriseProject:{  //企业项目对象
        enterpriseRole:null,
      }, 
      ownerEnterpriseId:null, //企业名称id
      type:null, //角色类型
      pid:null, //项目id
      newKey:new Date(),
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
        title: '',
        key: 'action',
        render: (text, record) => (
            <span>
              <Link to={`/hpx2/huaqian/demanderPro?projectId=${record.projectId}`} 
                style={{ marginRight: '16px' }}>
                <Button type="primary" size='small' style={{marginRight:15}}>进入项目</Button>
              </Link>

              <Button type="primary" size='small' style={{marginRight:15}} onClick={()=>this.showModal(record)}>邀请</Button>
              <Button type="primary" size='small' style={{marginRight:15}} onClick={()=>this.showModalTwo(record)}>邀请记录</Button>   
            </span>
        ),
      }];

    this.columnstwo = [{
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
        title: '',
        key: 'action',
        render: (text, record) => (
            <span>
              <Link 
                to={`/hpx2/huaqian/demanderPro?projectId=${record.projectId}`} 
                style={{ marginRight: '16px' }}
              >
                <Button type="primary" size='small' style={{marginRight:15}}>进入项目</Button>
              </Link>     
              <Button type="primary" size='small' style={{marginRight:15}} onClick={()=>this.accept(record)}>接受</Button>
              <Button type="primary" size='small' style={{marginRight:15}} onClick={()=>this.refuse(record)}>拒绝</Button>    
            </span>
        ),
      }];

    this.columnsthere = [{
        key: 'enterpriseName',
        title: '受邀企业',
        dataIndex: 'enterpriseName',
      }, {
        key: 'inviteStatus',
        title: '邀请状态',
        dataIndex: 'inviteStatus',
        render: (text) => <span>{text == null ? '' : text == 'T' ? '接受' : text == 'F' ? '拒绝' : '邀请中'}</span>
      }, {
        key: 'createTime',
        title: '邀请时间',
        dataIndex: 'createTime',
        render: (text) => <span>{text == null ? '' : moment(text).format('YYYY-MM-DD')}</span>
      }];
    }
    
  //页面加载
  componentWillMount() {
    this.props.fetchList();
    this.props.fetchListTwo();
  }

  //接受
  accept = (record)=>{
    console.log('接受',record.pjId);
    const inviteStatus = 'T';
    this.props.accept(record.pjId,inviteStatus);
  }

  //拒绝
  refuse = (record)=>{
    console.log('拒绝',record.pjId);
    const inviteStatus = 'F';
    this.props.accept(record.pjId,inviteStatus);
  }

  componentWillReceiveProps(nextProps) {
        const { err,acceptStatus,fetchListTwo } = nextProps;        
        if (
            this.props.acceptStatus.type != acceptStatus.type
            && acceptStatus.type.match('SUCCESS')
        ) {//删除成功重新拉取列表数据
             fetchListTwo();
        }
        if (err) {//拉取列表失败，提示错误信息
            message.error(err);
            this.props.clearErr();
        }
    }

  //邀请弹窗
  showModal = (record) => {
    this.state.pid = record.pjId;
    //查询角色类型
    console.log('record',record.priductCode);
    this.props.fetchEnterprise(record.priductCode);

    //查询企业信息
    this.props.fetchFirm();
    this.setState({
      visible: true,
    });
  }

  //邀请记录弹窗
  showModalTwo = (record) => {
    console.log('recordTwo',record.pjId);
    //邀请记录
    this.props.fetchRecord(record.pjId);
    this.setState({
      visibletwo: true,
    });
  }

  //企业名称选中改变
   ownerEnterpriseId = (value) =>{
      this.state.ownerEnterpriseId =value;
      console.log('ownerEnterpriseId',this.state.ownerEnterpriseId);
        this.setState({
            ownerEnterpriseId : value
        })
    }
  //角色类型选中改变
   type = (value) => {
        this.state.type = value;
        this.state.enterpriseProject.enterpriseRole = value;
        console.log('enterpriseRole',this.state.enterpriseProject.enterpriseRole);
        this.setState({
            type : value
        })
    }

 //确认按钮事件
  handleOk = () => {
    //新增企业项目信息
    this.props.save(this.state.enterpriseProject,this.state.ownerEnterpriseId,this.state.pid);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  }
  //邀请弹出框取消
  handleCancel = () => {
    console.log('取消');
    this.setState({
      visible: false,
    });
  }


//邀请记录弹出框确认
handleOkTwo = () => {
      this.setState({
        visibletwo: false,
        newKey: new Date(),
      });
  }
//邀请记录弹出框取消
  handleCancelTwo = () => {
    console.log('取消');
    this.setState({
      visibletwo: false,
    });
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

  handleTableChangeTwo(pagination, filters, sorter) {
    browserHistory.push(`${this.getUrlQueryParams(
      {
        ...this.props.listTwo.queryParams,
        pagination,
      }
    )}`);
  }
  getMomentFormat(v) {
    if (!v) return null;
    return moment(v).format('YYYY-MM-DD');
  }

  render() {
    const { visible,visibletwo, newKey,confirmLoading ,ModalText,dataSource} = this.state;
    const { list, listStatus, fetchList,fetchListTwo,listTwo,listTwoStatus,firmList,enterpriseList,recordList} = this.props;
    console.log('list',list);
    console.log('firmList',firmList);
    console.log('enterpriseList',enterpriseList);
      let view = 
        <div>
          <Modal title="选择企业及角色"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}>
                <span>企业名称：</span>
                  <Select 
                    showSearch
                    placeholder="请选择" 
                    onChange={this.ownerEnterpriseId}
                    optionFilterProp="children"
                    style={{ width: "30%"}}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {firmList.map(temp => <Option key={temp.id}>{temp.name}</Option>)}
                  </Select>
                &nbsp;&nbsp;&nbsp;&nbsp;<span>角色类型：</span>
                    <Select 
                        showSearch
                        placeholder="请选择" 
                        onChange={this.type}
                        optionFilterProp="children"
                        style={{ width: "30%"}}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {enterpriseList.map(temp => <Option key={temp.code}>{temp.name}</Option>)}
                      </Select>
            </Modal>
        

        <Modal title="邀请记录"
                key={newKey}
                visible={visibletwo}
                onOk={this.handleOkTwo}
                onCancel={this.handleCancelTwo}>
                <Table 
                  columns={this.columnsthere} 
                  dataSource={recordList.rows}
                  pagination={false}/>
        </Modal>
       <Tabs defaultActiveKey="1">
        <TabPane tab={<TitleCard1 />} key="1">
            <Table
              rowKey="pjId"
              columns={this.columns}
              dataSource={list.rows}
              pagination={true}
              loading={listStatus.loading}
              onChange={this.handleTableChange.bind(this)}
            />
        </TabPane>
        <TabPane tab={<TitleCard2 />} key="2">
            <Table
                    rowKey="pjId"
                    columns={this.columnstwo}
                    dataSource={listTwo.rows}
                    pagination={true}
                    loading={listTwoStatus.loading}
                    onChange={this.handleTableChangeTwo.bind(this)}
                  />
        </TabPane>
      </Tabs> 
      </div>      
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
