import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Entry } from './Entry';
import {PwField, EntryField} from "./EntryComponents";

class SignupContent extends React.Component {
    constructor() {
        super();
        this.state = {
            isValidated: false,
            userValid: true,
            emailValid: true,
            pwValid: true,
            userValue: "",
            emailValue: "",
            pwValue: "",
            userTaken: null,
            emailTaken: null,
            signupSuccess: null
        };
    }

    postSignup = () => {
        fetch('/users', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email:this.state.emailValue, username:this.state.userValue, password:this.state.pwValue})
        }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    }

    handleChangeUser = event => {
        this.setState({
            userValue: event.target.value
        }, () => {
            if (!this.state.userValid) this.validateUser();
        });
    };

    handleChangeEmail = event => {
        this.setState({
            emailValue: event.target.value
        }, () => {
            if (!this.state.emailValid) this.validateEmail();
        });
    };

    handleChangePw = event => {
        this.setState({
            pwValue: event.target.value
        }, () => {
            if (!this.state.pwValid) this.validatePw();
        });
    };

    validateUser = () => {
        let userRegEx = new RegExp("^(?=.*[A-Za-z])[A-Za-z0-9d._-]{1,}$");
        if (userRegEx.test(this.state.userValue)) {
            fetch('/users/' + this.state.userValue)
                .then(res => res.json())
                .then(data => {
                    if (data.username) {
                        this.setState( {userTaken: true})
                        this.setState( {userValid: false})
                    } else {
                        this.setState( {userTaken: false})
                        this.setState( {userValid: true})
                    }
                });
            if (!this.state.userTaken) {
                return true;
            } else {
                return false;
            }
        } else {
            this.setState( {userValid: false});
            return false;
        }
    };

    validateEmail = () => {
        let emailRegEx = new RegExp("^([a-zA-Z0-9_.-]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$");
        if (emailRegEx.test(this.state.emailValue)) {
            fetch('/users/emails/' + this.state.emailValue)
                .then(res => res.json())
                .then(data => {
                    if (data.email) {
                        this.setState ({ emailTaken: true })
                        this.setState ({ emailValid: false })
                    } else {
                        this.setState({ emailTaken: false })
                        this.setState({ emailValid: true })
                    }
                });
            if (!this.state.emailTaken) {
                return true;
            } else {
                return false;
            }
        } else {
            this.setState( {emailValid: false});
            return false;
        }
    };

    validatePw = () => {
        let pwRegEx = new RegExp("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@#$%^&*?])(?=.{8,})");
        if (pwRegEx.test(this.state.pwValue)) {
            this.setState( {pwValid: true});
            return true;
        } else {
            this.setState( {pwValid: false});
            return false;
        }
    };

    handleSubmit = event => {
        if (this.validateUser() && this.validateEmail() && this.validatePw()) {
            this.postSignup();
            this.setState({ signupSuccess: true })
            if (this.props.hideModal) {
                this.props.hideModal();
            }
        }
        event.preventDefault();
    };

    render() {
        if (this.state.signupSuccess && !this.props.hideModal) {
            return <Redirect to='/profile' />
        }
        
        return (
            <Entry title="Sign Up"
                body={(
                    <form>
                        <EntryField inputId="user-field"
                            faIcon="user"
                            placeHolder="Username"
                            inputValue={this.state.userValue}
                            inputValid={this.state.userValid}
                            errorMsg={this.state.userTaken ? "Username is taken" : "Usernames may contain letters, numbers, hyphens, underscores & periods"}
                            inputChange={this.handleChangeUser}
                            onBlur={this.state.userValue !== "" ? this.validateUser : this.validateUser}
                            autoComplete="username"
                        />
                        <EntryField inputId="email-field"
                            faIcon="envelope"
                            placeHolder="Email"
                            inputValue={this.state.emailValue}
                            inputType="email"
                            inputValid={this.state.emailValid}
                            errorMsg={this.state.emailTaken ? "This email is already in use" : "Not a valid email address"}
                            inputChange={this.handleChangeEmail}
                            onBlur={this.state.emailValue !== "" ? this.validateEmail : this.validateEmail}
                            autoComplete="email"
                        />
                        <PwField id="pw-field"
                            inputValue={this.state.pwValue}
                            inputValid={this.state.pwValid}
                            inputChange={this.handleChangePw}
                            onBlur={this.state.pwValue !== "" ? this.validatePw : undefined}
                            autoComplete="new-password"
                        />
                    </form>
                )}
                footer={(
                    <>
                        <button
                            className="submit-btn"
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


export default SignupContent;
