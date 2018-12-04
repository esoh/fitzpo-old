import React from 'react';
import { Link } from 'react-router-dom';

import Entry from './Entry';
import {PwField, EntryField} from "./EntryComponents";

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            isValidated: false,
            userValid: true,
            emailValid: true,
            pwValid: true,
            userValue: "",
            emailValue: "",
            pwValue: ""
        };
    }

    handleChangeUser = event => {
        this.setState({
            userValue: event.target.value
        }, () => {
            this.validateUser();
        });
    };

    handleChangeEmail = event => {
        this.setState({
            emailValue: event.target.value
        }, () => {
            this.validateEmail();
        });
    };

    handleChangePw = event => {
        this.setState({
            pwValue: event.target.value
        }, () => {
            this.validatePw();
        });
    };

    validateUser = () => {
        let userRegEx = new RegExp("^(?=.*[A-Za-z])[A-Za-z0-9d._-]{1,}$");
        if (userRegEx.test(this.state.userValue)) {
            this.setState( {userValid: true});
        } else {
            this.setState( {userValid: false});
        }
    };

    validateEmail = () => {
        let emailRegEx = new RegExp("^([a-zA-Z0-9_.-]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$");
        if (emailRegEx.test(this.state.emailValue)) {
            this.setState( {emailValid: true});
        } else {
            this.setState( {emailValid: false});
        }
    };

    validatePw = () => {
        let pwRegEx = new RegExp("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@#$%^&*?])(?=.{8,})");
        if (pwRegEx.test(this.state.pwValue)) {
            this.setState( {pwValid: true});
        } else {
            this.setState( {pwValid: false});
        }
    };

    handleSubmit = event => {
        this.validateUser();
        this.validateEmail();
        this.validatePw();
        alert("A name was submitted : " + this.state.userValue + "\nAn email was submitted : " + this.state.emailValue + "\nA password was submitted : " + this.state.pwValue);
        event.preventDefault();
    };

    render() {
        return (
            <Entry title="Sign Up">
                <form onSubmit={this.handleSubmit}>
                    <EntryField inputId="user-field"
                        faIcon="user"
                        placeHolder="Username"
                        inputValue={this.state.userValue}
                        inputValid={this.state.userValid}
                        errorMsg="Usernames may contain letters, numbers, hyphens, underscores & periods"
                        inputChange={this.handleChangeUser}
                        validateFunc={this.validateUser}
                    />
                    <EntryField inputId="email-field"
                        faIcon="envelope"
                        placeHolder="Email"
                        inputValue={this.state.emailValue}
                        inputType="email"
                        inputValid={this.state.emailValid}
                        errorMsg="Not a valid email address"
                        inputChange={this.handleChangeEmail}
                        validateFunc={this.validateEmail}
                    />
                    <PwField id="pw-field"
                         inputValue={this.state.pwValue}
                         inputValid={this.state.pwValid}
                         inputChange={this.handleChangePw}
                         validateFunc={this.validatePw}
                    />
                    <button className="submit-btn" type="submit" onClick={this.handleSubmit}>Sign up</button>
                </form>
                <span>
                    Already have an account?
                    <Link className="sign-up" to="/login">Log in</Link>
                </span>
            </Entry>
        );
    }
}


export default Signup;
