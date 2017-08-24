const hpxManagerIndex = r => require.ensure([], () => r(require('@/hpx-manager/main')), 'hpx-manager-index');
const home = r => require.ensure([], () => r(require('@/hpx-manager/home')), 'hpx-manager-home');

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
const accountManager  = r => require.ensure([], () => r(require('@/hpx-manager/account-open')), 'hpx-manager-accountManager');
const accountOpen  = r => require.ensure([], () => r(require('@/hpx-manager/account-open/apply')), 'hpx-manager-accountOpen');
const accountBind  = r => require.ensure([], () => r(require('@/hpx-manager/account-open/bindstaccount')), 'hpx-manager-bindstaccount');
const zxAccountSystem  = r => require.ensure([], () => r(require('@/hpx-manager/account-system/zx-system')), 'hpx-manager-zxSystem');

// 平台基础管理
const product = r => require.ensure([], () => r(require('@/hpx-manager/product')), 'index');
const noticeList = r => require.ensure([], () => r(require('@/hpx-manager/product/noticeList')), 'noticeList');
const noticeEdit = r => require.ensure([], () => r(require('@/hpx-manager/product/noticeEdit')), 'noticeEdit');

const userManager = r => require.ensure([], () => r(require('@/hpx-manager/user-manager')), 'userManager');
const user = r => require.ensure([], () => r(require('@/hpx-manager/user')), 'user');
const agreement = r => require.ensure([], () => r(require('@/hpx-manager/agreement')), 'agreement');
const dictionary = r => require.ensure([], () => r(require('@/hpx-manager/dictionary')), 'dictionary');
const signatureManager = r => require.ensure([], () => r(require('@/hpx-manager/signature-manager')), 'signatureManager');

/**
 * 权限 测试
 */
const menu = r => require.ensure([], () => r(require('@/view/menu')), 'menu');
const resource = r => require.ensure([], () => r(require('@/view/resource')), 'resource');
const role = r => require.ensure([], () => r(require('@/view/role')), 'role');
const userN = r => require.ensure([], () => r(require('@/view/user')), 'userN');
const NotFoundView = r => require.ensure([], () => r(require('@/page/404')), 'NotFoundView');


const router = {
    path: '/manager',
    component: hpxManagerIndex,
    children: [{
            path: '',
            component: home,
            name: 'home',
            meta: [],
        },{
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
            path: 'role',
            name: 'projectRoleManagement',
            component: projectRoleManagement,
            meta: ['项目管理', '项目角色管理'],
        },
        {
             path: 'typerolebinding',
             name: 'enterpriseTypeRoleBinding',
             component: enterpriseTypeRoleBinding,
             meta: ['项目管理', '项目维护', '企业类型角色绑定'],
        },
        {
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
            meta: ['企业管理', '增值服务审核'],
        },{
            path: 'maintain',
            component: enterpriseManager,
            meta: ['企业管理', '企业维护'],
        },{
            path: 'etpde/:eid',
            component: enterpriseInfo,
            meta: ['企业管理', '企业信息'],
        },{
            path: 'user-manager',
            component: userManager,
            meta: ['企业管理', '企业用户'],
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
            meta: ['基础管理', '字典管理'],
        }, {
			path: 'signature',
			component: signatureManager,
			meta: ['企业管理','签章管理'],
        }, {
			path: 'account-open',
			component: accountManager,
			meta: ['企业管理','账户管理'],
        }, {
			path: 'account-open/apply/:accountId/:eid',
			component: accountOpen,
			meta: ['企业管理','账户管理','账户开通'],
        },
         {
			path: 'account-open/apply/:accountId/:eid/bind',
            component: accountBind,
            name : 'bindAccount',
			meta: ['企业管理','账户管理','账户开通'],
        },
        {
			path: 'account-system',
            component: zxAccountSystem,
            name : 'zxAccountSystem',
			meta: ['企业管理','账户管理','账户开通'],
        },
        {
            path : 'menu',
            component:menu,
            meta: ['权限管理', '菜单管理'],
        },
        {
            path : 'resource',
            component:resource,
            meta: ['权限管理', '资源管理'],
        },
        {
            path : 'role',
            component:role,
            meta: ['权限管理', '角色管理'],
        },
        {
            path : 'auth-user',
            component:user,
            meta: ['权限管理', '用户管理'],
        },
        {
            path: '*',
            component: NotFoundView
        }
    ]
}

export default router;

