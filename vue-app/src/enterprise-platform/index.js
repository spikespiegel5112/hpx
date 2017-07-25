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

export default {
    path: '/platform',
    component: enterpriseIndex,
    name:'platform',
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
        },
		modelRouter,
		labelRouter,
    ]
};
