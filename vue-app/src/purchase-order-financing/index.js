
import wrapComponent from './container'

// 需方首页
import homeDemander from '@/purchase-order-financing/home-demander'
import testD from '@/purchase-order-financing/test-demander'
import zfdenabderList from '@/purchase-order-financing/investors/customerManagement/demanderList'
import zfsupplierList from '@/purchase-order-financing/investors/customerManagement/supplierList'
import purchaseContract from '@/purchase-order-financing/investors/purchaseContract'
import salesContract from '@/purchase-order-financing/investors/salesContract'
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
import gf_myContract from '@/purchase-order-financing/supplier/myContract/index'
import gf_myContractDetail from '@/purchase-order-financing/supplier/myContract/receivingDetail'

import gf_agencyReceipt from '@/purchase-order-financing/supplier/money/agency-receipt/agency-receipt'
import gf_agencyReceiptDetail from '@/purchase-order-financing/supplier/money/agency-receipt/detail'
import gf_agencyReceiptRecord from '@/purchase-order-financing/supplier/money/agency-receipt-record/agency-receipt-record'
import gf_agencyReceiptRecordDetail from '@/purchase-order-financing/supplier/money/agency-receipt-record/detail'
import gf_paymentReceipt from '@/purchase-order-financing/supplier/money/payment-receipt/payment-receipt'
import gf_paymentReceiptDetail from '@/purchase-order-financing/supplier/money/payment-receipt/detail'
import gf_paymentReceiptRecord from '@/purchase-order-financing/supplier/money/payment-receipt-record/payment-receipt-record'
import gf_paymentReceiptRecordDetail from '@/purchase-order-financing/supplier/money/payment-receipt-record/detail'

import xf_agencyReceipt from '@/purchase-order-financing/demander/money/agency-receipt/agency-receipt'
import xf_agencyReceiptDetail from '@/purchase-order-financing/demander/money/agency-receipt/detail'
import xf_agencyReceiptRecord from '@/purchase-order-financing/demander/money/agency-receipt-record/agency-receipt-record'
import xf_agencyReceiptRecordDetail from '@/purchase-order-financing/demander/money/agency-receipt-record/detail'
import xf_paymentReceipt from '@/purchase-order-financing/demander/money/payment-receipt/payment-receipt'
import xf_paymentReceiptDetail from '@/purchase-order-financing/demander/money/payment-receipt/detail'
import xf_paymentReceiptRecord from '@/purchase-order-financing/demander/money/payment-receipt-record/payment-receipt-record'
import xf_paymentReceiptRecordDetail from '@/purchase-order-financing/demander/money/payment-receipt-record/detail'
import xf_order from '@/purchase-order-financing/demander/order/index'
import xf_orderDetail from '@/purchase-order-financing/demander/order/orderDetail'
import xf_myContract from '@/purchase-order-financing/demander/myContract/index'

import gf_address from '@/purchase-order-financing/supplier/address/address'
import zf_address from '@/purchase-order-financing/investors/address/address'

import gf_productMaintenance from '@/purchase-order-financing/supplier/product-maintenance/product-maintenance'
import zf_productMaintenance from '@/purchase-order-financing/investors/product-maintenance/product-maintenance'

import xf_warning from '@/purchase-order-financing/demander/warning/warning'
import zf_warning from '@/purchase-order-financing/investors/warning/warning'

import zf_deliveryNote from '@/purchase-order-financing/investors/delivery-note/delivery-note'
import zf_deliveryNoteDetail from '@/purchase-order-financing/investors/delivery-note/detail'
import xf_deliveryNote from '@/purchase-order-financing/demander/delivery-note/delivery-note'
import xf_deliveryNoteDetail from '@/purchase-order-financing/demander/delivery-note/detail'
// 路径path 1 以purchase-order-financing为标准 2 需方 命名 前面 加上xf_  资方 zf_ 供应商 gf_

//货品维护
import goodsMaintenance from '@/purchase-order-financing/investors/goodsMaintenance'

// 业务管理
import business from '@/purchase-order-financing/investors/business-manager'

