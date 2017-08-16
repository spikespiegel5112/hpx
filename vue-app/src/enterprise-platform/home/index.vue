<template>
<div>
	<head-top></head-top>
	<el-row class="paltform-home-container" :gutter="24">
		<el-col :span="9">
			<el-card>
				<div slot="header" class="card-header">
					<span>基本信息</span>
					<el-button type="text" class="p-home-action">
						<router-link to="/platform/certification">详细信息</router-link>
					</el-button>
				</div>
				<dl class="home-base-info">
					<dd>企业名称&nbsp;:&nbsp;</dd>
					<dt>{{loginInfo.enterpriseName}}&nbsp;<el-tag type="success">已认证</el-tag></dt>
					<dd>参与项目&nbsp;:&nbsp;</dd>
					<dt><el-tag type="primary">{{totalPj}}个</el-tag></dt>
					<dd>上次登录时间&nbsp;:&nbsp;</dd>
					<dt>{{lastLoginTime}}</dt>
				</dl>
			</el-card>
		</el-col>
		<el-col :span="8">
			<el-card>
				<div slot="header" class="card-header">
					<span>代办事宜({{upcomingList.length}})</span>
					<el-button type="text" class="p-home-action">
						<router-link to="/platform/certification">详细信息</router-link>
					</el-button>
				</div>
				<dl class="home-base-info">
					<dd>公司名称 ：</dd>
					<dt>{{loginInfo.name}}&nbsp;<el-tag type="success">已认证</el-tag></dt>
					<dd>参与项目 ：</dd>
					<dt>6</dt>
					<dd>账户余额 ：</dd>
					<dt>100,000.00元</dt>
				</dl>
			</el-card>
		</el-col>
		<el-col :span="7">
			<el-card>
				<div slot="header" class="card-header">
					<span>新闻公告</span>
					<el-button type="text" class="p-home-action">
						<router-link :to="{name:'noticeList'}">详细信息</router-link>
					</el-button>
				</div>
				<ul>
					<li v-for="elem in noticeList" :key="elem.key">
						<router-link class='common_carditemtitle_item' :to="{ name: 'noticeEdit', params: { noticeId: 'review&'+elem.id}}">{{elem.title}}</router-link>
					</li>
				</ul>
			</el-card>
		</el-col>
		<el-col :span="17">
			<el-card>
				<div slot="header" class="card-header">
					<span>我的项目</span>
					<el-button type="text" class="p-home-action">
						<router-link to="/platform/project">更多项目</router-link>
					</el-button>
				</div>
				<ul v-if='!noProjects' class="home-project-list">
					<li class="ellipsis" v-for="(item,i) in projectList" :key="i+''" @click="toProject(item)">
						{{item.projectName}}
					</li>
				</ul>
				<ul v-else>
					暂无激活项目
				</ul>
			</el-card>
		</el-col>
	</el-row>
</div>
</template>

<script>
import headTop from '@/components/headTop';
import {
	projectListRequest
} from '@/api/enterpriseApi';
import {
	getUpcomingList
} from '@/api/coreApi'
import {
	noticeListRequest
} from '@/api/noticeApi';
import {
	mapState,
	mapActions
} from 'vuex';
import moment from 'moment'
export default {
	components: {
		headTop
	},
	data() {
		return {
			projectList: [],
			noProjects: false,
			totalPj: 0,
			upcomingList: [],
			noticeList: [],

		}
	},
	activated() {
		this.showUpcomingList()
		this.getNoticeList();
		this.initProjectList()
	},
	deactivated() {
		this.projectList = [];
	},
	computed: {
		...mapState(['loginInfo']),
		lastLoginTime() {
			return moment(this.loginInfo.latestLoginTime).format('YYYY-MM-DD hh:mm:ss')
		}
	},
	methods: {
		...mapActions(['getCurrentProjectId']),
		initProjectList() {
			let options = {
				params: {
					eid: this.loginInfo.enterpriseId,
					page: 1,
					size: 6,
					projectState: 'R'
				}
			}
			console.log(options)
			projectListRequest(options).then(response => {
				response.json().then(result => {
					console.log(result)
					this.projectList = result;
					if (result.length == 0) {
						this.noProjects = true;
					}
					this.totalPj = this.projectList.length;
				})
			})
		},
		toProject(item) {
			console.log(item.state)
			if (item.projectState == 'R') {
				this.getCurrentProjectId(item.pjId);
				this.$router.push({
					path: `/porderf/${item.pjId}/demander`
				})
			} else {
				this.$message.error('当前项目未激活')
			}
		},
		getNoticeList() {
			let options = {
				params: {
					size: 7,
					page: 1
				}
			}
			noticeListRequest(options).then(response => {
				response.json().then(result => {
					this.noticeList = result;
				})
			})
		},
		async showUpcomingList() {
			try {
				console.log(6)
				const resp = await getUpcomingList(this.loginInfo.id);
				const res = await resp.json();
			} catch (e) {

			}
		}
	}
}
</script>

<style lang="less" scoped>
.paltform-home-container > div {
    margin-top: 10px;

}
.paltform-home-container .el-card {
    min-height: 250px;
}
.p-home-action {
    float: right;
    margin-top: -5px;
}
.paltform-home-container .card-header {
    background: #fff;
}
.home-project-list {
    li {
        background: #58B7FF;
        float: left;
        color: #fff;
        margin: 10px 20px;
        padding: 0 50px;
        width: 80px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        z-index: 666;
        -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    }
}
dl.home-base-info {
    dd {
        float: left;
        width: 110px;
        height: 50px;
        line-height: 50px;
        text-align: right;
    }
    dt {
        margin-left: 120px;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
    }
}
</style>
