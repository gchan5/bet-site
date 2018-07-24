import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import NewBetForm from './NewBetForm';

import { getRequest, postRequest } from '../utils/ApiUtils.js';
import { UserContext } from '../UserContext';
import OutcomeField from './OutcomeField';

class NewBetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            outcomes: [""],
            signUpSuccessful: false
        }

        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    deleteOutcome(index) {
        return;
    }

    addOutcome(outcome) {
        var outcomes = this.state.outcomes.slice();
        outcomes.push(outcome);

        this.setState({
            ...this.state,
            outcomes: outcomes
        });
    }

    createOutcomeFields() {
        const toReturn = this.state.outcomes.map(function(outcome, place) {
            return (
                <OutcomeField 
                    key={place} 
                    outcome={outcome} 
                    position={place} 
                    addOutcome={(outcome, event) => this.addOutcome(outcome)}
                    deleteOutcome={this.deleteOutcome} />
            )
        }, this);

        return toReturn;
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

        const outcomeFields = this.createOutcomeFields();

        return (
            <UserContext.Consumer>
                {({username, setUser, removeUser}) => (
                    <div className="fill">
                        <Navbar user={username} removeUser={removeUser} history={this.props.history} />
                        <div className="container body fill">
                            <NewBetForm 
                                handleUsernameChange={this.handleUsernameChange} 
                                handlePasswordChange={this.handlePasswordChange} 
                                handleSubmit={this.handleSubmit}
                                setUser={setUser}
                                errorMessage={this.state.errorMessage}
                                outcomeFields={outcomeFields}
                            />
                        </div>
                    </div>
                ) }
            </UserContext.Consumer>
        );
    }
}

export default NewBetPage;