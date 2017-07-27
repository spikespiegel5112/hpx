import { connect } from 'react-redux'
import { 
  fetchList, 
  del, 
  clearErr,
  abled,
} from '../modules/module'

import Compo from '../components/Component'

const mapDispatchToProps = {
  clearErr,
  fetchList,
  abled,
  del,
}

const mapStateToProps = (state) => ({
  err: state.signatureModule.err,
  list : state.signatureModule.list,
  listStatus : state.signatureModule.listStatus,
  deleteStatus : state.signatureModule.deleteStatus,
  abledStatus : state.signatureModule.abledStatus,
})

export default connect(mapStateToProps, mapDispatchToProps)(Compo)
