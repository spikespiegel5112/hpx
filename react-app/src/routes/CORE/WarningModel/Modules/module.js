import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';
import {moment} from 'moment'
// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'warningmodelModule::';
export const UPDATE_QUERY_PARAMS = ACTION_PREFIX + 'UPDATE_QUERY_PARAMS'
export const CLEAR_QUERY_PARAMS = ACTION_PREFIX + 'CLEAR_QUERY_PARAMS'

export const CLEAR_ERR = ACTION_PREFIX + 'CLEAR_ERR'

export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const FETCH_INDUSTRY_NOT = ACTION_PREFIX + 'FETCH_INDUSTRY_NOT'
export const FETCH_INDUSTRY_REQUEST = ACTION_PREFIX + 'FETCH_INDUSTRY_REQUEST'
export const FETCH_INDUSTRY_FAILURE = ACTION_PREFIX + 'FETCH_INDUSTRY_FAILURE'
export const FETCH_INDUSTRY_SUCCESS = ACTION_PREFIX + 'FETCH_INDUSTRY_SUCCESS'

export const FETCH_SELECT_NOT = ACTION_PREFIX + 'FETCH_SELECT_NOT'
export const FETCH_SELECT_REQUEST = ACTION_PREFIX + 'FETCH_SELECT_REQUEST'
export const FETCH_SELECT_FAILURE = ACTION_PREFIX + 'FETCH_SELECT_FAILURE'
export const FETCH_SELECT_SUCCESS = ACTION_PREFIX + 'FETCH_SELECT_SUCCESS'

export const FETCH_LABEL_NOT = ACTION_PREFIX + 'FETCH_LABEL_NOT'
export const FETCH_LABEL_REQUEST = ACTION_PREFIX + 'FETCH_LABEL_REQUEST'
export const FETCH_LABEL_FAILURE = ACTION_PREFIX + 'FETCH_LABEL_FAILURE'
export const FETCH_LABEL_SUCCESS = ACTION_PREFIX + 'FETCH_LABEL_SUCCESS'

export const SAVE_MODAL_NOT = ACTION_PREFIX + 'SAVE_MODAL_NOT'
export const SAVE_MODAL_REQUEST = ACTION_PREFIX + 'SAVE_MODAL_REQUEST'
export const SAVE_MODAL_FAILURE = ACTION_PREFIX + 'SAVE_MODAL_FAILURE'
export const SAVE_MODAL_SUCCESS = ACTION_PREFIX + 'SAVE_MODAL_SUCCESS'

export const UPDATE_NOT = ACTION_PREFIX + 'UPDATE_NOT'
export const UPDATE_REQUEST = ACTION_PREFIX + 'UPDATE_REQUEST'
export const UPDATE_FAILURE = ACTION_PREFIX + 'UPDATE_FAILURE'
export const UPDATE_SUCCESS = ACTION_PREFIX + 'UPDATE_SUCCESS'

export const SAVE_NOT = ACTION_PREFIX + 'SAVE_NOT'
export const SAVE_REQUEST = ACTION_PREFIX + 'SAVE_REQUEST'
export const SAVE_FAILURE = ACTION_PREFIX + 'SAVE_FAILURE'
export const SAVE_SUCCESS = ACTION_PREFIX + 'SAVE_SUCCESS'

export const DETAIL_NOT = ACTION_PREFIX + 'DETAIL_NOT'
export const DETAIL_REQUEST = ACTION_PREFIX + 'DETAIL_REQUEST'
export const DETAIL_FAILURE = ACTION_PREFIX + 'DETAIL_FAILURE'
export const DETAIL_SUCCESS = ACTION_PREFIX + 'DETAIL_SUCCESS'

