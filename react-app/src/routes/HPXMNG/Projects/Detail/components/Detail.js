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

                values.startTime = values.startTime ? values.startTime.format('YYYY/MM/DD') : '';

                values.endTime = values.endTime ? values.endTime.format('YYYY/MM/DD') : '';

                values.createTime = values.createTime ? values.createTime.format('YYYY/MM/DD') : '';

                values.modifiedTime = values.modifiedTime ? values.modifiedTime.format('YYYY/MM/DD') : '';

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
    //发送验证码
    fetchCaptcha = async (smsCodeKey,phoneKey) => {
        const form = this.props.form;
        form.setFields({
            [smsCodeKey]:{
                value: this.props[smsCodeKey].value,
                errors:null,
            }
        })
        if(!form.getFieldValue(phoneKey)||!checkPhone(form.getFieldValue(phoneKey))){
            form.setFields({
                captcha:{
                    errors:[new Error('请输入正确格式的手机号!')],
                }
            })
        } else {
            const resp = await postReq(__PROXY__ + '/trade/testOb/smsCode',{[phoneKey]:form.getFieldValue(phoneKey)});
            const result = await resp.json();
            if( result.success ){
                message.success('成功发送验证码');
                let self = this;
                let number = 59;
                let intervalId = setInterval(
                    () => {
                        self.setState({
                            smsButtonDisabled: true,
                            smsButtonMsg:'重新获取验证码('+number+')'
                        });
                        number--;
                        if(number == 0) {
                            self.setState({
                                smsButtonDisabled: false,
                                smsButtonMsg:'获取验证码'
                            });
                            clearInterval(intervalId);
                        }
                    },1000
                );
                self.setState({intervalId: intervalId})
            }
        }
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector mobileBefore">
              <Option value="86">+86</Option>
            </Select>
        );
        return (
            <Form onSubmit={this.handleSubmit}>

              <FormItem
                  key="productCode"
                  {...formItemLayout}
                  label="产品编码"
                  hasFeedback
              >
                  {getFieldDecorator('productCode',{
                      rules: [
                          { required: true, message: '请输入数据!', whitespace: true },
                          {
                              message: '长度需在0-65536位!',
                          },
                      ],
                  })(
                      <Input
                      />
                  )}
              </FormItem>

              <FormItem
                  key="code"
                  {...formItemLayout}
                  label="项目编号"
                  hasFeedback
              >
                  {getFieldDecorator('code',{
                      rules: [
                          { required: true, message: '请输入数据!', whitespace: true },
                          {
                              message: '长度需在0-65536位!',
                          },
                      ],
                  })(
                      <Input
                      />
                  )}
              </FormItem>

              <FormItem
                  key="name"
                  {...formItemLayout}
                  label="项目名称"
                  hasFeedback
              >
                  {getFieldDecorator('name',{
                      rules: [
                          { required: true, message: '请输入数据!', whitespace: true },
                          {
                              message: '长度需在0-65536位!',
                          },
                      ],
                  })(
                      <Input
                      />
                  )}
              </FormItem>

              <FormItem
                  key="remark"
                  {...formItemLayout}
                  label="项目说明"
                  hasFeedback
              >
                  {getFieldDecorator('remark',{
                      rules: [
                          { required: true, message: '请输入数据!', whitespace: true },
                          {
                              min: 1, max:  50, message: '长度需在1-50位!',
                          },
                      ],
                  })(
                      <Input
                          type="textarea"
                          rows={4}
                      />
                  )}
              </FormItem>

              <FormItem
                  key="startTime"
                  {...formItemLayout}
                  label="项目开始时间"
                  hasFeedback
              >
                  {getFieldDecorator('startTime',{
                      rules: [
                          { type:'object', required: true, message: '请选择日期!'},
                      ],
                  })(
                      <DatePicker />
                  )}
              </FormItem>

              <FormItem
                  key="endTime"
                  {...formItemLayout}
                  label="项目终止时间"
                  hasFeedback
              >
                  {getFieldDecorator('endTime',{
                      rules: [
                          { type:'object', required: true, message: '请选择日期!'},
                      ],
                  })(
                      <DatePicker />
                  )}
              </FormItem>

              <FormItem
                  key="creator"
                  {...formItemLayout}
                  label="建立人"
                  hasFeedback
              >
                  {getFieldDecorator('creator',{
                      rules: [
                          { required: true, message: '请输入数据!', whitespace: true },
                          {
                              message: '长度需在0-65536位!',
                          },
                      ],
                  })(
                      <Input
                      />
                  )}
              </FormItem>

              <FormItem
                  key="state"
                  {...formItemLayout}
                  label="项目状态"
                  hasFeedback
              >
                  {getFieldDecorator('state',{
                      rules: [
                          { required: true, message: '请选择!'},
                      ],
                  })(
                      <Select placeholder="请选择" >
                          {[{"value":"B","name":"准备中"},{"value":"R","name":"进行中"},{"value":"E","name":"正常结束"},{"value":"P","name":"暂停"},{"value":"F","name":"异常结束"}].map(
                              (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
                          )}
                      </Select>
                  )}
              </FormItem>

              <FormItem
                  key="createTime"
                  {...formItemLayout}
                  label="记录时间"
                  hasFeedback
              >
                  {getFieldDecorator('createTime',{
                      rules: [
                          { type:'object', required: true, message: '请选择日期!'},
                      ],
                  })(
                      <DatePicker />
                  )}
              </FormItem>

              <FormItem
                  key="modifiedBy"
                  {...formItemLayout}
                  label="更新人"
                  hasFeedback
              >
                  {getFieldDecorator('modifiedBy',{
                      rules: [
                          { required: true, message: '请输入数据!', whitespace: true },
                          {
                              message: '长度需在0-65536位!',
                          },
                      ],
                  })(
                      <Input
                      />
                  )}
              </FormItem>

              <FormItem
                  key="modifiedTime"
                  {...formItemLayout}
                  label="最后更新"
                  hasFeedback
              >
                  {getFieldDecorator('modifiedTime',{
                      rules: [
                          { type:'object', required: true, message: '请选择日期!'},
                      ],
                  })(
                      <DatePicker />
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
            key: 'productCode',
            value: {
                ...props.productCode
            }
        },{
            key: 'code',
            value: {
                ...props.code
            }
        },{
            key: 'name',
            value: {
                ...props.name
            }
        },{
            key: 'remark',
            value: {
                ...props.remark
            }
        },{
            key: 'startTime',
            value: {
                ...props.startTime,
                value: props.startTime && props.startTime.value ? moment(props.startTime.value) : null,
            }
        },{
            key: 'endTime',
            value: {
                ...props.endTime,
                value: props.endTime && props.endTime.value ? moment(props.endTime.value) : null,
            }
        },{
            key: 'creator',
            value: {
                ...props.creator
            }
        },{
            key: 'state',
            value: {
                ...props.state
            }
        },{
            key: 'createTime',
            value: {
                ...props.createTime,
                value: props.createTime && props.createTime.value ? moment(props.createTime.value) : null,
            }
        },{
            key: 'modifiedBy',
            value: {
                ...props.modifiedBy
            }
        },{
            key: 'modifiedTime',
            value: {
                ...props.modifiedTime,
                value: props.modifiedTime && props.modifiedTime.value ? moment(props.modifiedTime.value) : null,
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
