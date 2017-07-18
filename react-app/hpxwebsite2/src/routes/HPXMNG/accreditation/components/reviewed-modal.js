
import React, {Component} from 'react'
import {Modal, Form, Input, Radio, Select, Checkbox} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

class RoleModal extends Component {

    constructor(props) {
        super(props)
    }

    handleCancel() {
        this.props.onCancel()
    }

    handleOk() {

        this.props.form.validateFields((err, values) => {
            if (err) return
            console.log(values)
            this.props.onOk(values)

        })

    }
    
    handleAfterClose() {
        this.props.form.resetFields()
    }

    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }

    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
        console.log(Date.now())

        setTimeout(() => {

            let now = Date.now()
            if (now % 2 === 1) {
                console.log('0')
                callback()
            } else {
                console.log('1')
                callback(new Error('自定义验证函数未通过'))
            }

        }, 1000)

    }

    render() {

        const {visible, form, confirmLoading} = this.props
        const {getFieldDecorator} = form

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <Modal
                visible={visible}
                title="审核确定"
                okText="确定"
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
            >
                <Form layout='horizontal'>
                    <h6 style={{marginBottom:30}}>请确定企业资料审核通过,在下方填写审核说明</h6>
                    <FormItem
                        label="审核说明"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('nodes')(
                            <Input type='textarea' />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

RoleModal.propTypes = {}

export default Form.create()(RoleModal)
