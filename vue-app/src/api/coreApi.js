import fetch from '@/config/fetch'

/**
 * 获取企业列表
 */

export const getEnterprisesList = (query) => fetch('/core/core/api/v1/enterprises',query);

/*
** 企业基本信息
*/

export const getEnterpriseInfo = (eid) => fetch(`/core/core/api/v1/enterprises/${eid}`);

/*
** 更改企业信息
*/
export const patchEnterpriseInfo = (eid,body) => fetch(`/core/core/api/v1/enterprises/${eid}`,body,'patch')