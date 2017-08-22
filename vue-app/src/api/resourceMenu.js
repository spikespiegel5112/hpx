import fetch from '@/config/fetch'
/**
 * 系统管理--获取菜单列表
 */
export const getMenuList = (productId) => fetch(`/core/core/api/v1/product/${productId}/permissions`, {});

/**
 * 系统管理--新增菜单
 */
export const addMenu = (params) => fetch(`/core/core/api/v1/permissions`, params, 'put');

/**
 * 系统管理--编辑菜单
 */
export const editMenu = (id, params) => fetch(`/core/core/api/v1/permissions/${id}`, params, 'patch');