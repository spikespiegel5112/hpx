
import wrapComponent from './container'

// 需方首页
import homeDemander from '@/purchase-order-financing/home-demander'
import testD from '@/purchase-order-financing/test-demander'
import zfdenabderList from '@/purchase-order-financing/ZF/customerManagement/demanderList'
import zfsupplierList from '@/purchase-order-financing/ZF/customerManagement/supplierList'
// 路径path 1 以purchase-order-financing为标准 2 需方 命名 前面 加上xf_  资方 zf_ 供应商 gf_

export default {
    path : '/porderf',
    component : wrapComponent,
    children : [{
			path: 'demander',
			component: homeDemander,
			meta: ['订单融资', '需方'],
        },{
			path: 'test-d',
			component: testD,
			meta: ['订单融资', '需方'],
        },{
			path: 'zf_denabderList',
			component: zfdenabderList,
			meta: ['需方列表', '资方'],
        },{
			path: 'zf_supplierList',
			component: zfsupplierList,
			meta: ['供应商列表', '资方'],
        }
    ]
}