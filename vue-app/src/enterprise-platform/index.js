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

const servicesRecord = r => require.ensure([], () => r(require('@/enterprise-platform/services-open/servicesRecord')), 'servicesRecord');
const enterpriseSignature = r => require.ensure([], () => r(require('@/enterprise-platform/enterprise-signature')), 'enterpriseSignature');
const user = r => require.ensure([], () => r(require('@/enterprise-platform/user')), 'user');

// 我的项目
const myProject = r => require.ensure([], () => r(require('@/enterprise-platform/projectManagement/myProject')), 'myProject');

// 历史记录
const historyProject = r => require.ensure([], () => r(require('@/enterprise-platform/projectManagement/historyProject')), 'historyProject');

// 邀请记录
const inviteRecord = r => require.ensure([], () => r(require('@/enterprise-platform/projectManagement/inviteRecord')), 'inviteRecord');

//线上开户
const accountOpening = r => require.ensure([], () => r(require('@/enterprise-platform/account/accountOpening')), 'accountOpening');

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
		},{
			path: 'project',
			component: myProject,
            name: 'myProject',
			meta: ['项目管理', '我的项目'],
		},{
			path: 'project/inviteRecord',
            name: 'inviteRecord',
			component: inviteRecord,
			meta: ['项目管理', '我的项目', '邀请记录'],
		},{
			path: 'history-project',
            name: 'historyProject',
			component: historyProject,
			meta: ['项目管理', '历史记录'],
		},{
			path: 'account-management',
			component: accountManagement,
			meta: ['资金管理', '账户总览'],
		},{
			path: 'transaction-detail',
			component: transactionDetail,
			meta: ['资金管理', '交易明细'],
		},{
			path: 'enterprise-signature',
			component: enterpriseSignature,
			meta: ["增值服务",'签章服务'],
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
            path: 'accountopening',
            name: 'accountOpening',
            component: accountOpening,
            meta: ["线上开户"],
        },{
            path: 'services-record',
            component: servicesRecord,
            meta: ["服务开通","申请记录"],
        },{
			path:'fair-parameter',
			component : fairParameter,
			meta:["风控管理","公允参数"]
		},{
			path:'enterprise-access-pre',
            name: 'admittanceManagement',
			component : admittanceManagement,
			meta:["风控管理","企业准入"]
		},{
			path:'evaluating/:enterpriseId2&:modelId&:projectId',
            name:'admittanceEvaluating',
			component : admittanceEvaluating,
			meta:["风控管理",'企业准入',"准入评估"]
		},{
			path:'report',
            name : 'admittanceReportList',
			component : admittanceReportList,
			meta:["风控管理","准入报告列表"]
		},{
			path:'report/report-detail/:reportId',
            name: 'reportDetail',
			component : admittanceReportDetail,
			meta:["风控管理","准入报告列表","准入报告详情"]
		},{
			path:'user',
            name: 'user',
			component : user,
			meta:["企业管理","用户管理"]
		},
		modelRouter,
		labelRouter,

    ]
};
