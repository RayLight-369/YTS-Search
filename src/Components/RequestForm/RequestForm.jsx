import React, { useState } from 'react';
import Styles from "./RequestForm.module.css";
import { motion } from 'framer-motion';


const RequestForm = ( { handleClose } ) => {
  return (
    <div className={ Styles.container }>
      <div className={ Styles.inputs }>
        <div className={ Styles[ "shows-request" ] }>
          <label htmlFor={ Styles[ "shows-request-label" ] }>
            <input type="text" id={ Styles[ 'shows-request-input' ] } name={ Styles[ 'shows-request-input' ] } />
            <span>Shows Request</span>
          </label>
        </div>
        <div className={ Styles[ "shows-message" ] }>
          <label htmlFor={ Styles[ "shows-message-label" ] }>
            <textarea id={ Styles[ 'shows-message-input' ] } name={ Styles[ 'shows-message-input' ] } />
            <span>Message (Optional)</span>
          </label>
        </div>
      </div>
      <div className={ Styles.buttons }>
        <button type='button' className={ Styles.requestBtn }>Request</button>
        <button type='button' className={ Styles.cancelBtn } onClick={ handleClose }>Cancel</button>
      </div>
    </div>
  );
};

export default RequestForm;