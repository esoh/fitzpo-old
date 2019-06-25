import React from 'react';
import { Link, Redirect } from "react-router-dom";

import { FormInput, FormError } from '../common/form';
import { registerAccount } from '../services/authService';
import styles from './Entry.module.scss';

// TODO: Add verify password field

class Signup extends React.Component {

    abortController = new window.AbortController();

    state = {
        formControls: {
            username: {
                value: '',
                isError: false,
                errorMessages: [],
            },
            email: {
                value: '',
                isError: false,
                errorMessages: [],
            },
            password: {
                value: '',
                isError: false,
                errorMessages: [],
            },
        },
        errorMessages: [],
        redirect: false,
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    // given a field, returns a function to have this state value listen for
    // changes
    handleChangeFor = (field) => (event) => {
        const value = event.target.value;

        this.setState(prevState => ({
            formControls: {
                ...prevState.formControls,
                [field]: {
                    ...prevState.formControls[field],
                    value
                }
            }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.signup();
    }

    errorCodeAndParamToStr = {
        'CustomValidatorError': {
            username: ['Username may only contain numbers, letters, and the characters "-" and "_".'],
            password: ['Password should contain at least one letter, one number, and one special character (@$.!%*#?&), and must at least be 8 characters long.'],
        },
        'EmailValidatorError': {
            email: ['Email must be of the format "johndoe@example.com".'],
        },
        'UniqueValidatorError': {
            usernameOrEmail: ['The username or email you\'ve entered is already in use.', 'Please try another username or email.'],
        },
        'NotNullValidatorError': {
            username: ['Username is required.'],
            email: ['Email is required.'],
            password: ['Password is required.'],
        },
        'ProfanityValidatorError': {
            username: ['Username contains an inappropriate word. Please try another.']
        }
    }

    clearErrors = () => {
        this.setState(prevState => ({
            formControls: {
                ...prevState.formControls,
                username: {
                    ...prevState.formControls.username,
                    isError: false,
                    errorMessages: [],
                },
                email: {
                    ...prevState.formControls.email,
                    isError: false,
                    errorMessages: [],
                },
                password: {
                    ...prevState.formControls.password,
                    isError: false,
                    errorMessages: [],
                },
            },
            errorMessages: [],
        }));
    }

    setStateErrorMessages = (error) => {
        switch(error.code) {
            // invalid parameters
            case 1004:
                this.clearErrors();
                error.invalid_params.forEach(param => {

                    var errorMessages = [param.name + ': ' + param.reason];
                    if(this.errorCodeAndParamToStr[param.error] && this.errorCodeAndParamToStr[param.error][param.name]){
                        errorMessages = this.errorCodeAndParamToStr[param.error][param.name];
                    }

                    // edge case: param not in formControl
                    if(this.state.formControls[param.name] === undefined){

                        if(param.name === "usernameOrEmail" && param.error === "UniqueValidatorError"){
                            this.setState(prevState => ({
                                formControls: {
                                    ...prevState.formControls,
                                    username: {
                                        ...prevState.formControls.username,
                                        isError: true,
                                    },
                                    email: {
                                        ...prevState.formControls.email,
                                        isError: true,
                                    },
                                },
                                errorMessages: errorMessages,
                            }));
                        } else {
                            this.setState(prevState => ({
                                errorMessages: prevState.errorMessages + errorMessages,
                            }));
                        }

                    // main handler
                    } else {
                        this.setState(prevState => ({
                            formControls: {
                                ...prevState.formControls,
                                [param.name]: {
                                    ...prevState.formControls[param.name],
                                    isError: true,
                                    errorMessages: errorMessages,
                                },
                            },
                        }));
                    }

                });
                break;
            default:
                this.setState({
                    errorMessages: [error.title + ': ' + error.message]
                });
        }
    }

    signup = () => {
        registerAccount(this.state.formControls.username.value,
                        this.state.formControls.email.value,
                        this.state.formControls.password.value)
            .then(result => {
                if(result && result.error){
                    this.setStateErrorMessages(result.error);
                } else {
                    alert("User registered!")
                    console.log(result)
                    this.setState({ redirect: true })
                }
                // do stuff with the data here, like error checking
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.error(err)
            })
    }

    render() {

        if (this.state.redirect) return <Redirect to='/' />;

        return (
            <div className={styles.center}>
                <div className={styles.content}>
                    <div className={styles.entry}>
                        <form onSubmit={this.handleSubmit} className={styles.form}>
                            <div className={styles.header}>
                                <h1>Sign Up</h1>
                            </div>
                            <div className={styles.body}>
                                <FormInput
                                    label="Username:"
                                    name="username"
                                    type="text"
                                    value={this.state.formControls.username.value}
                                    onChange={this.handleChangeFor('username')}
                                    autoComplete="username"
                                    isError={this.state.formControls.username.isError}
                                    errorMessages={this.state.formControls.username.errorMessages}
                                    errorClassName={styles.error}
                                />
                                <FormInput
                                    label="Email:"
                                    name="email"
                                    type="email"
                                    value={this.state.formControls.email.value}
                                    onChange={this.handleChangeFor('email')}
                                    autoComplete="email"
                                    placeholder="name@example.com"
                                    isError={this.state.formControls.email.isError}
                                    errorMessages={this.state.formControls.email.errorMessages}
                                    errorClassName={styles.error}
                                />
                                <FormInput
                                    label="Password:"
                                    name="password"
                                    type="password"
                                    value={this.state.formControls.password.value}
                                    onChange={this.handleChangeFor('password')}
                                    autoComplete="new-password"
                                    isError={this.state.formControls.password.isError}
                                    errorMessages={this.state.formControls.password.errorMessages}
                                    errorClassName={styles.error}
                                />
                            </div>
                            <FormError className={styles.formError} errors={this.state.errorMessages}/>
                            <div className={styles.footer}>
                                <input type="submit" value="Sign Up" />
                                <Link to="/login">Log In</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
