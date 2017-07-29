import fetch from '@/config/fetch'

/**
 * 项目信息列白
 */

export const accountInfosListRequest = () =>{
    return fetch(`/core/core/api/v1/financialManager/accountInfos`);
}

/**
 * 取得企业项目信息列表, 支持分页
 */

export const enterpriseProjectListRequest = () =>{
    return fetch(`/core/core/api/v1/enterprise/projects/vo`);
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
