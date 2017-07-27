import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'

import { postReq } from '../../../../../core/fetch'

import './Detail.css'

import { 
  Form, 
  Input, 
  Icon, 
  Row, 
  Col, 
  Checkbox, 
  Button, 
  Upload, 
  message, 
  Modal ,
  Card,
  Radio
} from 'antd';

const RadioGroup = Radio.Group;

import { precisionValidator } from '../../../../../core/antdFormUtil.js'

import { checkPhone } from '../../../../../core/util.js'

const FormItem = Form.Item;

class DetailForm extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        self.props.saveAdd(values);
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
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          key="name"
          {...formItemLayout}
          label="签章名称"
          hasFeedback
        >
          {getFieldDecorator('name',{
            rules: [
              { required: true, message: '请填写签章名称!', whitespace: true },
            ],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          key="shape"
          {...formItemLayout}
          label="选择样式"
          hasFeedback
        >
          {getFieldDecorator('shape',{
            rules: [
              { required: true, message: '请选择样式!', whitespace: true },
            ],
          })(
            <RadioGroup>
              <Radio value="STAR">圆形</Radio>
              <Radio value="OVAL">椭圆</Radio>
            </RadioGroup>
          )}
        </FormItem>
        
        <FormItem
          key="htext"
          {...formItemLayout}
          label="横&nbsp;&nbsp;向&nbsp;&nbsp;文"
          hasFeedback
        >
          {getFieldDecorator('htext',{
            rules: [
              { required: true, message: '请输入横向文!', whitespace: true },
              {
                  min: 4, max: 8, message: '长度需在4-8位!',
              },
            ],
          })(
            <Input placeholder="最多可输入8个字符"
            />
          )}
        </FormItem>

        <FormItem
          key="qtext"
          {...formItemLayout}
          label="下&nbsp;&nbsp;悬&nbsp;&nbsp;文"
          hasFeedback
        >
          {getFieldDecorator('qtext',{
            rules: [
              { required: true, message: '请输入下弦文!', whitespace: true },
              {
                min: 5, max: 15, message: '长度需在5-15位!',
              },
            ],
          })(
            <Input placeholder="最多可输入15个字符"
            />
          )}
        </FormItem>

        <FormItem
          key="color"
          {...formItemLayout}
          label="选择颜色"
          hasFeedback
        >
          {getFieldDecorator('color',{
            rules: [
              { required: true, message: '请选择颜色!', whitespace: true },
            ],
          })(
            <RadioGroup>
              <Radio value="RED"><span className="signature-color signature-color-red"></span></Radio>
              <Radio value="BLUE"><span className="signature-color signature-color-blue"></span></Radio>
              <Radio value="BLACK"><span className="signature-color signature-color-black"></span></Radio>
            </RadioGroup>
          )}
        </FormItem>
      
        <FormItem {...tailFormItemLayout}>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            loading={this.props.saveAddStatus.loading}>
            确定
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDetailForm = Form.create({
  mapPropsToFields(props) {
    var arr = [{
          key: 'name',
          value: {
            ...props.name
          }
        },{
          key: 'shape',
          value: {
            ...props.shape
          }
        },{
          key: 'color',
          value: {
            ...props.color
          }
        },{
          key: 'qtext',
          value: {
            ...props.qtext
          }
        },{
          key: 'htext',
          value: {
            ...props.htext
          }
        }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  }
})(DetailForm);

class Detail extends React.Component {
  constructor(props){
    super(props);
  }
  
  componentWillReceiveProps(nextProps){
    const { saveAddStatus, err } = nextProps;
    if(
      this.props.saveAddStatus.type != saveAddStatus.type 
      && saveAddStatus.type.match('SUCCESS')
    ){
      message.success('保存成功');
      browserHistory.go(-1);
    }
    if (err) {
      message.error(err);
    }
  }
  render() {
    return (
        <Card title="签章服务" style={{ width: '80%', margin: '0 auto'}}>
          <WrappedDetailForm 
            saveAddStatus={this.props.saveAddStatus}
            saveAdd={this.props.saveAdd}/>
      </Card>
    )
  }
}

export default withRouter(Detail)
