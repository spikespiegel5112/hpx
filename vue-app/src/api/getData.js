import fetch from '@/config/fetch'

/**
 * 登陆
 */

// export const login = data => fetch('/admin/login', data, 'POST');
export const login = data => fetch('/core/api/v1/login', data, 'form');
/**
 * 退出
 */

export const signout = () => fetch('/core/api/v1/logout');

/**
 * 注册--获取手机短信验证码
 */
export const reSmgCode = (phone, strCode) => fetch(`/core/core/api/v1/sms/registerSendSms?phone=${phone}&strCode=${strCode}`, {}, 'post')

/**
 * 注册--提交注册信息
 */
export const subRegister = (params) => fetch('/core/core/api/v1/enterprise/users', params, 'form')

/**
 * 忘记密码--获取手机短信验证码
 */
export const forgetPwdSmgCode = (phone, strCode, enterpriseName) => fetch(`/core/core/api/v1/sms/forgotPasswordSendSms?phone=${phone}&strCode=${strCode}&enterpriseName=${enterpriseName}`, {}, 'post')

/**
 * 忘记密码--提交忘记密码信息
 */
export const subForgetPwd = (params) => fetch('/core/core/api/v1/forgotPassword', params, 'form')

/**
 * mock menu
 */

// export const getMenuList = () => fetch('/static/mock/menu.json')

/**
 * dev menu
 */

export const getMenuList = (eid) => fetch(`/core/core/api/v1/enterprise/${eid}/permissions`)

// 项目菜单
export const getProjectMenuList = (eid,pid) => fetch(`/core/core/api/v1/enterprise/${eid}/projects/${pid}/permissions`)

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

export const getLoginInfo = () => fetch('/core/api/v1/login');


/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');

/**
 * 取得项目信息列表, 支持分页
 */

export const getProjectList = options =>{
    return fetch('/core/core/api/v1/projects', options.params);
}

/**
 * 取得企业项目邀请记录列表
 */

export const getInviteRecordsList = options =>{
    return fetch(`/core/core/api/v1/enterprisProjects/${options.params.eid}/inviteRecords/${options.params.pid}`);
}

/**
 * 取得企业项目邀请记录列表
 */

export const projectsAuditListRequest = data => fetch('/core/core/api/v1/enterprise/projects/vo/', data);

/**
 * 删除项目
 */

// export const projectsAuditList = data => fetch('/core/core/api/v1/enterprise/projects/vo/', data);

/**
 * 获取新闻公告列表
 */

export const noticeRequest = data => {
    return fetch(`/core/core/api/v1/notice`, data);
}
