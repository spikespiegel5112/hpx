
import React, {Component} from 'react'
import {Modal, Form, Input, Radio, Select, Checkbox , Upload ,Icon ,message} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

class RoleModal extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)

        this.state = {
            fileId : null,
        }

    }

    handleCancel() {
        this.props.onCancel()
    }

    handleOk() {

        this.props.form.validateFields((err, values) => {
            if (err) return
            const { fileId } = this.state;
            if(!fileId){
                message.error('请先上传文件或再点一次');
                return;
            }
            console.log(values)
            this.props.onOk(values , fileId)

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

    successUpload = (res)=>{
        console.log(res)
        const fileId = res.file.response
        this.setState({
            fileId
        })
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
                title="新建角色"
                okText="确定"
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
            >
                <Form layout='horizontal'>
                    <FormItem
                        key="1"
                        label="说明"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('description', {
                            initialValue: visible,
                        })(
                            <Input type="textarea" />
                        )}
                    </FormItem>
                    <FormItem
                    key="2"
                    {...formItemLayout}
                    label="文件"
                    extra=""
                    >
                    {getFieldDecorator('uploadimg')(
                        <Upload 
                        name="file" 
                        action="/core/core/api/v1/attachfiles" 
                        listType="picture-card"
                        withCredentials={true}
                        onChange={this.successUpload}
                        >
                            <div>
                            <Icon type="plus" />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                        </Upload>
                        
                    )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

RoleModal.propTypes = {}

export default Form.create()(RoleModal)
