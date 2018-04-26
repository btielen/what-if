import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentPrice } from './actions'
import AmountSlider from './containers/AmountSlider'
import DateSlider from './containers/DateSlider'
import CalculatedAmount from './containers/CalculatedAmount'
import WhatIfHeader from './containers/WhatIfHeader'
import 'rc-slider/assets/index.css';
import './App.css'


class App extends Component {
    componentDidMount() {
        this.props.dispatch(getCurrentPrice())
    }

    render() {
        return (
            <div>

                <WhatIfHeader/>

                <div className="control-slider">
                    <AmountSlider/>
                </div>

                <div className="control-slider">
                    <DateSlider/>
                </div>

                <CalculatedAmount />


            </div>


        );
    }
}

export default connect()(App);
