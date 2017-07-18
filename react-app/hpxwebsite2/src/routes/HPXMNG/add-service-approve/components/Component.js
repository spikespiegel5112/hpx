import React from 'react'
import { Link, withRouter } from 'react-router'
import { Row, Col, Button, Table, Icon, Popconfirm, message , Modal , Tree } from 'antd'
import FreeScrollBar from 'react-free-scrollbar'
import SearchForm from '../../../../components/SearchForm/SearchForm'

import { getReq , deleteReq , patchReq } from '../../../../core/fetch'

const ButtonGroup = Button.Group;
const TreeNode = Tree.TreeNode;

const dateFormat = 'YYYY/MM/DD';


class Compo extends React.Component {
  constructor(props) {
    super(props);
    
    // API
    this.fetchListUrl = `/core` + `/core/api/v1/vEnterpriseServiceApplication`;

    this.searchConfig = [
      {
        key : 'enterpriseName',
        type : 'text',
        label : '企业名称' ,
      },
      {
        key : 'approval',
        type : 'select',
        label : '审批状态' ,
        data :[
          {
            key : 'P',
            value : '已通过'
          },
          {
            key : 'R',
            value : '已拒绝'
          },
          {
            key : '0',
            value : '审批中'
          }
        ]
      },
    ];
    
    this.columns = [{
        key: 'enterpriseId',
        title: '企业编号',
        dataIndex: 'enterpriseId',
      },{
        key: 'enterpriseName',
        title: '企业名称',
        dataIndex: 'enterpriseName',
      },{
        key: 'code',
        title: '服务类型',
        dataIndex: 'code',
        render: (text, record) => (
          <span>{this.serviceType(text,'code')}</span>
        )
      },{
        key: 'approval',
        title: '审批状态',
        dataIndex: 'approval',
        render: (text, record) => (
          <span>{this.serviceType(text,'approval')}</span>
        )
      },{
        title: '操作',
        key: 'action',
        render: (text, record,index) => (
          <span>
              <a href='javascript:void(0)' onClick={()=>this.load(record.fileId)}>下载授权书</a>            
              {
                record.approval === '0' ?     
                  <span>
                    <span className="ant-divider" />
                    <Popconfirm title="确定通过?" onConfirm={() => this.del('P',record.id,index)}>
                      <a href="#">通过</a>
                    </Popconfirm>
                    <span className="ant-divider" />
                    <Popconfirm title="确定拒绝?" onConfirm={() => this.del('R',record.id,index)}>
                      <a href="#">拒绝</a>
                    </Popconfirm>
                  </span>
                :
                null
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
      
    };

  }

  /*
  ** 获取含path API
  ** @params id path
  */
  loadUrl = (id) => `/core` + `/core/api/v1/download/attachfiles/${id}`;
  delUrl = (id) => `/core` + `/core/api/v1/serviceApplication/${id}/approval`;


  fetchList = (pagination = this.state.pagination , queryParams = this.state.queryParams)=>{
    (async ()=>{
      this.setState({
        list : {
          ...this.state.list,
          listState : true,
        }
      })

      const postPagination = {
        page : pagination.current,
        size : pagination.pageSize,
      }
      const params = Object.assign(postPagination,queryParams);

      try{
        const resp = await getReq(
              // '/proxy'+'/trade/testOb/list',
              this.fetchListUrl,
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
        this.setState({
          list : {
            ...this.state.list,
            listState : false,
          }
        })
      }
    })()
  }

  search = (queryParams)=>{
    this.setState({
      queryParams 
    })
    this.fetchList(this.state.pagination,queryParams);
  }

  serviceType =(code,type) =>{
    let view = null;
    if(type === 'code'){
      switch (code){
        case '24' :
        view = '签章服务'
        break;
        case '25' :
        view = '线上开户'
        break;
        default :
        view = '未定义类型'
      }
    }else if(type === 'approval'){
      switch (code){
        case '0' :
        view = '审批中'
        break;
        case 'P' :
        view = '已审批'
        break;
        case 'R' :
        view = '已拒绝'
        break;
        default:
        view = 'WTF'
      }
    }

    return view;
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

  delete= (type,id)=>{
    (async ()=>{
      try{
        const resp = await deleteReq(`url${id}`);
        if(resp.ok){
          const msg = resp.headers.get('x-hpx-alert')
          message(msg);
          // 删除成功 重新拉取列表
          this.fetchList();
        }
      }catch(e){
        message.error(e);
      }
    })()
  }

  del = (type,id,index)=>{   
    (async ()=>{
      const url = this.delUrl(id);
      try{
        const resp = await patchReq(
          url,
          {
            approval : type
          }
        );
        if(resp.ok){
          const msg = decodeURI(resp.headers.get('x-hpx-alert'));
          message.success(msg);
          const data = this.state.list.rows;
          data[index].approval = type;
          this.setState({
            list : {
              ...this.state.listState,
              rows : data,
            }
          })
        }
      }catch(e){
        message.error(e);
      }
    })()
  }

  load = (id) => {
      try{
        window.location.href = this.loadUrl(id)
      }catch(e){
        message.error(e);
        return;
      }
  }

  setAuth = (text,record)=>{
    this.setState({visible:true})
  }

  handleCancel = ()=>{
    this.setState({visible:false});
  }

  componentDidMount() {
    this.fetchList()
  }
  

  render() {
    const { list , pagination ,visible } = this.state

    let view = (
      <div>

        <section>

          <SearchForm
            options={this.searchConfig}
            submit={this.search}
            loading={list.listState}
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
