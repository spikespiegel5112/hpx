import { connect } from 'react-redux'

import { logOut, clearSignInErr} from '../../modules/login'
import App from './App'

const mapActionCreators = {
  logOut,
  clearSignInErr,
}

const mapStateToProps = (state) => ({
  login: state.login,
})

export default connect(mapStateToProps, mapActionCreators)(App)