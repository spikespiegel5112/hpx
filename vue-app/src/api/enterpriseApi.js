import fetch from '@/config/fetch'

/**
 * 获取企业子账户信息
 */

export const accountInfosListRequest = () =>{
    return fetch(`/core/core/api/v1/financialManager/accountInfos`);
}

/**
 * 获取企业子账户信息
 */

export const accountStatementListRequest = (options) =>{
    return fetch(`/core/core/api/v1/financialManager/${options.accountId}/accountStatement`);
}

/**
 * 取得企业项目信息列表, 支持分页
 */

export const enterpriseProjectListRequest = (options) =>{
    return fetch(`/core/core/api/v1/enterprise/projects/vo`, options.params);
}

/**
 * 取得企业列表, 支持分页
 */

export const enterpriseListRequest = query =>{
    return fetch(`/core/core/api/v1/enterprises`, query);
}

/**
 * 取得企业项目邀请记录列表
 */

export const projectsAuditListRequest = data => fetch('/core/core/api/v1/enterprise/projects/vo/', data);

/**
 * 获取企业准入信息
 */
export const veyiterpriseAccessRequest = options => {
    return fetch(`/core/core/api/v1/enterprises/veyiterpriseAccess/${options.id}`, options.params);
}
