import React from 'react';
import { Link, withRouter } from 'react-router';
import { Button, Input, message, Form, Icon, Card, Row, Col, Steps, } from 'antd';
import fetch, { postReq } from '../../../../../core/fetch';
const FormItem = Form.Item;
const Step = Steps.Step;

import './FixedPhoneNum.css';

class FixedPwdF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smsButton: {
          disabled: false,
          msg: '发送验证码',
      },
      code:'',
    }
  }

  handleSubmitF = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const oldPhone = this.props.orPhone;
      const code = values.code;
      values = Object.assign({code: code}, {oldPhone: oldPhone});
      if(!err) {
        console.log("Received values of form:", values);
        this.props.subOldNumCode(values);
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    const { subOldNumCodeStatus, err } = nextProps;
    if(
      this.props.subOldNumCodeStatus.type != subOldNumCodeStatus.type 
      && subOldNumCodeStatus.type.match('SUCCESS')
    ) {
       message.success("验证成功！")
       this.props.handleSubmitF();
    }
    if(err) {
      message.error("验证码错误！");
    }
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码不一致！");
    } else {
      callback();
    }
  }

  async sendSms() {
    const self = this;
    const orPhone = this.props.orPhone;
    try{
      let response =
          await postReq(
              '/core' + '/core/api/v1/sms/checkOldPhoneSendSms?phone=' + orPhone,
          );
      if (response.ok) {
        let start = 59;
        self.setState({
            smsButton: {
            ...self.state.smsButton,
            disabled: true,
          },
        });
        var stop = setInterval(
                () => {
                  if (start == 0) {
                    self.setState({
                      smsButton: {
                        disabled: false,
                        msg: '发送验证码',
                      },
                    });
                    clearInterval(stop);
                    return;
                  }
                  self.setState({
                    smsButton: {
                      disabled: true,
                      msg: `发送成功(${start}s)`,
                    },
                  });
                  start--;
                }, 1000,
        );
      }
    }catch(e){
      message.error(e)
    }
  }

  render() {
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
    return (
      <Form onSubmit={this.handleSubmitF} >
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('phone')(
            <span style={{ width: '50%' }}>{this.props.phone}</span>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(
                <Input size="large"/>
              )}
            </Col>
            <Col span={12}>
              <Button size="large" disabled={this.state.smsButton.disabled} onClick={this.sendSms.bind(this)}>{this.state.smsButton.msg}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem
         {...tailFormItemLayout}
         style={{marginTop:'20px'}}
        >
          <Button type="primary" htmlType="submit" size="large">确定</Button>
        </FormItem>
      </Form>
    )
  }
}

class FixedPwdS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      smsButton: {
        disabled: false,
        msg: "发送验证码",
      }
    }
  }

  handleSubmitS = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log("Received values of form:", values);
        this.props.saveNewNum(values);
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    const { saveNewNumStatus, err } = nextProps;
    if(
      this.props.saveNewNumStatus.type != saveNewNumStatus.type 
      && saveNewNumStatus.type.match('SUCCESS')
    ) {
       message.success("修改成功！")
       history.back();
    }
    if(err) {
      message.error("手机号或验证码错误！");
    }
  }
  
  checkPhone = (e) => {
      const value = e.target.value;
      const reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
      if (reg.test(value)) {
         this.setState({
           newPhone: value
         })
          return true;
      } else {
          return false;
      }
  }

  async sendSms() {
    const self = this;
    const newPhone = this.state.newPhone;
    try{
      let resp = await postReq(
        '/core' + '/core/api/v1/sms/modifyPhoneSendSms?phone=' + newPhone
      )
      if(resp.ok) {
        let start = 59;
        self.setState({
          smsButton: {
            ...self.state.smsButton,
            disabled: true
          }
        })
        var stop = setInterval(
          () => {
            if(start === 0) {
              self.setState({
                smsButton: {
                  disabled: false,
                  msg: '发送验证码'
                }
              });
              clearInterval(stop);
              return;
            }
            self.setState({
              smsButton: {
                disabled: true,
                msg: `发送成功(${start}s)`
              }
            });
            start--;
          }, 1000);
      }
    }catch(e){
      message.error(e);
    }
  }

  render() {
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
    return (
      <Form onSubmit={this.handleSubmitS} >
        <FormItem
          {...formItemLayout}
          label="新手机号码"
        >
          {getFieldDecorator('newPhone', {
            rules: [{ required: true, message: '请输入一个新的手机号码!' }],
          })(
            <Input style={{ width: '50%' }} onBlur={this.checkPhone}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入验证码！' }],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button size="large" disabled={this.state.smsButton.disabled} onClick={this.sendSms.bind(this)}>{this.state.smsButton.msg}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem
         {...tailFormItemLayout}
        >
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrapperFixedPwdF = Form.create()(FixedPwdF)
const WrapperFixedPwdS = Form.create()(FixedPwdS)

class FixedPhoneNum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    }
  }

  handleSubmitF = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  render() {
    const steps = [{
        title: '验证身份',
        content: '验证身份',
      }, {
        title: '修改手机号码',
        content: '修改手机号码',
      }];
    const { subOldNumCodeStatus, subOldNumCode, err } = this.props;
    const orPhone = this.props.list.phone;
    const current  = this.state.current;
    const phone = this.props.list.phone ? this.props.list.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : null;
    const attrF = {phone, orPhone, subOldNumCodeStatus, err, current}
    let content = this.state.current == 0 ?
          <div style={{width:'70%', margin: '0 auto', fontSize:'14px'}}>
            <label>手机验证码验证 &nbsp;&nbsp;&nbsp;&nbsp; 为确认是你本人操作，请完成以下验证</label>
            <hr className="under"/>
            <WrapperFixedPwdF {...attrF} subOldNumCode={subOldNumCode.bind(this)} handleSubmitF={this.handleSubmitF}/>            
          </div>
          :
          <WrapperFixedPwdS handleSubmitS={this.handleSubmitS} saveNewNum={this.props.saveNewNum} saveNewNumStatus={this.props.saveNewNumStatus}/>  
    return (
      <div>
        <Steps current={this.state.current} style={{width: '80%', margin: '0 auto', marginBottom: 120}}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div>
          {content}
        </div>
      </div>
    )
  }
}

export default withRouter(FixedPhoneNum);  