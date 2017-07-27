import { connect } from 'react-redux'

import Home from '../components/Home'

import { fetchOMenu } from '../../../../modules/route'
import { fetchProject } from '../Modules/module'
const mapDispatchToProps = {
    fetchOMenu,
    fetchProject,
}

const mapStateToProps = (state) => ({
    menu : state.route.menu,
    project : state.Home.project,
    projectStatus : state.Home.projectStatus,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
