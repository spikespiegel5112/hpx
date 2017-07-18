import { injectReducer } from '../../store/reducers'
import { auth,authRouter } from '../../modules/route'
export default (store)=>({
  path:'huaqian',
  indexRoute : {
    onEnter : (next,replace)=>replace('/hpx2/huaqian/demanderPro')
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      const routes = [
        // HUAQIAN
        require('./Payment').default(store),
        require('./GoodsMaintenance').default(store),
        require('./InterestRate').default(store),
        require('./SalesOrder').default(store),
        require('./AfterSale').default(store),
        require('./Investors').default(store),
        require('./DemanderPro').default(store),
        require('./SupplierPro').default(store),     
        require('./SupplierContract').default(store),
        require('./PurchaseContract').default(store),
        require('./DemanderContract').default(store),
        require('./SalesContract').default(store),
        require('./Address').default(store),
        require('./Warning1').default(store),
        require('./MyOrder').default(store),
      ];
      cb(null,routes)
    })
  }
})



