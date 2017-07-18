import React from 'react'
import fetch from '../../../../core/fetch'
import { IndexLink, withRouter } from 'react-router'
import { Icon, message, Table, Modal, Input, Popconfirm } from 'antd'

const Search = Input.Search;
import './Component.css';
import Wall from './upload'

class Compo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visible: false,
      picSrc: null
    }
    this.columns = [{
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        className: 'signature-col'
      },{
        title: '公司名称',
        dataIndex: 'enterpriseName',
        key: 'enterpriseName',
        className: 'signature-col'
      },{
        title: '签章名字',
        dataIndex: 'name',
        key: 'name',
        className: 'signature-col'
      },{
        title: '签章图片',
        dataIndex: 'picData',
        key: 'picData',
        render: (text, record, index) => 
          <span>
              <img onClick={() => this.handleClick(text,index)} src={`data:image/png;base64,${text}`} style={{width: '100px'}}/>
          </span>
      },{
        title: '操作',
        key: 'action',
        className: 'signature-col',
        render: (text, record, index) => (
          <span>
            <a href="#" onClick={()=>{this.handleAbled(record.name, record.id, record.enabled)}}>{record.enabled === "T" ? "禁用" : "启用"}</a>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }];
  }

  handleClick = (text, index) => {
    this.setState({
      visible: true,
      picSrc: `data:image/png;base64,${text}`
    })
  }

  handleAbled = (name, id, status) => {
    const enabled = status === 'T' ? 'F' : 'T';
    this.props.abled(name, enabled, id);
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  componentWillMount() {
    this.props.fetchList();
  }
  
  componentWillReceiveProps(nextProps) {
    const { abledStatus, listStatus, fetchList, deleteStatus, err } = nextProps;
    if (
      this.props.deleteStatus.type != deleteStatus.type
      && deleteStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      message.success("删除成功！")
      fetchList();
    }
    if (
      this.props.abledStatus.type != abledStatus.type
      && abledStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      message.success("修改状态成功！")
      fetchList();
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }

  searchComp = (value) => {
    console.log("heheh", value);
    let values = Object.assign({}, {enterpriseName: value});
    this.props.fetchList(values)
  }
 
  // getUrlQueryParams(v) {
  //   try{
  //     v = v || JSON.parse(this.props.params.queryParams || '{}');
  //   }catch(e){
  //     console.log(e)
  //   }

  //   return '/hpx2/core/signature/' + encodeURI(JSON.stringify(v || {}));
  // }

  render() {
    const { list } = this.props;
    const dataSource = list.rows;
    dataSource.map((v, i) =>{
      Object.assign(v, {num: i+1})
    })
    let view = <div>
      <p>所有企业电子签章列表</p>
      <hr style={{marginBottom:'30px', marginTop:'10px'}}/>
      <Search placeholder="请输入公司名称" style={{width: '20%', marginBottom:'5px', marginLeft:'80%'}} onSearch={value => {this.searchComp(value)}}/>
      <Table 
        dataSource={dataSource}
        columns={this.columns}
        pagination={false}
        bordered={true}
      />
      <Wall/>
      <Modal 
        visible={this.state.visible}
        footer={null}
        onCancel={this.handleCancel}>
        <img alt="签章图片" src={this.state.picSrc} style={{width: '100%'}}/>
      </Modal>
    </div>;
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

Compo.propTypes = {
}

export default withRouter(Compo)
