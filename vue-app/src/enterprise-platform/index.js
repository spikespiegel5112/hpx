
// WrapComponent
const enterpriseIndex = r => require.ensure([], () => r(require('@/main')), 'enterprise-platform-index');



export default {
    path: '/manager',
    component: enterpriseIndex,
    name: '',
    children:[

    ]
};