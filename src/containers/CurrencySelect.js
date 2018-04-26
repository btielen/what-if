import { connect } from 'react-redux'
import coins from '../coins'
import { currencyChanged } from '../actions'
import CurrencySelect from '../components/CurrencySelect'

const mapStateToProps = function(state) {
    return {
        currencies: coins,
        value: state.form.currentSymbol
    }
}


const mapDispatchToProps = function (dispatch) {
    return {
        onChange: (value) => dispatch(currencyChanged(value))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect)