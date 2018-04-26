import accounting from 'accounting'
import coins from './coins'

export const FORM_VALUE_CHANGED = 'FORM_VALUE_CHANGED'
export const CURRENCY_CHANGED = 'CURRENCY_CHANGED'
export const REQUEST_CURRENT_PRICE = 'REQUEST_CURRENT_PRICE'
export const RECEIVE_CURRENT_PRICE = 'RECEIVE_CURRENT_PRICE'
export const CURRENT_WORTH_CALCULATED = 'CURRENT_WORTH_CALCULATED'

export function formValueChange(field, value) {
    return {
        type: FORM_VALUE_CHANGED,
        field,
        value
    }
}

export function currencyChanged(newCurrency) {
    return (dispatch, getState) => {

        const state = getState()
        let currentPrice = state.currentPrice

        // If current timestamp < genesis, reset timestamp
        const newCoin = coins.find(coin => coin.id === newCurrency)
        let timestamp = state.form.timestamp < newCoin.genesis ?  newCoin.genesis : state.form.timestamp

        dispatch({
            type: CURRENCY_CHANGED,
            currentSymbol: newCurrency,
            minTimestamp: newCoin.genesis,
            timestamp
        })



        // Fetch current price
        fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${newCurrency}&tsyms=EUR&ts=${Math.round(Date.now()/1000)}`)
            .then(response => response.json())
            .then(data => {
                currentPrice = data[newCurrency].EUR
                dispatch(receiveCurrentPrice(currentPrice))
            })
            .then(() => {
                // Fetch price at timestamp
                fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${newCurrency}&tsyms=EUR&ts=${Math.round(timestamp/1000)}`)
                    .then(response => response.json())
                    .then(data => dispatch(apiInformationReceived(data[newCurrency].EUR, currentPrice, state.form.amount)))
            })




    }
}

export function getCurrentPrice() {
    return (dispatch, getState) => {
        const state = getState()

        fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${state.form.currentSymbol}&tsyms=EUR&ts=${Math.round(Date.now()/1000)}`)
            .then(response => response.json())
            .then(data => dispatch(receiveCurrentPrice(data[state.form.currentSymbol].EUR)))
            .then(() => dispatch(formValueDefChanged()))
    }
}

function receiveCurrentPrice(currentPrice) {
    return {
        type: RECEIVE_CURRENT_PRICE,
        currentPrice
    }
}

export function formValueDefChanged() {
    return (dispatch, getState) => {

        const state = getState()

        fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${state.form.currentSymbol}&tsyms=EUR&ts=${Math.round(state.form.timestamp/1000)}`)
            .then(response => response.json())
            .then(data => dispatch(apiInformationReceived(data[state.form.currentSymbol].EUR, state.currentPrice, state.form.amount)))
    }
}

function apiInformationReceived(historicalPrice, currentPrice, amount) {

    const numberOfCoins = amount / historicalPrice
    const netWorth = numberOfCoins * currentPrice

    return {
        type: CURRENT_WORTH_CALCULATED,
        numberOfCoins,
        historicalPrice,
        worth: accounting.formatMoney(netWorth, "", 2, ".", ",")
    }
}