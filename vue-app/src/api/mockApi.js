import fetch from '@/config/fetch'

/**
 * 获取增值服务 项
 */
export const servicesTypeList = () => fetch('/static/mock/services-add.json')