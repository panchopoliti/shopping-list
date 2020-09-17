import React, { useEffect, useState } from 'react';
import { ListsOfItems, Header, CreateListBtn } from './Components';
import { Loading } from './Components/General';
import { useGetShoppingLists } from './hooks.js';
import styles from './css/App.module.scss';

const noop = () => {};

function App() {

  const { itemsLists, isLoading, hasError, clickedListItems, handleClickedListItems } = useGetShoppingLists();
  const [ modalClicked, setModalClicked ] = useState(false);
  const [ showTooltip, setShowTooltip ] = useState(false);
  const [ documentWidth, setDocumentWidth ] = useState(window.innerWidth);

  useEffect(() => {
    
    const handleResize = () => setDocumentWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
    
  })

  const clickedItems = {
    items: clickedListItems,
    handler: handleClickedListItems,
  };

  const listsOfItems = (isLoading) ? <Loading size={40}/> : 
    hasError ? <span>An Error ocurred</span> : !!itemsLists.length && 
    <ListsOfItems documentWidth={documentWidth} lists={itemsLists} clickedItems={clickedItems}/>;

  const modalProps = {
    modalState: modalClicked,
    handleModal: setModalClicked,
  }

  return (
    <div onClick={(showTooltip) ? () => setShowTooltip(false) : noop} className={styles.app}>
      <div onClick={() => setModalClicked(!modalClicked)} className={`${styles.overlay} ${(modalClicked) ? styles.showOverlay : ''}`}></div>
      <div className={styles.mainContainer}>
        <Header/>
        {listsOfItems}
      </div>
      <CreateListBtn
        documentWidth={documentWidth}
        tooltip={{ value: showTooltip, handler: setShowTooltip }}
        modalProps={modalProps} 
        lists={clickedListItems}
      />
    </div>
  );
}

export default App;
