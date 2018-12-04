import React from 'react';

import './Entry.css';

function Entry(props) {
    return (
        <div className="wrapper">
            <div className="signup-container">
                <h1>{props.title}</h1>
                <hr className="hrb"/>
                {props.children}
            </div>
        </div>
    );
}

export default Entry;
