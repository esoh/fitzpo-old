import React from 'react';
import { Link, Redirect} from 'react-router-dom';

import { Entry } from './Entry';
import {EntryField, PwField} from './EntryComponents';
import AuthService from './AuthService';

class LoginContent extends React.Component {
    constructor() {
        super();
        this.Auth = new AuthService(); // creates instance of AuthService so we can use it's methods
    }

    state = {
        userOrEmailValue: "",
        userOrEmailValid: true,
        pwValue: "",
        pwValid: true,
        loginSuccess: null,
        errMsg: null
    }

    // postLogin = () => {
    //     fetch('/users/authenticate', {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json"},
    //         body: JSON.stringify({ usernameOrEmail:this.state.userOrEmailValue, password:this.state.pwValue })
    //     }).then((res) => res.json())
    //     .then((data) => localStorage.setItem('accessToken', data.token))
    //     .catch((err) => console.log(err))
    // }

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
            this.validatePw()
        });
    }

    validateUserOrEmail = () => {
        if (this.state.userOrEmailValue) {
            this.setState( {userOrEmailValid: true});
            return true;
        } else {
            this.setState( {userOrEmailValid: false});
            return false;
        }
    }

    validatePw = () => {
        if (this.state.pwValue) {
            this.setState( {pwValid: true});
            return true;
        } else {
            this.setState( {pwValid: false});
            return false;
        }
    }

    handleSubmit = event => {
        if (this.validateUserOrEmail() && this.validatePw()) {
            this.Auth.login(this.state.userOrEmailValue, this.state.pwValue, (msg) => {
                if (msg) {
                    if (msg === 'User not found') {
                        this.setState({
                            errMsg: msg,
                            userOrEmailValid: false
                        })
                    } else {
                        this.setState({
                            errMsg: "" + msg,
                            pwValid: false
                        });
                    }
                } else {
                    this.setState({
                        errMsg: null,
                        pwValid: true,
                        userOrEmailValid: true
                    });
                }

            })
                .then(res => {
                    this.setState({ loginSuccess: true })
                })
                .catch(err => {
                    alert(err);
                })
            if (this.props.hideModal) {
                this.props.hideModal();
            }
        }
        console.log("state: " + this.state.msg);
        event.preventDefault();
    };

    render() {
        if (/*this.state.loginSuccess*/this.Auth.loggedIn() && !this.props.hideModal) {
            return <Redirect to='/home' />
        }

        return (
            <Entry title="Log In"
                body={(
                    <form>
                        <EntryField
                            faIcon="user"
                            placeHolder="Username or email"
                            inputValid={this.state.userOrEmailValid}
                            autoComplete="email"
                            onBlur={this.handleChangeUserOrEmail}
                            errorMsg={this.state.errMsg === "User not found" ? "Username of email doesn't exist" : "Username or email required"}
                        />
                        <PwField autoComplete="password"
                            inputValid={this.state.pwValid}
                            onBlur={this.handleChangePassword}
                            errorMsg={this.state.errMsg === "Wrong password" ? "Wrong password" :"Password required"}
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
                        <button
                            className="submit-btn"
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                            Log in
                        </button>
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
