import React from 'react'
import { Link, withRouter } from 'react-router'
import { Row, Col, Button, Table, Icon, Popconfirm, message } from 'antd'

import SearchForm from '../../../../components/SearchForm/SearchForm'
import ReviewedModal from './reviewed-modal'
 
import { getReq , deleteReq , patchReq } from '../../../../core/fetch'

const dateFormat = 'YYYY/MM/DD';

class Compo extends React.Component {
  constructor(props) {
    super(props);

    this.searchConfig = [
      {
        key : 'name',
        type : 'text',
        label : '企业名称' ,
      },
      {
        key : 'activated',
        type : 'select',
        label : '激活状态' ,
        data : [
          {
            key : 'F',
            value : '未注册'
          },{
            key : 'T',
            value : '已注册'
          }
        ]
      },

    ];
    
    this.columns = [{
        key: 'id',
        title: '企业编号',
        dataIndex: 'id',
      },{
        key: 'name',
        title: '企业名称',
        dataIndex: 'name',
      },{
        key: 'address',
        title: '地址',
        dataIndex: 'address',
      },{
        key: 'contacts',
        title: '联系人',
        dataIndex: 'contacts',
      },{
        key: 'contactsPhone',
        title: '手机号',
        dataIndex: 'contactsPhone',
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`hpx2/hpxmng/test2/detail/${record.id}`}>
              查看
            </Link>
            <span className="ant-divider" />
            <Popconfirm title="确定审核通过该企业?" onConfirm={()=>this.showReviewed('T',record.id)}>
              <a href="#">通过</a>
            </Popconfirm>
            <span className="ant-divider" />
            <Popconfirm title="确定审核拒绝该企业?" onConfirm={() =>this.showReviewed('F',record.id)}>
              <a href="#">拒绝</a>
            </Popconfirm>
          </span>
        ),
      }
    ];

    this.rowSelection = {
      type : 'checkbox',
    };

    this.state = {
      list : {
        listState : false,
        rows : [],
      },
      pagination : {
        current : 1,
        pageSize : 10,
        total:0,
        showSizeChanger : true,
      },
      queryParams : {},
      status : null,
      reviewedModal : {
        visible : false,
        type : 'F',
        id : null,
      }
    };

  }

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
      const params = Object.assign(postPagination,queryParams,{auditState:'B'});

      try{
        const resp = await getReq(
              `/core/core/api/v1/enterprises`,
              params
              );
        const total = parseInt(resp.headers.get('x-total-count'));
        const res = await resp.json();
        console.log(res)
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

  /* 分页、排序、筛选变化时触发
  ** @params antd onChange
  */
  handleTableChange(pagination, filters, sorter) {
    this.setState({
        ...this.state,
        pagination
      });
    this.fetchList(pagination,this.state.queryParams)
  }

  // 审核操作 modal
  showReviewed = (type,id)=>{
    this.setState({
      reviewedModal : {
        visible : true,
        type,
        id,
      }
    })
  }

  hideReviewed = () =>{
    this.setState({
      reviewedModal : {
        ...this.state.reviewedModal,
        visible : false,
      }
    })
  }

  delete= (id)=>{
    (async ()=>{
      try{
        const resp = await deleteReq(`url${id}`);
        if(resp.ok){
          const msg = resp.headers.get('....')
          message.success(msg);
          // 删除成功 重新拉取列表
          this.fetchList();
        }
      }catch(e){
        message.error(e);
      }
    })()
  }

  del = (values)=>{
    console.log(values,this)
    const url = `/core/core/api/v1/enterprises/enterprise/${this.state.reviewedModal.id}/auditState/${this.state.reviewedModal.type}?nodes=${values.nodes}`;
    (async ()=>{
      try{
        const resp = await patchReq( 
          url,
        );
        if(resp.ok){
          const msg = decodeURI(resp.headers.get('x-hpx-alert'));
          message.success(msg);
          this.setState({
            reviewedModal : {
              ...this.state.reviewedModal,
              visible : false
            }
          })
          this.fetchList()
        }
      }catch(e){
        message.error(e);
      }
    })()
  }

  componentWillMount() {
    this.fetchList()
  }

  render() {
    const { list , pagination } = this.state

    let view = (
      <div>
        <div>
          <SearchForm
            options={this.searchConfig}
            submit={this.search}
            loading={list.listState}
          />
        </div>
        
        <div className='table-section'>
          <Table
            rowKey="id"
            rowSelection={this.rowSelection}
            columns={this.columns}
            dataSource={list.rows}
            pagination={pagination}
            loading={list.listState}
            onChange={this.handleTableChange.bind(this)}
          />
        </div>

        <ReviewedModal
          visible={this.state.reviewedModal.visible}
          onCancel={this.hideReviewed}
          onOk={this.del}
         />

      </div>
    );
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    const viewShow = this.props.children ? this.props.children : view;

    return viewShow;

  }
}

Compo.propTypes = {}

export default withRouter(Compo)
