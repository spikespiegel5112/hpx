import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'signatureModule::';
export const UPDATE_QUERY_PARAMS = ACTION_PREFIX + 'UPDATE_QUERY_PARAMS'
export const CLEAR_QUERY_PARAMS = ACTION_PREFIX + 'CLEAR_QUERY_PARAMS'

export const CLEAR_ERR = ACTION_PREFIX + 'CLEAR_ERR'

export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const SAVE_ADD_NOT = ACTION_PREFIX + 'SAVE_ADD_NOT'
export const SAVE_ADD_REQUEST = ACTION_PREFIX + 'SAVE_ADD_REQUEST'
export const SAVE_ADD_FAILURE = ACTION_PREFIX + 'SAVE_ADD_FAILURE'
export const SAVE_ADD_SUCCESS = ACTION_PREFIX + 'SAVE_ADD_SUCCESS'

export const ABLED_NOT = ACTION_PREFIX + 'ABLED_NOT'
export const ABLED_REQUEST = ACTION_PREFIX + 'ABLED_REQUEST'
export const ABLED_FAILURE = ACTION_PREFIX + 'ABLED_FAILURE'
export const ABLED_SUCCESS = ACTION_PREFIX + 'ABLED_SUCCESS'

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
    let eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/enterprise/'+eid+'/esigns',
      )
      const result = await resp.json();
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          rows: result,
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

export  const saveAdd =  (values) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SAVE_ADD_REQUEST
    })
    let eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await putReq(
            '/core'+'/core/api/v1/enterprise/'+eid+'/esigns',
            {
                ...values,
            }
          )
      dispatch({
        type    : SAVE_ADD_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : SAVE_ADD_FAILURE,
        payload : e
      })
    }
  }
}

export  const abled = (name, enabled, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type : ABLED_REQUEST,
    })
    let eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await patchReq(
        '/core' + '/core/api/v1/enterprise/' + eid + '/esigns/' + id + '?name=' + name + '&enabled=' + enabled,
      )
      dispatch({
        type : ABLED_SUCCESS,
        payload : resp
      })
    }catch(e){
      dispatch({
        type    : ABLED_FAILURE,
        payload : e
      })
    }
  }
}

export  const del = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type : DELETE_REQUEST,
    })
    let eid = getState().login.userInfo.enterpriseId;
    try{
      let resp = await deleteReq(
        '/core' + '/core/api/v1/enterprise/'+ eid +'/esigns/' + id,
      )
      dispatch({
        type : DELETE_SUCCESS,
      })
    }catch(e){
      dispatch({
        type : DELETE_FAILURE,
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
        ...getState().incrementServiceModule.fields,
        ...fields
      }
    })
  }
}

export const actions = {
  saveAdd,
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
  
  [ABLED_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      abledStatus:{
        type: ABLED_REQUEST,
        loading: true,
      }
    }),
  [ABLED_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      abledStatus:{
        type: ABLED_SUCCESS,
        loading: false,
      },
    }),
  [ABLED_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      abledStatus:{
        type: ABLED_FAILURE,
        loading: false,
      }
    }),
  [SAVE_ADD_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      saveStatus:{
        type: SAVE_ADD_REQUEST,
        loading: true,
      }
    }),
  [SAVE_ADD_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      saveAddStatus:{
        type: SAVE_ADD_SUCCESS,
        loading: false,
      },
    }),
  [SAVE_ADD_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      saveStatus:{
        type: SAVE_ADD_FAILURE,
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
  saveAddStatus:{
    type:SAVE_ADD_NOT,
    loading: false,
  },
  abledStatus:{
    type:ABLED_NOT,
    loading: false,
  },
  deleteStatus:{
    type:DELETE_NOT,
    loading: false,
  },
  listStatus:{
    type:FETCH_LIST_NOT,
    loading: false,
  },
  list:{
    rows:[],
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
