
import { injectReducer } from '../../../store/reducers'
import { auth } from '../../../modules/route'
export default (store)=>({
  path:'transactionFlowAnalysis',
  onEnter : auth.bind(this,store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers/ComponentContainer').default
      const reducer = require('./modules/module').default
      injectReducer(store, { key: 'transactionFlowAnalysisModule', reducer })
      cb(null, Component)
    },'transactionFlowAnalysis')
  }
})



