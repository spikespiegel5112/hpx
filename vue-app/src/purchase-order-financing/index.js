
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
import gfSignature from '@/purchase-order-financing/supplier/myContract/signature'
import xfSignature from '@/purchase-order-financing/demander/myContract/signature'
import xfPickGoods from '@/purchase-order-financing/demander/myContract/pick-goods'

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
import xf_orderAdd from '@/purchase-order-financing/demander/order/orderAdd'
import xf_myContract from '@/purchase-order-financing/demander/myContract/index'


import zf_agencyReceipt from '@/purchase-order-financing/investors/money/agency-receipt/agency-receipt'
import zf_agencyReceiptDetail from '@/purchase-order-financing/investors/money/agency-receipt/detail'
import zf_agencyReceiptRecord from '@/purchase-order-financing/investors/money/agency-receipt-record/agency-receipt-record'
import zf_agencyReceiptRecordDetail from '@/purchase-order-financing/investors/money/agency-receipt-record/detail'
import zf_paymentReceipt from '@/purchase-order-financing/investors/money/payment-receipt/payment-receipt'
import zf_paymentReceiptDetail from '@/purchase-order-financing/investors/money/payment-receipt/detail'
import zf_paymentReceiptRecord from '@/purchase-order-financing/investors/money/payment-receipt-record/payment-receipt-record'
import zf_paymentReceiptRecordDetail from '@/purchase-order-financing/investors/money/payment-receipt-record/detail'

import gf_address from '@/purchase-order-financing/supplier/address/address'
import zf_address from '@/purchase-order-financing/investors/address/address'

