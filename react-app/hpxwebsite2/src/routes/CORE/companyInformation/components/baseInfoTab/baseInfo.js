import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {Row , Col , Table , Card , Form, Input, Button, Icon, Select,DatePicker,message } from 'antd';
import EditeTableCion from './EditeTableCion'
import moment from 'moment'
import { checkPhone } from '../../../../../core/util.js'
import './baseInfo.css'
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol : {span:6},
    wrapperCol:{span:12},
}


const requireRule = { rules : [{ required: true, message: '此项必填!' }]};

const requiredRule = { required: true, message: '此项必填!' };

const formType = (data) => {
    let inputType = null;
    switch (data.type) {
        case 'text' :
        inputType = <Input />
        break;
        case 'select' :
        inputType = <Select>
                        {
                            data.data.map( (v,i) => {
                                return <Option key={v.key + i} value={v.key}>{v.value}</Option>
                            } )                                                   
                        }
                    </Select>
        break;
        case 'date' :
        inputType = <DatePicker />
        break;
        case 'email' :
        inputType = <Input type='email' />
        break;
    };
    return inputType
}

export const formText = (data,value) => {
    let inputText = null;
    switch (data.type){
        case 'date' :
            inputText = value ? value.format('YYYY-MM-DD') : '';
        break;
        case 'select' :
            const res = data.data.find((v)=>v.key === value);
            inputText = value && res ? res.value : '';
        break;
        default :
            inputText = value;
    };
    return inputText;
}

class BaseInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isEdite: false,
        }
        this.formConfigUpLeft = [
            {
                key : 'name',
                label : '企业名称',
                type : 'text',
                rules : {
                    rules : [
                        requiredRule
                    ]
                },
            },
            {
                key : 'iscode31',
                label : '是否三证合一',
                type : 'select',
                data : [
                    {
                        key : 'T',
                        value : '是'
                    },
                    {
                        key : 'F',
                        value : '否'
                    },
                ],
                rules : {
                    rules : [
                        requiredRule
                    ]
                },
            },
            {
                key : 'licenceNo',
                label : '营业执照号',
                type : 'text',
                rules : {
                    rules : [
                        requiredRule
                    ]
                },
            },
            {
                key : 'codeOrg',
                label : '组织机构代码',
                type : 'text',
                rules : {
                    rules : [
                        requiredRule
                    ]
                },
            },
        ];

        this.formConfigUpRight = [
            {
                key : 'taxNumber',
                label : '税务登记证',
                type : 'text',
                rules : {
                    rules : [
                        requiredRule
                    ]
                },
            },
            {
                key : 'enterpriseType',
                label : '企业性质',
                type : 'text',
            },
            {
                key : 'industry',
                label : '行业类型',
                type : 'text',
            },
            {
                key : 'area',
                label : '区域',
                type : 'text',
            },
        ];


    }
    editeDone = (type) => {
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                this.setState({
                            isEdite:false,
                        });
                let isSave = self.props.onChange(values,type);
                isSave.then((res)=>{
                    if(res){
                        let res = isSave.json();
                        this.setState({
                            isEdite:false,
                        });
                    }
                })
                       
            }
        })
    }

    edite = () => { 
        this.setState({
            isEdite : true
        })
    }
    
    render(){
        const { isEdite } = this.state;
        const { isAllEdite } = this.props;
        const { getFieldDecorator } = this.props.form;
        const view = 
            <Card title='基本信息' 
                    extra={ isAllEdite ? 
                        <EditeTableCion 
                            isEdite={this.state.isEdite} 
                            editeDone={()=>this.editeDone(3)}
                            edite={()=>this.edite()} /> 
                        : 
                        null}
            >
                <Form>
                    <Row>
                        <Col span={12}>
                            { 
                                this.formConfigUpLeft.map( (v,i) => {
                                    const value = this.props.fields[v.key].value;
                                    return <FormItem
                                                key={v.key}
                                                label= {v.label}
                                                {...formItemLayout}
                                                hasFeedback
                                            >   
                                                {  
                                                    isEdite ?
                                                    getFieldDecorator(v.key,v.rules)
                                                    (formType(v))
                                                    :
                                                    <div className='acc-text-span'>
                                                        {formText(v,value)}
                                                    </div>                                                                                                 
                                                }
                                            </FormItem>
                                } )
                            }
                        </Col>
                        <Col span={12}>
                            { 
                                this.formConfigUpRight.map( (v,i) => {
                                    return <FormItem
                                                key={v.key}
                                                label= {v.label}
                                                {...formItemLayout}
                                                hasFeedback
                                            >   
                                                {  
                                                    isEdite ?
                                                    getFieldDecorator(v.key,v.rules)
                                                    (formType(v))
                                                    :
                                                    <div className='acc-text-span'>
                                                        {formText(v,this.props.fields[v.key].value)}
                                                    </div>                                                                                                 
                                                }
                                            </FormItem>
                                } )
                            }
                        </Col>
                    </Row>    
                </Form>
            </Card>;
       
        return view
    }
}
class BusinessInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state={

