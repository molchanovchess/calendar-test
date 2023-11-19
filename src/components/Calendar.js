import React, { useState } from 'react';
import MonthPicker from './MonthPicker';
import MuixDatePicker from './MuixDatePicker';
import CalendarDay from './CalendarDay';
import '../styles/Calendar.css';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EventModal from "./UI/EventModal/EventModal";
import EventForm from "./EventForm";

const Calendar = () => {
    const [currentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayedMonthAndYear, setDisplayedMonthAndYear] =
        useState(localStorage.getItem('displayedMonthAndYear') !== null
            ? new Date(new Date(localStorage.getItem('displayedMonthAndYear')))
            : new Date(new Date().setDate(1)));
    const [modal, setModal] = useState(false);
    const [events, setEvents] = useState( JSON.parse(localStorage.getItem('events')) || []);

    const handleDateClick = (selectedDay) => {
        setSelectedDate(new Date(displayedMonthAndYear.getFullYear(), displayedMonthAndYear.getMonth(), selectedDay));
    };

    const openForm = () => {
        setModal(true);
    };

    const closeForm = () => {
        setModal(false);
    };

    const setNewDisplayedMonthAndYear = (newDate) => {
            const newDisplayedMonthAndYear = new Date(newDate.setDate(1));
            localStorage.setItem('displayedMonthAndYear', newDisplayedMonthAndYear.toJSON());
            setDisplayedMonthAndYear(newDisplayedMonthAndYear);
    };

    const handleDatePickerChange = (newDisplayedMonthAndYear) => {
        setDisplayedMonthAndYear(newDisplayedMonthAndYear);
        localStorage.setItem('displayedMonthAndYear', newDisplayedMonthAndYear.toJSON());
    };

    const firstDayOfNextMonth = new Date(displayedMonthAndYear.getFullYear(), displayedMonthAndYear.getMonth() + 1, 1);
    const lastDayOfMonth = new Date(firstDayOfNextMonth - 1);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfMonth = new Date(displayedMonthAndYear.getFullYear(), displayedMonthAndYear.getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    return (
        <div className="calendar">
            <div className={'eventForm'}>

                    <EventModal
                        visible={modal}
                        events={events}
                        closeForm={closeForm}
                        selectedDate={selectedDate}
                    >
                        { modal &&
                            <EventForm
                                closeForm={closeForm}
                                events={events}
                                setEvents={setEvents}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />
                        }
                    </EventModal>
            </div>
            <h2>Calendar</h2>
            <div className={'datePicker'}>
                <AddCircleOutlinedIcon
                    color="primary"
                    style={{ fontSize: 50, cursor: 'pointer' }}
                    onClick={openForm}
                />
                <div className={'monthpicker'}>
                    <MonthPicker
                        currentDate={currentDate}
                        selectedDate={selectedDate}
                        displayedMonthAndYear={displayedMonthAndYear}
                        setDisplayedMonthAndYear={setNewDisplayedMonthAndYear}
                    />
                </div>
                <MuixDatePicker
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    displayedMonthAndYear={displayedMonthAndYear}
                    handleDateChange={handleDatePickerChange}
                />
            </div>
            <div className="days">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="day-label">
                        {day}
                    </div>
                ))}
            </div>
            <div className="dates">
                {Array.from({ length: firstDayOfMonth }, (_, index) => (
                    <div key={`empty-${index}`} className="empty-day" />
                ))}
                {daysArray.map((day) => (
                    <CalendarDay
                        key={day}
                        day={day}
                        currentDate={currentDate}
                        selectedDate={selectedDate}
                        displayedMonthAndYear={displayedMonthAndYear}
                        onDateClick={handleDateClick}
                        events={events}
                        openForm={openForm}
                    />
                ))}
            </div>
            <div className={'createdBy'}>
                by molchanovchess
            </div>
        </div>
    );
};

export default Calendar;
