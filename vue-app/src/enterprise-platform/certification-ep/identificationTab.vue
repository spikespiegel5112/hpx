<template>
    <div style="max-width:300px;margin:0 auto;margin-top:30px;">
        <el-steps :space="100" direction="vertical" :active="currentStatus" center finish-status="success">
            <el-step icon="message" v-if="!accStatusInfo.createTime" status="finish" title="完善信息" description="请完善信息后提交审核"></el-step>
            <template v-else>
                <el-step title="提交时间" :description="description1"></el-step>
                <el-step v-if="!accStatusInfo.updateTime" title="审核时间" description="尚未提交审核"></el-step>
                <template v-else>
                    <el-step title="审核时间" :status="accStatusInfo.authenticateStatus === 'F' ? 'error' : 'success'" :description="description2"></el-step>
                    <el-step v-if="!accStatusInfo.certificationTime" status="process" title="认证通过时间" description="尚未金额认证"></el-step>
                    <template v-else>
                        <el-step title="认证通过时间" :description="description3"></el-step>
                    </template>
                </template>
            </template>
        </el-steps>
        <div style="margin:50px 0 50px -30px;">
            <el-button type='primary' @click="submitAcc" 
                :disabled="accStatusInfo.authenticateStatus === 'P' || accStatusInfo.authenticateStatus === 'T' || accStatusInfo.authenticateStatus === 'A' "
            >提交认证</el-button>
            <el-button @click="accMoney"
                :disabled="accStatusInfo.authenticateStatus !== 'T'"
            >金额确认</el-button>
        </div>
        <el-dialog>

        </el-dialog>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
    import { applyReview , checkAccountM , getEnterpriseInfo , eidAccCountInfo} from '@/api/coreApi'
    export default {
        data(){
            return {

            }
        },
        computed : {
            ...mapState(['loginInfo','statusStep','accStatusInfo']),
            currentStatus(){
                return this.statusStep === 4 ? 3 : this.statusStep;
            },

            description1(){
                return moment(this.accStatusInfo.createTime).format('YYYY-MM-DD,hh:mm:ss')
            },
            description2(){
                return moment(this.accStatusInfo.updateTime).format('YYYY-MM-DD,hh:mm:ss')
            },
            description3(){
                return moment(this.accStatusInfo.certificationTime).format('YYYY-MM-DD,hh:mm:ss')
            }
        },
        methods : {
            async submitAcc(){
                this.$notify.info({
                    title: '消息', 
                    message: '相关信息填写不全,审核会被拒绝!',
                    offset: 300
                });
                const baseInfoRes = this.judgeBaseInfo();
                const bankAccoutRes = this.judgeBankAccount();
                baseInfoRes.then(
                    (response) => {
                       if(!response){
                           this.$alert('请查看基本信息是否完整或网络', '提示', {
                                confirmButtonText: '确定',
                                type:'warning'
                            });
                           return false;
                       }else{
                           bankAccoutRes.then(
                                async respg => {
                                    if(!respg){
                                        this.$alert('请查看银行账户信息是否完整或网络', '提示', {
                                            confirmButtonText: '确定',
                                            type:'warning'
                                        });
                                        return false;
                                    }else{
                                         try{
                                            const resp = await applyReview(this.loginInfo.enterpriseId);
                                            const msg = decodeURIComponent(resp.headers.get('x-hpx-alert'));
                                            this.$message.success(msg)
                                            this.$store.dispatch('getAccStatusInfo');
                                        }catch(e){
                                            this.$message.error(e)
                                        }
                                    }
                                }
                            )
                       }
                    }
                )
            },
            accMoney(){
                this.$prompt('请输入认证账户收到的金额,3次输错后账户将被锁定，解锁请联系海平线客服400-080-0880', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                    inputErrorMessage: '金额格式不正确'
                }).then(({ value }) => {
                    ( async () => {
                        try{
                            const resp = await checkAccountM(this.loginInfo.enterpriseId,value);
                            const msg = decodeURI(resp.headers.get('x-hpx-alert'));
                            this.$message.success(msg + '请重新登陆')
                            this.$store.dispatch('getAccStatusInfo');
                            this.$router.push({path:'/'}) 
                            
                        }catch(e){
                            this.$message.error(e)
                        }
                    })()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
            },
            // 判断是否可以提交审核 需要验证基本信息和账户信息
            async judgeBaseInfo(){
                try{
                    const resp = await getEnterpriseInfo(this.loginInfo.enterpriseId);
                    const res = await resp.json();
                    const { name , regDate , address , taxType} = res;
                    if(name && regDate && address && taxType){
                        return true;
                    }else{
                        return false;
                    }
                }catch(e){
                    return false
                }
            },
            async judgeBankAccount(){
                try{
                    const resp = await eidAccCountInfo(this.loginInfo.enterpriseId);
                    const res = await resp.json();
                    const { bankAccount } = res;
                    if(bankAccount){
                        return true;
                    }else{
                        return false;
                    }
                }catch(e){
                    return false;
                }
            }
        }
    }
</script>
<style>

</style>