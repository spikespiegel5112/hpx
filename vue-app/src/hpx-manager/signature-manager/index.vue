<template>
    <div>
        <head-top></head-top>
        <p style="margin: 30px 0 0 0;">所有企业电子签章列表</p>
        <hr style="margin-bottom: 30px;" />
        <el-input style="width: 20%; marginLeft: 80%;marginBottom: 5px;" placeholder="请输入公司名称" icon="search" v-model="query.enterpriseName" :on-icon-click="search">
        </el-input>
        <el-table 
        class="signature-table"
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
                        title="签章图片"
                        :visible.sync="pic.dialogVisible"
                        size="small"
                        :before-close="handleClose">
                        <img :src="'data:image/png;base64,' + pic.picSrc" style='width: 300px' />
                    </el-dialog>
                </template>
            </el-table-column>
            <el-table-column prop="abled" label="状态" align="center">
            </el-table-column>
            <el-table-column prop="action" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="abled(scope.row.name, scope.row.id, scope.row.enabled)" >{{scope.row.enabled === "T" ? "禁用" : "启用"}}</el-button>
                    <el-button type="text" size="small" @click="scope.row.confirmVisible=true">删除</el-button>
                    <el-popover v-model="scope.row.confirmVisible">
                        <p>
                            <i style="color:#ffbf00" class="el-icon-information"></i> 确定删除？</p>
                        <div style="margin-top:15px;">
                            <el-button size="mini" @click="scope.row.confirmVisible= false">取消</el-button>
                            <el-button type="primary" size="mini" @click="del(scope.row.id)">确定</el-button>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <my-Pagination @pageChange="pageChange" :total="total">
        </my-Pagination>
    </div>
</template>

<script>
import { getEpSignatureList, abledEpSignature, delEpSignature } from '@/api/coreApi';
import myPagination from '@/components/myPagination';
import headTop from '@/components/headTop'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            visible2: false,
            searchInput: '',
            pagination : {
                page : 1,
                size : 10
            },
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
            headTop
    	},
    methods: {
        pageChange(data){
            this.pagination = data;
        },
        async initData(){
            this.getList();
            },
        async getList(){
            this.listLoading = true;
            try{
                const eid = this.loginInfo.enterpriseId;
                const params = Object.assign({},this.query,this.pagination);
                const resp = await getEpSignatureList(params, eid);
                const res = await resp.json();
                const total = resp.headers.get('x-total-count')
                let tmp = {};
                res.map((v) =>{
                    Object.assign(v, {confirmVisible: false}, {abled: v.enabled === 'T' ? '启用' : '禁用'});
                })
                this.tableList = [...res];
                Object.keys(this.tableList).forEach( (k) => {
                        this.tableList[k].visible2 = false;
                })
                this.total = parseInt(total);
                this.listLoading = false;
                if(!this.tableList.length){
                    this.emptyText = "暂无数据";
                }
            }catch(e){
                this.emptyText = "获取数据失败";
                this.listLoading = false;
            }
        },
        async search () {
                this.getList();
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
                this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
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
    },
    watch : {
        pagination : {
            handler : function(){
                this.getList();
            },
            deep : true
        }
    }
}
</script>

<style lang="less">
.signature-table .el-table__row {
    height: 120px;
    text-align: center;
}

.signature-table .el-table th.is-leaf {
    text-align: center;
}
</style>
