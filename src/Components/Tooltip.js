import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Tooltip.module.scss';
import { Button } from './General';

export default function Tooltip({ text, onClick, className = '' }) {

    return <Button onClick={onClick} className={`${className} ${styles.button}`} text={text}/>
}

Tooltip.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
}