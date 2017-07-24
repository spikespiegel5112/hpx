// WrapComponent

const enterpriseIndex = r => require.ensure([], () => r(require('@/enterprise-platform/main')), 'enterprise-platform-index');
const securitySetting = r => require.ensure([], () => r(require('@/enterprise-platform/securitySetting')), 'securitySetting');
const editPhone = r => require.ensure([], () => r(require('@/enterprise-platform/securitySetting/editPhone')), 'editPhone');
const editPwd = r => require.ensure([], () => r(require('@/enterprise-platform/securitySetting/editPwd')), 'editPwd');
const certification = r => require.ensure([], () => r(require('@/enterprise-platform/certification-ep')), 'certification-ep');
const servicesOpen = r => require.ensure([], () => r(require('@/enterprise-platform/services-open')), 'enterprise-platform-serivces');

const myProject = r => require.ensure([], () => r(require('@/enterprise-platform/projectManagement/myProject')), 'myProject');


export default {
    path: '/platform',
    component: enterpriseIndex,
    name:'platform',
    children:[{
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
    ]
};
