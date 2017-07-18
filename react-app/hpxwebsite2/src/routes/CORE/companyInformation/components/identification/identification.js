import React from 'react'
import { Form, Input, Button,message,Timeline,Modal,InputNumber} from 'antd';
import { getReq , putReq ,patchReq } from '../../../../../core/fetch'
import './identification.css'

const FormItem = Form.Item;


class MoneyForm extends React.Component{

    onOk = () => {
        const self = this;
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.props.visb(values)
            }
        }) 
    }

    render (){
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 12},
        };
        return <Form layout='horizontal' className='acc-input-money'>
                    <FormItem
                        label="金额确定"
                        hasFeedback
                        {...formItemLayout}
                        style={{marginTop:24,marginBottom:24,paddingBottom:18}}
                    >
                        {this.props.form.getFieldDecorator('val',
                            { rules : [{ required: true, message: '请输入收到的金额!' }]}
                        )(
                            <InputNumber />
                        )}
                    </FormItem>
                    <div style={{textAlign:'right',paddingLeft:50}}><Button type='primary' onClick={this.onOk}>确定金额</Button></div>
                </Form>;
    }
}

const WrapMoneyForm = Form.create()(MoneyForm)

class Identification extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            visible : true,

            //审核状态
            authStatus:{
                time : null,
                status : null,
                text : null,
            },

        };

        //API
        this.statusUrl = `/core/core/api/v1/enterprise/${this.props.eid}/authenticateProcess`;
    }


    certainMoey = () => {
        this.setState({
            visible:false
        })
    }

    visible = () => {
        this.setState({
            visible : true,
        })
    }

    visb = (money) => {
        (
            async () => {
                try{
                    console.log(money)
                    const resp = patchReq(`/core`+`/core/api/v1/enterpriseAccountEntity/enterprise/${this.props.eid}/checkAccount?val=${money.val}`);
                    if(resp.ok){
                        this.setState({
                            visible:true
                        })
                    }

                }catch(e){

                }

            }
        )() 
    } 

    fetchStatus = () => {
        (async ()=>{
           try{
                const resp = getReq(this.statusUrl);

            }catch(e){

            }
        })()

    }

    test = ()=>{
        (async ()=>{
            try{
                const resp = await putReq(this.statusUrl);
                if(resp.ok){
                    const resp2 = await getReq(this.statusUrl)
                    message.info('已提交，请等待审核!')
                }
            }catch(e){

            }
            
        })()
    }

    componentDidMount(){
        
    }

    render(){
        const { visible } = this.state;

        const view = <div>

            {<Button onClick={this.test}>提交审核</Button>}

            <div style={{width:400,margin:'0 auto'}}>
                <Timeline>
                    <Timeline.Item>
                        <span className='process-time'>2015-15-16-12-5656</span>
                        <span className='process-connent'>当前节点</span>
                        <div style={{height:20}}></div>
                    </Timeline.Item>
                     <Timeline.Item>
                        <span className='process-time'>2015-15-16-12-5656</span>
                        <span className='process-connent'>当前节点</span>
                        <div style={{height:20}}></div>
                    </Timeline.Item>
                     <Timeline.Item>
                        <span className='process-time'>2015-15-16-12-5656</span>
                        <span className='process-connent'>当前节点</span>
                        <div style={{height:20}}></div>
                    </Timeline.Item>
                </Timeline>
                
            </div>
            <div style={{textAlign:'center'}}>
                <Button type='primary' onClick={()=>this.certainMoey()}>企业认证</Button>
            </div>
            
            {/*<div>
                <h4>请在是放松放松放松放松放松放松</h4>
                <ol>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li><li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                </ol>
                <div>
                    <h5>邮寄地址</h5>
                    <span>邮寄地址</span>
                </div>
            </div>*/}
            <Modal
                visible={!visible}
                title='企业认证'
                footer={null}
                onCancel={this.visible}
            >   
                <WrapMoneyForm 
                    visb={this.visb}
                />
            </Modal>
        </div>;
        return view
    }
}

export default Identification