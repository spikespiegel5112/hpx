
/*  请求方式
**  import需要的
*/
import fetch, { formPostReq , getReq, deleteReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'hpxAuthModule::';
// ------------------------------------
// Actions
// ------------------------------------
    
export const actions = {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
