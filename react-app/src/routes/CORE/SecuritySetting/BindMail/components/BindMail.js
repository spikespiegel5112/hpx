import React from 'react';
import { Link, withRouter } from 'react-router';
import { Button, Input, message, Form, Icon, Card, Row, Col } from 'antd';
import fetch, { fromPostReq } from '../../../../../core/fetch';
import { checkPassword } from '../../../../../core/util'
const FormItem = Form.Item;

import './BindMail.css';

class MailForm extends React.Component {
  state = {
    confirmDirty: false,
  }

  active = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log("Received values of form:", values);
        // this.props.saveMail(values);
      }
    });
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
      <Form onSubmit={this.active} >
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
            {getFieldDecorator('mail', {
              rules: [{ required: true, message: '请输入要绑定的邮箱！' }],
            })(
              <Input size="large"  style={{width: '50%'}}/>
            )}
        </FormItem>
        <FormItem
         {...tailFormItemLayout}
        >
          <Button type="primary" htmlType="submit" size="large">点击激活</Button>
        </FormItem>
      </Form>
    )
  }
}

class BindMailForm extends React.Component {
  state = {
    confirmDirty: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log("Received values of form:", values);
        this.props.saveMail(values);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { saveMailStatus, fetchList } = nextProps;
    if(
      this.props.saveMailStatus.type != saveMailStatus.type
      && saveMailStatus.type.match('SUCCESS')
    ){
      message.success("修改成功！")
      fetchList();
      history.back();
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
          label="邮箱"
        > 
          {getFieldDecorator("mail", {
            rules: [{
              required: true, message: '请输入要修改的邮箱！',
            },{
              validator: this.checkConfirm, 
            }],
          })(
            <Input type="text" onBlur={this.checkNew} style={{width: '50%'}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码！' }],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button size="large">获取验证码</Button>
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

const WrapperMailForm = Form.create()(MailForm)
const WrapperBindMailForm = Form.create()(BindMailForm)

class BindMail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { list } = this.props;
    let view = 
      <div>
        {list.email ?
          <Card title="修改邮箱" extra={<a href="#">取消</a>} style={{ width: 600, margin: '0 auto'}}>
            <WrapperBindMailForm saveMail={this.props.saveMail} saveMailStatus={this.props.saveMailStatus} style={{marginTop: '50px 0'}}/> 
            <div className="tips">
              <p>没收到邮箱验证码</p>
              <p>1、网络通讯异常可能会造成邮件丢失，请重新获取活稍后再试。</p>
              <p>2、请核实邮箱是否正常使用，并检查垃圾邮箱夹。</p>
            </div>
         </Card> :
          <Card title="绑定邮箱" extra={<a href="#">取消</a>} style={{ width: 600, margin: '0 auto'}}>
            <WrapperMailForm />
          </Card> 
        }
      </div>
    return (
      <div>
        {view}
      </div>
    )
  }
}

export default withRouter(BindMail);  