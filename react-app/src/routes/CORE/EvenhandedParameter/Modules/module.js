import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'evenhandedParameterModule::';

export const SAVE_NOT = ACTION_PREFIX + 'SAVE_NOT'
export const SAVE_REQUEST = ACTION_PREFIX + 'SAVE_REQUEST'
export const SAVE_FAILURE = ACTION_PREFIX + 'SAVE_FAILURE'
export const SAVE_SUCCESS = ACTION_PREFIX + 'SAVE_SUCCESS'

export const FETCH_SELECT_NOT = ACTION_PREFIX + 'FETCH_SELECT_NOT'
export const FETCH_SELECT_REQUEST = ACTION_PREFIX + 'FETCH_SELECT_REQUEST'
export const FETCH_SELECT_FAILURE = ACTION_PREFIX + 'FETCH_SELECT_FAILURE'
export const FETCH_SELECT_SUCCESS = ACTION_PREFIX + 'FETCH_SELECT_SUCCESS'


// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */


export const fetchSelect =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_SELECT_REQUEST,
    })
    let selectList = getState().evenhandedParameterModule.selectList;
    const eid = getState().login.userInfo.enterpriseId;
    try{
      const resp = await getReq(
        '/core'+'/credit/api/v1/tp/parameter/'+eid,
      )
      const result = await resp.json();
      console.log('result',result);

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

//新增或者修改（带id为修改）
export  const save =  (saveList,id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SAVE_REQUEST,
    })
    try{
      const eid = getState().login.userInfo.enterpriseId;
      console.log(3,saveList);
      const resp =   id 
        ? await patchReq(
            '/core'+'/credit/api/v1/tp/parameter/'+eid+'/'+id,
            {
                ...saveList,
            }
          )
        : await putReq(
            '/core'+'/credit/api/v1/tp/parameter/'+eid,
            {
                ...saveList
            }
          )
      dispatch({
        type    : SAVE_SUCCESS,
      });
      
      return true;
    }catch(e){
      dispatch({
        type    : SAVE_FAILURE,
        payload : e
      })
      return false
    }
  }
}

export const actions = {
  save,
  fetchSelect
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
      selectList : { 
        ...state.selectList,
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
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
  saveStatus:{
    type:SAVE_NOT,
    loading: false,
  },
  fetchSelectStatus:{
    type:FETCH_SELECT_NOT,
    loading: false,
  },
  saveList:{
    costingRate:null,
    tolerateCommercialDisputeRatio:null,
    pricingRatio:null,
    tolerateBadDebtRatio:null
  },
  selectList:{
    rows:null,
  }

}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
