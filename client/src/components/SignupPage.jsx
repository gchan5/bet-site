import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import SignupForm from './SignupForm';

import { getRequest, postRequest } from '../utils/ApiUtils.js';
import { UserContext } from '../UserContext';

class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            usernameMessage: "",
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
                response.text().then((text) => {
                    addUser(this.state.username, text.slice(1, -1));
                });

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
        const name = event.target.value;

        getRequest('/api/usernames').then((response) => {
            if(response.ok) {
                response.json().then((responseJson) => {
                    for(const user in responseJson) {
                        if(responseJson[user].username === name) {
                            this.setState({
                                ...this.state,
                                usernameMessage: "This username is not available."
                            });
                            break;
                        }
                    }
                })
            }
        })

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
                {({username, setUser, removeUser}) => (
                    <div className="fill">
                        <Navbar user={username} removeUser={removeUser} history={this.props.history} />
                        <div className="container body fill">
                            <SignupForm 
                                handleUsernameChange={this.handleUsernameChange} 
                                handlePasswordChange={this.handlePasswordChange} 
                                handleSubmit={this.handleSubmit}
                                setUser={setUser}
                                errorMessage={this.state.errorMessage}
                                usernameMessage={this.state.usernameMessage} 
                            />
                        </div>
                    </div>
                ) }
            </UserContext.Consumer>
        );
    }
}

export default SignupPage;