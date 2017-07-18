// ------------------------------------
// Constants
// ------------------------------------
const CORELAYOUT = 'CoreLayout::'
const LAOUT_LOADING = CORELAYOUT + 'LAOUT_LOADING'
const LAOUT_LOADING_NOT = CORELAYOUT + 'LAOUT_LOADING_NOT'
// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const LayoutLoad = ()=>{
  return (dispatch,getState)=>{
    dispatch({
      type : LAOUT_LOADING 
    })
  }
}

export const LayoutLoadNot = ()=>{
  return (dispatch,getState)=>{
    dispatch({
      type : LAOUT_LOADING_NOT 
    })
  }
}

export const actions = {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LAOUT_LOADING] : (state, action) => ({loading : true}),
  [LAOUT_LOADING_NOT] : (state, action) => ({loading : false}),
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading : false,
}
export default (state = initialState, action)=> {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
