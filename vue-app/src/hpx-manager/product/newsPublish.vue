<template>
<div class='fillcontain'>
	<head-top></head-top>
	<div class="common_editor_wrapper">
		<VueEditor v-model='notice'></VueEditor>
	</div>
	<el-button type="primary" size="large" @click='publish'>发布</el-button>
</div>
</template>

<script type="text/javascript">
import {
	publishNoticeRequest
} from '@/api/noticeApi'
// import TinyMCE from 'assets/js/tinymce.min.js'
import headTop from '@/components/headTop'
import {
	VueEditor
} from 'vue2-editor'
import TinyMCE from 'tinymce-vue-2'
export default {
	components: {
		headTop,
		TinyMCE,
		VueEditor
	},
	data() {
		return {
			description: '',
			notice: ''
		}
	},
	activated() {
		//   Vue.component('tiny-mce', TinyMCE)
	},
	methods: {
		publish() {
			let body = {
                articleSource: 'string',
                content: this.notice,
                createTime: '2017-07-25',
                creator: 0,
                direction: 'string',
                endTime: '2017-07-25',
                enterpriseId: 0,
                id: 0,
                istop: '',
                modifiedBy: 0,
                modifiedTime: '2017-07-25',
                picPath: '',
                publishState: '',
                startTime: '2017-07-25',
                title: '',
                type: '',
                url:'',
			}
			publishNoticeRequest(body)
		}
	}

}
</script>
