const hpxManagerIndex = r => require.ensure([], () => r(require('@/hpx-manager/main')), 'hpx-manager-index');
const home = r => require.ensure([], () => r(require('@/hpx-manager/home')), 'hpx-manager-home');
const detail = r => require.ensure([], () => r(require('@/hpx-manager/detail')), 'hpx-manager-test');
const template = r => require.ensure([], () => r(require('@/hpx-manager/template')), 'hpx-manager-template');

const inviteAudit = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/inviteAudit')), 'inviteAudit');
const projectsMaintenance = r => require.ensure([], () => r(require('@/hpx-manager/projectManagement/projectsMaintenance')), 'projectsMaintenance');

const router = {
    path: '/hpx2',
    component: hpxManagerIndex,
    name: 'hpxManagerIndex',
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
        path: 'template/detail/:id',
        component: detail,
        meta: ["test", "test"],
    }, {
        path: 'hpxmng/item',
        component: projectsMaintenance,
        meta: ['项目管理', '项目维护'],
    }, {
        path: 'hpxmng/projectsAudit',
        component: inviteAudit,
        meta: ['项目管理', '邀请审核'],
    }]
}

export default router;
