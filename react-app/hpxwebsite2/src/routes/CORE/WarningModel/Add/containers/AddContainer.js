import { connect } from 'react-redux'
import {
    clearErr,
    saveModal,
    add,
    delLabelList,
    fetchIndustry,
    fetchLabel,
    fetchSelect,
} from '../../modules/module'

import Add from '../components/Add'

const mapDispatchToProps = {
    clearErr,
    saveModal,
    add,
    delLabelList,
    fetchIndustry,
    fetchLabel,
    fetchSelect,
}

const mapStateToProps = (state) => ({
    err: state.warningmodelModule.err,
    gradeList: state.warningmodelModule.gradeList,
    industryList: state.warningmodelModule.industryList,
    saveModalList: state.warningmodelModule.saveModalList,
    lableList: state.warningmodelModule.lableList,
    saveModalStatus: state.warningmodelModule.saveModalStatus,
    fetchSelectStatus : state.warningmodelModule.fetchSelectStatus,
    gradeCardName :state.warningmodelModule.saveModalList.gradeCardName
})

export default connect(mapStateToProps, mapDispatchToProps)(Add)
