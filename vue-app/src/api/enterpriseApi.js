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
 * 取得企业项目邀请（受邀请）列表, 支持分页
 */

export const projectListRequest = options => fetch(`/core/core/api/v1/enterprise/projects/vo`, options.params);

/**
 * 企业接受（拒绝）邀请
 */

export const modifyProjectInvitStatusRequest = (options) =>{
    return fetch(`/core/core/api/v1/enterprise/${options.eid}/projects/${options.pid}/invite/${options.inviteStatus}`, {}, 'patch');
}

/**
 * 根据产品code获取所有企业角色信息
 */

export const enterpriseRolesListRequest = options =>{
    return fetch(`/core/core/api/v1/products/${options.productCode}/ent_roles`);
}

/**
 * 取得企业列表, 支持分页
 */

export const enterpriseListRequest = options =>{
    return fetch(`/core/core/api/v1/enterprises`, options.params);
}

/**
 * 取得企业项目邀请记录列表
 */
export const projectsAuditListRequest = options => fetch(`/core/core/api/v1/enterpriseProjects/${inviteStatus}/state/${state}`, options.params);

/**
 * 获取企业准入信息
 */
export const veyiterpriseAccessRequest = options => {
    return fetch(`/core/core/api/v1/enterprises/veyiterpriseAccess/${options.id}`, options.params);
}

/*
** 平台项目列表, 支持分页
*/
export const enterpriseProjectListRequest = options => fetch(`/core/core/api/v1/enterpriseProjects/${options.inviteStatus}/state/${options.state}`);

/*
** 绑定企业项目和角色
*/
export const bindProjectRequest = options => fetch(`/core/core/api/v1/entProject/${options.eid}/roles/${options.pid}`, options.body, 'put');

/*
** 取得指企业角色信息
*/
export const getRolesByEnterpriseRequest = options => fetch(`/core/core/api/v1/enterpriseProjects/${options.pid}`, options.params);

/*
** 新增企业开户申请
*/
export const enterpriseAccountOpenRequest = options => fetch(`/api/v1/enterprise/${eid}/accounts`, options.body, 'put');
