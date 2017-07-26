
const labelWrap = r => require.ensure([], () => r(require('./label-wrap')), 'label-wrap');
const label = r => require.ensure([], () => r(require('./main')), 'label-main');
const detail = r => require.ensure([], () => r(require('./detail')), 'label-detail');
const router = {
    path: 'label-info',
    component: labelWrap,
    children : [
        {
            path : '',
            component :label,
            meta:["test","test"]
		},{
            path : 'detail/:id',
            component :detail,
            meta:["test","test"]
		}
    ]
}


export default router;