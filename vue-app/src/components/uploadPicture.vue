<template>
    <ul class="el-upload-list el-upload-list--picture">
        <li class="el-upload-list__item is-ready el-list-enter-to">
            <a :href="thumbUrl" target="_blank" rel="noopener noreferrer">
                <img :src="thumbUrl" alt="" class="el-upload-list__item-thumbnail">
            </a>
            <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
                {{name}}
            </a>
            <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-check"></i>
            </label>
            <i class="el-icon-close" @click="remove"></i>
        </li>
    </ul>
</template>
<script>
export default {
    data : () => ({
        menuList : [],
        laoding : false,
    }),
    props : {
        index : {
            type:Number
        },
        thumbUrl:{
            type:String
        },
        name:{
            type:String
        },
        removeFile:{
            type:Function
        }
    },
    methods:{
        remove(){
            this.removeFile(this.index);
        }
    }
}
</script>

