import React from 'react'
import PropTypes from 'prop-types'

class CurrencySelect extends React.Component {
    constructor(props) {
        super(props)
        this.select = React.createRef()
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.select.current.blur()
        this.props.onChange(event.target.value)
    }

    render() {
        return (
            <select className="currency-select" ref={this.select} onChange={this.handleChange} value={this.props.value}>
                { this.props.currencies.map(currency => (
                    <option key={currency.id} value={currency.id}>{currency.name}</option>
                ))}
            </select>
        )
    }
}

CurrencySelect.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired
}

export default CurrencySelect