import fetch from '@/config/fetch'

//标签列表
export const labelList = (eid,params) => fetch(`/credit/scorelabel/${eid}`,params);

// 新增标签
export const labelAdd = (eid,params) => fetch(`/credit/scorelabel/${eid}`,params,'put');

//删除标签
export const labelDelete = (eid,id) => fetch(`/credit/scorelabel/${eid}/${id}`,{},'delete');
