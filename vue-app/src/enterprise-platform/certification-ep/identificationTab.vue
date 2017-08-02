<template>
    <div style="max-width:200px;margin:0 auto;margin-top:30px;">
        <el-steps :space="100" direction="vertical" :active="1" center>
            <el-step title="状态 1" description="ttttt"></el-step>
            <el-step title="状态 2" description="ttttt"></el-step>
            <el-step title="状态 3" description="ttttt"></el-step>
        </el-steps>
        <div style="margin-top:50px;margin-left:-30px;">
            <el-button type='primary' @click="submitAcc">提交审核</el-button>
            <el-button @click="accMoney">企业认证</el-button>
        </div>
        <el-dialog>

        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
        methods : {
            submitAcc(){
                this.$notify.info({
                    title: '消息', 
                    message: '相关信息填写不全,审核会被拒绝!',
                    offset: 300
                });
            },
            accMoney(){
                this.$prompt('请输入金额', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                    inputErrorMessage: '金额格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你输入的金额是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
            }
        }
    }
</script>
<style>

</style>