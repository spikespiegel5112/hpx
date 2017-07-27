import { connect } from 'react-redux'

import { logOut, signIn, clearSignInErr} from '../../../modules/login'
// import { updateSelectedKey } from '../../../modules/route'
import { fetchMenu } from '../../../modules/route'
import CoreLayout from '../components/CoreLayout'

const mapActionCreators = {
  logOut,
  signIn,
  clearSignInErr,
  fetchMenu,
  // updateSelectedKey,
}

const mapStateToProps = (state) => ({
  auditState: state.login.userInfo.auditState,
  menu: state.route.menu,
  loading : state.coreLayout.loading
})

export default connect(mapStateToProps, mapActionCreators)(CoreLayout)