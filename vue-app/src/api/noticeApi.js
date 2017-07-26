import fetch from '@/config/fetch'

/**
 * 新增公告
 */
export const publishNoticeRequest = body => {
    return fetch(`/core/core/api/v1/notice`, body, 'put');
}

/**
 * 根据字段id删除公告
 */
export const deleteNoticeRequest = id =>{
    return fetch(`/core/core/api/v1/notice/dictionary/${id}`, {}, 'delete');
}

/**
 * 根据字段id查询公告
 */
export const reviewNoticeRequest = params =>{
    return fetch(`/core/core/api/v1/notice/${params.id}`);
}

/**
 * 修改公告
 */
export const modifyNoticeRequest = params =>{
    return fetch(`/core/core/api/v1/notice/${params.id}`, params.body, 'patch');
}
