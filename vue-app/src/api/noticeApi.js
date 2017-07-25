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
