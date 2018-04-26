import React from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip';

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, index, ...restProps } = props;

    let date = new Date(value)

    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={date.toDateString()}
            visible={true}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const DateSlider = ({onChange, onAfterChange, min, timestamp}) => (
    <Slider
        min={min}                           // Bitcoin genesis
        max={Date.now()}                              // Right now
        value={timestamp}
        handle={handle}
        onChange={onChange}
        onAfterChange={onAfterChange}
    />
);

export default DateSlider