import React from 'react';

import LoginContent from './LoginContent';
import SignupContent from './SignupContent';
import './Entry.css';

export function Entry(props) {
    return (
        <div className="entry-content">
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
    );
}

export function Login(){
    return (
        <div className="wrapper">
            <div className="entry-container">
                <LoginContent/>
            </div>
        </div>
    )
}

export function Signup(){
    return (
        <div className="wrapper">
            <div className="entry-container">
                <SignupContent/>
            </div>
        </div>
    )
}
