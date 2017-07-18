import { connect } from 'react-redux'

import Compo from '../components/Component'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  eid : state.login.userInfo.enterpriseId
})

export default connect(mapStateToProps, mapDispatchToProps)(Compo)
