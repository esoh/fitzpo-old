import React from 'react';
import { Link } from 'react-router-dom';

import { Entry } from './Entry';
import {EntryField, PwField} from './EntryComponents';

// TODO: implement login button validation
class LoginContent extends React.Component {
    state = {
        userOrEmailValue: "",
        userOrEmailValid: true,
        pwValue: "",
        pwValid: true
    }

    handleChangeUserOrEmail = event => {
        this.setState({
            userOrEmailValue: event.target.value
        }, () => {
            this.validateUserOrEmail()
        });
    }

    handleChangePassword = event => {
        this.setState({
            pwValue: event.target.value
        }, () => {
            this.validatePassword()
        });
    }

    validateUserOrEmail = () => {
        if (this.state.userOrEmailValue) {
            this.setState( {userOrEmailValid: true});
        } else {
            this.setState( {userOrEmailValid: false});
        }
    }

    validatePassword = () => {
        if (this.state.pwValue) {
            this.setState( {pwValid: true});
        } else {
            this.setState( {pwValid: false});
        }
    }

    render() {
        return (
            <Entry title="Log In"
                body={(
                    <form id="entryform">
                        <EntryField
                            faIcon="user"
                            placeHolder="Username or email"
                            inputValid={this.state.userOrEmailValid}
                            autoComplete="email"
                            onBlur={this.handleChangeUserOrEmail}
                            errorMsg="Username or email required"
                        />
                        <PwField autoComplete="password"
                            inputValid={this.state.pwValid}
                            onBlur={this.handleChangePassword}
                            errorMsg="Password required"
                        />
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
                            {this.props.altEntry ? (
                                <button
                                    className="link-btn alt-entry"
                                    type="button"
                                    onClick={this.props.altEntry}
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
}

export default LoginContent;
