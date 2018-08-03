import React, { Component } from 'react';
import { UserContext } from '../UserContext';

import Navbar from './Navbar';
import BetCard from './BetCard';
import { getRequest} from '../utils/ApiUtils.js';
import '../styles/App.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bets: [],
            shownBets: []
        }

        getRequest('/api/bet').then((response) => {
            if(response.ok) {
                response.json().then((responseJson) => {
                    var bets = [];

                    for(const bet in responseJson) {
                        bets.push(responseJson[bet]);
                    }

                    this.setState({
                        bets: bets,
                        shownBets: bets
                    });
                })
            }
        });
    }

    render() {
        return (
            <div className="App">
                <UserContext.Consumer>
                    {({username, removeUser}) => <Navbar user={username} removeUser={removeUser} history={this.props.history} />}
                </UserContext.Consumer>
                <div className="container wrap-cards">
                    {
                        this.state.shownBets.map(function(bet, place) {
                            return (
                                <BetCard
                                    key={place}
                                    name={bet.name}
                                    description={bet.description}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Home;