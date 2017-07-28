import fetch from '@/config/fetch'

/**
 * 获取企业列表
 */

export const getEnterprisesList = (query) => fetch('/core/core/api/v1/enterprises', query);

/**
 * 安全设置，修改密码
 */
export const changePwd = (oldPwd, newPwd) => fetch('/core/core/api/v1/changePassword?oldPwd=' + oldPwd + '&newPwd=' + newPwd, {}, 'post')

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
export const patchEnterpriseInfo = (eid, body) => fetch(`/core/core/api/v1/enterprises/${eid}`, body, 'patch')

/*
 ** 管理签章 -- 获取企业电子签章列表
 */
export const getEpSignatureList = (query, eid) => fetch(`/core/core/api/v1/venterprise/${eid}/esigns`, query);

/*
 ** 管理签章 -- 禁用企业电子签章
 */
export const abledEpSignature = (name, id, enabled) => fetch(`/core/core/api/v1/venterprise/{name}esigns/${id}/enabled/{enabled}?name=${name}&enabled=${enabled}`, {}, 'patch');

/*
 ** 管理签章 -- 删除企业电子签章
 */
export const delEpSignature = (id) => fetch(`/core/core/api/v1/venterprise/esigns/${id}`, {}, 'delete');

/*
 ** 获取企业电子签章列表
 */
export const getSignatureList = (query, eid) => fetch(`/core/core/api/v1/enterprise/${eid}/esigns`, query);

/*
 ** 添加企业电子签章列表
 */
export const addSignature = (eid, query) => fetch(`/core/core/api/v1/enterprise/${eid}/esigns`, query, 'put');

/*
 ** 禁用企业电子签章
 */
export const abledSignature = (name, id, eid, enabled) => fetch(`/core/core/api/v1/enterprise/${eid}/esigns/${id}?name=${name}&enabled=${enabled}`, {}, 'patch');

/*
 ** 删除企业电子签章
 */
export const delSignature = (id, eid) => fetch(`/core/core/api/v1/enterprise/${eid}/esigns/${id}`, {}, 'delete');

/*
 ** 认证企业 审核
 */
export const auithcertification = (id, type, nodes) => fetch(`/core/core/api/v1/enterprises/enterprise/${id}/auditState/${type}?nodes=${nodes}`, {}, 'PATCH')

/*
 ** 获取 增值服务列表
 */
export const servicesList = (params) => fetch(`/core` + `/core/api/v1/vEnterpriseServiceApplication`, params)

/*
 **  增值服务审核
 */
export const servicesAidth = (id, type) => fetch(`/core` + `/core/api/v1/serviceApplication/${id}/approval?approval=${type}`, {}, 'patch')

/*
 ** 获取 增值服务申请
 */
export const servicesOpen = (eid, data) => fetch('/core' + `/core/api/v1/enterprise/${eid}/serviceApplication`, data, 'put')
/*
 ** 获取 修改企业状态
 */
export const eidStatus = (eid) => fetch('/core' + `/core/api/v1/enterprises/palt/enterprise/status/${eid}`,{},'patch')

/**
 * 产品管理--获取产品列表
 */
export const getProductList = (query) => fetch('/core/core/api/v1/products',query);

/*
** 产品管理--禁用
*/
export const abledProduct = (id) => fetch(`/core/core/api/v1/products/${id}/available`,{}, 'patch');

/*
** 产品管理--删除
*/
export const delProduct= (id) => fetch(`/core/core/api/v1/eproducts/${id}`,{}, 'delete');

/*
** 产品管理--获取产品企业类型
*/
export const getProductEpRoleList= (code) => fetch(`/core/core/api/v1/dictionary/${code}/children`, {});

/*
** 产品管理--添加
*/
export const addProduct= (params) => fetch(`/core/core/api/v1/products`,params, 'put');

/*
** 产品管理--编辑
*/
export const editProduct= (id, params) => fetch(`/core/core/api/v1/products/${id}`,params, 'patch');

/**
 * 根据产品code获取所有企业角色信息
 */

export const enterpriseRolesListRequest = product_code =>{
    return fetch(`/core/core/api/v1/products/${product_code}/ent_roles`);
}

/**
 * 创建项目信息
 */

export const createProject = (eid, type, formData) => {
    return fetch(`/core/core/api/v1/projects/${eid}/product/${type}`, formData, 'put');
}

/**
 * 修改项目信息
 */

export const modifyProjectInfo = (id, formData) => fetch(`/core/core/api/v1/projects/${id}`, formData, 'patch');

/**
 * 删除项目信息
 */
export const deleteProject = (id) => {
    return fetch(`/core/core/api/v1/projects/${id}`, {}, 'delete');
}

/**
 * 用户管理--获取用户列表
 */
export const getUserList = (eid, params) => fetch(`/core/core/api/v1/enterprise/${eid}/users`,params);

/*
** 用户管理--禁用
*/
export const abledUser = (id, eid) => fetch(`/core/core/api/v1/enterprise/${eid}/users/${id}/enabled`,{}, 'patch');

/*
** 用户管理--添加
*/
export const addUser= (eid, params) => fetch(`/core/core/api/v1/enterprise/${eid}/users`,params, 'put');

/*
** 用户管理--编辑
*/
export const editUser= (id, eid, params) => fetch(`/core/core/api/v1/enterprise/${eid}/users/${id}`,params, 'patch');

/**
 * 审核项目
 */

export const auditProjectRequest = (eid, pid, state) => {
    return fetch(`/core/core/api/v1/enterprise/${eid}/projects/${pid}/state/${state}`, {}, 'patch');
}

/**
 * 新增企业项目信息
 */

export const modifyProjectRequest = (options) => {
    return fetch(`/core/core/api/v1/enterprise/${options.eid}/projects/${options.pid}`, {}, 'put');
}


/**
 * 协议授权管理--获取用户列表
 */
export const getAgreementList = (params) => fetch(`/core/core/api/v1/agreements`,params);

/*
** 协议授权管理--删除
*/
export const delAgreement = (id) => fetch(`/core/core/api/v1/agreements/${id}`,{}, 'delete');

/*
** 协议授权管理--添加
*/
export const addAgreement = (params) => fetch(`/core/core/api/v1/agreements`,params, 'put');

/*
** 协议授权管理--编辑
*/
export const editAgreement = (id, params) => fetch(`/core/core/api/v1/agreements/${id}`,params, 'patch');

/**
 * 字典管理--获取用户列表
 */
export const getDictionaryList = (params) => fetch('/core/core/api/v1/dictionary',params);

/*
** 字典管理--删除
*/
export const delDictionary = (code) => fetch(`/core/core/api/v1/dictionary/${code}`,{}, 'delete');

/*
** 字典管理--添加
*/
export const addDictionary = (params) => fetch('/core/core/api/v1/dictionary',params, 'put');

/*
** 字典管理--编辑
*/
export const editDictionary = (id, params) => fetch(`/core/core/api/v1/dictionary/${id}`,params, 'patch');
