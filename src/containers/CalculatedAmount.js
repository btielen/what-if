import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const CalculatedAmountComponent = ({amount, isCalculating}) => (
    <div className="amount">
        You would have €{amount} right now!
    </div>
)

CalculatedAmountComponent.propTypes = {
    amount: PropTypes.string,
    isCalculating: PropTypes.bool.isRequired
}



export default connect(
    state => ({ amount: state.worth, isCalculating: false})
)(CalculatedAmountComponent)