import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logOut: false
        }

        this.logout = this.logout.bind(this);
    }

    logout(history) {
        this.props.removeUser();
        this.props.history.push('/');
    }

    checkUser() {
        if(this.props.user) {
            return (
                <div className='navbar-nav'>
                    <Link className="nav-link btn mb-0 purple-button" to='/'>
                        <span className="white-text">Create a Bet</span>
                    </Link>
                    <Link className="nav-link btn mb-0 purple-button button-small" to='/'>
                        <span className="white-text">Profile</span>
                    </Link>
                    <button className="nav-link btn mb-0 purple-button button-small" onClick={this.logout}>
                        <span className="white-text">Logout</span>
                    </button>
                </div>
            );
        } else {
            return (
                <div className='navbar-nav'>
                    <Link className="nav-link btn mb-0 purple-button button-small" to='/login'>
                        <span className="white-text">Login</span>
                    </Link>
                    <Link className="nav-link btn mb-0 purple-button button-small" to='/signup'>
                        <span className="white-text">Sign up</span>
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <header className="navbar navbar-expand-lg navbar-dark sticky purple-bg">
                <div className='container'>
                    <Link to='/'>
                        <span className="navbar-brand mb-0 h1">BetSite</span>
                    </Link>
                    {this.checkUser()}
                </div>
            </header>
        );
    }
}

export default Navbar;