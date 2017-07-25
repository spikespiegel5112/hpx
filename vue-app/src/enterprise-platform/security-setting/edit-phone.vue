<template>
    <div>
        <el-steps :space="500" :active="active" finish-status="success" class="step">
            <el-step title="验证身份"></el-step>
            <el-step title="修改手机号码"></el-step>
        </el-steps>
        <div class="old-code" v-if="oldSeen">
            <div class="old-code-title">手机验证码验证 &nbsp;&nbsp;&nbsp;&nbsp; 为确认是你本人操作，请完成以下验证</div>
            <el-form class="old-code-form" :model="oldForm" ref="oldForm" label-width="100px">
                <el-form-item
                    label="手机号码 :"
                    prop="phone"
                >
                    <span >{{oldForm.oldPhone}}</span>
                </el-form-item>
                <el-form-item
                    label="验证码"
                    prop="code"
                    :rules="[
                    { required: true, message: '请输入验证码！',  trigger: 'blur'}
                    ]"
                >
                    <el-col :span="6" style="margin-right: 10px;">
                        <el-input v-model="oldForm.code" auto-complete="off" ></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="sendOldCode" :disabled="oldForm.smsButton.disabled">{{oldForm.smsButton.msg}}</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitOld('oldForm')">确定</el-button>
                </el-form-item>
                </el-form>
        </div>
        <div class="old-code" v-if="newSeen">
            <div class="old-code-title">手机验证码验证 &nbsp;&nbsp;&nbsp;&nbsp; 为确认是你本人操作，请完成以下验证</div>
            <el-form class="old-code-form" :model="newForm" ref="newForm" :rules="newRules" label-width="100px">
                <el-form-item
                    label="新手机号码"
                    prop="newPhone"
                    v-model="newPhone"
                >
                    <el-col :span="6">
                        <el-input v-model="newForm.newPhone" auto-complete="off" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="验证码"
                    prop="code2"
                    :rules="[
                    { required: true, message: '请输入验证码！',  trigger: 'blur'},
                    ]"
                >
                    <el-col :span="6">
                        <el-input  v-model="newForm.code" auto-complete="off" ></el-input>
                    </el-col>
                     <el-col :span="4">
                        <el-button @click="sendNewCode" :disabled="newForm.smsButton.disabled">{{newForm.smsButton.msg}}</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitNew('newForm')">完成</el-button>
                </el-form-item>
                </el-form>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getOldCord, checkOldPhone, getNewCord, checkNewPhone } from '@/api/coreApi';
  import { checkPhone } from '../../config/mUtils'
  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
        if(!checkPhone) {
            callback(new Error('手机号格式错误'));
        } else {
            callback();
        }
      }
      return {
          oldSeen: true,
          newSeen: false,
          oldForm:{
            code:'',
            oldPhone: '',
            smsButton:{
                disabled: false,
                msg: '获取验证码'
            },
          },
          newForm:{
            code2:'',
            newPhone: '',
             smsButton:{
                disabled: false,
                msg: '获取验证码'
            },
          },
          newRules:{
              newPhone: [
                  {validator: validatePhone, trigger: 'blur'}
              ]
          },
        active: 0
      };
    },

    mounted(){
        const phone = this.loginInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.oldForm.oldPhone = phone;
    },
    computed : {
        ...mapState(["loginInfo"])
    },

    methods: {
      async sendOldCode() {
        const resp = await getOldCord(this.loginInfo.phone);
        if(resp.status === 200) {
            let start = 59;
            this.oldForm.smsButton = {
                ...this.oldForm.smsButton,
                disabled: true,
            }
            var stop = setInterval(
                () => {
                    if(start === 0) {
                        this.oldForm.smsButton = {
                            disabled: false,
                            msg: '获取验证码'
                        }
                        clearInterval(stop);
                        return;
                    }
                    this.oldForm.smsButton = {
                        disabled: true,
                        msg: `发送成功(${start}s)`
                    }
                    start--;
                },1000)
        }else {

        }
      },
      async sendNewCode() {
        const resp = await getNewCord(this.newForm.newPhone);
        if(resp.status === 200) {
            let start = 59;
            this.newForm.smsButton = {
                ...this.newForm.smsButton,
                disabled: true,
            }
            var stop = setInterval(
                () => {
                    if(start === 0) {
                        this.newForm.smsButton = {
                            disabled: false,
                            msg: '获取验证码'
                        }
                        clearInterval(stop);
                        return;
                    }
                    this.newForm.smsButton = {
                        disabled: true,
                        msg: `发送成功(${start}s)`
                    }
                    start--;
                },1000)
        }else {
            
        }
      },
      async subOldPhone() {
        const resp = await checkOldPhone( this.loginInfo.phone, this.oldForm.code);
        if(resp.status === 200) {
            return true;
        } else {
            return false;
        }
      },
      async subNewPhone() {
        const resp = await checkNewPhone( this.newForm.newPhone, this.newForm.code2);
        if(resp.status === 200) {
            return true;
        } else {
            return false;
        }
      },
      submitOld(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
               const oldOk = this.subOldPhone();
               oldOk.then(status => {
                   if(status) {
                      this.oldSeen = false;
                      this.newSeen = true;
                      if (this.active++ > 2) this.active = 0;
                   } else {
                       this.$message.error('验证失败！');
                   }
               })
            }
          });
      },
      submitNew(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
               const newOk = this.subNewPhone();
               newOk.then(status => {
                   if(status) {
                       this.$message({
                        message: "修改手机号码成功！",
                        type: 'success'
                      })
                      history.back();
                   } else {
                      this.$message.error('修改手机号码失败！');
                   }
               })
            }
          });
      }
    }
  }
</script>

<style>
    .step {
        width: 90%;
        margin: 0 auto;
    }

    .old-code {
        width: 80%;
        margin: 0 auto;
        margin-top: 80px;
    }

    .old-code-title {
        font-size: 14px;
        border-bottom: 1px solid #ccc;
        width: 100%;
        padding: 8px;
        margin-bottom: 50px;
    }

    .old-code-form {
        width: 100%;
        margin: 0 auto;
    }
</style>