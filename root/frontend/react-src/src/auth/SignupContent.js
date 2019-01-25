import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import { logIn } from './authActions'
import { Entry } from './Entry';
import {PwField, EntryField} from './EntryComponents';
import AuthService from './AuthService';
import Filter from 'bad-words';


class SignupContent extends React.Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.filter = new Filter();
        this.state = {
            userValue: "",
            emailValue: "",
            pwValue: "",
            userErrMsg: null,
            emailErrMsg: null,
            pwErrMsg: null,
        };
    }

    signup = () => {
        fetch('/users', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email:this.state.emailValue, username:this.state.userValue, password:this.state.pwValue})
        })
            .then(res => res.json())
            .then(data => {
                    this.Auth.login(this.state.userValue, this.state.pwValue, false);
                    this.props.logIn();
            })
            .catch((err) => console.log(err))
    }

    handleChangeUser = event => {
        this.setState({
            userValue: event.target.value
        }, () => {
            if (this.state.userErrMsg) this.validateUser();
        });
    };

    handleChangeEmail = event => {
        this.setState({
            emailValue: event.target.value
        }, () => {
            if (this.state.emailErrMsg) this.validateEmail();
        });
    };

    handleChangePw = event => {
        this.setState({
            pwValue: event.target.value
        }, () => {
            if (this.state.pwErrMsg) this.validatePw();
        });
    };

    validateUser = () => {
        let userRegEx = new RegExp("^(?=.*[A-Za-z])[A-Za-z0-9d._-]{1,}$");
        if (!userRegEx.test(this.state.userValue)) {
            if (this.state.userValue === "") {
                this.setState({
                    userErrMsg: "*Required"
                });
            } else {
                this.setState({
                    userErrMsg: "Usernames may contain letters, numbers, hyphens, underscores, & periods"
                });
            }
            return false;
        } else if (this.filter.isProfane(this.state.userValue)) {
            this.setState({
                userErrMsg: "Inappropiate username"
            });
            return false;
        } else {
            fetch('/users/' + this.state.userValue)
                .then(res => res.json())
                .then(data => {
                    if (data.username) {
                        this.setState({
                            userErrMsg: "Username is taken"
                        });
                    } else {
                        this.setState({
                            userErrMsg: null
                        });
                    }
                });
            if (!this.state.userErrMsg) {
                return true;
            } else {
                return false;
            }
        }
    };

    validateEmail = () => {
        let emailRegEx = new RegExp("^([a-zA-Z0-9_.-]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$");
        if (!emailRegEx.test(this.state.emailValue)) {
            if (this.state.emailValue === "") {
                this.setState({
                    emailErrMsg: "*Required"
                });
            } else {
                this.setState({
                    emailErrMsg: "Not a valid email address"
                });
            }
            return false;
        } else {
            fetch('/users/emails/' + this.state.emailValue)
                .then(res => res.json())
                .then(data => {
                    if (data.email) {
                        this.setState ({
                            emailErrMsg: "This email is already in use"
                        });
                    } else {
                        this.setState({
                            emailErrMsg: null
                        });
                    }
                });
            if (!this.state.emailErrMsg) {
                return true;
            } else {
                return false;
            }
        }
    };

    validatePw = () => {
        let pwRegEx = new RegExp("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@#$%^&*?])(?=.{8,})");
        if (!pwRegEx.test(this.state.pwValue)) {
            if (this.state.pwValue === "") {
                this.setState({
                    pwErrMsg: "*Required"
                });
            } else {
                this.setState({
                    pwErrMsg: "Use 8 or more characters with a mix of letters, numbers, & symbols"
                });
            }
            return false;
        } else {
            this.setState({
                pwErrMsg: null
            });
            return true;
        }
    };

    handleSubmit = event => {
        if (this.validateUser() & this.validateEmail() & this.validatePw()) {
            this.signup();
            if (this.props.hideModal) {
                this.props.hideModal();
            }
        }
        event.preventDefault();
    };

    render() {
        if (!this.props.hideModal && this.props.loggedIn/*this.Auth.loggedIn*/) { // the hideModal boolean is so that we don't redirect if signed in through the modal
            return <Redirect to='/home' />
        }

        return (
            <Entry title="Sign Up"
                body={(
                    <form>
                        <EntryField inputId="user-field"
                            faIcon="user"
                            placeHolder="Username"
                            inputValue={this.state.userValue}
                            errorMsg={this.state.userErrMsg}
                            inputChange={this.handleChangeUser}
                            onBlur={this.validateUser}
                            autoComplete="username"
                        />
                        <EntryField inputId="email-field"
                            faIcon="envelope"
                            placeHolder="Email"
                            inputValue={this.state.emailValue}
                            inputType="email"
                            errorMsg={this.state.emailErrMsg}
                            inputChange={this.handleChangeEmail}
                            onBlur={this.validateEmail}
                            autoComplete="email"
                        />
                        <PwField id="pw-field"
                            inputValue={this.state.pwValue}
                            errorMsg={this.state.pwErrMsg}
                            inputChange={this.handleChangePw}
                            onBlur={this.validatePw}
                            autoComplete="new-password"
                        />
                    </form>
                )}
                footer={(
                    <>
                        <button
                            className="btn btn-primary submit-btn"
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                            Sign up
                        </button>
                        <span className="alt-entry-text">
                            Already have an account?
                            {this.props.altEntry ? (
                                <button
                                    className="link-btn alt-entry"
                                    type="button"
                                    onClick={this.props.altEntry}
                                >
                                    Log in
                                </button>
                            ) : (
                                <Link className="alt-entry" to="/login">Log in</Link>
                            )}
                        </span>
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


SignupContent = connect(mapStateToProps, mapDispatchToProps)(SignupContent)

export default SignupContent;
