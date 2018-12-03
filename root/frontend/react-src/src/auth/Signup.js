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
        this.setState({userValue: event.target.value});
    };

    handleChangeEmail = event => {
        this.setState({emailValue: event.target.value});
    };

    handleChangePw = event => {
        this.setState({pwValue: event.target.value});
    };

    validate = () => {
        let userRegEx = new RegExp("^(?=.*[A-Za-z])[A-Za-z\d\._\-]{1,}$");
        let emailRegEx = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
        let pwRegEx = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
        if (userRegEx.test(this.state.userValue)) {
            this.setState( {userValid: true});
        } else {
            this.setState( {userValid: false});
        }
        if (emailRegEx.test(this.state.userValue)) {
            this.setState( {emailValid: true});
        } else {
            this.setState( {emailValid: false});
        }
        if (pwRegEx.test(this.state.userValue)) {
            this.setState( {pwValid: true});
        } else {
            this.setState( {pwValid: false});
        }
    };

    handleSubmit = event => {
        this.validate();
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
                        inputPattern="^(?=.*[A-Za-z])[A-Za-z\d\._\-]{1,}$"
                        inputValid={this.state.userValid}
                        errorMsg="Usernames must contain at least one letter, numbers, hyphens, underscores & periods"
                        inputChange={this.handleChangeUser}/>
                    <EntryField inputId="email-field"
                        faIcon="envelope"
                        placeHolder="Email"
                        inputType="email"
                        inputValid={this.state.emailValid}
                        errorMsg="Not a valid email address"
                        inputChange={this.handleChangeEmail}/>
                    <PwField id="pw-field" inputValid={this.state.pwValid} inputChange={this.handleChangePw}/>
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
