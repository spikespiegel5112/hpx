import fetch from '@/config/fetch'

/**
 * 公告列表List
 */
export const noticeListRequest = options => {
    return fetch(`/core/core/api/v1/notice`, options.params);
}

/**
 * 新增公告
 */
export const publishnoticeListRequest = body => {
    return fetch(`/core/core/api/v1/notice`, body, 'put');
}

/**
 * 根据字段id删除公告
 */
export const deletenoticeListRequest = id =>{
    return fetch(`/core/core/api/v1/notice/dictionary/${id}`, {}, 'delete');
}

/**
 * 根据字段id查询公告
 */
export const reviewnoticeListRequest = params =>{
    return fetch(`/core/core/api/v1/notice/${params.id}`);
}

/**
 * 修改公告
 */
export const modifynoticeListRequest = options =>{
    return fetch(`/core/core/api/v1/notice/${options.id}`, options.body, 'patch');
}
