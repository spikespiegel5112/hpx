import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../core/fetch';

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

export const FETCH_GETLABEL_NOT = ACTION_PREFIX + 'FETCH_GETLABEL_NOT'
export const FETCH_GETLABEL_REQUEST = ACTION_PREFIX + 'FETCH_GETLABEL_REQUEST'
export const FETCH_GETLABEL_FAILURE = ACTION_PREFIX + 'FETCH_GETLABEL_FAILURE'
export const FETCH_GETLABEL_SUCCESS = ACTION_PREFIX + 'FETCH_GETLABEL_SUCCESS'


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

export const ADD_LABELTWO = ACTION_PREFIX + 'ADD_LABELTWO'
export const DELETE_DETAILLIST = ACTION_PREFIX + 'DELETE_DETAILLIST'
export const DELETE_GRADELIST = ACTION_PREFIX + 'DELETE_GRADELIST'
export const UPDATE_FIELDS = ACTION_PREFIX + 'UPDATE_FIELDS'//更新表单里的值

export const SHOW_LABLE_MODAL = ACTION_PREFIX + 'SHOW_LABLE_MODAL'
export const HIDDEN_LABLE_MODAL = ACTION_PREFIX + 'HIDDEN_LABLE_MODAL'
export const SELECT_LABLE_OK = ACTION_PREFIX + 'SELECT_LABLE_OK'



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

//查询所有模型
export const fetchList =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    let list = getState().warningmodelModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    let field1 = queryParams.field1 ? queryParams.field1.value : null;
    if(field1) queryParams.field1 = queryParams.field1.value;
    else delete queryParams.field1;
      
    let field2 = queryParams.field2 ? queryParams.field2.value : null;
    delete queryParams.field2;
    if(field2){
      if( field2[0] ) queryParams.startKeyName = field2[0];
      if( field2[1] ) queryParams.endKeyName = field2[1];
    }

    let field3 = queryParams.field3 ? queryParams.field3.value : null;
    if(field3) queryParams.field3 = queryParams.field3.value;
    else delete queryParams.field3;
      
    let field4 = queryParams.field4 ? queryParams.field4.value : null;
    if(field4) queryParams.field4 = queryParams.field4.value;
    else delete queryParams.field4;
      
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    const eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/proxyCore'+'/credit/api/v1/tp/scoringmodel/'+eid,
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
    let industrylist = getState().warningmodelModule.industrylist;
    
    try{
      const resp = await getReq(
        '/proxyCore'+'/credit/api/v1/industry/all'
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
        '/proxyCore'+'/credit/api/v1/tp/scorelabel/'+eid+"/all"
      )
      const result = await resp.json();
      console.log("请求标签", result)
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
export const fetchGetLabel =  (record,id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_GETLABEL_REQUEST,
    })
    const eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/proxyCore'+'/credit/api/v1/tp/scorelabel/'+eid+"/"+id,
      )
      const result = await resp.json();
       console.log(11,result);
       record.addUserid = result.addUserid,
       record.addTime =result.addTime
       console.log(22,record);
      dispatch({
        type    : FETCH_GETLABEL_SUCCESS,
        payload : {
          rows: record,
        }
      })

      dispatch({
        type    : ADD_LABEL,
        payload : {
          rows: record,
        }
      })
    }catch(e){
      dispatch({
        type    : FETCH_GETLABEL_FAILURE,
        payload : e
      })
    }
  }
}

