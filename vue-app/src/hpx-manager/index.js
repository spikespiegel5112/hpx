const hpxManagerIndex = r => require.ensure([], () => r(require('@/hpx-manager/main')), 'hpx-manager-index');
const home = r => require.ensure([], () => r(require('@/hpx-manager/home')), 'hpx-manager-home');
const detail = r => require.ensure([], () => r(require('@/hpx-manager/detail')), 'hpx-manager-test');
const template = r => require.ensure([], () => r(require('@/hpx-manager/template')), 'hpx-manager-template');
const inviteAudit = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/inviteAudit')), 'inviteAudit');
const projectsMaintenance = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectsMaintenance')), 'projectsMaintenance');
const projectEdit = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectEdit')), 'projectEdit');
const projectCreate = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectCreate')), 'projectCreate');

const signatureManager = r => require.ensure([], () => r(require('@/hpx-manager/signatureManager')), 'signatureManager');
const enterpriseSignature = r => require.ensure([], () => r(require('@/hpx-manager/enterpriseSignature')), 'enterpriseSignature');
const addSignature = r => require.ensure([], () => r(require('@/hpx-manager/enterpriseSignature/addSignature')), 'addSignature');

const accreditation = r => require.ensure([], () => r(require('@/hpx-manager/accreditation')), 'hpx-manager-accreditation');
const addedServices = r => require.ensure([], () => r(require('@/hpx-manager/added-services')), 'hpx-manager-addedServices');
const enterpriseManager = r => require.ensure([], () => r(require('@/hpx-manager/enterprise-manager')), 'hpx-manager-enterprise-manager');
// 平台基础管理
const product = r => require.ensure([], () => r(require('@/hpx-manager/product')), 'index');
const newsList = r => require.ensure([], () => r(require('@/hpx-manager/product/newsList')), 'newsList');
const newsPublish = r => require.ensure([], () => r(require('@/hpx-manager/product/newsPublish')), 'newsPublish');


const router = {
    path: '/manager',
    component: hpxManagerIndex,
    children: [{
        path: '',
        component: home,
        name: 'home',
        meta: [],
    }, {
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
        path: 'create-pro',
        name: 'projectCreate',
        component: projectCreate,
        meta: ['项目管理', '新建项目'],
    }, {
        path: 'invite-audit',
        component: inviteAudit,
        meta: ['项目管理', '邀请审核'],
    }, {
        path: 'signatureManager',
        component: signatureManager,
        meta: ['企业签章管理'],
    }, {
        path: 'enterpriseSignature',
        component: enterpriseSignature,
        meta: ['企业签章', '签章'],
    }, {
        path: 'enterpriseSignature/addSignature',
        component: addSignature,
        meta: ['新增签章', '新增签章'],
    }, {
        path: 'product',
        component: product,
        meta: ['产品管理', '产品管理'],
    }, {
        path: 'news-notice',
        component: newsList,
        name: 'newsList',
        meta: ['平台基础管理', '平台新闻公告'],
    }, {
        path: 'news-notice/newsPublish',
        component: newsPublish,
        name: 'newsPublish',
        meta: ['平台基础管理', '平台新闻公告', '发布新闻'],
    }, {
        path: 'accreditation',
        component: accreditation,
        meta: ['企业管理', '认证管理'],
    }, {
        path: 'added-services',
        component: addedServices,
        meta: ['企业管理', '增值服务管理'],
    }, {
        path: 'maintain',
        component: enterpriseManager,
        meta: ['企业管理', '企业维护'],
    }]
}

export default router;
