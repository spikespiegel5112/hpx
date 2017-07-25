import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'noticeModule::';
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

export const DIC_NOT = ACTION_PREFIX + 'DIC_NOT'
export const DIC_REQUEST = ACTION_PREFIX + 'DIC_REQUEST'
export const DIC_FAILURE = ACTION_PREFIX + 'DIC_FAILURE'
export const DIC_SUCCESS = ACTION_PREFIX + 'DIC_SUCCESS'

export const DIC2_NOT = ACTION_PREFIX + 'DIC2_NOT'
export const DIC2_REQUEST = ACTION_PREFIX + 'DIC2_REQUEST'
export const DIC2_FAILURE = ACTION_PREFIX + 'DIC2_FAILURE'
export const DIC2_SUCCESS = ACTION_PREFIX + 'DIC2_SUCCESS'


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
    let list = getState().noticeModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    let title = queryParams.title ? queryParams.title.value : null;
    if(title) queryParams.title = queryParams.title.value;
    else delete queryParams.title;
      
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/notice',
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
        '/core'+'/core/api/v1/notice/'+id,
        {
        }
      )
      const result = await resp.json();
      console.log("suju",result)
      dispatch({
        type    : DETAIL_SUCCESS,
        payload: result
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
        '/core'+'/core/api/v1/notice/dictionary/'+id,
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
            '/core'+'/core/api/v1/notice/'+id,
            {
                ...values,
            }
          )
        : await putReq(
            '/core'+'/core/api/v1/notice',
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
        ...getState().noticeModule.fields,
        ...fields
      }
    })
  }
}


export const fetchDic = (type) => {

  return async (dispatch, getState) => {
     dispatch({
      type    : DIC_REQUEST,
    })
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/dictionary/'+type+'/children',
        {
        }
      )
      const result = await resp.json();
      console.log("第一条",result)
      dispatch({
        type    :  DIC_SUCCESS,
        payload : {
          data: result
        } 
      })
    }catch(e) {
      dispatch({
        type    :  DIC_FAILURE,
        payload : e
      })
    }
  }
}


export const fetchDic2 = (type) => {

  return async (dispatch, getState) => {
     dispatch({
      type    : DIC2_REQUEST,
    })
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/dictionary/'+type+'/children',
        {
        }
      )
      const result = await resp.json();
      dispatch({
        type    :  DIC2_SUCCESS,
        payload : {
          data: result
        } 
      })
    }catch(e) {
      dispatch({
        type    :  DIC2_FAILURE,
        payload : e
      })
    }
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
  fetchDic,
  fetchDic2
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
      },
       detailData:{...action.payload}
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
  [DIC_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      dicStatus:{
        type: DIC_REQUEST,
        loading: true,
      }
    }),
  [DIC_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      dicStatus:{
        type: DIC_SUCCESS,
        loading: false,
      },
      dicList:{
        data:action.payload.data
      }
    }),
  [DIC_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      dicStatus:{
        type: DIC_FAILURE,
        loading: false,
      }
    }),
    [DIC2_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      dicStatus2:{
        type: DIC2_REQUEST,
        loading: true,
      }
    }),
  [DIC2_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      dicStatus:{
        type: DIC2_SUCCESS,
        loading: false,
      },
      dicList2:{
        data:action.payload.data
      }
    }),
  [DIC2_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      dicStatus2:{
        type: DIC2_FAILURE,
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
  dicStatus:{
    type:DIC_NOT,
    loading: false,
  },
  dicStatus2:{
    type:DIC2_NOT,
    loading: false,
  },
  fields:{
    id: null,//id,添加的时候为空，修改的时候有值
    
    title: {
      value: null
    },
    content: {
      value: null
    },
    createTime: {
      value: null
    },
    modifiedTime: {
      value: null
    },
    creator: {
      value: null
    },
    modifiedBy: {
      value: null
    },
    url: {
      value: null
    },
    picPath: {
      value: null
    },
    enterpriseId: {
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
      
      title: {
        value: null
      },
    },
  },
  dicList:{
    data:[]
  },
  dicList2:{
    data:[]
  },
  detailData:{ },
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
