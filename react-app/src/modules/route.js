
//页面访问权限的管理
//左侧目录的管理
import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../core/fetch';
import { message } from 'antd'
import { browserHistory } from 'react-router'
import { isLogin } from './login'
import { LayoutLoadNot , LayoutLoad } from '../layouts/CoreLayout/modules/CoreLayout'
// ------------------------------------
// Constants
// ------------------------------------
// export const UPDATE_SELECTED_KEY = 'UPDATE_SELECTED_KEY'
const ACTION_PREFIX = 'mySider::';
export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const constants = {
  FETCH_LIST_NOT,
  FETCH_LIST_REQUEST,
  FETCH_LIST_FAILURE,
  FETCH_LIST_SUCCESS,
}
// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */


export const fetchMenu =  (projectId) => {
  return async (dispatch, getState) => {
    dispatch({
      type  : FETCH_LIST_REQUEST,
    })
    LayoutLoadNot();
    try{
      // const result = await fetch('/data/menu.json');
      let enterpriseId = getState().login.userInfo.enterpriseId;
      let result = null;
      let coreUrl = '/core'+'/core/api/v1/enterprise/'+enterpriseId+'/permissions';
      let url = projectId ? '/core'+'/core/api/v1/enterprise/'+enterpriseId+'/projects/'+projectId+'/permissions' : coreUrl;
      console.log(url)          
      result = await getReq(url)
      const res = await result.json();
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          data: res,
        }
      })
      LayoutLoad();
      return true;
    }catch(e){
      dispatch({
        type    : FETCH_LIST_FAILURE,
        payload : e
      })
      return false;
    }
  }
}



export const fetchOMenu =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type  : FETCH_LIST_REQUEST,
    })
    try{
      const enterpriseId = getState().login.userInfo.enterpriseId
      // const result = await fetch('/data/menu.json');
      console.log(enterpriseId,id)
      const result = await getReq('/core/core/api/v1/enterprise/'+enterpriseId+'/projects/'+id+'/permissions',{})
      const res = await result.json();
      console.log(22313123)
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          data: res,
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

export const fetchDemanderMenu =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    try{
      const result = await fetch('/data/demanderMenu.json')
        .then(response=>response.json()).then(
          result=>result
        )
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          data: result.data,
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

export async function auth (store, nextState, replace, callback) {
  let  isLoginS  = store.getState().login.isLogin;
  let res = null;
  if(isLoginS){
    res = isLoginS
  }else{
    res = await isLogin(store);
  }
  if(res){//用户成功登录
    //判断访问的路由是否在可访问路由权限里,开发模式不做路由权限验证
    if(!__DEV__&& !store.getState().route.authRoute.find((v,i) => v.route == nextState.location.pathname)){
      alert('无权限');
      //获取上一路由
      //没有则跳到defaultRoute
      browserHistory.push(store.getState().route.defaultRoute || '/');
    }else{  
      callback();
    }
  }else if(location.pathname == '/'){
    callback();
  }else{
    browserHistory.push('/login');
  }
}

export function authRouter (store,prevState, nextState, replace, callback) {
    let prevPath = prevState.location.pathname.split('/');
    let nextPath = nextState.location.pathname.split('/');

    if(prevPath[2] === nextPath[2]){
      callback();
      return;
    }

    if(nextPath.length <= 3){
        callback()
        return;
    }
    let projectId = null
    switch(nextPath[2]){
      case 'core' :
      projectId = null;
      break;
      case 'huaqian' :
      projectId = nextState.location.query.projectId;
      break;
    }
    let isCb = fetchMenu(projectId)(store.dispatch,store.getState);
    isCb.then((res)=>{
      if(res){
        LayoutLoadNot()
        callback()
      }else{
        LayoutLoad()
      }
    })
    
}

export async function authIndex (store, nextState, replace, callback) {
  // let res = await isLogin(store)
  let res = store.getState().login.isLogin 
  if(res){
    replace('/hpx2')
  }else{
    if(location.pathname === '/'){
      replace('/login');
    }
  }
  callback()
}


export async function authEnterprise(store,next,replace,callback){
    let { auditState } = store.getState().login.userInfo;
    if(auditState !== 'T'){
        replace('/hpx2/core/company-information');
    }else{
        replace('/hpx2/core/home');
    }
    callback();
}

export const actions = {
  fetchMenu,
  fetchDemanderMenu,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [AUTH]    : (state, action) =>  ({ ...state, ...action.payload}),
  [FETCH_LIST_NOT] : (state, action) => 
    ({ 
      ...state, 
      menuStatus : { 
        type : FETCH_LIST_NOT,
        loading: true, 
        menu:{
          data: []
        }
      },
    }),
  [FETCH_LIST_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      menuStatus : { 
        type : FETCH_LIST_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_LIST_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      menuStatus : { 
        type : FETCH_LIST_SUCCESS,
        loading: false, 
      },
      menu : { 
        ...state.menu,
        data : action.payload.data,
       }
    }),
  [FETCH_LIST_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      menuStatus : { 
        type : FETCH_LIST_FAILURE,
        loading: false, 
      },
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  authRoute:[//当前用户可以访问的路由
    {route:'/'},
    {route:'/counter'},
    {route:'/table1'},
  ],
  defaultRoute:'/',//用户默认显示路由
  err:'',
  menuStatus:{
    type:FETCH_LIST_NOT,
    loading: false,
  },
  menu:{
      data: []
    }
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

