import { connect } from 'react-redux'
import { 
    subOldNumCode,
    saveNewNum,
} from '../../modules/module'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import FixedPhoneNum from '../components/FixedPhoneNum'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
    subOldNumCode,
    saveNewNum,
}

const mapStateToProps = (state) => ({
    saveNewPwdStatus: state.securitySettingModule.saveNewPwdStatus,
    sendMsgList: state.securitySettingModule.sendMsgList,
    list: state.securitySettingModule.list,
    subOldNumCodeStatus: state.securitySettingModule.subOldNumCodeStatus,
    saveNewNumStatus: state.securitySettingModule.saveNewNumStatus,
    err: state.securitySettingModule.err,
})

export default connect(mapStateToProps, mapDispatchToProps)(FixedPhoneNum)
