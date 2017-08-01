<template>
<div class="fillcontain">
	<head-top></head-top>

	<section class="main-table-container">


	</section>
</div>
</template>

<script>
import headTop from '../../components/headTop'
import {
	templateReportDetailRequest,
} from '@/api/templateApi'
import moment from 'moment'
export default {
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {


		}
	},
	components: {
		headTop
	},
	mounted() {
		this.getReport();
	},
	methods: {
		getReport() {
			let params = {
				eid: this.$store.state.loginInfo.enterpriseId,
				id: this.$route.params.reportId
			}
			console.log(params);
			templateReportDetailRequest(params).then(response => {
				response.json().then(result=>{
					console.log(result);
				})
			})
		},
	}
}
</script>

<style lang="less">
@import '../../style/mixin';
.table_container {
    padding: 20px;
}
</style>
