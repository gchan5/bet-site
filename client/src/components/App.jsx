import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../UserContext.js';
import Home from './Home';
import LoginPage from './LoginPage';

class App extends Component {
    constructor(props) {
        super(props);

        this.setUser = (user, userId) => {
            this.setState({
                ...this.state,
                username: user,
                userId: userId
            });
        }

        this.removeUser = () => {
            this.setState({
                ...this.state,
                username: null,
                userId: null
            })
        }

        this.state = {
            username: null,
            userId: null,
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
