<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="order-action">
            <el-button type="primary" @click="changeEdite">{{!isEdite ? '修改' : '保存'}}</el-button>
            <el-button type="primary" @click="download">下载</el-button>
        </div>
        <order-list :orderId="orderId" :edite="isEdite" @numChange="numChange" @orderDetail="orderDetail"></order-list>
        <div class="order-total">
            <p>
                <span>共计数量:</span><span>{{this.totalNum}}件</span>
            </p>
            <p>
                <span>共计金额:</span><span>￥{{this.totalAmount}}</span>
            </p>
            <p>
                <span>保证金:</span><span>￥{{this.deposit.toFixed(2)}}</span>
            </p>
        </div>
        <div class="order-action">
            <el-button type="primary" @click="save">确定修改</el-button>
            <el-button type="primary" @click="dealSubmit">确定订单</el-button>
        </div>

    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import orderList from './orderList';
    import { ordersDetail , ordersDetailDownload ,demanderInterestRate , ordersDetailRevise} from '@/api/orderApi'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                isEdite : false,
                detail : [],
                totalNum : 0,
                totalAmount : 0,
                
                //利率信息
                interestRate : null,

            }
        },
    	components: {
            headTop,
            orderList
        },
        activated(){
            this.getInterestRate();
        },
        computed : {
            ...mapState(["loginInfo","projectId"]),
            orderId(){
                return this.$route.params.orderId
            },
            demanderId(){
                return this.$route.params.demanderId
            },
            deposit(){
                return this.totalAmount * this.interestRate/100;
            }
        },
        methods: {
            numChange(data){
                this.totalNum = data[0];
                this.totalAmount = data[1];
            },
            orderDetail(data){
                this.detail = data;
            },
            async changeEdite(){
                this.isEdite = !this.isEdite;
            },
            async getInterestRate(){
                try{
                    const resp = await demanderInterestRate(this.demanderId,this.projectId);
                    const res = await resp.json();
                    this.interestRate = res.marginRatio;
                }catch(e){

                }
            },
            download(){
                window.location.href = ordersDetailDownload(this.orderId);
            },
            async save(){
                if(this.isEdite){
                    this.$message({type:'warning',message:'请先保存数据'});
                    return;
                };
                try{
                    const resp = await ordersDetailRevise(this.detail);
                    if(resp.status === 200){
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        })
                    }
                }catch(e){

                }

            },
            dealSubmit(){

            }
        },
    }
</script>

<style lang="less" scoped>
    .order-total{
        margin:10px 0;
        p{
            margin: 10px 0;
            padding-left:20px;
            span{
                display: inline-block;
            }
        }
    }
    .order-action{
        padding-left:20px;
        margin:10px 0;
    }

</style>
