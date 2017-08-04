//content children router
import modelRouter from '@/risk-management/model/index';
import labelRouter from '@/risk-management/label/index';
// WrapComponent
const home = r => require.ensure([], () => r(require('@/enterprise-platform/home')), 'enterprise-platform-home');
const enterpriseIndex = r => require.ensure([], () => r(require('@/enterprise-platform/main')), 'enterprise-platform-index');
const securitySetting = r => require.ensure([], () => r(require('@/enterprise-platform/security-setting')), 'security-setting');
const editPhone = r => require.ensure([], () => r(require('@/enterprise-platform/security-setting/edit-phone')), 'edit-phone');
const editPwd = r => require.ensure([], () => r(require('@/enterprise-platform/security-setting/edit-pwd')), 'edit-pwd');
const certification = r => require.ensure([], () => r(require('@/enterprise-platform/certification-ep')), 'certification-ep');
const servicesOpen = r => require.ensure([], () => r(require('@/enterprise-platform/services-open')), 'enterprise-platform-serivces');
const signatureManager = r => require.ensure([], () => r(require('@/enterprise-platform/signature-manager')), 'signature-manager');
const enterpriseSignature = r => require.ensure([], () => r(require('@/enterprise-platform/enterprise-signature')), 'enterprise-signature');


// 项目管理
const myProject = r => require.ensure([], () => r(require('@/enterprise-platform/projectManagement/myProject')), 'myProject');

//账户总览
const accountManagement = r => require.ensure([], () => r(require('@/enterprise-platform/account/accountManagement')), 'accountManagement');

//交易明细
const transactionDetail = r => require.ensure([], () => r(require('@/enterprise-platform/account/transactionDetail')), 'transactionDetail');

//公共参数
const fairParameter = r => require.ensure([], () => r(require('@/risk-management/fair-parameter')), 'fairParameter');

//企业准入
const admittanceManagement = r => require.ensure([], () => r(require('@/enterprise-platform/admittance/admittanceManagement')), 'admittanceManagement');

//准入评估
const admittanceEvaluating = r => require.ensure([], () => r(require('@/enterprise-platform/admittance/admittanceEvaluating')), 'admittanceEvaluating');

//准入报告列表
const admittanceReportList = r => require.ensure([], () => r(require('@/enterprise-platform/admittance/admittanceReportList')), 'admittanceReportList');

//准入报告详情
const admittanceReportDetail = r => require.ensure([], () => r(require('@/enterprise-platform/admittance/admittanceReportDetail')), 'admittanceReportDetail');


export default {
    path: '/platform',
	component: enterpriseIndex,
	name:"platform",
    children:[{
			path: '',
			component: home,
			meta: ['', ''],
		},{
			path: 'project',
			component: myProject,
			meta: ['项目管理', '我的项目'],
		},{
			path: 'account-management',
			component: accountManagement,
			meta: ['资金管理', '账户总览'],
		},{
			path: 'transaction-detail',
			component: transactionDetail,
			meta: ['资金管理', '交易明细'],
		},{
			path: 'signature',
			component: signatureManager,
			meta: ['签章管理'],
		},{
			path: 'enterpriseSignature',
			component: enterpriseSignature,
			meta: ['企业签章'],
		},{
			path: 'secure',
			component: securitySetting,
			meta: ['设置', '安全设置'],
		},{
			path: 'secure/edit-phone',
			component: editPhone,
			meta: ['设置', '修改手机号码'],
		},{
			path: 'secure/edit-pwd',
			component: editPwd,
			meta: ['设置', '修改密码'],
		},{
            path: 'certification',
            component: certification,
            meta: ["企业管理", "企业认证"],
        },{
            path: 'services',
            component: servicesOpen,
            meta: ["服务开通"],
        },{
			path:'fair-parameter',
			component : fairParameter,
			meta:["风控管理","公允参数"]
		},{
			path:'enterprise-access-pre',
			component : admittanceManagement,
			meta:["风控管理","企业准入"]
		},{
			path:'evaluating/:projectId&:modelId',
            name:'admittanceEvaluating',
			component : admittanceEvaluating,
			meta:["风控管理",'企业准入',"准入评估"]
		},{
			path:'report',
			component : admittanceReportList,
			meta:["风控管理","准入报告列表"]
		},{
			path:'report/report-detail/:reportId',
            name: 'reportDetail',
			component : admittanceReportDetail,
			meta:["风控管理","准入报告列表","准入报告详情"]
		},
		modelRouter,
		labelRouter,

    ]
};
