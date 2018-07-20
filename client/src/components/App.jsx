import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../UserContext.js';
import Home from './Home';
import LoginPage from './LoginPage';

class App extends Component {
    constructor(props) {
        super(props);

        this.setUser = (user) => {
            this.setState({
                ...this.state,
                username: user
            });
        }

        this.removeUser = () => {
            this.setState({
                ...this.state,
                username: null
            })
        }

        this.state = {
            username: null,
            setUser: this.setUser,
            removeUser: this.removeUser
        }
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <Switch>
                    <Route path='/login' component={LoginPage} />
                    <Route path='/' component={Home} />
                    <Route component={Home} />
                </Switch>
            </UserContext.Provider>
        );
    }
}

export default App;
