  export const TEST = 'TEST'
  
  const initialState = {
      // statisticsErr : '',//统计信息错误
      // statisticsStatus : STATISTICSSTATUS_NOT,//统计状态
      // userInfo:null,
  }

  const ACTION_HANDLERS = {
    [TEST]    : (state, action) =>  action.payload,
  }

  export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
  }