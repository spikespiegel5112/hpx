import fetch, { formPostReq, postReq, getReq }  from '../core/fetch';


// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'REGISTER::';

//注册状态
export const REGISTER_NOT = ACTION_PREFIX + 'REGISTER_NOT'
export const REGISTER_REQUEST = ACTION_PREFIX + 'REGISTER_REQUEST'
export const REGISTER_FAILURE = ACTION_PREFIX + 'REGISTER_FAILURE'
export const REGISTER_SUCCESS = ACTION_PREFIX + 'REGISTER_SUCCESS'

export const constants = {
  REGISTER_NOT,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
}

export  const register =  (formData) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SIGN_IN_REQUEST,
      payload: { ...formData }
    })
    try{
      const resp = await formPostReq(
        '/core'+'/api/v1/login', 
        {
            username: formData.userName,
            password: formData.password,
        }
      )
      const result = await resp.json();
      console.log("用户你",result)
      dispatch({
        type    : SIGN_IN_SUCCESS,
        payload : result
      })
    }catch(e){
      dispatch({
        type: SIGN_IN_FAILURE,
        payload: {
          ...formData,
          signInErr: '用户名或密码错误'
        }
      })
    }
  }
}


  export const actions = {
    register,
  }

  // ------------------------------------
  // Action Handlers
  // ------------------------------------
  const ACTION_HANDLERS = {
    [REGISTER_REQUEST]: (state, action) =>
      ({ ...state, signInStatus: REGISTER_REQUEST, signInErr: '', ...action.payload }),
    [REGISTER_REQUEST] : (state, action) => 
      ({ ...state, signInStatus: REGISTER_REQUEST, signInErr: '' , ...action.payload }),
    [REGISTER_SUCCESS] : (state, action) => 
      ({ ...state, signInStatus: REGISTER_SUCCESS, logOutStatus: LOG_OUT_NOT,userInfo:action.payload }),
    [REGISTER_FAILURE] : (state, action) => 

      ({ ...state, signInStatus: REGISTER_FAILURE, ...action.payload }),
  }

  // ------------------------------------
  // Reducer
  // ------------------------------------
  const initialState = {
    registerErr : '',//登录错误信息
    registerStatus : REGISTER_NOT,//登录状态
    userInfo:null
  }

  export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
  }
