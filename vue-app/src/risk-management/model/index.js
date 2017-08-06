
const modelWrap = r => require.ensure([], () => r(require('./model-wrap')), 'model-wrap');
const model = r => require.ensure([], () => r(require('./model')), 'model');
const detail = r => require.ensure([], () => r(require('./detail')), 'detail');
const check = r => require.ensure([], () => r(require('./detail/check')), 'check');

const router = {
    path: 'model',
    component: modelWrap,
    children :[
        {
            path : '',
            component : model,
            meta:["模型管理"]
		},{
            path : 'check/:id',
            component : check,
            meta:["模型信息"]
		},{
            path : 'detail/:id?',
            component : detail,
            meta:["模型编辑"]
		}
    ]
}


export default router;