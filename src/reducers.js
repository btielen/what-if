
import { combineReducers } from 'redux'
import { FORM_VALUE_CHANGED, CURRENCY_CHANGED, RECEIVE_CURRENT_PRICE, CURRENT_WORTH_CALCULATED } from './actions'
import coins from './coins'

const initValues = {
    currentSymbol: coins[0].id,
    minTimestamp: coins[0].genesis,
    timestamp: Date.now() - 2629743000*3 ,    // 3 months ago
    amount: 250
}

export function form(state = initValues, action) {
    if(action.type === FORM_VALUE_CHANGED)
        return Object.assign({}, state, { [action.field]: action.value })

    if(action.type === CURRENCY_CHANGED)
        return Object.assign({}, state, {
            currentSymbol: action.currentSymbol,
            minTimestamp: action.minTimestamp,
            timestamp: action.timestamp
        })

    return state
}

function currentPrice(state = null, action) {
    if(action.type === RECEIVE_CURRENT_PRICE)
        return action.currentPrice

    return state
}

function worth(state = null, action) {
    if(action.type === CURRENT_WORTH_CALCULATED)
        return action.worth

    return state
}

function historicalPrice(state = null, action) {
    if(action.type === CURRENT_WORTH_CALCULATED)
        return action.historicalPrice

    return state
}

function numberOfCoins(state = null, action) {
    if(action.type === CURRENT_WORTH_CALCULATED)
        return action.numberOfCoins

    return state
}

const rootReducer = combineReducers({
    currentPrice,
    worth,
    historicalPrice,
    numberOfCoins,
    form
})

export default rootReducer