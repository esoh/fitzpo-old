import React from 'react';
import { Link } from 'react-router-dom';

import './Entry.css';
import {EntryField, PwField} from '../common/EntryComponents';

class Login extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <div className="signup-container">
                    <h1>Log in</h1>
                    <hr className="hrb"/>
                    <form>
                        <EntryField faIcon="user" placeHolder="Username or email"/>
                        <PwField/>
                        <div className="signup-footer">
                            <div className="checkbox">
                                <input type="checkbox"/>
                                <label className="remember-label">Remember me</label>
                            </div>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>
                        <button type="submit">Log in</button>
                        <span>
                            Don't have an account?
                            <Link className="sign-up" to="/signup">Sign up</Link>
                        </span>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
