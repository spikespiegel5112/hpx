//准入管理
const admittanceManagement = r => require.ensure([], () => r(require('@/risk-management/admittance/admittanceManagement')), 'admittanceManagement');

const router = {
    path: '/enterprise-access-pre',
    component: admittanceManagement,
    name: "platform",
    children: [{
        path: '/enterprise-access-pre',
        name: 'admittanceManagement',
        meta: ['风控管理']
    }]
}

export default router;
