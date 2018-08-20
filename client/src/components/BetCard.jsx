import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BetCard extends Component {
    constructor(props) {
        super(props);

        const colors = ["danger", "success", "primary", "warning", "info"];

        this.state = {
            color: colors[Math.floor(Math.random() * (colors.length))]
        }

    }

    render() {
        return (
            <Link to={"/bet?id=" + this.props.id.toString()}>
                <div className={"card text-white home-card border-" + this.state.color}>
                    <div className={"card-body text-" + this.state.color}>
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.description}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default BetCard;