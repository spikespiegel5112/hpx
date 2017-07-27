import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'enterpriseAccessPreModule::';
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

export const INDUSTRY_NOT = ACTION_PREFIX + 'INDUSTRY_NOT'
export const INDUSTRY_REQUEST = ACTION_PREFIX + 'INDUSTRY_REQUEST'
export const INDUSTRY_FAILURE = ACTION_PREFIX + 'INDUSTRY_FAILURE'
export const INDUSTRY_SUCCESS = ACTION_PREFIX + 'INDUSTRY_SUCCESS'

export const MODEL_NOT = ACTION_PREFIX + 'MODEL_NOT'
export const MODEL_REQUEST = ACTION_PREFIX + 'MODEL_REQUEST'
export const MODEL_FAILURE = ACTION_PREFIX + 'MODEL_FAILURE'
export const MODEL_SUCCESS = ACTION_PREFIX + 'MODEL_SUCCESS'
export const MODEL_CLEAR = ACTION_PREFIX + 'MODEL_CLEAR'


export const SM_NOT = ACTION_PREFIX + 'SM_NOT'
export const SM_REQUEST = ACTION_PREFIX + 'SM_REQUEST'
export const SM_FAILURE = ACTION_PREFIX + 'SM_FAILURE'
export const SM_SUCCESS = ACTION_PREFIX + 'SM_SUCCESS'
export const SM_CLEAR = ACTION_PREFIX + 'SM_CLEAR'

export const SM_SAVE_NOT = ACTION_PREFIX + 'SM_SAVE_NOT'
export const SM_SAVE_REQUEST = ACTION_PREFIX + 'SM_SAVE_REQUEST'
export const SM_SAVE_FAILURE = ACTION_PREFIX + 'SM_SAVE_FAILURE'
export const SM_SAVE_SUCCESS = ACTION_PREFIX + 'SM_SAVE_SUCCESS'

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
    let enterpriseId = getState().login.userInfo.enterpriseId;
    let list = getState().enterpriseAccessPreModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    let projectName = queryParams.projectName ? queryParams.projectName.value : null;
    if(projectName) queryParams.projectName = queryParams.projectName.value;
    else delete queryParams.projectName;
      
    let creditState = queryParams.creditState ? queryParams.creditState.value : null;
    if(creditState) queryParams.creditState = queryParams.creditState.value;
    else delete queryParams.creditState;
      
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/enterprises/veyiterpriseAccess/'+enterpriseId,//-----------------企业编号怎么获取
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
    // if(!id){//没有id，就是新增
    //   dispatch({
    //     type: UPDATE_FIELDS,
    //     payload: {
    //       ...initialState.fields
    //     }
    //   })
    //   return;
    // }
    dispatch({
      type    : DETAIL_REQUEST,
    })
    try{
      let userId = getState().login.userInfo.id;
      let enterpriseId = getState().login.userInfo.enterpriseId;
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/report/'+ enterpriseId + '/' + userId + '/' +id,
        {
        }
      )
      const result = await resp.json();
      let data = result;
      console.log(data)
      // console.log('哈哈',data.riskPricingRatio);
      dispatch({
        type    : DETAIL_SUCCESS,
        payload : data || null
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
        '/core'+'undefined/'+id,
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
            '/core'+'undefined/'+id,
            {
                ...values,
            }
          )
        : await putReq(
            '/core'+'undefined',
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
        ...getState().enterpriseAccessPreModule.fields,
        ...fields
      }
    })
  }
}

export const fetchIndustryList =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : INDUSTRY_REQUEST,
    })
    try{

      let industryList = getState().enterpriseAccessPreModule.industryList;

      const resp = await getReq(
        '/core'+'/credit/api/v1/industry/all',
        {
        }
      )
      const result = await resp.json();
      console.log('行业',result);
      
      dispatch({
        type    : INDUSTRY_SUCCESS,
        payload : {
          data:result
        } 
      })
    }catch(e) {
      dispatch({
        type    : INDUSTRY_FAILURE,
        payload : e
      })
    }
  }
}

export const fetchModelList =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : MODEL_REQUEST,
    })
    try{
      let enterpriseId = getState().login.userInfo.enterpriseId;
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+enterpriseId+'/model/'+id,
        {
        }
      )
      const result = await resp.json();
      let data = result;
      console.log('模型',data);
      
      dispatch({
        type    : MODEL_SUCCESS,
        payload : {
          data:result
        } 
      })
    }catch(e) {
      dispatch({
        type    : MODEL_FAILURE,
        payload : e
      })
    }
  }
}

export const fetchScoringmodel =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SM_REQUEST,
    })
    try{
      let enterpriseId = getState().login.userInfo.enterpriseId;
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+enterpriseId+'/'+id,
        {
        }
      )
      const result = await resp.json();
      let data = result;
      console.log('打分卡',data);
      
      dispatch({
        type    : SM_SUCCESS,
        payload : {
          data: result
        } 
      })
    }catch(e) {
      dispatch({
        type    : SM_FAILURE,
        payload : e
      })
    }
  }
}

