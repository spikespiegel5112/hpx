import React from 'react'
import { Link, withRouter } from 'react-router'
import { Row, Col, Button, Table, Icon, Popconfirm, message , Modal , Tree } from 'antd'
import FreeScrollBar from 'react-free-scrollbar'
import SearchForm from '../../../../components/SearchForm/SearchForm'
import RoleModal from './RoleModal'
import { getReq , deleteReq , patchReq } from '../../../../core/fetch'

const ButtonGroup = Button.Group;
const TreeNode = Tree.TreeNode;

const dateFormat = 'YYYY/MM/DD';


class Compo extends React.Component {
  constructor(props) {
    super(props);

    this.searchConfig = [
      {
        key : 'name',
        type : 'text',
        label : '角色名称' ,
      },
      {
        key : 'status',
        type : 'select',
        label : '状态' ,
        data :[
          {
            key : 'F',
            value : '禁用'
          },
          {
            key : 'T',
            value : '启用'
          }
        ]
      },
      {
        key : 'filed1',
        label : '角色编号1' ,type : 'text',
      },
      {
        key : 'filed2',
        label : '角色编号' ,type : 'text',
      },
      {
        key : 'filed3',
        label : '角色编号' ,type : 'text',
      },
    ];
    
    this.columns = [{
        key: 'name',
        title: '角色名称',
        dataIndex: 'name',
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href='javascript:void(0);' onClick={this.setAuth}>
              分配权限
            </a>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.delete(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
            <span className="ant-divider" />
            {
              !this.state.status ?
              <span>
                <Popconfirm title="确定启用?" onConfirm={() => this.props.del(record.id,'F')}>
                  <a href="#">启用</a>
                </Popconfirm>
                <span className="ant-divider" />
                <Popconfirm title="确定禁用?" onConfirm={() => this.props.del(record.id,'T')}>
                  <a href="#">禁用</a>
                </Popconfirm>
              </span>
              :
              <span>{this.state.status}</span>
            }
          </span>
        ),
      }
    ];

    this.rowSelection = {
      type : 'radio',
    };

    this.state = {
      // 角色列表
      list : {
        listState : false,
        rows : [],
      },
      //分页
      pagination : {
        current : 1,
        pageSize : 10,
        total:0,
        showSizeChanger : true,
        onShowSizeChange : this.onShowSizeChange
      },
      // 搜索条件
      queryParams : {},

      status : null,
      // 分配权限modal显示
      visible : false,
      // 角色modal显示
      roleModalVisible : false,
    };

    // API
    this.fetchListUrl = '/proxy'+'/trade/testOb/list';

  }

  fetchList = (pagination = this.state.pagination , queryParams = this.state.queryParams)=>{
    (async ()=>{
      const postPagination = {
        page : pagination.current,
        size : pagination.pageSize,
      }
      const params = Object.assign(postPagination,queryParams);
      this.state.list.listState = true;
      try{
        const resp = await getReq(
              this.fetchListUrl,
              // `/core/core/api/v1/enterprise/10002/projects/detail`,
              params
              );
        const total = parseInt(resp.headers.get('x-total-count'));

        const res = await resp.json();

        this.setState({
          ...this.state,
          list : {
            listState : false,
            rows : res,
          },
          pagination : {
            ...this.state.pagination,
            total,
          }
        })
      }catch(e){

        message.error(e);
        this.state.list.listState = false
      }
    })()
  }

  search = (queryParams)=>{
    this.setState({
      queryParams 
    })
    console.log(this.state)
    this.fetchList(this.state.pagination,queryParams);
  }

  /* 分页、排序、筛选变化时触发
  ** @params antd onChange
  */
  handleTableChange(pagination, filters, sorter) {
    this.setState({
        pagination
      }
    );
    this.fetchList(pagination,this.state.queryParams)
  }

  onShowSizeChange = (current, pageSize)=>{

  }

  delete= (id)=>{
    (async ()=>{
      try{
        const resp = await deleteReq(`url${id}`);
        if(resp.ok){
          const msg = resp.headers.get('....')
          message(msg);
          // 删除成功 重新拉取列表
          this.fetchList();
        }
      }catch(e){
        message.error(e);
      }
    })()
  }

  del = (id,type)=>{   
    (async ()=>{
      try{
        const resp = await patchReq(`url/${id}/${type}`);
        if(resp.ok){
          const msg = resp.headers.get('....')
          message(msg);
          if(type === 'F'){
            this.setState({
              status : '已通过'
            })
          }else if(type === 'T'){
            this.setState({
              status : '未通过'
            })
          }
        }
      }catch(e){
        message.error(e);
      }
    })()
  }

  setAuth = (text,record)=>{
    this.setState({visible:true})
  }

  handleCancel = ()=>{
    this.setState({visible:false});
  }

  showRoleModal = ()=>{
    this.setState({
      roleModalVisible : true,
    })
  }

  componentWillMount() {
    this.fetchList()
  }
  

  render() {
    const { list , pagination ,visible } = this.state

    const modalView = <Modal
                        width={600}
                        visible={visible}
                        title="分配权限"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                          <Button key="back" onClick={this.handleCancel}>取消</Button>,
                          <Button key="submit" type="primary" onClick={this.handleOk}>提交</Button>,
                        ]}  
                      >
                         <Row style={{height:300}}>
                          <Col span={12}>
                            <p>角色信息</p>
                          </Col>
                          <Col span={12}>
                            <FreeScrollBar style={{height:300}} tracksize='6px' start={"top"}>
                            <Tree
                                showLine
                                defaultExpandedKeys={['0-0-0']}
                                checkable
                                showIcon={true}
                                onSelect={this.onSelect}
                              >
                                <TreeNode  title={<span><Icon type='home' />parent 1-0</span>} key="0-0">
                                  <TreeNode title="parent 1-0" key="0-0-0">
                                    <TreeNode title="leaf" key="0-0-0-0" />
                                    <TreeNode title="leaf" key="0-0-0-1" />
                                    <TreeNode title="leaf" key="0-0-0-2" />
                                  </TreeNode>
                                  <TreeNode title="parent 1-1" key="0-0-1">
                                    <TreeNode title="leaf" key="0-0-1-0" />
                                  </TreeNode>
                                  <TreeNode title="parent 1-2" key="0-0-2">
                                    <TreeNode title="leaf" key="0-0-2-0" />
                                    <TreeNode title="leaf" key="0-0-2-1" />
                                  </TreeNode>
                                </TreeNode>
                              </Tree>
                              </FreeScrollBar>
                            </Col>
                          </Row>
                      </Modal>

    let view = (
      <div>

        <RoleModal
          visible={ this.state.roleModalVisible }
         />
        <section style={{ marginBottom: 30}}>
          <SearchForm
            options={this.searchConfig}
            submit={this.search}
            loading={list.listState}
            add={true}
            addLink='/hpx2/hpxmng/auth/detail'
          />

        </section>

        <section className='table-section'>
          <Table
            rowKey="id"
            rowSelection={this.rowSelection}
            columns={this.columns}
            dataSource={list.rows}
            pagination={pagination}
            loading={list.listState}
            onChange={this.handleTableChange.bind(this)}
          />
          {modalView}
        </section>
      </div>
    );
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    const viewShow = this.props.children ? this.props.children : view;

    return viewShow;

  }
}

Compo.propTypes = {}

export default withRouter(Compo)
