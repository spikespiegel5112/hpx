
const hpxManagerIndex = r => require.ensure([], () => r(require('@/hpx-manager/main')), 'hpx-manager-index');
const home = r => require.ensure([], () => r(require('@/hpx-manager/home')), 'hpx-manager-home');


const router = 	{
    path: '/manager',
    component: hpxManagerIndex,
    name: '',
    children: [
        {
			path: '',
			component: home,
			meta: [],
		}
    ]
}

export default router;