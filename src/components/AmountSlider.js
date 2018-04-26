import React from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip';

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, index, ...restProps } = props;

    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={`€ ${value}`}
            visible={true}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const AmountSlider = ({onChange, onAfterChange}) => (
    <Slider
        min={1}
        max={1000}
        defaultValue={250}
        handle={handle}
        onChange={onChange}
        onAfterChange={onAfterChange}
    />
);

export default AmountSlider