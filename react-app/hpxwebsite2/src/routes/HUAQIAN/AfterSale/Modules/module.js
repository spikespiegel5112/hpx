import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'afterSaleModule::';
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

export const fetchList =  (receiptsType) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    let list = getState().afterSaleModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    queryParams.receiptsType = receiptsType;
    try{
      const resp = await getReq(
        '/proxyHq'+'/huaqian/api/v1/refund/list',
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

export  const fetchDetail =  (id) => {
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
      type    : DETAIL_REQUEST
    })
    let fields = getState().afterSaleModule.fields;
    debugger;
    let queryParams = Object.assign({},fields.queryParams);
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    queryParams.tAfterSaleId = id;
    console.log(queryParams)
    try{
      const resp = await getReq(
        '/proxyHq'+'/huaqian/api/v1/refund/queryDetail/',
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
        type    : FETCH_DETAIL_SUCCESS,
        payload : {
          rows: result,
          total: total,
          current: current,
          pageSize: pagination.pageSize
        }
      })
    }catch(e){
      dispatch({
        type    : FETCH_DETAIL_FAILURE,
        payload : e
      })
    }
  }
}

export  const del =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : DELETE_REQUEST,
    })
    try{
      const resp = await deleteReq(
        '/proxyHq'+'undefined/'+id,
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

export  const confirm =  (id) => {
  return async (dispatch, getState) => {
    try{
      console.log(54)
      const resp = await patchReq(
        '/proxyHq'+'/huaqian/api/v1/refund/updateStatus/'+id,
        {
        }
      );
      
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
            '/proxyHq'+'undefined/'+id,
            {
                ...values,
            }
          )
        : await putReq(
            '/proxyHq'+'undefined',
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
        ...getState().afterSaleModule.fields,
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
    
  [FETCH_DETAIL_REQUEST]: (state, action) =>
    ({
      ...state,
      deleteStatus: {
        type: FETCH_DETAIL_REQUEST,
        loading: true,
      }
    }),
  [FETCH_DETAIL_SUCCESS]: (state, action) =>
    ({
      ...state,
      fields : { 
        ...state.fields,
        rows : action.payload.rows,
        queryParams:{
          ...state.fields.queryParams,
          pagination: {
            current : action.payload.current,
            total : Number(action.payload.total),
            pageSize: action.payload.pageSize
          },
        }
      }
    }),
  [FETCH_DETAIL_FAILURE]: (state, action) =>
    ({
      ...state,
      err: action.payload,
      deleteStatus: {
        type: FETCH_DETAIL_FAILURE,
        loading: false,
      }
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
    id:null,
    rows:[],
    queryParams:{
      pagination:{
        current:1,
        total:0,
        pageSize:10,
      }
    }
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
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
