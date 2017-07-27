import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'labelInfoModule::';
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

export const SAVE_LABEL_NOT = ACTION_PREFIX + 'SAVE_LABEL_NOT'
export const SAVE_LABEL_REQUEST = ACTION_PREFIX + 'SAVE_LABEL_REQUEST'
export const SAVE_LABEL_FAILURE = ACTION_PREFIX + 'SAVE_LABEL_FAILURE'
export const SAVE_LABEL_SUCCESS = ACTION_PREFIX + 'SAVE_LABEL_SUCCESS'

export const DETAIL_NOT = ACTION_PREFIX + 'DETAIL_NOT'
export const DETAIL_REQUEST = ACTION_PREFIX + 'DETAIL_REQUEST'
export const DETAIL_FAILURE = ACTION_PREFIX + 'DETAIL_FAILURE'
export const DETAIL_SUCCESS = ACTION_PREFIX + 'DETAIL_SUCCESS'

export const EDIT_NOT = ACTION_PREFIX + 'EDIT_NOT'
export const EDIT_REQUEST = ACTION_PREFIX + 'EDIT_REQUEST'
export const EDIT_FAILURE = ACTION_PREFIX + 'EDIT_FAILURE'
export const EDIT_SUCCESS = ACTION_PREFIX + 'EDIT_SUCCESS'

export const DELETE_NOT = ACTION_PREFIX + 'DELETE_NOT'
export const DELETE_REQUEST = ACTION_PREFIX + 'DELETE_REQUEST'
export const DELETE_FAILURE = ACTION_PREFIX + 'DELETE_FAILURE'
export const DELETE_SUCCESS = ACTION_PREFIX + 'DELETE_SUCCESS'

export const DISABLED_NOT = ACTION_PREFIX + 'DISABLED_NOT'
export const DISABLED_REQUEST = ACTION_PREFIX + 'DISABLED_REQUEST'
export const DISABLED_FAILURE = ACTION_PREFIX + 'DISABLED_FAILURE'
export const DISABLED_SUCCESS = ACTION_PREFIX + 'DISABLED_SUCCESS'

export const UPDATE_FIELDS = ACTION_PREFIX + 'UPDATE_FIELDS'//更新表单里的值
export const UPDATE_INPUTS = ACTION_PREFIX + 'UPDATE_INPUTS'
export const UPDATE_EDITFIELDS = ACTION_PREFIX + 'UPDATE_EDITFIELDS'
export const SHOW_MODAL = ACTION_PREFIX + 'SHOW_MODAL'
export const HIDDEN_MODAL = ACTION_PREFIX + 'HIDDEN_MODAL'
export const ADD_LABEL = ADD_LABEL + 'HIDDEN_MODAL'
export const EDIT_LABEL_NAME = ADD_LABEL + 'EDIT_LABEL_NAME'
export const DELETE_EDIT = ADD_LABEL + 'DELETE_EDIT'

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

export const fetchList =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    let list = getState().labelInfoModule.list;
    let userInfo = getState().login.userInfo;
    let eid = getState().login.userInfo.enterpriseId;
    let queryParams = Object.assign({},list.queryParams);

    let name = queryParams.name ? queryParams.name.value : null;
    if(name) queryParams.name = queryParams.name.value;
    else delete queryParams.name;

    let addTime = queryParams.addTime ? queryParams.addTime.value : null;
    delete queryParams.addTime;
    if(addTime){
      if( addTime[0] ) queryParams.startTime = addTime[0];
      if( addTime[1] ) queryParams.endTime = addTime[1];
    }

    let labelState = queryParams.labelState ? queryParams.labelState.value : null;
    if(labelState) queryParams.labelState = queryParams.labelState.value;
    else delete queryParams.labelState;

    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/scorelabel/'+eid,
        queryParams
      )
      const result = await resp.json();
      const total = resp.headers.get('x-total-count');
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
    dispatch({
      type    : DETAIL_REQUEST,
    })
    let eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/scorelabel/'+eid+'/'+id,
        {}
      )
      const result = await resp.json();
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
    let eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await deleteReq(
        '/core'+'/credit/api/v1/tp/scorelabel/'+eid+'/'+id,
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

export  const add =  (values) => {
   return async (dispatch, getState) => {
    let list = getState().labelInfoModule.detailList;
    let modelTargetInfos = [...list.modelTargetInfos,values]
      dispatch({
        type    : ADD_LABEL,
        payload: modelTargetInfos
      })
  }
}

export  const saveLabel =  (values) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SAVE_LABEL_REQUEST,
    })
    let eid = getState().login.userInfo.enterpriseId;
    try{
      const resp =  await postReq(
            '/core'+'/credit/api/v1/tp/scorelabel/'+eid+'/import',
            {
              ...values
            }
          )
      dispatch({
        type    : SAVE_LABEL_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : SAVE_LABEL_FAILURE,
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
    let eid = getState().login.userInfo.enterpriseId;
    try{
      const resp =
      id
      ? await patchReq(
            '/core'+'/credit/api/v1/tp/scorelabel/'+eid+'/'+id,
            {
                ...values
            }
          )
      : await putReq(
        '/core'+'/credit/api/v1/tp/scorelabel/' + eid,
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

export  const disabled =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : DISABLED_REQUEST,
    })
    let eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await patchReq(
        '/core'+'/credit/api/v1/tp/scorelabel/'+eid+'/state/'+id,
        {
        }
      )
      dispatch({
        type: DISABLED_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : DISABLED_FAILURE,
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
        ...getState().labelInfoModule.fields,
        ...fields
      }
    })
  }
}

