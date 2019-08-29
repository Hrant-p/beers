import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss'

const Navbar = () => {

        return (
            <nav>
                <a href="/" >
                    Home
                </a>
                <Link to='/favourite'>
                    Favourite
                </Link>
            </nav>
        )
}

export default Navbar;
