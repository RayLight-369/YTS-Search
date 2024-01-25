import React from 'react';
import styles from "./Footer.module.css";

const Footer = ( { handleRequest } ) => {
  return (
    <footer className={ styles[ "footer" ] }>
      <div className={ styles[ "body" ] }>
        <div className={ styles[ "title" ] }>
          <img
            src={ require( "../../Assets/Imgs/logo.png" ) }
            width={ 250 }
            height={ 75 }
            alt='footer'
          />
          <a className={ styles[ "email" ] } >email@gmail.com</a> {/*"href='mailto:abdulrafay.designs@gmail.com'"*/ }
        </div>
        <div className={ styles[ "update" ] }>
          <p className={ styles[ "title" ] }>
            Stay up to date from Stooge on Internet
          </p>
          <div className={ styles[ "inputs" ] }>
            {/* <input type="text" placeholder='Enter your E-mail' className={ styles[ 'email-input' ] } /> */ }
            <input type="button" className={ styles[ 'request' ] } defaultValue={ "Request" } onClick={ handleRequest } />
          </div>
        </div>
      </div>
      <p className={ styles[ "copyright" ] }>
        Copyright © 2024 Stooge, Inc
      </p>
    </footer>
  );
};

export default Footer;