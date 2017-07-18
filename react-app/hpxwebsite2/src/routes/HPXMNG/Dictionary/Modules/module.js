import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'dictionaryModule::';
export const UPDATE_QUERY_PARAMS = ACTION_PREFIX + 'UPDATE_QUERY_PARAMS'
export const CLEAR_QUERY_PARAMS = ACTION_PREFIX + 'CLEAR_QUERY_PARAMS'

export const CLEAR_ERR = ACTION_PREFIX + 'CLEAR_ERR'

export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const SAVE_NOT = ACTION_PREFIX + 'SAVE_NOT'
export const SAVE_REQUEST = ACTION_PREFIX + 'SAVE_REQUEST'
export const SAVE_FAILURE = ACTION_PREFIX + 'SAVE_FAILURE'
export const SAVE_SUCCESS = ACTION_PREFIX + 'SAVE_SUCCESS'

export const DETAIL_NOT = ACTION_PREFIX + 'DETAIL_NOT'
export const DETAIL_REQUEST = ACTION_PREFIX + 'DETAIL_REQUEST'
export const DETAIL_FAILURE = ACTION_PREFIX + 'DETAIL_FAILURE'
export const DETAIL_SUCCESS = ACTION_PREFIX + 'DETAIL_SUCCESS'

export const DELETE_NOT = ACTION_PREFIX + 'DELETE_NOT'
export const DELETE_REQUEST = ACTION_PREFIX + 'DELETE_REQUEST'
export const DELETE_FAILURE = ACTION_PREFIX + 'DELETE_FAILURE'
export const DELETE_SUCCESS = ACTION_PREFIX + 'DELETE_SUCCESS'

export const UPDATE_FIELDS = ACTION_PREFIX + 'UPDATE_FIELDS'//更新表单里的值

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

//如果queryParams为假，表示重置查询条件

export const clearQueryParams = () => {
  return {
    type: CLEAR_QUERY_PARAMS,
  }
}

export const clearErr = () => {
  return {
    type    : CLEAR_ERR,
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

export const fetchList =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    let list = getState().dictionaryModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    let code = queryParams.code ? queryParams.code.value : null;
    if(code) queryParams.code = queryParams.code.value;
    else delete queryParams.code;

      let parentCode = queryParams.parentCode ? queryParams.parentCode.value : null;
      if(parentCode) queryParams.parentCode = queryParams.parentCode.value;
      else delete queryParams.parentCode;
      
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/dictionary',
        queryParams
      )
      const total = resp.headers.get('x-total-count');
      const result = await resp.json();
      let current = 
        pagination.pageSize * (pagination.current-1) >= total
        ? pagination.current -1 
        : pagination.current;
      current = current <= 0 ? 0 : current;
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          rows: result,
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

export  const fetchDetail =  (id,code) => {
  return async (dispatch, getState) => {
    if(!id){//没有id，就是新增
      dispatch({
        type: UPDATE_FIELDS,
        payload: {
          ...initialState.fields
        }
      })
      return;
    }
    dispatch({
      type    : DETAIL_REQUEST,
    })
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/dictionary/'+code,
        {
        }
      )
      const result = await resp.json();
      let data = result;
      dispatch({
        type    : DETAIL_SUCCESS,
      })
      dispatch({
        type: UPDATE_FIELDS,
        payload: {
          id: id,//id,添加的时候为空，修改的时候有值
          
          code: {
            value: data.code || null
          },
            parentCode: {
                value: data.parentCode || null
            },
          name: {
            value: data.name || null
          },
          sortNum: {
            value: data.sortNum || null
          },
          description: {
            value: data.description || null
          },
          creator: {
            value: data.creator || null
          },
          createTime: {
            value: data.createTime || null
          },
          modifiedBy: {
            value: data.modifiedBy || null
          },
          modifiedTime: {
            value: data.modifiedTime || null
          },
        }
      })
    }catch(e) {
      dispatch({
        type    : DETAIL_FAILURE,
        payload : e
      })
    }
  }
}

export  const del =  (code) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : DELETE_REQUEST,
    })
    try{
      const resp = await deleteReq(
        '/core'+'/core/api/v1/dictionary/'+code,
        {
        }
      )
      dispatch({
        type: DELETE_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : DELETE_FAILURE,
        payload : e
      })
    }
  }
}

export  const save =  (values, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SAVE_REQUEST,
    })
    try{
      const resp = 
        id 
        ? await patchReq(
            '/core'+'/core/api/v1/dictionary/'+id,
            {
                ...values,
            }
          )
        : await putReq(
            '/core'+'/core/api/v1/dictionary',
            {
                ...values,
                id: id || '',
            }
          )
      // const result = await resp.json();
      dispatch({
        type    : SAVE_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : SAVE_FAILURE,
        payload : e
      })
    }
  }
}

export const updateFields = (fields,type) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_FIELDS,
      payload: {
        ...getState().dictionaryModule.fields,
        ...fields
      }
    })
  }
}

export const actions = {
  clearQueryParams,
  clearErr,
  updateQueryParams,
  fetchList,
  fetchDetail,
  del,
  save,
  updateFields,
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
        rows : action.payload.rows,
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
  [SAVE_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      saveStatus:{
        type: SAVE_REQUEST,
        loading: true,
      }
    }),
  [SAVE_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      saveStatus:{
        type: SAVE_SUCCESS,
        loading: false,
      }
    }),
  [SAVE_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      saveStatus:{
        type: SAVE_FAILURE,
        loading: false,
      }
    }),
  [DELETE_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      deleteStatus:{
        type: DELETE_REQUEST,
        loading: true,
      }
    }),
  [DELETE_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      deleteStatus:{
        type: DELETE_SUCCESS,
        loading: false,
      }
    }),
  [DELETE_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      deleteStatus:{
        type: DELETE_FAILURE,
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
  deleteStatus:{
    type:DELETE_NOT,
    loading: false,
  },
  saveStatus:{
    type:SAVE_NOT,
    loading: false,
  },
  fetchDetailStatus:{
    type:DETAIL_NOT,
    loading: false,
  },
  listStatus:{
    type:FETCH_LIST_NOT,
    loading: false,
  },
  fields:{
    id: null,//id,添加的时候为空，修改的时候有值
    
    code: {
      value: null
    },
    parentCode: {
          value: null
    },
    name: {
      value: null
    },
    sortNum: {
      value: null
    },
    description: {
      value: null
    },
    creator: {
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
      
      code: {
        value: null
      },
    },
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