import gf_productMaintenance from '@/purchase-order-financing/supplier/product-maintenance/product-maintenance'
import zf_productMaintenance from '@/purchase-order-financing/investors/product-maintenance/product-maintenance'
import xf_productMaintenance from '@/purchase-order-financing/demander/product-maintenance/product-maintenance'

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
    children : [
	// 资方
		{
			path: 'investor',
			component: investors,
			meta: ['资方'],
		},
		//供应商管理
		{
			path: 'zf_demander',
			component: zfdenabderList,
			meta: ['需方管理'],
        },{
			path: 'zf_supplier',
			component: zfsupplierList,
			meta: ['供应商管理'],
		},
		// 业务管理
			// 订单管理
		{
			path: 'zf_orders',
			component: business.orderManager,
			meta: ['我的订单'],
        },
		{
			path: 'zf_orders/detail/:orderId/:demanderId',
			component: business.orderDetail,
			meta: ['我的订单','订单详情'],
        },{
			path: 'zf_orders/createcp/:orderId/:demanderId',
			component: business.orderCreateCp,
			meta: [ '我的订单','生成采购合同'],
        },{
			path: 'zf_orders/createsc/:orderId/:demanderId',
			component: business.orderCreateSc,
			meta: ['我的订单','生成销售合同'],
		},
			//采购合同
		{
			path: 'zf_order_contract',
			component: purchaseContract,
			meta: ['采购合同'],
        },{
			path: 'zf_order_contract/signature/:id?',
			component: signature,
			meta: ['采购合同', '签章'],
        },{
			path: 'zf_order_contract/receipt/:id?',
			component: receipt,
			meta: ['采购合同', '确认收货'],
        },{
			path: 'zf_order_contract/receipt/:id?/apply/:bid?/:type?',
			component: apply,
			meta: ['采购合同', '确认收货','补发申请'],
		},
			// 销售合同
		{
			path: 'zf_sale_contract',
			component: salesContract,
			meta: ['销售合同'],
		},
			// 提货单管理
		{
			path: 'zf_delivery',
			component: zf_deliveryNote,
			meta: ['提货单'],
        },{
			path: 'zf_delivery/detail/:tOrderDetailId',
			component: zf_deliveryNoteDetail,
			meta: ['提货单', '提货单明细'],
		},
		// 资金管理
		{
			path: 'zf_nopay',
			component: zf_agencyReceipt,
			meta: ['资金管理', '待收款'],
        },{
			path: 'zf_nopay/detail/:paymentId',
			component: zf_agencyReceiptDetail,
			meta: ['资金管理', '待收款', '待收款明细'],
        },{
			path: 'zf_historyreceive',
			component: zf_agencyReceiptRecord,
			meta: ['资金管理', '历史收款'],
        },{
			path: 'zf_historyreceive/detail/:paymentId',
			component: zf_agencyReceiptRecordDetail,
			meta: ['资金管理', '历史收款', '历史收款明细'],
        },{
			path: 'zf_receive',
			component: zf_paymentReceipt,
			meta: ['资金管理', '待付款'],
        },{
			path: 'zf_receive/detail/:paymentId',
			component: zf_paymentReceiptDetail,
			meta: ['资金管理', '待付款', '待付款明细'],
        },{
			path: 'zf_historypay',
			component: zf_paymentReceiptRecord,
			meta: ['资金管理', '历史付款'],
        },{
			path: 'zf_historypay/detail/:paymentId',
			component: zf_paymentReceiptRecordDetail,
			meta: ['资金管理', '历史付款', '历史付款明细'],
		},
				
		// 售后管理
		{
			path: 'zf_refund',
			component: zf_refundManagement,
			meta: ['售后管理', '退款管理'],
        },{
			path: 'zf_refund/detail/:tAfterSaleId',
			component: zf_refundManagementDetail,
			meta: ['售后管理', '退款管理', '退款管理明细'],
        },{
			path: 'zf_replacement',
			component: zf_replacementManagement,
			meta: ['售后管理', '补发管理'],
        },{
			path: 'zf_replacement/detail/:tAfterSaleId',
			component: zf_replacementManagementDetail,
			meta: ['售后管理', '补发管理', '补发管理明细'],
        },{
			path: 'zf_buyin',
			component: zf_buyInManagement,
			meta: ['售后管理', '补购管理'],
        },{
			path: 'zf_buyin/detail/:tAfterSaleId',
			component: zf_buyInManagementDetail,
			meta: ['售后管理', '补购管理', '补购管理明细'],
		},
		{
			path: 'zf_address',
			component: zf_address,
			meta: ['资方', '地址维护'],
        },{
			path: 'zf_mtngoods',
			component: zf_productMaintenance,
			meta: ['资方', '货品维护'],
        },{
			path: 'zf_warning',
			component: zf_warning,
			meta: ['资方', '风控预警'],
        },
		
	// 供方
		// 业务管理
			// 我的合同
		{
			path: 'gf_contract',
			component: gf_myContract,
			meta: ['供应商', '我的合同'],
        },{
			path: 'gf_contract/signature/:id?',
			component: gfSignature,
			meta: ['供应商', '我的合同', '签章'],
        },{
			path: 'gf_contract/detail/:tContractId',
			component: gf_myContractDetail,
			meta: ['供应商', '我的合同', '收货单清单'],
		},	
		// 资金管理
		{
			path: 'gf_nopay',
			component: gf_agencyReceipt,
			meta: ['供应商', '待收款'],
        },{
			path: 'gf_nopay/detail/:paymentId',
			component: gf_agencyReceiptDetail,
			meta: ['供应商', '待收款', '待收款明细'],
        },{
			path: 'gf_historyreceive',
			component: gf_agencyReceiptRecord,
			meta: ['供应商', '历史收款'],
        },{
			path: 'gf_historyreceive/detail/:paymentId',
			component: gf_agencyReceiptRecordDetail,
			meta: ['供应商', '历史收款', '历史收款明细'],
        },{
			path: 'gf_receive',
			component: gf_paymentReceipt,
			meta: ['供应商', '待付款'],
        },{
			path: 'gf_receive/detail/:paymentId',
			component: gf_paymentReceiptDetail,
			meta: ['供应商', '待付款', '待付款明细'],
        },{
			path: 'gf_historypay',
			component: gf_paymentReceiptRecord,
			meta: ['供应商', '历史付款'],
        },{
			path: 'gf_historypay/detail/:paymentId',
			component: gf_paymentReceiptRecordDetail,
			meta: ['供应商', '历史付款', '历史付款明细'],
		},

		// 售后管理
		{
			path: 'gf_refund',
			component: gf_refundManagement,
			meta: ['售后管理', '退款管理'],
		},{
			path: 'gf_refund/detail/:tAfterSaleId',
			component: gf_refundManagementDetail,
			meta: ['售后管理', '退款管理','退款明细'],
		},{
			path: 'gf_replacement',
			component: gf_replacementManagement,
			meta: ['售后管理', '补发管理'],
		},{
			path: 'gf_replacement/detail/:tAfterSaleId',
			component: gf_replacementManagementDetail,
			meta: ['售后管理', '补发管理','补发明细'],
		},{
			path: 'gf_buyin',
			component: gf_buyInManagement,
			meta: ['售后管理', '补购管理'],
		},{
			path: 'gf_buyin/detail/:tAfterSaleId',
			component: gf_buyInManagementDetail,
			meta: ['售后管理', '补购管理','补购明细'],
		},

		{
			path: 'gf_address',
			component: gf_address,
			meta: ['供应商', '地址维护'],
        },{
			path: 'gf_mtngoods',
			component: gf_productMaintenance,
			meta: ['供应商', '货品维护'],
        },
		
	// 需方
		{
			path: 'demander',
			component: homeDemander,
			meta: ['订单融资', '需方'],
        },{
			path: 'test-d',
			component: testD,
			meta: ['订单融资', '需方'],
		},
		
		// 业务管理
			//我的订单
		{
			path: 'xf_orders',
			component: xf_order,
			meta: ['业务管理', '订单管理'],
        },{
			path: 'xf_orders/detail/:id',
			component: xf_orderDetail,
			meta: ['业务管理', '订单管理','查看明细'],
		},{
			path: 'xf_orders/add',
			component: xf_orderAdd,
			meta: ['业务管理', '订单管理','新增订单'],
		},
			// 我的合同
		{
			path: 'xf_contract',
			component: xf_myContract,
			meta: ['业务管理', '我的合同'],
        },{
			path: 'xf_contract/signature/:id?',
			component: xfSignature,
			meta: ['业务管理', '我的合同', '签章'],
        },{
			path: 'xf_contract/pick-goods/:id?',
			component: xfPickGoods,
			meta: ['业务管理', '我的合同', '提货'],	
		},
		  // 提货单
		{
			path: 'xf_delivery',
			component: xf_deliveryNote,
			meta: ['业务管理', '提货单'],
        },{
			path: 'xf_delivery/detail/:tOrderDetailId',
			component: xf_deliveryNoteDetail,
			meta: ['业务管理', '提货单', '提货单明细'],
        },

		// 资金管理
		{
			path: 'xf_nopay',
			component: xf_agencyReceipt,
			meta: ['需方', '待收款'], 
        },{
			path: 'xf_nopay/detail/:paymentId',
			component: xf_agencyReceiptDetail,
			meta: ['需方', '待收款', '待收款明细'],
        },{
			path: 'xf_historyreceive',
			component: xf_agencyReceiptRecord,
			meta: ['需方', '历史收款'],
        },{
			path: 'xf_historyreceive/detail/:paymentId',
			component: xf_agencyReceiptRecordDetail,
			meta: ['需方', '历史收款', '历史收款明细'],
        },{
			path: 'xf_receive',
			component: xf_paymentReceipt,
			meta: ['需方', '待付款'],
        },{
			path: 'xf_receive/detail/:paymentId',
			component: xf_paymentReceiptDetail,
			meta: ['需方', '待付款', '待付款明细'],
        },{
			path: 'xf_historypay',
			component: xf_paymentReceiptRecord,
			meta: ['需方', '历史付款'],
        },{
			path: 'xf_historypay/detail/:paymentId',
			component: xf_paymentReceiptRecordDetail,
			meta: ['需方', '历史付款', '历史付款明细'],
		},
				
		{
			path: 'xf_warning',
			component: xf_warning,
			meta: ['需方', '风控预警'],
        },{
			path: 'xf_mtngoods',
			component: xf_productMaintenance,
			meta: ['需方', '货品维护'],
        },
    ]
}
