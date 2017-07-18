import { connect } from 'react-redux'
import { 
    saveAdd, 
} from '../../modules/module'

import Detail from '../components/Detail'

const mapDispatchToProps = {
    saveAdd,
}

const mapStateToProps = (state) => ({
    err: state.signatureModule.err,
    saveAddStatus: state.signatureModule.saveAddStatus,
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
