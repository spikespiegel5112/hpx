import fetch ,{ serialize } from '@/config/fetch'

/**
 * 模型--获取模型列表
 */
export const modelList = (eid, params) => fetch(`/credit/tp/scoringmodel/${eid}`,params)

/**
 * 模型--查询所有行业
 */
export const industryList = (params) => fetch(`/credit/industry`,params)

/**
 * 模型--查看
 */
export const modelCheck = (id, eid) => fetch(`/credit/tp/scoringmodel/${eid}/${id}`,{})

/**
 * 模型--禁用
 */
export const modelEnabled = (id, eid) => fetch(`/credit/tp/scoringmodel/${eid}/state/${id}`,{}, 'patch')

/**
 * 模型--删除
 */
export const modelDel = (id, eid) => fetch(`/credit/tp/scoringmodel/${eid}/${id}`,{}, 'delete')

/**
 * 模型--增加
 */
export const modelAdd = (eid, params) => fetch(`/credit/tp/scoringmodel/${eid}`,params, 'put')

/**
 * 模型--查询单个打分卡模型
 */
export const modelData = (id, eid) => fetch(`/credit/tp/scoringmodel/${eid}/${id}`,{})

/**
 * 模型--编辑
 */
export const modelEdit = (id, eid, params) => fetch(`/credit/tp/scoringmodel/${eid}/${id}`,params, 'patch')

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
export const labelImportSubmit = (eid,data) => fetch(`/credit/tp/scorelabel/${eid}/import?=${serialize(data)}`,{},post);

// 标签禁用启用
export const labelStatusAction = (eid,id) => fetch(`/credit/tp/scorelabel/${eid}/state/${id}`,{},'patch');

// 公允参数
    //新增
export const addParameter = (eid) => fetch(`/credit/tp/parameter/${eid}`,{},'put');
    //获取
export const parameterInfo = (eid) => fetch(`/credit/tp/parameter/${eid}`);
    //修改
export const patchParameter = (eid,id,params) => fetch(`/credit/tp/parameter/${eid}/${id}`,params,'patch');

