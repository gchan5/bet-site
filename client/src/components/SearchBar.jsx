import React, { Component } from 'react';

class SearchBar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-1">
                </div>
                <div className="col-10">
                    <div className="input-group search-bar">
                        <input type="text" className="form-control" placeholder="Type to start searching" onChange={this.props.handleSearch} />
                    </div>
                </div>
                <div className="col-1">
                </div>
            </div>
        );
    }
}

export default SearchBar;