import React from 'react';
import dayjs from 'dayjs';
import styles from './css/Header.module.scss';

export default function Header() {

    const dayOfWeek = dayjs().format('dddd');
    const month = dayjs().format('MMM');
    const dayOfMonth = dayjs().format('DD');
    const year = dayjs().format('YYYY');

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <h4 className={styles.dayOfMonth}>{dayOfMonth}</h4>
                <div className={styles.leftSubContainer}>
                    <span className={styles.month}>{month}</span>
                    <span className={styles.year}>{year}</span>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <h4 className={styles.dayOfWeek}>{dayOfWeek}</h4>
            </div>
        </div>
    );
}