
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
            meta:["风控管理","标签"]
		},{
            path : 'detail/:id',
            component :detail,
            meta:["风控管理","标签","标签详情"]
		}
    ]
}


export default router;