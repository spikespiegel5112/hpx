import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'reportModule::';
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

export const FETCH_REPORT_NOT = ACTION_PREFIX + 'FETCH_REPORT_NOT'
export const FETCH_REPORT_REQUEST = ACTION_PREFIX + 'FETCH_REPORT_REQUEST'
export const FETCH_REPORT_FAILURE = ACTION_PREFIX + 'FETCH_REPORT_FAILURE'
export const FETCH_REPORT_SUCCESS = ACTION_PREFIX + 'FETCH_REPORT_SUCCESS'


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
    let list = getState().reportModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    let name = queryParams.name ? queryParams.name.value : null;
    if(name) queryParams.name = queryParams.name.value;
    else delete queryParams.name;
      
    let enterpriseName = queryParams.enterpriseName ? queryParams.enterpriseName.value : null;
    if(enterpriseName) queryParams.enterpriseName = queryParams.enterpriseName.value;
    else delete queryParams.enterpriseName;
      
    let creatTime = queryParams.creatTime ? queryParams.creatTime.value : null;
    if(creatTime) queryParams.creatTime = queryParams.creatTime.value;
    else delete queryParams.creatTime;
      
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;

    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp = await getReq(
        '/proxyBiMai'+'/credit/api/v1/tp/report/'+eid,
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
      type    : DETAIL_REQUEST,
    })
    try{
      const resp = await getReq(
        '/proxy'+'/trade/report/detail/'+id,
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
          
          name: {
            value: data.name || null
          },
          enterpriseName: {
            value: data.enterpriseName || null
          },
          industry: {
            value: data.industry || null
          },
          creatTime: {
            value: data.creatTime || null
          },
          operation: {
            value: data.operation || null
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

export  const del =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : DELETE_REQUEST,
    })
    try{
      const resp = await deleteReq(
        '/proxy'+'/trade/report/delete/'+id,
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

export const fetchReport = (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type : FETCH_REPORT_REQUEST,
        })
        let reportlist = getState().reportModule.reportlist;
        try{
            const eid = getState().login.userInfo.enterpriseId;
            const resp = await getReq(
                '/proxyBiMai'+'/credit/api/v1/tp/report/'+eid+'/'+id
            )
            const result = await resp.json();
            console.log("数据",result)
            dispatch({
                type : FETCH_REPORT_SUCCESS,
                payload : {
                    rows: result,
                }
            })
        }catch(e){
            dispatch({
                type : FETCH_REPORT_FAILURE,
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
            '/proxy'+'/trade/report/save/'+id,
            {
                ...values,
            }
          )
        : await putReq(
            '/proxy'+'/trade/report/save',
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
        ...getState().reportModule.fields,
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
    [FETCH_REPORT_REQUEST] : (state, action) =>
        ({
            ...state,
            reportlistStatus:{
                type: FETCH_REPORT_REQUEST,
                loading: true,
            }
        }),
    [FETCH_REPORT_SUCCESS] : (state, action) =>
        ({
            ...state,
            reportlistStatus:{
                type: FETCH_REPORT_SUCCESS,
                loading: false,
            },
            reportlist : {
                ...state.reportlist,
                rows : action.payload.rows,
            }
        }),
    [FETCH_REPORT_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            reportlistStatus:{
                type: FETCH_REPORT_FAILURE,
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
  reportlistStatus:{
        type:FETCH_REPORT_NOT,
        loading: false,
    },
  fields:{
    id: null,//id,添加的时候为空，修改的时候有值
    
    name: {
      value: null
    },
    enterpriseName: {
      value: null
    },
    industry: {
      value: null
    },
    creatTime: {
      value: null
    },
    operation: {
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
      name: {
        value: null
      },
      enterpriseName: {
        value: null
      },
      creatTime: {
        value: null
      },
    },
  },
  reportlist:{
    rows:null
  },
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}


