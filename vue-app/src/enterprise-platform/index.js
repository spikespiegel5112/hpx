//content children router
import modelRouter from '@/risk-management/model/index';
import labelRouter from '@/risk-management/label/index';
// WrapComponent
const home = r => require.ensure([], () => r(require('@/hpx-manager/home')), 'hpx-manager-home');

const enterpriseIndex = r => require.ensure([], () => r(require('@/enterprise-platform/main')), 'enterprise-platform-index');
const securitySetting = r => require.ensure([], () => r(require('@/enterprise-platform/security-setting')), 'security-setting');
const editPhone = r => require.ensure([], () => r(require('@/enterprise-platform/security-setting/edit-phone')), 'edit-phone');
const editPwd = r => require.ensure([], () => r(require('@/enterprise-platform/security-setting/edit-pwd')), 'edit-pwd');
const certification = r => require.ensure([], () => r(require('@/enterprise-platform/certification-ep')), 'certification-ep');
const servicesOpen = r => require.ensure([], () => r(require('@/enterprise-platform/services-open')), 'enterprise-platform-serivces');

const myProject = r => require.ensure([], () => r(require('@/enterprise-platform/projectManagement/myProject')), 'myProject');

//公共参数
const fairParameter = r => require.ensure([], () => r(require('@/risk-management/fair-parameter')), 'fairParameter');

//企业准入
const admittanceManagement = r => require.ensure([], () => r(require('@/enterprise-platform/admittance/admittanceManagement')), 'admittanceManagement');

//准入报告
const admittanceReport = r => require.ensure([], () => r(require('@/enterprise-platform/admittance/admittanceReport')), 'admittanceReport');


export default {
    path: '/platform',
	component: enterpriseIndex,
	name:"platform",
    children:[{
			path: '',
			component: home,
			meta: ['eee', 'yyy'],
		},{
			path: 'project',
			component: myProject,
			meta: ['项目管理', '我的项目'],
		},{
			path: 'secure',
			component: securitySetting,
			meta: ['设置', '安全设置'],
		},{
			path: 'secure/editPhone',
			component: editPhone,
			meta: ['设置', '修改手机号码'],
		},{
			path: 'secure/editPwd',
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
			path:'report',
			component : admittanceReport,
			meta:["风控管理","准入报告"]
		},
		modelRouter,
		labelRouter,

    ]
};