export const FORBIDDEN_NOT = ACTION_PREFIX + 'FORBIDDEN_NOT'
export const FORBIDDEN_REQUEST = ACTION_PREFIX + 'FORBIDDEN_REQUEST'
export const FORBIDDEN_FAILURE = ACTION_PREFIX + 'FORBIDDEN_FAILURE'
export const FORBIDDEN_SUCCESS = ACTION_PREFIX + 'FORBIDDEN_SUCCESS'

export const DELETE_NOT = ACTION_PREFIX + 'DELETE_NOT'
export const DELETE_REQUEST = ACTION_PREFIX + 'DELETE_REQUEST'
export const DELETE_FAILURE = ACTION_PREFIX + 'DELETE_FAILURE'
export const DELETE_SUCCESS = ACTION_PREFIX + 'DELETE_SUCCESS'

export const ADD_LABEL = ACTION_PREFIX + 'ADD_LABEL'
export const EDIT_LABEL_ONE = ACTION_PREFIX + 'EDIT_LABEL_ONE'
export const EDIT_LABEL_NAME = ACTION_PREFIX + 'EDIT_LABEL_NAME'

export const DELETE_LABLE_LIST = ACTION_PREFIX + 'DELETE_LABLE_LIST'
export const UPDATE_FIELDS = ACTION_PREFIX + 'UPDATE_FIELDS'//更新表单里的值

// ------------------------------------
// Actions
// ------------------------------------

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

//查询所有模型
export const fetchList =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    let list = getState().warningmodelModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    let modelName = queryParams.modelName ? queryParams.modelName.value : null;
    if(modelName) queryParams.modelName = queryParams.modelName.value;
    else delete queryParams.modelName;

    let timeRange = queryParams.timeRange ? queryParams.timeRange.value : null;
    delete queryParams.timeRange;
    if(timeRange){
      if( timeRange[0] ) queryParams.startTime =  timeRange[0];
      if( timeRange[1] ) queryParams.endTime = timeRange[1];
      
    }
    

    let industryId = queryParams.industryId ? queryParams.industryId.value : null;
    if(industryId) queryParams.industryId = queryParams.industryId.value;
    else delete queryParams.industryId;

    let enabledState = queryParams.enabledState ? queryParams.enabledState.value : null;
    if(enabledState) queryParams.enabledState = queryParams.enabledState.value;
    else delete queryParams.enabledState;
      
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;

    const eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid,
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

//查询所有行业
export const fetchIndustry =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_INDUSTRY_REQUEST,
    })
    let industryList = getState().warningmodelModule.industryList;
    
    try{
      const resp = await getReq(
        '/core'+'/credit/api/v1/industry/all'
      )
      const result = await resp.json();
      dispatch({
        type    : FETCH_INDUSTRY_SUCCESS,
        payload : {
          rows: result,
        }
      })
    }catch(e){
      dispatch({
        type    : FETCH_INDUSTRY_FAILURE,
        payload : e
      })
    }
  }
}

//查询所有标签
export const fetchLabel =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LABEL_REQUEST,
    })
    let labellist = getState().warningmodelModule.labellist;
    const eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/scorelabel/'+eid+"/all"
      )
      const result = await resp.json();
      dispatch({
        type    : FETCH_LABEL_SUCCESS,
        payload : {
          rows: result,
        }
      })
    }catch(e){
      dispatch({
        type    : FETCH_LABEL_FAILURE,
        payload : e
      })
    }
  }
}

//查询单个标签打分项
  // export const fetchGetLabel =  (record,id) => {
  //   return async (dispatch, getState) => {
  //     dispatch({
  //       type    : FETCH_GETLABEL_REQUEST,
  //     })
  //     const eid = getState().login.userInfo.enterpriseId;
  //     try{
  //       const resp = await getReq(
  //         '/proxyCore'+'/credit/api/v1/tp/scorelabel/'+eid+"/"+id,
  //       )
  //       const result = await resp.json();
  //        record.modelName = result.modelName,
  //        record.addTime =result.addTime
  //       dispatch({
  //         type    : FETCH_GETLABEL_SUCCESS,
  //         payload : {
  //           rows: record,
  //         }
  //       })

  //       dispatch({
  //         type    : ADD_LABEL,
  //         payload : {
  //           rows: record,
  //         }
  //       })
  //     }catch(e){
  //       dispatch({
  //         type    : FETCH_GETLABEL_FAILURE,
  //         payload : e
  //       })
  //     }
  //   }
