import { connect } from 'react-redux'
import { 
    updateFields,
    save, 
    fetchDetail,
    fetchEnterpriseList,
    clearErr 
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
    fetchEnterpriseList,
    fetchDetail,
}

const mapStateToProps = (state) => ({
    err: state.userModule.err,
    fields: state.userModule.fields,
    saveStatus: state.userModule.saveStatus,
    fetchDetailStatus: state.userModule.fetchDetailStatus,
    enterpriseList:state.userModule.enterpriseList,
    enterpriseStatus:state.userModule.enterpriseStatus,
    fieldsConfig: state.userModule.fieldsConfig,
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
