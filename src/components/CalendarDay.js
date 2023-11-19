import React from 'react';
import '../styles/CalendarDay.css';

const CalendarDay = ({ day, currentDate, selectedDate, displayedMonthAndYear, onDateClick, events, openForm }) => {
    const handleDayClick = () => {
        onDateClick(day);
    }

    const handleTitleClick = (event) => {
        event.stopPropagation();
        onDateClick(day);
        openForm();

    }

    function formatDateToYYYYMMDD(date) {
        return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    }
    const getItemFromStorage = (day) => {
        const currentDate =new Date (new Date(displayedMonthAndYear).setDate(day));
        const eventKey = formatDateToYYYYMMDD(currentDate);
        let selectedItem = events.find(event => event[eventKey]);

        return selectedItem ? selectedItem[eventKey].title : '';
    }

    const isToday = currentDate.getDate() === day
        && currentDate.getMonth() === displayedMonthAndYear.getMonth()
        && currentDate.getFullYear() === displayedMonthAndYear.getFullYear();
    const isSelected = selectedDate.getDate() === day
        && selectedDate.getMonth() === displayedMonthAndYear.getMonth()
        && selectedDate.getFullYear() === displayedMonthAndYear.getFullYear();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div
            className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={handleDayClick}
        >
            <span>{day} </span>
            <span className={'dayOfWeek'}>{daysOfWeek[new Date(new Date(displayedMonthAndYear).setDate(day)).getDay()]}</span>

            {getItemFromStorage(day) &&
            <div
                onClick={handleTitleClick}
            >
                {getItemFromStorage(day)}
            </div>}
        </div>
    );
};

export default CalendarDay;
