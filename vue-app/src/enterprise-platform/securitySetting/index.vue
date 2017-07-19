<template>
    <div>
        <div class="title-out">
            <h5 class="title-text">安全设置</h5>
        </div>
        <div class='security-level'>
            <el-row>
                <el-col :span="6">
                    <span>您当前的账号安全程度</span>
                </el-col>
                <el-col :span="8">
                    <div class="security-progress-out">
                        <div :class="{'low': low , 'mid': mid, 'high': high}"></div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <span>安全级别</span>
                    <span>{{ low ? "低" : mid ? "中" : "高"}}</span>
                </el-col>
            </el-row>
        </div>
        <div>
            <ul class="safe-all">
                <li class="safe-items">
                    <h5 class="safe-title">登录密码</h5>
                    <p class="safe-text">安全性高的密码可以使账号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。</p>
                    <div class="safe-action">
                        <el-button type="text" size="small">已设置</el-button>
                        <el-button type="text" size="small" @click="editPwd()">修改</el-button>
                    </div>
                </li>
                <li class="safe-items">
                    <h5 class="safe-title">手机绑定</h5>
                    <p class="safe-text">您已绑定了手机 {{safeData.phone}} [ 您的手机为安全手机，可以找回密码 ]</p>
                    <div class="safe-action">
                        <el-button type="text" size="small">已设置</el-button>
                        <el-button type="text" size="small" @click="editPhone()">修改</el-button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            safeData: {
                phone:'',
            },
            low: false,
            mid: false,
            high: false,
        }
    },
    mounted(){
        const phone = this.loginInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.safeData.phone = phone;
        const email = this.loginInfo.email;
        email.length > 0 && phone.length > 0 ? this.high = true : this.mid = true;
    },
    computed : {
        ...mapState(["loginInfo"])
    },
    methods: {
        editPwd () {
            this.$router.push({path: this.$route.path + '/editPwd'})
        },
        editPhone () {
            this.$router.push({path: this.$route.path + '/editPhone'})
        },
    }
}
</script>

<style>
.title-out {
    border-bottom: 1px solid #DDD;
    padding: 16px 0px;
    min-height: 50px;
}

.title-text {
    display: inline-block;
    text-indent: 8px;
    border-left: 2px solid #88B7E0;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 8px;
    vertical-align: top;
}

.security-level {
    height: 50px;
    margin-top: 20px;
    padding-left: 10px;
    border: none;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
}

.security-level span {
    display: inline-block;
    margin-right: 20px;
}

.security-progress-out {
    width: 200px;
    height: 20px;
    border-radius: 4px;
    background-color: #f5f5f5;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
}

.low {
    height: 100%;
    border-radius: 4px 0 0 4px;
    background-color: red;
    width: 33%;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    transition: width 0.6s ease;
}

.mid {
    height: 100%;
    border-radius: 4px 0 0 4px;
    background-color: #f0ad4e;
    width: 67%;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    transition: width 0.6s ease;
}

.high {
    height: 100%;
    border-radius: 4px;
    background-color: green;
    width: 100%;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    transition: width 0.6s ease;
}

.security-table thead {
    display: none;
}

.security-table tbody tr {
    height: 100px;
    border-bottom: 1px dotted #ccc;
}

.safe-all {
    width: 100%;
}

.safe-items {
    width: 100%;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
    padding-top: 70px;
    padding-bottom: 70px;
}

.safe-title {
    float: left;
    text-align: center;
    width: 20%;
}

.safe-text {
    width: 60%;
    font-size: 12px;
    text-align: center;
}

.safe-action {
    margin-top: -18px;
    width: 20%;
    float: right;
    text-align: center;
    vertical-align: middle;
}

</style>

