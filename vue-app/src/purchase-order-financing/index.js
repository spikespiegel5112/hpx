
import wrapComponent from './container'

// 需方首页
import homeDemander from '@/purchase-order-financing/home-demander'
import testD from '@/purchase-order-financing/test-demander'
import zfdenabderList from '@/purchase-order-financing/investors/customerManagement/demanderList'
import zfsupplierList from '@/purchase-order-financing/investors/customerManagement/supplierList'
import purchaseContract from '@/purchase-order-financing/investors/purchaseContract'
import investors from '@/purchase-order-financing/investors'
import signature from '@/purchase-order-financing/investors/purchaseContract/signature'
import receipt from '@/purchase-order-financing/investors/purchaseContract/receipt'
import apply from '@/purchase-order-financing/investors/purchaseContract/apply'

import zf_refundManagement from '@/purchase-order-financing/investors/after-sale-management/refundManagement/refundManagement'
import zf_refundManagementDetail from '@/purchase-order-financing/investors/after-sale-management/refundManagement/refundManagementDetail'
import zf_replacementManagement from '@/purchase-order-financing/investors/after-sale-management/replacementManagement/replacementManagement'
import zf_replacementManagementDetail from '@/purchase-order-financing/investors/after-sale-management/replacementManagement/replacementManagementDetail'
import zf_buyInManagement from '@/purchase-order-financing/investors/after-sale-management/buyInManagement/buyInManagement'
import zf_buyInManagementDetail from '@/purchase-order-financing/investors/after-sale-management/buyInManagement/buyInManagementDetail'

import gf_refundManagement from '@/purchase-order-financing/supplier/after-sale-management/refundManagement/refundManagement'
import gf_refundManagementDetail from '@/purchase-order-financing/supplier/after-sale-management/refundManagement/refundManagementDetail'
import gf_replacementManagement from '@/purchase-order-financing/supplier/after-sale-management/replacementManagement/replacementManagement'
import gf_replacementManagementDetail from '@/purchase-order-financing/supplier/after-sale-management/replacementManagement/replacementManagementDetail'
import gf_buyInManagement from '@/purchase-order-financing/supplier/after-sale-management/buyInManagement/buyInManagement'
import gf_buyInManagementDetail from '@/purchase-order-financing/supplier/after-sale-management/buyInManagement/buyInManagementDetail'

import gf_agencyReceipt from '@/purchase-order-financing/supplier/money/agency-receipt/agency-receipt'
import gf_agencyReceiptDetail from '@/purchase-order-financing/supplier/money/agency-receipt/detail'

import gf_agencyReceiptRecord from '@/purchase-order-financing/supplier/money/agency-receipt-record/agency-receipt-record'
import gf_agencyReceiptRecordDetail from '@/purchase-order-financing/supplier/money/agency-receipt-record/detail'

import gf_paymentReceipt from '@/purchase-order-financing/supplier/money/payment-receipt/payment-receipt'
import gf_paymentReceiptDetail from '@/purchase-order-financing/supplier/money/payment-receipt/detail'

import gf_paymentReceiptRecord from '@/purchase-order-financing/supplier/money/payment-receipt-record/payment-receipt-record'
import gf_paymentReceiptRecordDetail from '@/purchase-order-financing/supplier/money/payment-receipt-record/detail'
// 路径path 1 以purchase-order-financing为标准 2 需方 命名 前面 加上xf_  资方 zf_ 供应商 gf_

//货品维护
import goodsMaintenance from '@/purchase-order-financing/investors/goodsMaintenance'

// 业务管理
import business from '@/purchase-order-financing/investors/business-manager'

export default {
    path : '/porderf/:pjId',
    component : wrapComponent,
    children : [{
			path: '/',
			component: investors,
			meta: ['首页', '资方'],
        },{
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
			path: 'zf_purchaseContract',
			component: purchaseContract,
			meta: ['资方', '采购合同'],
        },{
			path: 'zf_purchaseContract/signature/:id?',
			component: signature,
			meta: ['资方', '采购合同', '签章'],
        },{
			path: 'zf_purchaseContract/receipt/:id?',
			component: receipt,
			meta: ['资方', '采购合同', '确认收货'],
        },{
			path: 'zf_purchaseContract/receipt/:id?/apply/:bid?/:type?',
			component: apply,
			meta: ['资方', '采购合同', '确认收货','补发申请'],
        },{
			path: 'zf_orders',
			component: business.orderManager,
			meta: ['业务管理', '订单管理'],
        },{
			path: 'zf_refundManagement',
			component: zf_refundManagement,
			meta: ['售后管理', '退款管理'],
        },{
			path: 'zf_refundManagement/zf_refundManagementDetail/:tAfterSaleId',
			component: zf_refundManagementDetail,
			meta: ['售后管理', '退款管理明细'],
        },{
			path: 'zf_replacementManagement',
			component: zf_replacementManagement,
			meta: ['售后管理', '补发管理'],
        },{
			path: 'zf_replacementManagement/zf_replacementManagementDetail/:tAfterSaleId',
			component: zf_replacementManagementDetail,
			meta: ['售后管理', '补发管理明细'],
        },{
			path: 'zf_buyInManagement',
			component: zf_buyInManagement,
			meta: ['售后管理', '补购管理'],
        },{
			path: 'zf_buyInManagement/zf_buyInManagementDetail/:tAfterSaleId',
			component: zf_buyInManagementDetail,
			meta: ['售后管理', '补购管理明细'],
        },{
			path: 'zf_orders/detail/:orderId/:demanderId',
			component: business.orderDetail,
			meta: ['业务管理', '订单管理','订单详情'],
        },{
			path: 'zf_orders/createcp/:orderId/:demanderId',
			component: business.orderCreateCp,
			meta: ['业务管理', '订单管理','生成采购合同'],
        },{
			path: 'zf_orders/createsc/:orderId/:demanderId',
			component: business.orderCreateSc,
			meta: ['业务管理', '订单管理','生成销售合同'],
        },{
			path: 'gf_agencyReceipt',
			component: gf_agencyReceipt,
			meta: ['供应商', '待收款'],
        },{
			path: 'gf_agencyReceipt/gf_agencyReceiptDetail/:paymentId',
			component: gf_agencyReceiptDetail,
			meta: ['供应商', '待收款明细'],
        },{
			path: 'gf_agencyReceiptRecord',
			component: gf_agencyReceiptRecord,
			meta: ['供应商', '历史收款'],
        },{
			path: 'gf_agencyReceiptRecord/gf_agencyReceiptRecordDetail/:paymentId',
			component: gf_agencyReceiptRecordDetail,
			meta: ['供应商', '历史收款明细'],
        },{
			path: 'gf_paymentReceipt',
			component: gf_paymentReceipt,
			meta: ['供应商', '待付款'],
        },{
			path: 'gf_paymentReceipt/gf_paymentReceiptDetail/:paymentId',
			component: gf_paymentReceiptDetail,
			meta: ['供应商', '待付款明细'],
        },{
			path: 'gf_paymentReceiptRecord',
			component: gf_paymentReceiptRecord,
			meta: ['供应商', '历史付款'],
        },{
			path: 'gf_paymentReceiptRecord/gf_paymentReceiptRecordDetail/:paymentId',
			component: gf_paymentReceiptRecordDetail,
			meta: ['供应商', '历史付款明细'],
        }
    ]
}
