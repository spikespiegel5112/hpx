<template>
    <section class="main-pagination">
            <el-pagination
            :current-page="pagination.page"
            :page-size="pagination.size"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="pageSizes"
            @current-change="currentChange"
            @size-change="pageSizeChange"
        >
        </el-pagination>
    </section>
</template>
<script>
export default {
    data(){
        return{
            pagination:{
                page : 1,
                size : 10
            },
            pageSizes : [10,15,20]
        }
    },
    props : ["total"],
    created (){
        this.$emit('pageChange',this.pagination)
    },
    methods : {
        currentChange(page){
            this.pagination.page = page;
        },
        pageSizeChange(size){
            this.pagination.size = size;
        }
    },
    watch : {
        pagination : {
            handler : function(){
                this.$emit('pageChange',this.pagination)
            },
            deep:true
        }
    }
}
</script>
<style>

</style>
