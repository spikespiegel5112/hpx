
// WrapComponent
const enterpriseIndex = r => require.ensure([], () => r(require('@/enterprise-platform/main')), 'enterprise-platform-index');

export default {
    path: '/platform',
    component: enterpriseIndex,
    name: '',
    children:[
        
    ]
};