export default {
    path : '/porderf/:pjId',
    component : wrapComponent,
    children : [{
			path: '',
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
			meta: ['资方', '需方列表'],
        },{
			path: 'zf_supplier',
			component: zfsupplierList,
			meta: ['资方', '供应商列表'],
        },{
			path: 'zf_purchaseContract',
			component: purchaseContract,
			meta: ['资方', '采购合同'],
        },{
			path: 'zf_salesContract',
			component: salesContract,
			meta: ['资方', '销售合同'],
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
			meta: ['资方', '订单管理'],
        },{
			path: 'zf_refundManagement',
			component: zf_refundManagement,
			meta: ['售后管理', '退款管理'],
        },{
			path: 'zf_refundManagement/zf_refundManagementDetail/:tAfterSaleId',
			component: zf_refundManagementDetail,
			meta: ['售后管理', '退款管理', '退款管理明细'],
        },{
			path: 'zf_replacementManagement',
			component: zf_replacementManagement,
			meta: ['售后管理', '补发管理'],
        },{
			path: 'zf_replacementManagement/zf_replacementManagementDetail/:tAfterSaleId',
			component: zf_replacementManagementDetail,
			meta: ['售后管理', '补发管理', '补发管理明细'],
        },{
			path: 'zf_buyInManagement',
			component: zf_buyInManagement,
			meta: ['售后管理', '补购管理'],
        },{
			path: 'zf_buyInManagement/zf_buyInManagementDetail/:tAfterSaleId',
			component: zf_buyInManagementDetail,
			meta: ['售后管理', '补购管理', '补购管理明细'],
        },{
			path: 'zf_orders/detail/:orderId/:demanderId',
			component: business.orderDetail,
			meta: ['资方', '订单管理','订单详情'],
        },{
			path: 'zf_orders/createcp/:orderId/:demanderId',
			component: business.orderCreateCp,
			meta: ['资方', '订单管理','生成采购合同'],
        },{
			path: 'zf_orders/createsc/:orderId/:demanderId',
			component: business.orderCreateSc,
			meta: ['资方', '订单管理','生成销售合同'],
        },{
			path: 'gf_agencyReceipt',
			component: gf_agencyReceipt,
			meta: ['供应商', '待收款'],
        },{
			path: 'gf_agencyReceipt/gf_agencyReceiptDetail/:paymentId',
			component: gf_agencyReceiptDetail,
			meta: ['供应商', '待收款', '待收款明细'],
        },{
			path: 'gf_agencyReceiptRecord',
			component: gf_agencyReceiptRecord,
			meta: ['供应商', '历史收款'],
        },{
			path: 'gf_agencyReceiptRecord/gf_agencyReceiptRecordDetail/:paymentId',
			component: gf_agencyReceiptRecordDetail,
			meta: ['供应商', '历史收款', '历史收款明细'],
        },{
			path: 'gf_paymentReceipt',
			component: gf_paymentReceipt,
			meta: ['供应商', '待付款'],
        },{
			path: 'gf_paymentReceipt/gf_paymentReceiptDetail/:paymentId',
			component: gf_paymentReceiptDetail,
			meta: ['供应商', '待付款', '待付款明细'],
        },{
			path: 'gf_paymentReceiptRecord',
			component: gf_paymentReceiptRecord,
			meta: ['供应商', '历史付款'],
        },{
			path: 'gf_paymentReceiptRecord/gf_paymentReceiptRecordDetail/:paymentId',
			component: gf_paymentReceiptRecordDetail,
			meta: ['供应商', '历史付款', '历史付款明细'],
        },{
			path: 'xf_agencyReceipt',
			component: xf_agencyReceipt,
			meta: ['需方', '待收款'],
        },{
			path: 'xf_agencyReceipt/xf_agencyReceiptDetail/:paymentId',
			component: xf_agencyReceiptDetail,
			meta: ['需方', '待收款', '待收款明细'],
        },{
			path: 'xf_agencyReceiptRecord',
			component: xf_agencyReceiptRecord,
			meta: ['需方', '历史收款'],
        },{
			path: 'xf_agencyReceiptRecord/xf_agencyReceiptRecordDetail/:paymentId',
			component: xf_agencyReceiptRecordDetail,
			meta: ['需方', '历史收款', '历史收款明细'],
        },{
			path: 'xf_paymentReceipt',
			component: xf_paymentReceipt,
			meta: ['需方', '待付款'],
        },{
			path: 'xf_paymentReceipt/xf_paymentReceiptDetail/:paymentId',
			component: xf_paymentReceiptDetail,
			meta: ['需方', '待付款', '待付款明细'],
        },{
			path: 'xf_paymentReceiptRecord',
			component: xf_paymentReceiptRecord,
			meta: ['需方', '历史付款'],
        },{
			path: 'xf_paymentReceiptRecord/xf_paymentReceiptRecordDetail/:paymentId',
			component: xf_paymentReceiptRecordDetail,
			meta: ['需方', '历史付款', '历史付款明细'],
        },{
			path: 'gf_address',
			component: gf_address,
			meta: ['供应商', '地址维护'],
        },{
			path: 'zf_address',
			component: zf_address,
			meta: ['资方', '地址维护'],
        },{
			path: 'gf_productMaintenance',
			component: gf_productMaintenance,
			meta: ['供应商', '货品维护'],
        },{
			path: 'zf_productMaintenance',
			component: zf_productMaintenance,
			meta: ['资方', '货品维护'],
        },{
			path: 'xf_warning',
			component: xf_warning,
			meta: ['需方', '风控预警'],
        },{
			path: 'zf_warning',
			component: zf_warning,
			meta: ['资方', '风控预警'],
        },{
			path: 'zf_deliveryNote',
			component: zf_deliveryNote,
			meta: ['资方', '提货单'],
        },{
			path: 'zf_deliveryNote/zf_deliveryNoteDetail/:tOrderDetailId',
			component: zf_deliveryNoteDetail,
			meta: ['资方', '提货单', '提货单明细'],
        },{
			path: 'xf_deliveryNote',
			component: xf_deliveryNote,
			meta: ['需方', '提货单'],
        },{
			path: 'xf_deliveryNote/xf_deliveryNoteDetail/:tOrderDetailId',
			component: xf_deliveryNoteDetail,
			meta: ['需方', '提货单', '提货单明细'],
        },{
			path: 'gf_myContract',
			component: gf_myContract,
			meta: ['供应商', '我的合同'],
        },{
			path: 'gf_myContract/gf_myContractDetail/:tContractId',
			component: gf_myContractDetail,
			meta: ['供应商', '我的合同', '收货单清单'],
        },{
			path: 'xf_order',
			component: xf_order,
			meta: ['需方', '订单管理'],
        },{
			path: 'xf_order/xf_orderDetail/:id',
			component: xf_orderDetail,
			meta: ['需方', '订单管理','查看明细'],
        },{
			path: 'xf_myContract',
			component: xf_myContract,
			meta: ['需方', '我的合同'],
        }


		
    ]
}