            loading : false,

            isEdite: false,
        };

        this.formConfigMiddleLeft = [
            {
                key : 'regDate',
                label : '工商注册时间',
                type : 'date',
                rules : {
                    rules : [
                        requiredRule
                    ]
                },
            },
            {
                key : 'regCurrency',
                label : '工商注册币种',
                type : 'select',
                data : [
                    {
                        key : '0',
                        value : 'RMB'
                    },
                    {
                        key : '1',
                        value : '$'
                    },
                ],
            },
            {
                key : 'operationTerm',
                label : '税务登记证',
                type : 'text',
            },
            {
                key : 'taxRegistrationInfo',
                label : '工商注册信息',
                type : 'text',
            },
            {
                key : 'contactsEmail',
                label : '企业邮箱',
                type : 'email',
                rules : {
                    rules : [
                        {type: 'email', message: '邮箱格式的错误!'}
                    ]
                },
            },
            {
                key : 'address',
                label : '注册地址',
                type : 'text',
            },
        ];

        this.formConfigMiddleRight = [
            {
                key : 'regOffice',
                label : '工商注册机关',
                type : 'text',
            },
            {
                key : 'regCapital',
                label : '注册资金',
                type : 'text',
            },
            {
                key : 'inspectionTime',
                label : '公司年检时间',
                type : 'date',
            },
            {
                key : 'normalInspection',
                label : '是否正常年检',
                type : 'select',
                data : [
                    {
                        key : '0',
                        value : '是'
                    },
                    {
                        key : '1',
                        value : '否'
                    }
                ]
            },
        ];

    }
    editeDone = (type) => {
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                values.regDate = values.regDate ? values.regDate.format('YYYY/MM/DD') : null;
                values.inspectionTime = values.inspectionTime ? values.inspectionTime.format('YYYY/MM/DD') : null;
                self.props.onChange(values,type)     
                this.setState({
                    isEdite:false,
                });        
            }
        })
    }

    edite = () => { 
        this.setState({
            isEdite : true
        })
    }
    
    render(){
        const { isEdite ,loading} = this.state;
        const { isAllEdite } = this.props;
        const { getFieldDecorator } = this.props.form;
        const view = 
            <Card 
                title='工商注册信息' 
                extra={ isAllEdite ? 
                        <EditeTableCion 
                            isEdite={this.state.isEdite} 
                            editeDone={()=>this.editeDone(3)}
                            edite={()=>this.edite()} /> 
                        : 
                        null}
            >
                <Form>
                    <Row>
                        <Col span={12}>         
                            { 
                                this.formConfigMiddleLeft.map( (v,i) => {
                                    const value = this.props.fields[v.key].value;
                                    return <FormItem
                                                key={v.key}
                                                label= {v.label}
                                                {...formItemLayout}
                                                hasFeedback
                                            >   
                                                {  
                                                    isEdite ?
                                                    getFieldDecorator(v.key,v.rules)
                                                    (formType(v))
                                                    :
                                                    <div className='acc-text-span'>
                                                        {formText(v,value)}
                                                    </div>                                                                                                 
                                                }
                                            </FormItem>
                                } )
                            }
                        </Col>
                        <Col span={12}>
                            { 
                                this.formConfigMiddleRight.map( (v,i) => {
                                    const value = this.props.fields[v.key].value;
                                    return <FormItem
                                                key={v.key}
                                                label= {v.label}
                                                {...formItemLayout}
                                                hasFeedback
                                            >   
                                                {  
                                                    isEdite ?
                                                    getFieldDecorator(v.key,v.rules)
                                                    (formType(v))
                                                    :
                                                    <div className='acc-text-span'>
                                                        {formText(v,value)}
                                                    </div>                                                                                                 
                                                }
                                            </FormItem>
                                } )
                            }
                        </Col>    
                    </Row>
                </Form>
            </Card>
        ;
        return view
    }
}

class ContactsForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isEdite: false,
        }

        this.formConfigButtomLeft = [
            {
                key : 'contacts',
                label : '授权人',
                type : 'text',
                rules : {
                    rules : [
                        requiredRule
                    ]
                },
            },
            {
                key : 'contactsEmail',
                label : '授权人邮箱',
                type : 'email',
                rules : {
                    rules : [
                        {type: 'email', message: '邮箱格式的错误!'}
                    ]
                },
            },
            {
                key : 'address',
                label : '详细地址',
                type : 'text',
            },
            {
                key : 'legalPerson',
                label : '法人代表',
                type : 'text',
            },
            {
                key : 'scopeOfBusiness',
                label : '经营范围',
                type : 'text',
            },
        ];

        this.formConfigButtomRight = [
            {
                key : 'contactsPhone',
                label : '联系电话',
                type : 'text',
                rules : {
                    rules : [
                        requiredRule,
                        {validator: this.checkPhoneConfirm.bind(this,'contactsPhone') }
                    ]
                },
            },
            {
                key : 'city',
                label : '城市',
                type : 'text',
                rules : {
                    rules : [
                        requiredRule,
                    ]
                },
            },
            {
                key : 'contactsPost',
                label : '传真',
                type : 'text',
            },
            {
                key : 'legalCardNo',
                label : '法人身份证',
                type : 'text',
            },
        ];

    }
    editeDone = (type) => {
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                this.setState({
                    isEdite:false,
                });
                self.props.onChange(values,type)     
                
            }
        })
    }

    edite = () => { 
        this.setState({
            isEdite : true
        })
    }
    
    checkPhoneConfirm = (phoneKey, rule, value, callback) => {
        const form = this.props.form;
        if (!checkPhone(form.getFieldValue(phoneKey))) {
            callback('手机号格式不正确!');
        } else {
            callback();
        }
    }

    render(){
        const { isEdite } = this.state;
        const { isAllEdite } = this.props;
        const { getFieldDecorator } = this.props.form;
        const view =
            <Card title='联系方式' 
                extra={ isAllEdite ? 
                        <EditeTableCion 
                            isEdite={this.state.isEdite} 
                            editeDone={()=>this.editeDone(3)}
                            edite={()=>this.edite()} /> 
                        : 
                        null}
            >
                <Form>
                    <Row>
                        <Col span={12}>         
                            { 
                                this.formConfigButtomLeft.map( (v,i) => {
                                    return <FormItem
                                                key={v.key}
                                                label= {v.label}
                                                {...formItemLayout}
                                                hasFeedback
                                            >   
                                                {  
                                                    isEdite ?
                                                    getFieldDecorator(v.key,v.rules)
                                                    (formType(v))
                                                    :
                                                    <div className='acc-text-span'>
                                                        {formText(v,this.props.fields[v.key].value)}
                                                    </div>                                                                                                 
                                                }
                                            </FormItem>
                                } )
                            }
                        </Col>
                        <Col span={12}>
                            { 
                                this.formConfigButtomRight.map( (v,i) => {
                                    return <FormItem
                                                key={v.key}
                                                label= {v.label}
                                                {...formItemLayout}
                                                hasFeedback
                                            >   
                                                {  
                                                    isEdite ?
                                                    getFieldDecorator(v.key,v.rules)
                                                    (formType(v))
                                                    :
                                                    <div className='acc-text-span'>
                                                       {formText(v,this.props.fields[v.key].value)}
                                                    </div>                                                                                                 
                                                }
                                            </FormItem>
                                } )
                            }
                        </Col>    
                    </Row>
                </Form>
            </Card>;
        return view
    }
}

class TaxForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isEdite: false,
        };

        this.formConfigEndLeft = [
            {
                key : 'taxNumber',
                label : '税号',
                type : 'text',
            },
        ]

    }
    editeDone = (type) => {
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                self.props.onChange(values,type)     
                this.setState({
                    isEdite:false,
                });        
            }
        })
    }

    edite = () => { 
        this.setState({
            isEdite : true
        })
    }

    render(){
        const { isEdite } = this.state;
        const { isAllEdite } = this.props;
        const { getFieldDecorator } = this.props.form;
        const view = 
            <Card title='税务信息' 
                extra={ isAllEdite ? 
                        <EditeTableCion 
                            isEdite={this.state.isEdite} 
                            editeDone={()=>this.editeDone(3)}
                            edite={()=>this.edite()} /> 
                        : 
                        null}
            >
                    <Form>
                        <Row>
                            <Col span={12}>
                                { 
                                    this.formConfigEndLeft.map( (v,i) => {
                                        return <FormItem
                                                    key={v.key}
                                                    label= {v.label}
                                                    {...formItemLayout}
                                                    hasFeedback
                                                >   
                                                    {  
                                                        isEdite ?
                                                        getFieldDecorator(v.key,v.rules)
                                                        (formType(v))
                                                        :
                                                        <div className='acc-text-span'>
                                                            {formText(v,this.props.fields[v.key].value)}
                                                        </div>                                                                                                 
                                                    }
                                                </FormItem>
                                    } )
                                }
                            </Col>
                        </Row>
                    </Form>
            </Card>;
        return view
    }
}

const baseOptions = {
    mapPropsToFields : (props)=>{
        const fields = props.fields
        return fields
    }
}
const businessOptions = {
    mapPropsToFields : (props)=>{
        let fields = {...props.fields}
        fields.regDate.value = fields.regDate && fields.regDate.value ? 
                                moment(fields.regDate.value) : null; 
        fields.inspectionTime.value = fields.inspectionTime && fields.inspectionTime.value ? 
                                moment(fields.inspectionTime.value) : null; 
                
        return fields
    },
}
const contactsOptions = {
    mapPropsToFields : (props)=>{
        const fields = {...props.fields}
        return fields
    }
}
const taxOptions = {
    mapPropsToFields : (props)=>{
        const fields = {...props.fields}
        return fields;
    }
}
const WrapBaseInfoForm = Form.create(baseOptions)(BaseInfoForm);
const WrapBusinessInfoForm = Form.create(businessOptions)(BusinessInfoForm);
const WrapContactsInfoForm = Form.create(contactsOptions)(ContactsForm);
const WrapTaxsInfoForm = Form.create(taxOptions)(TaxForm);
class ComInfo  extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
       this.props.fetchComInfo();
    }
    render(){
        return <div className='acc-eid-base'>
                    <WrapBaseInfoForm
                        fields={this.props.comInfo.baseInfo}
                        onChange={this.props.updateComInfo}
                        isAllEdite={this.props.isAllEdite}
                    />
                    <WrapBusinessInfoForm
                        fields={this.props.comInfo.businessInfo}
                        onChange={this.props.updateComInfo}
                        isAllEdite={this.props.isAllEdite}
                    />
                    <WrapContactsInfoForm
                        fields={this.props.comInfo.contactsInfo}
                        onChange={this.props.updateComInfo}
                        isAllEdite={this.props.isAllEdite}
                    />
                    <WrapTaxsInfoForm
                        fields={this.props.comInfo.taxRegistrationInfo}
                        onChange={this.props.updateComInfo}
                        isAllEdite={this.props.isAllEdite}
                    />
                </div>
    }
}

export default ComInfo