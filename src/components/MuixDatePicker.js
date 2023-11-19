import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

const MuixDatePicker = ({ displayedMonthAndYear, selectedDate, handleDateChange }) => {
    const renderInput = (startProps) => (
        <TextField
            {...startProps}
            variant="standard"
            margin="normal"
            helperText=""
        />
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label='"month" and "year"'
                views={['month', 'year']}
                key={displayedMonthAndYear.getTime()}
                value={
                    selectedDate.getMonth() === displayedMonthAndYear.getMonth() &&
                    selectedDate.getFullYear() === displayedMonthAndYear.getFullYear()
                        ? selectedDate
                        : displayedMonthAndYear
                }
                onChange={handleDateChange}
                renderInput={renderInput}
            />
        </LocalizationProvider>
    );
};

export default MuixDatePicker;
