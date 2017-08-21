<template>
<div class="fillcontain">
	<head-top></head-top>
	<el-tabs type="border-card">
		<el-tab-pane label="正常结束">
            <transition name="el-fade-in">
                <el-table v-show="normalEndListFlag" row-key="id" :empty-text="emptyText" :data="normalEndList" v-loading="listLoading" highlight-current-row style="width: 100%">
                    <el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
                    </el-table-column>
                </el-table>
            </transition>
			<section class="main-pagination">
				<el-pagination @current-change="flipPage1" :current-page="pagination1.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination1.total">
				</el-pagination>
			</section>
		</el-tab-pane>
		<!--<el-tab-pane label="异常结束">
			<el-table row-key="id" :empty-text="emptyText" :data="abnormalEndList" v-loading="listLoading" highlight-current-row style="width: 100%">
				<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
				</el-table-column>
				<el-table-column label="操作" width='200'>
					<template scope="scope">
						<el-button type="text" size="small" @click="dealWithInvite(scope, 'T')">接受</el-button>
						<el-button type="text" size="small" @click="dealWithInvite(scope, 'F')">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>

			<section class="main-pagination">
				<el-pagination @current-change="flipPage2" :current-page="pagination2.page" :page-sizes="[10,20]" layout="total, sizes, prev, pager, next, jumper" :total="pagination2.total">
				</el-pagination>
			</section>
		</el-tab-pane>-->
	</el-tabs>
</div>
</template>
<script>
import headTop from '@/components/headTop'
import moment from 'moment'
import {
	enterpriseListRequest,
	projectListRequest,
	enterpriseRolesListRequest,
	modifyProjectInvitStatusRequest
} from '@/api/enterpriseApi'
import {
    getProjectList
} from '@/api/getData'
import {
	addProjectRequest,
	pjCapitalListRequest,
	capitalApply
} from '@/api/coreApi'
import {
	mapState,
	mapActions
} from 'vuex';
export default {
	components: {
		headTop
	},
	data() {
		const dateFormat = "YYYY-MM-DD";
		return {
			inviteData: {
				eid: '',
				pid: '',
				enterpriseRole: ''
			},
			dealWithInviteData: {
				eid: '',
				pid: '',
				inviteStatus: ''
			},
			rules: {
				eid: [{
					required: true,
					message: '请选择企业名称'
				}],
				enterpriseRole: [{
					required: true,
					message: '请选择企业角色'
				}]
			},
			//table
            normalEndListFlag: false,
			normalEndList: [],
			normalEndListTotal: 0, //总数
			abnormalEndList: [],
			abnormalEndListTotal: 0, //总数
			listLoading: false,
			//分页信息
			pagination1: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
			pagination2: {
				params: {
					page: 1,
					size: 10
				},
				total: 0
			},
			emptyText: "暂无数据",
			inviteEnterpriseFlag: false,
			// 授信
			creditVisble: false,
			creditData: {
				capitalList: [],
			},
			creditRules: {

			},
			capitalSelection: [],
			//table columns
			columns: [{
				label: '产品编码',
				prop: 'productCode',
				sortable: true,
				minWidth: 50,
			}, {
				label: '项目名称',
				prop: 'name',
				sortable: true,
				minWidth: 70,
			}, {
				label: '备注',
				prop: 'remark',
				sortable: true,
			}, {
				label: '项目起始日',
				prop: 'startTime',
				sortable: true,
				minWidth: 60,
				formatter: (row, column) => {
					return row.startTime != null ? moment(row.startTime).format(dateFormat) : ''
				}
			}, {
				label: '项目结束日',
				prop: 'endTime',
				sortable: true,
				minWidth: 60,
				formatter: (row, column) => {
					return row.endTime != null ? moment(row.endTime).format(dateFormat) : ''
				}
			}],

		}
	},
	activated() {
		this.initData();
	},
	methods: {
		...mapActions(['getCurrentProjectId']),
		initData() {
			this.getList1();
		},
		getList1() {
            this.normalEndListFlag=false;
			let options = {
				params: {
                    state: 'E'
                }
			}
			options.params = Object.assign(options.params, this.pagination1.params);
			console.log(options);
			getProjectList(options).then(response => {
				this.pagination1.total = Number(response.headers.get('x-total-count'))
				response.json().then(result => {
					console.log(result);
					this.normalEndList = result;
					this.normalEndListFlag=true;
				})
			})
		},
        getList2() {
			let that = this;
			let options = {
				params: {
					state: 'F'
				}
			}
			options.params = Object.assign(options.params, this.pagination1.params);
			projectListRequest(options).then(response => {
				this.pagination2.total = Number(response.headers.get('x-total-count'))
				console.log(response);
				response.json().then(result => {

					this.abnormalEndList = [];
					for (var item in result) {
						that.abnormalEndList.push(result[item]);
					}
                    console.log(that.abnormalEndList);
				})
			})
		},

		flipPage1(pageIndex) {
			this.pagination1.params.page = pageIndex;
			this.getList1();
		},
        flipPage2(pageIndex) {
			this.pagination2.params.page = pageIndex;
			this.getList2();
		},

	}
}
</script>
