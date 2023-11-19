import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({ children, warning, onClick, ...props }) => {
    const rootClasses = [classes.myBtn];
    if (warning) {
        rootClasses.push(classes.warning);
    }
    return (
        <div>
            <button
                {...props}
                className={rootClasses.join(' ')}
                onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default MyButton;
