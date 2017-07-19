import fetch from '@/config/fetch'

/**
 * 获取企业列表
 */

export const getEnterprisesList = (query) => fetch('/core/core/api/v1/enterprises',query);

/**
 * 安全设置，修改密码
 */
export const changePwd = (oldPwd,newPwd) => fetch('/core/core/api/v1/changePassword?oldPwd=' + oldPwd + '&newPwd=' + newPwd, {}, 'post')

/**
 * 安全设置，修改手机号码, 向旧手机号码发送验证码
 */
export const getOldCord = (oldPhone) => fetch('/core/core/api/v1/sms/checkOldPhoneSendSms?phone=' + oldPhone, {}, 'post')

/**
 * 安全设置，修改手机号码, 验证旧手机号码
 */
export const checkOldPhone = (oldPhone, code) => fetch('/core/core/api/v1/checkOldPhone?oldPhone=' + oldPhone + '&code=' + code)

/**
 * 安全设置，修改手机号码, 向新手机号码发送验证码
 */
export const getNewCord = (newPhone) => fetch('/core/core/api/v1/sms/modifyPhoneSendSms?phone=' + newPhone, {}, 'post')

/**
 * 安全设置，修改手机号码, 验证新手机号码
 */
export const checkNewPhone = (newPhone, code) => fetch('/core/core/api/v1/modifyPhone?phone=' + newPhone + '&code=' + code, {}, 'post')


/*
** 企业基本信息
*/

export const getEnterpriseInfo = (eid) => fetch(`/core/core/api/v1/enterprises/${eid}`);

/*
** 更改企业信息
*/
export const patchEnterpriseInfo = (eid,body) => fetch(`/core/core/api/v1/enterprises/${eid}`,body,'patch')
