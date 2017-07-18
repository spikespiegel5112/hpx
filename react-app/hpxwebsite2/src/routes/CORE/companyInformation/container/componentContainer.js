import { connect } from 'react-redux'

import Compo from '../components/component'
import { fetchComInfo ,updateComInfo,deleteState} from '../modules/module'

const mapDispatchToProps = {
    fetchComInfo,
    updateComInfo,
    deleteState
}

const mapStateToProps = (state) => ({
    auditState: state.login.userInfo.auditState,
    isAuthEdite : state.companayInfoModule.isAuthEdite,
    comInfo : state.companayInfoModule.comInfo,
    eid : state.login.userInfo.enterpriseId,
})


export default connect(mapStateToProps, mapDispatchToProps)(Compo)
