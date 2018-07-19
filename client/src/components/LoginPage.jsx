import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import LoginForm from './LoginForm';

import { postRequest } from '../utils/ApiUtils.js';
import { UserContext } from '../UserContext';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            loginSuccessful: false
        }

        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    setErrorMessage(message) {
        this.setState({
            ...this.state,
            errorMessage: message
        });
    }

    handleSubmit(event, addUser) {
        event.preventDefault();
        
        if(this.state.username === "") {
            this.setErrorMessage("Username is required.");
            return;
        }

        if(this.state.password === "") {
            this.setErrorMessage("Password is required.");
            return;
        }

        postRequest('/auth/login', this.state).then((response) => {
            if(response.ok) {
                console.log("User " + this.state.username + " successfully logged in.");
                addUser(this.state.username);
                this.setState({
                    ...this.state,
                    loginSuccessful: true
                });
            } else {
                this.setState({
                    ...this.state,
                    errorMessage: "Wrong username or password."
                });
            }
        })
    }

    handleUsernameChange(event) {
        this.setState({
            ...this.state,
            username: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            ...this.state,
            password: event.target.value
        });
    }

    render() {
        if(this.state.loginSuccessful) {
            return(
                <Redirect to='/dashboard' />
            );
        }

        return (
            <UserContext.Consumer>
                {({username, setUser}) => (
                    <div className="fill">
                        <Navbar user={username}/>
                        <div className="container body fill">
                            <LoginForm 
                                handleUsernameChange={this.handleUsernameChange} 
                                handlePasswordChange={this.handlePasswordChange} 
                                handleSubmit={this.handleSubmit}
                                setUser={setUser}
                                errorMessage={this.state.errorMessage} 
                            />
                        </div>
                    </div>
                ) }
            </UserContext.Consumer>
        );
    }
}

export default LoginPage;