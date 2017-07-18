import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'companyManagerModule::';
export const UPDATE_QUERY_PARAMS = ACTION_PREFIX + 'UPDATE_QUERY_PARAMS'

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


// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

//企业信息列表
export const fetchList =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    let list = getState().companyManagerModule.list;
    let queryParams = Object.assign({},list.queryParams);

    let name = queryParams.name ? queryParams.name.value : null;
    if(name) queryParams.name = queryParams.name.value;
    else delete queryParams.name;

    let activated = queryParams.activated ? queryParams.activated.value : null;
    if(activated) queryParams.activated = queryParams.activated.value;
    else delete queryParams.activated;
    
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/enterprises',
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

//查看单个企业信息
export  const fetchDetail =  (id) => {
  return async (dispatch, getState) => {
     dispatch({
      type    : FETCH_DETAIL_REQUEST,
    })
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/enterprises/'+id
      )
      const result = await resp.json();
      console.log('result',result);
      dispatch({
        type    : FETCH_DETAIL_SUCCESS,
         payload : {
          rows: result,
        }
      })
    }catch(e) {
      dispatch({
        type    : FETCH_DETAIL_FAILURE,
        payload : e
      })
    }
  }
}


//企业禁用，启用
export  const forbidden =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FORBIDDEN_REQUEST,
    })
    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp = await patchReq(
        '/core'+'/core/api/v1/enterprises/palt/enterprise/status/'+id,
      )
      //重新查询加载
      const resp2 = await getReq(
        '/core'+'/core/api/v1/enterprises',
      )
      const result = await resp2.json();
      dispatch({
        type: FORBIDDEN_SUCCESS,
      })
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          rows: result,
        }
      })
    }catch(e){
      dispatch({
        type    : FORBIDDEN_FAILURE,
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

// export const updateFields = (fields,type) => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: UPDATE_FIELDS,
//       payload: {
//         ...getState().addressModule.fields,
//         ...fields
//       }
//     })
//   }
// }

export const actions = {
  fetchList,
  fetchDetail,
  forbidden,
  updateQueryParams,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
  
  [FETCH_DETAIL_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      fetchDetailStatus : { 
        type : FETCH_DETAIL_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_DETAIL_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      fetchDetailStatus : { 
        type : FETCH_DETAIL_SUCCESS,
        loading: false, 
      },
      detailList : { 
        ...state.detailList,
        rows : action.payload.rows,
      }
    }),
  [FETCH_DETAIL_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      fetchDetailStatus : { 
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
  // [UPDATE_FIELDS] : (state, action) => 
  //   ({ 
  //     ...state, 
  //     fields: action.payload
  //   }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
  listStatus:{
    type:FETCH_LIST_NOT,
    loading: false,
  },
  forbiddenStatus:{
    type:FORBIDDEN_NOT,
    loading: false,
  },
  fetchDetailStatus:{
    type:FETCH_DETAIL_NOT,
    loading: false,
  },
//表单数据
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
  detailList:{
    rows:[],
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
