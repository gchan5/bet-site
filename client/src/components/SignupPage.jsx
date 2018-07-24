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
            passwordMessage: "",
            signUpSuccessful: false
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

    handleSubmit(event) {
        event.preventDefault();
        
        if(this.state.username === "") {
            this.setState({
                ...this.state,
                usernameMessage: "Username is required."
            });
            return;
        }

        if(this.state.password === "") {
            this.seState({
                ...this.state,
                passwordMessage: "Password is required."
            });
            return;
        }

        if(this.state.usernameMessage !== "" || this.state.passwordMessage !== "") {
            return;
        }

        postRequest('/api/user', this.state).then((response) => {
            if(response.ok) {
                console.log(response);
                this.setState({
                    ...this.state,
                    signUpSuccessful: true
                });
            } else {
                this.setState({
                    ...this.state,
                    errorMessage: "An error occurred during registration."
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
                            return;
                        }
                    }

                    this.setState({
                        ...this.state,
                        username: name,
                        usernameMessage: ""
                    });
                })
            }
        })
    }

    handlePasswordChange(event) {
        this.setState({
            ...this.state,
            password: event.target.value,
            passwordMessage: ""
        });
    }

    render() {
        if(this.state.signUpSuccessful) {
            return(
                <Redirect to='/login' />
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
                                passwordMessage={this.state.passwordMessage}
                            />
                        </div>
                    </div>
                ) }
            </UserContext.Consumer>
        );
    }
}

export default SignupPage;