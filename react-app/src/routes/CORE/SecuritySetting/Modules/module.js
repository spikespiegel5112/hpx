import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'securitySettingModule::';

export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const SEND_SMS_NOT = ACTION_PREFIX + 'SEND_SMS_NOT'
export const SEND_SMS_REQUEST = ACTION_PREFIX + 'SEND_SMS_REQUEST'
export const SEND_SMS_FAILURE = ACTION_PREFIX + 'SEND_SMS_FAILURE'
export const SEND_SMS_SUCCESS = ACTION_PREFIX + 'SEND_SMS_SUCCESS'

export const SUB_OLDNUMCORD_NOT = ACTION_PREFIX + 'SUB_OLDNUMCORD_NOT'
export const SUB_OLDNUMCORD_REQUEST = ACTION_PREFIX + 'SUB_OLDNUMCORD_REQUEST'
export const SUB_OLDNUMCORD_FAILURE = ACTION_PREFIX + 'SUB_OLDNUMCORD_FAILURE'
export const SUB_OLDNUMCORD_SUCCESS = ACTION_PREFIX + 'SUB_OLDNUMCORD_SUCCESS'

export const SAVE_NEWNUM_NOT = ACTION_PREFIX + 'SAVE_NEWNUM_NOT'
export const SAVE_NEWNUM_REQUEST = ACTION_PREFIX + 'SAVE_NEWNUM_REQUEST'
export const SAVE_NEWNUM_FAILURE = ACTION_PREFIX + 'SAVE_NEWNUM_FAILURE'
export const SAVE_NEWNUM_SUCCESS = ACTION_PREFIX + 'SAVE_NEWNUM_SUCCESS'

export const SAVE_NEWPWD_NOT = ACTION_PREFIX + 'SAVE_NEWPWD_NOT'
export const SAVE_NEWPWD_REQUEST = ACTION_PREFIX + 'SAVE_NEWPWD_REQUEST'
export const SAVE_NEWPWD_FAILURE = ACTION_PREFIX + 'SAVE_NEWPWD_FAILURE'
export const SAVE_NEWPWD_SUCCESS = ACTION_PREFIX + 'SAVE_NEWPWD_SUCCESS'

export const SAVE_MAIL_NOT = ACTION_PREFIX + 'SAVE_MAIL_NOT'
export const SAVE_MAIL_REQUEST = ACTION_PREFIX + 'SAVE_MAIL_REQUEST'
export const SAVE_MAIL_FAILURE = ACTION_PREFIX + 'SAVE_MAIL_FAILURE'
export const SAVE_MAIL_SUCCESS = ACTION_PREFIX + 'SAVE_MAIL_SUCCESS'

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

export const updateQueryParams = (queryParams) => {
  return {
    type: UPDATE_QUERY_PARAMS,
    payload: {
      queryParams,
    }
  }
}

export const fetchList =  () => {
  return (dispatch, getState) => {
    let list = getState().login.userInfo;
    dispatch({
      type    : FETCH_LIST_SUCCESS,
      payload : list
    })
  }
}

export  const sendSms = (phone) => {
  return async (dispatch, getState) => {
    dispatch({
      type : SEND_SMS_REQUEST,
    })
    try{
      const resp = await formPostReq(
              '/core/core/api/v1/sms/forgotPasswordSendSms',
            {
              phone: phone,
            },
          );
      const result = resp.json();
      dispatch({
        type : SEND_SMS_SUCCESS,
        payload: result.isOk
      })
    }catch(e){
      dispatch({
        type : SEND_SMS_FAILURE,
        payload : e
      })
    }
  }
}

export  const subOldNumCode = (values) => {
  return async (dispatch, getState) => {
    dispatch({
      type : SUB_OLDNUMCORD_NOT,
    })
    const oldPhone = values.oldPhone;
    const code = values.code;
    try{
      const resp = await postReq(
        '/core' + '/core/api/v1/checkOldPhone?oldPhone=' + oldPhone + '&code=' + code
      )
      if(resp.ok) {
        dispatch({
          type : SUB_OLDNUMCORD_SUCCESS
        })
      }
    }catch(err){
      dispatch({
        type : SUB_OLDNUMCORD_FAILURE,
        payload : err,
      })
    }
  }
}

export  const saveNewNum = (values) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_NEWNUM_REQUEST
    })
    const newPhone = values.newPhone;
    const code = values.code;
    try{
      let resp = await postReq(
        '/core' + '/core/api/v1/modifyPhone?phone=' + newPhone + '&code=' + code
      )
      dispatch({
        type : SAVE_NEWNUM_SUCCESS,
        payload : newPhone
      })
    }catch(e){
      dispatch({
        type : SAVE_NEWNUM_FAILURE,
        payload : e
      })
    }
  }
}

