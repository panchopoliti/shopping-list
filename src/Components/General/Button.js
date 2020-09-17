import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Button.module.scss';

export default function Button({ text, className, onClick, 'aria-label': ariaLabel, children }) {
    return(
        <button onClick={onClick} aria-label={ariaLabel} className={`${className} ${styles.button}`}>
            {text}
            {children}
        </button>
    ) 
}

Button.propTypes = {
    text: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    onClick: PropTypes.func,
    'aria-label': PropTypes.string,
}
