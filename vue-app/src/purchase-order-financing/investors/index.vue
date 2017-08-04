<template>
    <div>
        <div id="myChart" :style="{width: '60%', height: '400px'}">
        </div>
        <p style="font-size: 18px; margin: 50px 0 30px 0">待付款列表</p>
        <el-table
            row-key="id"
            :empty-text="emptyText"
            :data="tableList"
            v-loading="listLoading"
            highlight-current-row
            style="width: 100%">
            <el-table-column
                type="index"
                width="100">
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
                    <el-button type="text" size="small" @click="check(scope.$index, scope.row)" >查看</el-button>
                    <el-button type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns : [{
                    label : '企业编号',
                    prop  : 'id',
                    sortable : true,
                    },{
                    label : '企业名称',
                    prop  : 'name',
                    sortable : true,
                    minWidth : 120,
                    },{
                    label : '企业状态',
                    prop  : 'activated',
                    sortable : true,
                    formatter : (row,column) => row.activated === 'T' ? "状态1" : "状态2"
                    },{
                    label : '地址',
                    prop  : 'address',
                    sortable : true,
                    minWidth : 200
                    },{
                    label : '联系方式',
                    prop  : 'contactsNumber',
                    sortable : true,
                    }
                ],
            tableList: [],
            listLoading:false,
            emptyText:"暂无数据",
        }
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '2016年12月'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['销售方1', '销售方2', '销售方3', '销售方4'],
                    align: 'right',
                    right: 10
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['2017/4/1', '2017/4/2', '2017/4/3', '2017/4/4','2017/4/5']
                }],
                yAxis: [{
                    type: 'value',
                    name: '采购额(万元)',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
                series: [{
                    name: '销售方1',
                    type: 'bar',
                    data: [20, 12, 31, 34, 31]
                }, {
                    name: '销售方2',
                    type: 'bar',
                    data: [10, 20, 5, 9, 3]
                }, {
                    name: '销售方3',
                    type: 'bar',
                    data: [1, 1, 2, 3, 1]
                }, {
                    name: '销售方4',
                    type: 'bar',
                    data: [0.5, 2, 3, 1, 0.5]
                }]
            })
        }
    }
}

</script>
<style>

</style>