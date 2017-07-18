import { connect } from 'react-redux'
import { 
  fetchList, 
  fetchListTwo,
  fetchFirm,
  fetchEnterprise,
  del, 
  updateQueryParams, 
  clearQueryParams, 
  clearErr,
  save,
  fetchRecord,
  accept,
} from '../modules/module'


/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Compo from '../components/Component'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  clearErr,
  clearQueryParams,
  updateQueryParams,
  fetchList,
  fetchListTwo,
  fetchFirm,
  fetchEnterprise,
  del,
  save,
  fetchRecord,
  accept,
}

const mapStateToProps = (state) => ({
  err: state.myProjectModule.err,
  list : state.myProjectModule.list,
  listTwo: state.myProjectModule.listTwo,
  listStatus : state.myProjectModule.listStatus,
  listTwoStatus: state.myProjectModule.listTwoStatus,
  deleteStatus : state.myProjectModule.deleteStatus,
  firmList: state.myProjectModule.firmList,
  firmStatus: state.myProjectModule.firmStatus,
  enterpriseList: state.myProjectModule.enterpriseList,
  enterpriseStatus: state.myProjectModule.enterpriseStatus,
  saveStatus: state.myProjectModule.saveStatus,
  acceptStatus: state.myProjectModule.acceptStatus,
  recordList: state.myProjectModule.recordList,
  recordStatus: state.myProjectModule.recordStatus,
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

export default connect(mapStateToProps, mapDispatchToProps)(Compo)
