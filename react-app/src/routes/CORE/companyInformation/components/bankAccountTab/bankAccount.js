import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {Table,Card , Form, Input, Button, Icon, Select,DatePicker,message,Row,Col } from 'antd';
import { getReq ,formPostReq,putReq} from '../../../../../core/fetch'
import EditeTableCion from '../baseInfoTab/EditeTableCion'
import '../baseInfoTab/baseInfo.css'

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol : {span:6},
    wrapperCol:{span:15}
}

const requireRule = {rules:[{ required: true, message: '此项必填!' }]}
// const requireRule = {rules:[{}]}
class BankInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEdite: true,
            prov :[],
            city :[],
            country : [],
            bank :[],
            bankde : []
        };
    }
    editeDone = (type) => {
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                console.log(values)
                this.props.updateState(values)
                this.setState({
                    isEdite:false,
                });
                self.postBankInfo(values)();    
                      
            }
        })
    }   

    edite = () => {
        console.log(this.props)
        this.setState({
            isEdite : true
        })
    }
    
    postBankInfo(values){
        return async ()=>{
            try{
                const eid = this.props.eid
                const resp = await putReq(
                    `/core/core/api/v1/enterpriseAccountEntity/enterprise/${eid}/enterpriseAccountEntity`,
                    values
                );
                message.success(resp.headers.get('x-hpx-alert'))
                const res = resp.json();     
            }catch(e){
                message.error(e)
            }          
        }
    }

    getProv(){
        (async ()=>{
            try{
                const resp = await getReq('/core/core/api/v1/enterpriseAccountEntity/provinces');
                const res = await resp.json();
                this.setState({
                    prov : res
                })
                console.log(this.props)
            }catch(e){
                
            }
            
        })()
    }


    getCity(value){
        (async ()=>{
            const provCode = value
            try{
                const resp = await getReq(`/core/core/api/v1/enterpriseAccountEntity/provinces/${provCode}/city`);
                const res = await resp.json();
                this.setState({
                    city : res
                })
                this.props.form.resetFields(['bankCity','bankCountry','bankName'])
            }catch(e){
                
            }
            
        })()
    }

    getCountry(e){
        (async ()=>{
            console.log(this.props)
            let citycode = e;
            try{
                let resp = await getReq(`/core/core/api/v1/enterpriseAccountEntity/provinces/${citycode}/country`);
                let res = await resp.json();
                this.setState({
                    country : res
                })
                this.props.form.resetFields(['bankCountry','bankName'])
            }catch(e){
                
            }
            
        })()
    }

    getBank(){
        (async ()=>{
            try{
                let resp = await getReq('/core/core/api/v1/enterpriseAccountEntity/banks');
                let res = await resp.json();
                console.log(res)
                this.setState({
                    bank : res
                })
            }catch(e){
                
            }
            
        })()
    }

    getBankde(ev,type){
        (async ()=>{
            const bankCode = 'bankCode';
            const country = 'bankCountry';
            let bankclscode,citycode;
            bankclscode = this.props.form.getFieldValue(bankCode);
            citycode = this.props.form.getFieldValue(country);
            try{
                if(type === 'country'){
                    citycode = ev;
                    if(!bankclscode)return
                }else if(type === 'bankCode'){
                    bankclscode = ev;
                    if(!citycode)return
                }

                bankclscode = bankclscode.substring(0,3);
                citycode = citycode.substring(0,4);
                let resp = await getReq(`/core/core/api/v1/enterpriseAccountEntity/banks/${bankclscode}/city/${citycode}/bankinfo/`);
                let res = await resp.json();
                console.log(res)
                this.setState({
                    bankde : res
                })
                this.props.form.resetFields(['bankName'])
            }catch(e){
                console.log(e)
            }
            
        })()
    }

    

    componentDidMount(){
        this.getProv()
        this.getBank();
    }

    render(){
        const { isEdite ,prov ,city ,country ,bank ,bankde} = this.state;
        const { isAllEdite } = this.props;
        const { getFieldDecorator} = this.props.form;
        const view = <Form>
            <Card title='银行账户' 
                extra={ 
                        <EditeTableCion 
                            isEdite={this.state.isEdite} 
                            editeDone={()=>this.editeDone(3)}
                            edite={()=>this.edite()} /> 
                         
                        }
            >
                <Row>
                <Col span={12}>            
                    <FormItem
                        key='bankProvince'
                        label= '省份'
                        {...formItemLayout}
                    >
                    {getFieldDecorator('bankProvince',requireRule)
                    (  
                        <Select 
                            disabled={ !isEdite } 
                            onChange={(value)=>this.getCity(value)}
                            placeholder='请选择省份'
                            allowClear >
                            {prov.map((v,i)=>{
                                return <Option key={v.nodeNodecode}>{v.nodeNodename}</Option>
                            })}
                        </Select>

                    )
                    }
                    </FormItem>
                    <FormItem
                        key='bankCity'
                        label= '城市'
                        {...formItemLayout}
                    >
                    {getFieldDecorator('bankCity',requireRule)
                    (
                        <Select 
                            disabled={ !isEdite } 
                            onChange={(ev)=>this.getCountry(ev)}
                            placeholder='请选择城市' 
                            allowClear>
                            {city.map((v,i)=>{
                                return <Option  key={v.cityAreacode}>{v.cityAreaname}</Option>
                            })}
                        </Select>
                        )
                    }
                    </FormItem>
                    <FormItem
                        key='bankCountry'
                        label= '县区'
                        {...formItemLayout}
                    >
                    {getFieldDecorator('bankCountry',requireRule)
                    (
                        <Select 
                            disabled={ !isEdite } 
                            onChange={(ev)=>this.getBankde(ev,'country')}
                            placeholder='请选择县区'
                            allowClear>
                            {country.map((v,i)=>{
                                return <Option key={v.cityAreacode}>{v.cityAreaname}</Option>
                            })}
                        </Select>
                        )
                    }
                    </FormItem>
                    <FormItem
                        key='bankCode'
                        label= '银行'
                        {...formItemLayout}
                    >
                    {getFieldDecorator('bankCode',requireRule)
                    (
                        <Select
                        disabled={ !isEdite } 
                        onChange={(ev)=>this.getBankde(ev,'bankCode')}
                        placeholder='请选择银行'
                        allowClear>
                            {bank.map((v,i)=>{
                                return <Option key={i} value={v.sbankcode}>{v.bankname}</Option>
                            })}
                        </Select>
                        )
                    }
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        key='bankName'
                        label= '开户行'
                        {...formItemLayout}
                    >
                    {getFieldDecorator('bankName',requireRule)
                    (
                        <Select 
                            mode="combobox" 
                            disabled={ !isEdite || !bank.length || !country.length }
                            placeholder='请选择支行'
                            allowClear>
                            {bankde.map((v,i)=>{
                                return <Option key={v.bankno} value={v.bankname}>{v.bankname}</Option>
                            })}
                        </Select>
                        )
                    }
                    </FormItem>
                    <FormItem
                        key='accountName'
                        label= '开户名'
                        {...formItemLayout}
                    >
                    {getFieldDecorator('accountName',requireRule)
                        (
                            <Input disabled={!isEdite} placeholder='请输入开户名' />
                        )
                    }
                    </FormItem>
                    <FormItem
                        key='bankAccount'
                        label= '银行账户'
                        {...formItemLayout}
                    >
                    {
                        isEdite ?
                        getFieldDecorator('bankAccount',{
                        rules :[requireRule.rules[0]]
                        })
                        (
                            <Input type='number' disabled={!isEdite} placeholder='请输入银行账户' />
                        )
                        :
                        <div className='acc-text-span'>{this.props.fields.bankAccount.value}</div>
                    }
                    </FormItem>
   
                    <FormItem
                        key='remark'
                        label= '描述'
                        {...formItemLayout}
                    >
                    {   
                        isEdite ?
                        getFieldDecorator('remark')
                        (
                            <Input disabled={!isEdite} placeholder='请输入描述'/>
                        )
                        :
                        <div className='acc-text-span'>{this.props.fields.remark.value ? this.props.fields.remark.value : ''}</div>
                    }
                    </FormItem>              
                </Col>
                </Row>
            </Card>
        </Form>;
        return view
    }
}

const WrapForm = Form.create({
    mapPropsToFields : (props)=>{
        const fields = {...props.fields}
        return fields
    }
})(BankInfoForm)

class BankInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formData : {
                "accountName": {
                    value : null
                },
                "bankAccount": {
                    value : null
                },
                "bankCity": {
                    value : null
                },
                "bankCode": {
                    value : null
                },
                "bankCountry": {
                    value : null
                },
                "bankName": {
                    value : null
                },
                "bankProvince": {
                    value : null
                },
                "remark": {
                    value : null
                },
            }
        }
    }

    updateState = (values) => {
        console.log(values)
        let data = {};
        for(let key of Object.keys(values)){
            data[key] = {
                value : values[key] ? values[key] : ''
            };
        }
        console.log(data)
        this.setState({
            formData : data
        })
    }

    componentDidMount(){

    }

    render(){
        return (
            <div>
                <WrapForm
                fields={this.state.formData}
                eid={this.props.eid}
                isAllEdite={this.props.isAllEdite}
                updateState={this.updateState}
                 />
            </div>
        )
    }
}

export default BankInfo

