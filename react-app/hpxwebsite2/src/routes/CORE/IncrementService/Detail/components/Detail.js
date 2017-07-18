import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'

import { postReq } from '../../../../../core/fetch'

import './Detail.css'

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

class DetailForm extends React.Component {
  state = {
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
        
        values.datePicker = values.datePicker ? values.datePicker.format('YYYY/MM/DD') : '';
      
        values.uploadimg = JSON.stringify(values.uploadimg);
      
        values.uploadview = JSON.stringify(values.uploadview);
      
        values.agreement = [{"key":"0","value":false},{"key":"1","value":true}].filter(
          v => v.value == values.agreement
        )
        values.agreement = values.agreement.length ? values.agreement[0].key : '';
      
        self.props.saveSubmit(values,self.props.id);
      }
    });
  }
  beforeUpload(file) {//文件上传前的回调
    const isJPG = file.type === 'image/png' || file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('你只能上传JPG 或PNG 图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于 2MB!');
    }
    return isJPG && isLt2M;
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
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem
          key="company"
          {...formItemLayout}
          label="公司"
          hasFeedback
        >
          {getFieldDecorator('company',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在6-16位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
         <FormItem
          key="uploadview"
          {...formItemLayout}
          label="文件"
          extra=""
        >
          {getFieldDecorator('uploadview', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload 
              name="uploadview" 
              action={__PROXY__+"/trade/file/upload"} 
              listType="text" 
            >
              {this.props.uploadview && this.props.uploadview.value && this.props.uploadview.value.length >= 3 ? null : 
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              }
            </Upload>
          )}
          
        </FormItem>
      
        <FormItem {...tailFormItemLayout}>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            loading={this.props.saveStatus.loading}>
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

const WrappedDetailForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);//调用父组件的更新方法
  },
  mapPropsToFields(props) {
    var arr = [{
          key: 'company',
          value: {
            ...props.company
          }
        },{
          key: 'uploadimg',
          value: {
            ...props.uploadimg,
            value: props.uploadimg 
                && props.uploadimg.value
                && props.uploadimg.value.map(
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
        },{
          key: 'uploadview',
          value: {
            ...props.uploadview,
            value: props.uploadview 
                && props.uploadview.value
                && props.uploadview.value.map(
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
})(DetailForm);

class Detail extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.fetchDetail(this.props.params.id);
    //调用module方法加载数据
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
    return  <div><WrappedDetailForm 
                  {...this.props.fields}  
                  saveStatus={this.props.saveStatus}
                  fetchDetailStatus={this.props.fetchDetailStatus}
                  onChange={this.props.updateFields}
                  saveSubmit={this.props.save}/>
            </div>
  }
}

Detail.propTypes = {
  // increment   : React.PropTypes.func.isRequired
}

export default withRouter(Detail)
