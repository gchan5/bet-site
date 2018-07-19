import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import { postRequest } from '../utils/ApiUtils.js';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage: ""
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
            this.setErrorMessage("Username is required.");
            return;
        }

        if(this.state.password === "") {
            this.setErrorMessage("Password is required.");
            return;
        }

        postRequest('/auth/login', this.state).then((response) => {
            if(response.ok) {
                console.log("Login success");
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
        return (
            <div className="fill">
                <Navbar />
                <div className="container body fill">
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <h2>Login</h2>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <span>{this.state.errorMessage}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="usernameField">Username</label>
                                    <input type="text" className="form-control" id="usernameField" aria-describedby="usernameField" placeholder="Enter username" onChange={this.handleUsernameChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordField">Password</label>
                                    <input type="password" className="form-control" id="passwordField" placeholder="Password" onChange={this.handlePasswordChange} />
                                </div>
                                <div className="form-group">
                                    <small className="form-text text-muted">Don't have an account? Sign up <Link to='/'>here</Link>.</small>
                                </div>
                                <button type="submit" className="btn btn-primary full-width">Log in</button>
                            </form>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;