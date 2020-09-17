import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './css/Modal.module.scss';
import { Button } from '../General';

const noop = () => {};

class Modal extends Component {
  
  constructor(props) {
    super(props); 

    this.divToFocus = null;

    this.setDivFocus = element => {
      this.divToFocus = element;
    };

    this.focusDiv = () => {
      this.divToFocus.focus();
    };
  }

  componentDidUpdate(prevProps) {

    if (this.props.modalState && prevProps.modalState !== this.props.modalState) {

      this.focusDiv();

    }
  }

  closeModalOnKeyPress = (ev) => {

    const { successButton, cancelButton } = this.props;

    if (this.props.stopKeyEventPropagation) ev.nativeEvent.stopImmediatePropagation();

    switch (ev.key) {
      case 'Escape':
        return (cancelButton.onClick) ? cancelButton.onClick(ev) : noop();
      case 'Enter':
        return (successButton.onClick) ? successButton.onClick(ev) : noop();
      default:
        noop();
    };

  };

  render() {

    const { 
      modalState, 
      children, 
      title, 
      modalValidation, 
      'aria-describedby': ariaDescribedBy, 
      successButton,
      cancelButton,
    } = this.props;

    return (
      <div 
        role='dialog'
        aria-labelledby='modalDialogTitle'
        aria-describedby={ariaDescribedBy}
        ref={this.setDivFocus}
        tabIndex={1} 
        className={`${styles.globalAlert} ${styles.modalEffect} 
        ${(modalState) ? styles.showModal : ''} ${(modalValidation) ? '' : styles.invalidModal}`}
        onKeyDown={(ev) => this.closeModalOnKeyPress(ev)}>
        <div className={styles.modalContent}>
          <div className={styles.modalTitleContainer}>
            <h2 id='modalDialogTitle' className={styles.modalTitle}>{title}</h2>
          </div>
          {children}
          <div className={styles.buttonsContainer}>
            { cancelButton && <Button onClick={cancelButton.onClick} className={styles.danger} text={cancelButton.text}/> }
            { successButton && <Button onClick={successButton.onClick} className={styles.success} text={successButton.text}/> }
          </div>
        </div>
      </div>
      );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  modalState: PropTypes.bool.isRequired,
  modalValidation: PropTypes.bool,
  stopKeyEventPropagation: PropTypes.bool,
  'aria-describedby': PropTypes.string,
  cancelButton: PropTypes.shape({
    onClick: PropTypes.func,
    text: PropTypes.string,
  }),
  successButton: PropTypes.shape({
    onClick: PropTypes.func,
    text: PropTypes.string,
  }),
};

Modal.defaultProps = {
  title: 'Modal',
  modalState: false,
  modalValidation: true,
};

export default Modal;