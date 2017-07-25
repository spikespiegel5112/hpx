
const modelWrap = r => require.ensure([], () => r(require('./model-wrap')), 'model-wrap');
const model = r => require.ensure([], () => r(require('./model')), 'model');

const router = {
    path: 'model',
    component: modelWrap,
    children : [
        {
            path : '',
            component :model,
            meta:["test","test"]
		}
    ]
}


export default router;