import fetch from '@/config/fetch'

/**
 * 获取code下所有的字典
 */

export const getDictionaryByCodeRequest = (params) =>{
    return fetch(`/core/core/api/v1/dictionary/${params.code}/children`, );
}
