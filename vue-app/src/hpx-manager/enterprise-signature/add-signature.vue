<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;">新增签章</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="签章名称" prop="name" :rules="[
                    { required: true, message: '请输入签章名称' },
                    ]">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="选择样式" prop="shape" :rules="[
                    { required: true, message: '请选择样式' },
                    ]">
                    <el-radio-group v-model="form.shape">
                        <el-radio value="STAR" label="圆形"></el-radio>
                        <el-radio value="OVAL" label="椭圆"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="横向文" prop="htext" :rules="[
                    { required: true, message: '请输入横向文' },
                    { min: 1, max: 8, message: '最多输入8个字符', trigger: 'blur' },
                    ]">
                    <el-input placeholder="最多输入8个字符" type="text" v-model="form.htext"></el-input>
                </el-form-item>
                <el-form-item label="下弦文" prop="qtext" :rules="[
                    { required: true, message: '请输入下弦文' },
                    { min: 1, max: 15, message: '最多输入15个字符', trigger: 'blur'},
                    ]">
                    <el-input type="text" placeholder="最多输入15个字符" v-model="form.qtext"></el-input>
                </el-form-item>
                <el-form-item label="选择颜色" prop="color" :rules="[
                    { required: true, message: '请选择颜色' },
                    ]">
                    <el-radio-group v-model="form.color">
                        <el-radio value="RED" label="红色"></el-radio>
                        <el-radio value="BLUE" label="蓝色"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item mar>
                    <el-button type="primary" @click.native="onSubmit('form')">确定</el-button>
                    <el-button @click="cancle">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { addSignature } from '@/api/coreApi';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            form: {
                name: '',
                shape: '',
                color: '',
                qtext: '',
                htext: '',
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    methods: {
        cancle() {
            history.back();
        },
        async onSubmit(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (!valid) return false;
                const eid = this.loginInfo.enterpriseId;
                const color = this.form.color === '红色' ? 'RED' : 'BLUE';
                const shape = this.form.shape === '圆形' ? 'STAR' : 'OVAL';
                let form = Object.assign({ ...this.form }, { color: color }, { shape: shape });
                const resp = await addSignature(eid, form);
                if (resp.status === 200) {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.form = {};
                    this.$router.replace('/manager/enterpriseSignature')
                } else {
                    this.$message.error('添加失败！');
                }
            });

        }
    }
}
</script>

<style lang="less" scope>
.box-card {
    width: 60%;
    margin: 0 auto;
    box-shadow: none;
    transition: box-shadow .5s;
}

.el-card__header {
    padding: 10px !important;
}

.box-card:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: box-shadow .5s;
}
</style>
