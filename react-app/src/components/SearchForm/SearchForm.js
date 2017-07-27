import React , { Component } from 'react'
import { browserHistory } from 'react-router'
import 
{
Row,
Col,
Form, 
Input, 
InputNumber,
DatePicker,
Select,
Button,
Icon,
} from 'antd'

import moment from 'moment'
import './searchForm.css'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const PropTypes = React.PropTypes;
class WrapItem extends Component{

    constructor(props){
        super(props)
        this.formItemLayout = {
            labelCol: { span: 5  },
            wrapperCol: { span: 16},
        };
    }

    /*  检验规则
    **  @params text 提示信息 必选项的label
    */
    rules = (text)=>({
        rules : [
            { required: true, message: `${text}是必填项!`},
        ]
    })

    render(){
        const { dataKey , label , children ,isRequire ,getFieldDecorator} = this.props;
        return (
            <Col span={6}>
                <FormItem
                    key={dataKey}
                    label={label}
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        dataKey,
                        isRequire ? this.rules(label) : {},
                    )(
                        children
                    )}               
                </FormItem>
            </Col>
        )
    }
}

class SearchForm extends Component{

    static propTypes = {
        options : PropTypes.array
    }

    constructor(props){
        super(props);
        this.formDate = 'YYYY/MM/DD';
    };

    formPost = (e)=>{
        e.preventDefault();
        const self = this
        this.props.form.validateFields(
            (err,values)=>{
                if(!err){
                    const { options } = this.props;
                    let params = {...values};
                    for (let [key,value] of Object.entries(params)){
                        if(value && typeof value === 'object' && !value.length){
                            params[key] = value.format(self.formDate);
                        }
                    }
                    console.log(params)
                    this.props.submit(params)
                    this.props.bindData(values)
                }
            }
        )
    }

    clearParams = ()=>{
        this.props.form.resetFields()
    }

    add = ()=>{
        browserHistory.push(this.props.addLink)
    }

    render(){
        const { options , loading , add , addLink } = this.props;
        // 搜索框布局
        const len = options.length;
        let offsetLen = 6 * (3 - (len%4));
        const { getFieldDecorator } = this.props.form;
        const view  = options.map((value,index)=>{
            const isRequire = value.isRequire ? true : false;
            let tmp = null;
             switch(value.type){
                case 'text':
                    tmp = <WrapItem
                            label={value.label}
                            key={`search::${index}`}
                            isRequire={isRequire}
                            dataKey={value.key}
                            getFieldDecorator={getFieldDecorator}
                        >
                            <Input size="large" />
                        </WrapItem>
                break;
                case 'number':
                    tmp = <WrapItem
                            label={value.label}
                            key={`search::${index}`}
                            isRequire={isRequire}
                            dataKey={value.key}
                            getFieldDecorator={getFieldDecorator}
                        >
                            <InputNumber size="large" />
                        </WrapItem>
                break;
                case 'select':
                    tmp = <WrapItem
                            label={value.label}
                            key={`search::${index}`}
                            isRequire={isRequire}
                            dataKey={value.key}
                            getFieldDecorator={getFieldDecorator}
                        >
                            <Select size="large">
                                    {value.data.map((v,index)=>{
                                        return <Option key={`options::${index}`} value={v.key}>{v.value}</Option>
                                    })}
                            </Select>
                        </WrapItem>
                break;
                case 'date':
                     tmp = <WrapItem 
                            label={value.label} 
                            key={`search::${index}`}
                            isRequire={isRequire}
                            dataKey={value.key}
                            getFieldDecorator={getFieldDecorator}
                        >
                            <DatePicker size="large" />
                        </WrapItem>
                break;
                case 'range':
                     tmp = <WrapItem 
                            label={value.label} 
                            key={`search::${index}`}
                            isRequire={isRequire}
                            dataKey={value.key}
                            getFieldDecorator={getFieldDecorator}
                        >
                            <RangePicker size="large" />
                        </WrapItem>
                break;
                default:
                        tmp = <WrapItem
                            label={value.label}
                            key={`search::${index}`}
                            isRequire={isRequire}
                            dataKey={value.key}
                            getFieldDecorator={getFieldDecorator}
                        >
                            <Input size="large" />
                        </WrapItem>

            };
            return tmp;
        });

        return  <Form onSubmit={this.formPost}>
                    <Row>
                        {view}
                        <Col className='search-table-action' span={6} offset={offsetLen}>             
                            <Button htmlType='submit' type='primary' size='large' loading={loading} style={ add ? null : {marginLeft:'20%'} }>
                                <Icon type="search"/> 搜索
                            </Button>
                            <Button type='default' size='large' onClick={this.clearParams}>
                                <Icon type="cross"/> 清空
                            </Button>
                            {
                               add ?      
                                <Button type='default' size='large' onClick={this.add}  style={{color:'#108ee9'}}>
                                    <Icon type="plus-circle"/> 新增
                                </Button>
                                :
                                null
                            }
                        </Col>  
                    </Row>
                </Form>         

    }
};

const options = {

    mapPropsToFields(props) {

        const { fields } = props;
        // const { options } = props
        // const dateFields = options.filter((v)=>{return v.type==='date'})
        // dateFields.forEach((v,i)=>{
        //     fields[v.key].value = fields[v.key].value ? moment(fields[v.key].value) : null; 
        // })
        console.log(fields)
        return fields

    },
}

const WrapSearch = Form.create(options)(SearchForm)

class Search extends Component{
    constructor(props){
        super(props)
        const { options } = props;
        let obj = {};
        for (let v of Object.values(options)){
            obj[v.key]= {
                value : ''
            }
        };

        this.state = {
            fields : obj
        }
    }

    bindData = (data)=>{

        let fields = {};
        for (let [key,v] of Object.entries(data)){
            fields[key]= {
                value :v
            }
        };

        this.setState({
            fields
        })
    }

    render(){
        const { options , submit, add , addLink , loading} = this.props
        return <section className='search-section'>
                    <WrapSearch
                    options={options}
                    fields={this.state.fields}
                    submit={submit}
                    bindData={this.bindData}
                    loading={loading}
                    add={add}
                    addLink={addLink}
                    />
                </section>
    }
}

export default Search

