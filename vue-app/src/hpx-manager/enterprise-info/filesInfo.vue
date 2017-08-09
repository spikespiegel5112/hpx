<template>
    <section class="main-table-container">
            <el-table
                row-key="code"
                :empty-text="emptyText"
                :data="tableList"
                v-loading="listLoading"
                :row-style="{height:'100px'}"
                :stripe="true"
                style="width: 100%;margin-top:30px;">
                <el-table-column
                  type="index"
                  width="60">
                </el-table-column>
                <el-table-column
                    v-for="(value,i) in columns"
                    :key="'f::'+i"
                    :label="value.label"
                    :prop="value.prop"
                    :sortable="value.sortable"
                    :width="value.width ? value.width : 'auto'"
                    :formatter="value.formatter"
                    :min-width="value.minWidth ? value.minWidth : 'auto'"
                    :align="value.align ? value.align : 'left'"
                >             
                </el-table-column>
                <el-table-column label="文件" align="center" prop="webPath" min-width="120px">
                    <template scope="scope">
                        <el-button v-if="scope.row.fileId" type="text" @click="clickLoad(scope.row.fileId)">点击下载查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="acc-action-upload"> 
                    <template scope="scope">
                         <div>
                             {{scope.row.id ? "已经上传" : "未上传"}}
                         </div>
                    </template>
                </el-table-column>
            </el-table>
    </section>
</template>
<script>
    import uploadPic from '@/components/uploadPicture'
    import moment from 'moment'
    import { filesTypes , loadUrl} from '@/api/publicApi'
    import { filesDetail } from '@/api/coreApi'
    export default {
        data(){
            const dateFormat = "YYYY-MM-DD";
            return {
                //table columns
                columns : [{
                    label : '文件类型',
                    prop  : 'name',
                    minWidth : 150,
                    },{
                    label : '文件名称',
                    prop  : 'fileName',
                    },{
                    label : '文件大小',
                    prop  : 'fileLength',
                    formatter : (row,column) =>{ return row.fileLength ? (parseInt(row.fileLength)/1024).toFixed(2) + 'M' : ''}
                    },
                    // {
                    // label : '上传人',
                    // prop  : 'modifiedBy',
                    // },
                    {
                    label : '上传时间',
                    prop  : 'modifiedTime',
                    sortable : true,
                    formatter : (row,column) => moment(column.modifiedTime).format(dateFormat)
                    }
                ],

                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",
            }
        },
        components:{
            uploadPic
        },
        mounted(){
            this.$nextTick(
                async () => {
                    // this.getFilesTypes();
                    this.getFilesDetail()
                }
            );
        },
        computed : {
            eid(){
                return this.$route.params.eid
            }
        },
        methods : {
            async getFilesTypes () {
                try{
                    const resp = await filesTypes(this.eid);
                    let res = await resp.json();
                    for(let i = 0,len = res.length; i < len ; i++){
                        res[i].fileName = '';
                        res[i].fileLength = '';
                        res[i].thumbUrl = '';
                    };
                    this.tableList = res;
                }catch(e){

                }
            },
            async getFilesDetail () {
                try{
                    const resp = await filesDetail(this.eid);
                    const res = await resp.json();
                    this.tableList = res
                }catch(e){

                }
            },
            clickLoad(fileId){
                window.location.href = loadUrl(fileId);
            }
        },
    }
</script>
<style>
    .acc-action-upload ul.el-upload-list{
        display: none;
    }
</style>
