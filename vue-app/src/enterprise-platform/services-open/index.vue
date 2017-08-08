<template>
    <div>
        <head-top></head-top>
        <section style="margin-top:50px;">
            <el-card>
                <div slot="header" class="service-title">
                    添加服务
                </div>
                <ul class="section-serviceType">
                    <li v-for="(item , i) in serviceList" :key="i+''" style="position:relative;">
                        <dl>
                            <dt @click="modelShow(item.code)"><img :src="serviceListMock[i].pic" /></dt>
                            <dd>
                                <h4>{{item.name}}</h4>
                                <p class="service-remark">{{item.description}}</p>
                                <el-button type="text" @click="loadText(item.code)">下载授权书</el-button>
                            </dd>
                        </dl>
                        <span class="icon-services" @click="modelShow(item.code)">
                            <i class="el-icon-arrow-right"></i>
                        </span>                
                    </li>
                </ul>
            </el-card>
        </section>
        <el-dialog title="提交申请" v-model="modalVisible" size="small" :close-on-click-modal="false">
			<el-form :model="introduce" label-width="120px">
                <div style="margin:10px 0;">
                    <el-tag type="primary" style="font-size:16px;">确认授权书信息后提交</el-tag>
                </div>
                <el-form-item label="描述说明" style="padding:0 30px;">
					<el-input type="textarea" :rows="4" v-model="introduce.context" auto-complete="on"></el-input>
				</el-form-item>
                <el-form-item label="上传授权书" style="padding:0 30px;">
					<el-upload
                        class="avatar-uploader"
                        action="/core/core/api/v1/attachfiles"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                        :on-change="filesChange"
                        :on-success="successUpload"
                        :on-error="errorUplaod"
                    >
                        <div class="upload-container">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                    </el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="modalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog>
        <el-dialog v-model="dialogVisible" size="small" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import headTop from '@/components/headTop';
import { servicesTypeList } from '@/api/mockApi';
import { loadUrl } from '@/api/publicApi';
import { servicesOpen , servicesTypes} from '@/api/coreApi';
export default {
    data(){
        return{
            serviceList : [],
            serviceListMock :[],
            modalVisible : false,
            serviceCode : '',
            fileId:'',
            introduce : {
                context :'',
                uploadimg:''
            },
            imageUrl:'',
            dialogImageUrl: '',
            dialogVisible: false,
            fileList : [],
        }
    },
    components:{
        headTop,
    },
    computed:{
        ...mapState(["loginInfo"])
    },
    created(){
        this.mockTypes();
        this.servicesTypes();
    },
    methods:{
        async mockTypes(){
            try{
                const respMock = await servicesTypeList();
                const resMock = await respMock.json();
                this.serviceListMock = resMock.data;
            }catch(e){
                this.$message.error(e)
            }
        },
         async servicesTypes(){
            try{
                const resp = await servicesTypes('SERVICE_OPEN');              
                const res = await resp.json();
                this.serviceList = res;

            }catch(e){
                this.$message.error(e)
            }
        },
        loadText(code){
            window.location.href = loadUrl(code)
        },
        modelShow(code){
            this.introduce = {
                context :'',
                uploadimg:''
            }
            this.modalVisible = true;
            this.serviceCode = code;
            this.fileList = [];
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file){
            if(this.fileList.length > 1){
                this.$message({
                    type:'info',
                    message:'只能上传一张图片'
                })
                return false;
            }
        },
        filesChange(file, fileList){
            this.fileList = fileList;
        },
        successUpload(response){
            this.fileId = response;
            this.$message({
                type:'success',
                message:'上传成功'
            })
        },
        errorUplaod(response){
            this.$message.error(response)          
        },
        addSubmit(){
            if(!this.fileId){
                this.$message({
                    type:'warning',
                    message:'请先上传图片'
                })
                return;
            };
            (async ()=>{ 
                try{
                    const resp = await servicesOpen(
                        this.loginInfo.enterpriseId,
                        {
                            code : this.serviceCode,
                            fileId :  this.fileId,
                            context : this.introduce.context,
                        }
                    );
                    if(resp.status === 200){
                        const msg = decodeURI(resp.headers.get('x-hpx-alert'));
                        this.$message({
                            type:'success',
                            message:`${msg}  ,  请等待审核!`
                        });
                        this.modalVisible = false;
                    }        
                }catch(e){
                    this.$message.error(e)
                }           
            })()
        }
    }
}
</script>
<style scoped>
    .service-title{
        padding:15px 20px;
    }
    .section-serviceType{
        padding:20px 0;
        overflow: hidden;
    }
    .section-serviceType li{
        float:left;
        width:42%;
        margin: 0 4%;
    }
    .section-serviceType dt {
        float:left;
        margin-right:20px;
        cursor: pointer;
    }
    .section-serviceType dd{
        padding:10px 0;
    }
    .icon-services{
        color:#999;
        position:absolute;
        font-size:18x;
        right:-30px;
        top:30%;
        cursor: pointer;
    }
    .avatar-uploader .upload-container {
        border: 1px dashed #d9d9d9;
        cursor: pointer;
        position: relative;
    }
  .avatar-uploader .upload-container:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 90px;
    height: 90px;
    display: block;
  }
  .service-remark{
      font-size:12px;
  }
</style>


