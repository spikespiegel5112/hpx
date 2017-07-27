import React from 'react'
import { Link } from 'react-router'
import {Row , Col , Form, Icon, Input, Button, message } from 'antd';
import { singIn } from '../../modules/login'
import { getReq ,formPostReq } from '../../core/fetch'
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      codeSrc : '/core' +'/core/api/v1/getKaptchaImage'
    }
  }

  componentWillMount(){
    
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
    
  }

  getStrCode(){
    this.setState({
      codeSrc : '/core' +`/core/api/v1/getKaptchaImage?v=${new Date().getTime()}`
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.signIn(values);
      }   
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.signInErr){
      message.error(nextProps.signInErr);
      this.props.clearSignInErr();
    }
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div style={{padding:30,width:'400px',margin:'50px auto',background:'#fff'}}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        {/*<FormItem>
          <Row gutter={32}>
            <Col span={16}>
              {getFieldDecorator('strCode', {
                rules: [{ required: true, message: '请输入验证码!' }],
              })(
                <Input placeholder='请输入验证码' size='large' />
              )}
            </Col>
            <Col span={8}>
                <a href='javascript:void(0)'><img 
                  src={this.state.codeSrc} 
                  onClick={()=>this.getStrCode()} 
                  style={{height: 32}}/>
                </a>
                <span className='spanSp' onClick={()=>this.getStrCode()}>看不清</span>
            </Col>
          </Row>
            
        </FormItem>*/}
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{width:'100%'}}
          >
            登录
          </Button>
          <Link className='spanSp' to='/register' style={{fontSize:12}}>现在就去注册</Link>
          <Link className='spanSp' to="/missing_pwd" style={{float:'right'}}>忘记密码</Link>
        </FormItem>
      </Form> 
      </div>
    );
  }
}

const LoginFrom = Form.create({
  onFieldsChange (props, changedFields) {
    // props.onChange(changedFields);
  },
  mapPropsToFields (props) {
    return {
      userName: {
        value:props.userName
      },
      password: {
        value:props.password
      },
      loginErr: {
        value:props.loginErr
      },
      strCode : {
        value : props.strCode
      }
    }
  },
  onValuesChange (_, values) {
    // console.log(values);
  },
})(HorizontalLoginForm);

class Login extends React.Component{
      constructor(props){
        super(props)
      }
      render(){
        return <div>
          <LoginFrom
          {...this.props.login}
          signIn={this.props.signIn} 
          clearSignInErr={this.props.clearSignInErr}
           />
        </div>
      }
}

export default Login