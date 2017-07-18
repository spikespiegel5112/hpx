import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'

import { postReq } from '../../../../../core/fetch'

import './Pay.css'

import { 
  Form, 
  Input, 
  Tooltip, 
  Icon, 
  Cascader, 
  Select, 
  Row, 
  Col, 
  Checkbox, 
  Button, 
  InputNumber, 
  DatePicker, 
  Upload, 
  message, 
  Modal 
} from 'antd';

import { precisionValidator } from '../../../../../core/antdFormUtil.js'

import { checkPhone } from '../../../../../core/util.js'

const FormItem = Form.Item;
const Option = Select.Option;
const tips = '如未设置密码，无须填写';


class PayForm extends React.Component {
  state = {
    smsButtonDisabled: false,//发送验证码按钮是否可编辑
    smsButtonMsg: '获取验证码',
    previewVisible: false,//图片预览是否可见
    previewImage: '',//预览图片地址
    intervalId: null,
  };
  componentWillUnmount(){
    clearInterval(this.state.intervalId)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //在提交前格式化部分数据
        
        self.props.saveSubmit(values,self.props.id);
      }
    });
  }
  checkPhoneConfirm = (phoneKey, rule, value, callback) => {
    const form = this.props.form;
    if (!checkPhone(form.getFieldValue(phoneKey))) {
      callback('手机号格式不正确!');
    } else {
      callback();
    }
  }

 
  normFile = (info) => {
    //如果希望组件能提供查看功能，则需要设置url字段的值
    return info.fileList;
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  render() {
    const { previewVisible, previewImage } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector mobileBefore">
        <Option value="86">+86</Option>
      </Select>
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        {[
        <FormItem
          key="payee"
          {...formItemLayout}
        >
          {getFieldDecorator('payee',{
          })(
            <Input type='hidden'/>
          )}
        </FormItem>
      ,
       <FormItem
          key="payer"
          {...formItemLayout}
        >
          {getFieldDecorator('payer',{
          })(
            <Input type='hidden'/>
          )}
        </FormItem>
         ,
       <FormItem
          key="paymentId"
          {...formItemLayout}
        >
          {getFieldDecorator('paymentId',{
          })(
            <Input type='hidden'/>
          )}
        </FormItem>
      ,
        <FormItem
          key="payeeAccountName"
          {...formItemLayout}
          label="付款方名称"
          hasFeedback
        >
          {getFieldDecorator('payeeAccountName',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input readOnly/>
          )}
        </FormItem>
         ,
        <FormItem
          key="payeeBank"
          {...formItemLayout}
          label="付款方开户行"
          hasFeedback
        >
          {getFieldDecorator('payeeBank',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
            ],
          })(
            <Input readOnly/>
          )}
        </FormItem> 
        ,
        <FormItem
          key="payeeBankAccount"
          {...formItemLayout}
          label="付款方账号"
          hasFeedback
        >
          {getFieldDecorator('payeeBankAccount',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
            ],
          })(
            <Input readOnly/>
          )}
        </FormItem>
         ,
        <FormItem
          key="payerAccountName"
          {...formItemLayout}
          label="收款方名称"
          hasFeedback
        >
          {getFieldDecorator('payerAccountName',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
            ],
          })(
            <Input readOnly/>
          )}
        </FormItem>
         ,
        <FormItem
          key="payerBank"
          {...formItemLayout}
          label="收款方开户行"
          hasFeedback
        >
          {getFieldDecorator('payerBank',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
            ],
          })(
            <Input readOnly/>
          )}
        </FormItem>
         ,
        <FormItem
          key="payerBankAccount"
          {...formItemLayout}
          label="收款方账号"
          hasFeedback
        >
          {getFieldDecorator('payerBankAccount',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
            ],
          })(
            <Input readOnly/>
          )}
        </FormItem>
         ,
        <FormItem
          key="paymentAmount"
          {...formItemLayout}
          label="付款金额"
          hasFeedback
        >
          {getFieldDecorator('paymentAmount',{
          })(
            <InputNumber readOnly/>
          )}
        </FormItem>
        ,
        /*<FormItem
          key="paymentDate"
          {...formItemLayout}
          label="付款日期"
          hasFeedback
        >
          {getFieldDecorator('paymentDate',{}
          )(
            <DatePicker format="YYYY-MM-DD HH:mm:ss"  readOnly /> 
          )}
        </FormItem>*/
        <FormItem
          key="payPwd"
          {...formItemLayout}
          label="付款密码"
          hasFeedback 
          help = {tips}
          >
          {getFieldDecorator('payPwd',{
           /* rules: [{ required: false, message: '请输入密码未设置密码请为空!' }]*/
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

       /*<FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>*/


      ]}
        <FormItem {...tailFormItemLayout}>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            loading={this.props.saveStatus.loading}>
            确定支付
          </Button>
        </FormItem>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Form>
    );
  }
}

const WrappedPayForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);//调用父组件的更新方法
  },
  mapPropsToFields(props) {

    console.log('mapPropsToFields:',props);

    var arr = [{
          key: 'payee',
          value: {
            ...props.payee
          }
        },{
          key: 'payeeAccountName',
          value: {
            ...props.payeeAccountName
          }
        },{
          key: 'payeeBank',
          value: {
            ...props.payeeBank
          }
        },{
          key: 'payeeBankAccount',
          value: {
            ...props.payeeBankAccount
          }
        },{
          key: 'payer',
          value: {
            ...props.payer
          }
        },{
          key: 'payerAccountName',
          value: {
            ...props.payerAccountName
          }
        },{
          key: 'payerBank',
          value: {
            ...props.payerBank
          }
        },{
          key: 'payerBankAccount',
          value: {
            ...props.payerBankAccount
          }
        },{
          key: 'paymentAmount',
          value: {
            ...props.paymentAmount
          }
        },{
          key: 'paymentDate',
          value: {
            ...props.paymentDate,
            value: props.paymentDate && props.paymentDate.value ? moment(props.paymentDate.value) : null,
          }
        },{
          key: 'paymentId',
          value: {
            ...props.paymentId
          }
        },{
          key: 'payPwd',
          value: {
            ...props.payPwd
          }
        }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(PayForm);

class Pay extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    //this.props.fetchDetail(this.props.params.id);
    //调用module方法加载数据
    this.props.fetchPayInfo(this.props.params.id);
  }
  componentDidMount(){
    
  }
  componentWillReceiveProps(nextProps){
    const { saveStatus, fetchDetailStatus, err } = nextProps;
    if(
      this.props.saveStatus.type != saveStatus.type 
      && saveStatus.type.match('SUCCESS')
    ){//保存成功，返回上一页，这里没对上一页为空的情况做处理
      message.success('保存成功');
      browserHistory.go(-1);
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }
  render() {
    console.log(22,this.props.fields)
    return  <div><WrappedPayForm 
                  {...this.props.fields}  
                  saveStatus={this.props.saveStatus}
                  fetchDetailStatus={this.props.fetchDetailStatus}
                  onChange={this.props.updatePayFields}
                  saveSubmit={this.props.savePay}/>
            </div>
  }
}

Pay.propTypes = {
  // increment   : React.PropTypes.func.isRequired
}

export default withRouter(Pay)
