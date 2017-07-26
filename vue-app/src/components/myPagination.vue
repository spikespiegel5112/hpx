<template>
<section class="main-pagination">
	<el-pagination :current-page="this.pagination.page" :page-size="this.pagination.size" :total="this.total" layout="total, sizes, prev, pager, next, jumper" :page-sizes="pageSizes" @current-change="currentChange" @size-change="pageSizeChange">
	</el-pagination>
</section>
</template>
<script>
export default {
	data() {
		return {
			//分页
			pagination: {
				page: 1, //当前页
				size: 10, //每页个数
			},
			pageSizes: [10, 15, 20],
		}
	},
	props: ["callback", "total"],
	methods: {
		currentChange(page) {
			this.pagination.page = page;
			this.callback(this.pagination);
		},
		pageSizeChange(size) {
			this.pagination.size = size;
			this.callback(this.pagination);
		}
	}
}
</script>
<style>

</style>
