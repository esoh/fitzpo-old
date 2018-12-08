import React from 'react';

import './Entry.css';

function Entry(props) {
    return (
        <div className="wrapper">
            <div className="signup-container">
                <div className="entry-header">
                    <h1>{props.title}</h1>
                </div>
                <div className="entry-body">
                    {props.body}
                </div>
                <div className="entry-footer">
                    {props.footer}
                </div>
            </div>
        </div>
    );
}

export default Entry;
