import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import {EntryField, PwField} from '../common/EntryComponents';

class Login extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <div className="login-container">
                    <h3>Log in</h3>
                    <hr className="hrb"/>
                    <form>
                        <EntryField faIcon="user" placeHolder="Username or email"/>
                        <PwField/>
                        <div className="login-footer">
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
                    <img src="https://i.pinimg.com/originals/85/ea/31/85ea31224d827b44e2fd1be7d4d00f9f.png"/>
                </div>
            </div>
        );
    }
}

export default Login;
