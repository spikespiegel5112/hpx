
import fetch from '../config/fetch'

/*
** 获取省份
*/
export const provinces = () => fetch('/core/core/api/v1/enterpriseAccountEntity/provinces')

/*
** 获取银行
*/
export const bankTypes = () => fetch('/core/core/api/v1/enterpriseAccountEntity/banks')

/*
** 获取城市
*/
export const cities = (provCode) => fetch(`/core/core/api/v1/enterpriseAccountEntity/provinces/${provCode}/city`)

/*
** 获取县区
*/
export const countries = (citycode) => fetch(`/core/core/api/v1/enterpriseAccountEntity/provinces/${citycode}/country`)

/*
** 获取支行
*/
export const bankdes = (bankclscode,citycode) => fetch(`/core/core/api/v1/enterpriseAccountEntity/banks/${bankclscode}/city/${citycode}/bankinfo/`)

/*
** 获取 认证文件
*/
export const filesTypes = (eid) => fetch(`/core/core/api/v1/enterprise/${eid}/dictionary`,{code:'enterpris_file'});

/*
** 上传文件
*/
export const uploadAction = (eid,code) => `/core/core/api/v1/enterpriseFiles/enterprise/${eid}/dictionary/${code}/enterpriseFiles`;
/*
** 下载指定文件
*/
export const loadUrl = (id) => `/core` + `/core/api/v1/download/attachfiles/${id}`;
