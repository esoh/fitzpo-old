import React from 'react';
import { Link } from 'react-router-dom';

import { Entry } from './Entry';
import {EntryField, PwField} from './EntryComponents';

function LoginContent(props) {
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
                    <p className="alt-entry-text">
                        Don't have an account?
                        {props.altEntry ? (
                            <button
                                className="link-btn alt-entry"
                                type="button"
                                onClick={props.altEntry}
                            >
                                Sign up
                            </button>
                        ) : (
                            <Link className="alt-entry" to="/signup">Sign up</Link>
                        )}
                    </p>
                </>
            )}
        />
    );
}

export default LoginContent;
