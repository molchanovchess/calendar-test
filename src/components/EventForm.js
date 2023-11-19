import React, { useState} from 'react';
import MyButton from "./UI/button/MyButton";
import TextField from "@mui/material/TextField";
import {
    DatePicker,
    LocalizationProvider,
    MobileTimePicker
} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import '../styles/EventForm.css'

const EventForm = ({ selectedDate, closeForm, events, setSelectedDate, setEvents }) => {

    let isNewEvent = true;
    let eventKey = formatDateToYYYYMMDD(selectedDate);
    let selectedItem = events.find(event => event[eventKey]);
    let selectedItemTitle;
    let selectedItemDescription;
    let selectedItemDate;
    if (selectedItem) {
        selectedItemTitle = selectedItem[eventKey].title;
        selectedItemDescription = selectedItem[eventKey].description;
        selectedItemDate = selectedItem[eventKey].date;
        isNewEvent = false;
    }

    const [date, setDate] = useState(!isNewEvent ? new Date(selectedItemDate) : new Date(selectedDate));
    const [time, setTime] = useState(!isNewEvent ? new Date(selectedItemDate) : null);
    const [title, setTitle] = useState(!isNewEvent ? selectedItemTitle : '');
    const [description, setDescription] = useState(!isNewEvent ? selectedItemDescription : '');

    function formatDateToYYYYMMDD(date) {
        return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    }
    const addNewEvent = () => {
        let newEvents = events;
        if (events.find(event => event[eventKey])) {
            newEvents = events.filter(event => Object.keys(event)[0] !== eventKey);
        }

        const eventName = formatDateToYYYYMMDD(date);
        if (isNewEvent) {
            newEvents.push({
                [eventName]: {title, description, date, createdAt: new Date(), updatedAt: null}
            });
        } else {
            newEvents.push({
                [eventName]: {title, description, date,createdAt: null, updatedAt: new Date()}
            });
        }

        localStorage.setItem('events', JSON.stringify(newEvents));
        setEvents(newEvents);
        closeForm();
    };
    const deleteEvent = () => {
        const newEvents = events.filter(event => Object.keys(event)[0] !== eventKey);
        localStorage.setItem('events', JSON.stringify(newEvents));
        setEvents(newEvents);
        closeForm();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
    }
    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const onDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const onTimeChange = (event) => {
        const newTime = event;
        setTime(new Date(newTime));
        if (newTime && newTime instanceof Date) {
            const newHours = newTime.getHours();
            const newMinutes = newTime.getMinutes();
            setDate(new Date(new Date(date).setHours(newHours, newMinutes)));
        }
    }

    const onDateChange = (event) => {
        const newDate = event;
        if (time && time instanceof Date) {
            const newHours = time.getHours();
            const newMinutes = time.getMinutes();
            setSelectedDate(new Date(new Date(newDate.setHours(newHours)).setMinutes(newMinutes)))
            setDate(new Date(new Date(newDate.setHours(newHours)).setMinutes(newMinutes)));
        } else {
            setSelectedDate(newDate);
            setDate(newDate);
        }
        eventKey = formatDateToYYYYMMDD(newDate);
        selectedItem = events.find(event => event[eventKey]);
        if (selectedItem) {
            setTitle(selectedItem[eventKey].title);
            setDescription(selectedItem[eventKey].description);
            setTime(new Date(selectedItem[eventKey].date));
        } else {
            setTitle('');
            setDescription('');
            setTime(null);
        }
    }

    function getCreatedUpdatedByKey(key) {
        const foundObject = events.find(obj => obj[key]);
        if (foundObject) {
           if (foundObject[key].createdAt ) {
               return 'Created at: ' + foundObject[key].createdAt;
           } else if (foundObject[key].updatedAt){
               return 'Updated at: ' + foundObject[key].updatedAt;
           }
        }
        return ''; // Return null if the key is not found
    }

    return (

        <div className={'eventForm'}>
            <form
                onSubmit={onFormSubmit}
            >
                <h2>{ isNewEvent  ? 'Add new idea item' : 'Edit idea item'}</h2>
                <div className={'subText'}>
                    { getCreatedUpdatedByKey(eventKey) }
                </div>

                <div className={'textField'}>
                    <TextField
                        onChange={onTitleChange}
                        value={title}
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        placeholder="Title goes here"
                        error={!title}
                        fullWidth
                        required
                    />
                </div><br/>
                <div>
                    <TextField
                        onChange={onDescriptionChange}
                        value={description}
                        id="standard-basic2"
                        label="Description"
                        variant="standard"
                        rows={5}
                        fullWidth
                        multiline
                    />
                </div>
                <div style={{marginTop: 40}}>
                    <div className={'dateAndTime'}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div className={'picker'}>
                                <DatePicker
                                    id={'date-picker'}
                                    value={date}
                                    onChange={onDateChange}
                                    minDate={new Date( new Date().setFullYear(2000) )}
                                    disablePast={true}
                                />
                            </div>
                            <div className={'picker'}>
                                <MobileTimePicker
                                    id={'time-picker'}
                                    value={time}
                                    onChange={onTimeChange}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={'buttonsCon'}>
                    <div>
                        <MyButton
                            disabled={!date
                                || !title
                                || date.toString() === 'Invalid Date'
                                || new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                            }
                            type="button"
                            onClick={addNewEvent}>
                            {!selectedItem  ? 'Save' : 'Update' }
                        </MyButton>
                    </div>
                    { (!isNewEvent) &&
                        <div>
                            <MyButton
                                warning={true}
                                type="button"
                                onClick={deleteEvent}>
                                Delete
                            </MyButton>
                        </div>
                    }
                </div>
            </form>
        </div>
    );
};

export default EventForm;
