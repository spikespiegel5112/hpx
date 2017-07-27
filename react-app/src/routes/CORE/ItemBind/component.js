import React from 'React'
import { Row , Col , Button , Card , Form ,Input ,Icon } from 'antd'
import CardTitle from '../../../components/CardTitle'

import { formPostReq } from '../../../core/fetch'

class ItemBindForm extends React.Component{

    sendItemCode(){
        const sureSend = (errors,values)=>{
            if(!errors){
                
            }
        }
        this.props.form.validateFields(sureSend)
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formStyle = {
            width : 400,
            textAlign : 'center'
        };
        const tSyle = {
            marginBottom : 50
        }
        const InputStyle = {
            width : 200,
            magin : '0 auto'
        }
        return(

            <Form onSubmit={this.sendItemCode} style={formStyle}>
                <h4 style={tSyle}>
                    请输入项目ID,快读匹配项目
                </h4>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入项目ID!' }],
                    })(
                        <Input style={InputStyle} prefix={<Icon type="info-circle-o" />} placeholder="请输入项目ID" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button style={InputStyle} type='primary' htmlType='submit'>确定</Button>
                </Form.Item>
            </Form>
        )
    }
}

const WarpItemBind = Form.create()(ItemBindForm);

class ItemBind extends React.Component{
    render(){
        const CardStyle = {
            transform : 'translateY(40%)',
            WebkitTransform : 'translateY(40%)',
        }
        return (
            <Row type='flex' justify='center'>
                <Col style={CardStyle}>
                    <Card
                    title={<CardTitle title='绑定项目' />}>

                        <WarpItemBind />

                    </Card>
                </Col>
            </Row>
            
        )
    }
}

export default ItemBind