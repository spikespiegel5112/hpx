<template>
    <div> 
        <section class="up-section">
            <div class="cer-steps">  
                <cer-steps></cer-steps>
            </div> 
        </section>
        <section class="main-section cer-main">
            <el-tabs type="card">
                <el-tab-pane v-for="(item,i) in tabs" :key="i">
                    <span slot="label"><i :class="item.icon"></i> {{item.title}}</span>
                     <template v-if="i === 0">
                        <info-tab></info-tab>
                    </template>
                    <template v-else-if="i === 1">
                        test1
                    </template>
                    <template v-else-if="i === 2">
                        test2
                    </template>
                    <template v-else-if="i === 3">
                        tetst3
                    </template>     
                </el-tab-pane>
            </el-tabs>
        </section>
    </div>  
</template>
<script>
    // 步骤条
    import cerSteps from './cer-steps';
    // 基本信息填写
    import infoTab from './infoTab';
    export default {
        data() {
            return {
                tabs : [
                    {
                        title: "基本信息",
                        icon : "el-icon-information"
                    },{
                        title: "银行账户",
                        icon : "el-icon-menu",
                    },{
                        title: "文件上传",
                        icon : "el-icon-upload",
                    },{
                        title: "企业认证",
                        icon : "el-icon-plus",
                    }
                ]
            }
        },
        components : {
            cerSteps,
            infoTab
        }
    }
</script>
<style scope>
    .cer-steps>.is-horizontal{
        padding-left:16.6%;
    }
    .cer-steps .is-horizontal:last-child{
        width:auto!important;
    }
    .cer-main .el-tabs__item{
        padding:0 30px;
    }
</style>


