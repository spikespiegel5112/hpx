import fetch from '@/config/fetch'

/**
 * 账户 (后台管理)
 * @param {*} params 
 */
// 所有账户申请列表
export const applyedAccountsList = (params) => fetch(`/core/core/api/v1/enterprise/accounts`,params);

// 审批申请

export const approvalAccount = (eid,id,params) => fetch(`/core/core/api/v1/enterprise/${eid}/accounts/${id}/approval`,params,'patch');

// 账户提交(线下)
export const putAccount = (eid,id,params) => fetch(`/core/core/api/v1/enterprise/${eid}/accounts/${id}`,params,'patch');

// 取得指定账户信息
export const specifyAccount = (eid,id) => fetch(`/core/core/api/v1/enterprise/${eid}/accounts/${id}`);
