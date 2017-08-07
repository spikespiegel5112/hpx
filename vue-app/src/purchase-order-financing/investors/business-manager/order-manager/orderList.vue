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
                type="index">
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
                <template scope="scope">
                    <div v-if="value.prop === 'amount'">
                        <el-input-number v-show="isDel" v-model="tableList[scope.$index].amount"  size="small" :controls="false" style="width:100%;"></el-input-number>
                        <span v-show="!isDel">{{tableList[scope.$index].amount}}</span> 
                    </div>
                    <div v-else-if="value.prop === 'total'">{{scope.row.amount * scope.row.univalence}}</div>
                    <div v-else>{{scope.row[value.prop]}}</div>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    import { ordersDetail } from '@/api/orderApi'
    export default {
        data(){
            return {
                //table columns
                columns : [{
                    label : '品名',
                    prop  : 'description',
                    },{
                    label : '规格',
                    prop  : 'specification',
                    },{
                    label : '型号',
                    prop  : 'model',
                    },{
                    label : '单位',
                    prop  : 'unit',
                    },{
                    label : '数量',
                    prop  : 'amount',
                    },{
                    label : '单价',
                    prop  : 'univalence',
                    },{
                    label : '总价',
                    prop  : 'total',
                    },{
                    label : '备注',
                    prop  : 'remark',
                    }
                ],
                //总页数
                total : 0,
  
                //table
                tableList: [],
                listLoading:false,
                emptyText:"暂无数据",
                isEdite : false,
                numArr : [],
                totalNum : 0,
                totalAmount : 0,
            }
        },
        props : ['orderId','edite'],
        activated(){
            this.getList();
        },
        computed : {
            isDel(){
                return  typeof(this.edite) === 'undefined' ? this.isEdite : this.edite;
            },
        },
        methods: {
            async getList(){
                this.listLoading = true;
                try{
                    const resp = await ordersDetail(this.orderId);
                    const res = await resp.json();
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
        },
        watch : {
                tableList :{
                handler : function(newVal){
                    this.$emit('orderDetail',newVal);
                    if(typeof(this.edite) === 'undefined' )return;
                    this.totalNum = 0;
                    this.totalAmount=0;
                    for(let i = 0 , len = newVal.length; i < len ; i++){
                        this.totalNum += newVal[i].amount;
                        newVal[i].total = newVal[i].amount * newVal[i].univalence
                        this.totalAmount += newVal[i].amount * newVal[i].univalence;
                    }
                    this.$emit('numChange',[this.totalNum,this.totalAmount])
                },
                deep:true
            }
        }
    }
</script>

<style lang="less">


</style>
