
import { injectReducer } from '../../store/reducers'
import { auth, authRouter, authEnterprise} from '../../modules/route'
export default (store)=>({
  path:'hpx2',
  breadcrumbName:'主页',
  onEnter : auth.bind(this,store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers/CoreLayoutContainer').default
      const reducer = require('./modules/CoreLayout').default
      const routeReducer = require('../../modules/route').default
      injectReducer(store, { key: 'coreLayout', reducer })
      injectReducer(store, { key: 'route', reducer: routeReducer })
      cb(null, Component)
    },'hpx2')
  },
  indexRoute : {
    onEnter : authEnterprise.bind(this,store)
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      const routes = [
        // 平台
        require('../../routes/CORE').default(store),
        // 风控部分

        // hpx管理test
        require('../../hpxManager/platStatistics/transactionFlowAnalysis').default(store),//平台流水分析
        require('../../hpxManager/platStatistics/customerAnalysis').default(store),//入驻企业分析
        require('../../hpxManager/platStatistics/incomeAnalysis').default(store),//平台收入分析
        require('../../hpxManager/platStatistics/platStatisticsIndex').default(store),//平台统计分析首页
        
        //hpxmng
        require('../../routes/HPXMNG').default(store),

        // HUAQIAN
        require('../../routes/HUAQIAN').default(store),

        // 测试部分
        require('../../routes/TestOb').default(store),
        require('../../routes/TestObSecond').default(store),
        require('../../routes/test2').default(store), //新的模板 引入了 search公用组件
      ];
      cb(null,routes)
    })
  }
})