// }

//查看单个模型信息
export const fetchSelect =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_SELECT_REQUEST,
    })
    const eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid+"/"+id,
      )
      const result = await resp.json();
      dispatch({
        type    : FETCH_SELECT_SUCCESS,
        payload : result
      })
    }catch(e){
      dispatch({
        type    : FETCH_SELECT_FAILURE,
        payload : e
      })
    }
  }
}

export  const add =  (values) => {
   return async (dispatch, getState) => {
    let weight = getState().warningmodelModule.weight;
    weight = [...weight.rows,values]
      dispatch({
        type    : ADD_LABEL,
        payload: {
          rows: weight
        }
      })
  }
}

//删除标签
export const delLabelList = (data) => {
  return (dispatch, action) => {
    dispatch({
      type    : DELETE_LABLE_LIST,
      payload : data
    })
  }
}

//模型禁用
export  const forbidden =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FORBIDDEN_REQUEST,
    })
    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp = await patchReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid+"/state/"+id,
      )
      //重新查询加载
      const resp2 = await getReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid,
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

//删除模型
export  const del =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : DELETE_REQUEST,
    })
    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp = await deleteReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid+"/"+id,
      )
      //重新查询加载
      const resp2 = await getReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid,
      )
      const result = await resp2.json();
      dispatch({
        type: DELETE_SUCCESS,
      })
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          rows: result,
        }
      })
    }catch(e){
      dispatch({
        type    : DELETE_FAILURE,
        payload : e
      })
    }
  }
}

//修改模型
export  const updateModal =  (values, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : UPDATE_REQUEST,
    })
    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp =  await putReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid+'/'+id,
        {
          ...values
        }
      )

      dispatch({
        type    : UPDATE_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : UPDATE_FAILURE,
        payload : e
      })
    }
  }
}

