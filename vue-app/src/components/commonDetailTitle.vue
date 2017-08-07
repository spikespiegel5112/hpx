<template>
<div class='common_detailtitle_item'>
    <router-link v-if="routerName" :to="{name:routerName, params:param} ">
        <span class='el-icon-arrow-left'></span>
        <label>返回</label>
    </router-link>
    <h3>{{title}}</h3>
</div>
</template>
<script>
export default {
    props: ['title', 'routerName', 'param']
}
</script>
