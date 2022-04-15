import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from './Button';
import PropTypes from 'prop-types';

import './modal.scss'


// NOTICE
// Modal is brought in with it's own trigger, so import the component where you want the trigger to be.

const ModalComponent = (props) => {
  const {
    buttonLabel,
    title,
    body,
    children,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
    <div class="d-inline-block">
      
      <a onClick={toggle}>{buttonLabel}</a>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader className="" toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody className="text-center">
           <p className="modal-label">{body}</p>
          {children}
        </ModalBody>
        <ModalFooter className="modal-footer m-auto">
        {/* <Button className="btn_secondary modal-btn" onClick={toggle}>Yes</Button> */}
        <Button className="btn_primary modal-btn" onClick={toggle}>Close</Button>
         
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalComponent;

ModalComponent.propTypes = {
  /**
   * Text for the trigger button
   */
  buttonLabel: PropTypes.string,
  /**
   * Title text for the modal
   */
  title: PropTypes.string,
  /**
   * Content for the modal body
   */
  body: PropTypes.string

};