export const saveReport =  (values) => {
    console.log('saveReport',values);
    return async (dispatch, getState) => {
    dispatch({
      type    : SM_SAVE_REQUEST,
    })
    try{
      let enterpriseId = getState().login.userInfo.enterpriseId;
      const resp = 
        await putReq(
            '/core'+'/credit/api/v1/tp/report/'+enterpriseId,
            {
                ...values
            }
          )
      const result = await resp.json();
      dispatch({
        type    : SM_SAVE_SUCCESS,
        payload : {
          data: result
        } 
      })
    }catch(e){
      dispatch({
        type    : SM_SAVE_FAILURE,
        payload : e
      })
    }
  }
}

export const clearSmInfo = (data) =>{
  return (dispatch, action) => {
    dispatch({
      type    : SM_CLEAR,
      payload : {
        scoringmodel: data,
      }
    })
  }
}

export const clearModelInfo = (data) => {
  return (dispatch, action) => {
    dispatch({
      type    : MODEL_CLEAR,
      payload : {
        data: data,
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
  fetchIndustryList,
  fetchModelList,
  fetchScoringmodel,
  saveReport,
  clearSmInfo
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
      detailList :action.payload
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

    [INDUSTRY_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      industryStatus:{
        type: INDUSTRY_REQUEST,
        loading: true,
      }
    }),
  [INDUSTRY_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      industryStatus:{
        type: INDUSTRY_SUCCESS,
        loading: true,
      },
      industryList:{
        data:action.payload.data
      }
    }),
  [INDUSTRY_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      industryStatus:{
        type: INDUSTRY_FAILURE,
        loading: false,
      }
    }),

    [MODEL_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      modelStatus:{
        type: MODEL_REQUEST,
        loading: true,
      }
    }),
  [MODEL_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      modelStatus:{
        type: MODEL_SUCCESS,
        loading: false,
      },
      modelList:{
        data:action.payload.data
      }
    }),
  [MODEL_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      modelStatus:{
        type: MODEL_FAILURE,
        loading: false,
      }
    }),
  
  [UPDATE_FIELDS] : (state, action) => 
    ({ 
      ...state, 
      fields: action.payload
    }),
  [SM_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      smStatus:{
        type: SM_FAILURE,
        loading: true,
      }
    }),
  [SM_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      isShow: true,
      smStatus:{
        type: SM_SUCCESS,
        loading: false,
      },
      scoringmodel:{
        gradeCardName:action.payload.data.gradeCardName,
        gradeCardDescribe:action.payload.data.gradeCardDescribe,
        labelInfos:action.payload.data.labelInfos
      }
    }),
  [SM_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      saveStatus:{
        type: SM_REQUEST,
        loading: true,
      }
    }),
  [SM_SAVE_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      smSaveStatus:{
        type: SM_SAVE_REQUEST,
        loading: true,
      },
    }),
  [SM_SAVE_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      smSaveStatus:{
        type: SM_SAVE_FAILURE,
        loading: false,
      },
    }),
  [SM_SAVE_SUCCESS] : (state, action) =>
   ({ 
      ...state, 
      smSaveStatus:{
        type: SM_SAVE_SUCCESS,
        loading: false,
      },
      reportReturnInfo:{
        id:action.payload.data.id,
        modelid:action.payload.data.modelid,
        userid:action.payload.data.userid,
        projectid:action.payload.data.projectid
      }
    }),
  [SM_CLEAR] : (state, action) => 
    ({ 
      ...state, 
      isShow: false,
      scoringmodel:action.payload.scoringmodel
    }),
  [MODEL_CLEAR] : (state, action) => 
    ({ 
      ...state, 
       modelList:{
          data:action.payload.data
        }
    }),
  
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
  isShow: false,
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
  industryStatus:{
    type: INDUSTRY_NOT,
    loading: false,
  },
  modelStatus:{
    type: MODEL_NOT,
    loading: false,
  },
  smStatus:{
    type:SM_NOT,
    loading: false,
  },
  smSaveStatus:{
    type:SM_SAVE_NOT,
    loading: false,
  },
  fields:{
    id: null,//id,添加的时候为空，修改的时候有值
    
  },//表单数据
  list:{
    rows:[],
    queryParams:{
      pagination:{
        current:1,
        total:0,
        pageSize:10,
      },
      
      projectName: {
        value: null
      },
      creditState: {
        value: null
      },
    },
  },
  detailList:{
    tpGradeModelInfoHistoryExtend : {
      tpLabelInfoHistoryExtend:[]
    }
  }
  ,
  industryList:{
     data:[]
  }
  ,
  modelList:{
     data:[]
  },
  scoringmodel:{
     gradeCardName:'',
     gradeCardDescribe:'',   
     labelInfos:[]
  },
  reportReturnInfo:{
      id:'',
      modelid:'',
      userid:'',
      projectid:''
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
