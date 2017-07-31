<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="main-section">
            <h3>风险定价公允参数</h3>
            <el-form :model="query" :rules="queryRules" label-suffix=" : " style="margin-top:30px;width:60%;" label-width="200px" ref="query">
                  <el-form-item prop="costingRate" label="成本利率(%)">
                      <el-input ht v-model.number="query.costingRate" size="large" placeholder="成本利率"></el-input>
                  </el-form-item>
                  <el-form-item prop="pricingRatio" label="可容忍商纠比例(%)">
                      <el-input v-model.number="query.pricingRatio" size="large" placeholder="可容忍商纠比例"></el-input>
                  </el-form-item>
                  <el-form-item prop="tolerateBadDebtRatio" label="风险定价验证比例(%)">
                      <el-input v-model.number="query.tolerateBadDebtRatio" size="large" placeholder="风险定价验证比例"></el-input>
                  </el-form-item>
                   <el-form-item prop="tolerateCommercialDisputeRatio" label="可容忍坏账比例(%)">
                      <el-input v-model.number="query.tolerateCommercialDisputeRatio" size="large" placeholder="可容忍坏账比例"></el-input>
                  </el-form-item>
                  <el-form-item style="text-align:center;">
                    <el-button type="primary" icon="check" @click="delSubmit">保存</el-button>
                    <el-button class="reset-b" icon="close" @click="resetForm('query')">重置</el-button>
                  </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import headTop from '@/components/headTop'
import myJs from '@/config/mUtils'
import { parameterInfo ,patchParameter } from '@/api/riskApi'
import { mapState } from 'vuex'
export default {
    components : {
      headTop
    },
    data(){
      const checkPer = (rule, value, callback) => {        
                if (!myJs.checkType(value,'number')) {
                    callback(new Error('请输入数字值'));
                } else if(parseInt(value) < 0 || parseInt(value) > 100){
                        callback(new Error('请输入1~100的数值'));
                }else{
                  callback()
                }
            };
      return {
        query:{
          id : '',
          costingRate : 0,
          pricingRatio:0,
          tolerateBadDebtRatio:0,
          tolerateCommercialDisputeRatio:0
        },
        queryRules : {
          costingRate : [
            { validator : checkPer,trigger:'blur'}
          ],
          pricingRatio:[
            { validator : checkPer,trigger:'blur'}
          ],
          tolerateBadDebtRatio:[
            { validator : checkPer,trigger:'blur'}
          ],
          tolerateCommercialDisputeRatio:[
            { validator : checkPer,trigger:'blur'}
          ]
        }
      }
    },
    activated(){
      this.getparameterInfo();
    },
    computed : {
        ...mapState(["loginInfo"])
    },
    methods:{
      getparameterInfo(){
          (async () => {
            try{
              const resp = await parameterInfo(this.loginInfo.enterpriseId);
              const res = await resp.json();
              this.query = res;
            }catch(e){

            }
          })()
      },
      delSubmit () {
        this.$refs['query'].validate(
            async (valid) => {
              if(valid) {
                  try{  
                    const resp = await patchParameter(this.loginInfo.enterpriseId,this.query.id,this.query)
                    if(resp.status === 200){
                      this.$message.success('保存成功')
                    }
                  }catch(e){
                    this.$message.success(e)
                  }
              } else{
                console.log('error submit!!',valid);
                return false;
              }
          }
        )
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
 
</style>
