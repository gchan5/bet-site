import React, { Component } from 'react';

class NewBetForm extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                </div>
                <div className="col">
                    <h2>Create a New Bet</h2>
                    <hr />
                    <form onSubmit={(event) => this.props.handleSubmit(event, this.props.userId)}>
                        <div className="form-group">
                            <div className="invalid-field">
                                <span>{this.props.errorMessage}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nameField">Name</label>
                            <input type="text" className="form-control" id="nameField" aria-describedby="nameField" placeholder="Enter a name for your bet" onChange={this.props.handleNameChange} />
                            <div className="invalid-field">
                                <span>{this.props.nameMessage}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="oracleField">Oracle</label>
                            <select className="form-control" defaultValue="Choose an oracle" onChange={this.props.handleOracleChange}>
                                {
                                    this.props.oracleUsers.map(function(user, place) {
                                        if(user === '') {
                                            return <option key={place} value={user}>{user}</option>
                                        }

                                        return (
                                            <option key={place} value={user._id}>{user.username}</option>
                                        );
                                    })
                                }
                            </select>
                            <div className="invalid-field">
                                <span>{this.props.oracleMessage}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="descriptionField">Description</label>
                            <textarea className="form-control" id="descriptionField" rows="3" placeholder="Enter a description..." onChange={this.props.handleDescriptionChange} />
                            <div className="invalid-field">
                                <span>{this.props.descriptionMessage}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="outcomeField">Outcomes</label>
                            {this.props.outcomeFields}
                            <div className="invalid-field">
                                <span>{this.props.passwordMessage}</span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary full-width">Create Bet</button>
                    </form>
                </div>
                <div className="col">
                </div>
            </div>
        );
    }
}

export default NewBetForm;