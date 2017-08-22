import fetch from '@/config/fetch'

/**
 * 获取企业子账户信息
 */

export const accountInfosListRequest = () => fetch(`/core/core/api/v1/financialManager/accountInfos`);

/**
 * 根据企业id获取银行信息, 支持分页
 */

export const accountStatementListRequest = options =>{
    return fetch(`/core/core/api/v1/financialManager/${options.accoundId}/accountStatement/`);
}

/**
 * 取得企业项目邀请（受邀请）列表, 支持分页
 */

export const projectListRequest = options => fetch(`/core/core/api/v1/enterprise/projects/vo`, options.params);

/**
 * 企业接受（拒绝）邀请
 */

export const modifyProjectInvitStatusRequest = options =>{
    return fetch(`/core/core/api/v1/enterprise/${options.eid}/projects/${options.pid}/invite/${options.inviteStatus}`, {}, 'patch');
}

/**
 * 根据产品code获取所有企业角色信息
 */
export const enterpriseRolesListRequest = options =>{
    return fetch(`/core/core/api/v1/products/${options.productCode}/ent_roles`);
}

/**
 * 取得未绑定角色列表信息
 */

export const getUnbindedRolesListRequest = () =>{
    return fetch(`/core/core/api/v1/enterprise/roles`, {});
}

/**
 * 取得角色信息列表, 支持分页
 */

export const getRolesListRequest = options =>{
    return fetch(`/core/core/api/v1/enterprise/${options.eid}/roles`,options.params);
}

/**
 * 取得企业列表, 支持分页
 */

export const enterpriseListRequest = options =>{
    return fetch(`/core/core/api/v1/enterprises`, options.params);
}

/**
 * 平台项目列表, 支持分页
 */
export const enterpriseProjectsRequest = options => fetch(`/core/core/api/v1/enterpriseProjects/${inviteStatus}/state/${state}`, options.params);

/**
 * 获取企业准入信息
 */
export const veyiterpriseAccessRequest = options => {
    return fetch(`/core/core/api/v1/enterprises/veyiterpriseAccess/${options.id}`, options.params);
}

/**
 * 平台项目列表, 支持分页
 */
export const enterpriseProjectListRequest = options => fetch(`/core/core/api/v1/enterpriseProjects/${options.inviteStatus}/state/${options.state}`);

/**
 * 绑定企业项目和角色
 */
export const bindProjectRequest = options => fetch(`/core/core/api/v1/entProject/${options.entRole}/roles/${options.pid}/${options.productCode}`, options.body, 'put');

/**
 * 解绑企业项目和角色
 */
export const debindProjectRequest = options => fetch(`/core/core/api/v1/entProject/${options.entRole}/roles/${options.pid}/remove`, options.body, 'put');

/**
 * 取得指企业角色信息
 */
export const getRolesByEnterpriseRequest = options => fetch(`/core/core/api/v1/products/${options.code}/ent_roles/${options.id}`, options.id);

/**
 * 获取企业项目任意角色
 */
export const getRolesByProjectRequest = options => fetch(`/core/core/api/v1/enterpriseProjects/${options.pid}`, options.params);

/**
 * 新增角色信息
 */
export const createRoleRequest = options => fetch(`/core/core/api/v1/enterprise/${options.eid}/roles`, options.params, 'put');

/**
 * 修改角色信息
 */
export const modifyRoleRequest = options => fetch(`/core/core/api/v1/products/ent_roles/roles/${options.id}`, options.body, 'patch');

/**
 * 删除角色信息-物理删除
 */
export const deleteRoleRequest = options => fetch(`/core/core/api/v1/products/ent_roles/roles/${options.id}`, {}, 'delete');


/**
 * 新增企业开户申请
 */
export const enterpriseAccountOpenRequest = options => fetch(`/core/core/api/v1/enterprise/${options.eid}/accounts/${options.code}`, options.body, 'put');

/**
 * 审核企业项目
 */
export const AuditingProjectRequest = options => fetch(`/core/core/api/v1/projects/${options.id}/activation/${options.state}`, options.body, 'patch');

/**
 * 取得项目未绑定的产品类型
 */
export const getUnbindedEnterpriseTypesRequest = options => fetch(`/core/core/api/v1/project/${options.pid}/product/${options.code}`);

/**
 * 取得项目已绑定的产品类型
 */
export const getBindedEnterpriseTypesRequest = options => fetch(`/core/core/api/v1/project/${options.pid}/product/${options.code}/binding`);

/**
 * 开户发送短信验证码
 */
export const openAccSendSmsRequest = () => fetch(`/core/core/api/v1/sms/openAccSendSms`,{},'post');







