import React from 'react';
import { Link } from 'react-router-dom';

import { Entry } from './Entry';
import {EntryField, PwField} from './EntryComponents';

function LoginContent() {
    return (
        <Entry title="Log In"
            body={(
                <form>
                    <EntryField faIcon="user" placeHolder="Username or email" autoComplete="email" id="entryform"/>
                    <PwField autoComplete="password"/>
                    <div className="signup-footer">
                        <div className="checkbox">
                            <input type="checkbox"/>
                            <label className="remember-label">Remember me</label>
                        </div>
                        <Link className="forgot-password" to="/password">Forgot password?</Link>
                    </div>
                </form>
            )}
            footer={(
                <>
                    <button className="submit-btn" type="submit" form="entryform">Log in</button>
                    <span className="alt-entry-text">
                        Don't have an account?
                        <Link className="sign-up" to="/signup">Sign up</Link>
                    </span>
                </>
            )}
        />
    );
}

export default LoginContent;
