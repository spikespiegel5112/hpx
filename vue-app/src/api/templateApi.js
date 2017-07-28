import fetch from '@/config/fetch'

/**
 * 第三方企业填报信息查询
 */

export const templateReportListRequest = (eid, options) =>{
    return fetch(`/credit/tp/report/${eid}`, options);
}

