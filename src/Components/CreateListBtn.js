import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/CreateListBtn.module.scss';
import { minTabletWidth } from '../css/_mediaQueries.scss';
import { usePostSelectedList, useEmailInputChange, useDateInputChange } from '../hooks';
import { snakeCase } from '../functions.js';
import { Tooltip, SendListModal } from './index.js';
import { Message as DefaultMessage, Button } from './General';
import dayjs from 'dayjs';

export default function CreateList({ lists, modalProps, tooltip, documentWidth }) {

    const { handleModal } = modalProps;

    const today = dayjs().format('YYYY-MM-DD');

    const { 
        sendData,
        isLoading,
        hasError,
    } = usePostSelectedList();
    const [ showFetchMessage, setShowFetchMessage ] = useState(false);
    const [ noListMessage, setNoListMessage ] = useState(false);
    const [ dataReadyToSend, setDataReadyToSend ] = useState(false);
    const emailInput = useEmailInputChange('');
    const dateInput = useDateInputChange(today);


    useEffect(() => {
        
        if (!!lists.length && dataReadyToSend) {

            setDataReadyToSend(false);

            let params = [];

            lists.forEach((list) => {

                if (list.items.length === 0) return;

                const title = snakeCase(list.title);

                const listWithAtLeastOneParam = list.items.map((id) => {

                    return `${title}=${id}`;
                });

                params.push(listWithAtLeastOneParam.join('&'));
            });

            const dateFormatted = dayjs(dateInput.value).format('dddd D, MMMM');

            params.push(`mail=${emailInput.value}`);
            params.push(`date=${dateFormatted}`);

            setShowFetchMessage(true);
            sendData(params);
        }

    }, [lists, dataReadyToSend, sendData, emailInput, dateInput]);

    const onMainButtonClick = () => {

        if (lists.length === 0) return setNoListMessage(true);;

        const countOfItemsSelected = lists.reduce((acum, list) => acum + list.items.length, 0);

        if (!countOfItemsSelected) {
            return setNoListMessage(true);
        }

        tooltip.handler(!tooltip.value);
    }

    const onSuccessModalClick = () => {

        const isEmailValid = emailInput.checkIsValid();
        const isDateValid = dateInput.checkIsValid();
        
        if (!isEmailValid || !isDateValid) return;
        
        setDataReadyToSend(true);
        handleModal(false);
    }

    const onTooltipClick = () => {
        handleModal(true);
        tooltip.handler(false);
    };

    const fetchMessage = (isLoading) ?  <Message hideMessage={() => setShowFetchMessage(false)} type='primary' text='Sending email...'/> 
    : (!hasError) ? <Message hideMessage={() => setShowFetchMessage(false)} type='success' text='Email sent successfully.'/>
    : <Message hideMessage={() => setShowFetchMessage(false)} type='error' text='There was an error. List was not sent to Email.'/>

    return (
        <React.Fragment>
            <SendListModal onSuccessClick={onSuccessModalClick} {...modalProps} dateInput={dateInput} emailInput={emailInput}/>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <Tooltip 
                        onClick={onTooltipClick} 
                        className={`${styles.tooltip} ${(tooltip.value) ? '' : styles.hidden}`} 
                        text={(documentWidth < minTabletWidth) ? 'Send by Email' : 'by Email'}
                    />
                    <Button onClick={onMainButtonClick} className={styles.button}>
                        <span className={styles.text}>{(documentWidth < minTabletWidth) ? '+' : 'Send List'}</span>   
                    </Button>
                </div>
            </div>
            <div className={styles.messageContainer}>
                { (noListMessage) && 
                    <Message hideMessage={() => setNoListMessage(false)} type='warning' text='To send the list first you should choose some items from any list' />
                }
                {  showFetchMessage && fetchMessage }
            </div>
        </React.Fragment>
    )   
}

function Message({ hideMessage, type, text }) {

    return (
        <DefaultMessage
            hideMessage={hideMessage}
            text={text} 
            type={type}
            className={{
                container: styles.messageSubContainer,
                closeButtonContainer: styles.buttonContainer,
            }}
        />
    )
}

CreateList.propTypes = {
    lists: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.number),
        }),
    ),
    date: PropTypes.string,
    modalProps: PropTypes.shape({
        setModalClicked: PropTypes.func,
        modalClicked: PropTypes.bool,
    }),
    documentWidth: PropTypes.number,
};