import React from 'react';
import { NavbarLinks } from "../../Constants/index";
import { Link, Outlet } from 'react-router-dom';
import Styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <header className={ Styles.header }>
        <div className={ Styles.logo }>
          <img src="https://yts.mx/assets/images/website/logo-YTS.svg" alt="logo" />
        </div>
        <nav className={ Styles.nav }>
          { NavbarLinks.map( ( link, index ) => (
            <Link className={ Styles.link } to={ link.link }>{ link.name }</Link>
          ) ) }
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;