import fetch from '@/config/fetch'

/**
 * 查询所有行业信息（不分页）
 */
export const allIndustryListRequest = () => {
    return fetch(`/credit/industry/all`);
}

/**
 * 第三方企业填报信息查询
 */
export const templateReportListRequest = options => {
    return fetch(`/credit/tp/report/${options.eid}`, options.params);
}

/**
 * 第三方企业填报
 */
export const submitTemplateReportListRequest = options => {
    return fetch(`/credit/tp/report/${options.eid}`, options.params, 'put');
}

/**
 * 第三方企业填报详情
 */
export const templateReportDetailRequest = options => {
    return fetch(`/credit/tp/report/${options.eid}/${options.id}`, options.params);
}

/**
 * 根据行业查询模型
 */
export const scoringmodelNameByIndustryRequest = (options) => {
    return fetch(`/credit/tp/scoringmodel/${options.params.eid}/model/${options.params.hid}`);
}

/**
 * 查询打分卡模型信息
 */
export const scoringmodelByIndustryRequest = (params) => {
    return fetch(`/credit/tp/scoringmodel/${params.eid}/${params.id}`);
}
