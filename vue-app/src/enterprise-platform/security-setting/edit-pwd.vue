<template>
    <div class="edit-pwd">
        <el-card class="box-card">
            <div slot="header" class="clearfix card-title">
                <span >修改密码</span>
                <el-button style="float: right;margin: 8px 8px 0 0;" type="text">取消</el-button>
            </div>
            <el-form :model="pwdForm" ref="pwdForm" :rules="rules" label-width="100px" class="pwdForm">
                <el-form-item label="旧密码" prop="oldPwd">
                    <el-input type="password" v-model="pwdForm.oldPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input type="password" v-model="pwdForm.newPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmPwd">
                    <el-input type="password" v-model="pwdForm.confirmPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 50%;" type="primary" @click="submitForm('pwdForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { mapState , mapActions } from 'vuex';
import { changePwd } from '@/api/coreApi';
import { checkPassword } from '../../config/mUtils';
export default {
    data() {
        var checkNewPwd = (rule, value, callback) => {
            const res = checkPassword(value);
            if (value === '') {
                callback(new Error('请输入密码！'));
            } else if (!res) {
                callback(new Error('请输入6到16位的密码，需包含数字，字母，符号中两种！'));
            } else {
                callback();
            }
        }
        var checkConfirmPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码！'));
            } else if (value !== this.pwdForm.newPwd) {
                callback(new Error('两次输入密码不一致！'));
            } else {
                callback();
            }
        }
        return {
            pwdForm: {
                oldPwd: '',
                newPwd: '',
                confirmPwd: '',
            },
            rules: {
                oldPwd: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                ],
                newPwd: [
                    { validator: checkNewPwd, required: true, trigger: 'blur' },
                ],
                confirmPwd: [
                    { validator: checkConfirmPwd, required: true, trigger: 'blur' },
                ],
            }
        };
    },
    computed : {
        ...mapState(['isLogin']),
    },
    methods: {
        async subPwd() {
            const resp = await changePwd(this.pwdForm.oldPwd, this.pwdForm.newPwd);
            if (resp.status === 200) {
                return true;
            } else {
                return false;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const isOk = this.subPwd();
                    isOk.then(status => {
                        if (status) {
                            this.$message({
                                message: "修改密码成功！",
                                type: 'success'
                            })
                            this.$store.dispatch('revisePsw')
                            this.$router.push('/')
                        } else {
                            this.$message.error('修改密码失败！');
                        }
                    })

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

<style scope>
.pwdForm {
    margin-top: 20px;
    width: 80%;
}

.edit-pwd {
    width: 50%;
    margin: 0 auto;
}

.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.clearfix {
    height: 20px;
    font-size: 14px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.card-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    margin-left: 8px;
}

.box-card {
    width: 100%;
    box-shadow: none;
    transition: box-shadow .5s;
}

.box-card:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: box-shadow .5s;
}
</style>