export  const saveMail = (value) => {
  return async (dispatch, getState) => {
    dispatch({
      type : SAVE_MAIL_REQUEST,
    })
    try{
      const resp = await patchReq(
        '/core' + 'dddddddd',
        {...value}
      )
      dispatch({
        type : SAVE_MAIL_SUCCESS
      })
    }catch(e){
      dispatch({
        type : SAVE_MAIL_FAILURE,
        payload : e,
      })
    }
  }
}

export  const saveNewPwd = (value) => {
  return async (dispatch, getState) => {
    dispatch({
      type : SAVE_NEWPWD_REQUEST,
    })
    const oldPwd = value.oldPwd;
    const newPwd = value.newPwd;
    try{
      const resp = await postReq(
        '/core' + '/core/api/v1/changePassword?oldPwd=' + oldPwd + '&newPwd=' + newPwd
      )
      dispatch({
        type : SAVE_NEWPWD_SUCCESS
      })
    }catch(e){
      dispatch({
        type : SAVE_NEWPWD_FAILURE,
        payload : e,
      })
    }
  }
}

export const updateFields = (fields,type) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_FIELDS,
      payload: {
        ...getState().securitySettingModule.fields,
        ...fields
      }
    })
  }
}

export const actions = {
  fetchList,
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
      list : action.payload
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
  
  
  [SEND_SMS_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      sendMsgStatus:{
        type: SEND_SMS_REQUEST,
        loading: true,
      }
    }),
  [SEND_SMS_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      sendMsgStatus:{
        type: SEND_SMS_SUCCESS,
        loading: false,
      },
      sendMsgList:{
        isOk:action.payload,
      }
    }),
  [SEND_SMS_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      sendMsgStatus:{
        type: SEND_SMS_FAILURE,
        loading: false,
      }
    }),
  [SAVE_NEWPWD_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      saveNewPwdStatus:{
        type: SAVE_NEWPWD_REQUEST,
        loading: true,
      }
    }),
  [SAVE_NEWPWD_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      saveNewPwdStatus:{
        type: SAVE_NEWPWD_SUCCESS,
        loading: false,
      }
    }),
  [SAVE_NEWPWD_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      saveNewPwdStatus:{
        type: SAVE_NEWPWD_FAILURE,
        loading: false,
      }
    }), 
  [SAVE_MAIL_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      saveMailStatus:{
        type: SAVE_MAIL_REQUEST,
        loading: true,
      }
    }),
  [SAVE_MAIL_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      saveMailStatus:{
        type: SAVE_MAIL_SUCCESS,
        loading: false,
      }
    }),
  [SAVE_MAIL_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      saveMailStatus:{
        type: SAVE_MAIL_FAILURE,
        loading: false,
      }
    }),
  [SAVE_NEWNUM_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      saveNewNumStatus:{
        type: SAVE_NEWNUM_REQUEST,
        loading: true,
      }
    }),
  [SAVE_NEWNUM_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      list:{
        ...state.list,
        phone: action.payload
      },
      saveNewNumStatus:{
        type: SAVE_NEWNUM_SUCCESS,
        loading: false,
      }
    }),
  [SAVE_NEWNUM_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      saveNewNumStatus:{
        type: SAVE_NEWNUM_FAILURE,
        loading: false,
      }
    }), 
   [SUB_OLDNUMCORD_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      subOldNumCodeStatus:{
        type: SUB_OLDNUMCORD_REQUEST,
        loading: true,
      }
    }),
  [SUB_OLDNUMCORD_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      subOldNumCodeStatus:{
        type: SUB_OLDNUMCORD_SUCCESS,
        loading: false,
      }
    }),
  [SUB_OLDNUMCORD_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      subOldNumCodeStatus:{
        type: SUB_OLDNUMCORD_FAILURE,
        loading: false,
      }
    }),

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
  saveMailStatus: {
    type : SAVE_MAIL_NOT,
    loading: false
  },
  subOldNumCodeStatus:{
    type: SUB_OLDNUMCORD_NOT,
    loading: false
  },
  saveNewNumStatus:{
    type: SAVE_NEWNUM_NOT,
    loading: false
  }, 
  saveNewPwdStatus:{
    type:SAVE_NEWPWD_NOT,
    loading: false,
  },
  listStatus:{
    type:FETCH_LIST_NOT,
    loading: false,
  },
  list:{},
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
