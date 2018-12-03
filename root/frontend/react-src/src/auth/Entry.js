import React from 'react';

import './Entry.css';

class Entry extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <div className="signup-container">
                    <h1>{this.props.title}</h1>
                    <hr className="hrb"/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Entry;
