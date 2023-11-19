import React from 'react';
import cl from './EventModal.module.css';

const EventModal = ({ children, visible, closeForm, selectedDate, events, ...props }) => {
    const rootClasses = [cl.eventModal];
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={closeForm}>
            <div className={cl.eventModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default EventModal;
