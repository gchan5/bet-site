import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                </div>
                <div className="col">
                    <h2>Login</h2>
                    <hr />
                    <form onSubmit={(event) => this.props.handleSubmit(event, this.props.setUser)}>
                        <div className="form-group">
                            <span>{this.props.errorMessage}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="usernameField">Username</label>
                            <input type="text" className="form-control" id="usernameField" aria-describedby="usernameField" placeholder="Enter username" onChange={this.props.handleUsernameChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordField">Password</label>
                            <input type="password" className="form-control" id="passwordField" placeholder="Password" onChange={this.props.handlePasswordChange} />
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
        );
    }
}

export default LoginForm;