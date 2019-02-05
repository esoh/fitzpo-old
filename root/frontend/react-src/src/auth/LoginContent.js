import React from 'react';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'

import { logIn } from './authActions'
import { Entry } from './Entry';
import {EntryField, PwField} from './EntryComponents';
import AuthService from './AuthService';

class LoginContent extends React.Component {
    _isMounted = false; // used to stop async memory leaks when component is not mounted
    constructor() {
        super();
        this.Auth = new AuthService(); // creates instance of AuthService so we can use it's methods
    }

    state = {
        userOrEmailValue: "",
        pwValue: "",
        UserErrMsg: null,
        pwErrMsg: null,
        rememberMe: true
    }

    handleChangeUserOrEmail = event => {
        this.setState({
            userOrEmailValue: event.target.value,
            userErrMsg: null
        });
    }

    handleChangePassword = event => {
        this.setState({
            pwValue: event.target.value,
            pwErrMsg: null
        });
    }

    handleChangeCheckbox = event => {
        this.setState({
            rememberMe: event.target.checked
        });
    }

    handleSubmit = event => {
        if (this.state.userOrEmailValue === "" || this.state.pwValue === "") {
            if (this.state.userOrEmailValue === "") {
                this.setState( {userErrMsg: "*required"} );
            }
            if (this.state.pwValue === "") {
                this.setState( {pwErrMsg: "*required"} );
            }
        } else {
            this.Auth.login(this.state.userOrEmailValue, this.state.pwValue, this.state.rememberMe, (msg) => {
                if (msg) {
                    if (msg === 'User not found') {
                        this.setState({
                            userErrMsg: msg,
                            pwErrMsg: null
                        })
                    } else {
                        this.setState({
                            pwErrMsg:  msg,
                            userErrMsg: null
                        });
                    }
                } else if (this._isMounted) {
                    this.setState({
                        pwErrMsg: null,
                        userErrMsg: null,
                    });
                    if (this.props.logIn) {
                        this.props.logIn();
                    }
                    if (this.props.hideModal) {
                        this.props.hideModal();
                    }
                }

            })
                .catch(err => {
                    alert(err);
                })
        }
        if (event) {
            event.preventDefault();
        }
    };

    handleEnterSubmit = event => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }


    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (/*this.Auth.loggedIn()*/this.props.loggedIn && !this.props.hideModal) { // the hideModal boolean is so that we don't redirect if signed in through the modal
            return <Redirect to='/home' />
        }
        return (
            <Entry title="Log In"
                body={(
                    <form>
                        <EntryField
                            faIcon="user"
                            placeHolder="Username or email"
                            autoComplete="email"
                            onBlur={this.handleChangeUserOrEmail}
                            inputChange={this.handleChangeUserOrEmail}
                            errorMsg={this.state.userErrMsg}
                            inputValue={this.state.userOrEmailValue}
                            handleEnterSubmit = {this.handleEnterSubmit}
                        />
                        <PwField autoComplete="password"
                            onBlur={this.handleChangePassword}
                            errorMsg={this.state.pwErrMsg}
                            inputChange={this.handleChangePassword}
                            inputValue={this.state.pwValue}
                            handleEnterSubmit = {this.handleEnterSubmit}
                        />
                        <div className="signup-footer">
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.rememberMe}
                                    onChange={this.handleChangeCheckbox} />
                                <label className="remember-label">Remember me</label>
                            </div>
                            <Link className="forgot-password" to="/password">Forgot password?</Link>
                        </div>
                    </form>
                )}
                footer={(
                    <>
                        <button
                            className="btn btn-primary submit-btn"
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

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: () => {
            dispatch(logIn())
        }
    }
}


LoginContent = connect(mapStateToProps, mapDispatchToProps)(LoginContent)

export default LoginContent;
