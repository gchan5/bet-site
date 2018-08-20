import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import queryString from 'query-string';

import Navbar from './Navbar';
import { getRequest} from '../utils/ApiUtils.js';

class BetPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: queryString.parse(this.props.location.search).id
        };

        
        getRequest('/api/bet/' + this.state.id).then((response) => {
            if(response.ok) {
                response.json().then((responseJson) => {
                    console.log(responseJson);
                })
            }
        })
    }

    render() {

        return (
            <div className="App">
                <UserContext.Consumer>
                    {({username, removeUser}) => <Navbar user={username} removeUser={removeUser} history={this.props.history} />}
                </UserContext.Consumer>
            </div>
        );
    }
}

export default BetPage;