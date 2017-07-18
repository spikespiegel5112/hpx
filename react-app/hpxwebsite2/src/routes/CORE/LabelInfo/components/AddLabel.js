import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'

import { postReq } from '../../../../core/fetch'

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

import { precisionValidator } from '../../../../core/antdFormUtil.js'

import { checkPhone } from '../../../../core/util.js'

const FormItem = Form.Item;
const Option = Select.Option;

class AddForm extends React.Component {
  state = {
    intervalId: null,
  };
  componentWillUnmount(){
    clearInterval(this.state.intervalId)
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
  handleClick = (uploadview) => {
    const form = this.props.form
   
  }
  saveSubmit = (e) => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.file = values.file[0].response
        self.props.saveLabel(values);
        this.props.fetchList()
      }
    });
    this.props.fetchList()
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
   
    return (
      <Form onSubmit={this.saveSubmit}>
        
        <FormItem
          key="name"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('name',{
            rules: [
              { required: true, message: '请输入标签名!', whitespace: true },
            ],
          })(
            <Input placeholder="请输入标签名"
            />
          )}
        </FormItem>

         <FormItem
          key="describe"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('describe',{
            rules: [
              { required: true, message: '请输入描述内容!', whitespace: true },
            ],
          })(
            <Input placeholder="请输入描述内容"
            />
          )}
        </FormItem>

        <FormItem
          key="file"
          {...formItemLayout}
          label="文件上传"
          extra=""
        >
          {getFieldDecorator('file', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload 
              name="file"  
              action={'/core'+'/credit/api/v1/tp/scorelabel/excel'} 
              listType="text" 
            >
              {this.props.file && this.props.file.value && this.props.file.value.length >= 3 ? null : 
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              }
            </Upload>
          )}
        </FormItem>

         <FormItem
          key="file"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('file')(
            <Input type="hidden"
            />
          )}
        </FormItem>
           
        <FormItem {...tailFormItemLayout}>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            /*loading={this.props.saveStatus.loading}*/
            >
            提交
          </Button>
        </FormItem>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Form>
    );
  }
}

const AddLabelForm = Form.create({
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);//调用父组件的更新方法
  },
  mapPropsToFields(props) {
    var arr = [{
          key: 'name',
          value: {
            ...props.labelname
          }
        },{
          key: 'describe',
          value: {
            ...props.describe
          }
        },
        {
          key: 'file',
          value: {
            ...props.file,
            value: props.file 
                && props.file.value
                && props.file.value.map(
                  (v,i) => {
                    return v.response && v.response.success ? {
                        id: v.response.data.id,
                        uid:  v.response.data.id,
                        name: v.response.data.name,
                        url: v.response.data.url,
                        status: 'done',
                      }
                      : {
                        id: v.id,
                        uid: v.uid || v.id,
                        name: v.name,
                        url: v.url,
                        status: v.status,
                      }
                  }
                )
          }
        },];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(AddForm);

export default withRouter(AddLabelForm)
