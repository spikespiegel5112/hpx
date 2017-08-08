<template>
    <el-steps :active="statusStep" finish-status="finish">
        <el-step title="完善信息" description="请先完善必要的信息"></el-step>
        <el-step title="企业认证" description="提交认证，等待审核"></el-step>
        <el-step title="审核结果" :description="endDescription" :status="endStatus"></el-step>
        <el-step title="认证通过" description="恭喜你,认证通过"></el-step>
    </el-steps>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                endStatus : '',
                endDescription : '还未提交审核',
            }
        },
        computed : {
            ...mapState(['statusStep','accStatusInfo']),
        },
        methods : {
            showStatus(tmp){
                const status = tmp ? tmp.authenticateStatus : tmp;
                switch (status){
                    case 'P':
                    this.endStatus = 'finish';
                    this.endDescription = '企业审核通过';
                    break;
                    case 'F':
                    this.endStatus = 'error';
                    this.endDescription = '企业审核失败';
                    break;
                    case 'T':
                    this.endStatus = 'finish';
                    this.endDescription = '企业审核通过,金额认证';
                    break;
                    case 'A':
                    this.endStatus = 'process';
                    this.endDescription = '已提交,请等待审核';
                    break;
                    default:
                    this.endStatus = 'process';
                    this.endDescription = '还未提交审核';
                }
            }
        },
        watch : {
            accStatusInfo :function(newVal){
                this.showStatus(newVal)
            }

        }
    }
</script>
<style>
</style>
