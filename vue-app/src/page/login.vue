<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>hpx后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
				<el-button style="float:right; margin-left: 20px;" @click="register" type="text">点击注册</el-button>
				<el-button style="float:right" @click="forgetPwd" type="text">忘记密码</el-button>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
	export default {
	    data(){
			return {
				loginForm: {
					username: '13333333338',
					password: '111qqq',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		created () {
			// 更新企业状态
			this.$store.dispatch('loginNot');
			this.$store.dispatch('removeStateInfo');
			console.log(this.$store.state)
		},
		mounted(){
			this.showLogin = true;
		},
		computed: {

		},
		methods: {
			...mapActions(['getAdminData']),
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						(async () => {
							try{
								const resp = await login(this.loginForm);
								console.log(resp)
								const res = await resp.json();
								this.$message({
									type: 'success',
									message: '登录成功'
								});
								if(res.id == 1){
									this.$router.push({
										path : '/manager'
									})

								}else{
									this.$router.push({
										name:'platform'
									})
								}
							}catch(e){
								this.$message({
									type: 'error',
									message: e
								});
							}
						})()
					}
				});
			},
			register () {
				this.$router.push('/register');
			},
			forgetPwd () {
				this.$router.push('/forgetPwd');
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
