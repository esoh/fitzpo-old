import React from 'react';
import './Entry.css';
import {PwField, EntryField} from "../common/EntryComponents";
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            isValidated: false,
            userValid: true,
            emailValid: true,
            pwValid: true
        };
    }
    validate = () => {
        const form = document.getElementById("entry-form");
        const formLength = form.length;
        if (form.checkValidity() === false) {
            for (let i = 0; i < formLength; i++) {
                const elem = form[i];
                // const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
                if (/*errorLabel && */elem.nodeName.toLowerCase() !== "button") {
                    if (!elem.validity.valid) {
                        console.log(elem.id);
                        if (elem.id === "user-field") {
                            this.setState({
                                userValid: false
                            });
                        } else if (elem.id === "pw-field") {
                            this.setState( {
                                pwValid:  false
                            });
                        } else if (elem.id === "email-field") {
                            this.setState( {
                                emailValid: false
                            })
                        }
                    } else {
                        if (elem.id === "user-field") {
                            this.setState({
                                userValid: true
                            });
                        } else if (elem.id === "pw-field") {
                            this.setState( {
                                pwValid: true
                            });
                        } else if (elem.id === "email-field") {
                            this.setState( {
                                emailValid: true
                            })
                        }
                        // errorLabel.textContent = "";
                    }
                }
            }

            return false;
        } else {
            for (let i = 0; i < formLength; i++) {
                const elem = form[i];
                const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
                if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
                    errorLabel.textContent = "";
                }
            }

            return true;
        }
    };

    submitHandler = event => {
        event.preventDefault();

        if (this.validate()) {
            this.props.submit();
        }

        //this.setState({ isValidated: true });
    };

    render() {
        return (
            <div className="wrapper">
                <div className="signup-container">
                    <h1>Sign up</h1>
                    <hr className="hrb"/>
                    <form id="entry-form">
                        <EntryField inputId="user-field"
                                    faIcon="user"
                                    placeHolder="Username"
                                    inputPattern="^(?=.*[A-Za-z])[A-Za-z\d\._\-]{1,}$"
                                    inputValid={this.state.userValid}
                                    errorMsg="Usernames must contain at least one letter, numbers, hyphens, underscores & periods"/>
                        <EntryField inputId="email-field"
                                    faIcon="envelope"
                                    placeHolder="Email"
                                    inputType="email"
                                    inputValid={this.state.emailValid}
                                    errorMsg="Not a valid email address"/>
                        <PwField id="pw-field" inputValid={this.state.pwValid}/>
                        <button className="submit-btn" type="submit" onClick={this.submitHandler}>Sign up</button>
                        <span>
                            Already have an account?
                            <Link className="sign-up" to="/login">Log in</Link>
                        </span>
                    </form>
                </div>
            </div>
        );
    }
}


export default Signup;
