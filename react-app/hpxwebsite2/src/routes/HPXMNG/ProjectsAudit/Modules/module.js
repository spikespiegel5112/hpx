import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'projectsAuditModule::';
export const UPDATE_QUERY_PARAMS = ACTION_PREFIX + 'UPDATE_QUERY_PARAMS'
export const CLEAR_QUERY_PARAMS = ACTION_PREFIX + 'CLEAR_QUERY_PARAMS'

export const CLEAR_ERR = ACTION_PREFIX + 'CLEAR_ERR'

export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const FETCH_DETAIL_NOT = ACTION_PREFIX + 'FETCH_DETAIL_NOT'
export const FETCH_DETAIL_REQUEST = ACTION_PREFIX + 'FETCH_DETAIL_REQUEST'
export const FETCH_DETAIL_FAILURE = ACTION_PREFIX + 'FETCH_DETAIL_FAILURE'
export const FETCH_DETAIL_SUCCESS = ACTION_PREFIX + 'FETCH_DETAIL_SUCCESS'

export const FORBIDDEN_NOT = ACTION_PREFIX + 'FORBIDDEN_NOT'
export const FORBIDDEN_REQUEST = ACTION_PREFIX + 'FORBIDDEN_REQUEST'
export const FORBIDDEN_FAILURE = ACTION_PREFIX + 'FORBIDDEN_FAILURE'
export const FORBIDDEN_SUCCESS = ACTION_PREFIX + 'FORBIDDEN_SUCCESS'

export const ACCEPT_NOT = ACTION_PREFIX + 'ACCEPT_NOT'
export const ACCEPT_REQUEST = ACTION_PREFIX + 'ACCEPT_REQUEST'
export const ACCEPT_FAILURE = ACTION_PREFIX + 'ACCEPT_FAILURE'
export const ACCEPT_SUCCESS = ACTION_PREFIX + 'ACCEPT_SUCCESS'

export const DETAIL_NOT = ACTION_PREFIX + 'DETAIL_NOT'
export const DETAIL_REQUEST = ACTION_PREFIX + 'DETAIL_REQUEST'
export const DETAIL_FAILURE = ACTION_PREFIX + 'DETAIL_FAILURE'
export const DETAIL_SUCCESS = ACTION_PREFIX + 'DETAIL_SUCCESS'


export const UPDATE_FIELDS = ACTION_PREFIX + 'UPDATE_FIELDS'//更新表单里的值

// ------------------------------------
// Actions
// ------------------------------------

export const clearErr = () => {
    return {
        type    : CLEAR_ERR,
    }
}

//查询待审核项目列表（邀请状态T，审核状态F）
export const fetchList =  () => {
    return async (dispatch, getState) => {
        dispatch({
            type    : FETCH_LIST_REQUEST,
        })
        let list = getState().projectsAuditModule.list;
        let queryParams = Object.assign({},list.queryParams);

        let name = queryParams.name ? queryParams.name.value : null;
        if(name) queryParams.name = queryParams.name.value;
        else delete queryParams.name;

        let pagination = queryParams.pagination;
        queryParams.page = pagination.current;
        queryParams.size = pagination.pageSize;
        delete queryParams.pagination;
        try{
            const inviteStatus = 'T';
            const state = 'F';
            const resp = await getReq(
                '/core'+'/core/api/v1/enterpriseProjects/'+inviteStatus+'/state/'+state,
                queryParams
            )
            const total = resp.headers.get('x-total-count');
            const result = await resp.json();
            console.log('result',result);
            let current =
                pagination.pageSize * (pagination.current-1) >= total
                    ? pagination.current -1
                    : pagination.current;
            current = current <= 0 ? 0 : current;
            dispatch({
                type    : FETCH_LIST_SUCCESS,
                payload : {
                    data: result,
                    total: total,
                    current: current,
                    pageSize: pagination.pageSize
                }
            })
        }catch(e){
            dispatch({
                type    : FETCH_LIST_FAILURE,
                payload : e
            })
        }
    }
}



//平台审核通过，拒绝
export  const accept =  (eid,pid,state) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : ACCEPT_REQUEST,
    })
    try{
      const resp = await patchReq(
        '/core'+'/core/api/v1/enterprise/'+eid+"/projects/"+pid+'/state/'+state,
      )
      

        dispatch({
            type: ACCEPT_SUCCESS,
        })
    }catch(e){
      dispatch({
        type    : ACCEPT_FAILURE,
        payload : e
      })
    }
  }
}


export const updateQueryParams = (queryParams) => {
  return {
    type: UPDATE_QUERY_PARAMS,
    payload: {
      queryParams,
    }
  }
}

