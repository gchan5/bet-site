import React, { Component } from 'react';
import Navbar from './Navbar';
import '../styles/App.css';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <p className="App-intro">
                    Home
                </p>
            </div>
        )
    }
}

export default Home;