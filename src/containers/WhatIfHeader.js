import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CurrencySelect from '../containers/CurrencySelect'

function timestampToString(timestamp) {
    let date = new Date(timestamp)
    return date.toDateString()
}

const Header = ({amount, timestamp}) => (
    <div className="header">
        <span className="whatif-header">What if </span>
        <span className="invested-header">I invested €{amount} on {timestampToString(timestamp)} in <CurrencySelect/></span>
    </div>
)

Header.propTypes = {
    amount: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired
}

export default connect(
    state => ({amount: state.form.amount, timestamp: state.form.timestamp})
)(Header)