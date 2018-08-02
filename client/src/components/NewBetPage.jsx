import React, { Component } from 'react';
import Navbar from './Navbar';
import NewBetForm from './NewBetForm';

import { getRequest, postRequest } from '../utils/ApiUtils.js';
import { UserContext } from '../UserContext';
import OutcomeField from './OutcomeField';

class NewBetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            oracle: "",
            errorMessage: "",
            description: "",
            outcomes: [""],
            signUpSuccessful: false,
            oracleUsers: [],
            nameMessage: "",
            oracleMessage: "",
            descriptionMessage: ""
        }

        getRequest('/api/usernames').then((response) => {
            if(response.ok) {
                response.json().then((responseJson) => {
                    var users = [''];
                    for(const user in responseJson) {
                        users.push(responseJson[user]);
                    }

                    this.setState({
                        ...this.state,
                        oracleUsers: users
                    })
                })
            }
        });

        this.handleNameChange= this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleOracleChange = this.handleOracleChange.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            ...this.state,
            name: event.target.value,
            nameMessage: ""
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            ...this.state,
            description: event.target.value,
            descriptionMessage: ""
        });
    }

    handleOracleChange(event) {
        this.setState({
            ...this.state,
            oracle: event.target.value,
            oracleMessage: ""
        });
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

    handleSubmit(event, owner) {
        event.preventDefault();

        var outcomes = this.state.outcomes.slice();
        outcomes.shift();

        if(owner === "" || owner === null) {
            this.setState({
                ...this.state,
                errorMessage: "You must be logged in to create a bet."
            });

            return;
        }

        if(this.state.name === "" || this.state.name === null) {
            this.setState({
                ...this.state,
                nameMessage: "A name is required."
            });

            return;
        }

        if(this.state.oracle === "" || this.state.oracle === null) {
            this.setState({
                ...this.state,
                oracleMessage: "An oracle is required"
            });

            return;
        }

        if(this.state.description === "" || this.state.description === null) {
            this.setState({
                ...this.state,
                descriptionMessage: "A description is required."
            });

            return;
        }

        if(this.state.outcomes.length < 3) {
            this.setState({
                ...this.state,
                errorMessage: "At least 2 outcomes are required."
            });

            return;
        }

        const bet = {
            name: this.state.name,
            oracle: this.state.oracle,
            owner: owner,
            description: this.state.description,
            possibleOutcomes: outcomes
        }

        postRequest('/api/bet', bet).then((response) => {
            if(response.ok) {
                console.log(response);
            } else {
                this.setState({
                    ...this.state,
                    errorMessage: "An error occurred during bet creation."
                }); 
            }
        })
    }

    render() {
        const outcomeFields = this.createOutcomeFields();

        return (
            <UserContext.Consumer>
                {({username, userId, setUser, removeUser}) => (
                    <div className="fill">
                        <Navbar user={username} removeUser={removeUser} history={this.props.history} />
                        <div className="container body fill">
                            <NewBetForm 
                                handleNameChange={this.handleNameChange} 
                                handleDescriptionChange={this.handleDescriptionChange}
                                handleOracleChange={this.handleOracleChange} 
                                handleSubmit={this.handleSubmit}
                                oracleUsers={this.state.oracleUsers}
                                setUser={setUser}
                                errorMessage={this.state.errorMessage}
                                outcomeFields={outcomeFields}
                                userId={userId}
                                nameMessage={this.state.nameMessage}
                                descriptionMessage={this.state.descriptionMessage}
                                oracleMessage={this.state.oracleMessage}
                            />
                        </div>
                    </div>
                ) }
            </UserContext.Consumer>
        );
    }
}

export default NewBetPage;