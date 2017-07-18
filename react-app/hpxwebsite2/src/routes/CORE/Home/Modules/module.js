import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'homeViewModule::';

export const FETCH_PROJECT_SUCCESS = ACTION_PREFIX + 'FETCH_PROJECT_SUCCESS';
// ------------------------------------
// Actions
// ------------------------------------

export const fetchProject = ()=>{
  return async(dispatch,getState)=>{
    try{
      const userInfo = getState().login.userInfo;
      const { id ,enterpriseId } = userInfo;
      const resp = await getReq('/core/core/api/v1/enterprise/'+enterpriseId+'/users/'+id+'/projects')
      const res = await resp.json();
      dispatch({
        type:FETCH_PROJECT_SUCCESS,
        payload:res  
      })
    }catch(e){

    }
  }
}

export const actions = {
  fetchProject,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_PROJECT_SUCCESS] : (state, action) => 
    ({ 
      ...state,
      project:{
        ...state.project,
        status:'SUCCESS',
        data : action.payload
      }
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
  projectStatus : 'NOT',
  project:{
    status: 'NOT',
    data:[],
  },
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
