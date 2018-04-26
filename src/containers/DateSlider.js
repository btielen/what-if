import { connect } from 'react-redux'
import { formValueChange, formValueDefChanged } from '../actions'
import DateSlider from '../components/DateSlider'

function mapStateToProps(state) {
    return {
        min: state.form.minTimestamp,
        timestamp: state.form.timestamp
    }
}

function dispatchToProps(dispatch) {
    return {
        onChange: (value) => dispatch(formValueChange('timestamp', value)),
        onAfterChange: () => dispatch(formValueDefChanged())
    }
}

export default connect(mapStateToProps, dispatchToProps)(DateSlider)