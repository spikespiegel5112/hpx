import fetch from '@/config/fetch'
/**
 * 客户管理-获取供应商列表
 */
export const getSupplierList = (pjId, params) => fetch(`/core/core/api/v1/enterpriseProjects/${pjId}/supplier`, params)

/**
 * 客户管理-获取资方列表
 */
export const getCapitalList = (pid) => fetch(`/core/core/api/v1/enterpriseProjects/${pid}/capitalist`)

/**
 * 客户管理-获取需方列表
 */
export const getDemanderList = (pjId, params) => fetch(`/core/core/api/v1/enterpriseProjects/${pjId}/demandSide`, params)


/**
 * 新增客户利率信息
 */
export const interestRate = (params) => fetch(`/order/interestRate`, params, 'post')


/**
 * 获取指定客户利率信息
 */
export const getInterest = (eid, pid) => fetch(`/order/interestRate/enterprises/${eid}/projectId/${pid}`)


/**
 * 修改客户利率信息
 */
export const updateInterest = (id, params) => fetch(`/order/interestRate/${id}`, params, 'patch')


/**
 * 资方--采购合同--获取采购合同列表
 */
export const getPurchaseContractList = (query) => fetch('/order/contract/listC', query);

/**
 * 资方--采购合同--签章预览
 */
// 获取合同详情
export const getPurchaseContractDetail = (id) => fetch(`/order/contract/preview/${id}`, {});
// 获取附录信息
export const getAppendixList = (id) => fetch(`/order/contract/preview/${id}`, {});
// 获取所有的签章
export const getAllSignature = (eid) => fetch(`/core/core/api/v1/venterprise/${eid}/esigns`, {});
// 发送签章短信验证码
export const coSmgCode = (phone, strCode) => fetch(`/order/contract/SendSms?phone=${phone}&strCode=${strCode}`, {}, 'post');
// 提交签章
export const subSignature = (eid) => fetch(`/core/core/api/v1/venterprise/${eid}/esigns`, {});

/**
 * 资方--采购合同--确认收货列表
 */
export const getReceiptList = (tContractId) => fetch(`/order/contract/queryReceivingDetail?tContractId=${tContractId}`, {});

// 上传合同
export const uploadContract = (id) => `/order/contract/uploadingContract/${id}`;

/**
 * 资方--采购合同--补发申请,退款申请,补购申请
 */
export const saleManager = (type,params) => fetch(`/order/refund/add?receiptsType=${type}`, params,'post');

/**
 * 资方--采购合同--生成补货单
 */
export const supplementOrder = (id) => fetch(`/order/refund/get/${id}`, {});


/**
 * 获取订单列表 ordersList
 */
export const ordersList = (params) => fetch(`/order/salesOrder/search`, params)

/**
 * 获取订单详情 ordersDetail
 */
export const ordersDetail = (orderId) => fetch(`/order/salesOrder/getDetail/${orderId}`)

/**
 * 下载订单详情 ordersDetailDownload
 */
export const ordersDetailDownload = (orderId) => `/order/salesOrder/downloadDetail/${orderId}`;

/**
 * 修改订单详情 salesOrder/updateDetail
 */
export const ordersDetailRevise = (params) => fetch(`/order/salesOrder/updateDetail`,params,'patch');

/**
 * 获取售后管理单据列表
 */
export const afterSaleList = (receiptsType) => fetch(`/order/refund/list`, receiptsType)

/**
 * 获取售后管理单据明细
 */
export const afterSaleDetail = (tAfterSaleId) => fetch(`/order/refund/queryDetail`, tAfterSaleId)

/**
 * 补发单确认收货
 */
export const receiving = (id) => fetch(`/order/refund/updateStatus/${id}`, {}, 'patch')

/**
 * 我的合同
 */
export const listMyRequest = options => fetch(`core/huaqian/api/v1/contract/listMy`, options.params)

/**
 * 货品列表条件查询
 */
export const getGoodsMaintenanceListRequest = options =>{
    return fetch(`core/huaqian/api/v1/goodsMaintenance/list`, options.params)
}

/**
 * 货品列表条件查询
 */
export const addGoodRequest = options =>{
    return fetch(`core/huaqian/api/v1/goodsMaintenance/add`, options.body, 'post')
}

/**
 * 修改货品信息
 */
export const updateGoodsMaintenanceListRequest = options =>{
    return fetch(`core/huaqian/api/v1/goodsMaintenance/update/${options.id}`, options.body, 'patch')
}

/**
 * 供应商售后审核(type为Y通过，N拒绝)
 */
export const refundApproval = (id,type) => fetch(`/order/refund/refundApproval?id=${id}&type=${type}`,{},'patch')

/**
 * 根据售后生成代付款信息(类型type 退款1 补购2)
 */
export const saveAfterSalePendingPayment = (type,params) => fetch(`/order/payment/saveAfterSalePendingPayment/${type}`,params,'patch')

/**
 * 获取支付列表
 */
export const payList = (params) => fetch(`/order/payment/search`,params)

/**
 * 获取支付明细信息
 */
export const payDetail =(paymentId) => fetch(`/order/payment/getDetail?paymentId=${paymentId}`)
