import React, { Component } from 'react';
import './header.scss';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="info">
                    <h2>The Beer Bank</h2>
                    <p>Find your favourite beer here</p>
                    <input
                        type="text"
                        placeholder="Search For beer name"
                    />
                    <button>
                        Advanced Search
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;