import React from 'react';
import { NavbarLinks } from "../../Constants/index";
import { NavLink, Outlet } from 'react-router-dom';
import Styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <header className={ Styles.header }>
        <div className={ Styles.logo }>
          <img src={ require( "../../Assets/Imgs/logo.png" ) } alt="logo" />
        </div>
        <nav className={ Styles.nav }>
          { NavbarLinks.map( ( link, index ) => (
            <NavLink className={ ( { isActive } ) => isActive ? `${ Styles.link } ${ Styles.active }` : Styles.link } to={ link.link } key={ index }>{ link.name }</NavLink>
          ) ) }
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;