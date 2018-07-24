import React, { Component } from 'react';

class OutcomeField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outcomeText: ""
        }

        this.handleOutcomeChange = this.handleOutcomeChange.bind(this);
    }

    handleOutcomeChange(event) {
        this.setState({
            outcomeText: event.target.value
        })
    }

    render() {
        if(this.props.outcome && this.props.outcome !== "") {
            return (
                <div className="row margin-5">
                    <div className="col-10">
                        <input type="text" className="form-control" id="outcomeField" value={this.props.outcome} disabled />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-danger"><span className="fas fa-minus"></span></button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row margin-5">
                    <div className="col-10">
                        <input type="textarea" className="form-control" id="outcomeField" placeholder="Enter an outcome" onChange={this.handleOutcomeChange} />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-success" onClick={() => this.props.addOutcome(this.state.outcomeText)}><span className="fas fa-plus"></span></button>
                    </div>
                </div>
            );
        }
    }
}

export default OutcomeField;