import fetch from '@/config/fetch'

/**
 * 获取code下所有的字典
 */

export const getDictionaryByCodeRequest = options =>{
    return fetch(`/core/core/api/v1/dictionary/${options.code}/children`, );
}
