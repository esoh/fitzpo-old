import React from 'react';
import './Entry.css';
import {PwField, EntryField} from "../common/EntryComponents";
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className="wrapper">
                <div className="signup-container">
                    <h1>Sign up</h1>
                    <hr className="hrb"/>
                    <form>
                        <EntryField faIcon="user" placeHolder="Username"/>
                        <EntryField faIcon="envelope" placeHolder="Email"/>
                        <PwField/>
                        <button type="submit">Sign up</button>
                        <span>
                            Already have an account?
                            <Link className="sign-up" to="/login">Log in</Link>
                        </span>
                    </form>
                </div>
            </div>
        );
    }
}


export default Signup;
