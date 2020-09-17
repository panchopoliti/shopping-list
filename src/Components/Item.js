import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/Item.module.scss';
import { Tick } from '../Icons';
import { Button } from './General';
import { makeFirstLetterUpperCase } from '../functions.js';

export default function Item({ item, handleItemClick, listName }) {

    const [ itemClicked, setItemClicked ] = useState(false);

    const onClick = () => {
        setItemClicked(!itemClicked);
        handleItemClick({item: item.id, listName })
    }

    const text = makeFirstLetterUpperCase(item.item);

    return (
        <Button onClick={onClick} className={styles.button}>
            <span className={`${styles.item} ${(itemClicked) ? styles.itemClicked : ''}`}>{text}</span>
            <Tick className={`${styles.icon} ${(itemClicked) ? styles.iconClicked : ''}`} height={26} width={26}/>
        </Button>
    )
}

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        item: PropTypes.string,
    }),
    handleItemClick: PropTypes.func,
    listName: PropTypes.string,
};