//查看单个模型信息
export const fetchSelect =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_SELECT_REQUEST,
    })
    let selectlist = getState().warningmodelModule.selectlist;
    const eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/proxyCore'+'/credit/api/v1/tp/scoringmodel/'+eid+"/"+id,
      )
      const result = await resp.json();

      //根据行业id查询行业名称
      const id2 = result.industryid;
      const resp2 = await getReq(
        '/proxyCore'+'/credit/api/v1/industry/'+id2,
      )
      const result2 = await resp2.json();

      result.industryid = result2.industryName;
      dispatch({
        type    : FETCH_SELECT_SUCCESS,
        payload : {
          rows: result,
        }
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

export const editWeightCell = (value) => {
  return (dispatch, action) => {
    dispatch({
      type    : EDIT_LABEL_ONE,
      payload : {
        rows: value,
      }
    })
  }
}

export const editNameCell = (name) => {
  return (dispatch, action) => {
    dispatch({
      type    : EDIT_LABEL_NAME,
      payload : {
        rows: name,
      }
    })
  }
}


export  const addtwo =  (values) => {
   return async (dispatch, getState) => {
    let gradeList = getState().warningmodelModule.gradeList;
    gradeList = [...gradeList.rows,values]
      dispatch({
        type    : ADD_LABELTWO,
        payload: gradeList
      })
  }
}

export const delLabelList = (data) => {
  return (dispatch, action) => {
    dispatch({
      type    : DELETE_DETAILLIST,
      payload : {
        rows: data
      }
    })
  }
}

export const delGradeList = (data) => {
  return (dispatch, action) => {
    dispatch({
      type    : DELETE_GRADELIST,
      payload : {
        rows: data
      }
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
        '/proxyCore'+'/credit/api/v1/tp/scoringmodel/'+eid+"/state/"+id,
      )
      //重新查询加载
      const resp2 = await getReq(
        '/proxyCore'+'/credit/api/v1/tp/scoringmodel/'+eid,
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
        '/proxyCore'+'/credit/api/v1/tp/scoringmodel/'+eid+"/"+id,
      )
      //重新查询加载
      const resp2 = await getReq(
        '/proxyCore'+'/credit/api/v1/tp/scoringmodel/'+eid,
      )
      const result = await resp2.json();
      console.log(564,result);
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

export  const save =  (values, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SAVE_REQUEST,
    })
    try{
      const eid = getState().login.userInfo.enterpriseId;
      const resp =  await putReq(
        '/proxyCore'+'/credit/api/v1/tp/scoringmodel/'+eid,
        {
          ...values
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

export const showLableModal = () => {
  return{
    type: SHOW_LABLE_MODAL
  }
}

export const hiddenLableModal = () => {
  return{
    type: HIDDEN_LABLE_MODAL
  }
}

export const selectLableOk = (selectLablelist) => {
  console.log("hehe",selectLablelist)
   return(dispatch, getState) => {
     dispatch({
        type: SELECT_LABLE_OK,
        payload: {
          rows: selectLablelist
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
  save,
  updateFields,
  forbidden,
  showLableModal,
  hiddenLableModal,
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
      industrylist : { 
        ...state.industrylist,
        rows : action.payload.rows,
      }
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
      selectlist : { 
        ...state.selectlist,
        rows : action.payload.rows,
      }
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
  [FETCH_GETLABEL_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      fetchGetLabelStatus : { 
        type : FETCH_GETLABEL_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_GETLABEL_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      fetchGetLabelStatus : { 
        type : FETCH_GETLABEL_SUCCESS,
        loading: false, 
      },
      getlabel : { 
        ...state.getlabel,
        rows : action.payload.rows,
      }
    }),
  [FETCH_GETLABEL_FAILURE] : (state, action) => 
     ({ 
      ...state, 
      err: action.payload,
      fetchGetLabelStatus : { 
        type : FETCH_GETLABEL_FAILURE,
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
  [ADD_LABELTWO] : (state, action) => 
    ({ 
      ...state, 
      gradeList:{
        ...state.gradeList,
        rows: action.payload
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
  [DELETE_DETAILLIST] : (state, action) => 
    ({
      ...state,
      weight:{
        ...state.detailList,
        rows: action.payload.rows
      }
    }),
  [DELETE_GRADELIST] : (state, action) => 
    ({
      ...state,
      gradeList:{
        ...state.gradeList,
        rows: action.payload.rows
      }
    }),
  [SHOW_LABLE_MODAL] : (state,action) =>
    ({
      ...state,
      visible: true,
    }),
  [HIDDEN_LABLE_MODAL] : (state,action) =>
    ({
      ...state,
      visible: false,
    }),
  [SELECT_LABLE_OK] : (state,action) =>
    ({
      ...state,
      visible: false,
      selectLablelist: {
        rows: action.payload.rows
      }
    }),
    
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
  visible: false,
  deleteStatus:{
    type:DELETE_NOT,
    loading: false,
  },
  saveStatus:{
    type:SAVE_NOT,
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
  fetchGetLabelStatus:{
    type:FETCH_GETLABEL_NOT,
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
    
    gradeCardName: {
      value: null
    },
    gradeCardDescribe: {
      value: null
    },
    industryid : {
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
      
      field1: {
        value: null
      },
      field2: {
        value: null
      },
      field3: {
        value: null
      },
      field4: {
        value: null
      },
      field5: {
        value: null
      },
    },
  },
  savelist:{
        gradeCardDescribe: '',
        gradeCardName:'',
        industryid:'',
        labelInfos: [
          {
            id: '',
            modelTargetInfos: [],
            weight: 0
          }
        ],
    scoreGrades: [
      {
        gradeMax: 0,
        gradeMin: 0,
        gradeName: '',
      }
    ],
    totalScore: 0
 },
  detailList:{
    rows:[],
  },
  gradeList:{
    rows:[]
  }, 
  industrylist:{
    rows:[]
  },
  lableList:{
    rows:[],
  },
  selectLablelist:{
    rows:[],
  },
  getlabel:{
    rows:[]
  },
  selectlist:{
    rows:null
  },
  scorelist:{
    rows:[]
  },
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
