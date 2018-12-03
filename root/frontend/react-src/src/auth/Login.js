import React from 'react';
import { Link } from 'react-router-dom';

import Entry from './Entry';
import {EntryField, PwField} from './EntryComponents';

class Login extends React.Component {
    render() {
        return (
            <Entry title="Log In">
                <EntryField faIcon="user" placeHolder="Username or email"/>
                <PwField/>
                <div className="signup-footer">
                    <div className="checkbox">
                        <input type="checkbox"/>
                        <label className="remember-label">Remember me</label>
                    </div>
                    <a href="#" className="forgot-password">Forgot password?</a>
                </div>
                <button className="submit-btn" type="submit">Log in</button>
                <span>
                    Don't have an account?
                    <Link className="sign-up" to="/signup">Sign up</Link>
                </span>
            </Entry>
        );
    }
}

export default Login;
