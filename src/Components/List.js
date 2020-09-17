import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/List.module.scss';
import { Item } from './index.js';
import { Button } from './General';
import { titleCase } from '../functions.js';
import { minTabletWidth } from '../css/_mediaQueries.scss';

export default function List({ list, handleItemClick, className = {}, documentWidth }) {

    const isMobileScreen = (documentWidth < minTabletWidth);

    const [ showList, setShowList ] = useState(!isMobileScreen);
    const [ isMobile, setIsMobile ] = useState(isMobileScreen);

    useEffect(() => {

        if (isMobile !== isMobileScreen) {
            setIsMobile(isMobileScreen);
            setShowList(!isMobileScreen);
        }

    }, [isMobile, isMobileScreen]);
    
    const onClick = () => {
        setShowList(!showList);
    }

    const itemsList = list.items.map((item, i) => {
        return (
            <React.Fragment key={i}>
                <li className={styles.itemContainer}>
                    <Item item={item} listName={list.title} handleItemClick={handleItemClick}/>
                </li>
                <hr/>
            </React.Fragment>
        )
    })

    const title = titleCase(list.title);

    return (
        <div className={`${styles.container} ${className.container}`}>
            <Button onClick={onClick} className={styles.title} text={title}/>
            <ul className={`${styles.itemsContainer} ${(!showList) ? styles.hide : ''}`}>{itemsList}</ul>
        </div>
    )
}

List.propTypes = {
    list: PropTypes.shape({
        title: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                item: PropTypes.string,
            })
        ),
    }),
    className: PropTypes.shape({
        container: PropTypes.string,
    }),
    handleItemClick: PropTypes.func,
};