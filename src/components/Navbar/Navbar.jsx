import React from 'react';
import NavbarStyle from './Navbar.styles';


const Navbar = () => {
  return (
    <NavbarStyle className="nav flex-wrap"> 
        <ul>
            <li><a href="/Selection"> Our Selection</a></li>
            <li><a href="/Search">Search by</a></li>
            <li><a href="/Category">By Category</a></li>
        </ul>
    </NavbarStyle>
  )
}

export default Navbar;
