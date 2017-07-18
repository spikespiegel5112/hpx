import React from 'react';
import { Link, withRouter } from 'react-router';
import { Button, Input, message, Form, Icon, Card } from 'antd';
import fetch, { fromPostReq } from '../../../../../core/fetch';
import { checkPassword } from '../../../../../core/util'
const FormItem = Form.Item;

import './FixedPwd.css';

class FixedPwdForm extends React.Component {
  state = {
    confirmDirty: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log("Received values of form:", values);
        this.props.saveNewPwd(values);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { saveNewPwdStatus } = nextProps;
    if(
      this.props.saveNewPwdStatus.type != saveNewPwdStatus.type
      && saveNewPwdStatus.type.match('SUCCESS')
    ){
      message.success("修改成功！")
      history.back();
    }
  }
  
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value})
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("newPwd")) {
      callback("两次输入的密码不一致！");
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    // const res = checkPassword(value);
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  checkNew = (e) => {
    const res = checkPassword(e.target.value);
    if(!res) {
      message.error("请输入6到16位的密码，需包含数字，字母，符号中两种！");
      return false;
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
      <Form onSubmit={this.handleSubmit} >
        <FormItem
          {...formItemLayout}
          label="旧密码"
        > 
          {getFieldDecorator("oldPwd", {
            rules: [{
              required: true, message: '请输入新密码！',
            },],
          })(
            <Input type="password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
        > 
          {getFieldDecorator("newPwd", {
            rules: [{
              required: true, message: '请输入新密码！',
            },{
              validator: this.checkConfirm, 
            }],
          })(
            <Input type="password" onBlur={this.checkNew}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator("confirm", {
            rules: [{
              required: true,message:'请再次输入新密码！',
            },{
              validator: this.checkPassword,
            }]
          })(
            <Input type="password" onBlur={this.handleConfirmBlur}/>
          )

          }
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

const WrapperFixedPwdForm = Form.create()(FixedPwdForm)

class FixedPwd extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Card title="修改密码" extra={<a href="#">取消</a>} style={{ width: 600, margin: '0 auto' }}>
        <WrapperFixedPwdForm saveNewPwd={this.props.saveNewPwd} saveNewPwdStatus={this.props.saveNewPwdStatus}/> 
      </Card>
       
    )
  }
}

export default withRouter(FixedPwd);  