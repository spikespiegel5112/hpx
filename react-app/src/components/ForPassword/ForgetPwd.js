/**
 * haipingx
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from 'react-router'
import { Button , message} from 'antd'
import fetch, { formPostReq }  from '../../core/fetch';

import './ForgetPwd.css';

import Input from '../../core/Input';

import {checkEmail,checkPassword,checkPhone} from '../../core/util.js';

class ForgetPwd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkoutActive: false,
      loginStatus: false, // normal,http
      errmessage: '', // http err
      smsButton: {
        disabled: false,
        msg: '发送验证码',
      },
      companyName: {
        value: '请输入所属公司全称',
        errmessage: '',
        default: '',
        placeholder: '请输入所属公司全称',
      },
      messageCode:{
        value:'请输入短信验证码',
        errmessage:'',
        // default:'短信验证码已通过短信或邮件的形式发送至企业联系人',
        placeholder:'请输入短信验证码'
      },
      password: {
        value: '请输入新密码',
        errmessage: '',
        default: '',
        placeholder: '请输入新密码',
        type: 'text',
      },
      passwordOk: {
        value: '请确认密码',
        errmessage: '',
        default: '',
        placeholder: '请确认密码',
        type: 'text',
      },
      mobile: {
        value: '请输入手机号',
        errmessage: '',
        default: '',
        placeholder: '请输入手机号',
      },
      code:{
        value:'验证码',
        errmessage:'',
        default:'不区分大小写',
        src: '/core' +`/core/api/v1/getKaptchaImage`,
        placeholder:'验证码'
      },
    }

    this.updateImgChange = this.updateImgChange.bind(this);
    this.companyNameChange = this.companyNameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordOkChange = this.passwordOkChange.bind(this);
    this.mobileChange = this.mobileChange.bind(this);
    this.codeChange = this.codeChange.bind(this);
    this.messageCodeChange = this.messageCodeChange.bind(this);
    this.submit = this.submit.bind(this);
    this.sendSms = this.sendSms.bind(this);
    this.validate = this.validate.bind(this);
    
  }


  updateImgChange() {
    this.setState({
      code: {
        ...this.state.code,
        src: '/core' +`/core/api/v1/getKaptchaImage?v=${new Date().getTime()}`,
      },
    });
  }

  parentChange() {
    let hint = arguments[0];
    let placeholder = arguments[1];
    let value = arguments[2];
    let eventType = arguments[3];

    if(eventType == 'focus') {
      this.focus({hint:hint, placeholder:placeholder, value:value})
    } else if (eventType == 'blur') {
      this.blur({hint:hint, placeholder:placeholder, value:value})
    } else {
      this.setState(
        {
          [hint]:{
            ...this.state[hint],
            value:value,
          }
        }
      );
      this.validate(hint,value)
    }
  }

  validate(hint,value) {
    const event = { target: { value: value } };
    switch(hint) {
      case 'companyName': this.companyNameChange(event, this.state.companyName.placeholder);
      break;
      case 'email': this.emailChange(event, this.state.email.placeholder);
      break;
      case 'password': this.passwordChange(event, this.state.password.placeholder);
      break;
      case 'passwordOk': this.passwordOkChange(event, this.state.passwordOk.placeholder);
      break;
      case 'mobile': this.mobileChange(event, this.state.mobile.placeholder);
      break;
      case 'code': this.codeChange(event, this.state.code.placeholder);
      break;
    }
  }

  focus(ob) {
    let hint = ob.hint;
    let placeholder = ob.placeholder;
    let value = ob.value;
    if(value && value == placeholder) {
      if(hint == 'password' || hint == 'passwordOk') {
        this.setState(
          {
            [hint]:{
              ...this.state[hint],
              value:'',
              type:'password'
            }
          }
        )
      } else {
        this.setState(
          {
            [hint]:{
              ...this.state[hint],
              value:'',
            }
          }
        )
      }
    }
  }

  blur(ob) {
    let hint = ob.hint;
    let placeholder = ob.placeholder;
    let value = ob.value;
    if(!value) {
      this.setState(
        {
          [hint]:{
            ...this.state[hint],
            value:placeholder,
            type:'text'
          }
        }
      )
    }
  }

  companyNameChange(event, placeholder) {
    let value = event.target.value;
    let errmessage = '';
    if (!value || value == placeholder ) {
      errmessage = '请输入所属公司全称';
    }
    this.setState(
      {
        companyName: {
          ...this.state.companyName,
          value: value,
          errmessage: errmessage
        }
      }
    );
  }

  passwordChange(event, placeholder) {
    const value = event.target.value;
    let errmessage = '';
    if (!checkPassword(value)) {
      errmessage = '6-16位，需包含数字，字母，符号中的两种';
    }
    if (!value || value == placeholder ) {
      errmessage = '请输入密码';
    }
    this.setState(
      {
        password: {
          ...this.state.password,
          value,
          errmessage,
        },
      },
    );
  }

  passwordOkChange(event, placeholder) {
    const value = event.target.value;
    let errmessage = '';
    if (this.state.password.value != value) {
      errmessage = '密码不一致';
    }
    if (!value || value == placeholder ) {
      errmessage = '请输入确认密码';
    }
    this.setState(
      {
        passwordOk: {
          ...this.state.passwordOk,
          value,
          errmessage,
        },
      },
    );
  }

  mobileChange(event, placeholder) {
    const value = event.target.value;
    let errmessage = '';
    if (!checkPhone(value)) {
      errmessage = '手机号格式错误';
    }
    if (!value || value == placeholder ) {
      errmessage = '请输入手机号';
    }
    this.setState(
      {
        mobile: {
          ...this.state.mobile,
          value,
          errmessage,
        },
      },
    );
  }

  codeChange(event, placeholder) {
    const value = event.target.value;
    let errmessage = '';
    if (!value || value == placeholder ) {
      errmessage = '请输入验证码';
    }
    this.setState(
      {
        code: {
          ...this.state.code,
          value,
          errmessage,
        },
      },
    );
  }

  messageCodeChange(event, placeholder) {
    let value = event.target.value;
    let errmessage = '';
    if(!value || value == placeholder ) {
      errmessage = '请输入短信验证码';
    }
    this.setState(
      {
        messageCode:{
          ...this.state.messageCode,
          value:value,
          errmessage: errmessage 
        }
      }
    );
  }

  async submit() {
    const self = this;
    self.passwordChange({ target: self.state.password }, this.state.password.placeholder);
    self.passwordOkChange({ target: self.state.passwordOk }, this.state.passwordOk.placeholder);
    self.companyNameChange({ target: self.state.companyName }, this.state.companyName.placeholder);
    self.mobileChange({ target: self.state.mobile }, this.state.mobile.placeholder);
    self.codeChange({ target: self.state.code }, this.state.code.placeholder);
    self.messageCodeChange({ target: self.state.messageCode }, this.state.messageCode.placeholder);

    if (self.state.companyName.errmessage
      || self.state.password.errmessage
      || self.state.passwordOk.errmessage
      || self.state.mobile.errmessage
      || self.state.code.errmessage
      || self.state.messageCode.errmessage) {
      return;
    }

    try{

      self.setState({ loginStatus: true, errmessage: '' });
      let response =
        await formPostReq(
            '/core/core/api/v1/forgotPassword',
          {
            code: self.state.messageCode.value,
            password: self.state.password.value,
            phone: self.state.mobile.value,
            enterpriseName: self.state.companyName.value,
            strCode: self.state.code.value,
          },
        );
      if (response.ok) {
        let res = response.headers.get('x-hpx-alert');
        let msg = decodeURIComponent(res);
            message.success(msg);
        }
        self.setState({ loginStatus: false });
    }catch(e){
      let err = e ? e : '网路问题'
      message.error(err)
      self.setState({ errmessage: err});
      self.setState({ loginStatus: false });
    }
  }

  async sendSms() {
    this.setState({ errmessage: '' });
    const self = this;

    self.mobileChange({ target: self.state.mobile }, this.state.mobile.placeholder);
    self.companyNameChange({ target: self.state.companyName }, this.state.companyName.placeholder);
    self.codeChange({ target: self.state.code }, this.state.code.placeholder);

    try{
      let response =
          await formPostReq(
              '/core/core/api/v1/sms/forgotPasswordSendSms',
            {
              phone: self.state.mobile.value,
              enterpriseName : self.state.companyName.value,
              strCode : self.state.code.value
            },
          );
      if (response.ok) {
        let start = 59;
        self.setState({
          smsButton: {
            ...self.state.smsButton,
            disabled: true,
          },
        });
        var stop = setInterval(
                () => {
                  if (start == 0) {
                    self.setState({
                      smsButton: {
                        disabled: false,
                        msg: '发送验证码',
                      },
                    });
                    clearInterval(stop);
                    return;
                  }
                  self.setState({
                    smsButton: {
                      disabled: true,
                      msg: `发送成功(${start})`,
                    },
                  });
                  start--;
                }, 1000,
        );
      }
    }catch(e){
      // self.setState({ errmessage: e });
      message.error(e)
    }
  }

  componentWillMount () {

  }

  componentWillReceiveProps (nextProps) {

  }

  componentDidMount() {

  }

  render() {
    let errmessage = '';
    return (
      <div className='root'>
        <div className='pwd_container'>
          <div className='pwd_title'>忘记密码</div>
           <div className={'inputContainer'}>
            <div className='inputName'>手机号</div>
            <Input
              type="text" placeholder={this.state.mobile.placeholder} value={this.state.mobile.value} 
              parentChange={this.parentChange.bind(this,'mobile',this.state.mobile.placeholder)}
            />
            <span>{this.state.mobile.errmessage || this.state.mobile.default}</span>
          </div>
          <div className='inputContainer'>
            <div className='inputName'>公司全称</div>
            <Input
              type="text" placeholder={this.state.companyName.placeholder} value={this.state.companyName.value} 
              parentChange={this.parentChange.bind(this,'companyName',this.state.companyName.placeholder)}
            />
            <span>{this.state.companyName.errmessage || this.state.companyName.default}</span>
          </div>
           <div className='clearfix'>
            <div className='widthSpTe'>
              <div className={'inputContainer'}>
                <div className='inputName'>获取验证码</div>
                <Input type="text" placeholder={this.state.code.placeholder} value={this.state.code.value} 
                parentChange={this.parentChange.bind(this,'code', this.state.code.placeholder)} />
                <span>{this.state.code.errmessage || this.state.code.default}</span>
              </div>
            </div>
            <div className='widthSpBt'>
              <img className='codeImg' src={this.state.code.src} onClick={this.updateImgChange} />
              <span className='spanSp' onClick={this.updateImgChange}>看不清</span>
            </div>
          </div>
          <div className={`clearfix`}>
            <div className='widthSpTe'>
              <div className='inputContainer'>
                <div className='inputName'>短信验证码</div>
                <Input type="text" placeholder={this.state.messageCode.placeholder} value={this.state.messageCode.value} 
                parentChange={this.parentChange.bind(this,'messageCode', this.state.messageCode.placeholder)} />
                <span>{this.state.messageCode.errmessage || this.state.messageCode.default}</span>
              </div>
            </div>
            <div className='widthSpBt'>
              <button className='btn btn-default inputButton' onClick={this.sendSms} disabled={this.state.smsButton.disabled}>
                {this.state.smsButton.msg}
              </button>
            </div>
          </div>
          <div className='inputContainer'>
            <div className='inputName'>新密码</div>
            <Input
              type={this.state.password.type} placeholder={this.state.password.placeholder} value={this.state.password.value}
              parentChange={this.parentChange.bind(this,'password',this.state.password.placeholder)}
            />
            <span>{this.state.password.errmessage || this.state.password.default}</span>
          </div>
          <div className='inputContainer'>
            <div className='inputName'>确认密码</div>
            <Input
              type={this.state.passwordOk.type} placeholder={this.state.passwordOk.placeholder} value={this.state.passwordOk.value} 
              parentChange={this.parentChange.bind(this,'passwordOk',this.state.passwordOk.placeholder)}
            />
            <span>{this.state.passwordOk.errmessage || this.state.passwordOk.default}</span>
          </div>
          <Button type='primary' className='submitButton' onClick={this.submit} loading={this.state.loginStatus}>
            提交
          </Button>
          <div style={{marginTop:20,padding:10}}>
          <Link to='/login' style={{color:'#00c6ff'}}>登陆</Link>
          <Link to='/register' style={{float:'right',color:'#00c6ff'}}>注册</Link>
          </div>
        </div>
       </div>
    )
  }
}

export default ForgetPwd
