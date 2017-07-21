<template>
    <div>
        <p>所有企业电子签章列表</p>
        <hr style="margin-bottom: 30px;" />
        <el-input style="width: 20%; marginLeft: 80%;marginBottom: 5px;" placeholder="请输入公司名称" icon="search" v-model="query.enterpriseName" :on-icon-click="search">
        </el-input>
        <el-table 
        :data="tableList" 
        border 
        style="width: 100%"  
        v-loading="listLoading"
        :empty-text="emptyText">
            <el-table-column prop="num" type="index" label="序号"  width="120">
            </el-table-column>
            <el-table-column prop="enterpriseName" label="公司名称" >
            </el-table-column>
            <el-table-column prop="name" label="签章名字" align="center">
            </el-table-column>
            <el-table-column prop="picData" label="签章图片">
                <template scope="scope">
                    <img :src="'data:image/png;base64,' + scope.row.picData" @click="handlePic(scope.row.picData)" style='width: 100px' />
                    <el-dialog
                        title=""
                        :visible.sync="pic.dialogVisible"
                        size="small"
                        :before-close="handleClose">
                        <img :src="'data:image/png;base64,' + pic.picSrc" style='width: 300px' />
                    </el-dialog>
                </template>
            </el-table-column>
            <el-table-column prop="action" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="abled(scope.row.name, scope.row.id, scope.row.enabled)" >{{scope.row.enabled === "T" ? "禁用" : "启用"}}</el-button>
                    <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    <!--<el-popover
                        ref="popover{{$index}}"
                        placement="top"
                        width="160"
                        v-model="visible2">
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="!visible2">取消</el-button>
                            <el-button type="primary" size="mini" @click="visible2=false">确定</el-button>
                        </div>
                    </el-popover>
                    <el-button type="text" v-popover:popover{{$index}}>删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <my-Pagination :callback="getList" :total="total">
        </my-Pagination>
    </div>
</template>

<script>
import { getEpSignatureList, abledEpSignature, delEpSignature } from '@/api/coreApi';
import myPagination from '../../components/myPagination';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            visible2: false,
            searchInput: '',
            total: 0,
            pic: {
                 dialogVisible: false,
                 picSrc: ''
            },
           
            query: {enterpriseName:''},
            listLoading: false,
            emptyText: '暂无数据',
            tableList: [],
        }
    },
    created() {
        this.initData();
    },
    computed : {
            ...mapState(["loginInfo"])
        },
    components: {
            myPagination,
    	},
    methods: {
        async initData(){
                this.listLoading = true;
                try{
                    this.getList();
                    this.listLoading = false;
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                }catch(e){
                    this.emptyText = "获取数据失败";
                    this.listLoading = false;
                }
            },
            async getList(pagination={page:1,size:10}){
                const eid = this.loginInfo.enterpriseId;
                const params = Object.assign({},this.query,pagination);
                const resp = await getEpSignatureList(params, eid);
                const res = await resp.json();
                const total = resp.headers.get('x-total-count')
                this.tableList = [...res];
                Object.keys(this.tableList).forEach( (k) => {
                        this.tableList[k].visible2 = false;
                })
                this.total = parseInt(total - 0);
            },
        async search () {
                try{
                    this.getList();
                }catch(e){
                    console.log(e)
                }
            },
        async abled(name, id, enabled){
            const abled = enabled === "T" ? "F" : "T"; 
            const resp = await abledEpSignature(name, id, abled);
            if(resp.status === 200) {
                this.$message({
                        message: '修改状态成功！',
                        type: 'success'
                    });
                this.getList();
            } else {
                this.$message.error('修改状态失败！');
            }
            
        },
        async del(id) {
            const  resp = await delEpSignature(id);
            if(resp.status === 200) {
                this.getList();
            } else {
                this.$message.error('删除失败！');
            }
        },
        handlePic(src) {
            this.pic.dialogVisible = true;
            this.pic.picSrc = src;
        },
        handleClose() {
            this.pic.dialogVisible = false;
        }
    }
}
</script>

<style lang="less" scope>
.el-table__row {
    height: 120px;
    text-align: center;
}

.el-table th.is-leaf {
    text-align: center;
}
</style>
