<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="reissue-number">{{title}}单号：{{number}}</div>
        <el-table
            row-key="id"
            :empty-text="emptyText"
            :data="tableList"
            v-loading="listLoading"
            highlight-current-row
            style="width: 100%"
            border>
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
        </el-table>
        <div class="receipt-total">
                <div style="float: left;padding-top: 10px; margin-right:20px">实收共计:</div>
                <div style="float: right;text-align: right">
                    <p>{{count}}件</p>
                    <p>&yen; {{money}}</p>
                </div>
                <div class="button">
                    <el-button type="primary" @click="subApply">返回列表</el-button>
                </div>
            </div>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop'
    import { supplementOrder } from '@/api/orderApi'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                title: '',
                number: '',
                count: 0,
                money: 0,
                //table columns
                columns: [{
                    label: '品名',
                    prop: 'description',
                    }, {
                        label: '规格',
                        prop: 'specification',
                    }, {
                        label: '型号',
                        prop: 'model',
                    }, {
                        label: '计量单位',
                        prop: 'unit',
                    }, {
                        label: '数量',
                        prop: 'amount',
                    }, {
                        label: '单价',
                        prop: 'univalence',
                    }, {
                        label: '总价',
                        prop: 'total',
                    }, {
                        label: '实收数量',
                        prop: 'receivedAmount',
                    }, {
                        label: '差异数量',
                        prop: 'differenceAmount',
                    }, {
                        label: '差异金额',
                        prop: 'differenceMoney',
                    }
                ],
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",
            }
        },
    	components: {
            headTop,
    	},
        activated(){
            this.initData();
        },
        mounted(){

        },
        computed : {
            ...mapState(["loginInfo",'test'])
        },
        methods: {
            async initData(){
                this.getList();
            },
            async getList(){
                this.listLoading = true;
                try{
                    const id = this.$route.params.bid;
                    const type = this.$route.params.type;
                    this.title = type === 'F' ? '补发' : type === 'T' ? '退款' : '补货';
                    const resp = await supplementOrder(id);
                    const res = await resp.json();
                    this.tableList = [...res.afterSaleDetaillist];
                    this.number = res.code;
                    this.listLoading = false;
                    if(!this.tableList.length){
                        this.emptyText = "暂无数据";
                    }
                }catch(e){
                    this.emptyText = "获取数据失败";
                    this.listLoading = false;
                }
            },
            subApply() {
                const type = this.$route.params.type;
                console.log("补发提交", type);
            },

        },
    }
</script>

<style lang="less">
    @import '../../../style/mixin';
.reissue-number {
    margin: 30px 0 20px 0;
    font-size: 18px;
    font-weight: 700;

}
</style>
