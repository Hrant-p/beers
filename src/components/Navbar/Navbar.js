import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss'

const Navbar = () => {

        return (
            <nav>
                <Link to="/">
                    Home
                </Link>
                <a href="/" >
                    <i className="fas fa-retweet"/>
                </a>
                <Link to='/favourite'>
                    Favourite
                </Link>
            </nav>
        )
}

export default Navbar;
