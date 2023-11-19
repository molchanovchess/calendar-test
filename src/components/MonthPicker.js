import React from 'react';
import '../styles/MonthPicker.css'

const MonthPicker = ({ currentDate, displayedMonthAndYear, selectedDate, setDisplayedMonthAndYear }) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // const isInitialMount = useRef(true);

    const handleArrowClick = (event, direction) => {
        event.preventDefault();
        if (direction === 'prev') {
            const newDate = new Date((new Date(displayedMonthAndYear).setMonth(displayedMonthAndYear.getMonth() - 1)));
            setDisplayedMonthAndYear(newDate);
        } else if (direction === 'next') {
            const newDate = new Date((new Date(displayedMonthAndYear).setMonth(displayedMonthAndYear.getMonth() + 1)));
            setDisplayedMonthAndYear(newDate);
        }
    };

    return (
        <div className="month-picker">
            <span
                className="arrow"
                role="button"
                onClick={(event) => handleArrowClick(event, 'prev')}
            >
                {' < '}
            </span>
            <span>{months[displayedMonthAndYear.getMonth()]} </span>
            <span id="year">{displayedMonthAndYear.getFullYear()}</span>
            <span
                className="arrow"
                role="button"
                onClick={(event) => handleArrowClick(event, 'next')}
            >
                {' > '}
            </span>
        </div>
    );
};

export default MonthPicker;
