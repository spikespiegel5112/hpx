import fetch from '@/config/fetch'
/**
 * 角色授权
 * @param {*} eid path路径
 * @param {*} params 参数（body , query , formdata）
 */
// 获取 当前角色已有权限
export const getRoleAuth = (roleCode) => fetch(`/core/core/api/v1/permissions/role_per/${roleCode}`)

// 新增 角色授权
export const putRoleAuth = (roleCode,params) => fetch(`/core/core/api/v1/rolePermissions/${roleCode}/role_per`,params,'put');
// 修改 角色授权
export const patchRoleAuth = (roleCode,params) => fetch(`/core/core/api/v1/rolePermissions/${roleCode}/role_per`,params,'patch');
