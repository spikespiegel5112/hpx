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
  err: state.signatureManageModule.err,
  list : state.signatureManageModule.list,
  listStatus : state.signatureManageModule.listStatus,
  deleteStatus : state.signatureManageModule.deleteStatus,
  abledStatus : state.signatureManageModule.abledStatus,
})

export default connect(mapStateToProps, mapDispatchToProps)(Compo)
