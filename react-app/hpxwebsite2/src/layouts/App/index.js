import { injectReducer } from '../../store/reducers'

export default (store) => {

  const AppComp = require('./appContainer').default;

  const loginReducer = require('../../modules/login').default;

  injectReducer(store, { key: 'login', reducer: loginReducer });
  
  return AppComp;

}