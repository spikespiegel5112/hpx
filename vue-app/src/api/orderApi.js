import fetch from '@/config/fetch'

/**
 * 客户管理-获取供应商列表
 */
export const getSupplierList = (pjId,params) => fetch(`/core/core/api/v1/enterpriseProjects/${pjId}/supplier`,params)


/**
 * 客户管理-获取需方列表
 */
export const getDemanderList = (pjId,params) => fetch(`/core/core/api/v1/enterpriseProjects/${pjId}/demandSide`,params)


/**
 * 新增客户利率信息
 */
export const interestRate = (params) => fetch(`/order/interestRate`,params,'post')


/**
 * 获取指定客户利率信息
 */
export const getInterest = (eid,pid) => fetch(`/order/interestRate/enterprises/${eid}/projectId/${pid}`)


/**
 * 修改客户利率信息
 */
export const updateInterest = (id,params) => fetch(`/order/interestRate/${id}`,params,'patch')

