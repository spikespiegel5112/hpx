<template>
    <div>
        <p>企业电子签章列表</p>
        <hr style="margin-bottom: 30px;" />
        <el-button style="marginLeft: 92%;marginBottom: 5px;" type="primary"  @click="add">新增
        </el-button>
        <el-table 
        :data="tableList" 
        border 
        style="width: 100%"  
        v-loading="listLoading"
        :empty-text="emptyText">
            <el-table-column prop="num" type="index" label="序号"  width="120">
            </el-table-column>
            <el-table-column prop="name" label="签章名字">
            </el-table-column>
            <el-table-column prop="picData" label="签章图片" align="center">
                <template scope="scope">
                    <img :src="'data:image/png;base64,' + scope.row.picData" style='width: 100px' />
                </template>
            </el-table-column>
            <el-table-column prop="action" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="abled(scope.row.name, scope.row.id, scope.row.enabled)" >{{scope.row.enabled === "T" ? "禁用" : "启用"}}</el-button>
                    <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <my-Pagination :callback="getList" :total="total">
        </my-Pagination>
    </div>
</template>

<script>
import { getSignatureList, abledSignature, delSignature } from '@/api/coreApi';
import myPagination from '../../components/myPagination';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            searchInput: '',
            total: 100,
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
                const resp = await getSignatureList(params, eid);
                const res = await resp.json();
                const total = resp.headers.get('x-total-count')
                this.tableList = [...res];
                this.total = parseInt(total);
            },
        async abled(name, id, enabled){
            const abled = enabled === "T" ? "F" : "T"; 
            const eid = this.loginInfo.enterpriseId;
            const resp = await abledSignature(name, id, eid, abled);
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
            const eid = this.loginInfo.enterpriseId;
            const  resp = await delSignature(id, eid);
            if(resp.status === 200) {
                this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                this.getList();
            } else {
                this.$message.error('删除失败！');
            }
        },
        add() {
            this.$router.replace({path: this.$route.path + '/add-signature'})
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
