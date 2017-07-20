<template>
<div>
	<head-top></head-top>
	<div class="search-criteria-container">

	</div>
	<el-row type="flex" class="row-bg">
		<el-col :span="3">
		</el-col>
		<el-col :span="14">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="企业名称" prop="name">
					<el-select v-model="formData.enterpriseName" placeholder="请选择">
						<el-option v-for="item in enterpriseList" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="产品类型" prop="name">
					<el-select v-model="formData.productType" placeholder="请选择">
						<el-option v-for="item in productList" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="企业角色" prop="name">
					<el-select v-model="formData.enterpriseRole" placeholder="请选择">
						<el-option v-for="item in enterpriseRole" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目名称">
					<el-input v-model="formData.projectName"></el-input>
				</el-form-item>
				<el-form-item label="项目说明">
					<el-input type="textarea" v-model="formData.projectDesc"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-col :span="3"></el-col>
	</el-row>

</div>
</template>
<script>
import headTop from '@/components/headTop'
import {
	getEnterprisesList
} from '@/api/coreApi'
import {
	getProductList
} from '@/api/getData'
export default {
	data() {
		return {
			enterpriseList: [],
			productList: [],
			enterpriseRole: [],
			formData: {
				enterpriseName: '',
				productType: '',
				enterpriseRole: '',
				projectName: '',
				projectDesc: ''
			},
			ruleForm: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			rules: {
				name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					},{
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}
				],
				region: [{
					required: true,
					message: '请选择活动区域',
					trigger: 'change'
				}],
				date1: [{
					type: 'date',
					required: true,
					message: '请选择日期',
					trigger: 'change'
				}],
				date2: [{
					type: 'date',
					required: true,
					message: '请选择时间',
					trigger: 'change'
				}],
				type: [{
					type: 'array',
					required: true,
					message: '请至少选择一个活动性质',
					trigger: 'change'
				}],
				resource: [{
					required: true,
					message: '请选择活动资源',
					trigger: 'change'
				}],
				desc: [{
					required: true,
					message: '请填写活动形式',
					trigger: 'blur'
				}]
			}
		};
	},
	components: {
		headTop
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.getEnterprisesList();
			this.getProductList();
		},
		async getEnterprisesList(){
			let response = await getEnterprisesList();
			let result = await response.json();
			this.enterpriseList = [...result]
			// console.log(this.enterpriseList)
		},
		async getProductList(){
			let response = await getProductList();
			let result = await response.json();
			this.productList = [...result]
			console.log(this.productList)
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>
