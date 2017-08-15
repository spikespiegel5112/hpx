<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p style="paddingTop: 20px">企业电子签章列表</p>
        <hr style="margin-bottom: 30px;" />

        <!--  搜索条件  -->
        <section class='search-criteria-container'>
			<el-form :inline="true" :model="query"  ref="query">
                <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="query.name" size="large" placeholder="签章名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-b" type="primary" icon="circle-close" @click="resetForm('query')">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="plus" type="primary"  @click="add">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
		</el-col>
        </section>
        
        <section class="main-table-container">
            <el-table 
                class="signature-table"
                :data="tableList" 
                border 
                style="width: 100%"  
                v-loading="listLoading"
                :empty-text="emptyText">
                <el-table-column prop="num" type="index" label="序号" align="center" width="120">
                </el-table-column>
                <el-table-column prop="name" label="签章名称" align="center">
                </el-table-column>
                <el-table-column prop="picData" label="签章图片" align="center">
                    <template scope="scope">
                        <img :src="'data:image/png;base64,' + scope.row.picData" @click="handlePic(scope.row.picData)"  style='width: 100px' />
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
                <el-table-column prop="action" label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="abled(scope.row.id, scope.row.enabled)" >{{scope.row.enabled === "T" ? "禁用" : "启用"}}</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
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
            <section class="main-pagination">
                <my-Pagination @pageChange="pageChange" :total="total">
                </my-Pagination>
            </section>
        </section>
        <!--编辑界面-->
		<el-dialog :title="modalTitle" v-model="editeModalVisible" :close-on-click-modal="false">
			<el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="签章名称" prop="name" :rules="[
                    { required: true, message: '请输入签章名称' },
                    ]">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-if="editModal" label="选择样式" prop="shape" :rules="[
                    { required: true, message: '请选择样式' },
                    ]">
                    <el-radio-group v-model="form.shape">
                        <el-radio value="STAR" label="圆形"></el-radio>
                        <el-radio value="OVAL" label="椭圆"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="editModal" label="横向文" prop="htext" :rules="[
                    { required: true, message: '请输入横向文' },
                    { min: 1, max: 8, message: '最多输入8个字符', trigger: 'blur' },
                    ]">
                    <el-input placeholder="最多输入8个字符" type="text" v-model="form.htext"></el-input>
                </el-form-item>
                <el-form-item v-if="editModal" label="下弦文" prop="qtext" :rules="[
                    { required: true, message: '请输入下弦文' },
                    { min: 1, max: 15, message: '最多输入15个字符', trigger: 'blur'},
                    ]">
                    <el-input type="text" placeholder="最多输入15个字符" v-model="form.qtext"></el-input>
                </el-form-item>
                <el-form-item v-if="editModal" label="选择颜色" prop="color" :rules="[
                    { required: true, message: '请选择颜色' },
                    ]">
                    <el-radio-group v-model="form.color">
                        <el-radio value="RED" label="红色"></el-radio>
                        <el-radio value="BLUE" label="蓝色"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 45%" type="primary" @click.native="onSubmit('form')">确定</el-button>
                </el-form-item>
            </el-form>
		</el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import { getSignatureList, abledSignature, addSignature, editSignature, delSignature } from '@/api/coreApi';
    import myPagination from '../../components/myPagination';
    import { mapState } from 'vuex';
    export default {
        data(){
            return {
                //总页数
                total : 0,
                 pagination : {
                    page : 1,
                    size : 10
                },
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",

                //search params
                criteriaNum : 1,
                query: {name:''},
                pic: {
                    dialogVisible: false,
                    picSrc: ''
                },

                //模态框
                editModal: true,
                modalTitle: '' ,
                editeModalVisible : false,
                form: {
                    id:'',
                    name: '',
                    shape: '',
                    color: '',
                    qtext: '',
                    htext: '',
                }
            }
        },
    	components: {
            headTop,
            myPagination,
    	},
        activated(){
            this.initData();
        },
        mounted(){

        },
        computed : {
            ...mapState(["loginInfo"])
        },
        methods: {
            pageChange(data){
                this.pagination = data;
            },
            initData(){
                 this.getList();
            },
            async getList(){
                this.listLoading = true;
                try{
                     const eid = this.loginInfo.enterpriseId;
                    const params = Object.assign({},this.query, this.pagination);
                    const resp = await getSignatureList(params, eid);
                    const res = await resp.json();
                    res.map((v) =>{
                        Object.assign(v, {confirmVisible: false}, {abled: v.enabled === 'T' ? '启用' : '禁用'});
                    })
                    const total = resp.headers.get('x-total-count')
                    this.tableList = [...res];
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
            async abled(id, enabled){
                const abled = enabled === "T" ? "F" : "T"; 
                const eid = this.loginInfo.enterpriseId;
                const resp = await abledSignature(id, eid, abled);
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
            add () {
                this.form = {
                            id: '',
                            name: '',
                            shape: '',
                            color: '',
                            qtext: '',
                            htext: '',
                        };
                this.modalTitle = '新增签章',
                this.editeModalVisible = true; 
             },
            edite (index,row) {
                this.modalTitle = '编辑签章';
                this.editeModalVisible = true; 
                this.editModal = false;
                this.form.name = row.name;
                this.form.id = row.id;
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handlePic(src) {
                this.pic.dialogVisible = true;
                this.pic.picSrc = src;
            },
            handleClose() {
                this.pic.dialogVisible = false;
            },
            async onSubmit(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) return false;
                    const id = this.form.id;
                    const eid = this.loginInfo.enterpriseId;
                    try{
                        const color = this.form.color === '红色' ? 'RED' : 'BLUE';
                        const shape = this.form.shape === '圆形' ? 'STAR' : 'OVAL';
                        let form = Object.assign({ ...this.form }, { color: color }, { shape: shape });
                        const resp = id ? await editSignature(id, eid, form.name) :await addSignature(eid, form);
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        });
                        this.editeModalVisible = false;
                        this.getList();
                    }catch(e){
                        this.$message.error(e);
                    };
               });
            }
        },
        watch : {
            pagination : {
                handler : function() {
                    this.getList();
                },
                deep : true
            }
        }
    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
    .signature-table .el-table__row {
        height: 120px;
        text-align: center;
    }

    .signature-table .el-table th.is-leaf {
        text-align: center;
    }
</style>
