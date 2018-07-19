import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';

class App extends Component {
    
    render() {
        return (
            <Switch>
                <Route path='/login' component={LoginPage} />
                <Route path='/' component={Home} />
            </Switch>
        );
    }
}

export default App;
