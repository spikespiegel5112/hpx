<template>
    <el-steps :active="1">
        <el-step 
            v-for="(item,i) in cerSteps"
            :key="i"
            :title="item.title"
            :description="item.description">
        </el-step>
    </el-steps>
</template>
<script>
    export default {
        data() {
            return {
                cerSteps : [
                    {
                        title : "完善信息",
                        description : "请先完善必要的信息"
                    },
                    {
                        title : "企业认证",
                        description : "提交认证，等待审核"
                    },
                    {
                        title : "审核结果",
                        description : "涛涛涛涛涛涛"
                    }
                ]
            }
        }
    }
</script>
<style>
</style>
