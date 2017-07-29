import fetch from '@/config/fetch'

/**
 * 查询所有行业信息（不分页）
 */
export const allIndustryListRequest = () => {
    return fetch(`core/credit/api/v1/industry/all`);
}

/**
 * 第三方企业填报信息查询
 */
export const templateReportRequest = (options) => {
    return fetch(`core/credit/tp/report/${options.eid}/${options.id}`, options.params);
}

/**
 * 根据行业查询模型
 */
export const scoringmodelNameByIndustryRequest = (options) => {
    return fetch(`core/credit/api/v1/tp/scoringmodel/${options.params.eid}/model/${options.params.hid}`);
}

/**
 * 查询打分卡模型信息
 */
export const scoringmodelByIndustryRequest = (params) => {
    return fetch(`core/credit/api/v1/tp/scoringmodel/${params.eid}/${params.id}`);
}
