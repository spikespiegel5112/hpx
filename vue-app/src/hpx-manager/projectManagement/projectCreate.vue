<template>
<div>
	<head-top></head-top>
	<div class="search-criteria-container">
		<el-row type="flex" class="row-bg">
			<el-col :span="3">
			</el-col>
			<el-col :span="14">
				<el-form :model="formData" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
					<el-form-item label="企业名称" prop="ownerEnterpriseId">
						<el-select v-model="formData.ownerEnterpriseId" placeholder="请选择" @change='getEnterpriseId'>
							<el-option v-for="item in enterpriseList" :key="item.name" :label="item.name" :value="item.id.toString()">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品类型" prop="productCode">
						<el-select v-model="formData.productCode" @change='chooseProductType' placeholder="请选择">
							<el-option v-for="item in productList" :key="item.name" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品企业类型" prop="type">
						<el-select v-model="formData.type" @change='getProductEnterpriseType' placeholder="请选择">
							<el-option v-for="item in productEnterpriseTypeList" :key="item.name" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="项目名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="项目说明">
						<el-input type="textarea" v-model="formData.remark"></el-input>
					</el-form-item>
					<el-form-item label="项目开始时间" prop="startTime">
						<el-date-picker type="date" placeholder="选择日期" v-model="formData.startTime"></el-date-picker>
					</el-form-item>
					<el-form-item label="项目终止时间">
						<el-date-picker type="date" placeholder="选择日期" format v-model="formData.endTime"></el-date-picker>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
					</el-form-item>
				</el-form>
			</el-col>

			<el-col :span="3"></el-col>
		</el-row>
	</div>


</div>
</template>
<script>
import headTop from '@/components/headTop'
import moment from 'moment'
import {
	getEnterprisesList,
	createProject,
	getProductList
} from '@/api/coreApi'
import {
	enterpriseRolesListRequest
} from '@/api/enterpriseApi'
export default {
	data() {
		return {
			dateFormat: "YYYY-MM-DD",
			enterpriseList: [],
			productList: [],
			productCode: '',
			productEnterpriseTypeList: [],
			typeValue: '',
			formData: {
				ownerEnterpriseId: '',
				productCode: '',
				type: '',
				name: '',
				remark: '',
				startTime: '',
				endTime: ''
			},
			ruleForm: {
				ownerEnterpriseId: '',
				productCode: '',
				type: '',
				name: '',
				startTime: ''
			},
			rules: {
				ownerEnterpriseId: [{
					required: true,
					message: '请选择企业名称',
					trigger: 'change'
				}],
				productCode: [{
					required: true,
					message: '请选择产品类型',
					trigger: 'change'
				}],
				type: [{
					required: true,
					message: '请选择产品企业类型',
					trigger: 'change'
				}],
				name: [{
					required: true,
					message: '请输入项目名称',
					trigger: 'change'
				}],
				startTime: [{
					type: 'date',
					required: true,
					message: '请选择日期',
					trigger: 'change'
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
		async getEnterprisesList() {
			let response = await getEnterprisesList();
			let result = await response.json();
			this.enterpriseList = [...result];
			console.log(this.enterpriseList)
		},
		async getProductList() {
			let response = await getProductList();
			let result = await response.json();
			this.productList = [...result];
			console.log(this.productList);
		},
		getOwnerEnterpriseId(value) {
			for (var item in this.enterpriseList) {
				if (this.enterpriseList[item].name == this.formData.ownerEnterpriseId) {
					this.formData.ownerEnterpriseId = this.enterpriseList[item].id.toString();
					console.log(this.formData.ownerEnterpriseId)
				}
			}
			alert(typeof this.formData.ownerEnterpriseId)
		},
		chooseProductType() {
			this.productCode = this.formData.productCode;
			this.getProductEnterpriseType(this.productCode);
			this.formData.type = '';
		},
		getProductEnterpriseType(productCode) {
			let options = {
				productCode: productCode
			}
			for (var item in this.productList) {
				if (this.productList[item].code == productCode) {
					options.id = this.productList[item].id;
				}
			}
			console.log(options);
			enterpriseRolesListRequest(options).then(response => {
				response.json().then(result => {
					this.productEnterpriseTypeList = result;
				})
			})
		},
		submitForm(formName) {
			let that = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let eid = this.$store.state.loginInfo.enterpriseId;
					let type = this.typeValue;
					console.log(eid)
					console.log(type)
					this.formData.startTime = this.formData.startTime != '' ? moment(this.formData.startTime).format(this.dateFormat) : '';
					this.formData.endTime = this.formData.endTime != '' ? moment(this.formData.endTime).format(this.dateFormat) : '';
					console.log(this.formData)
					let options = {
						body: {
							ownerEnterpriseId: that.formData.ownerEnterpriseId,
							productCode: that.formData.productCode,
							name: that.formData.name,
							remark: that.formData.remark,
							startTime: that.formData.startTime,
							endTime: that.formData.endTime,
						},
						eid: this.formData.ownerEnterpriseId,
						type: this.formData.type
					}
					options.body = this.formData;
					console.log(options);
					createProject(options).then(response => {
						console.log(response.status)
						if (response.status == 200) {
							this.$router.push('/manager/item')
						}
					})

				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		getEnterpriseId() {
			alert(this.formData.ownerEnterpriseId)
		}
	}
}
</script>