export const actions = {
    clearErr,
    fetchList,
    updateQueryParams,
    accept,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [CLEAR_ERR] : (state, action) =>
        ({
            ...state,
            err: '',
        }),
    [UPDATE_QUERY_PARAMS] : (state, action) =>
        ({
            ...state,
            list:{
                ...state.list,
                queryParams: {
                    ...state.list.queryParams,
                    ...action.payload.queryParams,
                    pagination: {
                        ...state.list.queryParams.pagination,
                        ...action.payload.queryParams.pagination,
                    }
                },
            }
        }),
    [CLEAR_QUERY_PARAMS] : (state, action) =>
        ({
            ...state,
            list:{
                ...state.list,
                queryParams: initialState.list.queryParams,
            }
        }),
    [FETCH_LIST_REQUEST] : (state, action) =>
        ({
            ...state,
            listStatus : {
                type : FETCH_LIST_REQUEST,
                loading: true,
            },
        }),
    [FETCH_LIST_SUCCESS] : (state, action) =>
        ({
            ...state,
            listStatus : {
                type : FETCH_LIST_SUCCESS,
                loading: false,
            },
            list : {
                ...state.list,
                rows : action.payload.data,
                queryParams:{
                    ...state.list.queryParams,
                    pagination: {
                        current : action.payload.current,
                        total : Number(action.payload.total),
                        pageSize: action.payload.pageSize
                    },
                }
            }
        }),
    [FETCH_LIST_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            listStatus : {
                type : FETCH_LIST_FAILURE,
                loading: false,
            },
        }),

    [FETCH_DETAIL_REQUEST] : (state, action) =>
        ({
            ...state,
            detailStatus : {
                type : FETCH_DETAIL_REQUEST,
                loading: true,
            },
        }),
    [FETCH_DETAIL_SUCCESS] : (state, action) =>
        ({
            ...state,
           detailStatus : {
                type : FETCH_DETAIL_SUCCESS,
                loading: false,
            },
            saveModalList : {
                productCode: action.payload.productCode,
                type: action.payload.type,
                name: action.payload.name,
                remark: action.payload.remark,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime,
            },
        }),
    [FETCH_DETAIL_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            detailStatus : {
                type : FETCH_DETAIL_FAILURE,
                loading: false,
            },
        }),
    [FORBIDDEN_REQUEST] : (state, action) => 
        ({ 
        ...state, 
        forbiddenStatus:{
            type: FORBIDDEN_REQUEST,
            loading: true,
        }
        }),
    [FORBIDDEN_SUCCESS] : (state, action) => 
        ({ 
        ...state, 
        forbiddenStatus:{
            type: FORBIDDEN_SUCCESS,
            loading: false,
        }
        }),
    [FORBIDDEN_FAILURE] : (state, action) => 
        ({ 
        ...state, 
        err: action.payload,
        forbiddenStatus:{
            type: FORBIDDEN_FAILURE,
            loading: false,
        }
        }),
    [DETAIL_REQUEST] : (state, action) =>
        ({
            ...state,
            fetchDetailStatus:{
                type: DETAIL_REQUEST,
                loading: true,
            }
        }),
    [DETAIL_SUCCESS] : (state, action) =>
        ({
            ...state,
            fetchDetailStatus:{
                type: DETAIL_SUCCESS,
                loading: false,
            }
        }),
    [DETAIL_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            fetchDetailStatus:{
                type: DETAIL_FAILURE,
                loading: false,
            }
        }),
    [ACCEPT_REQUEST] : (state, action) => 
        ({ 
        ...state, 
        acceptStatus:{
            type: ACCEPT_REQUEST,
            loading: true,
        }
        }),
    [ACCEPT_SUCCESS] : (state, action) => 
        ({ 
        ...state, 
        acceptStatus:{
            type: ACCEPT_SUCCESS,
            loading: false,
        }
        }),
    [ACCEPT_FAILURE] : (state, action) => 
        ({ 
        ...state, 
        err: action.payload,
        acceptStatus:{
            type: ACCEPT_FAILURE,
            loading: false,
        }
        }),
    [UPDATE_FIELDS] : (state, action) =>
        ({
            ...state,
            fields: action.payload
        }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    err:'',
    fetchDetailStatus:{
        type:DETAIL_NOT,
        loading: false,
    },
    listStatus:{
        type:FETCH_LIST_NOT,
        loading: false,
    },
    acceptStatus:{
        type:ACCEPT_NOT,
        loading: false,
    },
    detailStatus:{
        type:FETCH_DETAIL_NOT,
        loading: false,
    },
    forbiddenStatus:{
        type:FORBIDDEN_NOT,
        loading: false,
    },
    fields:{
        id: null,//id,添加的时候为空，修改的时候有值
        productCode: {
            value: null
        },
        type:{
            value: null
        },
        code: {
            value: null
        },
        name: {
            value: null
        },
        remark: {
            value: null
        },
        startTime: {
            value: null
        },
        endTime: {
            value: null
        },
        ownerEnterpriseId:{
            value: null
        },
        creator: {
            value: null
        },
        state: {
            value: null
        },
        createTime: {
            value: null
        },
        modifiedBy: {
            value: null
        },
        modifiedTime: {
            value: null
        },
    },//表单数据
    list:{
        rows:[],
        queryParams:{
            pagination:{
                current:1,
                total:0,
                pageSize:10,
            },

        },
    },
    //项目信息
    saveModalList:{
        productCode:null,
        name:null,
        remark:null,
        startTime:null,
        endTime:null,
    }
}

export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
