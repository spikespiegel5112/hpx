<template>
    <div class="register">
        <div class="register-container">
            <p class="register-title">用户注册</p>
            <div class="register-form">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
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
                    <el-form-item label=" 邀请码" prop="registerCode">
                        <el-input v-model="ruleForm.registerCode" placeholder="如有请填写"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="passwordOk">
                        <el-input type="password" v-model="ruleForm.passwordOk" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="checked" class="checked">
                        <el-checkbox size="small" style="color:#fff;" v-model="ruleForm.checked">我已阅读并同意</el-checkbox>
                        <a @click="agreementVisible=true">《海平线平台注册协议》</a>
                        <el-dialog title="海平线平台注册协议" :visible.sync="agreementVisible" size="tiny" >
                            <span>

                            </span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="agreementVisible = false">取 消</el-button>
                                <el-button type="primary" @click="agreementVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item>
                        <div class="sub-button">
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reSmgCode, subRegister } from '@/api/getData';
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
        var checkChecked = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('您还未接受注册协议'));
            } else {
                callback();
            }
        };
        return {
            agreementVisible: false,
            strCode: {
                src: '/core/core/api/v1/getKaptchaImage',
            },
            smsButton: {
                disabled: false,
                msg: '发送短信验证码'
            },
            ruleForm: {
                phone: '',
                strCode: '',
                code: '',
                registerCode: '',
                password: '',
                passwordOk: '',
                checked: false,
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
                ],
                checked: [
                    { required: true, validator: checkChecked, trigger: 'change' }
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
                const resp = await reSmgCode(this.ruleForm.phone, this.ruleForm.strCode);
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
        agreement() {

        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        const resp = await subRegister(this.ruleForm);
                        this.$message({
                            message: '注册成功，去登录！',
                            type: 'success'
                        });
                        this.$router.push('/')
                        location.reload()
                    } catch (e) {
                        this.$message.error(e);
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>
.register {
    background-image: url("../assets/img/background.png");
    background-size: 100% 100%;
    padding-top: 50px;
    width: 100%;
    height: 100%;
}

.register-container {
    width: 400px;
    height: 550px;
    margin: 0 auto;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    padding-top: 40px;
}

.register-title {
    font-size: 18px;
    text-align: center;
}

.register-form {
    padding: 30px 10px 10px 10px;
    width: 90%;
}


/*.el-input__inner input::input-placeholder {
    color: red;
}*/

.register-form .el-input__inner {
    background: transparent;
    border: none;
    border-radius: 0;
    color: #fff;
    border-bottom: 1px solid #fff;
}

.code {
    width: 51%;
}

.register-form .el-form-item__label {
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
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;
}

.checked {
    padding-left: 30px;
}

.el-checkbox__label {
    font-size: 10px;
}
</style>
