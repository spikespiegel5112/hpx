
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
