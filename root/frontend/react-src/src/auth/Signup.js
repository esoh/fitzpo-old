import React from 'react';
import { Link } from 'react-router-dom';

import Entry from './Entry';
import {PwField, EntryField} from "./EntryComponents";

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <Entry title="Sign Up">
                <EntryField faIcon="user" placeHolder="Username"/>
                <EntryField faIcon="envelope" placeHolder="Email"/>
                <PwField/>
                <button type="submit">Sign up</button>
                <span>
                    Already have an account?
                    <Link className="sign-up" to="/login">Log in</Link>
                </span>
            </Entry>
        );
    }
}


export default Signup;
