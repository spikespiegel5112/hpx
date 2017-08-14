const hpxManagerIndex = r => require.ensure([], () => r(require('@/hpx-manager/main')), 'hpx-manager-index');
const home = r => require.ensure([], () => r(require('@/hpx-manager/home')), 'hpx-manager-home');
const detail = r => require.ensure([], () => r(require('@/hpx-manager/detail')), 'hpx-manager-test');
const template = r => require.ensure([], () => r(require('@/hpx-manager/template')), 'hpx-manager-template');

// 项目管理路由
const inviteAudit = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/inviteAudit')), 'inviteAudit');
const projectsMaintenance = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectsMaintenance')), 'projectsMaintenance');
const projectRoleManagement = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectRoleManagement')), 'projectRoleManagement');
const projectEdit = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectEdit')), 'projectEdit');
const projectCreate = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectCreate')), 'projectCreate');
 const enterpriseTypeRoleBinding = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/enterpriseTypeRoleBinding')), 'projectCreate');

const accreditation = r => require.ensure([], () => r(require('@/hpx-manager/accreditation')), 'hpx-manager-accreditation');
const addedServices = r => require.ensure([], () => r(require('@/hpx-manager/added-services')), 'hpx-manager-addedServices');
const enterpriseManager = r => require.ensure([], () => r(require('@/hpx-manager/enterprise-manager')), 'hpx-manager-enterprise-manager');
const enterpriseInfo  = r => require.ensure([], () => r(require('@/hpx-manager/enterprise-info')), 'hpx-manager-enterprise-info');

// 平台基础管理
const product = r => require.ensure([], () => r(require('@/hpx-manager/product')), 'index');
const noticeList = r => require.ensure([], () => r(require('@/hpx-manager/product/noticeList')), 'noticeList');
const noticeEdit = r => require.ensure([], () => r(require('@/hpx-manager/product/noticeEdit')), 'noticeEdit');

const user = r => require.ensure([], () => r(require('@/hpx-manager/user')), 'user');
const agreement = r => require.ensure([], () => r(require('@/hpx-manager/agreement')), 'agreement');
const dictionary = r => require.ensure([], () => r(require('@/hpx-manager/dictionary')), 'dictionary');
const signatureManager = r => require.ensure([], () => r(require('@/hpx-manager/signature-manager')), 'signatureManager');

const router = {
    path: '/manager',
    component: hpxManagerIndex,
    children: [{
            path: '',
            component: home,
            name: 'home',
            meta: [],
        },{
            path: 'template',
            component: template,
            meta: ["模板", "mob"],
        }, {
            path: 'template/edit/:id',
            name: 'projectEdit',
            component: projectEdit,
            meta: ["项目管理", "项目修改"],
        }, {
            path: 'item',
            name: 'projectsMaintenance',
            component: projectsMaintenance,
            meta: ['项目管理', '项目维护'],
        }, {
            path: 'pro-role',
            name: 'projectRoleManagement',
            component: projectRoleManagement,
            meta: ['项目管理', '项目角色管理'],
        },{
            path: 'create-pro',
            name: 'projectCreate',
            component: projectCreate,
            meta: ['项目管理', '新建项目'],
        },{
             path: 'typerolebinding',
             name: 'enterpriseTypeRoleBinding',
             component: enterpriseTypeRoleBinding,
             meta: ['项目管理', '项目维护', '企业类型角色绑定'],
        },{
            path: 'invite-audit',
            component: inviteAudit,
            meta: ['项目管理', '邀请审核'],
        },{
            path: 'product',
            component: product,
            meta: ['基础管理','产品管理'],
        },{
            path: 'user',
            component: user,
            meta: ['基础管理','用户管理'],
        },{
            path: 'accreditation',
            component: accreditation,
            meta: ['企业管理', '认证管理'],
        },{
            path: 'added-services',
            component: addedServices,
            meta: ['企业管理', '增值服务管理'],
        },{
            path: 'maintain',
            component: enterpriseManager,
            meta: ['企业管理', '企业维护'],
        },{
            path: 'etpde/:eid',
            component: enterpriseInfo,
            meta: ['企业管理', '企业信息'],
        },{
            path: 'protocol',
            component: agreement,
            meta: ['协议授权管理'],
        },{
            path: 'news-notice',
            component: noticeList,
            name: 'noticeList',
            meta: ['平台基础管理', '平台新闻公告']
        }, {
            path: 'news-notice/noticeEdit/:noticeId',
            component: noticeEdit,
            name: 'noticeEdit',
            meta: ['平台基础管理', '平台新闻公告', '发布新闻'],
        }, {
            path: 'dictionary',
            component: dictionary,
            name: 'dictionary',
            meta: ['平台基础管理', '字典项'],
        }, {
			path: 'signature',
			component: signatureManager,
			meta: ['签章管理'],
		}]
}

export default router;
