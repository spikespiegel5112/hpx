import fetch from '@/config/fetch'

//标签列表
export const labelList = (eid,params) => fetch(`/credit/tp/scorelabel/${eid}`,params);

// 新增标签
export const labelAdd = (eid,params) => fetch(`/credit/tp/scorelabel/${eid}`,params,'put');

// 修改标签
export const labelRevise = (eid,id,params) => fetch(`/credit/tp/scorelabel/${eid}/${id}`,params,'patch');

//删除标签
export const labelDelete = (eid,id) => fetch(`/credit/tp/scorelabel/${eid}/${id}`,{},'delete');

//获取标签详情
export const labelDetail = (eid,id) => fetch(`/credit/tp/scorelabel/${eid}/${id}`);

// 导入标签excel
export const labelImport = () => `/credit/tp/scorelabel/excel`;

// 上传标签提交
export const labelImportSubmit = (eid) => `/credit/tp/scorelabel/${eid}/import`;

// 标签禁用启用
export const labelStatusAction = (eid,id) => fetch(`/credit/tp/scorelabel/${eid}/state/${id}`,{},'patch');