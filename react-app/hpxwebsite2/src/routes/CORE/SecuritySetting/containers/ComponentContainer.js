import { connect } from 'react-redux'
import { 
  fetchList, 
} from '../modules/module'


import Compo from '../components/Component'

const mapDispatchToProps = {
  fetchList,
}

const mapStateToProps = (state) => ({
  err: state.securitySettingModule.err,
  // list : state.securitySettingModule.list,
  listStatus: state.securitySettingModule.listStatus,
  list: state.login.userInfo,
  saveMailStatus : state.securitySettingModule.saveMailStatus,
  saveNewPwdStatus : state.securitySettingModule.saveNewPwdStatus,
  saveNewNumStatus : state.securitySettingModule.saveNewNumStatus,
})

export default connect(mapStateToProps, mapDispatchToProps)(Compo)
