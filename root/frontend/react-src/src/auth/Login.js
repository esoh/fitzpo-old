import React from 'react';
import { Link } from 'react-router-dom';

import Entry from './Entry';
import {EntryField, PwField} from './EntryComponents';

function Login() {
    return (
        <Entry title="Log In">
            <form>
                <EntryField faIcon="user" placeHolder="Username or email"/>
                <PwField/>
                <div className="signup-footer">
                    <div className="checkbox">
                        <input type="checkbox"/>
                        <label className="remember-label">Remember me</label>
                    </div>
                    <Link className="forgot-password" to="/password">Forgot password?</Link>
                </div>
                <button className="submit-btn" type="submit">Log in</button>
            </form>
            <span>
                Don't have an account?
                <Link className="sign-up" to="/signup">Sign up</Link>
            </span>
        </Entry>
    );
}

export default Login;
