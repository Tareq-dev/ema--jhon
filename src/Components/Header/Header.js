import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';
import {useContext} from 'react';
import UserContext from '../../App';



const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/order-Review">Order Review</Link>
                <Link to="/inventory">Inventory here</Link>
            </nav>
        </div>
    );
};
// <button onClick={()=>setLoggedInUser({})}>Sign Out</button>
export default Header;