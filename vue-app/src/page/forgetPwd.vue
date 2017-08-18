<template>
    <div class="forget-pwd">
        <div class="forget-pwd-container">
            <p class="forget-pwd-title">忘记密码</p>
            <div class="forget-pwd-form">
                <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="公司全称" prop="enterpriseName">
                        <el-input v-model="ruleForm.enterpriseName" placeholder="请输入所属公司全称"></el-input>
                    </el-form-item>
                    <el-form-item label="图片验证码" prop="strCode">
                        <el-input class="code" v-model="ruleForm.strCode" placeholder="验证码"></el-input>
                        <div style="float: right; display: inline-block; width: 49%;">
                            <img class='code-img' :src="strCode.src" />
                            <span class='code-text' @click="refreshPic">看不清</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="短信验证码" prop="code">
                        <el-input class=" code" v-model="ruleForm.code" placeholder="请输入短信验证码"></el-input>
                        <el-button type="primary" size="small" @click="smgCode" :disabled="smsButton.disabled">{{smsButton.msg}}</el-button>
                    </el-form-item>                   
                    <el-form-item label="新密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="passwordOk">
                        <el-input type="password" v-model="ruleForm.passwordOk" placeholder="请确认新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="sub-button">
                            <el-button type="primary" :disabled="subButton.disabled" @click="submitForm('ruleForm')">{{subButton.msg}}</el-button>
                            <el-button type="text" style="margin-left: 20px;" @click="back">返回登录</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { forgetPwdSmgCode, subForgetPwd } from '@/api/getData';
import myJS from '../config/mUtils';
import { checkPassword } from '../config/mUtils';

export default {
    data() {
        var checkPhone = (rule, value, callback) => {
            const checkPhone = myJS.checkType(value, 'phone');
            if (!value) {
                return callback(new Error('请输入手机号码'));
            } else if (!checkPhone) {
                return callback(new Error('手机号码格式不正确'))
            } else {
                callback();
            }
        };
        var checkPass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入密码'));
            } else if (!checkPassword(value)) {
                callback(new Error('密码需6到16位，需包含数字，字母，符号中两种'))
            } else {
                callback();
            }
        };
        var checkPassOk = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            labelPosition: 'right',
            strCode: {
                src: '/core/core/api/v1/getKaptchaImage',
            },
            smsButton: {
                disabled: false,
                msg: '发送短信验证码'
            },
            ruleForm: {
                phone: '',
                enterpriseName: '',
                strCode: '',
                code: '',
                password: '',
                passwordOk: '',
            },
            subButton : {
                msg: '修改',
                disabled: false
            },
            rules: {
                phone: [
                    { required: true, validator: checkPhone, trigger: 'blur' }
                ],
                strCode: [
                    { required: true, message: '请输入图片验证码', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入短信验证码', trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: checkPass, trigger: 'blur' }
                ],
                passwordOk: [
                    { required: true, validator: checkPassOk, trigger: 'blur' }
                ]
            },
        };
    },
    mounted() {

    },
    methods: {
        refreshPic() {
            this.strCode.src = `/core/core/api/v1/getKaptchaImage?v=${new Date().getTime()}`;
        },
        async smgCode() {
            try {
                const resp = await forgetPwdSmgCode(this.ruleForm.phone, this.ruleForm.strCode, this.ruleForm.enterpriseName);
                    let start = 59;
                    this.smsButton = {
                        ...this.smsButton,
                        disabled: true,
                    }
                    var stop = setInterval(
                        () => {
                            if (start === 0) {
                                this.smsButton = {
                                    disabled: false,
                                    msg: "发送短信验证码"
                                }
                                clearInterval(stop);
                                return;
                            }
                            this.smsButton = {
                                disabled: true,
                                msg: `发送成功(${start}s)`
                            }
                            start--;
                        }, 1000)
            } catch (e) {
                this.$message.error(e);
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        this.subButton = {
                            msg: '提交中...',
                            disabled: true
                        }
                        const resp = await subForgetPwd(this.ruleForm);
                        this.$message({
                            message: '修改密码成功，去登录！',
                            type: 'success'
                        });
                        this.$router.push('/')
                    } catch (e) {
                        this.$message.error(e);
                        this.subButton = {
                            msg: '修改',
                            disabled: false
                        }
                    }
                } else {
                    return false;
                }
            });
        },
        back(){
            this.$router.push('/');
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>
.forget-pwd {
    background-image: url("../assets/img/background.png");
    background-size: 100% 100%;
    padding-top: 50px;
    width: 100%;
    height: 100%;
}

.forget-pwd-container {
    width: 400px;
    height: 550px;
    margin: 0 auto;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    padding-top: 40px;
}

.forget-pwd-title {
    font-size: 18px;
    text-align: center;
}

.forget-pwd-form {
    padding: 30px 10px 10px 10px;
    width: 90%;
}

.forget-pwd-form .el-input__inner {
    background: transparent;
    border: none;
    border-radius: 0;
    color: #fff;
    border-bottom: 1px solid #fff;
}

.code {
    width: 51%;
}

.forget-pwd-form .el-form-item__label {
    color: #fff;
}

.code-img {
    cursor: pointer;
    margin-left: 16px;
    height: 29px;
    width: 82px;
    vertical-align: middle;
    border-radius: 4px;
    position: relative;
}

.code-text {
    font-size: 12px;
    color: #00c6ff !important;
    cursor: pointer;
    transform: scale(0.8);
    float: right;
    position: absolute;
    right: 16px;
    top: 25px;
}

.sub-button {
    /* margin-left: 50%; */
    /* transform: translateX(-10%); */
    margin-top: 30px;
}

.el-checkbox__label {
    font-size: 10px;
}
</style>

