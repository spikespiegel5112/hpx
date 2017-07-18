import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'myProjectModule::';
export const UPDATE_QUERY_PARAMS = ACTION_PREFIX + 'UPDATE_QUERY_PARAMS'
export const CLEAR_QUERY_PARAMS = ACTION_PREFIX + 'CLEAR_QUERY_PARAMS'

export const CLEAR_ERR = ACTION_PREFIX + 'CLEAR_ERR'

export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const FETCH_LISTTWO_NOT = ACTION_PREFIX + 'FETCH_LISTTWO_NOT'
export const FETCH_LISTTWO_REQUEST = ACTION_PREFIX + 'FETCH_LISTTWO_REQUEST'
export const FETCH_LISTTWO_FAILURE = ACTION_PREFIX + 'FETCH_LISTTWO_FAILURE'
export const FETCH_LISTTWO_SUCCESS = ACTION_PREFIX + 'FETCH_LISTTWO_SUCCESS'

export const FETCH_RECORD_NOT = ACTION_PREFIX + 'FETCH_RECORD_NOT'
export const FETCH_RECORD_REQUEST = ACTION_PREFIX + 'FETCH_RECORD_REQUEST'
export const FETCH_RECORD_FAILURE = ACTION_PREFIX + 'FETCH_RECORD_FAILURE'
export const FETCH_RECORD_SUCCESS = ACTION_PREFIX + 'FETCH_RECORD_SUCCESS'

export const FETCH_FIRM_NOT = ACTION_PREFIX + 'FETCH_FIRM_NOT'
export const FETCH_FIRM_REQUEST = ACTION_PREFIX + 'FETCH_FIRM_REQUEST'
export const FETCH_FIRM_FAILURE = ACTION_PREFIX + 'FETCH_FIRM_FAILURE'
export const FETCH_FIRM_SUCCESS = ACTION_PREFIX + 'FETCH_FIRM_SUCCESS'

export const FETCH_ENTERPRISE_NOT = ACTION_PREFIX + 'FETCH_ENTERPRISE_NOT'
export const FETCH_ENTERPRISE_REQUEST = ACTION_PREFIX + 'FETCH_ENTERPRISE_REQUEST'
export const FETCH_ENTERPRISE_FAILURE = ACTION_PREFIX + 'FETCH_ENTERPRISE_FAILURE'
export const FETCH_ENTERPRISE_SUCCESS = ACTION_PREFIX + 'FETCH_ENTERPRISE_SUCCESS'

export const SAVE_NOT = ACTION_PREFIX + 'SAVE_NOT'
export const SAVE_REQUEST = ACTION_PREFIX + 'SAVE_REQUEST'
export const SAVE_FAILURE = ACTION_PREFIX + 'SAVE_FAILURE'
export const SAVE_SUCCESS = ACTION_PREFIX + 'SAVE_SUCCESS'

export const ACCEPT_NOT = ACTION_PREFIX + 'ACCEPT_NOT'
export const ACCEPT_REQUEST = ACTION_PREFIX + 'ACCEPT_REQUEST'
export const ACCEPT_FAILURE = ACTION_PREFIX + 'ACCEPT_FAILURE'
export const ACCEPT_SUCCESS = ACTION_PREFIX + 'ACCEPT_SUCCESS'

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

//我的项目列表
export const fetchList =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    let list = getState().myProjectModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    queryParams.eid = getState().login.userInfo.enterpriseId;
    queryParams.inviteStatus = 'T';
    queryParams.state = 'T';

    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      
      const resp = await getReq(
        '/core'+'/core/api/v1/enterprise/projects/vo',
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

//受邀项目列表
export const fetchListTwo =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LISTTWO_REQUEST,
    })
    let listTwo = getState().myProjectModule.listTwo;
    let queryParams = Object.assign({},listTwo.queryParams);

    queryParams.eid = getState().login.userInfo.enterpriseId;
    queryParams.inviteStatus = 'I';
    queryParams.state = 'F';

    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      const resp = await getReq(
      '/core'+'/core/api/v1/enterprise/projects/vo',
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
        type    : FETCH_LISTTWO_SUCCESS,
        payload : {
          rows: result,
          total: total,
          current: current,
          pageSize: pagination.pageSize
        }
      })
    }catch(e){
      dispatch({
        type    : FETCH_LISTTWO_FAILURE,
        payload : e
      })
    }
  }
}

//邀请记录
export const fetchRecord =  (pid) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_RECORD_REQUEST,
    })
    let recordList = getState().myProjectModule.recordList;
    let queryParams = Object.assign({},recordList.queryParams);

    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp = await getReq(
        '/core'+'/core/api/v1/enterprisProjects/'+eid+'/inviteRecords/'+pid,
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
        type    : FETCH_RECORD_SUCCESS,
        payload : {
          rows: result,
          total: total,
          current: current,
          pageSize: pagination.pageSize
        }
      })
    }catch(e){
      dispatch({
        type    : FETCH_RECORD_FAILURE,
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
        '/proxy'+'/trade/testOb/detail/'+id,
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
          
          product: {
            value: data.product || null
          },
          rose: {
            value: data.rose || null
          },
          datePicker: {
            value: data.datePicker || null
          },
          money: {
            value: data.money || null
          },
          proNum: {
            value: data.proNum || null
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

//获取所有企业信息
export const fetchFirm =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_FIRM_REQUEST,
    }) 
        let firmList = getState().myProjectModule.firmList;
        let queryParams = Object.assign({},firmList.queryParams);

        let activated = 'T';
        queryParams.activated = activated;
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/enterprises',
        queryParams
      )
      const result = await resp.json();
      dispatch({
        type    : FETCH_FIRM_SUCCESS,
        payload :  result,
      })
    }catch(e){
      dispatch({
        type    : FETCH_FIRM_FAILURE,
        payload : e
      })
    }
  }
}