//保存模型
export  const saveModal =  (values, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SAVE_REQUEST,
    })
    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp =  
      // await putReq(
      //   '/core'+'/credit/api/v1/tp/scoringmodel/'+eid,
      //   {
      //     ...values
      //   }
      // )
       id ? await patchReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid+'/'+id,
        {
          ...values
        }
      )
      : await putReq(
        '/core'+'/credit/api/v1/tp/scoringmodel/'+eid,
        {
          ...values
        }
      )
      dispatch({
        type    : SAVE_MODAL_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : SAVE_MODAL_FAILURE,
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
        ...getState().warningmodelModule.fields,
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
  fetchLabel,
  fetchIndustry,
  fetchSelect,
  del,
  updateModal,
  updateFields,
  forbidden,
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
  
  [FETCH_INDUSTRY_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      fetchIndustryStatus : { 
        type : FETCH_INDUSTRY_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_INDUSTRY_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      fetchIndustryStatus : { 
        type : FETCH_INDUSTRY_SUCCESS,
        loading: false, 
      },
      industryList : action.payload.rows
    }),
  [FETCH_INDUSTRY_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      fetchIndustryStatus : { 
        type : FETCH_INDUSTRY_FAILURE,
        loading: false, 
      },
    }),

  [FETCH_SELECT_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      fetchSelectStatus : { 
        type : FETCH_SELECT_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_SELECT_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      fetchSelectStatus : { 
        type : FETCH_SELECT_SUCCESS,
        loading: false, 
      },
      selectModalList : {
        ...state.selectModalList,
        rows: action.payload
      },
      saveModalList : {
        gradeCardDescribe: action.payload.gradeCardDescribe,
        gradeCardName: action.payload.gradeCardName,
        industryid: action.payload.industryid,
        labelInfos: action.payload.labelInfos,
        scoreGrades: action.payload.scoreGrades,
        totalScore: action.payload.totalScore,
      },
    }),
  [FETCH_SELECT_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      fetchSelectStatus : { 
        type : FETCH_SELECT_FAILURE,
        loading: false, 
      },
    }),

  [FETCH_LABEL_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      fetchLabelStatus : { 
        type : FETCH_LABEL_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_LABEL_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      fetchLabelStatus : { 
        type : FETCH_LABEL_SUCCESS,
        loading: false, 
      },
      lableList : { 
        ...state.lableList,
        rows : action.payload.rows,
      }
    }),
  [FETCH_LABEL_FAILURE] : (state, action) => 
     ({ 
      ...state, 
      err: action.payload,
      fetchLabelStatus : { 
        type : FETCH_LABEL_FAILURE,
        loading: false, 
      },
    }),  
 
  [ADD_LABEL] : (state, action) => 
    ({ 
      ...state, 
      weight:{
        ...state.weight,
        rows: action.payload.rows
      }
    }),
  [EDIT_LABEL_ONE] : (state, action) => 
    ({ 
      ...state, 
      weight:{
        ...state.weight,
        rows: action.payload.rows
      }
    }),
  [EDIT_LABEL_NAME] : (state, action) => 
    ({ 
      ...state, 
      name:{
        ...state.weight,
        rows: action.payload.rows
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
  [UPDATE_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      updateStatus:{
        type: UPDATE_REQUEST,
        loading: true,
      }
    }),
  [UPDATE_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      updateStatus:{
        type: UPDATE_SUCCESS,
        loading: false,
      }
    }),
  [UPDATE_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      updateStatus:{
        type: UPDATE_FAILURE,
        loading: false,
      }
    }),
  [SAVE_MODAL_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      saveModalStatus:{
        type: SAVE_MODAL_REQUEST,
        loading: true,
      }
    }),
  [SAVE_MODAL_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      saveModalStatus:{
        type: SAVE_MODAL_SUCCESS,
        loading: false,
      }
    }),
  [SAVE_MODAL_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      saveModalStatus:{
        type: SAVE_MODAL_FAILURE,
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
  [DELETE_LABLE_LIST] : (state, action) => 
    ({
      ...state,
      saveModalList:{
        ...state.saveModalList,
        labelInfos: action.payload
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
  updateStatus:{
    type:UPDATE_NOT,
    loading: false,
  },
  saveModalStatus:{
    type:SAVE_MODAL_NOT,
    loading: false,
  },
  fetchIndustryStatus:{
    type:FETCH_INDUSTRY_NOT,
    loading: false,
  },
  fetchSelectStatus:{
    type:FETCH_SELECT_NOT,
    loading: false,
  },
  fetchLabelStatus:{
    type:FETCH_LABEL_NOT,
    loading: false,
  },
  listStatus:{
    type:FETCH_LIST_NOT,
    loading: false,
  },
  forbiddenStatus:{
    type:FORBIDDEN_NOT,
    loading: false,
  },
  fields:{
    id: null,//id,添加的时候为空，修改的时候有值
    
    modelName: {
      value: null
    },
    gradeCardDescribe: {
      value: null
    },
    industryId : {
      value:null
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
      timeRange: {
        value: null
      },
      modelName: {
        value: null
      },
      industryId: {
        value: null
      },
      enabledState: {
        value: null
      },
    },
  },
  industryList: [],
  saveModalList:{
    gradeCardDescribe: null,
    gradeCardName: null,
    industryid: null,
    labelInfos: [],
    scoreList: [],
    scoreGrades: [],
    totalScore: null,
  },
  weight:{rows:[]},
  detailList:{
    rows:[],
  },
  gradeList:{
    rows:[],
  },
  lableList:{
    rows:[],
  },
  selectModalList:{
    rows:null,
  },
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
