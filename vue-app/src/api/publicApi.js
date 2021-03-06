
import fetch from '../config/fetch'

/*
** 获取省份
*/
export const provinces = () => fetch('/core/core/api/v1/provinces')

/*
** 获取银行
*/
export const bankTypes = () => fetch('/core/core/api/v1/banks')

/*
** 获取城市
*/
export const cities = (provCode) => fetch(`/core/core/api/v1/provinces/${provCode}/city`)

/*
** 获取县区
*/
export const countries = (citycode) => fetch(`/core/core/api/v1/provinces/${citycode}/country`)

/*
** 获取支行
*/
export const bankdes = (bankclscode,citycode) => fetch(`/core/core/api/v1/banks/${bankclscode}/city/${citycode}/bankinfo/`)

/*
** 获取 认证文件
*/
export const filesTypes = (eid) => fetch(`/core/core/api/v1/enterprise/${eid}/dictionary`,{code:'enterpris_file'});

/*
** 上传认证指定文件
*/
export const uploadAction = (eid,code) => `/core/core/api/v1/enterpriseFiles/enterprise/${eid}/dictionary/${code}/enterpriseFiles`;
/*
** 下载指定文件
*/
export const loadUrl = (id) => `/core` + `/core/api/v1/download/attachfiles/${id}`;

/*
** 上传文件
*/
export const uploadUrl = () => `/core/core/api/v1/attachfiles`;

/*
** 获取图片验证码
*/
export const getKaptchaImageRequest = options => fetch( `/core/core/api/v1/getKaptchaImage?v=${options.params.timestamp}`)