//根据产品code获取所有企业角色信息
export const fetchEnterprise =  (pdId) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_ENTERPRISE_REQUEST,
    })
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/products/'+pdId+'/ent_roles'
      )
      const result = await resp.json();
      dispatch({
        type    : FETCH_ENTERPRISE_SUCCESS,
        payload :  result,
      })
    }catch(e){
      dispatch({
        type    : FETCH_ENTERPRISE_FAILURE,
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
        '/proxy'+'/trade/testOb/delete/'+id,
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

//邀请确认（新增企业项目信息）
export  const save =  (enterpriseProject, eid ,pid) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SAVE_REQUEST,
    })
    try{
      const resp =  await putReq(
            '/core'+'/core/api/v1/enterprise/'+eid+'/projects/'+pid,
            {
                ...enterpriseProject,
            }
          )
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


//接受邀请、拒绝邀请
export  const accept =  (pid,inviteStatus) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : ACCEPT_REQUEST,
    })
    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp = await patchReq(
        '/core'+'/core/api/v1/enterprise/'+eid+"/projects/"+pid+'/invite/'+inviteStatus,
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


export const updateFields = (fields,type) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_FIELDS,
      payload: {
        ...getState().myProjectModule.fields,
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
  fetchListTwo,
  fetchDetail,
  fetchFirm,
  fetchEnterprise,
  del,
  save,
  fetchRecord,
  updateFields,
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
  [FETCH_LISTTWO_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      listTwoStatus : { 
        type : FETCH_LISTTWO_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_LISTTWO_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      listTwoStatus : { 
        type : FETCH_LISTTWO_SUCCESS,
        loading: false, 
      },
      listTwo : { 
        ...state.listTwo,
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
  [FETCH_LISTTWO_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      listTwoStatus : { 
        type : FETCH_LISTTWO_FAILURE,
        loading: false, 
      },
    }),



  [FETCH_RECORD_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      recordStatus : { 
        type : FETCH_RECORD_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_RECORD_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      recordStatus : { 
        type : FETCH_RECORD_SUCCESS,
        loading: false, 
      },
      recordList : { 
        ...state.recordList,
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
  [FETCH_RECORD_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      recordStatus : { 
        type : FETCH_RECORD_FAILURE,
        loading: false, 
      },
    }),

  [FETCH_FIRM_REQUEST] : (state, action) =>
        ({
            ...state,
            firmStatus : {
                type : FETCH_FIRM_REQUEST,
                loading: true,
            },
        }),
  [FETCH_FIRM_SUCCESS] : (state, action) =>
        ({
            ...state,
            firmStatus : {
                type : FETCH_FIRM_SUCCESS,
                loading: false,
            },
            firmList :  action.payload
        }),
  [FETCH_FIRM_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            firmStatus : {
                type : FETCH_FIRM_FAILURE,
                loading: false,
            },
        }),

  [FETCH_ENTERPRISE_REQUEST] : (state, action) =>
        ({
            ...state,
            enterpriseStatus : {
                type : FETCH_ENTERPRISE_REQUEST,
                loading: true,
            },
        }),
  [FETCH_ENTERPRISE_SUCCESS] : (state, action) =>
        ({
            ...state,
            enterpriseStatus : {
                type : FETCH_ENTERPRISE_SUCCESS,
                loading: false,
            },
            enterpriseList :  action.payload
        }),
  [FETCH_ENTERPRISE_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            enterpriseStatus : {
                type : FETCH_ENTERPRISE_FAILURE,
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
  listTwoStatus:{
    type:FETCH_LISTTWO_NOT,
    loading: false,
  },
  recordStatus:{
    type:FETCH_RECORD_NOT,
    loading: false,
  },
  firmStatus:{
        type:FETCH_FIRM_NOT,
        loading: false,
  },
  acceptStatus:{
        type:ACCEPT_NOT,
        loading: false,
  },
  enterpriseStatus:{
        type:FETCH_ENTERPRISE_NOT,
        loading: false,
  },
  fields:{
    id: null,//id,添加的时候为空，修改的时候有值
    
    product: {
      value: null
    },
    rose: {
      value: null
    },
    datePicker: {
      value: null
    },
    money: {
      value: null
    },
    proNum: {
      value: null
    },
  },//表单数据
  list:{
    rows:[],
    queryParams:{
      pagination:{
        current:1,
        total:0,
        pageSize:5,
      },
    },
  },
  listTwo:{
    rows:[],
    queryParams:{
      pagination:{
        current:1,
        total:0,
        pageSize:5,
      },
    },
  },
  //企业信息
  firmList:[],
  //企业角色信息
  enterpriseList:[],
  //邀请记录
  recordList:{
    rows:[],
      queryParams:{
        pagination:{
          current:1,
          total:0,
          pageSize:5,
        },
      },
  },
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
