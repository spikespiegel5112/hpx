import { injectReducer } from '../../store/reducers'
import { auth,authRouter } from '../../modules/route'
import Home from './Home'


export default (store)=>({
  path:'core',

  breadcrumbName : '企业平台',

  indexRoute : {

    onEnter : (next,replace)=>replace('/hpx2/core/home')

  },

  getChildRoutes (location, cb) {

    require.ensure([], (require) => {

      const routes = [
        // 平台
        require('./Home').default(store),
        require('./MyProject').default(store),
        //require('./ItemBind').default(store),
        require('./companyInformation').default(store),
        require('./IncrementService').default(store),
        require('./EnterpriseAccessPre').default(store),
        require('./FinancialManagement').default(store),
        require('./LabelInfo').default(store),
        // require('./OperationAnalysis').default(store),
        require('./Report').default(store),
        require('./SecuritySetting').default(store),
        require('./UserManager').default(store),     
        require('./WarningModel').default(store),
        require('./EvenhandedParameter').default(store),
        require('./IncrementService').default(store),
        require('./EnterpriseSignature').default(store),
        require('./SignatureManage').default(store),
      ];

      cb(null,routes)

    })
  }
})



