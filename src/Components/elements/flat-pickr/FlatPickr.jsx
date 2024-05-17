import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import PropTypes from 'prop-types';

export const FlatPickr = (props) => {
    const { value, placeholder } = props;
    const [selectedDate, setSelectedDate] = useState(value || null);

    const handleChange = (selectedDates) => {
        // Convert the selected date to a string
        const dateString = selectedDates[0].toISOString();
        setSelectedDate(dateString);
    };

    return (
        <Flatpickr
            value={selectedDate}
            onChange={handleChange}
            placeholder={placeholder}
            className="form-control"
        />
    );
};

// PropTypes
FlatPickr.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
};

// Default Props
FlatPickr.defaultProps = {
    value: '',
    placeholder: 'Select Date',
};
