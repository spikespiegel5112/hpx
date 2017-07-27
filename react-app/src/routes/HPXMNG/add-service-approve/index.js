import { injectReducer } from '../../../store/reducers'
import { auth } from '../../../modules/route'

export default (store) => ({

  path : 'added-services',

  onEnter: auth.bind(this,store),

  breadcrumbName:'服务开通',
  
  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const Component = require('./containers/ComponentContainer').default
      const reducer = require('./modules/module').default

      injectReducer(store, { key: 'addedServicesModule', reducer })
      
      cb(null, Component)

    }, 'added-services')
  },
  getChildRoutes (location, cb) {

    const routes = [ require('./Detail').default(store),];
    cb(null, routes)
    
  }
})
