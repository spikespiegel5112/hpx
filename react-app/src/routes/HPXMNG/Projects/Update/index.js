import { injectReducer } from '../../../../store/reducers'
import { auth } from '../../../../modules/route'

export default (store) => ({
  path : 'update(/:id)',
  onEnter: auth.bind(this,store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Update = require('./containers/UpdateContainer').default

      /*  Update the reducer to the store on key 'counter'  */

      /*  Return getComponent   */
      cb(null, Update)

    /* Webpack named bundle   */
    }, 'update')
  }
})
