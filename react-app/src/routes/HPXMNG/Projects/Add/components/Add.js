import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'

import { postReq } from '../../../../../core/fetch'

import './Add.css'

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

class AddForm extends React.Component {
    state = {
        intervalId: null,
        type:null,
    };
    componentWillUnmount(){
        clearInterval(this.state.intervalId);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('type: ', this.state.type);
                console.log('Received values of form: ', values);
                //在提交前格式化部分数据

                values.startTime = values.startTime ? values.startTime.format('YYYY-MM-DD') : '';

                values.endTime = values.endTime ? values.endTime.format('YYYY-MM-DD') : '';

                self.props.save(values,this.state.type);
            }
        });
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    //企业名称选中改变
    ownerEnterpriseId = (value) =>{
        this.setState({
            ownerEnterpriseId : value
        })
    }

    // 产品类型选中改变
    productCode = (value) => {
        console.log(9999,value);
        this.props.fetchEnterprise(value);
        this.setState({
            productCode : value
        })
    }
    //企业角色选中改变
    type = (value) => {
        this.state.type = value;
        this.setState({
            type : value
        })
    }

    
    render() {
        const { previewVisible, previewImage } = this.state;
        const { productList ,enterpriseList,fields,firmList} = this.props;
        console.log("firmList",firmList)
        
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
                    key="ownerEnterpriseId"
                    {...formItemLayout}
                    label="企业名称"
                    hasFeedback
                >
                    {getFieldDecorator('ownerEnterpriseId',{
                        rules: [
                            { required: true, message: '请选择企业名称!', whitespace: true },
                        ],
                    })(
                        <Select placeholder="请选择" onChange={this.ownerEnterpriseId}
                            style={{ width: "30%"}}>
                            {firmList.map(temp => <Option key={temp.id}>{temp.name}</Option>)}
                        </Select>
                    )}
                </FormItem>

              <FormItem
                  key="productCode"
                  {...formItemLayout}
                  label="产品类型"
                  hasFeedback
              >
                  {getFieldDecorator('productCode',{
                      rules: [
                          { required: true, message: '请选择产品类型!', whitespace: true },
                         
                      ],
                  })(
                    <Select placeholder="请选择" onChange={this.productCode}
                        style={{ width: "30%"}}>
                        {productList.map(temp => <Option key={temp.code}>{temp.name}</Option>)}
                    </Select>
                  )}
              </FormItem>

              <FormItem
                  key="type"
                  {...formItemLayout}
                  label="企业角色"
                  hasFeedback
              >
                  {getFieldDecorator('type',{
                      rules: [
                          { required: true, message: '请选择企业角色!', whitespace: true },
                      ],
                  })(
                      <Select placeholder="请选择" onChange={this.type}
                        style={{ width: "30%"}}>
                        {enterpriseList.map(temp => <Option key={temp.code}>{temp.name}</Option>)}
                    </Select>
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
                          { required: true, message: '请输入项目名称!', whitespace: true },
                          {
                              min: 1, max:  50, message: '长度需在1-50位!',
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
                          { required: false, message: '请输入项目说明!', whitespace: true },
                          {
                                message: '长度需在0-65536位!',
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
                          { type:'object', required: false, message: '请选择日期!'},
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
                  保存
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
        },
        {
            key: 'ownerEnterpriseId',
            value: {
                ...props.ownerEnterpriseId
            }
        },
        {
            key: 'type',
            value: {
                ...props.type
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
})(AddForm);

class Add extends React.Component {
    constructor(props){
        super(props);
    }

 //页面加载方法
    componentWillMount(){
        this.props.fetchFirm();
        //调用module方法加载产品类型数据
        this.props.fetchProduct();
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
            fields={this.props.fields}
            firmList={this.props.firmList}
            productList={this.props.productList}
            enterpriseList={this.props.enterpriseList}
            fetchEnterprise={this.props.fetchEnterprise}
            save={this.props.save}/>
        </div>
    }
}

Add.propTypes = {
    // increment   : React.PropTypes.func.isRequired
}

export default withRouter(Add)
