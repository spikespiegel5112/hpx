import { injectReducer } from '../../../store/reducers'
import { auth } from '../../../modules/route'

export default (store) => ({

  path : 'auth',

  onEnter: auth.bind(this,store),

  breadcrumbName:'角色管理',
  
  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const Component = require('./containers/ComponentContainer').default
      const reducer = require('./modules/module').default

      injectReducer(store, { key: 'hpxmngAuthModule', reducer })
      
      cb(null, Component)

    }, 'auth')
  },
  getChildRoutes (location, cb) {

    const routes = [ require('./Detail').default(store),];
    cb(null, routes)
    
  }
})
