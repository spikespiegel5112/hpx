import React from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { keccak_256 } from 'js-sha3';
import { Link } from 'react-router'
import fetch, { formRequest, formPostReq, jsonRequest }  from '../../../core/fetch';

// import f from 'font-awesome/css/font-awesome.css';
import { Button , Checkbox  } from 'antd'

import './Register.css';

import Input from '../../../core/Input';

import {checkEmail,checkPassword,checkPhone} from '../../../core/util.js';
import config from './config.js';

import { message } from 'antd'

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.urlB = 'http://10.38.8.93:9000'
    this.state = {
      checkoutActive: false,
      loginStatus: false, // normal,http
      errmessage: '', // http err
      smsButton: {
        disabled: false,
        msg: '发送验证码',
      },
      companyName: {
        value: '企业全称',
        errmessage: '',
        default: '',
        placeholder: '企业全称',
      },
      email: {
        value: '用户名/邮箱',
        errmessage: '',
        default: '',
        placeholder: '用户名/邮箱',
      },
      inviteCode:{
        value:'如有请填写',
        errmessage:'',
        // default:'邀请码已通过短信或邮件的形式发送至企业联系人',
        placeholder:'如有请填写'
      },
      messageCode:{
        value:'请输入短信验证码',
        errmessage:'',
        // default:'短信验证码已通过短信或邮件的形式发送至企业联系人',
        placeholder:'请输入短信验证码'
      },
      password: {
        value: '请输入密码',
        errmessage: '',
        default: '',
        placeholder: '请输入密码',
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
        // src: '/tpm/user/random_code',
        src: '/core/core/api/v1/getKaptchaImage',
        placeholder:'验证码'
      },
    }

    this.updateImgChange = this.updateImgChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.companyNameChange = this.companyNameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordOkChange = this.passwordOkChange.bind(this);
    this.mobileChange = this.mobileChange.bind(this);
    this.codeChange = this.codeChange.bind(this);
    this.messageCodeChange = this.messageCodeChange.bind(this);
    this.submit = this.submit.bind(this);
    this.checkoutChange = this.checkoutChange.bind(this);
    this.sendSms = this.sendSms.bind(this);
    this.validate = this.validate.bind(this);

  }

  updateImgChange() {
    this.setState({
      code: {
        ...this.state.code,
        src: '/core'+`/core/api/v1/getKaptchaImage?v=${new Date().getTime()}`,
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
      case 'messageCode': this.messageCodeChange(event, this.state.messageCode.placeholder);
      break;
    }
  }

  inviteCodeChange(event, placeholder) {
    let value = event.target.value;
    let errmessage = '';
    if(!value || value == placeholder ) {
      errmessage = '请输入邀请码';
    }
    this.setState(
      {
        inviteCode:{
          ...this.state.inviteCode,
          value:value,
          errmessage: errmessage
        }
      }
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

  emailChange(event, placeholder) {
    let value = event.target.value;
    let errmessage = '';
    if (!value || value == placeholder ) {
      errmessage = '请输入用户名/邮箱';
    }
    this.setState(
      {
        email: {
          ...this.state.email,
          value: value,
          errmessage: errmessage
        }
      }
    );
  }

  companyNameChange(event, placeholder) {
    let value = event.target.value;
    let errmessage = '';
    if (!value || value == placeholder ) {
      errmessage = '请输入企业全称';
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

  async submit() {
    const self = this;
    self.emailChange({ target: self.state.email }, this.state.email.placeholder);
    self.passwordChange({ target: self.state.password }, this.state.password.placeholder);
    self.passwordOkChange({ target: self.state.passwordOk }, this.state.passwordOk.placeholder);
    self.companyNameChange({ target: self.state.companyName }, this.state.companyName.placeholder);
    self.mobileChange({ target: self.state.mobile }, this.state.mobile.placeholder);
    self.codeChange({ target: self.state.code }, this.state.code.placeholder);
    self.messageCodeChange({ target: self.state.messageCode }, this.state.messageCode.placeholder);

    if (
      self.state.password.errmessage
      || self.state.passwordOk.errmessage
      || self.state.mobile.errmessage
      || self.state.code.errmessage
      || self.state.messageCode.errmessage) {
      return;
    }

    if (!this.state.checkoutActive) {
      self.setState({ errmessage: '您还未接受注册协议' });
      return;
    }

    try{
      self.setState({ loginStatus: true, errmessage: '' });
      let response =
          await formPostReq(
              '/core' +'/core/api/v1/enterprise/0/users',
            {
              password: self.state.password.value,
              phone: self.state.mobile.value,
              code: self.state.messageCode.value,
              strCode: self.state.code.value,
            },
          );
      if (response.ok) {
        document.styleSheets[0].insertRule('.gologin{color:#00c6ff;}', 0);
        document.styleSheets[0].insertRule('.gologin:hover{color:#05B4FF;text-decoration: underline !important;}', 0);
        // layer.msg('注册成功,<a class="gologin" href="/login.html">去登录</a>', { time: 20000, closeBtn: 0 });
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

  checkoutChange() {
    this.setState(
      {
        checkoutActive: !this.state.checkoutActive,
      },
    );
    if (!this.state.checkoutActive) {
      this.setState({ errmessage: '' });
    }
  }

  async sendSms() {
    this.setState({ errmessage: '' });
    const self = this;
    try{
      let response =
          await formPostReq(
              '/core'+'/core/api/v1/sms/registerSendSms',
            {
              strCode : self.state.code.value,
              phone: self.state.mobile.value,
            },
          );
          // localStorage.setItem('register-hpx',)
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
      message.error(e)
    }
    
  }

  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
 
  }

  componentDidMount() {
   
  }

  contanctTip() {
    console.log("heheh")
    layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['640px', '440px'], //宽高
            title:'协议',
            content:
                '<div style="padding: 24px 12px;">'+
                    '<h3 style="text-align: center">海平线平台注册协议</h3>'+
                    '<p>上海邻客网络科技有限公司(以下简称“公司”或“本公司”)通过其合法运营的海平线网站(网址: www.haipingx.com以下简称“网站”或“平台”）为平台注册用户（以下简称“用户”或“用户单位”）提供服务。平台注册协议，是平台与平台注册用户就该服务相关事项所订立的有效合约。用户通过网络页面点击确认或以其他方式选择接受本协议并完成全部注册程序后，即表示用户与海平线网站已达成协议并同意接受本协议的全部约定内容, 接受与本协议有关的各项规则及海平线网站所包含的其他与本协议或本协议项下各项规则的条款有关的各项定。 如果用户不同意本协议的任一内容，或者无法准确理解海平线网站对条款的解释，请不要进行后续操作。</p>'+
                    '<h4>一、用户</h4>'+
                        '<h5>1、海平线网站的用户均为企业用户，是指通过海平线网站完成全部注册程序后，使用海平线网站服务，并且依据中华人民共和国法律在境内（不含香港、澳门特别行政区和台湾地区）设立的具有完全民事权利和民事行为能力，能够独立承担民事责任的法人和其他组织。</h5>'+
                        '<h5>2、用户保证及承诺以下事项：</h5>'+
                            '<h6>（1）用户必须依海平线网站要求提供真实、最新、有效及完整的资料，并且授予海平线网站基于提供网站服务的目的对其提供的资料及数据信息拥有永久的、免费的使用权利。</h6>'+
                            '<h6>（2）用户有义务维持并更新注册的用户资料，确保其为真实、最新、有效及完整。若用户提供任何错误、虚假、过时或不完整的资料，或者海平线网站依其独立判断怀疑资料为错误、虚假、过时或不完整，海平线网站有权暂停或终止用户在海平线网站的注册账号，并拒绝用户使用海平线网站服务的部分或全部功能。在此情况下，海平线网站不承担任何责任，用户同意承担因此所产生的直接或间接的任何支出或损失。</h6>'+
                            '<h6>（3）用户保证并承诺通过海平线网站进行交易的资产和资金来源合法。</h6>'+
                            '<h6>（4）用户承诺，其通过海平线网站发布的信息均真实有效，其向海平线网站提交的任何资料均真实、有效、完整、准确。如因违背上述承诺，造成海平线网站损失的，用户将承担相应责任。</h6>'+
                            '<h6>（5）用户同意，海平线网站有权在提供网站服务过程中以各种方式投放商业性广告或其他任何类型的商业信息，并且用户同意接受海平线网站通过电子邮件、手机短信或其他方式向用户发送商业信息。</h6>'+
                            '<h6>（6）用户不得私自仿制、伪造在网站上签订的电子合同或印章，不得用伪造的合同进行诈骗或进行其他非法使用，否则由用户自行承担责任。</h6>'+
                    '<h4>二、网站服务</h4>'+
                        '<h5>1、海平线网站服务内容主要包括订单管理、交易信息发布、融资信息发布、居间撮合服务、为用户之间订立合同提供媒介服务以及其他客户服务等。交易各方的交易内容和风险应由各方自行承担。</h5>'+
                        '<h5>2、海平线网站通过网站（网址： www.haipingx.com）及各类网络终端为用户提供本合同约定的服务，该服务及平台系统由上海邻客网络科技有限公司运营管理。</h5>'+
                        '<h5>3、海平线网站对于用户的通知及任何其他的协议、告示，用户同意海平线网站通过网站公告、电子邮件、手机短信、站内通知等电子方式或常规的信件传递等方式进行，该等通知于发送之日视为已送达收件人。因信息传输等原因导致用户未在前述通知发出当日收到该等通知的，海平线网站不承担责任。</h5>'+
                        '<h5>4、在海平线网站交易需订立的合同采用电子合同方式。用户使用注册用户名登录海平线网站后，根据海平线网站的相关规则或有关合同约定，在网站通过点击确认或约定方式签订的电子合同，即视为用户单位真实意思表示并以用户单位名义签订的合同，具有法律效力。用户应妥善保管自己的注册用户名和密码等注册信息，用户通过前述方式订立的电子合同对合同各方具有法律约束力，用户不得以其注册用户名和密码等注册信息被盗用或其他理由否认已订立的合同的效力或不按照该等合同履行相关义务。</h5>'+
                        '<h5>5、用户根据本协议、网站的相关规则或有关合同约定签订电子合同后，不得擅自修改该合同。海平线网站向用户提供电子合同的备案、查看服务。如对此有任何争议，应以海平线网站记录的合同为准。</h5>'+
                        '<h5>6、在不违反适用法律的强制性规定的前提下，海平线网站提供的服务有可能会发生变更或者增加。一旦本服务协议的内容发生变动，海平线网站将通过网站公布最新的注册协议或服务协议，不再向用户作个别通知。如用户不同意海平线网站对本协议所做的修改，用户有权停止使用海平线网站服务。如果用户继续使用海平线网站服务，即表示同意接受经修订的协议和规则。如新旧规则或协议之间冲突或矛盾的，除另行明确声明外，以最新修订的协议和规则为准。</h5>'+
                    '<h4>三、风险提示</h4>'+
                        '<h5>1、用户知晓并同意，任何通过海平线网站进行的交易并不能避免以下风险的产生，海平线网站不能也没有义务为如下风险负责：</h5>'+
                            '<h6>（1）政策风险：有关法律、法规及相关政策、规则发生变化，可能引起相关等方面异常情况，用户有可能遭受损失。</h6>'+
                            '<h6>（2）不可抗力因素导致的风险。</h6>'+
                            '<h6>（3）因用户的过错导致的任何损失，该过错包括但不限于：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失。</h6>'+
                        '<h5>2、海平线网站不对任何用户及/或任何交易提供任何明示或默示的担保。交易平台向用户提供的各种信息及资料仅为参考，用户应依其独立判断做出决策。用户据此进行交易的，产生的风险由用户自行承担，用户无权据此向海平线网站提出任何法律主张。在交易过程中，交易各方发生的纠纷，平台协调解决，但交易平台不承担任何责任。</h5>'+
                        '<h5>3、以上并不能揭示用户通过海平线网站进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关交易，谨慎决策，并自行承担全部风险。</h5>'+
                    '<h4>四、服务费用</h4>'+
                        '<h5>当用户使用海平线网站服务时，海平线网站会向部分用户收取相关服务费用。各项服务费用详见网站上公布的《海平线网站费用及其他规则》。海平线网站保留单方面制定及调整服务费用的权利。</h5>'+
                    '<h4>五、用户安全及管理</h4>'+
                        '<h5>1、用户知晓并同意，确保平台注册用户名及密码的机密安全是用户的责任。用户将对利用该注册用户名及密码所进行的一切行动及言论，负完全的责任，并同意以下事项：</h5>'+
                            '<h6>（1）用户不对其他任何人泄露注册用户名或密码，亦不可使用其他任何人的海平线网站注册用户名或密码。因黑客、病毒或用户的保管疏忽等非海平线网站原因导致用户的注册用户名遭他人非法使用的，海平线网站不承担任何责任。</h6>'+
                            '<h6>（2）海平线网站通过用户的注册用户名及密码来识别用户的指令，用户确认，使用平台注册用户名和密码登录后在海平线网站的一切行为均代表用户单位同意。平台注册用户名操作所产生的电子信息记录均为用户行为的有效凭据，并由用户单位承担由此产生的全部责任。</h6>'+
                            '<h6>（3）冒用他人注册用户名及密码的，海平线网站及其合法授权主体保留追究实际使用人连带责任的权利。</h6>'+
                        '<h5>2、用户如发现有第三方冒用或盗用平台注册用户名及密码，或其他任何未经合法授权的情形，应立即以有效方式通知海平线网站，要求海平线网站暂停相关服务，否则由此产生的一切责任由用户单位承担。同时，用户理解海平线网站对用户的请求采取行动需要合理期限，在此之前，海平线网站对第三方使用该服务所导致的损失不承担任何责任。</h5>'+
                        '<h5>3、用户决定不再使用注册用户名时，应向海平线网站申请注销该注册用户名。注册用户名被注销后，用户与海平线网站基于本协议的合同关系终止，海平线网站没有义务为用户保留或向用户披露注册用户中的任何信息，但海平线网站仍有权继续使用该用户在接受网站服务期间发布的所有信息。海平线网站也没有义务向用户或第三方转发任何用户未曾阅读或发送过的信息。</h5>'+
                        '<h5>用户理解并同意，用户与海平线网站的合同关系终止后：</h5>'+
                            '<h6>（1）海平线网站有权继续保存用户的资料。 </h6>'+
                            '<h6>（2）用户在使用服务期间存在违法行为或违反本协议和/或规则的行为的，海平线网站仍可依据本协议向用户主张权利。 </h6>'+
                            '<h6>（3）用户在使用服务期间因使用服务与其他用户之间发生的关系，不因本协议的终止而终止，其他用户仍有权向用户主张权利，用户应继续按用户的承诺履行义务。</h6>'+
                    '<h4>六、用户的守法义务</h4>'+
                        '<h5>1、用户承诺绝不为任何非法目的或以任何非法方式使用海平线网站服务，并承诺遵守中华人民共和国相关法律、法规及一切使用互联网之行业惯例、国际惯例，遵守所有与海平线网站服务有关的网络协议、规则。</h5>'+
                        '<h5>2、在接受海平线网站服务的过程中，用户承诺不从事下列行为：</h5>'+
                            '<h6>（1）发表、传送、传播、储存侵害他人知识产权、商业秘密权等合法权利的内容。</h6>'+
                            '<h6>（2）制造虚假身份、发布虚假信息等误导、欺骗他人，或违背海平线网站页面公布之交易规则、活动规则进行虚假交易。</h6>'+
                            '<h6>（3）进行危害计算机网络安全的行为。</h6>'+
                        '<h5>3、在使用海平线网站服务的过程中，用户承诺遵守以下约定：</h5>'+
                            '<h6>（1）在使用海平线网站服务过程中实施的所有行为均遵守国家法律、法规及海平线网站各项规则，不违背社会公共利益或公共道德，不损害他人的合法权益。</h6>'+
                            '<h6>（2）不发布国家禁止发布的信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。</h6>'+
                            '<h6>（3）不对海平线网站上的任何数据作商业性利用，包括但不限于在未经海平线网站事先书面同意的情况下，以复制、传播等任何方式使用海平线网站上展示的资料。</h6>'+
                        '<h5>4、用户了解并同意：</h5>'+
                            '<h6>（1）违反上述承诺时，海平线网站有权依据本协议的约定，做出相应处理或终止向用户提供服务，且无须征得用户的同意或提前通知该用户。</h6>'+
                            '<h6>（2）当用户的行为涉嫌违反法律法规或违反本协议和/或规则的，海平线网站有权采取相应措施，包括但不限于直接屏蔽、删除侵权信息，或直接停止提供服务。如使海平线网站遭受任何损失的（包括但不限于受到第三方的索赔、受到行政管理部门的处罚等），用户还应当赔偿或补偿海平线网站遭受的损失及（或）发生的费用，包括诉讼费、律师费、保全费等。</h6>'+
                        '<h5>5、用户同意，由于违反本协议，或违反其在平台上签订的协议或文件，或由于用户使用海平线网站服务违反了任何法律或第三方的权利而导致任何第三方向海平线网站提出的任何补偿申请或要求（包括律师费用），用户会对海平线网站给予全额补偿并使之不受损害。</h5>'+
                    '<h4>七、服务中断或故障</h4>'+
                        '<h5>用户同意，基于互联网的特殊性，海平线网站不担保服务不会中断，也不担保服务的及时性和/或安全性。系统因有关状况无法正常运作，使用户无法使用任何海平线网站服务或使用海平线网站服务受到任何影响时，海平线网站对用户或第三方不负任何责任，前述状况包括但不限于：</h5>'+
                            '<h6>1、海平线网站、网站的合格合作方系统停机维护期间。</h6>'+
                            '<h6>2、电信设备出现故障不能进行数据传输的。</h6>'+
                            '<h6>3、由于黑客攻击、网络供应商技术调整或故障、网站升级、银行方面的问题等原因而造成的海平线网站服务中断或延迟。</h6>'+
                            '<h6>4、因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成海平线网站系统障碍不能执行业务的。</h6>'+
                    '<h4>八、隐私权保护及授权条款</h4>'+
                        '<h5>1、海平线网站对于用户提供的、海平线网站自行收集的、经认证的信息将按照本协议予以保护、使用或者披露。未经海平线网站事先书面同意，用户不得转让其在本协议项下的任何权利和义务。</h5>'+
                        '<h5>2、为了维护用户和海平线网站其他用户的利益，用户同意授权海平线网站及其代理机构、建立业务合作关系的机构等，以便核对用户的注册信息等。</h5>'+
                        '<h5>3、海平线网站按照用户在平台上的行为自动追踪关于用户的某些资料。在不违法透露用户的隐私资料的前提下，海平线网站有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</h5>'+
                        '<h5>4、用户同意海平线网站可使用用户的相关资料（包括但不限于海平线网站持有的用户档案中的资料，海平线网站从用户目前及以前在海平线网站平台上的活动所获取的其他资料，以及海平线网站通过其他方式自行收集的资料）以解决争议、对纠纷进行调停。用户同意海平线网站可通过人工或自动程序对用户资料进行评价。</h5>'+
                        '<h5>5、海平线网站采用行业标准惯例以保护用户的资料。用户因履行本协议提供给海平线网站的信息，海平线网站不会恶意出售或共享给任何第三方，以下情况除外：</h5>'+
                            '<h6>（1）提供独立服务且仅要求服务相关的必要信息的供应商，如印刷厂、邮递公司等。</h6>'+
                            '<h6>（2）具有合法调阅信息权限并从合法渠道调阅信息的政府部门或其他机构，如公安机关、法院。</h6>'+
                            '<h6>（3）海平线网站的关联方。</h6>'+
                            '<h6>（4）协调处理与平台上用户之间交易相关的争议。</h6>'+
                        '<h5>6、海平线网站有义务根据有关法律要求向司法机关和政府部门提供用户的资料。在用户未能按照与海平线网站签订的服务协议或者与网站其他用户签订的协议等法律文本的约定履行自己应尽的义务时，海平线网站有权根据自己的判断，或者与该笔交易有关的其他用户的请求披露用户的信息资料，并做出评论。用户严重违反海平线网站相关规则的，海平线网站有权对用户提供的及海平线网站自行收集的用户信息和资料编辑入网站黑名单，并将该黑名单对第三方披露，且海平线网站有权将用户提交或海平线网站自行收集的用户资料和信息与任何第三方进行数据共享，由此可能造成的用户的任何损失，海平线网站不承担法律责任。</h5>'+
                    '<h4>九、知识产权声明</h4>'+
                        '<h5>海平线网站拥有网站内所有信息内容，包括但不限于文字、图片、软件、音频、视频等的版权。非经海平线网站书面同意，任何组织或个人都不得复制、打印和传播属于海平线网站的信息内容用于其他目的。网站所有的产品、技术及程序均属于海平线网站知识产权，未经海平线网站许可，任何人不得擅自使用（包括但不限于以非法的方式复制、传播、展示、下载等）。否则，海平线网站将依法追究其法律责任。</h5>'+
                    '<h4>十、条款的解释、法律适用及争端解决</h4>'+
                        '<h5>1、本协议是由用户与海平线网站共同签订的，适用于用户在海平线网站的全部活动。本协议内容包括但不限于协议正文条款皮及已经发布的或将来可能发布的各类规则，所有条款和规则为协议不可分割的一部分，与协议正文具有同等法律效力。</h5>'+
                        '<h5>2、本协议不涉及用户与海平线网站的其他用户之间，因网上交易而产生的法律关系及法律纠纷，但用户在此同意将全面接受并履行与海平线网站其他用户在平台签订的任何电子法律文本，并承诺按照该法律文本享有和（或）放弃相应的权利、承担和（或）豁免相应的义务。</h5>'+
                        '<h5>3、因本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。如无相关法律规定，可参照商业惯例和（或）行业习惯。</h5>'+
                        '<h5>4、因本协议产生的争议，应当协商解决，协商不成可向上海邻客网络科技有限公司所在地法院起诉。</h5>'+
                    '<h5 style="text-align:right">上海邻客网络科技有限公司</h5>'+
                    '<h5 style="text-align:right">协议版本：2016年12月13日</h5>'+
                '</div>'
        });
  }

  render() {
    let submitView = '';
    let errmessage = '';

    return (
      <div className='root'>
        <div className='registercontainer'>
          <div className='registertitle'>用户注册</div>
           <div className='inputContainer'>
            <div className='inputName'>手机号</div>
            <Input
              type="text" placeholder={this.state.mobile.placeholder} value={this.state.mobile.value}
              parentChange={this.parentChange.bind(this,'mobile',this.state.mobile.placeholder)}
            />
            <span>{this.state.mobile.errmessage || this.state.mobile.default}</span>
          </div>
           <div className={`clearfix`}>
            <div className='widthSpTe'>
              <div className='inputContainer'>
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
              <Button type='primary' style={{marginLeft:15}} onClick={this.sendSms} disabled={this.state.smsButton.disabled}>
                {this.state.smsButton.msg}
              </Button>
            </div>
          </div>
          <div className='inputContainer'>
            <div className='inputName'>邀请码</div>
            <Input type="text" placeholder={this.state.inviteCode.placeholder} value={this.state.inviteCode.value}
            parentChange={this.parentChange.bind(this, 'inviteCode', this.state.inviteCode.placeholder)} />
            <span>{this.state.inviteCode.errmessage || this.state.inviteCode.default}</span>
          </div>
          <div className='inputContainer'>
            <div className='inputName'>密码</div>
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

          <div className='protocol'>
            {/*<span className={`
                ${f['fa']}
                ${this.state.checkoutActive ? f['fa-check-square-o'] : f['fa-square-o']}`}
                onClick={()=>this.checkoutChange()}>
              </span>*/}
              <Checkbox onClick={this.checkoutChange}>     
                <span>我已阅读并同意</span>
              </Checkbox>
              <a className='protocolA' onClick={this.contanctTip}>《海平线平台注册协议》</a>

          </div>
          <Button type='primary' className='submitButton' onClick={this.submit} loading={this.state.loginStatus}>
            注册
          </Button>
          <div style={{marginTop : 10 }}>
              <Link  to='/login' style={{color : '#00c6ff'}}>已注册去登陆</Link>
          </div>
          <span className='errmessage'>{this.state.errmessage}</span>
        </div>
       </div>
    );
  }
}

export default Register




