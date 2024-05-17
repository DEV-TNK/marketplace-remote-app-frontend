import React, { useState } from 'react';
import Nouislider from 'nouislider-react';
import PropTypes from 'prop-types';

const RangeSlider = (props) => {
  const { startValue, rangeMin, rangeMax, onChange } = props;
  const [value, setValue] = useState(startValue);

  // Handle slider change
  const handleOnSlide = (render, handle, value, un, percent) => {
    setValue(value); // Update the local state with the new value
    if (onChange) {
      onChange(value); // Call the onChange callback with the new value
    }
  };

  return (
    <Nouislider
      range={{ min: rangeMin, max: rangeMax }}
      start={value}
      step={1}
      connect
      tooltips={{
        to: function (value) {
          return value.toFixed(0);
        },
      }}
      onSlide={handleOnSlide}
    />
  );
};

// PropTypes
RangeSlider.propTypes = {
  startValue: PropTypes.number,
  rangeMin: PropTypes.number,
  rangeMax: PropTypes.number,
  onChange: PropTypes.func, // Add onChange prop type for callback
};

// Default Props
RangeSlider.defaultProps = {
  startValue: 20,
  rangeMin: 0,
  rangeMax: 100,
};

export default RangeSlider;
