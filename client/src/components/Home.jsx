import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Navbar from './Navbar';
import '../styles/App.css';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <UserContext.Consumer>
                    {({username}) => <Navbar user={username} />}
                </UserContext.Consumer>
                <p className="App-intro">
                    Home
                </p>
            </div>
        )
    }
}

export default Home;