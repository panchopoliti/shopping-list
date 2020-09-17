import React from 'react';
import { Button } from './index.js';
import PropTypes from 'prop-types';
import styles from './css/Message.module.scss'

export default function Message({ text, className = {}, type, hideMessage }) {

    let containerClass, textClass;

    switch (type) {
        case 'error':
            containerClass = styles.errorContainer;
            textClass = styles.error;
            break;
        case 'success':
            containerClass = styles.successContainer;
            textClass = styles.success;
            break;
        case 'warning':
            containerClass = styles.warningContainer;
            textClass = styles.warning;
            break;
        case 'primary':
            containerClass = styles.primaryContainer;
            textClass = styles.primary;
            break;
        default:
            containerClass = styles.primaryContainer;
            textClass = styles.primary;
    }

    return (
        <div className={`${containerClass} ${(className.container) ? className.container : ''}`}>
            { hideMessage && 
            <div className={`${styles.buttonContainer} ${className.closeButtonContainer}`}>
                <Button className={styles.button} onClick={hideMessage} aria-label="Close Mesage Box"/>
            </div>
             }
            <div className={`${textClass} ${(className.text) ? className.text : ''}`}>{text}</div>
        </div>
    )
}

Message.propTypes = {
    text: PropTypes.string,
    className: PropTypes.shape({
        closeButtonContainer: PropTypes.string,
        text: PropTypes.string,
        container: PropTypes.string,
    }),
    type: PropTypes.string,
    hideMessage: PropTypes.func,
}
