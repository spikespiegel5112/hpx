
import wrapComponent from './container'

// 需方首页
import homeDemander from '@/purchase-order-financing/home-demander'
import testD from '@/purchase-order-financing/test-demander'
import zfdenabderList from '@/purchase-order-financing/investors/customerManagement/demanderList'
import zfsupplierList from '@/purchase-order-financing/investors/customerManagement/supplierList'
import refundManagement from '@/purchase-order-financing/investors/after-sale-management/refundManagement/refundManagement'
import refundManagementDetail from '@/purchase-order-financing/investors/after-sale-management/refundManagement/refundManagementDetail'
import replacementManagement from '@/purchase-order-financing/investors/after-sale-management/replacementManagement/replacementManagement'
import replacementManagementDetail from '@/purchase-order-financing/investors/after-sale-management/replacementManagement/replacementManagementDetail'

import buyInManagement from '@/purchase-order-financing/investors/after-sale-management/buyInManagement/buyInManagement'
import buyInManagementDetail from '@/purchase-order-financing/investors/after-sale-management/buyInManagement/buyInManagementDetail'
// 路径path 1 以purchase-order-financing为标准 2 需方 命名 前面 加上xf_  资方 zf_ 供应商 gf_

//货品维护
import goodsMaintenance from '@/purchase-order-financing/investors/goodsMaintenance'

// 业务管理
import business from '@/purchase-order-financing/investors/business-manager'

export default {
    path : '/porderf/:pjId',
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
			path: 'zf_demander',
			component: zfdenabderList,
			meta: ['需方列表', '资方'],
        },{
			path: 'zf_supplier',
			component: zfsupplierList,
			meta: ['供应商列表', '资方'],
        },{
			path: 'zf_orders',
			component: business.orderManager,
			meta: ['业务管理', '订单管理'],
        },{
			path: 'zf_refundManagement',
			component: refundManagement,
			meta: ['售后管理', '退款管理'],
        },{
			path: 'zf_refundManagement/zf_refundManagementDetail/:tAfterSaleId',
			component: refundManagementDetail,
			meta: ['售后管理', '退款管理明细'],
        },{
			path: 'zf_replacementManagement',
			component: replacementManagement,
			meta: ['售后管理', '补发管理'],
        },{
			path: 'zf_replacementManagement/zf_replacementManagementDetail/:tAfterSaleId',
			component: replacementManagementDetail,
			meta: ['售后管理', '补发管理明细'],
        },{
			path: 'zf_buyInManagement',
			component: buyInManagement,
			meta: ['售后管理', '补购管理'],
        },{
			path: 'zf_buyInManagement/zf_buyInManagementDetail/:tAfterSaleId',
			component: buyInManagementDetail,
			meta: ['售后管理', '补购管理明细'],
        },{
			path: 'mtngoods',
			component: goodsMaintenance,
			meta: ['货品维护'],
        },{
			path: 'zf_orders/detail/:orderId',
			component: business.orderDetail,
			meta: ['业务管理', '订单管理','订单详情'],
        },{
			path: 'sales_contract_management',
			component: business.salesContractManagement,
			meta: ['业务管理', '订单管理','销售合同'],
        }
    ]
}
