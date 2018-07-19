import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    checkUser() {
        if(this.props.user) {
            return (
                <div className='navbar-nav'>
                    <span>Welcome back, {this.props.user.username}</span>
                </div>
            );
        } else {
            return (
                <div className='navbar-nav'>
                    <Link className="nav-link btn mb-0 purple-button" to='/login'>
                        <span className="white-text">Login</span>
                    </Link>
                    <Link className="nav-link btn mb-0 purple-button" to='/'>
                        <span className="white-text">Sign up</span>
                    </Link>
                </div>
            );
        }
    }

    render() {
        const link = this.checkUser();

        return (
            <header className="navbar navbar-expand-lg navbar-dark sticky purple-bg">
                <div className='container'>
                    <Link to='/'>
                        <span className="navbar-brand mb-0 h1">BetSite</span>
                    </Link>
                    {link}
                </div>
            </header>
        );
    }
}

export default Navbar;