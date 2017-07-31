<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--添加模型名称部分-->
        <section class='search-criteria-container model-container'>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="line-height:  56px; font-seize: 18px; margin-left: 20px">基础信息</span>
                </div>
                <el-form :inline="true" :model="addForm" label-width="80px" ref="addForm">
                    <el-form-item label="选择行业" prop="industryid" :rules="[
                                            { required: true, message: '行业不能为空'},
                                            ]">
                        <el-select v-model="addForm.industryid" placeholder="请选择行业">
                            <el-option v-for="item in industryList" :key="item.id" :label="item.industryName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item><br/>
                    <el-form-item label="模型名称" prop="gradeCardName" :rules="[
                                            { required: true, message: '模型名称不能为空'},
                                            ]">
                        <el-input v-model="addForm.gradeCardName" placeholder="请输入模型名称"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="模型描述" prop="gradeCardDescribe" :rules="[
                                            { required: true, message: '模型描述不能为空'},
                                            ]">
                        <el-input type='textarea'  v-model="addForm.gradeCardDescribe" placeholder="请输入模型描述"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
        </section>
    
        <!--标签列表部分-->
        <section class='main-table-container'>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="line-height:  56px; font-seize: 18px; margin-left: 20px">标签列表</span>
                </div>
                <el-button @click="dialogVisible = true" icon="plus" style="margin-bottom:20px">选择标签</el-button>
                <el-dialog title="所有标签" :visible.sync="dialogVisible" :before-close="handleClose">
                    <el-input placeholder="请输入标签名称" icon="search" v-model="searchInput" style="margin-bottom: 10px" :on-icon-click="handleIconClick">
                    </el-input>
                    <el-table row-key="id" :data="labelList" v-loading="listLoading" @selection-change="handleSelectionChange" height="400" style="width: 100%;">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="scoreCardName" label="标签名称">
                        </el-table-column>
                    </el-table>
                    <el-button style="margin: 10px 0; float:right;" @click="selectLabel">选取</el-button>
                </el-dialog>
                <el-table row-key="id" :data="selectLabelList" v-loading="listLoading" style="width: 100%;">
                    <el-table-column label="序号" type="index" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="scoreCardName" label="已选标签名称" align="center">
                    </el-table-column>
                    <el-table-column prop="addUserid" label="创建人ID" align="center">
                    </el-table-column>
                    <el-table-column prop="weight" label="权重（%）" align="center">
                        <template scope="scope">
                            <el-input-number :min="0" :max="100" v-if="scope.row.isWeightEdite" v-model="selectLabelList[scope.$index].weight" size="small"></el-input-number>
                            <div v-else>{{selectLabelList[scope.$index].weight}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <el-button v-if="scope.row.isWeightEdite" type="text" size="small" @click="saveWeight(scope.$index, scope.row)">保存</el-button>
                            <el-button v-else type="text" size="small" @click="editeWeight(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="delLabel(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button style="margin: 10px 0; float:right;" @click="mark">打分</el-button>
            </el-card>
        </section>
    
        <!--模型分数部分-->
        <section class='main-table-container'>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="line-height: 56px; font-seize: 18px; margin-left: 20px;font-size: 16px">模型分数</span>
                </div>
                <el-table row-key="id" :data="scoreList" v-loading="listLoading" style="width: 100%">
                    <el-table-column label="序号" type="index" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="scoreCardName" label="标签" align="center">
                    </el-table-column>
                    <el-table-column prop="maxScore" label="分数" align="center">
                    </el-table-column>
                </el-table>
            </el-card>
        </section>
    
        <!--评分等级部分-->
        <section class='main-table-container'>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="line-height:  56px; font-seize: 18px; margin-left: 20px">评分等级</span>
                </div>
                <el-table row-key="id" :data="gradeList" v-loading="listLoading" style="width: 100%;">
                    <el-table-column label="序号" type="index" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="gradeName" label="等级" align="center">
                        <template scope="scope">
                            <el-input v-if="scope.row.isEdite" v-model="gradeList[scope.$index]['gradeName']" placeholder="请输入等级" size="small" style="max-width:120px;"></el-input>
                            <div v-if="!scope.row.isEdite">{{gradeList[scope.$index]["gradeName"]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gradeMin" label="最小值" align="center">
                        <template scope="scope">
                            <el-input-number :min="0" v-if="scope.row.isEdite" v-model="gradeList[scope.$index]['gradeMin']" placeholder="请输入最小值" size="small" style="max-width:120px;"></el-input-number>
                            <div v-if="!scope.row.isEdite">{{gradeList[scope.$index]["gradeMin"]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gradeMax" label="最大值" align="center">
                        <template scope="scope">
                            <el-input-number v-if="scope.row.isEdite" v-model="gradeList[scope.$index]['gradeMax']" placeholder="请输入最大值" size="small" style="max-width:120px;"></el-input-number>
                            <div v-if="!scope.row.isEdite">{{gradeList[scope.$index]["gradeMax"]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width='180'>
                        <template scope="scope">
                            <el-button v-if="scope.row.isEdite" type="text" size="small" @click="save(scope.$index, scope.row)">保存</el-button>
                            <el-button v-if="!scope.row.isEdite" type="text" size="small" @click="edite(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="remove(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button :disabled="addGradeBtn" style="float: right; margin: 10px 0" @click="addGrade()">新增</el-button>
            </el-card>
        </section>
    
        <!--提交部分-->
        <section>
            <el-button type="primary" style="margin:  30px 0 50px 40%" @click="subModel('addForm')">提交</el-button>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import { mapState } from 'vuex'
import { labelList, industryList, modelAdd, modelData, modelList, modelEdit } from '@/api/riskApi'
export default {
    data() {
        this.newGrade = {
            gradeName: '',
            gradeMin: '',
            gradeMax: '',
            isEdite: true,
        };
        return {
            searchInput: '',
            listLoading: false,
            dialogVisible: false,
            addGradeBtn: true,
            addForm: {
                gradeCardName: '',
                industryid: '',
                gradeCardDescribe: '',
            },
            labelList: [],
            tmpLabel: [],
            selectLabelList: [],
            scoreList: [],
            gradeList: [],
            industryList: [],
            total: 0,
        }
    },
    components: {
        headTop
    },
    activated() {
        this.initData();
        this.getIndustry();
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        async getIndustry() {
            const resp = await industryList();
            const res = await resp.json();
            this.industryList = [...res];
        },
        async initData() {
            const eid = this.loginInfo.enterpriseId;
            const id = this.$route.params.id;
            const resp = await labelList(this.loginInfo.enterpriseId);
            const res = await resp.json();
            this.labelList = [...res];
            if (!id) return;
            const result = await modelData(id, eid);
            const resu = await result.json();
            this.addForm.gradeCardName = resu.gradeCardName;
            this.addForm.industryid = resu.industryid;
            this.addForm.gradeCardDescribe = resu.gradeCardDescribe;
            this.selectLabelList = resu.labelInfos;
            this.total = resu.total;
            this.selectLabelList.map((v) => {
                this.scoreList.push({ scoreCardName: v.scoreCardName, maxScore: (v.maxScore * v.weight).toFixed(2) })
            });
            this.scoreList.push({ scoreCardName: "总分", maxScore: this.total })
            this.gradeList = resu.scoreGrades;
        },
        async handleIconClick(ev) {
            const params = {name: this.searchInput};
            const resp = await labelList(this.loginInfo.enterpriseId, params);
            const res = await resp.json();
            this.labelList = [...res];
        },
        handleSelectionChange(val) {
            this.tmpLabel = [...val];
        },
        selectLabel() {
            let tmpIdArr = this.tmpLabel;
            const len = this.selectLabelList.length;
            if (len) {
                for (let key = 0; key < this.selectLabelList.length; key++) {
                    tmpIdArr = tmpIdArr.filter((v, i) => {
                        return v.id != this.selectLabelList[key].id
                    });
                }
            }
            tmpIdArr.map((v, i) => {
                this.selectLabelList.push(JSON.parse(JSON.stringify(Object.assign(v, { weight: '' }, { isWeightEdite: true }))));
            });
            this.dialogVisible = false;
        },
        delLabel(index) {
            this.selectLabelList.splice(index, 1);
            this.scoreList.splice(index, 1);
        },
        mark() {
            var tmlScore = [];
            this.total = 0;
            this.selectLabelList.forEach((v, i) => {
                if(v.isWeightEdite === true) {
                    this.$message.error('请输入权重') ;
                    return false;
                } 
                tmlScore.push({ scoreCardName: v.scoreCardName, maxScore: (v.maxScore * v.weight/100 - 0).toFixed(2) })
            })
            tmlScore.map((v) => {
                this.total += (v.maxScore - 0);
            })
            tmlScore.push({ scoreCardName: "总分", maxScore: this.total.toFixed(2) })
            this.scoreList = tmlScore;

            if (this.scoreList.length > 1) {
                this.addGradeBtn = false;
            }
        },
        addGrade() {
            this.gradeList.push({ ...this.newGrade });
        },
        saveWeight(index, row) {
            if (!row.weight) {
                this.$message.error('数据不能为空');
            }
            this.selectLabelList[index].isWeightEdite = false;
        },
        editeWeight(index, row) {
            this.selectLabelList[index].isWeightEdite = true;
        },
        save(index, row) {
            for (let key of Object.keys(this.newGrade)) {
                if (key !== 'isEdite' && !row[key]) {
                    this.$message.error('数据不能为空');
                    return;
                }
            };
            if (row.gradeMin > row.gradeMax) {
                this.$message.error('最小值不能大于最大值');
                return;
            } else if (row.gradeMax > this.total) {
                this.$message.error('最大值不能大于总分');
                return;
            }
            this.gradeList[index].isEdite = false;
        },
        edite(index, row) {
            this.gradeList[index].isEdite = true;
        },
        remove(index, row) {
            this.gradeList.splice(index, 1);
        },
        async subModel(formName) {
            this.$refs[formName].validate(async (valid) => {
                const eid = this.loginInfo.enterpriseId;
                const id = this.$route.params.id;
                const newData = Object.assign({}, { ...this.addForm }, { labelInfos: [...this.selectLabelList] }, { scoreList: [...this.scoreList] }, { scoreGrades: [...this.gradeList] }, {totalScore: this.total})
                if (this.selectLabelList.length === 0 || this.scoreList.length === 0 || this.gradeList.length === 0 || !valid) {
                    this.$message.error('请完善信息！');
                    return false;
                }
                this.gradeList.forEach((v) => {
                    if(v.isEdite === true) {
                        this.$message.error('请完善评分等级数据');
                        return false;
                    }
                })
                try {
                    console.log("最后的", id)
                    const resp = id ? await modelEdit(id, eid, newData) : await modelAdd(eid, newData);
                    this.$message({
                        message: '提交成功！',
                        type: 'success'
                    });
                    this.$router.push('/platform/model');
                    const response = await modelList({ page: 1, size: 10 });
                    console.log("提交后", response)
                } catch (e) {
                    this.$message.error(e);
                };
            });
        },

    }
}
</script>

<style>
.search-criteria-container {
    margin-left: -30px;
    margin-top: 20px;
}

.el-textarea {
    width: 300%;
}

.box-card {
    width: 90%;
    line-height: 100%;
    margin: 0 0 30px 0;
    box-shadow: none;
    transition: box-shadow .5s;
}

.box-card:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: box-shadow .5s;
}

.model-container .el-select>.el-input {
    width: 160% ;
}
.model-container .el-input {
    width: 295%;
}
</style>
