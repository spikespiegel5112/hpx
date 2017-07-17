import fetch from '@/config/fetch'

/**
 * 获取企业列表
 */

export const getEnterprisesList = (query) => fetch('/core/core/api/v1/enterprises',query);