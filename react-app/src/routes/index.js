import { auth ,authIndex,authRouter } from '../modules/route'
import App from '../layouts/App'
export const createRoutes = (store) => ({
  path        : '/',
  breadcrumbName:'海平线',
  component   : App(store),
  onChange    : authRouter.bind(this,store),
  indexRoute  : {
      onEnter : authIndex.bind(this,store),
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      const routes = [     
        require('../components/Login').default(store),
        require('../layouts/CoreLayout').default(store),   
        require('../components/Register').default(store),    
        require('../components/forPassword').default(store),
        require('./NotFound').default(store),
      ];
      cb(null,routes)
    })
  }
})

export default createRoutes
