import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Progress, Popconfirm, message, Row, Col } from 'antd'
import { getMoment, precisionFormat } from '../../../../core/util'
import './Component.css';

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';

class Compo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.columns = [{
        title: '',
        dataIndex: 'title',
        key: 'title',
        width: '20%',
        className: 'item-title'
      }, {
        title: '',
        dataIndex: 'description',
        key: 'description',
        width: '50%',
        className: 'item-description'
      }, {
        title: '',
        key: 'action',
        width: '30%',
        className: 'item-action',
        render: (text, record, index) => (
          <span>
            
            {index == 0 
            ? 
            <span>
              <span style={{color:"green"}}>
                <Icon type="check-circle-o" /> &nbsp;&nbsp;已设置
              </span>
              <span className="ant-divider" />
              <Link to={`${this.getUrlQueryParams()}/fixedPwd`}>
                修改
              </Link>
            </span>
            : index == 1 
            ? 
            <span>
              <span style={{color:"green"}}>
                <Icon type="check-circle-o" /> &nbsp;&nbsp;已设置
              </span>
              <span className="ant-divider" />
              <Link to={`${this.getUrlQueryParams()}/fixedPhoneNum`}>
                修改
              </Link>
            </span>
            :
            <span>
              {this.props.list.email ?
                <span style={{color:"green"}}>
                  <Icon type="check-circle-o" /> &nbsp;&nbsp;已设置
                </span> : 
                <span  style={{color:"#F90"}}>
                  <Icon type="exclamation-circle-o"/> &nbsp;&nbsp;未设置
                </span>
              }
              
              <span className="ant-divider" />
              <Link to={`${this.getUrlQueryParams()}/bindMail`}>
                修改
              </Link>
            </span>
            }
          </span>
        ),
      }];
  }

  componentWillReceiveProps (nextProps) {
    const { saveNewNumStatus, saveNewPwdStatus, listStatus, saveMailStatus, fetchList, err } = nextProps;
    if(
      this.props.saveNewNumStatus.type != saveNewNumStatus.type 
      && saveNewNumStatus.type.match('SUCCESS')
    ) {
       fetchList();
    }
    if(
      this.props.saveNewPwdStatus.type != saveNewPwdStatus.type 
      && saveNewPwdStatus.type.match('SUCCESS')
    ) {
       fetchList();
    }
    if(
      this.props.listStatus.type != listStatus.type
      && listStatus.type.match('SUCCESS')
    ) {
      fetchList();
    }
  }

  componentWillMount() {
    this.props.fetchList();
  }

  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/hpx2/core/security-setting/' + encodeURI(JSON.stringify(v || {}));
  }

  render() {
    const { list } = this.props;
    var progress = null;
    if(list.phone && list.email) progress = '100%';
    if(list.phone || list.email) progress = '67%';
    if(list.email) {
      var e = list.email.split('@');
      if( e[0].length <= 3 ) {
        var email = list.email.replace(/(\w{1})\w+(@\w?)/, '$1****$2');
      } else {
        var email = list.email.replace(/(\w?)\w{4}(@\w?)/, '$1****$2');
      }
    }
    const phone = list.phone ? list.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : null;
    const emailMsg = list.email
                    ? `您已绑定了邮箱 ${email} [ 发送的各类系统、营销、服务通知将发送到您的备用邮箱。 ]` 
                    : `您还未绑定邮箱 请设置绑定 [ 发送的各类系统、营销、服务通知将发送到您的备用邮箱。 ]`

    const data = [
      {
        key: '1',
        title: '登录密码',
        description: '安全性高的密码可以使账号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。',
      }, {
        key: '2',
        title: '手机绑定',
        description: `您已绑定了手机 ${phone} [ 您的手机为安全手机，可以找回密码 ]`,
      }
      // ,{
      //   key: '3',
      //   title: '备用邮箱',
      //   description: emailMsg,
      // },
    ]

    let view = <div>
      <div className="title-out">
        <h5 className="title-text">安全设置</h5>
      </div>
      <hr/>
      <div className='security-level'>
        <Row>
          <Col span={5}><span style={{marginBottom: '20px'}}>您当前的账号安全程度</span></Col>
          <Col span={8}><div className="security-progress-out"><div className={progress < '30%' ? 'low' : progress < '67%' ? 'mid' : 'high' }></div></div></Col>
          <Col span={8}><span>安全级别</span><span>{progress < '30%' ? '低' : progress < '67%' ? '中' : '高'}</span>
          </Col>
        </Row>
      </div>
      <Table
        rowKey="save"
        columns={this.columns}
        dataSource={data}
        pagination={false}
        bordered={false}
        className="security-table"
      />
    </div>;
    if(this.props.children) {
      view = this.props.children;
    }
    return view;
  }
}

export default withRouter(Compo)