export const updateEditFields = (editFields,type) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_EDITFIELDS,
      payload: {
        ...getState().labelInfoModule.editFields,
        ...editFields
      }
    })
  }
}

export const updateInputs = (inputs,type) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_INPUTS,
      payload: {
        ...getState().labelInfoModule.inputs,
        ...inputs
      }
    })
  }
}

export const showModal = () => {
  return{
    type: SHOW_MODAL
  }
}

export const handleCancel = () => {
  return{
    type: HIDDEN_MODAL
  }
}

export const nameChange = (value) => {
  return (dispatch, action) => {
    dispatch({
      type    : EDIT_LABEL_NAME,
      payload : {
        scoreCardName: value,
      }
    })
  }
}

export const delEdit = (data) => {
  return (dispatch, action) => {
    dispatch({
      type    : DELETE_EDIT,
      payload : {
        modelTargetInfos: data
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
  handleCancel,
  del,
  save,
  saveLabel,
  updateFields,
  updateEditFields,
  showModal,
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
      scoreCardName: action.payload.scoreCardName,
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
      detailList:{
        ...state.detailList,
        modelTargetInfos: action.payload.modelTargetInfos,
        scoreCardName: action.payload.scoreCardName,
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
  [SAVE_LABEL_REQUEST] : (state, action) =>
    ({
      ...state,
      saveLabelStatus:{
        type: SAVE_LABEL_REQUEST,
        loading: true,
      }
    }),
  [SAVE_LABEL_SUCCESS] : (state, action) =>
    ({
      ...state,
      visible: false,
      saveLabelStatus:{
        type: SAVE_LABEL_SUCCESS,
        loading: false,
      }
    }),
  [SAVE_LABEL_FAILURE] : (state, action) =>
    ({
      ...state,
      err: action.payload,
      saveLabelStatus:{
        type: SAVE_LABEL_FAILURE,
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
  [UPDATE_EDITFIELDS] : (state, action) =>
    ({
    ...state,
    editFields: action.payload
    }),
  [UPDATE_INPUTS] : (state, action) =>
    ({
      ...state,
      scoreCardName: action.payload
    }),
  [SHOW_MODAL] : (state,action) =>
    ({
      ...state,
      visible: true,
    }),
  [HIDDEN_MODAL] : (state, action) =>
    ({
      ...state,
      visible: false
    }),
  [DISABLED_REQUEST] : (state, action) =>
    ({
      ...state,
      disabledStatus:{
        type: DISABLED_REQUEST,
        loading: true,
      }
    }),
  [DISABLED_SUCCESS] : (state, action) =>
    ({
      ...state,
      disabledStatus:{
        type: DISABLED_SUCCESS,
        loading: false,
      }
    }),
  [DISABLED_FAILURE] : (state, action) =>
    ({
      ...state,
      err: action.payload,
      disabledStatus:{
        type: DISABLED_FAILURE,
        loading: false,
      }
    }),
  [ADD_LABEL] : (state, action) =>
    ({
      ...state,
      detailList:{
        ...state.detailList,
        modelTargetInfos: action.payload
      }
    }),
  [DELETE_EDIT] : (state, action) =>
    ({
      ...state,
      detailList:{
        ...state.detailList,
        modelTargetInfos: action.payload.modelTargetInfos
      }
    }),
  [EDIT_LABEL_NAME] : (state, action) =>
      ({
        ...state,
        detailList:{
          ...state.detailList,
          scoreCardName: action.payload.scoreCardName
        }
      }),

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
  visible:false,
  deleteStatus:{
    type:DELETE_NOT,
    loading: false,
  },
  disabledStatus:{
    type:DISABLED_NOT,
    loading: false,
  },
  saveStatus:{
    type:SAVE_NOT,
    loading: false,
  },
  saveLabelStatus:{
    type:SAVE_LABEL_NOT,
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

    oneLevel: {
      value: null
    },
    twoLevel: {
      value: null
    },
    thereLevel: {
      value: null
    },
    score: {
      value: null
    },
    targetGradeWeight: {
      value: null
    },
    targetPricingWeight: {
      value: null
    },
    targetFloatParameter: {
      value: null
    },
  },//表单数据
  editFields: {
    id: null,
    scoreCardName: {
      value: null
    },
    opneWeight: {
      value: null
    }
  },
  addFields:{
    id: null,
    name: {
      value: null
    },
    describe: {
      value: null
    },
    file: {
      value: null
    },
  },
  detailList:{
    modelTargetInfos:[],
    scoreCardName:'',
  },
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
      addTime: {
        value: null
      },
      labelState: {
        value: null
      }
    },
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
