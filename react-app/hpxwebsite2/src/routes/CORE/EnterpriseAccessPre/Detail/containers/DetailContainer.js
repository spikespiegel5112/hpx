import { connect } from 'react-redux'
import { 
    updateFields,
    save, 
    fetchDetail, 
    clearErr ,
    fetchModelList,
    fetchIndustryList,
    fetchScoringmodel,
    saveReport,
    clearSmInfo,
    clearModelInfo,
    updateCreditsStatus
} from '../../modules/module'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Detail from '../components/Detail'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
    clearErr,
    updateFields,
    save,
    fetchDetail,
    fetchModelList,
    fetchIndustryList,
    fetchScoringmodel,
    saveReport,
    clearSmInfo,
    clearModelInfo,
    updateCreditsStatus
}

const mapStateToProps = (state) => ({
    err: state.enterpriseAccessPreModule.err,
    isShow: state.enterpriseAccessPreModule.isShow,
    fields: state.enterpriseAccessPreModule.fields,
    saveStatus: state.enterpriseAccessPreModule.saveStatus,
    fetchDetailStatus: state.enterpriseAccessPreModule.fetchDetailStatus,
    fieldsConfig: state.enterpriseAccessPreModule.fieldsConfig,
    detailList :state.enterpriseAccessPreModule.detailList,
    modelList:state.enterpriseAccessPreModule.modelList,
    industryList:state.enterpriseAccessPreModule.industryList,
    industryStatus:state.enterpriseAccessPreModule.industryStatus,
    scoringmodel:state.enterpriseAccessPreModule.scoringmodel,
    smStatus:state.enterpriseAccessPreModule.smStatus,
    smSaveStatus:state.enterpriseAccessPreModule.smSaveStatus,
    reportReturnInfo:state.enterpriseAccessPreModule.reportReturnInfo,
    creditState : state.enterpriseAccessPreModule.creditState
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
