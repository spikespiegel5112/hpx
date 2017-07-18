import { connect } from 'react-redux'
import { 
    updateFields,
    save, 
    fetchDetail, 
    updateEditFields,
    updateQueryParams,
    fetchList,
    clearErr ,
    del,
    add,
    updateInputs,
    nameChange,
    delEdit,
} from '../../modules/module'
import Edit from '../components/Edit'

const mapDispatchToProps = {
    clearErr,
    updateFields,
    updateEditFields,
    save,
    updateInputs,
    updateQueryParams,
    fetchList,
    fetchDetail,
    del,
    add,
    nameChange,
    delEdit,
}

const mapStateToProps = (state) => ({
    err: state.labelInfoModule.err,
    fields: state.labelInfoModule.fields,
    editFields : state.labelInfoModule.editFields,
    inputs: state.labelInfoModule.inputs,
    saveStatus: state.labelInfoModule.saveStatus,
    detailList: state.labelInfoModule.detailList,
    listStatus: state.labelInfoModule.listStatus,
    deleteStatus: state.labelInfoModule.deleteStatus,
    fetchEditStatus: state.labelInfoModule.fetchEditStatus,
    fieldsConfig: state.labelInfoModule.fieldsConfig,
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
