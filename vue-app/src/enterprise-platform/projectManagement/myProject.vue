<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-tabs type="border-card">
          <el-tab-pane label="我的项目">
              <el-table row-key="id" :empty-text="emptyText" :data="myProjectList" v-loading="listLoading" highlight-current-row style="width: 100%">
      			<!-- <el-table-column type="index" width="100"></el-table-column> -->

      			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
      			</el-table-column>
      			<el-table-column label="操作">
      				<template scope="scope">
      					<!-- <el-button type="text" size="small" @click="check(scope.$index, scope.row)">修改</el-button> -->
      					<el-button type="text" size="small" @click='editProjet(scope)'>进入项目</el-button>
      					<el-button type="text" size="small" @click="deleteProjectFunction(scope)">邀请</el-button>
      					<el-button type="text" size="small" @click="audit(scope)">邀请记录</el-button>
      				</template>
      			</el-table-column>
      		</el-table>
            <section class="main-pagination">
    			<my-Pagination :callback="getList" :total="myProjectListTotal">
    			</my-Pagination>
    		</section>
          </el-tab-pane>
          <el-tab-pane label="受邀项目">
              <el-table row-key="id" :empty-text="emptyText" :data="invitedProjectList" v-loading="listLoading" highlight-current-row style="width: 100%">
      			<!-- <el-table-column type="index" width="100"></el-table-column> -->

      			<el-table-column v-for="(value,i) in columns" :key="i" :label="value.label" :prop="value.prop" :sortable="value.sortable" :width="value.width ? value.width : 'auto'" :formatter="value.formatter" :min-width="value.minWidth ? value.minWidth : 'auto'">
      			</el-table-column>
      			<el-table-column label="操作">
      				<template scope="scope">
      					<!-- <el-button type="text" size="small" @click="check(scope.$index, scope.row)">修改</el-button> -->
      					<el-button type="text" size="small" @click='editProjet(scope)'>进入项目</el-button>
      					<el-button type="text" size="small" @click="deleteProjectFunction(scope)">邀请</el-button>
      					<el-button type="text" size="small" @click="audit(scope)">邀请记录</el-button>
      				</template>
      			</el-table-column>
      		</el-table>
            <section class="main-pagination">
    			<my-Pagination :callback="getList" :total="invitedProjectTotal">
    			</my-Pagination>
    		</section>
          </el-tab-pane>
        </el-tabs>
    </div>

  </template>
  <script>
  import headTop from '../../components/headTop'
  import moment from 'moment'
  import myPagination from '@/components/myPagination'
  import {
      enterpriseProjectListRequest
  } from '@/api/getData'
  export default{
      components: {
        headTop,
        myPagination
    },
      data(){
          const dateFormat = "YYYY-MM-DD";
          return{
              eid:this.$store.state.loginInfo.enterpriseId,
             	//table columns
              columns: [{
  				label: '产品',
  				prop: 'productName',
  				sortable: true,
  			}, {
  				label: '项目名称',
  				prop: 'projectName',
  				sortable: true,
  				minWidth: 100,
  			}, {
  				label: '参与角色',
  				prop: 'enterpriseRole',
  				sortable: true,
  			}, {
  				label: '项目起始日',
  				prop: 'startTime',
  				sortable: true,
  				minWidth: 60,
                formatter: (row, column) => moment(column.startTime).format(dateFormat)
  			}, {
  				label: '项目结束日',
  				prop: 'endTime',
  				sortable: true,
  				minWidth: 60,
                formatter: (row, column) => moment(column.endTime).format(dateFormat)
  			}],
              //table
  			myProjectList: [],
            myProjectListTotal: 0, //总数
            invitedProjectList: [],
            invitedProjectTotal: 0, //总数
  			listLoading: false,
            pagination: {
    			page: 1,
    			size: 10
    		},
  			emptyText: "暂无数据",
          }
      },
      activated(){
        this.getList();
      },
      methods: {
        getList() {
            let that=this;
            let params=Object.assign({
                eid: this.eid
            }, this.pagination)
            enterpriseProjectListRequest(that.eid).then(response=>{
                response.json().then(result=>{
                    this.myProjectList=[];
                    this.invitedProjectList=[];
                    for (var item in result) {
                        if (result[item].inviteStatus=='F') {
                            that.myProjectList.push(result[item]);
                        }
                        this.myProjectListTotal=result.length
                    }

                    for (var item in result) {
                        if (result[item].inviteStatus=='T') {
                            that.invitedProjectList.push(result[item]);
                        }
                        this.invitedProjectTotal=result.length
                    }
                })
            })
        }
      }
  }
  </script>
