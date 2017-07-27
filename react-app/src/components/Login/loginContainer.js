import { connect } from 'react-redux'

import { signIn, clearSignInErr} from '../../modules/login'
import Login from './Login'

const mapActionCreators = {
  signIn,
  clearSignInErr,
}

const mapStateToProps = (state) => ({
  login: state.login,
})

export default connect(mapStateToProps, mapActionCreators)(Login)