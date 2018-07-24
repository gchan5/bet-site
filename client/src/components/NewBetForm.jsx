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
                    <form onSubmit={(event) => this.props.handleSubmit(event)}>
                        <div className="form-group">
                            <span>{this.props.errorMessage}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="usernameField">Name</label>
                            <input type="text" className="form-control" id="usernameField" aria-describedby="usernameField" placeholder="Enter a name for your bet" onChange={this.props.handleUsernameChange} />
                            <div className="invalid-field">
                                <span>{this.props.usernameMessage}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="descriptionField">Description</label>
                            <textarea className="form-control" id="descriptionField" rows="3" placeholder="Enter a description..." onChange={this.props.handlePasswordChange} />
                            <div className="invalid-field">
                                <span>{this.props.passwordMessage}</span>
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