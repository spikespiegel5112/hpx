import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {
  Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber, Popconfirm,
  DatePicker, Upload, message, Modal, Card
} from 'antd'
import { getMoment, precisionFormat } from '../../../../../core/util'
import './Detail.css';

import { precisionValidator } from '../../../../../core/antdFormUtil.js'

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }
   

  //页面加载
  componentWillMount() {
    this.props.fetchDetail(this.props.params.id);
  }

  render() {
    const {detailList, fetchDetailStatus} = this.props;
    console.log(123,detailList);
    let view = !detailList.rows ? null : <div>
      <div className='div'>
        <Card title="基本信息" bordered={false}>
          <span style={{float:'left'}}>
          <p className='span'>企业名称：{detailList.rows.name}</p>
          <p className='span'>英文名称：{detailList.rows.enName}</p>
          <p className='span'>行业：{detailList.rows.industry}</p>
          <p className='span'>法定代表人：{detailList.rows.legalPerson}</p>
          <p className='span'>法定代表证件号码：{detailList.rows.legalCardNo}</p>
          <p className='span'>实际控制人：{detailList.rows.actualController}</p>
          <p className='span'>经营范围：{detailList.rows.scopeOfBusiness}</p>
          <p className='span'>经营期限：{detailList.rows.operationTerm}</p>
          <p className='span'>注册资金：{detailList.rows.regCapital}</p>
          <p className='span'>企业性质：{detailList.rows.enterpriseType}</p>
          <p className='span'>组织机构代码：{detailList.rows.codeOrg}</p>
          <br/>
          </span>
          <span style={{float:'right',position: 'relative',right:'20%'}}>
          <p className='span'>营业执照号：{detailList.rows.licenceNo}</p>
          <p className='span'>税务登记证号：{detailList.rows.taxNumber}</p>
          <p className='span'>是否三证合一：{detailList.rows.iscode31 == '' ? '' :
             detailList.rows.iscode31 == 'T' ? '是' : '否'}</p>
          <p className='span'>三证合一代码：{detailList.rows.code31}</p>
          <p className='span'>工商注册日期：{detailList.rows.regDate}</p>
          <p className='span'>登记机关：{detailList.rows.regOffice}</p>
          <p className='span'>纳税类型：{detailList.rows.taxType}</p>
          <p className='span'>注册资金币种：{detailList.rows.regCurrency}</p>
          <p className='span'>员工人数：{detailList.rows.personNum}</p>
          <p className='span'>工商年检时间：{detailList.rows.inspectionTime}</p>
          <p className='span'>按时年检：{detailList.rows.normalInspection}</p>
          <br/>
          </span>
        </Card>
      </div>
      <div className='div'>
        <Card title="联系方式" bordered={false}>
          <span style={{float:'left'}}>
          <p className='span'>区域：{detailList.rows.area}</p>
          <p className='span'>详细地址：{detailList.rows.address}</p>
          <p className='span'>城市名称：{detailList.rows.city}</p>
          <p className='span'>联系人：{detailList.rows.contacts}</p>
          <p className='span'>联系人职务：{detailList.rows.contactsPost}</p>
          <br/>
          </span>
          <span style={{float:'right',position: 'relative',right:'22%'}}>
          <p className='span'>联系人电话：{detailList.rows.contactsNumber}</p>
          <p className='span'>联系人手机：{detailList.rows.contactsPhone}</p>
          <p className='span'>联系人邮箱：{detailList.rows.contactsEmail}</p>
          <p className='span'>传真：{detailList.rows.fax}</p>
          <p className='span'>邮编：{detailList.rows.zipCode}</p>
          <br/>
          </span>
        </Card>
      </div>
      <div className='div'>
        <Card title="系统信息" bordered={false}>
          <span style={{float:'left'}}>
          <p className='span'>注册邀请码：{detailList.rows.registerCode}</p>
          <p className='span'>电子签名账户编号：{detailList.rows.esignAccountId}</p>
          <p className='span'>记录时间：{detailList.rows.createTime}</p>
          <p className='span'>更新人：{detailList.rows.modifiedBy}</p>
          <p className='span'>最后更新时间：{detailList.rows.modifiedTime}</p>
          <br/>
          </span>
          <span style={{float:'right',position: 'relative',right:'30%'}}>
          <p className='span'>逻辑删除：{detailList.rows.deleted == '' ? '' : 
            detailList.rows.deleted == 'T' ? '标记删除' : '未删除' }</p>
          <p className='span'>是否启用：{detailList.rows.enterpriseStatus == '' ? '' :
            detailList.rows.enterpriseStatus == 'T' ? '启用' : '禁用' }</p>
          <p className='span'>激活状态：{detailList.rows.activated == '' ? '' :
            detailList.rows.activated == 'T' ? '已注册' : '未注册' }</p>
          <p className='span'>企业认证状态：{detailList.rows.auditState == '' ? '' :
             detailList.rows.auditState == 'F' ? '未认证' :  
             detailList.rows.auditState == 'A' ? '申请认证' :
             detailList.rows.auditState == 'T' ? '已认证' : '申请拒绝'}</p>
          <br/>
          </span>
        </Card>
      </div>
    </div>;
    return view;
  }
}

export default withRouter(Detail)
