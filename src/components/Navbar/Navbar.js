import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss'

const Navbar = () => {

        return (
            <nav>
                <Link to="/">
                    Home
                </Link>
                <Link to='/favourite'>
                    Favourite
                </Link>
                <a href="/" >
                    <i className="fas fa-retweet"/>
                </a>
            </nav>
        )
}

export default Navbar;
