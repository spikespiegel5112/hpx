import { injectReducer } from '../../store/reducers'
import { auth } from '../../modules/route'

export default (store) => ({
  //queryParams:用于保存页面的部分状态，如第几页，查询条件，方便刷新页面的时候页面不会回到初始状态
  path : 'register',
  // onEnter: auth.bind(this,store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Comp = require('./containers/RegisterContainer').default
      // const reducer = require('./modules/module').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'registerModule', reducer })

      /*  Return getComponent   */
      cb(null, Comp)

    /* Webpack named bundle   */
    }, 'register')
  },
})




// import Register from './Register'
// export default Register