import { connect } from 'react-redux'
import { formValueChange, formValueDefChanged } from '../actions'
import AmountSlider from '../components/AmountSlider'

function dispatchToProps(dispatch) {
    return {
        onChange: (value) => dispatch(formValueChange('amount', value)),
        onAfterChange: () => dispatch(formValueDefChanged())
    }
}

export default connect(undefined, dispatchToProps)(AmountSlider)