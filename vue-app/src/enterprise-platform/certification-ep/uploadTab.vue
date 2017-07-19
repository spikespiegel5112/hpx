<template>
    <section class="main-table-container">
            <el-table
                row-key="id"
                :empty-text="emptyText"
                :data="tableList"
                v-loading="listLoading"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="60">
                </el-table-column>
                <el-table-column 
                    v-for="(value,i) in columns" 
                    :key="i"
                    :label="value.label"
                    :prop="value.prop"
                    :sortable="value.sortable"
                    :width="value.width ? value.width : 'auto'"
                    :formatter="value.formatter"
                    :min-width="value.minWidth ? value.minWidth : 'auto'"
                >             
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-upload
                            name="file"
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture"
                            :auto-upload="false"
                        >
                            <el-button icon="upload" type="primary" size="small">选取</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
            </el-table>
    </section>
</template>
<script>
    import moment from 'moment'
    import { filesTypes , uploadAction} from '../../api/publicApi'
    import { mapState } from 'vuex'
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
                    prop  : 'filesname',
                    },{
                    label : '文件大小',
                    prop  : 'filesSize',
                    formatter : (row,column) => row.filesSize
                    },{
                    label : '上传人',
                    prop  : 'modifiedBy',
                    },{
                    label : '上传时间',
                    prop  : 'modifiedTime',
                    sortable : true,
                    formatter : (row,column) => moment(column.modifiedTime).format(dateFormat)
                    },{
                    label : '文件信息',
                    prop  : 'info',
                    minWidth : 120
                    // formatter : (row,column) => moment(column.modifiedTime).format(dateFormat)
                    }
                ],

                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",
            }
        },
        mounted(){
            this.$nextTick(
                async () => {
                    this.getFilesTypes();
                }
            )
        },
        computed : {
            ...mapState(['loginInfo']),
            
        },
        methods : {
            async getFilesTypes () {
                try{
                    const resp = await filesTypes(this.loginInfo.enterpriseId);
                    const res = await resp.json();
                    this.tableList = res
                }catch(e){

                }
            },
        },
    }
</script>
<style>
</style>