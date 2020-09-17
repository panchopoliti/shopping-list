import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Loading.module.scss';
import { loadingSpinnerDefaultColor } from '../../css/_colors.scss';

export default function Loading({ size, color }) {

    const style = { 
        width: `${size}px`, 
        height: `${size}px`,
    };

    const childDivStyle = {
        width: `${size*0.8}px`,
        height: `${size*0.8}px`,
        margin: `${size*0.1}px`,
        border: `${size*0.1}px solid ${color}`,
        borderColor: `${color} transparent transparent`,

    }

    return (
        <div style={style} className={styles.ldsRing}>
            <div style={childDivStyle}></div>
            <div style={childDivStyle}></div>
            <div style={childDivStyle}></div>
            <div style={childDivStyle}></div>
        </div>
    )
}

Loading.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
}

Loading.defaultProps = {
    size: 40,
    color: loadingSpinnerDefaultColor,
}