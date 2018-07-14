import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <header className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/'>
                    <span className="navbar-brand mb-0 h`">BetSite</span>
                </Link>
            </header>
        );
    }
}

export default Navbar;