import React from 'react';
import PropTypes from 'prop-types';
import { List } from './index.js';
import styles from './css/ListOfItems.module.scss';
import sortBy from 'lodash.sortby';
import { minTabletWidth } from '../css/_mediaQueries.scss';

export default function ListOfItems({ lists, clickedItems, documentWidth }) {
    
    function getOrderedLists(lists) {
        const listsClone = lists.slice();
        const sortedDescList = sortBy(listsClone, (list) => list.items.length).reverse();

        // Put the longest lists in the position with more height (n4 y n4 +1)
        for (let i = 0; i < (Math.floor(sortedDescList.length / 4)); i++) {

            for (let j = 0; j < 2; j++) {

                const lastItem = sortedDescList.pop();
                const start = i*4 + 1; 
                sortedDescList.splice(start, 0, lastItem); 

            }

        }

        return sortedDescList;
    }

    const orderedLists = (documentWidth > minTabletWidth) ? getOrderedLists(lists) : lists;

    const listsWithItems = orderedLists.map((list, i) => {

        let listClassName = '';
        
        if ((orderedLists.length % 2 === 1) && i === (orderedLists.length - 1)) {
            listClassName = styles.fullHeight;
        }

        return <List
            key={i} 
            className={{container: listClassName}} 
            documentWidth={documentWidth}  
            list={list} 
            handleItemClick={clickedItems.handler}
        />
    });

    return (
        <main className={styles.container}>
            {listsWithItems}
        </main>
    ) 
}

ListOfItems.propTypes= {
    lists: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    item: PropTypes.string,
                })
            ),
        }),
    ),
    clickedItems: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                items: PropTypes.arrayOf(PropTypes.number),
            }),
        ),
        handler: PropTypes.func,
    }),
    documentWidth: PropTypes.number,
}
  