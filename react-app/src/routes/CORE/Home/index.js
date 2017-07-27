
import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path : 'home',

  breadcrumbName : '主页',

  getComponent(nextState,cb){

      let loadedComp = ()=>{
        const Home = require('./containers/HomeContainer').default;

        const HomeReducer = require('./Modules/module').default;

        injectReducer(store, { key: 'Home', reducer: HomeReducer })

        cb(null,Home);
      }
      require.ensure([],loadedComp,'coreHome')
  }
  
})
