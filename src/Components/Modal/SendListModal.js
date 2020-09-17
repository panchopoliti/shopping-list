import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from './index.js';
import { Message } from '../General';
import styles from './css/SendListModal.module.scss';

export default function SendListModal({ onSuccessClick, modalState, handleModal, emailInput, dateInput }) {

    return (
        <Modal 
            modalState={modalState} 
            title={'Send List by Email'}
            successButton={{
                text: 'Send',
                onClick: () => onSuccessClick(),
            }}
            cancelButton={{
                text: 'Cancel',
                onClick: () => handleModal(!modalState),
            }}
        >   <div className={styles.container}>
                <label className={styles.label} id='labelEmailInput'>Write down your email and recieve your Shopping List</label>
                <input 
                    id='emailInput'
                    placeholder='ENTER YOUR EMAIL'
                    type='email'
                    value={emailInput.value}
                    className={`${styles.input} ${styles.inputContainer} ${(emailInput.isValid) ? '' : styles.inputError}`}
                    onChange={emailInput.handler}
                    onBlur={emailInput.checkIsValid}
                    autoCapitalize='off'
                    autoCorrect='off'
                    aria-labelledby='labelEmailInput'   
                    required 
                />
                <label className={styles.label} id='labelDateInput'>When are you going shopping?</label>
                <input 
                    id='dateInput'
                    placeholder='ENTER A DATE'
                    type='date'
                    value={dateInput.value}
                    className={`${styles.input} ${styles.inputContainer} ${(dateInput.isValid) ? '' : styles.inputError}`}
                    onChange={dateInput.handler}
                    onBlur={dateInput.checkIsValid}
                    autoCapitalize='off'
                    autoCorrect='off'
                    aria-labelledby='labelEmailInput'   
                    required 
                />
                { (!emailInput.isValid) && <Message className={{ container: styles.errorContainer }} type='error' text={emailInput.errorMessage}/>}
                { (!dateInput.isValid) && 
                    <Message 
                        className={{ container: styles.errorContainer, text: styles.smallErrorMessage }} 
                        type='error' 
                        text={dateInput.errorMessage}
                    />}

            </div>
        </Modal>
    )
}

SendListModal.propTypes = {
    modalState: PropTypes.bool,
    handleModal: PropTypes.func,
    onSuccessClick: PropTypes.func,
    inputProps: PropTypes.shape({
        handler: PropTypes.func,
        value: PropTypes.string,
        isValid: PropTypes.bool,
    }),
};