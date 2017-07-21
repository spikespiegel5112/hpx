const hpxManagerIndex = r => require.ensure([], () => r(require('@/hpx-manager/main')), 'hpx-manager-index');
const home = r => require.ensure([], () => r(require('@/hpx-manager/home')), 'hpx-manager-home');
const detail = r => require.ensure([], () => r(require('@/hpx-manager/detail')), 'hpx-manager-test');
const template = r => require.ensure([], () => r(require('@/hpx-manager/template')), 'hpx-manager-template');
const inviteAudit = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/inviteAudit')), 'inviteAudit');
const projectsMaintenance = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectsMaintenance')), 'projectsMaintenance');
const projectEdit = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectEdit')), 'projectEdit');
const projectCreate = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectCreate')), 'projectCreate');

const signatureManager =  r => require.ensure([], () => r(require('@/hpx-manager/signatureManager')), 'signatureManager');
const enterpriseSignature =  r => require.ensure([], () => r(require('@/hpx-manager/enterpriseSignature')), 'enterpriseSignature');
const addSignature =  r => require.ensure([], () => r(require('@/hpx-manager/enterpriseSignature/addSignature')), 'addSignature');
const product =  r => require.ensure([], () => r(require('@/hpx-manager/product')), 'product');

const accreditation = r => require.ensure([], () => r(require('@/hpx-manager/accreditation')), 'hpx-manager-accreditation');
const addedServices = r => require.ensure([], () => r(require('@/hpx-manager/added-services')), 'hpx-manager-addedServices');


const router = {
    path: '/manager',
    component: hpxManagerIndex,
    name: 'hpxManagerIndex',
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
        },{
            path: 'create-pro',
            name: 'projectCreate',
            component: projectCreate,
            meta: ['项目管理', '新建项目'],
        }, {
            path: 'invite-audit',
            component: inviteAudit,
            meta: ['项目管理', '邀请审核'],
        },{
            path: 'signatureManager',
            component: signatureManager,
            meta: ['企业签章管理'],
        },{
            path: 'enterpriseSignature',
            component: enterpriseSignature,
            meta: ['企业签章'],
        },{
            path: 'enterpriseSignature/addSignature',
            component: addSignature,
            meta: ['新增签章'],
        },{
            path: 'product',
            component: product,
            meta: ['产品管理'],
        },{
            path: 'accreditation',
            component: accreditation,
            meta: ['企业管理', '认证管理'],
        },{
            path: 'added-services',
            component: addedServices,
            meta: ['企业管理', '增值服务管理'],
        }
    ]
}

export default router;
